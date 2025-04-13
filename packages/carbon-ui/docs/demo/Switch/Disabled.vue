<script setup>
import { ref } from 'vue'
import Switch from '@/components/Switch/Switch.vue'
const test = ref(false)
const test2 = ref(false)
</script>
<template>
  <div class="switch-box">正常：<Switch v-model="test" /> <br /></div>
  <div class="switch-box">禁用：<Switch v-model="test2" disabled /></div>
</template>

<style scoped>
.switch-box {
  display: flex;
  align-items: center;
}
</style>
