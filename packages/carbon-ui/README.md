### Installation

```bash
npm i @ptpchips/carbon-ui
```

### Getting Started

#### Global Usage

```js
// main.js

import CarbonUI from '@ptpchips/carbon-ui' // Import all components
import '@ptpchips/carbon-ui/dist/style.css' // Import styles

import App from './App.vue'

createApp(App).use(CarbonUI).mount('#app') // Use globally
```

```vue
<template>
  <CbButton>Hello</CbButton>
</template>
```

#### On-Demand Import

```vue
<template>
  <CbButton>Hello</CbButton>
</template>
<script setup>
import { CbButton } from ' @ptpchips/carbon-ui'
</script>
```

---

### 安装

```bash
npm i @ptpchips/carbon-ui
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
