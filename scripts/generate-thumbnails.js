/**
 * Thumbnail Generator
 * Genera thumbnails automáticamente a partir de las imágenes originales
 * Usage: node scripts/generate-thumbnails.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Paths
const originalsPath = path.join(rootDir, 'data', 'images', 'originals');
const thumbsPath = path.join(rootDir, 'data', 'images', 'thumbs');

// Thumbnail config
const THUMB_WIDTH = 800;  // Ancho máximo del thumbnail
const THUMB_QUALITY = 85; // Calidad JPEG (1-100)

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║  🖼️  D4IA Gallery - Generador de Thumbnails          ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Asegurar que existe la carpeta de thumbnails
if (!fs.existsSync(thumbsPath)) {
  fs.mkdirSync(thumbsPath, { recursive: true });
  console.log('✓ Carpeta de thumbnails creada\n');
}

// Obtener archivos de imágenes
const getImageFiles = (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });
  } catch (error) {
    console.error(`❌ Error al leer directorio ${dirPath}:`, error.message);
    return [];
  }
};

// Generar thumbnail para una imagen
const generateThumbnail = async (filename) => {
  const inputPath = path.join(originalsPath, filename);
  const outputPath = path.join(thumbsPath, filename);

  try {
    // Verificar si ya existe el thumbnail
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  ${filename} (thumbnail ya existe, omitido)`);
      return { success: true, skipped: true };
    }

    // Generar thumbnail con Sharp
    await sharp(inputPath)
      .resize(THUMB_WIDTH, null, {
        withoutEnlargement: true, // No agrandar imágenes pequeñas
        fit: 'inside'
      })
      .jpeg({ quality: THUMB_QUALITY })
      .toFile(outputPath);

    // Obtener tamaños para estadísticas
    const originalSize = fs.statSync(inputPath).size;
    const thumbSize = fs.statSync(outputPath).size;
    const reduction = ((1 - thumbSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${filename}`);
    console.log(`  └─ ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(thumbSize / 1024).toFixed(0)}KB (${reduction}% reducción)\n`);

    return { success: true, skipped: false };
  } catch (error) {
    console.error(`❌ Error al procesar ${filename}:`, error.message);
    return { success: false, skipped: false };
  }
};

// Función principal
const generateAll = async () => {
  console.log('📁 Escaneando imágenes originales...\n');
  console.log(`   Ruta: ${originalsPath}\n`);

  const imageFiles = getImageFiles(originalsPath);

  if (imageFiles.length === 0) {
    console.log('❌ No se encontraron imágenes en la carpeta de originales!\n');
    return;
  }

  console.log(`✓ Encontradas ${imageFiles.length} imagen(es)\n`);
  console.log('═══════════════════════════════════════════════════════\n');
  console.log('🔄 Generando thumbnails...\n');

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  // Procesar cada imagen
  for (const filename of imageFiles) {
    const result = await generateThumbnail(filename);

    if (result.success && result.skipped) {
      skipped++;
    } else if (result.success) {
      generated++;
    } else {
      failed++;
    }
  }

  // Resumen
  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📊 RESUMEN:\n');
  console.log(`   ✅ Generados: ${generated}`);
  console.log(`   ⏭️  Omitidos: ${skipped}`);
  console.log(`   ❌ Fallidos: ${failed}`);
  console.log(`   📁 Total: ${imageFiles.length}\n`);

  if (generated > 0) {
    console.log(`💾 Thumbnails guardados en: ${thumbsPath}\n`);
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('✅ ¡Listo! Ahora puedes ejecutar el script add-images.js\n');
    console.log('   Comando: node scripts/add-images.js\n');
  }
};

// Ejecutar
generateAll().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
