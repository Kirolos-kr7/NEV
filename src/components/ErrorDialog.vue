<script setup>
import Colors from './Colors.vue'

const props = defineProps({
  title: { type: String, required: true },
  text: { type: String, required: true },
})

const emits = defineEmits(['press'])
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 z-40 max-h-[85vh] w-full max-w-prose -translate-x-1/2 -translate-y-1/2 scale-100 overflow-auto bg-white p-5 dark:bg-dark2 dark:text-white sm:rounded-md"
  >
    <h2 class="mb-3 font-BioRhyme text-2xl font-semibold dark:text-white">
      {{ title }}
    </h2>
    <p>{{ text }}</p>

    <div class="mt-4 flex justify-end gap-2">
      <button class="btn-medium blueish" @click="emits('press')">Okey</button>
    </div>
  </div>
</template>
