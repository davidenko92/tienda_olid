/**
 * D4IA Gallery API Server
 * Backend con Fastify + PostgreSQL para galería de cuadros/láminas
 */

import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { query } from './db.js';

// Configuración de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', '..', '..');

// Cargar variables de entorno
dotenv.config({ path: join(rootDir, '.env') });

// Inicializar Fastify con logging
const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Configurar CORS
await fastify.register(fastifyCors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
});

// Servir archivos estáticos (imágenes)
await fastify.register(fastifyStatic, {
  root: join(rootDir, 'data', 'images'),
  prefix: '/images/',
  decorateReply: false,
});

// Interface para el producto
interface Product {
  id_product: number;
  cd_slug: string;
  cd_name: string;
  ts_description: string;
  cd_image_thumb: string;
  cd_image_full: string;
  nu_width_px: number;
  nu_height_px: number;
  fh_created_at: Date;
}

/**
 * Ruta de salud del servidor
 */
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

/**
 * GET /products
 * Obtiene todos los productos de la galería
 */
fastify.get<{
  Reply: Product[] | { error: string };
}>('/products', async (request, reply) => {
  try {
    const result = await query(
      'SELECT * FROM products ORDER BY fh_created_at DESC'
    );

    return result.rows;
  } catch (error) {
    fastify.log.error(error);
    reply.status(500);
    return { error: 'Error al obtener productos' };
  }
});

/**
 * GET /products/:slug
 * Obtiene un producto específico por su slug
 */
fastify.get<{
  Params: { slug: string };
  Reply: Product | { error: string };
}>('/products/:slug', async (request, reply) => {
  try {
    const { slug } = request.params;

    const result = await query(
      'SELECT * FROM products WHERE cd_slug = $1',
      [slug]
    );

    if (result.rows.length === 0) {
      reply.status(404);
      return { error: 'Producto no encontrado' };
    }

    return result.rows[0];
  } catch (error) {
    fastify.log.error(error);
    reply.status(500);
    return { error: 'Error al obtener el producto' };
  }
});

/**
 * GET /products/id/:id
 * Obtiene un producto específico por su ID
 */
fastify.get<{
  Params: { id: string };
  Reply: Product | { error: string };
}>('/products/id/:id', async (request, reply) => {
  try {
    const { id } = request.params;

    const result = await query(
      'SELECT * FROM products WHERE id_product = $1',
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      reply.status(404);
      return { error: 'Producto no encontrado' };
    }

    return result.rows[0];
  } catch (error) {
    fastify.log.error(error);
    reply.status(500);
    return { error: 'Error al obtener el producto' };
  }
});

/**
 * Iniciar servidor
 */
const start = async () => {
  try {
    const PORT = parseInt(process.env.PORT || '3000');
    const HOST = '0.0.0.0';

    await fastify.listen({ port: PORT, host: HOST });

    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   🎨 D4IA Gallery API Server          ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║   🚀 Server: http://localhost:${PORT}    ║`);
    console.log(`║   🗄️  Database: tienda_d4ia            ║`);
    console.log(`║   📁 Images: /images/*                 ║`);
    console.log('╚════════════════════════════════════════╝\n');

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
