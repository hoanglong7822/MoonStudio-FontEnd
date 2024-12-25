<template>
    <nav class="bg-white fixed top-0 right-0 left-0 z-10 border-b">
        <div class="hidden md:block bg-gray-600 p-2 text-center text-white font-bold capitalize">
            Đổi hàng miễn phí - tại tất cả cửa hàng trong 30 ngày
        </div>
        <Cart v-if="cartToggle" @handleChangeCartToggle="handleChangeCartToggle"></Cart>
        <div class="container relative m-full md:mx-auto px-2 md:p-0">
            <div class="items-center space-x-2 justify-between flex py-4">
                <router-link :to="'/'">
                    <div class="text-md md:text-2xl h-16 w-16 flex items-center">
                        <img class="w-full" src="/images/back_logo.png" alt="logo" />
                    </div>
                </router-link>
                <ul class="hidden md:flex space-x-6 font-bold md:text-lg">
                    <NarBarItems />
                </ul>
                <div
                    class="flex hidden md:flex w-80 space-x-2 items-center h-10 rounded-full border focus-within:border-black transition-all duration-200"
                >
                    <!-- Icon search -->
                    <a class="flex items-center justify-center h-full p-2">
                        <FontAwesomeIcon :icon="faSearch" class="text-white text-lg" />
                    </a>

                    <!-- Input field -->
                    <input
                        @click="goToSearch"
                        ref="search-input"
                        v-model="mes"
                        class="h-full grow rounded-r-full focus:outline-none px-3"
                        placeholder="Bạn muốn tìm gì?"
                    />
                </div>

                <div>
                    <div class="space-x-4 flex flex-1">
                        <div class="text-center md:hidden hover:cursor-pointer">
                            <a><FontAwesomeIcon :icon="faSearch" class="text-md md:text-xl" /></a>
                        </div>
                        <div class="text-center hover:cursor-pointer">
                            <span class="material-symbols-outlined"> store </span>
                            <h2 class="hidden md:block text-sm">Cửa hàng</h2>
                        </div>
                        <div class="text-center hover:cursor-pointer">
                            <span class="material-symbols-outlined"> person </span>
                            <h2 class="hidden md:block text-sm">Tài khoản</h2>
                        </div>
                        <div @click="cartToggle = !cartToggle" class="relative text-center hover:cursor-pointer">
                            <span class="material-symbols-outlined"> shopping_bag </span>
                            <span
                                v-if="cart.length > 0"
                                class="absolute top-0 left-1/2 translate-x-2/3 -translate-y-2/3 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center"
                            >
                                {{ cart.length }}
                            </span>
                            <h2 class="hidden md:block text-sm">Giỏ hàng</h2>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="md:hidden justify-between flex space-x-6 font-bold md:text-lg">
                <NarBarItems />
            </ul>
        </div>
    </nav>
</template>
<script setup>
import NarBarItems from './NavBarItems/NarBarItems.vue';
import Cart from '@/components/cart/Cart.vue';
import NarBarToggle from './NarBarToggle/NarBarToggle.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStore, faSearch, faSmile, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'vuex-composition-helpers';
import { onMounted, ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
///go to search
const router = useRouter();
const goToSearch = () => {
    router.push('/search');
};
///focus input
const searchInput = useTemplateRef('search-input');
onMounted(() => {
    searchInput.value.focus();
});
const mes = ref('');
///handle cart
const { cart } = useState(['cart']);
const cartToggle = ref(false);
const handleChangeCartToggle = () => {
    cartToggle.value = !cartToggle.value;
};
</script>
