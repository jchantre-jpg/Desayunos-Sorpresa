# Contenido completo para Jira — RegaloMágico

**Proyecto:** Electiva 5 | Tienda virtual de regalos con compras por WhatsApp  
**Repositorio:** https://github.com/JhonattanMA/DesayunosSorpresas  
**Jira:** proyecto-dev-electivav.atlassian.net

---

## Cómo usar este documento

- Copia cada bloque en la issue correspondiente de Jira (Epic, Historia de usuario, Tarea).
- Usa el campo **Resumen** como título y el contenido completo en **Descripción**.
- Añade las **etiquetas** sugeridas.

---

# 1. ÉPICA

## Epic: Tienda virtual RegaloMágico

**Tipo:** Epic  
**Resumen:** Tienda virtual de regalos con compras por WhatsApp (sin pasarela de pagos)

**Descripción:**
```
Proyecto desarrollado para la Electiva 5. Tienda web elegante donde los usuarios 
exploran productos, agregan al carrito y envían su pedido directamente por WhatsApp. 
Sin integración de pasarelas de pago: el cobro y la coordinación se manejan por mensajería.

Objetivos:
• Catálogo de productos con categorías y filtros
• Carrito de compras funcional con persistencia en localStorage
• Integración con WhatsApp para enviar pedidos
• Diseño responsive y accesible
• Panel de administración para gestionar productos (opcional con Firebase)

Stack: HTML5, CSS3, JavaScript vanilla, Git/GitHub
Repositorio: https://github.com/JhonattanMA/DesayunosSorpresas
```

**Etiquetas:** `electiva5`, `regalomagico`, `tienda`

---

# 2. HISTORIAS DE USUARIO

---

## US01 — Ver categorías

**Tipo:** Story  
**Resumen:** Como usuario quiero ver categorías para encontrar regalos por tipo  
**Prioridad:** Alta  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como visitante de la tienda quiero ver las categorías de productos disponibles 
(Desayunos, Flores, Chocolates, Peluches, Globos, Personalizados, Experiencias) 
para poder explorar rápidamente el tipo de regalo que busco.
```

**Criterios de aceptación:**
- [ ] Las categorías se muestran de forma clara en la sección correspondiente
- [ ] Cada categoría tiene un icono o representación visual identificable
- [ ] Al hacer clic en una categoría se filtra el listado de productos
- [ ] Hay al menos 7 categorías definidas (Desayunos, Flores, Chocolates, Peluches, Globos, Personalizados, Experiencias)

**Etiquetas:** `frontend`, `catalogo`, `usuario`

---

## US02 — Filtrar productos por categoría

**Tipo:** Story  
**Resumen:** Como usuario quiero filtrar productos por categoría  
**Prioridad:** Alta  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como usuario quiero poder filtrar los productos por categoría mediante botones 
o filtros visibles para ver solo los productos del tipo que me interesa.
```

**Criterios de aceptación:**
- [ ] Hay botones o filtros para cada categoría en la sección de productos
- [ ] El botón "Todos" muestra todos los productos
- [ ] Al seleccionar una categoría, el grid muestra solo los productos de esa categoría
- [ ] El botón activo se destaca visualmente

**Etiquetas:** `frontend`, `catalogo`, `filtros`

---

## US03 — Agregar productos al carrito

**Tipo:** Story  
**Resumen:** Como usuario quiero agregar productos al carrito  
**Prioridad:** Alta  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como usuario quiero agregar productos al carrito desde la vista de producto 
o desde el catálogo para poder acumular los ítems que deseo comprar.
```

**Criterios de aceptación:**
- [ ] Existe un botón "Agregar" en cada tarjeta de producto
- [ ] Al hacer clic, el producto se añade al carrito
- [ ] El contador del carrito (header) se actualiza correctamente
- [ ] Se puede agregar el mismo producto múltiples veces (incrementa cantidad)

**Etiquetas:** `frontend`, `carrito`, `usuario`

---

## US04 — Modificar cantidad y eliminar del carrito

**Tipo:** Story  
**Resumen:** Como usuario quiero modificar cantidad y eliminar productos del carrito  
**Prioridad:** Alta  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como usuario quiero poder modificar la cantidad de cada ítem en el carrito 
y eliminar productos que ya no deseo para tener control total sobre mi pedido.
```

