import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PARTNERS_DIR = path.join(ROOT, 'public/assets/images/partners');
const BLOGS_DIR = path.join(ROOT, 'public/assets/images/fan-blogs');
const WORKS_DIR = path.join(ROOT, 'public/assets/images/fan-works');

// 1. RENAME HASHED BLOG IMAGES TO DESCRIPTIVE SAUDI SEO NAMES
const blogImageRenames = {
  'o97B9uA.jpeg': 'saudi-riyadh-municipality-commercial-signage-conditions.jpeg',
  'FqcNTZn.png': 'saudi-car-stickers-branding-commercial-fleets-riyadh.png',
  'KQNa7oV.png': 'saudi-cladding-facade-colors-guide-villas-riyadh.png',
  'js4Asth.png': 'saudi-cladding-comparison-american-chinese-brands.png',
  '8jiJPAJ.jpeg': 'saudi-led-lighting-color-temperature-kelvin-signage.jpeg',
  'OC5HEyU.jpeg': 'saudi-digital-printing-materials-banner-flex-vinyl.jpeg',
  'eR1VBf1.png': 'saudi-steel-structures-protective-coatings-corrosion.png',
  'hCk86nb.png': 'saudi-high-dpi-digital-printing-roland-technology.png',
};

console.log('--- RENAMING BLOG IMAGES ---');
for (const [oldName, newName] of Object.entries(blogImageRenames)) {
  const oldPath = path.join(BLOGS_DIR, oldName);
  const newPath = path.join(BLOGS_DIR, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed blog image: ${oldName} -> ${newName}`);
  }
}

// 2. RENAME UNOPTIMIZED WORK IMAGE
console.log('--- RENAMING WORK IMAGE ---');
const oldWorkName = 'partner-work_1792854356822_12127a51.jpg';
const newWorkName = 'saudi-3d-channel-letters-signage-al-odaib-agency-riyadh.jpg';
const oldWorkPath = path.join(WORKS_DIR, oldWorkName);
const newWorkPath = path.join(WORKS_DIR, newWorkName);
if (fs.existsSync(oldWorkPath)) {
  fs.renameSync(oldWorkPath, newWorkPath);
  console.log(`Renamed work image: ${oldWorkName} -> ${newWorkName}`);
}

// 3. DEFINE HIGH-DEFINITION SVG LOGOS FOR PARTNERS
const partnersToCreate = [
  {
    slug: 'al-odaib-automotive',
    name: {
      ar: 'وكالة وشركة العضيب لصيانة السيارات',
      en: 'Al-Odaib Automotive Services Co.',
      ur: 'العضیب آٹوموٹیو سروسز کمپنی'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#0F2544"/>
          <path d="M-142 35 L-130 22 L-118 35 L-124 35 L-124 48 L-136 48 L-136 35 Z" fill="#208EC1"/>
          <text x="15" y="24" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="34" font-weight="900" fill="#0F2544" letter-spacing="3">AL-ODAIB</text>
          <text x="15" y="55" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="20" font-weight="bold" fill="#208EC1">شركة العضيب لصيانة السيارات</text>
          <text x="15" y="80" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">AUTOMOTIVE SERVICE CENTERS</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'ghaimat-atheer-salon',
    name: {
      ar: 'مراكز وصالون غيمة أثير التجميلية',
      en: 'Ghaimat Atheer Beauty Centers',
      ur: 'غیمۃ اثیر بیوٹی سینٹرز'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-135" cy="35" r="28" fill="#f43f5e" fill-opacity="0.15"/>
          <path d="M-143 45 C-148 40 -148 30 -140 26 C-136 24 -130 24 -126 28 C-122 24 -116 24 -112 26 C-104 30 -104 40 -109 45 L-126 60 Z" fill="#e11d48"/>
          <text x="15" y="22" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#0F2544">غيمة أثير</text>
          <text x="15" y="54" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#e11d48">GHAIMAT ATHEER BEAUTY</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="3">SALON &amp; SPA RIYADH</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'shawaya-chicken-restaurants',
    name: {
      ar: 'سلسلة مطاعم دجاج شواية الرياض',
      en: 'Shawaya Chicken Restaurants Chain',
      ur: 'شواية چکن ریسٹورنٹس'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#ea580c" fill-opacity="0.15"/>
          <path d="M-130 18 C-122 26 -118 34 -122 46 C-126 44 -128 40 -128 36 C-132 42 -136 44 -140 40 C-138 30 -134 24 -130 18 Z" fill="#ea580c"/>
          <text x="15" y="22" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#0F2544">دجاج شواية</text>
          <text x="15" y="54" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#ea580c">SHAWAYA CHICKEN</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">RESTAURANTS CHAIN RIYADH</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'asas-contracting-company',
    name: {
      ar: 'شركة أساس للمقاولات العامة والتطوير العقاري',
      en: 'Asas General Contracting & Development Co.',
      ur: 'اساس جنرل کنٹریکٹنگ اینڈ ڈویلپمنٹ'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#0284c7" fill-opacity="0.15"/>
          <rect x="-142" y="24" width="10" height="22" rx="2" fill="#0F2544"/>
          <rect x="-130" y="16" width="10" height="30" rx="2" fill="#0284c7"/>
          <rect x="-118" y="28" width="10" height="18" rx="2" fill="#208EC1"/>
          <text x="15" y="22" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#0F2544">شركة أسـاس</text>
          <text x="15" y="54" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#0284c7">ASAS CONTRACTING</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">GENERAL CONTRACTING &amp; REAL ESTATE</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'azhar-retail-store',
    name: {
      ar: 'مؤسسة ومتجر أزهار للتجارة والتجزئة',
      en: 'Azhar Commercial & Retail Trading Est.',
      ur: 'ازہار کمرشل اینڈ ریٹیل ٹریڈنگ'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#10b981" fill-opacity="0.15"/>
          <circle cx="-130" cy="35" r="10" fill="#10b981"/>
          <circle cx="-130" cy="18" r="6" fill="#059669"/>
          <circle cx="-130" cy="52" r="6" fill="#059669"/>
          <circle cx="-147" cy="35" r="6" fill="#059669"/>
          <circle cx="-113" cy="35" r="6" fill="#059669"/>
          <text x="15" y="22" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#0F2544">متجر أزهـار</text>
          <text x="15" y="54" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#059669">AZHAR RETAIL &amp; TRADING</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">COMMERCIAL SHOWROOMS</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'rokn-al-sham-restaurants',
    name: {
      ar: 'سلسلة مطاعم ركن الشام',
      en: 'Rukn Al-Sham Restaurant Group',
      ur: 'رکن الشام ریسٹورنٹ گروپ'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#b91c1c" fill-opacity="0.15"/>
          <path d="M-138 22 L-122 22 L-124 38 L-136 38 Z" fill="#b91c1c"/>
          <rect x="-132" y="38" width="4" height="14" fill="#b91c1c"/>
          <text x="15" y="22" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#0F2544">ركن الشام</text>
          <text x="15" y="54" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#b91c1c">RUKN AL-SHAM</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">RESTAURANTS GROUP RIYADH</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'balady-municipality-riyadh',
    name: {
      ar: 'أمانة منطقة الرياض — منصة بلدي',
      en: 'Riyadh Municipality — Balady Platform',
      ur: 'ریاض میونسپلٹی — بلدی پلیٹ فارم'
    },
    sector: 'government',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#047857" fill-opacity="0.15"/>
          <path d="M-130 14 L-114 26 L-114 46 L-130 56 L-146 46 L-146 26 Z" fill="none" stroke="#047857" stroke-width="3"/>
          <circle cx="-130" cy="35" r="6" fill="#047857"/>
          <text x="15" y="22" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="30" font-weight="900" fill="#0F2544">أمانة منطقة الرياض</text>
          <text x="15" y="54" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="20" font-weight="bold" fill="#047857">منصة بلدي | BALADY</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">MUNICIPAL SIGNAGE STANDARDS</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'saudi-building-code-sbc',
    name: {
      ar: 'اللجنة الوطنية لكود البناء السعودي (SBC)',
      en: 'Saudi Building Code National Committee (SBC)',
      ur: 'سعودی بلڈنگ کوڈ کمیٹی'
    },
    sector: 'government',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#1e3a8a" fill-opacity="0.15"/>
          <path d="M-138 20 L-130 14 L-122 20 L-122 34 L-130 40 L-138 34 Z" fill="#1e3a8a"/>
          <path d="M-130 26 L-130 48 M-142 32 L-130 40 L-118 32" stroke="#1e3a8a" stroke-width="2.5" fill="none"/>
          <text x="15" y="22" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="30" font-weight="900" fill="#0F2544">كود البناء السعودي</text>
          <text x="15" y="54" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="20" font-weight="bold" fill="#1e3a8a">SAUDI BUILDING CODE | SBC</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">CERTIFIED FIRE &amp; SAFETY STANDARDS</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'samsung-commercial-led',
    name: {
      ar: 'سامسونج للإلكترونيات — وحدات LED المعتمدة',
      en: 'Samsung Electronics — Certified LED Modules',
      ur: 'سام سنگ الیکٹرانکس — مصدقہ ایل ای ڈی'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <ellipse cx="-130" cy="35" rx="30" ry="18" fill="#1428a0" fill-opacity="0.12"/>
          <text x="-130" y="42" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="20" font-weight="900" fill="#1428a0">S</text>
          <text x="15" y="24" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="34" font-weight="900" fill="#1428a0" letter-spacing="3">SAMSUNG</text>
          <text x="15" y="55" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#0F2544">شرائح LED الكورية المعتمدة للوحات</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">ENERGY-SAVING HIGH LUMEN MODULES</text>
        </g>
      </svg>
    `
  },
  {
    slug: '3m-commercial-graphics-saudi',
    name: {
      ar: 'شركة ثري إم العالمية (3M) — خامات الفينيل وتغليف السيارات',
      en: '3M Commercial Solutions — Vinyl & Wrap Films',
      ur: 'تھری ایم کمرشل ونائل اینڈ ریپنگ'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#e11d48" fill-opacity="0.15"/>
          <text x="-130" y="46" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#e11d48">3M</text>
          <text x="15" y="24" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="34" font-weight="900" fill="#e11d48" letter-spacing="2">3M SAUDI ARABIA</text>
          <text x="15" y="55" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#0F2544">خامات واستيكرات الفينيل وتغليف الأساطيل</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">COMMERCIAL GRAPHICS &amp; WRAP FILMS</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'mean-well-transformers',
    name: {
      ar: 'محولات مين ويل العالمية (Mean Well) — ترانسات اللوحات الأصلية',
      en: 'Mean Well Power Switching — Signage Power Supplies',
      ur: 'مین ویل پاور سپلائیز'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#2563eb" fill-opacity="0.15"/>
          <text x="-130" y="44" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="24" font-weight="900" fill="#2563eb">MW</text>
          <text x="15" y="24" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#2563eb" letter-spacing="2">MEAN WELL</text>
          <text x="15" y="55" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#0F2544">محولات الطاقة الإلكترونية الأصلية المقاومة للأمطار</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">SWITCHING POWER SUPPLIES IP67</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'alucobond-architectural-panels',
    name: {
      ar: 'ألواح ألوكو بوند (Alucobond) — كلادينج الواجهات المقاوم للحريق',
      en: 'Alucobond Architectural — Fire-Rated ACP Facades',
      ur: 'الوکو بونڈ فائر ریٹڈ کلیڈنگ'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#0d9488" fill-opacity="0.15"/>
          <rect x="-142" y="23" width="24" height="24" rx="4" fill="#0d9488"/>
          <text x="15" y="24" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#0d9488" letter-spacing="2">ALUCOBOND</text>
          <text x="15" y="55" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#0F2544">ألواح الكلادينج المعمارية المقاومة للحريق</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">COMPOSITE ARCHITECTURAL PANELS A2 / FR</text>
        </g>
      </svg>
    `
  },
  {
    slug: 'roland-dg-digital-printing',
    name: {
      ar: 'شركة رولاند العالمية (Roland DG) — ماكينات الطباعة الرقمية 1440 DPI',
      en: 'Roland DG Corporation — 1440 DPI Digital Printing Tech',
      ur: 'رولینڈ ڈی جی ڈیجیٹل پرنٹنگ'
    },
    sector: 'commercial',
    featured: true,
    svg: `
      <svg width="480" height="220" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="480" height="220" rx="20" fill="#ffffff" fill-opacity="0"/>
        <g transform="translate(240, 75)" text-anchor="middle">
          <circle cx="-130" cy="35" r="28" fill="#4f46e5" fill-opacity="0.15"/>
          <text x="-130" y="44" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="26" font-weight="900" fill="#4f46e5">R</text>
          <text x="15" y="24" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="32" font-weight="900" fill="#4f46e5" letter-spacing="2">Roland DG</text>
          <text x="15" y="55" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="19" font-weight="bold" fill="#0F2544">تقنيات الطباعة الرقمية فائقة الدقة 1440 DPI</text>
          <text x="15" y="78" font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">TRUEVIS HIGH-PRECISION WIDE FORMAT</text>
        </g>
      </svg>
    `
  }
];

console.log('--- GENERATING ULTRA-CRISP WEBP LOGOS WITH SHARP ---');
const newPartnerItems = [];

async function buildLogos() {
  for (const p of partnersToCreate) {
    const filename = `partner-${p.slug}-himam-ghaim-saudi-client.webp`;
    const destPath = path.join(PARTNERS_DIR, filename);
    const svgBuffer = Buffer.from(p.svg.trim());

    await sharp(svgBuffer)
      .webp({ quality: 95, effort: 6 })
      .toFile(destPath);

    console.log(`Created crisp WebP logo: ${filename} (exists: ${fs.existsSync(destPath)})`);

    newPartnerItems.push({
      id: `partner-${p.slug}`,
      slug: p.slug,
      name: p.name,
      sector: p.sector,
      logo: `/assets/images/partners/${filename}`,
      featured: p.featured
    });
  }
}

async function updateDbFiles() {
  await buildLogos();

  const dbPaths = [
    path.join(ROOT, 'data/db.json'),
    path.join(ROOT, 'src/data/initial-db.json')
  ];

  for (const dbPath of dbPaths) {
    if (!fs.existsSync(dbPath)) continue;
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // 1. Remove old broken fan-partner-X
    const initialPartnersCount = db.partners.length;
    db.partners = db.partners.filter(p => !p.id.startsWith('fan-partner-'));
    console.log(`Filtered out broken fan-partner-X (from ${initialPartnersCount} to ${db.partners.length})`);

    // 2. Add the newly created real partners
    const existingSlugs = new Set(db.partners.map(p => p.slug));
    for (const p of newPartnerItems) {
      if (!existingSlugs.has(p.slug)) {
        db.partners.push(p);
        existingSlugs.add(p.slug);
      }
    }
    console.log(`Total partners in ${dbPath} is now: ${db.partners.length}`);

    // 3. Fix work #1 renamed image in db.portfolio
    const work1 = db.portfolio.find(p => p.id === 'fan-proj-1');
    if (work1) {
      work1.src = `/assets/images/fan-works/${newWorkName}`;
      console.log('Updated fan-proj-1 src to SEO name:', work1.src);
    }

    // 4. Fix blog image renames in db.blogPosts
    const blogUrlMap = {
      'fan-riyadh-municipality-conditions': '/assets/images/fan-blogs/saudi-riyadh-municipality-commercial-signage-conditions.jpeg',
      'fan-car-stickers-and-branding-riyadh': '/assets/images/fan-blogs/saudi-car-stickers-branding-commercial-fleets-riyadh.png',
      'fan-cladding-color-guide-villas': '/assets/images/fan-blogs/saudi-cladding-facade-colors-guide-villas-riyadh.png',
      'fan-cladding-comparison-saudi-american-chinese': '/assets/images/fan-blogs/saudi-cladding-comparison-american-chinese-brands.png',
      'fan-led-lighting-color-temperature-guide': '/assets/images/fan-blogs/saudi-led-lighting-color-temperature-kelvin-signage.jpeg',
      'fan-digital-printing-materials-guide': '/assets/images/fan-blogs/saudi-digital-printing-materials-banner-flex-vinyl.jpeg',
      'fan-steel-protective-coatings-saudi-weather': '/assets/images/fan-blogs/saudi-steel-structures-protective-coatings-corrosion.png',
      'fan-high-dpi-printing-roland-saudi-arabia': '/assets/images/fan-blogs/saudi-high-dpi-digital-printing-roland-technology.png',
    };

    for (const post of db.blogPosts) {
      if (blogUrlMap[post.slug]) {
        post.image = blogUrlMap[post.slug];
      }
      // Fix leading slash on blog-2 and blog-3
      if (post.id === 'blog-2' || post.id === 'blog-3') {
        if (!post.image.startsWith('/')) {
          post.image = '/' + post.image;
        }
      }
    }

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log(`Saved updated ${dbPath}`);
  }
}

updateDbFiles().then(() => {
  console.log('=== LOGOS GENERATION & SEO RENAMING COMPLETED ===');
}).catch(err => {
  console.error('Failed:', err);
});
