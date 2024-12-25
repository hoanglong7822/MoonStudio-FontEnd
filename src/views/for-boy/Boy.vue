<template>
    <div class="pt-32"><img src="/images/Boy/BoyLHMS_cate_desktop-18.12.webp" /></div>

    <div class="">
        <div class="container mx-auto mt-4">
            <ProductSlider :imageUrl="imageUrl_Boy_AoNi" :productsDataResponse="productsDataResponse"></ProductSlider>
            <ProductSlider
                :imageUrl="imageUrl_Boy_AoKhoac"
                :productsDataResponse="productsDataResponse"
            ></ProductSlider>
            <ProductSlider :imageUrl="imageUrl_Boy_QuanNi" :productsDataResponse="productsDataResponse"></ProductSlider>
        </div>
    </div>
    <router-view></router-view>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getApi } from '@/services/api';
import ProductSlider from '@/components/slider-products/ProductSlider.vue';
import ProductDetail from '../product-details/ProductDetail.vue';
const productsDataResponse = ref([]);
import { imageUrl_Boy_QuanNi, imageUrl_Boy_AoKhoac, imageUrl_Boy_AoNi } from '@/utilities';
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
