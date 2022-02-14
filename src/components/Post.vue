<template>
  <transition-group appear name="fadeIn">
    <div
      class="mb-2 w-full bg-white dark:bg-dark3 md:mb-5"
      :class="
        !thumbnail
          ? 'md:rounded-lg md:border md:border-solid md:border-gray-200 md:dark:border-dark1'
          : 'border border-solid border-gray-200 !transition-opacity dark:border-dark1 sm:rounded-lg'
      "
      v-for="(post, index) in posts"
      :key="post.id"
    >
      <VImage
        v-if="!thumbnail && posts[0].id === post.id && post.image != null"
        :src="post.image"
        type="blog"
        classNames="max-h-pic"
      />
      <div class="block w-full p-5">
        <div class="mb-2 flex items-center" v-if="!thumbnail">
          <router-link
            :to="'/u/' + post.userName"
            class="flex items-center text-black no-underline transition hover:text-gray-500"
          >
            <div class="img-wrapper h-9 w-9 overflow-hidden rounded-full">
              <VImage :src="post?.userImage" type="user" />
            </div>
            <h4
              class="ml-3 hidden font-BioRhyme font-semibold dark:text-white sm:block"
            >
              {{ post?.userFullName }}
            </h4>
          </router-link>
          <div
            class="dot mx-2 mt-1 hidden h-1 w-1 rounded-full bg-gray-400 sm:block"
          ></div>
          <div class="ml-3 flex flex-col sm:ml-0 sm:block">
            <h4 class="font-BioRhyme font-semibold dark:text-white sm:hidden">
              {{ post?.userFullName }}
            </h4>
            <div
              class="pt-0.5 font-BioRhyme text-sm dark:text-gray-400 sm:pt-0"
            >
              {{ tweakDate(post.createdAt) }}
            </div>
          </div>
        </div>
        <div :class="!thumbnail ? 'ml-10' : ''">
          <div class="flex items-start justify-between">
            <router-link
              :to="`/p/` + post.slug"
              class="mb-2 font-BioRhyme text-2xl font-black text-black no-underline transition hover:text-gray-500 dark:text-white dark:hover:text-gray-400"
            >
              {{ post.title }}
            </router-link>
            <div
              class="relative flex cursor-pointer rounded-md px-1 py-3 transition-all hover:bg-gray-100 dark:hover:bg-dark1"
              v-if="thumbnail && isCurrentUser"
              @click="mnuToggle(post.id)"
            >
              <span class="m-0.5 block h-1 w-1 rounded-full bg-gray-400"></span
              ><span class="m-0.5 block h-1 w-1 rounded-full bg-gray-400"></span
              ><span
                class="m-0.5 block h-1 w-1 rounded-full bg-gray-400"
              ></span>
              <!-- <transition name="fadeInDown"> -->
              <div
                class="mnu absolute top-[35px] right-0 hidden w-48 rounded-md border-4 border-solid transition dark:border-black"
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
                    class="bg-white px-4 py-2 transition-all hover:bg-gray-100 dark:bg-dark2 dark:text-white dark:hover:bg-dark1"
                    @click="removePost(post)"
                  >
                    Remove
                  </li>
                </ul>
              </div>
              <!-- </transition> -->
            </div>
          </div>
          <div
            class="mt-1 font-BioRhyme text-sm dark:text-gray-400"
            v-if="thumbnail"
          >
            {{ tweakDate(post.createdAt) }}
          </div>
          <p
            v-if="posts[0].id === post.id && !thumbnail"
            class="dark:text-gray-400"
          >
            {{ post?.description }}
          </p>
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
          <button
            class="btn-small"
            :class="user ? '' : 'opacity-30'"
            @click.prevent="like(post.likes, post.id)"
          >
            <svg
              :class="likedByUser(post.likes)"
              class="-m-0.5 h-6 w-6 transition-all dark:text-black"
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
              class="ml-1 select-none whitespace-pre font-BioRhyme text-gray-600 dark:text-gray-200"
              style="line-height: 22px"
              >{{ post.likes.length }} likes</span
            >
          </button>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import { store } from '../store'
import { tweakDate } from '../helper'
import VImage from './VImage.vue'

let route = useRoute()

const user = computed(() => {
  return store.state.user
})

const isCurrentUser = computed(() => {
  return user.value?.displayName === route.params.username
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
