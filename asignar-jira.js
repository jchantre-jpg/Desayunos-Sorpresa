/**
 * Asignar roles y marcar tareas como Hecho en Jira
 * RegaloMágico - Electiva 5
 * 
 * USO: node asignar-jira.js EMAIL API_TOKEN
 */

const JIRA_DOMAIN = 'proyecto-dev-electivav.atlassian.net';
const PROJECT_KEY = 'DE';

// Mapeo: issue key -> display name para buscar asignado
const ASIGNACIONES = {
  'DE-1': 'Juliana Chantre',   // US01 ver categorías
  'DE-2': 'Jhonatan Mariaca',   // Epic -> Líder
  'DE-3': 'Juliana Chantre',    // US02 filtrar
  'DE-4': 'Edwin Guzman',      // US03 agregar carrito
  'DE-5': 'Edwin Guzman',      // US04 modificar carrito
  'DE-6': 'Juliana Chantre',   // US05 detalle
  'DE-7': 'Edwin Guzman',      // US06 whatsapp
  'DE-8': 'Juliana Chantre',   // US07 responsive
  'DE-9': 'Juliana Chantre',   // US08 diseño
  'DE-10': 'Juliana Chantre',  // US09 admin
  'DE-11': 'Eduar Ruiz',       // T01 estructura
  'DE-12': 'Eduar Ruiz',       // T02 header
  'DE-13': 'Eduar Ruiz',       // T03 hero
  'DE-14': 'Edwin Guzman',     // T04 carrito
  'DE-15': 'Edwin Guzman',     // T05 lógica carrito
  'DE-16': 'Edwin Guzman',     // T06 whatsapp
  'DE-17': 'Juliana Chantre',  // T07 grid
  'DE-18': 'Juliana Chantre',  // T08 filtros
  'DE-19': 'Juliana Chantre',  // T09 modal
  'DE-20': 'Juliana Chantre',  // T10 estilos
  'DE-21': 'Juliana Chantre',  // T11 responsive
  'DE-22': 'Jhonatan Mariaca',  // T12 revisión PRs
  'DE-23': 'Carolina Nicholls',  // T13 backlog
  'DE-24': 'Juliana Chantre',  // T14 firebase
  'DE-25': 'Juliana Chantre',  // T15 pruebas
  'DE-26': 'Juliana Chantre',  // US01 ver categorías
};

const TAREAS_HECHO = ['DE-11','DE-12','DE-13','DE-14','DE-15','DE-16','DE-17','DE-18','DE-19','DE-20','DE-21','DE-22','DE-23','DE-24','DE-25'];

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

async function buscarUsuario(email, token, query) {
  const users = await jiraFetch(email, token, `/user/assignable/search?query=${encodeURIComponent(query)}&project=${PROJECT_KEY}`);
  return users[0]?.accountId;
}

async function asignar(email, token, issueKey, accountId) {
  await jiraFetch(email, token, `/issue/${issueKey}`, {
    method: 'PUT',
    body: JSON.stringify({ fields: { assignee: { accountId } } })
  });
}

async function transicionar(email, token, issueKey, transitionName = 'Done') {
  const transitions = await jiraFetch(email, token, `/issue/${issueKey}/transitions`);
  const t = transitions.transitions?.find(x => 
    x.name.toLowerCase().includes('done') || 
    x.name.toLowerCase().includes('hecho') || 
    x.name.toLowerCase().includes('completad')
  );
  if (t) {
    await jiraFetch(email, token, `/issue/${issueKey}/transitions`, {
      method: 'POST',
      body: JSON.stringify({ transition: { id: t.id } })
    });
  }
}

async function main() {
  const email = process.argv[2];
  const token = process.argv[3];
  if (!email || !token) {
    console.log('USO: node asignar-jira.js EMAIL API_TOKEN');
    process.exit(1);
  }

  const nombresUnicos = [...new Set(Object.values(ASIGNACIONES))];
  const usuarios = {};
  for (const n of nombresUnicos) {
    const id = await buscarUsuario(email, token, n);
    if (id) { usuarios[n] = id; console.log(`✓ ${n}`); }
    else console.log(`✗ No encontrado: ${n}`);
  }

  console.log('\nAsignando issues...');
  for (const [key, nombre] of Object.entries(ASIGNACIONES)) {
    const accountId = usuarios[nombre];
    if (accountId) {
      try {
        await asignar(email, token, key, accountId);
        console.log(`  ✓ ${key} → ${nombre}`);
      } catch (e) { console.log(`  ✗ ${key}: ${e.message}`); }
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log('\nMarcando tareas como Hecho...');
  for (const key of TAREAS_HECHO) {
    try {
      await transicionar(email, token, key);
      console.log(`  ✓ ${key} → Hecho`);
    } catch (e) { console.log(`  ✗ ${key}: ${e.message}`); }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\nListo.');
}

main().catch(e => { console.error(e); process.exit(1); });
