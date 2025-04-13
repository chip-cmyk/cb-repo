export type ThemeType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export const themeTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const

export interface ColorPickerProps {
  modelValue?: string
}

export interface ColorPickerEmits {
  (e: 'color-change', value: string): void
}