**Criterios de aceptación:**
- [ ] Se puede aumentar la cantidad con un botón +
- [ ] Se puede disminuir la cantidad con un botón − (mínimo 1)
- [ ] Existe un botón "Eliminar" por cada ítem
- [ ] El total del carrito se recalcula correctamente al modificar o eliminar
- [ ] El carrito vacío muestra un mensaje apropiado

**Etiquetas:** `frontend`, `carrito`, `usuario`

---

## US05 — Ver detalle de producto

**Tipo:** Story  
**Resumen:** Como usuario quiero ver el detalle de un producto antes de agregar  
**Prioridad:** Media  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como usuario quiero ver un modal o vista de detalle de cada producto con 
nombre, precio, descripción completa e imagen antes de decidir agregarlo al carrito.
```

**Criterios de aceptación:**
- [ ] Al hacer clic en un producto se abre un modal o vista de detalle
- [ ] El modal muestra: nombre, precio, categoría, descripción
- [ ] Hay un botón para agregar al carrito desde el modal
- [ ] Se puede cerrar el modal (botón X o clic fuera)

**Etiquetas:** `frontend`, `catalogo`, `modal`

---

## US06 — Enviar pedido por WhatsApp

**Tipo:** Story  
**Resumen:** Como usuario quiero enviar mi pedido por WhatsApp  
**Prioridad:** Alta  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como usuario quiero poder enviar mi pedido directamente por WhatsApp con 
un mensaje que incluya los productos, cantidades y total para coordinar 
el pago y la entrega con el vendedor.
```

**Criterios de aceptación:**
- [ ] Existe un botón "Pedir por WhatsApp" en el carrito
- [ ] Al hacer clic se abre WhatsApp (wa.me) con mensaje predefinido
- [ ] El mensaje incluye: lista de productos, cantidades, precios y total
- [ ] El enlace de WhatsApp es configurable (en products.js)
- [ ] Botón flotante de WhatsApp visible en la página

**Etiquetas:** `frontend`, `whatsapp`, `carrito`

---

## US07 — Interfaz responsive

**Tipo:** Story  
**Resumen:** Como usuario quiero ver una interfaz responsive en móvil  
**Prioridad:** Alta  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como usuario quiero que la tienda se adapte correctamente a móvil, tablet 
y escritorio para poder comprar desde cualquier dispositivo.
```

**Criterios de aceptación:**
- [ ] En móvil el menú se convierte en hamburguesa
- [ ] El grid de productos se adapta (1–2 columnas en móvil, más en desktop)
- [ ] El carrito lateral es usable en pantallas pequeñas
- [ ] Los botones y textos son legibles y táctiles en móvil

**Etiquetas:** `frontend`, `responsive`, `ux`

---

## US08 — Diseño atractivo y moderno

**Tipo:** Story  
**Resumen:** Como usuario quiero un diseño atractivo y moderno  
**Prioridad:** Media  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como usuario quiero que la tienda tenga una apariencia profesional, 
moderna y coherente para sentirme confiado al realizar mi pedido.
```

**Criterios de aceptación:**
- [ ] Paleta de colores consistente (tema oscuro, acentos dorados)
- [ ] Tipografía legible (Cormorant Garamond, Montserrat)
- [ ] Espaciado y jerarquía visual claros
- [ ] Hero section con impacto visual

**Etiquetas:** `frontend`, `diseño`, `ux`

---

## US09 — Panel de administración (opcional)

**Tipo:** Story  
**Resumen:** Como administrador quiero gestionar productos desde un panel  
**Prioridad:** Baja  
**Épica:** Tienda virtual RegaloMágico

