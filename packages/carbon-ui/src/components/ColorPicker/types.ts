export type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export const themeTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const

export interface ColorPickerProps {
  modelValue?: string
  themeType?: ThemeType
  circle?: boolean
}

export interface ColorPickerEmits {
  (e: 'color-change', value: string): void
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'input', value: string): void
}
