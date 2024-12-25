<template>
    <toast></toast>
    <component :is="layout"></component>
</template>

<script setup>
import LayoutDefault from './components/layouts/LayoutDefault.vue';
import SearchLayout from './components/layouts/SearchLayout.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import toast from './components/toast/Toast.vue';
const layouts = {
    LayoutDefault,
    SearchLayout,
};

const route = useRoute();
const layout = computed(() => layouts[route.meta.layout] || LayoutDefault);
</script>
