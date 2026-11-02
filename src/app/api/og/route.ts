import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface OgShowcase {
  category: string;
  title: string;
  subtitle: string;
  imageFile: string;
  warranty: string;
  city: string;
}

const DEFAULT_SHOWCASES: OgShowcase[] = [
  {
    category: 'واجهات كلادينج وأحرف بارزة مضيئة',
    title: 'أحرف بارزة مضيئة وواجهات كلادينج فاخرة',
    subtitle: 'تصميم وتنفيذ بأعلى معايير الجودة ومطابقة لاشتراطات منصة بلدي والكود السعودي',
    imageFile: 'black-stamp-cafe-sign.webp',
    warranty: 'ضمان 10 سنوات معتمد',
    city: 'الرياض · مقهى بلاك ستامب',
  },
  {
    category: 'مظلات وسواتر وبرجولات مودرن',
    title: 'مظلات وسواتر وبرجولات عصرية للمشاريع والفلل',
    subtitle: 'سواتر قص ليزر، مظلات سيارات كورية وألمانية، وبرجولات حدائق فاخرة',
    imageFile: 'black-pergola-install.webp',
    warranty: 'ضمان 5 سنوات شامل',
    city: 'الرياض · فلل سكنية حديثة',
  },
  {
    category: 'تسوير المشاريع وتجهيز المعارض',
    title: 'تسوير مشاريع إنشائية بالشنكو وبوسترات عملاقة',
    subtitle: 'حواجز أمنية معتمدة وطباعة UV مقاومة للعوامل الجوية وتجهيز بوثات 3D',
    imageFile: 'aramco-hoarding.webp',
    warranty: 'معتمد للمشاريع الكبرى',
    city: 'الرياض والشرقية · تسوير أرامكو',
  },
  {
    category: 'دعاية وإعلان ومقاولات عامة متكاملة',
    title: 'أحرف بارزة وكلادينج ومقاولات عامة وتسليم مفتاح',
    subtitle: 'ثماني خدمات متكاملة تحت إدارة واحدة: واجهات ولوحات إعلانية وديكور بضمان 10 سنوات',
    imageFile: 'black-stamp-cafe-sign.webp',
    warranty: 'ضمان 10 سنوات معتمد',
    city: 'الرياض · كافة مناطق المملكة',
  },
  {
    category: 'تغليف أساطيل السيارات واستيكرات الفينيل',
    title: 'تغليف احترافي لأساطيل السيارات وطباعة رقمية',
    subtitle: 'خامات 3M وفينيل ألماني معتمد مقاوم للحرارة والغسيل المستمر وضمان ثبات الألوان',
    imageFile: 'beez-truck-wrap.webp',
    warranty: 'ضمان ثبات الألوان',
    city: 'كافة مدن المملكة · أساطيل شاحنات',
  },
];

