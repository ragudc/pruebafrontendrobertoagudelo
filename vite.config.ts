import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server:
    mode === 'development'
      ? {
          proxy: {
            '/api': {
              target: 'https://backendservertest.vercel.app',
              changeOrigin: true,
              secure: true,
              rewrite: path => path.replace(/^\/api/, '/api'),
            },
          },
        }
      : undefined,     
}));
