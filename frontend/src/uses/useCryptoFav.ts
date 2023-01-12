import { useAxios } from '@/uses'
import { useToast } from "vue-toastification"


const toast = useToast()

const useCryptoFav = async () => {
  const { Axios } = useAxios()

  const setCryptoFav = async (data: any) => {
    const response = await Axios.post('/users_crypto', data)
    if (response.status !== 200){
      return toast.info('favorites not added')
    }
    return toast.info('favorites added')
  }
 
  
  const deleteCryptoFav = async (data: any) => {
    const response = await Axios.delete(`users_crypto/delOne/`, {data:data})
    if (response.status !== 200){
      return toast.info('favorites not deleted')
    }
    return toast.info('favorites deleted')
  }


  return {
    setCryptoFav,
    deleteCryptoFav
  }
}

export default useCryptoFav