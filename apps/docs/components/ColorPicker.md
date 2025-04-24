---
title: ColorPicker
description: ColorPicker 组件的文档
---

# ColorPicker 组件

ColorPicker 组件用于选择颜色，通常用于需要用户选择颜色的场景。

## 基础用法

使用 ColorPicker 组件时，可以通过 `v-model` 指令绑定一个颜色值。组件会根据这个值来显示当前选中的颜色。添加`circle`属性可以改为圆形。指定themeType属性可以动态修改主题色，可取的值为`"primary" || "success" || "warning" || "danger" || "info"` 。

<preview path="../demo/ColorPicker/Basic.vue" title="基础用法" description="ColorPicker 组件的基础用法"></preview>

