import 'core-js/features/object/has-own.js'
import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app
  .use(ElementPlus)
  .mount('#app')
function Test() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('done')
    }, 1000)
  })
}
