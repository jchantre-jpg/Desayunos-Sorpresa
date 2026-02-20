# Sprint Planning - Electiva 5

Plantilla para planificar el sprint en Notion/Jira.

---

## Sprint 1

**Duración:** [X] semanas  
**Objetivo:** MVP - Registro básico de asistencia

### Objetivos del Sprint

- Estructura HTML/CSS funcional
- CRUD de estudiantes
- Registro de asistencia por fecha
- Persistencia con IndexedDB

### Historias comprometidas

| Historia | Asignado | Estimación |
|----------|----------|------------|
| US-01 Agregar estudiantes | | 3 pts |
| US-02 Editar/eliminar estudiantes | | 2 pts |
| US-03 Marcar asistencia | | 5 pts |
| US-07 Persistencia de datos | | 5 pts |
| T-08 Configuración Git | | 2 pts |

### Definición de Hecho

- [ ] Código en rama dev-nombre-apellido
- [ ] Pull Request creado hacia dev
- [ ] Sin errores de consola
- [ ] Cumple criterios de aceptación

### Ceremonias

- **Daily:** [Día y hora]
- **Review:** [Fecha]
- **Retrospectiva:** [Fecha]

---

## Flujo de trabajo Git (recordatorio)

1. Crear rama: `git checkout -b dev-tu-nombre-tu-apellido`
2. Hacer commits en tu rama
3. Push: `git push origin dev-tu-nombre-tu-apellido`
4. Crear PR hacia `dev`
5. Después de pruebas en dev, PR de `dev` hacia `main`
