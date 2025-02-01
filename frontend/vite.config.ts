import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,  // Set the port to the same as the backend (5000)
    proxy: {
      // Proxy API requests to your backend (Express)
      '/api': 'http://localhost:5000',
    },
  },
})
