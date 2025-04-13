<script setup>
import { ref } from 'vue'
import { Switch } from '@ptpchips/carbon-ui'
const test = ref('right')
</script>
<template>
  <Switch v-model="test" activeValue="right" inactiveValue="wrong" />
  <h4>model-value: {{ test }}</h4>
</template>
