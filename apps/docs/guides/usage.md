### 安装

```bash
npm i @ptpchips/carbon-ui -D
```

### 开始使用

#### 全局使用

```js
// main.js

import CarbonUI from '@ptpchips/carbon-ui' // 引入所有组件
import '@ptpchips/carbon-ui/dist/style.css' // 引入样式

import App from './App.vue'

createApp(App).use(CarbonUI).mount('#app') // 全局使用
```

```vue
<template>
  <CbButton>Hello</CbButton>
</template>
```

#### 按需导入

```vue
<template>
  <CbButton>Hello</CbButton>
</template>
<script setup>
import { CbButton } from ' @ptpchips/carbon-ui'
</script>
```
