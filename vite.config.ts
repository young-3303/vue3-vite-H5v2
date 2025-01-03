import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type PluginOption} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vitePluginRequire from 'vite-plugin-require'
// import ptw from "postcss-px-to-viewport";

const plugins: PluginOption [] = [
  vue(),
  // 兼容jsx语法
  vueJsx(),
  // 兼容require方法写法
  (vitePluginRequire as any).default()
]
// https://vite.dev/config/
export default defineConfig(() => {
  const needLegacy: boolean = true
  if (needLegacy) {
    plugins.push(legacy({
      targets: [
        'Chrome>=55',
        'ios>=12',
      ]
    }))
  }
  return {
    base: '/vite',
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
      // if you need
      // postcss: {
      //   plugins: [
      //     ptw({
      //       unitToConvert: 'px',
      //       viewportWidth: 375,
      //       unitPrecision: 6,
      //       viewportUnit: 'vw',
      //       fontViewportUnit: 'vw',
      //       selectorBlackList: ['.ignore'],
      //       minPixelValue: 1
      //     })
      //   ]
      // },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/mixin.scss";`
        }
      },
    },
    build: {
      // target: ['chrome55', 'ios12']
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
          // 将入口chunk和异步chunk输出到js目录下
          entryFileNames: `assets/js/[name].js`,
          chunkFileNames: `assets/js/[name]-[hash].js`,
          assetFileNames: ({name}) => {
            if (/\.(css|scss|sass)$/.test(name || '')) {
              return `assets/css/[name]-[hash].[ext]`;
            }
            // 其他资源（如图片、字体等）保持在assets目录下
            return `assets/[name]-[hash].[ext]`;
          }

        }
      }
    }
  }
})
