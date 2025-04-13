<script setup>
import { ref } from 'vue'
import { CbInput as Input } from '@ptpchips/carbon-ui'
const test = ref('')
</script>
<template>
  <div class="size-holder">
    <Input
      v-model="test"
      placeholder="大的 Input"
      size="large"
      style="width: 240px; margin-right: 20px"
    >
    </Input>
    <Input v-model="test" placeholder="普通的 Input" style="width: 240px; margin-right: 20px">
    </Input>
    <Input v-model="test" placeholder="小的 Input" size="small" style="width: 240px"> </Input>
  </div>
</template>
<style scoped>
.size-holder {
  display: flex;
  align-items: center;
}
</style>