**Descripción:**
```
Como administrador de la tienda quiero acceder a un panel seguro donde pueda 
agregar, editar y eliminar productos con fotos, descripciones y precios.
```

**Criterios de aceptación:**
- [ ] Panel admin con login (usuario y contraseña)
- [ ] CRUD de productos (crear, leer, actualizar, eliminar)
- [ ] Subida de fotos por producto
- [ ] Campos: nombre, categoría, precio, descripción, contenido detallado
- [ ] Funciona con Firebase (Firestore + Storage) o modo estático

**Etiquetas:** `admin`, `firebase`, `backend`

---

# 3. TAREAS TÉCNICAS

---

## T01 — Estructura HTML base

**Tipo:** Task  
**Resumen:** Estructura HTML base semántica (index.html)  
**Prioridad:** Alta  
**Asignado sugerido:** Eduar Ruiz Gomez  
**Rama:** dev-eduar-ruiz-gomez

**Descripción:**
```
Implementar la estructura HTML semántica del index.html con las secciones principales:
- Header
- Hero
- Categorías
- Productos
- Cómo funciona
- Contacto
- Footer
- Carrito lateral
- Modal de producto

Usar etiquetas semánticas: header, nav, main, section, article, footer.
```

**Historia vinculada:** US01, US07, US08

---

## T02 — Header con logo, menú y carrito

**Tipo:** Task  
**Resumen:** Header con logo, menú de navegación y botón carrito  
**Prioridad:** Alta  
**Asignado sugerido:** Eduar Ruiz Gomez  
**Rama:** dev-eduar-ruiz-gomez

**Descripción:**
```
- Logo RegaloMágico con enlace a inicio
- Menú de navegación: Inicio, Categorías, Productos, ¿Cómo funciona?, Contacto
- Botón del carrito con contador de ítems
- Menú hamburguesa para móvil
- Header fijo al hacer scroll
```

**Historia vinculada:** US07

---

## T03 — Hero section

**Tipo:** Task  
**Resumen:** Hero section con título, subtítulo y CTA  
**Prioridad:** Alta  
**Asignado sugerido:** Eduar Ruiz Gomez  
**Rama:** dev-eduar-ruiz-gomez

**Descripción:**
```
- Título principal: "Encuentra el regalo perfecto"
- Subtítulo descriptivo
- Botón CTA "Explorar regalos" que enlaza a #productos
- Diseño coherente con paleta del proyecto
```

**Historia vinculada:** US08

---

## T04 — Carrito lateral (sidebar)

**Tipo:** Task  
**Resumen:** Carrito lateral con lista, total y botones  
**Prioridad:** Alta  
**Asignado sugerido:** Edwin Guzman  
**Rama:** dev-edwin-guzman

**Descripción:**
```
- Sidebar deslizable desde la derecha
- Lista de productos con imagen, nombre, precio, cantidad
- Botones + / − para modificar cantidad
- Botón Eliminar por ítem
- Total calculado
- Botón "Pedir por WhatsApp"
- Estado vacío con mensaje "Tu carrito está vacío"
```

**Historia vinculada:** US03, US04, US06

---

## T05 — Lógica del carrito (JS + localStorage)

**Tipo:** Task  
**Resumen:** Lógica del carrito: agregar, modificar, eliminar, persistencia  
**Prioridad:** Alta  
**Asignado sugerido:** Edwin Guzman  
**Rama:** dev-edwin-guzman

**Descripción:**
```
- cart.js con objeto Cart
- add(product, quantity)
- remove(id)
- updateQty(id, delta)
- getTotal()
- Persistencia en localStorage (clave: regalomagico_cart)
- Renderizar sidebar y contador
- Eventos de apertura/cierre del carrito
```

**Historia vinculada:** US03, US04

---

## T06 — Integración WhatsApp

