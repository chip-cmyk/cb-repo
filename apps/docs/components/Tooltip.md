---
title: Tooltip
description: Tooltip 组件的文档
---

# Tooltip 提示

鼠标悬停时显示的提示信息，通常用于展示额外的信息或帮助文本。可以通过 `trigger` 属性来定义触发方式，支持 `hover`、`click` 和 `focus` 三种方式。可以通过 `placement` 属性来定义提示信息的位置，支持 `top`、`bottom`、`left` 和 `right` 四个方向。也可以通过 `popperOptions` 属性来传递 Popper.js 的配置选项。

可以通过 `content` 属性来定义提示信息的内容，也可以使用插槽来自定义提示信息的内容。

使用 `ref` 来获取 Tooltip 实例，可以通过实例的方法来控制提示信息的显示和隐藏。可以使用 `show` 方法来显示提示信息，使用 `hide` 方法来隐藏提示信息。

## 基础用法

<preview path="../demo/Tooltip/Basic.vue" title="基础用法" description="Tooltip 组件的基础用法"></preview>

### Tooltip Attributes

| Name      | Description                  | Type                                                             | Default |
| --------- | ---------------------------- | ---------------------------------------------------------------- | ------- |
| trigger   | tooltip trigger type         | `enum` - `'hover'\| 'click'`                           | hover   |
| content   | tooltip content              | `string`                                                         | —       |
| placement | tooltip placement            | `enum` - `'top'\| 'bottom'\| 'left'\| 'right'`                  | top    |
| popperOptions | tooltip popper options     | `object`                                                         | —       |

