<template>
  <div
    class="cb-switch"
    :class="[
      {
        [`cb-switch--${size}`]: size,
        'is-disabled': disabled,
        'is-checked': checked,
      },
      attrs.class,
    ]"
    @click="switchValue"
    :style="[switchStyles, attrs.style as any]"
  >
    <input
      ref="input"
      type="checkbox"
      class="cb-switch__input"
      role="switch"
      :name="name"
      :disabled="disabled"
      v-bind="filteredAttrs"
    />
    <div class="cb-switch__core">
      <div class="cb-switch__core-inner">
        <span v-if="activeText || inactiveText" class="cb-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="cb-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, useAttrs } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'

defineOptions({
  name: 'CbSwitch',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})

const emits = defineEmits<SwitchEmits>()
const attrs = useAttrs()
// 排除 class 和 style 的其他属性
const filteredAttrs = computed(() => ({
  ...attrs,
  class: undefined,
  style: undefined,
}))

const innerValue = ref(props.modelValue ?? props.inactiveValue)
const checked = computed(() => innerValue.value === props.activeValue)
const input = ref<HTMLInputElement | null>(null)

const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', innerValue.value)
  emits('change', innerValue.value)
}

// set activeColor and inactiveColor
// 如果传了 activeColor 和 inactiveColor 就改变颜色变量.
//.cb-switch (--cb-switch-on-color  --cb-switch-off-color)
const switchStyles = computed(() => {
  return {
    '--cb-switch-on-color': props.activeColor || 'var(--cb-color-primary)',
    '--cb-switch-off-color': props.inactiveColor || 'var(--cb-border-color)',
  }
})

onMounted(() => {
  input.value!.checked = checked.value
})

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal ?? props.inactiveValue
    input.value!.checked = checked.value
  },
)
</script>
