<script setup>
import { CbButton as Button, CbColorPicker as ColorPicker } from '@ptpchips/carbon-ui'
</script>
<template>
  <div>
    <div class="theme-picker">普通颜色选择器：<ColorPicker /></div>
    <div class="theme-picker">
      主题色颜色选择器：
      <ColorPicker theme-type="primary" />
      <ColorPicker theme-type="success" circle />
      <ColorPicker theme-type="warning" circle />
      <ColorPicker theme-type="danger" />
      <ColorPicker theme-type="info" circle />
    </div>
  </div>
  <div class="button-box">
    <div>
      <Button type="primary"> Primary </Button>
      <Button type="success"> Success </Button>
      <Button type="warning"> Warning </Button>
      <Button type="danger"> Danger </Button>
      <Button type="info"> Info </Button>
    </div>
    <div>
      <Button plain type="primary"> Primary </Button>
      <Button plain type="success"> Success </Button>
      <Button plain type="warning"> Warning </Button>
      <Button plain type="danger"> Danger </Button>
      <Button plain type="info"> Info </Button>
    </div>
  </div>
</template>

<style scoped>
.button-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
}
.theme-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
</style>
