<template>

    <v-snackbar color="success" v-model="snackbar" multi-line timeout="2000" location="top">{{ cartStore.getSnack }}
            <template v-slot:actions>
                <v-btn
                    variant="text"
                    @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    <v-card>
        <v-toolbar title="Mon panier"></v-toolbar>
        <v-card-text>

            <v-table>
                <thead>
                    <tr>
                        <th class="text-left text-center align-middle">
                            Aperçu
                        </th>
                        <th class="text-left text-center align-middle">
                            Identifiant
                        </th>
                        <th class="text-left text-center align-middle">
                            Prix
                        </th>
                        <th class="text-left text-center align-middle">
                            Quantité
                        </th>
                        <th   class="text-left text-center align-middle">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="item in cartValue">
                        <td><v-img style="cursor : pointer" :src="item.url" class="my-2"
                                @click="seePicture(item.idPicture)" link /></td>
                        <td class="text-center align-middle">{{ item.pictureName }} </td>
                        <td class="text-center align-middle" >{{ item.price }} €</td>
                        <td class="text-center align-middle"> <v-icon @click="updateQuantityCart(item.idPicture, 'less')" size="small"
                                icon="mdi-minus-circle-multiple" hidden></v-icon> {{ item.quantity }}
                            <v-icon @click="updateQuantityCart(item.idPicture, 'more')" size="small"
                                icon="mdi-plus-circle-multiple" hidden></v-icon>
                            <!-- <v-icon @click="trashItemFromCart(item.idPicture)" size="small" icon="mdi-trash-can"
                                class="ml-1"></v-icon> -->
                        </td>
                        <td class="text-center align-middle" > <v-icon @click="trashItemFromCart(item.idPicture)" size="small" icon="mdi-trash-can"
                                class="ml-1"></v-icon></td>
                    </tr>
                    <tr >
                        <td colspan="4"></td>
                        <td class="pa-4">
                            <strong>total : {{ cartStore.getTotal }} € TTC</strong>
                        </td>
                    </tr>
                    <tr v-if="checkDiscounts()" >
                        <td colspan="4" class="pa-4">
                            <strong>{{ cartStore.getDiscountComment }}</strong>
                        </td>
                        <td colspan="4" class="pa-4">
                            <strong> - {{ cartStore.getTotal - cartStore.getTotalWithDiscount }}€ </strong>
                        </td>
                    </tr>
                    <tr v-if="checkDiscounts()" >
                        <td colspan="4"></td>
                        <td class="pa-4">
                            <strong>total : {{ cartStore.getTotalWithDiscount }}€ TTC</strong>
                        </td>
                    </tr>
                </tbody>
            </v-table>

        </v-card-text>
        <v-card-actions v-if="!checkPath()" class="justify-end">
            <v-btn v-if="!checkPath()" variant="text" @click="$emit('closeCart', closeCart)">fermer</v-btn>
            <v-btn variant="text" @click="trashCart(), $emit('closeCart', closeCart)">Vider Panier</v-btn>
            <v-btn variant="text" @click="makeOrder">Valider Panier</v-btn>
    </v-card-actions>
</v-card>
</template>


<script setup>

import { useCartStore } from './../stores/cartStore';
import { ref, onMounted, onBeforeUpdate } from 'vue';
import { orderService } from '@/../_services/order.service';
import { pictureService } from '@/../_services/picture.service';
import { cartService } from '@/../_services/cart.service';
import { discountService } from '@/../_services/discount.service';
import VueCookies from 'vue-cookies'
import { useRouter } from 'vue-router';

// au montage du composant, récupération des bons de réduction

onMounted( () => {
    getDiscounts();
    checkDiscounts();
    
})

onBeforeUpdate( () => {
    getDiscounts();
    checkDiscounts();
})

// déclaration de l'évéènement de fermeture de v-snackbar
const emit = defineEmits(['closeCart']);

const closeCart = ref(false);

const router = useRouter();

// instanciation du magasin
const cartStore = useCartStore();
const  cart = ref([]);

const props = defineProps({
    cartValue : Object,
    default: 'No Content'
})

// instanciaition du conteneur contenant les réductions 
const discountTab = ref([]);
// snackar
const snackbar = ref(false);
//sanckText 
const snackText = ref("");
// l'url de la picture 
const pictureUrl = ref("");
// picture ( string ) 
const picture = ref("");

// fonction de récuparation de cart du Store 
const getCart = () => {
    cart.value = cartStore.getCart;
}

// mise à jour du panier,  ne fonctionne pas avec les photos à télecharger
const updateQuantityCart = (id, option) => {
    cartStore.updateQuantity(id, option);
    snackText.value = "Panier mis à jour!"
    snackbar.value = true; 
}

// obligé de mettre une compute dici, car le template est chargé avant le script. 
const checkDiscounts = () => {
    return cartStore.getDiscount.length > 0;
}

/**
 * 
 * @param {*}
 */
const getDiscounts = () => {
    // Si la liste discoutn est dans le localStorage alors on la charge
    const discountTabFromLocalStorage = localStorage.getItem('discountTab');
  if (discountTabFromLocalStorage) {
    discountTab.value = JSON.parse(discountTabFromLocalStorage);
    cartStore.setDiscountTab(discountTab.value);
  } else {
    // sinon on effectue la requête axios  
    discountService.getDiscount()
    .then( (res) => {
        console.log(res.data);
        discountTab.value = res.data
        localStorage.setItem('discountTab', JSON.stringify(discountTab.value));
        cartStore.setDiscountTab(discountTab.value);
    })
    .catch( (err) => {
        console.log(err);
    })
}
}

// visualisation de la photo 
const seePicture = (id) => {
    router.push('/picture/' + id)
}

// récupération de photo via so, id 
const getPictureUrl = (id) => {
    pictureService.getPictureById(id)
    .then( (response) => {
        pictureUrl.value = response.data;
    })
    .catch( (error) => {
        console.log(error);
    })
}

// suppression du panier 
const trashItemFromCart = (id) =>{
    if(confirm('Supprimer cette photo du panier ?')){
        
        cartStore.trashItemFromCart(id);
        cartService.deleteCartLine(id)
        .then( (res) => { console.log(res)})
        .catch( (err) => { console.log(err)});
        snackText.value = "Photo Supprimée avec succès!"
        snackbar.value = true;
    }
}

//vider le panier 
const trashCart = () => {
    if(confirm('vider le panier ?')){
        // suppression du panier frontEnd
        if(cartStore.getCart.length >  0){
            cartStore.trashCart();
            // suppression du panier backEnd
        
        cartService.deleteToCart()
        .then( (res) => {
            console.log(res);
            // $cookies.remove('cartId');
        })
        .catch( (err) => {
            console.log(err);
        });
        snackText.value = "Panier vidé avec succès!"
        snackbar.value = true;
        } else {
            alert('Votre panier est déja vide!');
        }
        

        
        
    }
}
// vérification du params ' name de l'url'
const checkPath = () => {
    return router.currentRoute.value.name === 'order';
}

/**
 * Fontion de commande
 * Renvoie vers la route de commande 
 */
const makeOrder =  () => {
    // orderService.makeOrder()
    // .then( res => console.log(res))
    // .catch( err => console.log(err))
    if(cartStore.getCart.length < 1) {
        alert('Votre panier est vide');
    } else {
        router.push('/order');
    }
    
}
</script>