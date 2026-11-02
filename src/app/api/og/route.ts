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
  bullets: string[];
  imageFile: string;
  warranty: string;
  city: string;
}

const DEFAULT_SHOWCASES: OgShowcase[] = [
  {
    category: 'واجهات كلادينج وأحرف بارزة مضيئة',
    title: 'نصمم وننفذ واجهة مشروعك بجودة عالية وضمان يريح بالك',
    subtitle: 'أحرف بارزة زنكور وإكريليك واستيل، وواجهات كلادينج معتمدة مقاومة للحريق',
    bullets: [
      'معاينة ميدانية وتصميم 3D مجاناً قبل البدء',
      'ضمان معتمد حتى 10 سنوات على الهياكل والإضاءة',
      'مطابقة كاملة لاشتراطات منصة بلدي والكود السعودي',
    ],
    imageFile: 'saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp',
    warranty: 'ضمان 10 سنوات',
    city: 'الرياض · مقهى بلاك ستامب',
  },
  {
    category: 'مظلات وسواتر وبرجولات حدائق مودرن',
    title: 'مظلات وسواتر عصرية للمشاريع والفلل بهياكل معالجة ضد الصدأ',
    subtitle: 'أقمشة كورية وألمانية مقاومة للشمس، وسواتر قص ليزر وبرجولات ألمنيوم فاخرة',
    bullets: [
      'تصاميم هندسية حديثة مقاومة للرياح والعوامل الجوية',
      'دهانات حرارية مقاومة للتآكل والحرارة العالية',
      'تنفيذ وتوريد سريع في كافة مدن المملكة',
    ],
    imageFile: 'saudi-car-shades-pergolas-laser-screens-modern-villa-pergola-himam-ghaim.webp',
    warranty: 'ضمان 5 سنوات',
    city: 'الرياض · الفلل السكنية الحديثة',
  },
  {
    category: 'تسوير المشاريع وتجهيز المعارض والمؤتمرات',
    title: 'تسوير مشاريع عقارية بالشنكو وطباعة بوسترات دعائية عملاقة',
    subtitle: 'حواجز أمنية للمواقع الإنشائية وتجهيز بوثات المعارض والفعاليات بأحدث المعايير',
    bullets: [
      'حواجز شنكو ومقاسات مخصصة مطابقة لاشتراطات الأمان',
      'طباعة UV وفينيل عالي المتانة ومقاوم للظروف الميدانية',
      'جاهزية للتوريد والتركيب للمشاريع الكبرى والشركات',
    ],
    imageFile: 'saudi-project-hoarding-fence-printing-aramco-hoarding-himam-ghaim.webp',
    warranty: 'معتمد للمشاريع الكبرى',
    city: 'الرياض والشرقية · تسوير إنشائي',
  },
  {
    category: 'مقاولات عامة وتشطيبات وديكورات داخلية',
    title: 'مقاولات عامة متكاملة وتشطيبات فاخرة وتسليم مفتاح',
    subtitle: 'واجهات زجاج سيكوريت، قواطع مكاتب، ديكورات بديل رخام وخشب، وشبكات أمن وسلامة',
    bullets: [
      'إشراف هندسي وتنفيذ دقيق وفق جدول زمني صارم',
      'حلول شاملة للشركات والمعارض والمجمعات التجارية',
      'شبكات كاميرات مراقبة وأنظمة إطفاء معتمدة من الدفاع المدني',
    ],
    imageFile: 'saudi-interior-design-gypsum-decor-finishing-modern-office-fitout-himam-ghaim.webp',
    warranty: 'تنفيذ شامل وتسليم مفتاح',
    city: 'الرياض · صالات عرض ومكاتب',
  },
  {
    category: 'استيكرات وتغليف أساطيل السيارات والطباعة الرقمية',
    title: 'تغليف احترافي لأساطيل السيارات واستيكرات فينيل ألمانية',
    subtitle: 'طباعة رولاند يابانية فائقة الدقة وحماية ضد الخدوش والشمس والغسيل المستمر',
    bullets: [
      'خامات 3M و Orafol الألمانية المعتمدة لحماية طلاء المركبة',
      'تقفيل حراري متقن بدون فقاعات وبأعلى دقة وضوح',
      'عقود خاصة لتغليف وتجديد أساطيل الشركات والمؤسسات',
    ],
    imageFile: 'saudi-stickers-wrapping-wall-mural-beez-truck-wrap-himam-ghaim.webp',
    warranty: 'ضمان ثبات الألوان',
    city: 'كافة المدن · أساطيل تجارية',
  },
];

