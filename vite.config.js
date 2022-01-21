import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2500,
  },
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 3000000,
      },
      includeAssets: [
        '/favicon.ico',
        '/robots.txt',
        '/apple-touch-icon.png',
        '/pwa-192x192.png',
        '/pwa-512x512.png',
      ],
      manifest: {
        name: 'NEV',
        short_name: 'NEV',
        start_url: '/',
        theme_color: '#252525',
        background_color: '#191919',
        description: 'NEV - Blog For The Developers 🔥',
        display: 'standalone',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
