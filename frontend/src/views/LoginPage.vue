<script setup>

  // eslint-disable-next-line vue/no-export-in-script-setup
  export default{
    name:'tes',
    mounted(){
      window.addEventListener('load', this.handleLoad);
    },
    methods:{
      handleLoad(){
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        console.log(accessToken)
      }
    }
  }

</script>
<script setup lang="ts">
  import {
    SubmitButton, ConnectionPage, VeeField
  } from '@/components'
  import { useRouter } from 'vue-router'
  import { Form } from 'vee-validate'
  import { object, string } from 'yup'
  import { useAuth } from '@/uses'
  import type { InputField } from '@/types';
  
  const router = useRouter()

  const { login } = await useAuth()

  const fields: InputField[] = [
    {
      label: 'Email address',
      name: 'email',
      type: 'email',
      required: true
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      required: true
    }
  ]

  const initialValues = {
    email: '',
    password: ''
  }


  const onSubmit = async (values: any) => {
    const success = await login(values)
    if (success) router.push({ name: 'dashboard' })
  }

  const schema = object().shape({
    email: string().required('Veuillez renseigner vos identifiants.').email('Adresse mail non valide.'),
    password: string().required('Veuillez renseigner votre mot de passe.')
  })

</script>

<template>
    <ConnectionPage title="Login">
      <Form 
      :validation-schema="schema"
      :initial-values="initialValues"
      @submit="onSubmit"
      >
        <input type="hidden" name="remember" value="true">
        <div class="-space-y-px rounded-md shadow-sm">
          <VeeField v-for="field in fields" :key="field.name" :field="field" />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </div>
        <div>
          <SubmitButton name="Login"/>
        </div>
      </Form>
    </ConnectionPage>

</template>
