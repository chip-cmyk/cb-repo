<template>
  <form class="cb-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type {
  FormContext,
  FormItemContext,
  FormProps,
  FormInstance,
  FormValidateFailure,
} from './types'
import { formContextKey } from './types'
import type { ValidateFieldsError } from 'async-validator'

defineOptions({
  name: 'CbForm',
})

const props = defineProps<FormProps>()

const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
  const index = fields.indexOf(field)
  if (index !== -1) {
    fields.splice(index, 1)
  }
}

const validate = async () => {
  let validationErrors: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate()
    } catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      }
    }
  }

  if (Object.keys(validationErrors).length) {
    console.warn('Validation failed:', validationErrors)
    return Promise.reject(validationErrors)
  } else {
    return Promise.resolve()
  }
}

const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter((item) => keys.includes(item.prop)) : fields
  filterArr.forEach((field) => field.resetField())
}

const clearValidate = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter((item) => keys.includes(item.prop)) : fields
  filterArr.forEach((field) => field.clearValidate())
}

provide(formContextKey, {
  ...props,
  addField,
  removeField,
})

defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
})
</script>
