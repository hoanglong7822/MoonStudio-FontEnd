<template>
    <div class="container mx-auto mt-12">
        <div class="flex w-full items-center space-x-2 md:space-x-4 pr-4 md:pr-0">
            <button
                @click="goToHome"
                class="bg-gray-200 md:hidden shrink-0 hover:bg-gray-300 h-10 w-10 rounded-full ml-2"
            >
                <FontAwesomeIcon size="1x" :icon="faArrowLeft" />
            </button>
            <div
                class="flex w-full relative space-x-2 items-center bg-white h-10 rounded-full border border-2 focus-within:border-black transition-all duration-200"
            >
                <a>
                    <FontAwesomeIcon :icon="faSearch" class="text-md md:text-2xl p-2" />
                </a>
                <input
                    @click="goToSearch"
                    ref="search-input"
                    v-model="search"
                    class="h-full grow rounded-r-full focus:outline-none"
                    placeholder="Search?"
                    @input="onInput"
                />
                <button
                    @click="handleDeleteSearchInput"
                    class="absolute hidden md:block right-0 -translate-x-1/2 hover:text-gray-600"
                >
                    Delete
                </button>
                <button
                    @click="handleDeleteSearchInput"
                    class="absolute md:hidden right-0 -translate-x-full hover:text-gray-600"
                >
                    <FontAwesomeIcon size="1x" :icon="faX" />
                </button>
            </div>
            <button @click="goToHome" class="hidden md:block bg-gray-200 hover:bg-gray-300 h-10 w-10 rounded-full">
                <FontAwesomeIcon size="1x" :icon="faX" />
            </button>
        </div>
        <h3 v-if="loading" class="h-full text-center mt-12 mb-12">
            <FontAwesomeIcon :icon="faSpinner" spin="" size="2x" />
        </h3>
        <div v-if="searchResult.length > 0" class="mt-12">
            <h1 class="font-bold text-2xl mb-6">Products</h1>
            <div class="grid grid-cols-2 p-2 gap-2 md:grid-cols-5 gap-8">
                <div v-for="item in searchResult" class="">
                    <img class="w-full h-5/6" :src="item.image_url" alt="Image Product" />
                    <h3>{{ item.name }}</h3>
                    <h3 class="font-bold">{{ item.price }} đ</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getApi, postApi } from '@/services/api';
import { faArrowLeft, faSearch, faSpinner, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goToHome = () => {
    router.push('/');
};
const handleDeleteSearchInput = () => {
    search.value = '';
    searchResult.value = [];
};
const search = ref('');
const searchResult = ref([]);
const loading = ref(false);
let timeout = null;
const onInput = () => {
    clearTimeout(timeout);
    loading.value = true;
    timeout = setTimeout(() => {
        postApi('http://127.0.0.1:8000/search', { name: search.value })
            .then((response) => {
                searchResult.value = response.data;
            })
            .catch((err) => {
                return err;
            })
            .finally(() => {
                loading.value = false;
            });
    }, 500);
};
</script>
