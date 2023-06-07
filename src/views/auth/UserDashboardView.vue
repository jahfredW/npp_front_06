<!-- dashboard user : commandes, adresses , info persos -->
<template>
    <v-container class="container">
        <v-card elevation="15" >
            <v-card-title class="text-h5 text-center">Mon espace perso</v-card-title>
            <v-card-subtitle class="text-center">Gérez vos commandes et vos infos</v-card-subtitle>
            <v-divider></v-divider>
            <v-row>
                <v-col cols="12" class="d-flex flex-row justify-content-center">
                    <div>
                    <div class="d-flex flex-column align-items-between">
                        <div class="ma-3">   
                            <UserOrder :info="userDetail" />
                        </div>
                        <div class="ma-3">
                            <UserAdresses :info="userDetail" /> 
                        </div>
                        <div class="ma-3">
                            <UserInfo :info="userDetail" />
                        </div>             
                    </div>
                </div>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-avatar class="ma-3" size="125" rounded="0">
                        <v-img src="/public/images/logo.png"></v-img>
                    </v-avatar>
                </v-col>
            </v-row>
            
            
            
            
        </v-card>
        
        <v-divider class="mb-10"></v-divider>

            
      
    </v-container>
    
        
</template>



<script setup>

import { onMounted, ref, onBeforeUpdate } from 'vue';
import { accountService } from '../../../_services/account.service';
import UserInfo from '@/components/UserInfo.vue';
import UserAdresses from  '@/components/UserAdresses.vue';
import UserOrder from  '@/components/UserOrder.vue';


let userDetail = ref([]);

const GetUser = () => {
    accountService.getUser()
    .then( (response) => {
        userDetail.value = response.data;
        console.log(userDetail);
    })
    .catch( (error) => {
        console.log(error)
    });

    // orderService.getOrder(userDetail.value.id)
    // .then( (response) => {
    //     console.log(response)
    // })
    // .catch( error => console.log(error))

}

onMounted(GetUser);
onBeforeUpdate(GetUser);

</script>