<template>
    <div class="h2">Merci pour votre commande !</div>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { orderService } from '../../../_services/order.service';

// const route = useRoute();
const router = useRouter();
// const id = route.params.id;

onMounted( () => {
    // let credentials = {}
    // credentials['orderStatus'] = 'Done';
    // orderService.orderValidation(id)
    // .then( (response => console.log(response)))
    // .catch( (error) => console.log(error));
    
    redirect();
    
});

const redirect = () => {
    $cookies.remove('cartId');
    setTimeout(() => {
        router.push('/');
    }, 4000)
}




</script>