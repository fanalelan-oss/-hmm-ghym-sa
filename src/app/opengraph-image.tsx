import { ImageResponse } from 'next/og';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const alt = 'شركة همم غيم للدعاية والإعلان والمقاولات العامة في المملكة العربية السعودية';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const SHOWCASES = [
    {
      category: 'واجهات كلادينج وأحرف بارزة مضيئة',
      title: 'نصمم وننفذ واجهة مشروعك بجودة عالية وضمان يريح بالك',
      subtitle: 'أحرف بارزة زنكور وإكريليك واستيل، وواجهات كلادينج معتمدة مقاومة للحريق',
      bullets: [
        'معاينة ميدانية وتصميم 3D مجاناً قبل البدء',
        'ضمان معتمد حتى 10 سنوات على الهياكل والإضاءة',
        'مطابقة كاملة لاشتراطات منصة بلدي والكود السعودي',
      ],
      imageFile: 'black-stamp-cafe-sign.webp',
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
      imageFile: 'black-pergola-install.webp',
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
      imageFile: 'aramco-hoarding.webp',
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
      imageFile: 'black-edition-showroom.webp',
      warranty: 'تنفيذ شامل وتسليم مفتاح',
      city: 'الرياض · صالات عرض كبرى',
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
      imageFile: 'beez-truck-wrap.webp',
      warranty: 'ضمان ثبات الألوان',
      city: 'كافة المدن · أساطيل تجارية',
    },
  ];

  // Dynamic slot based on 6-hour blocks
  const slotIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 6)) % SHOWCASES.length;
  const item = SHOWCASES[slotIndex];

  const imagePath = path.join(
    process.cwd(),
    'public/assets/images/portfolio',
    item.imageFile
  );

  let resizedPhotoBuffer: Buffer;
  if (fs.existsSync(imagePath)) {
    resizedPhotoBuffer = await sharp(imagePath)
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

  const photoMaskSvg = Buffer.from(`
    <svg width="460" height="470" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="470" rx="24" fill="#ffffff"/>
    </svg>
  `);
  const roundedPhoto = await sharp(resizedPhotoBuffer)
    .composite([{ input: photoMaskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const photoCardOverlaySvg = Buffer.from(`
    <svg width="480" height="490" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ogPhotoGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="50%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#071324" stop-opacity="0.92"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="490" rx="28" fill="#0d1f36" stroke="#208ec1" stroke-width="1.5" stroke-opacity="0.4"/>
      <rect x="10" y="10" width="460" height="470" rx="24" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.1"/>
      <rect x="10" y="270" width="460" height="210" rx="24" fill="url(#ogPhotoGrad)"/>

      <rect x="290" y="24" width="165" height="34" rx="17" fill="#ffffff" fill-opacity="0.96"/>
      <text x="372" y="46" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="13" font-weight="900" fill="#0f2544" text-anchor="middle">
        ★ ${item.warranty}
      </text>

      <text x="445" y="440" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="13" font-weight="bold" fill="#38bdf8" text-anchor="end">
        📍 ${item.city}
      </text>
      <text x="445" y="462" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="11" font-weight="500" fill="#e2e8f0" text-anchor="end">
        شركة همم غيم للمقاولات والدعاية والإعلان
      </text>
    </svg>
  `);

  const finalPhotoCard = await sharp(photoCardOverlaySvg)
    .composite([{ input: roundedPhoto, top: 10, left: 10 }])
    .png()
    .toBuffer();

  const backgroundSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
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
      <rect x="18" y="18" width="1164" height="594" rx="28" fill="none" stroke="#208ec1" stroke-width="1.5" stroke-opacity="0.25"/>

      <g transform="translate(560, 50)">
        <rect x="300" y="0" width="280" height="36" rx="18" fill="#208ec1" fill-opacity="0.18" stroke="#208ec1" stroke-width="1.2" stroke-opacity="0.6"/>
        <text x="440" y="23" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="13" font-weight="900" fill="#38bdf8" text-anchor="middle">
          ✦ ${item.category}
        </text>

        <text x="580" y="76" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="end">
          شركة همم غيم للدعاية والإعلان والمقاولات
        </text>

        <text x="580" y="122" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="20" font-weight="800" fill="#7dd3fc" text-anchor="end">
          ${item.title.length > 48 ? item.title.substring(0, 48) + '...' : item.title}
        </text>

        <text x="580" y="156" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="14" font-weight="500" fill="#cbd5e1" text-anchor="end">
          ${item.subtitle.length > 56 ? item.subtitle.substring(0, 56) + '...' : item.subtitle}
        </text>

        <line x1="80" y1="184" x2="580" y2="184" stroke="#1e3a5f" stroke-width="1.5"/>

        <g transform="translate(0, 204)">
          <circle cx="570" cy="12" r="10" fill="#208ec1" fill-opacity="0.2"/>
          <text x="570" y="16" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">✓</text>
          <text x="550" y="16" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="end">
            ${item.bullets[0]}
          </text>

          <circle cx="570" cy="52" r="10" fill="#208ec1" fill-opacity="0.2"/>
          <text x="570" y="56" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">✓</text>
          <text x="550" y="56" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="end">
            ${item.bullets[1]}
          </text>

          <circle cx="570" cy="92" r="10" fill="#208ec1" fill-opacity="0.2"/>
          <text x="570" y="96" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">✓</text>
          <text x="550" y="96" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="end">
            ${item.bullets[2]}
          </text>
        </g>

        <g transform="translate(0, 360)">
          <rect x="290" y="0" width="290" height="52" rx="26" fill="#0f2544" stroke="#208ec1" stroke-width="1.8"/>
          <text x="435" y="32" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle">
            📞 جوال وواتساب: 0565467928
          </text>

          <rect x="90" y="0" width="185" height="52" rx="26" fill="#208ec1" fill-opacity="0.18" stroke="#208ec1" stroke-width="1.2"/>
          <text x="182" y="32" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">
            himam-ghaim.sa 🌐
          </text>
        </g>
      </g>
    </svg>
  `);

  const finalOgBuffer = await sharp(backgroundSvg)
    .composite([{ input: finalPhotoCard, top: 70, left: 55 }])
    .png({ quality: 92 })
    .toBuffer();

  return new Response(finalOgBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control':
        'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
