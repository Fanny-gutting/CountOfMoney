import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION, type PluginOptions } from "vue-toastification"
import "vue-toastification/dist/index.css"

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 5000
}
app.use(Toast, toastOptions)