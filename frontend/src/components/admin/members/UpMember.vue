<script setup lang="ts">
import { VeeField, IconTrash, TableUp } from '@/components';
import type { InputField } from '@/types';
import type { SelectOption } from '@/types/InputField';
import { useAuth } from '@/uses'
import { Form } from 'vee-validate';
import { object, string } from 'yup';
const { user } = await useAuth()

const { putUser, deleteUser } = await useAuth()

const props = defineProps({
    allUsers: {
      type: Object as () => any,
      required: true,
    }
  })

  const validationSchema = object().shape({
    status: string().required('Ce champ est requis'),
  })

  const fields: InputField[] = [
    {
      name: 'status',
      as: 'select',
      options: [{ id:0, label:"Admin"}, { id:1, label:"Membre"}] as SelectOption[],
      disabled: !user.value || user.value.status !== 0,
    },
  ]
  
  const onSubmit = async (values: any) => {
    await putUser(values.id, values)
  }

  const handleDelete = async (e: any) => {
    let id = e.target.parentElement.parentElement.firstChild.value
    await deleteUser(id)
  }

</script>

<template>
<TableUp title="Your Member/Admin" subtitle="Modify roles of your members !" firstTh="Email" secondTh="Roles">
  <div v-for="coin in props.allUsers" :key="coin.name">
      <Form
      :initial-values="coin"
      @submit="onSubmit"
      :validation-schema="validationSchema"  
      class="w-full grid grid-cols-3 justify-items-center items-center py-5">
      <input name="id" type="hidden" :value='coin.id'>
        <td class="w-full">
          <tr>{{ coin.email }}</tr>
        </td>
        <td v-for="field in fields" :key="field.name">
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