<!-- <template>
    <div>
        <PublicNav/> 
    </div>
        
</template>


<script setup>

import PublicNav from '../../components/PublicNav.vue'

</script> -->

<template>
    <div class="pt-5" >
        <!-- <v-row class="d-flex flex-row justify-content-center mt-2 " >
            <div class="mx-10">
                <img src="logoCanva3.png"  />
            </div>
                    
        </v-row> -->
        <!-- <v-snackbar color="success" v-model="snackbar" multi-line timeout="2000" location="top">{{ snackText }}
            <template v-slot:actions>
                <v-btn
                    variant="text"
                    @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar> -->
        <!-- <v-divider></v-divider> -->
        <v-row v-if="isDesktop" class="text-center custom-titles">
            <v-col  cols="2" >
                <v-list-item link >Albums Photos</v-list-item>  
            </v-col>
             <v-col cols="2">
                <v-list-item link>Cartes Cadeaux</v-list-item>
            </v-col> 
            <v-col cols="2" >
                <v-list-item link>Boutique d'impression</v-list-item>
            </v-col> 
            <v-col cols="2">
                <v-list-item link>Tarifs / infos</v-list-item>
            </v-col>
            <v-col cols="2">
                <v-list-item link>Contact</v-list-item>
            </v-col>
            <v-col cols="2">
                <v-dialog v-model="showCart" transition="dialog-bottom-transition" width="auto">
                    <template v-slot:activator="{ props }">
                        <v-list-item @click="getCart()" v-bind="props">Panier</v-list-item>
                    </template>
                    <template v-slot:default="{ isActive }"> 
                         <Cart :cartValue="cart" @closeCart="showCartChange" /> 
                     </template> 
                 </v-dialog>
            </v-col> 
        </v-row>
        <v-row class="text-center custom-font" v-else>
            <v-col cols="3">
                <v-list-item link><v-icon size="x-large">mdi-camera</v-icon></v-list-item>
            </v-col>
            <v-col cols="3">
                <v-list-item link><v-icon size="x-large" class="pb-1" >mdi-gift</v-icon></v-list-item>
            </v-col>
            <v-col cols="3">
                <v-list-item link><v-icon  size="x-large">mdi-store</v-icon></v-list-item>
            </v-col>
            <v-col cols="3">
                <v-dialog v-model="showCart" transition="dialog-bottom-transition" width="auto">
                    <template v-slot:activator="{ props }">
                        <v-list-item @click="getCart()" v-bind="props"><v-icon  size="x-large">mdi-cart</v-icon></v-list-item>
                    </template>
                    <template v-slot:default="{ isActive }"> 
                       <Cart :cartValue="cart" @closeCart="showCartChange" /> 
                    </template> 
                </v-dialog>
            </v-col>
        </v-row>
        <v-divider class="mb-5"></v-divider>
        <router-view />
    </div>
</template>


<script setup>

import { useCartStore } from '@/stores/cartStore';
import { ref, onMounted, onBeforeMount } from 'vue';
import { orderService } from '@/../_services/order.service';
import { pictureService } from '@/../_services/picture.service';
import { useRouter } from 'vue-router';
import  Cart  from '@/components/Cart.vue';
import { checkScreenSize } from '@/composables/screen';

// const isDesktop = ref(window.innerWidth >= 768);

// onMounted( () => {
//     window.addEventListener( 'resize', () => {
//         if (window.innerWidth > 821){
//             isDesktop.value = true;
//         } else {
//             isDesktop.value = false;
//         }
//     })
// })



const { isDesktop } = checkScreenSize();

const router = useRouter();

const cartStore = useCartStore();
const  cart = ref([]);


// const snackbar = ref(false);
// const snackText = ref("");
const pictureUrl = ref("");

const showCart = ref(false);


// const picture = ref("");

const getCart = () => {
    cart.value = cartStore.getCart;
    showCart.value = true;
}

// const updateQuantityCart = (id, option) => {
//     cartStore.updateQuantity(id, option);
//     snackText.value = "Panier mis à jour!"
//     snackbar.value = true;
// }

const showCartChange = (value) =>{
    showCart.value = value;
}


// const seePicture = (id) => {
//     router.push('/picture/' + id)
// }

// const getPictureUrl = (id) => {
//     pictureService.getPictureById(id)
//     .then( (response) => {
//         pictureUrl.value = response.data;
//     })
//     .catch( (error) => {
//         console.log(error);
//     })
// }

// const trashItemFromCart = (id) =>{
//     if(confirm('Supprimer cette photo du panier ?')){
//         cartStore.trashItemFromCart(id);
//         snackText.value = "Photo Supprimée avec succès!"
//         snackbar.value = true;
//     }
// }

// const makeOrder =  () => {
//     orderService.makeOrder()
//     .then( res => console.log(res))
//     .catch( err => console.log(err))
// }
</script>

<style>


</style>