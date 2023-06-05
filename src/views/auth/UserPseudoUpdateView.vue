<template>
<v-alert v-if="pseudoUpdated"
    type="success"
    title="Alert title"
    :text="successText" >
</v-alert>
<v-container>
    <v-form id="form" v-model="valid" ref="form">
        <v-text-field  id="pseudo" class="w-100 text-left field" placeholder="Entrez votre pseudo"   v-model="pseudo" :rules="validRules" :counter="10" required>
        </v-text-field>
        <v-btn :disabled="!valid" color="success" @keyup.enter="submit" @click.prevent="submit">Validate</v-btn>
    </v-form>
</v-container>



</template>

<script setup>

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { utils } from '@/utils/functions';
import { accountService } from '@/../_services/account.service';
import { useTokenStore } from '@/stores/tokenStore';
import router from '../../router';

const pseudo =  ref('');
const valid =  ref(true);
const pseudoUpdated = ref(false);
const successText = ref("");

const route = useRoute();

const userId = route.params.id;

const tokenStore = useTokenStore();

const validRules = [
            v => !!v || 'Pseudo is required',
            v =>  ( v.length <= 10 ) || 'Pseudo must be less than 10 characters',
            v => !/[-!$%^&*()_+|~=`\\#{}\[\]:";'<>?,.\/]/.test(v) || "les caractères spéciaux sont interdits",
          ];


const submit = () => {
  let payload = {}
  payload['pseudo'] = pseudo.value;
      accountService.userUpdate(userId, payload)
      .then( (res) => { 
        console.log(res.data)
        const token = res.data.token
        successText.value = "bravo " + pseudo.value + ", ton pseudo a bien été mis à jour!"
        pseudoUpdated.value = true;
        tokenStore.saveToken(token);
        setTimeout( () => {
          router.push({name: 'user-dashboard'});
        }, 2000)
      })
      .catch( ( err ) => console.log( err))
}

</script>