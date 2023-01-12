<script setup lang="ts">
  import {
    ConnectionPage, SubmitButton, VeeField
  } from '@/components'
import type { InputField } from '@/types';
import { Form } from 'vee-validate';
import { useAuth } from '@/uses'
import { object, string } from 'yup';
import { useRouter } from 'vue-router'

const router = useRouter()

const { register } = await useAuth()

  const fields: InputField[] = [
    {
      label: 'Email',
      name: 'email',
      required: true
    },
    {
      label: 'Username',
      name: 'username',
      required: true
    },
    {
      label: 'Mot de passe',
      name: 'password',
      type: 'password',
      required: true
    }
  ]

  const initialValues = {
    email: '',
    username: '',
    password: '',
    status: 1
  }

  const validationSchema = object().shape({
    email: string().required('This field is required').email('invalid email'),
    password: string().required('This field is required')
    .min(8, 'Your password is too short')
  })

  const onSubmit = async (values: any) => {
    await register(values)
    router.push({ name: 'login' })
  }

</script>

<template>
  <ConnectionPage title="Sign In">
    <Form :initial-values="initialValues" :validation-schema="validationSchema" @submit="onSubmit" >
      <input type="hidden" name="remember" value="true">
      <VeeField 
          v-for="field in fields" 
          :key="field.name"
          :field="field"
        />
      <div>
          <SubmitButton name="Sign In"/>
      </div>
    </Form>
    </ConnectionPage>
</template>