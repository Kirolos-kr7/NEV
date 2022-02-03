import { createWebHistory, createRouter } from 'vue-router'
import newUser from './views/newUser.vue'
import existingUser from './views/existingUser.vue'
import E404 from './views/404.vue'
import Posts from './views/Posts.vue'
import Tags from './views/Tags.vue'
import Post from './views/Post.vue'
import User from './views/User.vue'
import NewPost from './views/NewPost.vue'
import Saved from './views/Saved.vue'
import Useredit from './views/Useredit.vue'
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
    name: 'existingUser',
    component: existingUser,
    meta: {
      registerPage: true,
    },
  },
  {
    path: '/register',
    name: 'newUser',
    component: newUser,
    meta: {
      registerPage: true,
    },
  },
  {
    path: '/u/edit',
    name: 'Useredit',
    component: Useredit,
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
