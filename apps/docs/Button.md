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
