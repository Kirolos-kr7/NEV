<template>
  <div class="content py-8" v-html="content"></div>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');
.content > * + *,
.ProseMirror > * + * {
  margin-top: 0.75em;
}

.content ul,
.content ol,
.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}
.content h1,
.ProseMirror h1 {
  line-height: 1.1;
  font-size: 2em;
}

.content h2,
.ProseMirror h2 {
  line-height: 1.1;
  font-size: 1.8em;
}

.content h3,
.ProseMirror h3 {
  line-height: 1.1;
  font-size: 1.5em;
}

.content h4,
.ProseMirror h4 {
  line-height: 1.1;
  font-size: 1.3em;
}

.content h5,
.ProseMirror h5 {
  line-height: 1.1;
  font-size: 1.1em;
}

.content h6,
.ProseMirror h6 {
  line-height: 1.1;
  font-size: 1em;
}
.content p,
.ProseMirror p {
  font-size: 1.25rem;
  font-weight: 400;
}
.content code,
.ProseMirror code {
  font-family: 'Source Code Pro', monospace;
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
  padding: 2px 4px 3px;
  font-size: 0.7em;
  border-radius: 3px;
}
.content pre,
.ProseMirror pre {
  overflow-x: auto;
  background: #0d0d0d;
  color: #fff;
  padding: 20px;
  border-radius: 0.25rem;
  white-space: pre;
}
.content pre code,
.ProseMirror pre code {
  font-family: 'Source Code Pro', monospace;
  font-weight: 400;
  color: inherit;
  padding: 0;
  background: none;
  font-size: 1rem;
  white-space: pre-wrap;
}

.content pre code > *,
.ProseMirror pre code > * {
  font-family: 'Source Code Pro', monospace;
}
.content img,
.ProseMirror img {
  max-width: 100%;
  height: auto;
}
.content blockquote,
.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(13, 13, 13, 0.1);
}
.content hr .ProseMirror hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}

.hljs-comment,
.hljs-quote {
  color: #616161;
}

.hljs-variable,
.hljs-template-variable,
.hljs-attribute,
.hljs-tag,
.hljs-name,
.hljs-regexp,
.hljs-link,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
  color: #f98181;
}

.hljs-number,
.hljs-meta,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params {
  color: #fbbc88;
}

.hljs-string,
.hljs-symbol,
.hljs-bullet {
  color: #b9f18d;
}

.hljs-title,
.hljs-section {
  color: #faf594;
}

.hljs-keyword,
.hljs-selector-tag {
  color: #70cff8;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: 700;
}
</style>
