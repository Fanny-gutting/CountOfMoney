<script setup lang="ts">
 import { AddCryptos, LimitCryptos, UpCryptos } from '@/components'
 
 const props = defineProps({
    cryptos: {
      type: Object as () => any,
      required: true,
    }
  })
</script>

<template>
  <div>
    <Suspense>
  
      <template #default>
        <div>
          <div class="flex flex-col md:flex-row gap-5">
            <LimitCryptos class="w-full md:w-1/2"/>
            <AddCryptos class="w-full md:w-1/2" v-bind="$props"/>
          </div>
          <UpCryptos v-bind="$props" class="max-w-md mt-5"/>
        </div>

      </template>
  
      <template #fallback>
        <div>Chargement...</div>
      </template>
  
    </Suspense>
  </div>
</template>