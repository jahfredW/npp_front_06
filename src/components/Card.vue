<!-- Parent : PictureCard -->
<!-- url album/read/id  -->

<template>
       <v-container fluid>
        <v-snackbar color="white" v-model="snackbar" multi-line timeout="2000" location="top">{{ cartStore.getSnack }}
            <template v-slot:actions>
                <v-btn
                    variant="text"
                    @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
      <v-row dense>
        <v-col
          
        >
          <v-card>
            <div style="position: relative; height: 250px;" >
                <div>
                    <img @click="pictureRead(pict.id)"   oncontextmenu="return false;" 
                    :src="pict.url" style="overflow-y: scroll; height: 280px; position: absolute; cursor: pointer;  object-fit:cover; left: 50%; top: 50%; transform: translate(-50%, -50%);" />
                </div>
            </div>
            <v-card-actions v-if="tokenStore.getStatusApp === 'godMode'" class="pt-5">
              
                <div @click.prevent class="pl-4">
                    <v-switch hide-details="true" id="switch" v-model="switchValue" color="green" @click="handleClick"
                        @change="handleChange(pict.id)">
                        <template #label>
                            <span>
                                <v-icon v-if="switchValue" left>mdi-access-point</v-icon>
                                <v-icon v-else left>mdi-access-point-network-off</v-icon>
                            </span>
                        </template>
                    </v-switch>
                </div>
                <v-spacer></v-spacer>

              <v-btn  color="surface-variant" variant="text" icon="mdi-eye" :to="'/admin/picture/' + pict.id" link></v-btn>

              <v-btn  color="surface-variant" variant="text" icon="mdi-trash-can" @click="pictureTrash(pict.id)" ></v-btn>
            </v-card-actions>

            <v-card-actions v-else class="pt-5">
              
              
              <v-spacer></v-spacer>

            <v-btn title="consulter la photo" size="small" color="surface-variant" variant="text" icon="mdi-eye" :to="'/picture/' + pict.id" link ></v-btn>

            <v-btn title="ajouter au panier" size="small" color="surface-variant" variant="text" icon="mdi-cart" @click="addToCart(pict.id)"></v-btn>
          </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>


<script setup>

import { ref, onMounted, onBeforeUpdate} from 'vue';
import { pictureService } from '@/../_services/picture.service';
import { productService } from '@/../_services/product.service';
import { discountService } from '@/../_services/discount.service';
import { useTokenStore } from '@/stores/tokenStore';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'vue-router';

/**
 * @hook : défintion de l'état du switch de mise à jour 
 */
onMounted( () => {
    // getDiscounts();
    console.log(props.pict.isActive);
    state.value = switchValue.value ? "mdi-note-minus" : "Hors Ligne";
})

onBeforeUpdate( () => {
    getDiscounts();
})

// init 
const cartStore = useCartStore();
const router = useRouter();
const tokenStore = useTokenStore();
const switchValue = ref(props.pict.isActive);
const snackbar = ref(false);
const state = ref('Hors Ligne');
const idProduct = ref('');
const pictureUrl = ref('');
const picturePrice = ref('');
const pictureName = ref('');
const snackText = ref('');

// props héritées de pictureCard
const props = defineProps({
    pict : Object,
    default: 'No Content'
})


/**
 * 
 * @param {*}
 */
 const getDiscounts = () => {
    discountService.getDiscount()
    .then( (res) => {
        console.log(res.data);
        cartStore.setDiscountTab(res.data);
    })
    .catch( (err) => {
        console.log(err);
    })
}

// récupération du prix
const getPrice = async(idProduct) => {
                const price = await productService.getProductPriceById(idProduct);
                picturePrice.value = price.data;
                console.log(picturePrice.value);
        }

// récupération de l'identifiant de type produit 
const getIdProduct = async(id) => {
    const responseType = await pictureService.getPictureType(id);
    idProduct.value = responseType.data;
}

// réupération de l'url de la photographie 
const getUrl = async(id) => {
    const response = await pictureService.getPictureById(id);
    pictureUrl.value = response.data;

}

// récupération du titre technique de la photgraphie 
const getName = async(id) => {
    const responseName = await pictureService.getPictureName(id);
    pictureName.value = responseName.data;
}

// méthode d'ajout au panier 
const addToCart = async(id) => {
        try { 
            await getIdProduct(id);
            await getPrice(idProduct.value);
            await getUrl(id);
            await getName(id);
            cartStore.addToCartLine(id, 1, picturePrice.value, pictureUrl.value, idProduct.value, pictureName.value);
            let cart = localStorage.getItem('cart');
            snackbar.value = true;
        } catch(error) {
            console.error(error);
        }
        

}



/**
 * méthode de modification de l'état du switch de mise à jour
 * @param {int} id id de la photographie 
 */
const handleChange = (id) => {
    console.log('Switch Value Changed', switchValue.value, id);
    state.value = switchValue.value ? "Publié" : "Hors Ligne";
    pictureUpdateIsActive(id, switchValue.value);
    
}

/**
 * méthode d'update en bdd de la propriété is_active de l'image ( seulement pour admin)
 * @param {int} id : id de la photo
 * @param {bool} switchValue : état ( actif ou non ) de la photo
 *  */
const pictureUpdateIsActive = (id, switchValue) => {

    let formdata = {};
    formdata['published'] = switchValue;
    pictureService.updatePictureById(id, formdata).then( (res) => console.log(res))
    .catch( (err) => console.log(err));

}

/**
 * méthode de suppression de photographie en base de donnée
 * @param {int} id : id de la photo
 */
const pictureTrash = (id) => {
    if(confirm('Attention cette action est définitive! Continuer ?')){
        pictureService.deletePictureById(id)
        .then( res => {
            alert('Photographie supprimée avec succès');
            location.reload();
    })
        .catch( err => alert('Erreur lors de la suppression') )
    }
}

// stop la propagation de l'evénement ( click ) vers l'élément enfant. 
const handleClick = (event) => {
    event.stopPropagation();
}

/**
 * 
 * @param {int} id : id de la photo
 * @returns void : redirige vers la page de lecture d'une photgraphie.  
 */
const pictureRead = (id) => {
    router.push('/picture/' + id)
}


</script>

<style lang="scss">


.label-span-disabled {
  pointer-events: none;
}

</style>