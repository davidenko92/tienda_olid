-- Migration: Agregar campos de precio, tipo, técnica y disponibilidad
-- Fecha: 2025-10-25

-- Agregar nuevas columnas a la tabla products
ALTER TABLE products
ADD COLUMN nu_price DECIMAL(10,2) DEFAULT 150.00,
ADD COLUMN cd_type VARCHAR(20) DEFAULT 'original',
ADD COLUMN cd_technique VARCHAR(255) DEFAULT 'Técnica mixta',
ADD COLUMN cd_status VARCHAR(20) DEFAULT 'disponible';

-- Agregar constraint para validar los valores de status
ALTER TABLE products
ADD CONSTRAINT chk_status CHECK (cd_status IN ('disponible', 'reservado', 'vendido'));

-- Actualizar productos existentes con valores por defecto
UPDATE products
SET
    nu_price = 150.00,
    cd_type = 'original',
    cd_technique = 'Técnica mixta',
    cd_status = 'disponible'
WHERE nu_price IS NULL OR nu_price = 0;

-- Mostrar resultados
SELECT id_product, cd_slug, cd_name, nu_price, cd_type, cd_technique, cd_status
FROM products
ORDER BY fh_created_at DESC;
