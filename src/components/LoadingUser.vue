<template>
  <div class="md:overflow-y-scroll min-h-screen">
    <div class="topish bg-black h-48"></div>

    <div
      class="wrapper relative h-full -mt-12 pt-16 mb-5 md:w-10/12 lg:w-8/12 md:border md:border-gray-300 md:dark:border-dark1 md:border-solid mx-auto p-5 rounded-md bg-white dark:bg-dark2"
    >
      <div
        class="skeleton img-wrapper w-28 md:w-32 h-28 md:h-32 flex items-center overflow-hidden rounded-full absolute -top-16 left-8 md:left-1/2 md:transform md:-translate-x-1/2 border-8 border-black border-solid bg-gray-200 dark:bg-dark3"
      ></div>
      <span
        class="skeleton mt-4 bg-gray-200 dark:bg-dark3 w-40 h-7 block md:text-center md:mx-auto"
      ></span>
      <span
        class="skeleton mt-5 bg-gray-200 dark:bg-dark3 w-full h-5 block md:text-center md:mx-auto"
      ></span>
      <span
        class="skeleton mt-1.5 bg-gray-200 dark:bg-dark3 w-full h-5 block md:text-center md:mx-auto"
      ></span>
      <span
        class="skeleton mt-1.5 bg-gray-200 dark:bg-dark3 w-52 h-5 block md:text-center md:mx-auto"
      ></span>
    </div>
  </div>
</template>

<style>
.skeleton {
  position: relative;
  overflow: hidden;
}
.skeleton::after {
  content: '';
  position: absolute;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.5),
    hsla(0, 0%, 100%, 0)
  );
  width: 100px;
  height: 100%;
  animation: 1.5s skeleton infinite ease-in-out;
}

@keyframes skeleton {
  to {
    transform: translateX(800%);
  }
}
</style>
