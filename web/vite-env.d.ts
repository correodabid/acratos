/// <reference types="astro/client" />

// Para importaciones de módulos CSS/SCSS
declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

// Para importaciones de imágenes
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.webp';
// Alias de rutas
declare module '@/*';
declare module '@components/*';
declare module '@styles/*';
declare module '@layouts/*';
declare module '@pages/*';
declare module '@assets/*';
