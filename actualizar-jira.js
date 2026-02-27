/**
 * Actualizar Jira: prioridades, labels, descripciones ampliadas, vínculo Epic
 * RegaloMágico - Electiva 5
 * USO: node actualizar-jira.js EMAIL API_TOKEN
 */

const JIRA_DOMAIN = 'proyecto-dev-electivav.atlassian.net';
const EPIC_KEY = 'DE-2';

function textToADF(text) {
  if (!text) return undefined;
  const lines = String(text).split(/\n/).filter(Boolean);
  const content = lines.map(line => ({
    type: 'paragraph',
    content: line.startsWith('- ') || line.startsWith('• ')
      ? [{ type: 'text', text: line.replace(/^[-•]\s*/, '• ') }]
      : [{ type: 'text', text: line }]
  }));
  if (content.length === 0) return undefined;
  return { type: 'doc', version: 1, content };
}

const UPDATES = {
  'DE-1': { priority: 'High', labels: ['frontend', 'catalogo', 'usuario'], desc: 'Como visitante de la tienda quiero ver las categorías de productos disponibles (Desayunos, Flores, Chocolates, Peluches, Globos, Personalizados, Experiencias).\n\nCriterios de aceptación:\n• Las categorías se muestran de forma clara\n• Cada categoría tiene icono identificable\n• Al hacer clic se filtra el listado de productos\n• Mínimo 7 categorías definidas' },
  'DE-2': { priority: 'High', labels: ['electiva5', 'regalomagico', 'tienda'], desc: 'Proyecto Electiva 5. Tienda web donde los usuarios exploran productos, agregan al carrito y envían pedidos por WhatsApp. Sin pasarela de pagos.\n\nObjetivos:\n• Catálogo con categorías y filtros\n• Carrito funcional con localStorage\n• Integración WhatsApp\n• Diseño responsive\n• Panel admin (Firebase opcional)\n\nStack: HTML5, CSS3, JavaScript vanilla\nRepo: https://github.com/JhonattanMA/DesayunosSorpresas' },
  'DE-3': { priority: 'High', labels: ['frontend', 'catalogo', 'filtros'], desc: 'Como usuario quiero filtrar productos por categoría mediante botones.\n\nCriterios de aceptación:\n• Botones o filtros por categoría\n• Botón "Todos" muestra todos\n• Grid filtra al seleccionar categoría\n• Botón activo destacado' },
  'DE-4': { priority: 'High', labels: ['frontend', 'carrito', 'usuario'], desc: 'Como usuario quiero agregar productos al carrito desde el catálogo.\n\nCriterios de aceptación:\n• Botón "Agregar" en cada producto\n• Contador del carrito se actualiza\n• Mismo producto incrementa cantidad' },
  'DE-5': { priority: 'High', labels: ['frontend', 'carrito', 'usuario'], desc: 'Como usuario quiero modificar cantidad y eliminar del carrito.\n\nCriterios de aceptación:\n• Botones +/- para cantidad\n• Botón Eliminar por ítem\n• Total se recalcula correctamente\n• Mensaje cuando carrito vacío' },
  'DE-6': { priority: 'Medium', labels: ['frontend', 'catalogo', 'modal'], desc: 'Como usuario quiero ver detalle de producto antes de agregar.\n\nCriterios de aceptación:\n• Modal con nombre, precio, categoría, descripción\n• Botón agregar al carrito\n• Cerrar con X o clic fuera' },
  'DE-7': { priority: 'High', labels: ['frontend', 'whatsapp', 'carrito'], desc: 'Como usuario quiero enviar mi pedido por WhatsApp.\n\nCriterios de aceptación:\n• Botón "Pedir por WhatsApp" en carrito\n• Abre wa.me con mensaje predefinido\n• Mensaje incluye productos, cantidades y total\n• Enlace configurable en products.js\n• Botón flotante visible' },
  'DE-8': { priority: 'High', labels: ['frontend', 'responsive', 'ux'], desc: 'Como usuario quiero interfaz responsive en móvil.\n\nCriterios de aceptación:\n• Menú hamburguesa en móvil\n• Grid adaptable (1-2 col móvil)\n• Carrito usable en pantallas pequeñas\n• Botones táctiles y legibles' },
  'DE-9': { priority: 'Medium', labels: ['frontend', 'diseño', 'ux'], desc: 'Como usuario quiero diseño atractivo y moderno.\n\nCriterios de aceptación:\n• Paleta consistente (tema oscuro, dorados)\n• Tipografía legible (Cormorant, Montserrat)\n• Espaciado y jerarquía claros\n• Hero section con impacto' },
  'DE-10': { priority: 'Low', labels: ['admin', 'firebase'], desc: 'Como administrador quiero gestionar productos desde un panel.\n\nCriterios de aceptación:\n• Login usuario/contraseña\n• CRUD productos\n• Subir fotos\n• Firebase opcional' },
  'DE-11': { priority: 'High', labels: ['estructura'], desc: 'Implementar estructura HTML semántica con secciones: header, hero, categorías, productos, cómo funciona, contacto, footer, carrito lateral, modal. Usar etiquetas: header, nav, main, section, article, footer.' },
  'DE-12': { priority: 'High', labels: ['estructura'], desc: 'Header con logo RegaloMágico, menú (Inicio, Categorías, Productos, ¿Cómo funciona?, Contacto), botón carrito con contador, menú hamburguesa para móvil, fijo al scroll.' },
  'DE-13': { priority: 'High', labels: ['estructura'], desc: 'Hero: título "Encuentra el regalo perfecto", subtítulo descriptivo, botón CTA "Explorar regalos" enlazando a #productos.' },
  'DE-14': { priority: 'High', labels: ['carrito'], desc: 'Sidebar carrito: lista productos con imagen, nombre, precio, cantidad; botones +/-; Eliminar; total; botón Pedir por WhatsApp; mensaje carrito vacío.' },
  'DE-15': { priority: 'High', labels: ['carrito'], desc: 'Lógica cart.js: add(), remove(), updateQty(), persistencia localStorage, renderizar sidebar y contador.' },
  'DE-16': { priority: 'High', labels: ['whatsapp'], desc: 'Integración WhatsApp: buildWhatsAppUrl(), mensaje con productos y total, botón flotante, en carrito y sección contacto. Configurable en CONFIG.' },
  'DE-17': { priority: 'High', labels: ['catalogo'], desc: 'Grid productos: renderizar desde products.js, tarjetas con imagen/emoji fallback, nombre, categoría, precio, botones Agregar y Ver más.' },
  'DE-18': { priority: 'High', labels: ['catalogo'], desc: 'Filtros: botones Todos + por categoría, filterProducts(), sincronizar con clic en categoría, estilo activo.' },
  'DE-19': { priority: 'Medium', labels: ['catalogo'], desc: 'Modal detalle: overlay, imagen, nombre, precio, descripción, botón agregar, cerrar X o Escape.' },
  'DE-20': { priority: 'High', labels: ['estilos'], desc: 'Estilos CSS: variables (colores, fuentes, radios), tema oscuro con acentos dorados, Cormorant Garamond, Montserrat, Flexbox/Grid.' },
  'DE-21': { priority: 'High', labels: ['responsive'], desc: 'Responsive: media queries, menú hamburguesa, grid adaptable, carrito usable en móvil.' },
  'DE-22': { priority: 'High', labels: ['lider'], desc: 'Revisar PRs a dev, documentar convención commits, resolver conflictos, coordinar integración dev→main.' },
  'DE-23': { priority: 'High', labels: ['po'], desc: 'Mantener backlog en Jira, redactar historias, criterios de aceptación, comunicación con docente.' },
  'DE-24': { priority: 'Low', labels: ['admin'], desc: 'Configurar Firebase (Firestore + Storage), admin.html con login, CRUD productos, subida imágenes.' },
  'DE-25': { priority: 'High', labels: ['qa'], desc: 'Pruebas: flujo completo navegar→filtrar→agregar→carrito→WhatsApp. README y CONFIGURACION.md actualizados.' },
  'DE-26': { priority: 'High', labels: ['frontend', 'catalogo'], desc: 'Como usuario quiero ver categorías para encontrar regalos por tipo.\n\nCriterios de aceptación:\n• Categorías visibles\n• Iconos por categoría\n• Clic filtra productos\n• Mínimo 7 categorías' }
};

