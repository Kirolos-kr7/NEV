<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

let username = ref(''),
  fullName = ref(''),
  website = ref(''),
  email = ref(''),
  password = ref(''),
  location = ref('Egypt'),
  error = ref(''),
  router = useRouter(),
  FN_REGEX = /^[A-Za-z- ]{3,}$/,
  UN_REGEX = /^[a-z0-9-_]{3,}$/,
  E_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  PW_REGEX = /^[A-Za-z0-9]\w{7,}$/,
  WEBSITE_REGEX = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
  countries = ref([
    { name: 'Algeria', code: 'DZ' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
  ])

const createUserWithEmailAndPassword = () => {
  if (fullName.value.match(FN_REGEX)) {
    error.value = ''
    if (username.value.match(UN_REGEX)) {
      error.value = ''
      if (website.value.match(WEBSITE_REGEX) || website.value === '') {
        error.value = ''
        if (email.value.match(E_REGEX)) {
          error.value = ''
          if (password.value.match(PW_REGEX)) {
            error.value = ''
            go()
          } else {
            error.value = 'Password is not valid (minimum 7 characters)'
          }
        } else {
          error.value = 'E-mail is not valid'
        }
      } else {
        error.value = 'Website is not valid'
      }
    } else {
      error.value =
        'Username is not valid \nAtleast three characters (small, numbers, -, _)'
    }
  } else {
    error.value =
      'Full Name is not valid \nAtleast three characters (no numbers)'
  }
}

const go = () => {
  auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      let user = userCredential.user

      user
        .updateProfile({
          displayName: username.value.toLowerCase(),
        })
        .then(() => {
          db.collection('users').doc(email.value.toLowerCase()).set({
            fullName: fullName.value,
            username: username.value.toLowerCase(),
            joinDate: new Date().toDateString(),
            email: email.value.toLowerCase(),
            location: location.value,
            website: website.value,
            bio: null,
            image: null,
          })
          username.value = ''
          email.value = ''
          password.value = ''
          error.value = ''
          router.push('/')
        })
    })
    .catch((err) => {
      err.code === 'auth/email-already-in-use'
        ? (error.value = 'Email already in use')
        : (error.value = err.code)
    })
}
</script>

