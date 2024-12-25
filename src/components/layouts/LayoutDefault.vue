<template>
    <Header />
    <main class="bg-slate-100 pb-8">
        <RouterView />
    </main>
    <Footer />
</template>
<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>
