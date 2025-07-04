import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
export interface FormItemProps {
  label: string
  prop?: string
}
export interface FormItemRule extends RuleItem {
  trigger?: string
}
export type FormRules = Record<string, FormItemRule[]>

export interface FormProps {
  model: Record<string, any>
  rules: FormRules
}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error'
  errorMsg: string | null
  loading: boolean
}

export interface FormContext extends FormProps {
  addField(field: FormItemContext): void
  removeField(field: FormItemContext): void
}

export interface FormItemContext {
  validate: (trigger?: string) => Promise<any>
  clearValidate(): void
  resetField(): void
  prop: string
}

export interface FormInstance {
  validate(): Promise<any>
  resetFields(props?: string[]): void
  clearValidate(props?: string[]): void
}

export interface FormItemInstance {
  validateStatus: ValidateStatusProp
  validate(trigger?: string): Promise<any>
  resetField(): void
  clearValidate(): void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
