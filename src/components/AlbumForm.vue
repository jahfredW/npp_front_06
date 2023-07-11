<!-- description : formulaire de création / update  d'un album -->
<!-- url admin/album/create -->
<!-- parents : AlbumFormVue / AlbumUpdatedVue  -->


<template>
  <!-- {{ album.createdAt }} -->
  <v-alert class="mb-5"
          :model-value="alert_error"
          density="compact"
          type="error"
          title="Erreur!"
          text="Attention il n'existe aucun type de photo renseigné quand à présent, vous allez être redirigés !"></v-alert>
    <v-card class="container mt-10">
    <v-form v-model="valid" @change="$emit('validationUpdated', valid)">
      <v-container>
        <h1 class="h3 text-center mb-5">{{id ? "Editer un album" : "Créer un nouvel album" }} </h1>
        <div v-if="(url.includes('create') && (id === null) )" class="mb-5">
          <VueDatePicker  v-model="albumDate" format="dd/MM/yyyy"  :alt-position="customPosition" month-name-format="long" placeholder="date de la session" @update:modelValue="$emit('dateUpdated', albumDate)">
          </VueDatePicker>
        </div>
        <div v-else-if="(url.includes('update') && (id !== null) )" class="mb-5">
          <VueDatePicker  v-model="albumDate"  format="dd/MM/yyyy" :alt-position="customPosition" month-name-format="long" placeholder="date de la session" @update:modelValue="$emit('dateUpdated', albumDate)">
          </VueDatePicker>
        </div>
        <v-text-field v-if="(url.includes('create') && (id === null) )"  @input="$emit('nameUpdated', albumName)" variant="outlined" density="compact" prepend-inner-icon="mdi-subtitles" v-model="albumName" label="titre de l'album" >
        </v-text-field>
        <!-- <div class="mb-5" v-if="$v.sessionName.$error">Le nom est obligatoire.</div> -->
        <v-text-field v-else-if="(url.includes('update') && (id !== null) )"  @input="$emit('nameUpdated', albumName)" variant="outlined" density="compact" prepend-inner-icon="mdi-subtitles" v-model="albumName" label="titre de l'album" >
        </v-text-field>

        <div v-if="((url.includes('create'))  && (id === null) )">
          <!-- attention cas de blocage : mettre l'écoute à la fin  -->
          <v-select :rules="typeRules"  variant="outlined" density="compact" prepend-inner-icon="mdi-format-list-bulleted" label="Type de photo" v-model="albumType" :items="types" item-title="name" item-value="id"
          @update:modelValue="$emit('typeUpdated', albumType)" ></v-select>
          
        </div>
        <div v-else-if="((url.includes('update'))  && (id !== null) )">
          <!-- attention cas de blocage : mettre l'écoute à la fin  -->
          <v-select :rules="typeRules"  variant="outlined" density="compact" prepend-inner-icon="mdi-format-list-bulleted" label="type de photo" v-model="albumType" :items="types" item-title="name" item-value="id"
          @update:modelValue="$emit('typeUpdated', albumType)" ></v-select>
        </div>


        <div v-if="((url.includes('create'))  && (id === null) )">
          <!-- attention cas de blocage : mettre l'écoute à la fin  -->
          <v-select  variant="outlined" density="compact" prepend-inner-icon="mdi-clock" label="Moment de la journée" v-model="albumMoment" :items="moments" item-title="name" item-value="name"
          @update:modelValue="$emit('momentUpdated', albumMoment)"></v-select>
        </div>
        <div v-else-if="((url.includes('update'))  && (id !== null) )">
          <!-- attention cas de blocage : mettre l'écoute à la fin  -->
          <v-select  variant="outlined" density="compact" prepend-inner-icon="mdi-clock" label="Moment de la journée" v-model="albumMoment" :items="moments" item-title="name" item-value="name"
          @update:modelValue="$emit('momentUpdated', albumMoment)"></v-select>
        </div>
        <div>
        </div>
        <div v-if="(url.includes('create')  && (id === null) )">
            <!-- Blocage : transmission de props de l'enfant vers le parent.  -->
          <v-select  variant="outlined" density="compact" prepend-inner-icon="mdi-apps" label="Categories :" v-model="albumCategory" :items="categories" item-title="name" item-value="id"
          @update:modelValue="$emit('categoryUpdated', albumCategory)"></v-select>
        </div>
        <div v-if="(url.includes('update')  && (id !== null) )">
            <!-- Blocage : transmission de props de l'enfant vers le parent.  -->
          <v-select  variant="outlined" density="compact" prepend-inner-icon="mdi-apps" label="Categories :" v-model="albumCategory" :items="categories" item-title="name" item-value="id"
          @update:modelValue="$emit('categoryUpdated', albumCategory)"></v-select>
        </div>

        <div v-if="url.includes('create')" >
          <v-file-input @change="onFileChange" :rules="id ? [] : basicRules" variant="outlined" density="compact" show-size counter  multiple placeholder="test" 
            label="photos à uploader"></v-file-input>
        </div>
        <!-- <div v-else-if="((url.includes('update'))  && (id === null) )" >
          <v-file-input :rules="id ? [] : basicRules" variant="outlined" density="compact" show-size counter  multiple placeholder="test" @change="onFileChange"
            label="photos à uploader"></v-file-input>
        </div> -->
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
import { productService } from '@/../_services/product.service';
import { albumService } from '../../_services/album.service';
import { useVuelidate } from '@vuelidate/core'

