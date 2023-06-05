<template>
    <v-container class="container mt-5">
        <v-row class="d-flex flex-column">
            <v-col cols="12">
                <v-row>
                    <v-col cols="6">
                        <div class="h3 ml-4">Albums</div>
                        <p v-if="tokenStore.getStatusApp === 'godMode'" class="ml-4">Dans cette section vous pouvez gérer vos albums</p>
                        <p v-else class="ml-4">Dans cette section vous pouvez consulter les albums</p>
                    </v-col>
                    <v-col cols="6">
                        <v-row v-if="tokenStore.getStatusApp === 'godMode'" class="d-flex flex-row">
                            <v-col cols="6"><v-btn color="success" icon="mdi-image-plus"  @click="redirectToPage"></v-btn></v-col>
                            <v-col cols="6"><v-select  density="compact"></v-select></v-col>
                        </v-row>
                        <v-row v-else class="d-flex flex-row">
                            <v-col cols="12"><v-select  density="compact"></v-select></v-col>
                        </v-row>
                                
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card class="mt-5" >
                            <v-tabs v-if="tokenStore.getStatusApp === 'godMode'"
                            align-tabs="center"
                            v-model="tab"
                            bg-color="#DFE5EB"
                            >
                            <v-tab value="one">Mes albums</v-tab>
                            <v-tab  value="two">Statistiques</v-tab>
                            </v-tabs>
                            
                            <v-card-text>
                                <v-window v-model="tab">
                                    <v-window-item value="one">
                                    <AlbumCardVue></AlbumCardVue>
                                    </v-window-item>
                                    <v-window-item value="two">
                                    <div class="h1">Page en construction</div>
                                    </v-window-item>
                                </v-window>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>



<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AlbumForm from './AlbumFormVue.vue';
import AlbumCard from './../../components/AlbumCard.vue';
import AlbumCardVue from './AlbumCardVue.vue';
import { useTokenStore } from '../../stores/tokenStore';

const tokenStore = useTokenStore();

const tab = ref(null);
const router = new useRouter();
const redirectToPage = () => {
    router.push('/admin/album/create')
}

</script>


