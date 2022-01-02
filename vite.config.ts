import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import del from 'rollup-plugin-delete'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [del({ targets: 'dist/favicon.ico', hook: 'writeBundle' }), vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@playground': resolve(__dirname, './playground'),
      '@root': resolve(__dirname, './')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/createLoader.ts'),
      name: 'PromiseLoadingHandler',
      fileName: (format) => `promise-loading-handler.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
