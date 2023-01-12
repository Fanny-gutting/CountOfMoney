<script setup lang="ts">
import { useRSS } from '@/uses';
import type { InputField } from '@/types';
import { VeeField } from '@/components';
import { object, string } from 'yup';
import { Form } from 'vee-validate';

const { setRSS } = await useRSS()


const fields: InputField[] = [
    {
      label: 'Name',
      name: 'name',
      required: true
    },
    {
      label: 'Url',
      name: 'url',
      required: true
    },
  ]

const initialValues = {
  name: '',
  url: '',
}

const validationSchema = object().shape({
    name: string().required('Ce champ est requis').min(2, 'Vous ne pouvez pas avoir de nom vide ou à moins de 2 caractères.').max(50, '50 caractères maximum.'),
    url: string().required('Ce champ est requis'),
})

const onSubmit = async (values: any) => {
  if (values) await setRSS(values)
}


</script>

<template>
   <Form class="card bg-base-100 shadow-xl w-full md:w-1/3 p-4"
    :initial-values="initialValues"
    @submit="onSubmit"
    :validation-schema="validationSchema">
      <h2 class="font-bold text-2xl">Add feed</h2>
      <p class=" text-xs text-slate-500">Add RSS feed of your choice !</p>
      <div class="w-full">
        <VeeField v-for="field in fields" :key="field.name" :field="field" />
      </div>
      <div class="mt-4 flex justify-end">
        <button role="submit" class="btn btn-primary">Save</button>
      </div>
    </Form>
</template>