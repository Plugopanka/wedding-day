import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Важно для относительных путей
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3001
  }
});
