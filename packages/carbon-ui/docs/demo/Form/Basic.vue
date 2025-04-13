<script setup>
import { reactive, ref } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { Form } from '@ptpchips/carbon-ui'
import { FormItem } from '@ptpchips/carbon-ui'
import { Input } from '@ptpchips/carbon-ui'
import { Button } from '@ptpchips/carbon-ui'
import { Select } from '@ptpchips/carbon-ui'

const formRef = ref()
const model = reactive({
  email: '123',
  password: '',
  confirmPwd: '',
  option: '',
})
const rules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, min: 3, max: 5, trigger: 'blur' }],
  confirmPwd: [
    { type: 'string', required: true, trigger: 'blur' },
    {
      validator: (rule, value) => value === model.password,
      trigger: 'blur',
      message: 'the password is not the same',
    },
  ],
  option: [
    {
      required: true,
      message: 'Please select an option',
      trigger: 'change',
    },
  ],
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('passed!')
  } catch (e) {
    console.log('the error', e)
  }
}
const reset = () => {
  formRef.value.resetFields()
}

const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true },
]
</script>

<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="the email" prop="email">
        <Input v-model="model.email" />
      </FormItem>
      <FormItem label="the password" prop="password">
        <Input type="password" v-model="model.password" />
      </FormItem>
      <FormItem prop="confirmPwd" label="confirm password">
        <Input v-model="model.confirmPwd" type="password" />
      </FormItem>
      <FormItem prop="option" label="option">
        <Select v-model="model.option" :options="options2" clearable placeholder="Please select" />
      </FormItem>
      <div :style="{ textAlign: 'center' }">
        <Button type="primary" @click.prevent="submit">Submit</Button>
        <Button @click.prevent="reset">Reset</Button>
      </div>
    </Form>
  </div>
</template>
