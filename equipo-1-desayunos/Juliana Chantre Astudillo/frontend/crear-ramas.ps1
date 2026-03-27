# Script para crear las ramas del equipo (5 integrantes)
# Ejecutar: .\crear-ramas.ps1

$ramaBase = "dev"
$integrantes = @(
    "jhonatan-mariaca",
    "carolina-nicholls",
    "eduar-ruiz-gomez",
    "edwin-guzman",
    "juliana-chantre-astudillo"
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

Write-Host "`nListo. Ramas creadas para: Jhonatan Mariaca, Carolina Nicholls, Eduar Ruiz Gomez, Edwin Guzman, Juliana Chantre Astudillo"