async function jiraFetch(email, token, path, opts = {}) {
  const auth = Buffer.from(`${email}:${token}`).toString('base64');
  const url = `https://${JIRA_DOMAIN}/rest/api/3${path}`;
  const res = await fetch(url, {
    ...opts,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...opts.headers
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

async function updateIssue(email, token, key, fields) {
  await jiraFetch(email, token, `/issue/${key}`, {
    method: 'PUT',
    body: JSON.stringify({ fields })
  });
}

async function main() {
  const email = process.argv[2];
  const token = process.argv[3];
  if (!email || !token) {
    console.log('USO: node actualizar-jira.js EMAIL API_TOKEN');
    process.exit(1);
  }

  console.log('Actualizando prioridades, labels y descripciones...\n');

  for (const [key, u] of Object.entries(UPDATES)) {
    try {
      const fields = {};
      if (u.priority) fields.priority = { name: u.priority };
      if (u.labels?.length) fields.labels = u.labels;
      if (u.desc) fields.description = textToADF(u.desc);

      await updateIssue(email, token, key, fields);
      console.log(`✓ ${key}: prioridad ${u.priority}, labels [${u.labels?.join(', ')}]`);
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      try {
        if (u.priority) await updateIssue(email, token, key, { priority: { name: u.priority } });
        if (u.labels?.length) await updateIssue(email, token, key, { labels: u.labels });
        if (u.desc) await updateIssue(email, token, key, { description: textToADF(u.desc) });
        console.log(`✓ ${key} (parcial)`);
      } catch (e2) {
        console.log(`✗ ${key}: ${e2.message}`);
      }
      await new Promise(r => setTimeout(r, 400));
    }
  }

  console.log('\nListo.');
}

main().catch(e => { console.error(e); process.exit(1); });
