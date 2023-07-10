<template>
    <v-container class="container">
        <v-form>
            <DiscountForm :test="discount_data"></DiscountForm>
        </v-form>
    </v-container>
</template>

<script setup>

import DiscountForm from '@/components/DiscountForm.vue';
import { useRoute } from 'vue-router';
import { useRouter} from 'vue-router';
import { discountService } from '@/../_services/discount.service';
import { onMounted, ref } from 'vue';

const route = useRoute();
const discount_id = route.params.id;
const discount_data = ref(null)

// récupération de la réduction courante au montage du composant.  
onMounted( () => {
        getDiscountFromBdd();
})

// récupération de la réduction courante 
const getDiscountFromBdd = async() => {
    try{
        let current_discount = await discountService.getDiscount(discount_id);
        console.log(current_discount.data);
        discount_data.value = current_discount.data;
    } catch (error) {
        console.log(error);
    }
    
}




</script>

