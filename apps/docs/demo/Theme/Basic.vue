<script setup>
import { CbButton as Button } from '@ptpchips/carbon-ui'
import { initializeAllThemeColors, changeThemeColors, resetThemeColors } from '@ptpchips/carbon-ui'

import { onMounted } from 'vue'

// 初始化主题色
onMounted(() => {
  initializeAllThemeColors()
})
const changeColors = () => {
  changeThemeColors({
    primary: '#9566F5',
    success: '#70D9E1',
    warning: '#FF942F',
    danger: '#EC70A2',
    info: '#9AB4C9',
  })
}
</script>
<template>
  <div class="button-box">
    <!-- 改变主题色 -->
    <Button type="primary" @click="changeColors">Change Theme Colors</Button>
    <Button type="success" @click="resetThemeColors">Reset Theme Colors</Button>
  </div>
  <br />
  <div class="button-box">
    <Button type="primary"> Primary </Button>
    <Button type="success"> Success </Button>
    <Button type="warning"> Warning </Button>
    <Button type="danger"> Danger </Button>
    <Button type="info"> Info </Button>
  </div>
  <div class="button-box">
    <Button plain type="primary"> Primary </Button>
    <Button plain type="success"> Success </Button>
    <Button plain type="warning"> Warning </Button>
    <Button plain type="danger"> Danger </Button>
    <Button plain type="info"> Info </Button>
  </div>
</template>

<style scoped>
.button-box:not(:last-child) {
  margin-bottom: 12px;
}
</style>
