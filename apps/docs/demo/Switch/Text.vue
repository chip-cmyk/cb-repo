<script setup>
import { ref } from 'vue'
import { Switch } from '@ptpchips/carbon-ui'
const test = ref(false)
</script>
<template>
  <Switch v-model="test" activeText="ON" inactiveText="OFF" style="width: 50px" />
</template>
