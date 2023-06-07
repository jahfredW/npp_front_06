<template>
    <v-row>
        <v-col cols="12" v-for="address in info.addresses">
      <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn
          class="custom-button"
            v-bind="props"
          >Mon adresse de facturation</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
        <v-card  elevation="20" class="pa-5" >
            <v-card-title class="h3">{{ address.name }}</v-card-title>
            <v-card-text v-if="info.addresses">
                <v-list >
                    <v-list-item > - Nom :  {{ address.firstname }}</v-list-item>
                    <v-list-item > - Prénom :  {{ address.lastname }}</v-list-item>
                    <v-list-item > - Société :  {{ address.company != null ? address.company : 'Aucune société renseignée' }}</v-list-item>
                    <v-list-item > - Adresse :  {{ address.address  }}</v-list-item>
                    <v-list-item > - Code Postal :  {{ address.postal }}</v-list-item>
                    <v-list-item > - Ville :  {{ address.city }}</v-list-item>
                    <v-list-item > - Pays :  {{ address.country }}</v-list-item>
                </v-list>
            </v-card-text>
            
            <v-card-text v-else>
                Aucune adresse
            </v-card-text>
            <v-btn class="custom-button" @click="addressUpdate"><v-icon>mdi-pen</v-icon>Modifier</v-btn>
            <!-- <v-card-text>Mon mail : {{ info.email }}</v-card-text>
            <v-card-text>Mon pseudo : {{ info.pseudo }}</v-card-text>  -->
        </v-card>
    </template>
      </v-dialog>
    </v-col>
   
    </v-row>
    
</template>


<!-- <template>
    <div class="h3 mt-4 mb-10">Mes adresses de facturation : </div>
    <v-row class="d-flex justify-content-center">
        <v-col cols="4" v-for="address in info.addresses">
        <v-card  elevation="20" >
            <v-card-title class="h3">{{ address.name }}</v-card-title>
            <v-card-text v-if="info.addresses">
                <v-list >
                    <v-list-item > - Nom :  {{ address.firstname }}</v-list-item>
                    <v-list-item > - Prénom :  {{ address.lastname }}</v-list-item>
                    <v-list-item > - Société :  {{ address.company != null ? address.company : 'Aucune société renseignée' }}</v-list-item>
                    <v-list-item > - Adresse :  {{ address.address  }}</v-list-item>
                    <v-list-item > - Code Postal :  {{ address.postal }}</v-list-item>
                    <v-list-item > - Ville :  {{ address.city }}</v-list-item>
                    <v-list-item > - Pays :  {{ address.country }}</v-list-item>
                </v-list>
            </v-card-text>
            <v-card-text v-else>
                Aucune adresse
            </v-card-text>
             <v-card-text>Mon mail : {{ info.email }}</v-card-text>
            <v-card-text>Mon pseudo : {{ info.pseudo }}</v-card-text>  
        </v-card>
    </v-col>
    </v-row>
    
</template> -->


<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();


const props = defineProps({
    info : Object,
    default: 'No Content'
})



const addressUpdate = () => {
  router.push({ name : 'address-update', params: { id: props.info.id }})
}


</script>