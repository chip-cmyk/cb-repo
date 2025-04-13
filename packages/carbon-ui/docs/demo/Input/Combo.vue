<script setup>
import { ref } from 'vue'
import { CbInput as Input } from '@ptpchips/carbon-ui'
import { CbIcon as Icon } from '@ptpchips/carbon-ui'
const test = ref('')
</script>
<template>
  <Input v-model="test" placeholder="prepend append" style="width: 360px; margin-bottom: 20px">
    <template #prepend>Https://</template>
    <template #append>.com</template>
  </Input>

  <div>
    <Input v-model="test" placeholder="prefix suffix" style="width: 240px">
      <template #prefix>
        <Icon icon="fa-user" />
      </template>
      <template #suffix>
        <Icon icon="fa-user" />
      </template>
    </Input>
  </div>
</template>
