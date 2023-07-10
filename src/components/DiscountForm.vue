<template>
    <v-container>
        <v-alert  class="mb-5"
          :model-value="alert_updated"
          density="compact"
          type="success"
          title="Updated!"
          text="réduction mise à jour"></v-alert>
          <v-alert class="mb-5"
          :model-value="alert_created"
          density="compact"
          type="success"
          title="Créé!"
          text="réduction créée!"></v-alert>
        <v-form>
            <v-text-field v-model="state.intitule" label="intitulé"></v-text-field>
            <v-text-field v-model="state.rate" label="pourcentage"></v-text-field>
            <v-text-field v-model="state.articles" label="articles"></v-text-field> 
            <v-btn class="custom-button" @click="update_discount(state.id)">{{ btnValue() }}</v-btn>
        </v-form>
       
    </v-container>
</template>

<script setup>

import { reactive, ref, onMounted, onBeforeUpdate } from 'vue';
import { discountService } from '@/../_services/discount.service';
import { useRouter } from 'vue-router';


const alert_updated = ref(false); 
const alert_created = ref(false); 

const router = useRouter();

// à la mise à jour du composant on attribut à nouveau 
// les propriétés. 
onBeforeUpdate(() => {
    if(props.test){
        state.id = props.test.id;
        state.intitule = props.test.title;
        state.rate = props.test.rate;
        state.articles = props.test.articles;
    }
    
})

// init de l'état des inptus du formulaire
const initialState = {
    id : null,
    intitule : "",
    rate : "",
    articles: "",
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
    formdata['title'] = state.intitule;
    formdata['rate'] = parseFloat(state.rate);
    formdata['articles'] = parseInt(state.articles);

    if(id){
        discountService.discount_update(id, formdata)
            .then( (res) => {
                alert_updated.value = true;
                setTimeout(() => { alert_updated.value = false}, 2000);
                console.log(res)
            })
            .catch( err => console.log(err));
    } else {
        discountService.discount_create(formdata)
        .then( res => {
            alert_created.value = true;
            setTimeout(() => { alert_created.value = false}, 2000);
            
        })
        .catch(err => console.log(err));
    }

    setTimeout( () => {
        router.push('/admin/discounts');
    }, 2000)
    
    
}

// mise à jour réactive de la valeur du bouton de soumission 
const btnValue = () => {
    if(state.id){
        return "mettre à jour"
    } 
    return "créer"
}

</script>