function resolveLocalImage(imageInput?: string): string {
  const portfolioDir = path.join(process.cwd(), 'public/assets/images/portfolio');
  const publicDir = path.join(process.cwd(), 'public');

  if (imageInput) {
    const clean = imageInput.replace(/^\//, '');
    const filename = path.basename(clean);

    const candidates = [
      path.join(portfolioDir, filename),
      path.join(portfolioDir, clean),
      path.join(publicDir, clean),
    ];

    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) {
        return c;
      }
    }

    // Fuzzy match in portfolio directory
    try {
      if (fs.existsSync(portfolioDir)) {
        const baseKey = path.basename(clean, path.extname(clean)).toLowerCase();
        const files = fs.readdirSync(portfolioDir);
        const match = files.find((f) => f.toLowerCase().includes(baseKey) || baseKey.includes(f.toLowerCase().replace('.webp', '')));
        if (match) return path.join(portfolioDir, match);
      }
    } catch (e) {
      // ignore
    }
  }

  // Safe universal fallback
  const safeFallback = path.join(portfolioDir, 'black-stamp-cafe-sign.webp');
  if (fs.existsSync(safeFallback)) return safeFallback;

  // Any available webp
  try {
    const files = fs.readdirSync(portfolioDir);
    const firstWebp = files.find((f) => f.endsWith('.webp'));
    if (firstWebp) return path.join(portfolioDir, firstWebp);
  } catch (e) {}

  return safeFallback;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const customCategoryParam = searchParams.get('category');
    const customTitleParam = searchParams.get('title');
    const customSubtitleParam = searchParams.get('subtitle');
    const customImageParam = searchParams.get('image');
    const customWarrantyParam = searchParams.get('warranty');
    const customCityParam = searchParams.get('city');
    const slotParam = searchParams.get('slot');

    const db = getDb();
    const ogSettings = db?.ogSettings;

    let isAdminPinned = false;
    let adminCustomShowcase: OgShowcase | null = null;

    if (ogSettings) {
      if (ogSettings.mode === 'custom' && ogSettings.customTitle) {
        isAdminPinned = true;
      } else if (
        ogSettings.mode === 'temporary_24h' &&
        ogSettings.customTitle &&
        ogSettings.pinnedUntil &&
        new Date(ogSettings.pinnedUntil).getTime() > Date.now()
      ) {
        isAdminPinned = true;
      }

      if (isAdminPinned) {
        adminCustomShowcase = {
          category: ogSettings.customCategory || 'دعاية وإعلان ومقاولات عامة',
          title: ogSettings.customTitle || 'شركة همم غيم — من الحرف البارز إلى تسليم المفتاح',
          subtitle:
            ogSettings.customSubtitle ||
            'واجهات كلادينج، أحرف بارزة مضيئة، مظلات وسواتر، ومقاولات عامة بضمان معتمد',
          imageFile: ogSettings.customImageFile || 'black-stamp-cafe-sign.webp',
          warranty: ogSettings.customWarranty || 'ضمان حتى 10 سنوات',
          city: ogSettings.customCity || 'المملكة العربية السعودية',
        };
      }
    }

    let activeShowcase: OgShowcase;

    if (customTitleParam) {
      activeShowcase = {
        category: customCategoryParam || 'شركة همم غيم بالسعودية',
        title: customTitleParam,
        subtitle: customSubtitleParam || 'دعاية وإعلان، واجهات كلادينج، أحرف بارزة، ومقاولات عامة',
        imageFile: customImageParam || 'black-stamp-cafe-sign.webp',
        warranty: customWarrantyParam || 'ضمان معتمد حتى 10 سنوات',
        city: customCityParam || 'كافة مناطق المملكة',
      };
    } else if (isAdminPinned && adminCustomShowcase) {
      activeShowcase = adminCustomShowcase;
    } else {
      let slotIndex = 0;
      if (slotParam !== null && !isNaN(parseInt(slotParam, 10))) {
        slotIndex = Math.abs(parseInt(slotParam, 10)) % DEFAULT_SHOWCASES.length;
      } else {
        const hourBlock = Math.floor(Date.now() / (1000 * 60 * 60 * 6));
        slotIndex = hourBlock % DEFAULT_SHOWCASES.length;
      }
      activeShowcase = DEFAULT_SHOWCASES[slotIndex];
    }

    const width = 1200;
    const height = 630;

    // Load actual high-definition project photo
    const imagePath = resolveLocalImage(activeShowcase.imageFile);
    let basePhotoBuffer: Buffer;

    if (fs.existsSync(imagePath)) {
      basePhotoBuffer = await sharp(imagePath)
        .resize(width, height, { fit: 'cover', position: 'center' })
        .modulate({ brightness: 1.05, saturation: 1.15 })
        .sharpen({ sigma: 1.2 })
        .toBuffer();
    } else {
      basePhotoBuffer = await sharp({
        create: {
          width,
          height,
          channels: 4,
          background: { r: 15, g: 37, b: 68, alpha: 1 },
        },
      })
        .png()
        .toBuffer();
    }

    // Escape XML entities
    const escapeXml = (str: string) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

    const safeCategory = escapeXml(activeShowcase.category);
    const safeTitle = escapeXml(activeShowcase.title);
    const safeSubtitle = escapeXml(activeShowcase.subtitle);
    const safeWarranty = escapeXml(activeShowcase.warranty);
    const safeCity = escapeXml(activeShowcase.city);

    // Cinematic Overlay SVG
    const overlaySvg = Buffer.from(`
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Top subtle vignette -->
          <linearGradient id="topVignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050e1a" stop-opacity="0.88"/>
            <stop offset="35%" stop-color="#050e1a" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </linearGradient>

          <!-- Bottom strong cinematic gradient for crisp text readability -->
          <linearGradient id="bottomVignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
            <stop offset="40%" stop-color="#061222" stop-opacity="0.78"/>
            <stop offset="80%" stop-color="#030811" stop-opacity="0.96"/>
            <stop offset="100%" stop-color="#02060d" stop-opacity="0.99"/>
          </linearGradient>

          <!-- Glow filters -->
          <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.85"/>
          </filter>
        </defs>

        <!-- Top Vignette -->
        <rect x="0" y="0" width="${width}" height="180" fill="url(#topVignette)"/>

        <!-- Bottom Vignette -->
        <rect x="0" y="240" width="${width}" height="${height - 240}" fill="url(#bottomVignette)"/>

        <!-- Outer Framing Border -->
        <rect x="16" y="16" width="${width - 32}" height="${height - 32}" rx="24" fill="none" stroke="#208ec1" stroke-width="2" stroke-opacity="0.45"/>

        <!-- TOP BAR: Brand Badge & Warranty Pill -->
        <!-- Right: Official Company Badge -->
        <g transform="translate(${width - 48}, 42)">
          <rect x="-420" y="0" width="420" height="48" rx="24" fill="#0b1b30" fill-opacity="0.92" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.6"/>
          <!-- Company Name Text -->
          <text x="-210" y="32" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle" filter="url(#textShadow)">
            ✦ شركة همم غيم للدعاية والإعلان والمقاولات
          </text>
        </g>

        <!-- Left: Warranty Glow Badge -->
        <g transform="translate(48, 42)">
          <rect x="0" y="0" width="220" height="48" rx="24" fill="#208ec1" fill-opacity="0.92" stroke="#7dd3fc" stroke-width="1.5"/>
          <text x="110" y="31" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle" filter="url(#textShadow)">
            ★ ${safeWarranty}
          </text>
        </g>

        <!-- BOTTOM CONTENT AREA: RTL Flow -->
        <g transform="translate(56, 380)">
          <!-- Category Badge -->
          <rect x="${width - 112 - 320}" y="0" width="320" height="38" rx="19" fill="#0284c7" fill-opacity="0.9" stroke="#bae6fd" stroke-width="1.2"/>
          <text x="${width - 112 - 160}" y="25" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="15" font-weight="900" fill="#ffffff" text-anchor="middle" filter="url(#textShadow)">
            ✦ ${safeCategory}
          </text>

          <!-- Main Title (Large, Bold, High Impact) -->
          <text x="${width - 112}" y="88" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="36" font-weight="900" fill="#ffffff" text-anchor="end" filter="url(#textShadow)">
            ${safeTitle.length > 46 ? safeTitle.substring(0, 46) + '...' : safeTitle}
          </text>

          <!-- Subtitle / Tagline -->
          <text x="${width - 112}" y="132" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="18" font-weight="600" fill="#cbd5e1" text-anchor="end" filter="url(#textShadow)">
            ${safeSubtitle.length > 70 ? safeSubtitle.substring(0, 70) + '...' : safeSubtitle}
          </text>

          <!-- Footer Information Strip (City, Contact, Domain) -->
          <g transform="translate(0, 165)">
            <!-- Right: Location -->
            <rect x="${width - 112 - 280}" y="0" width="280" height="42" rx="21" fill="#0b1b30" fill-opacity="0.88" stroke="#38bdf8" stroke-width="1.2"/>
            <text x="${width - 112 - 140}" y="27" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">
              📍 ${safeCity}
            </text>

            <!-- Center: Phone & WhatsApp -->
            <rect x="${width - 112 - 580}" y="0" width="280" height="42" rx="21" fill="#16a34a" fill-opacity="0.95" stroke="#86efac" stroke-width="1.2"/>
            <text x="${width - 112 - 440}" y="27" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" filter="url(#textShadow)">
              📞 جوال وواتساب: 0565467928
            </text>

            <!-- Left: Domain -->
            <rect x="0" y="0" width="210" height="42" rx="21" fill="#0b1b30" fill-opacity="0.88" stroke="#38bdf8" stroke-width="1.2"/>
            <text x="105" y="27" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="14" font-weight="800" fill="#7dd3fc" text-anchor="middle">
              himam-ghaim.sa 🌐
            </text>
          </g>
        </g>
      </svg>
    `);

    // Composite Base Photo + Overlay
    const finalOgBuffer = await sharp(basePhotoBuffer)
      .composite([{ input: overlaySvg, top: 0, left: 0 }])
      .jpeg({ quality: 90 })
      .toBuffer();

    return new NextResponse(finalOgBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control':
          isAdminPinned
            ? 'public, max-age=300, s-maxage=600, stale-while-revalidate=1200'
            : 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating dynamic OG image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
