<template>

 <div ref="test" class="text-h3">
    Désolé, mais il semblerait que vous soyez banni :!/
 </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import router from '../../router';
import { ref, onMounted } from 'vue';


const test = ref();

setTimeout( () => {
    router.push('/');
}, 5000)


</script>