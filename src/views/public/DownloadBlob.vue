<!-- Interface de téléchargement des images achetées apr le client  -->
<template>
  <v-container class="container">
    <div v-if="displayPicture" class="h3 text-center mb-15">Attention vos liens de téléchargement sont valables un mois après votre date d'achat</div>
  <v-row >
    <v-col cols="12" md="4" v-for="picture in pictureUrl">
      <v-card  max-width="500" elevation="15">
        <v-img :src="picture.url"/>
        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn size="large"  icon="mdi-download" @click="download('mon image', picture.id)"></v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </v-container>

      
      

    
</template>
  
<script setup>

import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from "vue-router";
import { orderService } from '../../../_services/order.service';
import { pictureService } from '../../../_services/picture.service';
import { downloadService } from '../../../_services/download.service';




let route = useRoute();
// récupération de l'id utilisateur passé en param de la route
let id = route.params.id;


const pictureUrl = ref([]);
const displayPicture = ref('true');
  

onMounted( () => {
  // récupération de la commande 
  orderService.getOrderById(id)
  .then( (response) => {
    console.log(response.data);
    let dataOrderLines = response.data.orderLines;
    let orderStatus = response.data.status;
    // récupération des ids des photos correspondant 
    let pictureIDs = dataOrderLines.map( (x) => x.pictureId);

    // reconstruction d'un objet avec les id pictures et les url picture
    // SI la commadne est validée
    if( orderStatus === 'done'){
      for(let pictureId of pictureIDs){
      pictureService.getPictureById(pictureId)
      .then( (response) => {
        let pictureInfos = {};
        // pictureUrl.value.push(response.data)
        pictureInfos.id = pictureId;
        pictureInfos.url = response.data;
        pictureUrl.value.push(pictureInfos);
      })
      .catch( (error) => console.log(error))
    }
    // sinon on n'affiche pas 
    } else {
      displayPicture.value = false;
    }
    
  })
  .catch( (error) => console.log(error))
});

   
// téléchargement des photos. 
const download = (title, pictureId) => {
  downloadService.downloadFile(title, pictureId)
    .then((response) => {
      downloadService.forceFileDownload(response, title)
    })
    .catch(() => console.log('error occured'))
}

  
  </script>