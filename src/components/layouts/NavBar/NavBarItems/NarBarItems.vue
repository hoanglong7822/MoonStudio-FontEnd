<template>
    <li v-for="item in navigation" :key="item.id" class="fold-bold mb-4 md:mb-0">
        <RouterLink :to="item.href">{{ item.name }}</RouterLink>
    </li>
</template>
<script setup>
const navigation = [
    { id: 1, name: 'Nam', href: '/men', current: true },
    { id: 2, name: 'Nữ', href: '/girl', current: false },
    { id: 3, name: 'Bé trai', href: '/boy', current: false },
    { id: 4, name: 'Bé gái', href: '/baby-girl', current: false },
];
</script>
