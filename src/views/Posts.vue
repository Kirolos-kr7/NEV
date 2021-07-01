<template>
  <Navbar />
  <div>
    <div
      class="container mx-auto pt-20 sm:pt-24 flex gap-3 flex-wrap justify-evenly items-start"
      v-if="loaded"
    >
      <Sidenav class="hidden lg:block lg:w-2/12" :isHomePage="true" />
      <div
        class="w-full rounded-none border-none lg:w-3/12 md:order-1 md:w-11/12 md:mb-3 lg:order-2 p-5 border border-gray-200 md:border-solid md:rounded-lg bg-white overflow-hidden dark:bg-dark3 dark:border-dark1"
      >
        <h2 class="text-xl mb-4 font-bold dark:text-white font-BioRhyme">
          Tags
        </h2>
        <div
          class="chips flex items-center overflow-y-scroll md:block relative -mx-5 md:mx-0"
        >
          <SideTags />
        </div>
      </div>

      <div
        class="w-full lg:w-6/12 md:w-11/12 flex md:order-2 lg:order-1 flex-row flex-wrap justify-evenly mb-5"
      >
        <div class="flex items-center justify-between w-full h-10 m-5 mt-2">
          <h2
            class="text-2xl font-bold block mr-auto ml-1 dark:text-white font-BioRhyme"
          >
            Feed
          </h2>
          <div class="flex gap-1">
            <button
              class="btn-filter active dark:text-white font-BioRhyme dark:focus:bg-dark1 focus:bg-gray-400"
              @click="fetchPostsBy('createdAt')"
              id="filterByDate"
            >
              Newest
            </button>
            <button
              class="btn-filter whitespace-nowrap dark:text-white font-BioRhyme dark:focus:bg-dark1 focus:bg-gray-400"
              @click="fetchPostsBy('likes_count')"
              id="filterByLikes"
            >
              Most Liked
            </button>
          </div>
        </div>

        <Post :posts="posts" />
      </div>
    </div>
    <Loading v-else />
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { store } from '../store'
import Navbar from '../components/Navbar.vue'
import Sidenav from '../components/Sidenav.vue'
import SideTags from '../components/SideTags.vue'
import Post from '../components/Post.vue'
import Loading from '../components/Loading.vue'
import Footer from '../components/Footer.vue'

let posts = ref([]),
  loaded = ref(false)

onMounted(async () => {
  document.title = 'NEV - Blog For The Developers 🔥'
  fetchPostsBy()
})

const fetchPostsBy = async (by = 'createdAt') => {
  let priority = by
  let then = priority === 'createdAt' ? 'likes_count' : 'createdAt'
  const filterByDateBtn = document.getElementById('filterByDate')
  const filterByLikesBtn = document.getElementById('filterByLikes')

  if (loaded.value) {
    if (priority === 'createdAt') {
      filterByDateBtn.classList.add('active')
      filterByLikesBtn.classList.remove('active')
    } else {
      filterByLikesBtn.classList.add('active')
      filterByDateBtn.classList.remove('active')
    }
  }
  await db
    .collection('posts')
    .orderBy(priority, 'desc')
    .orderBy(then, 'desc')
    .get()
    .then((res) => {
      posts.value = []
      res.docs.forEach((post) => {
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
</script>

<style scoped>
.author::before {
  content: '';
  width: 12px;
  height: 1.5px;
  background: #001a3a;
  display: block;
  position: absolute;
  left: -17px;
  top: 50%;
  border-radius: 1px;
}
.posts {
  min-height: 150px;
}
.chips::-webkit-scrollbar {
  display: none;
}

#filterByLikes,
#filterByDate,
#filterByLikes:hover,
#filterByDate:hover {
  position: relative;
  text-align: center;
}

#filterByLikes.active::after,
#filterByDate.active::after {
  content: '';
  width: 45%;
  height: 4px;
  background: #4f46e5;
  position: absolute;
  bottom: -2px;
  left: 50%;
  transition: 0.2s all ease-in-out;
  transform: translateX(-50%);
}
</style>
