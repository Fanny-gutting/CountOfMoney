
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCrypto } from '@/uses'
import { ChartComponnent } from '@/components'

const { findCrypto, getMostRecentValue, get24HChange } = await useCrypto()

const { params } = useRoute()
const id = parseInt(params.id)

const crypto = await findCrypto(id as number)

const mostRecentValue = getMostRecentValue(crypto.crypto_value)
const dayChangeRate = get24HChange(crypto.crypto_value)

let displayedCrypto = {...crypto};

</script>

<template>
  <div>
    <div class="overflow-x-auto max-w-lg">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Most recent value </th>
            <th>Day change rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{ mostRecentValue }}</th>
            <td>{{ dayChangeRate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ChartComponnent :coin="displayedCrypto" />
  </div>
</template>