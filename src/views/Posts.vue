<template>
  <Navbar />
  <div>
    <div
      class="container mx-auto flex max-w-kratos flex-wrap items-start justify-evenly gap-3 pt-20 sm:pt-24"
      v-if="loaded"
    >
      <Sidenav class="hidden lg:block lg:w-2/12" :isHomePage="true" />
      <div
        class="top-24 w-full md:order-1 md:w-11/12 lg:sticky lg:order-2 lg:w-3/12"
      >
        <div
          class="overflow-hidden rounded-none border border-none border-gray-200 bg-white p-5 dark:border-dark1 dark:bg-dark3 md:mb-3 md:rounded-lg md:border-solid"
        >
          <h2 class="mb-4 font-BioRhyme text-xl font-bold dark:text-white">
            Tags
          </h2>
          <SideTags />
        </div>

        <!-- <div
          class="rounded-none border-none md:mb-3 p-5 border border-gray-200 md:border-solid md:rounded-lg bg-white overflow-hidden dark:bg-dark3 dark:border-dark1 hidden lg:block"
        >
          <h2 class="text-xl mb-4 font-bold dark:text-white font-BioRhyme">
            Top Posts
          </h2>
          <TopPosts />
        </div> -->
      </div>
      <div
        class="mb-5 flex w-full flex-row flex-wrap justify-evenly md:order-2 md:w-11/12 lg:order-1 lg:w-6/12"
      >
        <div class="m-5 mt-2 flex h-10 w-full items-center justify-between">
          <transition appear name="fadeIn">
            <h2
              class="mr-auto ml-1 block font-BioRhyme text-2xl font-bold dark:text-white"
            >
              Feed
            </h2>
          </transition>
          <div class="flex gap-1">
            <transition-group appear name="fadeIn">
              <button
                key="1"
                class="btn-filter active font-BioRhyme transition dark:text-white dark:focus:bg-dark1"
                @click="fetchPostsBy('createdAt')"
                id="filterByDate"
              >
                Newest
              </button>
              <button
                key="2"
                class="btn-filter whitespace-nowrap font-BioRhyme transition dark:text-white dark:focus:bg-dark1"
                @click="fetchPostsBy('likes_count')"
                id="filterByLikes"
              >
                Most Liked
              </button>
            </transition-group>
          </div>
        </div>

        <Post :posts="posts" v-if="posts.length > 0 && loaded == true" />
        <div class="flex flex-col items-center py-36" v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:svgjs="http://svgjs.com/svgjs"
            version="1.1"
            width="150"
            height="150"
            x="0"
            y="0"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
            class=""
          >
            <g>
              <linearGradient
                xmlns="http://www.w3.org/2000/svg"
                id="SVGID_1_"
                gradientUnits="userSpaceOnUse"
                x1="256"
                x2="256"
                y1="406"
                y2="31"
              >
                <stop stop-opacity="1" stop-color="#1f1b5d" offset="0" />
                <stop stop-opacity="1" stop-color="#4f46e5" offset="1" />
              </linearGradient>
              <linearGradient
                xmlns="http://www.w3.org/2000/svg"
                id="SVGID_2_"
                gradientUnits="userSpaceOnUse"
                x1="256"
                x2="256"
                y1="481"
                y2="316"
              >
                <stop offset="0" stop-color="#c3ffe8" />
                <stop offset=".9973" stop-color="#f0fff4" />
              </linearGradient>
              <g xmlns="http://www.w3.org/2000/svg">
                <g>
                  <g>
                    <path
                      d="m511.7 312.7-60-270c-1.5-6.901-7.8-11.7-14.7-11.7h-362c-6.899 0-13.2 4.799-14.7 11.7l-60 270c-.3 1.2-.3 2.099-.3 3.3l166 90h180l166-90c0-1.201 0-2.1-.3-3.3z"
                      fill="url(#SVGID_1_)"
                      data-original="url(#SVGID_1_)"
                      style=""
                    />
                  </g>
                </g>
                <g>
                  <g>
                    <path
                      d="m394.6 316c-11.521 0-22.049 6.526-27.173 16.846l-17.292 34.825c-2.533 5.102-7.739 8.329-13.435 8.329h-161.401c-5.697 0-10.902-3.227-13.435-8.329l-17.292-34.825c-5.123-10.32-15.65-16.846-27.172-16.846h-117.4v150c0 8.284 6.716 15 15 15h482c8.284 0 15-6.716 15-15v-150z"
                      fill="#f0ffff"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <span class="mt-3 font-BioRhyme dark:text-white"
            >Sorry No Posts avalible
          </span>
        </div>
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
import TopPosts from '../components/TopPosts.vue'

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

#filterByDate {
  transition: opacity 0.2s ease;
  transition-delay: 0.05s;
}
#filterByLikes {
  transition: opacity 0.2s ease;
  transition-delay: 0.1s;
}
</style>
