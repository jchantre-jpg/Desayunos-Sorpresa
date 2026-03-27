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
├── admin.html          # Panel de administración (productos, fotos)
├── css/
│   ├── styles.css      # Estilos de la tienda
│   └── admin.css       # Estilos del panel admin
├── js/
│   ├── products.js     # Catálogo y configuración WhatsApp
│   ├── api-config.js    # Config de backend (/api)
│   ├── products-store.js # CRUD productos (API SQL o localStorage)
│   ├── admin.js        # Lógica del panel admin
│   ├── cart.js         # Lógica del carrito
│   └── main.js         # Inicialización y eventos
├── imagenes/           # Fotos: 1.jpg, 2.jpg, 3.jpg, 4.jpg
├── README.md
├── GIT_WORKFLOW.md
└── NOTION_DOCUMENTACION.md
```

## Configuración

1. **Número de WhatsApp:** Edita `js/products.js` y cambia `CONFIG.whatsappNumber` por tu número (código país + número, sin + ni espacios). Ejemplo: `573001234567` para Colombia.

2. **Productos:**  
  - **Con API (Postgres/SQL):** Activa `USE_API` en `js/api-config.js` y usa el **panel de administración** (`admin.html`). Inicia sesión (usuario: `admin`, contraseña: `admin123` por defecto) para agregar/editar/eliminar productos.
  - **Sin API:** Mantén `USE_API=false` (configuración por defecto) y modifica el array `PRODUCTOS` en `js/products.js`. Los cambios del panel admin se guardan en `localStorage`.

## Uso

1. **Abre la tienda (recomendado):** Ejecuta `iniciar-tienda.ps1` en PowerShell desde la carpeta del proyecto. Se abrirá un servidor local y tu navegador en `http://localhost:3000`. Si ves la página en blanco, usa siempre el servidor local en lugar de abrir el HTML directamente.
2. **Alternativa:** Haz doble clic en `index.html` dentro de `electiva 5/`. Si no ves nada, usa el servidor local (paso anterior).
3. **Imágenes:** Coloca las fotos en `imagenes/` con los nombres `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg` para los desayunos sorpresa.
4. Navega por categorías y productos.
5. Agrega artículos al carrito.
6. Haz clic en "Pedir por WhatsApp" para enviar el pedido vía WhatsApp.

## Equipo

| Rol | Integrante | GitHub | Responsabilidad principal |
|-----|------------|--------|---------------------------|
| **Líder técnico** | Jhonatan Mariaca | [@JhonattanMA](https://github.com/JhonattanMA) | Revisa PRs, define estándares de código, coordina la integración técnica del proyecto. |
| **Product Owner** | Carolina Nicholls | [@CarolinaNicholls](https://github.com/CarolinaNicholls) | Prioriza el backlog, define criterios de aceptación y mantiene la comunicación con el docente. |
| **Desarrollador Frontend** | Eduar Ruiz Gomez | [@ruizeduar8](https://github.com/ruizeduar8) | Implementa la estructura HTML, header, navegación y hero de la tienda. |
| **Desarrollador Frontend** | Edwin Guzman | [@edwinGuzman12](https://github.com/edwinGuzman12) | Desarrolla el carrito lateral, la persistencia en localStorage y la integración con WhatsApp. |
| **Desarrolladora + QA** | Juliana Chantre Astudillo | [@julianaastudillo08](https://github.com/julianaastudillo08) | Construye el catálogo, filtros, modal de producto, estilos responsive y realiza las pruebas. |

**Repositorio:** https://github.com/JhonattanMA/DesayunosSorpresas

Cada integrante trabaja en su rama `dev-nombre-apellido` y envía Pull Request primero a `dev`, luego (tras pruebas) a `main`. Ver `GIT_WORKFLOW.md` y `NOTION_DOCUMENTACION.md` para descripciones completas de roles.

---

© 2025 RegaloMágico - Electiva 5
