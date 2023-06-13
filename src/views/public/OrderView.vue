<template>
    <v-container class="container">
            <div class="h2 mb-4 text-center">Je passe ma commande</div>
            <v-divider></v-divider>
            <div class="h3 mb-5" >Récapitulatif de mon panier : </div>
            <Cart :cartValue="cart" />
            <v-divider></v-divider>
           
              <v-card v-if="!userId || !hasAdress">
                <v-card-title>
                  <h3 class="mb-5 text-center">adresse de facturation :</h3>
                </v-card-title>
                <v-card-text>
                  <v-form id="form" v-model="valid" ref="form">
                    <v-text-field v-model="address.name" :rules="basicRules" counter="20" label="Intitulé de l'adresse" required></v-text-field>
                    <v-text-field v-model="address.firstname" :rules="basicRules" counter="20" label="Prénom" required></v-text-field>
                    <v-text-field v-model="address.lastname" :rules="basicRules" counter="20" label="Nom" required></v-text-field>
                    <v-text-field v-model="address.company" counter="20" label="société"></v-text-field>
                    <v-text-field v-model="address.address" :rules="basicRules" counter="20" label="rue" required></v-text-field>
                    <v-text-field v-model="address.postal" :rules="basicRules" counter="20" label="code postal" required></v-text-field>
                    <v-text-field v-model="address.city" :rules="basicRules" counter="20" label="Ville" required></v-text-field>
                    <v-text-field v-model="address.country" :rules="basicRules" counter="20" label="Pays" required></v-text-field>
                    <v-text-field v-model="address.phone" :rules="phoneRules" counter="20" label="téléphone"></v-text-field>
                  </v-form>
                </v-card-text>
              </v-card>
      <v-btn color="success" @click="makeOrdered" :disabled="!cartContent() || !valid">Passer la commande</v-btn>
    </v-container>
</template>


<script setup>


import Cart from '@/components/Cart.vue';
import { useCartStore } from '@/stores/cartStore';
import { useTokenStore } from '@/stores/tokenStore';
import { orderService } from '@/../_services/order.service';
import { addressService } from '@/../_services/address.service';
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { utils } from '@/utils/functions';
import { useMeta } from 'vue-meta';

useMeta( {
  title: 'page de commande',
  htmlAttrs: { lang: 'fr', 
  amp: true,
  charset: "utf8"
 },
 description: [
    {
      content: "Page de commande",
    },
  ],
  // meta :[
  //   {

  //    'http-equiv': 'Content-Security-Policy',
  //     content: "script-src 'self' https://js.stripe.com 'unsafe-inline';"
  //   },
  // ]
})




onMounted( () => {
  checkUserAddress(userId)
})

const secretStripe = import.meta.env.VITE_SECRET_STRIPE;

console.log(secretStripe)
const stripe = new Stripe(secretStripe);

const name = ref("");
const valid =  ref(true);
const hasAdress = ref(true);


const basicRules = [
          v => !!v || "Ce champs ne peut pas être vide!",
          v => !/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/.test(v) || "les caractères spéciaux sont interdits",
          v => ( v.length <= 20 ) || 'Name must be less than 20 characters',
        ]


const phoneRules = [
          v => /^\d{2}\/\d{2}\/\d{2}\/\d{2}\/\d{2}$/.test(v) || "le téléphone doit respecter le formalisme ../../../../..",
          v => ( v.length <= 20 ) || 'Name must be less than 20 characters',
        ]

const cartStore = useCartStore();
const tokenStore = useTokenStore();

const router = useRouter();

// récupération du panier en cours
let cart = cartStore.getCart;

const discount = cartStore.getDiscount;


// récupération de l'id de l'utilisateur connecté 
let userId = tokenStore.getTokenId();

// déclaration des props réactives du formulaires 
let address = reactive({
  name : "",
  firstname: "",
  lastname:"",
  company : "",
  address : "",
  postal: "",
  city: "",
  country: "",
  phone : ""
})

// for ( let item of Object.keys(address)){
//   console.log(item)
// }

// cleanUP adress object : 

const cleanUpAddress = () => {
  let cleanAddress = {};

  for (let item in address){
    cleanAddress[item] = utils.cleanUp(utils.htmlSpecialChars(address[item]))
  }

  return cleanAddress
}


// console.log(cart)

// vérifier si lu user à une adresse 
const checkUserAddress = (userId) => {
  console.log(userId) 
  addressService.getAddressByUserId(userId)
  .then( res => {
    console.log(JSON.parse(res.data))
    if(JSON.parse(res.data) === null){
      console.log('ici');
      hasAdress.value = false
    }
  })
  .catch( err => console.log(err))
}


// Si le panier est vide, le bouton est désactivé
const cartContent = () => {
  return cart.length > 0;
}

// fonction de commande, requete non effectuée si le panier est vide. 
const makeOrdered = () => {
  // atention ! le formdata doit être déclaré dans la fonction fléchée !!
  // vérifier si l'utilisateur est connecté 
    
    // instanciation d'un nouvel objet formData
    let formdata = new FormData();

    // on passe le userId, le panier, le total au formData
    formdata.append('userId', userId);
    formdata.append('cart', JSON.stringify(cart));
    formdata.append('total', cart.getTotal);
    formdata.append('currentDiscount', JSON.stringify(discount));
    formdata.append('address', JSON.stringify(cleanUpAddress()));
    
    if (cart.length > 0) {

      orderService.makeOrder(formdata)
        .then((res) => {
          cartStore.trashCart();
          // window.location.replace(res.data);
          // res.redirect(res.data)
          // window.open(res.data, '_blank');
          // $cookies.remove('cartId')
          console.log(res.data);
         
          stripe.redirectToCheckout({
            sessionId: res.data
          });
        }
        )
        .catch((err) => {
          console.log(err);
          if (errorStatus == 404) {
            alert(error.message);
            router.push({ 'name': 'user-dashboard' })
          }
        }
        );
    } else {
      alert('Votre panier est vide !');
    }
}




</script>