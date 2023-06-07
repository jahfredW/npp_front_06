<!-- Commandes de l'utilisateur -->

<template>    
    <v-row>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        :width="dialogWidth"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            class="custom-button mx-13"
            v-bind="props"
          >Mes commandes</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
        <v-card elevation="20" >
            <v-card-text v-if="userOrder.length > 0">
                <v-list v-for="order in userOrder">
                    <div class="d-flex d-row justify-content-between mx-5">
                        <div>
                            <p>Commande du : {{  order.createdAt.split('T')[0].split('-').reverse().join('-') }}</p>
                            <p>Status : {{ order.status }}</p>
                          
                        </div>
                        <div v-if="!statusActivating(order.status) && !expiredSession(order.createdAt)"  >
                            <v-btn color="info" @click="sessionRetrieve(order.stripe_id)"  >Payer ma commande</v-btn>
                        </div>
                     
                        <div v-else-if="expiredSession(order.createdAt) && order.status !== 'done'">
                            <v-alert type="warning">Commande abandonnée</v-alert>
                        </div>
                        <!-- <div>
                            <v-btn color="success" @click="redirectDownload(order.id)" :disabled="!statusActivating(order.status)" >Télécharger les photos</v-btn>
                        </div>
                        <div>
                            <v-btn color="success" @click="redirectDownload(order.id)" :disabled="!statusActivating(order.status)" >Editer une facture</v-btn>
                        </div> -->
                        <div v-else>
                            <v-menu open-on-hover  :close-on-content-click="true" location="top" >
                            <template  v-slot:activator="{ props }">
                                <v-btn class="custom-button" prepend-icon="mdi-gesture-tap-button" v-bind="props" link>
                                    Actions
                                </v-btn>
                            </template>
                            <v-list>
                                <div>
                                    <v-list-item v-for="item in items" :key="item.title" @click="selectItem(item, order.id)">
                                        <v-btn :prepend-icon="item.icon" :color="item.color" >{{ item.title }} </v-btn>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </v-menu>
                        </div>
                        
                        
                    </div>
                    <v-divider></v-divider>
                </v-list>
            </v-card-text>
            <v-card-text v-else>
                <div class="h5">Aucune commande pour le moment</div>
            </v-card-text>
        </v-card>
    </template>
      </v-dialog>
    </v-col>
   
    </v-row>
    
</template>

<!-- <template>    
    <div class="h3 mt-4 mb-10">Mes Commandes : </div>
    <v-row>
        <v-col cols="12">
        <v-card elevation="20" >
            <v-card-text v-if="userOrder.length > 0">
                <v-list v-for="order in userOrder">
                    <div class="d-flex d-row justify-content-between mx-5">
                        <div>
                            <p>Commande du : {{  order.createdAt.split('T')[0].split('-').reverse().join('-') }}</p>
                            <p>Status : {{ order.status }}</p>
                        </div>
                        <div v-if="!statusActivating(order.status)">
                            <v-btn color="info" @click="sessionRetrieve(order.stripe_id)"  >Payer ma commande</v-btn>
                        </div>
                         <div>
                            <v-btn color="success" @click="redirectDownload(order.id)" :disabled="!statusActivating(order.status)" >Télécharger les photos</v-btn>
                        </div>
                        <div>
                            <v-btn color="success" @click="redirectDownload(order.id)" :disabled="!statusActivating(order.status)" >Editer une facture</v-btn>
                        </div> 
                        <v-menu open-on-hover  :close-on-content-click="true" location="top" >
                            <template  v-slot:activator="{ props }">
                                <v-btn class="custom-button" prepend-icon="mdi-gesture-tap-button" v-bind="props" link>
                                    Actions
                                </v-btn>
                            </template>
                            <v-list>
                                <div>
                                    <v-list-item v-for="item in items" :key="item.title" @click="selectItem(item, order.id)">
                                        <v-btn :prepend-icon="item.icon" :color="item.color" >{{ item.title }} </v-btn>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </v-menu>
                        
                    </div>
                    <v-divider></v-divider>
                </v-list>
            </v-card-text>
            <v-card-text v-else>
                <div class="h5">Aucune commande pour le moment</div>
            </v-card-text>
        </v-card>
    </v-col>
    </v-row>
    
