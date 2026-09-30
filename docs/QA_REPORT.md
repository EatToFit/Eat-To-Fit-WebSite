# QA Report — v1.0 Source Package

## Included checks
- RTL-first layout and Persian content
- Mobile breakpoints at small / tablet / desktop ranges
- No external stock imagery
- No user login, health database, payment or meal-plan generation
- No fake statistics, testimonials, contact accounts or phone numbers
- Contact channels are configuration-driven and hidden when not configured
- Reduced-motion handling
- Visible focus styles
- Semantic landmarks and skip link
- Unique page titles / meta descriptions
- 404 page
- Static sitemap generator that refuses to invent a production host
- Static source audit script

## Manual checks required after first real deployment
- Chrome / Firefox / Safari rendering
- 360 / 390 / 430 / 768 / 1024 / 1440 / 1920 viewport inspection
- Lighthouse Performance / Accessibility / SEO
- Real public URL canonical + sitemap
- Final contact channel values
- Legal review of Terms / Privacy before commercial launch

## Release blocker policy
Do not treat the site as public-commercial ready while contact details, public URL, and jurisdiction-specific legal text are still unset.
