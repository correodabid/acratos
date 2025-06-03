// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://correodabid.github.io',
  base: '/acratos',
  integrations: [
    tailwind(),
    sitemap({
      customPages: ['https://correodabid.github.io/acratos/']
    })
  ],
  output: 'static',
  build: {
    assets: '_astro',
    assetsInlineLimit: 0, // Forzar a que los assets sean archivos separados
  },
  vite: {
    configFile: '../vite.config.js',
    base: '/acratos/'
  },
  experimental: {
    assets: {
      staticMode: true,
    },
  },
});
