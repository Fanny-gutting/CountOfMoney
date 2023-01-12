import type { FluxRSS } from '@/types'
import { ref } from "vue"
import { useAxios } from '@/uses'
import { useToast } from "vue-toastification"

const rss = ref<FluxRSS | undefined>()
const toast = useToast()

const useRSS = async () => {
  const { Axios } = useAxios()
  let flux = []

  const res = await Axios.get('rss/')
  if (res.status !== 200) throw new Error("Error")
  // const data = res.data
  const fluxy = <any>[]
  res.data.forEach((coin: any) => {
    const coinView = {
      id: "",
      name: "",
      url: "",
    }

    coinView.name = coin.name
    coinView.url = coin.url
    coinView.id = coin.id
    fluxy.push(coinView)
  })
  flux = fluxy

  const putRSS = async (id: number, values: FluxRSS) => {
    if(values){
      const response = await Axios.put(`rss/${values.id}/`, {
        name: values.name,
        url: values.url
      })
      if (values) {
        rss.value = { ...rss.value, ...values }
        toast.success('Data updated !')
      }

      if (response.status !== 200 || !response) {
        toast.error('Update failed...')
        return false
      }
    }
  }

  const setRSS = async (data: any) => {
    const response = await Axios.post('/rss', data)
    if (response.status !== 200){
      return toast.info('Your RSS feed has not been saved')
    }
    return toast.success('Your RSS feed has been saved')
  }

  const deleteRSS = async (id: number) => {
    const response = await Axios.delete(`rss/${id}/`)
    if (response.status !== 200){
      return toast.info('Your RSS feed has not been deleted')
    }
    return toast.success('Your RSS feed has been deleted')
  }


  return {
    flux,

    putRSS,
    setRSS,
    deleteRSS
  }
}

export default useRSS