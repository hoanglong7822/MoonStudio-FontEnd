<template>
    <transition name="fade">
        <div
            v-if="notification.visible"
            class="fixed top-32 z-10 right-0 w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
        >
            <div class="flex items-center">
                <img class="w-12 h-12" :src="notification.imageUrl" alt="Notification Image" />
                <div class="ms-3">
                    <div class="text-sm font-bold text-gray-900 dark:text-white">Thông báo</div>
                    <div class="text-sm">{{ notification.message }}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const notification = computed(() => store.state.notification);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
