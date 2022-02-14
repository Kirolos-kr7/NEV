<template>
  <header
    class="flex fixed top-0 min-w-full justify-center h-[70px] sm:h-[65px] z-30 bg-white dark:bg-dark2 !bg-opacity-90 backdrop-blur-md"
  >
    <nav
      class="w-full flex justify-between items-center bg-transparent !mx-auto px-3 sm:px-10 shadow-sm gap-5 max-w-kratos"
    >
      <div class="flex items-center">
        <div
          class="menuBtn lg:hidden mr-3 h-9 w-9 p-0.5 flex items-center hover:bg-gray-50 dark:hover:bg-dark1 cursor-pointer rounded-md transition"
          @click="ddm = !ddm"
        >
          <svg
            class="w-9 h-9 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <router-link
          to="/"
          class="cursor-pointer mt-1 rounded-md hover:text-dark4 focus:text-dark4"
        >
          <svg
            class="siteIcon"
            width="75"
            height="48"
            viewBox="0 0 75 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              class="bg transition-all"
              width="75"
              height="47.5"
              rx="5"
              fill="currentColor"
            />
            <path
              d="M26.3164 23.7852V21.8281L26.293 18.7227L26.2812 17.3047L26.2695 16.4141C26.2695 15.9922 26.4141 15.7812 26.7031 15.7812C26.875 15.7812 26.9922 15.832 27.0547 15.9336C27.125 16.0273 27.1602 16.2109 27.1602 16.4844V16.6484C27.1523 16.8125 27.1484 17.082 27.1484 17.457L27.1016 21.4062L27.0664 25.0273L27.1016 28.8359L27.1484 32.6562C25.5391 31.6484 23.1836 30.2578 20.082 28.4844C16.9805 26.7031 14.4688 25.3047 12.5469 24.2891L12.5586 24.8633L12.6758 30.9102L12.6875 31.7188C12.6875 32.0547 12.5312 32.2227 12.2188 32.2227C11.8984 32.2227 11.7383 32.0156 11.7383 31.6016L11.75 30.7812L11.7617 29.457L11.8086 23.4453L11.7148 15.3477C14.8789 17.3086 19.7461 20.1211 26.3164 23.7852ZM36.7461 21.1367C36.7305 21.4961 36.7227 21.9336 36.7227 22.4492V23.1523L36.8047 31.2383L40.7773 31.1914L43.5898 31.1562C44.0508 31.1562 44.2812 31.2969 44.2812 31.5781C44.2812 31.8125 44.1641 31.9453 43.9297 31.9766C43.875 31.9844 43.5508 31.9922 42.957 32H29.6445L29.6562 31.3906L29.668 27.4766L29.7148 23.2812L29.6211 16.0039H42.043C42.5977 16.0039 42.9141 16.0156 42.9922 16.0391C43.1719 16.0859 43.2617 16.2188 43.2617 16.4375C43.2617 16.7109 43.0898 16.8477 42.7461 16.8477H42.6641L36.793 16.7656L36.7461 20.3984L38.0234 20.4102L42.125 20.3398L43.0273 20.3281C43.3555 20.3281 43.5703 20.3555 43.6719 20.4102C43.7812 20.4648 43.8359 20.5742 43.8359 20.7383C43.8359 21.043 43.5781 21.1953 43.0625 21.1953L42.1367 21.1719L36.7461 21.1367ZM57.6406 25.3672L59.7383 21.4414C60.7773 19.5195 61.6055 17.918 62.2227 16.6367C62.3867 16.293 62.5156 16.0664 62.6094 15.957C62.7109 15.8398 62.832 15.7812 62.9727 15.7812C63.1055 15.7812 63.2227 15.8281 63.3242 15.9219C63.4258 16.0078 63.4766 16.1133 63.4766 16.2383C63.4766 16.3711 63.3945 16.582 63.2305 16.8711C63.1914 16.9414 63.1523 17.0078 63.1133 17.0703C63.0352 17.1953 62.9336 17.3711 62.8086 17.5977L54.1367 33.2305L44.1289 16.0039H52.3438L57.6406 25.3672Z"
              fill="white"
            />
          </svg>
        </router-link>
      </div>
      <ul class="h-full flex justify-center items-center" v-if="user">
        <li>
          <router-link to="/postnow" class="btn-medium blueish"
            >Write a post
          </router-link>
        </li>
        <li class="pl-3 sm:pl-6 inline-block my-auto relative">
          <button
            class="profile flex justify-center items-center w-11 h-11 rounded-full overflow-hidden cursor-pointer relative"
            @click.prevent="userMenuActions"
          >
            <VImage :src="user.photoURL" type="user" :animate="false" />
          </button>
          <transition
            enter-active-class="animate__animated animate__fadeIn  animate__faster"
            leave-active-class="animate__animated animate__fadeOut  animate__faster"
          >
            <div
              class="userMenu absolute right-4 top-13 border-solid border-black rounded-md border-4 w-48 transition-all"
              style="box-shadow: 3px 3px #000"
              v-if="userMenu"
            >
              <ul class="list-none p-0 font-BioRhyme">
                <li>
                  <router-link
                    :to="'/u/' + user.displayName"
                    class="flex no-underline text-black dark:text-white p-2 bg-white dark:bg-dark2 hover:bg-gray-100 dark:hover:bg-dark1 transition-all w-full focus:ring-inset"
                    ><svg
                      class="w-6 h-6 mr-2"
                      fill="#9ca3af3d"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    <span>{{ '@' + user.displayName }}</span></router-link
                  >
                </li>
                <li>
                  <button
                    class="flex no-underline text-black dark:text-white p-2 bg-white dark:bg-dark2 hover:bg-gray-100 dark:hover:bg-dark1 transition-all w-full cursor-pointer focus:ring-inset"
                    @click.prevent="setTheme"
                  >
                    <svg
                      v-if="!isDark"
                      class="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-pl-6nejoin="round"
                        stroke-width="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      ></path>
                    </svg>
                    <svg
                      v-if="isDark"
                      class="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                    <span v-if="isDark">Light</span>
                    <span v-if="!isDark">Dark</span>
                  </button>
                </li>
                <li>
                  <button
                    class="bg-white dark:bg-dark2 dark:hover:bg-dark1 dark:text-white hover:bg-gray-100 transition-all p-2 w-full cursor-pointer flex focus:ring-inset"
                    @click.prevent="logOut"
                  >
                    <svg
                      class="w-6 h-6 mr-2"
                      fill="#9ca3af3d"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </transition>
        </li>
      </ul>
      <ul class="h-full flex justify-center items-center" v-if="!user">
        <li class="my-auto list-none mx-2">
          <router-link class="btn-medium" to="/login"> Log In</router-link>
        </li>
        <li class="my-auto list-none mx-2 hidden sm:block">
          <router-link class="btn-medium blueish" to="/register">
            Create Account</router-link
          >
        </li>
        <li>
          <button
            class="flex text-black dark:text-white p-2 bg-white dark:bg-dark2 hover:bg-gray-100 dark:hover:bg-dark1 zw-full cursor-pointer rounded-full transition"
            @click="setTheme"
          >
            <svg
              v-if="!isDark"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-pl-6nejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
            <svg
              v-if="isDark"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </header>

  <transition
    enter-active-class="animate__animated animate__slideInDown animate__faster"
    leave-active-class="animate__animated animate__slideOutUp animate__faster"
  >
    <Sidenav
      class="fixed top-14 sm:top-18 z-30 transform transition opacity-[0.98]"
      v-if="ddm"
      :isHomePage="false"
    />
  </transition>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import Sidenav from '../components/Sidenav.vue'
