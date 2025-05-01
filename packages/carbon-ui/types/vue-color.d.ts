declare module 'vue-color/dist/types/composable/colorModel' {
  export interface useTinyColorModelProps {
    modelValue: string
    themeType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    circle?: boolean
  }
}

declare module 'vue-color' {
  import { DefineComponent } from 'vue'

  export const SketchPicker: DefineComponent<{
    modelValue: string
    presetColors?: string[]
    disableAlpha?: boolean
  }>
}
