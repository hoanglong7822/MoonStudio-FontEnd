<!-- <template>
    <section class="py-8 bg-gray-100">
      <div class="container  mx-auto px-4 ">
        <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">Our Products</h2>
        
        <div class="grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div class="product-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/300x200" alt="Product 1" class="w-full h-56 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800">Product 1</h3>
              <p class="text-gray-600 text-sm">This is a short description for Product 1.</p>
              <span class="text-lg font-bold text-gray-900">$19.99</span>
            </div>
          </div>
          <div class=" justify-between w-full flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-4 bg-orange-600">
                <button>1</button>
                <button>2</button>
        </div>
          <div class="product-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/300x200" alt="Product 2" class="w-full h-56 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800">Product 2</h3>
              <p class="text-gray-600 text-sm">This is a short description for Product 2.</p>
              <span class="text-lg font-bold text-gray-900">$29.99</span>
            </div>
          </div>
  
          <div class="product-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/300x200" alt="Product 3" class="w-full h-56 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800">Product 3</h3>
              <p class="text-gray-600 text-sm">This is a short description for Product 3.</p>
              <span class="text-lg font-bold text-gray-900">$39.99</span>
            </div>
          </div>
  
          <div class="product-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/300x200" alt="Product 4" class="w-full h-56 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800">Product 4</h3>
              <p class="text-gray-600 text-sm">This is a short description for Product 4.</p>
              <span class="text-lg font-bold text-gray-900">$49.99</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
   -->

   <template>
    <div class="overflow-hidden mt-8 w-full">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * (100 / productsPerView)}%)` }"
      >
        <div
          v-for="(product, index) in products"
          :key="index"
          class="w-1/4 flex-shrink-0 p-4"
        >
          <div class="product-card border p-4 rounded-lg">
            <img :src="product.image" alt="product image" class="h-48 w-full object-cover rounded-lg mb-4" />
            <h3 class="text-lg font-semibold">{{ product.name }}</h3>
            <p class="text-gray-500">{{ product.price }}</p>
          </div>
        </div>
      </div>
  
      <!-- Nút điều hướng -->
      <div class="flex justify-between mt-4">
        <button
          @click="prevSlide"
          class="bg-gray-200 p-2 rounded-full hover:bg-gray-300 disabled:opacity-50"
          :disabled="currentSlide === 0"
        >
          &larr;
        </button>
        <button
          @click="nextSlide"
          class="bg-gray-200 p-2 rounded-full hover:bg-gray-300 disabled:opacity-50"
          :disabled="currentSlide >= maxSlide"
        >
          &rarr;
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentSlide: 0,
        productsPerView: 4, // Số lượng sản phẩm hiển thị cùng lúc
        products: [
          { name: 'Sản phẩm 1', price: '$10', image: 'https://via.placeholder.com/150' },
          { name: 'Sản phẩm 2', price: '$20', image: 'https://via.placeholder.com/150' },
          { name: 'Sản phẩm 3', price: '$30', image: 'https://via.placeholder.com/150' },
          { name: 'Sản phẩm 4', price: '$40', image: 'https://via.placeholder.com/150' },
          { name: 'Sản phẩm 5', price: '$50', image: 'https://via.placeholder.com/150' },
          { name: 'Sản phẩm 6', price: '$60', image: 'https://via.placeholder.com/150' },
          { name: 'Sản phẩm 7', price: '$70', image: 'https://via.placeholder.com/150' },
          { name: 'Sản phẩm 8', price: '$80', image: 'https://via.placeholder.com/150' },
          { name: 'Sản phẩm 9', price: '$90', image: 'https://via.placeholder.com/150' },
        ],
      };
    },
    computed: {
      maxSlide() {
        return this.products.length - this.productsPerView;
      },
    },
    methods: {
      nextSlide() {
        if (this.currentSlide < this.maxSlide) {
          this.currentSlide++;
        }
      },
      prevSlide() {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .product-card {
    transition: transform 0.3s;
  }
  .product-card:hover {
    transform: scale(1.05);
  }
  </style>
  
  