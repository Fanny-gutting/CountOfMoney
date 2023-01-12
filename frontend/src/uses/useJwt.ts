import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { JWTPayload } from '@/types'

const jwt = useLocalStorage('jwt', '')

const useJwt = () => {

  // Récupérer les informations du JWT qui sont encodé en base 64
  const payload = computed(() => {
    if (jwt.value) {
      const [, payload] = jwt.value.split('.')
      const data: JWTPayload = JSON.parse(atob(payload)).data
      return data
    }
    return undefined
  })

  return {
    jwt,
    payload,

  }
}

export default useJwt