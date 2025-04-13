<script setup>
import { ref } from 'vue'
import { CbSwitch as Switch } from '@ptpchips/carbon-ui'
const test = ref(false)
</script>
<template>
  <div class="switch-size-container">
    <Switch v-model="test" size="large" active-color="#41B883" inactive-color="lightblue" />
    <Switch v-model="test" active-color="gold" />
    <Switch v-model="test" size="small" active-color="yellowgreen" inactive-color="#888888" />
  </div>
</template>
<style scoped>
.switch-size-container {
  display: flex;
  align-items: center;
  .cb-switch {
    margin-right: 10px;
  }
}
</style>
