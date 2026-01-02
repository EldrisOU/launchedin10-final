import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/launchedin10-calculator.html',
          dest: './'
        }
      ]
    })
  ],
  server: {
    proxy: {
      '/calculator': {
        target: 'http://localhost:4050',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:4050',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
