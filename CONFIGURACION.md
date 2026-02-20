# Configuración de RegaloMágico

## WhatsApp

1. Abre `js/products.js`
2. Busca la constante `CONFIG`

### Opción A: Enlace directo (recomendado)

Usa `whatsappLink` con tu enlace de WhatsApp (por ejemplo, el que obtienes al generar "Añádeme como contacto"):

```javascript
whatsappLink: 'https://wa.me/qr/TU_CODIGO_QR'
```

### Opción B: Número de teléfono

Si prefieres usar el número para mensajes pre-llenados con el detalle del pedido:

```javascript
whatsappNumber: '573001234567'  // Código país + número, sin + ni espacios
```

**Ejemplo Colombia (300 123 4567):** `573001234567`  
**Ejemplo México (55 1234 5678):** `5215512345678`

*Actualmente configurado con el enlace:* https://wa.me/qr/AAEWDCVCR6AVI1

## Panel de administración

El dueño de la página puede acceder a `admin.html` para gestionar productos. Debe iniciar sesión con usuario y contraseña.

**Credenciales por defecto** (cambia en `js/firebase-config.js`):
- Usuario: `admin`
- Contraseña: `admin123`

Para cambiar las credenciales, edita `ADMIN_CREDENTIALS` en `js/firebase-config.js`:
```javascript
const ADMIN_CREDENTIALS = {
  usuario: 'tu_usuario',
  contraseña: 'tu_contraseña_segura'
};
```

## Productos

**Con Firebase configurado:** Usa el panel de administración para agregar productos con fotos, descripción y contenido detallado.

**Sin Firebase:** Edita el array `PRODUCTOS` en `js/products.js`. Cada producto debe tener:

- `id`: número único
- `nombre`: nombre del producto
- `categoria`: id de la categoría (debe existir en `CATEGORIAS`)
- `precio`: número (sin puntos ni comas)
- `emoji`: emoji para representar el producto
- `descripcion`: texto descriptivo
