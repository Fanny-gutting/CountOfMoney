<script setup lang="ts">
import { VeeField, IconTrash, TableUp } from '@/components';
import type { FluxRSS, InputField } from '@/types';
import { useAuth, useRSS } from '@/uses'
import { Form } from 'vee-validate';
import { object, string } from 'yup';
const { user } = await useAuth()

const { putRSS, deleteRSS } = await useRSS()

const props = defineProps({
    flux: {
      type: Object as () => any,
      required: true,
    }
  })

  const validationSchema = object().shape({
    name: string().required('Ce champ est requis').min(2, 'Vous ne pouvez pas avoir de nom vide ou à moins de 2 caractères.').max(50, '50 caractères maximum.'),
    url: string().required('Ce champ est requis'),
  })

  const fields: InputField[] = [
    {
      name: 'name',
      label: '',
      type: 'text',
      required: true,
      disabled: !user.value || user.value.status !== 0,
    },
    {
      name: 'url',
      label: '',
      type: 'text',
      required: true,
      disabled: !user.value || user.value.status !== 0,
    },
  ]
  
  const onSubmit = async (values: any) => {
    await putRSS(values.id, values)
  }

  const handleDelete = async (e: any) => {
    let id = e.target.parentElement.parentElement.firstChild.value
    await deleteRSS(id)
  }


</script>

<template>
<TableUp title="Your RSS feed" subtitle="Add your RSS feed !" firstTh="RSS feed keyword" secondTh="RSS feed link">
  <div v-for="coin in props.flux" :key="coin.name">
      <Form
      :initial-values="coin"
      @submit="onSubmit"
      :validation-schema="validationSchema"  
      class="w-full table">
      <input name="id" type="hidden" :value='coin.id'>
  
          <td v-for="field in fields" :key="field.name" >
            <VeeField
            :field="field"
            />
          </td>
          <td class="flex gap-2">
            <button type="submit" class="btn btn-accent text-white">save</button>
            <button type="button" @click="handleDelete" class="btn btn-error text-white"><IconTrash /></button>
          </td>
        </Form>
  </div>
  </TableUp>

</template>