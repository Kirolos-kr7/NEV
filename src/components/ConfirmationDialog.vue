<script setup>
import Colors from './Colors.vue'

const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
})

const emits = defineEmits(['accept', 'cancel'])
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 max-w-prose w-full sm:rounded-md p-5 overflow-auto max-h-[85vh] bg-white dark:bg-dark2 dark:text-white scale-100"
  >
    <h2 class="dark:text-white font-BioRhyme font-semibold text-2xl mb-3">
      {{ title }}
    </h2>
    <p>{{ text }}</p>

    <div class="flex gap-2 justify-end mt-4">
      <button class="btn-medium redish" @click="emits('cancel')">No</button>
      <button class="btn-medium blueish" @click="emits('accept')">Yes</button>
    </div>
  </div>
</template>
