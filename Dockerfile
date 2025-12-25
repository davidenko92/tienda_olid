# Dockerfile para D4IA Gallery Backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY apps/api/package*.json ./apps/api/
COPY package*.json ./

# Instalar dependencias
WORKDIR /app/apps/api
RUN npm install

# Copiar código fuente
COPY apps/api ./

# Compilar TypeScript
RUN npm run build

# Imagen de producción
FROM node:20-alpine

WORKDIR /app

# Copiar solo las dependencias de producción
COPY apps/api/package*.json ./
RUN npm install --production

# Copiar código compilado
COPY --from=builder /app/apps/api/dist ./dist

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/index.js"]
