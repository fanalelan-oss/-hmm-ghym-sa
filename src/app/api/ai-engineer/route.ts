import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { Lang } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message: string = (body.message || '').trim();
    const lang: Lang = body.lang || 'ar';
    const db = getDb();

    if (!message) {
      return NextResponse.json({ error: 'Empty message' }, { status: 400 });
    }

    const msgLower = message.toLowerCase();

    // 1. Check learned Q&A first (highest priority — admin-taught knowledge!)
    const learnedMatch = (db.knowledgeBase.learnedQA || []).find(
      (qa) =>
        msgLower.includes(qa.question.toLowerCase()) ||
        qa.question.toLowerCase().includes(msgLower)
    );

    // 2. Match Knowledge Base Rules
    const matchedRules = (db.knowledgeBase.rules || []).filter((rule) =>
      rule.keywords.some((kw) => msgLower.includes(kw.toLowerCase()))
    );

    // 3. Match relevant Services
    const matchedServices = db.services.filter((srv) => {
      const textBlob = [
        srv.name.ar,
        srv.name.en,
        srv.name.ur,
        srv.description.ar,
        srv.tagline.ar,
        ...(srv.hashtags || []),
      ]
        .join(' ')
        .toLowerCase();
      return (
        msgLower.split(/\s+/).some((w) => w.length > 2 && textBlob.includes(w)) ||
        (srv.id === 'signage' && /لوح|حرف|أحرف|كلادينج|واجهة|sign|letter|cladding/.test(msgLower)) ||
        (srv.id === 'shades' && /مظل|ساتر|سواتر|برجول|موقف|shade|pergola/.test(msgLower)) ||
        (srv.id === 'exhibitions' && /معرض|معارض|جناح|بوث|فعاليات|booth|exhibition/.test(msgLower)) ||
        (srv.id === 'hoarding' && /تسوير|سور|نيوجيرسي|حواجز|hoarding|fence/.test(msgLower)) ||
        (srv.id === 'stickers' && /استيكر|ستيكر|تغليف|سيار|شاحن|سنفرة|sticker|wrap/.test(msgLower)) ||
        (srv.id === 'interiors' && /ديكور|تشطيب|جبس|مجلس|تلفزيون|خشب|رخام|interior/.test(msgLower)) ||
        (srv.id === 'contracting' && /مقاول|بناء|ترميم|زجاج|سيكوريت|قواطع|هنجر|contracting|glass/.test(msgLower)) ||
        (srv.id === 'safety' && /كامير|أمن|سلام|حريق|اطفاء|إطفاء|رشاش|طفاي|cctv|safety/.test(msgLower))
      );
    });

    // 4. Find matching executed portfolio projects to showcase visually!
    const targetCategory = matchedServices[0]?.id;
    const relatedProjects = db.portfolio
      .filter((p) => {
        if (
          msgLower.split(/\s+/).some((w) => w.length > 3 && p.title.ar.toLowerCase().includes(w))
        ) {
          return true;
        }
        return targetCategory ? p.category === targetCategory : p.featured;
      })
      .slice(0, 3);

    // 5. Check if user is asking for price / cost / dimensions calculation
    const numbersInMsg = message.match(/\d+(\.\d+)?/g)?.map(Number) || [];
    let estimateNote = '';
    if (numbersInMsg.length > 0 && /متر|مقاس|سعر|تكلف|كم|عرض|طول|meter|price|cost/.test(msgLower)) {
      const val = numbersInMsg[0];
      if (targetCategory === 'signage') {
        const min = Math.round(val * 450);
        const max = Math.round(val * 850);
        estimateNote =
          lang === 'en'
            ? `\n\n📐 **Preliminary Engineering Estimate:** For a ${val}m sign/facade, estimated investment ranges between **${min.toLocaleString()} - ${max.toLocaleString()} SAR** depending on 3D letter type (Front-lit / Halo / Stainless 304) and ACP cladding spec.`
            : `\n\n📐 **تقدير هندسي مبدئي من المهندس همم:** لمقاس (${val} متر)، تتراوح التكلفة التقديرية للأحرف البارزة/الواجهة بين **${min.toLocaleString()} إلى ${max.toLocaleString()} ريال سعودي** حسب نوع الحرف (أكريليك مضيء / ستانلس Halo) ونوع الكلادينج المقاوم للحريق.`;
      } else if (targetCategory === 'shades') {
        const min = Math.round(val * 110);
        const max = Math.round(val * 190);
        estimateNote =
          lang === 'en'
            ? `\n\n📐 **Preliminary Engineering Estimate:** For ${val} sqm of shades/pergolas, estimated cost ranges between **${min.toLocaleString()} - ${max.toLocaleString()} SAR** (Korean/German PVC or Steel Pergola).`
            : `\n\n📐 **تقدير هندسي مبدئي من المهندس همم:** لمساحة (${val} متر مربع) من المظلات أو البرجولات، تتراوح التكلفة التقديرية بين **${min.toLocaleString()} إلى ${max.toLocaleString()} ريال سعودي** حسب نوع القماش (PVC كوري 1100 جرام أو ألماني) وسماكة الحديد.`;
      } else if (targetCategory === 'hoarding') {
        const min = Math.round(val * 180);
        const max = Math.round(val * 320);
        estimateNote = `\n\n📐 **تقدير هندسي مبدئي:** لتسوير مشروع بطول (${val} متر طولي)، يتراوح التقدير المبدئي بين **${min.toLocaleString()} إلى ${max.toLocaleString()} ريال** شامل الهيكل والطباعة.`;
      }
    }

    // 6. If Gemini API Key is provided in settings, try calling Gemini with our RAG context
    let replyText = '';
    const geminiKey = db.settings.aiConfig?.geminiApiKey?.trim();
    if (geminiKey) {
      try {
        const ragContext = `
اسم الشركة: ${db.settings.fullLegalName.ar}
رقم الجوال والواتساب الرسمي: ${db.settings.phone}
الإيميل الرسمي: ${db.settings.email}
قاعدة المعرفة: ${matchedRules.map((r) => r.answer).join(' | ')}
إجابات معتمدة: ${learnedMatch ? learnedMatch.answer : ''}
الخدمات المطابقة: ${matchedServices.map((s) => s.name.ar + ': ' + s.description.ar + ' (' + s.priceRange.ar + ')').join(' | ')}
        `;
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `${db.knowledgeBase.systemPersona}\n\nمعلومات الشركة المعتمدة:\n${ragContext}\n\nسؤال العميل (${lang}): ${message}`,
                    },
                  ],
                },
              ],
            }),
          }
        );
        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          replyText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      } catch (e) {
        console.error('Gemini API fallback to local RAG engine:', e);
      }
    }

    // 7. Local Intelligent Engineering Engine (Always works 100% reliably!)
    if (!replyText) {
      if (learnedMatch) {
        replyText = learnedMatch.answer + estimateNote;
      } else if (matchedRules.length > 0) {
        replyText = matchedRules.map((r) => r.answer).join('\n\n') + estimateNote;
      } else if (matchedServices.length > 0) {
        const s = matchedServices[0];
        if (lang === 'en') {
          replyText = `Welcome! I am **Eng. Himam** from **Himam Ghaim Company**.\n\nRegarding **${s.name.en}**:\n${s.description.en}\n\n✅ **Key Specifications We Deliver:**\n${s.features.en.map((f) => `• ${f}`).join('\n')}\n\n💰 **Indicative Pricing:** ${s.priceRange.en}${estimateNote}\n\n📞 Contact us directly at **${db.settings.phone}** or email **${db.settings.email}** for a free site survey!`;
        } else if (lang === 'ur') {
          replyText = `خوش آمدید! میں **انجینئر ہمم** ہوں (**ہمم غیم کمپنی**).\n\n**${s.name.ur}** کے حوالے سے:\n${s.description.ur}\n\n✅ **ہماری خصوصیات:**\n${s.features.ur.map((f) => `• ${f}`).join('\n')}\n\n💰 **ابتدائی قیمت:** ${s.priceRange.ur}\n\n📞 مفت سائٹ وزٹ اور کوٹیشن کے لیے رابطہ کریں: **${db.settings.phone}** | **${db.settings.email}**`;
        } else {
          replyText = `أهلاً بك! معك **المهندس همم** من **${db.settings.fullLegalName.ar}** 👷‍♂️.\n\nبخصوص استفسارك عن **${s.name.ar}**:\n${s.description.ar}\n\n✅ **أبرز المواصفات الهندسية التي ننفذها:**\n${s.features.ar.map((f) => `• ${f}`).join('\n')}\n\n💰 **النطاق السعري التقريبي:** ${s.priceRange.ar}${estimateNote}\n\n📞 يسعدنا إرسال مهندس لمعاينة موقعك ورفع المقاسات مجاناً عبر التواصل على جوال/واتساب: **${db.settings.phone}** أو الإيميل: **${db.settings.email}**.`;
        }
      } else {
        // Log question for Admin Self-Learning if not already logged
        if (db.settings.aiConfig?.autoLearnEnabled !== false) {
          const exists = (db.knowledgeBase.unansweredQuestions || []).some(
            (u) => u.question.toLowerCase() === msgLower
          );
          if (!exists && message.length > 5) {
            db.knowledgeBase.unansweredQuestions = [
              {
                id: 'uq-' + Date.now(),
                question: message,
                userLang: lang,
                createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
              },
              ...(db.knowledgeBase.unansweredQuestions || []),
            ].slice(0, 50);
            saveDb(db);
          }
        }

        if (lang === 'en') {
          replyText = `Hello and welcome! I am **Eng. Himam**, AI Engineering & Advertising Consultant at **Himam Ghaim Company** 👷‍♂️.\n\nWe execute 8 integrated sectors across Saudi Arabia:\n1. **3D Signage & ACP Cladding** (Front-lit, Halo backlit, Stainless 304)\n2. **Stickers, Wall Murals & Vehicle Wrapping**\n3. **Construction Project Hoarding**\n4. **Exhibition Booths & Event Production (3D)**\n5. **Car Shades, Tensile Structures, Pergolas & CNC Screens**\n6. **Interior Design & Turnkey Fit-Out**\n7. **General Contracting & Tempered Glass Storefronts**\n8. **Security CCTV & Fire Fighting Networks**\n\nTell me about your project (type of service, city, or approximate dimensions) so I can give you technical advice and an initial estimate! Or reach us at **${db.settings.phone}** | **${db.settings.email}**.`;
        } else if (lang === 'ur') {
          replyText = `السلام علیکم! میں **انجینئر ہمم** ہوں، **ہمم غیم کمپنی** کا کنٹریکٹنگ اور ایڈورٹائزنگ کنسلٹنٹ 👷‍♂️۔\n\nہم سعودی عرب میں 8 مکمل شعبوں میں خدمات فراہم کرتے ہیں: تھری ڈی سائن بورڈز اور کلیڈنگ، اسٹیکرز اور گاڑیوں کی ریپنگ، پروجیکٹ ہورڈنگ، نمائشی بوتھس، شیڈز اور پرگولاز، انٹیریئر ڈیکور، جنرل کنٹریکٹنگ و سیکورٹ گلاس، اور سی سی ٹی وی و فائر سیفٹی۔\n\nاپنے پروجیکٹ کی تفصیل (سروس، شہر یا پیمائش) بتائیں تاکہ میں آپ کو بہترین انجینئرنگ مشورہ دے سکوں! رابطہ نمبر: **${db.settings.phone}**`;
        } else {
          replyText = `حياك الله! معك **المهندس همم**، المستشار الهندسي الذكي في **شركة همم غيم للدعاية والإعلان والمقاولات** 👷‍♂️.\n\nنحن ننفذ 8 قطاعات هندسية متكاملة تحت سقف واحد في كافة مناطق المملكة:\n1️⃣ **الأحرف البارزة والواجهات والكلادينج** (مطابقة لاشتراطات البلديات والكود العمراني)\n2️⃣ **الاستيكرات وتغليف السيارات والرسومات الجدارية**\n3️⃣ **تسوير المشاريع الإنشائية والمحلات قبل الافتتاح**\n4️⃣ **تجهيز أجنحة المعارض والفعاليات (تصميم 3D وتنفيذ)**\n5️⃣ **المظلات والسواتر والبرجولات وقص الليزر CNC**\n6️⃣ **الديكور والتشطيبات الداخلية والجداريات المنحوتة**\n7️⃣ **المقاولات العامة وزجاج السيكوريت والقواطع المكتبية**\n8️⃣ **الأمن والسلامة وكاميرات المراقبة وشبكات إطفاء الحريق**\n${estimateNote}\n\nاكتب لي نوع مشروعك أو المقاس التقريبي وسأرشح لك أفضل خامة مع التكلفة التقديرية ونماذج من مشاريعنا الـ 100 المنفذة! وللتواصل المباشر: **${db.settings.phone}** | **${db.settings.email}**.`;
        }
      }
    }

    return NextResponse.json({
      reply: replyText,
      relatedProjects,
      matchedService: matchedServices[0] || null,
    });
  } catch (error) {
    return NextResponse.json({ error: 'AI processing error' }, { status: 500 });
  }
}
