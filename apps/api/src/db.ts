/**
 * Módulo de conexión a PostgreSQL
 * Gestiona el pool de conexiones a la base de datos tienda_d4ia
 */

import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Cargar variables de entorno desde la raíz del proyecto solo en desarrollo
// En producción (Docker), las variables ya están inyectadas por docker-compose
if (process.env.NODE_ENV !== 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const rootDir = join(__dirname, '..', '..', '..');
  dotenv.config({ path: join(rootDir, '.env') });
}

const { Pool } = pg;

// Configuración del pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Máximo de conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Evento: conexión exitosa
pool.on('connect', () => {
  console.log('✓ Nueva conexión establecida con PostgreSQL');
});

// Evento: error en el pool
pool.on('error', (err) => {
  console.error('✗ Error inesperado en el pool de conexiones:', err);
  process.exit(-1);
});

/**
 * Ejecuta una query en la base de datos
 * @param text - Texto SQL de la consulta
 * @param params - Parámetros de la consulta (opcional)
 * @returns Resultado de la consulta
 */
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Query ejecutada en ${duration}ms:`, { text, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error en query:', error);
    throw error;
  }
};

/**
 * Obtiene un cliente del pool para ejecutar transacciones
 * @returns Cliente de PostgreSQL
 */
export const getClient = async () => {
  const client = await pool.connect();
  const query = client.query.bind(client);
  const release = client.release.bind(client);

  // Timeout para evitar que los clientes queden bloqueados
  const timeout = setTimeout(() => {
    console.error('✗ Cliente no liberado después de 5 segundos');
  }, 5000);

  // Override del método release para limpiar el timeout
  client.release = () => {
    clearTimeout(timeout);
    return release();
  };

  return client;
};

// Exportar el pool para casos especiales
export default pool;
