<template>
    <v-container fluid>
        <div class="text-h5 text-center mt-2 mb-5">Gérez vos types de photos ici : </div>
        <v-row>
            <!-- <v-col cols="12" class="d-flew flex-row justify-content-center"> -->
                <!-- <UserFilterForm></UserFilterForm> -->
            <!-- </v-col> -->
            <v-col cols="12">
                <v-table>
                    <thead>
                        <tr>
                            <th  class="text-left">
                                type
                            </th>
                            <th  class="text-left">
                                Prix
                            </th>
                            <th  class="text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" link>
                            <td class="align-middle">{{ product.name }}</td>
                            <td class="text-center align-middle">{{ product.price }} €</td>
                            <td class="text-center align-middle">
                                <v-menu  open-on-click  :close-on-content-click="true" location="top" >
                                    <template   v-slot:activator="{ props }">
                                        <v-btn class="custom-button" v-bind="props" link>
                                            <v-icon >mdi-gesture-tap-button</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <div>
                                            <v-list-item class="custom-bg" v-for="item in items" :key="item.id" @click="selectItem(item, product.id)">
                                                <v-btn :prepend-icon="item.icon" :color="item.color" >{{ item.title }} </v-btn>
                                            </v-list-item>
                                        </div>
                                    </v-list>
                                </v-menu>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="d-flex flex-row justify-content-end">
                <v-btn :prepend-icon="mdi_check()" @click="create_product()" class="custom-button">Ajouter</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { productService } from '@/../_services/product.service';
import { onMounted, ref } from 'vue';
import { checkScreenSize } from '@/composables/screen'
import { useRouter, useRoute } from 'vue-router';
import { utils } from '@/utils/functions';

const { isDesktop } = checkScreenSize();

const router = useRouter();
const route = useRoute();

const products = ref(null);

const dialog = ref(false);


// hook montage du composant : récupération de la liste des discounts et affectation 
// à la propriété réactive 
onMounted(async( ) => {
    let productsList = await productService.getAllProducts();
    products.value = productsList.data;
    console.log(productsList);
})

// liste des onglets 
const items = [
    { id: 1, title : "Modifier", icon : "mdi-pen", color : "green", },
    { id: 2, title : "Supprimer", icon : "mdi-delete", color : "red", }
]


// logique métier à appliquer en fonction de l'onglet sélectionné 
// Avec redirections de routes 
const selectItem = (item, id) => {
  console.log(`Selected ${item.title}`);
  if(item.id === 2){
    if(confirm('Attention cette action est définitive! Continuer ?')){
        productService.delete_product_by_id(id).then( res => {
            alert('Réduction supprimée avec succès');
            router.go(0);
    }).catch( err => alert('Erreur lors de la suppression') )
    }
  } else if(item.id === 1) {
    router.push('/admin/album/type/update/' + id);
  } else {
    router.push('/admin/discounts/update/');
  }
};

// fonction test de la mdi en fonction de la taille de l'écran 
const mdi_check = () => {
    if(isDesktop.value){
        return "mdi-plus";
    } else {
        return "mdi-plus";
    }
}

const create_product = () => {
    router.push('/admin/album/type/create');
}

const seeDetails = (orderId) => {
    router.push('/auth/invoice/' + orderId);
}


</script>