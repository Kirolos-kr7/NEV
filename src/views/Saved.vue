<template>
  <Navbar />
  <div class="pt-20 sm:pt-24 dark:bg-dark1">
    <div
      class="w-full sm:w-8/12 mx-auto dark:text-white"
      style="min-height: 80vh"
      v-if="loaded"
    >
      <h2 class="p-3 dark:text-white font-BioRhyme font-normal text-xl">
        Posts You Liked
        <Colors />
      </h2>

      <div
        class="posts mt-6 grid md:grid-cols-2 gap-x-5 items-center justify-evenly"
      >
        <Post :posts="posts" :thumbnail="true" />
      </div>
    </div>
    <Loading v-else />
  </div>
  <Footer />
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
import Loading from '../components/Loading.vue'
import Colors from '../components/Colors.vue'

let posts = ref([]),
  loaded = ref(false)

let user = computed(() => {
  return store.state.user
})

onMounted(() => {
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
})
</script>
