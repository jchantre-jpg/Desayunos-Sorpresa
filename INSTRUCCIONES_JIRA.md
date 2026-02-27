# Cómo subir las issues a Jira automáticamente

Usa el script `crear-jira.js` para crear todas las issues en Jira sin importar CSV.

---

## Paso 1: Crear tu API token de Atlassian

1. Entra a: **https://id.atlassian.com/manage-profile/security/api-tokens**
2. Haz clic en **Crear token de API**
3. Ponle un nombre (ej: "RegaloMágico Jira")
4. Copia el token (solo se muestra una vez)

---

## Paso 2: Ejecutar el script

Abre **PowerShell** en la carpeta `electiva 5` y ejecuta:

```powershell
node crear-jira.js TU_EMAIL TU_TOKEN
```

**Ejemplo:**
```powershell
cd "c:\Users\Juliana\OneDrive\Desktop\idea proyceto\electiva 5"
node crear-jira.js juliana@gmail.com ATATT3xFfGF0xxxxxxxxxx
```

- **TU_EMAIL:** el correo con el que inicias sesión en Jira/Atlassian  
- **TU_TOKEN:** el token que creaste en el Paso 1

---

## ¿Qué necesita tener instalado?

**Node.js** – Si no lo tienes:

1. Descarga: **https://nodejs.org**
2. Instala y reinicia la terminal
3. Comprueba: `node --version`

---

## ¿Qué crea el script?

- 1 **Epic**
- 8 **Stories** (historia de usuario)
- 15 **Tasks** (tareas técnicas)

Todo en el proyecto **DesayunosSorpresa (DE)**.
