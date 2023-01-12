<script setup lang="ts">
  import { MultiTabs, FluxForm, MemberForm, CryptoForm } from '@/components'
  import { useAuth, useCrypto, useRSS } from '@/uses'

  const { flux } = await useRSS()
  const { allUsers } = await useAuth()
  const { cryptos } = await useCrypto()

  const tabs = [
  {
    name: 'Flux RSS',
    label: 'Your flux',
    component: FluxForm,
    props: {
      flux: flux
    }
  },
  {
    name: 'Your members',
    label: 'Your members',
    component: MemberForm,
    props: {
      allUsers: allUsers
    }
    // props: {
    //   notifications: notifications.filter(notif => notif.label === "finished")
    // }
  },
  {
    name: 'Cryptocurrency',
    label: 'Cryptocurrency',
    component: CryptoForm,
    props: {
      cryptos: cryptos
    }
  }
]

</script>
<template>
   <div>
      <MultiTabs :tabs="tabs" />
  </div>
</template>