import VImage from './VImage.vue'

let userMenu = ref(false)
let ddm = ref(false)
let isDark = ref(false)

onMounted(() => {
  let theme = localStorage.getItem('theme')

  if (theme == undefined || theme == null) {
    isDark.value = true
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    if (theme === 'dark') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    } else {
      isDark.value = false
      document.documentElement.classList.remove('dark')
    }
  }
})

const setTheme = () => {
  let theme = localStorage.getItem('theme')
  if (theme === 'dark') {
    theme = 'light'
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    theme = 'dark'
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  localStorage.setItem('theme', theme)
}

const user = computed(() => {
  return store.state.user
})

const logOut = () => {
  store.commit('setUser', { user: null })
}

const userMenuActions = (evt) => {
  if (userMenu.value === true) {
    userMenu.value = false
  } else {
    userMenu.value = true
  }
}

const handleMenu = (e) => {
  if (
    !document.querySelector('.userMenu')?.contains(e.target) &&
    !document.querySelector('.profile')?.contains(e.target)
  ) {
    userMenu.value = false
  }
}

watch(userMenu, () => {
  if (user.value) {
    window.addEventListener('mouseup', handleMenu, {
      passive: true,
    })
  } else {
    window.removeEventListener('mouseup', handleMenu, {
      passive: true,
    })
  }
})
</script>
