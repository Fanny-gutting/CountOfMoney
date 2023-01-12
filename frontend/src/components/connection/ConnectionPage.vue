<script setup lang="ts">
  import {
    IconBigPiggyBank, IconFB, IconGoogle, IconLinkedIn, SubmitButton
  } from '@/components'
import { useAuth } from '@/uses';

  const { getOauth2 } = await useAuth()
  // const test = await getOauth2()

  defineProps({
    title: {
      type: String,
      required: true,
    }
  })

</script>

<template>
    <div class="bgLoginSignin flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8 bg-white p-10 rounded-xl drop-shadow-lg">
          <div>
            <div class="flex justify-center">
              <IconBigPiggyBank/>
            </div>
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{{ title }}</h2>
          </div>
          <slot>
          </slot>
          
          <div class="divider lg:divider-vertical">OR</div> 
          <div class="flex justify-center grid-rows-3 gap-5">
            <button><IconFB/></button>
            <a href="http://localhost:4000/auth/google"><button><IconGoogle/></button></a>
            <button><IconLinkedIn/></button>
          </div>
        </div>
      </div>
</template>