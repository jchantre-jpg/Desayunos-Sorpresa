# Cómo usar tu token para subir a GitHub

## Paso 1: Generar el token (si aún no lo tienes)

1. Abre: https://github.com/settings/tokens/new
2. **Note:** Escribe `Desayunos-Sorpresa`
3. **Expiration:** 30 días (o el que prefieras)
4. Marca el scope **repo**
5. Haz clic en **Generate token**
6. **COPIA EL TOKEN** (solo se muestra una vez; parece: `ghp_xxxxxxxxxxxx`)

Importante: debes estar logueada con la cuenta **jchantre-jpg** (propietaria del repo).

## Paso 2: Ejecutar el script

1. Abre **PowerShell** (clic derecho en la carpeta del proyecto → "Abrir en Terminal")
2. Ejecuta:

```powershell
.\push-con-token.ps1
```

3. Cuando pida el token, pégalo (Ctrl+V) y presiona Enter
4. El script subirá tu código a GitHub

## Alternativa manual

Si prefieres hacerlo sin script:

```powershell
cd "c:\Users\Juliana\OneDrive\Desktop\idea proyceto\electiva 5"
git push -u origin main
```

Cuando pida **Password:** pega tu token (no tu contraseña de GitHub).
