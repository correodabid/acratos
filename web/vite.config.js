import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/acratos/' : '/',
  build: {
    assetsInlineLimit: 0,
  },
});
