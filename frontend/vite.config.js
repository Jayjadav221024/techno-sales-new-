import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src/admin') },
      { find: /^react-stately\/private\/(.*)$/, replacement: path.resolve(__dirname, './node_modules/react-stately/dist/private/$1.js') },
      { find: /^react-stately\/(.*)$/, replacement: path.resolve(__dirname, './node_modules/react-stately/dist/exports/$1.js') },
      { find: 'react-aria/CollectionBuilder', replacement: path.resolve(__dirname, './node_modules/react-aria/dist/private/collections/CollectionBuilder.mjs') },
      { find: /^react-aria\/(.*)$/, replacement: path.resolve(__dirname, './node_modules/react-aria/dist/exports/$1.mjs') },
    ],
  },
  optimizeDeps: {
    exclude: ['@untitledui/icons'],
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:7002',
        changeOrigin: true,
      },
    },
  },
})
