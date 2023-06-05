<template>
    <v-alert class="my-15"
        density="comfortable"
        type="info"
        title="Déconnexion"
        text="Une lien de réinitialisation vous as été envoyé par mail"
  ></v-alert>
  <div class="d-flex flex-row justify-content-around">
    <v-progress-circular class="mt-2"
      :size="50"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>
  
</template>

<script setup>


import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted( () => {
    setTimeout( () => {
        router.push('/')
    }, 3000)
})



</script>

