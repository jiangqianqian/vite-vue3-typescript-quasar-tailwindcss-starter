import { defineConfig } from 'vite'

// Vue 3 单文件组件支持
import vue from '@vitejs/plugin-vue'

// 提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy'

import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { QuasarResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/assets/style/quasar-variables.sass',
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    AutoImport({
      // targets to transform
      // include: [
      //   /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      //   /\.vue$/,
      //   /\.vue\?vue/, // .vue
      //   /\.md$/, // .md
      // ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
        },
      ],
      dts: 'types/auto-imports.d.ts',

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        // globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      resolvers: [QuasarResolver()],
      dts: 'types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            //设置需要独立打包的 npm 包
            const modules = ['quasar', '@quasar', 'vue', '@vue']
            const chunk = modules.find((module) => id.includes(`/node_modules/${module}`))
            return chunk ? `vendor-${chunk}` : 'vendor'
          }
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'xxx',
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },
})
