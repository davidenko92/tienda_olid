# Guía de Despliegue en VPS

Esta guía te ayudará a desplegar D4IA Gallery en tu VPS Ubuntu/Debian.

## Pre-requisitos en el VPS

- Ubuntu/Debian
- Node.js instalado ✅
- PostgreSQL instalado y funcionando
- Nginx instalado
- Git instalado
- Imágenes ya subidas en `/var/www/html/images/originals` y `/var/www/html/images/thumbs` ✅

## Paso 1: Conectar al VPS

```bash
ssh usuario@148.230.117.58
```

## Paso 2: Instalar dependencias necesarias (si no están instaladas)

```bash
# Instalar Nginx si no está instalado
sudo apt update
sudo apt install nginx

# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Instalar PM2 para gestionar procesos Node.js
sudo npm install -g pm2
```

## Paso 3: Clonar el repositorio

```bash
# Crear directorio para la aplicación
sudo mkdir -p /var/www/d4ia-gallery
sudo chown $USER:$USER /var/www/d4ia-gallery

# Clonar el repositorio
cd /var/www
git clone <TU_REPOSITORIO_GIT_URL> d4ia-gallery
cd d4ia-gallery
```

## Paso 4: Configurar variables de entorno

```bash
# Copiar el archivo de producción
cp .env.production .env

# Editar el archivo .env con tus credenciales
nano .env
```

Verifica que el archivo `.env` tenga:
```env
DATABASE_URL=postgresql://d4ia:Automation%2328@localhost:5432/tienda_d4ia
PORT=3000
IMAGES_PATH=/var/www/html/images
FRONTEND_URL=http://148.230.117.58
```

## Paso 5: Instalar dependencias

```bash
# Instalar dependencias del backend
cd apps/api
npm install

# Instalar dependencias del frontend
cd ../web
npm install

# Volver a la raíz
cd ../..
```

## Paso 6: Construir el frontend

```bash
cd apps/web
npm run build
cd ../..
```

Esto creará la carpeta `apps/web/dist` con los archivos estáticos optimizados.

## Paso 7: Verificar la base de datos

```bash
# Asegúrate de que la base de datos y las tablas existan
cd apps/api
npm run db:init
cd ../..
```

## Paso 8: Configurar Nginx

```bash
# Copiar la configuración de Nginx
sudo cp nginx.conf /etc/nginx/sites-available/d4ia-gallery

# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/d4ia-gallery /etc/nginx/sites-enabled/

# Eliminar la configuración default si existe
sudo rm /etc/nginx/sites-enabled/default

# Probar la configuración de Nginx
sudo nginx -t

# Si todo está bien, reiniciar Nginx
sudo systemctl restart nginx
```

## Paso 9: Iniciar el backend con PM2

```bash
cd /var/www/d4ia-gallery/apps/api

# Compilar el TypeScript
npm run build

# Iniciar con PM2
pm2 start dist/index.js --name d4ia-api

# Guardar la configuración de PM2 para que se inicie al reiniciar
pm2 save
pm2 startup
# Ejecutar el comando que PM2 te muestre
```

## Paso 10: Verificar que todo funciona

```bash
# Ver logs del backend
pm2 logs d4ia-api

# Ver estado de PM2
pm2 status

# Verificar Nginx
sudo systemctl status nginx
```

Ahora deberías poder acceder a tu tienda en: **http://148.230.117.58**

## Arquitectura de URLs

- Frontend: `http://148.230.117.58/` → Servido por Nginx desde `/var/www/d4ia-gallery/apps/web/dist`
- API: `http://148.230.117.58/api/*` → Proxy de Nginx a `localhost:3000`
- Imágenes: `http://148.230.117.58/images/*` → Servidas directamente por Nginx desde `/var/www/html/images/`

## Actualizar la aplicación

Para actualizar después de hacer cambios:

```bash
cd /var/www/d4ia-gallery

# Obtener últimos cambios
git pull

# Actualizar backend
cd apps/api
npm install
npm run build
pm2 restart d4ia-api

# Actualizar frontend
cd ../web
npm install
npm run build

# Reiniciar Nginx
sudo systemctl reload nginx
```

## Comandos útiles

```bash
# Ver logs del backend
pm2 logs d4ia-api

# Reiniciar backend
pm2 restart d4ia-api

# Detener backend
pm2 stop d4ia-api

# Ver todos los procesos de PM2
pm2 list

# Reiniciar Nginx
sudo systemctl restart nginx

# Ver logs de Nginx
sudo tail -f /var/log/nginx/d4ia-gallery-access.log
sudo tail -f /var/log/nginx/d4ia-gallery-error.log
```

## Solución de problemas

### Las imágenes no cargan
- Verificar que existan en `/var/www/html/images/`
- Verificar permisos: `sudo chmod -R 755 /var/www/html/images`
- Revisar logs de Nginx: `sudo tail -f /var/log/nginx/d4ia-gallery-error.log`

### Error de conexión a la base de datos
- Verificar que PostgreSQL esté corriendo: `sudo systemctl status postgresql`
- Verificar credenciales en `.env`
- Probar conexión: `psql -U d4ia -d tienda_d4ia -h localhost`

### El backend no inicia
- Ver logs: `pm2 logs d4ia-api`
- Verificar que el puerto 3000 esté libre: `sudo lsof -i :3000`
- Compilar nuevamente: `cd apps/api && npm run build`

### Error 502 Bad Gateway
- Verificar que el backend esté corriendo: `pm2 status`
- Revisar logs de Nginx: `sudo tail -f /var/log/nginx/d4ia-gallery-error.log`
- Reiniciar servicios: `pm2 restart d4ia-api && sudo systemctl restart nginx`
