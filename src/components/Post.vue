<template>
  <div
    class="mb-2 bg-white dark:bg-dark3 md:mb-5 w-full"
    :class="
      !thumbnail
        ? 'md:border md:border-gray-200 md:dark:border-dark1 md:border-solid md:rounded-lg'
        : 'border border-gray-200 dark:border-dark1 border-solid sm:rounded-lg '
    "
    v-for="post in posts"
    :key="post.id"
  >
    <div
      v-if="posts[0].id === post.id && !thumbnail && post.image != null"
      class="md:rounded-tr-lg md:rounded-tl-lg overflow-hidden flex items-center bg-gray-50"
      style="max-height: 250px; min-height: 250px"
      :style="
        'background: url( ' +
        post.image +
        '  ) center center no-repeat; background-size: cover'
      "
    ></div>
    <div class="block p-5 w-full">
      <div class="flex items-center mb-2" v-if="!thumbnail">
        <router-link
          :to="'/u/' + post.by"
          class="flex items-center text-black no-underline hover:text-gray-500 transition"
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
          <h4 class="font-semibold ml-3 dark:text-white font-BioRhyme">
            {{ post?.byFullName }}
          </h4>
        </router-link>
        <div class="dot w-1 h-1 bg-gray-400 rounded-full mx-2 mt-1"></div>
        <div class="dark:text-gray-400 text-sm mt-1 font-BioRhyme">
          {{ tweakDate(post.createdAt) }}
        </div>
      </div>
      <div :class="!thumbnail ? 'ml-10' : ''">
        <div class="flex items-start justify-between">
          <router-link
            :to="`/p/` + post.slug"
            class="font-black font-BioRhyme mb-2 text-2xl text-black dark:text-white no-underline hover:text-gray-500 dark:hover:text-gray-400 transition"
          >
            {{ post.title }}
          </router-link>
          <div
            class="flex cursor-pointer px-1 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark1 transition-all relative"
            v-if="thumbnail && isCurrentUser"
            @click="mnuToggle(post.id)"
          >
            <span class="w-1 h-1 m-0.5 bg-gray-400 block rounded-full"></span
            ><span class="w-1 h-1 m-0.5 bg-gray-400 block rounded-full"></span
            ><span class="w-1 h-1 m-0.5 bg-gray-400 block rounded-full"></span>
            <div
              class="mnu absolute top-[35px] right-0 border-solid rounded-md border-4 dark:border-black w-48 hidden"
              :id="post.id"
              style="box-shadow: rgb(0, 0, 0) 3px 3px"
            >
              <ul class="list-none p-0">
                <!-- <li
                  class="bg-white dark:text-white dark:bg-dark2 hover:bg-gray-100 dark:hover:bg-dark1 transition-all px-4 py-2"
                >
                  Edit
                </li> -->
                <li
                  class="bg-white dark:text-white dark:bg-dark2 hover:bg-gray-100 dark:hover:bg-dark1 transition-all px-4 py-2"
                  @click="removePost(post)"
                >
                  Remove
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="dark:text-gray-400 text-sm mt-1" v-if="thumbnail">
          {{ tweakDate(post.createdAt) }}
        </div>
        <p
          v-if="posts[0].id === post.id && !thumbnail"
          class="dark:text-gray-400"
        >
          {{ post?.description }}
        </p>
        <div class="tags flex gap-2 text-gray-400 text-md mt-2 font-BioRhyme">
          <router-link
            v-for="tag in post.tags"
            :key="tag"
            :to="`/t/` + tag"
            class="text-current no-underline hover:bg-gray-100 dark:hover:bg-dark2 px-1.5 py-0.5 rounded-md transition-all"
          >
            <div class="tag">{{ `#` + tag }}</div>
          </router-link>
        </div>
        <button
          class="btn-small -mx-2"
          :class="user ? '' : 'opacity-30'"
          @click.prevent="like(post.likes, post.id)"
        >
          <svg
            :class="likedByUser(post.likes)"
            class="w-6 h-6 transition-all dark:text-black"
            :id="'l' + post.id"
            fill="#9ca3af3d"
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
            class="ml-1 whitespace-pre text-gray-600 dark:text-gray-200 select-none"
            style="line-height: 22px"
            >{{ post.likes.length }} likes</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import { store } from '../store'
import { tweakDate } from '../helper'

let route = useRoute()

const user = computed(() => {
  return store.state.user
})

const isCurrentUser = computed(() => {
  return user.value.displayName === route.params.username
})

const mnuToggle = (id) => {
  let mnu = document.getElementById(id)
  mnu.classList.toggle('hidden')
  window.addEventListener(
    'mouseup',
    (e) => {
      if (
        e.target !== mnu &&
        e.target !== mnu.parentElement &&
        e.target.parentElement !== mnu.parentElement
      ) {
        mnu.classList.add('hidden')
      }
    },
    { once: true },
  )
}
const removePost = (post) => {
  db.collection('posts')
    .doc(post.id)
    .delete()
    .then(() => {
      db.collection('comments')
        .where('slug', '==', post.slug)
        .get()
        .then((res) => {
          res.forEach((comment) => {
            db.collection('comments').doc(comment.id).delete()
          })
        })
    })
    .finally(() => {
      alert('DONE')
    })
    .catch((err) => {
      alert(err)
    })
}

const likedByUser = (likes) => {
  if (user.value) {
    if (likes.includes(user.value.displayName)) {
      return 'isLiked'
    }
  }
}

const like = (likes, id) => {
  if (user.value) {
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
}
</script>

<script>
export default {
  props: ['posts', 'thumbnail'],
}
</script>
