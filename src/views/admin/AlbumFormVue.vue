<template>
  <v-container class="container">
    <AlbumForm 
      @categoryUpdated="handleCategoryUpdated"
      @nameUpdated="handleNameUpdated" 
      @dateUpdated="handleDateUpdated"
      @momentUpdated="handleMomentUpdated"
      @filesUpdated="handleFilesUpdated"
      @validationUpdated="handleValidationUpdated"
      @typeUpdated="handleTypeUpdated" />
  <p>c value in parent: {{ categoryValue }}</p>
  <p>Name value in parent: {{ nameValue }}</p>
  <p>Name value in parent: {{ dateValue }}</p>
  <p>Name value in parent: {{ typeValue }}</p>
  <p>Name value in parent: {{ momentValue }}</p>
  <p>Name value in parent: {{ filesValue }}</p>
  <p>Name value in parent: {{ validationValue }}</p>
  <v-btn :disabled="!validationValue" color="success" @click="uploadFiles">Upload !</v-btn>
        <br>
        <div v-if="send" class="mt-5 d-flex flex-column align-items-center">
          <p><strong class="mb-2">Analyse des fichiers</strong><span v-if="progress === 100"> Ok !</span></p>
            <v-progress-linear  v-model="power" color="amber" height="25">
                <strong>{{ Math.ceil( progress) }}%</strong>
            </v-progress-linear>
        </div>
        <br>
        <div v-if="progress === 100" class="d-flex flex-column align-items-center justify-content-between">
          <strong >Stockage sur le cloud en cours ... </strong>
          <v-progress-circular class="mt-2"
      :size="50"
      color="blue"
      indeterminate
    ></v-progress-circular>
        </div>
  </v-container>
  
</template>


<script setup>

import { albumService } from '../../../_services/album.service';
import { categoryService } from '../../../_services/category.service';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ref, watch, reactive, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AlbumForm from './../../components/AlbumForm.vue';
import  { utils }  from './../../utils/functions'


// définition des vairiables et des propriétés réactives 


const progress = ref(0);
const send = ref(false);

const categoryValue = ref('');
const nameValue = ref('');
const dateValue = ref(null);
const momentValue = ref('');
const filesValue = ref(null);
const validationValue = ref(null);
const typeValue = ref('');

const handleCategoryUpdated = (value) => {
  categoryValue.value = value;
}

const handleNameUpdated = (value) => {
  nameValue.value = value;
}

const handleDateUpdated = (value) => {
  dateValue.value = value;
}

const handleMomentUpdated = (value) => {
  momentValue.value = value;
}

const handleFilesUpdated = (value) => {
  filesValue.value = value;
}

const handleValidationUpdated = (value) => {
  validationValue.value = value;
}

const handleTypeUpdated = (value) => {
  typeValue.value = value;
};



const router = useRouter();
const route = useRoute();






// méthode qui permet d'uploader les fichiers 
const uploadFiles = () => {
    const albumId = route.params.id;
  // $v.value.$validate();

  // if (!$v.value.$error) {
    // définition de l'autorisation d'envoie à true
    let successUpload = [];
    let failureUpload = [];

    // tableau contenant les extensions possibles 
    const extension_tab = ['jpg', 'png', 'jpeg'];
    // instanciation d'un nouveau formulaire de payload avec l'objet FormData. 

    if (filesValue.value.length > 0) {
      for (let image of filesValue.value) {
        // on essaie de spliter le nom de l'image, pour savoir si elle contient au moins un point  
        try {
          let extension = utils.getExtension(image);
          let imageSize = image.size;
          // Si l'image a un point mais que la dernier élément du split n'appartient pas à la liste des extensions, on refuse l'envoie. 
          if (!extension_tab.includes(extension)) {
            alert('Au moins une image contient une extension inconnue')
            failureUpload.push(image);
          }

          if (imageSize > 20000000) {
            alert(`Désolé, mais l\'image ${image.name} dépasse la taille autorisée `)
            failureUpload.push(image);
          }


        }
        // Si l'image name ne contient aucun point, alors le format est inconnu, on refuse l'envoie
        catch {
          alert("erreur inconnue, merci de recommencer")
        }

        successUpload.push(image);
      }
      // Si le conteneur d'image est vide ou si l'autorisation d'envoie n'est pas accordée
      // on alerte l'utlisateur 
      if (successUpload.length === 0) {
        alert("aucune image à envoyer ou extension invalide");
        // sinon on construit l'objet formData avec les uploads et on envoie sur le backend. 
      } else {
        const formData = new FormData();
        for (let i = 0; i < successUpload.length; i++) {
          formData.append('files[]', successUpload[i]);
        }

        formData.append('album_name', nameValue.value);
        formData.append('album_moment', momentValue.value);
        formData.append('album_category', categoryValue.value);
        formData.append('album_type', typeValue.value);

        // formatage de la date 
        let formatedDate = utils.dateFormat(dateValue.value);

        formData.append('album_date', formatedDate);

        albumService.albumCreate(albumId, formData, progress)
          .then(
            response => {
              filesValue.value = [];
              alert(response.data);
              router.push('/admin/album');
            })
          .catch(
            error => {
              console.log(error);
              alert('Une erreur est survenue durant l\'envoie des fichiers')
            });
      }
    } else {
      alert("attention vous n'avez sélectionné aucun fichier")
    } //vérification de l'extension
  }


// }


// }


</script>





<!-- style du loading  -->



