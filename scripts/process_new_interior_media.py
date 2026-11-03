import os
import json
import time
from PIL import Image

MEDIA_DIR = 'صور وفيديوهات اعمال همم غيم'
MANIFEST_PATH = 'scripts/processed_media_manifest.json'
IMG_OUT_DIR = 'public/assets/images/portfolio'
DB_PATH = 'data/db.json'
INITIAL_DB_PATH = 'src/data/initial-db.json'

os.makedirs(IMG_OUT_DIR, exist_ok=True)

with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

# Definition of the 14 new items matching their exact filenames
NEW_ITEMS_CONFIG = [
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.10 PM (1).jpeg",
        "webp_name": "saudi-interior-hidden-door-wood-cladding-himam-ghaim.webp",
        "slug": "modern-interior-wall-cladding-hidden-doors-riyadh",
        "title_ar": "تصميم وتنفيذ تكسيات جدارية خشبية مع أبواب مخفية مودرن",
        "title_en": "Modern Wood Wall Cladding with Integrated Hidden Doors",
        "title_ur": "جدید لکڑی کے وال پینلز اور پوشیدہ دروازوں کی تنصیب",
        "desc_ar": "تنفيذ متقن لتكسيات خشبية بديل الشيبورد للجدران الداخلية مع دمج الأبواب بشكل مخفي ومتجانس يمنح المكان اتساعاً وفخامة معمارية عصرية.",
        "desc_en": "Precision installation of interior wood and chipboard wall paneling with seamlessly integrated flush doors creating spatial harmony.",
        "desc_ur": "جدید ووڈ وال کلیڈنگ کے ساتھ پوشیدہ ہم آہنگ دروازے جو جدید ڈیزائن اور پائیداری پیش کرتے ہیں۔",
        "category": "chipboard-wood-marble-cladding",
        "category_name": "تكسيات بديل الشيبورد والخشب والرخام",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 5 سنوات معتمد",
        "tags": ["تكسيات شيبورد", "أبواب مخفية", "ديكور خشبي", "تشطيبات الرياض", "Interior Wood Cladding"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.10 PM.jpeg",
        "webp_name": "saudi-interior-luxury-flush-doors-paneling-himam-ghaim.webp",
        "slug": "luxury-wooden-doors-corridor-wall-paneling-riyadh",
        "title_ar": "تنفيذ أبواب خشبية مودرن مدمجة مع تكسيات الممرات الداخلية",
        "title_en": "Luxury Wooden Doors Integrated with Corridor Wall Paneling",
        "title_ur": "راہداری کے جدید وال پینلز اور پریمیم لکڑی کے دروازے",
        "desc_ar": "تصميم وتركيب أبواب داخلية خشبية مودرن بتفاصيل خطوط هندسية أنيقة ومقابض متناسقة متصلة بتكسيات الجدران وأرضيات الرخام.",
        "desc_en": "Design and installation of luxury modern interior doors seamlessly flush with decorative corridor paneling and marble flooring.",
        "desc_ur": "خوبصورت ووڈ ڈیزائن کے ساتھ راہداری کے لیے پریمیم دروازے اور پینلنگ۔",
        "category": "interior-design-decor-finishing",
        "category_name": "الديكور الداخلي والتشطيبات والجبس بورد",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 5 سنوات معتمد",
        "tags": ["أبواب خشبية مودرن", "تكسيات ممرات", "ديكور داخلي", "أبواب فخمة", "Interior Doors"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.11 PM (1).jpeg",
        "webp_name": "saudi-interior-modern-tv-wall-ambient-lighting-himam-ghaim.webp",
        "slug": "modern-tv-wall-ambient-lighting-display-shelves-riyadh",
        "title_ar": "تصميم جدار تلفزيون مودرن مع رفوف ديكورية وإضاءة LED مخفية",
        "title_en": "Modern TV Wall Design with Ambient LED & Display Shelves",
        "title_ur": "جدید ٹی وی وال ڈیکوریشن مع ایمبیئنٹ لائٹس اور شیلفس",
        "desc_ar": "تنفيذ جدار شاشة تلفزيون فخم بتكسيات متناسقة بديل الشيبورد، مع رفوف ديكورية طولية مضاءة وخزانة تلفزيون معلقة بإضاءة محيطية.",
        "desc_en": "Custom modern TV wall unit built with chipboard paneling, integrated vertical display niches, floating credenza and warm LED backlighting.",
        "desc_ur": "جدید ٹی وی وال مع دلکش شیلفس اور فلوٹنگ کیبنٹ۔",
        "category": "chipboard-wood-marble-cladding",
        "category_name": "تكسيات بديل الشيبورد والخشب والرخام",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 3 سنوات معتمد",
        "tags": ["جدار تلفزيون", "بديل الشيبورد", "إضاءة مخفية", "ديكور صالة", "Modern TV Wall"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.11 PM.jpeg",
        "webp_name": "saudi-interior-fluted-wood-slats-tv-console-himam-ghaim.webp",
        "slug": "fluted-wood-slats-tv-console-tower-shelving-jeddah",
        "title_ar": "خلفية تلفزيون بديل الخشب مع شيبورد ووحدة أرفف رأسية",
        "title_en": "Fluted Wood Slat TV Backdrop with Vertical Display Tower",
        "title_ur": "ووڈ سلیٹس ٹی وی بیک ڈراپ اور ورٹیکل ٹاور ڈسپلے",
        "desc_ar": "تركيب جدارية شاشة تجمع بين شرائح بديل الخشب الطولية ولوح الشيبورد العريض المضاء، مع وحدة أدراج خشبية معلقة وبرج أرفف جانبي.",
        "desc_en": "Fluted wood slat accent panel paired with a floating illuminated TV board, warm walnut lower console, and open display tower.",
        "desc_ur": "ووڈ سلیٹس اور پینلنگ کے ساتھ خوبصورت ٹی وی بیک گراؤنڈ۔",
        "category": "chipboard-wood-marble-cladding",
        "category_name": "تكسيات بديل الشيبورد والخشب والرخام",
        "city": "جدة",
        "city_en": "Jeddah",
        "city_ur": "جدہ",
        "warranty": "ضمان 3 سنوات معتمد",
        "tags": ["بديل خشب", "شرائح خشبية", "طاولة تلفزيون معلقة", "ديكور جدة", "Fluted Wood Panel"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.13 PM (1).jpeg",
        "webp_name": "saudi-interior-geometric-groove-tv-wall-unit-himam-ghaim.webp",
        "slug": "geometric-groove-tv-wall-unit-illuminated-niches-riyadh",
        "title_ar": "ديكور جدار شاشة بتفريغات هندسية وأرفف عرض مضيئة",
        "title_en": "Geometric Grooved TV Wall Unit with Illuminated Display Niches",
        "title_ur": "جیومیٹرک گرووز ٹی وی یونٹ مع روشن ڈسپلے شیلفس",
        "desc_ar": "تصميم عصري لجدار الصالة يتضمن تفريغات وخطوط هندسية مبتكرة، شريحة بديل الخشب الطولية، أرفف عرض مدمجة مع إضاءة LED مريحة للعين.",
        "desc_en": "Striking TV feature wall featuring clean geometric grooves, vertical fluted paneling, backlit display niches, and a floating base cabinet.",
        "desc_ur": "جدید جیومیٹرک پیٹرن اور لائٹنگ کے ساتھ ٹی وی وال ڈیزائن۔",
        "category": "chipboard-wood-marble-cladding",
        "category_name": "تكسيات بديل الشيبورد والخشب والرخام",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 3 سنوات معتمد",
        "tags": ["ديكور هندسي", "شاشات تلفزيون", "شيبورد الرياض", "رفوف مضيئة", "Wall Paneling"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.13 PM (2).jpeg",
        "webp_name": "saudi-interior-backlit-stone-columns-wall-decor-himam-ghaim.webp",
        "slug": "luxury-wall-decor-backlit-stone-columns-chipboard-riyadh",
        "title_ar": "جدارية ديكورية فاخرة تجمع بين الحجر المضيء وتكسيات الشيبورد",
        "title_en": "Luxury Wall Decor Combining Backlit Stone Columns & Chipboard",
        "title_ur": "روشن پتھر کے ستونوں اور چپ بورڈ کے ساتھ پرتعیش وال ڈیکور",
        "desc_ar": "ابتكار هندسي راقٍ يدمج أعمدة حجر بديل الصخور الطبيعية ذات الإضاءة الكهرمانية الدافئة مع أسطح شيبورد محايدة ورفوف خشبية عائمة.",
        "desc_en": "Innovative architectural feature wall pairing illuminated raw rock texture columns with clean chipboard panels and natural wood floating shelves.",
        "desc_ur": "قدرتی پتھر کے اثرات اور لکڑی کے شیلفس کے ساتھ شاہکار ڈیزائن۔",
        "category": "interior-design-decor-finishing",
        "category_name": "الديكور الداخلي والتشطيبات والجبس بورد",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 5 سنوات معتمد",
        "tags": ["حجر مضيء", "بديل الصخر", "تكسيات جدارية", "ديكورات فاخرة", "Backlit Stone Wall"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.13 PM (3).jpeg",
        "webp_name": "saudi-interior-entryway-floating-console-backlit-mirror-himam-ghaim.webp",
        "slug": "entryway-floating-console-backlit-mirror-wood-slats-riyadh",
        "title_ar": "كنسول مدخل معلق مع مرآة مقوسة بإضاءة خلفية وتكسيات خشبية",
        "title_en": "Entryway Floating Vanity Console with Backlit Mirror & Slat Paneling",
        "title_ur": "داخلی کونسول مع روشن آئینہ اور لکڑی کی پینلنگ",
        "desc_ar": "تنفيذ كنسول مدخل فخم بدرج خشب جوزي معلق، جدارية بتكسيات خشبية محفورة، ومرآة كاملة بإضاءة هالو LED مخفية وسبوت لايت علوي.",
        "desc_en": "Sophisticated foyer vanity console featuring a walnut floating drawer, fluted acoustic paneling, and an oversized LED halo-backlit mirror.",
        "desc_ur": "داخلی راستے کے لیے خوبصورت لکڑی کا کونسول اور ایل ای ڈی آئینہ۔",
        "category": "interior-design-decor-finishing",
        "category_name": "الديكور الداخلي والتشطيبات والجبس بورد",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 3 سنوات معتمد",
        "tags": ["كنسول مدخل", "مرايا مضيئة", "ديكور مداخل", "مغاسل ديكورية", "Entryway Vanity"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.13 PM (4).jpeg",
        "webp_name": "saudi-interior-raw-stone-illuminated-living-room-himam-ghaim.webp",
        "slug": "living-room-backlit-stone-pillars-floating-console-khobar",
        "title_ar": "جدارية صالة مميزة بأعمدة حجر طبيعي مضاء مع خزانة معلقة",
        "title_en": "Living Room Feature Wall with Backlit Natural Stone Accent Pillars",
        "title_ur": "زندہ کمرے کے لیے قدرتی پتھر کے روشن ستون اور فلوٹنگ کیبنٹ",
        "desc_ar": "تصميم استثنائي لصالة رئيسية يعتمد على برجي حجر طبيعي مضاء بإضاءة ذهبية دافئة تحيط بألواح الجدار المعلقة وخزانة تخزين عائمة بيضاء.",
        "desc_en": "Exceptional living room backdrop featuring dual glowing stone accent pillars framing minimalist flat panels and a floating low credenza.",
        "desc_ur": "لاؤنج کے لیے شاندار پتھر کی ساخت اور ایل ای ڈی لائٹس۔",
        "category": "interior-design-decor-finishing",
        "category_name": "الديكور الداخلي والتشطيبات والجبس بورد",
        "city": "الخبر",
        "city_en": "Khobar",
        "city_ur": "الخبر",
        "warranty": "ضمان 5 سنوات معتمد",
        "tags": ["حجر طبيعي مضيء", "جداريات صالات", "ديكور الخبر", "بديل الحجر", "Stone Feature Wall"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.13 PM.jpeg",
        "webp_name": "saudi-interior-luxury-entrance-tall-mirror-wood-slats-himam-ghaim.webp",
        "slug": "luxury-villa-entrance-tall-backlit-mirror-wood-slats-riyadh",
        "title_ar": "ديكور مدخل فيلا فاخر مع مرايا جدارية كاملة وشرائح خشبية مضيئة",
        "title_en": "Luxury Villa Entrance with Full-Height Backlit Mirror & Wood Slats",
        "title_ur": "ولا داخلہ ڈیکور مع مکمل اونچائی آئینہ اور لکڑی کے سلیٹس",
        "desc_ar": "تنفيذ واجهة استقبال ومدخل رئيسي تشمل شرائح بديل الخشب الطولية المضاءة بـ LED، مرآة كاملة الارتفاع، ورف رخامي/خشبي معلق.",
        "desc_en": "Stunning villa entrance console composition with warm fluted timber slats, a full-height backlit mirror, and a floating presentation shelf.",
        "desc_ur": "ولا کے لیے شاندار داخلی پینلنگ اور وال ڈیزائن۔",
        "category": "interior-design-decor-finishing",
        "category_name": "الديكور الداخلي والتشطيبات والجبس بورد",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 3 سنوات معتمد",
        "tags": ["مدخل فيلا", "مرايا جدارية", "شرائح خشبية", "ديكور الرياض", "Villa Entrance"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.14 PM (1).jpeg",
        "webp_name": "saudi-interior-minimalist-tv-backdrop-gold-niches-himam-ghaim.webp",
        "slug": "minimalist-tv-backdrop-gold-sculptural-niches-riyadh",
        "title_ar": "ديكور شاشة أنيق بإطار مضيء ووحدة نيشات عمودية للتحف",
        "title_en": "Minimalist Floating TV Board with Concealed LED & Vertical Display Niches",
        "title_ur": "سونہری نچس اور ایل ای ڈی لائٹنگ کے ساتھ ٹی وی وال",
        "desc_ar": "تصميم جدار تلفزيون راقٍ يبرز بورد الشاشة بإضاءة محيطية دافئة ناعمة، متصلاً ببرج نيشات رأسية مضاءة مخصصة لعرض التحف والمقتنيات.",
        "desc_en": "Ultra-clean TV panel with concealed LED perimeter glow, fluted side accents, and a built-in vertical shelving tower with warm showcase niches.",
        "desc_ur": "جدید ٹی وی وال اور تحائف کے لیے روشن نچس۔",
        "category": "chipboard-wood-marble-cladding",
        "category_name": "تكسيات بديل الشيبورد والخشب والرخام",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 3 سنوات معتمد",
        "tags": ["نيشات مضيئة", "بورد شاشة", "إضاءة هالو", "ديكور مودرن", "Illuminated Niches"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.14 PM (2).jpeg",
        "webp_name": "saudi-interior-walnut-wood-panels-modern-living-himam-ghaim.webp",
        "slug": "luxury-walnut-wood-wall-paneling-modern-living-riyadh",
        "title_ar": "تكسيات خشب جوزي فخمة لصالة الجلوس مع طاولة تلفزيون معلقة",
        "title_en": "Luxury Walnut Wood Wall Paneling for Modern Living Room",
        "title_ur": "اخروٹ کی لکڑی کے وال پینلز اور ٹی وی کنسول",
        "desc_ar": "تنفيذ تكسيات جدران من خشب الجوز الفاخر مع خطوط طولية بارزة، دمج شاشة التلفزيون في لوح مركزي مضاء، وطاولة تلفزيون خشبية عائمة.",
        "desc_en": "Refined walnut wood wall cladding framing a central illuminated panel, floating low-profile media cabinet, and open decorative shelves.",
        "desc_ur": "پریمیم ووڈ فنشنگ کے ساتھ پرتعیش لاؤنج وال ڈیزائن۔",
        "category": "chipboard-wood-marble-cladding",
        "category_name": "تكسيات بديل الشيبورد والخشب والرخام",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 5 سنوات معتمد",
        "tags": ["خشب جوز", "تكسيات صالة", "طاولة تلفزيون", "ديكورات خشبية", "Walnut Cladding"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.14 PM (3).jpeg",
        "webp_name": "saudi-interior-luxury-powder-room-twin-arched-mirrors-himam-ghaim.webp",
        "slug": "luxury-powder-room-twin-backlit-arched-mirrors-riyadh",
        "title_ar": "تشطيب مغاسل ضيوف فاخرة بمرايا مقوسة مضيئة وجدران ديكورية",
        "title_en": "Luxury Powder Room with Twin Backlit Arched Mirrors & Fluted Paneling",
        "title_ur": "پرتعیش پاؤڈر روم مع دو محرابی روشن آئینے اور ماربل سنک",
        "desc_ar": "تنفيذ ديكور مغاسل ضيوف فندقية فاخرة بمرايا مقوسة بإضاءة خلفية دافئة، جدار ديكوري بملمس جبسي محبب، وحوض رخامي رمادي مزدوج معلق.",
        "desc_en": "Bespoke luxury powder room featuring twin illuminated arched mirrors, textured plaster feature wall, fluted timber accents, and floating double marble basin.",
        "desc_ur": "مہمانوں کے باتھ روم کے لیے خوبصورت ڈیزائن اور ماربل سنک۔",
        "category": "interior-design-decor-finishing",
        "category_name": "الديكور الداخلي والتشطيبات والجبس بورد",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 3 سنوات معتمد",
        "tags": ["مغاسل ضيوف", "مرايا مقوسة", "تشطيبات فندقية", "ديكور رخامي", "Luxury Powder Room"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.14 PM.jpeg",
        "webp_name": "saudi-pergola-garden-lawn-architectural-lighting-himam-ghaim.webp",
        "slug": "modern-wooden-garden-pergola-architectural-lighting-riyadh",
        "title_ar": "تصميم وتنفيذ برجولة خشبية وحديقة فيلا مع إضاءة جدارية ساحرة",
        "title_en": "Modern Wooden Garden Pergola with Architectural Perimeter Wall Lighting",
        "title_ur": "جدید لکڑی کا پرگولا اور وال لائٹنگ کے ساتھ ولا گارڈن",
        "desc_ar": "تنفيذ جلسة حديقة خارجية فخمة تشمل برجولة خشبية مودرن، عشب صناعي عالي الكثافة، وتكسيات جدارية مزودة بإضاءة معمارية رأسية Up/Down.",
        "desc_en": "Villa outdoor living space design featuring a contemporary timber pergola, lush artificial lawn, perimeter wall cladding, and architectural up/down lights.",
        "desc_ur": "ولا کے لیے خوبصورت لکڑی کا شیڈ، لان اور جدید لائٹنگ۔",
        "category": "car-shades-pergolas-screens",
        "category_name": "المظلات والسواتر والبرجولات الحديثة",
        "city": "الرياض",
        "city_en": "Riyadh",
        "city_ur": "ریاض",
        "warranty": "ضمان 10 سنوات معتمد",
        "tags": ["برجولات خشبية", "مظلات حدائق", "إضاءة جدارية", "تنسيق حدائق", "Garden Pergola"]
    },
    {
        "src_filename": "WhatsApp Image 2026-11-03 at 8.30.15 PM.jpeg",
        "webp_name": "saudi-interior-contemporary-linear-grid-tv-unit-himam-ghaim.webp",
        "slug": "contemporary-linear-grid-tv-wall-unit-dammam",
        "title_ar": "خلفية شاشة مودرن بتصميم خطوط هندسية متناسقة وإضاءة محيطية",
        "title_en": "Contemporary Linear Grid TV Wall Unit with Ambient Lighting",
        "title_ur": "جدید لکیری گرڈ ٹی وی وال یونٹ مع ایمبیئنٹ لائٹس",
        "desc_ar": "تركيب جدارية شاشة تلفزيون عصرية بتقسيمات خطية سوداء أنيقة مع بورد رخامي مضاء، وحدة تخزين سفلية معلقة، وتنسيق متناغم مع سقف الجبس بورد.",
        "desc_en": "Sleek TV feature wall framed by clean black geometric grid lines, central backlit panel, floating under-cabinet, and coordinated ceiling cove lighting.",
        "desc_ur": "خوبصورت بلیک گرڈ اور چھت کی لائٹنگ کے ساتھ ٹی وی وال۔",
        "category": "chipboard-wood-marble-cladding",
        "category_name": "تكسيات بديل الشيبورد والخشب والرخام",
        "city": "الدمام",
        "city_en": "Dammam",
        "city_ur": "دمام",
        "warranty": "ضمان 3 سنوات معتمد",
        "tags": ["ديكور خطوط هندسية", "خلفية شاشة", "ديكور الدمام", "جبس بورد", "Contemporary TV Unit"]
    }
]

print("=== Starting 14 New Interior & Pergola Media Processing ===")

# Step 1: Compress & save WebP
for item in NEW_ITEMS_CONFIG:
    src_p = os.path.join(MEDIA_DIR, item["src_filename"])
    dst_p = os.path.join(IMG_OUT_DIR, item["webp_name"])
    
    im = Image.open(src_p)
    if im.mode in ("RGBA", "P"):
        im = im.convert("RGB")
        
    orig_w, orig_h = im.size
    # Maximum dimension 1600px
    max_d = 1600
    if orig_w > max_d or orig_h > max_d:
        scale = max_d / max(orig_w, orig_h)
        im = im.resize((int(orig_w * scale), int(orig_h * scale)), Image.Resampling.LANCZOS)
        
    im.save(dst_p, "WEBP", quality=88, method=6)
    orig_kb = os.path.getsize(src_p) / 1024
    webp_kb = os.path.getsize(dst_p) / 1024
    print(f"Compressed {item['src_filename']} ({orig_kb:.1f} KB) -> {item['webp_name']} ({webp_kb:.1f} KB, -{(1 - webp_kb/orig_kb)*100:.1f}%)")
    
    # Record in manifest
    manifest[item["src_filename"]] = {
        "processed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "original_size": os.path.getsize(src_p),
        "target_webp": item["webp_name"],
        "slug": item["slug"]
    }

# Save updated manifest
with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)
print("Updated processed_media_manifest.json with all new files.")

# Step 2: Add to data/db.json and src/data/initial-db.json
for db_file in [DB_PATH, INITIAL_DB_PATH]:
    with open(db_file, 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    existing_slugs = {p.get("slug") for p in db.get("portfolio", [])}
    existing_ids = [int(p["id"].replace("proj-", "")) for p in db.get("portfolio", []) if p.get("id", "").startswith("proj-") and p["id"].replace("proj-", "").isdigit()]
    next_id_num = max(existing_ids) + 1 if existing_ids else 160
    
    added_count = 0
    for item in NEW_ITEMS_CONFIG:
        if item["slug"] in existing_slugs:
            print(f"Skipping already existing project slug: {item['slug']}")
            continue
            
        proj_id = f"proj-{next_id_num}"
        next_id_num += 1
        
        new_proj = {
            "id": proj_id,
            "title": {
                "ar": item["title_ar"],
                "en": item["title_en"],
                "ur": item["title_ur"]
            },
            "description": {
                "ar": item["desc_ar"],
                "en": item["desc_en"],
                "ur": item["desc_ur"]
            },
            "category": item["category"],
            "categoryName": {
                "ar": item["category_name"],
                "en": item["category_name"],
                "ur": item["category_name"]
            },
            "image": f"/assets/images/portfolio/{item['webp_name']}",
            "src": f"/assets/images/portfolio/{item['webp_name']}",
            "slug": item["slug"],
            "type": "image",
            "featured": False,
            "tags": item["tags"],
            "city": {
                "ar": item["city"],
                "en": item["city_en"],
                "ur": item["city_ur"]
            },
            "warranty": {
                "ar": item["warranty"],
                "en": item["warranty"].replace("ضمان", "Warranty").replace("معتمد", "Certified"),
                "ur": item["warranty"]
            },
            "alt": {
                "ar": f"{item['title_ar']} في {item['city']} - شركة همم غيم",
                "en": f"{item['title_en']} in {item['city_en']} - Himam Ghaim Company",
                "ur": f"{item['title_ur']} {item['city_ur']} - ہمم غیم"
            }
        }
        
        db["portfolio"].append(new_proj)
        added_count += 1
        
    # Update settings stats if needed
    if "settings" in db and "stats" in db["settings"]:
        total_projects = len(db["portfolio"])
        db["settings"]["stats"]["projectsCount"] = f"+{total_projects}"
        
    with open(db_file, 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
        
    print(f"Updated {db_file}: added {added_count} projects (Total: {len(db['portfolio'])})")

print("=== ALL 14 NEW PROJECTS PROCESSED SUCCESSFULLY ===")
