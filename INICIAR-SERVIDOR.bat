@echo off
REM Ejecutar como ADMIN automáticamente
net session >nul 2>&1
if %errorLevel% neq 0 (
  powershell -Command "Start-Process -FilePath '%0' -Verb RunAs"
  exit /b
)

cd /d "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"
powershell -NoProfile -ExecutionPolicy Bypass -File servidor.ps1
pause
