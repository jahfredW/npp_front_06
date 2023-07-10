<template>
    <v-container class="container">
        <v-form>
            <DiscountForm></DiscountForm>
        </v-form>
    </v-container>
</template>

<script setup>

import DiscountForm from '@/components/DiscountForm.vue';
import { useRoute } from 'vue-router';
import { useRouter} from 'vue-router';
import { discountService } from '@/../_services/discount.service';
import { onMounted, ref } from 'vue';




</script>