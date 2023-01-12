<script setup lang="ts">
import { useCrypto } from '@/uses';
import type { InputField } from '@/types';
import { VeeField } from '@/components';
import { object, string } from 'yup';
import { ErrorMessage, Field, Form } from 'vee-validate';

const { setCrypto } = await useCrypto()

const props = defineProps({
    cryptos: {
      type: Object as () => any,
      required: true,
    }
  })

const fields: InputField[] = [
    {
      label: 'Name',
      name: 'name',
      required: true
    }
  ]

const initialValues = {
  name: '',
  show: false,
}

const validationSchema = object().shape({
    name: string().required('Ce champ est requis')
})

const onSubmit = async (values: any) => {
  if (values) await setCrypto(values)
}


</script>

<template>
   <Form class="card bg-base-100 shadow-xl p-4 h-full"
    :initial-values="initialValues"
    @submit="onSubmit"
    :validation-schema="validationSchema"
    >
      <h2 class="font-bold text-2xl">Add cryptocurrency</h2>
      <p class=" text-xs text-slate-500">Add cryptocurrency as you want !</p>
      <div class="w-full">
        <VeeField v-for="field in fields" :key="field.name" :field="field" />
      </div>

      <div class="form-control hidden">
        <Field v-slot="slot" name="show" id="show" type="checkbox" :value="false">
          <label class="label select-none cursor-pointer mt-4 justify-start gap-4">
            <input type="checkbox" class="checkbox checkbox-primary" v-bind="slot.field" :value="false"/>
            <span class="label-text">
              Show cryptocurrency
            </span>
          </label>
        </Field>
        <ErrorMessage name="show" class="text-error" />
      </div>

      <div class="mt-4 flex justify-end">
        <button role="submit" class="btn btn-primary">Save</button>
      </div>
    </Form>
</template>