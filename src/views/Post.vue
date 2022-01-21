<template>
  <Navbar />
  <div
    class="lg:container w-full mx-auto md:w-10/12 lg:w-9/12 pt-20 sm:pt-24 flex items-start"
    v-if="loaded"
  >
    <div
      class="react mr-5 mt-5 hidden md:block sticky top-32 bottom-32 transition-all"
    >
      <div
        class="icon-wrapper heart cursor-pointer m-4 mb-4 rounded-full hover:bg-red-300 dark:hover:bg-red-800 bg-red-100 dark:bg-red-700 dark:bg-opacity-30 transition-all"
        @click="like(post.likes, post.id)"
      >
        <svg
          class="w-6 h-6 m-2 transition-all"
          :class="likedByUser(post.likes)"
          :id="'l' + post.id"
          fill="crimson"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
        <span
          class="absolute -right-3.5 pointer-events-none dark:text-white"
          v-if="post.likes"
          >{{ post.likes.length !== 0 ? post.likes.length : '' }}</span
        >
      </div>
      <div
        class="icon-wrapper chat cursor-pointer m-4 mb-4 rounded-full bg-green-100 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-500 dark:bg-opacity-30 transition-all"
        @click="toDiscussion"
      >
        <svg
          class="w-6 h-6 m-2 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          ></path>
        </svg>
      </div>
      <div
        @click="shareLink"
        class="icon-wrapper share cursor-pointer m-4 mb-4 rounded-full bg-indigo-100 hover:bg-indigo-300 dark:bg-indigo-700 dark:hover:bg-indigo-400 dark:bg-opacity-30 transition-all"
      >
        <svg
          class="w-6 h-6 m-2 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          ></path>
        </svg>
        <transition name="fadeInOut">
          <div
            class="absolute w-max bg-white dark:bg-dark2 z-10 top-14 dark:text-white py-1 px-2 rounded-md pointer-events-none"
            v-if="isCopiedToClipboard"
          >
            👌 Copied To Clipboard
          </div>
        </transition>
      </div>
    </div>
    <div
      class="post mb-4 w-full bg-white dark:text-white dark:bg-dark3 md:border md:border-gray-200 md:dark:border-dark1 md:border-solid sm:rounded-lg overflow-hidden"
    >
      <div
        v-if="post.image || post.image != null"
        class="h-[300px] sm:rounded-tr-lg sm:rounded-tl-lg overflow-hidden flex items-center bg-gray-50 mb-3"
        :style="
          'background: url( ' +
          post.image +
          '  ) center center no-repeat; background-size: cover'
        "
      ></div>
      <div class="px-3 pb-3 pt-0 sm:px-12">
        <div class="details mt-5 sm:mt-8">
          <h1
            class="text-3xl sm:text-5xl sm:leading-title font-semibold mb-4 font-BioRhyme"
          >
            {{ post.title }}
          </h1>
          <div class="mt-2 flex items-center font-BioRhyme">
            <router-link
              :to="'/u/' + post.by"
              class="flex items-center text-black dark:text-white no-underline hover:text-gray-500 dark:hover:text-gray-300 transition"
            >
              <div
                class="img-wrapper w-9 h-9 rounded-full overflow-hidden relative bg-gray-300"
              >
                <img
                  v-if="post?.byImage"
                  :src="post.byImage"
                  alt="user picture"
                  class="w-full"
                />
                <img
                  v-else
                  src="../assets/anonymous.png"
                  alt="user picture"
                  class="w-full"
                />
                <div
                  class="w-full h-full absolute top-0 hover:bg-gray-500 hover:bg-opacity-20 transition-all z-20"
                ></div>
              </div>
              <h4 class="font-semibold ml-3">{{ post.byFullName }}</h4>
            </router-link>
            <div class="dot w-1 h-1 bg-gray-400 rounded-full mx-2 mt-1"></div>
            <p class="text-gray-500 mt-0.5 text-xs">
              {{ tweakDate(post.createdAt) }}
            </p>
          </div>
        </div>

        <PostContent :content="post.content" />

        <div
          class="react mr-5 mt-5 md:hidden transition-all flex items-baseline justify-evenly text-black"
        >
          <div class="flex flex-col items-center">
            <div
              class="icon-wrapper heart cursor-pointer m-4 mb-4 rounded-full hover:bg-red-300 dark:hover:bg-red-800 bg-red-100 dark:bg-red-700 dark:bg-opacity-30 transition-all"
              @click="like(post.likes, post.id)"
            >
              <svg
                class="w-6 h-6 m-2 transition-all"
                :class="likedByUser(post.likes)"
                :id="'l' + post.id"
                fill="crimson"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span
              class="pointer-events-none dark:text-white -mt-2 font-BioRhyme"
              v-if="post.likes.length === 1"
              >{{ post.likes.length + ' like' }} </span
            ><span
              class="pointer-events-none dark:text-white -mt-2 font-BioRhyme"
              v-else-if="post.likes"
              >{{ post.likes.length !== 0 ? post.likes.length + ' likes' : '' }}
            </span>
          </div>
          <div
            class="icon-wrapper chat cursor-pointer m-4 mb-4 rounded-full bg-green-100 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-500 dark:bg-opacity-30 transition-all"
            @click="toDiscussion"
          >
            <svg
              class="w-6 h-6 m-2 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
          </div>
          <div
            @click="shareLink"
            class="icon-wrapper share cursor-pointer m-4 mb-4 rounded-full bg-indigo-100 hover:bg-indigo-300 dark:bg-indigo-700 dark:hover:bg-indigo-400 dark:bg-opacity-30 transition-all"
          >
            <svg
              class="w-6 h-6 m-2 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              ></path>
            </svg>
            <transition name="fadeInOut">
              <div
                class="absolute w-max bg-white dark:bg-dark2 z-10 bottom-14 dark:text-white py-1 px-2 rounded-md pointer-events-none"
                v-if="isCopiedToClipboard"
              >
                👌 Copied To Clipboard
              </div>
            </transition>
          </div>
        </div>

        <span class="hl bg-gray-300 dark:bg-dark1"></span>

        <Comment />
      </div>
    </div>
  </div>
  <Loading v-else />
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../store'
import { db } from '../firebase'
import { tweakDate } from '../helper'
import Navbar from '../components/Navbar.vue'
import Comment from '../components/Comment.vue'
import PostContent from '../components/PostContent.vue'
import Loading from '../components/Loading.vue'
import Footer from '../components/Footer.vue'

