/**
 * Script para crear issues en Jira via API
 * RegaloMágico - Electiva 5
 * 
 * USO:
 * 1. Crea un API token: https://id.atlassian.com/manage-profile/security/api-tokens
 * 2. Ejecuta: node crear-jira.js TU_EMAIL TU_API_TOKEN
 *    Ejemplo: node crear-jira.js miemail@gmail.com tu_token_aqui
 */

const JIRA_DOMAIN = 'proyecto-dev-electivav.atlassian.net';
const PROJECT_KEY = 'DE';

function textToADF(text) {
  if (!text) return undefined;
  const paragraphs = String(text).split(/\n\n|\n/).filter(Boolean);
  if (paragraphs.length === 0) return undefined;
  return {
    type: 'doc',
    version: 1,
    content: paragraphs.map(p => ({
      type: 'paragraph',
      content: [{ type: 'text', text: p }]
    }))
  };
}

const ISSUES = [
  // Epic
  { summary: 'Tienda virtual RegaloMágico', type: 'Epic', desc: 'Proyecto Electiva 5. Tienda web donde los usuarios exploran productos, agregan al carrito y envían pedidos por WhatsApp. Sin pasarela de pagos. Stack: HTML5, CSS3, JavaScript. Repo: https://github.com/JhonattanMA/DesayunosSorpresas' },
  // Stories (US01 ya existe como DE-1, empezamos desde US02)
  { summary: 'Como usuario quiero filtrar productos por categoría', type: 'Story', desc: 'AC: Botones por categoría; grid filtra; botón Todos; activo destacado.' },
  { summary: 'Como usuario quiero agregar productos al carrito', type: 'Story', desc: 'AC: Botón Agregar; contador actualiza; mismo producto incrementa cantidad.' },
  { summary: 'Como usuario quiero modificar cantidad y eliminar del carrito', type: 'Story', desc: 'AC: Botones +/-; Eliminar; total se recalcula; mensaje carrito vacío.' },
  { summary: 'Como usuario quiero ver detalle de producto antes de agregar', type: 'Story', desc: 'AC: Modal con nombre, precio, descripción; botón agregar; cerrar con X o Escape.' },
  { summary: 'Como usuario quiero enviar mi pedido por WhatsApp', type: 'Story', desc: 'AC: Botón abre wa.me; mensaje con productos y total; enlace configurable.' },
  { summary: 'Como usuario quiero interfaz responsive en móvil', type: 'Story', desc: 'AC: Menú hamburguesa; grid adaptable; carrito usable en móvil.' },
  { summary: 'Como usuario quiero diseño atractivo y moderno', type: 'Story', desc: 'AC: Paleta consistente; tipografía legible; espaciado y jerarquía claros.' },
  { summary: 'Como administrador quiero gestionar productos desde panel', type: 'Story', desc: 'AC: Login; CRUD productos; subir fotos; Firebase opcional.' },
  // Tasks
  { summary: 'Estructura HTML base semántica', type: 'Task', desc: 'Secciones: header, hero, categorías, productos, footer, carrito, modal.' },
  { summary: 'Header con logo menú y carrito', type: 'Task', desc: 'Logo, nav, botón carrito con contador, menú hamburguesa móvil.' },
  { summary: 'Hero section título subtítulo CTA', type: 'Task', desc: 'Título, subtítulo, botón Explorar regalos.' },
  { summary: 'Carrito lateral sidebar', type: 'Task', desc: 'Lista productos, total, +/-, Eliminar, Pedir por WhatsApp.' },
  { summary: 'Lógica carrito JS y localStorage', type: 'Task', desc: 'add, remove, updateQty, persistencia localStorage.' },
  { summary: 'Integración WhatsApp mensaje wa.me', type: 'Task', desc: 'buildWhatsAppUrl, botón flotante, en carrito y contacto.' },
  { summary: 'Grid productos renderizado dinámico', type: 'Task', desc: 'Tarjetas desde products.js, imagen/emoji fallback.' },
  { summary: 'Filtros por categoría', type: 'Task', desc: 'Botones filtro, filterProducts(), sincronizar con categorías.' },
  { summary: 'Modal detalle producto', type: 'Task', desc: 'Overlay, contenido, agregar, cerrar X/Escape.' },
  { summary: 'Estilos CSS variables layout tipografía', type: 'Task', desc: 'Variables, tema oscuro dorado, Cormorant Montserrat.' },
  { summary: 'Diseño responsive móvil tablet desktop', type: 'Task', desc: 'Media queries, hamburguesa, grid adaptable.' },
  { summary: 'Revisión PRs y estándares código', type: 'Task', desc: 'Revisar PRs a dev, convención commits, conflictos.' },
  { summary: 'Backlog y criterios aceptación', type: 'Task', desc: 'Mantener Jira, historias, comunicación docente.' },
  { summary: 'Configuración Firebase y panel admin', type: 'Task', desc: 'Firestore, Storage, admin.html, CRUD productos.' },
  { summary: 'Pruebas funcionales y documentación', type: 'Task', desc: 'Flujo completo, móvil/desktop, README, CONFIGURACION.md.' }
];

async function crearIssue(email, token, issue) {
  const auth = Buffer.from(`${email}:${token}`).toString('base64');
  const body = {
    fields: {
      project: { key: PROJECT_KEY },
      summary: issue.summary,
      issuetype: { name: issue.type }
    }
  };
  const descADF = textToADF(issue.desc);
  if (descADF) body.fields.description = descADF;
  const res = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err}`);
  }
  return res.json();
}

async function main() {
  const email = process.argv[2];
  const token = process.argv[3];
  if (!email || !token) {
    console.log(`
RegaloMágico - Crear issues en Jira

USO:
  node crear-jira.js TU_EMAIL TU_API_TOKEN

PASOS:
  1. Crea un API token en: https://id.atlassian.com/manage-profile/security/api-tokens
  2. Ejecuta: node crear-jira.js tuemail@gmail.com tu_token_aqui

Ejemplo:
  node crear-jira.js juliana@ejemplo.com ATATT3xFfGF0...
`);
    process.exit(1);
  }

  console.log('Creando issues en Jira...\n');
  let creadas = 0;

  for (const issue of ISSUES) {
    try {
      const result = await crearIssue(email, token, issue);
      creadas++;
      console.log(`✓ ${issue.type} ${result.key}: ${issue.summary}`);
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`✗ Error en "${issue.summary}":`, e.message);
    }
  }

  console.log(`\nListo. ${creadas}/${ISSUES.length} issues creadas.`);
}

main().catch(e => { console.error(e); process.exit(1); });
