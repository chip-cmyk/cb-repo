<script setup>
import { ref } from 'vue'
import { CbSwitch as Switch } from '@ptpchips/carbon-ui'
const test = ref(true)
</script>
<template>
  <Switch v-model="test" @click="test = !test" />
</template>
