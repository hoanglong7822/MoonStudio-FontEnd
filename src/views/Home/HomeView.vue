<script setup>
import { getApi } from '@/services/api';
import { onMounted, ref } from 'vue';
import Category from '@/components/category/Category.vue';
import GridProducts from './components/grid-products/GridProducts.vue';
import Banner from './components/banner/Banner.vue';
import { imageUrl_aoKhoac, imageUrl_aoLen, imageUrl_aoGiuNhiet, url } from '@/utilities';
const AoLen = ref([]);
const AoKhoac = ref([]);
const AoGiuNhiet = ref([]);
onMounted(async () => {
    try {
        const response_aoLen = await getApi('http://127.0.0.1:8000/category/2');
        if (response_aoLen.status === 200) {
            AoLen.value = response_aoLen.data;
        }
        const response_aoKhoac = await getApi('http://127.0.0.1:8000/category/1');
        if (response_aoKhoac.status === 200) {
            AoKhoac.value = response_aoKhoac.data;
        }
        const response_aoGiuNhiet = await getApi('http://127.0.0.1:8000/category/3');
        if (response_aoGiuNhiet.status === 200) {
            AoGiuNhiet.value = response_aoGiuNhiet.data;
        }
    } catch (error) {
        console.error('error:', error);
    }
});
</script>
<template>
    <Banner />
    <div class="container mt-4 mx-0 sm:mx-auto">
        <Category />
        <GridProducts :url="url.aoLen" :imageUrl="imageUrl_aoLen" :productsData="AoLen" />
        <GridProducts :url="url.aoKhoac" :imageUrl="imageUrl_aoKhoac" :productsData="AoKhoac" />
        <GridProducts :url="url.aoGiuNhiet" :imageUrl="imageUrl_aoGiuNhiet" :productsData="AoGiuNhiet" />
    </div>
</template>
