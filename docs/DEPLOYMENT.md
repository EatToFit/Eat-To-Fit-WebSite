# Deployment — GitHub → Cloudflare Workers

## A. Local test
1. Install Node.js 22 LTS (or newer supported Node 22) and Git.
2. Extract the repository folder.
3. Open Terminal in the repository root.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local Astro URL (normally `http://localhost:4321`).
7. Review all pages and mobile layout.
8. Stop dev server with `Ctrl+C`.
9. Run `npm run build`.
10. Run `npm run check:static`.

## B. Push to GitHub
If the GitHub repository is empty:

```bash
git init
git add .
git commit -m "Initial Eat To Fit website v1.0"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## C. Connect Cloudflare Workers
1. Cloudflare Dashboard → Workers & Pages.
2. Choose **Create application** / **Import a repository** (wording can change slightly).
3. Select the GitHub repository `eat-to-fit-website`.
4. Production branch: `main`.
5. Build command: `npm run build`.
6. Deploy command: `npx wrangler deploy`.
7. Save and deploy.
8. Cloudflare reads `wrangler.jsonc` and deploys `./dist` as Static Assets.

## D. After first deployment
1. Copy the real `workers.dev` URL.
2. In Cloudflare build variables, add `PUBLIC_SITE_URL` with that full `https://...workers.dev` URL.
3. Trigger a new deployment (push a tiny documentation commit or use retry/redeploy if available).
4. Confirm page source now contains canonical tags.
5. Confirm `/sitemap.xml` exists.

## E. Contact channels
Edit only `src/config/site.ts` and fill the real values under `social`. Empty values are intentionally hidden from the public UI.

## F. Normal future workflow
Edit locally → test → commit → push to `main` → Cloudflare deploys automatically.

Never edit the production files directly in Cloudflare as the normal workflow. GitHub remains Source of Truth.
