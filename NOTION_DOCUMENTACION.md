# Documentación para Notion - Electiva 5

Usa este contenido para crear las páginas en Notion y mantener todo organizado.

---

## 1. Roles del equipo

### Resumen de asignaciones

| Rol | Integrante | GitHub | Rama Git | Área principal |
|-----|------------|--------|----------|----------------|
| Líder técnico | Jhonatan Mariaca | [@JhonattanMA](https://github.com/JhonattanMA) | dev-jhonatan-mariaca | Coordinación y revisión |
| Product Owner | Carolina Nicholls | [@CarolinaNicholls](https://github.com/CarolinaNicholls) | dev-carolina-nicholls | Gestión del producto |
| Desarrollador Frontend | Eduar Ruiz Gomez | [@ruizeduar8](https://github.com/ruizeduar8) | dev-eduar-ruiz-gomez | Estructura y navegación |
| Desarrollador Frontend | Edwin Guzman | [@edwinGuzman12](https://github.com/edwinGuzman12) | dev-edwin-guzman | Carrito y WhatsApp |
| Desarrolladora + QA | Juliana Chantre Astudillo | [@julianaastudillo08](https://github.com/julianaastudillo08) | dev-juliana-chantre-astudillo | UI, catálogo y pruebas |

---

### Descripción detallada de roles

#### Líder técnico — Jhonatan Mariaca

**Objetivo:** Garantizar la calidad técnica del proyecto y que el equipo trabaje de forma ordenada siguiendo buenas prácticas.

**Responsabilidades:**
- Revisar y aprobar Pull Requests hacia la rama `dev`.
- Definir y documentar estándares de código (nomenclatura, estructura, convención de commits).
- Resolver conflictos técnicos y tomar decisiones cuando haya desacuerdos.
- Asegurar que cada rama se mantenga sincronizada con `dev`.
- Coordinar la integración final de `dev` hacia `main` tras las pruebas.
- Apoyar a los desarrolladores cuando tengan bloqueos técnicos.

**Entregables:**
- Estándares de código en el README o en documentación interna.
- Revisión de PRs con retroalimentación clara y en tiempo razonable.

---

#### Product Owner — Carolina Nicholls

**Objetivo:** Representar el valor del producto y asegurar que se construya lo correcto, en el orden adecuado.

**Responsabilidades:**
- Mantener y priorizar el backlog del proyecto en Jira/Notion.
- Redactar historias de usuario con criterios de aceptación claros.
- Definir qué está “listo” para el sprint y qué se pospone.
- Ser el punto de contacto con el docente: compartir avances, dudas y entregables.
- Participar en las ceremonias (Planning, Review) y validar que el resultado cumpla lo acordado.
- Tomar decisiones de producto cuando haya dudas (ej. qué funcionalidad priorizar).

**Entregables:**
- Backlog ordenado y actualizado.
- Criterios de aceptación por historia de usuario.
- Comunicación fluida con el docente (enlaces a GitHub, Jira, Notion).

---

#### Desarrollador Frontend — Eduar Ruiz Gomez

**Objetivo:** Implementar la estructura principal de la página, la navegación y la primera impresión visual (hero).

**Responsabilidades:**
- Desarrollar la estructura HTML semántica del `index.html`.
- Implementar el header con logo, menú de navegación y botón del carrito.
- Crear la sección hero con título, subtítulo y CTA.
- Asegurar que la navegación funcione correctamente (enlaces internos, menú hamburguesa en móvil).
- Mantener la accesibilidad básica (etiquetas, atributos ARIA cuando aplique).
- Trabajar en la rama `dev-eduar-ruiz-gomez` y enviar PRs a `dev`.

**Entregables:**
- Header responsive y funcional.
- Hero section con diseño coherente con el resto de la página.
- Código documentado y alineado con los estándares acordados.

---

#### Desarrollador Frontend — Edwin Guzman

**Objetivo:** Implementar la funcionalidad del carrito y la integración con WhatsApp.

**Responsabilidades:**
- Desarrollar el carrito lateral (sidebar) con listado de productos.
- Implementar agregar, modificar cantidad y eliminar productos del carrito.
- Persistir el carrito en `localStorage` para que no se pierda al recargar.
- Integrar el botón “Pedir por WhatsApp”: construir el mensaje con el detalle del pedido y abrir el enlace `wa.me` con el número configurado.
- Asegurar que el total se calcule correctamente y que el mensaje de WhatsApp sea legible.
- Trabajar en la rama `dev-edwin-guzman` y enviar PRs a `dev`.

**Entregables:**
- Carrito funcional con todas las operaciones básicas.
- Integración con WhatsApp probada y configurable.
- Código modular (por ejemplo en `cart.js`) y fácil de mantener.

---

#### Desarrolladora + QA — Juliana Chantre Astudillo

**Objetivo:** Implementar el catálogo de productos, la interfaz visual pulida y las pruebas de calidad.

**Responsabilidades:**
- Desarrollar la sección de categorías y el grid de productos.
- Implementar los filtros por categoría (botones o tabs).
- Crear el modal de detalle de producto con descripción y botón de agregar al carrito.
- Aplicar estilos CSS (variables, layout, espaciado, tipografía) para un diseño coherente.
- Asegurar que la página sea responsive (móvil, tablet, escritorio).
- Realizar pruebas funcionales: flujo completo de compra, enlaces, carrito y WhatsApp.
- Mantener el README, la documentación en Notion y cualquier guía de uso.
- Trabajar en la rama `dev-juliana-chantre-astudillo` y enviar PRs a `dev`.

**Entregables:**
- Catálogo de productos funcional con filtros.
- Modal de detalle de producto.
- Estilos consistentes y diseño responsive.
- Documentación actualizada y lista de pruebas realizadas (en Notion o README).

---

**Integrantes del equipo:** Jhonatan Mariaca, Carolina Nicholls, Eduar Ruiz Gomez, Edwin Guzman, Juliana Chantre Astudillo

---

## 2. Backlog (para Jira / Notion)

### Épica: Tienda virtual de regalos

| ID | Historia de usuario | Prioridad | Criterios de aceptación |
|----|---------------------|-----------|-------------------------|
| US01 | Como usuario quiero ver categorías para encontrar regalos por tipo | Alta | Las categorías se muestran de forma clara; al hacer clic se filtra el listado de productos. |
| US02 | Como usuario quiero filtrar productos por categoría | Alta | Hay botones o filtros para cada categoría; el grid muestra solo los productos de la categoría seleccionada. |
| US03 | Como usuario quiero agregar productos al carrito | Alta | Botón "Agregar" en cada producto; el carrito muestra el ítem y el contador se actualiza. |
| US04 | Como usuario quiero modificar cantidad y eliminar del carrito | Alta | Se puede aumentar/disminuir cantidad; eliminar ítems; el total se recalcula correctamente. |
| US05 | Como usuario quiero ver el detalle de un producto antes de agregar | Media | Modal o vista con nombre, precio, descripción y opción de agregar al carrito. |
| US06 | Como usuario quiero enviar mi pedido por WhatsApp | Alta | Botón abre WhatsApp con mensaje predefinido que incluye productos y total. |
| US07 | Como usuario quiero ver una interfaz responsive en móvil | Alta | La página se adapta a móvil: menú hamburguesa, grid adaptable, carrito usable. |
| US08 | Como usuario quiero un diseño atractivo y moderno | Media | Paleta de colores consistente, tipografía legible, espaciado y jerarquía visual claros. |

### Matriz de tareas técnicas (Sprint)

| ID | Tarea | Asignado | Rama | Prioridad |
|----|-------|----------|------|-----------|
| T01 | Estructura HTML base (semántica, secciones) | Eduar Ruiz Gomez | dev-eduar-ruiz-gomez | Alta |
| T02 | Header con logo, menú de navegación y botón carrito | Eduar Ruiz Gomez | dev-eduar-ruiz-gomez | Alta |
| T03 | Hero section (título, subtítulo, CTA) | Eduar Ruiz Gomez | dev-eduar-ruiz-gomez | Alta |
| T04 | Carrito lateral (lista, total, botones) | Edwin Guzman | dev-edwin-guzman | Alta |
| T05 | Lógica del carrito (agregar, modificar, eliminar, localStorage) | Edwin Guzman | dev-edwin-guzman | Alta |
| T06 | Integración WhatsApp (mensaje, enlace wa.me) | Edwin Guzman | dev-edwin-guzman | Alta |
| T07 | Grid de productos y renderizado dinámico | Juliana Chantre Astudillo | dev-juliana-chantre-astudillo | Alta |
| T08 | Filtros por categoría | Juliana Chantre Astudillo | dev-juliana-chantre-astudillo | Alta |
| T09 | Modal de detalle de producto | Juliana Chantre Astudillo | dev-juliana-chantre-astudillo | Media |
| T10 | Estilos CSS (variables, layout, tipografía) | Juliana Chantre Astudillo | dev-juliana-chantre-astudillo | Alta |
| T11 | Diseño responsive (móvil, tablet, escritorio) | Juliana Chantre Astudillo | dev-juliana-chantre-astudillo | Alta |
| T12 | Revisión de PRs, resolución de conflictos | Jhonatan Mariaca | dev-jhonatan-mariaca | Alta |
| T13 | Backlog, historias de usuario, criterios de aceptación | Carolina Nicholls | dev-carolina-nicholls | Alta |

---

## 3. Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Estructura | HTML5 |
| Estilos | CSS3 (variables, Flexbox, Grid) |
| Lógica | JavaScript (vanilla) |
| Fuentes | Google Fonts |
| Versionamiento | Git + GitHub |
| Gestión de proyecto | Jira / Notion |
| Documentación | Notion, README |

---

## 4. Sprint Planning

### Sprint 1 – 2 semanas

**Objetivo:** MVP funcional con carrito e integración WhatsApp.

**Historias de usuario:** US01, US02, US03, US06, US07

**Ceremonias:**
- **Planning:** Al inicio del sprint. Asignar tareas, clarificar dudas.
- **Daily (opcional):** Breve sincronización (avances, bloqueos).
- **Review:** Al final. Demostrar lo implementado y validar con el Product Owner.

### Sprint 2 – 1 semana

**Objetivo:** Refinamiento, detalles y pruebas finales.

**Historias de usuario:** US04, US05, US08

**Ceremonias:**
- **Review:** Demostración del producto completo.
- **Retrospectiva:** Qué funcionó bien, qué mejorar para próximos proyectos.

---

## 5. Enlaces

- **Repositorio GitHub:** https://github.com/JhonattanMA/DesayunosSorpresas
- **Jira:** [URL del proyecto]
- **Notion:** [URL del workspace]

**Usuarios GitHub del equipo:** CarolinaNicholls, edwinGuzman12, julianaastudillo08, JhonattanMA, ruizeduar8

---

## 6. Nota para el docente

- **Ramas:** Cada integrante trabaja en su rama `dev-nombre-apellido`; los cambios se integran a `dev` mediante Pull Request.
- **Flujo:** Tras las pruebas en `dev`, se hace Pull Request hacia `main` para liberar la versión final.
- **Enlaces compartidos:** GitHub (repositorio del proyecto) y Jira (backlog y seguimiento).
