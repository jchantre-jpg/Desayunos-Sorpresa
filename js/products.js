/**
 * RegaloMágico - Catálogo de productos
 * Configura aquí el número de WhatsApp y los productos
 */

const CONFIG = {
  // Enlace directo de WhatsApp (para agregar contacto / abrir chat)
  whatsappLink: 'https://wa.me/qr/AAEWDCVCR6AVI1',
  // Opcional: número con código de país (ej: 573001234567) para mensajes pre-llenados.
  // Si no se define, se usa whatsappLink para todos los botones.
  whatsappNumber: '',
  // Mensaje predefinido para pedidos
  orderMessage: '¡Hola! Me gustaría hacer un pedido desde RegaloMágico.'
};

const CATEGORIAS = [
  { id: 'desayunos', nombre: 'Desayunos', icono: '🍳' },
  { id: 'flores', nombre: 'Flores', icono: '🌸' },
  { id: 'chocolates', nombre: 'Chocolates', icono: '🍫' },
  { id: 'peluches', nombre: 'Peluches', icono: '🧸' },
  { id: 'globos', nombre: 'Globos', icono: '🎈' },
  { id: 'personalizados', nombre: 'Personalizados', icono: '✨' },
  { id: 'experiencias', nombre: 'Experiencias', icono: '🎭' }
];

