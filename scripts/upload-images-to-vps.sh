#!/bin/bash

#############################################
# Script para subir imágenes al VPS
#############################################

# Configuración
VPS_IP="148.230.117.58"
VPS_USER="root"  # Cambia esto por tu usuario
LOCAL_IMAGES_DIR="../data/images"  # Directorio local con las imágenes
VPS_IMAGES_DIR="/var/www/html/images"

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Subiendo imágenes al VPS...${NC}\n"

# Verificar que el directorio local existe
if [ ! -d "$LOCAL_IMAGES_DIR" ]; then
    echo -e "${RED}❌ Error: No se encuentra el directorio $LOCAL_IMAGES_DIR${NC}"
    exit 1
fi

# Subir originales
echo -e "${BLUE}📤 Subiendo imágenes originales...${NC}"
rsync -avz --progress \
    "$LOCAL_IMAGES_DIR/originals/" \
    "$VPS_USER@$VPS_IP:$VPS_IMAGES_DIR/originals/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Originales subidos correctamente${NC}\n"
else
    echo -e "${RED}❌ Error subiendo originales${NC}\n"
    exit 1
fi

# Subir miniaturas
echo -e "${BLUE}📤 Subiendo miniaturas...${NC}"
rsync -avz --progress \
    "$LOCAL_IMAGES_DIR/thumbs/" \
    "$VPS_USER@$VPS_IP:$VPS_IMAGES_DIR/thumbs/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Miniaturas subidas correctamente${NC}\n"
else
    echo -e "${RED}❌ Error subiendo miniaturas${NC}\n"
    exit 1
fi

# Establecer permisos correctos en el VPS
echo -e "${BLUE}🔐 Estableciendo permisos...${NC}"
ssh "$VPS_USER@$VPS_IP" "chmod -R 755 $VPS_IMAGES_DIR && chown -R www-data:www-data $VPS_IMAGES_DIR"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Permisos establecidos correctamente${NC}\n"
else
    echo -e "${RED}⚠️  Advertencia: No se pudieron establecer permisos${NC}\n"
fi

echo -e "${GREEN}✨ Proceso completado!${NC}"
echo -e "${BLUE}Próximo paso: Ejecutar el script de inserción en la BD${NC}"
