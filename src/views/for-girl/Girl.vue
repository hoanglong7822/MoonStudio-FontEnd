<template>
    <div class="pt-32"><img src="/images/Girl/NuLHMS_cate_desktop-18.12.webp" /></div>

    <div class="">
        <div class="container mx-auto mt-4">
            <ProductSlider :imageUrl="imageUrl_Girl_AoNi" :productsDataResponse="productsDataResponse"></ProductSlider>
            <ProductSlider
                :imageUrl="imageUrl_Girl_AoKhoac"
                :productsDataResponse="productsDataResponse"
            ></ProductSlider>
            <ProductSlider :imageUrl="imageUrl_Girl_AoLen" :productsDataResponse="productsDataResponse"></ProductSlider>
        </div>
    </div>
    <router-view></router-view>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getApi } from '@/services/api';
import ProductSlider from '@/components/slider-products/ProductSlider.vue';
import ProductDetail from '../product-details/ProductDetail.vue';
import { imageUrl_Girl_AoKhoac, imageUrl_Girl_AoNi, imageUrl_Girl_AoLen } from '@/utilities';
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
