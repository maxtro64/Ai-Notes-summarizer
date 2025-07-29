import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
    proxy: {
      '/api': {
        target: 'https://ai-notes-summarizer-6.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
