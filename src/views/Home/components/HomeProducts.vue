<template>
    <div class="mt-8 mb-8">
    <h1 class=" font-semibold mb-4 ml-4 text-2xl">Sản phẩm mới</h1>
    <div class="grid lg:grid-cols-4 gap-8 sm:grid-cols-2 sm:grid-cols-1">
    <div 
        class="" v-for="item in props.homeProductsData"
        :key="item.id"
        >
        <img 
        :src="item.image"
         alt="Category image"
         class="w-full h-full rounded"
         />
    </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const props = defineProps(['homeProductsData'])
  </script>
  
