<template>
    <!-- {{ album.createdAt }} -->
      <v-card class="container mt-10">
      
      <v-form v-model="valid" @change="$emit('validationUpdated', valid)">
        <v-container>
          <h1 class="h3 text-center mb-5">{{id ? "Editer un album" : "Créer un nouvel album" }} </h1>
          <div v-if="!id" >
            <v-file-input :rules="id ? [] : basicRules" variant="outlined" density="compact" show-size counter  multiple placeholder="test" @change="onFileChange"
              label="photos à uploader"></v-file-input>
          </div>
        </v-container>
      </v-form>
    </v-card>
  </template>
  
  
  <script setup>
  
  // import { useVuelidate } from '@vuelidate/core';
  // import { required, email } from '@vuelidate/validators';
  import { ref, onMounted, onUpdated } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import { useRouter, useRoute } from 'vue-router';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { categoryService } from '../../_services/category.service';
  import { albumService } from '../../_services/album.service';
  
  let route = useRoute();
  
  // récupération de la liste des catégories au montage du composant 
  onMounted( async() => {
  
    let cat = await categoryService.getAllCategories();
    categories.value = cat.data;
  
      if(route.params.id){
        
        let ide = route.params.id
        id.value = route.params.id
        let data = await albumService.getOneAlbumInfo(ide);
        let album = data.data;
        console.log(album);
        albumName.value = album.name;
        albumCategory.value = album.category;
        albumMoment.value = album.morning ? "matin" : "après-midi";
        
  
      emit('nameUpdated', albumName.value);
      emit('categoryUpdated', albumCategory.value.id);
      emit('momentUpdated', albumMoment.value);
      emit('dateUpdated', albumDate.value);
      emit('validationUpdated', valid.value);
  
  
      } else {
        
        emit('dateUpdated', albumDate.value);
      }
  
  
  
      
  
      
      
  
  
  moments.value = new Array(
    { 'id': 1, 'name' : 'matin'},
    { 'id' : 2, 'name' : 'après-midi'}
  )
  
  
  // // on emet les valeurs des évènements par défaut ( date et validation )
  // emit('dateUpdated', sessionDate.value);
  // emit('validationUpdated', valid.value);
  
  
  // emit('momentUpdated', sessionMoment.value);
  // emit('filesUpdated', []);
  
  
  
  
    
  })
  
  // // déclaration des props transmises du parent
  // const props = defineProps({
  //     album : Object,
  //     default: 'No Content'
  // })
  
  // définition des évènements à transmettre au parent
  const emit = defineEmits(['categoryUpdated', 
  'nameUpdated', 
  'dateUpdated', 
  'momentUpdated', 
  'filesUpdated',
  'validationUpdated']);
  
  // définition des règles de base
  const basicRules =[
            v => !!v || "Ce champs ne peut pas être vide!",
          ]
  
  const regexRules = [
        v => !!v || "Ce champs ne peut pas être vide!",
        v => !/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/.test(v) || "les caractères spéciaux sont interdits"
  ]
  
  
  // position du pop up de datePicker 
  const customPosition = () => ({ top : -170});
  
  // déclaration des propriétés réactives
  const album = ref(null);
  const albumName = ref('');
  const albumCategory = ref(null);
  const categories = ref([]);
  const albumMoment = ref(null);
  const moments = ref([]);
  const albumDate = ref(new Date());
  const valid = ref(null);
  const id = ref(null)
  
  const labelMoment = ref(null);
  
  const labelChecker = () => {
    let moment = "";
    if( props.album){
      if(props.album.morning){
        moment = "matin"
      } else {
        moment = "après-midi"
      }
    }
    return moment;
  }
  
  var files = ref([]);
  
  
  
  
  
  
  // méthode de récupération des fichiers à envoyer 
  const onFileChange = (event) => {
    // event.target.files : récupère une liste de files 
    // this.files : liste des fichiers qui seront envoyés au back end. 
    files = event.target.files;
    emit('filesUpdated', files);
  };
  
  
  
  
  </script>