/**
 * Ver transiciones disponibles para DE-1
 */
const JIRA_DOMAIN = 'proyecto-dev-electivav.atlassian.net';
const email = process.argv[2];
const token = process.argv[3];

async function main() {
  const auth = Buffer.from(`${email}:${token}`).toString('base64');
  const res = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue/DE-1/transitions`, {
    headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' }
  });
  const data = await res.json();
  console.log('Transiciones disponibles para DE-1:');
  console.log(JSON.stringify(data.transitions, null, 2));
}

main().catch(console.error);
