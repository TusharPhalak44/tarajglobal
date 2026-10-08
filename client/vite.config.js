import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression({ algorithm: 'gzip' })],
  resolve: ({
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@api': path.resolve(__dirname, './src/api'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@seo': path.resolve(__dirname, './src/seo'),
      '@animations': path.resolve(__dirname, './src/animations'),
    },
  }),
  server: {
    host: true,
    port: 3001,
    strictPort: false,   // allow fallback if 3001 is taken
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('[proxy error]', err.message)
          })
        },
      },
      '/uploads': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/sitemap.xml': {
        target: 'http://localhost:5001/api/seo/sitemap.xml',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/sitemap.xml$/, '')
      },
      '/robots.txt': {
        target: 'http://localhost:5001/api/seo/robots.txt',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/robots.txt$/, '')
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  }
})
