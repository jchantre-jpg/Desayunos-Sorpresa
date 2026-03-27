// Backend RegaloMágico - Equipo 1
// API REST con Express + PostgreSQL
//
// Arquitectura:
// - Este backend expone endpoints bajo `/api/...`
// - Consulta/actualiza PostgreSQL (BD) mediante `pg.Pool`
// - Implementa auth simple para admin (JWT) usando tabla `admin_usuarios`

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
// Puerto del servidor Express.
const PORT = process.env.PORT || 8080;

// Config DB desde variables de entorno (docker-compose) o valores por defecto.
// En docker-compose:
// - DB_HOST=db
// - DB_PORT=5432
// - DB_USER / DB_PASSWORD / DB_NAME
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'tu_usuario',
  password: process.env.DB_PASSWORD || 'tu_password',
  database: process.env.DB_NAME || 'tu_bd',
});

app.use(cors());
app.use(express.json());

// Config auth admin
// - SECRET para firmar tokens JWT
// - credenciales por defecto para crear usuario admin (si no existe)
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-equipo1-regalomagico';
const ADMIN_DEFAULT_USER = process.env.ADMIN_DEFAULT_USER || 'admin';
const ADMIN_DEFAULT_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';

// Helper para ejecutar queries con conexión del Pool.
// Evita repetir acquire/release en cada endpoint.
async function query(sql, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(sql, params);
    return res;
  } finally {
    client.release();
  }
}

// Crea el admin por defecto en el arranque (solo si no existe).
async function ensureDefaultAdmin() {
  const existing = await query('SELECT id FROM admin_usuarios WHERE usuario = $1', [ADMIN_DEFAULT_USER]);
  if (existing.rows.length === 0) {
    const hash = await bcrypt.hash(ADMIN_DEFAULT_PASSWORD, 10);
    await query(
      'INSERT INTO admin_usuarios (usuario, password_hash) VALUES ($1, $2)',
      [ADMIN_DEFAULT_USER, hash]
    );
    console.log(`Admin por defecto creado: ${ADMIN_DEFAULT_USER} / ${ADMIN_DEFAULT_PASSWORD}`);
  }
}

// Genera un JWT para el admin autenticado.
function generateToken(admin) {
  return jwt.sign(
    { sub: admin.id, usuario: admin.usuario },
    ADMIN_JWT_SECRET,
    { expiresIn: '8h' }
  );
}

// Middleware: valida Bearer token y rechaza si es inválido.
// Si es válido: setea `req.adminId` para usar en endpoints protegidos.
function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, ADMIN_JWT_SECRET);
    req.adminId = payload.sub;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// ---------------- RUTAS ----------------

