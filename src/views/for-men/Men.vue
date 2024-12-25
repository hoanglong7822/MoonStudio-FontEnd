<template>
    <div class="pt-32"><img src="/images/Men/nam_cate_desktop-01.12.webp" /></div>
    <div class="">
        <div class="container mx-auto mt-4">
            <ProductSlider :imageUrl="imageUrl_Men_AoNi" :productsDataResponse="productsDataResponse"></ProductSlider>
            <ProductSlider
                :imageUrl="imageUrl_Men_AoKhoac"
                :productsDataResponse="productsDataResponse"
            ></ProductSlider>
            <ProductSlider :imageUrl="imageUrl_Men_AoLen" :productsDataResponse="productsDataResponse"></ProductSlider>
        </div>
    </div>
    <router-view></router-view>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getApi } from '@/services/api';
import ProductSlider from '@/components/slider-products/ProductSlider.vue';
import { imageUrl_Men_AoKhoac, imageUrl_Men_AoLen, imageUrl_Men_AoNi } from '@/utilities';
import ProductDetail from '../product-details/ProductDetail.vue';
const productsDataResponse = ref([]);

onMounted(async () => {
    try {
        const response = await getApi('http://127.0.0.1:8000/winter');
        if (response.status === 200) {
            productsDataResponse.value = response.data;
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
});
</script>
