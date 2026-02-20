# Roles del equipo — RegaloMágico

Definición de roles, responsabilidades y entregables para el proyecto de la Electiva 5.

---

## 1. Líder técnico

**Integrante:** Jhonatan Mariaca  
**GitHub:** [@JhonattanMA](https://github.com/JhonattanMA)  
**Rama Git:** `dev-jhonatan-mariaca`

### Objetivo

Garantizar la calidad técnica del proyecto y que el equipo trabaje de forma ordenada siguiendo buenas prácticas.

### Responsabilidades

- Revisar y aprobar Pull Requests hacia la rama `dev`.
- Definir y documentar estándares de código (nomenclatura, estructura, convención de commits).
- Resolver conflictos técnicos y tomar decisiones cuando haya desacuerdos.
- Asegurar que cada rama se mantenga sincronizada con `dev`.
- Coordinar la integración final de `dev` hacia `main` tras las pruebas.
- Apoyar a los desarrolladores cuando tengan bloqueos técnicos.

### Entregables

- Estándares de código documentados (README o documento interno).
- Revisión de PRs con retroalimentación clara y en tiempo razonable.

---

## 2. Product Owner

**Integrante:** Carolina Nicholls  
**GitHub:** [@CarolinaNicholls](https://github.com/CarolinaNicholls)  
**Rama Git:** `dev-carolina-nicholls`

### Objetivo

Representar el valor del producto y asegurar que se construya lo correcto, en el orden adecuado.

### Responsabilidades

- Mantener y priorizar el backlog del proyecto en Jira o Notion.
- Redactar historias de usuario con criterios de aceptación claros.
- Definir qué está "listo" para el sprint y qué se pospone.
- Ser el punto de contacto con el docente: compartir avances, dudas y entregables.
- Participar en Planning, Review y validar que el resultado cumpla lo acordado.
- Tomar decisiones de producto cuando haya dudas (ej. priorizar funcionalidades).

### Entregables

- Backlog ordenado y actualizado.
- Criterios de aceptación definidos por historia de usuario.
- Comunicación fluida con el docente (enlaces a GitHub, Jira, Notion).

---

## 3. Desarrollador Frontend — Estructura y navegación

**Integrante:** Eduar Ruiz Gomez  
**GitHub:** [@ruizeduar8](https://github.com/ruizeduar8)  
**Rama Git:** `dev-eduar-ruiz-gomez`

### Objetivo

Implementar la estructura principal de la página, la navegación y la primera impresión visual (hero).

### Responsabilidades

- Desarrollar la estructura HTML semántica del `index.html`.
- Implementar el header con logo, menú de navegación y botón del carrito.
- Crear la sección hero con título, subtítulo y CTA.
- Asegurar que la navegación funcione correctamente (enlaces internos, menú hamburguesa en móvil).
- Mantener accesibilidad básica (etiquetas adecuadas, atributos ARIA cuando aplique).
- Trabajar en `dev-eduar-ruiz-gomez` y enviar PRs hacia `dev`.

### Entregables

- Header responsive y funcional.
- Hero section con diseño coherente con el resto del sitio.
- Código documentado y alineado con los estándares acordados.

---

## 4. Desarrollador Frontend — Carrito y WhatsApp

**Integrante:** Edwin Guzman  
**GitHub:** [@edwinGuzman12](https://github.com/edwinGuzman12)  
**Rama Git:** `dev-edwin-guzman`

### Objetivo

Implementar la funcionalidad del carrito de compras y la integración con WhatsApp.

### Responsabilidades

- Desarrollar el carrito lateral (sidebar) con listado de productos.
- Implementar agregar, modificar cantidad y eliminar productos del carrito.
- Persistir el carrito en `localStorage` para que no se pierda al recargar.
- Integrar el botón "Pedir por WhatsApp": construir el mensaje con el detalle del pedido y abrir el enlace `wa.me` con el número configurado.
- Asegurar que el total se calcule correctamente y que el mensaje de WhatsApp sea legible.
- Trabajar en `dev-edwin-guzman` y enviar PRs hacia `dev`.

### Entregables

- Carrito funcional con todas las operaciones básicas.
- Integración con WhatsApp probada y configurable.
- Código modular (p. ej. en `cart.js`) y fácil de mantener.

---

## 5. Desarrolladora + QA

**Integrante:** Juliana Chantre Astudillo  
**GitHub:** [@julianaastudillo08](https://github.com/julianaastudillo08)  
**Rama Git:** `dev-juliana-chantre-astudillo`

### Objetivo

Implementar el catálogo de productos, la interfaz visual pulida y las pruebas de calidad.

### Responsabilidades

- Desarrollar la sección de categorías y el grid de productos.
- Implementar los filtros por categoría (botones o pestañas).
- Crear el modal de detalle de producto con descripción y botón de agregar al carrito.
- Aplicar estilos CSS (variables, layout, espaciado, tipografía) para un diseño coherente.
- Asegurar que la página sea responsive (móvil, tablet, escritorio).
- Realizar pruebas funcionales: flujo completo de compra, enlaces, carrito y WhatsApp.
- Mantener el README, la documentación en Notion y las guías de uso.
- Trabajar en `dev-juliana-chantre-astudillo` y enviar PRs hacia `dev`.

### Entregables

- Catálogo de productos funcional con filtros.
- Modal de detalle de producto.
- Estilos consistentes y diseño responsive.
- Documentación actualizada y registro de pruebas realizadas.

---

## Resumen

| Rol | Integrante | GitHub | Rama |
|-----|------------|--------|------|
| Líder técnico | Jhonatan Mariaca | [@JhonattanMA](https://github.com/JhonattanMA) | dev-jhonatan-mariaca |
| Product Owner | Carolina Nicholls | [@CarolinaNicholls](https://github.com/CarolinaNicholls) | dev-carolina-nicholls |
| Desarrollador Frontend | Eduar Ruiz Gomez | [@ruizeduar8](https://github.com/ruizeduar8) | dev-eduar-ruiz-gomez |
| Desarrollador Frontend | Edwin Guzman | [@edwinGuzman12](https://github.com/edwinGuzman12) | dev-edwin-guzman |
| Desarrolladora + QA | Juliana Chantre Astudillo | [@julianaastudillo08](https://github.com/julianaastudillo08) | dev-juliana-chantre-astudillo |

**Repositorio:** https://github.com/JhonattanMA/DesayunosSorpresas
