<template>
  <div class="relative">
    <div class="flex gap-x-8 transition-all">
      <div
        v-for="(post, index) in posts"
        :key="post.id"
        class="max-h-[250px] min-h-[250px] min-w-full relative"
      >
        <img
          :src="post.image"
          class="max-h-[250px] min-h-[250px] min-w-full object-cover overflow-hidden backdrop-contrast-100"
        />
        <div
          class="absolute inset-0 w-full h-full grid place-content-center place-items-center bg-black/40 text-white"
        >
          <span class="text-gray-300"> {{ tweakDate(post.createdAt) }}</span>
          <h3 class="text-2xl text-center mt-1 font-BioRhyme font-semibold">
            {{ post.title }}
          </h3>
        </div>
      </div>
    </div>

    <button
      @click="moveIt(1, $event)"
      class="absolute -left-2 top-1/2 -translate-y-1/2 bg-[#4f46e5] rounded-full py-0.5 px-1 hover:!px-2 hover:!-left-3 transition-all cursor-pointer"
    >
      <svg
        class="w-4 h-4 text-white pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        ></path>
      </svg>
    </button>

    <button
      @click="moveIt(-1, $event)"
      class="absolute -right-2 top-1/2 -translate-y-1/2 bg-[#4f46e5] rounded-full py-0.5 px-1 hover:!px-2 hover:!-right-3 transition-all cursor-pointer"
    >
      <svg
        class="w-4 h-4 text-white pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { tweakDate } from '../helper'

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

let order = 1
const moveIt = (dir = 1, e) => {
  let elem = e.target.parentElement.children[0]
  let width = elem.children[0].clientWidth + 32

  if (order <= posts.value.length) {
    if (dir === -1) {
      if (order !== 4) {
        elem.style.transform = `translateX(${width * -order}px)`
        order++
      } else {
        elem.style.transform = `translateX(0px)`
        order = 1
      }
    } else if (order !== 1) {
      elem.style.transform = `translateX(${-width * (order - 2)}px)`
      order--
    } else {
      elem.style.transform = `translateX(${
        width * -(posts.value.length - 1)
      }px)`
      order = posts.value.length
    }
  } else if (order === posts.value.length) {
    elem.style.transform = `translateX(0px)`
    order = 1
  }
}
</script>

<style lang=""></style>
