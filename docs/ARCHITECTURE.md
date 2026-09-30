# Architecture — Eat To Fit Website v1.0

## Purpose
A public digital front door for Eat To Fit: brand presentation, service explanation, science/evidence framing, questionnaire guidance, learning content and official contact routing.

## Explicitly out of scope
- Meal plan auto-generation
- Mahdi Diet engine access
- Health-data storage
- User accounts / client portal
- Payments
- AI coach
- Nutrition API

## Layers
1. `src/config` — mutable public site settings (brand/contact/CTA)
2. `src/data` — navigation, FAQ, evidence-source and article data
3. `src/components` — reusable UI primitives and modules
4. `src/layouts` — page shell / metadata / global behavior
5. `src/pages` — routes
6. `src/styles` — global design tokens and utility primitives
7. `public` — static public assets
8. `docs` — governance and deployment documentation

## Design DNA
Derived from the approved Eat To Fit client-facing renderer palette and component language, expanded for a public health-tech brand experience:
- Primary: `#377c71`
- Deep primary: `#183d38`
- Secondary/Burgundy: `#7c3742`
- Warm off-white surfaces
- Rounded cards / subtle shadows / spacious rhythm
- True RTL and Persian-first content
- No generic diet stock-image language

## Portability
Cloudflare is a deployment target, not an application dependency. The site builds to plain static files in `dist/` and can be moved to another static host later.
