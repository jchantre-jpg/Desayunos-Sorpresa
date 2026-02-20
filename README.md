# Registro de Asistencia - Electiva 5

Página web para el registro de asistencia de estudiantes. Desarrollada con HTML, CSS, JavaScript e IndexedDB.

## Stack Tecnológico

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Base de datos:** IndexedDB (persistencia local en el navegador)
- **Control de versiones:** Git + GitHub

## Estructura del Proyecto

```
electiva 5/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   ├── db.js           # Lógica de IndexedDB
│   └── app.js          # Lógica de la aplicación
├── docs/               # Documentación para Notion/Jira
│   ├── ROLES.md
│   ├── BACKLOG.md
│   ├── STACK.md
│   └── SPRINT-PLANNING.md
├── .gitignore
└── README.md
```

## Estrategia de Ramas (Git)

- **main** – Rama principal (producción). Solo recibe merges después de pruebas.
- **dev** – Rama de desarrollo. Integra los cambios de los integrantes.
- **dev-nombre-apellido** – Una rama por cada integrante (ej: dev-maria-garcia).

### Flujo de trabajo

1. Cada integrante trabaja en su rama: `dev-nombre-apellido`
2. Crear **Pull Request** hacia `dev` con los cambios
3. Revisión y merge a `dev`
4. Pruebas en `dev`
5. Crear **Pull Request** de `dev` hacia `main`
6. Merge a `main` tras aprobación

### Comandos básicos

```bash
# Clonar e iniciar
git clone <url-repositorio>
cd "electiva 5"

# Crear tu rama (reemplaza con tu nombre)
git checkout -b dev-tu-nombre-tu-apellido

# Trabajar y subir
git add .
git commit -m "Descripción del cambio"
git push origin dev-tu-nombre-tu-apellido

# Sincronizar con dev
git fetch origin dev
git merge origin/dev
```

## Ramas disponibles

Para crear las 9 ramas del equipo:

```bash
git checkout -b dev
git checkout main
git branch dev-integrante-1
git branch dev-integrante-2
git branch dev-integrante-3
git branch dev-integrante-4
git branch dev-integrante-5
git branch dev-integrante-6
git branch dev-integrante-7
git push origin dev dev-integrante-1 dev-integrante-2 dev-integrante-3 dev-integrante-4 dev-integrante-5 dev-integrante-6 dev-integrante-7
```

*(Renombra las ramas con los nombres reales: dev-maria-garcia, dev-juan-lopez, etc.)*

## Cómo ejecutar

1. Abre `index.html` en un navegador.
2. O usa un servidor local (ej. Live Server en VS Code).

## Funcionalidades

- Registrar estudiantes (documento, nombre, correo)
- Marcar asistencia (presente/ausente) por fecha
- Buscar estudiantes
- Exportar asistencia a CSV
- Ver estadísticas de asistencia
