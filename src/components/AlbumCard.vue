<template>
        <v-card class="mx-auto my-4" max-width="500" elevation="15" >
            <v-img class="align-start text-black"  :src=test.coverPicture cover  oncontextmenu="return false;">
                <v-card-title>{{ test.name }}</v-card-title>
                <v-card-subtitle>{{ dateReverse(test.createdAt) }} : {{ test.morning  ? "Matin" : "Aprem" }}</v-card-subtitle>
            </v-img>
            <v-card-text>
                <v-row >
            
                    <v-col v-if="statusApp === 'godMode'" cols="6" md="4" class="text-center my-auto"  >
                        <v-menu  open-on-click  :close-on-content-click="true" location="top" >
                            <template   v-slot:activator="{ props }">
                                <v-btn class="custom-button" v-bind="props" link>
                                    <v-icon >mdi-gesture-tap-button</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <div>
                                    <v-list-item class="custom-bg" v-for="item in items" :key="item.title" @click="selectItem(item, test.id)">
                                        <v-btn :prepend-icon="item.icon" :color="item.color" >{{ item.title }} </v-btn>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </v-menu>
                    </v-col> 
                   
                    <v-col v-if="statusApp === 'godMode'" cols="6" md="4" class="d-flex flex-row align-items-center justify-content-center">
                                        <v-icon>mdi-camera</v-icon>
                                        <p>{{ test.pictures.length }}</p>
                                    </v-col>

                    
                    <v-col v-if="statusApp === 'godMode'"  cols="12" md="4">
                      
                                <v-row class="text-center" v-if="switchValue" style="display: flex; align-items:center; justify-content: center; ">
                                   
                                    <v-col cols="4"><v-icon  style="transform: scale(1.2);" >mdi-access-point</v-icon></v-col>
                                    <v-col cols="4">
                                        <div style="box-sizing: border-box;" >
                                            <v-switch style="display: flex; justify-content: center;" hide-details="true" v-model="switchValue" @change="handleChange(test.id)"  color="green" ></v-switch>
                                        </div>
                                    </v-col >
                                </v-row>
                    
                                <v-row class="text-center" v-else style="display: flex; align-items:center; justify-content: center;" >
                                   
                                    <v-col cols="4"><v-icon  style="transform: scale(1.2);" >mdi-access-point-network-off</v-icon></v-col>
                                    <v-col cols="4">
                                        <div style="box-sizing: border-box;" >
                                            <v-switch style="display: flex; justify-content: center;" hide-details="true" v-model="switchValue" @change="handleChange(test.id)"  color="green" ></v-switch>
                                        </div>
                                    </v-col>
                                </v-row>
                    </v-col>

                    <v-col v-else cols="12" md="12">
                      
                      <v-row  class="text-center"  style="display: flex; align-items:center">
                          <v-col cols="12" class="d-flex flex-row justify-content-center mt-4">
                              <v-icon>mdi-camera</v-icon>
                              <p>{{ test.pictures.length }}</p>
                          </v-col>
                          
                      </v-row>
          
                    </v-col>
                    
                </v-row>
                <v-divider></v-divider>
                <v-row class="d-flex flex-row justify-content-center pb-3" >
                    <v-col cols="12" md="6" class="text-center my-auto"  >
                        <div class="h5">Categorie : </div>
                        <p style="font-size: 15px;">{{ test.category.name }}</p>
                    </v-col>
                    <v-col cols="12" md="6" class="text-center my-auto"  >
                        <div class="h5">Expire dans <strong>{{ countDownValue }}</strong>  jours </div>
                        <p> {{  dateReverse(test.expireAt) }}</p>
                    </v-col>
                    
                    <v-col v-if="statusApp !== 'godMode'" cols="12" md="12" class="text-center my-auto"  >
                        <v-btn class="custom-button"  @click="readPublicAlbum(test.id)">Consulter</v-btn>
                    </v-col> 
                    
        </v-row>
            </v-card-text>
            
        
    </v-card>
 
        
    <v-divider></v-divider>
</template>

<style>


</style>

