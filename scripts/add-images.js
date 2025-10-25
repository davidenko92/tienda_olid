/**
 * Image Scanner & SQL Generator
 * Scans the images/originals folder and generates SQL INSERT statements
 * Usage: node scripts/add-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import imageSize from 'image-size';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Paths
const originalsPath = path.join(rootDir, 'data', 'images', 'originals');
const thumbsPath = path.join(rootDir, 'data', 'images', 'thumbs');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║  🖼️  D4IA Gallery - Image Scanner & SQL Generator    ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Get all image files from originals folder
const getImageFiles = (dirPath) => {
  try {
    const files = fs.readdirSync(dirPath);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
    return [];
  }
};

// Get image dimensions
const getImageDimensions = (filePath) => {
  try {
    const dimensions = imageSize(filePath);
    return { width: dimensions.width, height: dimensions.height };
  } catch (error) {
    console.warn(`⚠️  Could not read dimensions for ${filePath}`);
    return { width: 1200, height: 1600 }; // Default fallback
  }
};

// Generate slug from filename
const generateSlug = (filename) => {
  const nameWithoutExt = path.parse(filename).name;
  return `obra-${nameWithoutExt}`;
};

// Generate product name
const generateName = (filename) => {
  const nameWithoutExt = path.parse(filename).name;
  return `Obra de Arte ${nameWithoutExt}`;
};

// Generate SQL INSERT statement
const generateSQL = (imageData) => {
  return `(
    '${imageData.slug}',
    '${imageData.name}',
    '${imageData.description}',
    '${imageData.thumbPath}',
    '${imageData.originalPath}',
    ${imageData.widthCm},
    ${imageData.heightCm},
    ${imageData.price},
    '${imageData.type}',
    '${imageData.technique}',
    '${imageData.status}'
)`;
};

// Main function
const scanAndGenerate = () => {
  console.log('📁 Scanning directories...\n');
  console.log(`   Originals: ${originalsPath}`);
  console.log(`   Thumbnails: ${thumbsPath}\n`);

  const originalFiles = getImageFiles(originalsPath);

  if (originalFiles.length === 0) {
    console.log('❌ No images found in originals folder!');
    console.log('   Please add images to: data/images/originals/\n');
    return;
  }

  console.log(`✓ Found ${originalFiles.length} image(s)\n`);

  const imageDataList = [];
  const missingThumbs = [];

  // Process each image
  originalFiles.forEach(filename => {
    const originalPath = path.join(originalsPath, filename);
    const thumbPath = path.join(thumbsPath, filename);

    // Check if thumbnail exists
    if (!fs.existsSync(thumbPath)) {
      missingThumbs.push(filename);
      return;
    }

    // Get dimensions
    const dimensions = getImageDimensions(originalPath);

    // Generate data
    const imageData = {
      filename,
      slug: generateSlug(filename),
      name: generateName(filename),
      description: `Obra de arte digitalizada en alta resolución (600 dpi). Imagen escaneada profesionalmente.`,
      thumbPath: `images/thumbs/${filename}`,
      originalPath: `images/originals/${filename}`,
      widthCm: (dimensions.width / 236.22).toFixed(1),
      heightCm: (dimensions.height / 236.22).toFixed(1),
      price: 150.00,
      type: 'original',
      technique: 'Técnica mixta',
      status: 'disponible'
    };

    imageDataList.push(imageData);

    console.log(`✓ ${filename}`);
    console.log(`  └─ ${imageData.widthCm} × ${imageData.heightCm} cm`);
    console.log(`  └─ Slug: ${imageData.slug}\n`);
  });

  // Show warnings for missing thumbnails
  if (missingThumbs.length > 0) {
    console.log('\n⚠️  WARNING: Missing thumbnails for:');
    missingThumbs.forEach(file => console.log(`   - ${file}`));
    console.log('   Please create thumbnails for these images!\n');
  }

  // Generate SQL
  if (imageDataList.length === 0) {
    console.log('❌ No valid image pairs (original + thumbnail) found!\n');
    return;
  }

  console.log('═══════════════════════════════════════════════════════\n');
  console.log('📋 GENERATED SQL (Copy and paste into pgAdmin):\n');
  console.log('═══════════════════════════════════════════════════════\n');

  const sqlValues = imageDataList.map(data => generateSQL(data)).join(',\n');

  const fullSQL = `INSERT INTO products (cd_slug, cd_name, ts_description, cd_image_thumb, cd_image_full, cd_width_cm, cd_height_cm, nu_price, cd_type, cd_technique, cd_status)
VALUES
${sqlValues};`;

  console.log(fullSQL);

  console.log('\n═══════════════════════════════════════════════════════\n');
  console.log('📝 Instructions:');
  console.log('   1. Copy the SQL above');
  console.log('   2. Open pgAdmin → tienda_d4ia database');
  console.log('   3. Open Query Tool (Tools → Query Tool)');
  console.log('   4. Paste and execute the SQL');
  console.log('   5. Refresh your browser at http://localhost:5173\n');
  console.log('═══════════════════════════════════════════════════════\n');

  // Save to file
  const outputPath = path.join(rootDir, 'data', 'db', 'generated-inserts.sql');
  fs.writeFileSync(outputPath, fullSQL, 'utf8');
  console.log(`💾 SQL also saved to: ${outputPath}\n`);
};

// Run
scanAndGenerate();
