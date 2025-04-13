import type { App } from 'vue'
import ColorPicker from '@/components/ColorPicker/ColorPicker.vue'
ColorPicker.install = (app: App) => {
  app.component(ColorPicker.name!, ColorPicker)
}

export default ColorPicker
export * from './types'
