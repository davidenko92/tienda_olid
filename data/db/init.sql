-- D4IA Gallery Database Schema
-- Inicialización de la base de datos tienda_d4ia

-- Eliminar tabla si existe (útil para desarrollo)
DROP TABLE IF EXISTS products CASCADE;

-- Crear tabla de productos
CREATE TABLE products (
    id_product SERIAL PRIMARY KEY,
    cd_slug VARCHAR(100) UNIQUE NOT NULL,
    cd_name VARCHAR(255) NOT NULL,
    ts_description TEXT,
    cd_image_thumb VARCHAR(500) NOT NULL,
    cd_image_full VARCHAR(500) NOT NULL,
    nu_width_px INTEGER NOT NULL,
    nu_height_px INTEGER NOT NULL,
    nu_price DECIMAL(10,2) DEFAULT 150.00,
    cd_type VARCHAR(20) DEFAULT 'original',
    cd_technique VARCHAR(255) DEFAULT 'Técnica mixta',
    cd_status VARCHAR(20) DEFAULT 'disponible',
    fh_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_status CHECK (cd_status IN ('disponible', 'reservado', 'vendido'))
);

-- Crear índice para búsquedas por slug
CREATE INDEX idx_products_slug ON products(cd_slug);

-- Insertar datos con las imágenes reales subidas
INSERT INTO products (cd_slug, cd_name, ts_description, cd_image_thumb, cd_image_full, nu_width_px, nu_height_px)
VALUES
(
    'obra-111',
    'Obra de Arte 111',
    'Obra de arte digitalizada en alta resolución (200 dpi). Imagen escaneada profesionalmente con dimensiones de 1173x1699 píxeles.',
    'images/thumbs/111.jpg',
    'images/originals/111.jpg',
    1173,
    1699
),
(
    'obra-112',
    'Obra de Arte 112',
    'Obra de arte digitalizada en alta resolución (200 dpi). Imagen escaneada profesionalmente con dimensiones de 1175x1675 píxeles.',
    'images/thumbs/112.jpg',
    'images/originals/112.jpg',
    1175,
    1675
),
(
    'obra-119',
    'Obra de Arte 119',
    'Obra de arte digitalizada en alta resolución (200 dpi). Imagen escaneada profesionalmente con dimensiones de 1162x1638 píxeles.',
    'images/thumbs/119.jpg',
    'images/originals/119.jpg',
    1162,
    1638
);

-- Mostrar datos insertados
SELECT * FROM products;
