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

**Ejemplos para 9 integrantes:**

1. `dev-ana-garcia`
2. `dev-carlos-rodriguez`
3. `dev-maria-lopez`
4. `dev-juan-martinez`
5. `dev-laura-fernandez`
6. `dev-pedro-sanchez`
7. `dev-sofia-torres`
8. `dev-diego-ramirez`
9. `dev-valentina-moreno`

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

1. Crear repositorio en GitHub ( vacío, sin README inicial si ya lo tienes local).
2. Agregar remote:
   ```bash
   git remote add origin https://github.com/USUARIO/regalomagico.git
   git push -u origin main
   git push -u origin dev
   ```

3. Compartir el enlace del repositorio con el docente.
