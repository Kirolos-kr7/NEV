<template>
  <div class="discussion mt-5" :class="!comments.length > 0 ? 'mb-6' : 'mb-2'">
    <h2 class="text-2xl font-extrabold">
      Discussion {{ comments.length > 0 ? '(' + comments.length + ')' : ' ' }}
    </h2>
    <div class="comment-area text-right w-11/12 mx-auto mt-6 sm:mt-8">
      <textarea
        class="commentArea mb-0 w-full h-40 p-2 text-lg rounded-md mx-auto block resize-none textarea border-gray-400 dark:border-dark1 border-solid border bg-gray-100 dark:bg-dark4 dark:text-white outline-none"
        placeholder="Join the discussion"
        v-model="commentText"
      ></textarea>
      <button
        class="newCommentBtn overflow-hidden bg-green-500 mt-4 hover:bg-green-400 relative inline-block transition mr-auto text-sm font-semibold border-none text-white px-4 py-2 cursor-pointer"
        @click="postNewComment"
        v-if="commentText !== ''"
      >
        Add Comment<span class="tracking-normal whitespace-pre"> -></span>
        <div
          class="loader w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center bg-green-400 cursor-default"
          v-if="newCommentLoader"
        >
          <img
            src="../assets/animal.gif"
            style="mix-blend-mode: multiply"
            alt="loading..."
            width="100"
          />
        </div>
      </button>
    </div>
    <div class="comments w-11/12 mx-auto">
      <div
        class="comment-wrapper"
        v-for="comment in comments"
        :key="comment"
        :id="'p' + comment.id"
      >
        <div class="flex">
          <router-link
            :to="'/u/' + comment.by"
            class="flex items-center text-black no-underline"
          >
            <div
              class="img-wrapper w-9 h-9 rounded-full overflow-hidden mr-2 transform -translate-y-2"
            >
              <img
                v-if="comment.byImage"
                :src="comment.byImage"
                alt="user picture"
                class="w-full"
              />
              <img
                v-else
                src="../assets/anonymous.png"
                loading="lazy"
                alt="user picture"
                class="w-full"
              />
            </div>
          </router-link>
          <div
            class="comment-data w-full border border-solid py-6 px-4 mt-5 dark:bg-dark2 border-gray-200 dark:border-dark1 rounded-md transition-all"
          >
            <div class="flex items-center justify-between mb-2">
              <div
                class="flex sm:items-center flex-col sm:flex-row font-BioRhyme"
              >
                <router-link
                  :to="'/u/' + comment.by"
                  class="text-black no-underline font-medium hover:text-gray-500 transition"
                >
                  <h4 class="font-semibold dark:text-white">
                    {{ comment.byFullName }}
                  </h4>
                </router-link>
                <div
                  class="dot w-1 h-1 bg-gray-400 rounded-full mx-2 mt-1 hidden sm:block"
                ></div>
                <span class="dark:text-gray-400 text-sm pt-0.5"
                  >{{ tweakDate(comment.createdAt) }}
                </span>
              </div>
              <div
                class="flex cursor-pointer px-1 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-dark1 transition-all relative"
                v-if="user?.displayName === comment.by"
                @click="commentActions(comment.id)"
              >
                <span
                  class="w-1 h-1 m-0.5 bg-gray-400 block rounded-full"
                ></span>
                <span
                  class="w-1 h-1 m-0.5 bg-gray-400 block rounded-full"
                ></span>
                <span
                  class="w-1 h-1 m-0.5 bg-gray-400 block rounded-full"
                ></span>
                <div
                  class="mnu absolute top-[35px] right-0 border-solid rounded-md border-4 dark:border-black w-48 hidden"
                  :id="comment.id"
                  style="box-shadow: 3px 3px #000"
                >
                  <ul class="list-none p-0">
                    <li
                      class="bg-white dark:bg-dark2 hover:bg-gray-100 dark:hover:bg-dark1 transition-all px-4 py-2"
                      @click="editComment(comment)"
                    >
                      Edit
                    </li>
                    <li
                      class="bg-white dark:bg-dark2 hover:bg-gray-100 dark:hover:bg-dark1 transition-all px-4 py-2"
                      @click="removeComment(comment)"
                    >
                      Remove
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p class="text-xl whitespace-pre-line">
              {{ comment.val }}
            </p>
          </div>
        </div>
        <div
          class="btn-small ml-8"
          :class="user ? '' : 'opacity-30'"
          @click="like(comment.likes, comment.id)"
        >
          <svg
            class="w-6 h-6 transition-all text-black"
            :class="likedByUser(comment.likes)"
            :id="'l' + comment.id"
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
            >{{ comment.likes?.length }} likes</span
          >
        </div>
      </div>
    </div>
  </div>
  <div
    class="edit fixed w-full h-screen top-0 left-0 flex justify-center items-center overflow-hidden z-50"
    v-if="commentToEdit.dialog"
  >
    <div class="bgBlur absolute bg-black bg-opacity-50 w-full h-full z-0"></div>
    <div
      class="textAreaWrapper bg-white dark:bg-dark2 z-10 w-11/12 max-w-prose rounded-md p-9 pt-5"
    >
      <div class="flex justify-between items-center mb-5">
        <h2>Edit Comment</h2>
        <span
          class="cursor-pointer p-1 pb-0 dark:hover:bg-dark1 rounded-md"
          @click="commentToEdit.dialog = false"
          ><svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path></svg
        ></span>
      </div>
      <textarea
        class="w-full mb-0 h-40 p-2 text-lg rounded-md mx-auto block resize-none textarea border-gray-400 dark:border-dark1 border-solid border bg-gray-100 dark:bg-dark4 dark:text-white outline-none"
        placeholder="Comment Edit"
        v-model="commentToEdit.commentEditValue"
      ></textarea>
      <div
        class="btn bg-green-500 mt-4 hover:bg-green-400 transition ml-auto table text-sm font-semibold border-none text-white px-4 py-2 cursor-pointer"
        @click="performEdit"
        v-if="commentToEdit.commentEditValue !== ''"
      >
        Edit Comment<span class="tracking-normal whitespace-pre"> -></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue'
