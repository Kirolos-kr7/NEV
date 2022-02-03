import { useRouter } from 'vue-router'
import { createStore } from 'vuex'
import { auth } from './firebase'

export const store = createStore({
  state() {
    return {
      user: null,
      postSlug: {},
      menu: false,
    }
  },
  mutations: {
    setUser(state, { user }) {
      if (!user) {
        auth.signOut()
        state.user = null
      } else state.user = user
    },
  },
})
