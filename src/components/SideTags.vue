<template>
  <transition-group
    appear
    name="fadeIn"
    tag="div"
    class="chips overflow-scroll flex items-center md:block relative -mx-2 sm:mx-5 md:mx-0"
  >
    <router-link key="1" id="x1" :to="'/t/' + 'web'" class="chip"
      >Web</router-link
    >
    <router-link key="2" id="x2" :to="'/t/' + 'android'" class="chip"
      >Android</router-link
    >
    <router-link key="3" id="x3" :to="'/t/' + 'ios'" class="chip"
      >IOS</router-link
    >
    <router-link key="4" id="x4" :to="'/t/' + 'design'" class="chip"
      >Design</router-link
    >
    <router-link key="5" id="x5" :to="'/t/' + 'ui-ux'" class="chip"
      >UI/UX</router-link
    >
    <router-link key="6" id="x6" :to="'/t/' + 'flutter'" class="chip"
      >Flutter</router-link
    >
  </transition-group>
</template>

<style scoped>
.chips::-webkit-scrollbar {
  display: none;
}

.fadeIn-enter-active {
  transition: opacity 0.8s ease;
}

.fadeIn-enter-from {
  opacity: 0;
}

#x1 {
  transition-delay: 0.03s;
}
#x2 {
  transition-delay: 0.08s;
}
#x3 {
  transition-delay: 0.13s;
}
#x4 {
  transition-delay: 0.18s;
}
#x5 {
  transition-delay: 0.23s;
}
#x6 {
  transition-delay: 0.28s;
}
</style>
