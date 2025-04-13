<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import { onMounted, ref } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import ColorPicker from '@/components/ColorPicker/ColorPicker.vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import SvgIcon from '@/components/Icon/SvgIcon.vue'
import Message from '@/components/Message/Message.vue'
import Input from '@/components/Input/Input.vue'
import { initializeAllThemeColors, changeThemeColors, resetThemeColors } from '@/utils/colorUtils'
import { type MenuOption } from '@/components/Dropdown/types'
import { createMessage, closeAll } from '@/components/Message/method'
import Switch from '@/components/Switch/Switch.vue'
import svgIcon from './assets/icons/apple.svg?raw'

// import { currentThemeColors } from '@/index.ts'

// console.log(currentThemeColors, 'currentThemeColors')
// console.log('hello')

const openValue = ref([1])

// setTimeout(() => {
//   openValue.value.splice(0, 1)
// }, 3000)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import { createPopper } from '@popperjs/core'
// import type { Instance } from '@popperjs/core'

// const img = ref<HTMLElement | null>(null)
// const tooltip = ref<HTMLElement | null>(null)

const trigger = ref<any>('hover')
const isManual = ref(false)
const tooltipRef = ref<TooltipInstance | null>(null)
const inputVal = ref('')
const test = ref(true)

// 切换暗黑模式
const toggleDarkMode = () => {
  const html = document.documentElement
  if (html.classList.contains('dark')) {
    html.classList.remove('dark')
  } else {
    html.classList.add('dark')
  }
}

onMounted(() => {
  setTimeout(() => {
    // trigger.value = 'click'
    isManual.value = true
    // changeThemeColors({
    //   primary: '#f56c6c',
    //   success: '#FF8000',
    // })
    instance.destroy()
  }, 3000)
  initializeAllThemeColors()
  // changeThemeColors({
  //   primary: '#9B73EC',
  //   success: '#67c23a',
  //   warning: '#e6a23c',
  //   danger: '#f56c6c',
  //   info: '#909399',
  // })

  const instance = createMessage({
    message: 'hello world',
    type: 'success',
    showClose: true,
  })
  createMessage({ message: 'world', type: 'info', showClose: true, duration: 0 })
  createMessage({ message: 'hello', type: 'success', duration: 0 })
})
const options: MenuOption[] = [
  { key: 1, label: '选项1' },
  { key: 2, label: '选项2', divided: true },
  { key: 3, label: '选项3' },
  { key: 4, label: '选项4', disabled: true },
  { key: 5, label: '选项5', divided: true },
]
</script>

