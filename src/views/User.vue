<template>
  <Navbar />
  <div class="dark:bg-dark1" v-if="loaded">
    <div class="topish h-48 bg-black sm:h-48"></div>

    <div
      class="wrapper relative mx-auto -mt-12 mb-5 rounded-md bg-white p-5 pt-16 dark:bg-dark2 md:w-10/12 md:border md:border-solid md:border-gray-300 md:dark:border-dark1 lg:w-8/12"
    >
      <div class="editProfile" v-if="thisUser?.displayName === user?.username">
        <div class="absolute right-8 top-[21px]">
          <router-link to="/u/edit" class="btn-medium blueish"
            >Edit Profile</router-link
          >
        </div>
      </div>
      <div
        class="img-wrapper group absolute -top-16 left-8 flex h-28 w-28 items-center overflow-hidden rounded-full border-8 border-solid border-black bg-black md:left-1/2 md:h-32 md:w-32 md:-translate-x-1/2 md:transform"
      >
        <VImage :src="user.image" type="user" />
        <button
          v-if="user"
          class="absolute top-0 left-0 h-full w-full bg-black/30 p-5 text-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 dark:bg-white/30 dark:text-white/60"
          @click="changeImage"
        >
          <svg
            class="h-full w-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </button>
      </div>
      <h2
        class="mt-2 font-BioRhyme text-3xl font-black dark:text-white md:text-center"
      >
        {{ user?.fullName }}
      </h2>
      <h3 class="font-BioRhyme text-base dark:text-specialGray md:text-center">
        {{ '@' + user?.username }}
      </h3>
      <p class="mt-3 text-xl dark:text-gray-300 md:text-center">
        {{ user?.bio }}
      </p>
      <div
        class="my-7 flex flex-wrap items-center font-BioRhyme md:flex-nowrap"
      >
        <div
          class="icon-wrapper mx-3 flex gap-2 md:block md:w-1/3 md:text-center"
        >
          <svg
            class="mx-auto mb-2 block h-6 w-6 dark:text-slateGray"
            fill="#e3e3e3"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span class="m-0.5 block text-gray-400">{{ user?.location }}</span>
        </div>
        <div
          class="icon-wrapper mx-3 flex gap-2 md:block md:w-1/3 md:text-center"
        >
          <svg
            class="mx-auto mb-2 block h-6 w-6 dark:text-slateGray"
            fill="#e3e3e3"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
            ></path>
          </svg>
          <span class="m-0.5 block whitespace-nowrap text-gray-400">{{
            'Joined on ' + user?.joinDate.substring(4, 15)
          }}</span>
        </div>
        <div
          class="icon-wrapper mx-3 flex gap-2 md:block md:w-1/3 md:text-center"
        >
          <svg
            class="mx-auto mb-2 block h-6 w-6 dark:text-slateGray"
            fill="#e3e3e3"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <a
            :href="'mailto:' + user?.email"
            class="box relative inline-block text-center text-gray-400 no-underline"
            style="height: fit-content"
            ><span>{{ user?.email }}</span>
            <div class="lined hidden bg-gray-400 transition-all sm:block"></div
          ></a>
        </div>
        <div
          class="icon-wrapper mx-3 flex gap-2 md:block md:w-1/3 md:text-center"
          v-if="user?.website"
        >
          <svg
            class="mx-auto mb-2 block h-6 w-6 dark:text-slateGray"
            fill="#e3e3e3"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
          <a
            :href="user?.website"
            target="_blank"
            class="box relative inline-block text-center text-gray-400 no-underline"
            style="height: fit-content"
            ><span>{{ user.website }}</span>
            <div class="lined hidden bg-gray-400 transition-all sm:block"></div
          ></a>
        </div>
      </div>
      <div
        class="border-t border-b-0 border-l-0 border-r-0 border-solid border-gray-200 pt-3 dark:border-dark1"
        v-if="posts.length > 0"
      >
        <h2
          class="p-3 font-BioRhyme text-2xl font-semibold dark:text-white"
          v-if="thisUser?.displayName === user?.username"
        >
          Your Posts
          <Colors />
        </h2>
        <h2
          class="p-3 font-BioRhyme text-2xl font-semibold dark:text-white"
          v-else
        >
          Posts By {{ user?.fullName.split(' ')[0] }}
          <Colors />
        </h2>

        <div class="posts grid grid-cols-1 items-baseline gap-4 sm:grid-cols-2">
          <Post :posts="posts" :thumbnail="true" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <LoadingUser v-else />

  <transition name="fade">
    <div
      v-if="imageDialog"
      @click="changeImage"
      class="fixed top-0 left-0 z-30 h-full w-full bg-black/40 backdrop-blur-sm"
    ></div>
  </transition>

  <ImageUpload
    v-if="imageDialog"
    :img="user.image"
    :isCurrent="thisUser?.displayName === user?.username"
  />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { store } from '../store'
import { db } from '../firebase'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Post from '../components/Post.vue'
import LoadingUser from '../components/LoadingUser.vue'
import Footer from '../components/Footer.vue'
import Colors from '../components/Colors.vue'
import VImage from '../components/VImage.vue'
import ImageUpload from '../components/ImageUpload.vue'

let route = useRoute(),
  user = ref(),
  posts = ref([]),
  loaded = ref(false),
  imageDialog = ref(false)

const router = useRouter()

let thisUser = computed(() => {
  return store.state.user
})

onMounted(() => {
  fetchUserData()
})

watch(route, () => {
  if (route.params.username) {
    loaded.value = false
    fetchUserData()
  }
})

const fetchUserData = () => {
  posts.value = []
  db.collection('users')
    .where('username', '==', route.params.username.toLowerCase())
    .limit(1)
    .get()
    .then((res) => {
      res.docs.forEach((doc) => {
        user.value = doc.data()
        document.title = doc.data().fullName + ' - NEV 🔥'
      })
      db.collection('posts')
        .where('userName', '==', route.params.username.toLowerCase())
        .get()
        .then((res) => {
          res.forEach((post) => {
            let postWithID = post.data()
            postWithID.id = post.id
            posts.value.push(postWithID)
          })
          loaded.value = true
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

const changeImage = () => {
  imageDialog.value = !imageDialog.value
  if (imageDialog.value) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = 'auto'
}
</script>
