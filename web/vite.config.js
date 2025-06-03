import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig({
  base: '/acratos/',
  build: {
    assetsDir: '_astro',
    emptyOutDir: true,
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
  server: {
    fs: {
      strict: false
    },
    base: '/acratos/'
  },
  publicDir: 'public',
  plugins: [
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/(href|src)="\/(?!\/)/g, '$1="/acratos/');
      }
    }
  ]
});
