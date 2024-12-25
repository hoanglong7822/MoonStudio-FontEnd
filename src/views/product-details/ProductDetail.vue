<template>
    <div class="container mx-auto pt-36">
        <div v-if="productsDataResponse" class="md:flex md:h-[700px]">
            <div class="basis-[60%] flex h-full justify-between md:mr-8">
                <div class="h-full">
                    <img class="h-full" :src="productsDataResponse.image_url" />
                </div>
            </div>
            <div class="basis-[40%] p-2 md:p-0">
                <div class="space-y-8">
                    <h1 class="font-semibold text-2xl">Áo nỉ nam</h1>
                    <div class="flex space-x-[2px]">
                        <h2 class="t">Mã sp:</h2>
                        <h2 class="font-semibold">{{ productsDataResponse.product_id }}</h2>
                    </div>
                    <h1 class="font-bold text-xl">{{ productsDataResponse.price }} đ</h1>
                    <div class="flex space-x-2">
                        <h1>Màu sắc:</h1>
                        <h1 class="font-semibold">{{ selectedColor || 'Chọn màu' }}</h1>
                    </div>
                    <div class="flex space-x-2">
                        <div
                            v-for="color in productsDataResponse.colors"
                            :key="color.hex_code"
                            class="h-10 w-10 border-2 flex items-center justify-center"
                            :class="{
                                'border-black': selectedColor === color.hex_code,
                                'hover:border-black': selectedColor !== color.hex_code,
                            }"
                        >
                            <button
                                :style="{ backgroundColor: color.hex_code }"
                                class="h-7 w-7 rounded-full"
                                @click="selectedColor = color.hex_code"
                            ></button>
                        </div>
                    </div>
                    <h1>Kích cỡ:</h1>
                    <div class="flex space-x-2">
                        <button
                            v-for="size in ['S', 'M', 'L', 'XL']"
                            :key="size"
                            class="h-10 w-10 border-2 hover:border-black"
                            :class="{ 'border-black': selectedSize === size }"
                            @click="selectedSize = size"
                        >
                            {{ size }}
                        </button>
                    </div>
                    <div class="flex space-x-2">
                        <button class="basis-[100%] bg-red-600 h-12 text-white font-bold" @click="addToCart()">
                            Thêm vào giỏ
                        </button>
                        <!-- <button class="basis-[40%] border-2 h-12 font-bold">Tìm tại cửa hàng</button> -->
                    </div>
                    <div class="font-bold flex justify-between">
                        <h1>Mô tả</h1>
                        <button>--</button>
                    </div>
                </div>
            </div>
        </div>
        <h3 v-else class="h-full text-center mt-12 mb-12">
            <FontAwesomeIcon :icon="faSpinner" spin="" size="2x" />
        </h3>
    </div>
</template>

<script setup>
import { getApi } from '@/services/api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useMutations } from 'vuex-composition-helpers';
import { store } from '@/vuex/store';

const { ADD_TO_CART } = useMutations(['ADD_TO_CART']);

const route = useRoute();
const productsDataResponse = ref(null);

const selectedColor = ref(null);
const selectedSize = ref(null);

onMounted(() => {
    const productId = route.params.id;
    fetchProductDetails(productId);
});

async function fetchProductDetails(id) {
    const response = await getApi(`http://127.0.0.1:8000/product/${id}`);
    if (response.status === 200) {
        productsDataResponse.value = response.data;
    }
}
function addToCart() {
    if (!selectedColor.value || !selectedSize.value) {
        alert('Vui lòng chọn màu sắc và kích cỡ!');
        return;
    }

    if (productsDataResponse.value) {
        const product = { ...productsDataResponse.value, color: selectedColor, size: selectedSize };
        ADD_TO_CART(product);
        store.dispatch('triggerNotification', {
            message: `Sản phẩm "${product.name}" đã được thêm vào giỏ hàng!`,
            imageUrl: product.image_url,
        });
    }
}
</script>
