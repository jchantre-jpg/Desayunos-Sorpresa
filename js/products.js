/**
 * RegaloMágico - Catálogo de productos
 * Configura aquí el número de WhatsApp y los productos
 */

const CONFIG = {
  // Reemplaza con tu número de WhatsApp (código país + número, sin + ni espacios)
  whatsappNumber: '573001234567',
  // Mensaje predefinido para pedidos
  orderMessage: '¡Hola! Me gustaría hacer un pedido desde RegaloMágico.'
};

const CATEGORIAS = [
  { id: 'flores', nombre: 'Flores', icono: '🌸' },
  { id: 'chocolates', nombre: 'Chocolates', icono: '🍫' },
  { id: 'peluches', nombre: 'Peluches', icono: '🧸' },
  { id: 'globos', nombre: 'Globos', icono: '🎈' },
  { id: 'personalizados', nombre: 'Personalizados', icono: '✨' },
  { id: 'experiencias', nombre: 'Experiencias', icono: '🎭' }
];

const PRODUCTOS = [
  { id: 1, nombre: 'Ramo de Rosas Rojas', categoria: 'flores', precio: 45000, emoji: '🌹', descripcion: 'Hermoso ramo de 12 rosas rojas frescas, ideal para declarar tu amor.' },
  { id: 2, nombre: 'Tulipanes Mixtos', categoria: 'flores', precio: 55000, emoji: '🌷', descripcion: 'Ramo de tulipanes en colores variados para alegrar cualquier momento.' },
  { id: 3, nombre: 'Caja de Chocolates Premium', categoria: 'chocolates', precio: 35000, emoji: '🍫', descripcion: 'Caja con 24 chocolates artesanales de diferentes sabores.' },
  { id: 4, nombre: 'Chocolates con Frutos Secos', categoria: 'chocolates', precio: 42000, emoji: '🍬', descripcion: 'Deliciosa combinación de chocolate belga con almendras y nueces.' },
  { id: 5, nombre: 'Osito de Peluche Grande', categoria: 'peluches', precio: 65000, emoji: '🧸', descripcion: 'Suave osito de peluche 60cm, perfecto para abrazar.' },
  { id: 6, nombre: 'Corazón de Peluche', categoria: 'peluches', precio: 28000, emoji: '❤️', descripcion: 'Corazón rojo suave con mensaje personalizable.' },
  { id: 7, nombre: 'Kit Globos Cumpleaños', categoria: 'globos', precio: 38000, emoji: '🎂', descripcion: 'Pack de 15 globos metálicos para decorar fiestas.' },
  { id: 8, nombre: 'Bouquet de Globos', categoria: 'globos', precio: 45000, emoji: '🎈', descripcion: 'Elegante bouquet con globos de colores y cinta.' },
  { id: 9, nombre: 'Taza Personalizada', categoria: 'personalizados', precio: 25000, emoji: '☕', descripcion: 'Taza de cerámica con foto o mensaje a elegir.' },
  { id: 10, nombre: 'Almohada con Foto', categoria: 'personalizados', precio: 35000, emoji: '🛏️', descripcion: 'Almohada suave con impresión de tu foto favorita.' },
  { id: 11, nombre: 'Caja Sorpresa Personalizada', categoria: 'personalizados', precio: 85000, emoji: '🎁', descripcion: 'Caja con múltiples regalos según preferencias del destinatario.' },
  { id: 12, nombre: 'Experiencia Spa para 2', categoria: 'experiencias', precio: 150000, emoji: '💆', descripcion: 'Vale para sesión de spa en pareja (masaje + hidratación).' },
  { id: 13, nombre: 'Cena Romántica', categoria: 'experiencias', precio: 120000, emoji: '🕯️', descripcion: 'Reserva para cena en restaurante seleccionado.' },
  { id: 14, nombre: 'Girasoles Frescos', categoria: 'flores', precio: 38000, emoji: '🌻', descripcion: 'Ramo de girasoles que irradian alegría.' }
];
