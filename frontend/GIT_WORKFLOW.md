# Flujo de trabajo con Git y GitHub

## Estrategia de ramas

### Ramas principales

- **main:** Producción estable
- **dev:** Integración de desarrollo

### Ramas por integrante

Cada miembro del equipo usa su rama siguiendo el estándar:

```
dev-nombre-apellido
```

**Ramas del equipo (5 integrantes):**

| Integrante | Rama | GitHub |
|------------|------|--------|
| Jhonatan Mariaca | `dev-jhonatan-mariaca` | [@JhonattanMA](https://github.com/JhonattanMA) |
| Carolina Nicholls | `dev-carolina-nicholls` | [@CarolinaNicholls](https://github.com/CarolinaNicholls) |
| Eduar Ruiz Gomez | `dev-eduar-ruiz-gomez` | [@ruizeduar8](https://github.com/ruizeduar8) |
| Edwin Guzman | `dev-edwin-guzman` | [@edwinGuzman12](https://github.com/edwinGuzman12) |
| Juliana Chantre Astudillo | `dev-juliana-chantre-astudillo` | [@julianaastudillo08](https://github.com/julianaastudillo08) |

---

## Inicialización del repositorio

```bash
# Inicializar Git
git init

# Crear rama dev
git checkout -b dev

# Primer commit
git add .
git commit -m "feat: estructura inicial de la tienda RegaloMágico"

# Crear rama main (desde dev o desde el commit inicial)
git checkout -b main
```

---

## Crear tu rama

```bash
# Asegúrate de estar en dev actualizada
git checkout dev
git pull origin dev

# Crear tu rama
git checkout -b dev-tu-nombre-tu-apellido
```

---

## Flujo de trabajo diario

1. **Sincronizar con dev:**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout dev-tu-nombre-tu-apellido
   git merge dev
   ```

2. **Hacer commits en tu rama:**
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   git push origin dev-tu-nombre-tu-apellido
   ```

3. **Pull Request a dev:**
   - En GitHub, crear PR desde `dev-tu-nombre-tu-apellido` → `dev`
   - Revisar y mergear

4. **Pull Request a main (tras pruebas):**
   - Crear PR desde `dev` → `main`
   - Solo cuando el docente o líder apruebe

---

## Convención de commits

- `feat:` Nueva funcionalidad  
- `fix:` Corrección de bug  
- `style:` Cambios de estilo (CSS, formato)  
- `docs:` Documentación  
- `refactor:` Refactorización  

Ejemplo: `feat: agregar modal de detalle de producto`

---

## Conectar con GitHub

**Repositorio del proyecto:** https://github.com/JhonattanMA/DesayunosSorpresas

1. Agregar el remote (si aún no está configurado):
   ```bash
   git remote add origin https://github.com/JhonattanMA/DesayunosSorpresas.git
   ```

2. Subir las ramas:
   ```bash
   git push -u origin main
   git push origin dev
   git push origin dev-jhonatan-mariaca dev-carolina-nicholls dev-eduar-ruiz-gomez dev-edwin-guzman dev-juliana-chantre-astudillo
   ```

3. Compartir el enlace con el docente: https://github.com/JhonattanMA/DesayunosSorpresas
