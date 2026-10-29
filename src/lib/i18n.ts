import { Lang, LocalizedText, LocalizedList } from './types';

export function tText(obj: LocalizedText | string | undefined, lang: Lang): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.ar || '';
}

export function tList(obj: LocalizedList | string[] | undefined, lang: Lang): string[] {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  return obj[lang] || obj.ar || [];
}

export const UI_DICT = {
  ar: {
    dir: 'rtl' as const,
    langName: 'العربية',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      portfolio: 'أعمالنا',
      partners: 'عملاؤنا',
      aiEngineer: 'المستشار الذكي',
      calculator: 'حاسبة التكلفة',
      reviews: 'آراء العملاء',
      blog: 'المدونة',
      contact: 'طلب تسعير',
      admin: 'الإدارة',
      requestQuote: 'اطلب تسعير',
      whatsapp: 'واتساب',
    },
    hero: {
      badge: 'لوحات إعلانية، واجهات ومقاولات في كل مناطق المملكة',
      titleLine1: 'نصمم وننفذ واجهة مشروعك',
      titleLine2: 'بجودة عالية وضمان يريح بالك',
      subtitle:
        'من لوحات المحلات والأحرف البارزة وتكسية الكلادينج، إلى المظلات وتجهيز المعارض والتشطيبات الكاملة — ننفذ مشروعك من التصميم حتى التركيب بسرعة وإتقان.',
      ctaPrimary: 'اطلب تسعير مشروعك',
      ctaAi: 'استشر المساعد الذكي',
      ctaPortfolio: 'شاهد أعمالنا (100+ مشروع)',
      statsProjects: 'مشروع منفذ',
      statsServices: 'خدمات متكاملة',
      statsPartners: 'شريك وعميل',
      statsWarranty: 'سنوات ضمان',
    },
    whyUs: {
      eyebrow: 'لماذا همم غيم؟',
      title: 'شغل متقن، خامات أصلية، ومواعيد دقيقة',
      subtitle:
        'نهتم بكل تفصيلة في مشروعك من أول معاينة وحتى التسليم النهائي، لنضمن لك نتيجة تبيّض الوجه وتدوم لسنوات.',
      c1Title: 'مطابق لاشتراطات البلدية',
      c1Desc:
        'نصمم وننفذ اللوحات والواجهات حسب أنظمة البلديات والكود العمراني بدون أي ملاحظات.',
      c2Title: 'خامات أصلية تتحمل الأجواء',
      c2Desc:
        'نستخدم أكريليك، ستانلس ستيل، وكلادينج مقاوم للحرارة والشمس مع إضاءة LED قوية وعمرها طويل.',
      c3Title: 'أسعار واضحة والتزام بالوقت',
      c3Desc:
        'عرض سعر واضح ومفصل بدون تكاليف مخفية، مع التزام تام بموعد التسليم والتركيب المتفق عليه.',
      c4Title: 'كل خدماتك في مكان واحد',
      c4Desc:
        'سواء كان مشروعك محلاً واحداً أو سلسلة فروع، ننفذ لك اللوحات والواجهة والديكور بالكامل.',
    },
    servicesSection: {
      eyebrow: 'خدماتنا',
      title: 'كل ما يحتاجه مشروعك في مكان واحد',
      subtitle:
        'تصفح خدماتنا الأساسية وتعرّف على التفاصيل ونماذج الأعمال والأسعار التقديرية لكل خدمة.',
      viewAll: 'كل الخدمات',
      exploreService: 'التفاصيل',
      requestService: 'اطلب تسعير',
    },
    simulator: {
      eyebrow: 'استوديو تصميم اللوحات 3D',
      title: 'صمّم لوحتك وجرّب شكلها قبل التنفيذ',
      subtitle:
        'اكتب اسم محلك أو شركتك، اختر الخط والخامة والإضاءة، أو ارفع صورة واجهتك وشوف النتيجة والتكلفة فوراً.',
      inputLabel: 'اسم المحل أو الشركة:',
      inputPlaceholder: 'همم غيم',
      lightingType: 'نوع الإضاءة والخامة:',
      claddingColor: 'لون الواجهة:',
      timeMode: 'وقت المعاينة:',
      dayMode: 'نهاري ☀️',
      nightMode: 'ليلي 🌙',
      frontLit: 'إضاءة أمامية',
      haloLit: 'إضاءة خلفية Halo',
      goldLit: 'ستانلس عاكس',
      cyanLit: 'نيون سماوي',
      requestThisSign: 'اعتمد التصميم واطلب تسعير',
    },
    portfolioSection: {
      eyebrow: 'أعمالنا',
      title: 'مشاريع نفذناها على أرض الواقع',
      subtitle:
        'نماذج حقيقية من أعمالنا في اللوحات والواجهات والمظلات والديكور لمختلف الأنشطة التجارية والحكومية.',
      allFilter: 'الكل',
      viewAllProjects: 'تصفح كل المشاريع',
      projectDetails: 'تفاصيل المشروع',
      videoBadge: 'فيديو',
    },
    processSection: {
      eyebrow: 'خطوات العمل',
      title: 'كيف ننفذ مشروعك في 4 خطوات بسيطة؟',
      s1Title: 'معاينة الموقع ورفع المقاسات',
      s1Desc:
        'نزور موقعك مجاناً لأخذ المقاسات الدقيقة ومعرفة احتياجك على الطبيعة.',
      s2Title: 'التصميم ثلاثي الأبعاد والتسعير',
      s2Desc:
        'نجهز لك تصميماً يوضح شكل المشروع قبل البدء، مع عرض سعر واضح ومفصل.',
      s3Title: 'التصنيع والتركيب السريع',
      s3Desc:
        'نصنّع مشروعك في مصانعنا بأحدث المكائن، ويركّبه فريقنا المختص بدقة وأمان.',
      s4Title: 'التسليم وشهادة الضمان',
      s4Desc:
        'نسلّمك المشروع جاهزاً على أكمل وجه مع ضمان مكتوب على الخامات والتركيب.',
    },
    partnersSection: {
      eyebrow: 'عملاؤنا',
      title: 'جهات وشركات وثقت بنا',
      subtitle:
        'سعدنا بخدمة مجموعة من الجهات الحكومية والمستشفيات والشركات والمشاريع التجارية في المملكة.',
      viewAllPartners: 'كل العملاء',
    },
    reviewsSection: {
      eyebrow: 'آراء العملاء',
      title: 'تجارب عملائنا معنا',
      subtitle:
        'تقييمات حقيقية من عملاء نفذنا لهم مشاريع متنوعة في مختلف مدن المملكة.',
      addReviewBtn: 'أضف تقييمك أو شاهد الكل',
      officialReply: 'رد فريق همم غيم:',
    },
    seoSection: {
      eyebrow: 'البحث السريع',
      title: 'روابط سريعة لأهم خدماتنا في المملكة',
      ctaTitle: 'جاهز تبدأ مشروعك؟ تواصل معنا اليوم',
      ctaDesc:
        'تواصل معنا مباشرة عبر الواتساب أو الجوال، وسنساعدك في اختيار الحل الأنسب وتقديم تسعير واضح وسريع.',
    },
    footer: {
      aboutText:
        'شركة همم غيم للدعاية والإعلان والمقاولات؛ نصمم وننفذ اللوحات والأحرف البارزة، واجهات الكلادينج، المظلات والسواتر، تجهيز المعارض، الديكورات الداخلية، والمقاولات العامة بجودة عالية وضمان شامل.',
      quickLinks: 'روابط سريعة',
      ourServices: 'خدماتنا',
      contactTitle: 'تواصل معنا',
      rights: 'جميع الحقوق محفوظة © شركة همم غيم للدعاية والإعلان والمقاولات.',
    },
  },
  en: {
    dir: 'ltr' as const,
    langName: 'English',
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      portfolio: 'Projects',
      partners: 'Clients',
      aiEngineer: 'AI Advisor',
      calculator: 'Cost Calculator',
      reviews: 'Reviews',
      blog: 'Blog',
      contact: 'Get a Quote',
      admin: 'Admin',
      requestQuote: 'Get a Quote',
      whatsapp: 'WhatsApp',
    },
    hero: {
      badge: 'Signage, Facades & Contracting Across Saudi Arabia',
      titleLine1: 'We Design & Build Your Storefront',
      titleLine2: 'With Lasting Quality & Full Warranty',
      subtitle:
        'From 3D illuminated signs and ACP cladding to car shades, exhibition booths, and complete interior fit-outs — we handle everything from design to installation.',
      ctaPrimary: 'Get Your Project Priced',
      ctaAi: 'Ask AI Advisor',
      ctaPortfolio: 'View Our Work (100+ Projects)',
      statsProjects: 'Delivered Projects',
      statsServices: 'Core Services',
      statsPartners: 'Trusted Clients',
      statsWarranty: 'Years Warranty',
    },
    whyUs: {
      eyebrow: 'Why Himam Ghaim?',
      title: 'Clean Work, Original Materials & On-Time Delivery',
      subtitle:
        'We take care of every detail from the first site visit to final handover, giving you results built to last.',
      c1Title: 'Municipality Ready',
      c1Desc:
        'All signs and facades follow Saudi municipal and urban code rules with zero hassle.',
      c2Title: 'Weather-Proof Materials',
      c2Desc:
        'High-grade acrylic, 304 stainless steel, fire-rated cladding, and bright long-life LEDs.',
      c3Title: 'Clear Pricing & Deadlines',
      c3Desc:
        'Transparent quotes with no hidden costs and strict commitment to agreed delivery dates.',
      c4Title: 'Everything Under One Roof',
      c4Desc:
        'Whether a single shop or multiple branches, we handle your signage, facade, and fit-out.',
    },
    servicesSection: {
      eyebrow: 'Our Services',
      title: 'Everything Your Project Needs in One Place',
      subtitle:
        'Browse our core services to see details, real work examples, and estimated pricing.',
      viewAll: 'All Services',
      exploreService: 'Details',
      requestService: 'Get Quote',
    },
    simulator: {
      eyebrow: '3D Sign Design Studio',
      title: 'Design Your Sign & Preview It Live',
      subtitle:
        'Type your business name, pick the font, material, and lighting, or upload your storefront photo for an instant preview and cost estimate.',
      inputLabel: 'Business or Brand Name:',
      inputPlaceholder: 'HIMAM GHAIM',
      lightingType: 'Lighting & Material:',
      claddingColor: 'Facade Finish:',
      timeMode: 'Preview Time:',
      dayMode: 'Day ☀️',
      nightMode: 'Night 🌙',
      frontLit: 'Acrylic Front-Lit',
      haloLit: 'Halo Backlit',
      goldLit: 'Mirror Steel',
      cyanLit: 'Neon Cyan',
      requestThisSign: 'Approve Design & Request Quote',
    },
    portfolioSection: {
      eyebrow: 'Our Work',
      title: 'Real Projects Delivered Across KSA',
      subtitle:
        'Explore real examples of our signage, cladding, shades, and fit-out projects for businesses and government entities.',
      allFilter: 'All',
      viewAllProjects: 'View All Projects',
      projectDetails: 'Project Details',
      videoBadge: 'Video',
    },
    processSection: {
      eyebrow: 'How We Work',
      title: 'Your Project Done in 4 Simple Steps',
      s1Title: 'Free Site Visit & Measurements',
      s1Desc:
        'We visit your location for free to take accurate measurements and understand your needs.',
      s2Title: '3D Design & Clear Quote',
      s2Desc:
        'We prepare a realistic 3D preview of your project along with a clear, itemized quote.',
      s3Title: 'Fast Manufacturing & Setup',
      s3Desc:
        'Produced in our own workshops with modern machines and installed safely by our team.',
      s4Title: 'Handover & Written Warranty',
      s4Desc:
        'We deliver your project ready to go, backed by a written warranty on materials and work.',
    },
    partnersSection: {
      eyebrow: 'Our Clients',
      title: 'Brands & Organizations That Trust Us',
      subtitle:
        'Proud to serve government entities, hospitals, and commercial businesses across Saudi Arabia.',
      viewAllPartners: 'All Clients',
    },
    reviewsSection: {
      eyebrow: 'Client Reviews',
      title: 'What Our Clients Say About Us',
      subtitle:
        'Real feedback from business owners and project managers we worked with across KSA.',
      addReviewBtn: 'Add Review or View All',
      officialReply: 'Himam Ghaim Team:',
    },
    seoSection: {
      eyebrow: 'Quick Search',
      title: 'Quick Links to Our Main Services in Saudi Arabia',
      ctaTitle: 'Ready to Start Your Project? Contact Us Today',
      ctaDesc:
        'Reach out via WhatsApp or phone and we will help you choose the right solution with a fast, clear quote.',
    },
    footer: {
      aboutText:
        'Himam Ghaim Advertising & Contracting Co. — we design and build 3D signs, ACP facades, car shades, exhibition booths, interior fit-outs, and contracting projects with full warranty.',
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      contactTitle: 'Contact Us',
      rights: 'All rights reserved © Himam Ghaim Advertising & Contracting Co.',
    },
  },
  ur: {
    dir: 'rtl' as const,
    langName: 'اردو',
    nav: {
      home: 'صفحہ اول',
      about: 'ہمارے بارے میں',
      services: 'ہماری خدمات',
      portfolio: 'ہمارے کام',
      partners: 'ہمارے کلائنٹس',
      aiEngineer: 'ذہین مشیر',
      calculator: 'لاگت کیلکولیٹر',
      reviews: 'صارفین کی رائے',
      blog: 'بلاگ',
      contact: 'کوٹیشن طلب کریں',
      admin: 'ایڈمن',
      requestQuote: 'کوٹیشن حاصل کریں',
      whatsapp: 'واٹس ایپ',
    },
    hero: {
      badge: 'سعودی عرب کے تمام شہروں میں سائن بورڈز، واجهات اور کنٹریکٹنگ',
      titleLine1: 'اپنے کاروبار کا فرنٹ اور سائن بورڈ بنوائیں',
      titleLine2: 'اعلیٰ معیار اور مکمل ضمانت کے ساتھ',
      subtitle:
        'تھری ڈی سائن بورڈز اور کلیڈنگ سے لے کر کار شیڈز، نمائشی بوتھس اور مکمل ڈیکوریشن تک — ہم ڈیزائن سے تنصیب تک تمام کام تیز رفتاری اور مہارت سے مکمل کرتے ہیں۔',
      ctaPrimary: 'اپنے پروجیکٹ کی قیمت جانیں',
      ctaAi: 'ذہین مشیر سے پوچھیں',
      ctaPortfolio: 'ہمارے کام دیکھیں (100+ منصوبے)',
      statsProjects: 'مکمل منصوبے',
      statsServices: 'مکمل خدمات',
      statsPartners: 'کامیاب کلائنٹس',
      statsWarranty: 'سال وارنٹی',
    },
    whyUs: {
      eyebrow: 'ہمم غیم کیوں؟',
      title: 'بہترین کام، اصلی میٹریل اور وقت کی پابندی',
      subtitle:
        'پہلے معائنے سے لے کر مکمل حوالگی تک ہم ہر تفصیل کا خیال رکھتے ہیں تاکہ آپ کا کام سالوں تک چمکتا رہے۔',
      c1Title: 'بلدیہ قوانین کے مطابق',
      c1Desc:
        'ہمارے تمام بورڈز اور ڈیزائن بلدیہ اور سعودی اربن کوڈ کے عین مطابق ہوتے ہیں۔',
      c2Title: 'موسم برداشت کرنے والا اصلی میٹریل',
      c2Desc:
        'اعلیٰ معیار کا ایکریلک، اسٹین لیس سٹیل، کلیڈنگ اور مضبوط ایل ای ڈی لائٹس۔',
      c3Title: 'واضح قیمت اور وقت پر تکمیل',
      c3Desc:
        'بغیر کسی پوشیدہ خرچ کے واضح کوٹیشن اور مقررہ وقت پر کام کی حوالگی۔',
      c4Title: 'تمام خدمات ایک ہی جگہ',
      c4Desc:
        'چاہے ایک دکان ہو یا کئی برانچز، ہم سائن بورڈ، فرنٹ اور ڈیکوریشن مکمل کرتے ہیں۔',
    },
    servicesSection: {
      eyebrow: 'ہماری خدمات',
      title: 'آپ کے پروجیکٹ کی تمام ضروریات ایک ہی جگہ',
      subtitle:
        'ہماری بنیادی خدمات، سابقہ کام اور تخمینی قیمتیں یہاں دیکھیں۔',
      viewAll: 'تمام خدمات',
      exploreService: 'تفصیلات',
      requestService: 'قیمت جانیں',
    },
    simulator: {
      eyebrow: 'تھری ڈی سائن ڈیزائن اسٹوڈیو',
      title: 'اپنا سائن بورڈ ڈیزائن کریں اور لائیو شکل دیکھیں',
      subtitle:
        'اپنی دکان کا نام لکھیں، فونٹ اور لائٹنگ منتخب کریں، یا اپنی دکان کی تصویر اپ لوڈ کر کے فوری نتیجہ اور قیمت دیکھیں۔',
      inputLabel: 'دکان یا کمپنی کا نام:',
      inputPlaceholder: 'شركة همم غيم',
      lightingType: 'لائٹنگ اور میٹریل:',
      claddingColor: 'فرنٹ کا رنگ:',
      timeMode: 'وقت:',
      dayMode: 'دن ☀️',
      nightMode: 'رات 🌙',
      frontLit: 'فرنٹ لائٹ',
      haloLit: 'ہالو بیک لائٹ',
      goldLit: 'اسٹین لیس مرر',
      cyanLit: 'نیون بلیو',
      requestThisSign: 'ڈیزائن منظور کریں اور قیمت جانیں',
    },
    portfolioSection: {
      eyebrow: 'ہمارے کام',
      title: 'حقیقی منصوبے جو ہم نے مکمل کیے',
      subtitle:
        'سائن بورڈز، کلیڈنگ، شیڈز اور ڈیکوریشن کے حقیقی نمونے دیکھیں۔',
      allFilter: 'سب',
      viewAllProjects: 'تمام منصوبے دیکھیں',
      projectDetails: 'تفصیل دیکھیں',
      videoBadge: 'ویڈیو',
    },
    processSection: {
      eyebrow: 'کام کا طریقہ',
      title: 'آپ کا پروجیکٹ 4 آسان مراحل میں',
      s1Title: 'مفت معائنہ اور پیمائش',
      s1Desc:
        'ہماری ٹیم موقع پر جا کر مفت پیمائش لیتی ہے اور آپ کی ضرورت سمجھتی ہے۔',
      s2Title: 'تھری ڈی ڈیزائن اور قیمت',
      s2Desc:
        'کام شروع کرنے سے پہلے واضح تھری ڈی ڈیزائن اور تفصیلی قیمت پیش کی جاتی ہے۔',
      s3Title: 'تیاری اور تیز تنصیب',
      s3Desc:
        'ہماری اپنی فیکٹری میں جدید مشینوں سے تیاری اور ماہر ٹیم کے ذریعے تنصیب۔',
      s4Title: 'حوالگی اور تحریری وارنٹی',
      s4Desc:
        'میٹریل اور تنصیب کی تحریری وارنٹی کے ساتھ مکمل پروجیکٹ کی حوالگی۔',
    },
    partnersSection: {
      eyebrow: 'ہمارے کلائنٹس',
      title: 'ادارے اور کمپنیاں جنہوں نے ہم پر اعتماد کیا',
      subtitle:
        'سعودی عرب کے سرکاری اداروں، ہسپتالوں اور تجارتی کمپنیوں کی خدمت۔',
      viewAllPartners: 'تمام کلائنٹس',
    },
    reviewsSection: {
      eyebrow: 'صارفین کی رائے',
      title: 'ہمارے کلائنٹس کا تجربہ',
      subtitle:
        'سعودی عرب کے مختلف شہروں سے ہمارے کلائنٹس کے حقیقی تبصرے۔',
      addReviewBtn: 'اپنی رائے دیں یا سب دیکھیں',
      officialReply: 'ٹیم ہمم غیم کا جواب:',
    },
    seoSection: {
      eyebrow: 'فوری تلاش',
      title: 'ہماری خدمات کے فوری روابط',
      ctaTitle: 'پروجیکٹ شروع کرنے کے لیے تیار ہیں؟ آج ہی رابطہ کریں',
      ctaDesc:
        'واٹس ایپ یا فون پر رابطہ کریں، ہم آپ کو بہترین حل اور فوری قیمت فراہم کریں گے۔',
    },
    footer: {
      aboutText:
        'ہمم غیم ایڈورٹائزنگ اینڈ کنٹریکٹنگ کمپنی — تھری ڈی بورڈز، کلیڈنگ، کار شیڈز، نمائشی بوتھس اور انٹیریئر ڈیکوریشن مکمل وارنٹی کے ساتھ۔',
      quickLinks: 'فوری روابط',
      ourServices: 'ہماری خدمات',
      contactTitle: 'رابطہ کریں',
      rights: 'جملہ حقوق بحق شركة همم غيم للدعاية والإعلان والمقاولات محفوظ ہیں۔',
    },
  },
};
