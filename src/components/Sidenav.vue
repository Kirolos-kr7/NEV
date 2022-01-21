<template>
  <ul
    class="list-none px-3 font-BioRhyme"
    :class="
      isHomePage
        ? ''
        : 'bg-white dark:bg-dark1 w-full border-b border-t-0 border-l-0 border-r-0 border-gray-300 dark:border-dark1 border-solid'
    "
  >
    <transition-group appear name="fadeInLeft">
      <li key="1" id="l1">
        <router-link
          to="/"
          class="flex items-center text-current no-underline w-full my-3 px-3 pt-2 pb-2.5 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-dark2 dark:focus:bg-dark2 hover:text-gray-500 dark:hover:text-gray-300 font-medium rounded-md text-black dark:text-gray-200 transition"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <span>Home</span></router-link
        >
      </li>
      <li key="2" id="l2">
        <router-link
          to="/"
          class="flex items-center text-current no-underline w-full my-3 px-3 pt-2 pb-2.5 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-dark2 dark:focus:bg-dark2 hover:text-gray-500 dark:hover:text-gray-300 font-medium rounded-md text-black dark:text-gray-200 transition"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            ></path>
          </svg>
          <span>About</span></router-link
        >
      </li>
      <li key="3" id="l3">
        <router-link
          to="/s"
          class="flex items-center text-current no-underline w-full my-3 px-3 pt-2 pb-2.5 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-dark2 dark:focus:bg-dark2 hover:text-gray-500 dark:hover:text-gray-300 font-medium rounded-md text-black dark:text-gray-200 transition"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
          <span>Saved</span></router-link
        >
      </li>
      <li key="4" id="l4">
        <router-link
          to="/"
          class="flex items-center text-current no-underline w-full my-3 px-3 pt-2 pb-2.5 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-dark2 dark:focus:bg-dark2 hover:text-gray-500 dark:hover:text-gray-300 font-medium rounded-md text-black dark:text-gray-200 transition"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          <span>Support</span></router-link
        >
      </li>
      <li key="5" id="l5">
        <router-link
          to="/"
          class="flex items-center text-current no-underline w-full my-3 px-3 pt-2 pb-2.5 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-dark2 dark:focus:bg-dark2 hover:text-gray-500 dark:hover:text-gray-300 font-medium rounded-md text-black dark:text-gray-200 transition"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            ></path>
          </svg>
          <span>Contact</span></router-link
        >
      </li>
    </transition-group>
  </ul>
</template>

<script setup>
defineProps({
  isHomePage: Boolean,
})
</script>

<style scoped>
.fadeInLeft-enter-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fadeInLeft-enter-from {
  opacity: 0;
  position: relative;
  transform: translateX(-50px);
}

#l1 {
  transition-delay: 0.1s;
}
#l2 {
  transition-delay: 0.2s;
}
#l3 {
  transition-delay: 0.3s;
}
#l4 {
  transition-delay: 0.4s;
}
#l5 {
  transition-delay: 0.5s;
}
</style>
