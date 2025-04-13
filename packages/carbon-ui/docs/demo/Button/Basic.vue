<script setup>
import { Button } from '@ptpchips/carbon-ui'
import { Icon } from '@ptpchips/carbon-ui'
</script>
<template>
  <div class="button-box">
    <Button> hello </Button>
    <Button loading> Loading </Button>
  </div>
  <div class="button-box">
    <Button type="primary"> Primary </Button>
    <Button type="success"> Success </Button>
    <Button type="warning"> Warning </Button>
    <Button type="danger"> Danger </Button>
    <Button type="info"> Info </Button>
  </div>
  <div class="button-box">
    <Button plain type="primary"> Primary </Button>
    <Button plain type="success"> Success </Button>
    <Button plain type="warning"> Warning </Button>
    <Button plain type="danger"> Danger </Button>
    <Button plain type="info"> Info </Button>
  </div>
</template>

<style scoped>
.button-box:not(:last-child) {
  margin-bottom: 12px;
}
</style>
