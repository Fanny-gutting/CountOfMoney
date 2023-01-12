import useAxios from "./useAxios"
import { useToast } from "vue-toastification"
import type { Crypto } from "@/types"
import { ref } from "vue"
const toast = useToast()

const crypt = ref<Crypto | undefined>()

const useCrypto = async () => {
  const { Axios } = useAxios()
  let cryptos = []

  const res = await Axios.get('cryptos/')
  if (res.status !== 200) throw new Error("Error")
  const crypt = <any>[]
  res.data.forEach((crypto: any) => {
    const cryptoView = {
      id: "",
      name: "",
      show: false,
    }
    cryptoView.name = crypto.name
    cryptoView.show = crypto.show
    cryptoView.id = crypto.id
    crypt.push(cryptoView)
  })
  cryptos = crypt

  const getCryptoValues = async () => {
    const response = await Axios.get(`cryptos/`)
    if (response.status !== 200) throw new Error("Error")
  
    const values: any[] = [];
    response.data.forEach((coin: any) => {
      coin.crypto_value.forEach((value: any) => {
        values.push({
          value : value.value,
          id    : coin.id,
          date  : value.date
        })
      })
    })
    return values;
  }

  const setCrypto = async (data: any) => {
    const response = await Axios.post('/cryptos', data)
    if (response.status !== 200){
      return toast.info('Your cryptocurrency has not been saved')
    }
    return toast.success('Your cryptocurrency has been saved')
  }

  const findCrypto = async (id: number) => {
    const response = await Axios.get(`cryptos/${id}/`)
    if (response.status !== 200){
      return toast.info('Error')
    }
    return response.data
  }

  const deleteCrypto = async (id: number) => {
    const response = await Axios.delete(`cryptos/${id}/`)
    if (response.status !== 200){
      return toast.info('Your cryptocurrency has not been deleted')
    }
    return toast.success('Your cryptocurrency has been deleted')
  }

  const getCoinValues = (allValues: any, id: number | false=false) => {
    const values: any[] = [];
    if (id === false) {
      allValues.forEach((value: any) => {
        values.push(value)
      })
    } else { 
      allValues.forEach((value: any) => {
        if (value.id == id) {
          values.push(value)
        }
      })
    }
    return values;
  }

  const getMostRecentValue = (allValues: any, id: number | false=false) => {
    const values: any[] = getCoinValues(allValues, id)
    
    const mostRecentValue = values[0];
    // IF DATA NOT ORDERED
    // values.forEach((value: any) => {
      //   if (new Date(value.date) > new Date(mostRecentValue.date)) {
        //     mostRecentValue = value
        //   }
    // })
    return  "$" + Math.round(mostRecentValue.value * 100)/100
  }
  
  const get24HChange = (allValues: any, id: number | false=false) => {
    const values: any[] = getCoinValues(allValues, id)

    try {
      const now = values[0];
      let closest = values[1];
      const yesterday = new Date(new Date(now.date).getTime() - (24 * 60 * 60 * 1000));
      const theDayBefore = new Date(new Date(now.date).getTime() - (48 * 60 * 60 * 1000));
      // get closest to date
      values.forEach((value: any) => {
        if (new Date(value.date) < new Date(now.date) && new Date(value.date) < yesterday && new Date(value.date) > theDayBefore) {
          closest = value
        }
      })
      if (new Date(closest.date) > yesterday && new Date(closest.date) < theDayBefore) {
        // do nothing
      }else if (new Date(closest.date) > yesterday || new Date(closest.date) < theDayBefore) {
        closest = 'AZEDFG'
      }
      const nowValue = Number.parseFloat(now.value)
      const yesterdayValue = Number.parseFloat(closest.value)
      const hChange = (((nowValue - yesterdayValue) / yesterdayValue) * 100)
      return hChange ? Math.round(hChange * 100)/100 + "%" : "N/A"
    } catch (e) {
      return "N/A"
    }
  }

  return {
    cryptos,
    getCryptoValues,
    
    getMostRecentValue,
    get24HChange,

    setCrypto,
    deleteCrypto,
    findCrypto
  }
}

export default useCrypto