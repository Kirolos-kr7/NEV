<template>
  <footer class="py-9 bg-gray-300 dark:bg-dark2 font-BioRhyme">
    <div class="list-none mx-auto w-8/12">
      <div>
        <ul class="list-none p-2 text-center">
          <li class="inline-block">
            <router-link
              :to="'/t/' + 'webdev'"
              class="text-black dark:text-gray-200 no-underline m-3 transition-all"
            >
              <div class="box text-center relative inline-block">
                Web
                <div
                  class="lined bg-black dark:bg-gray-200 transition-all"
                ></div>
              </div>
            </router-link>
          </li>
          <li class="inline-block">
            <router-link
              :to="'/t/' + 'androiddev'"
              class="text-black dark:text-gray-200 no-underline m-3 transition-all"
            >
              <div class="box text-center relative inline-block">
                Android
                <div
                  class="lined bg-black dark:bg-gray-200 transition-all"
                ></div>
              </div>
            </router-link>
          </li>
          <li class="inline-block">
            <router-link
              :to="'/t/' + 'iosdev'"
              class="text-black dark:text-gray-200 no-underline m-3 transition-all"
            >
              <div class="box text-center relative inline-block">
                IOS
                <div
                  class="lined bg-black dark:bg-gray-200 transition-all"
                ></div>
              </div>
            </router-link>
          </li>
          <li class="inline-block">
            <router-link
              :to="'/t/' + 'design'"
              class="text-black dark:text-gray-200 no-underline m-3 transition-all"
            >
              <div class="box text-center relative inline-block">
                Design
                <div
                  class="lined bg-black dark:bg-gray-200 transition-all"
                ></div>
              </div>
            </router-link>
          </li>
          <li class="inline-block">
            <router-link
              :to="'/t/' + 'ui-ux'"
              class="text-black dark:text-gray-200 no-underline m-3 transition-all"
            >
              <div class="box text-center relative inline-block">
                UI/UX
                <div
                  class="lined bg-black dark:bg-gray-200 transition-all"
                ></div>
              </div>
            </router-link>
          </li>
          <li class="inline-block">
            <router-link
              :to="'/t/' + 'flutterdev'"
              class="text-black dark:text-gray-200 no-underline m-3 transition-all"
            >
              <div class="box text-center relative inline-block">
                Flutter
                <div
                  class="lined bg-black dark:bg-gray-200 transition-all"
                ></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <ul class="list-none p-2 text-center">
        <li class="inline-block">
          <router-link
            to="/"
            class="text-black dark:text-gray-200 no-underline m-3 transition-all"
          >
            <div class="box text-center relative inline-block">
              Who are we?
              <div class="lined bg-black dark:bg-gray-200 transition-all"></div>
            </div>
          </router-link>
        </li>
        <li class="inline-block">
          <router-link
            to="/"
            class="text-black dark:text-gray-200 no-underline m-3 transition-all"
          >
            <div class="box text-center relative inline-block">
              Privacy Policy
              <div class="lined bg-black dark:bg-gray-200 transition-all"></div>
            </div>
          </router-link>
        </li>
        <li class="inline-block">
          <router-link
            to="/"
            class="text-black dark:text-gray-200 no-underline m-3 transition-all"
          >
            <div class="box text-center relative inline-block">
              Terms Of Use
              <div class="lined bg-black dark:bg-gray-200 transition-all"></div>
            </div>
          </router-link>
        </li>
        <li class="inline-block">
          <router-link
            to="/"
            class="text-black dark:text-gray-200 no-underline m-3 transition-all"
          >
            <div class="box text-center relative inline-block">
              Get In Touch
              <div class="lined bg-black dark:bg-gray-200 transition-all"></div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="icons text-center mt-5 flex mx-auto justify-center">
      <router-link to="/">
        <img src="../assets/fb.svg" width="25" class="mx-2 transition-all" />
      </router-link>
      <router-link to="/">
        <img
          src="../assets/github.svg"
          width="25"
          class="mx-2 transition-all"
        />
      </router-link>
      <router-link to="/">
        <img
          src="../assets/twitter.svg"
          width="25"
          class="mx-2 transition-all"
        />
      </router-link>
      <router-link to="/">
        <img
          src="../assets/instagram.svg"
          width="25"
          class="mx-2 transition-all"
        />
      </router-link>
    </div>
    <div class="break w-52 h-px bg-gray-400 mx-auto my-5"></div>
    <div class="text-center mb-6 dark:text-gray-200">
      A constructive and inclusive social network for software developers.
      <br />
      With you every step of your journey.
    </div>
    <div class="copyright font-bold text-center dark:text-gray-200">
      &copy; NEV 2021
    </div>
  </footer>
</template>

<style scoped>
.icons a:hover img {
  filter: brightness(0.5);
}
</style>
