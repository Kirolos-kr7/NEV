<template>
  <Navbar />
  <div class="pt-5 dark:bg-dark1" v-if="loaded">
    <div class="topish bg-black sm:h-48 h-44"></div>

    <div
      class="wrapper dark:bg-dark2 relative -mt-12 mb-5 pt-16 md:w-10/12 lg:w-8/12 md:border md:border-gray-300 md:dark:border-dark1 md:border-solid mx-auto p-5 rounded-md bg-white"
    >
      <div class="editProfile" v-if="thisUser?.displayName === user?.username">
        <div class="absolute right-8 top-6">
          <router-link to="/u/e" class="btn-medium blueish"
            >Edit Profile</router-link
          >
        </div>
      </div>
      <div
        class="img-wrapper w-28 md:w-32 h-28 md:h-32 flex items-center overflow-hidden rounded-full absolute -top-16 left-8 md:left-1/2 md:transform md:-translate-x-1/2 border-8 border-black border-solid bg-black"
      >
        <img
          :src="user.image"
          class="w-full"
          alt="user image"
          v-if="user && user.image"
        />
        <img
          src="../assets/anonymous.png"
          class="w-full bg-gray-300"
          alt="user image"
          v-else
        />
      </div>
      <h2
        class="md:text-center font-black text-3xl mt-2 dark:text-white font-BioRhyme"
      >
        {{ user?.fullName }}
      </h2>
      <h3 class="md:text-center text-base dark:text-specialGray font-BioRhyme">
        {{ '@' + user?.username }}
      </h3>
      <p class="md:text-center mt-3 text-xl dark:text-gray-300">
        {{ user?.bio }}
      </p>
      <div
        class="flex flex-wrap md:flex-nowrap my-7 items-center font-BioRhyme"
      >
        <div
          class="icon-wrapper md:w-1/3 flex gap-2 md:block md:text-center mx-3"
        >
          <svg
            class="w-6 h-6 block mx-auto mb-2 dark:text-slateGray"
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
          <span class="block text-gray-400 m-0.5">{{ user?.location }}</span>
        </div>
        <div
          class="icon-wrapper md:w-1/3 flex gap-2 md:block md:text-center mx-3"
        >
          <svg
            class="w-6 h-6 block mx-auto mb-2 dark:text-slateGray"
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
          <span class="block text-gray-400 m-0.5 whitespace-nowrap">{{
            'Joined on ' + user?.joinDate.substring(4, 15)
          }}</span>
        </div>
        <div
          class="icon-wrapper md:w-1/3 flex gap-2 md:block md:text-center mx-3"
        >
          <svg
            class="w-6 h-6 block mx-auto mb-2 dark:text-slateGray"
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
            class="box relative text-center inline-block text-gray-400 no-underline"
            style="height: fit-content"
            ><span>{{ user?.email }}</span>
            <div class="lined hidden sm:block transition-all bg-gray-400"></div
          ></a>
        </div>
        <div
          class="icon-wrapper md:w-1/3 flex gap-2 md:block md:text-center mx-3"
          v-if="user?.website"
        >
          <svg
            class="w-6 h-6 block mx-auto mb-2 dark:text-slateGray"
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
            class="box relative text-center inline-block text-gray-400 no-underline"
            style="height: fit-content"
            ><span>{{ user.website }}</span>
            <div class="lined hidden sm:block transition-all bg-gray-400"></div
          ></a>
        </div>
      </div>
      <div
        class="pt-3 border-t border-b-0 border-l-0 border-r-0 border-gray-200 dark:border-dark1 border-solid"
        v-if="posts.length > 0"
      >
        <h2
          class="p-3 dark:text-white font-BioRhyme font-normal text-xl"
          v-if="thisUser?.displayName === user?.username"
        >
          Your Posts
          <Colors />
        </h2>
        <h2
          class="p-3 dark:text-white font-BioRhyme font-normal text-xl"
          v-else
        >
          Posts By {{ user?.fullName.split(' ')[0] }}
          <Colors />
        </h2>
        <div class="posts grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <Post :posts="posts" :thumbnail="true" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <LoadingUser v-else />
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

let route = useRoute(),
  user = ref(),
  posts = ref([]),
  loaded = ref(false)

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
        user.value.email = doc.id
        document.title = doc.data().fullName + ' - NEV 🔥'
      })
      db.collection('posts')
        .where('by', '==', route.params.username.toLowerCase())
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
</script>
