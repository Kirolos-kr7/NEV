import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { store } from './store'
import '../tailwind.css'
import 'animate.css/animate.css'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  // onNeedRefresh() {},
  // onOfflineReady() {},
})

createApp(App).use(router, store).mount('#app')
