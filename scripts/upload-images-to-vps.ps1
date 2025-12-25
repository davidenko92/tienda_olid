# Script PowerShell para subir imágenes al VPS desde Windows

# Configuración
$VPS_IP = "148.230.117.58"
$VPS_USER = "root"  # Cambia esto por tu usuario
$LOCAL_IMAGES_DIR = "..\data\images"
$VPS_IMAGES_DIR = "/var/www/html/images"

Write-Host "🚀 Subiendo imágenes al VPS..." -ForegroundColor Blue
Write-Host ""

# Verificar que el directorio local existe
if (-not (Test-Path $LOCAL_IMAGES_DIR)) {
    Write-Host "❌ Error: No se encuentra el directorio $LOCAL_IMAGES_DIR" -ForegroundColor Red
    exit 1
}

# Verificar que SCP está disponible (incluido en Windows 10+)
try {
    $null = Get-Command scp -ErrorAction Stop
} catch {
    Write-Host "❌ Error: SCP no está disponible. Instala OpenSSH Client desde 'Configuración > Aplicaciones > Características opcionales'" -ForegroundColor Red
    exit 1
}

# Subir originales
Write-Host "📤 Subiendo imágenes originales..." -ForegroundColor Blue
scp -r "$LOCAL_IMAGES_DIR\originals\*" "${VPS_USER}@${VPS_IP}:${VPS_IMAGES_DIR}/originals/"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Originales subidos correctamente" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ Error subiendo originales" -ForegroundColor Red
    exit 1
}

# Subir miniaturas
Write-Host "📤 Subiendo miniaturas..." -ForegroundColor Blue
scp -r "$LOCAL_IMAGES_DIR\thumbs\*" "${VPS_USER}@${VPS_IP}:${VPS_IMAGES_DIR}/thumbs/"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Miniaturas subidas correctamente" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ Error subiendo miniaturas" -ForegroundColor Red
    exit 1
}

# Establecer permisos
Write-Host "🔐 Estableciendo permisos..." -ForegroundColor Blue
ssh "${VPS_USER}@${VPS_IP}" "chmod -R 755 ${VPS_IMAGES_DIR} && chown -R www-data:www-data ${VPS_IMAGES_DIR}"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Permisos establecidos correctamente" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "⚠️  Advertencia: No se pudieron establecer permisos" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "✨ Proceso completado!" -ForegroundColor Green
Write-Host "Próximo paso: Ejecutar el script de inserción en la BD" -ForegroundColor Blue
