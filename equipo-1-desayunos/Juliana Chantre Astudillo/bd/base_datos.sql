-- ============================================================
-- RegaloMágico - Base de datos (PostgreSQL)
-- Equipo 1 - Migración desde un noSQL anterior a SQL
-- ============================================================

-- Extensión para UUID (opcional, para IDs más seguros)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------
-- Tabla: categorias
-- (equivalente a CATEGORIAS en el frontend)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categorias (
  id          VARCHAR(50) PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  icono       VARCHAR(20)  NOT NULL DEFAULT '🎁',
  orden       INT          NOT NULL DEFAULT 0,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Tabla: productos
-- (equivalente a una colección noSQL anterior "productos")
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(255) NOT NULL,
  categoria_id VARCHAR(50) NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
  precio      DECIMAL(12,2) NOT NULL CHECK (precio >= 0),
  emoji       VARCHAR(20)  NOT NULL DEFAULT '🎁',
  descripcion TEXT,
  contenido   TEXT,
  cantidad    INT          NOT NULL DEFAULT 1,
  activo      BOOLEAN      NOT NULL DEFAULT true,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas y filtros
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_productos_activo ON productos(activo);
CREATE INDEX IF NOT EXISTS idx_productos_created_at ON productos(created_at DESC);

-- ------------------------------------------------------------
-- Tabla: producto_fotos
-- (fotos de cada producto; en el noSQL anterior era array "fotos")
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS producto_fotos (
  id          SERIAL PRIMARY KEY,
  producto_id INT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  url         VARCHAR(500) NOT NULL,
  orden       INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_producto_fotos_producto ON producto_fotos(producto_id);

-- ------------------------------------------------------------
-- Tabla: pedidos
-- (pedidos enviados por WhatsApp; antes solo en frontend/carrito)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pedidos (
  id               SERIAL PRIMARY KEY,
  cliente_nombre    VARCHAR(255),
  cliente_telefono VARCHAR(50),
  cliente_email    VARCHAR(255),
  mensaje          TEXT,
  items            JSONB NOT NULL DEFAULT '[]',
  total            DECIMAL(12,2) NOT NULL DEFAULT 0,
  estado           VARCHAR(30) NOT NULL DEFAULT 'pendiente',
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON pedidos(created_at DESC);

-- ------------------------------------------------------------
-- Tabla: admin_usuarios (para panel admin)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_usuarios (
  id         SERIAL PRIMARY KEY,
  usuario    VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Trigger: actualizar updated_at en productos y pedidos
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_productos_updated_at ON productos;
CREATE TRIGGER tr_productos_updated_at
  BEFORE UPDATE ON productos
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS tr_pedidos_updated_at ON pedidos;
CREATE TRIGGER tr_pedidos_updated_at
  BEFORE UPDATE ON pedidos
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- ------------------------------------------------------------
-- Datos iniciales: categorías (igual que en frontend)
-- ------------------------------------------------------------
INSERT INTO categorias (id, nombre, icono, orden) VALUES
  ('desayunos', 'Desayunos', '🍳', 1),
  ('flores', 'Flores', '🌸', 2),
  ('chocolates', 'Chocolates', '🍫', 3),
  ('peluches', 'Peluches', '🧸', 4),
  ('globos', 'Globos', '🎈', 5),
  ('personalizados', 'Personalizados', '🎁', 6)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- Ejemplo de productos iniciales (4 desayunos del frontend)
-- Ejecuta este bloque solo una vez; si ya hay datos, omítelo o bórralo.
-- ------------------------------------------------------------
INSERT INTO productos (nombre, categoria_id, precio, emoji, descripcion, cantidad)
VALUES
  ('Desayuno Sorpresa "Reina Mamá"', 'desayunos', 65000, '👑', 'Desayuno con oso de peluche, chocolates Ferrero Rocher, flores y vaso decorado.', 1),
  ('Desayuno Sorpresa "El Mejor Papá"', 'desayunos', 85000, '👨', 'Sándwich, croissants, mini waffles, parfait, cerveza Corona, café frío, globo y mug.', 1),
  ('Desayuno Sorpresa Cumpleaños', 'desayunos', 125000, '🎂', 'Caja decorativa con croissants, donas, brownies, fresas, mermelada y jugos.', 1),
  ('Desayuno Sorpresa "Birthday Gold Black"', 'desayunos', 45000, '🖤', 'Globos negro y dorado, jugo, torta, dulces, caja de lujo y tarjeta personalizada.', 1);

-- Fotos de ejemplo (rutas relativas al frontend; el backend puede devolverlas como están)
-- INSERT en producto_fotos según producto_id después de tener IDs.

COMMENT ON TABLE categorias IS 'Categorías de productos (desayunos, flores, chocolates, etc.)';
COMMENT ON TABLE productos IS 'Catálogo de productos RegaloMágico';
COMMENT ON TABLE producto_fotos IS 'URLs o rutas de fotos por producto';
COMMENT ON TABLE pedidos IS 'Pedidos recibidos (desde carrito / WhatsApp)';
COMMENT ON TABLE admin_usuarios IS 'Usuarios del panel de administración';
