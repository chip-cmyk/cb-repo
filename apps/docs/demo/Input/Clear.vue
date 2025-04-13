<script setup>
import { ref } from 'vue'
import { CbInput as Input } from '@ptpchips/carbon-ui'
const test = ref('')
</script>
<template>
  <Input v-model="test" clearable placeholder="输入字符以后可以点击清空" style="width: 240px" />
</template>
