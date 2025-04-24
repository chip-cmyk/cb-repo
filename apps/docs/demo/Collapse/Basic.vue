<script setup>
import { ref } from 'vue'
import { CbCollapse as Collapse, CbCollapseItem as CollapseItem } from '@ptpchips/carbon-ui'
const openValue = ref([1])
</script>
<template>
  <collapse v-model="openValue">
    <collapse-item :name="1" title="Title1">通过openValue设为默认展开</collapse-item
    ><collapse-item :name="2">
      <template #title>
        <b style="color: lightseagreen">Title2</b>
      </template>
      <div>通过标题插槽自定义标题</div>
    </collapse-item>
    <collapse-item :name="3">
      <template #title>
        <div>Title3</div>
      </template>
      <b style="color: yellowgreen">通过默认插槽自定义内容</b>
    </collapse-item>
  </collapse>
</template>
