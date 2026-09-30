import fs from 'node:fs';
import path from 'node:path';
const base = (process.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
if (!base) {
  console.log('[sitemap] PUBLIC_SITE_URL is not set; sitemap generation skipped to avoid publishing a fake canonical host.');
  process.exit(0);
}
const routes = ['/', '/how-it-works', '/meal-plan', '/science', '/questionnaire', '/about', '/faq', '/learn', '/learn/personalization-beyond-calories', '/learn/portion-language', '/learn/evidence-not-noise', '/contact'];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r => `  <url><loc>${base}${r}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.mkdirSync(path.join(process.cwd(), 'dist'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'dist', 'sitemap.xml'), xml);
console.log(`[sitemap] Generated ${routes.length} routes for ${base}`);
