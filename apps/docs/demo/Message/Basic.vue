<script setup>
import { CbButton as Button } from '@ptpchips/carbon-ui'

import { createMessage, closeMessageAll } from '@ptpchips/carbon-ui'

// 创建消息实例
// 通过传入参数创建消息实例，返回一个实例对象，可以通过实例对象调用destroy方法关闭消息
function createAndDestroy() {
  const instance = createMessage({
    message: 'hello world',
    type: 'success',
    showClose: true,
  })

  // 关闭消息实例
  setTimeout(() => {
    instance.destroy()
  }, 3000)
}
</script>

<template>
  <div class="message-box">
    基本用法
    <div class="button-box">
      <Button
        type="primary"
        plain
        @click="createMessage({ message: 'world', type: 'primiary', showClose: true, duration: 0 })"
      >
        Primary
      </Button>
      <Button
        type="success"
        plain
        @click="createMessage({ message: 'hello', type: 'success', duration: 0 })"
      >
        Success
      </Button>
      <Button
        type="warning"
        plain
        @click="createMessage({ message: 'world', type: 'warning', showClose: true, duration: 0 })"
      >
        Warning
      </Button>
      <Button
        type="danger"
        plain
        @click="createMessage({ message: 'hello', type: 'danger', duration: 1000 })"
      >
        Danger
      </Button>
      <Button
        type="info"
        plain
        @click="createMessage({ message: 'world', type: 'info', duration: 0 })"
      >
        Info
      </Button>
    </div>
    创建与关闭消息实例
    <div class="button-box">
      <Button type="primary" plain @click="createAndDestroy">Create and destroy instance</Button>
    </div>
    关闭所有消息实例
    <div class="button-box">
      <Button type="primary" plain @click="closeMessageAll">Close all</Button>
    </div>
  </div>
</template>

<style scoped>
.button-box {
  display: flex;
  gap: 10px;
  margin: 10px 0 20px 0;
}
</style>
