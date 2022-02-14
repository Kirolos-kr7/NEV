<template>
  <Navbar />
  <div class="pt-20 dark:bg-dark1 sm:pt-24">
    <div v-if="user">
      <div v-if="loaded">
        <div
          v-if="posts.length > 0"
          class="mx-auto w-full dark:text-white sm:w-8/12"
        >
          <transition appear name="fadeIn">
            <h2
              class="p-3 font-BioRhyme text-2xl font-semibold dark:text-white"
            >
              Posts You Liked
              <Colors />
            </h2>
          </transition>
          <div
            class="mt-2 grid items-baseline justify-evenly gap-x-5 md:grid-cols-2"
          >
            <Post :posts="posts" :thumbnail="true" />
          </div>
        </div>
        <div
          v-else
          class="mx-auto mb-6 w-full overflow-hidden rounded-md bg-white p-5 dark:bg-dark2 sm:w-9/12 sm:border sm:border-solid sm:border-gray-300 sm:dark:border-dark1 md:w-8/12 lg:w-6/12"
        >
          <h2
            class="-m-5 mb-3 bg-gray-200 p-5 text-center font-BioRhyme text-2xl font-semibold dark:bg-dark3 dark:text-white"
          >
            You don't have any liked posts yet
          </h2>
          <button class="btn-medium blueish mx-auto">
            <router-link to="/login">Check latest posts</router-link>
          </button>
        </div>
      </div>
      <Loading v-else />
    </div>
    <div
      v-else
      class="mx-auto mb-6 w-full overflow-hidden rounded-md bg-white p-5 dark:bg-dark2 sm:w-9/12 sm:border sm:border-solid sm:border-gray-300 sm:dark:border-dark1 md:w-8/12 lg:w-6/12"
    >
      <h2
        class="-m-5 mb-3 bg-gray-200 p-5 text-center font-BioRhyme text-2xl font-semibold dark:bg-dark3 dark:text-white"
      >
        You Need To Login First
      </h2>
      <button class="btn-medium blueish mx-auto">
        <router-link to="/login">Login Now</router-link>
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
        if (res.size > 0)
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
  }
})
</script>
