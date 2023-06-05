<template>
    <v-container class="container mt-5">
        <v-row class="d-flex flex-row justify-content-center">
            <v-col cols="12" md="8">
                <v-row>
                    <v-col cols="12" md="6" class="text-center" >
                        <div class="h3 ">Albums</div>
                        <div v-if="isDesktop">
                            <p v-if="tokenStore.getStatusApp === 'godMode'" class="ml-4">Dans cette section vous pouvez gérer vos albums</p>
                            <p v-else class="ml-4">Dans cette section vous pouvez consulter les Albums</p>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" >
                        <v-row :class=customClass>
                            <v-col v-if="tokenStore.getStatusApp === 'godMode'" cols="6">
                                <v-container>
                                    <v-btn class="pa-2" color="success"   @click="redirectToPage">
                                Ajouter</v-btn>
                                </v-container>
                            </v-col>
                            <v-col v-if="tokenStore.getStatusApp === 'godMode'" cols="6">
                                <!-- <v-container>
                                    <v-menu  open-on-click  :close-on-content-click="true" location="left" >
                                        <template   v-slot:activator="{ props }">
                                            <v-btn  class="custom-button " v-bind="props" link>
                                                Filtrer
                                            </v-btn>
                                        </template>
                                        <div>
                                            <v-list class="custom-bg">
                                                <v-list-item>
                                                    <v-form>
                                                        <v-text-field label="Entrez le nom d'un album" v-model="album">
                                                        </v-text-field>
                                                        <v-select label="catégories" v-model="category" :items="categories" item-title="name" item-value="id"></v-select>
                                                        <v-select label="type de photo" v-model="type" :items="typeOfProduct" item-title="name" item-value="id"></v-select>
                                                        <div>
                                                            <VueDatePicker  v-model="albumBeginDate" format="dd/MM/yyyy" langage="fr"  :alt-position="customPosition" month-name-format="long" placeholder="date de début de validité">
                                                            </VueDatePicker>
                                                        </div>
                                                        <div>
                                                            <VueDatePicker  v-model="albumEndDate" format="dd/MM/yyyy" langage="fr"  :alt-position="customPosition" month-name-format="long" placeholder="date de fin de validité">
                                                            </VueDatePicker>
                                                        </div>
                                                    </v-form>
                                                    <v-btn color="success" @click="search">Rechercher !</v-btn>
                                                </v-list-item>
                                            </v-list>
                                        </div>    
                                    </v-menu>
                                </v-container> -->
                                <FilterForm></FilterForm>
                            </v-col>
                            <v-col cols="12" md="6"  v-else>
                                <!-- <v-container>
                                    <v-menu  open-on-click  :close-on-content-click="false" location="left" >
                                        <template   v-slot:activator="{ props }">
                                            <v-btn  class="custom-button " v-bind="props" link>
                                                Filtrer
                                            </v-btn>
                                        </template>
                                        <div>
                                            <v-list class="custom-bg">
                                                <v-list-item>
                                                    <v-form>
                                                        <v-text-field label="Entrez le nom d'un album" v-model="album">
                                                        </v-text-field>
                                                        <v-select label="catégories" v-model="category" :items="categories" item-title="name" item-value="id"></v-select>
                                                        <v-select label="type de photo" v-model="type" :items="typeOfProduct" item-title="name" item-value="id"></v-select>
                                                        <div>
                                                            <VueDatePicker  v-model="albumBeginDate" format="dd/MM/yyyy" langage="fr"  :alt-position="customPosition" month-name-format="long" placeholder="date de début de validité">
                                                            </VueDatePicker>
                                                        </div>
                                                        <div>
                                                            <VueDatePicker  v-model="albumEndDate" format="dd/MM/yyyy" langage="fr"  :alt-position="customPosition" month-name-format="long" placeholder="date de fin de validité">
                                                            </VueDatePicker>
                                                        </div>
                                                    </v-form>
                                                    <v-btn color="success" @click="search">Rechercher !</v-btn>
                                                </v-list-item>
                                            </v-list>
                                        </div>    
                                    </v-menu>
                                </v-container> -->
                                <FilterForm></FilterForm>
                            </v-col>
                        </v-row>        
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="mt-5" style="background-color: transparent; " >
                            <!-- <v-tabs v-if="tokenStore.getStatusApp === 'godMode'"
                            align-tabs="center"
                            v-model="tab"
                            bg-color="#DFE5EB"
                            >
                            <v-tab  value="one">Mes albums</v-tab>
                            <v-tab  value="two">Statistiques</v-tab>
                            </v-tabs> -->
                            
                            <v-card-text class="w-100" id="container-window" style="background-color: transparent;">
                                <!-- <v-window v-model="tab">
                                    <v-window-item value="one"> -->
                                    <AlbumCardVue></AlbumCardVue>
                                    <!-- </v-window-item>
                                    <v-window-item value="two">
                                    <div class="h1">Page en construction</div>
                                    </v-window-item>
                                </v-window> -->
                            </v-card-text>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>




<script setup>

import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import AlbumForm from './AlbumFormVue.vue';
// import AlbumCard from './../../components/AlbumCard.vue';
import AlbumCardVue from './../admin/AlbumCardVue.vue';
import { useTokenStore } from '../../stores/tokenStore';
import { useMeta } from 'vue-meta';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { categoryService } from '@/../_services/category.service';
import { productService } from '@/../_services/product.service';
import { albumService } from '@/../_services/album.service';
import FilterForm from '@/components/FilterForm.vue';
import { checkScreenSize } from '@/composables/screen';
import { screenClass } from '@/composables/screen';


useMeta( {
  title: 'Page de présentation des albums',
 }
)


const { isDesktop } = checkScreenSize();

const { customClass } = screenClass();

const tokenStore = useTokenStore();

const tab = ref(null);

const router = useRouter();

const redirectToPage = () => {
    router.push('/admin/album/create')
}







</script>




