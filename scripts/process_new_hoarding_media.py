import cv2, os, glob
from PIL import Image

src_folder = 'صور وفيديوهات اعمال همم غيم'
img_dest = 'public/assets/images/portfolio'
vid_dest = 'public/assets/videos/portfolio'

os.makedirs(img_dest, exist_ok=True)
os.makedirs(vid_dest, exist_ok=True)

# 1. Image Mappings
image_mappings = [
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.03.59 PM (1).jpeg',
        'slug': 'saudi-project-hoarding-fence-jadan-life-innovest',
        'title_ar': 'تسوير مشروع جدن لايف (Jadan Life) لشركة الوفست العقارية',
        'title_en': 'Jadan Life Construction Hoarding & Branded Fence — Innovest KSA'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.03.59 PM.jpeg',
        'slug': 'saudi-project-hoarding-fence-diamond-contracting-vision2030',
        'title_ar': 'تسوير مشروع تجاري سكني لمؤسسة الاحتراف الماسية برؤية 2030',
        'title_en': 'Commercial & Residential Site Hoarding — Vision 2030 Diamond Contracting'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.00 PM (1).jpeg',
        'slug': 'saudi-project-hoarding-fence-emar-alqimah-contracting',
        'title_ar': 'تسوير موقع مشروع شركة إعمار القمة للمقاولات العامة',
        'title_en': 'Emar Alqimah Contracting Construction Fence & Hoarding'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.00 PM (2).jpeg',
        'slug': 'saudi-project-hoarding-fence-black-plywood-workers-installation',
        'title_ar': 'تركيب ألواح البليوت الأسود وهيكل التسوير الإنشائي بواسطة فريق العمل',
        'title_en': 'Black Plywood Site Hoarding Installation by Himam Ghaim Construction Team'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.00 PM (3).jpeg',
        'slug': 'saudi-project-hoarding-fence-night-commercial-avenue',
        'title_ar': 'تسوير موقع إنشائي ليلي على طريق رئيسي بألواح البليوت الأسود',
        'title_en': 'Night Construction Hoarding on Major Commercial Avenue'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.00 PM (4).jpeg',
        'slug': 'saudi-project-hoarding-fence-kayanat-central-towers-vision2030',
        'title_ar': 'تسوير مشروع أبراج وكيانات تجارية (كيانات سنترال) برؤية 2030',
        'title_en': 'Kayanat Central Towers Mega Construction Hoarding — Vision 2030'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.00 PM.jpeg',
        'slug': 'saudi-project-hoarding-fence-diamond-contracting-street-view',
        'title_ar': 'واجهة تسوير موقع الاحتراف الماسية للمقاولات من الطريق العام',
        'title_en': 'Street-View Branded Hoarding for Diamond Contracting Site'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.01 PM.jpeg',
        'slug': 'saudi-project-hoarding-fence-kayan-egypt-development',
        'title_ar': 'تسوير موقع مشروع شركة كيان مصر للتطوير الإنشائي',
        'title_en': 'Kayan Egypt Construction Site Branded Fence'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.13 PM.jpeg',
        'slug': 'saudi-project-hoarding-fence-highway-counterweight-structure',
        'title_ar': 'هيكل تسوير إنشائي عملاق مع القواعد الخرسانية المصبوبة على الطريق السريع',
        'title_en': 'Engineered Highway Hoarding with Concrete Counterweight Footings'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.14 PM (1).jpeg',
        'slug': 'saudi-project-hoarding-fence-khawalid-estad-night-illuminated',
        'title_ar': 'جدارية وتسوير معماري مضيء ليلاً لمشروع خوالد واستاد (Khawalid & Estad)',
        'title_en': 'Night Illuminated Architectural Hoarding for Khawalid & Estad Projects'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.14 PM (2).jpeg',
        'slug': 'saudi-project-hoarding-fence-banan-riyadh-tmg-alfursan',
        'title_ar': 'تسوير مشروع بنان الرياض ضاحية الفرسان (مجموعة طلعت مصطفى TMG)',
        'title_en': 'Banan Al Riyadh Mega City Hoarding — TMG Group Al Fursan Suburb'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.14 PM (3).jpeg',
        'slug': 'saudi-project-hoarding-fence-calma-luxury-compound',
        'title_ar': 'تسوير مشروع مجمع كالما (Calma) مع كشافات إضاءة علوية',
        'title_en': 'Calma Luxury Compound Construction Hoarding with Overhead Spotlights'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.14 PM (4).jpeg',
        'slug': 'saudi-project-hoarding-fence-steel-skeleton-concrete-bases',
        'title_ar': 'تصنيع وتركيب الهيكل المعدني الحامل والقواعد الخرسانية لتسوير المشاريع',
        'title_en': 'Heavy Steel Skeleton & Concrete Base Fabrication for Site Fencing'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.14 PM (5).jpeg',
        'slug': 'saudi-project-hoarding-fence-retaining-wall-edge-reinforcement',
        'title_ar': 'هيكل تسوير مدعم على حافة الحفر الإنشائي مع شبكة تثبيت هندسية',
        'title_en': 'Deep Excavation Edge Reinforced Hoarding Wall Structure'
    },
    {
        'file': 'WhatsApp Image 2026-11-03 at 8.04.14 PM.jpeg',
        'slug': 'saudi-project-hoarding-fence-nabni-difference-highway-megawall',
        'title_ar': 'تسوير طريق رئيسي عملاق - نبني لنصنع الفرق مع كود QR وكشافات ليلية',
        'title_en': 'Highway Mega Hoarding Billboard — We Build To Make A Difference QR'
    }
]

