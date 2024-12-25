<script setup>
import { getApi } from '@/services/api';
import { onMounted, ref, computed } from 'vue';
import Grid from './components/Grid.vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const product = computed(() => {
    if (slug === 'ao-khoac') {
        return 1;
    } else if (slug === 'ao-len') {
        return 2;
    } else if (slug === 'ao-giu-nhiet') {
        return 3;
    } else return '/';
});
const productsData = ref([]);
onMounted(async () => {
    if (product.value === '/') {
        router.push('/');
    }
    try {
        const response = await getApi(`http://127.0.0.1:8000/category/${product.value}`);
        if (response.status === 200) {
            productsData.value = response.data;
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
});
</script>
<template>
    <div class="container pt-36 mx-0 sm:mx-auto">
        <Grid :productsData="productsData" />
    </div>
</template>
