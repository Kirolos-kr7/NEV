<template>
  <router-view />
</template>

<style>
.dark body {
  background: #191919;
}

body {
  background: rgba(238, 240, 241, 1);
}

#app {
  font-family: Quicksand, Helvetica, sans-serif;
}

* {
  margin: 0;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 15px;
}

::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background: #c9c9c9;
  border: 3px solid #eef0f1;
}

::-webkit-scrollbar-thumb:hover {
  background: #9c9494;
}

::-webkit-scrollbar-track-piece {
  margin: 3px;
}

::-webkit-scrollbar {
  background: #eef0f1;
}

.dark ::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background: #333;
  border: 3px solid #191919;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #333;
}

.dark ::-webkit-scrollbar {
  background: #191919;
}

.box:hover .lined {
  width: 100%;
}
.lined {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0px;
  height: 1px;
}

.fadeIn-enter-active {
  transition: opacity 0.5s ease;
}

.fadeIn-enter-from {
  opacity: 0;
}

.fadeInDown-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fadeInDown-enter-from {
  opacity: 0;
  position: absolute;
  transform: translateY(-10px);
}
</style>
