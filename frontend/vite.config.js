import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  /*
  // Ignora messaggio sulla chunk troppo grande - Probabilmente legato a Lottie-Web
  build: {
    chunkSizeWarningLimit: 1600,
  }, */
  
})