<script setup>
import { ref, toRefs, onMounted } from 'vue';
import { albumService } from '../../_services/album.service';
import { useRouter, useRoute } from 'vue-router';
import { useTokenStore } from './../stores/tokenStore';
import { utils } from '@/utils/functions';
import { useAxios } from '@/composables/axios'

const testCard = ref(null);
const testQuery = ref('');
const statusApp = ref('');
const countDownValue = ref(0);
const state = ref('Hors Ligne');

// défini la valeur du state du switch au montage du composant 
onMounted( () => {
    state.value = switchValue.value ? "Publié" : "Hors Ligne";
    // console.log(tokenStore.getStatusApp);
    utils.countDown(props.test.expireAt, countDownValue);
 })

// instanciation de route
const route = useRoute();

// test de récupération de query parameters 
testQuery.value = route.query.category;

// instanciation d'un token store 
const tokenStore = useTokenStore();

// récupération du status de l'application
statusApp.value = tokenStore.getStatusApp;

// définition des prop réactives su sw
const switchValue = ref(props.test.isActive)

const { test } = toRefs(props); 

// définition d'un router pour le reload
const router = new useRouter();

// définition des props héritées 
const props = defineProps({
    test : Object,
    default: 'No Content'
})




// fonction de formatage de la date 
const dateReverse = (date) => {
    const dateTest = new Date(date);
    console.log(dateTest);
    return date.slice(0,10).split('-').reverse().join('/');
}

// fonction de calcul de différences de dates en jours :
// const countDown = () => {
//     const createdAt = props.test.createdAt;
//     const expireAt = props.test.expireAt;
//     const convertedCreatedAt = new Date(createdAt);
//     const today = new Date();
//     const convertedExpireAt = new Date(expireAt);
//     const diffMs = convertedExpireAt - today;
//     const differenceEnJours = diffMs / (1000 * 60 * 60 * 24);
//     countDownValue.value = Math.floor(differenceEnJours);

// }



// traitement du chnagement de switchValue
const handleChange = (id) => {
    console.log('Switch Value Changed', switchValue.value, id);
    state.value = switchValue.value ? "Publié" : "Hors Ligne";
    albumPublication(id, switchValue.value);

}

// Fonction update, attention ! PUT et apllication-JSON != mutlipart ! 
// const albumPublication = (id, switchValue) => {
//     let formdata = {};
//     formdata['published'] = switchValue;
//     albumService.UpdateAlbumById(id, formdata)
//     .then( (res) => console.log(res))
//     .catch( (err) => console.log(err));
    
// }

// utilisation de composables pour requête axios 
const albumPublication = (id, switchValue) => {
    let formdata = {};
    formdata['published'] = switchValue;
    const { res, err } = useAxios(id, formdata, '/api/album/', { 'Content-Type': 'application/json'}, 'put' )
    console.log(res, err);
}



const items = [
    { title : "Consulter", icon : "mdi-eye", color : "success" },
    { title : "Modifier l'entête", icon :"mdi-pen", color : "blue" }, 
    { title : "Ajouter des photos", icon :"mdi-folder-plus-outline", color : "yellow" }, 
    { title : "Supprimer", icon : "mdi-delete", color : "red", }
]

const publicItem = { title : "Consulter", icon : "mdi-eye", color : "success" };

const selectItem = (item, id) => {
  console.log(`Selected ${item.title}`);
  if(item.title === "Supprimer"){
    if(confirm('Attention cette action est définitive! Continuer ?')){
        albumService.deleteAlbumById(id)
        .then( res => {
            alert('Album supprimé avec succès');
            router.go(0);
    })
        .catch( err => alert('Erreur lors de la suppression') )
    }
  }
  else if(item.title === "Consulter"){
    router.push('/admin/album/read/' + id);
  } else if(item.title === "Modifier l'entête") {
    router.push('/admin/album/update/' + id);
  } else {
    router.push('/admin/album/create/' + id);
  }
};

const readPublicAlbum = (id) => {
    router.push('/album/read/' + id);
}


</script>

<style>

/* #card{
    background-color: #F7F7F8;
} */


</style>