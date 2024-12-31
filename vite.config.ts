import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/vite',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    legacy({
      additionalLegacyPolyfills: ['core-js/stable/object'],
      targets: [
        'Chrome>=55',
        'ios>=12',
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // target: ['chrome55', 'ios12']
  }
})
