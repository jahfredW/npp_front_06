<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | NPP Photographies` : `NPP Photographies` }}</template>
  </metainfo>
  <v-app id="inspire">
    
    <v-navigation-drawer class="custom-titles" v-if="tokenStore.getStatusApp === 'godMode' "  v-model="drawer" style="background-color: #131720;" >
      <v-list>
        <v-list-item v-for="(item, i) in headItems" :key="i" :value="item" class="draw" link>
          <v-row class="d-flex flex-row">
          <v-col cols="9">
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-col>
          <v-col cols="3" class="text-center">
            <v-icon>mdi-surf</v-icon>
          </v-col>
          </v-row>
      </v-list-item>
      <v-divider style="color: white;"></v-divider>
              <v-menu v-for="(menu, i) in menuTitles"  :key="i" open-on-hover :close-on-content-click="true" location="end" >
                <template  v-slot:activator="{ props }">
                  <v-list-item 
                 
                   append-icon="mdi-chevron-right"
                   class="draw"
                     v-bind="props
                     "  link>
                  <v-list-item-title  v-text="menu.title" ></v-list-item-title>
                  </v-list-item>
                </template>
                <v-list class="draw">
                  <div  class= "draw draw__pop">
                    <v-list-item v-if="i === 0" v-for="item in adminAlbumItems" :key="item.title" @click="selectItem(item)"  link :to="item.to">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-else-if="i === 1" v-for="(item, j) in cartesCadeaux" :key="j" @click="selectItem(item)">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-else v-for="(item, k) in onlineShop" :key="k" @click="selectItem(item)">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  </div>
                </v-list>
              </v-menu>
            <v-divider style="color: white;"></v-divider>
            <!-- <v-menu open-on-hover :close-on-content-click="true" location="end" >
                <template  v-slot:activator="{ props }">
                  <v-list-item append-icon="mdi-chevron-right" class="draw" v-bind="props"  link>
                    <v-list-item-title >Commandes</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list class="draw" >
                  <div  class= "draw draw__pop">
                    <v-list-item v-for="item in items" :key="item.title" @click="selectItem(item)">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  </div>
                </v-list>
            </v-menu> -->
            
            <v-menu open-on-hover :close-on-content-click="true" location="end" >
                <template  v-slot:activator="{ props }">
                  <!-- <v-list-item  class="draw" to="/auth/dashboard"  link>
                    <v-list-item-title link >Mon Espace perso</v-list-item-title>
                  </v-list-item> -->
                  <v-list-item append-icon="mdi-chevron-right" class="draw" v-bind="props"  link>
                    <v-list-item-title >Gestion</v-list-item-title>
                  </v-list-item>
                </template>
                <v-list class="draw" >
                  <div  class= "draw draw__pop">
                    <v-list-item v-for="item in adminItems" :key="item.title" @click="selectItem(item)" :to="item.to">
                      <v-list-item-title class="custom-font">{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  </div>
                </v-list>
            </v-menu>
            <v-divider style="color: white;"></v-divider>
            <v-list-item  prepend-icon="mdi-login" class="draw" @click="disconnect()" link>
                <v-list-item-title >Deconnexion</v-list-item-title>
            </v-list-item>  
      </v-list>
      
    </v-navigation-drawer>

    <!-- *************************Public layout********************************************************************* -->
    <v-navigation-drawer class="custom-titles" v-else  v-model="drawer" style="background-color: #131720;" >
      <v-list>
        <v-list-item v-for="(item, i) in publicHeadItems" :key="i" :value="item" class="draw" :to="item.to" link>
          <v-row class="d-flex flex-row">
          <v-col cols="9">
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-col>
          <v-col cols="3" class="text-center">
            <v-icon>mdi-surf</v-icon>
          </v-col>
          </v-row>
      </v-list-item>
      <v-divider style="color: white;"></v-divider>
              <v-menu v-for="(menu, i) in publicMenuTitles"  :key="i" open-on-hover :close-on-content-click="true" location="end" >
                <template  v-slot:activator="{ props }">
                  <v-list-item 
                 
                   append-icon="mdi-chevron-right"
                   class="draw"
                     v-bind="props
                     "  link>
                  <v-list-item-title  v-text="menu.title" ></v-list-item-title>
                  </v-list-item>
                </template>
                <v-list class="draw">
                  <div  class= "draw draw__pop">
                    <v-list-item v-if="i === 0" v-for="item in items" :key="item.title" @click="selectItem(item)"  link :to="item.to">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  <!-- <v-list-item v-else-if="i === 1" v-for="(item, j) in photoItems" :key="j" @click="selectItem(item)">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item> -->
                  <v-list-item v-else-if="i === 1" v-for="(item, k) in cartesCadeaux" :key="k" @click="selectItem(item)">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-else v-for="(item, l) in onlineShop" :key="l" @click="selectItem(item)">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  </div>
                </v-list>
              </v-menu>
            <div v-if="tokenStore.getStatusApp === 'userMode'">
              <v-divider style="color: white;"></v-divider>
              <!-- <v-menu open-on-hover :close-on-content-click="true" location="end" >
                <template  v-slot:activator="{ props }"> -->
                  <v-list-item  class="draw" to="/auth/dashboard"  link>
                    <v-list-item-title link >Mon Espace perso</v-list-item-title>
                  </v-list-item>
              
            
          
            </div>
            
            <v-divider style="color: white;"></v-divider>
            <a href="mailto:npp@gmail.com" style="color: white;">
            <v-list-item append-icon="mdi-chevron-right" class="draw"  link>
                    <v-list-item-title >Contact</v-list-item-title>
            </v-list-item>
          </a>
                  <v-divider style="color: white;"></v-divider>
            <v-list-item v-if="tokenStore.getStatusApp === 'public'" prepend-icon="mdi-account-plus-outline" append-icon="mdi-chevron-right" class="draw" to="/signup"  link>
                <v-list-item-title  >Inscription</v-list-item-title>
            </v-list-item>  
            <v-list-item v-if="tokenStore.getStatusApp === 'public'" @click="connect()" prepend-icon="mdi-login" append-icon="mdi-chevron-right" class="draw">
                <v-list-item-title >Connexion</v-list-item-title>
            </v-list-item>  
            <v-list-item v-else prepend-icon="mdi-login" class="draw" @click="disconnect()" >
                <v-list-item-title >Deconnexion</v-list-item-title>
            </v-list-item>  
            
      </v-list>
    </v-navigation-drawer>
    <v-app-bar id="app-bar" location="top" >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title >Menu</v-toolbar-title>
    </v-app-bar>
    <v-main id="main" class="custom-lato">
      <div class="my-5 text-center" v-if="isDesktop" >
          <img  src="@/assets/images/logoCanva3.png" style="width: 50%;"  />
      </div>
      <div class="my-5 text-center" v-else-if="isTablette" >
          <img  src="@/assets/images/logo.png" style="width: 25%;"  />
      </div>
          <v-alert v-if="alert === true"
          v-model="alert"
          density="compact"
          type="warning"
          title="Déconnexion"
          text="Vous êtes déconnecté"
  ></v-alert>
      <router-view :key="$route.fullPath" />
      <!-- <v-divider class="mt-15"></v-divider> -->
      <div class="loading d-flex flex-column align-items-center" v-if="loading">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <p>Chargement</p>
    </div>
    </v-main>
    <div id="footer" class="d-flex flex-row justify-content-center mt-10">
      <div>
        <v-btn
          v-for="icon in icons"
            :key="icon"
              class="mx-4"
              :icon="icon"
              variant="plain"
        ></v-btn>
      </div>
    </div>
    
    
  </v-app>
  
</template>

<script setup>
// utilisation de la composition API
// plus besoin d'export default ni de variables

// importation du magasin et des éléments de l'APi composition
import { useTokenStore } from '@/stores/tokenStore.js'
import { useCartStore } from '@/stores/cartStore.js'
import { ref, onMounted, onUpdated } from 'vue';
import { discountService} from '@/../_services/discount.service';
import Axios from '../_services/caller.service';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { checkScreenSize } from '@/composables/screen.js';


const { isDesktop, isMobile, isTablette } = checkScreenSize();

useMeta( {
  title: 'page d\'accueil',
  htmlAttrs: { lang: 'fr', 
  amp: true,
  charset: "utf8"
 },
 description: [
    {
      content: "Page d'accueil du site",
    },
  ],
  meta :[
    {
     property: 'og:title' ,
     content: 'Page d\'accueil'
    },
  ]
})


const userId = ref(null)
const alert = ref(false);


const discounts = ref([]);

onMounted( async() => {
    
    userId.value = tokenStore.getTokenId();
    try {
      const discount = await discountService.getDiscount();
      localStorage.setItem('discountTab', JSON.stringify(discount.data));
    discounts.value = discount.data;
    } catch (error) {
      console.log(error);
    }
    // console.log(discount.data);
    
    alert.value = false;
    console.log(userId.value);
    // window.addEventListener('resize', isDesktop )
    console.log(tokenStore.getStatusApp);
    cartStore.getDiscount;
    console.log('ici');
    // isDesktop();
  
})

onUpdated( async() => {
  const discount = await discountService.getDiscount();
})


// const isDesktop = () => {
//   const width = window.innerWidth;
//   console.log(width);
//   if(width <= 768){
//     showLogo.value = false;
//   } else {
//     showLogo.value = true;
//   }
  
// }

const router = useRouter();

const menuTitles = [
  { title: 'Albums' },
  // { title: 'Mes photos'},
  { title: 'Cartes Cadeaux' },
  { title: 'Boutique en Ligne' },
]

const userAccountItems = [
  { title: 'Mes infos', to: "/auth/dashboard" },
  { title: 'Mes commandes' },
  { title: 'Mon Panier'},
  { title: 'Mes points fidélités'},
]

const publicMenuTitles = [
{ title: 'Albums Photos' },
  // { title: 'Photos'},
  { title: 'Cartes Cadeaux' },
  // { title: 'Boutique en Ligne' },
]

const photoItems = [
  { title: 'rechercher des photos'},
  { title: 'toutes les photos'}
]

const cartesCadeaux = [
{ title: 'Acheter une carte cadeau' },
  { title: 'Mes cartes cadeaux' },
]

const onlineShop = [
  { title : 'Consulter la boutique'},
]

const items = [
  { title: 'Consulter les albums', to: '/album' },
];

const adminAlbumItems = [
  { title: 'Consulter les albums', to: '/album' },
  { title: 'Liste des albums', to: '/admin/album/list' },
  { title: 'Ajouter un album', to: '/admin/album/create' },
  { title: 'Gérer les types', to: '/admin/album/types' },
  { title: 'Gérer les catégories', to: '/admin/album/catégories' },
];

const adminItems = [
  { title: 'Utilisateurs', to: '/admin/users'},
  // { title: 'Albums', to: '/admin/albums/gestion'},
  // { title: 'Categ', to: '/admin/invoices'},
  { title: 'Réductions', to: '/admin/discounts'},

]

const menu = ref(true);

const selectItem = (item) => {
  console.log(`Selected ${item.title}`);
 menu.value = false;
};



// ref -> propriété réactive
const pseudo = ref('');
const drawer = ref(null);
const loading = ref(false);
const progress = ref(0);



const headItems = [
  { text: 'Accueil', icon : 'mdi-surfing', to: '/'}, {text: 'Activité'}
]

const publicHeadItems = [
  { text: 'Accueil', icon : 'mdi-surf', to: '/'}
]

const bodyItems = [
  { text: "Gestions des Albums", icon: 'mdi-folder-google-drive' },
]

const icons = [
'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
]

// instanciation du magasin

const tokenStore = useTokenStore();


const cartStore = useCartStore();

// cartStore.setDiscountTab(discounts.value);
    // Si un token est dans le localStorage on le parse Important ici en cas de refresh !! 
if(tokenStore.getLocalToken){
  tokenStore.getTokenValidity()
        // On en deduit l'état de l'application
  let statusApp = tokenStore.getStatusApp;
        // si status expiré, on remove le token et on redirige
        if (statusApp === "expired"){
            alert('Session expirée, vous devez vous reconnecter');
            localStorage.removeItem('token');
            router.push('/');
        }
        
    } 

const disconnect = () => {
  cartStore.trashCart();
  tokenStore.disconnect();
  alert.value = true;
  setTimeout( () => {
    alert.value = false;
  }, 2000)
  router.push('/');
}

const connect = () => {
  cartStore.trashCart();
  router.push('/login');
}



// Utilisation de axios interceptor pour afficher le loader 
Axios.interceptors.request.use(
    config =>  {
      console.log('request')
      // Afficher le loader global
      loading.value = true;
      return config;
    },
    function (error) {
        console.log('erreur')
      return Promise.reject(error);
    }
  );
  
  Axios.interceptors.response.use(
    function (response) {
      // Cacher le loader global
      loading.value = false;
      progress.value = 0;
      return response;
    },
    function (error) {
      // Cacher le loader global
      loading.value = false;
      return Promise.reject(error);
    }
  );


</script>

<style lang="scss">
@import "@/assets/main.scss";

.custom-font {
  font-family: 'monSerrat';
}

.custom-lato {
  font-family: 'lato';
}

.custom-paint {
  font-family: 'paint';
}

.custom-titles {
  font-family: 'titles';
}





</style>







