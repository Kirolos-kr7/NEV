import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { store } from './store'
import { auth } from './firebase'
import './tailwind.css'
import 'animate.css/animate.css'

store.commit('getUser')
auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setUser', user)
  }
})

createApp(App).use(router, store).mount('#app')
