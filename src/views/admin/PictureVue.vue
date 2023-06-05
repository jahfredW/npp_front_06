<template>
    <Suspense>
        <PictureVue/>
    </Suspense>
    
</template>

<script setup>

import PictureVue from '../../components/Picture.vue';
import { ref, onMounted, watch } from 'vue';
import { pictureService } from '../../../_services/picture.service';
import { useRoute, useRouter } from "vue-router";




</script>

