<script setup>
import { computed } from 'vue';
const emit = defineEmits(['handlePageChange','handleNextPageChange','handlePreviousPageChange'])
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  }
});
const pagesArray = computed(() => {
  return Array.from({ length: props.totalPages }, (_, i) => i + 1);
});
console.log("pagesArray",props.totalPages)
</script>
<template>
<div class="flex mt-8 items-center justify-center space-x-2">
  <button @click="emit('handlePreviousPageChange')"  class="px-3 py-1 rounded bg-gray-200 text-gray-500 hover:bg-gray-300 disabled:opacity-50" >
    Previous
  </button>
  
  <button v-for="page in pagesArray" 
          :key="page" 
          :class="['px-3 py-1 rounded', props.currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']"
          @click="emit('handlePageChange',page)">
    {{ page }}
  </button>
  
  <button @click="emit('handleNextPageChange')" class="px-3 py-1 rounded bg-gray-200 text-gray-500 hover:bg-gray-300 disabled:opacity-50">
    Next
  </button>
</div>
</template>