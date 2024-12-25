<template>
    <div class="relative w-full mt-32">
        <!-- Slide Banner -->
        <div class="relative w-full overflow-hidden">
            <img
                v-for="(image, index) in images"
                :key="index"
                v-show="currentSlide === index"
                class="w-full transition-all duration-500 ease-in-out"
                :src="image"
                alt="banner"
            />
        </div>

        <span
            @click="prevSlide"
            class="material-symbols-outlined absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer bg-gray-800 bg-opacity-50 text-white rounded-full p-2 text-3xl hover:bg-gray-700 transition"
        >
            arrow_back_ios
        </span>

        <span
            @click="nextSlide"
            class="material-symbols-outlined absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer bg-gray-800 bg-opacity-50 text-white rounded-full p-2 text-3xl hover:bg-gray-700 transition"
        >
            arrow_forward_ios
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const images = [
    '/images/banner/ssnd_topbanner_desktop-06.12.webp',
    '/images/banner/aolen_topbanner_desktop-13.11.webp',
    '/images/banner/canifas_topbanner_desktop-ud-25.11.webp',
];

const currentSlide = ref(0);

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + images.length) % images.length;
};

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % images.length;
};
</script>
