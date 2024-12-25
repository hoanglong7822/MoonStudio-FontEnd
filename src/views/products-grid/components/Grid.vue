<template>
    <div class="mt-12 p-2 md:p-0">
        <div class="flex justify-between py-6">
            <div class="flex gap-4">
                <h1>Bộ lọc:</h1>
                <div class="flex hover:cursor-pointer relative">
                    <h1 @click="filter_price = !filter_price" class="font-semibold">Khoảng giá</h1>
                    <span v-if="filter_price" class="material-symbols-outlined"> arrow_drop_up </span>
                    <span v-else class="material-symbols-outlined"> arrow_drop_down </span>
                    <div
                        v-if="filter_price"
                        class="absolute left-0 top-10 bg-white shadow-lg border rounded-lg w-72 z-10 p-4"
                    >
                        <div>
                            <label for="min-price" class="text-sm font-medium"
                                >Giá:{{ rangePrice.toLocaleString('vi-VN') }} đ</label
                            >
                            <input
                                id="min-price"
                                type="range"
                                min="0"
                                max="1000000"
                                step="50000"
                                v-model="rangePrice"
                                class="w-full mt-2"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex hover:cursor-pointer relative">
                    <h1 @click="filter_size = !filter_size" class="font-semibold">Kích cỡ</h1>
                    <span v-if="filter_size" class="material-symbols-outlined"> arrow_drop_up </span>
                    <span v-else class="material-symbols-outlined"> arrow_drop_down </span>

                    <div
                        v-if="filter_size"
                        class="absolute top-10 left-0 bg-white shadow-lg border rounded-lg w-48 z-10 p-4"
                    >
                        <div v-for="size in availableSizes" :key="size" class="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                :id="'size-' + size"
                                :value="size"
                                v-model="selectedSizes"
                                class="w-4 h-4"
                            />
                            <label :for="'size-' + size" class="text-sm">{{ size }}</label>
                        </div>
                        <div class="flex justify-between mt-4">
                            <button
                                @click="applySizeFilter"
                                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Áp dụng
                            </button>
                            <button
                                @click="resetSizeFilter"
                                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Đặt lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div @click="filter_sort = !filter_sort" class="relative flex items-center hover:cursor-pointer">
                <span class="material-symbols-outlined mr-4"> filter_list </span>
                <h1>Sắp xếp theo</h1>
                <span v-if="filter_sort" class="material-symbols-outlined"> arrow_drop_up </span>
                <span v-else class="material-symbols-outlined"> arrow_drop_down </span>
                <!-- Dropdown menu -->
                <div v-if="filter_sort" class="absolute top-10 left-0 bg-white shadow-lg border rounded-lg w-48 z-10">
                    <button
                        @click.stop="sortProducts('asc')"
                        class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
                    >
                        Giá từ thấp đến cao
                    </button>
                    <button
                        @click.stop="sortProducts('desc')"
                        class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
                    >
                        Giá từ cao đến thấp
                    </button>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div
                v-for="item in visibleProducts"
                :key="item.product_id"
                class="relative group"
                @mouseleave="item.btnCart = false"
            >
                <!-- Nút thêm vào giỏ hàng -->
                <div
                    v-if="!item.btnCart"
                    @click="handleBtnCart(item)"
                    class="absolute px-2 w-full h-10 top-[68%] opacity-0 group-hover:opacity-100 font-bold text-gray-600 transition duration-300 ease-in-out"
                >
                    <button class="bg-white w-full h-10">Thêm vào giỏ hàng</button>
                </div>

                <!-- Nút chọn size -->
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

                <!-- Ảnh sản phẩm -->
                <router-link :to="'/product/' + item.product_id">
                    <img class="w-full h-auto" :src="item.image_url" alt="Product Image" />
                </router-link>

                <!-- Overlay loading -->
                <div v-if="item.loading" class="absolute inset-0 bg-black opacity-50"></div>
                <FontAwesomeIcon
                    v-if="item.loading"
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    :icon="faSpinner"
                    size="2x"
                    spin
                />

                <!-- Màu sắc -->
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
            <div class="flex flex-col items-center p-4 rounded">
                <button
                    @click="handleChangeSliceProducts"
                    class="bg-gray-600 border border px-8 py-2 rounded font-bold mb-4 text-white"
                >
                    Xem thêm
                </button>
                <h2 class="text-center font-medium">
                    Hiển thị {{ sliceProducts }} trên tổng số {{ props.productsData.length }}
                </h2>
            </div>
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
const sliceProducts = ref(8);
const props = defineProps(['productsData']);
const filter_price = ref(false);
const filter_size = ref(false);
const rangePrice = ref(0);
// Reactive state
const selectedColor = ref({});
const screenWidth = ref(window.innerWidth);
const handleChangeSliceProducts = () => {
    sliceProducts.value = sliceProducts.value * 2;
    if (sliceProducts.value > props.productsData.length) {
        sliceProducts.value = props.productsData.length;
    }
};
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
// const updateScreenWidth = () => {
//     screenWidth.value = window.innerWidth;
// };

onMounted(() => {
    // window.addEventListener('resize', updateScreenWidth);

    // Initialize products
    props.productsData.forEach((product) => {
        if (product.colors?.length) {
            selectedColor.value[product.product_id] = product.colors[0].hex_code;
        }
        product.loading = false;
        product.btnCart = false;
    });
});

// onUnmounted(() => {
//     window.removeEventListener('resize', updateScreenWidth);
// });

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
// const visibleProducts = computed(() => {
//     return screenWidth.value < 768 ? props.productsData.slice(0, 4) : props.productsData;
// });
// Danh sách các kích cỡ có sẵn
const availableSizes = ref(['S', 'M', 'L', 'XL', 'XXL']);

// Danh sách các kích cỡ được chọn
const selectedSizes = ref([]);

// Áp dụng bộ lọc kích cỡ
const applySizeFilter = () => {
    console.log('Các kích cỡ đã chọn:', selectedSizes.value);
    filter_size.value = false; // Đóng dropdown sau khi áp dụng
};

// Đặt lại bộ lọc kích cỡ
const resetSizeFilter = () => {
    selectedSizes.value = [];
    console.log('Đã đặt lại bộ lọc kích cỡ');
};
// Phương thức sắp xếp sản phẩm
const filter_sort = ref(false);
const sortProducts = (order) => {
    if (order === 'asc') {
        props.productsData.sort((a, b) => a.price - b.price); // Sắp xếp tăng dần
    } else if (order === 'desc') {
        props.productsData.sort((a, b) => b.price - a.price); // Sắp xếp giảm dần
    }
    filter_sort.value = false;
};
const visibleProducts = computed(() => {
    return props.productsData.slice(0, sliceProducts.value);
});
</script>

<style scoped>
button {
    cursor: pointer;
}
</style>
