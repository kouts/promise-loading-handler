import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import del from 'rollup-plugin-delete'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    del({ targets: 'dist/favicon.ico', hook: 'writeBundle' }),
    vue(),
    // https://github.com/qmhc/vite-plugin-dts#options
    dts({
      exclude: ['playground/**', 'tests/**'],
      outDir: 'dist/types',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@playground': resolve(__dirname, './playground'),
      '@root': resolve(__dirname, './'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/createLoader.ts'),
      name: 'PromiseLoadingHandler',
      fileName: (format) => `promise-loading-handler.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