print('Converting 15 images to optimized WebP...')
for m in image_mappings:
    src_path = os.path.join(src_folder, m['file'])
    dest_path = os.path.join(img_dest, f"{m['slug']}-himam-ghaim.webp")
    
    with Image.open(src_path) as im:
        # Convert RGB if RGBA/CMYK
        if im.mode in ('RGBA', 'LA', 'P'):
            im = im.convert('RGB')
        im.save(dest_path, 'WEBP', quality=84, method=6)
        orig_kb = os.path.getsize(src_path) / 1024
        new_kb = os.path.getsize(dest_path) / 1024
        print(f"  OK: {m['slug']} ({orig_kb:.1f} KB -> {new_kb:.1f} KB)")

# 2. Video Mappings
video_mappings = [
    {
        'file': 'WhatsApp Video 2026-11-03 at 8.04.51 PM (1).mp4',
        'slug': 'saudi-project-hoarding-fence-night-cranes-installation',
        'title_ar': 'فيديو: تركيب لوحات وتسوير مشاريع إنشائية ليلاً بواسطة الرافعات الهيدروليكية',
        'title_en': 'Video: Nighttime Hoarding Installation with Dual Hydraulic Cranes',
        'frame_ratio': 0.35
    },
    {
        'file': 'WhatsApp Video 2026-11-03 at 8.04.40 PM.mp4',
        'slug': 'saudi-project-hoarding-fence-highway-continuous-plywood',
        'title_ar': 'فيديو: جولة ميدانية على سور إنشائي متصل بطول مئات الأمتار بألواح البليوت الأسود',
        'title_en': 'Video: Highway Plywood Construction Hoarding Wall Field Tour',
        'frame_ratio': 0.25
    },
    {
        'file': 'WhatsApp Video 2026-11-03 at 8.04.39 PM.mp4',
        'slug': 'saudi-project-hoarding-fence-night-illuminated-pattern',
        'title_ar': 'فيديو: تسوير موقع إنشائي بنقوش هندسية وإضاءة ليلية ممتدة',
        'title_en': 'Video: Nighttime Geometric Pattern Construction Site Hoarding',
        'frame_ratio': 0.40
    }
]

print('\nProcessing videos & generating video posters...')
for vm in video_mappings:
    v_src = os.path.join(src_folder, vm['file'])
    v_dest = os.path.join(vid_dest, f"{vm['slug']}-himam-ghaim.mp4")
    poster_dest = os.path.join(img_dest, f"{vm['slug']}-poster-himam-ghaim.webp")
    
    # Copy video
    if not os.path.exists(v_dest):
        with open(v_src, 'rb') as f_in, open(v_dest, 'wb') as f_out:
            f_out.write(f_in.read())
        print(f"  Copied video: {v_dest} ({os.path.getsize(v_dest)/(1024*1024):.2f} MB)")
    else:
        print(f"  Video already exists: {v_dest}")
        
    # Extract frame
    cap = cv2.VideoCapture(v_src)
    count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(count * vm['frame_ratio']))
    ret, frame = cap.read()
    if ret:
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        im = Image.fromarray(rgb)
        im.save(poster_dest, 'WEBP', quality=85)
        print(f"  Generated poster: {poster_dest} ({os.path.getsize(poster_dest)/1024:.1f} KB)")
    cap.release()

print('\nAll media processed successfully!')
