# RegaloMágico - Iniciar tienda local
# Abre http://localhost:3000 en el navegador

$port = 3000
Write-Host "Iniciando RegaloMágico en http://localhost:$port" -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para detener el servidor." -ForegroundColor Yellow
Start-Process "http://localhost:$port"
npx --yes serve -p $port
