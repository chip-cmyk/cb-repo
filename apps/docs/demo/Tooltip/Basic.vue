<script setup>
import { ref } from 'vue'
import { CbButton as Button, CbTooltip as Tooltip } from '@ptpchips/carbon-ui'

const trigger = ref('hover')
const tooltipRef = ref(null)

const toggleTrigger = (val) => {
  trigger.value = val
}
</script>
<template>
  <tooltip
    :trigger="trigger"
    content="I'm a tooltip"
    ref="tooltipRef"
    placement="right-end"
    :popperOptions="{ placement: 'left' }"
  >
    <div style="margin-bottom: 20px"><Button type="primary" plain>Hover me</Button></div>
    <template #content>content slot</template>
  </tooltip>
  <div class="button-box">
    <Button type="primary" @click="toggleTrigger('click')">切换触发方式为 click</Button>
    <Button type="primary" @click="toggleTrigger('hover')">切换触发方式为 hover</Button>
    <Button type="success" @click="tooltipRef?.show">显示提示信息</Button>
    <Button type="warning" @click="tooltipRef?.hide">隐藏提示信息</Button>
  </div>
</template>

<style scoped></style>
