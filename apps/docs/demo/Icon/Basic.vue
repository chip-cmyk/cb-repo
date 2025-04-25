<script setup>
import { CbIcon as Icon } from '@ptpchips/carbon-ui'
import baiduSvg from '../../assets/icons/baidu.svg?raw'
import baiduSvgUrl from '../../assets/icons/baidu.svg'
</script>
<template>
  <div class="icon-box">
    <!-- 使用 fontAwesome icon -->
    <icon type="primary" icon="spinner" spinPulse />
    <icon color="#EA9040" icon="bell" shake />
    <icon type="danger" icon="heart" bounce />

    <!-- 通过import结合默认插槽使用自定义图标 -->
    <icon color="#7BDBC0" spin style="width: 16px; height: 16px"
      ><div v-html="baiduSvg"></div
    ></icon>
    <icon fade style="width: 18px; height: 18px"><img :src="baiduSvgUrl" /></icon>
    <icon style="width: 18px; height: 18px" bounce>🎉</icon>
  </div>
</template>

<style scoped>
.icon-box {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
