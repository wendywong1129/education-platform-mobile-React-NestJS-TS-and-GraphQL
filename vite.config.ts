import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import postCssPxToViewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', 
    port: 3333,
    open: true, 
    cors: true, 
    proxy: {
      '/graphql': 'http://localhost:3000'
    }
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ]
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToViewport({
          unitToConvert: 'px', 
          viewportWidth: 390, 
          unitPrecision: 3, 
          propList: ['*'], 
          viewportUnit: 'vw', 
          fontViewportUnit: 'vw', 
          selectorBlackList: ['ignore-'],
          minPixelValue: 1, 
          mediaQuery: true, 
          replace: true, 
          // exclude: [/node_modules/], 
          exclude: [],
          landscape: false 
        })
      ]
    }
  },
})