**Tipo:** Task  
**Resumen:** Integración WhatsApp: mensaje predefinido y enlace wa.me  
**Prioridad:** Alta  
**Asignado sugerido:** Edwin Guzman  
**Rama:** dev-edwin-guzman

**Descripción:**
```
- Función buildWhatsAppUrl(items)
- Mensaje con: saludo, lista de productos, cantidades, precios, total
- Enlace configurable en CONFIG (whatsappLink o whatsappNumber)
- Botón flotante WhatsApp
- Botón "Pedir por WhatsApp" en carrito
- Botón "Chatear por WhatsApp" en contacto
```

**Historia vinculada:** US06

---

## T07 — Grid de productos y renderizado dinámico

**Tipo:** Task  
**Resumen:** Grid de productos con renderizado dinámico desde JS  
**Prioridad:** Alta  
**Asignado sugerido:** Juliana Chantre Astudillo  
**Rama:** dev-juliana-chantre-astudillo

**Descripción:**
```
- Leer productos desde products.js (o Firebase)
- Renderizar tarjetas con: imagen/emoji, nombre, categoría, precio
- Botones Agregar y Ver más
- Fallback de imagen con emoji si no carga
```

**Historia vinculada:** US01, US02, US03

---

## T08 — Filtros por categoría

**Tipo:** Task  
**Resumen:** Filtros por categoría en sección productos  
**Prioridad:** Alta  
**Asignado sugerido:** Juliana Chantre Astudillo  
**Rama:** dev-juliana-chantre-astudillo

**Descripción:**
```
- Botones de filtro: Todos + una por cada categoría
- filterProducts(filter)
- Sincronizar con clic en tarjeta de categoría
- Estilo activo en botón seleccionado
```

**Historia vinculada:** US01, US02

---

## T09 — Modal de detalle de producto

**Tipo:** Task  
**Resumen:** Modal de detalle de producto  
**Prioridad:** Media  
**Asignado sugerido:** Juliana Chantre Astudillo  
**Rama:** dev-juliana-chantre-astudillo

**Descripción:**
```
- Modal con overlay
- Contenido: imagen, nombre, precio, categoría, descripción completa
- Botón "Agregar al carrito"
- Cerrar con X o clic en overlay
- Cerrar con tecla Escape
```

**Historia vinculada:** US05

---

## T10 — Estilos CSS (variables, layout, tipografía)

**Tipo:** Task  
**Resumen:** Estilos CSS: variables, layout y tipografía  
**Prioridad:** Alta  
**Asignado sugerido:** Juliana Chantre Astudillo  
**Rama:** dev-juliana-chantre-astudillo

**Descripción:**
```
- Variables CSS: colores, fuentes, radios, sombras
- Tema oscuro + acentos dorados
- Google Fonts: Cormorant Garamond, Montserrat
- Flexbox/Grid para layout
- styles.css estructurado
```

**Historia vinculada:** US08

---

## T11 — Diseño responsive

**Tipo:** Task  
**Resumen:** Diseño responsive (móvil, tablet, escritorio)  
**Prioridad:** Alta  
**Asignado sugerido:** Juliana Chantre Astudillo  
**Rama:** dev-juliana-chantre-astudillo

**Descripción:**
```
- Media queries para breakpoints
- Menú hamburguesa en móvil
- Grid adaptable (1–3+ columnas)
- Carrito usable en pantallas pequeñas
- Botones y espaciado táctil
```

**Historia vinculada:** US07

---

## T12 — Revisión de PRs y estándares de código

**Tipo:** Task  
**Resumen:** Revisión de Pull Requests y estándares de código  
**Prioridad:** Alta  
**Asignado sugerido:** Jhonatan Mariaca  
**Rama:** dev-jhonatan-mariaca

**Descripción:**
```
- Revisar PRs hacia rama dev
- Documentar convención de commits (feat:, fix:, style:, docs:, refactor:)
- Resolver conflictos de merge
- Coordinar integración dev → main
```

**Historia vinculada:** Épica

---

