<template>
    <v-alert
    color="error"
    icon="$error"
    title="Paiement Abandonné"
    text="Il semblerait que tout ne ce soit pas passé correctement.."
></v-alert>

</template>

<script setup>

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted( () => { 
    setTimeout( () => {
        router.push('/')
    }, 1500);
})

</script>