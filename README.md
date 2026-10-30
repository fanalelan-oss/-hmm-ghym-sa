# شركة همم غيم للدعاية والإعلان والمقاولات (Himam Ghaim)

منصة رقمية وهندسية متكاملة لشركة **همم غيم للدعاية والإعلان والمقاولات العامة** في المملكة العربية السعودية.

---

## 🌟 نبذة عن المشروع
منصة ويب عصرية مطورة بأحدث تقنيات الويب المعمارية وتلبي متطلبات الكود التجاري والهندسي السعودي:
- **الأحرف البارزة والكلادينج:** استوديو محاكاة تفاعلي ثلاثي الأبعاد للحروف المضيئة وواجهات ACP.
- **المقاولات العامة والتشطيبات:** الديكور الداخلي الفاخر، واجهات الزجاج السيكوريت، وتسوير المشاريع الإنشائية.
- **المظلات والسواتر:** برجولات ومظلات سيارات وسواتر قص ليزر.
- **تجهيز المعارض والمؤتمرات:** تصميم وتنفيذ أجنحة وبوثات المعارض الكبرى.
- **حاسبة التكاليف الذكية:** تقدير فوري وشفاف لتكاليف المشاريع واللوحات.
- **المهندس الذكي (AI Engineer):** مستشار هندسي فوري يجيب على استفسارات المواد والأسعار والمواصفات 24/7.

---

## 🚀 البنية التقنية (Tech Stack)
- **Framework:** [Next.js](https://nextjs.org/) (App Router & SSR Hybrid Architecture)
- **Language:** TypeScript & Modern ES6+
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) مع نظام تصميم مخصص ودعم كامل لـ RTL والوضع الليلي/النهاري.
- **Icons & Visuals:** Lucide Icons & Custom SVG Optimized Vectors.
- **Fonts:** خطوط عربية معتمدة (Cairo للعناوين، Tajawal للنصوص).
- **Backend & Cloud:** Firebase App Hosting, Next.js Server Components, Server-side API Endpoints.
- **SEO & Search Engines:** خريطة موقع ديناميكية `sitemap.xml`، `robots.txt`، ترميز بيانات Schema.org (LocalBusiness & Organization).

---

## 📁 هيكلية المجلدات الرئيسية
```text
├── public/                 # الوسائط والملفات الثابتة وصور المشاريع المصنفة
├── src/
│   ├── app/                # صفحات الموقع ومسارات الـ Routing المنفصلة
│   │   ├── (site pages)    # services, portfolio, calculator, reviews, contact, about, blog, admin
│   │   ├── api/            # واجهات برمجية لـ leads, ai-engineer, db, reviews
│   │   ├── layout.tsx      # الهيكل الأساسي وإعدادات الخطوط والـ Providers
│   │   └── page.tsx        # الصفحة الرئيسية
│   ├── components/         # المكونات الموديولار (كل قسم وقائمة في ملف مستقل)
│   │   ├── home/           # أقسام الصفحة الرئيسية (Hero, Services, Simulator, Showcase, Reviews)
│   │   ├── layout/         # الشريط العلوي العائم، التذييل، الأزرار السريعة
│   │   └── seo/            # مكوّنات الميتا داتا وSchema Markup
│   ├── context/            # إدارة الحالة العامة (اللغات، الثيم، قاعدة البيانات)
│   ├── data/               # النسخة الأولية لبيانات المشاريع والخدمات
│   └── lib/                # دوال المعالجة والترجمة وإدارة الملفات
├── data/                   # قاعدة البيانات المحلية للتشغيل (db.json)
├── apphosting.yaml         # إعدادات النشر على Firebase App Hosting
└── tailwind.config.ts      # إعدادات الألوان والهوية البصرية
```

---

## 🛠️ التشغيل والتطوير محلياً

1. **تثبيت الحزم البرمجية:**
   ```bash
   npm install
   ```

2. **تشغيل بيئة التطوير (Development Server):**
   ```bash
   npm run dev
   ```

3. **بناء النسخة الإنتاجية (Production Build):**
   ```bash
   npm run build
   ```

4. **تشغيل النسخة الإنتاجية محلياً:**
   ```bash
   npx next start -p 3001
   ```

---

## 📞 بيانات التواصل الرسمية المعتمدة
- **الموقع:** المملكة العربية السعودية
- **الجوال والواتساب:** `+966 56 546 7928`
- **البريد الإلكتروني:** `hmm.ghym.sa@gmail.com`
- **حساب GitHub:** `fanalelan-oss/-hmm-ghym-sa`
