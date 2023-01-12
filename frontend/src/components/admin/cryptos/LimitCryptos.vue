<script setup lang="ts">
import { VeeField, TableUp } from '@/components';
import type { InputField } from '@/types';
import { useAdminSetting, useAuth } from '@/uses'
import { Form } from 'vee-validate';
import { object, string } from 'yup';
const { user } = await useAuth()

const { adminSetting, putAdminSetting } = await useAdminSetting()

  const validationSchema = object().shape({
    value: string().required('Ce champ est requis')
  })

  const fields: InputField[] = [
    {
      name: 'value',
      label: '',
      type: 'number',
      required: true,
      disabled: !user.value || user.value.status !== 0,
    },
  ]
  
  const onSubmit = async (values: any) => {
    await putAdminSetting(values.id, values)
  }

</script>

<template>
<TableUp title="Limit popular cryptocurrency" subtitle="Limit your popular cryptocurrency for anonymous !" firstTh="Limit">
  <div v-for="coin in adminSetting" :key="coin.id">
      <Form
      v-if="coin.name == 'crypto'"
      :initial-values="coin"
      @submit="onSubmit"
      :validation-schema="validationSchema"  
      class="w-full table h-full">
      <input name="id" type="hidden" :value='coin.id'>

          <td v-for="field in fields" :key="field.name">
            <VeeField
            :field="field"
            />
          </td>
          <td class="flex gap-2">
            <button type="submit" class="btn btn-accent text-white">save</button>
          </td>
        </Form>
  </div>
  </TableUp>

</template>