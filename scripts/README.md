# Scripts de Gestión de Imágenes

Scripts para subir imágenes al VPS e insertarlas en la base de datos PostgreSQL.

## Proceso completo

### 1. Preparar las imágenes localmente

Asegúrate de tener tus imágenes en:
- `data/images/originals/` - Imágenes originales (600 DPI)
- `data/images/thumbs/` - Miniaturas

**Importante:** Los nombres de archivo en `originals/` y `thumbs/` deben coincidir.

### 2. Subir imágenes al VPS

#### En Windows (PowerShell):
```powershell
cd scripts
.\upload-images-to-vps.ps1
```

#### En Linux/Mac (Bash):
```bash
cd scripts
chmod +x upload-images-to-vps.sh
./upload-images-to-vps.sh
```

#### Usando FileZilla (alternativa):
1. Conectar al VPS via SFTP: `148.230.117.58`
2. Subir carpetas a:
   - Local: `data/images/originals/` → Remoto: `/var/www/html/images/originals/`
   - Local: `data/images/thumbs/` → Remoto: `/var/www/html/images/thumbs/`

### 3. Insertar registros en PostgreSQL

Este paso se ejecuta **en el VPS**, no en local.

```bash
# Conectar al VPS
ssh root@148.230.117.58

# Ir al directorio del proyecto
cd /var/www/d4ia-gallery/scripts

# Instalar dependencias (solo la primera vez)
npm install

# Ejecutar el script
npm run upload-db
```

El script:
- ✅ Escanea `/var/www/html/images/originals/`
- ✅ Obtiene dimensiones de cada imagen con `sharp`
- ✅ Genera slug automáticamente del nombre del archivo
- ✅ Inserta registros en PostgreSQL con las rutas correctas
- ✅ Si ya existe (por slug), actualiza el registro

## Variables de entorno necesarias

El script usa el `.env` del proyecto. Asegúrate de tener:

```env
DATABASE_URL=postgresql://d4ia:password@host.docker.internal:5432/tienda_d4ia
IMAGES_DIR=/var/www/html/images/originals
THUMBS_DIR=/var/www/html/images/thumbs
```

## Personalización

### Modificar el script de inserción

Edita `upload-images-to-db.js` para agregar campos adicionales:

```javascript
const query = `
  INSERT INTO products (
    cd_slug,
    cd_name,
    ts_description,
    cd_image_thumb,
    cd_image_full,
    nu_width_px,
    nu_height_px,
    cd_width_cm,      // ← Agregar campo
    cd_height_cm,     // ← Agregar campo
    nu_price,         // ← Agregar campo
    cd_type,          // ← Agregar campo
    fh_created_at
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
`;

const values = [
  slug,
  name,
  description,
  dbThumbPath,
  dbOriginalPath,
  dimensions.width,
  dimensions.height,
  50,                 // ← cm ancho
  70,                 // ← cm alto
  250,                // ← precio
  'original',         // ← tipo
];
```

### Cambiar formato de slug

Modifica la función `generateSlug()`:

```javascript
function generateSlug(filename) {
  // Personaliza aquí la generación del slug
  return filename
    .replace(extname(filename), '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

## Solución de problemas

### Error: "Cannot find module 'sharp'"
```bash
cd scripts
npm install
```

### Error: "ENOENT: no such file or directory"
Verifica que las rutas en las variables de entorno sean correctas:
```bash
ls -la /var/www/html/images/originals
ls -la /var/www/html/images/thumbs
```

### Error de conexión a PostgreSQL
Verifica que el `DATABASE_URL` en `.env` sea correcto. Si PostgreSQL está en el VPS:
```env
# Si PostgreSQL está en el host (no en Docker)
DATABASE_URL=postgresql://d4ia:password@localhost:5432/tienda_d4ia

# Si estás ejecutando desde Docker
DATABASE_URL=postgresql://d4ia:password@host.docker.internal:5432/tienda_d4ia
```

### Las imágenes no se ven en la web
1. Verifica permisos:
```bash
sudo chmod -R 755 /var/www/html/images
```

2. Verifica que los contenedores estén corriendo:
```bash
docker ps
```

3. Verifica logs del backend:
```bash
docker logs d4ia-api -f
```

## Ejemplo completo paso a paso

```bash
# === EN TU COMPUTADORA LOCAL ===

# 1. Preparar imágenes
# Copiar imágenes a data/images/originals/ y data/images/thumbs/

# 2. Subir al VPS (Windows)
cd scripts
.\upload-images-to-vps.ps1

# === EN EL VPS ===

# 3. Conectar al VPS
ssh root@148.230.117.58

# 4. Ir al proyecto
cd /var/www/d4ia-gallery

# 5. Instalar dependencias del script (primera vez)
cd scripts
npm install

# 6. Ejecutar script de inserción
npm run upload-db

# 7. Verificar en la web
# Abrir: http://148.230.117.58
```

## Archivos generados

- `upload-images-to-db.js` - Script Node.js para insertar en PostgreSQL
- `upload-images-to-vps.sh` - Script Bash para subir imágenes (Linux/Mac)
- `upload-images-to-vps.ps1` - Script PowerShell para subir imágenes (Windows)
- `package.json` - Dependencias del script
