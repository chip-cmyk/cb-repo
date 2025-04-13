<template>
  <i
    class="cb-icon"
    :class="[{ [`cb-icon--${type}`]: type }, hasDefaultSlot ? customIconClass : '']"
    :style="customStyles"
    v-bind="$attrs"
  >
    <slot>
      <font-awesome-icon v-if="!custom" v-bind="filteredProps" />
      <svg
        aria-hidden="true"
        v-else
        :class="customIconClass"
        style="width: inherit; height: inherit"
      >
        <use :href="symbolId" />
      </svg>
    </slot>
  </i>
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'CbIcon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IconProps>(), { icon: 'image' })

const slots = useSlots()
const hasDefaultSlot = !!slots.default

const symbolId = computed(() => `#icon-${props.icon}`)

const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
const customIconClass = computed(() => {
  const prefix = 'fa-'
  return {
    [`${prefix}pulse`]: props.pulse,
    [`${prefix}spin`]: props.spin,
    [`${prefix}inverse`]: props.inverse,
    [`${prefix}bounce`]: props.bounce,
    [`${prefix}shake`]: props.shake,
    [`${prefix}beat`]: props.beat,
    [`${prefix}fade`]: props.fade,
    [`${prefix}beatFade`]: props.beatFade,
    [`${prefix}spinPulse`]: props.spinPulse,
    [`${prefix}spinReverse`]: props.spinReverse,
  }
})
</script>
