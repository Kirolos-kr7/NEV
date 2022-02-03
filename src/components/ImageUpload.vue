<script setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import { ref } from 'vue'
import { store } from '../store'
import { storage, auth, db } from '../firebase'
import 'vue-advanced-cropper/dist/style.css'
import Colors from './Colors.vue'
import Loading from './Loading.vue'
import VImage from './VImage.vue'

const cropper = ref()
const props = defineProps({
  img: { type: String },
  isCurrent: { type: Boolean },
})

const file = ref()
const image = ref()
const isLoading = ref(false)

const fileChange = (e) => {
  if (e.target.files[0]) image.value = URL.createObjectURL(e.target.files[0])
}

const cancelImageChange = () => {
  file.value.value = null
  image.value = null
}

const uploadImage = () => {
  isLoading.value = true
  const { canvas } = cropper.value.getResult()
  if (canvas) {
    canvas.toBlob((blob) => {
      let dataUrl = URL.createObjectURL(blob)

      let img = new Image()
      img.src = dataUrl

      img.onload = () => {
        let cx = document.createElement('canvas')
        cx.width = 320
        cx.height = 320
        let ctx = cx.getContext('2d')

        ctx.drawImage(img, 0, 0, 320, 320)

        cx.toBlob(
          (blob) => {
            fbStorageUpload(blob)
          },
          'image/jpeg',
          1.0,
        )
      }
    })
  }
}

const fbStorageUpload = async (blob) => {
  const stRef = storage.ref(
    'users/' + store.state.user.displayName + '.' + blob.type.split('/')[1],
  )

  await stRef.put(blob)
  await stRef.getDownloadURL().then((url) => {
    store.state.user
      .updateProfile({
        photoURL: url,
      })
      .then(() => {
        db.collection('users')
          .doc(store.state.user.email)
          .update({
            image: url,
          })
          .then(() => {
            location.reload()
          })
      })
  })
}

const removeImage = async () => {
  isLoading.value = true
  const stRef = storage.refFromURL(props.img)

  await stRef.delete()
  await store.state.user.updateProfile({
    photoURL: null,
  })
  await db.collection('users').doc(store.state.user.email).update({
    image: null,
  })

  location.reload()
}
</script>

<template>
  <div
    class="p-3 max-w-prose overflow-auto max-h-[85vh] bg-white dark:bg-dark2 dark:text-white relative rounded-md"
    :class="image ? 'min-w-full md:min-w-[65ch]' : ''"
  >
    <div class="flex items-start justify-between">
      <h2 class="dark:text-white font-BioRhyme font-semibold text-2xl">
        Profile Picture
        <Colors class="mb-3" />
      </h2>
    </div>
    <div class="w-full sm:w-[320px] mx-auto" v-if="!image">
      <VImage :src="img" type="user" />
    </div>

    <div>
      <input
        type="file"
        class="hidden"
        ref="file"
        @change="fileChange"
        accept="image/*"
      />
    </div>

    <Cropper
      v-if="image"
      ref="cropper"
      class="cropper h-96"
      :src="image"
      :stencil-component="CircleStencil"
    />

    <div
      class="grid grid-cols-2 gap-2 justify-end mt-3"
      v-if="!image && isCurrent && img"
    >
      <button class="btn-medium redish !w-auto block" @click="removeImage">
        Remove
      </button>
      <button class="btn-medium blueish !w-auto block" @click="file.click()">
        Change
      </button>
    </div>

    <div
      class="grid grid-cols-1 gap-2 justify-end mt-3"
      v-if="!image && isCurrent && !img"
    >
      <button class="btn-medium blueish !w-auto block" @click="file.click()">
        Select
      </button>
    </div>

    <div class="flex gap-2 justify-end mt-3" v-if="image">
      <button class="btn-medium blueish w-full block" @click="uploadImage">
        Update
      </button>
      <button class="btn-medium redish w-full block" @click="cancelImageChange">
        Cancel
      </button>
    </div>
  </div>

  <div
    v-if="isLoading"
    class="absolute z-40 top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm"
  >
    <Loading />
  </div>
</template>
