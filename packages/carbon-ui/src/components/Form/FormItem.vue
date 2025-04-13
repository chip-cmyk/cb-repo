<template>
  <div
    class="cb-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
    }"
  >
    <label class="cb-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="cb-form-item__content">
      <slot :validate="validate" />
      <div class="cb-form-item__error-msg" v-if="validateStatus.state === 'error'">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, reactive, provide, onMounted, onUnmounted } from 'vue'
import type {
  FormItemProps,
  FormValidateFailure,
  FormItemContext,
  FormItemInstance,
  ValidateStatusProp,
} from './types'
import { formContextKey, formItemContextKey } from './types'
import { isNil } from 'lodash-es'
import Schema from 'async-validator'

defineOptions({
  name: 'CbFormItem',
})

let initialValue: any = null

const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey, null)

const validateStatus = reactive<ValidateStatusProp>({
  state: 'init',
  errorMsg: '',
  loading: false,
})

const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})

const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})

const isRequired = computed(() => {
  return itemRules.value.some((rule) => rule.required)
})

const getTriggerRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules && rules.length > 0) {
    return rules.filter((rule) => {
      if (!trigger || !rule.trigger) {
        return true
      }
      return rule.trigger === trigger
    })
  } else {
    return []
  }
}

const validate = async (trigger?: string) => {
  const modelName = props.prop
  const triggeredRules = getTriggerRules(trigger)
  console.log('triggeredRules', triggeredRules)
  if (triggeredRules.length === 0) {
    return true
  }
  if (modelName) {
    validateStatus.loading = true
    const validator = new Schema({ [modelName]: triggeredRules })
    console.log(innerValue.value, 'innerValue.value')
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        console.log('Validation passed')
        validateStatus.state = 'success'
        validateStatus.errorMsg = ''
        return Promise.resolve()
      })
      .catch(({ errors, fields }: FormValidateFailure) => {
        validateStatus.state = 'error'
        validateStatus.errorMsg = errors?.[0]?.message || ''
        return Promise.reject({
          errors,
          fields,
        })
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}

const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}

const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue || ''
  }
}

const context: FormItemContext = {
  prop: props.prop || '',
  validate,
  clearValidate,
  resetField,
}

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})

onUnmounted(() => {
  formContext?.removeField(context)
})

defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  clearValidate,
  resetField,
})
</script>
