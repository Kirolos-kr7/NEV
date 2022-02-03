<template>
  <div class="ProseMirror py-4" v-html="content"></div>
</template>

<script>
import hljs from 'highlight.js'
export default {
  props: ['content'],
  mounted() {
    hljs.highlightAll()
  },
}
</script>
