<template>
  <div class="cb-tooltip" ref="popperContainerNode" v-on="outerEvents">
    <div class="cb-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <transition :name="transition" mode="out-in" v-on="transitionEvents">
      <div class="cb-tooltip__popper" ref="popperNode" v-if="isOpen" v-on="events">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import useClickOutside from '@/hooks/useClickOutside'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'CbTooltip',
})
const emits = defineEmits<TooltipEmits>()
const props = withDefaults(defineProps<Partial<TooltipProps>>(), {
  trigger: 'hover',
  placement: 'right',
  transition: 'fade',
  openDelay: 100,
  closeDelay: 300,
})

const popperNode = ref<HTMLElement | null>(null)
const triggerNode = ref<HTMLElement | null>(null)
const popperContainerNode = ref<HTMLElement | null>(null)
const isOpen = ref(false)

let popperInstance: Instance | null = null

let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const popperOptions = computed(() => {
  return {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      },
    ],
    placement: props.placement,
    ...props.popperOptions,
  }
})

const togglePopper = (e: MouseEvent) => {
  //避免在popper上点击时关闭popper
  if (e.target && popperNode.value && popperNode.value.contains(e.target as Node)) return
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const attchEvents = () => {
  if (props.manual) return
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

attchEvents()

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value === true && !props.manual) {
    closeFinal()
  }
  if (isOpen.value) {
    emits('click-outside', isOpen.value)
  }
})

watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      events = {}
      outerEvents = {}
      attchEvents()
    }
  },
)

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  {
    flush: 'post',
  },
)

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {}
      outerEvents = {}
    } else {
      attchEvents()
    }
  },
)

onUnmounted(() => {
  popperInstance?.destroy()
})

const transitionEvents: Record<string, () => void> = {
  afterLeave() {
    // 动画结束后销毁
    popperInstance?.destroy()
  },
}

defineExpose<TooltipInstance>({ show: openFinal, hide: closeFinal })
</script>
