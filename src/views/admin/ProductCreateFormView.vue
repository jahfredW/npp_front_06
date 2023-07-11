<template>
    <v-container class="container">
        <v-form>
            <ProductForm></ProductForm>
        </v-form>
    </v-container>
</template>

<script setup>

import ProductForm from '@/components/ProductForm.vue';
import { useRoute } from 'vue-router';
import { useRouter} from 'vue-router';
import { discountService } from '@/../_services/discount.service';
import { onMounted, ref } from 'vue';




</script>