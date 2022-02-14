<script setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import { computed, ref } from 'vue'
import { store } from '../store'
import { storage, auth, db } from '../firebase'
import 'vue-advanced-cropper/dist/style.css'
import Colors from './Colors.vue'
import Loading from './Loading.vue'
import VImage from './VImage.vue'
import ConfirmationDialog from './ConfirmationDialog.vue'

const cropper = ref()
const file = ref()
const image = ref()
const isLoading = ref(false)
const cd = ref(false)
const props = defineProps({
  img: { type: String },
  isCurrent: { type: Boolean },
})

const imageLoaded = computed(() => {
  if (cropper.value) return cropper.value.$data.imageLoaded
  else return false
})

const fileChange = (e) => {
  if (e.target.files[0] && e.target.files[0].type.split('/')[0] === 'image')
    image.value = URL.createObjectURL(e.target.files[0])
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
  const stRef = storage.ref('users/' + store.state.user.displayName + '.jpeg')

  await stRef.put(blob)
  await stRef.getDownloadURL().then((url) => {
    store.state.user
      .updateProfile({
        photoURL: url,
      })
      .then(() => {
        db.collection('users')
          .doc(store.state.user.displayName)
          .update({
            image: url,
          })
          .then(() => {
            location.reload()
          })
      })
  })
}

const changeCd = () => {
  cd.value = !cd.value
  if (cd.value) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = 'auto'
}

const removeImage = async () => {
  isLoading.value = true
  changeCd()
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
    class="xs:w-auto fixed top-1/2 left-1/2 z-40 max-h-[85vh] w-full max-w-prose origin-top-left -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white p-3 dark:bg-dark2 dark:text-white sm:rounded-md"
    :class="image ? 'min-w-full md:min-w-[65ch] ' : ''"
  >
    <div class="flex items-start justify-between">
      <h2 class="font-BioRhyme text-2xl font-semibold dark:text-white">
        Profile Picture
        <Colors class="mb-3" />
      </h2>
    </div>
    <div class="mx-auto w-full sm:w-[320px]" v-if="!image">
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
      class="mt-3 grid grid-cols-2 justify-end gap-2"
      v-if="!image && isCurrent && img"
    >
      <button class="btn-medium redish block !w-auto" @click="changeCd">
        Remove
      </button>
      <button class="btn-medium blueish block !w-auto" @click="file.click()">
        Change
      </button>
    </div>

    <div
      class="mt-3 grid grid-cols-1 justify-end gap-2"
      v-if="!image && isCurrent && !img"
    >
      <button class="btn-medium blueish block !w-auto" @click="file.click()">
        Select
      </button>
    </div>

    <div class="mt-3 flex justify-end gap-2" v-if="image">
      <button
        class="btn-medium blueish block w-full"
        @click="uploadImage"
        v-if="imageLoaded"
      >
        Update
      </button>
      <button class="btn-medium redish block w-full" @click="cancelImageChange">
        Cancel
      </button>
    </div>
  </div>

  <div
    v-if="isLoading"
    class="fixed top-0 left-0 z-50 h-full w-full bg-black/40 backdrop-blur-sm"
  >
    <Loading />
  </div>

  <transition name="fade">
    <div
      v-if="cd"
      class="fixed top-0 left-0 z-40 h-full w-full bg-black/30 backdrop-blur-sm"
      @click="changeCd"
    ></div>
  </transition>
  <transition name="zoom">
    <ConfirmationDialog
      v-if="cd"
      class="origin-top-left"
      title="Remove Image"
      text="Are you sure you want to proceed?"
      @accept="removeImage"
      @cancel="changeCd"
    />
  </transition>
</template>
