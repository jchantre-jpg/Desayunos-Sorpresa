# Script para hacer push usando tu token de GitHub
# Ejecuta: .\push-con-token.ps1

$ErrorActionPreference = "Stop"
$repoPath = "c:\Users\Juliana\OneDrive\Desktop\idea proyceto\electiva 5"

Write-Host "=== Push a GitHub con Token ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Pega tu token cuando te lo pida (no se mostrara al escribir)"
Write-Host "2. El token debe ser de la cuenta jchantre-jpg"
Write-Host ""

# Pedir token (se mostrara como ****** al pegarlo)
$secureToken = Read-Host "Pega tu token aqui" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
$token = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host "Error: No ingresaste el token." -ForegroundColor Red
    exit 1
}

# URL con token (solo para este push)
$urlConToken = "https://jchantre-jpg:$token@github.com/jchantre-jpg/Desayunos-Sorpresa.git"

try {
    Push-Location $repoPath
    
    # Guardar URL original
    $urlOriginal = git config --get remote.origin.url
    
    # Usar URL con token temporalmente
    git remote set-url origin $urlConToken
    
    Write-Host "Enviando codigo a GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    Write-Host ""
    Write-Host "Listo! Tu codigo se subio correctamente." -ForegroundColor Green
}
catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
finally {
    # Restaurar URL sin token (seguridad)
    git remote set-url origin "https://jchantre-jpg@github.com/jchantre-jpg/Desayunos-Sorpresa.git"
    Pop-Location
}
