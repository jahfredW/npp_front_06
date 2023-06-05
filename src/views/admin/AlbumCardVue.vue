<!-- Vue de consultation des albums -->
<!-- Parent : AlbumPublicVue -->
<!-- Enfant : AlbumCard -->


<script setup>
import AlbumCard from './../../components/AlbumCard.vue';
import { albumService } from '../../../_services/album.service';
import { ref, onMounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";


let page = 1;
const route = useRoute();

// récupération des queryparams dans l'url ( viennent de FilterForm)
const albumName = ref(route.query.albumName);
const albumCategory = ref(route.query.category);
const albumType = ref(route.query.type);
const beginDate = ref(route.query.beginDate);
const endDate = ref(route.query.endDate);

const errorMessage = ref("");

const resultAlbumTab = ref([]);

// au chargement, on effectue la requete ajax de recupération 
const load = async $state => {
  console.log("loading...");

  try {
    // requete ajax avec passage des query params
    const res = await albumService.getAllAlbumsWithPagination(
      5,
      page,
      albumName.value,
      albumCategory.value,
      albumType.value,
      beginDate.value,
      endDate.value
    );
   
    if (res.data.length === 0) {
      $state.complete();
    } else {
      resultAlbumTab.value.push(...res.data);
      $state.loaded();
      page += 1;
    }
  } catch (error) {
    console.log(error);
    errorMessage.value = error.response.data.message;
    $state.error();
  }
};


const getErrorMessage = () => {
  console.log(errorMessage.value);
  return errorMessage.value != null;
}

</script>

<template>
  <div cols="12" sm="12" md="12" lg="12" v-for="album in resultAlbumTab" :key="album.id">
    <AlbumCard :test="album" />
  </div>
  <div class="text-center h3 mb-5 " v-if="getErrorMessage()">
    {{ errorMessage }}
  </div>
  <InfiniteLoading @infinite="load" :distance="3" :firstload="true">
    <template #complete>
      <v-banner id="banner" class="text-center mt-10 text-h5 mx-auto custom-font">Fin de la liste!</v-banner>
    </template>
  </InfiniteLoading>
</template>




























<!-- <script setup>

import AlbumCard from './../../components/AlbumCard.vue';
import  { albumService }  from '../../../_services/album.service';
import { ref, onMounted, onUnmounted } from 'vue'; 
import { DOMDirectiveTransforms } from '@vue/compiler-dom';

const page = ref(1)
const limit = ref(2)
const resultAlbumTab = ref([])
const newResult = ref([]) 
const scrollComponent = ref(null)
const alert = ref(false);

onMounted(() => {
    if(page.value === 1){
        getAlbums()
    }
    window.addEventListener("scroll", handleScroll)
 })

onUnmounted(() => {
    resultAlbumTab.value = []
  window.removeEventListener("scroll", handleScroll)
 })



const handleScroll = (e) => {
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage) {
    getAlbums()
    if(newResult.value.length == 0 ){
        console.log('ici')
        window.removeEventListener('scroll', handleScroll)
        alert.value = true;
    } else {
        
    }
    
  }
}


const getAlbums = () => {
    albumService.getAllAlbumsWithPagination(limit.value, page.value)
    .then( ( res) => {
        console.log(res.data)
        newResult.value = res.data
        resultAlbumTab.value.push(...res.data)
        page.value += 1;
    
        

    })
    .catch(( (err) => {
        console.log(err)
    }))
}

</script> -->

<style>




</style>