import type { App } from 'vue'

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

config.autoAddCss = false
config.showMissingIcons = true
config.styleDefault = 'solid'
library.add(fas)

const components = [
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
  CbInput,
  CbSelect,
  CbSwitch,
  CbTooltip,
}

export default { install }
