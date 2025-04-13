<template>
  <div
    class="cb-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      manual
      :openDelay="0"
      :closeDelay="0"
      :visible="isDropdownShow"
      :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)"
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="debouceOnFilter"
        @keydown="handleKeydown"
        ><template #suffix>
          <Icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="cb-input__clear"
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
          />
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          /> </template
      ></Input>
      <template #content>
        <div class="cb-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin />
        </div>
        <div class="cb-select__nodata" v-else-if="filterable && filteredOptions.length === 0">
          no matchted data
        </div>
        <ul class="cb-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :key="item.value">
            <li
              class="cb-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': isSelected(item.value),
                'is-highlighted': states.highlightIndex === index,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, inject } from 'vue'
import type { Ref } from 'vue'
import { isFunction, debounce } from 'lodash-es'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import RenderVnode from '../Common/RenderVnode'
import type { InputInstance } from '../Input/types'
import type { ModifierArguments, State, Options } from '@popperjs/core'
import { formItemContextKey } from '@/components/Form/types'

defineOptions({
  name: 'CbSelect',
})

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
})
const emits = defineEmits<SelectEmits>()

const findOption = (value: string) => {
  return props.options.find((option) => option.value === value) ?? null
}

const formItemContext = inject(formItemContextKey, null)

const runValidation = (trigger?: string) => {
  formItemContext?.validate(trigger).catch((e) => {
    console.warn('Validation failed:', e.fields)
  })
}

const timeout = ref(props.remote ? 300 : 0)
const initialOption = findOption(props.modelValue)
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const states = reactive<SelectStates>({
  inputValue: initialOption?.label || '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
})
const isDropdownShow = ref(false)
const filteredOptions = ref([...props.options])

const popperOptions: Partial<Options> = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: 'sameWidth',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: ({ state }: ModifierArguments<State>) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      effect: ({ state }: ModifierArguments<State>) => {
        state.elements.popper.style.width = `${(state.elements.reference as HTMLElement).offsetWidth}px`
      },
    },
  ],
}

const showClearIcon = computed(() => {
  return (
    states.inputValue.trim() !== '' &&
    !props.disabled &&
    props.clearable &&
    states.mouseHover &&
    states.selectedOption
  )
})

const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder
})

const NOOP = () => {}

const isSelected = (value: string | number) => {
  if (states.selectedOption instanceof Array) {
    return states.selectedOption.findIndex((item) => item.value === value) > -1
  } else {
    return states.selectedOption?.value === value
  }
}

const generateFilteredOptions = async (searchValue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (e) {
      console.error(e)
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter((option) => {
      return option.label.toLowerCase().includes(searchValue.toLowerCase())
    })
  }
  states.highlightIndex = -1
}

const controlDropdown = (isShow: boolean) => {
  if (isShow) {
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }

    if (props.filterable) {
      generateFilteredOptions(states.inputValue)
    } else {
      filteredOptions.value = props.options
    }
    tooltipRef.value?.show()
  } else {
    tooltipRef.value?.hide()
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
    states.highlightIndex = -1
  }
  isDropdownShow.value = isShow
  emits('visible-change', isShow)
}

const toggleDropdown = () => {
  if (props.disabled) return
  isDropdownShow.value = !isDropdownShow.value
  controlDropdown(isDropdownShow.value)
}

const itemSelect = async (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  runValidation('change')
  controlDropdown(false)
  await nextTick()
  inputRef.value?.ref.focus()
}

const onClear = () => {
  states.inputValue = ''
  states.selectedOption = null
  emits('update:modelValue', '')
  emits('change', '')
  emits('clear')
  runValidation('change')
}

const debouceOnFilter = debounce(() => generateFilteredOptions(states.inputValue), timeout.value)

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true)
      } else {
        if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex])
        } else {
          controlDropdown(false)
        }
      }
      break
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false)
      } else {
        inputRef.value?.ref.blur()
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1
        } else {
          states.highlightIndex--
        }
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0
        } else {
          states.highlightIndex++
        }
      }
      break
    default:
      break
  }
}

watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions
    generateFilteredOptions(states.inputValue)
  },
)
watch(
  () => props.modelValue,
  (newValue) => {
    const option = findOption(newValue)
    if (option) {
      states.inputValue = option.label
      states.selectedOption = option
    } else {
      states.inputValue = ''
      states.selectedOption = null
    }
  },
)
</script>
