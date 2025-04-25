---
title: Icon
description: Icon 组件的文档
---

# Icon 图标

基于 `Font Awesome` 的图标组件，提供了多种图标供选择。（https://fontawesome.com.cn/v5）


## 基础用法

通过 `icon` 属性来指定要使用的图标。也可以通过插槽来使用自定义图标。可以设置 `size`、`type`、`color` 属性来定义图标的样式。添加 `spin` 属性可以让图标旋转, `pulse` 属性可以让图标脉动, `inverse` 属性可以让图标颜色反转。添加 `bounce`、`shake`、`beat`、`fade`、`beatFade`、`spinPulse` 和 `spinReverse` 属性可以实现不同的动画效果。

<preview path="../demo/Icon/Basic.vue" title="基础用法" description="Icon 组件的基础用法"></preview>

## 结合 vite-plugin-svg-icons 使用自定义图标

如果需要更方便地使用自定义图标,可以结合 `vite-plugin-svg-icons` 插件来使用，此时添加`custom`属性，直接在`icon`属性指定图标文件名即可使用自定义图标。

### 安装插件：

```bash
pnpm add vite-plugin-svg-icons -D
```

### `vite.config.js` 文件配置：
```js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ],
 }
)
```

### 使用方法

在 `main` 入口文件中引入 `vite-plugin-svg-icons` 插件生成的图标文件

```js
// main.js/ts
import 'virtual:svg-icons-register'
```

在 `Icon` 组件中使用 `custom` 属性来启用自定义图标功能。

<preview path="../demo/Icon/Custom.vue" title="结合插件自定义用法" description="Icon 组件的结合插件自定义用法"></preview>


## Icon Attributes

| Name        | Description                            | Type                                                             | Default |
| ----------- | -------------------------------------- | ---------------------------------------------------------------- | ------- |
| icon        | icon name                            | `string`                                                         | —       |
| size        | icon size                            | `enum` - `'2xs' \| 'xs' \| 'sm' \| 'lg' \| 'xl' \| '2xl' \| '1x' \| '2x' \| '3x' \| '4x' \| '5x' \| '6x' \| '7x' \| '8x' \| '9x' \| '10x'`                                     | —       |
| type        | icon type                            | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| color       | icon color                            | `string`                                                         | —       |
| custom      | custom icon                    | `boolean`                                                         | —       |