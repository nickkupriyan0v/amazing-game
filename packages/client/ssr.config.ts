import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
dotenv.config()

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
})
