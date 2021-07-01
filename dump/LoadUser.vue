<template>
  <div class="topish bg-black h-48"></div>
  <div
    class="wrapper relative -mt-12 pt-16 md:w-8/12 md:border md:border-gray-300 md:border-solid mx-auto p-5 rounded-md bg-white"
    v-if="user"
  >
    <div
      class="img-wrapper w-28 md:w-32 h-28 md:h-32 flex items-center overflow-hidden rounded-full absolute -top-16 left-8 md:left-1/2 md:transform md:-translate-x-1/2 border-8 border-black border-solid bg-black"
    >
      <!-- <img :src="user.photoURL" class="w-full" alt="" v-if="user.image" /> -->
      <img src="../assets/anonymous.png" class="w-full bg-gray-300" alt="" />
    </div>
    <h2 class="md:text-center font-black">{{ user.fullName }}</h2>
    <!-- <p class="md:text-center mt-3 text-xl">{{ user.bio }}</p> -->
    <div class="flex flex-wrap md:flex-nowrap my-7 items-center">
      <div
        class="icon-wrapper md:w-1/3 flex gap-2 md:block md:text-center mx-3"
      >
        <svg
          class="w-6 h-6 block mx-auto mb-2"
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
        <!-- <span class="block text-gray-400">{{ user.location }}</span> -->
      </div>
      <div
        class="icon-wrapper md:w-1/3 flex gap-2 md:block md:text-center mx-3"
      >
        <svg
          class="w-6 h-6 block mx-auto mb-2"
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
        <!-- <span class="block text-gray-400">{{ joinedIn }}</span> -->
      </div>
      <div
        class="icon-wrapper md:w-1/3 flex gap-2 md:block md:text-center mx-3"
      >
        <svg
          class="w-6 h-6 block mx-auto mb-2"
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
        <router-link
          to="/"
          class="box relative text-center inline-block text-gray-400 no-underline"
        >
          <!-- <span>{{ user.email }}</span>  -->
          <div class="lined transition-all bg-gray-400"></div
        ></router-link>
      </div>
      <div
        class="icon-wrapper md:w-1/3 flex gap-2 md:block md:text-center mx-3"
      >
        <svg
          class="w-6 h-6 block mx-auto mb-2"
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
        <router-link
          to="/"
          class="box relative text-center inline-block text-gray-400 no-underline"
        >
          <!-- <span>{{ user.email }}</span>  -->

          <div class="lined transition-all bg-gray-400"></div
        ></router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { store } from '../store'
import { db } from '../firebase'
import Navbar from './Navbar.vue'
import LoadUser from '../components/LoadUser.vue'
import { useRoute } from 'vue-router'

let route = useRoute()
let user = ref()

onMounted(() => {
  db.collection('users')
    .where('username', '==', route.params.username)
    .limit(1)
    .get()
    .then((res) => {
      res.docs.forEach((doc) => {
        user.value = doc.data()
        console.log(doc.data())
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

// let joinedIn = computed(() => {
//   if (user.value.metadata) {
//     return new Date(user.value.metadata.creationTime || 'NF')
//       .toDateString()
//       .substring(4, 15)
//   }
//   return '...'
// })
</script>

<style scoped>
.box:hover .lined {
  width: 90%;
}
.lined {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0px;
  height: 1px;
  background: #000;
}
</style>