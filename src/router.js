import { createWebHistory, createRouter } from 'vue-router'
import RegisterUser from './views/RegisterUser.vue'
import LoginUser from './views/LoginUser.vue'
import E404 from './views/404.vue'
import Posts from './views/Posts.vue'
import Tags from './views/Tags.vue'
import Post from './views/Post.vue'
import User from './views/User.vue'
import NewPost from './views/NewPost.vue'
import Saved from './views/Saved.vue'
import UserEdit from './views/UserEdit.vue'
import { store } from './store'
import { isRegistered } from './firebase'

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/t/:tag',
    name: 'Tags',
    component: Tags,
  },
  {
    path: '/login',
    name: 'Login User',
    component: LoginUser,
    meta: {
      registerPage: true,
    },
  },
  {
    path: '/register',
    name: 'Register User',
    component: RegisterUser,
    meta: {
      registerPage: true,
    },
  },
  {
    path: '/u/edit',
    name: 'User Edit',
    component: UserEdit,
    meta: {
      requireAuth: true,
    },
  },
  ,
  {
    path: '/u/:username',
    name: 'User',
    component: User,
  },
  {
    path: '/p/:slug',
    name: 'Post',
    component: Post,
  },
  {
    path: '/postnow',
    name: 'NewPost',
    component: NewPost,
  },
  {
    path: '/s',
    name: 'Saved',
    component: Saved,
  },
  {
    path: '/:catchAll(.*)',
    component: E404,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  await isRegistered

  scrollTo(0, 0)
  let registerPage = to.matched.some((route) => route.meta.registerPage)
  let requireAuth = to.matched.some((route) => route.meta.requireAuth)
  if (!store.state.user && requireAuth) next({ path: '/' })
  else if (store.state.user && registerPage) next({ path: '/' })
  else next()
})

export default router
