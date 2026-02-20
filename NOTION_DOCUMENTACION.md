# Documentación para Notion - Electiva 5

Usa este contenido para crear las páginas en Notion y mantener todo organizado.

---

## 1. Roles del equipo

| Rol              | Responsabilidad                                           |
|------------------|-----------------------------------------------------------|
| **Líder técnico** | Coordina el código, revisa PRs, define estándares        |
| **Product Owner** | Prioriza backlog, define criterios de aceptación         |
| **Desarrollador 1** | Header, navegación, hero                               |
| **Desarrollador 2** | Catálogo de productos y filtros                         |
| **Desarrollador 3** | Carrito y integración WhatsApp                          |
| **Desarrollador 4** | Estilos generales, responsive                           |
| **Desarrollador 5** | Modal de producto, detalles                             |
| **QA / Tester**  | Pruebas, reporte de bugs, validación de funcionalidad    |
| **Documentador** | README, Notion, documentación para el docente            |

*Asigna roles según los 9 integrantes de tu equipo.*

---

## 2. Backlog (para Jira / Notion)

### Épica: Tienda virtual de regalos

| ID | Historia de usuario | Prioridad |
|----|---------------------|-----------|
| US01 | Como usuario quiero ver categorías para encontrar regalos por tipo | Alta |
| US02 | Como usuario quiero filtrar productos por categoría | Alta |
| US03 | Como usuario quiero agregar productos al carrito | Alta |
| US04 | Como usuario quiero modificar cantidad y eliminar del carrito | Alta |
| US05 | Como usuario quiero ver el detalle de un producto antes de agregar | Media |
| US06 | Como usuario quiero enviar mi pedido por WhatsApp | Alta |
| US07 | Como usuario quiero ver una interfaz responsive en móvil | Alta |
| US08 | Como usuario quiero un diseño atractivo y moderno | Media |

### Tareas técnicas (Sprint)

| Tarea | Asignado | Rama |
|-------|----------|------|
| Estructura HTML base | - | dev-nombre-apellido |
| Header y navegación | - | dev-nombre-apellido |
| Hero section | - | dev-nombre-apellido |
| Sección de categorías | - | dev-nombre-apellido |
| Grid de productos | - | dev-nombre-apellido |
| Carrito lateral | - | dev-nombre-apellido |
| Integración WhatsApp | - | dev-nombre-apellido |
| Estilos y responsive | - | dev-nombre-apellido |
| Modal de producto | - | dev-nombre-apellido |

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

## 4. Sprint Planning (ejemplo)

**Sprint 1 – 2 semanas**

- Objetivo: MVP funcional con carrito y WhatsApp
- Historias: US01, US02, US03, US06, US07
- Ceremonia: Planning al inicio, Daily breve, Review al final

**Sprint 2 – 1 semana**

- Objetivo: Refinamiento y detalles
- Historias: US04, US05, US08
- Ceremonia: Retrospectiva

---

## 5. Enlaces

- **GitHub:** [URL del repositorio]
- **Jira:** [URL del proyecto]
- **Notion:** [URL del workspace]

*Actualiza estas URLs cuando las tengas.*

---

## Nota para el docente

- Cada integrante trabaja en su rama `dev-nombre-apellido`.
- Los cambios entran a `dev` vía Pull Request.
- Desde `dev` se hace Pull Request a `main` después de pruebas.
- Se comparten: GitHub + Jira con el docente.
