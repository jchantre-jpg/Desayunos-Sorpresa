# Backlog - Registro de Asistencia (Plantilla Jira/Notion)

Plantilla para crear el backlog en Jira. Puedes copiar estas historias a Notion como base.

---

## Épica: Sistema de Registro de Asistencia

### User Stories

| ID | Historia | Prioridad | Estimación | Estado |
|----|----------|-----------|------------|--------|
| US-01 | Como docente, quiero agregar estudiantes para poder llevar su asistencia | Alta | 3 pts | |
| US-02 | Como docente, quiero editar y eliminar estudiantes de la lista | Alta | 2 pts | |
| US-03 | Como docente, quiero marcar asistencia (presente/ausente) por fecha | Alta | 5 pts | |
| US-04 | Como docente, quiero buscar estudiantes por nombre o documento | Media | 2 pts | |
| US-05 | Como docente, quiero exportar el registro de asistencia a CSV | Alta | 3 pts | |
| US-06 | Como docente, quiero ver estadísticas de asistencia por estudiante | Media | 5 pts | |
| US-07 | Como docente, quiero que los datos persistan en el navegador | Alta | 5 pts | |
| US-08 | Como usuario, quiero una interfaz responsive para usar en móvil | Media | 3 pts | |
| US-09 | Como usuario, quiero identificar las clases/sesiones por nombre | Baja | 2 pts | |

### Tareas técnicas

| ID | Tarea | Prioridad | Asignado |
|----|-------|-----------|----------|
| T-01 | Configurar estructura HTML base | Alta | |
| T-02 | Crear estilos CSS (layout, tablas, modales) | Alta | |
| T-03 | Implementar IndexedDB (estudiantes, asistencia) | Alta | |
| T-04 | Lógica CRUD de estudiantes | Alta | |
| T-05 | Lógica de registro de asistencia por fecha | Alta | |
| T-06 | Función de exportación CSV | Media | |
| T-07 | Modal de estadísticas | Media | |
| T-08 | Configuración Git y ramas | Alta | |
| T-09 | Documentación (README, roles, backlog) | Media | |

---

## Criterios de Aceptación (ejemplo US-01)

- [ ] Se puede agregar estudiante con documento, nombre y correo
- [ ] No se permiten documentos duplicados
- [ ] Los datos se guardan en IndexedDB
- [ ] La tabla se actualiza al agregar
