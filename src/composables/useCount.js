import { ref } from "vue";

export const useCount = () => {
  const count = ref(0);  // count là một ref, không cần gói nó vào đối tượng

  const incrementCount = () => {
    count.value = count.value + 1;
  };

  return { count, incrementCount };
};