export const siteConfig = {
  name: 'Eat To Fit',
  shortName: 'ETF',
  title: 'Eat To Fit | برنامه غذایی شخصی‌سازی‌شده برای سبک زندگی شما',
  description:
    'Eat To Fit یک سرویس برنامه‌ریزی غذایی شخصی‌سازی‌شده است که هدف، سبک زندگی، تمرین، ترجیحات غذایی و شرایط هر فرد را برای آماده‌سازی یک برنامه روشن و قابل اجرا در نظر می‌گیرد.',
  locale: 'fa-IR',
  direction: 'rtl',
  social: {
    instagram: '',
    telegram: 'https://t.me/Eat_To_Fi7',
    whatsapp: '',
    email: ''
  },
  questionnaireUrl:
    'https://script.google.com/macros/s/AKfycby0qSPzTwG2brlsFuUUrZl-Dz_14ZFJv967H5ZI-75WUSNzhwygRKEn9oCKz3rs_SBTCg/exec',
  cta: {
    primaryLabel: 'شروع ارزیابی',
    secondary: '/how-it-works'
  }
} as const;

export const publicSiteUrl = import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || '';