## T13 — Backlog y criterios de aceptación

**Tipo:** Task  
**Resumen:** Mantener backlog y criterios de aceptación  
**Prioridad:** Alta  
**Asignado sugerido:** Carolina Nicholls  
**Rama:** dev-carolina-nicholls

**Descripción:**
```
- Mantener backlog ordenado en Jira
- Redactar/actualizar historias de usuario
- Definir criterios de aceptación
- Comunicación con docente
```

**Historia vinculada:** Épica

---

## T14 — Configuración Firebase y panel admin (opcional)

**Tipo:** Task  
**Resumen:** Configurar Firebase y panel de administración  
**Prioridad:** Baja  
**Asignado sugerido:** Por asignar

**Descripción:**
```
- Configurar Firebase (Firestore + Storage)
- admin.html con login
- CRUD productos
- Subida de imágenes
- firebase-config.js, firebase-products.js, admin.js
```

**Historia vinculada:** US09

---

## T15 — Pruebas funcionales y documentación

**Tipo:** Task  
**Resumen:** Pruebas funcionales y documentación  
**Prioridad:** Alta  
**Asignado sugerido:** Juliana Chantre Astudillo  
**Rama:** dev-juliana-chantre-astudillo

**Descripción:**
```
- Flujo completo: navegar → filtrar → agregar → carrito → WhatsApp
- Probar en móvil y desktop
- README actualizado
- Guía de configuración (CONFIGURACION.md)
```

**Historia vinculada:** US07, US08

---

# 4. SPRINTS SUGERIDOS

## Sprint 1 (2 semanas) — MVP

**Objetivo:** Tienda funcional con carrito e integración WhatsApp.

| Historia | Tareas |
|----------|--------|
| US01, US02 | T07, T08 |
| US03, US04 | T04, T05 |
| US06 | T06 |
| US07 | T01, T02, T03, T11 |
| US08 | T10 |

**Ceremonias:** Planning, Daily (opcional), Review

---

## Sprint 2 (1 semana) — Refinamiento

**Objetivo:** Detalles, modal, pruebas y documentación.

| Historia | Tareas |
|----------|--------|
| US05 | T09 |
| US08 | T10 (refinamiento) |
| US09 (opcional) | T14 |
| General | T12, T13, T15 |

**Ceremonias:** Review, Retrospectiva

---

# 5. DEFINITION OF DONE

- [ ] Código en rama correcta y PR aprobado
- [ ] Funcionalidad probada manualmente
- [ ] Sin errores en consola
- [ ] Responsive verificado
- [ ] Documentación actualizada si aplica

---

# 6. EQUIPO Y RAMAS

| Rol | Integrante | GitHub | Rama |
|-----|------------|--------|------|
| Líder técnico | Jhonatan Mariaca | @JhonattanMA | dev-jhonatan-mariaca |
| Product Owner | Carolina Nicholls | @CarolinaNicholls | dev-carolina-nicholls |
| Desarrollador Frontend | Eduar Ruiz Gomez | @ruizeduar8 | dev-eduar-ruiz-gomez |
| Desarrollador Frontend | Edwin Guzman | @edwinGuzman12 | dev-edwin-guzman |
| Desarrolladora + QA | Juliana Chantre Astudillo | @julianaastudillo08 | dev-juliana-chantre-astudillo |

---

---

# 7. IMPORTACIÓN CSV

Si tu Jira permite importar desde CSV:
1. Ve a **Configuración del proyecto** → **Importar** (o usa el asistente de importación).
2. Sube el archivo `JIRA_IMPORTAR.csv` del mismo directorio.
3. Mapea las columnas: Summary, Description, Issue Type, Priority, Labels, Assignee.
4. Ajusta los nombres de asignados a los usuarios reales de tu Jira.

> **Nota:** Si los nombres de asignados no coinciden, impórtalos sin asignar y asígnalos después manualmente.

---

© 2025 RegaloMágico - Electiva 5
