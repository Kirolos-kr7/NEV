import { useRouter } from 'vue-router'
import { createStore } from 'vuex'
import { auth } from './firebase'

export const store = createStore({
  state() {
    return {
      user: undefined,
      postSlug: {},
      menu: false,
    }
  },
  mutations: {
    async getUser(state) {
      if (
        localStorage.getItem('user') !== null &&
        localStorage.getItem('user') !== undefined &&
        localStorage.getItem('user') !== ''
      ) {
        state.user = await JSON.parse(localStorage.getItem('user'))
      }
    },
    setUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    logOut() {
      store.commit('setUser', null)
      auth.signOut()
    },
  },
})
