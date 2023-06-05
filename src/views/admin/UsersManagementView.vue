<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="d-flew flex-row justify-content-center">
                <UserFilterForm></UserFilterForm>
            </v-col>
            <v-col cols="12">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Email
                            </th>
                            <th v-if="isDesktop" class="text-left">
                                Pseudo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usersList" link>
                            <td class="align-middle">{{ user.email }}</td>
                            <td v-if="isDesktop" class="align-middle">{{ user.pseudo }}</td>
                            <td class="text-center align-middle"><v-icon @click="seeUser(user.id)" icon="mdi-eye"></v-icon></td>

                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <InfiniteLoading @infinite="load" :distance="3" :firstload="true" >
            <template #complete>
                <v-banner id="banner" class="text-center mt-10 text-h5 mx-auto">Fin de la liste!</v-banner>
            </template>
        </InfiniteLoading>
    </v-container>
</template>


<script setup>

import UserFilterForm from "@/components/UserFilterForm.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { accountService } from '@/../_services/account.service'
import { checkScreenSize } from '@/composables/screen'


const route = useRoute();

const { isDesktop } = checkScreenSize();

const pseudo = ref(route.query.pseudo);
const beginDate = ref(route.query.beginDate);
const endDate = ref(route.query.endDate);


const router = useRouter();

let page = 1;

const usersList = ref([]);

const userState = reactive({
    email : "",
    pseudo : "",
})

// au montage de la vue, charger les utilisateurs 
// onMounted ( async() => {
//     try {
//         let users = await accountService.getUsers();
//         console.log(users);
//         usersList.value = users.data;
//     } catch (error) {
//         console.log(error);
//     }

// });

/**
 * méthode de chargement des Cards au Scroll. 
 * @param {} $state état du composant 
 */
 const load = async $state => {
    console.log("loading...");

    try {
    // const res =  await axios.get("https://127.0.0.1:8000/api/album/" + id + "?limit=5&page=" + page);

    /**
     * getAlbumByid retourne les phots des albums avec l'intégration d'une pagination 
     */
    const res =  await accountService.getUsersWithPagination(
        10, 
        page,
        pseudo.value,
        beginDate.value,
        endDate.value);
        
    console.log(res.data);
    if (res.data.length == 0) {
        $state.complete();
        }
    else {
        usersList.value.push(...res.data);
        $state.loaded();
        page += 1;
        
    }
    
   } catch (error) {
        $state.error();
   };
  };


const seeUser = (userId) => {
    console.log(userId);
    router.push('/admin/users/' + userId);
}

</script>