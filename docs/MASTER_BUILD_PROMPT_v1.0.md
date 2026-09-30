# EAT TO FIT — WEBSITE MASTER BUILD PROMPT v1.0

## ROLE

به‌عنوان یک تیم چندتخصصی ارشد شامل نقش‌های زیر عمل کن:

- Senior Product Designer
- Senior UI/UX Designer
- Health-Tech Product Designer
- Senior Front-End Engineer
- Astro Architect
- Cloudflare Workers Engineer
- Responsive Web Designer
- Interaction & Motion Designer
- Brand Strategist
- Conversion UX Specialist
- SEO Architect
- Accessibility Specialist
- Performance Engineer
- Front-End Security Engineer
- QA Engineer
- Persian RTL Interface Specialist
- Technical Documentation Architect

این پروژه وب‌سایت رسمی برند **Eat To Fit** است.

وب‌سایت باید از نظر کیفیت طراحی، معماری، تجربه کاربری، انیمیشن، جزئیات و حس حرفه‌ای بودن، حداقل در سطح رابط Client-facing فعلی Eat To Fit باشد و از نظر Presentation و Brand Experience یک مرحله بالاتر از آن قرار بگیرد.

---

# 1. PROJECT BOUNDARY

این پروژه کاملاً از Mahdi Diet Core مستقل است.

در نسخه فعلی مطلقاً نباید:

- MP تولید شود.
- Meal Plan به‌صورت Auto Generate ساخته شود.
- Mahdi Diet Engine اجرا شود.
- Sourceهای Mahdi Diet در سایت قرار گیرند.
- اطلاعات سلامت کاربران در Database سایت ذخیره شود.
- Client Portal ساخته شود.
- Login/Register ساخته شود.
- Payment ساخته شود.
- Nutrition API ساخته شود.
- AI Coach ساخته شود.
- Backend برنامه غذایی به سایت متصل شود.

فرایند ساخت برنامه غذایی همچنان به‌صورت Human-controlled و خارج از Website انجام می‌شود.

هیچ متن یا UI نباید به کاربر القا کند که برنامه او فوراً یا کاملاً اتوماتیک توسط یک Generator ساخته می‌شود.

پیام مناسب:

«اطلاعات شما بررسی می‌شود و برنامه متناسب با شرایط، هدف، سبک زندگی و ترجیحات شما آماده خواهد شد.»

---

# 2. PRODUCT POSITIONING

Eat To Fit نباید به‌عنوان:

- رژیم آماده
- calorie calculator
- AI diet generator
- برنامه رژیمی Generic
- رژیم لاغری سریع

معرفی شود.

Positioning اصلی:

یک سیستم ساختاریافته و شخصی‌سازی‌شده برای طراحی برنامه غذایی بر اساس اطلاعات فردی، سبک زندگی، هدف، تمرین، ترجیحات غذایی و داده‌های تغذیه‌ای معتبر.

لحن برند:

- حرفه‌ای
- علمی اما قابل فهم
- مدرن
- شفاف
- Human
- Premium
- دقیق
- بدون ادعاهای اغراق‌آمیز پزشکی
- بدون Fear Marketing
- بدون وعده کاهش وزن غیرواقعی

---

# 3. VISUAL DNA

Design DNA باید از Client-facing Eat To Fit Renderer الهام بگیرد اما Copy مستقیم نباشد.

ویژگی‌های الزامی:

- رابط بسیار تمیز و Premium
- White / Soft neutral background
- accentهای کنترل‌شده و حرفه‌ای
- typography قدرتمند فارسی
- rounded cards مدرن
- shadow بسیار ظریف
- spacing سخاوتمندانه
- hierarchy قوی
- navigation بسیار تمیز
- Inline SVG icons در صورت مناسب بودن
- visual consistency کامل
- RTL واقعی، نه فقط text-align:right
- تمام Persian numerals در Client-facing sections در صورت نیاز
- Mobile-first
- Dark-looking heavy gym style ممنوع مگر در section محدود و هدفمند
- stock imagery کلیشه‌ای شامل سیب، متر دور کمر، ترازو و سالاد به‌عنوان زبان اصلی برند ممنوع

حس کلی:

Modern Health-Tech + Premium Nutrition Service + Human Personalization

---

# 4. DESIGN QUALITY TARGET

سایت نباید شبیه Template آماده WordPress یا Landing Page عمومی باشد.

باید دارای:

- Hero قوی
- custom visual compositions
- carefully designed grids
- interactive micro-elements
- subtle motion
- hover states
- scroll reveal در حد کنترل‌شده
- responsive transitions
- strong whitespace
- polished mobile layout
- premium CTA treatment
- visually distinctive data/process representation

باشد.

Animation نباید Performance یا Accessibility را قربانی کند.

prefers-reduced-motion باید رعایت شود.

