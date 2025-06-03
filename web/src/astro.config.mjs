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
    assets: 'assets',
  },
  vite: {
    base: '/acratos/',
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
  },
  // Desactivar prefijos de ruta para assets
  experimental: {
    assets: {
      staticMode: false,
    },
  },
});
