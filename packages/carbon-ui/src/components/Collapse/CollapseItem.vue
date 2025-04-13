<template>
  <div
    class="cb-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="cb-collapse-item__header"
      id="`item-header-${name}`"
      :class="{ 'is-diabled': disabled, 'is-active': isActive }"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <icon icon="angle-right" class="header-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="cb-collapse-item__wrapper" v-show="isActive">
        <div class="cb-collapse-item__content" id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'
import Icon from '@/components/Icon/Icon.vue'
defineOptions({
  name: 'CbCollapseItem',
})
const props = defineProps<CollapseItemProps>()

const collapseContext = inject(collapseContextKey, null)

const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {
  if (props.disabled) {
    return
  }
  collapseContext?.handleItemClick(props.name)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>
