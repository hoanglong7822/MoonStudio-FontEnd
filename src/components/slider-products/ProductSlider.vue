<template>
    <div class="mb-12">
        <div class="flex justify-between mr-2">
            <h2 class="mb-2 font-bold text-xl md:text-2xl">Áo nỉ</h2>
            <div class="flex space-x-2 items-center justify-between">
                <a>Xem thêm </a>
                <div>
                    <span class="material-symbols-outlined text-red-600 text-sm font-bold"> arrow_forward_ios </span>
                    <span class="material-symbols-outlined text-red-600 text-sm font-bold"> arrow_forward_ios </span>
                </div>
            </div>
        </div>
        <div class="md:flex p-2 md:p-0 space-x-[12px] space-y-2 md:space-y-0 h-[520px]">
            <div class="basis-[32%]">
                <img class="hidden md:block h-full w-full" :src="props.imageUrl[0]" alt="images" />
                <img class="md:hidden block h-full w-full" :src="props.imageUrl[1]" alt="images" />
            </div>
            <div class="basis-[68%]">
                <div class="flex relative h-full overflow-hidden">
                    <div
                        class="flex h-full w-full ml-[12px] transition-transform duration-500"
                        :style="{ transform: `translateX(-${currentIndex * 40}%)` }"
                    >
                        <div
                            v-for="product in props.productsDataResponse"
                            class="h-full mr-[12px] w-[calc(40%-12px)] shrink-0"
                        >
                            <router-link :to="'/product/' + product.product_id">
                                <img class="h-[80%]" :src="product.image_url" alt="image" />
                            </router-link>
                            <div class="flex gap-2 mt-4 mb-2">
                                <div
                                    v-for="color in product.colors"
                                    class="bg-white w-6 h-6 border border-2 rounded-full flex items-center justify-center"
                                >
                                    <button
                                        :style="{ backgroundColor: color.hex_code }"
                                        class="h-4 w-4 rounded-full"
                                    ></button>
                                </div>
                            </div>
                            <h2 class="">{{ product.name }}</h2>
                            <h2 class="font-bold">{{ parseFloat(product.price).toLocaleString('vi-VN') }} đ</h2>
                        </div>
                    </div>
                    <button @click="prevSlide" class="hidden md:block absolute translate-x-full z-5 top-[40%]">
                        <span class="material-symbols-outlined font-semibold text-3xl hover:text-gray-600">
                            arrow_back
                        </span>
                    </button>
                    <button @click="nextSlide" class="hidden md:block absolute right-0 -translate-x-3/4 z-5 top-[40%]">
                        <span class="material-symbols-outlined font-semibold text-3xl hover:text-gray-600">
                            arrow_forward
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
const a = [1, 2, 3, 4, 5];
const props = defineProps(['productsDataResponse', 'imageUrl']);
const currentIndex = ref(0);
const visibleProducts = 4;
const maxIndex = computed(() => props.productsDataResponse.length - visibleProducts);
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
