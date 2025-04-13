<script setup>
import { ref } from 'vue'
import { Input } from '@ptpchips/carbon-ui'
const test = ref('')
</script>
<template>
  <Input v-model="test" placeholder="密码文本框，可以切换" showPassword style="width: 240px" />
</template>
