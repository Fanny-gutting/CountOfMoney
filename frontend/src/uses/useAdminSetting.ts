import type { AdminSetting } from '@/types'
import { ref } from "vue"
import { useAxios } from '@/uses'
import { useToast } from "vue-toastification"

const setting = ref<AdminSetting | undefined>()
const toast = useToast()

const useAdminSetting = async () => {
  const { Axios } = useAxios()
  let adminSetting: any[] = []
  let limitSetting = <any>[]

  const response = await Axios.get('admin_settings/')
  if (response.status !== 200) throw new Error("Error")
  const adminSet = <any>[]
  response.data.forEach((adminSetti: any) => {
    const adminSettingView = {
      id: "",
      name: "",
      value: 0,
    }

    adminSettingView.name = adminSetti.name
    adminSettingView.value = adminSetti.value
    adminSettingView.id = adminSetti.id
    adminSet.push(adminSettingView)

  })
  adminSetting = adminSet
  
  const getAdminSetting = async () =>{
    const x: any = {}
    adminSetting.forEach((val) => {
      for (const [key, value] of Object.entries(val)) {
        if (key == 'name') {
          x[value] = val.value
        }
      }
    })
  return x
  }
  limitSetting = await getAdminSetting()

  const putAdminSetting = async (id: number, values: AdminSetting) => {
    if(values){
      const response = await Axios.put(`admin_settings/${values.id}/`, {
        value: values.value
      })
      if (values) {
        setting.value = { ...setting.value, ...values }
        toast.success('Data updated !')
      }

      if (response.status !== 200 || !response) {
        toast.error('Update failed...')
        return false
      }
    }
  }

  return {
    adminSetting,
    limitSetting,
    putAdminSetting,
    getAdminSetting
  }
}

export default useAdminSetting