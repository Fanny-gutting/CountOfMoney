<script setup lang="ts">
import { LikedCrypto} from '@/components'
import {ref} from 'vue'
import { useAuth, useCrypto } from '@/uses'

const { user } = await useAuth()
const { getMostRecentValue, get24HChange } = await useCrypto()

  const props = defineProps({
    cryptoValues: {
      default: Object as() => []
    },
    cryptos: {
      type: Object as() => any,
      default: Object as() => []
    }
  })
  
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Price</th>
          <th>24h Change</th>
          <th v-if="user"></th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="crypto in cryptos" :key="crypto.id">
          <!-- <Form></Form> -->
          <td><router-link :to="{ name: 'cryptoview', params: { id: Number.parseInt(crypto.id) } }">{{ crypto.name }}</router-link></td>
          <td><router-link :to="{ name: 'cryptoview', params: { id: Number.parseInt(crypto.id) } }">{{ getMostRecentValue(cryptoValues, crypto.id) }}</router-link></td>
          <td><router-link :to="{ name: 'cryptoview', params: { id: Number.parseInt(crypto.id) } }" v-bind:class="get24HChange(cryptoValues, crypto.id).includes('-') ? 'color: text-red-700': get24HChange(cryptoValues, crypto.id).includes(0 || 'N/A') ? 'text-slate-900' : 'text-lime-600'">{{  get24HChange(cryptoValues, crypto.id) }}</router-link></td>
          <td v-if="user"><LikedCrypto :crypto="crypto"/></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>