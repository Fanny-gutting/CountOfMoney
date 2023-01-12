export type InputField = {
  label?: string
  name: string
  type?: 'text' | 'number' | 'password' | 'email'
  required?: boolean
  placeholder?: string
  as?: 'input' | 'select'
  options?: SelectOption[]
  if?: () => boolean
  disabled?: boolean
}

export type SelectOption = {
  id: number,
  label: string
}