let post = ref({}),
  user = ref(),
  loaded = ref(false)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await db
    .collection('posts')
    .where('slug', '==', route.params.slug)
    .limit(1)
    .get()
    .then((res) => {
      if (!res.size > 0) {
        router.push('/404')
      } else {
        res.forEach((resPost) => {
          post.value = resPost.data()
          post.value.id = resPost.id
          loaded.value = true
        })
        document.title = post.value.title + ' - NEV'
      }
    })
    .catch((err) => {
      console.log(err)
    })
  store.state.postSlug = post.value.slug
  user.value = store.state.user
})

const likedByUser = (likes) => {
  if (user.value) {
    if (likes.includes(user.value.displayName)) {
      return 'isLiked'
    }
  }
}

const like = (likes, id) => {
  let arr = likes
  if (!arr.includes(user.value.displayName)) {
    arr.push(user.value.displayName)
  } else {
    let index = arr.indexOf(user.value.displayName)
    arr.splice(index, 1)
  }
  db.collection('posts')
    .doc(id)
    .update({
      likes: arr,
      likes_count: arr.length,
    })
    .catch((err) => {
      console.log(err)
    })
  document.getElementById('l' + id).classList.toggle('isLiked')
}

const toDiscussion = () => {
  let discussion = document.querySelector('.discussion')
  discussion.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const isCopiedToClipboard = ref(false)

const shareLink = () => {
  if (isCopiedToClipboard.value !== true) {
    isCopiedToClipboard.value = true
    navigator.clipboard.writeText(window.location)

    setTimeout(() => {
      isCopiedToClipboard.value = false
    }, 1500)
  }
}
</script>

<style scoped>
.hl {
  width: 100%;
  height: 1px;
  display: block;
  margin: 34px 0;
  position: relative;
  left: -25%;
  width: 150%;
}
.textarea[contenteditable] {
  min-height: 80px;
}
.textarea[contenteditable]:empty::before {
  content: 'Join the discussion';
  color: gray;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column-reverse;
}

svg path {
  fill: #9ca3af3d;
}
.heart:hover path {
  fill: #ff0030;
}
.chat:hover path {
  fill: grey;
}
.share:hover path {
  fill: blueviolet;
}

.isLiked path {
  fill: crimson;
}

.fadeInOut-enter-active,
.fadeInOut-leave-active {
  transition: opacity 0.2s ease;
}

.fadeInOut-enter-from,
.fadeInOut-leave-to {
  opacity: 0;
}
</style>
