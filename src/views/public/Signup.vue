<template >
    <v-container class="container container_login mt-12">
      <v-form @submit="submit" id="form" v-model="valid" ref="form">
        <h3 class="mb-5 text-center">
          Formulaire d'inscription :
        </h3>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="pseudo" :rules="pseudoRules" :counter="10" label="Pseudo" required>
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="email" :rules="emailRules" :counter="20" label="Email" required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
          <v-text-field ref="pwd1" id="password1" class="w-100 text-left field" @input="change($event)"  :type="passwordFieldType1" v-model="password" :rules="passwordRules"
            counter="10" label="Password" required>
              <v-icon class="icon" @click.prevent="toggleShow1()">
                mdi-eye-check
              </v-icon>
          </v-text-field>
        </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field ref="pwd2" id="verification" class="w-100 text-left field" @input="change($event)" :type="passwordFieldType2" v-model="verification" :rules="verifRules" 
            counter="10" label="Confirmez" required>
                <v-icon class="icon" @click.prevent="toggleShow2()">
                  mdi-eye-check
                </v-icon>
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
      <div class="mt-10">
      <p v-if=agree>
        * Les informations recueillies sur ce formulaire sont enregistrées dans un fichier informatisé par fredGruweDev.com pour sauvegarde. La base légale du traitement est [base légale du traitement].
  
  Les données collectées seront communiquées aux seuls destinataires suivants : [destinataires des données].
  
  Les données sont conservées pendant la durée de conservation des données prévue par le responsable du traitement ou critères permettant de la déterminer.
  
  Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre droit à la limitation du traitement de vos données.
  Vous pouvez retirer à tout moment votre consentement au traitement de vos données ; Vous pouvez également vous opposer au traitement de vos données ; Vous pouvez également exercer votre droit à la portabilité de vos données
  
  Consultez le site cnil.fr pour plus d’informations sur vos droits.
  
  Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez contacter (le cas échéant, notre délégué à la protection des données ou le service chargé de l’exercice de ces droits).
  
  Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.
      </p>
    </div>
    </v-container>
  </template>
  
  
<script setup>
  
  
import { accountService } from './../../../_services/account.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { utils } from '@/utils/functions';
  
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
            pseudo: utils.cleanUp(utils.htmlSpecialChars(pseudo.value)),
            email: utils.cleanUp(utils.htmlSpecialChars(email.value)),
            password: utils.htmlSpecialChars(password.value),
            verification: utils.htmlSpecialChars(verification.value),
          }

          // formData = {
          //   pseudo: pseudo.value,
          //   email: email.value,
          //   password: password.value,
          //   verification: verification.value,
          // }
          
          accountService.signup(formData)
            .then(response => {
              alert('Utlisateur créé avec succès')
              router.push('/');
            })
            .catch(error => {
              console.log(error);
              alert("Oups une erreur est survenue !");
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
        console.log(pwd2);
        let verifValue = pwd2.value.value;
        console.log('verifvalue' + verifValue)
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