<script setup>
import { onMounted, ref } from 'vue'

const srcx = ref(null)
const props = defineProps({
  src: { type: String },
  type: { type: String, required: true },
  classNames: { type: String },
  animate: { type: Boolean, default: true },
})

onMounted(() => {
  srcx.value = props.src
})

const imgLoaded = (e) => {
  if (e.target.classList.contains('opacity-0'))
    e.target.classList.remove('opacity-0')
}

const imgError = (e) => {
  e.preventDefault()

  srcx.value = null
}

const getClasses = () => {
  let classes = ''
  if (props.classNames) classes += props.classNames + ' '
  if (props.animate) classes += 'opacity-0' + ' '
  if (!srcx.value) classes += 'dark:invert dark:bg-slate-100'
  return classes
}
</script>

<template>
  <img
    :src="srcx ? srcx : type === 'user' ? '/anonymous.png' : '/blog.png'"
    class="w-full bg-gray-300 transition duration-300 pointer-events-none object-cover"
    :class="getClasses()"
    @load="imgLoaded"
    @error="imgError"
  />
</template>
