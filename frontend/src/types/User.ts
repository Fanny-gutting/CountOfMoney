export type User = {
  id: number
  username: string
  email: string
  status: number
  cryptos?: Crypto[] 
}

export type Crypto = {
  name: string,
}