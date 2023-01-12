<script lang="ts">
export default {
  data() {
    return {count: 0}
  }
  ,
  created() {
    this.update();
  }
  ,
  methods: {
            update() {
              setInterval(() => {
              this.count++
          }, 1000)
            }
        }
}
</script>

<script setup lang="ts">
import {IconStarFull, IconStar} from '@/components'
import { useAuth, useCryptoFav } from '@/uses'

const { deleteCryptoFav, setCryptoFav } = await useCryptoFav()


const props = defineProps({
  crypto: {
    type: Object as () => any,
    default: Object as () => any
  },
})

const { user } = await useAuth()
    
const isLiked = (user: any, crypto: any) => {
  const likedCryptos: any[] = user?.cryptos
  let ret: boolean = false
  if (likedCryptos?.length) {
    likedCryptos.forEach((likedCrypto: any) => {
      if (likedCrypto.name == crypto.name) {
        ret =  true
      }
    })
  }
  return ret
}

let liked = isLiked(user.value, props.crypto)

  const changeLiked = (user: any, crypto: any) => {
    // if crypto fav => delete else put
    if (liked) {
      const data = {
        users_id: user?.id,
        cryptos_id: crypto.id
      }
      deleteCryptoFav(data)
    } else {
      const data = {
        users_id: user?.id,
        cryptos_id: crypto.id
      }
      setCryptoFav(data)
    }
    liked = !liked
  }
  
</script>

<template>
  <button :v-model="count" v-bind="liked">
    <IconStarFull v-if="liked" @click="changeLiked(user, props.crypto)" /><IconStar v-if="!liked" @click="changeLiked(user, props.crypto)" />
  </button>
</template>