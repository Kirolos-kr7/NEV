<template>
  <Navbar />
  <div class="pt-20 sm:pt-24 dark:bg-dark1">
    <div v-if="user">
      <div
        class="w-full sm:w-8/12 mx-auto dark:text-white"
        style="min-height: 80vh"
        v-if="loaded"
      >
        <transition appear name="fadeIn">
          <h2 class="p-3 dark:text-white font-BioRhyme font-normal text-xl">
            Posts You Liked
            <Colors />
          </h2>
        </transition>
        <div
          class="posts mt-6 grid md:grid-cols-2 gap-x-5 items-center justify-evenly"
        >
          <Post :posts="posts" :thumbnail="true" />
        </div>
      </div>
      <Loading v-else />
    </div>
    <div
      v-else
      class="wrapper w-full sm:w-9/12 md:w-8/12 lg:w-6/12 mb-6 sm:border sm:border-gray-300 sm:dark:border-dark1 sm:border-solid mx-auto p-5 rounded-md overflow-hidden bg-white dark:bg-dark2"
    >
      <h2
        class="bg-gray-200 dark:bg-dark3 dark:text-white p-5 -m-5 mb-3 text-center text-2xl font-black font-BioRhyme"
      >
        You Need To Login First
      </h2>
      <button class="btn-medium blueish mx-auto">
        <router-link to="/u/exi">Login Now</router-link>
      </button>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { store } from '../store'
import { db } from '../firebase'
import Navbar from '../components/Navbar.vue'
import Post from '../components/Post.vue'
import Footer from '../components/Footer.vue'
import Loading from '../components/Loading.vue'
import Colors from '../components/Colors.vue'

let posts = ref([]),
  loaded = ref(false)

let user = computed(() => {
  return store.state.user
})

onMounted(() => {
  if (user.value) {
    db.collection('posts')
      .where('likes', 'array-contains', user.value.displayName)
      .get()
      .then((res) => {
        res.forEach((post) => {
          let postWithID = post.data()
          postWithID.id = post.id
          posts.value.push(postWithID)
          loaded.value = true
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
</script>
