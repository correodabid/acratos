// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://correodabid.github.io',
  base: '/acratos',
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: '', // Usar raíz en lugar de _astro
  },
  vite: {
    base: '', // Usar ruta relativa
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: '[name][extname]', // Sin prefijo de directorio
          chunkFileNames: '[name].[hash].js',
          entryFileNames: '[name].[hash].js',
        },
      },
    },
  },
  // Configuración específica para GitHub Pages
  experimental: {
    assets: {
      staticMode: true,
    },
  },
});
