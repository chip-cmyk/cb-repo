---
hello: world
---

<script setup>
import { ref } from 'vue'
import HelloWorld from '../src/components/HelloWorld.vue'
import Button from '../src/components/Button/Button.vue'
const count = ref(0)
</script>

## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>
<HelloWorld></HelloWorld>
<Button>sssss</Button>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
