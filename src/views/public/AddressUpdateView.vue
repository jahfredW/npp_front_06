<template >
    <v-container class="container container_login mt-12">
      <v-form @submit="submit" id="form" v-model="valid" ref="form">
        <h3 class="mb-5 text-center">
          Mettez à jour votre adresse de facturation :
        </h3>
        {{  lastAddress }}
            <v-text-field v-model="name" :rules="basicRules" counter="20" label="Intitulé de l'adresse" :placeholder="lastAddress.name" required></v-text-field>
            <v-text-field v-model="firstname" :rules="basicRules" counter="20" label="Votre nom" :placeholder="lastAddress.firstname" required></v-text-field>
            <v-text-field v-model="lastname" :rules="basicRules" counter="20" label="Votre Prénom" :placeholder="lastAddress.lastname" required></v-text-field>
            <v-text-field v-model="company" :rules="basicRules" counter="20" label="Votre société" :placeholder="lastAddress.company" required></v-text-field>
            <v-text-field v-model="address" :rules="basicRules" counter="20" label="Votre adresse" :placeholder="lastAddress.address" required></v-text-field>
            <v-text-field v-model="postal" :rules="basicRules" counter="20" label="Votre code Postal" :placeholder="lastAddress.postal" required></v-text-field>
            <v-text-field v-model="city" :rules="basicRules" counter="20" label="Votre ville" :placeholder="lastAddress.city" required></v-text-field>
            <v-text-field v-model="country" :rules="basicRules" counter="20" label="Votre pays" :placeholder="lastAddress.country" required></v-text-field>
            <v-text-field v-model="phone" :rules="phoneRules" counter="20" label="Votre téléphone" :placeholder="lastAddress.phone"></v-text-field>
       
        <v-col cols="12">
          <v-btn :disabled="!valid" color="success" class="mr-4" @keyup.enter="submit" @click.prevent="submit">Soumettre
          </v-btn>
        </v-col>
      </v-form>
    </v-container>
  </template>
  
  
<script setup>
  
  
import { addressService } from '@/../_services/address.service';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { utils } from '@/utils/functions';

onMounted( () => {
  console.log(route.query)
  addressService.getWholeAddressByUserId(userId)
  .then( res => {
    console.log(JSON.parse(res.data))
    lastAddress.value = JSON.parse(res.data)
    console.log(lastAddress);

  })
  .catch( err => console.log(err))
})
  
const router = useRouter();  
const route = useRoute();

const lastAddress = ref({});
       
const valid =  ref(true);
const name= ref("");
const firstname = ref("");
const pseudo = ref("");
const lastname = ref('');
const company = ref('');
const address = ref('');
const postal = ref('');
const city = ref('');
const country = ref('');
const phone = ref('');

const userId = route.params.id;


const basicRules = [
          v => !!v || "Ce champs ne peut pas être vide!",
          v => !/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/.test(v) || "les caractères spéciaux sont interdits",
          v => ( v.length <= 20 ) || 'Name must be less than 20 characters',
        ]

const phoneRules = [
          v => /^\d{2}\/\d{2}\/\d{2}\/\d{2}\/\d{2}$/.test(v) || "le téléphone doit respecter le formalisme ../../../../..",
          v => ( v.length <= 20 ) || 'Name must be less than 20 characters',
        ]



const submit = () => {
  
          var formData = new FormData();
          formData = {
            pseudo: utils.cleanUp(utils.htmlSpecialChars(pseudo.value)),
            name: utils.cleanUp(utils.htmlSpecialChars(name.value)),
            firstname: utils.cleanUp(utils.htmlSpecialChars(firstname.value)),
            lastname: utils.cleanUp(utils.htmlSpecialChars(lastname.value)),
            company: utils.cleanUp(utils.htmlSpecialChars(company.value)),
            address: utils.cleanUp(utils.htmlSpecialChars(address.value)),
            postal: utils.cleanUp(utils.htmlSpecialChars(postal.value)),
            city: utils.cleanUp(utils.htmlSpecialChars(city.value)),
            country: utils.cleanUp(utils.htmlSpecialChars(country.value)),
            phone: utils.cleanUp(utils.htmlSpecialChars(phone.value)),
            
          }

          if( userId){
            addressService.addressUpdate(userId, formData)
            .then(response => {
              alert('Address modifiée avec succès')
              // router.push('/');
            })
            .catch(error => {
              console.log(error);
              alert("Oups une erreur est survenue !");
              })
          } else {
            addressService.addressCreate(formData)
            .then(response => {})
            .catch(error => { })
          }
          
          
      }
  
  
</script>
  
  
<style>
.container{
  box-sizing: border-box;
  margin-top: 10vh;
}

.w {
  width: 10vw;
}
.field{
  position: relative;
}
.icon{
  position: absolute;
  right: 2vw;
  top: 30%;
}
</style>