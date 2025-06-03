import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig({
  base: '/acratos/',
  build: {
    assetsDir: '_astro',
    rollupOptions: {
      output: {
        assetFileNames: '_astro/[name][extname]',
        chunkFileNames: '_astro/[name].[hash].js',
        entryFileNames: '_astro/[name].[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      '/@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
