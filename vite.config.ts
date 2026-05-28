import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Базовый путь для деплоя (если сайт будет в подпапке, например username.github.io/repo-name/)
  // Для обычного домена или Vercel можно оставить '/'
  base: '/',

  // Настройки сервера для разработки
  server: {
    port: 3000,           // Порт для локального сервера
    open: true,           // Автоматически открывать браузер при старте
  },

  // Настройки сборки
  build: {
    // Папка, куда будет собираться итоговый проект
    outDir: 'dist',

    // Очищать папку dist перед сборкой
    emptyOutDir: true,

    // Настройки Rollup (сборщика, который использует Vite)
    rollupOptions: {
      // Точки входа для мультистраничного приложения
      input: {
        // Главная страница - приглашение на свадьбу
        main: resolve(__dirname, 'src/pages/main/index.html'),

        // Раскомментируй, когда добавишь другие страницы:
        // rsvp: resolve(__dirname, 'src/pages/rsvp/index.html'),
        // gallery: resolve(__dirname, 'src/pages/gallery/index.html'),
        // story: resolve(__dirname, 'src/pages/story/index.html'),
        // location: resolve(__dirname, 'src/pages/location/index.html'),
      },
    },
  },

  // Настройки для алиасов (упрощенные пути импорта)
  resolve: {
    alias: {
      // Теперь можно писать import Component from '@/js/modules/Component'
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/js/components'),
      '@modules': resolve(__dirname, './src/js/modules'),
      '@styles': resolve(__dirname, './src/styles'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },

  // Оптимизация зависимостей
  optimizeDeps: {
    include: [], // Сюда можно добавить тяжелые библиотеки для предварительной загрузки
  },

  // Плагины (пока пусто, но можно добавить, например, для PWA)
  plugins: [],
});
