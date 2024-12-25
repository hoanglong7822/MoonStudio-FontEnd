<template>
    <div class="mt-8 p-2 md:p-0">
        <h1 class="font-semibold text-lg md:text-2xl mb-2">Sản phẩm mới</h1>
        <div class="flex gap-4">
            <div class="w-1/4 h-84" v-for="item in categories" :key="item.id">
                <img :src="item.image" alt="Category image" class="w-full h-full rounded" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
    { id: 1, name: 'Nam', image: '/images/category/nam_spmoi-04Oct.webp' },
    { id: 2, name: 'Nữ', image: '/images/category/nu_spmoi-04Oct.webp' },
    { id: 3, name: 'Bé Nam', image: '/images/category/boy_spmoi-04Oct.webp' },
    { id: 4, name: 'Bé Nữ', image: '/images/category/girl_spmoi-04Oct.webp' },
]);
</script>
