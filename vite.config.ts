import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  publicDir: 'public',
  plugins: [
    {
      name: 'copy-components',
      closeBundle() {
        // Копируем HTML компоненты из src/components в dist/components
        const srcDir = resolve(__dirname, 'src/components');
        const destDir = resolve(__dirname, 'dist/components');

        if (!existsSync(srcDir)) {
          console.log('⚠️ Папка src/components не найдена');
          return;
        }

        function copyFolderRecursive(src, dest) {
          if (!existsSync(src)) return;

          if (!existsSync(dest)) {
            mkdirSync(dest, { recursive: true });
          }

          const files = readdirSync(src);
          files.forEach(file => {
            const srcPath = join(src, file);
            const destPath = join(dest, file);

            if (statSync(srcPath).isDirectory()) {
              copyFolderRecursive(srcPath, destPath);
            } else {
              if (file.endsWith('.html')) {
                copyFileSync(srcPath, destPath);
                console.log(`✅ Скопирован: ${srcPath} -> ${destPath}`);
              }
            }
          });
        }

        copyFolderRecursive(srcDir, destDir);

        // Также копируем папку assets
        const assetsSrc = resolve(__dirname, 'src/assets');
        const assetsDest = resolve(__dirname, 'dist/src/assets');

        if (existsSync(assetsSrc)) {
          if (!existsSync(assetsDest)) {
            mkdirSync(assetsDest, { recursive: true });
          }

          function copyAssets(src, dest) {
            const files = readdirSync(src);
            files.forEach(file => {
              const srcPath = join(src, file);
              const destPath = join(dest, file);

              if (statSync(srcPath).isDirectory()) {
                if (!existsSync(destPath)) {
                  mkdirSync(destPath, { recursive: true });
                }
                copyAssets(srcPath, destPath);
              } else {
                copyFileSync(srcPath, destPath);
                console.log(`✅ Скопирован ассет: ${srcPath} -> ${destPath}`);
              }
            });
          }

          copyAssets(assetsSrc, assetsDest);
        }
      }
    }
  ]
});