<template>
  <div class="square-container">
    <div class="square">
      <div class="content">我是内容</div>
    </div>
  </div>
  <Switch v-model="test" style="max-width: 50px" />
  <Switch v-model="test" style="min-width: 90px" />
  <Switch
    v-model="test"
    active-color="#f56c6c"
    inactive-color="#67c23a"
    active-text="eeeeeeeeeeeeeeeeeeeeeeee"
    inactive-text="aaaaaaaa"
    style="min-width: 100px"
  />

  <Input v-model="inputVal" clearable show-password style="width: 300px" />
  <div><Input v-model="inputVal" show-password /></div>
  <div>
    <Input v-model="inputVal" placeholder="prepend append" clearable>
      <template #prepend>Https://</template>
      <template #append>.com</template>
    </Input>
  </div>
  <header>
    <tooltip
      :trigger="trigger"
      content="I'm a tooltip hahaha"
      ref="tooltipRef"
      placement="right-end"
      :popperOptions="{ placement: 'left' }"
    >
      <img
        alt="Vue logo"
        class="logo"
        src="./assets/logo.svg"
        width="125"
        height="125"
        style="border: 1px solid; margin: 0"
      />
      <template #content>testttttt</template>
    </tooltip>
  </header>
  <!-- <div class="wrapper"> -->
  <!-- <HelloWorld msg="You did it!" /> -->
  <!-- </div> -->

  <main>
    <Dropdown :menuOptions="options">
      <Button type="primary" icon="image">你好</Button>
    </Dropdown>
    <Button type="success" icon="image" @click="toggleDarkMode">你好</Button>
    <Button type="warning" icon="image" @click="resetThemeColors">你好</Button>
    <Button type="danger" icon="image" @click="closeAll">你好</Button>
    {{ openValue }}
    <collapse v-model="openValue">
      <collapse-item :name="1" title="title111"> content1 </collapse-item
      ><collapse-item :name="2">
        <template #title>
          <div>title2</div>
        </template>
        content2
      </collapse-item>
      <collapse-item :name="3">
        <template #title>
          <div>title3</div>
        </template>
        content3
      </collapse-item>
    </collapse>
    <!-- 主色选择器 -->
    <ColorPicker theme-type="primary" circle />
    <ColorPicker />
    <div>
      <div class="color-block" style="background-color: var(--cb-color-primary)"></div>
      <div></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-1)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-2)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-3)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-4)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-5)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-6)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-7)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-8)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-light-9)"></div>
      <div></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-1)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-2)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-3)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-4)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-5)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-6)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-7)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-8)"></div>
      <div class="color-block" style="background-color: var(--cb-color-primary-dark-9)"></div>
      <div></div>
    </div>
    <div>
      <font-awesome-icon icon=" fa-heart" class="fa-spin" />
      <img
        class="fa-bounce"
        src="./assets/logo.svg?raw"
        style="width: 15px; height: 15px"
        fill="gold"
      />

      <div style="width: 15px; height: 15px; background-color: lightblue" class="fa-bounce">
        aaa😊🎉
      </div>
      <SvgIcon name="baidu"></SvgIcon>
      <div style="width: 15px; height: 15px" class="fa-bounce" v-html="svgIcon"></div>
      <CbButton type="success" icon="image">早上好</CbButton>
      <CbSwitch v-model="test" />
      <icon type="danger" icon="apple" custom bounce></icon>
      <icon type="success" icon="baidu" custom bounce></icon>
      <icon type="danger" icon="heart" bounce></icon>
      <icon type="primary" icon="image" bounce color="gold"> <SvgIcon name="baidu"></SvgIcon></icon>
      <icon type="primary" bounce color="salmon"
        ><img src="/src/assets/嵌套图形_stereo-nesting.png" style="width: 15px; height: 15px"
      /></icon>
      <font-awesome-icon icon=" fa-heart" beat />
      <font-awesome-icon icon=" fa-circle-info" beat-fade />
      <font-awesome-icon icon=" fa-basketball" bounce />
      <font-awesome-icon icon=" fa-triangle-exclamation" fade />
      <font-awesome-icon icon=" fa-bell" shake />
      <font-awesome-icon icon=" fa-compass" spin spin-reverse />
      <font-awesome-icon icon=" fa-spinner" spin-pulse />
    </div>
    <div>
      <Button>你好</Button>
      <Button type="primary">你好</Button>
      <Button type="success" @click="tooltipRef?.show">你好</Button>
      <Button type="warning" @click="tooltipRef?.hide">你好</Button>
      <Button type="danger">你好</Button>
      <Button type="info">你好</Button>
      <Button>你好</Button>
      <Button plain type="primary">你好</Button>
      <Button plain type="success" @click="tooltipRef?.show">你好</Button>
      <Button plain type="warning" @click="tooltipRef?.hide">你好</Button>
      <Button plain type="danger">你好</Button>
      <Button plain type="info">你好</Button>
    </div>
    <a href="">test href</a>

    <!-- <TheWelcome /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
.color-block {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: gold;
}

input[type='color'] {
  height: 40px;
  margin-bottom: 20px;
}
.square-container {
  width: 3%; /* 父元素宽度，可以调整 */
  position: relative;
}

.square {
  width: 100%;
  padding-top: 100%; /* 高度等于宽度 */
  position: relative;
  background-color: lightblue;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
