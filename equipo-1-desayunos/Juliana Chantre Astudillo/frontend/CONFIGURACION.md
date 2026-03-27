# Configuración de RegaloMágico

## WhatsApp
1. Abre `js/products.js`.
2. Busca la constante `CONFIG` y configura:
   - `whatsappLink`: enlace QR de WhatsApp (opcional)
   - `whatsappNumber`: número con código de país (opcional)

## Panel de administración
El administrador gestiona productos desde `admin.html`.

1. Inicia sesión con usuario `admin` y contraseña `admin123` (valores por defecto en el backend).
2. Crea/edita/elimina productos desde el panel.

## Modo de datos (local vs backend SQL)
En `js/api-config.js`:
- `USE_API = false`: el catálogo base viene de `js/products.js` y los cambios del admin se guardan en `localStorage`.
- `USE_API = true`: el catálogo se lee y se guarda en el backend Express + PostgreSQL.