</template> -->


<script setup>

import { orderService } from  './../../_services/order.service';
import { stripeService } from  './../../_services/stripe.service';
import { ref, onMounted, onUpdated, onBeforeUnmount,  toRefs} from 'vue';
import { useRouter } from 'vue-router';
import { useTokenStore } from '../stores/tokenStore';

const router = useRouter();
const dialogRef = ref()
const store = useTokenStore();
const userId = store.getTokenId();
const dialogWidth = ref('75vw')
const orderCreatedAt = ref('');

let userOrder = ref([]);

// prop réactive info, liée aux propriétés hérités
// Permet de se servir des props dans le script. 
const { info } = toRefs(props);

// props hérité de la vue dashboardUser - commandes
const props = defineProps({
    info : Object,
    default: 'No Content'
})

// méthode de redirection vers le téléchargement des phtoos commandées 
const redirectDownload = (id) => {
    router.push("/downLoadBlob/" + id )
}

/**
 * 
 * @param {string} createdAt
 */
const expiredSession = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const now = Date.now();
    const diffInHours = (now - createdAtDate) / (1000 * 60 * 60);

    console.log(diffInHours);

    if( diffInHours > 24){
        
        return true;
    }

    return false;

}



// méthode de redirection vers l'édition de facture 
const redirectInvoice = (orderId) => {
    router.push("/auth/invoice/" + orderId)
}

/**
 * méthode de récupération de l'url de la session Stripe. 
 * 
 * @param {string} stripeId : Id de session Stripe 
 * @return {string} res.data : Redirection vers URL 
 *
 */

const sessionRetrieve = (stripeId) => {
    stripeService.sessionRetrieve(stripeId)
    .then( (res) => {
        console.log(res);
        window.location.assign(res.data);
    })
    .catch( (err) => console.log(err))
    console.log(userId);
}


// Hook -> executé le méthode getCLient Order qui permet de récupérer 
// la commande du client. 
onUpdated( () => {
    window.addEventListener('resize', getWidth);
    getWidth();
    console.log(window.innerWidth)
    getCLientOrder();
});

onMounted(() => {
    // récupération de la commande du client
    getCLientOrder();
    window.addEventListener('resize', getWidth);
    // On appelle la fonction getWidth une pemrière fois afin de s'assurer que la largeur est mise à jour au premier rendu
    getWidth();
    
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', getWidth);
});

// méthode de récupération de la commande du client
const getCLientOrder = () => {
    console.log(info.value.id);
    orderService.getOrder(info.value.id)
    .then( (response) => {
        console.log(response)
        userOrder.value = response.data;
    })
    .catch( error => console.log(error))
}

// vérifie le status de la commande 
const statusActivating = (statusOrder) => {
    return statusOrder === "done";
}

const items = [
    { id : 1, title : "Télécharger", icon :"mdi-pen", color : "success" }, 
    { id : 2, title : "Facture", icon :"mdi-folder-plus-outline", color : "yellow" }, 
]

const publicItem = { title : "Consulter", icon : "mdi-eye", color : "success" };

const selectItem = (item, orderId) => {
  console.log(`Selected ${item.title}`);
  if(item.id === 1){
    try {
        redirectDownload(orderId);
    } catch (error) {
        alert('Une erreur est survenue')
        router.push('/');
    }
    
  }
  else if(item.id === 2){
    try {
        redirectInvoice(orderId);
    } catch (error) {
        alert('Une erreur est survenue')
        router.push('/');
    }
  }
};

const getWidth = () => {
    const width = window.innerWidth;
    console.log(width);
    console.log(dialogWidth.value)
  if (width <= 768) {
    dialogWidth.value = '90vw';
    console.log('hello');
  } else if (width <= 1024) {
    dialogWidth.value = '80vw';
    
  } else {
    dialogWidth.value = '50vw';
  }
};




</script>