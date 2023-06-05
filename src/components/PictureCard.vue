<!-- child : Card -->
<!-- url : album/read/id  -->

<script setup>

  import { ref, onMounted, onBeforeUpdate } from "vue";
  import InfiniteLoading from "v3-infinite-loading";
  import "v3-infinite-loading/lib/style.css";
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  import { pictureService } from '../../_services/picture.service';
  import { albumService } from "../../_services/album.service";
  import Card from './Card.vue';
  import { useCartStore } from '@/stores/cartStore';

  // init 
  const route = useRoute();
  const router = useRouter();
  let pictures = ref([]);
  let state = ref(null);
  let page = 1;
  let id = route.params.id;



/**
 * méthode de chargement des Cards au Scroll. 
 * @param {} $state état du composant 
 */
  const load = async $state => {
    console.log("loading...");

    // avec API fetch 
    // try {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/comments?_limit=10&_page=" + page
    //   );
    //   const json = await response.json();
    //   if (json.length < 10) $state.complete();
    //   else {
    //     comments.value.push(...json);
    //     $state.loaded();
    //   }
    //   page++;
    // } catch (error) {
    //   $state.error();
    // }

    try {
    // const res =  await axios.get("https://127.0.0.1:8000/api/album/" + id + "?limit=5&page=" + page);

    /**
     * getAlbumByid retourne les phots des albums avec l'intégration d'une pagination 
     */
    const res =  await albumService.getAlbumById(id, 9, page);
    console.log(res.data);
    if (res.data.length == 0) {
        $state.complete();
        }
    else {
        pictures.value.push(...res.data);
        $state.loaded();
        page += 1;
        
    }
    
   } catch (error) {
        $state.error();
   };
  };

// const deletePicture = (id) => {
//    if(confirm('Attention cette action est définitive! Continuer ?'))
//    {
//         pictureService.deletePictureById(id).then( res => {
//             alert('Photo supprimée avec succès');
//             router.go(0);
//     })
//         .catch( err => alert('Erreur lors de la suppression') )
//     }
// };



// const handleChange = (id) => {
//     console.log('Switch Value Changed', switchValue.value, id);
//     state.value = switchValue.value ? "Publié" : "Hors Ligne";
//     albumPublication(id, switchValue.value);

// }

</script>


<template>
    <v-container fluid >
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="3"  v-for="picture in pictures">
                <Card :pict="picture"/>
            </v-col>
        </v-row>
      
            <InfiniteLoading @infinite="load" :distance="3" :firstload="true" >
        <template #complete>
            <v-banner id="banner" class="text-center mt-10 text-h5 mx-auto">Fin de la liste!</v-banner>
        </template>
    </InfiniteLoading>
      
            
    </v-container>  
</template>

<style lang="scss">

#banner{
    background-image: linear-gradient(to left, #eaf2f3, #dbd47cec);
}

// [data-v-9d82030b] {
//     display: flex;
//     align-items: center;
//     justify-content: center;

// }


// #coverPicture{ 
//     transform: scale(1);
//     transition: transform 1s ease;

//     &:active{
//         transform: scale(1.5);
//     }
// }

// #pictureCard{ 
//     transform: scale(1);
//     transition: transform 0.5s ease, background-color 1s ease;

//     &:hover{
//         transform: scale(1.2);
//         background-color: #ecf0f1;
//     }
// }



</style>