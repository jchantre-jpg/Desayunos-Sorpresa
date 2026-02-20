# Configuración de RegaloMágico

## Número de WhatsApp

1. Abre `js/products.js`
2. Busca la constante `CONFIG`
3. Cambia `whatsappNumber` por tu número con código de país, sin `+` ni espacios

**Ejemplo para Colombia (número 300 123 4567):**
```javascript
whatsappNumber: '573001234567'
```

**Ejemplo para México (número 55 1234 5678):**
```javascript
whatsappNumber: '5215512345678'
```

## Productos

Edita el array `PRODUCTOS` en `js/products.js` para agregar, modificar o eliminar productos. Cada producto debe tener:

- `id`: número único
- `nombre`: nombre del producto
- `categoria`: id de la categoría (debe existir en `CATEGORIAS`)
- `precio`: número (sin puntos ni comas)
- `emoji`: emoji para representar el producto
- `descripcion`: texto descriptivo