import { store } from '../store'
import { db, timestamp } from '../firebase'
import { useRoute } from 'vue-router'
import { tweakDate } from '../helper'

let comments = ref([]),
  newCommentLoader = ref(false),
  commentText = ref(''),
  user = ref(),
  postSlug = ref()

const route = useRoute()

const commentToEdit = ref({
  dialog: false,
  commentEditValue: '',
  commentID: '',
})

onMounted(async () => {
  await db
    .collection('comments')
    .where('slug', '==', route.params.slug)
    .orderBy('createdAt', 'desc')
    .get()
    .then((res) => {
      res.forEach((res) => {
        let newComment = res.data()
        newComment.id = res.id
        comments.value.push(newComment)
      })
    })
    .catch((err) => {
      console.log(err)
    })
  user.value = store.state.user
})

const postNewComment = () => {
  newCommentLoader.value = true
  document.querySelector('.newCommentBtn').disabled = true
  let userData = {}
  let moreAboutUser = db.collection('users').doc(user.value.email).get()
  moreAboutUser
    .then((res) => {
      userData = res.data()
      db.collection('comments')
        .add({
          val: commentText.value,
          slug: store.state.postSlug,
          by: user.value.displayName,
          byImage: user.value.photoURL,
          byFullName: userData.fullName,
          createdAt: timestamp(),
          likes: [],
          likes_count: 0,
        })
        .then((res) => {
          db.collection('comments')
            .doc(res.id)
            .get()
            .then((response) => {
              let comment = response.data()
              comment.id = response.id
              comments.value.unshift(comment)
              commentText.value = ''
            })
            .then(() => {
              newCommentLoader.value = false
            })
        })
    })

    .catch((err) => {
      console.log(err)
    })
}

const commentActions = (id) => {
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

const removeComment = (comment) => {
  db.collection('comments')
    .doc(comment.id)
    .delete()
    .then(() => {
      let toRemove = document.getElementById('p' + comment.id)
      let index = comments.value.indexOf(comment)
      toRemove.classList.add('opacity-0')
      window.removeEventListener('mouseup', document.getElementById(comment.id))
      toRemove.addEventListener('transitionend', () => {
        comments.value.splice(index, 1)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const editComment = (comment) => {
  commentToEdit.value.dialog = true
  commentToEdit.value.commentEditValue = comment.val
  commentToEdit.value.commentID = comment.id
  document.getElementById(comment.id).classList.remove('hidden')
}

const performEdit = () => {
  db.collection('comments')
    .doc(commentToEdit.value.commentID)
    .update({
      val: commentToEdit.value.commentEditValue,
    })
    .then(() => {
      comments.value.forEach((comment) => {
        if (comment.id === commentToEdit.value.commentID) {
          comment.val = commentToEdit.value.commentEditValue
        }
      })
      commentToEdit.value.dialog = false
      commentToEdit.value.commentEditValue = ''
      commentToEdit.value.commentID = ''
    })
    .catch((err) => {
      console.log(err)
    })
}

const likedByUser = (likes) => {
  if (user.value) {
    if (likes?.includes(user.value.displayName)) {
      return 'isLiked'
    }
  }
}

const like = (likedArr, id) => {
  if (user.value) {
    let arr = likedArr
    if (!arr.includes(user.value.displayName)) {
      arr.push(user.value.displayName)
    } else {
      let index = arr.indexOf(user.value.displayName)
      arr.splice(index, 1)
    }
    db.collection('comments')
      .doc(id)
      .update({
        likes: arr,
        likes_count: arr?.length,
      })
      .catch((err) => {
        console.log(err)
      })
    document.getElementById('l' + id).classList.toggle('isLiked')
  }
}
</script>

<style>
.isLiked {
  fill: crimson;
}
</style>
