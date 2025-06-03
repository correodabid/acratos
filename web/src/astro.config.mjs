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
    assets: '_astro',
  },
  vite: {
    base: '/acratos',
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          assetFileNames: '_astro/[name][extname]',
          chunkFileNames: '_astro/[name].[hash].js',
          entryFileNames: '_astro/[name].[hash].js',
        },
      },
    },
  },
});
