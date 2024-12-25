<template>
    <div class="w-full mt-8">
        <h1 class="text-xl font-bold mb-4 sm:text-red-500 md:text-pink-500 lg:text-blue-500">Bán chạy nhất</h1>

        <div class="relative overflow-hidden w-full">
            <div
                class="sm:ml-[30px] p-4 sm:p-0 transition-transform duration-500 flex"
                :style="{ transform: `translateX(-${currentIndex * 25}%)` }"
            >
                <div
                    class="w-full sm:w-[calc(50%-30px)] lg:w-[calc(25%-30px)] mr-[30px] flex-shrink-0 relative group"
                    v-for="product in props.productsResData"
                    :key="product.productId"
                >
                    <button
                        @click="ADD_TO_CART(product)"
                        class="absolute bg-slate-300 w-full h-10 top-2/4 translate-y-3/4 opacity-50 group-hover:opacity-100"
                    >
                        Thêm vào giỏ hàng
                    </button>

                    <img :src="product.Image" class="w-full h-auto rounded-md" />
                    <h2 class="text-left mt-2 font-medium">{{ product.Name }}</h2>
                </div>
            </div>

            <button
                v-if="currentIndex > 0"
                class="absolute top-2/4 left-2 -translate-y-3/4 text-lg bg-white shadow-md focus:outline-none rounded-full text-gray-600 p-2 w-10 h-10 hover:bg-slate-100"
                @click="prevSlide"
                :disabled="currentIndex === 0"
            >
                <FontAwesomeIcon :icon="faArrowLeft"></FontAwesomeIcon>
            </button>
            <button
                v-if="currentIndex < maxIndex"
                class="absolute top-1/2 right-2 -translate-y-3/4 text-lg bg-white shadow-md focus:outline-none rounded-full text-gray-600 p-2 w-10 h-10 hover:bg-slate-100"
                @click="nextSlide"
                :disabled="currentIndex >= props.productsResData.length - visibleProducts"
            >
                <FontAwesomeIcon :icon="faArrowRight"></FontAwesomeIcon>
            </button>
        </div>
        <div class="text-center mt-4">
            <p>Trang: {{ currentIndex + 1 }} / {{ maxIndex + 1 }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMutations } from 'vuex-composition-helpers';
const { ADD_TO_CART } = useMutations(['ADD_TO_CART']);
import { useState } from 'vuex-composition-helpers';
const { cart } = useState(['cart']);
const props = defineProps({
    productsResData: Array,
});
const currentIndex = ref(0);
const visibleProducts = 4;
const maxIndex = computed(() => props.productsResData.length - visibleProducts);
const nextSlide = () => {
    if (currentIndex.value < maxIndex.value) {
        currentIndex.value += 1;
    }
};
const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value -= 1;
    }
};
</script>
