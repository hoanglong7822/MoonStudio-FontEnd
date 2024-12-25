<template>
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 z-10" @click="toggleCart"></div>
    <!-- Cart Component -->
    <div class="fixed h-screen bg-white right-0 top-0 w-96 z-20">
        <div class="flex p-4 justify-between items-center">
            <h3 class="text-xl font-bold">Giỏ hàng ({{ cart.length }})</h3>
            <FontAwesomeIcon @click="toggleCart" class="font-bold" :icon="faX"></FontAwesomeIcon>
        </div>
        <div v-if="cart.length === 0" class="w-full">
            <h2 class="p-2">Hiện chưa có sản phẩm nào trong giỏ hàng</h2>
            <div class="w-full flex items-center justify-center"><img src="/images/cart-empty.png" /></div>
            <button
                @click="toggleCart"
                class="ml-20 w-60 h-12 border border-red-600 font-bold mt-4 rounded-[2px] text-red-600"
            >
                Tiếp tục mua sắm
            </button>
        </div>
        <div v-if="cart.length > 0" class="flex flex-col p-4 space-y-4 overflow-auto max-h-[calc(100%-4rem)]">
            <div v-for="item in cart" :key="item" class="flex gap-8">
                <div class="w-18 h-24">
                    <img :src="item.image_url" alt="image" class="w-full h-full" />
                </div>
                <div class="grow">
                    <div class="flex justify-between">
                        <h3 class="text-sm font-semibold">{{ item.name }}</h3>
                        <span class="material-symbols-outlined hover:cursor-pointer"> more_vert </span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="h-6 w-6 bg-white border border-black flex items-center justify-center rounded-full">
                            <div class="h-4 w-4 rounded-full" :style="{ backgroundColor: item.color }"></div>
                        </div>
                        <h3 class="text-sm">ST01</h3>
                        <h3 class="text-sm">{{ item.size }}</h3>
                    </div>
                    <div class="text-sm mt-4 flex justify-between">
                        <h3 class="font-semibold">{{ parseFloat(item.price).toLocaleString('vi-VN') }} đ</h3>
                        <div class="flex">
                            <span
                                @click="DECREMENT_PRODUCT(item)"
                                class="material-symbols-outlined border hover:cursor-pointer"
                            >
                                remove
                            </span>
                            <h1 class="border px-2 text-center font-semibold">{{ item.productInCart }}</h1>
                            <span
                                @click="INCREMENT_PRODUCT(item)"
                                class="material-symbols-outlined border hover:cursor-pointer"
                            >
                                add
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute right-0 bg-gray-100 bottom-0 w-full p-4">
                <div class="">
                    <div class="flex justify-between font-bold">
                        <h3>Tạm tính:</h3>
                        <h3>{{ totalPrice.toLocaleString('vi-VN') }} đ</h3>
                    </div>
                    <button
                        @click="goToCheckout"
                        class="bg-red-600 w-full h-12 text-white font-bold mt-4 rounded-[5px]"
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
        <div
            v-if="isDeletePopupVisible"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
        >
            <div class="bg-white rounded-lg p-6 w-80 text-center">
                <h3 class="text-xl font-bold mb-4">Xóa sản phẩm?</h3>
                <p class="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
                <div class="flex justify-center space-x-4">
                    <button @click="confirmDelete" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                        Xóa
                    </button>
                    <button @click="cancelDelete" class="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faX, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMutations } from 'vuex-composition-helpers';
import { ref } from 'vue';
const store = useStore();
const cart = computed(() => {
    return store.state.cart;
});
const { INCREMENT_PRODUCT, DECREMENT_PRODUCT } = useMutations(['INCREMENT_PRODUCT', 'DECREMENT_PRODUCT']);

const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => {
        return sum + parseFloat(item.price * item.productInCart);
    }, 0);
});
const isDeletePopupVisible = ref(false);

const confirmDelete = () => {
    isDeletePopupVisible = false;
};
const cancelDelete = () => {
    isDeletePopupVisible = false;
};
watch;
const emit = defineEmits(['handleChangeCartToggle']);
function toggleCart() {
    emit('handleChangeCartToggle');
}
//redirect to CheckOut
const router = useRouter();
const goToCheckout = () => {
    router.push({ name: 'checkOut' });
    toggleCart();
};
</script>
