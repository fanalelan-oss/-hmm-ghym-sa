const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const INITIAL_DB_PATH = path.join(__dirname, '..', 'src', 'data', 'initial-db.json');

const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const newProjects = [
  // 1. بنان الرياض - ضاحية الفرسان (مجموعة طلعت مصطفى TMG)
  {
    id: "proj-hoarding-banan-riyadh-tmg",
    slug: "project-hoarding-banan-riyadh-tmg-alfursan",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-banan-riyadh-tmg-alfursan-himam-ghaim.webp",
    poster: "",
    title: {
      ar: "تسوير مشروع بنان الرياض ضاحية الفرسان (مجموعة طلعت مصطفى TMG)",
      en: "Banan Al Riyadh Mega City Hoarding — TMG Group Al Fursan Suburb",
      ur: "تسوير مشروع بنان الرياض ضاحية الفرسان (طلعت مصطفى گروپ TMG)"
    },
    summary: {
      ar: "تسوير موقع إنشائي ضخم بهوية بصرية ممتدة ليلاً ونهاراً لمدينة بنان بالرياض",
      en: "Day and night continuous branded hoarding for Banan Riyadh Mega Project by TMG.",
      ur: "بنان الریاض میگا پراجیکٹ کے لیے دن اور رات کی مکمل برانڈڈ فینسنگ۔"
    },
    description: {
      ar: "تصنيع وتركيب سياج وتسوير إنشائي متكامل لمشروع مدينة بنان في ضاحية الفرسان بالرياض التابع لمجموعة طلعت مصطفى (TMG)، تم تنفيذ السور بهيكل حديدي ثقيل مقاوم للرياح وطباعة يوفي UV عالية الدقة تعكس تصاميم الفلل والمساحات الخضراء وهوية المشروع المعتمدة.",
      en: "Full engineering design, heavy steel framework fabrication, and high-definition UV-printed branded hoarding fence for Banan Al Riyadh in Al Fursan Suburb for Talaat Moustafa Group (TMG). Weatherproof construction compliant with Riyadh Municipality codes.",
      ur: "طلعت مصطفى گروپ (TMG) کے تحت ضاحیہ الفرسان ریاض میں بنان سٹی پراجیکٹ کے لیے ہیوی اسٹیل فریم اور یو وی پرنٹڈ برانڈڈ ہورڈنگ کی مکمل تیاری اور تنصیب۔"
    },
    alt: {
      ar: "تسوير مشروع بنان الرياض ضاحية الفرسان طلعت مصطفى | تسوير مشاريع إنشائية وعقارية بالرياض | سياج وهوردينج مواقع مشاريع كبرى بالسعودية | Banan Al Riyadh Mega City Hoarding — TMG Group Al Fursan Suburb | Construction Site Hoarding & Real Estate Fencing Riyadh | Branded Perimeter Fence & Shinko Barriers KSA",
      en: "Banan Al Riyadh Mega City Hoarding — TMG Group Al Fursan Suburb | Construction Site Hoarding & Real Estate Fencing Riyadh | Branded Perimeter Fence & Shinko Barriers KSA | تسوير مشروع بنان الرياض ضاحية الفرسان طلعت مصطفى | تسوير مشاريع إنشائية وعقارية بالرياض",
      ur: "تسوير مشروع بنان الرياض ضاحية الفرسان طلعت مصطفى | Banan Al Riyadh Mega City Hoarding TMG"
    },
    city: { ar: "الرياض (ضاحية الفرسان)", en: "Riyadh (Al Fursan)", ur: "ریاض (الفرسان)" },
    duration: { ar: "12 - 15 يوم عمل", en: "12 - 15 Working Days", ur: "12 سے 15 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "پراجیکٹ کی مدت تک اسٹرکچرل وارنٹی" },
    hashtags: [
      "#تسوير_مشاريع",
      "#بنان_الرياض",
      "#ضاحية_الفرسان",
      "#مجموعة_طلعت_مصطفى",
      "#هوردينج_الرياض",
      "#سياج_مشاريع_إنشائية",
      "#شركة_همم_غيم"
    ],
    featured: true,
    specs: {
      ar: [
        "هيكل حديدي ثقيل مدعم بقواعد خرسانية مسبقة الصب",
        "طباعة أقمشة وبنرات UV مقاومة لأشعة الشمس والحرارة والغبار",
        "إضاءة ليلية ممتدة على طول السور بكشافات ليد موجهة",
        "مطابقة تامة لكود البناء السعودي واشتراطات أمانة الرياض"
      ],
      en: [
        "Heavy-duty galvanized steel framing with precast concrete footings",
        "Fade-resistant UV outdoor printing for large-scale renders",
        "Continuous night LED illumination across perimeter",
        "100% compliant with Saudi Building Code & Riyadh Municipality"
      ],
      ur: [
        "ہیوی ڈیوٹی اسٹیل فریم بمعہ کنکریٹ بلاکس",
        "دھوپ اور موسمی حالات سے محفوظ یو وی پرنٹنگ",
        "رات کے وقت مسلسل ایل ای ڈی لائٹنگ",
        "سعودی بلدیاتی قوانین کے عین مطابق"
      ]
    },
    seoNames: {
      ar: [
        "تسوير مشروع بنان الرياض ضاحية الفرسان طلعت مصطفى",
        "تسوير مشاريع إنشائية وعقارية بالرياض",
        "سياج وهوردينج مواقع مشاريع كبرى بالسعودية"
      ],
      en: [
        "Banan Al Riyadh Mega City Hoarding — TMG Group Al Fursan Suburb",
        "Construction Site Hoarding & Real Estate Fencing Riyadh",
        "Branded Perimeter Fence & Shinko Barriers KSA"
      ]
    }
  },

  // 2. مشروع جدن لايف - شركة الوفست العقارية
  {
    id: "proj-hoarding-jadan-life-innovest",
    slug: "project-hoarding-jadan-life-innovest",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-jadan-life-innovest-himam-ghaim.webp",
    poster: "",
    title: {
      ar: "تسوير مشروع مجمع جدن لايف (Jadan Life) لشركة الوفست العقارية",
      en: "Jadan Life Construction Hoarding & Branded Fence — Innovest KSA",
      ur: "تسوير مشروع مجمع جدن لايف (Jadan Life) الوفست رئیل اسٹیٹ"
    },
    summary: {
      ar: "تسوير مجمع سكني وتجاري فاخر بطباعة معمارية عالية الجودة وأطر زخرفية",
      en: "Luxury residential compound branded hoarding fence with architectural renders.",
      ur: "جدن لائف لگژری رہائشی پراجیکٹ کے لیے دیدہ زیب برانڈڈ فینسنگ۔"
    },
    description: {
      ar: "تنفيذ وتجهيز السور الإنشائي التسويقي لمشروع مجمع جدن لايف (Jadan Life) التابع لشركة الوفست للاستثمار العقاري بالرياض، مع إبراز الهوية البصرية ورندرات الفلل والمرافق السكنية بنظام شد احترافي وفواصل سفلية مزخرفة وقواعد تثبيت آمنة.",
      en: "Complete perimeter hoarding execution for Jadan Life residential compound by Innovest in Riyadh. High-tension banner stretching over rigid framework with decorative lower trims and reinforced anchoring.",
      ur: "انوویسٹ رئیل اسٹیٹ کے تحت جدن لائف کمپاؤنڈ کے لیے برانڈڈ ہورڈنگ، آرکیٹیکچرل رینڈرز اور مضبوط اسٹرکچر کی تیاری اور تنصیب۔"
    },
    alt: {
      ar: "تسوير مشروع جدن لايف الوفست العقارية | تسوير مشاريع وفلل سكنية بالرياض | أسوار شينكو وبنر مطبوع للمشاريع | Jadan Life Construction Hoarding Innovest | Branded Real Estate Perimeter Fencing Riyadh",
      en: "Jadan Life Construction Hoarding Innovest | Branded Real Estate Perimeter Fencing Riyadh | تسوير مشروع جدن لايف الوفست العقارية",
      ur: "تسوير مشروع جدن لايف الوفست العقارية | Jadan Life Construction Hoarding"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "7 - 10 أيام عمل", en: "7 - 10 Working Days", ur: "7 سے 10 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کے دورانیے تک وارنٹی" },
    hashtags: ["#تسوير_مشاريع", "#جدن_لايف", "#شركة_الوفست", "#هوردينج_الرياض", "#سياج_عقاري"],
    featured: true,
    specs: {
      ar: [
        "شد بنر ميكانيكي عالي المتانة بدون أي تموجات",
        "إطار سفلي ديكوري مفرغ بنقوش هندسية",
        "تثبيت على قواعد خرسانية ثقيلة لتفادي الحفر بالأرضيات",
        "طباعة فلكس وبنر خارجي معالج ضد أشعة UV"
      ],
      en: [
        "Mechanical banner tensioning system with zero wrinkling",
        "Lower decorative pattern border for clean street aesthetic",
        "Heavy concrete counterweights avoiding surface digging",
        "UV-resistant outdoor banner media"
      ],
      ur: [
        "میکانیکل بینر ٹینشننگ سسٹم بغیر کسی شکن کے",
        "خوبصورت نچلا ڈیزائن بارڈر",
        "کنکریٹ بلاکس پر مضبوط تنصیب",
        "دھوپ سے محفوظ آؤٹ ڈور بینر میٹریل"
      ]
    },
    seoNames: {
      ar: ["تسوير مشروع جدن لايف الوفست العقارية", "تسوير مشاريع وفلل سكنية بالرياض", "أسوار شينكو وبنر مطبوع للمشاريع"],
      en: ["Jadan Life Construction Hoarding Innovest", "Branded Real Estate Perimeter Fencing Riyadh", "Perimeter Fence for Compounds KSA"]
    }
  },

  // 3. مشروع أبراج وكيانات تجارية (كيانات سنترال) برؤية 2030
  {
    id: "proj-hoarding-kayanat-central-towers",
    slug: "project-hoarding-kayanat-central-towers",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-kayanat-central-towers-vision2030-himam-ghaim.webp",
    poster: "",
    title: {
      ar: "تسوير مشروع أبراج وكيانات تجارية (كيانات سنترال) برؤية 2030",
      en: "Kayanat Central Towers Mega Construction Hoarding — Vision 2030",
      ur: "تسوير مشروع أبراج وكيانات تجارية (كيانات سنترال) برؤية 2030"
    },
    summary: {
      ar: "تسوير عملاق بطول ممتد لمشروع أبراج تجارية مع رندرات معمارية للأبراج والساحات",
      en: "Mega-scale highway perimeter hoarding for commercial towers complex.",
      ur: "کمرشل ٹاورز پراجیکٹ کے لیے ہائی وے پر وسیع پیمانے پر برانڈڈ ہورڈنگ۔"
    },
    description: {
      ar: "تنفيذ سور تسوير مشروع أبراج ومول تجاري (كيانات سنترال - Kayanat Central) بهوية رؤية السعودية 2030، يمتد لمئات الأمتار على طريق حيوي بالرياض، متضمناً رندرات بانورامية لأبراج الزجاج والنوافير التفاعلية والمرافق التجارية مع هياكل حماية فولاذية معتمدة.",
      en: "Execution of large-scale construction perimeter hoarding for Kayanat Central commercial towers & plaza in Riyadh under Saudi Vision 2030 identity. Spanning hundreds of meters along a prime thoroughfare with panoramic architectural renderings.",
      ur: "ریاض میں کیانات سنٹرل کمرشل ٹاورز اور پلازہ کے لیے سعودی وژن 2030 کی شناخت کے ساتھ شاندار برانڈڈ ہورڈنگ کی تنصیب۔"
    },
    alt: {
      ar: "تسوير مشروع أبراج كيانات سنترال بالرياض | تسوير مشاريع تجارية وأبراج بالسعودية | هوردينج مشاريع رؤية 2030 | Kayanat Central Towers Construction Hoarding | Commercial Towers Perimeter Fencing Riyadh",
      en: "Kayanat Central Towers Construction Hoarding | Commercial Towers Perimeter Fencing Riyadh | تسوير مشروع أبراج كيانات سنترال بالرياض",
      ur: "تسوير مشروع أبراج كيانات سنترال بالرياض | Kayanat Central Towers Hoarding"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "10 - 14 يوم عمل", en: "10 - 14 Working Days", ur: "10 سے 14 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#تسوير_مشاريع", "#كيانات_سنترال", "#رؤية_2030", "#هوردينج_أبراج", "#مقاولات_الرياض"],
    featured: true,
    specs: {
      ar: [
        "ارتفاع يتجاوز 4 أمتار مع تدعيم خلفي مثلثي مزدوج",
        "ألوان غنية وتباين بصري عالي الدقة يجذب أنظار المارة",
        "نظام عزل كامل للأتربة والغبار الناتجة عن أعمال الحفر والإنشاء",
        "مطابق لاشتراطات السلامة المهنية والدفاع المدني"
      ],
      en: [
        "Over 4 meters height with double triangular rear bracing",
        "Vivid color printing with high visual contrast for highway view",
        "Complete dust containment system for ongoing excavation",
        "Fully compliant with OSHA and Civil Defense guidelines"
      ],
      ur: [
        "4 میٹر سے زائد اونچائی بمعہ ڈبل اینگل اسٹرکچر",
        "روڈ ٹریفک کے لیے انتہائی واضح اور دلکش پرنٹنگ",
        "تعمیراتی مٹی اور دھول روکنے کا مکمل انتظام",
        "سیفٹی اور سول ڈیفنس کے معیارات کے مطابق"
      ]
    },
    seoNames: {
      ar: ["تسوير مشروع أبراج كيانات سنترال بالرياض", "تسوير مشاريع تجارية وأبراج بالسعودية", "هوردينج مشاريع رؤية 2030"],
      en: ["Kayanat Central Towers Construction Hoarding", "Commercial Towers Perimeter Fencing Riyadh", "Saudi Vision 2030 Site Hoarding"]
    }
  },

  // 4. تسوير مشروع كالما (Calma) الفاخر
  {
    id: "proj-hoarding-calma-luxury-residences",
    slug: "project-hoarding-calma-luxury-residences",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-calma-luxury-compound-himam-ghaim.webp",
    poster: "",
    title: {
      ar: "تسوير وتجهيز واجهة مشروع مجمع كالما (Calma) العقاري الفاخر",
      en: "Calma Luxury Compound Construction Hoarding with Overhead Spotlights",
      ur: "تسوير وتجهيز واجهة مشروع مجمع كالما (Calma) العقاري الفاخر"
    },
    summary: {
      ar: "تسوير فخم بخلفية داكنة وشعار ذهبي وكشافات علوية لإبراز فخامة المشروع",
      en: "Sophisticated black & gold branded hoarding with overhead lighting brackets.",
      ur: "کالما لگژری کمپاؤنڈ کے لیے بلیک اینڈ گولڈ شاندار برانڈڈ ہورڈنگ۔"
    },
    description: {
      ar: "تصميم وتنفيذ السور الإنشائي الخارجي لمشروع مجمع كالما (Calma) السكني الفاخر بالرياض، يعتمد على خلفية سوداء مطفية أنيقة مع شعار ذهبي بارز وكشافات ليد علوية مثبتة على أذرع مائلة تمنح الموقع هيبة وفخامة تسويقية رفيعة.",
      en: "Turnkey exterior construction fencing for Calma luxury residential development in Riyadh. Featuring a matte black theme, premium gold emblem branding, and angled overhead floodlight arms.",
      ur: "ریاض میں کالما لگژری رہائشی پروجیکٹ کے لیے میٹ بلیک اور گولڈن برانڈنگ کے ساتھ اعلیٰ پائے کی فینسنگ اور اسپاٹ لائٹس۔"
    },
    alt: {
      ar: "تسوير مشروع كالما بالرياض | تسوير مشاريع فاخرة مع كشافات إضاءة | هوردينج مجمعات سكنية بالسعودية | Calma Luxury Compound Hoarding Riyadh | Premium Construction Perimeter Lighting KSA",
      en: "Calma Luxury Compound Hoarding Riyadh | Premium Construction Perimeter Lighting KSA | تسوير مشروع كالما بالرياض",
      ur: "تسوير مشروع كالما بالرياض | Calma Luxury Compound Hoarding"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "6 - 8 أيام عمل", en: "6 - 8 Working Days", ur: "6 سے 8 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#تسوير_مشاريع", "#مشروع_كالما", "#هوردينج_مجمعات", "#سياج_إنشائي_فخم", "#همم_غيم_للمقاولات"],
    featured: true,
    specs: {
      ar: [
        "تشطيب أسود مطفي معتمد يمنع انعكاس الأضواء المزعجة للسيارات",
        "أذرع إنارة علوية متناسقة بمسافات هندسية محسوبة",
        "تكسية أطراف وزوايا بقواطع ألومنيوم أنيقة",
        "مقاومة ممتازة لعوامل التعرية وحرارة الصيف الشديدة"
      ],
      en: [
        "Glare-free matte black finish for street safety",
        "Symmetrically engineered top spotlight cantilever arms",
        "Clean aluminum edge profiles and corner capping",
        "Exceptional resistance to UV and harsh summer temperatures"
      ],
      ur: [
        "سڑک کی حفاظت کے لیے میٹ بلیک نفاست",
        "اوپری اسپاٹ لائٹس کے لیے متوازن اینگلز",
        "ایلومینیم ایج پروفائلز",
        "شدید گرمی اور موسم کا مقابلہ کرنے والا میٹریل"
      ]
    },
    seoNames: {
      ar: ["تسوير مشروع كالما بالرياض", "تسوير مشاريع فاخرة مع كشافات إضاءة", "هوردينج مجمعات سكنية بالسعودية"],
      en: ["Calma Luxury Compound Hoarding Riyadh", "Premium Construction Perimeter Lighting KSA", "Residential Compound Site Fencing"]
    }
  },

  // 5. تسوير مشروع الاحتراف الماسية بهوية رؤية 2030
  {
    id: "proj-hoarding-diamond-contracting-vision2030",
    slug: "project-hoarding-diamond-contracting-vision2030",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-diamond-contracting-vision2030-himam-ghaim.webp",
    poster: "",
    gallery: [
      {
        type: "image",
        src: "/assets/images/portfolio/saudi-project-hoarding-fence-diamond-contracting-vision2030-himam-ghaim.webp",
        alt: {
          ar: "تسوير مشروع تجاري سكني لمؤسسة الاحتراف الماسية برؤية 2030",
          en: "Commercial & Residential Site Hoarding — Vision 2030 Diamond Contracting"
        }
      },
      {
        type: "image",
        src: "/assets/images/portfolio/saudi-project-hoarding-fence-diamond-contracting-street-view-himam-ghaim.webp",
        alt: {
          ar: "واجهة تسوير موقع الاحتراف الماسية للمقاولات من الطريق العام",
          en: "Street-View Branded Hoarding for Diamond Contracting Site"
        }
      }
    ],
    title: {
      ar: "تسوير مشروع مجمع تجاري سكني لمؤسسة الاحتراف الماسية بهوية رؤية 2030",
      en: "Commercial & Residential Site Hoarding — Vision 2030 Diamond Contracting",
      ur: "تسوير مشروع مجمع تجاري سكني لمؤسسة الاحتراف الماسية بهوية رؤية 2030"
    },
    summary: {
      ar: "تسوير موقع إنشائي تجاري سكني باللون البنفسجي الرسمي لرؤية 2030 بالرياض",
      en: "Vibrant purple themed commercial & residential construction fence under Vision 2030.",
      ur: "کمرشل اور رہائشی پراجیکٹ کے لیے وژن 2030 کی تھیم میں برانڈڈ فینسنگ۔"
    },
    description: {
      ar: "تسوير مشروع تجاري سكني متكامل لمؤسسة الاحتراف الماسية للمقاولات في الرياض، مجهز بهوية رؤية 2030 باللون البنفسجي الملكي، يشمل تفاصيل المشروع ورقم الترخيص وبيانات المكتب الهندسي (شركة الفكرة الرائدة) ورندرات الواجهات المعمارية.",
      en: "Turnkey project hoarding for a mixed-use commercial and residential project in Riyadh by Diamond Contracting under Saudi Vision 2030 theme. Includes official permit details, engineering firm credentials, and architectural 3D building renderings.",
      ur: "ریاض میں ڈائمنڈ کنٹریکٹنگ کے کمرشل اور رہائشی منصوبے کے لیے سعودی وژن 2030 کے بینفشی رنگ میں قانونی و تشہیری فینسنگ۔"
    },
    alt: {
      ar: "تسوير مشروع تجاري سكني رؤية 2030 بالرياض | أسوار مواقع إنشائية لمؤسسات المقاولات | هوردينج مشروع الاحتراف الماسية | Vision 2030 Construction Fence Riyadh | Diamond Contracting Hoarding",
      en: "Vision 2030 Construction Fence Riyadh | Diamond Contracting Hoarding | تسوير مشروع تجاري سكني رؤية 2030 بالرياض",
      ur: "تسوير مشروع تجاري سكني رؤية 2030 بالرياض | Vision 2030 Construction Fence"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "5 - 7 أيام عمل", en: "5 - 7 Working Days", ur: "5 سے 7 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#تسوير_مشاريع", "#رؤية_2030", "#الاحتراف_الماسية", "#هوردينج_سكني_تجاري", "#مقاولات_الرياض"],
    featured: true,
    specs: {
      ar: [
        "لوحة بيانات المشروع النظامية مطابقة لاشتراطات بلدي",
        "طباعة فلكس UV عالية التباين ومقاومة للحرارة وأشعة الشمس",
        "تثبيت آمن مع كشافات إضاءة علوية موجهة",
        "حماية كاملة للموقع وحركة المشاة والمركبات"
      ],
      en: [
        "Official municipality-compliant project data panel",
        "High-contrast UV flex printing resilient to heat and sun",
        "Secure anchoring with overhead spotlight brackets",
        "Full pedestrian and vehicular safety barrier"
      ],
      ur: [
        "بلدیاتی ضوابط کے عین مطابق پراجیکٹ ڈیٹا بورڈ",
        "دھوپ اور گرمی برداشت کرنے والی ہائی کنٹراسٹ پرنٹنگ",
        "اوپری لائٹنگ اور محفوظ تنصیب",
        "راہگیروں اور گاڑیوں کے لیے مکمل حفاظتی حصار"
      ]
    },
    seoNames: {
      ar: ["تسوير مشروع تجاري سكني رؤية 2030 بالرياض", "أسوار مواقع إنشائية لمؤسسات المقاولات", "هوردينج مشروع الاحتراف الماسية"],
      en: ["Vision 2030 Construction Fence Riyadh", "Diamond Contracting Hoarding", "Commercial Mixed-Use Site Hoarding"]
    }
  },

  // 6. جدارية وتسوير معماري مضيء ليلاً لمشروع خوالد واستاد (Khawalid & Estad)
  {
    id: "proj-hoarding-khawalid-estad-wall",
    slug: "project-hoarding-khawalid-estad-wall",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-khawalid-estad-night-illuminated-himam-ghaim.webp",
    poster: "",
    title: {
      ar: "جدارية وتسوير معماري مضيء ليلاً لمشروع خوالد واستاد (Khawalid & Estad)",
      en: "Night Illuminated Architectural Hoarding for Khawalid & Estad Projects",
      ur: "جدارية وتسوير معماري مضيء ليلاً لمشروع خوالد واستاد (Khawalid & Estad)"
    },
    summary: {
      ar: "جدارية تسوير فخمة بحروف هندسية وإضاءة ليد دافئة متناسقة على طريق رئيسي",
      en: "Sophisticated illuminated architectural hoarding wall with Warm-White backlight.",
      ur: "خوالد اور استاد پراجیکٹ کے لیے شاندار رات کی لائٹنگ والی آرکیٹیکچرل جدارية۔"
    },
    description: {
      ar: "تنفيذ جدارية وسور تسوير معماري فاخر لمشروع خوالد (Khawalid) واستاد (Estad) بالرياض، يتميز بحروف بارزة مفرغة بأحدث مكائن الليزر مع إضاءة ليد خلفية دافئة بلون Warm White ونقوش هندسية تمنح الموقع حضوراً لافتاً في فترات الليل.",
      en: "Fabrication of architectural illuminated perimeter hoarding wall for Khawalid & Estad developments in Riyadh. Features precision CNC laser-cut typography with Warm-White backlighting and geometric branding patterns.",
      ur: "ریاض میں خوالد اور استاد پراجیکٹس کے لیے سی این سی لیزر کٹ حروف اور وارم وائٹ بیک لائٹ کے ساتھ شاندار نائٹ ہورڈنگ کی تنصیب۔"
    },
    alt: {
      ar: "تسوير معماري مضيء ليلاً خوالد واستاد | جداريات أسوار مشاريع بإضاءة مخفية بالرياض | هوردينج فاخر حروف مفرغة | Khawalid & Estad Illuminated Hoarding Wall | Architectural Night Site Fencing Riyadh",
      en: "Khawalid & Estad Illuminated Hoarding Wall | Architectural Night Site Fencing Riyadh | تسوير معماري مضيء ليلاً خوالد واستاد",
      ur: "تسوير معماري مضيء ليلاً خوالد واستاد | Khawalid & Estad Illuminated Hoarding"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "8 - 12 يوم عمل", en: "8 - 12 Working Days", ur: "8 سے 12 کام کے دن" },
    warranty: { ar: "ضمان 5 سنوات على الإضاءة وثبات الهيكل", en: "5-Year Lighting & Structural Stability Warranty", ur: "لائٹنگ اور اسٹرکچر پر 5 سال وارنٹی" },
    hashtags: ["#تسوير_معماري", "#خوالد_العقارية", "#مشروع_استاد", "#إضاءة_أسوار_مشاريع", "#هوردينج_مضيء"],
    featured: true,
    specs: {
      ar: [
        "قص ليزر CNC فائق الدقة للشعارات والنصوص",
        "إضاءة ليد كورية IP68 مضادة للغبار والمطر",
        "دهان حراري مقاوم للعوامل الجوية وتغير الألوان",
        "تصميم معماري يرفع القيمة التسويقية للمشروع"
      ],
      en: [
        "High-precision CNC laser cutting for logos and text",
        "IP68 dustproof & waterproof Korean LED modules",
        "Weatherproof thermoset coating preventing color fade",
        "Architectural aesthetic enhancing real estate valuation"
      ],
      ur: [
        "ہائی پریسیشن سی این سی لیزر کٹنگ",
        "واٹر پروف اور ڈسٹ پروف کورین ایل ای ڈی لائٹس",
        "موسمی اثرات سے محفوظ پینٹ",
        "پراجیکٹ کی مارکیٹ ویلیو بڑھانے والا شاندار ڈیزائن"
      ]
    },
    seoNames: {
      ar: ["تسوير معماري مضيء ليلاً خوالد واستاد", "جداريات أسوار مشاريع بإضاءة مخفية بالرياض", "هوردينج فاخر حروف مفرغة"],
      en: ["Khawalid & Estad Illuminated Hoarding Wall", "Architectural Night Site Fencing Riyadh", "Backlit Real Estate Perimeter Signage"]
    }
  },

  // 7. تسوير طريق رئيسي عملاق - نبني لنصنع الفرق مع كود QR
  {
    id: "proj-hoarding-nabni-difference-megawall",
    slug: "project-hoarding-nabni-difference-megawall",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-nabni-difference-highway-megawall-himam-ghaim.webp",
    poster: "",
    title: {
      ar: "تسوير طريق رئيسي عملاق - نبني لنصنع الفرق مع كود QR وكشافات ليلية",
      en: "Highway Mega Hoarding Billboard — We Build To Make A Difference QR",
      ur: "تسوير طريق رئيسي عملاق - نبني لنصنع الفرق مع كود QR وكشافات ليلية"
    },
    summary: {
      ar: "سور إعلاني عملاق على شريان مروري رئيسي بكود QR رقمي للوصول المباشر",
      en: "Mega-scale highway perimeter hoarding billboard with scannable digital QR code.",
      ur: "شاہراہ پر دیوقامت تشہیری فینسنگ بمعہ اسکین ایبل کیو آر کوڈ اور لائٹنگ۔"
    },
    description: {
      ar: "تنفيذ وتجهيز سور إعلاني تسويري عملاق على طريق سريع بالرياض تحت شعار (نبني لنصنع الفرق)، يتميز بارتفاع بارز وكود QR ضخم يتيح لقائدي المركبات مسح الموقع والوصول السريع لتفاصيل المشروع وحجوزاته، مع كشافات علوية منتظمة على امتداد الطريق.",
      en: "Turnkey execution of a massive highway-side perimeter hoarding billboard in Riyadh under 'We Build to Make the Difference' campaign. Features a large scannable QR code linking to digital project sales, backed by robust structural steel and overhead floodlights.",
      ur: "ریاض کی مصروف شاہراہ پر 'نبني لنصنع الفرق' کے عنوان سے دیوقامت ہورڈنگ کی تنصیب، جس پر بڑا کیو آر کوڈ اور رات کے لیے اسپاٹ لائٹس لگائی گئی ہیں۔"
    },
    alt: {
      ar: "تسوير طريق رئيسي عملاق بالرياض | لوحات وأسوار مشاريع بكود QR | أسوار إعلانية ضخمة بالسعودية | Highway Mega Hoarding Billboard Riyadh | QR Code Construction Fencing KSA",
      en: "Highway Mega Hoarding Billboard Riyadh | QR Code Construction Fencing KSA | تسوير طريق رئيسي عملاق بالرياض",
      ur: "تسوير طريق رئيسي عملاق بالرياض | Highway Mega Hoarding Billboard"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "10 - 12 يوم عمل", en: "10 - 12 Working Days", ur: "10 سے 12 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#تسوير_مشاريع_كبرى", "#لوحات_طرق", "#هوردينج_طريق_سريع", "#نبني_لنصنع_الفرق", "#همم_غيم"],
    featured: true,
    specs: {
      ar: [
        "طباعة كود QR عملاق قابل للمسح من مسافات آمنة",
        "كشافات إنارة ليد موفرة للطاقة ومقاومة للاهتزاز والحرارة",
        "هيكل تثبيت أرضي عالي الثبات ومقاوم لرياح الطرق المفتوحة",
        "أقمشة بنر أوروبية مشدودة بأعلى درجات الإحكام"
      ],
      en: [
        "Mega-sized QR code scannable from safe roadside distances",
        "Vibration & heat-resistant energy-efficient LED floodlights",
        "Heavy-duty ground footing designed for open-highway wind loads",
        "Premium European banner media tensioned to perfection"
      ],
      ur: [
        "گاڑی سے باآسانی اسکین ہونے والا بڑا کیو آر کوڈ",
        "ہائی پاور واٹر پروف ایل ای ڈی فلڈ لائٹس",
        "کھلی شاہراہ کی تیز ہواؤں کا مقابلہ کرنے والا اسٹیل فریم",
        "اعلیٰ یورپی بینر میٹریل"
      ]
    },
    seoNames: {
      ar: ["تسوير طريق رئيسي عملاق بالرياض", "لوحات وأسوار مشاريع بكود QR", "أسوار إعلانية ضخمة بالسعودية"],
      en: ["Highway Mega Hoarding Billboard Riyadh", "QR Code Construction Fencing KSA", "Highway Real Estate Site Branding"]
    }
  },

  // 8. تسوير موقع مشروع شركة إعمار القمة للمقاولات العامة
  {
    id: "proj-hoarding-emar-alqimah-contracting",
    slug: "project-hoarding-emar-alqimah-contracting",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-emar-alqimah-contracting-himam-ghaim.webp",
    poster: "",
    title: {
      ar: "تسوير موقع مشروع شركة إعمار القمة للمقاولات العامة",
      en: "Emar Alqimah Contracting Construction Fence & Hoarding",
      ur: "تسوير موقع مشروع شركة إعمار القمة للمقاولات العامة"
    },
    summary: {
      ar: "تسوير هندسي لمشروع مقاولات وتطوير ببيانات الأقسام وأرقام التواصل الرسمية",
      en: "Contractor site hoarding featuring corporate branding and division departments.",
      ur: "اعمار القمة کنٹریکٹنگ کمپنی کے لیے پیشہ ورانہ تعمیراتی فینسنگ۔"
    },
    description: {
      ar: "تنفيذ السور الإنشائي التسويقي لشركة إعمار القمة للمقاولات العامة في الرياض، مع إبراز أقسام التشطيب والكهرباء والسباكة والتكييف وأرقام التواصل الرسمية، منفذ على هيكل شينكو وبليوت معتمد بأعلى معايير الأمان.",
      en: "Branded perimeter hoarding installation for Emar Alqimah Contracting in Riyadh, detailing corporate divisions (finishing, MEP, HVAC) with direct hotline contact numbers and municipality compliance.",
      ur: "اعمار القمة کنٹریکٹنگ کے لیے ریاض میں پراجیکٹ ہورڈنگ، جس پر کمپنی کے شعبہ جات اور رابطہ نمبرز واضح طور پر درج ہیں۔"
    },
    alt: {
      ar: "تسوير موقع شركة إعمار القمة للمقاولات | أسوار مواقع مقاولات بالرياض | هوردينج شينكو وبنر مشدود بالسعودية | Emar Alqimah Contracting Hoarding | Construction Site Fencing Riyadh",
      en: "Emar Alqimah Contracting Hoarding | Construction Site Fencing Riyadh | تسوير موقع شركة إعمار القمة للمقاولات",
      ur: "تسوير موقع شركة إعمار القمة للمقاولات | Emar Alqimah Contracting Hoarding"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "4 - 6 أيام عمل", en: "4 - 6 Working Days", ur: "4 سے 6 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#تسوير_مشاريع", "#إعمار_القمة", "#مقاولات_عامة", "#هوردينج_مواقع", "#همم_غيم"],
    featured: true,
    specs: {
      ar: ["هيكل شينكو وبليوت معتمد ومقاوم للعوامل الجوية", "طباعة واضحة للأرقام وبيانات التراخيص", "تركيب سريع وآمن في غضون أيام عمل قليلة"],
      en: ["Certified weather-proof plywood & shinko framework", "Crisp high-readability phone & permit typography", "Fast and safe on-site installation"],
      ur: ["مضبوط فریم ورک", "واضح لکھائی اور رابطہ نمبرز", "تیز رفتار تنصیب"]
    },
    seoNames: {
      ar: ["تسوير موقع شركة إعمار القمة للمقاولات", "أسوار مواقع مقاولات بالرياض", "هوردينج شينكو وبنر مشدود بالسعودية"],
      en: ["Emar Alqimah Contracting Hoarding", "Construction Site Fencing Riyadh", "General Contractor Perimeter Branding"]
    }
  },

  // 9. تسوير موقع مشروع شركة كيان مصر للتطوير الإنشائي
  {
    id: "proj-hoarding-kayan-egypt-development",
    slug: "project-hoarding-kayan-egypt-development",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-kayan-egypt-development-himam-ghaim.webp",
    poster: "",
    title: {
      ar: "تسوير موقع مشروع شركة كيان مصر للتطوير الإنشائي",
      en: "Kayan Egypt Construction Site Branded Fence",
      ur: "تسوير موقع مشروع شركة كيان مصر للتطوير الإنشائي"
    },
    summary: {
      ar: "تسوير أمني وتسويقي لمشروع شركة كيان مصر مع استعراض سابقة الأعمال الإنشائية",
      en: "Perimeter hoarding fence for Kayan Egypt showcasing past landmark projects.",
      ur: "کیان مصر پراجیکٹ کے لیے سیکیورٹی اور تشہیری فینسنگ۔"
    },
    description: {
      ar: "تصنيع وتركيب السور الإنشائي التسويقي لموقع مشروع شركة كيان مصر، بتصميم كحلي أنيق يعرض صور وفوتوغرافيا المشاريع المنجزة ومراحل البناء بأسلوب جاذب للعملاء والمستثمرين.",
      en: "Production and installation of marketing construction fence for Kayan Egypt site, featuring navy blue corporate palette and portfolio showcases of delivered architectural landmarks.",
      ur: "کیان مصر کنسٹرکشن پراجیکٹ کے لیے دیدہ زیب نیلے رنگ میں سابقہ کاموں کے فوٹوز پر مشتمل ہورڈنگ۔"
    },
    alt: {
      ar: "تسوير موقع شركة كيان مصر | أسوار مشاريع تطوير عقاري بالرياض | هوردينج شينكو مطبوع بالسعودية | Kayan Egypt Site Hoarding | Real Estate Perimeter Fence Riyadh",
      en: "Kayan Egypt Site Hoarding | Real Estate Perimeter Fence Riyadh | تسوير موقع شركة كيان مصر",
      ur: "تسوير موقع شركة كيان مصر | Kayan Egypt Site Hoarding"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "5 - 7 أيام عمل", en: "5 - 7 Working Days", ur: "5 سے 7 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#تسوير_مشاريع", "#كيان_مصر", "#هوردينج_عقاري", "#همم_غيم_للمقاولات"],
    featured: true,
    specs: {
      ar: ["هيكل معدني قوي مقاوم للرياح", "طباعة صور واقعية للمشاريع بدقة عالية", "حماية أمنية للموقع من المارة"],
      en: ["Wind-resistant structural steel", "High-res real photography printing", "Security barrier for site premises"],
      ur: ["مضبوط اسٹیل فریم", "اعلیٰ کوالٹی پرنٹنگ", "مکمل حفاظتی انتظام"]
    },
    seoNames: {
      ar: ["تسوير موقع شركة كيان مصر", "أسوار مشاريع تطوير عقاري بالرياض", "هوردينج شينكو مطبوع بالسعودية"],
      en: ["Kayan Egypt Site Hoarding", "Real Estate Perimeter Fence Riyadh", "Commercial Site Fence KSA"]
    }
  },

  // 10. تصنيع وتركيب الهيكل المعدني الحامل والقواعد الخرسانية لتسوير المشاريع
  {
    id: "proj-hoarding-engineering-steel-counterweights",
    slug: "project-hoarding-engineering-steel-counterweights",
    category: "hoarding",
    type: "image",
    src: "/assets/images/portfolio/saudi-project-hoarding-fence-steel-skeleton-concrete-bases-himam-ghaim.webp",
    poster: "",
    gallery: [
      {
        type: "image",
        src: "/assets/images/portfolio/saudi-project-hoarding-fence-steel-skeleton-concrete-bases-himam-ghaim.webp",
        alt: {
          ar: "تصنيع وتركيب الهيكل المعدني الحامل والقواعد الخرسانية لتسوير المشاريع",
          en: "Heavy Steel Skeleton & Concrete Base Fabrication for Site Fencing"
        }
      },
      {
        type: "image",
        src: "/assets/images/portfolio/saudi-project-hoarding-fence-highway-counterweight-structure-himam-ghaim.webp",
        alt: {
          ar: "هيكل تسوير إنشائي عملاق مع القواعد الخرسانية المصبوبة على الطريق السريع",
          en: "Engineered Highway Hoarding with Concrete Counterweight Footings"
        }
      },
      {
        type: "image",
        src: "/assets/images/portfolio/saudi-project-hoarding-fence-retaining-wall-edge-reinforcement-himam-ghaim.webp",
        alt: {
          ar: "هيكل تسوير مدعم على حافة الحفر الإنشائي مع شبكة تثبيت هندسية",
          en: "Deep Excavation Edge Reinforced Hoarding Wall Structure"
        }
      },
      {
        type: "image",
        src: "/assets/images/portfolio/saudi-project-hoarding-fence-black-plywood-workers-installation-himam-ghaim.webp",
        alt: {
          ar: "تركيب ألواح البليوت الأسود وهيكل التسوير الإنشائي بواسطة فريق العمل",
          en: "Black Plywood Site Hoarding Installation by Himam Ghaim Construction Team"
        }
      },
      {
        type: "image",
        src: "/assets/images/portfolio/saudi-project-hoarding-fence-night-commercial-avenue-himam-ghaim.webp",
        alt: {
          ar: "تسوير موقع إنشائي ليلي على طريق رئيسي بألواح البليوت الأسود",
          en: "Night Construction Hoarding on Major Commercial Avenue"
        }
      }
    ],
    title: {
      ar: "تصنيع وتركيب الهيكل المعدني والقواعد الخرسانية لتسوير المشاريع الإنشائية الكبرى",
      en: "Heavy Structural Steel Skeleton & Concrete Footings for Mega Construction Hoarding",
      ur: "بڑے تعمیراتی منصوبوں کے لیے ہیوی اسٹیل فریم اور کنکریٹ بنیادوں کی تیاری"
    },
    summary: {
      ar: "أعمال تصنيع وتثبيت الهياكل الفولاذية والقواعد الخرسانية لأسوار المشاريع الكبرى وحواف الحفر",
      en: "Fabrication & civil installation of heavy steel skeletal frames and concrete ballast footings.",
      ur: "بڑے پروجیکٹس کی فینسنگ کے لیے مضبوط اسٹیل اسٹرکچر اور کنکریٹ بلاکس کی تیاری۔"
    },
    description: {
      ar: "توثيق هندسي لمراحل تصنيع وتثبيت الهياكل المعدنية الثقيلة والقواعد الخرسانية مسبقة الصب لأسوار المشاريع الإنشائية بالرياض، تشمل أعمال التدعيم على حواف الحفريات العميقة، وتركيب ألواح البليوت الأسود بواسطة فريق المهندسين والفنيين وفق أعلى معايير السلامة المهنية.",
      en: "Comprehensive civil and structural engineering showcase for heavy steel skeleton fabrication, concrete footing placement, excavation-edge bracing, and black plywood cladding by Himam Ghaim specialized site crews across Riyadh.",
      ur: "ریاض میں تعمیراتی منصوبوں کے لیے مضبوط اسٹیل فریم، کنکریٹ بلاکس اور بلیک پلائی ووڈ کی ماہر ٹیم کے ذریعے تنصیب کا مکمل انجینئرنگ کام۔"
    },
    alt: {
      ar: "هيكل حديدي وقواعد خرسانية لتسوير المشاريع | تصنيع أسوار مشاريع إنشائية بالرياض | تدعيم أسوار حواف الحفر العميق بالسعودية | Structural Steel Hoarding Skeleton Riyadh | Concrete Footings for Construction Fencing",
      en: "Structural Steel Hoarding Skeleton Riyadh | Concrete Footings for Construction Fencing | هيكل حديدي وقواعد خرسانية لتسوير المشاريع",
      ur: "هيكل حديدي وقواعد خرسانية لتسوير المشاريع | Structural Steel Hoarding Skeleton"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "حسب متطلبات الموقع والمساحة", en: "According to Site Scale", ur: "سائٹ کے حجم کے مطابق" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#هيكل_تسوير_مشاريع", "#قواعد_خرسانية", "#بليوت_أسود", "#تسوير_مواقع_بناء", "#همم_غيم_الهندسية"],
    featured: true,
    specs: {
      ar: [
        "تيوبات وجسور حديد ثقيلة معالجة بدهان إيبوكسي ضد الصدأ",
        "قواعد خرسانية مسلحة مسبقة الصب بأوزان محسوبة ضد الانقلاب",
        "تدعيم خاص لحواف الحفريات بارتفاعات تصل إلى 6 أمتار",
        "تركيب ألواح بليوت أسود أصلي مقاوم للمياه والرطوبة"
      ],
      en: [
        "Heavy-duty hollow structural steel sections coated with anti-corrosion epoxy",
        "Precast reinforced concrete ballast blocks calculated for wind overturn resistance",
        "Special deep excavation edge bracing up to 6 meters height",
        "Marine-grade moisture-proof black film faced plywood panels"
      ],
      ur: [
        "زنگ سے محفوظ ایبوکسی پینٹ شدہ ہیوی اسٹیل پائپس",
        "تیز ہواؤں میں الٹنے سے محفوظ مضبوط کنکریٹ بلاکس",
        "گہری کھدائی کے کنارے خصوصی اینگل اسٹرکچر",
        "واٹر پروف اصلی بلیک پلائی ووڈ شیٹس"
      ]
    },
    seoNames: {
      ar: ["هيكل حديدي وقواعد خرسانية لتسوير المشاريع", "تصنيع أسوار مشاريع إنشائية بالرياض", "تدعيم أسوار حواف الحفر العميق بالسعودية"],
      en: ["Structural Steel Hoarding Skeleton Riyadh", "Concrete Footings for Construction Fencing", "Deep Excavation Hoarding Reinforcement"]
    }
  },

  // 11. فيديو: تركيب لوحات وتسوير مشاريع ليلاً بواسطة الرافعات الهيدروليكية
  {
    id: "proj-hoarding-night-cranes-installation-video",
    slug: "project-hoarding-night-cranes-installation-video",
    category: "hoarding",
    type: "video",
    src: "/assets/videos/portfolio/saudi-project-hoarding-fence-night-cranes-installation-himam-ghaim.mp4",
    poster: "/assets/images/portfolio/saudi-project-hoarding-fence-night-cranes-installation-poster-himam-ghaim.webp",
    title: {
      ar: "فيديو: تركيب لوحات وتسوير مشاريع إنشائية ليلاً بواسطة الرافعات الهيدروليكية",
      en: "Video: Nighttime Hoarding Installation with Dual Hydraulic Cranes",
      ur: "ویڈیو: رات کے وقت ہائیڈرولک کرینوں کے ذریعے پراجیکٹ ہورڈنگ کی تنصیب"
    },
    summary: {
      ar: "فيديو ميداني مباشر يوثق دقة وسرعة تركيب اللوحات والأسوار الإنشائية ليلاً",
      en: "Live on-site field video documenting rapid nighttime hoarding panel installation with dual cherry pickers.",
      ur: "رات کے وقت کرینوں کی مدد سے ہورڈنگ بورڈز کی تنصیب کی لائیو ویڈیو۔"
    },
    description: {
      ar: "فيديو ميداني واقعي يوضح احترافية وسرعة فريق شركة همم غيم في تركيب اللوحات الدعائية وأسوار المشاريع الإنشائية ليلاً، باستخدام رافعتين هيدروليكيتين متزامنتين مع تطبيق كافة معايير السلامة المرورية والمهنية لضمان دقة الشد والاستواء.",
      en: "Live field video showcasing Himam Ghaim crews installing mega billboard panels and hoarding fences overnight using synchronized dual hydraulic cherry pickers with full traffic safety measures and flawless tensioning.",
      ur: "ہمم غیم کی ماہر ٹیم کے ذریعے رات کے وقت دو جدید ہائیڈرولک کرینوں کے ساتھ پراجیکٹ ہورڈنگ کی تیز رفتار اور محفوظ تنصیب کی حقیقی ویڈیو۔"
    },
    alt: {
      ar: "فيديو تركيب أسوار مشاريع برافعات هيدروليكية بالرياض | فيديو تسوير مشاريع إنشائية ليلاً بالسعودية | هوردينج مواقع برافعات | Night Cranes Hoarding Installation Video Riyadh | Hydraulic Cherry Picker Site Fencing KSA",
      en: "Night Cranes Hoarding Installation Video Riyadh | Hydraulic Cherry Picker Site Fencing KSA | فيديو تركيب أسوار مشاريع برافعات هيدروليكية بالرياض",
      ur: "فيديو تركيب أسوار مشاريع برافعات هيدروليكية بالرياض | Night Cranes Hoarding Video"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "تنفيذ ليلي سريع", en: "Rapid Overnight Execution", ur: "تیز رفتار نائٹ ورک" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#فيديو_تسوير_مشاريع", "#رافعات_هيدروليكية", "#تركيب_ليلي", "#هوردينج_الرياض", "#همم_غيم_الميدانية"],
    featured: true,
    specs: {
      ar: [
        "استخدام رافعات هيدروليكية معتمدة مع طاقم فني مدرب",
        "إجراءات سلامة مرورية وأقماع عاكسة وإشارات تحذيرية",
        "شد وتثبيت احترافي يمنع الارتخاء مهما اشتدت الرياح",
        "إنجاز الأعمال في أوقات الهدوء المروري لتفادي الازدحام"
      ],
      en: [
        "Certified boom lifts with trained technical personnel",
        "Full road safety measures with reflective traffic cones & warning lights",
        "High-tension mechanical fastening resistant to extreme winds",
        "Overnight operation avoiding city traffic disruptions"
      ],
      ur: [
        "تربیت یافتہ عملے کے ساتھ سرٹیفائیڈ ہائیڈرولک کرینز",
        "روڈ سیفٹی کے تمام انتظامات بمعہ ریفلیکٹو کونز",
        "تیز ہواؤں میں بھی ڈھیلا نہ ہونے والا پائیدار بینر اسٹرکچر",
        "شہری ٹریفک سے بچنے کے لیے رات کے وقت کام"
      ]
    },
    seoNames: {
      ar: ["فيديو تركيب أسوار مشاريع برافعات هيدروليكية بالرياض", "فيديو تسوير مشاريع إنشائية ليلاً بالسعودية", "هوردينج مواقع برافعات"],
      en: ["Night Cranes Hoarding Installation Video Riyadh", "Hydraulic Cherry Picker Site Fencing KSA", "Overnight Billboard Hoarding Video"]
    }
  },

  // 12. فيديو: جولة ميدانية على سور إنشائي متصل بطول مئات الأمتار بألواح البليوت الأسود
  {
    id: "proj-hoarding-highway-continuous-plywood-video",
    slug: "project-hoarding-highway-continuous-plywood-video",
    category: "hoarding",
    type: "video",
    src: "/assets/videos/portfolio/saudi-project-hoarding-fence-highway-continuous-plywood-himam-ghaim.mp4",
    poster: "/assets/images/portfolio/saudi-project-hoarding-fence-highway-continuous-plywood-poster-himam-ghaim.webp",
    title: {
      ar: "فيديو: جولة ميدانية على سور إنشائي متصل بطول مئات الأمتار بألواح البليوت الأسود",
      en: "Video: Highway Plywood Construction Hoarding Wall Field Tour",
      ur: "ویڈیو: ہائی وے پر سینکڑوں میٹر طویل بلیک پلائی ووڈ فینسنگ کا فیلڈ ٹور"
    },
    summary: {
      ar: "جولة بالفيديو على امتداد مئات الأمتار لسور إنشائي محكم الإغلاق ومطابق للبلدية",
      en: "Drive-by video tour along a massive continuous plywood site hoarding perimeter wall.",
      ur: "سینکڑوں میٹر طویل مضبوط اور بلدیاتی معیار کے عین مطابق فینسنگ کا ویڈیو ٹور۔"
    },
    description: {
      ar: "فيديو لجولة بالسيارة يوثق امتداد سور موقع إنشائي ضخم يمتد لمئات الأمتار على طريق مفتوح، منفذ بالكامل بألواح البليوت الأسود المقاوم للرطوبة والأتربة مع خطوط استواء دقيقة تعكس حرفية التنفيذ الإنشائي لشركة همم غيم.",
      en: "Continuous drive-by inspection video showcasing a vast perimeter hoarding fence stretching for hundreds of meters along an open thoroughfare in Saudi Arabia. Built with premium film-faced black plywood with laser-straight alignment.",
      ur: "سعودی عرب میں ہائی وے پر سینکڑوں میٹر طویل واٹر پروف بلیک پلائی ووڈ باؤنڈری وال کا مکمل ویڈیو جائزہ جو ہمم غیم کی اعلٰی مہارت کو ظاہر کرتا ہے۔"
    },
    alt: {
      ar: "فيديو تسوير موقع إنشائي ممتد بالرياض | جولة فيديو على سور مشروع بليوت أسود | أسوار مشاريع إنشائية متصلة بالسعودية | Highway Plywood Hoarding Video Tour Riyadh | Continuous Construction Fencing KSA",
      en: "Highway Plywood Hoarding Video Tour Riyadh | Continuous Construction Fencing KSA | فيديو تسوير موقع إنشائي ممتد بالرياض",
      ur: "فيديو تسوير موقع إنشائي ممتد بالرياض | Plywood Hoarding Video Tour"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "تنفيذ مشاريع كبرى", en: "Mega Scale Execution", ur: "بڑے پراجیکٹس کی تکمیل" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#فيديو_تسوير", "#سور_بليوت", "#تسوير_طرق_سريعة", "#مشاريع_كبرى_الرياض", "#همم_غيم"],
    featured: true,
    specs: {
      ar: ["امتداد متصل لمئات الأمتار بدون أي فجوات", "ألواح بليوت معالجة ضد الرطوبة وعوامل التعرية", "حماية كاملة للموقع وحركة السير المحيطة"],
      en: ["Seamless multi-hundred meter continuous perimeter", "Weatherproof marine film-faced plywood sheets", "Total site containment and public traffic protection"],
      ur: ["سینکڑوں میٹر طویل بلا تعطل فینسنگ", "موسمی اثرات سے محفوظ واٹر پروف پلائی ووڈ", "عوامی ٹریفک اور سائٹ کا مکمل تحفظ"]
    },
    seoNames: {
      ar: ["فيديو تسوير موقع إنشائي ممتد بالرياض", "جولة فيديو على سور مشروع بليوت أسود", "أسوار مشاريع إنشائية متصلة بالسعودية"],
      en: ["Highway Plywood Hoarding Video Tour Riyadh", "Continuous Construction Fencing KSA", "Long Span Site Boundary Video"]
    }
  },

  // 13. فيديو: تسوير موقع إنشائي بنقوش هندسية وإضاءة ليلية ممتدة
  {
    id: "proj-hoarding-night-illuminated-pattern-video",
    slug: "project-hoarding-night-illuminated-pattern-video",
    category: "hoarding",
    type: "video",
    src: "/assets/videos/portfolio/saudi-project-hoarding-fence-night-illuminated-pattern-himam-ghaim.mp4",
    poster: "/assets/images/portfolio/saudi-project-hoarding-fence-night-illuminated-pattern-poster-himam-ghaim.webp",
    title: {
      ar: "فيديو: تسوير موقع إنشائي بنقوش هندسية وإضاءة ليلية ممتدة",
      en: "Video: Nighttime Geometric Pattern Construction Site Hoarding",
      ur: "ویڈیو: ہندسی ڈیزائن اور رات کی شاندار لائٹنگ والی پراجیکٹ فینسنگ"
    },
    summary: {
      ar: "فيديو ليلي يبرز جمالية النقوش الإسلامية والهندسية وإضاءة السور التسويقي",
      en: "Night video highlighting geometric branded pattern fence with linear illumination.",
      ur: "رات کے وقت خوبصورت ہندسی نقوش اور لائٹنگ پر مشتمل فینسنگ کی ویڈیو۔"
    },
    description: {
      ar: "فيديو ميداني ليلي يستعرض جمال السور الإنشائي التسويقي بنقوشه الهندسية الإسلامية المتصلة مع الإضاءة الليلية الموجهة التي تجعل موقع المشروع معلماً بارزاً ولافتاً للأنظار طوال ساعات المساء.",
      en: "Night-time site walkthrough video showcasing decorative geometric & Islamic pattern hoarding fencing with specialized continuous lighting, turning the construction project into a recognizable nocturnal landmark.",
      ur: "رات کے وقت کی ویڈیو جس میں اسلامی ہندسی ڈیزائن اور خوبصورت لائٹنگ کے ساتھ تیار کردہ پراجیکٹ ہورڈنگ کا شاندار نظارہ دکھایا گیا ہے۔"
    },
    alt: {
      ar: "فيديو تسوير مشاريع بنقوش هندسية وإضاءة ليلية بالرياض | أسوار مشاريع مزخرفة مضيئة بالسعودية | Geometric Pattern Hoarding Video Riyadh | Night Illuminated Fence KSA",
      en: "Geometric Pattern Hoarding Video Riyadh | Night Illuminated Fence KSA | فيديو تسوير مشاريع بنقوش هندسية وإضاءة ليلية بالرياض",
      ur: "فيديو تسوير مشاريع بنقوش هندسية وإضاءة ليلية بالرياض | Pattern Hoarding Video"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "8 - 10 أيام عمل", en: "8 - 10 Working Days", ur: "8 سے 10 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#تسوير_مضيء", "#نقوش_هندسية", "#إضاءة_أسوار", "#هوردينج_ليلي", "#شركة_همم_غيم"],
    featured: true,
    specs: {
      ar: ["نقوش زخرفية هندسية عالية الدقة", "إنارة ليد موجهة بكفاءة طاقة ممتازة", "إبراز بصري يجذب المستثمرين والعملاء في المساء"],
      en: ["High-definition geometric branded patterns", "Energy-efficient targeted LED illumination", "Strong visual draw for evening commuters and investors"],
      ur: ["اعلیٰ کوالٹی جیومیٹرک ڈیزائن", "کم بجلی خرچ کرنے والی شاندار ایل ای ڈی لائٹنگ", "رات کے وقت سرمایہ کاروں کو متوجہ کرنے والا نظارہ"]
    },
    seoNames: {
      ar: ["فيديو تسوير مشاريع بنقوش هندسية وإضاءة ليلية بالرياض", "أسوار مشاريع مزخرفة مضيئة بالسعودية", "هوردينج مواقع فاخر بنقوش ليزر"],
      en: ["Geometric Pattern Hoarding Video Riyadh", "Night Illuminated Fence KSA", "Decorative Perimeter Wall Video"]
    }
  },

  // 14. فيديو: جولة تصويرية شاملة على سور مشروع عملاق مع الإضاءة العلوية والمساحات الخضراء
  {
    id: "proj-hoarding-mega-landscaping-tour-video",
    slug: "project-hoarding-mega-landscaping-tour-video",
    category: "hoarding",
    type: "video",
    src: "/assets/videos/portfolio/saudi-project-hoarding-fence-mega-landscaping-tour-himam-ghaim.mp4",
    poster: "/assets/images/portfolio/saudi-project-hoarding-fence-mega-landscaping-tour-poster-himam-ghaim.webp",
    title: {
      ar: "فيديو: جولة تصويرية شاملة على سور مشروع عملاق مع الإضاءة العلوية والمساحات الخضراء",
      en: "Video: Comprehensive Inspection Tour of Mega Highway Perimeter Hoarding",
      ur: "ویڈیو: بڑے ہائی وے پراجیکٹ کے گرینری اور اسپاٹ لائٹس سے آراستہ سور کا مکمل معائنہ"
    },
    summary: {
      ar: "جولة توثيقية كاملة بطول السور مع الإضاءة العلوية وتنسيق الموقع",
      en: "Comprehensive continuous inspection tour along an illuminated mega project hoarding perimeter.",
      ur: "اوپری اسپاٹ لائٹس اور دیدہ زیب لینڈ اسکیپنگ سے آراستہ بڑے سور کا ویڈیو معائنہ۔"
    },
    description: {
      ar: "توثيق شامل بجولة بالفيديو على امتداد سور مشروع عقاري ضخم على طريق رئيسي بالرياض، يوضح احترافية التشطيب ومحاذاة الألواح وتنسيق الكشافات العلوية وتناغم السور الإنشائي مع البيئة المحيطة بما يخدم أهداف التسويق والبيع على الخارطة.",
      en: "Comprehensive drive-through documentation video along an expansive real estate perimeter hoarding wall in Riyadh. Showcases panel precision, linear spotlight alignment, and cohesive site integration for off-plan marketing success.",
      ur: "ریاض میں آف پلان سیلز اور پروموشن کے لیے تیار کردہ میگا پراجیکٹ ہورڈنگ، فلڈ لائٹس اور صفائی ستھرائی کا مکمل ویڈیو دستاویزی ثبوت۔"
    },
    alt: {
      ar: "فيديو جولة سور مشروع عقاري ضخم بالرياض | هوردينج مشاريع كبرى بيع على الخارطة بالسعودية | Mega Project Perimeter Hoarding Video Tour Riyadh | Off-Plan Real Estate Site Fencing KSA",
      en: "Mega Project Perimeter Hoarding Video Tour Riyadh | Off-Plan Real Estate Site Fencing KSA | فيديو جولة سور مشروع عقاري ضخم بالرياض",
      ur: "فيديو جولة سور مشروع عقاري ضخم بالرياض | Mega Hoarding Video Tour"
    },
    city: { ar: "الرياض", en: "Riyadh", ur: "ریاض" },
    duration: { ar: "14 - 20 يوم عمل", en: "14 - 20 Working Days", ur: "14 سے 20 کام کے دن" },
    warranty: { ar: "ضمان ثبات الهيكل طوال مدة المشروع", en: "Structural Stability Warranty for Project Duration", ur: "منصوبے کی مدت تک وارنٹی" },
    hashtags: ["#فيديو_مشروع_عملاق", "#هوردينج_بيع_على_الخارطة", "#تسوير_تطوير_عقاري", "#مشاريع_الرياض_الكبرى", "#همم_غيم_للمقاولات"],
    featured: true,
    specs: {
      ar: ["امتداد ضخم يتجاوز 500 متر طولي", "إضاءة ليلية بكشافات متناسقة المسافات", "دعم كامل لحملات البيع على الخارطة والتسويق العقاري"],
      en: ["Extensive span exceeding 500 linear meters", "Uniformly spaced overhead nighttime floodlights", "Full support for off-plan sales marketing campaigns"],
      ur: ["500 میٹر سے زائد لمبائی پر محیط باؤنڈری وال", "متوازن فاصلوں پر لگی فلڈ لائٹس", "آف پلان سیلز مارکیٹنگ کے لیے بہترین سپورٹ"]
    },
    seoNames: {
      ar: ["فيديو جولة سور مشروع عقاري ضخم بالرياض", "هوردينج مشاريع كبرى بيع على الخارطة بالسعودية", "تسوير مشاريع تطوير عقاري ضخمة"],
      en: ["Mega Project Perimeter Hoarding Video Tour Riyadh", "Off-Plan Real Estate Site Fencing KSA", "Extensive Highway Development Fence"]
    }
  }
];

// Prepend or merge these projects into portfolio, avoiding duplicate IDs
const existingIds = new Set(db.portfolio.map(p => p.id));
const toAdd = newProjects.filter(p => !existingIds.has(p.id));

console.log(`Adding ${toAdd.length} new hoarding projects to portfolio...`);
db.portfolio = [...toAdd, ...db.portfolio];

// Also update the hoarding service gallery with some of the best new visuals!
const hoardingService = db.services.find(s => s.id === 'hoarding');
if (hoardingService) {
  const newGalleryItems = [
    {
      type: "image",
      src: "/assets/images/portfolio/saudi-project-hoarding-fence-banan-riyadh-tmg-alfursan-himam-ghaim.webp",
      alt: {
        ar: "تسوير مشروع بنان الرياض ضاحية الفرسان (مجموعة طلعت مصطفى TMG)",
        en: "Banan Al Riyadh Mega City Hoarding — TMG Group Al Fursan Suburb"
      }
    },
    {
      type: "image",
      src: "/assets/images/portfolio/saudi-project-hoarding-fence-jadan-life-innovest-himam-ghaim.webp",
      alt: {
        ar: "تسوير مشروع مجمع جدن لايف (Jadan Life) لشركة الوفست العقارية",
        en: "Jadan Life Construction Hoarding & Branded Fence — Innovest KSA"
      }
    },
    {
      type: "image",
      src: "/assets/images/portfolio/saudi-project-hoarding-fence-kayanat-central-towers-vision2030-himam-ghaim.webp",
      alt: {
        ar: "تسوير مشروع أبراج وكيانات تجارية (كيانات سنترال) برؤية 2030",
        en: "Kayanat Central Towers Mega Construction Hoarding — Vision 2030"
      }
    },
    {
      type: "image",
      src: "/assets/images/portfolio/saudi-project-hoarding-fence-calma-luxury-compound-himam-ghaim.webp",
      alt: {
        ar: "تسوير وتجهيز واجهة مشروع مجمع كالما (Calma) العقاري الفاخر",
        en: "Calma Luxury Compound Construction Hoarding with Overhead Spotlights"
      }
    },
    {
      type: "image",
      src: "/assets/images/portfolio/saudi-project-hoarding-fence-diamond-contracting-vision2030-himam-ghaim.webp",
      alt: {
        ar: "تسوير مشروع مجمع تجاري سكني لمؤسسة الاحتراف الماسية بهوية رؤية 2030",
        en: "Commercial & Residential Site Hoarding — Vision 2030 Diamond Contracting"
      }
    },
    {
      type: "video",
      src: "/assets/videos/portfolio/saudi-project-hoarding-fence-night-cranes-installation-himam-ghaim.mp4",
      poster: "/assets/images/portfolio/saudi-project-hoarding-fence-night-cranes-installation-poster-himam-ghaim.webp"
    }
  ];
  hoardingService.gallery = [...newGalleryItems, ...(hoardingService.gallery || [])];
}

// Update stats projects count to 159+
db.settings.stats.projectsCount = `+${db.portfolio.length}`;

// Save to data/db.json and src/data/initial-db.json
const jsonStr = JSON.stringify(db, null, 2);
fs.writeFileSync(DB_PATH, jsonStr, 'utf8');
fs.writeFileSync(INITIAL_DB_PATH, jsonStr, 'utf8');

console.log(`Saved successfully! Total portfolio projects now: ${db.portfolio.length}`);
