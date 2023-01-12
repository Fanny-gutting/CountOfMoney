<script setup lang="ts">
import { IconTrash, TableUp } from '@/components';
import { useCrypto } from '@/uses'
import { ErrorMessage, Field, Form } from 'vee-validate';

const { deleteCrypto } = await useCrypto()

const props = defineProps({
    cryptos: {
      type: Object as () => any,
      required: true,
    }
  })

  const handleDelete = async (e: any) => {
    let id = e.target.parentElement.parentElement.firstChild.value
    await deleteCrypto(id)
  }


</script>

<template>
<TableUp title="Your cryptocurrency" subtitle="Add a cryptocurrency !" firstTh="Name">
  <div v-for="crypto in props.cryptos" :key="crypto.name"> 
    <Form
      class="w-full grid grid-cols-2 justify-items-center items-center py-5 justify-center">
      <input name="id" type="hidden" :value='crypto.id'>

        <td class="w-full pl-6">
          <tr>{{ crypto.name }}</tr>
        </td>

          <td class="flex gap-2">
            <button type="button" @click="handleDelete" class="btn btn-error text-white"><IconTrash /></button>
          </td>
        </Form>
      </div>
  </TableUp>

</template>