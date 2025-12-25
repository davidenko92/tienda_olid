# Guía de Despliegue en VPS con Traefik

Esta guía te ayudará a desplegar D4IA Gallery en tu VPS usando Docker y Traefik.

## Pre-requisitos en el VPS

- ✅ Ubuntu/Debian
- ✅ Docker y Docker Compose instalados
- ✅ Traefik corriendo en Docker con red `traefik`
- ✅ PostgreSQL (puede ser en Docker o instalado directamente)
- ✅ Git instalado
- ✅ Imágenes ya subidas en `/var/www/html/images/originals` y `/var/www/html/images/thumbs`

## Arquitectura del despliegue

```
Internet → Traefik (proxy) → {
    http://148.230.117.58/        → d4ia-web (Nginx con frontend estático)
    http://148.230.117.58/api/*   → d4ia-api (Backend Node.js)
    http://148.230.117.58/images/ → d4ia-api (Imágenes servidas por Fastify)
}
```

## Paso 1: Conectar al VPS

```bash
ssh usuario@148.230.117.58
```

## Paso 2: Verificar que Traefik esté corriendo

```bash
# Ver contenedores de Docker
docker ps

# Deberías ver un contenedor de Traefik corriendo
# Verificar que tenga una red llamada "traefik"
docker network ls | grep traefik

# Si no existe la red traefik, crearla:
docker network create traefik
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

Contenido del `.env`:
```env
# Si PostgreSQL está en Docker local:
DATABASE_URL=postgresql://d4ia:Automation%2328@postgres:5432/tienda_d4ia

# Si PostgreSQL está instalado directamente en el VPS:
DATABASE_URL=postgresql://d4ia:Automation%2328@host.docker.internal:5432/tienda_d4ia
# O usando la IP del host
DATABASE_URL=postgresql://d4ia:Automation%2328@172.17.0.1:5432/tienda_d4ia

PORT=3000
IMAGES_PATH=/images
FRONTEND_URL=http://148.230.117.58
```

## Paso 5: Construir el frontend

```bash
cd apps/web
npm install
npm run build
cd ../..
```

Esto creará `apps/web/dist` con los archivos estáticos.

## Paso 6: Verificar configuración de PostgreSQL

Si PostgreSQL está en el VPS (no en Docker), asegúrate de que permita conexiones desde Docker:

```bash
# Editar postgresql.conf
sudo nano /etc/postgresql/15/main/postgresql.conf
# Buscar: listen_addresses = 'localhost'
# Cambiar a: listen_addresses = '*'

# Editar pg_hba.conf para permitir conexiones desde Docker
sudo nano /etc/postgresql/15/main/pg_hba.conf
# Agregar: host  tienda_d4ia  d4ia  172.17.0.0/16  md5

# Reiniciar PostgreSQL
sudo systemctl restart postgresql
```

Si prefieres usar PostgreSQL en Docker, actualiza `docker-compose.prod.yml` para incluirlo.

## Paso 7: Iniciar los contenedores con Docker Compose

```bash
# Construir y levantar los contenedores
docker-compose -f docker-compose.prod.yml up -d --build

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Ver estado
docker ps
```

Deberías ver dos contenedores corriendo:
- `d4ia-api` (Backend Node.js)
- `d4ia-web` (Frontend Nginx)

## Paso 8: Verificar que todo funciona

```bash
# Ver logs del backend
docker logs d4ia-api -f

# Ver logs del frontend
docker logs d4ia-web -f

# Verificar que Traefik detectó los servicios
docker logs traefik | grep d4ia
```

Ahora deberías poder acceder a tu tienda en: **http://148.230.117.58**

## Paso 9: Inicializar la base de datos (si es necesario)

```bash
# Si necesitas crear las tablas, ejecuta desde dentro del contenedor:
docker exec -it d4ia-api sh -c "cd /app && node dist/db-init.js"

