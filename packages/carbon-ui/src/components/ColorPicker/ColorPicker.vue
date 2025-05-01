<template>
  <div
    class="cb-color-picker"
    :class="{ 'is-expanded': isExpanded }"
    :style="{
      borderRadius: props.circle ? '50%' : '6px',
    }"
  >
    <div class="cb-color-picker__angle">
      <icon icon="angle-up" class="expand-angle" color="var(--cb-color-white)"></icon>
    </div>
    <Tooltip trigger="click" :open-delay="0" :close-delay="0">
      <input
        type="color"
        :value="currentColor"
        @click.prevent="NOOP"
        @blur="isExpanded = false"
        @focus="handleFocus"
        :style="{
          borderRadius: props.circle ? '50%' : '4px',
        }"
      />
      <template #content>
        <SketchPicker
          ref="_ref"
          v-model="currentColor"
          @update:modelValue="handleColorChange"
          @blur="isExpanded = false"
        />
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type Component } from 'vue'
import { debouncedUpdateTheme, currentThemeColors } from '@/utils/colorUtils'
import Icon from '@/components/Icon/Icon.vue'
import type { ColorPickerEmits, ColorPickerProps } from './types'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import { SketchPicker } from 'vue-color'
import type {} from 'vue-color'

defineOptions({
  name: 'CbColorPicker',
  components: {
    SketchPicker: SketchPicker as Component,
  },
})

const currentColor = ref('#409eff')

// 从CSS变量初始化当前颜色
const props = defineProps<ColorPickerProps>()

const emits = defineEmits<ColorPickerEmits>()

// 取色器实例
const _ref = ref<HTMLInputElement | null>(null)
const isExpanded = ref(false)

const NOOP = () => {}

// 处理颜色变化
const handleColorChange = (value: string) => {
  // 仅在主题模式更新主题
  if (props.themeType) {
    debouncedUpdateTheme(value, props.themeType!)
  }
  currentColor.value = value
  // 始终触发事件
  emits('color-change', value)
  emits('update:modelValue', value)
  emits('change', value)
  emits('input', value)
}

const handleFocus = () => {
  isExpanded.value = true
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && newVal !== currentColor.value) {
      currentColor.value = newVal
      if (props.themeType) {
        debouncedUpdateTheme(newVal, props.themeType!)
      }
    }
  },
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
  if (props.modelValue) {
    currentColor.value = props.modelValue
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
