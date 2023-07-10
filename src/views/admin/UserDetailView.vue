<template>
    <v-container class="container">
        <v-alert v-if="alert === true"
        v-model="alert"
        density="compact"
        type="warning"
        title="Utilisateur supprimé"
        text="utilisateur supprimé avec succès"
  ></v-alert>
    <v-card v-if="alert === false" class="text-center" elevation="15">
        <v-card-title>
            {{  userState.pseudo }}
        </v-card-title>
        <v-card-substitle>
            {{ userState.email }}
        </v-card-substitle>
        <v-card-text>
            <v-divider></v-divider>
            <div>
                <v-row >
                    <v-col v-if="addressState.title" cols="12" md="6">
                        <div class="text-h5 mb-5">Adresse</div>
                        <div class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Intitulé: </div>
                            <div> {{ addressState.title }}</div>
                        </div>
                        <div class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Nom: </div>
                            <div> {{ addressState.firstname }}</div>
                        </div>
                        <div class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Prénom: </div>
                            <div> {{ addressState.lastname }}</div>
                        </div>
                        <div class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Adresse: </div>
                            <div> {{ addressState.address }}</div>
                        </div>
                        <div class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Code Postal  </div>
                            <div> {{ addressState.postal }}</div>
                        </div>
                        <div class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Ville: </div>
                            <div> {{ addressState.city }}</div>
                        </div>
                        <div class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Pays: </div>
                            <div> {{ addressState.country }}</div>
                        </div>
                        <div class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Téléphone </div>
                            <div> {{ addressState.phone }}</div>
                        </div>
                        <div v-if="addressState.company" class="d-flex flex-row justify-content-begin">
                            <div class="px-3">Société </div>
                            <div> {{ addressState.company }}</div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" v-else class="d-flex align-items-center justify-content-center">
                        <div >
                            <div>Aucune addresse</div>
                        </div>
                    </v-col>
                    <v-col  cols="12" md="6" style="border-left: 1px solid rgb(196, 191, 191);">
                        <div v-if="userState.order !== -1">
                            <v-divider></v-divider>
                                <div class="d-flex flex-row justify-content-around">
                                <div>Commandes : {{  userState.order }}</div>
                                <v-icon @click="seeOrders(userState.id)" icon="mdi-eye"></v-icon>
                            </div>
                            <v-divider></v-divider>
                            <div class="d-flex flex-row justify-content-around">
                                <div>Factures : ... </div>
                                <v-icon @click="seeInvoice()" icon="mdi-eye"></v-icon>
                            </div>
                        </div>
                        <div v-else >
                            <div>Aucune Commande</div>
                        </div>
                        <v-divider></v-divider>
                        <div class="d-flex flex-column justify-content-around">
                            <!-- <div>Status : {{ userState.roles[0] }} </div> -->
                            <v-select v-model="role" :items="roles" item-title="role" item-value="id" label="Status : "></v-select>
                            <v-btn @click="updateUserRole(userState.id, role)" class="custom-button">Mofifier</v-btn>
                        </div>
                    </v-col>
                    <!-- <v-col cols="6" v-else class="d-flex align-items-center justify-content-center">
                        <div >
                            <div>Aucune Commande</div>
                        </div>
                    </v-col> -->
                </v-row>
        
                    
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex flex-row justify-content-around">
            <v-btn @click="deleteUser(userState.id)" class="custom-button">Supprimer</v-btn>
            <!-- <div v-if="!userState.roles.includes('ROLE_ADMIN')">
                <v-btn v-if="!userState.roles.includes('ROLE_BANNISHED')  " @click="userStatusChange(userState.id)" class="custom-button">Bannir</v-btn>
                <v-btn v-else @click="userStatusChange(userState.id)"  class="custom-button">Débloquer</v-btn>
            </div> -->
            <v-btn class="custom-button"><a :href="mailTo()">mail</a></v-btn>
        </v-card-actions>  
    </v-card>
    </v-container>
    
</template>

<script setup>

import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { accountService } from '@/../_services/account.service';
import { orderService } from '@/../_services/order.service';
import { resolveOption } from 'vue-meta';


const route = useRoute();
const router = useRouter();

const roles = ref([
    { role : 'user', id : 'ROLE_USER'}, 
    { role : 'admin', id : 'ROLE_ADMIN'},
    { role : 'banni ! ', id : 'ROLE_BANNISHED'}

])

const role = ref(null)

const items = ref([]);

const alert = ref(false);

let userIdQuery = route.params.id;

const userState  = reactive({
    id : -1,
    email : "",
    pseudo : "",
    order : -1,
    roles : []
})

const addressState = reactive({
    title : "",
    city : "",
    company : "",
    firstname : '',
    country : "",
    lastname : "",
    address : "",
    postal : "",
    phone : "",
})

const convertToRole = () =>{

}

onMounted( async() => {
    const res = await accountService.getUsers(userIdQuery);
    userState.id = res.data.id;
    userState.email = res.data.email;
    userState.pseudo = res.data.pseudo;
    userState.roles = res.data.roles;
    console.log(userState.roles[0]);
    role.value = userState.roles[0];
    // convertRole(userState.roles[0]);


    
    console.log(res.data.addresses[0] != null);

    if ( res.data.addresses[0] != null){
        const address = res.data.addresses[0];
        addressState.title = address.name;
        addressState.firstname = address.firstname;
        addressState.lastname = address.lastname;
        addressState.address = address.address;
        addressState.company = address.company;
        addressState.city = address.city;
        addressState.postal = address.postal;
        addressState.phone = address.phone;
        addressState.country = address.country;
    }

    if ( res.data.order_id.length > 0) {
        userState.order = res.data.order_id.length;
    }
    console.log(res.data);
})

// fonction de banissement 
const userStatusChange = (userId) => {
    accountService.userChangeStatus(userId)
    .then( res => {
        userState.roles = res.data.roles;
    })
    .catch( err => console.log(err))
}

// envoie de mail à l'utilisateur 
const mailTo = () => {
   
    return "mailto:" + userState.email;
}

const deleteUser = (userId) => {
    if(confirm('Etes Vous certain ?')){
        accountService.deleteUserById(userId)
    .then( res => {
        alert.value = true;
        setTimeout ( () => {
            alert.value = false;
            router.push('/admin/users');
        }, 3000)
    })
    .catch( err => console.log(err));
    }
    
}

// const convertRole = (userRole) => {
//     if( typeof(userRole) === "string"){
//         switch(userRole){
//         case 'ROLE_ADMIN':
//             role.value = 'admin';
//             break
//         case 'ROLE_USER':
//             role.value = 'user';
//             break
//         case 'ROLE_BANNISHED':
//             role.value = 'banni'
//             break
//         default:
//             role.value = '';
//     }
//     } else {
//         console.log('erreur de variable');
//         console.log(typeof(userRole));
//     }
    
// }

const updateUserRole = (userId, userRole) => {
    console.log(userRole)
    let formData = {}
    formData['role'] = userRole;
    accountService.userChangeStatus(userId, formData)
}

const seeOrders = async(userId) => {
    const query = {}
    query.userId = userId;
    router.push({
        name: 'user-orders',
        query
    })
}

</script>