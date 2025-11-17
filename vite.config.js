import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	base: '/mtleinon/todolistreact', // add this property and the value is the name of your repository
  plugins: [react()],
	test: {
    globals: true,
    environment: 'jsdom',
  }
})
