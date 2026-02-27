/**
 * Marcar todas las issues como Hecho/Terminado en Jira
 * RegaloMágico - Electiva 5
 * USO: node marcar-hecho-jira.js EMAIL API_TOKEN
 */

const JIRA_DOMAIN = 'proyecto-dev-electivav.atlassian.net';
const ISSUE_KEYS = ['DE-1','DE-2','DE-3','DE-4','DE-5','DE-6','DE-7','DE-8','DE-9','DE-10','DE-11','DE-12','DE-13','DE-14','DE-15','DE-16','DE-17','DE-18','DE-19','DE-20','DE-21','DE-22','DE-23','DE-24','DE-25','DE-26'];

async function jiraFetch(email, token, path, opts = {}) {
  const auth = Buffer.from(`${email}:${token}`).toString('base64');
  const res = await fetch(`https://${JIRA_DOMAIN}/rest/api/3${path}`, {
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

async function transicionar(email, token, issueKey) {
  const transitions = await jiraFetch(email, token, `/issue/${issueKey}/transitions`);
  const t = transitions.transitions?.find(x =>
    x.id === '31' || /listo|done|hecho|terminad|completad|finalizada/i.test(x.name || x.to?.name || '')
  );
  if (t) {
    await jiraFetch(email, token, `/issue/${issueKey}/transitions`, {
      method: 'POST',
      body: JSON.stringify({ transition: { id: t.id } })
    });
    return t.name;
  }
  throw new Error('No se encontró transición a Hecho');
}

async function main() {
  const email = process.argv[2];
  const token = process.argv[3];
  if (!email || !token) {
    console.log('USO: node marcar-hecho-jira.js EMAIL API_TOKEN');
    process.exit(1);
  }

  console.log('Marcando issues como Hecho...\n');
  let ok = 0;

  for (const key of ISSUE_KEYS) {
    try {
      const status = await transicionar(email, token, key);
      ok++;
      console.log(`✓ ${key} → ${status}`);
    } catch (e) {
      console.log(`✗ ${key}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 400));
  }

  console.log(`\n${ok}/${ISSUE_KEYS.length} issues marcadas como Hecho.`);
}

main().catch(e => { console.error(e); process.exit(1); });
