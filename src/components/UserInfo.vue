<template>
    <v-row>
        <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        width="350"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="#DFE5EB"
            v-bind="props"
          >Mes infos persos</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
        <v-card elevation="20" >
            <v-card-title class="h3">Mes infos</v-card-title>
            <v-card-text class="d-flex flex-row justify-content-between " >
              <div class="d-flex flex-row align-items-center ">Mon pseudo : &nbsp;<strong>{{ info.pseudo }}</strong></div>
              <v-btn class="custom-button" @click="pseudoUpdate"><v-icon>mdi-pen</v-icon></v-btn>
            </v-card-text>
            <v-card-text class="d-flex flex-row justify-content-between ">
              <div class="d-flex flex-row align-items-center ">Mon mail : &nbsp;<strong>{{ info.email }}</strong></div>
              <v-btn class="custom-button" @click="emailUpdate"><v-icon>mdi-pen</v-icon></v-btn>
            </v-card-text>
            <!-- <v-card-text class="d-flex flex-row justify-content-between ">
              <div class="d-flex flex-row align-items-center ">Mon adresse : {{ info.adresses }}</div>
              <v-btn class="custom-button" @click="adresseUpdate"><v-icon>mdi-pen</v-icon></v-btn>
            </v-card-text> -->
        </v-card>
    </template>
      </v-dialog>
    </v-col>
  </v-row>
  
   
    
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    info : Object,
    default: 'No Content'
})


const pseudoUpdate = () => {
  router.push({ name : 'pseudo-update', params: { id: props.info.id }})
}

const emailUpdate = () => {
  router.push({ name : 'email-update', params: { id: props.info.id }})
}

</script>

