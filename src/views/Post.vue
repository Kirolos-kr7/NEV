<template>
  <Navbar />
  <div
    class="mx-auto flex w-full items-start pt-20 sm:pt-24 md:w-10/12 lg:container lg:w-9/12"
    v-if="loaded"
  >
    <div
      class="react sticky top-32 bottom-32 mr-5 mt-5 hidden transition-all md:block"
    >
      <button
        class="icon-wrapper heart m-4 mb-4 cursor-pointer rounded-full bg-red-100 transition-all hover:bg-red-300 focus:!bg-red-300 dark:bg-red-700 dark:bg-opacity-30 dark:hover:bg-red-800 dark:focus:!bg-red-800"
        @click="like(post.likes, post.id)"
      >
        <HeartIcon
          class="m-2 h-6 w-6 transition-all"
          :class="likedByUser(post.likes)"
          :id="'l' + post.id"
        />
        <span
          class="pointer-events-none absolute -right-3.5 dark:text-white"
          v-if="post.likes"
          >{{ post.likes.length !== 0 ? post.likes.length : '' }}</span
        >
      </button>
      <button
        class="icon-wrapper chat m-4 mb-4 cursor-pointer rounded-full bg-green-100 transition-all hover:bg-green-300 focus:!bg-green-300 dark:bg-green-700 dark:bg-opacity-30 dark:hover:bg-green-500 dark:focus:!bg-green-500"
        @click="toDiscussion"
      >
        <AnnotationIcon class="m-2 h-6 w-6 transition-all" />
      </button>
      <button
        @click="shareLink"
        class="icon-wrapper share m-4 mb-4 cursor-pointer rounded-full bg-indigo-100 transition-all hover:bg-indigo-300 focus:!bg-indigo-300 dark:bg-indigo-700 dark:bg-opacity-30 dark:hover:!bg-indigo-400 dark:focus:bg-indigo-400"
      >
        <ShareIcon class="m-2 h-6 w-6 transition-all" />

        <transition name="fade">
          <div
            class="pointer-events-none absolute top-14 z-10 w-max rounded-md bg-white py-1 px-2 dark:bg-dark2 dark:text-white"
            v-if="isCopiedToClipboard"
          >
            👌 Copied To Clipboard
          </div>
        </transition>
      </button>
    </div>
    <div
      class="post mb-4 w-full overflow-hidden bg-white dark:bg-dark3 dark:text-white sm:rounded-lg md:border md:border-solid md:border-gray-200 md:dark:border-dark1"
    >
      <VImage
        v-if="post.image"
        :src="post.image"
        type="blog"
        classNames="max-h-pic"
      />
      <div class="px-3 pb-3 pt-0 sm:px-12">
        <div class="details mt-5 sm:mt-8">
          <h1
            class="mb-4 font-BioRhyme text-3xl font-semibold sm:text-5xl sm:leading-title"
          >
            {{ post.title }}
          </h1>
          <div class="mt-2 flex items-center font-BioRhyme">
            <router-link
              :to="'/u/' + post.userName"
              class="flex items-center text-black no-underline transition hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
            >
              <div class="img-wrapper h-9 w-9 overflow-hidden rounded-full">
                <VImage :src="post.userImage" type="user" />
              </div>
              <h4 class="ml-3 font-semibold">{{ post.userFullName }}</h4>
            </router-link>
            <div class="dot mx-2 mt-1 h-1 w-1 rounded-full bg-gray-400"></div>
            <p class="mt-0.5 text-xs text-gray-500">
              {{ tweakDate(post.createdAt) }}
            </p>
          </div>
        </div>

        <div class="tags text-md mt-2 flex gap-2 font-BioRhyme text-gray-400">
          <router-link
            v-for="tag in post.tags"
            :key="tag"
            :to="`/t/` + tag"
            class="rounded-md px-1.5 py-0.5 text-current no-underline transition-all hover:bg-gray-100 dark:hover:bg-dark2"
          >
            <div class="tag">{{ `#` + tag }}</div>
          </router-link>
        </div>

        <PostContent :content="post.content" />

        <div
          class="react mr-5 mt-5 flex items-baseline justify-evenly text-black transition-all md:hidden"
        >
          <div class="flex flex-col items-center">
            <button
              class="icon-wrapper heart m-4 mb-4 cursor-pointer rounded-full bg-red-100 transition-all hover:bg-red-300 focus:!bg-red-300 dark:bg-red-700 dark:bg-opacity-30 dark:hover:bg-red-800 dark:focus:!bg-red-800"
              @click="like(post.likes, post.id)"
            >
              <!-- <svg
                
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
              </svg> -->
              <HeartIcon
                class="m-2 h-6 w-6 transition-all"
                :class="likedByUser(post.likes)"
                :id="'l' + post.id"
              />
            </button>
            <span
              class="pointer-events-none -mt-2 font-BioRhyme dark:text-white"
              v-if="post.likes.length === 1"
              >{{ post.likes.length + ' like' }} </span
            ><span
              class="pointer-events-none -mt-2 font-BioRhyme dark:text-white"
              v-else-if="post.likes"
              >{{ post.likes.length !== 0 ? post.likes.length + ' likes' : '' }}
            </span>
          </div>
          <button
            class="icon-wrapper chat m-4 mb-4 cursor-pointer rounded-full bg-green-100 transition-all hover:bg-green-300 focus:!bg-green-300 dark:bg-green-700 dark:bg-opacity-30 dark:hover:bg-green-500 dark:focus:!bg-green-500"
            @click="toDiscussion"
          >
            <AnnotationIcon class="m-2 h-6 w-6 transition-all" />
          </button>
          <button
            @click="shareLink"
            class="icon-wrapper share m-4 mb-4 cursor-pointer rounded-full bg-indigo-100 transition-all hover:bg-indigo-300 focus:!bg-indigo-400 dark:bg-indigo-700 dark:bg-opacity-30 dark:hover:bg-indigo-400 dark:focus:!bg-indigo-300"
          >
            <ShareIcon class="m-2 h-6 w-6 transition-all" />

            <transition name="fade">
              <div
                class="pointer-events-none absolute bottom-14 z-10 w-max rounded-md bg-white py-1 px-2 dark:bg-dark2 dark:text-white"
                v-if="isCopiedToClipboard"
              >
                👌 Copied To Clipboard
              </div>
            </transition>
          </button>
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
import Loading from '../components/Loading.vue'
import Footer from '../components/Footer.vue'
import VImage from '../components/VImage.vue'
import PostContent from '../components/PostContent.vue'
import { HeartIcon, AnnotationIcon, ShareIcon } from '@heroicons/vue/outline'

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

<style>
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

.icon-wrapper svg path {
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
</style>
