<template>
    <v-container>
        <v-alert  class="mb-5"
          :model-value="alert_updated"
          density="compact"
          type="success"
          title="Updated!"
          text="type mis à jour"></v-alert>
          <v-alert class="mb-5"
          :model-value="alert_created"
          density="compact"
          type="success"
          title="Créé!"
          text="type créé!"></v-alert>
          <v-alert class="mb-5"
          :model-value="alert_error"
          density="compact"
          type="error"
          title="Erreur!"
          text="Attention il semblerait qu'une réduction existe déja pour ce nombre d'articles!"></v-alert>
        <v-form>
            
            <v-text-field placeholder="entrez un nombre" type="text" v-model="state.name" label="intitulé"></v-text-field>
            <v-text-field placeholder="entrez un nombre" type="float" v-model="state.price" label="prix"></v-text-field> 
            <v-text-field  v-model="state.description" label="description"></v-text-field>
            <v-btn  class="custom-button" @click="update_discount(state.id)">{{ btnValue() }}</v-btn>
        </v-form>
       
    </v-container>
</template>

<script setup>

import { reactive, ref, onMounted, onBeforeUpdate } from 'vue';
import { productService } from '@/../_services/product.service';
import { useRouter } from 'vue-router';


const alert_updated = ref(false); 
const alert_created = ref(false); 
const alert_error= ref(false); 

const router = useRouter();

// à la mise à jour du composant on attribut à nouveau 
// les propriétés. 
onBeforeUpdate(() => {
    if(props.test){
        state.id = props.test.id;
        state.name = props.test.name;
        state.price = props.test.price;
        state.description = props.test.description;
    }
    
})

// init de l'état des inptus du formulaire
const initialState = {
    id : null,
    name : "",
    price : null,
    description: "",
}

const state = reactive({
    ...initialState
})

// définition des props héritées 
const props = defineProps({
    test: Object,
    default: 'No Content'
})

// fonction de mise à jour de la réduction 
const update_discount = (id) => {
    let formdata = {};
    formdata['name'] = state.name;
    formdata['price'] = parseFloat(state.price);
    formdata['description'] = state.description;

    if(id){
        productService.update_product_by_id(id, formdata)
            .then( (res) => {
                alert_updated.value = true;
              
                console.log(res)
            })
            .catch( err => console.log(err));
    } else {
        productService.create_product(formdata)
        .then( res => {
            alert_created.value = true;
            
            
        })
        .catch(err => {
            console.log(err);
            alert_error.value = true;
           
        });
    }

    setTimeout( () => {
        router.push('/admin/album/types');
    }, 3000)
    
    
}

// mise à jour réactive de la valeur du bouton de soumission 
const btnValue = () => {
    if(state.id){
        return "mettre à jour"
    } 
    return "créer"
}

</script>