# Script para crear las 9 ramas de equipo
# Ejecutar: .\crear-ramas.ps1

$ramaBase = "dev"
$integrantes = @(
    "integrante-1",
    "integrante-2",
    "integrante-3",
    "integrante-4",
    "integrante-5",
    "integrante-6",
    "integrante-7",
    "integrante-8",
    "integrante-9"
)

Write-Host "Creando ramas desde dev..."

foreach ($nombre in $integrantes) {
    $rama = "$ramaBase-$nombre"
    git checkout -b $rama 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Creada: $rama"
    } else {
        Write-Host "  - Ya existe: $rama"
    }
    git checkout dev 2>$null | Out-Null
}

Write-Host "`nListo. Cada integrante debe renombrar su rama a: dev-nombre-apellido"
Write-Host "Ejemplo: dev-ana-garcia, dev-carlos-rodriguez"
