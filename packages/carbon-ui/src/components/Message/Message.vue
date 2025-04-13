<template>
  <Transition :name="transitionName" @enter="updateHeight" @after-leave="destroyComponent">
    <div
      class="cb-message"
      :class="{
        [`cb-message--${type}`]: type,
        'is-close': showClose,
      }"
      v-show="visible"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="cb-message__content">
        <slot>
          <RenderVnode :vNode="message"></RenderVnode>
        </slot>
      </div>
      <div class="cb-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import type { MessageProps } from './types'
import RenderVnode from '../Common/RenderVnode'
import Icon from '../Icon/Icon.vue'
import { getLastZIndex, getLastBottomOffset } from './method'
import useEventListener from '@/hooks/useEventListener'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  message: 'hello world',
  duration: 3000,
  offset: 20,
  showClose: false,
  transitionName: 'fade-up',
})

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const height = ref(0)
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => lastOffset.value + props.offset)
const bottomOffset = computed(() => height.value + topOffset.value)
const zIndex = computed(() => getLastZIndex(props.id) + 1)
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: zIndex.value,
}))
let timer: number | undefined
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
function keyDown(e: Event) {
  const event = e as KeyboardEvent
  if (event.key === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keyDown)

const updateHeight = () => {
  height.value = messageRef.value?.offsetHeight || 0
}
const destroyComponent = () => {
  props.onDestroy()
}

onMounted(async () => {
  visible.value = true
  await nextTick()
  startTimer()
  height.value = messageRef.value?.offsetHeight || 0
})

defineExpose({
  bottomOffset,
  zIndex,
  visible,
})
</script>
