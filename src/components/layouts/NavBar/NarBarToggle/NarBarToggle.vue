<template>
    <div class="absolute bg-blue-400 right-0 md:hidden h-full flex items-center justify-center">
        <FontAwesomeIcon @click="navBarToggle = !navBarToggle" :icon="faBars" size="2x" color="#fff"></FontAwesomeIcon>
    </div>
    <div
        v-if="navBarToggle"
        class="absolute right-0 top-0 z-10 bg-gray-400 w-40 transition-all duration-500 ease-in-out"
    >
        <FontAwesomeIcon
            @click="navBarToggle = !navBarToggle"
            :icon="faX"
            size="2x"
            color="#fff"
            class="absolute right-0 translate-y-1/2"
        ></FontAwesomeIcon>
        <ul class="mt-16 font-bold md:text-xl">
            <NarBarItems></NarBarItems>
        </ul>
    </div>
    <div></div>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import NarBarItems from '../NavBarItems/NarBarItems.vue';
const navBarToggle = ref(false);
</script>
