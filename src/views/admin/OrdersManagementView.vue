<template>
    <v-container fluid>
        <v-row>
            <!-- <v-col cols="12" class="d-flew flex-row justify-content-center"> -->
                <!-- <UserFilterForm></UserFilterForm> -->
            <!-- </v-col> -->
            <v-col cols="12">
                <v-table>
                    <thead>
                        <tr>
                            <th  class="text-left">
                                date
                            </th>
                            <th  class="text-left">
                                Status
                            </th>
                            <th  v-if="isDesktop" class="text-center">
                                stripeId
                            </th>
                            <th  class="text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" link>
                            <td  class="align-middle">{{ format(order.createdAt) }}</td>
                            <td class="align-middle">{{ order.status }}</td>
                            <td v-if="isDesktop" class="text-center align-middle"><v-icon icon="mdi-eye"></v-icon></td>
                            <td class="text-center align-middle">
                                <v-menu  open-on-click  :close-on-content-click="true" location="top" >
                                    <template   v-slot:activator="{ props }">
                                        <v-btn class="custom-button" v-bind="props" link>
                                            <v-icon >mdi-gesture-tap-button</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <div>
                                            <v-list-item class="custom-bg" v-for="item in items" :key="item.id" @click="selectItem(item, discount.id)">
                                                <v-btn :prepend-icon="item.icon" :color="item.color" >{{ item.title }} </v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-dialog v-model="dialog" width="auto">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn color="primary" v-bind="props" prepend-icon="mdi-eye"> Détails </v-btn>
                                                </template>
                                                    <v-card>
                                                        <v-card-text>
                                                            <div>{{ discount.title }}</div>
                                                            <div>Taux : {{ discount.rate }} %</div>
                                                            <div>Articles : {{ discount.articles }}</div>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-btn prepend-icon="mdi-close" color="primary" block @click="dialog = false">Fermer</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                            </v-dialog>
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
                <v-btn :prepend-icon="mdi_check()" @click="create_discount()" class="custom-button">Ajouter</v-btn>
            </v-col>
        </v-row>
        <InfiniteLoading @infinite="load" :distance="3" :firstload="true" >
            <template #complete>
                <v-banner id="banner" class="text-center mt-10 text-h5 mx-auto">Fin de la liste!</v-banner>
            </template>
        </InfiniteLoading>
    </v-container>
</template>

<script setup>
import { orderService } from '@/../_services/order.service';
import { onMounted, ref } from 'vue';
import { checkScreenSize } from '@/composables/screen'
import { useRouter, useRoute } from 'vue-router';
import { utils } from '@/utils/functions';

const { isDesktop } = checkScreenSize();

const router = useRouter();
const route = useRoute();

const orders = ref(null);

const dialog = ref(false);

const format = (date) => {
    console.log(date);
    return utils.dateImmutableFormat(date);
}

const sayHello = () => {
    return "hello";
}

// hook montage du composant : récupération de la liste des discounts et affectation 
// à la propriété réactive 
onMounted(async( ) => {
    let ordersList = await orderService.getOrder(route.query.userId);
    orders.value = ordersList.data;
    console.log(ordersList);
})

// liste des onglets 
const items = [
    { id: 1, title : "Modifier", icon :"mdi-pen", color : "blue" }, 
    { id: 2, title : "Supprimer", icon : "mdi-delete", color : "red", }
]


// logique métier à appliquer en fonction de l'onglet sélectionné 
// Avec redirections de routes 
const selectItem = (item, id) => {
  console.log(`Selected ${item.title}`);
  if(item.id === 2){
    if(confirm('Attention cette action est définitive! Continuer ?')){
        discountService.deleteDiscount(id).then( res => {
            alert('Réduction supprimée avec succès');
            router.go(0);
    }).catch( err => alert('Erreur lors de la suppression') )
    }
  } else if(item.id === 1) {
    router.push('/admin/discounts/update/' + id);
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

const create_discount = () => {
    router.push('/admin/discounts/create');
}


</script>