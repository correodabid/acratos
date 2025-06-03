import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const docsDir = join(__dirname, '..', 'docs');

// Solo ejecutar en producción (cuando existe la carpeta docs)
const isProduction = existsSync(docsDir);

function fixFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    
    if (isProduction) {
      console.log(`Processing ${filePath} for production...`);
      
      // Eliminar todas las etiquetas base existentes
      content = content.replace(/<base[^>]*>/g, '');
      
      // Añadir la etiqueta base correcta justo después de <head>
      content = content.replace('<head>', '<head>\n<base href="/acratos/">');
      
      // Corregir rutas que ya tengan /acratos/acratos/
      content = content.replace(/\/acratos\/acratos\//g, '/acratos/');
      
      // Reemplazar rutas de recursos que no sean la etiqueta base
      content = content.replace(/(<[^>]*(href|src)=")\/+(?!\/)(?![^<]*base)/g, '$1/acratos/');
      
      // Reemplazar rutas en estilos
      content = content.replace(/(url\(['"]?)\/(?!\/)/g, '$1/acratos/');
      
      // Asegurar que las rutas de los estilos tengan el prefijo correcto
      content = content.replace(/"\/_astro\//g, '"/acratos/_astro/');
      
      // Asegurar que la etiqueta base tenga el valor correcto
      content = content.replace(/<base[^>]*href=["'][^"']*["'][^>]*>/, '<base href="/acratos/">');
      
      writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed paths in ${filePath}`);
      
      // Mostrar un fragmento del contenido para depuración
      console.log('Content sample:', content.substring(0, 200));
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function processDirectory(directory) {
  const files = readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = join(directory, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
      fixFile(fullPath);
    }
  });
}

// Procesar el directorio docs
processDirectory(docsDir);

console.log('Finished fixing paths!');
