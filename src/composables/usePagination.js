import { ref } from 'vue';

export const usePagination = () => {
    const currentPage = ref(1)
    const totalPages = ref(10)
    const handlePageChange=(page)=> {
      currentPage.value = page;
    }
    const handleNextPageChange=()=> {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }
    const handlePreviousPageChange = ()=> {
      if(currentPage.value <=1){
        return currentPage.value = 1
      }
      return currentPage.value = currentPage.value - 1
    }
  return {currentPage,totalPages,handlePageChange,handleNextPageChange,handlePreviousPageChange };
};