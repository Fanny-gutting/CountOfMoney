export type Crypto = {
  id: number
  name: string
  show: boolean
  crypto_value?: CryptoValue[] 
}

export type CryptoValue = {
  id: number,
  value: string
  date: string 
}