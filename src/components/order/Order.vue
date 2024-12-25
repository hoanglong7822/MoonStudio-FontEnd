<template>
    <div class="h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-green-600">Thanh toán thành công!</h1>
            <p class="mt-4 text-lg text-gray-600">
                Bạn sẽ được chuyển hướng về trang chủ trong <span class="font-semibold">{{ countdown }}</span> giây...
            </p>
            <button
                @click="redirectToHome"
                class="mt-6 px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-blue-600"
            >
                Về trang chủ ngay
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(3);

function redirectToHome() {
    router.push('/');
}

onMounted(() => {
    const interval = setInterval(() => {
        if (countdown.value > 1) {
            countdown.value--;
        } else {
            clearInterval(interval);
            redirectToHome();
        }
    }, 1000);
});
</script>
