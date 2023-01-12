<script setup lang="ts">
 import { UpFlux, AddFlux, LimitFlux } from '@/components'

 const props = defineProps({
    flux: {
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
          <div class="flex flex-col md:flex-row xl:flex-row w-full gap-10 mt-4">
           <AddFlux />
           <UpFlux v-bind="$props"/>
          </div>
          <LimitFlux class="my-7 max-w-md"/>
        </div>
      </template>
  
      <template #fallback>
        <div>Chargement...</div>
      </template>
  
    </Suspense>
  </div>
</template>