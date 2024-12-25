<template>
    <div class="mt-12 p-2 md:p-0">
        <div class="mb-8">
            <img :src="imageUrl" alt="Banner Image" />
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div
                v-for="item in visibleProducts"
                :key="item.product_id"
                class="relative group"
                @mouseleave="item.btnCart = false"
            >
                <div
                    v-if="!item.btnCart"
                    @click="handleBtnCart(item)"
                    class="absolute px-2 w-full h-10 top-[68%] opacity-0 group-hover:opacity-100 font-bold text-gray-600 transition duration-300 ease-in-out"
                >
                    <button class="bg-white w-full h-10">Thêm vào giỏ hàng</button>
                </div>

                <div
                    v-if="item.btnCart"
                    class="absolute flex justify-center space-x-5 bg-white w-full h-10 top-[68%] transition duration-300 ease-in-out"
                >
                    <button
                        v-for="size in item.sizes"
                        :key="size.name"
                        @click="addToCart(item, selectedColor[item.product_id], size)"
                        class="hover:text-red-600"
                    >
                        {{ size.name }}
                    </button>
                </div>

                <router-link :to="'/product/' + item.product_id">
                    <img class="w-full h-auto" :src="item.image_url" alt="Product Image" />
                </router-link>

                <div v-if="item.loading" class="absolute inset-0 bg-black opacity-50"></div>
                <FontAwesomeIcon
                    v-if="item.loading"
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    :icon="faSpinner"
                    size="2x"
                    spin
                />

                <div class="flex gap-2 mt-4 mb-2">
                    <div
                        v-for="color in item.colors"
                        :key="color.hex_code"
                        class="bg-white w-6 h-6 border rounded-full flex items-center justify-center"
                        :class="{
                            'border-black': selectedColor[item.product_id] === color.hex_code,
                            'border-gray-300': selectedColor[item.product_id] !== color.hex_code,
                        }"
                    >
                        <button
                            :style="{ backgroundColor: color.hex_code }"
                            class="w-4 h-4 rounded-full"
                            @click="selectColor(item.product_id, color.hex_code)"
                        ></button>
                    </div>
                </div>
                <h2 class="text-gray-800">{{ item.name }}</h2>
                <h2 class="font-bold text-gray-900">{{ parseFloat(item.price).toLocaleString('vi-VN') }} đ</h2>
            </div>
        </div>
        <div class="w-full flex justify-center items-center mt-8">
            <button
                @click="router.push(props.url)"
                class="bg-white text-red-600 border border-red-600 px-4 py-2 rounded font-bold"
            >
                Xem tất cả
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useMutations } from 'vuex-composition-helpers';
import { store } from '@/vuex/store';
import { useRouter } from 'vue-router';
const router = useRouter();
// Props
const props = defineProps(['imageUrl', 'productsData', 'url']);

// Reactive state
const selectedColor = ref({});
const screenWidth = ref(window.innerWidth);

// Vuex mutation
const { ADD_TO_CART } = useMutations(['ADD_TO_CART']);

// Functions
const handleBtnCart = (product) => {
    product.btnCart = true;
};

const selectColor = (productId, color) => {
    selectedColor.value = {
        ...selectedColor.value,
        [productId]: color,
    };
};

const addToCart = (item, color, size) => {
    item.color = color;
    item.size = size.name;
    ADD_TO_CART(item);
    item.loading = true;
    setTimeout(() => {
        item.loading = false;
        store.dispatch('triggerNotification', {
            message: `Sản phẩm "${item.name}" đã được thêm vào giỏ hàng!`,
            imageUrl: item.image_url,
        });
    }, 2000);
};

// Screen width handler
const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
};

onMounted(() => {
    window.addEventListener('resize', updateScreenWidth);

    // Initialize products
    props.productsData.forEach((product) => {
        if (product.colors?.length) {
            selectedColor.value[product.product_id] = product.colors[0].hex_code;
        }
        product.loading = false;
        product.btnCart = false;
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
});

// Watch for changes in productsData
watch(
    () => props.productsData,
    (newProducts) => {
        newProducts.forEach((product) => {
            if (product.colors?.length && !selectedColor.value[product.product_id]) {
                selectedColor.value[product.product_id] = product.colors[0].hex_code;
            }
        });
    },
    { immediate: true },
);

// Computed properties
const visibleProducts = computed(() => {
    return screenWidth.value < 768 ? props.productsData.slice(0, 4) : props.productsData;
});
</script>

<style scoped>
button {
    cursor: pointer;
}
</style>