<template>
  <Navbar />
  <div class="/register pt-20 sm:pt-24 bg-primary dark:bg-dark1 py-5">
    <div
      class="wrapper w-full sm:w-9/12 md:w-8/12 lg:w-6/12 sm:border sm:border-gray-300 sm:dark:border-dark1 sm:border-solid mx-auto p-5 rounded-md overflow-hidden bg-white dark:bg-dark2"
    >
      <h2
        class="bg-gray-200 dark:bg-dark3 dark:text-white p-5 -m-5 mb-3 text-center text-2xl font-black font-BioRhyme"
      >
        Join Our Community
      </h2>
      <p class="font-medium text-center my-5 dark:text-white font-BioRhyme">
        Over <span class="text-xl font-bold">365,326</span> brillinat developers
        and designers
      </p>
      <div class="px-6">
        <form class="flex flex-wrap">
          <div class="input-wrapper w-full sm:w-1/2 sm:px-2">
            <h3 class="font-medium text-gray-800 dark:text-gray-300 text-base">
              Full Name
            </h3>
            <input
              type="text"
              v-model="fullName"
              class="w-full px-3 mt-1 mb-6 h-10 border border-solid dark:text-white bg-gray-50 dark:bg-dark4 border-gray-300 dark:border-dark1 rounded-lg text-lg"
              autocomplete="on"
              required
            />
          </div>
          <div class="input-wrapper w-full sm:w-1/2 sm:px-2">
            <h3 class="font-medium text-gray-800 dark:text-gray-300 text-base">
              Username
            </h3>
            <input
              type="text"
              v-model="username"
              class="w-full px-3 mt-1 mb-6 h-10 border border-solid dark:text-gray-300 bg-gray-50 dark:bg-dark4 border-gray-300 dark:border-dark1 rounded-lg text-lg"
              autocomplete="on"
              required
            />
          </div>
          <div
            class="input-wrapper location-wrapper relative w-full sm:w-1/2 sm:px-2"
          >
            <h3 class="font-medium text-gray-800 dark:text-gray-300 text-base">
              Location
            </h3>
            <select
              name="location"
              class="location w-full appearance-none cursor-pointer px-3 mt-1 mb-6 h-10 border border-solid dark:text-gray-300 bg-gray-50 dark:bg-dark4 border-gray-300 dark:border-dark1 rounded-lg text-lg truncate"
              v-model="location"
              required
            >
              <option
                class="cursor-pointer"
                v-for="country in countries"
                :key="country"
                :value="country.name"
              >
                {{ country.name }}
              </option>
            </select>
            <svg
              class="w-6 h-6 absolute top-9 right-5 pointer-events-none chev-down dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              placeholder="fsdfd"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          <div class="input-wrapper relative w-full sm:w-1/2 sm:px-2">
            <h3 class="font-medium text-gray-800 dark:text-gray-300 text-base">
              Website (Optional)
            </h3>
            <input
              type="text"
              v-model="website"
              class="w-full px-3 mt-1 mb-6 h-10 border border-solid dark:text-gray-300 bg-gray-50 dark:bg-dark4 border-gray-300 dark:border-dark1 rounded-lg text-lg"
              autocomplete="on"
              required
            />
          </div>
          <div class="input-wrapper relative w-full sm:w-1/2 sm:px-2">
            <h3 class="font-medium text-gray-800 dark:text-gray-300 text-base">
              E-mail
            </h3>
            <input
              type="text"
              v-model="email"
              class="w-full px-3 mt-1 mb-6 h-10 border border-solid dark:text-gray-300 bg-gray-50 dark:bg-dark4 border-gray-300 dark:border-dark1 rounded-lg text-lg"
              required
            />
          </div>
          <div class="input-wrapper w-full sm:w-1/2 sm:px-2">
            <h3 class="font-medium text-gray-800 dark:text-gray-300 text-base">
              Password
            </h3>
            <input
              type="password"
              v-model="password"
              class="w-full px-3 mt-1 mb-6 h-10 border border-solid dark:text-gray-300 bg-gray-50 dark:bg-dark4 border-gray-300 dark:border-dark1 rounded-lg text-lg"
              required
            />
          </div>
        </form>
        <div
          class="err flex items-center text-white bg-red-100 dark:bg-red-900 mb-6 pl-3 border border-red-300 dark:border-dark1 border-solid p-2 mx-2 rounded-lg transition-all"
          v-if="error"
        >
          <svg
            width="20"
            height="20"
            style="min-width: 20px"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3156 14.407L12.5382 2.66823C12.0319 1.79144 11.0852 1.20093 10 1.20093C8.91477 1.20093 7.96809 1.79144 7.4618 2.66823L0.684414 14.407C0.435898 14.8375 0.292969 15.3366 0.292969 15.8693C0.292969 17.4873 1.60465 18.799 3.22266 18.799H16.7773C18.3954 18.799 19.707 17.4873 19.707 15.8693C19.707 15.3366 19.5641 14.8375 19.3156 14.407Z"
              fill="#525A61"
            />
            <path
              d="M17.9625 15.1882L11.1852 3.44952C10.9473 3.03741 10.5109 2.77726 10.0391 2.76398L15.8023 17.2366H16.7773C17.5312 17.2366 18.1445 16.623 18.1445 15.8694C18.1445 15.6265 18.0832 15.3976 17.9625 15.1882Z"
              fill="#FFB751"
            />
            <path
              d="M16.8168 15.1883C16.9203 15.3977 16.9727 15.6266 16.9727 15.8696C16.9727 16.6231 16.4477 17.2367 15.8023 17.2367H3.22266C2.46875 17.2367 1.85547 16.6231 1.85547 15.8696C1.85547 15.6266 1.9168 15.3977 2.0375 15.1883L8.81484 3.44963C9.05938 3.0262 9.51328 2.76331 10 2.76331C10.0129 2.76331 10.0262 2.7637 10.0391 2.76409C10.4406 2.77971 10.8121 3.03948 11.0145 3.44963L16.8168 15.1883Z"
              fill="#FFD764"
            />
            <path
              d="M10 13.7209V15.674C10.5395 15.674 10.9766 15.2369 10.9766 14.6974C10.9766 14.158 10.5395 13.7209 10 13.7209Z"
              fill="#3B4145"
            />
            <path
              d="M10 13.7209C10.1078 13.7209 10.1953 14.158 10.1953 14.6974C10.1953 15.2369 10.1078 15.674 10 15.674C9.46055 15.674 9.02344 15.2369 9.02344 14.6974C9.02344 14.158 9.46055 13.7209 10 13.7209Z"
              fill="#525A61"
            />
            <path
              d="M10 5.32257V12.5491C10.5395 12.5491 10.9766 12.1116 10.9766 11.5726V6.29913C10.9766 5.75972 10.5395 5.32257 10 5.32257Z"
              fill="#3B4145"
            />
            <path
              d="M10 5.32263C10.1078 5.32263 10.1953 5.75974 10.1953 6.2992V11.5726C10.1953 12.1117 10.1078 12.5492 10 12.5492C9.46055 12.5492 9.02344 12.1117 9.02344 11.5726V6.2992C9.02344 5.75974 9.46055 5.32263 10 5.32263Z"
              fill="#525A61"
            />
            <path
              d="M19.5693 14.2606L12.7919 2.52173C12.2171 1.52638 11.1473 0.90802 10 0.90802C8.8527 0.90802 7.78289 1.52638 7.20809 2.52181L0.430703 14.2606C0.148945 14.7486 0 15.3049 0 15.8693C0 17.6463 1.4457 19.092 3.22266 19.092H16.7773C18.5543 19.092 20 17.6463 20 15.8693C20 15.3049 19.8511 14.7486 19.5693 14.2606ZM16.7773 18.5061H3.22266C1.76875 18.5061 0.585938 17.3233 0.585938 15.8693C0.585938 15.4076 0.707734 14.9526 0.938164 14.5535L7.71555 2.81474C8.18598 2.00005 9.06133 1.49396 10 1.49396C10.9387 1.49396 11.814 2.00005 12.2845 2.81478L19.0618 14.5536C19.2922 14.9527 19.4141 15.4077 19.4141 15.8694C19.4141 17.3233 18.2313 18.5061 16.7773 18.5061Z"
              fill="black"
            />
            <path
              d="M11.4388 3.30304C11.1422 2.78948 10.5909 2.47046 10 2.47046C9.40906 2.47046 8.85777 2.78944 8.56125 3.303L5.46551 8.66499C5.38461 8.80511 5.43262 8.98429 5.57273 9.06519C5.71289 9.14601 5.89203 9.09804 5.97293 8.95796L9.06867 3.59597C9.26086 3.26315 9.61773 3.0564 10 3.0564C10.3823 3.0564 10.7392 3.26319 10.9314 3.59601L17.7087 15.3348C17.8035 15.4989 17.8516 15.6788 17.8516 15.8694C17.8516 16.4617 17.3696 16.9436 16.7773 16.9436H3.22266C2.63035 16.9436 2.14844 16.4617 2.14844 15.8694C2.14844 15.6788 2.19648 15.499 2.29129 15.3348L5.38699 9.97276C5.46789 9.83265 5.41988 9.65347 5.27977 9.57257C5.13953 9.49167 4.96043 9.53964 4.87957 9.67979L1.78387 15.0418C1.63695 15.2962 1.5625 15.5746 1.5625 15.8693C1.5625 16.7848 2.30723 17.5295 3.22266 17.5295H16.7773C17.6928 17.5295 18.4375 16.7848 18.4375 15.8693C18.4375 15.5746 18.363 15.2962 18.2161 15.0417L11.4388 3.30304Z"
              fill="black"
            />
            <path
              d="M10 12.842C10.7 12.842 11.2695 12.2725 11.2695 11.5724V6.29901C11.2695 5.59897 10.7 5.02948 10 5.02948C9.29996 5.02948 8.73047 5.59897 8.73047 6.29901V11.5724C8.73047 12.2725 9.29996 12.842 10 12.842ZM9.31641 6.29901C9.31641 5.9221 9.62309 5.61542 10 5.61542C10.3769 5.61542 10.6836 5.9221 10.6836 6.29901V11.5724C10.6836 11.9494 10.3769 12.256 10 12.256C9.62309 12.256 9.31641 11.9494 9.31641 11.5724V6.29901Z"
              fill="black"
            />
            <path
              d="M10 15.967C10.7 15.967 11.2695 15.3975 11.2695 14.6974C11.2695 13.9974 10.7 13.4279 10 13.4279C9.29996 13.4279 8.73047 13.9974 8.73047 14.6974C8.73047 15.3975 9.29996 15.967 10 15.967ZM10 14.0139C10.3769 14.0139 10.6836 14.3205 10.6836 14.6974C10.6836 15.0744 10.3769 15.381 10 15.381C9.62309 15.381 9.31641 15.0744 9.31641 14.6974C9.31641 14.3205 9.62309 14.0139 10 14.0139Z"
              fill="black"
            />
          </svg>
          <span class="ml-2 whitespace-pre-wrap"> {{ error }}</span>
        </div>

        <div class="mx-2">
          <button
            class="btn-medium blueish w-max"
            @click.prevent="createUserWithEmailAndPassword"
          >
            Sign Up
          </button>
          <router-link to="/login">
            <div
              class="box text-center cursor-pointer mt-4 relative inline-block text-black dark:text-white"
            >
              Already Have an Account ?
              <div class="lined transition-all dark:bg-gray-300"></div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
