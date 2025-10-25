@echo off
chcp 65001 >nul
echo.
echo --------------------------------------------------------
echo   ???  D4IA Gallery - Generador de SQL para Im?genes
echo --------------------------------------------------------
echo.

cd /d "%~dp0scripts"

echo ?? Verificando dependencias...
if not exist "node_modules" (
    echo.
    echo ??  Instalando paquetes necesarios...
    call npm install
    echo.
)

echo.
echo [1/2] Generando thumbnails...
echo.
node generate-thumbnails.js

echo.
echo.
echo [2/2] Generando SQL...
echo.
node add-images.js

echo.
echo --------------------------------------------------------
echo.
echo ? ?Listo! El SQL se gener? en: data\db\generated-inserts.sql
echo.
echo ?? Siguiente paso:
echo    1. Copia el SQL de arriba
echo    2. ?brelo en pgAdmin y ejec?talo
echo    3. Refresca tu navegador en http://localhost:5173
echo.
echo --------------------------------------------------------
echo.
pause