const PRODUCTOS = [
  { id: 1, nombre: 'Desayuno Sorpresa "Reina Mamá"', categoria: 'desayunos', precio: 65000, emoji: '👑', fotos: ['imagenes/1.jpg'], descripcion: `🎀 Desayuno Sorpresa "Reina Mamá" 🎀

Un detalle lleno de amor, dulzura y elegancia para sorprender desde el primer momento del día. 💕

Este hermoso desayuno incluye:
🧸 1 Tierno oso de peluche con corona, perfecto para recordarle que es la reina del hogar.
🍫 1 Cajita con deliciosos chocolates Ferrero Rocher para endulzar su mañana.
🌸 Finas flores en tonos rosados que aportan un toque romántico y delicado.
🥤 1 Vaso decorado especial para mamá.
🎁 Presentación premium en caja redonda con moño elegante en tonos rosa y dorado.

Ideal para celebrar el Día de la Madre, cumpleaños o simplemente para decir "Te amo, mamá" de una manera inolvidable. 👑💝

Sorprende, emociona y crea un momento mágico desde el amanecer. 🌅` },
  { id: 2, nombre: 'Desayuno Sorpresa "El Mejor Papá"', categoria: 'desayunos', precio: 85000, emoji: '👨', fotos: ['imagenes/2.jpg'], descripcion: `💙🎈 Desayuno Sorpresa "El Mejor Papá" 🎈💙

Sorprende a papá desde el primer momento del día con un detalle lleno de sabor, amor y celebración. 🥳

Este increíble desayuno incluye:

🥪 1 Sándwich fresco y delicioso
🥐 4 Croissants recién horneados
🧇 4 Mini waffles con frutas y Nutella
🍓 1 Parfait de yogur con granola y frutas
🥜 1 cajita con mix de frutos secos
🍺 1 Cerveza Corona
☕ 1 Bebida tipo café frío estilo Starbucks
🎈 1 Globo metálico "Happy Father's Day"
🎉 Decoración con globos en tonos azul y dorado
☕ 1 Mug especial "Te amo, Papá"
💌 Mensajes personalizados y detalles decorativos
🧺 Presentación en bandeja decorada lista para regalar

Un regalo perfecto para el Día del Padre, cumpleaños o simplemente para recordarle que es el mejor del mundo. 🌍💙

Haz que su mañana sea inolvidable con un desayuno lleno de detalles que enamoran. ✨` },
  { id: 3, nombre: 'Desayuno Sorpresa Cumpleaños', categoria: 'desayunos', precio: 125000, emoji: '🎂', fotos: ['imagenes/3.jpg'], descripcion: `🎂 Desayuno Sorpresa Cumpleaños 🎂

Hermosa caja decorativa color blanco y rosado con mensaje "Happy Birthday" al frente y detalle personalizado con el nombre.

Incluye:
🥐 Croissants
🍩 Donas glaseadas
🥖 Panes artesanales
🍫 Brownies de chocolate
🍓 Fresas frescas
🍯 Mini frascos de mermelada
🧃 Pequeños jugos en botella
🎈 Globo decorativo rosado con efecto brillante

Presentación elegante y especial, ideal para sorprender en cumpleaños. 💝` },
  { id: 4, nombre: 'Desayuno Sorpresa "Birthday Gold Black"', categoria: 'desayunos', precio: 45000, emoji: '🖤', fotos: ['imagenes/4.jpg'], descripcion: `🎉 Desayuno Sorpresa "Birthday Gold Black" 🎉

Un detalle elegante, moderno y lleno de estilo para celebrar un cumpleaños inolvidable desde el primer momento del día. 🖤✨

Este espectacular desayuno incluye:
🎈 Arreglo de globos en tonos negro y dorado con mensaje personalizado "Happy Birthday".
🧃 Botella de jugo natural decorada con moño elegante.
🍰 Deliciosa porción de torta, perfecta para celebrar.
🍬 Variedad de dulces y snacks seleccionados para disfrutar cada momento.
🥜 Frutos secos y golosinas en presentación premium.
🎁 Caja de lujo decorada en tonos negro y dorado con acabados elegantes.
💌 Tarjeta personalizada con nombre y edad para hacerlo aún más especial.

Ideal para sorprender en cumpleaños, especialmente celebraciones de 18 años o fechas importantes. 🥳

Sorprende, emociona y crea un momento único que jamás olvidará. 🌟

Personalizable con nombre, edad y mensaje especial. 💛` },
  { id: 5, nombre: 'Ramo de Rosas Rojas', categoria: 'flores', precio: 45000, emoji: '🌹', descripcion: 'Hermoso ramo de 12 rosas rojas frescas, ideal para declarar tu amor.' },
  { id: 6, nombre: 'Tulipanes Mixtos', categoria: 'flores', precio: 55000, emoji: '🌷', descripcion: 'Ramo de tulipanes en colores variados para alegrar cualquier momento.' },
  { id: 7, nombre: 'Caja de Chocolates Premium', categoria: 'chocolates', precio: 35000, emoji: '🍫', descripcion: 'Caja con 24 chocolates artesanales de diferentes sabores.' },
  { id: 8, nombre: 'Chocolates con Frutos Secos', categoria: 'chocolates', precio: 42000, emoji: '🍬', descripcion: 'Deliciosa combinación de chocolate belga con almendras y nueces.' },
  { id: 9, nombre: 'Osito de Peluche Grande', categoria: 'peluches', precio: 65000, emoji: '🧸', descripcion: 'Suave osito de peluche 60cm, perfecto para abrazar.' },
  { id: 10, nombre: 'Corazón de Peluche', categoria: 'peluches', precio: 28000, emoji: '❤️', descripcion: 'Corazón rojo suave con mensaje personalizable.' },
  { id: 11, nombre: 'Kit Globos Cumpleaños', categoria: 'globos', precio: 38000, emoji: '🎂', descripcion: 'Pack de 15 globos metálicos para decorar fiestas.' },
  { id: 12, nombre: 'Bouquet de Globos', categoria: 'globos', precio: 45000, emoji: '🎈', descripcion: 'Elegante bouquet con globos de colores y cinta.' },
  { id: 13, nombre: 'Taza Personalizada', categoria: 'personalizados', precio: 25000, emoji: '☕', descripcion: 'Taza de cerámica con foto o mensaje a elegir.' },
  { id: 14, nombre: 'Almohada con Foto', categoria: 'personalizados', precio: 35000, emoji: '🛏️', descripcion: 'Almohada suave con impresión de tu foto favorita.' },
  { id: 15, nombre: 'Caja Sorpresa Personalizada', categoria: 'personalizados', precio: 85000, emoji: '🎁', descripcion: 'Caja con múltiples regalos según preferencias del destinatario.' },
  { id: 16, nombre: 'Experiencia Spa para 2', categoria: 'experiencias', precio: 150000, emoji: '💆', descripcion: 'Vale para sesión de spa en pareja (masaje + hidratación).' },
  { id: 17, nombre: 'Cena Romántica', categoria: 'experiencias', precio: 120000, emoji: '🕯️', descripcion: 'Reserva para cena en restaurante seleccionado.' },
  { id: 18, nombre: 'Girasoles Frescos', categoria: 'flores', precio: 38000, emoji: '🌻', descripcion: 'Ramo de girasoles que irradian alegría.' }
];
