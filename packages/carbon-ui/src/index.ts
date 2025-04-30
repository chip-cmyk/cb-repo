import type { defineComponent, App } from 'vue'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import CbButton from '@/components/Button'
import CbCollapse, { CollapseItem as CbCollapseItem } from '@/components/Collapse'
import CbColorPicker from '@/components/ColorPicker'
import CbDropdown from '@/components/Dropdown'
import CbForm, { FormItem as CbFormItem } from '@/components/Form'
import CbIcon from '@/components/Icon'
import CbMessage, { createMessage, closeAll as closeMessageAll } from '@/components/Message'
import CbInput from '@/components/Input'
import CbSelect from '@/components/Select'
import CbSwitch from '@/components/Switch'
import CbTooltip from '@/components/Tooltip'

export * from '@/utils'

import '@/styles/index.css'

// 1. 定义类型
type InstallableComponent = ReturnType<typeof defineComponent> & {
  install?: (app: App) => void
  name: string
}

config.autoAddCss = false
config.showMissingIcons = true
config.styleDefault = 'solid'
library.add(fas)

const components: InstallableComponent[] = [
  CbButton,
  CbCollapse,
  CbCollapseItem,
  CbColorPicker,
  CbDropdown,
  CbForm,
  CbFormItem,
  CbIcon,
  CbMessage,
  createMessage,
  closeMessageAll,
  CbInput,
  CbSelect,
  CbSwitch,
  CbTooltip,
]

// 按需引入组件：遍历组件数组，给每个组件添加 install 方法
// components.forEach((component) => {
//   component.install = (app: App) => {
//     app.component(component.name!, component)
//   }
// })

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
}

export {
  install,
  CbButton,
  CbCollapse,
  CbCollapseItem,
  CbColorPicker,
  CbDropdown,
  CbForm,
  CbFormItem,
  CbIcon,
  CbMessage,
  createMessage,
  closeMessageAll,
  CbInput,
  CbSelect,
  CbSwitch,
  CbTooltip,
}

export default { install }
