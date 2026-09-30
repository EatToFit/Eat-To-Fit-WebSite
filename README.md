# Eat To Fit Website v1.0

Public brand / education / lead-generation website for Eat To Fit.

## Boundary
This repository **does not** contain or execute the Mahdi Diet engine, MP generation, client health database, login, payment, or nutrition API. Program preparation remains human-controlled outside the website.

## Stack
- Astro (static output)
- TypeScript-compatible Astro components
- Hand-written CSS
- Cloudflare Workers Static Assets
- GitHub as Source of Truth

## Local development
```bash
npm install
npm run dev
```
Open the URL printed by Astro (normally `http://localhost:4321`).

## Production build
```bash
npm run build
npm run check:static
```
The static output is generated in `dist/`.

## Canonical URL / sitemap
The repository intentionally does not invent a production host. After your first Cloudflare deployment, set `PUBLIC_SITE_URL` to the real public URL in the build environment and rebuild. Canonical tags and `sitemap.xml` will then use the real host.

## Cloudflare
Wrangler configuration is in `wrangler.jsonc` and deploys `./dist` as static assets.

```bash
npm run deploy
```

For Git-connected deployment, use:
- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

See `docs/DEPLOYMENT.md` for click-by-click instructions.
