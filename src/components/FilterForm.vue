<!-- Formulaire de filtre  -->
<!-- Utilsié dans AlbumPublicVue -->

<template>
    <v-container :class=customClass>
        <v-menu id="filterMenu"  open-on-click  :close-on-content-click="false" location="left" offset="10" >
            <template    v-slot:activator="{ props }">
                <v-btn  class="custom-button" v-bind="props" link>
                    Filtrer
                </v-btn>
            </template>
            <div>
                <v-list class="custom-bg">
                    <v-list-item>
                        <v-form v-model="valid" ref="form">
                            <v-text-field density="compact" label="Entrez le nom d'un album" v-model="state.albumName" :error-messages="v$.albumName.$errors.map(e => e.$message)" 
                                @input="v$.albumName.$touch" @blur="v$.albumName.$touch">
                            </v-text-field>
                            <v-select density="compact" label="catégories" v-model="category" :items="categories" item-title="name" item-value="id"></v-select>
                            <v-select density="compact" label="type de photo" v-model="type" :items="typeOfProduct" item-title="name" item-value="id"></v-select>
                            <div class="mb-3" >
                                <VueDatePicker  v-model="state.albumBeginDate"  format="dd/MM/yyyy" langage="fr"  teleport-center month-name-format="long" placeholder="Entre le : ">
                                </VueDatePicker>
                            </div>
                            
                            <div class="mb-3">
                                <VueDatePicker  v-model="state.albumEndDate" format="dd/MM/yyyy" langage="fr"  teleport-center month-name-format="long" placeholder="Et le : ">
                                </VueDatePicker>
                            </div>
                            <p class="mx-auto text-danger" v-for="error of v$.albumBeginDate.$errors" :key="error.$uid">
                                <strong class="mx-auto text-danger">{{ error.$message }}</strong>
                            </p>
                            <div class="d-flex flex-row justify-content-around">
                            <v-btn  color="success" @click="submitForm"><v-icon>mdi-magnify</v-icon></v-btn>
                            <v-btn color="warning" @click="reset"><v-icon>mdi-restart</v-icon></v-btn>
                        </div>
                        </v-form>
                        
                            
                    </v-list-item>
                </v-list>
            </div>    
        </v-menu>
    </v-container>
</template>


<script setup>

import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css';
// import '@vuepic/vue-datepicker/dist/main.css';
import { categoryService } from '@/../_services/category.service';
import { productService } from '@/../_services/product.service';
import { useVuelidate } from '@vuelidate/core'
// import { helpers } from 'vuelidate/lib/validators'
import { email, required, helpers } from '@vuelidate/validators'
import { reactive, ref, onMounted, onBeforeUpdate } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { checkScreenSize } from '@/composables/screen';
import { screenClass } from '@/composables/screen';

// const albumName = ref('');
const category = ref(null);
const categories = ref([]);
const type= ref(null);
const typeOfProduct = ref([]);
// const albumBeginDate = ref(null);
// const albumEndDate = ref(null);
const valid = ref(true);


const { isDesktop } = checkScreenSize();
const { customClass } = screenClass();




// définition de l'état initial de l'objet initialState, 
// correspond aux inputes du formulaire
const initialState = {
    albumName : '',
    albumBeginDate: null,
    albumEndDate: null,
}

// Spread des propriétés de initialState dans state
const state = reactive({
    ...initialState
})


// Regex de validation qui n'autorise pas les caractères spéciaux
const regex1 = helpers.regex(/^[a-zA-Z0-9]*$/);

// Vérification de la logique des dates 
function dateValidation() {
        let beginObject = new Date(state.albumBeginDate);
        let endObject = new Date(state.albumEndDate);
        if (beginObject > endObject){
            console.log('ici')
        return false 
        }
        return true;
     
}

// Importation de la méthode withAsync 
const { withAsync } = helpers 

// utilisation de withAsync en utilisant dateValiation sur les dates en entrée 
const asyncValidator = withAsync(dateValidation, [() => state.albumBeginDate, () => state.albumEndDate]);


// défintion des règles de validations 
const rules = {
    albumName : { 
        // required : helpers.withMessage('un champ est obligatoire', required), 
        regex  : helpers.withMessage("Caractères spéciaux interdits", regex1),
    },
    albumBeginDate : {
        test : helpers.withMessage("Attention aux dates ! ", asyncValidator ),
    }
}

// instanciation du nouvel objet de validation 
const v$ = useVuelidate(rules, state)

// soumission de la validation et requete AJAX 
const submitForm = () => {
    v$.value.$validate()
    .then( ( result) => {
        console.log( result) 
        if (result) {
            search();
        }
    })
    .catch ( (err) => {
        console.log( 'oups, something wrong')
    })

    
}

// fonction de test 
const hello = () => {
    console.log(route.query.beginDate);
}


// Au montage du composant, on charge les catégories et les types dans le formulaire de recherche 
onMounted( async() => {

    let cat = await categoryService.getAllCategories();
    let types = await productService.getAllProducts();
    

    let typesParsed = types.data;
    categories.value = cat.data;
    for (let item of cat.data){
        if (item.id == categoryId){
            category.value = item.id;
            break;
        }
    }
    typeOfProduct.value = types.data;
    for (let item of typesParsed){
        console.log(item)
        if (item.id == typeId){
            type.value = item.id;
            break;
        }
    }

    if(state.albumBeginDate != null){
        state.albumBeginDate = state.albumBeginDate.toLocaleDateString('fr-Fr');
    }

    if(state.albumEndDate != null){
        state.albumEndDate = state.albumEndDate.toLocaleDateString('fr-Fr');
    }

    state.albumBeginDate = beginDate;

    state.albumEndDate = endDate;

    state.albumName = albumQueryName;

    
})

const route = useRoute();

const router = useRouter();

const categoryId = route.query.category;
const typeId = route.query.type;
const beginDate = route.query.beginDate;
const endDate = route.query.endDate;
const albumQueryName = route.query.albumName;

//envoie du formulaire de recherche
const search = () => {
// init de l'objet query 
  const query = {};

  if (category.value !== null) {
    query.category = category.value;
  }

  if (type.value !== null) {
    query.type = type.value;
  }

  if (state.albumBeginDate !== null) {
    console.log(state.albumBeginDate);
    query.beginDate = state.albumBeginDate;
  }

  if (state.albumEndDate !== null) {
    query.endDate = state.albumEndDate;
  }

  if (state.albumName !== null) {
    query.albumName = state.albumName;
  }

  // redirection vers albumPublicVue avec les query params 
  router.push({
    name: 'albumPublicVue',
    query
  });
}

// réinitialisation du formulaire
const reset = () => {
    category.value = null;
    type.value = null;
    state.albumBeginDate = null;
    state.albumEndDate = null;
    state.albumName = null;
}

// position du pop up de datePicker 
// const customPosition = () => ({ top : -170});


</script>