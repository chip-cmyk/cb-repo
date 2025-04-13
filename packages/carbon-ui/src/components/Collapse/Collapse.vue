<template>
  <div class="cb-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({
  name: 'CbCollapse',
})
const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: () => [], // 设置默认值为空数组
})
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>([])

if (props.accordion && props.modelValue.length > 1)
  console.warn('accordion mode should only have one active item')

watch(
  () => props.modelValue,
  (newValue) => {
    activeNames.value = newValue
  },
  { immediate: true },
)

const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = activeNames.value[0] === item ? [] : [item]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}
provide(collapseContextKey, { activeNames, handleItemClick })
</script>
