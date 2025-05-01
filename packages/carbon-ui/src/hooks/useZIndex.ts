import { computed, ref } from 'vue'

const zIndex = ref(0)
const useZIndex = (initialVal = 2000) => {
  const initialZIndex = ref(initialVal)
  const currentZIndex = computed(() => zIndex.value + initialZIndex.value)
  return {
    currentZIndex,
    initialZIndex,
  }
}

export default useZIndex
