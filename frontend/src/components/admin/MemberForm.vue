<script setup lang="ts">
 import { UpMember } from '@/components'
 
 const props = defineProps({
    allUsers: {
      type: Object as () => any,
      required: true,
    }
  })
</script>

<template>
  <div>
    <Suspense>
  
      <template #default>
       <div class="flex flex-col md:flex-row xl:flex-row w-full gap-10 mt-4">
         <UpMember v-bind="$props"/>
       </div>

      </template>
  
      <template #fallback>
        <div>Chargement...</div>
      </template>
  
    </Suspense>
  </div>
</template>