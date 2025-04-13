<script setup>
import { ref } from 'vue'
import { Input } from '@ptpchips/carbon-ui'
const test = ref('')
</script>
<template>
  <Input v-model="test" placeholder="基础文本框，请输入" style="width: 240px" />
</template>
