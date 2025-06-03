// Utilidad para manejar rutas relativas en desarrollo y producción
export function getLink(path: string): string {
  // En producción, las rutas ya incluyen /acratos
  if (import.meta.env.PROD) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  // En desarrollo, las rutas son relativas a la raíz
  return path.startsWith('/') ? path : `/${path}`;
}
