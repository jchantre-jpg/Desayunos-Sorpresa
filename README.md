# RegaloMágico 🎁

**Tienda virtual de regalos con compras por WhatsApp** (sin pasarela de pagos)

---

## Descripción

Proyecto desarrollado para la Electiva 5. Tienda web elegante donde los usuarios exploran productos, agregan al carrito y envían su pedido directamente por WhatsApp. Sin integración de pasarelas de pago: el cobro y la coordinación se manejan por mensajería.

## Stack tecnológico

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Fuentes:** Google Fonts (Cormorant Garamond, Montserrat)
- **Control de versiones:** Git + GitHub
- **Gestión de proyecto:** Jira, Notion

## Estructura del proyecto

```
electiva 5/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   ├── products.js     # Catálogo y configuración WhatsApp
│   ├── cart.js         # Lógica del carrito
│   └── main.js         # Inicialización y eventos
├── assets/
│   └── images/         # Imágenes (opcional)
├── README.md
├── GIT_WORKFLOW.md     # Guía de ramas y flujo
└── NOTION_DOCUMENTACION.md  # Plantilla para Notion
```

## Configuración

1. **Número de WhatsApp:** Edita `js/products.js` y cambia `CONFIG.whatsappNumber` por tu número (código país + número, sin + ni espacios). Ejemplo: `573001234567` para Colombia.

2. **Productos:** Modifica el array `PRODUCTOS` en `js/products.js` para añadir o editar artículos.

## Uso

1. Abre `index.html` en el navegador.
2. Navega por categorías y productos.
3. Agrega artículos al carrito.
4. Haz clic en "Pedir por WhatsApp" para enviar el pedido vía WhatsApp.

## Equipo y ramas

Cada integrante trabaja en su rama `dev-nombre-apellido` y envía Pull Request primero a `dev`, luego (tras pruebas) a `main`. Ver `GIT_WORKFLOW.md`.

---

© 2025 RegaloMágico - Electiva 5
