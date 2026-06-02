import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
    },
    // Warn if any chunk exceeds 500 kB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — always needed
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Framer Motion — large, shared by many pages
          'vendor-motion': ['framer-motion'],

          // Lucide icons — tree-shaken but still sizeable
          'vendor-icons': ['lucide-react'],

          // AI assistant (only used on demand)
          'vendor-ai': ['@google/genai'],

          // Admin editor tools (only used on admin routes)
          'vendor-editor': ['@uiw/react-md-editor', '@uiw/react-textarea-code-editor'],
          'vendor-jodit': ['jodit-react'],

          // Markdown rendering
          'vendor-markdown': ['react-markdown', 'dompurify'],
        },
      },
    },
  },

  // Faster dev server
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})
