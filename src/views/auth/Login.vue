<template>
    <v-container class="container container_login mt-15 px-10 py-10">
      <v-form id="form" v-model="valid" ref="form">
        <v-row>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <div class="d-flex flex-column align-center justify-center">
              <v-img src="images/back.png" class="text-center" width="150px"/>
              <div class="text-center pt-3">Formulaire de connexion</div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="email" :rules="emailRules" :counter="10" label="Email" required></v-text-field>
            <v-text-field ref="pwd1" style="position: relative;" id="password1" class="w-100 text-left field" @input="change($event)"  :type="passwordType1" v-model="password" :rules="passwordRules"
              :counter="10" label="Password" required>
                <v-icon style="position: absolute;" class="icon" @click.prevent="toggleShow1()">
                  mdi-eye-check
                </v-icon>
            </v-text-field>
            <v-text-field style="position: relative;" ref="pwd2" id="verification" class="w-100 text-left field" :type="passwordType2" @input="change($event)" v-model="verification" :rules="verifRules" :counter="10" label="Confirmez" required>
                  <v-icon style="position: absolute;" class="icon" @click.prevent="toggleShow2()">
                    mdi-eye-check
                  </v-icon>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" class="text-center">
                <v-btn :disabled="!valid" color="success" @keyup.enter="submit" @click.prevent="submit"><div>C'est parti !</div></v-btn>
          </v-col>
          <v-col cols="12" md="6" class="text-center">
                <v-btn color="info"  to="/auth/password" link>
                  <div>
                    Mot de passe oublié ?
                  </div>
                </v-btn>
          </v-col>
        </v-row>     
      </v-form>
    </v-container> 
  </template>
  
  
  <script setup>
  
// le fait de mettre in index = pas besoin de préciser, il 
// ira directement dans idnex.js 
  
import { accountService } from './../../../_services/account.service'
import { utils } from '@/utils/functions';
  
import VueJwtDecode from 'jwt-decode';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useTokenStore } from './../../stores/tokenStore';
import { useMeta } from 'vue-meta';

useMeta( {
  title: 'formulaire de login',
 
  description: [
    {
      content: "formulaire qui permet au client de se connecter",
    },
  ],
  meta :[
    {
     property: 'og:title' ,
     content: 'formulaire de connexion au site'
    },
  ]
})

  
const router = useRouter();

const pwd2 = ref(null);
const pwd1 = ref(null);
const passwordType1 = ref('password');
const passwordType2 = ref('password');
const valid = ref(true);
const password = ref("");
const verification = ref("");
const email =  ref('');
const emailRules = [
            v => !!v || 'E-mail is required',
            v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'E-mail must be valid',
          ];
const passwordRules = [
            v => !!v || 'Password is required',
            v =>  ( v.length <= 10 ) || 'Name must be less than 10 characters',
          ];
const verifRules= [
            v => !!v || 'Password is required',
            v => v === password.value || ' Le mot de passe de correspond pas !',
        ]
        
const tokenStore = useTokenStore();
  
 
  
const submit = () => {
        
              let formData = new FormData();
                  
              formData = {
                email : utils.cleanUp(utils.htmlSpecialChars(email.value)),
                password : utils.htmlSpecialChars(password.value), 
              }
            
            accountService.login(formData)
            .then( response => {
              let token = response.data.token;
              let decodedToken = VueJwtDecode(token);
              // localStorage.setItem('token', token);
              console.log(decodedToken);
              console.log(token);
  
              // accountService.saveToken(token);
              tokenStore.saveToken(token);
              tokenStore.getTokenValidity();

              console.log(tokenStore.statusApp);
              if (tokenStore.statusApp === "bannished"){
                router.push('/auth/bannished');
              } else {
                router.push('/');
              }
              
              
            })
            .catch(error => {
              alert("Vous devez vous inscrire d'abord !");
              console.log(error);
            
            })
          
  
        };

const toggleShow1 = () => {
        passwordType1.value = passwordType1.value === "password"? "text" : "password";
      }

const toggleShow2 = () => {
        passwordType2.value = passwordType2.value === "password"? "text" : "password";
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
  
        // checkLocal(){
        //   return localStorage.user === undefined;
             
        // },
  
     
  
    
const checkLocal = () => {
          return localStorage.user === undefined;
    
        };
    
const cleanUp = (data) => {
          return data.toLowerCase().trim().replace(/[!$(){}[\]\s:;<+?\\>]/g, '');
        };
        
  
const disconnect = () =>{
          localStorage.clear();
          location.reload();
        };
  
        // findClient() {
          
        //       var formData = new FormData();
        //       console.log(this.checkLocal());    
        //       formData = {
        //           email : this.email
        //       }
              
        //     axios
        //     .post('http://127.0.0.1:3000/api/auth/find', formData)
        //     .then( response => {
        //       let data = response.data['data'];
        //       for ( var prop in data) {
        //           console.log(data[prop])
        //       }
       
        //     })
        //     .catch(error => {
        //       alert("Vous devez vous reconnecter d'abord !");
        //       console.log(error);
        //       localStorage.clear();
        //       location.reload();
            
        //     })
        //   },
  
        
  
  
  </script>
  
  <style>
  
  
  
  
  
  
  
  @media only screen and (max-width: 500px) {
    
    .container_login{
      border-radius: 10% 10%;
      width: 80%;
    }
  }
  </style>