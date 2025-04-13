<script setup>
import { ref } from 'vue'
import { CbInput as Input } from '@ptpchips/carbon-ui'
const test = ref('some text')
</script>
<template>
  <Input v-model="test" disabled style="width: 240px" />
</template>
