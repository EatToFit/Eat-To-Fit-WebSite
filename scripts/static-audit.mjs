import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const required = [
  'package.json','astro.config.mjs','wrangler.jsonc','src/layouts/BaseLayout.astro','src/styles/global.css',
  'src/pages/index.astro','src/pages/how-it-works.astro','src/pages/meal-plan.astro','src/pages/science.astro',
  'src/pages/questionnaire.astro','src/pages/about.astro','src/pages/faq.astro','src/pages/contact.astro','src/pages/404.astro'
];
let failed = false;
for (const file of required) {
  if (!fs.existsSync(path.join(root,file))) { console.error(`[missing] ${file}`); failed = true; }
}
const textFiles = [];
function walk(dir){ for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,e.name); if(e.isDirectory()) walk(p); else if(/\.(astro|ts|css|md|jsonc|json|mjs)$/.test(e.name)) textFiles.push(p); }}
walk(path.join(root,'src')); textFiles.push(path.join(root,'wrangler.jsonc'));
const banned = [/Lorem ipsum/i,/TODO_CLIENT_VISIBLE/i,/example@example\.com/i,/\+98[ -]?9\d{9}/i];
for (const file of textFiles) {
  const text = fs.readFileSync(file,'utf8');
  for (const rule of banned) if(rule.test(text) && !file.endsWith('static-audit.mjs')) { console.error(`[banned-content] ${path.relative(root,file)} matched ${rule}`); failed = true; }
}
if (failed) process.exit(1);
console.log(`[audit] PASS — ${required.length} required files present; no banned client-facing placeholder patterns found.`);