function resolveLocalImage(imageInput: string): string | null {
  const clean = imageInput.replace(/^\//, '');
  const candidates = [
    path.join(process.cwd(), 'public', clean),
    path.join(process.cwd(), 'public/assets/images/portfolio', clean),
    path.join(process.cwd(), 'public/assets/images/portfolio', path.basename(clean)),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) {
      return c;
    }
  }

  // Fallback scan in portfolio directory
  try {
    const portfolioDir = path.join(process.cwd(), 'public/assets/images/portfolio');
    if (fs.existsSync(portfolioDir)) {
      const base = path.basename(clean, path.extname(clean)).toLowerCase();
      const files = fs.readdirSync(portfolioDir);
      const match = files.find((f) => f.toLowerCase().includes(base));
      if (match) return path.join(portfolioDir, match);
      if (files.length > 0) return path.join(portfolioDir, files[0]);
    }
  } catch (e) {
    // ignore
  }

  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Check if custom parameters were explicitly requested
    const customCategoryParam = searchParams.get('category');
    const customTitleParam = searchParams.get('title');
    const customSubtitleParam = searchParams.get('subtitle');
    const customImageParam = searchParams.get('image');
    const customWarrantyParam = searchParams.get('warranty');
    const customCityParam = searchParams.get('city');
    const slotParam = searchParams.get('slot');

    const db = getDb();
    const ogSettings = db?.ogSettings;

    // Check if admin has set custom or temporary 24h pin
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
            'واجهات كلادينج، أحرف بارزة مضيئة، مظلات وسواتر، ومقاولات عامة',
          bullets: [
            'معاينة ميدانية وتصميم 3D مجاناً لكافة المشاريع',
            ogSettings.customWarranty || 'ضمان معتمد حتى 10 سنوات على الأعمال',
            'مطابقة كاملة لاشتراطات منصة بلدي والكود السعودي',
          ],
          imageFile:
            ogSettings.customImageFile ||
            'saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp',
          warranty: ogSettings.customWarranty || 'ضمان معتمد',
          city: ogSettings.customCity || 'المملكة العربية السعودية',
        };
      }
    }

    let activeShowcase: OgShowcase;

    if (customTitleParam) {
      // Direct query parameters from specific subpages (services, portfolio, calculator, etc.)
      activeShowcase = {
        category: customCategoryParam || 'شركة همم غيم بالسعودية',
        title: customTitleParam,
        subtitle: customSubtitleParam || 'دعاية وإعلان، واجهات كلادينج، أحرف بارزة، ومقاولات عامة',
        bullets: [
          'تنفيذ هندسي معتمد بأعلى معايير الجودة والإتقان',
          customWarrantyParam || 'ضمان شامل ومطابقة لاشتراطات كود البناء',
          'خدمة متكاملة من التصميم حتى تسليم المفتاح',
        ],
        imageFile:
          customImageParam ||
          'saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp',
        warranty: customWarrantyParam || 'ضمان معتمد',
        city: customCityParam || 'كافة مناطق المملكة',
      };
    } else if (isAdminPinned && adminCustomShowcase) {
      // Use Admin Pinned Campaign
      activeShowcase = adminCustomShowcase;
    } else {
      // Auto Rotating Dynamic Mode (Changes every 6 hours or by slot)
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

    // Load & prepare the visual photo
    const imageResolvedPath = resolveLocalImage(activeShowcase.imageFile);
    let resizedPhotoBuffer: Buffer;

    if (imageResolvedPath && fs.existsSync(imageResolvedPath)) {
      resizedPhotoBuffer = await sharp(imageResolvedPath)
        .resize(460, 470, { fit: 'cover', position: 'center' })
        .toBuffer();
    } else {
      resizedPhotoBuffer = await sharp({
        create: {
          width: 460,
          height: 470,
          channels: 4,
          background: { r: 15, g: 37, b: 68, alpha: 1 },
        },
      })
        .png()
        .toBuffer();
    }

    // Mask with rounded corners
    const photoMaskSvg = Buffer.from(`
      <svg width="460" height="470" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="470" rx="24" fill="#ffffff"/>
      </svg>
    `);
    const roundedPhoto = await sharp(resizedPhotoBuffer)
      .composite([{ input: photoMaskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Safe XML entity escaping
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
    const safeBullets = activeShowcase.bullets.map(escapeXml);

    // Photo card bezel and badges
    const photoCardOverlaySvg = Buffer.from(`
      <svg width="480" height="490" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="photoGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="45%" stop-color="#000000" stop-opacity="0"/>
            <stop offset="100%" stop-color="#071324" stop-opacity="0.94"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="480" height="490" rx="28" fill="#0d1f36" stroke="#208ec1" stroke-width="1.5" stroke-opacity="0.4"/>
        <rect x="10" y="10" width="460" height="470" rx="24" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.1"/>
        <rect x="10" y="270" width="460" height="210" rx="24" fill="url(#photoGrad)"/>

        <!-- Top Right Warranty Badge -->
        <rect x="290" y="24" width="165" height="34" rx="17" fill="#ffffff" fill-opacity="0.96"/>
        <text x="372" y="46" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="13" font-weight="900" fill="#0f2544" text-anchor="middle">
          ★ ${safeWarranty}
        </text>

        <!-- Bottom Caption -->
        <text x="445" y="440" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="13" font-weight="bold" fill="#38bdf8" text-anchor="end">
          📍 ${safeCity}
        </text>
        <text x="445" y="462" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="11" font-weight="500" fill="#e2e8f0" text-anchor="end">
          شركة همم غيم للمقاولات والدعاية والإعلان
        </text>
      </svg>
    `);

    const finalPhotoCard = await sharp(photoCardOverlaySvg)
      .composite([
        {
          input: roundedPhoto,
          top: 10,
          left: 10,
        },
      ])
      .png()
      .toBuffer();

    // Background Canvas
    const backgroundSvg = Buffer.from(`
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ogBg" cx="70%" cy="30%" r="80%">
            <stop offset="0%" stop-color="#112948"/>
            <stop offset="55%" stop-color="#081426"/>
            <stop offset="100%" stop-color="#030811"/>
          </radialGradient>
          <radialGradient id="ogCyan" cx="25%" cy="85%" r="50%">
            <stop offset="0%" stop-color="#208ec1" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#030811" stop-opacity="0"/>
          </radialGradient>
          <pattern id="ogGrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#208ec1" stroke-width="0.75" stroke-opacity="0.07"/>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#ogBg)"/>
        <rect width="100%" height="100%" fill="url(#ogCyan)"/>
        <rect width="100%" height="100%" fill="url(#ogGrid)"/>

        <!-- Outer Border -->
        <rect x="18" y="18" width="${width - 36}" height="${height - 36}" rx="28" fill="none" stroke="#208ec1" stroke-width="1.5" stroke-opacity="0.25"/>

        <!-- RTL RIGHT COLUMN: Content -->
        <g transform="translate(560, 50)">
          <!-- Category Badge -->
          <rect x="260" y="0" width="320" height="36" rx="18" fill="#208ec1" fill-opacity="0.18" stroke="#208ec1" stroke-width="1.2" stroke-opacity="0.6"/>
          <text x="420" y="23" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="13" font-weight="900" fill="#38bdf8" text-anchor="middle">
            ✦ ${safeCategory}
          </text>

          <!-- Company Brand -->
          <text x="580" y="76" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="end">
            شركة همم غيم للدعاية والإعلان والمقاولات
          </text>

          <!-- Main Title -->
          <text x="580" y="122" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="20" font-weight="800" fill="#7dd3fc" text-anchor="end">
            ${safeTitle.length > 50 ? safeTitle.substring(0, 50) + '...' : safeTitle}
          </text>

          <!-- Subtitle / Tagline -->
          <text x="580" y="156" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="14" font-weight="500" fill="#cbd5e1" text-anchor="end">
            ${safeSubtitle.length > 58 ? safeSubtitle.substring(0, 58) + '...' : safeSubtitle}
          </text>

          <!-- Divider -->
          <line x1="80" y1="184" x2="580" y2="184" stroke="#1e3a5f" stroke-width="1.5"/>

          <!-- 3 Bullets with Icons -->
          <g transform="translate(0, 204)">
            <circle cx="570" cy="12" r="10" fill="#208ec1" fill-opacity="0.2"/>
            <text x="570" y="16" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">✓</text>
            <text x="550" y="16" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="end">
              ${safeBullets[0] || 'تنفيذ هندسي متكامل ومطابق للكود السعودي'}
            </text>

            <circle cx="570" cy="52" r="10" fill="#208ec1" fill-opacity="0.2"/>
            <text x="570" y="56" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">✓</text>
            <text x="550" y="56" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="end">
              ${safeBullets[1] || 'ضمان معتمد حتى 10 سنوات على المواد والتركيب'}
            </text>

            <circle cx="570" cy="92" r="10" fill="#208ec1" fill-opacity="0.2"/>
            <text x="570" y="96" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">✓</text>
            <text x="550" y="96" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="end">
              ${safeBullets[2] || 'معاينة وتصميم 3D فوري وتسليم مفتاح'}
            </text>
          </g>

          <!-- Contact & Action Footer -->
          <g transform="translate(0, 360)">
            <rect x="290" y="0" width="290" height="52" rx="26" fill="#0f2544" stroke="#208ec1" stroke-width="1.8"/>
            <text x="435" y="32" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle">
              📞 جوال وواتساب: 0565467928
            </text>

            <rect x="90" y="0" width="185" height="52" rx="26" fill="#208ec1" fill-opacity="0.18" stroke="#208ec1" stroke-width="1.2"/>
            <text x="182" y="32" font-family="'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">
              himam-ghaim.sa 🌐
            </text>
          </g>
        </g>
      </svg>
    `);

    // Composite Final Image
    const finalOgBuffer = await sharp(backgroundSvg)
      .composite([
        {
          input: finalPhotoCard,
          top: 70,
          left: 55,
        },
      ])
      .png({ quality: 92 })
      .toBuffer();

    return new NextResponse(finalOgBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
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
