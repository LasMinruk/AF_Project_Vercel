import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ important for correct path resolution on Vercel and GitHub
  build: {
    outDir: 'dist',
  },
});