---

# 5. CORE SITE STRUCTURE

نسخه اول حداقل شامل صفحات زیر باشد:

Home

How It Works

Meal Plan / برنامه غذایی

Science & Sources

Questionnaire Guide

About Eat To Fit

FAQ

Learn / Articles architecture

Contact

Privacy

Terms

Custom 404

---

# 6. HOME PAGE

Home باید Conversion-oriented ولی غیرتهاجمی باشد.

ساختار پیشنهادی:

Hero

Primary promise

Short explanation

Primary CTA:
«شروع ارزیابی»

Secondary CTA:
«ببینید چگونه کار می‌کند»

سپس:

Trust / Difference strip

How It Works visual process

Personalization section

Meal Plan experience preview

Evidence / Science section

Why Eat To Fit comparison without attacking competitors

Questionnaire explanation

FAQ preview

Final CTA

Footer

Hero نباید بیش از حد شلوغ باشد.

---

# 7. HOW IT WORKS

فرایند باید به زبان کاربر نمایش داده شود:

شناخت شما

بررسی اطلاعات

تعیین نیازهای تغذیه‌ای

انتخاب ساختار غذاها

تنظیم مقدار وعده‌ها

کنترل محدودیت‌ها و ترجیحات

آماده‌سازی برنامه

هیچ Internal Code مانند:

NDC
NCE
Gate
Runtime
Solver
Canonical
Status Code

نباید در UI عمومی نمایش داده شود.

---

# 8. QUESTIONNAIRE GUIDE

هدف این صفحه کاهش نگرانی و افزایش Completion Rate است.

برای دسته‌های اطلاعات توضیح داده شود که چرا دریافت می‌شوند:

- مشخصات پایه
- هدف
- فعالیت
- تمرین
- وعده‌ها
- ترجیحات غذایی
- حساسیت‌ها و محدودیت‌ها
- آب
- سبک زندگی
- اطلاعات مرتبط مورد نیاز

اطلاعات پزشکی نباید با ادعاهای تشخیصی ترکیب شود.

---

# 9. SCIENCE & SOURCES

هدف این صفحه نمایش اعتبار Process است، نه نمایش انبوه Citation برای تحت تأثیر قرار دادن کاربر.

دسته منابع می‌تواند شامل مواردی مانند:

- National Food Composition Databases
- USDA FoodData Central
- FAO / INFOODS
- CoFID
- EFSA
- NASEM
- ISSN
- ACSM
- پژوهش‌های ایرانی معتبر

باشد.

هرگونه Claim علمی باید قابل Source باشد.

No fabrication.

Missing ≠ Zero.

Uncertainty باید در صورت نیاز شفاف باقی بماند.

---

# 10. MEAL PLAN PAGE

هدف این صفحه نمایش تجربه‌ای است که کاربر دریافت خواهد کرد.

نباید برنامه واقعی User خاص نمایش داده شود مگر Demo anonymized.

نمایش مفهومی:

- تنوع غذایی
- وعده‌بندی
- Portion قابل فهم
- غذاهای ایرانی و بین‌المللی
- ترجیحات فردی
- بخش میوه
- Hydration / Sleep / lifestyle support در صورت مرتبط بودن
- Client-friendly presentation

نباید Engine داخلی نمایش داده شود.

---

# 11. CONTACT

نسخه اول Backend اختصاصی Contact ندارد.

Contact routes باید Component-driven طراحی شوند تا بعداً بتوان مقصد آنها را بدون بازطراحی تغییر داد.

امکان نمایش:

Instagram
Telegram
WhatsApp
Email

باید از Configuration مرکزی خوانده شود.

اگر اطلاعات واقعی هنوز تعریف نشده‌اند، Placeholder قابل تشخیص در Source قرار داده شود و اطلاعات جعلی Client-facing نمایش داده نشود.

---

# 12. TECH STACK

Primary:

Astro

TypeScript

CSS architecture بدون dependency غیرضروری

Cloudflare Workers Static Assets

GitHub Source of Truth

از React فقط در صورتی استفاده شود که Interactive Island واقعی ارزش ایجاد کند.

از libraryهای سنگین animation خودداری شود مگر دلیل مشخص وجود داشته باشد.

No jQuery.

No Bootstrap.

No generic UI kit که شخصیت Design را از بین ببرد.

---

# 13. STATIC-FIRST

نسخه اول باید Static-first باشد.

Astro output:

static

Cloudflare assets:

./dist

عدم نیاز به SSR مگر Feature آینده آن را ضروری کند.

تمام صفحات اصلی باید در Build time تولید شوند.

---

# 14. PERFORMANCE

Target:

Lighthouse Performance بالا

Core Web Vitals مناسب

حداقل JavaScript لازم

Image optimization

Lazy loading

Font loading optimization

No render-blocking unnecessary scripts

