---
title: Select
description: Select 组件的文档
---

---
hello: world
---
# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>
<!-- <Button>sssss</Button> -->

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>


## 选择器

当选项过多时，使用下拉菜单展示并选择内容。

#### 基础用法

适用广泛的基础单选 v-model 的值为当前被选中的 option 的 value 属性值。

<preview path="./demo/Select/Basic.vue" title="基础选择器" description="Select 基础选择器"></preview>
