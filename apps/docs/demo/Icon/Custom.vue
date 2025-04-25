<script setup>
import { CbIcon as Icon } from '@ptpchips/carbon-ui'
</script>
<template>
  <div class="icon-box">
    <!-- 结合vite-plugin-svg-icons插件添加custom属性使用自定义图标 -->
    <icon type="danger" icon="apple" custom beat />
    <icon type="success" icon="baidu" custom bounce />
  </div>
</template>

<style scoped>
.icon-box {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
