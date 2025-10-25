# Carpeta de Imágenes

Esta carpeta almacena las imágenes de los cuadros y láminas de la galería D4IA.

## Estructura

```
images/
├── originals/     # Imágenes originales en 600 DPI
└── thumbs/        # Miniaturas para vista de galería
```

## Agregar Imágenes

1. **Originales**: Coloca las imágenes escaneadas en 600 DPI en `originals/`
2. **Miniaturas**: Crea versiones reducidas (ej. 400x300px) en `thumbs/`

## Nombres de Archivos

Los nombres deben coincidir con el campo `cd_slug` en la base de datos.

**Ejemplo para el producto con slug "cuadro-paisaje-montanas":**
- `originals/cuadro-paisaje-montanas.jpg`
- `thumbs/cuadro-paisaje-montanas.jpg`

## Formatos Soportados

- JPG/JPEG (recomendado)
- PNG
- WebP

## Recomendaciones

- **Originales**: Máxima calidad, 600 DPI mínimo
- **Miniaturas**: 400-600px de ancho, optimizadas para web
- Mantener los mismos nombres de archivo en ambas carpetas
- Usar slugs descriptivos (ej. `paisaje-montanas`, no `img001`)
