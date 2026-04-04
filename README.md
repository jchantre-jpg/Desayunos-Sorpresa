# Juliana Chantre Astudillo - Equipo 1 Desayunos

Proyecto separado en **frontend**, **backend** y **bd** para subir al repo ApoloByte (equipo 1-desayunos).

## Estructura

| Carpeta     | Contenido |
|------------|-----------|
| **frontend** | Tienda RegaloMágico (electiva 5): HTML, CSS, JS, imágenes. |
| **backend**  | API Express + PostgreSQL (SQL) para leer/escribir productos y pedidos. |
| **bd**       | Placeholder para scripts SQL o configuración de base de datos. |

## Puertos (equipo 1 → terminan en 1)

- Frontend: **3001**
- Backend:  **8081**
- Base de datos: **54321**

## CI/CD

Deploy automático a VPS con **GitHub Actions** al hacer `push` a `main` (workflow: Deploy VPS Equipo 1).

## Cómo usar

- **Solo frontend (local):** Entra en `frontend/` y ejecuta `iniciar-tienda.ps1` o abre `index.html`.
- **Con Docker:** En esta carpeta ejecuta `docker compose up -d` cuando tengas `Dockerfile` en `frontend` y `backend`.

---

Equipo 1 - Electiva - julianaastudillo06@gmail.com
