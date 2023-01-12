<script setup lang="ts">
import { VeeField } from '@/components';
import type { InputField, User } from '@/types';
import { useAuth } from '@/uses';
import { Form } from 'vee-validate';
import { object, string } from 'yup';

const { user, putUser } = await useAuth()



const initialData = {
  username: user.value?.username ?? '',
  email: user.value?.email ?? '',
}

const fields: InputField[] = [
    {
      label: 'Email address',
      name: 'email',
      type: 'email',
      required: true
    },
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      required: true
    }
]

const onSubmit = async (values: any) => {
  if (user.value) await putUser(user.value.id, values)
}

const validationSchema = object().shape({
    email: string().required('This field is required').email('invalid email'),
    username: string().required('This field is required'),
})

</script>

<template>
    <div class="flex justify-center flex-col md:flex-row">
        <div class="p-5 md:w-1/3">
            <div class="card max-w-2xl m-auto bg-base-100 shadow-xl">
                <div class="flex justify-center mt-5 mb-10">
                    <div class="tooltip tooltip-bottom tooltip-primary" data-tip="Edit Image">
                        <div class="avatar placeholder">
                            <div class="bg-warning text-primary-content rounded-full w-20">
                                <span class="font-bold uppercase text-4xl">{{ user?.username.slice(0, 1) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body items-center text-center">
                    <h5 class="card-title font-bold">{{ user?.username }}</h5>
                    <h6>{{ user?.email }}</h6>
                </div>
            </div>
        </div>
        <Form 
        :validation-schema="validationSchema"
        :initial-values="initialData"
        @submit="onSubmit"
        class="md:w-2/3"
        >
            <div class="card max-w-3xl m-auto md:m-0 bg-base-100 shadow-xl w-full">
                <div class="card p-5">
                    <h6 class="card-title mb-2 text-primary font-bold pb-7">Personal Details</h6>
                    <div>
                        <VeeField v-for="field in fields" :key="field.name" :field="field" />
                    </div>
                    <div class="flex justify-end">
                        <router-link to="/dashboard"><button type="button"
                                class="btn btn-secondary mt-5 ml-5">Cancel</button></router-link>
                        <button type="submit" id="submit" name="submit" class="btn btn-primary mt-5 ml-5">Update</button>
                    </div>
                </div>
            </div>
        </Form>
    </div>
</template>