<template>
  <div
    class="cb-input"
    :class="[
      {
        [`cb-input--${type}`]: type,
        [`cb-input--${size}`]: size,
        'is-disabled': disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus,
      },
      attrs.class,
    ]"
    :style="attrs.style as any"
  >
    <!-- input -->
    <template v-if="type != 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="cb-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="cb-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="cb-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          ref="inputRef"
          v-bind="filteredAttrs"
          class="cb-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @change="handleChange"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="cb-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="cb-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && !passwordVisible"
            class="cb-input__password"
            @mousedown.prevent="handleIconMouseDown"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && passwordVisible"
            class="cb-input__password"
            @mousedown.prevent="handleIconMouseDown"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="cb-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="inputRef"
        v-bind="filteredAttrs"
        class="cb-textarea__wrapper"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick, useAttrs, inject } from 'vue'
import type { InputProps, InputEmits } from './types'
import Icon from '@/components/Icon/Icon.vue'
import { formItemContextKey } from '@/components/Form/types'

defineOptions({
  name: 'CbInput',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
})

const formItemContext = inject(formItemContextKey, null)

const runValidation = (trigger?: string) => {
  formItemContext?.validate(trigger).catch((e) => {
    console.warn('Validation failed:', e.fields)
  })
}

const attrs = useAttrs()
// 排除 class 和 style 的其他属性
const filteredAttrs = computed(() => ({
  ...attrs,
  class: undefined,
  style: undefined,
}))

const emits = defineEmits<InputEmits>()

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)

const selectionStart = ref(0)
const selectionEnd = ref(0)

// 保存光标位置
const saveCursorPosition = () => {
  if (!inputRef.value) return
  selectionStart.value = inputRef.value.selectionStart || 0
  selectionEnd.value = inputRef.value.selectionEnd || 0
}

// 恢复光标位置
const restoreCursor = () => {
  nextTick(() => {
    const el = inputRef.value
    if (!el) return

    el.focus()
    // 处理Safari兼容性
    requestAnimationFrame(() => {
      el.setSelectionRange(selectionStart.value, selectionEnd.value)
    })
  })
}

const handleIconMouseDown = () => {
  saveCursorPosition()
}

const NOOP = () => {}

const showClear = computed(
  () => props.clearable && !!innerValue.value && !props.disabled && isFocus.value,
)

const showPasswordArea = computed(() => props.showPassword && !props.disabled && !!innerValue.value)

const keepFocus = () => nextTick(() => inputRef.value?.focus())

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
  restoreCursor()
}

const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
  runValidation('input')
}

const handleChange = () => {
  emits('change', innerValue.value)
  runValidation('change')
}
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
  runValidation('focus')
}
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false
  emits('blur', event)
  runValidation('blur')
}

const clear = () => {
  innerValue.value = ''
  restoreCursor()
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}

watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val
  },
)

defineExpose({
  ref: inputRef,
})
</script>
