<template>
    <v-container class="container">
        <v-form>
            <ProductForm :test="product_data"></ProductForm>
        </v-form>
    </v-container>
</template>

<script setup>

import ProductForm from '@/components/ProductForm.vue';
import { useRoute } from 'vue-router';
import { useRouter} from 'vue-router';
import { productService } from '@/../_services/product.service';
import { onMounted, ref } from 'vue';

const route = useRoute();
const product_id = route.params.id;
const product_data = ref(null)

// récupération de la réduction courante au montage du composant.  
onMounted( () => {
        getProductFromBdd();
})

// récupération de la réduction courante 
const getProductFromBdd = async() => {
    try{
        let current_product = await productService.get_product_by_id(product_id);
        console.log(current_product.data);
        product_data.value = current_product.data;
    } catch (error) {
        console.log(error);
    }
    
}




</script>