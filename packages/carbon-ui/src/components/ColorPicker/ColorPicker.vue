<template>
  <div
    class="cb-color-picker"
    :class="{ 'is-expanded': isExpanded }"
    :style="{
      borderRadius: props.circle ? '50%' : '6px',
    }"
  >
    <icon icon="angle-up" class="expand-angle" color="var(--cb-color-white)"></icon>
    <input
      ref="_ref"
      type="color"
      :value="currentColor"
      @input="handleColorChange(($event.target as HTMLInputElement).value)"
      @focus="handleFocus"
      @blur="isExpanded = false"
      :style="{
        borderRadius: props.circle ? '50%' : '4px',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType, onMounted, watch } from 'vue'
import type { ThemeType } from './types'
import { themeTypes } from './types'
import { debouncedUpdateTheme, currentThemeColors } from '@/utils/colorUtils'
import Icon from '@/components/Icon/Icon.vue'
import type { ColorPickerEmits } from './types'

defineOptions({
  name: 'CbColorPicker',
})

const props = defineProps({
  modelvalue: {
    type: String,
    default: '#409eff',
  },
  // 修改为可选 prop
  themeType: {
    type: String as PropType<ThemeType | undefined>, // 允许 undefined
    required: false, // 非必传
    validator: (val: string | undefined): val is ThemeType =>
      val ? (themeTypes as readonly string[]).includes(val) : true,
  },
  circle: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<ColorPickerEmits>()

// 取色器实例
const _ref = ref<HTMLInputElement | null>(null)
const isExpanded = ref(false)

// 从CSS变量初始化当前颜色
const currentColor = ref('#409eff')

// 处理颜色变化
const handleColorChange = (value: string) => {
  // 仅在主题模式更新主题
  if (props.themeType) {
    debouncedUpdateTheme(value, props.themeType!)
  }
  currentColor.value = value
  // 始终触发事件
  emits('color-change', value)
}

const handleFocus = () => {
  isExpanded.value = true
}

watch(
  () => props.modelvalue,
  (newVal) => {
    if (newVal) {
      currentColor.value = newVal
    }
  },
  { immediate: true },
)

if (props.themeType) {
  watch(
    () => currentThemeColors[props.themeType!],
    (newValue) => {
      currentColor.value = newValue || '#409eff'
    },
  )
}

onMounted(() => {
  //初始化当前颜色
  if (props.modelvalue) {
    currentColor.value = props.modelvalue
  } else {
    currentColor.value = _ref.value?.value || '#409eff'
  }
  if (props.themeType) {
    currentColor.value = currentThemeColors[props.themeType] || '#409eff'
  }
})

defineExpose({
  ref: _ref,
})
</script>