# O si tienes el script init.sql:
docker exec -i d4ia-postgres psql -U d4ia -d tienda_d4ia < data/db/init.sql
```

## Configuración de Traefik con SSL (HTTPS) - Opcional

Si quieres agregar HTTPS con Let's Encrypt, actualiza los labels en `docker-compose.prod.yml`:

```yaml
labels:
  # ... labels existentes ...

  # HTTPS
  - "traefik.http.routers.d4ia-api-secure.rule=Host(`tudominio.com`) && PathPrefix(`/api`)"
  - "traefik.http.routers.d4ia-api-secure.entrypoints=websecure"
  - "traefik.http.routers.d4ia-api-secure.tls.certresolver=letsencrypt"
  - "traefik.http.routers.d4ia-api-secure.middlewares=d4ia-api-stripprefix"

  # Redireccionar HTTP a HTTPS
  - "traefik.http.middlewares.d4ia-redirect.redirectscheme.scheme=https"
  - "traefik.http.routers.d4ia-api.middlewares=d4ia-redirect"
```

## Actualizar la aplicación

Para actualizar después de hacer cambios:

```bash
cd /var/www/d4ia-gallery

# Obtener últimos cambios
git pull

# Reconstruir frontend
cd apps/web
npm install
npm run build
cd ../..

# Reconstruir y reiniciar contenedores
docker-compose -f docker-compose.prod.yml up -d --build

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Comandos útiles

```bash
# Ver logs en tiempo real
docker-compose -f docker-compose.prod.yml logs -f

# Reiniciar servicios
docker-compose -f docker-compose.prod.yml restart

# Detener servicios
docker-compose -f docker-compose.prod.yml down

# Eliminar todo (incluyendo volúmenes)
docker-compose -f docker-compose.prod.yml down -v

# Ver todos los contenedores
docker ps -a

# Ver redes
docker network ls

# Entrar al contenedor del backend
docker exec -it d4ia-api sh

# Ver uso de recursos
docker stats
```

## Solución de problemas

### Las imágenes no cargan
```bash
# Verificar que las imágenes estén montadas en el contenedor
docker exec -it d4ia-api ls -la /images/originals
docker exec -it d4ia-api ls -la /images/thumbs

# Verificar permisos en el host
sudo chmod -R 755 /var/www/html/images
```

### Error de conexión a la base de datos
```bash
# Ver logs del backend
docker logs d4ia-api

# Probar conexión desde el contenedor
docker exec -it d4ia-api sh
# Dentro del contenedor:
apk add postgresql-client
psql "$DATABASE_URL"
```

### Traefik no detecta los servicios
```bash
# Verificar que los contenedores estén en la red traefik
docker inspect d4ia-api | grep -A 10 Networks
docker inspect d4ia-web | grep -A 10 Networks

# Ver configuración de Traefik
docker exec traefik cat /etc/traefik/traefik.yml

# Reiniciar Traefik
docker restart traefik
```

### El frontend no carga
```bash
# Verificar que el build se hizo correctamente
ls -la apps/web/dist

# Ver logs de Nginx
docker logs d4ia-web

# Verificar configuración de Nginx
docker exec d4ia-web cat /etc/nginx/conf.d/default.conf
```

### Reconstruir todo desde cero
```bash
# Detener y eliminar contenedores
docker-compose -f docker-compose.prod.yml down

# Eliminar imágenes antiguas
docker rmi d4ia-gallery-api d4ia-gallery-web

# Limpiar caché de Docker
docker system prune -f

# Reconstruir
cd apps/web && npm run build && cd ../..
docker-compose -f docker-compose.prod.yml up -d --build
```

## Monitoreo y mantenimiento

```bash
# Configurar auto-restart en caso de reinicio del servidor
# (Ya configurado con restart: unless-stopped)

# Ver uso de disco
du -sh /var/www/d4ia-gallery
docker system df

# Limpiar imágenes no usadas
docker image prune -a

# Backup de la base de datos
docker exec d4ia-postgres pg_dump -U d4ia tienda_d4ia > backup_$(date +%Y%m%d).sql
```

## Diferencias entre Nginx y Traefik

✅ **Ventajas de usar Traefik:**
- Configuración automática mediante labels de Docker
- No necesitas editar archivos de configuración separados
- Fácil de escalar y agregar más servicios
- Soporte nativo para HTTPS/SSL con Let's Encrypt
- Dashboard web para monitoreo
- Service discovery automático

🔧 **Configuración:**
- Nginx requiere archivos `.conf` y reinicio manual
- Traefik solo necesita labels en `docker-compose.yml`
- Los cambios se aplican automáticamente al reiniciar contenedores
