<!-- Interface de téléchargement des images achetées apr le client  -->
<template>
  <div v-if="displayPicture" class="h3 text-center mb-7">Attention vos liens de téléchargement sont valables un mois après votre date d'achat</div>
    <div class="d-flex flex-row justify-content-around my-10 " v-for="picture in pictureUrl">
      <img :src="picture.url" style="width: 300px;"/>
      <v-btn @click="download('mon image', picture.id)">Télécharger le fichier</v-btn>
    </div>
    
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