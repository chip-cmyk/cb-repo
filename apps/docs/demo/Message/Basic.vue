<script setup>
import { CbButton as Button } from '@ptpchips/carbon-ui'

import { createMessage, closeMessageAll } from '@ptpchips/carbon-ui'

// 创建消息实例
// 通过传入参数创建消息实例，返回一个实例对象，可以通过实例对象调用destroy方法关闭消息
let instance = null
function createInstance() {
  instance = createMessage({
    message: 'Message instance',
    type: 'primary',
    showClose: true,
  })
}

const closeInstance = () => {
  instance.destroy()
}
</script>

<template>
  <div class="message-box">
    基本用法
    <div class="button-box">
      <Button
        type="primary"
        plain
        @click="
          createMessage({ message: 'Hello world', type: 'primary', showClose: true, duration: 0 })
        "
      >
        Primary
      </Button>
      <Button
        type="success"
        plain
        @click="createMessage({ message: 'Hello world', type: 'success', duration: 0 })"
      >
        Success
      </Button>
      <Button
        type="warning"
        plain
        @click="
          createMessage({ message: 'Hello world', type: 'warning', showClose: true, duration: 0 })
        "
      >
        Warning
      </Button>
      <Button
        type="danger"
        plain
        @click="createMessage({ message: 'Hello world', type: 'danger', duration: 1000 })"
      >
        Danger
      </Button>
      <Button
        type="info"
        plain
        @click="createMessage({ message: 'Hello world', type: 'info', duration: 0 })"
      >
        Info
      </Button>
    </div>
    创建与关闭消息实例
    <div class="button-box">
      <Button type="primary" plain @click="createInstance">Create instance</Button>
      <Button type="danger" plain @click="closeInstance">Close instance</Button>
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
