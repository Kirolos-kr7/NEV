<template>
  <div class="sm:px-2 my-3" v-if="UserImage !== null">
    <label for="">Profile Image</label>
    <div class="rounded-full my-2 max-w-[150px] max-h-[150px] overflow-hidden">
      <img :src="UserImage" alt="personal image" class="max-w-[150px]" />
    </div>
    <button class="btn-medium redish" @click.prevent="DeleteUserCurrentPicture">
      Remove
    </button>
  </div>

  <div class="sm:px-2" v-if="UserImage === null">
    <label for="img">Profile Image</label>
    <input
      type="file"
      id="img"
      class="hidden"
      @change="imageChange"
      accept="image/*"
      ref="postImage"
    />
    <button
      class="w-full border-gray-400 dark:border-dark1 rounded-md border-solid border bg-gray-100 dark:bg-dark4 dark:text-white text-center p-4 mb-6 mt-1 cursor-pointer focus:ring focus:ring-indigo-700/75"
      @click.prevent="addImage"
      v-if="!isPostImage"
    >
      <svg
        class="w-8 h-8 text-dark4 dark:text-gray-100 mx-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <p class="dark:text-gray-300">CLICK TO ADD IMAGE</p>
    </button>
    <div
      class="flex justify-between items-center gap-x-2 border-gray-400 dark:border-dark1 rounded-md border-solid border bg-gray-100 dark:bg-dark4 dark:text-white text-center p-4 relative mb-6 mt-1"
      v-else
    >
      <div class="flex flex-col items-baseline gap-y-1 w-10/12 sm:w-3/4">
        <span
          class="inline-block bg-gray-300 dark:bg-dark1 rounded-full pt-1 pb-1.5 px-3 text-sm overflow-hidden overflow-ellipsis max-w-full"
          >{{ postImage?.files[0].name }}</span
        >
        <span
          class="inline-block sm:hidden bg-gray-300 dark:bg-dark1 rounded-full pt-1 pb-1.5 px-3 text-sm whitespace-nowrap"
          >{{ getImageSize() }}</span
        >
      </div>
      <div class="flex items-center gap-x-2">
        <span
          class="hidden sm:inline-block bg-gray-300 dark:bg-dark1 rounded-full pt-1 pb-1.5 px-3 text-sm whitespace-nowrap"
          >{{ getImageSize() }}</span
        >
        <span
          class="cursor-pointer p-1 pb-0 dark:hover:bg-dark1 dark:text-white rounded-md"
          @click="removeImage"
          ><svg
            class="w-5 h-5"
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
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

let postImage = ref(),
  isPostImage = ref(false)

const addImage = () => {
  postImage.value.click()
}

const imageChange = () => {
  isPostImage.value = !isPostImage.value
}

const removeImage = () => {
  postImage.value.files = null
  isPostImage.value = false
}

const getImageSize = () => {
  let size =
    postImage.value.files[0].size / 1024 > 1024
      ? (postImage.value.files[0].size / 1024 / 1024).toFixed(2) + ' mb'
      : postImage.value.files[0].size > 1024
      ? (postImage.value.files[0].size / 1024).toFixed(2) + ' kb'
      : postImage.value.files[0].size.toFixed(2) + ' bytes'
  return size
}
</script>
