import { useAxios } from '@/uses'

const usePopCrypto = async () => {
  const { Axios } = useAxios()

  let cryptosPop = []

  const res = await Axios.get('cryptos/FindPopCrypto/')
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
  cryptosPop = crypt
 
  const getPopCrypto = async () => {
    const response = await Axios.get(`cryptos/FindPopCrypto/`)
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


  return {
    cryptosPop,
    getPopCrypto,
  }
}

export default usePopCrypto