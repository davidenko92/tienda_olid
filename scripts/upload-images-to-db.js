/**
 * Script para insertar registros de imágenes en PostgreSQL
 *
 * Este script:
 * 1. Escanea las imágenes en /var/www/html/images/originals
 * 2. Obtiene las dimensiones de cada imagen
 * 3. Inserta los registros en la base de datos con las rutas
 *
 * Uso:
 *   node scripts/upload-images-to-db.js
 */

import { readdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import pg from 'pg';
import sharp from 'sharp';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const { Client } = pg;

// Configuración
const IMAGES_DIR = process.env.IMAGES_DIR || '/var/www/html/images/originals';
const THUMBS_DIR = process.env.THUMBS_DIR || '/var/www/html/images/thumbs';

/**
 * Genera un slug a partir del nombre del archivo
 */
function generateSlug(filename) {
  return filename
    .replace(extname(filename), '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Obtiene las dimensiones de una imagen
 */
async function getImageDimensions(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height
    };
  } catch (error) {
    console.error(`Error obteniendo dimensiones de ${imagePath}:`, error.message);
    return { width: 0, height: 0 };
  }
}

/**
 * Convierte nombre de archivo a título legible
 */
function generateTitle(filename) {
  return filename
    .replace(extname(filename), '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Inserta una imagen en la base de datos
 */
async function insertImage(client, imageFile) {
  const slug = generateSlug(imageFile);
  const name = generateTitle(imageFile);
  const ext = extname(imageFile);

  const originalPath = join(IMAGES_DIR, imageFile);
  const thumbPath = join(THUMBS_DIR, imageFile);

  // Obtener dimensiones
  const dimensions = await getImageDimensions(originalPath);

  // Rutas relativas para la BD (como las sirve el backend)
  const dbThumbPath = `images/thumbs/${imageFile}`;
  const dbOriginalPath = `images/originals/${imageFile}`;

  try {
    const query = `
      INSERT INTO products (
        cd_slug,
        cd_name,
        ts_description,
        cd_image_thumb,
        cd_image_full,
        nu_width_px,
        nu_height_px,
        fh_created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (cd_slug) DO UPDATE SET
        cd_name = EXCLUDED.cd_name,
        cd_image_thumb = EXCLUDED.cd_image_thumb,
        cd_image_full = EXCLUDED.cd_image_full,
        nu_width_px = EXCLUDED.nu_width_px,
        nu_height_px = EXCLUDED.nu_height_px
      RETURNING id_product, cd_slug;
    `;

    const values = [
      slug,
      name,
      `Obra de arte "${name}"`, // Descripción por defecto
      dbThumbPath,
      dbOriginalPath,
      dimensions.width,
      dimensions.height
    ];

    const result = await client.query(query, values);
    console.log(`✅ Insertado: ${name} (ID: ${result.rows[0].id_product})`);
    return result.rows[0];
  } catch (error) {
    console.error(`❌ Error insertando ${imageFile}:`, error.message);
    return null;
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando inserción de imágenes en la base de datos...\n');

  // Conectar a PostgreSQL
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('✅ Conectado a PostgreSQL\n');

    // Leer archivos del directorio de originales
    console.log(`📂 Escaneando: ${IMAGES_DIR}\n`);
    const files = await readdir(IMAGES_DIR);

    // Filtrar solo imágenes
    const imageFiles = files.filter(file => {
      const ext = extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    console.log(`📸 Encontradas ${imageFiles.length} imágenes\n`);

    if (imageFiles.length === 0) {
      console.log('⚠️  No se encontraron imágenes');
      return;
    }

    // Procesar cada imagen
    let inserted = 0;
    for (const file of imageFiles) {
      const result = await insertImage(client, file);
      if (result) inserted++;
    }

    console.log(`\n✨ Proceso completado: ${inserted}/${imageFiles.length} imágenes procesadas`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
    console.log('\n👋 Desconectado de PostgreSQL');
  }
}

// Ejecutar
main();
