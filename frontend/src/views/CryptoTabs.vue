<script setup lang="ts">
  import { AllCrypto, MultiTabs } from '@/components'
  import { useCrypto, usePopCrypto } from '@/uses'
  import { useAuth, useAdminSetting } from '@/uses'
  
  const { user } = await useAuth()
  const { cryptos, getCryptoValues } = await useCrypto()
  const { cryptosPop, getPopCrypto } = await usePopCrypto()
  const { limitSetting } = await useAdminSetting()

  const cryptoValues = await getCryptoValues()
  const cryptoPopValue = await getPopCrypto()
  
  const CryptoFav = cryptos.filter((crypto : any) => {
    let ret = false
    if(user.value && user.value.cryptos){
      user.value.cryptos.forEach((userCrypto : any) => {
        if (userCrypto.name == crypto.name) ret = true
      })
    }
    return ret
  })

const tabs = [
  {
    name: 'popular-crypto',
    label: 'Popular Crypto',
    component: AllCrypto,
    props: {
      cryptoValues: cryptoPopValue,
      cryptos: user.value ? cryptosPop : cryptosPop.slice(0, limitSetting.crypto)
    }
  },
  {
    name: 'all-crypto',
    label: 'All Cryptocurrency',
    component: AllCrypto,
    props: {
      cryptoValues: cryptoValues,
      cryptos: user.value ? cryptos : cryptos.slice(0, limitSetting.crypto)
    }
  },
  {
    name: 'your-favorite-crypto',
    label: 'Your favorite crypto',
    component: AllCrypto,
    props: {
      cryptoValues: cryptoValues,
      cryptos: CryptoFav
    },
    disabled: !user.value
  }
]

</script>

<template>
  <div class="card bg-base-100 shadow-xl max-w-xl flex m-auto">
    <div class="card-body p-0">
      <MultiTabs :tabs="tabs"/>
    </div>
  </div>
</template>