let route = useRoute();

// rules 
const typeRules = [(v) => !!v || "Item is required"];

const alert_error = ref(false);



// récupération de la liste des catégories au montage du composant 
onMounted( async() => {
  let productList = await productService.getAllProducts()
  let cat = await categoryService.getAllCategories();

  if(productList.data.length === 0){
    alert_error.value = true;
    setTimeout( () => {
      router.push('/admin/album/types')
    }, 3000)
  }

  // récupération des types de photos. 
  let products = await productService.getAllProducts();

  categories.value = cat.data;



  types.value = products.data;
  console.log(types.value);

    if(route.params.id){
      
      let ide = route.params.id
      id.value = route.params.id
      let data = await albumService.getOneAlbumInfo(ide);
      let album = data.data;
      console.log(album);
      albumName.value = album.name;
      albumCategory.value = album.category;
      albumMoment.value = album.morning ? "matin" : "après-midi";
      albumType.value = album.product;
      

    emit('nameUpdated', albumName.value);
    emit('categoryUpdated', albumCategory.value.id);
    emit('momentUpdated', albumMoment.value);
    emit('dateUpdated', albumDate.value);
    emit('validationUpdated', valid.value);
    // console.log(albumType.value[0].id);
    emit('typeUpdated', albumType.value );


    } else {
      
      emit('dateUpdated', albumDate.value);
    }

  

  moments.value = new Array(
    { 'id': 1, 'name' : 'matin'},
    { 'id' : 2, 'name' : 'après-midi'}
)

  
})



// définition des évènements à transmettre au parent
const emit = defineEmits(['categoryUpdated', 
'nameUpdated', 
'dateUpdated', 
'momentUpdated', 
'filesUpdated',
'validationUpdated',
'typeUpdated']);

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
const albumType = ref(null);
const types = ref([]);
const albumCategory = ref(null);
const categories = ref([]);
const albumMoment = ref(null);
const moments = ref([]);
const albumDate = ref(new Date());
const valid = ref(null);
const id = ref(null)

// const labelMoment = ref(null);

// const labelChecker = () => {
//   let moment = "";
//   if( props.album){
//     if(props.album.morning){
//       moment = "matin"
//     } else {
//       moment = "après-midi"
//     }
//   }
//   return moment;
// }

// let files = ref([]);

// on défini un router 
const router = useRouter();

// On se sert du router déterminer l'url 
// on vérifiera si il y a la présence de create ou update
// afin de moduler les champs à afficher. 
const url = router.currentRoute.value.fullPath; 



// méthode de récupération des fichiers à envoyer 
const onFileChange = (event) => {
  // event.target.files : récupère une liste de files 
  // this.files : liste des fichiers qui seront envoyés au back end. 
  let files = event.target.files;
  emit('filesUpdated', files);
};




</script>