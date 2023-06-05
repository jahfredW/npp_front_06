<template>
    <v-container class="container">
      <div id="first-add-title" class="mb-5 h3 custom-font">Retrouvez les photos de vos sessions !</div>
          <div style="position: relative; margin-bottom: 5vh;">
            <!-- <p style="position: absolute; top: 10px; left: 10px; z-index: 2; color: white; font-weight: 500; font-size: larger;">Retrouvez les photos de vos sessions</p> -->
            <v-carousel id="cover-carousel" cycle hide-delimiter-background hide-delimiters show-arrows="hover" class="mt-5" :height="carouselHeight">
                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>
                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>
                <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
            </v-carousel>
       
          </div>
          <div id="last-add-title" class="mb-5 h3 custom-font">Derniers albums ajoutés : </div>
          <v-row class="container mb-10 d-flex flex-row justify-content-center" >
            <v-col v-for="card in cards" :key="card.title" cols="12" md="4">
                <v-card elevation="30">
                    <v-img :src="card.src" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px"
              cover
            >
              <v-card-title class="text-white" v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
                <v-card-item>Session du ...</v-card-item>
              <v-spacer></v-spacer>

              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-eye"></v-btn>

              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

            </v-card-actions>
          </v-card>
            
            </v-col>
          </v-row>
          
          <v-divider></v-divider>
    <!-- <div class="d-flex flex-row justify-content-center">
    <div >
    

     

      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="plain"
        
      ></v-btn>
    </div>

</div> -->
    </v-container>
    
</template>

<script setup>

import { ref, onMounted } from 'vue';

onMounted( () => {
  window.addEventListener('resize', checkCarouselHeight);
  checkCarouselHeight();
})

const carouselHeight = ref(500);

const checkCarouselHeight = () => {
  let screenWidth = window.innerWidth;
  if (screenWidth < 420){
    carouselHeight.value = 150;
  } else if (screenWidth <= 720){
    carouselHeight.value = 300;
  } else {
    carouselHeight.value = 500;
  }
}

const cards = [
        // { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
]

// const icons = [
// 'mdi-facebook',
//         'mdi-twitter',
//         'mdi-linkedin',
//         'mdi-instagram',
// ]

</script>

<style lang="scss">

#cover-carousel {
  border-radius: 10px;
  box-shadow: 5px 5px 5px gray;
}

@media  screen and (max-width : 420px) {
  #last-add-title, #first-add-title {
    color : black;
    font-size: medium;
  }

  

}

@media screen and (min-width : 720px) {
  #last-add-title {
    color : white ;
  }

  #first-add-title {
    color : black;
  }
}


</style>