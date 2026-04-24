import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-sabana': {
        target: 'https://soc-api-gateway.unisabana.edu.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-sabana/, ''),
      },
    },
  },
})