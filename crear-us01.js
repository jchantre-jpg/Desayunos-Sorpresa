/**
 * Crear solo US01 (ver categorías) si falta
 */
const JIRA_DOMAIN = 'proyecto-dev-electivav.atlassian.net';
const PROJECT_KEY = 'DE';

function textToADF(text) {
  return {
    type: 'doc',
    version: 1,
    content: [{
      type: 'paragraph',
      content: [{ type: 'text', text: text || '' }]
    }]
  };
}

async function main() {
  const email = process.argv[2];
  const token = process.argv[3];
  if (!email || !token) {
    console.log('USO: node crear-us01.js EMAIL API_TOKEN');
    process.exit(1);
  }
  const auth = Buffer.from(`${email}:${token}`).toString('base64');
  const body = {
    fields: {
      project: { key: PROJECT_KEY },
      summary: 'Como usuario quiero ver categorías para encontrar regalos por tipo',
      description: textToADF('AC: Categorías visibles; clic filtra productos; iconos por categoría; mínimo 7 categorías (Desayunos, Flores, Chocolates, Peluches, Globos, Personalizados, Experiencias).'),
      issuetype: { name: 'Story' }
    }
  };
  const res = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  const r = await res.json();
  console.log('✓ US01 creada:', r.key);
}

main().catch(e => { console.error(e.message); process.exit(1); });
