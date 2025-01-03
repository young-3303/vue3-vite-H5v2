import 'core-js/features/object/has-own.js'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
function Test() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('done')
    }, 1000)
  })
}
