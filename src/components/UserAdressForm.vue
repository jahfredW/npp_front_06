<template >
    <v-container class="container mt-12">
      <v-form @submit="submit" id="form" v-model="valid" ref="form">
        <h3 class="mb-5 text-center">
          Formulaire d'inscription :
        </h3>
        <v-row>
            <v-col cols="12">
            <v-text-field v-model="title" :rules="pseudoRules" :counter="10" label="Intitulé" required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="name" :rules="pseudoRules" :counter="10" label="Nom" required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="firstName" :rules="emailRules" :counter="20" label="Prénom" required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="company" :rules="emailRules" :counter="20" label="Société">
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="adress" :rules="emailRules" :counter="20" label="Adresse" required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="postal" :rules="emailRules" :counter="20" label="Code Postal" required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="country" :rules="emailRules" :counter="20" label="Pays" required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="phone" :rules="emailRules" :counter="20" label="Telephone" required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-checkbox
              v-model="agree"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Je suis d'accord avec la politique de traitement des données"
              required
          ></v-checkbox>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="success" class="mr-4" @keyup.enter="submit" @click.prevent="submit">Soumettre
          </v-btn>
        </v-col>
      </v-form>
    </v-container>
  </template>
  
  
<script setup>
  
  
import { accountService } from './../../../_services/account.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
  
const router = useRouter();  
       
const valid =  ref(true);
const agree = ref(false);
const nom = ref("");
const prenom = ref("");
const pseudo = ref("");
const password = ref('');
const email = ref('');
const verification = ref('');
const pwd1 = ref(null);
const pwd2 = ref(null);
const passwordFieldType1 = ref("password");
const passwordFieldType2 = ref("password");
const basicRules = [
          v => !!v || "Ce champs ne peut pas être vide!",
          v => !/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/.test(v) || "les caractères spéciaux sont interdits"
        ]
const pseudoRules = [
          v => !!v || 'Password is required',
          v => !/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/.test(v) || "les caractères spéciaux sont interdits",
          v => ( v.length <= 10 ) || 'Name must be less than 10 characters',
        ]
const emailRules = [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ]
const passwordRules = [
          v => !!v || 'Password is required',
          v =>  ( v.length <= 10 ) || 'Name must be less than 10 characters',
        ]
const verifRules = [
        v => !!v || 'Password is required',
          v => v == password.value || ' Le mot de passe de correspond pas !',
        ]
      
    

const submit = () => {
  
          var formData = new FormData();
          formData = {
            pseudo: cleanUp(pseudo.value),
            email: cleanUp(email.value),
            password: password.value,
            verification: verification.value,

          }
          
          console.log(formData);
  
          accountService.signup(formData)
            .then(response => {
              console.log(response);
              alert('Utlisateur créé avec succès')
              router.push('/');
            })
            .catch(error => {
              alert("Oups une erreur est survenue !");
              console.log(error.response);
              })
  
        
      }
  
const toggleShow1 = () => {
        passwordFieldType1.value = passwordFieldType1.value === "password"? "text" : "password";
      }

const toggleShow2 = () => {
        passwordFieldType2.value = passwordFieldType2.value === "password"? "text" : "password";
      }      

const change = (event) =>{
        let target = event.target.id;
        console.log(target);
        let value  = event.target.value;
        console.log(value);
        let verifValue = pwd2.value.value;
        if (target == 'password1' && verifValue != null ){
          password.value = value;
          verifValue = null;
          verification.value = "";
        } else if (target == 'verification'){
          verification.value = value;}
      }
  
const checkLocal = () => {
        return localStorage.user === undefined;
  
      }
  
const cleanUp = (data) => {
        return data.toLowerCase().trim().replace(/[!$(){}[\]\s:;<+?\\>]/g, '');
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