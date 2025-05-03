<template>
  <div style="display: flex; align-items: center">
    <span>点击切换主题模式：</span>
    <Switch v-model="isDarkMode" @change="toggleDarkMode" />
  </div>
</template>

<script setup>
import { CbSwitch as Switch } from '@ptpchips/carbon-ui'
import { ref } from 'vue'

const isDarkMode = ref(false)

// 通过给根节点添加 class 来实现暗黑模式
const toggleDarkMode = () => {
  const classList = document.documentElement.classList
  if (isDarkMode.value && !classList.contains('dark')) {
    classList.add('dark')
  } else if (!isDarkMode.value && classList.contains('dark')) {
    classList.remove('dark')
  }
}
</script>
