<template>
    <v-container class="container_login mt-15 px-10 py-10">
      <v-row class="mb-10">
        <v-col cols="12"  xs="12" sm="12" md="8" lg="8"  class="mx-auto text-center">
          <div class="text-h4">Saisissez votre email</div>
        </v-col>
      </v-row>
      <v-form id="form" v-model="valid" ref="form">
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="email" :rules="emailRules" :counter="10" label="Email" required></v-text-field>
                </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                    <v-btn :disabled="!valid" color="success" @keyup.enter="submit" @click.prevent="submit">Validate</v-btn>
                </v-col>
            </v-row>
                 
      </v-form>
    </v-container>
        
  </template>


<script setup>

import { onMounted, ref, onBeforeUpdate } from 'vue';
import { passwordService } from '../../../_services/password.service';
import { useRouter } from 'vue-router';
import UserPasswordSuccesView from './UserPasswordSuccessView.vue';

const router = useRouter();

let userDetail = ref([]);
const valid = ref(true);
let email = ref('');

const emailRules = [
            v => !!v || 'E-mail is required',
            v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'E-mail must be valid',
          ];

const submit = () => {
    console.log(email.value)
    passwordService.passwordRecovery(email.value)
    .then( (response) => {
        console.log(response.data)
        router.push({ name : 'user-password-success'})
    })
    .catch( (error) => {
        console.log(error)
    });

}
</script>