<template>
  <router-view />
</template>

<style>
@font-face {
  font-family: SegoeUI;
  src: local('Segoe UI Light'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff2)
      format('woff2'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff)
      format('woff'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.ttf)
      format('truetype');
  font-weight: 100;
}

@font-face {
  font-family: SegoeUI;
  src: local('Segoe UI Semilight'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff2)
      format('woff2'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff)
      format('woff'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.ttf)
      format('truetype');
  font-weight: 200;
}

@font-face {
  font-family: SegoeUI;
  src: local('Segoe UI'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2)
      format('woff2'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff)
      format('woff'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf)
      format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: SegoeUI;
  src: local('Segoe UI Bold'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff2)
      format('woff2'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff)
      format('woff'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.ttf)
      format('truetype');
  font-weight: 600;
}

@font-face {
  font-family: SegoeUI;
  src: local('Segoe UI Semibold'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2)
      format('woff2'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff)
      format('woff'),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.ttf)
      format('truetype');
  font-weight: 700;
}

.dark body {
  background: #191919;
}

body {
  background: rgba(238, 240, 241, 1);
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  border: 3px solid #fbfcfb;
}

::-webkit-scrollbar-thumb:hover {
  background: #9c9494;
}

::-webkit-scrollbar-track-piece {
  margin: 3px;
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
</style>
