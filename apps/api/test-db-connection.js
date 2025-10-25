/**
 * Script de prueba para verificar la conexión a PostgreSQL
 * Ejecutar con: node test-db-connection.js
 */

import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', '..');
dotenv.config({ path: join(rootDir, '.env') });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  console.log('🔍 Probando conexión a PostgreSQL...');
  console.log('📝 DATABASE_URL:', process.env.DATABASE_URL);
  console.log('');

  try {
    // Test 1: Conexión básica
    console.log('Test 1: Conexión a la base de datos...');
    const client = await pool.connect();
    console.log('✓ Conexión exitosa!');

    // Test 2: Verificar versión de PostgreSQL
    console.log('\nTest 2: Versión de PostgreSQL...');
    const versionResult = await client.query('SELECT version()');
    console.log('✓', versionResult.rows[0].version);

    // Test 3: Verificar que existe la tabla products
    console.log('\nTest 3: Verificando tabla products...');
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'products'
      );
    `);

    if (tableCheck.rows[0].exists) {
      console.log('✓ Tabla products existe');

      // Test 4: Contar productos
      console.log('\nTest 4: Contando productos...');
      const countResult = await client.query('SELECT COUNT(*) FROM products');
      console.log('✓ Total de productos:', countResult.rows[0].count);

      // Test 5: Mostrar productos
      console.log('\nTest 5: Listando productos...');
      const productsResult = await client.query('SELECT id_product, cd_slug, cd_name FROM products');
      console.log('✓ Productos en la base de datos:');
      productsResult.rows.forEach(product => {
        console.log(`  - [${product.id_product}] ${product.cd_name} (${product.cd_slug})`);
      });
    } else {
      console.log('✗ Tabla products NO existe');
      console.log('  → Ejecuta el script init.sql en pgAdmin para crear la tabla');
    }

    client.release();

    console.log('\n╔════════════════════════════════════════╗');
    console.log('║  ✅ TODOS LOS TESTS PASARON           ║');
    console.log('╚════════════════════════════════════════╝\n');

  } catch (error) {
    console.error('\n╔════════════════════════════════════════╗');
    console.error('║  ❌ ERROR EN LA CONEXIÓN               ║');
    console.error('╚════════════════════════════════════════╝');
    console.error('\nDetalles del error:', error.message);

    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Solución: Asegúrate de que PostgreSQL está corriendo');
      console.error('   - Abre pgAdmin y verifica que el servidor está activo');
    } else if (error.code === '3D000') {
      console.error('\n💡 Solución: La base de datos "tienda_d4ia" no existe');
      console.error('   - Crea la base de datos en pgAdmin');
      console.error('   - Right-click en Databases → Create → Database');
      console.error('   - Nombre: tienda_d4ia');
    } else if (error.code === '28P01') {
      console.error('\n💡 Solución: Credenciales incorrectas');
      console.error('   - Verifica usuario y contraseña en el archivo .env');
      console.error('   - Verifica que el usuario "d4ia" existe en PostgreSQL');
    }
  } finally {
    await pool.end();
  }
}

testConnection();
