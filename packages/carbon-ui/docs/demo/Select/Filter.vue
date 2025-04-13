<script setup>
import { ref } from 'vue'
import { CbSelect as Select } from '@ptpchips/carbon-ui'
const test = ref('')
const options2 = ref([
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true },
])

const options3 = [
  { label: 'hello333', value: '1' },
  { label: 'xyz3333', value: '2' },
  { label: 'testing33', value: '3' },
  { label: 'check3', value: '4', disabled: true },
]
const handleClick = () => {
  setTimeout(() => {
    options2.value.splice(0, options2.value.length, ...options3) // 替换数组内容
    console.log(options2.value)
  }, 10000)
  console.log('click')
}
</script>
<template>
  <Select
    v-model="test"
    placeholder="可以过滤的选择器，请输入"
    :options="options2"
    filterable
    @click="handleClick"
  />
</template>
