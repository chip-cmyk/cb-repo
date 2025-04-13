<script setup>
import { ref } from 'vue'
import { CbInput as Input } from '@ptpchips/carbon-ui'
const test = ref('')
</script>
<template>
  <Input v-model="test" placeholder="可以是一个 Textarea" type="textarea" style="width: 240px">
  </Input>
</template>
