<template>
    <v-alert v-if="emailUpdated"
        type="success"
        title="Bravo"
        :text="successText" >
    </v-alert>
    <v-alert v-else
        type="info"
        title="Information  :"
        text="Attention après la mise à jour du mail, vous devrez vous reconnecter" >
    </v-alert>
    <v-container>
        <v-form id="form" v-model="valid" ref="form">
            <v-text-field  id="email" class="w-100 text-left field"   v-model="email" :rules="emailRules" :counter="15" placeholder="Entrez votre email" required>
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
    
    const email =  ref('');
    const valid =  ref(true);
    const emailUpdated = ref(false);
    const successText = ref("");
    
    const route = useRoute();

    const tokenStore = useTokenStore();
    
    const userId = route.params.id;
    
    const emailRules = [
                v => !!v || 'Email requis',
                v =>  ( v.length <= 15 ) || 'Email ne peut excéder 15 caractères!',
                v => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || 'l\'E-mail doit être valide',
              ];
    
    
    const submit = () => {
      let payload = {}
      payload['email'] = email.value;
          accountService.userUpdate(userId, payload)
          .then( (res) => { 
            // récupération du token contenu dans le header 
            // const token = res.headers.authorization.split(' ')[1];
            const token = res.data.token
            successText.value = "bravo " + email.value + ", ton pseudo a bien été mis à jour!"
            emailUpdated.value = true;
            tokenStore.saveToken(token);
            setTimeout( () => {
                router.push({name: 'user-dashboard'});
            }, 2000)
          })
          .catch( ( err ) => console.log( err))
    }
    
    </script>