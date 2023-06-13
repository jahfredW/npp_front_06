<!-- url : picture/id -->
<!-- description : page photo : permet ajout panier ou commander un tirage -->

<template>
    <v-container class="container">
        <v-snackbar color="white" v-model="snackbar" multi-line timeout="2000" location="top">{{ cartStore.getSnack }}
            <template v-slot:actions>
                <v-btn
                    variant="text"
                    @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <v-row>
            <v-col cols="12">
                <div v-if="tokenStore.getStatusApp != 'godMode'" class="text-center h3 mb-5">
                    Tous les clichés présentés sont en basse résolution.
                </div>
            </v-col>
        </v-row>
        <v-row justify="center">
            <!-- <v-col v-if="tokenStore.getStatusApp != 'godMode'" cols="12" sm="12" md="2">
                <v-row>
                    <v-col cols="6" md="12">
                        <v-btn size="small" prepend-icon="mdi-cart" color="#dbd47cec" @click="addToCart(id, pictureType)">Ajouter</v-btn>
                    </v-col>
                    <v-col cols="6" md="12">
                        <v-btn size="small" prepend-icon="mdi-cart" color="#dbd47cec">Acheter</v-btn>
                    </v-col>
                </v-row>
            </v-col> -->
            <v-col cols="12" sm="12" md="6">

                <div class="clientPicture" style="position: relative; height: 40vh;  ">
                    <img oncontextmenu="return false;" style="position: absolute; object-fit:fill; left: 50%; top: 50%; transform: translate(-50%, -50%); " :src="url" />
                    <v-card class="mx-2 my-2 py-2 px-2" style="position: absolute;">
                            <v-icon size = "medium" icon="mdi-cart" start end title="ajouter au panier" @click="addToCart(id, pictureType)">
                                </v-icon>
                        <v-dialog v-model="dialog" width="1200">
                            <template v-slot:activator="{ props }">
                                <v-icon size="default" v-bind="props" icon="mdi-fullscreen" start end title="Agrandir">  
                                </v-icon>
                            </template>
                            <v-card>
                                <img class="image" :src="url" />
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    
                                    <v-btn prepend-icon="mdi-close" color="green-darken-1" variant="text" @click="dialog = false">
                                        Fermer
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card>
                    
                </div>

            </v-col>
        </v-row>
        <v-row justify="center">

        </v-row>
    </v-container>
    <v-dialog
      v-model="cookieDialog"
      width="auto"
    >

      <v-card>
        <v-card-text>
          Pour télécharger des photos, vous devez accepter les cookies. 
        </v-card-text>
        <v-card-actions class="text-center">
          <v-spacer></v-spacer>
          <v-btn prepend-icon="" color="primary"  @click="checkDialog(false)">Refuser</v-btn>
          <v-btn color="primary" @click="checkDialog(true)">Accepter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>

import { pictureService } from '@/../_services/picture.service';
import { productService } from '@/../_services/product.service';
import { useRoute } from "vue-router";
import { ref, onMounted, onBeforeMount } from 'vue';
import  { useCartStore }  from './../stores/cartStore';
import { cartService } from '@/../_services/cart.service';
import { useTokenStore } from '../stores/tokenStore';
import DOMPurify from 'dompurify';


// init 
const cookieDialog = ref(false);
const tokenStore = useTokenStore();
const snackbar = ref(false);
const snackText = ref("");
const cartStore = useCartStore();
const dialog = ref(false);
const route = useRoute();
let id = parseInt(route.params.id);
const url = ref(null)
const pictureName = ref('');
const pictureType = ref('');
const picturePrice = ref(null);



/**
 * hook : montage, on récupère les informations liées à la photographie. 
 */
onMounted( async() => {
    try {
    const response = await pictureService.getPictureById(id);
    const responseName = await pictureService.getPictureName(id);
    const responseType = await pictureService.getPictureType(id);
    url.value = DOMPurify.sanitize(response.data);
    pictureName.value = DOMPurify.sanitize(responseName.data);
    pictureType.value = DOMPurify.sanitize(responseType.data);
} catch(error) {
    console.error(error);
}
});


/**
 * Ajout de la photographie au panier.  
 * @param {int} id : id de la photographie
 * @param {int} idProduct : id du produit
 */
const addToCart = async(id, idProduct) => {

    if($cookies.get('acceptCookie') === 'true'){
        await getPrice(idProduct);
        let res = await cartService.addToCart(id);
        cartStore.addToCartLine(id, 1, picturePrice.value, url.value, pictureType.value, pictureName.value);
        let cart = localStorage.getItem('cart');
        snackbar.value = true;
    } else {
        cookieDialog.value = true;
    }
    
}

const checkDialog = (choice) => {
    if(choice){
        $cookies.set('acceptCookie', choice);
    } else {
        $cookies.set('acceptCookie', choice);
    }
    cookieDialog.value = false
}

const getPrice = async(idProduct) => {
        const price = await productService.getProductPriceById(idProduct);
        picturePrice.value = price.data;
        console.log(picturePrice.value);
    }




</script>

<style lang="scss">

// #fullPicture{
//     transform: scale(1);
//     transition: transform 0.8s ease;

//     &:active{
//         transform: scale(1.3);
//     }

// }

.clientPicture{
    box-shadow: 5px 5px 20px;
}



</style>