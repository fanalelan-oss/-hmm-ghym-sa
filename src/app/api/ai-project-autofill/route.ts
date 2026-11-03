import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDb } from '@/lib/db';

function loadImagePart(imgRef: string): { mimeType: string; data: string } | null {
  if (!imgRef || typeof imgRef !== 'string') return null;

  if (imgRef.startsWith('data:image/')) {
    const match = imgRef.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (match) {
      return { mimeType: match[1], data: match[2] };
    }
    return null;
  }

  if (imgRef.startsWith('/')) {
    let cleanRel = imgRef.replace(/^\/+/, '');
    try {
      cleanRel = decodeURIComponent(cleanRel);
    } catch {}
    // Skip video files for vision inlineData if any
    if (/\.(mp4|webm|mov|m4v)$/i.test(cleanRel)) return null;

    const candidatePaths = [
      path.join(process.cwd(), 'public', cleanRel),
      path.join(process.cwd(), '.next', 'standalone', 'public', cleanRel),
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        const buf = fs.readFileSync(p);
        const ext = path.extname(p).toLowerCase();
        let mimeType = 'image/webp';
        if (ext === '.png') mimeType = 'image/png';
        else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        return { mimeType, data: buf.toString('base64') };
      }
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title = '',
      image = '',
      images = [],
      city = 'الرياض',
      category = '',
    } = body;

    const db = getDb();
    const geminiKey =
      db.settings.aiConfig?.geminiApiKey?.trim() ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    if (!geminiKey) {
      return NextResponse.json(
        { error: 'مفتاح الذكاء الاصطناعي Gemini API غير مفعل في الإعدادات.' },
        { status: 400 }
      );
    }

    // Collect up to 3 images from `images` array or `image` string
    const rawImageList: string[] = Array.isArray(images) && images.length > 0
      ? images
      : image
      ? [image]
      : [];

    const loadedImages = rawImageList
      .map((src) => loadImagePart(src))
      .filter((x): x is { mimeType: string; data: string } => x !== null)
      .slice(0, 3);

    const cleanUserTitle = (title || '').trim();

    const titleDirective = cleanUserTitle
      ? `
⚠️ تعليمات صارمة وملزمة بخصوص عنوان المستخدم:
لقد أدخل المستخدم عنوان العمل التالي بنفسه: "${cleanUserTitle}"
هذا العنوان يحتوي على معلومات حقيقية وملزمة لك بنسبة 100%:
1. نوع العمل الذي نفذناه تحديداً (مثلاً إذا ذكر المستخدم "عمل عامود أسعار" أو "توتيم" أو "لوحة أحرف بارزة" أو "تسوير"، فهذا يعني أن شركتنا نفذت هذا العنصر المحدد وليس المبنى أو المحطة بالكامل إلا إذا نص العنوان على ذلك).
2. اسم العميل أو المنشأة (مثلاً إذا ذكر المستخدم "لمحطة درب الوقود" أو اسم أي كافيه أو شركة، فيجب عليك الالتزام التام باسم العميل "${cleanUserTitle}" كما كتبه المستخدم في العنوان والملخص والوصف والترجمات والهاشتاقات، وممنوع منعاً باتاً تغيير اسم العميل أو استبداله باسم آخر من تخمينك!).
3. ابحث داخل الصورة المرفقة عن العمل المذكور في العنوان تحديداً (مثل عامود الأسعار أو اللوحة المذكورة)، واستخرج من الصورة تفاصيله البصرية والهندسية الدقيقة (مثل: لون الكلادينج، شاشات الأسعار الرقمية LED، الحروف البارزة، الهيكل المعدني، الإضاءة) لصياغة وصف ومواصفات فنية دقيقة جداً تخدم هذا العنوان!
`
      : `
لم يدخل المستخدم عنواناً للمشروع؛ قم بقراءة الصورة واستنتاج عنوان هندسي احترافي يصف العمل الظاهر في الصورة بدقة.
`;

    const systemPrompt = `
أنت مهندس مشاريع خبير في "شركة همم غيم للدعاية والإعلان والمقاولات العامة" في المملكة العربية السعودية.
${titleDirective}

الأقسام المتاحة (category) يجب أن تكون واحداً فقط من القيم الـ 11 التالية:
- "signage": الأحرف البارزة واللوحات الإعلانية وعواميد الأسعار (التوتيم)
- "contracting": واجهات الكلادينج والمقاولات العامة وتكسية المباني والمحطات
- "glass": أعمال الزجاج والواجهات الزجاجية (زجاج سيكوريت 12 ملم، استركشر، سبايدر، قواطع زجاجية، غرف زجاجية)
- "interiors": أعمال الجبس بورد والأسمنت بورد والأسقف المستعارة والإضاءة المخفية والجداريات الجبسية
- "chipboard": تكسيات بديل الشيبورد وبديل الخشب والرخام وخلفيات شاشات التلفزيون والأبواب المخفية (Hidden Doors)
- "shades": المظلات والسواتر والبرجولات والحدادة وأبواب الليزر
- "stickers": الاستيكرات وتغليف السيارات والواجهات الزجاجية (سنفرة / ون واي) والجداريات
- "hoarding": تسوير المشاريع الإنشائية والعقارية (ألواح، بنر، شينكو)
- "exhibitions": تجهيز أجنحة وبوثات المعارض والفعاليات والمؤتمرات وأكشاك المولات
- "safety": الأمن والسلامة وشبكات إطفاء الحريق والرش الآلي وإنذار الحريق
- "cctv": كاميرات المراقبة والأنظمة الأمنية (IP CCTV، أجهزة تسجيل NVR، تمديدات الكاميرات)

قواعد إضافية مهمة:
1. في حقل "titleAr": إذا كتب المستخدم عنواناً ("${cleanUserTitle}")، حافظ على نفس نوع العمل ونفس اسم العميل الذي كتبه المستخدم مع صياغته بشكل هندسي قوي وواضح.
2. في "summaryAr" و"descriptionAr": اذكر صراحةً نوع العمل الذي نفذناه واسم العميل المذكور في العنوان، واشرح تفاصيل تنفيذه الهندسية كما تظهر في الصورة (الخامات، الكلادينج، الإضاءة، الشاشات الرقمية، التثبيت...).
3. قدّر "مدة التنفيذ" (duration) و"الضمان" (warranty) بواقعية تناسب العمل المحدد في العنوان والصورة فقط.
4. استخرج 4 نقاط فنية دقيقة (specs) تصف المواصفات المنفذة في هذا العمل تحديداً.
5. إذا كان العنوان يحتوي على اسم مدينة (مثل الرياض، جدة، الدمام، الخبر، مكة...) استخدمها، وإلا استخدم "${city || 'الرياض'}".

أرجع النتيجة بصيغة JSON خالص فقط بدون أي نص خارجه، يطابق الهيكل التالي تماماً:
{
  "titleAr": "عنوان المشروع بالعربية (ملتزماً بنوع العمل واسم العميل المدخل)",
  "titleEn": "Project Title in English (preserving the exact work type and client name)",
  "titleUr": "اردو میں پروجیکٹ کا عنوان",
  "category": "signage",
  "cityAr": "المدينة بالعربية",
  "cityEn": "City in English",
  "cityUr": "شہر کا نام اردو میں",
  "summaryAr": "ملخص قصير ودقيق من 6 إلى 12 كلمة يوضح العمل المنفذ واسم العميل",
  "summaryEn": "Short accurate summary in English mentioning the executed work and client",
  "summaryUr": "اردو میں مختصر خلاصہ",
  "descriptionAr": "وصف هندسي طبيعي ومفصل (من جملتين إلى 3 جمل) يشرح تفاصيل تنفيذ العمل المذكور في العنوان والخامات والإضاءة الظاهرة في الصورة.",
  "descriptionEn": "Detailed natural engineering description (2-3 sentences) of the specific executed work and materials visible.",
  "descriptionUr": "اردو میں اس پروجیکٹ کی تفصیلی انجینئرنگ وضاحت (2 سے 3 جملے)۔",
  "durationAr": "مثال: 4 - 6 أيام عمل",
  "durationEn": "e.g. 4 - 6 Working Days",
  "durationUr": "مثال: 4 سے 6 کام کے دن",
  "warrantyAr": "مثال: ضمان 5 سنوات على الإضاءة والخامات",
  "warrantyEn": "e.g. 5-Year Warranty on LED & Materials",
  "warrantyUr": "مثال: لائٹنگ اور میٹریل پر 5 سال کی وارنٹی",
  "specsAr": [
    "مواصفة فنية 1 خاصة بالعمل المنفذ",
    "مواصفة فنية 2 خاصة بالعمل المنفذ",
    "مواصفة فنية 3 خاصة بالعمل المنفذ",
    "مواصفة فنية 4 خاصة بالعمل المنفذ"
  ],
  "specsEn": [
    "Specific technical spec 1",
    "Specific technical spec 2",
    "Specific technical spec 3",
    "Specific technical spec 4"
  ],
  "specsUr": [
    "تکنیکی خصوصیت 1",
    "تکنیکی خصوصیت 2",
    "تکنیکی خصوصیت 3",
    "تکنیکی خصوصیت 4"
  ],
  "hashtags": [
    "#وسم_1",
    "#وسم_2",
    "#وسم_3",
    "#وسم_4",
    "#همم_غيم"
  ]
}
`;

    const parts: any[] = [{ text: systemPrompt }];
    for (const img of loadedImages) {
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.data,
        },
      });
    }

    const modelsToTry = [
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-3.1-flash-lite',
      'gemini-3-flash-preview',
    ];
    let parsedResult: any = null;

    for (const model of modelsToTry) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts }],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 4096,
                responseMimeType: 'application/json',
              },
            }),
            signal: AbortSignal.timeout(25000),
          }
        );

        if (res.ok) {
          const geminiData = await res.json();
          const candParts = geminiData?.candidates?.[0]?.content?.parts || [];
          const textParts = candParts
            .filter((p: any) => p.text && !p.thought)
            .map((p: any) => p.text);
          const rawJson = (
            textParts.join('\n').trim() ||
            candParts[candParts.length - 1]?.text ||
            ''
          ).trim();

          if (rawJson) {
            let cleanJson = rawJson
              .replace(/^```json\s*/i, '')
              .replace(/```\s*$/i, '')
              .trim();
            const firstBrace = cleanJson.indexOf('{');
            const lastBrace = cleanJson.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
              cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
            }
            cleanJson = cleanJson.replace(/,\s*([\]}])/g, '$1');
            parsedResult = JSON.parse(cleanJson);
            break;
          }
        } else {
          const errText = await res.text();
          console.error(`AI Autofill model ${model} error (${res.status}):`, errText);
        }
      } catch (err) {
        console.error(`AI Autofill attempt failed on ${model}:`, err);
      }
    }

    if (!parsedResult) {
      return NextResponse.json(
        { error: 'تعذر تحليل الصورة حالياً، يرجى المحاولة مرة أخرى أو تعبئة الحقول يدوياً.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: parsedResult,
    });
  } catch (error: any) {
    console.error('AI project autofill error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء التحليل الذكي للمشروع', details: error?.message },
      { status: 500 }
    );
  }
}