No giant animation libraries

No oversized video backgrounds

---

# 15. SEO

برای هر صفحه:

Unique title

Meta description

Canonical path structure

OpenGraph metadata

Semantic headings

Schema markup فقط در صورت معتبر بودن

robots.txt

sitemap

Logical internal linking

Article architecture آینده

SEO نباید باعث Keyword Stuffing یا تولید محتوای بی‌کیفیت شود.

---

# 16. ACCESSIBILITY

WCAG-aware implementation.

موارد الزامی:

keyboard navigation

visible focus

semantic elements

aria only when necessary

contrast مناسب

accessible mobile menu

reduced motion support

alt text

proper form labels

logical heading hierarchy

---

# 17. SECURITY

هیچ secret داخل Repository قرار نگیرد.

هیچ API key hard-code نشود.

هیچ health information در static form یا URL parameter ذخیره نشود.

External links با attribute مناسب.

Dependency count حداقلی باشد.

---

# 18. RESPONSIVE SYSTEM

Mobile-first.

حداقل تست:

360px

390px

430px

768px

1024px

1440px

1920px

هیچ Horizontal Overflow مجاز نیست.

RTL در تمامی breakpointها بررسی شود.

---

# 19. CONTENT CONFIGURATION

اطلاعاتی که احتمال تغییر دارند در Componentها hard-code نشوند.

مانند:

Brand name
Contact links
Socials
CTA destinations
Navigation
Site description

در Configuration مرکزی قرار گیرند.

---

# 20. COMPONENT ARCHITECTURE

Components باید reusable باشند.

نمونه:

Header

MobileNav

Hero

SectionHeading

CTA

FeatureCard

ProcessStep

EvidenceCard

FAQAccordion

ArticleCard

ContactCard

Footer

Icon wrapper

Section container

نباید هر صفحه با CSS کاملاً جدا و تکراری ساخته شود.

---

# 21. CONTENT STRUCTURE

Content فارسی از UI logic تا حد امکان جدا باشد تا Localization آینده امکان‌پذیر باشد.

ساختار آینده برای FA/EN خراب نشود، حتی اگر v1 فقط فارسی است.

---

# 22. FILE STRUCTURE

ساختار Repository باید خوانا و Documentation-friendly باشد.

شامل:

src/components

src/layouts

src/pages

src/styles

src/data

src/config

public

docs

README

---

# 23. SOURCE CONTROL

GitHub Repository = Source of Truth.

نسخه‌های اصلی نباید به‌صورت ZIPهای متعدد جای Git history را بگیرند.

Production branch:

main

Development branch:

dev

تغییرات بزرگ در feature branches انجام شوند.

---

# 24. CLOUDFLARE

Target Platform:

Cloudflare Workers

Deployment model:

Static Assets

Generated assets directory:

dist

Repository-connected CI/CD

Production deployment from main.

Cloudflare-specific coupling حداقل باشد تا امکان مهاجرت Hosting در آینده حفظ شود.

---

# 25. QA GATES

قبل از Release:

Build must pass.

No broken links.

No console errors.

No missing assets.

RTL audit.

Mobile audit.

Desktop audit.

Navigation audit.

404 audit.

SEO metadata audit.

Accessibility basic audit.

Performance audit.

Content consistency audit.

No internal project terminology leakage.

No placeholder leakage.

No auto-generation implication.

No health claims without support.

---

# 26. DESIGN REVIEW

بعد از پیاده‌سازی، سایت را فقط بر اساس «کار می‌کند» قبول نکن.

به‌صورت جداگانه بررسی کن:

Visual hierarchy

Whitespace

Typography

Color balance

Card rhythm

Hero impact

CTA prominence

Mobile aesthetics

Brand consistency

Motion quality

Perceived trust

Premium feel

اگر UI در حد Template عمومی به نظر رسید، Release را رد کن و Design را ارتقا بده.

---

# 27. DELIVERABLE

در پایان باید یک Repository کامل و Deploy-ready تولید شود شامل:

تمام Source Code

Assets

Configuration

wrangler configuration

package.json

README

Deployment instructions

Project structure documentation

Future expansion notes

QA report

و فایل‌ها باید بدون وابستگی به Mahdi Diet Core قابل Build باشند.

---

# FINAL PRINCIPLE

هدف ساخت صرفاً «یک سایت زیبا» نیست.

هدف ایجاد یک Digital Front Door حرفه‌ای برای Eat To Fit است که:

اعتماد ایجاد کند،

تفاوت محصول را توضیح دهد،

ارزش سیستم را قابل فهم کند،

کاربر را به اقدام هدایت کند،

و بدون بازطراحی اساسی قابلیت رشد به Client Platform آینده را داشته باشد.

هر تصمیم طراحی یا فنی باید با این اصل سنجیده شود.