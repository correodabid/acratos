// Tipos para los componentes de la aplicación
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export type ColorVariant = 'indigo' | 'red' | 'yellow' | 'emerald' | 'blue' | 'purple' | 'rose' | 'cyan' | 'green' | 'amber';

// Base para los ítems de la interfaz
export interface BaseItem {
  title: string;
  description: string;
  icon: string;
  color: ColorVariant;
  gradient: string;
}

// Tipos para las tarjetas de características
export interface CardItem extends BaseItem {
  principle?: number;
  principles?: number[];
}

// Tipos para las estadísticas
export interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: string;
  color: ColorVariant;
  gradient: string;
  principle?: number;
}

// Tipos para los principios
export interface Principle {
  number: string;
  title: string;
  description: string;
}

// Tipos para los colores
export interface ColorClasses {
  bg: string;
  text: string;
  border: string;
  hover: string;
}

export type ColorMap = {
  [key in ColorVariant]: ColorClasses;
};
