<template>
    <div class="p-4 pt-36">
        <h1 class="text-2xl font-bold mb-4">Danh Mục: {{ categoryName }}</h1>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(product, index) in filteredProducts" :key="index" class="border p-2 rounded shadow">
                <img :src="product.image" :alt="product.name" class="w-full mb-2" />
                <h2 class="text-lg font-semibold">{{ product.name }}</h2>
                <p class="text-gray-500">{{ product.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryPage',
    data() {
        return {
            products: [
                { category: 'quan-ao-ni', name: 'Áo Nỉ 1', price: '500,000 VND', image: '/images/ao-ni-1.jpg' },
                { category: 'quan-ao-ni', name: 'Áo Nỉ 2', price: '600,000 VND', image: '/images/ao-ni-2.jpg' },
                { category: 'quan-ao-he', name: 'Áo Hè 1', price: '300,000 VND', image: '/images/ao-he-1.jpg' },
                { category: 'quan-ao-thu', name: 'Áo Thu 1', price: '400,000 VND', image: '/images/ao-thu-1.jpg' },
            ],
        };
    },
    computed: {
        categoryName() {
            // Lấy tham số động từ URL
            return this.$route.params.category;
        },
        filteredProducts() {
            // Lọc sản phẩm theo danh mục
            return this.products.filter((product) => product.category === this.categoryName);
        },
    },
};
</script>