// Login admin
// Body: { usuario, password }
// Response: { token, usuario } (si credenciales son válidas)
app.post('/api/admin/login', async (req, res) => {
  const { usuario, password } = req.body || {};
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }
  try {
    const result = await query(
      'SELECT id, usuario, password_hash FROM admin_usuarios WHERE usuario = $1',
      [usuario]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const admin = result.rows[0];
    const ok = await bcrypt.compare(password, admin.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = generateToken(admin);
    res.json({ token, usuario: admin.usuario });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Salud
// Endpoint usado por el FRONT para decidir si el backend está en 8080 o 8081.
app.get('/api/health', async (req, res) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, db: 'connected' });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Categorías
// Retorna todas las categorías ordenadas para que el front renderice filtros.
// Response: Array<{ id, nombre, icono, orden }>
app.get('/api/categorias', async (req, res) => {
  try {
    const result = await query('SELECT id, nombre, icono, orden FROM categorias ORDER BY orden, nombre');
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Productos (listar, con filtro opcional por categoría)
// Query param opcional:
// - categoria=<categoria_id>
// Response: Array con productos activos + fotos (fotos: [{id,url,orden}...])
app.get('/api/productos', async (req, res) => {
  const { categoria } = req.query;
  try {
    let sql = `
      SELECT p.id, p.nombre, p.categoria_id, p.precio, p.emoji, p.descripcion,
             p.contenido, p.cantidad, p.activo,
             COALESCE(
               json_agg(json_build_object('id', f.id, 'url', f.url, 'orden', f.orden)
                        ORDER BY f.orden)
               FILTER (WHERE f.id IS NOT NULL),
               '[]'
             ) AS fotos
      FROM productos p
      LEFT JOIN producto_fotos f ON f.producto_id = p.id
      WHERE p.activo = true
    `;
    const params = [];
    if (categoria) {
      params.push(categoria);
      sql += ` AND p.categoria_id = $${params.length}`;
    }
    sql += ' GROUP BY p.id ORDER BY p.created_at DESC';

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Producto por id (incluye fotos ordenadas)
// Params:
// - id=<producto_id>
// Response:
// - 200: producto con fotos
// - 404: { error: 'No encontrado' }
app.get('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      `
      SELECT p.id, p.nombre, p.categoria_id, p.precio, p.emoji, p.descripcion,
             p.contenido, p.cantidad, p.activo,
             COALESCE(
               json_agg(json_build_object('id', f.id, 'url', f.url, 'orden', f.orden)
                        ORDER BY f.orden)
               FILTER (WHERE f.id IS NOT NULL),
               '[]'
             ) AS fotos
      FROM productos p
      LEFT JOIN producto_fotos f ON f.producto_id = p.id
      WHERE p.id = $1
      GROUP BY p.id
      `,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Crear producto (solo admin)
// Protected por JWT (requireAdmin).
// Body esperado (mínimo):
// - nombre, categoria_id, precio, contenido, descripcion (contenido puede ir vacío)
// - fotos: array opcional de strings (urls)
// Response:
// - 201: producto creado (incluye id)
app.post('/api/productos', requireAdmin, async (req, res) => {
  const { nombre, categoria_id, precio, emoji, descripcion, contenido, cantidad, fotos } = req.body;
  try {
    const result = await query(
      `INSERT INTO productos (nombre, categoria_id, precio, emoji, descripcion, contenido, cantidad, activo)
       VALUES ($1,$2,$3,$4,$5,$6,COALESCE($7,1),true)
       RETURNING id`,
      [nombre, categoria_id, precio, emoji || '🎁', descripcion || '', contenido || '', cantidad || 1]
    );
    const idProducto = result.rows[0].id;

    if (Array.isArray(fotos)) {
      let orden = 0;
      for (const url of fotos) {
        orden += 1;
        await query(
          'INSERT INTO producto_fotos (producto_id, url, orden) VALUES ($1,$2,$3)',
          [idProducto, url, orden]
        );
      }
    }

    const creado = await query('SELECT * FROM productos WHERE id = $1', [idProducto]);
    res.status(201).json(creado.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Actualizar producto (solo admin)
// Protected por JWT (requireAdmin).
// Body esperado: mismo esquema que crear (más `fotos` opcional).
// Si llegan `fotos` como array, se reemplazan las fotos existentes.
app.put('/api/productos/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria_id, precio, emoji, descripcion, contenido, cantidad, activo, fotos } = req.body;
  try {
    await query(
      `UPDATE productos
       SET nombre = COALESCE($1, nombre),
           categoria_id = COALESCE($2, categoria_id),
           precio = COALESCE($3, precio),
           emoji = COALESCE($4, emoji),
           descripcion = COALESCE($5, descripcion),
           contenido = COALESCE($6, contenido),
           cantidad = COALESCE($7, cantidad),
           activo = COALESCE($8, activo)
       WHERE id = $9`,
      [nombre, categoria_id, precio, emoji, descripcion, contenido, cantidad, activo, id]
    );

    // Si vienen fotos, reemplazar
    if (Array.isArray(fotos)) {
      await query('DELETE FROM producto_fotos WHERE producto_id = $1', [id]);
      let orden = 0;
      for (const url of fotos) {
        orden += 1;
        await query(
          'INSERT INTO producto_fotos (producto_id, url, orden) VALUES ($1,$2,$3)',
          [id, url, orden]
        );
      }
    }

    const actualizado = await query('SELECT * FROM productos WHERE id = $1', [id]);
    res.json(actualizado.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Eliminar producto (solo admin)
// Protected por JWT (requireAdmin).
// Borra primero las fotos (producto_fotos) y luego el producto.
app.delete('/api/productos/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM producto_fotos WHERE producto_id = $1', [id]);
    await query('DELETE FROM productos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Crear pedido desde carrito (no requiere admin)
// No requiere admin.
// Body esperado:
// - cliente_nombre, cliente_telefono, cliente_email, mensaje
// - items: JSON (array) y total: decimal
// Response: pedido creado (con estado inicial 'pendiente')
app.post('/api/pedidos', async (req, res) => {
  const { cliente_nombre, cliente_telefono, cliente_email, mensaje, items, total } = req.body;
  try {
    const result = await query(
      `INSERT INTO pedidos (cliente_nombre, cliente_telefono, cliente_email, mensaje, items, total, estado)
       VALUES ($1,$2,$3,$4,$5,$6,'pendiente')
       RETURNING *`,
      [cliente_nombre, cliente_telefono, cliente_email, mensaje || '', items || [], total || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Listar pedidos (solo admin)
// Protected por JWT (requireAdmin).
// Response: lista de pedidos ordenada por created_at desc.
app.get('/api/pedidos', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      'SELECT id, cliente_nombre, cliente_telefono, total, estado, created_at FROM pedidos ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Cambiar estado de pedido (solo admin)
// Protected por JWT (requireAdmin).
// Body esperado:
// - estado=<string>
// Response:
// - 200: pedido actualizado
// - 404: si el id no existe
app.patch('/api/pedidos/:id/estado', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const result = await query(
      'UPDATE pedidos SET estado = COALESCE($1, estado) WHERE id = $2 RETURNING *',
      [estado, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Arrancar servidor:
// - primero asegura admin por defecto
// - luego levanta el listener Express
ensureDefaultAdmin()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend RegaloMágico escuchando en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error inicializando admin por defecto:', err);
    app.listen(PORT, () => {
      console.log(`Backend RegaloMágico escuchando en puerto ${PORT} (sin admin por defecto)`);
    });
  });

