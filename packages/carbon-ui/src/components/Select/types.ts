import { type VNode } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>

export interface SelectProps {
  modelValue: string
  options?: SelectOption[]
  multiple?: boolean
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  filterable?: boolean
  readonly?: boolean
  remote?: boolean
  renderLabel?: RenderLabelFunc
  filterMethod?: CustomFilterFunc
  remoteMethod?: CustomFilterRemoteFunc
}

export interface SelectStates {
  inputValue: string
  selectedOption: SelectOption | null
  mouseHover: boolean
  loading: boolean
  highlightIndex: number
}

export interface SelectEmits {
  (e: 'change', value: string | number): void
  (e: 'update:modelValue', value: string | number): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}
