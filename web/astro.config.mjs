// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://correodabid.github.io/acratos',
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
    },
  },
});