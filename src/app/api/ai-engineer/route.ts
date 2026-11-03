import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { Lang, PortfolioItem } from '@/lib/types';
import { sendOwnerAlertEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

interface HistoryMessage {
  sender: 'bot' | 'user';
  text: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message: string = (body.message || '').trim();
    const image: string | undefined = body.image;
    const history: HistoryMessage[] = body.history || [];
    const lang: Lang = body.lang || 'ar';
    const db = getDb();

    if (!message && !image) {
      return NextResponse.json({ error: 'Empty message or image' }, { status: 400 });
    }

    const msgLower = (message || '').toLowerCase();

    // 1. Capture Leads if phone number or email is present
    const phoneMatch = message.match(/(?:05|\+?9665)[0-9\s-]{8,12}/);
    const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const extractedPhone = phoneMatch ? phoneMatch[0].replace(/[\s-]/g, '') : undefined;
    const extractedEmail = emailMatch ? emailMatch[0] : undefined;

    // Detect city
    let detectedCity = 'الرياض';
    if (/جدة|جده|jeddah/i.test(message)) detectedCity = 'جدة';
    else if (/دمام|dammam/i.test(message)) detectedCity = 'الدمام';
    else if (/خبر|khobar/i.test(message)) detectedCity = 'الخبر';
    else if (/مكة|مكه|makkah/i.test(message)) detectedCity = 'مكة المكرمة';
    else if (/مدينة|madinah/i.test(message)) detectedCity = 'المدينة المنورة';

    // 2. Check Gemini AI API Key
    const geminiKey =
      db.settings.aiConfig?.geminiApiKey?.trim() ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    let finalReply = '';
    let isAiActive = false;

    // =========================================================================
    // CASE 1: REAL GEMINI MULTIMODAL AI (WHEN API KEY IS CONFIGURED)
    // =========================================================================
    if (geminiKey) {
      try {
        const systemPrompt = `
أنت "المهندس همم"، كبير المهندسين والاستشاري الفني لشركة "همم غيم للدعاية والإعلان والمقاولات العامة" في السعودية.
بيانات التواصل الرسمية: الهاتف والواتساب: ${db.settings.phone}، البريد: ${db.settings.email}.
الضمان: 10 سنوات موثق، المعاينة ورفع المقاسات وريندر 3D مجاناً بالكامل لكافة مدن المملكة.

قواعد الحديث الذكي والموجز (بشري 100%):
1. **التحيات والردود البسيطة:**
   - إذا كتب العميل تحية (مثل: "السلام عليكم"، "مرحبا"، "كيف الحال"، "يا هلا"، "صباح/مساء الخير"): رد فوراً بود ولطافة في جملة أو جملتين فقط! (مثال: "وعليكم السلام ورحمة الله وبركاته، يا أهلاً وسهلاً بك! آمرني يا غالي كيف أقدر أساعدك في مشروعك اليوم؟").
   - ممنوع تماماً سرد الخدمات أو الأسعار أو كتابة ديباجات إعلانية في رسائل التحية!
2. **الاستفسارات الهندسية والمشاريع:**
   - لا تكتب مقالات طويلة تأخذ 20 ثانية لقراءتها! اجعل جوابك مختصراً ومركزاً في 3 إلى 5 نقاط سريعة (المواصفة، التكلفة التقريبية بالريال، والنصيحة الهندسية)، بحيث يقرأها العميل في 5 إلى 10 ثوانٍ فقط.
3. **تحليل الصور:**
   - إذا أرفق صورة: صِف باختصار ما تراه تحديداً في الصورة دون أي افتراضات، وأعطِ رأيك الفني والتكلفة المتوقعة في نقاط معدودة.
4. **الأسلوب واللغة:**
   - تحدث كمهندس استشاري محترف يتحدث في واتساب: ذكي، عملي، ومباشر.
   - لغة الجواب: التزم التزاماً تاماً بلغة العميل (إذا أرسل بالإنجليزية English أجب بإنجليزية احترافية وموجزة، وإذا أرسل بالأردية اردو أجب بأردية سلسة ومحترمة، وإذا أرسل بالعربية أجب بالعربية). لغة طلب العميل الحالية: [${lang}].
        `;

        const parts: any[] = [{ text: systemPrompt }];

        // Prior conversation history
        if (history && history.length > 0) {
          const formattedHistory = history
            .slice(-4)
            .map((h) => `${h.sender === 'user' ? 'العميل' : 'المهندس همم'}: ${h.text}`)
            .join('\n');
          parts.push({ text: `سياق المحادثة:\n${formattedHistory}` });
        }

        // Attach user image if present
        if (image && image.startsWith('data:image')) {
          const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
          if (match) {
            parts.push({
              inlineData: {
                mimeType: match[1],
                data: match[2],
              },
            });
            parts.push({
              text: `العميل أرفق هذه الصورة وكتب: "${message || 'ما تحليلك الهندسي لهذه الصورة وما هي الخامات المقترحة والتكلفة؟'}"\nافحص الصورة المرفقة بتمعن واشرح باختصار وتركيز ما تحتويه هندسياً.`,
            });
          }
        } else {
          parts.push({ text: `سؤال العميل: "${message}"` });
        }

        // Verified fast models with active quota
        const modelsToTry = [
          'gemini-3.5-flash-lite',
          'gemini-3.5-flash',
          'gemini-3.1-flash-lite',
          'gemini-3-flash-preview',
        ];
        for (const model of modelsToTry) {
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [{ parts }],
                  generationConfig: {
                    temperature: 0.65,
                    maxOutputTokens: 1200, // Balanced: complete clean finish, concise human length
                  },
                }),
                signal: AbortSignal.timeout(14000), // 14s max per model
              }
            );

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              const parts = geminiData?.candidates?.[0]?.content?.parts || [];
              const textParts = parts.filter((p: any) => p.text && !p.thought).map((p: any) => p.text);
              const textOutput = (textParts.join('\n').trim() || parts[parts.length - 1]?.text || '').trim();
              if (textOutput) {
                finalReply = textOutput;
                isAiActive = true;
                break;
              }
            } else {
              const errBody = await geminiRes.text();
              console.error(`Gemini model ${model} failed (${geminiRes.status}):`, errBody);
            }
          } catch (mErr) {
            console.error(`Gemini fetch error on ${model}:`, mErr);
          }
        }
      } catch (err) {
        console.error('Gemini processing exception:', err);
      }
    }

    // =========================================================================
    // CASE 2: NO GEMINI KEY OR AI OFFLINE
    // STRICT RULE: ABSOLUTELY NO FAKE "AI VISION" OR MONOLITHIC CANNED TEMPLATES!
    // =========================================================================
    if (!finalReply) {
      if (image) {
        // Honest, transparent status — NO pretending to analyze an image without an AI model!
        finalReply = `⚠️ **التحليل البصري التلقائي للصور غير متصل حالياً**

خدمة الفحص الذكي للصور بالذكاء الاصطناعي بحاجة إلى تفعيل مفتاح (Gemini API) في لوحة التحكم حتى تتمكن الخوارزمية من رؤية الصورة وتحليل عناصرها.

👷‍♂️ **تم استلام صورتك وحفظها بنجاح في سجل طلبات الإدارة:**
سيقوم مهندس التنفيذ بالاطلاع المباشر على هذه الصورة وتزويدك بالمواصفات الفنية والتكلفة.

📲 **للحصول على تسعير وتحليل فوري الآن:**
تفضل بمراسلة مهندس المشروع مباشرة عبر الواتساب على الرقم:
👉 **[واتساب فوري: 0565467928](https://wa.me/966565467928)**`;
      } else {
        // Handle natural conversational inquiries honestly and multilingually
        const isGreeting =
          /^(سلام|السلام عليكم|مرحبا|مرحباً|أهلا|اهلا|يا هلا|هلا|صباح الخير|مساء الخير|hello|hi|hey|salam|assalam|aoa)[\s!.]*$/i.test(
            message.trim()
          );

        if (lang === 'en') {
          if (isGreeting) {
            finalReply = `Hello and welcome! I am **Eng. Himam**, technical consultant at **Himam Ghaim Advertising & Contracting** 👷‍♂️.\n\nHow can I assist you today with your project?`;
          } else if (/where|location|branch|office/i.test(msgLower)) {
            finalReply = `Welcome! **Himam Ghaim** operates across **all Saudi regions** (Riyadh, Jeddah, Dammam, Khobar, Makkah) with free on-site engineering surveys.\nContact: **${db.settings.phone}**.`;
          } else if (/phone|contact|whatsapp|number/i.test(msgLower)) {
            finalReply = `You can reach our engineering team directly via phone or WhatsApp at **${db.settings.phone}** or email: **${db.settings.email}**.`;
          } else {
            finalReply = `Welcome! For accurate engineering specifications, pricing, and free 3D render preview, reach our lead engineer directly:\n\n📞 **${db.settings.phone}**\n✉️ **${db.settings.email}**\n\nWe provide free on-site surveys across the Kingdom.`;
          }
        } else if (lang === 'ur') {
          if (isGreeting) {
            finalReply = `خوش آمدید! میں **انجینئر ہمم** ہوں، ہمم غیم کمپنی کا مشیر 👷‍♂️۔\n\nآج میں آپ کے پروجیکٹ (سائن بورڈز، کلیڈنگ، شیڈز، ہورڈنگ، جنرل کنٹریکٹنگ) میں کیا مدد کر سکتا ہوں؟`;
          } else if (/location|where|kahan|مقام|دفتر/i.test(msgLower)) {
            finalReply = `ہمم غیم کمپنی پورے سعودی عرب (ریاض، جدہ، دمام، مکہ) میں خدمات فراہم کرتی ہے مع سائٹ کا مفت معائنہ۔\nرابطہ: **${db.settings.phone}**۔`;
          } else if (/phone|contact|whatsapp|number|نمبر|رابطہ/i.test(msgLower)) {
            finalReply = `ہماری ٹیم سے براہ راست واٹس ایپ یا کال پر رابطہ کریں: **${db.settings.phone}** یا ای میل: **${db.settings.email}**۔`;
          } else {
            finalReply = `خوش آمدید! اپنے منصوبے کی تفصیلی قیمت، میٹریل اور مفت معائنے کے لیے ہمارے پروجیکٹ انجینئر سے براہ راست رابطہ کریں:\n\n📞 **${db.settings.phone}**\n✉️ **${db.settings.email}**\n\nتمام سعودی شہروں میں مفت سائٹ وزٹ اور تھری ڈی ڈیزائن۔`;
          }
        } else {
          if (isGreeting) {
            finalReply = `يا أهلاً وسهلاً بك يا غالي! معك **المهندس همم** استشاري شركة همم غيم للدعاية والإعلان والمقاولات 👷‍♂️.\n\nكيف أقدر أخدمك اليوم؟ تفضل بسؤالك عن (الأحرف البارزة، الكلادينج، المظلات، تسوير المشاريع، المعارض، أو المقاولات العامة).`;
          } else if (/وين موقعكم|مكانكم|فروعكم/i.test(msgLower)) {
            finalReply = `حياك الله! نحن في **شركة همم غيم** نخدم **كافة مناطق المملكة** (الرياض، جدة، الدمام، مكة، والمنطقة الشرقية) مع إرسال مهندسين للمعاينة ورفع المقاسات مجاناً في موقعك.\nللتواصل: **${db.settings.phone}**.`;
          } else if (/رقمكم|جوالكم|واتساب|هاتف/i.test(msgLower)) {
            finalReply = `أهلاً بك! يمكنك التواصل المباشر مع إدارة ومهندسي همم غيم عبر الهاتف أو الواتساب على الرقم: **${db.settings.phone}** أو الإيميل: **${db.settings.email}**.`;
          } else {
            // Check learned Q&A first
            const learned = (db.knowledgeBase.learnedQA || []).find((qa) => {
              const q = qa.question.toLowerCase();
              return msgLower.includes(q) || q.includes(msgLower);
            });

            if (learned) {
              finalReply = `${learned.answer}\n\nيسعدنا تواصلك المباشر مع المهندس المختص: **${db.settings.phone}**.`;
            } else {
              // Check specific knowledge rules
              const matchedRule = (db.knowledgeBase.rules || []).find((r) =>
                r.keywords.some((k) => msgLower.includes(k.toLowerCase()))
              );

              if (matchedRule) {
                finalReply = `${matchedRule.answer}\n\n📞 للاستفسار وطلب معاينة مجانية لمشروعك: **${db.settings.phone}**.`;
              } else {
                // Concise, honest fallback instead of fake generic filler
                finalReply = `أهلاً بك يا غالي! لخدمتك بأعلى دقة هندسية وتقديم الإجابة والمواصفات الفنية المعتمدة لمشروعك، يسعدنا تواصلك المباشر مع مهندس التنفيذ عبر الجوال أو الواتساب:\n\n📞 **${db.settings.phone}**\n✉️ **${db.settings.email}**\n\nنقدم معاينة ميدانية ورفع مقاسات وريندر 3D مجاناً لكافة مدن المملكة.`;
              }
            }
          }
        }
      }
    }

    // 3. Log question for Admin Self-Learning if unknown
    if (db.settings.aiConfig?.autoLearnEnabled !== false && message.length > 5 && !isAiActive) {
      const isAlreadyLogged = (db.knowledgeBase.unansweredQuestions || []).some(
        (q) => q.question.toLowerCase() === msgLower
      );
      if (!isAlreadyLogged) {
        db.knowledgeBase.unansweredQuestions = [
          {
            id: 'uq-' + Date.now(),
            question: message,
            userLang: lang,
            createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          },
          ...(db.knowledgeBase.unansweredQuestions || []),
        ].slice(0, 80);
        saveDb(db);
      }
    }

    // 4. Send Owner Email Alert if phone was extracted or image was uploaded
    if (extractedPhone || image) {
      sendOwnerAlertEmail({
        trigger: image ? 'image_uploaded' : 'customer_phone',
        customerName: 'عميل شات المهندس همم',
        customerPhone: extractedPhone,
        customerEmail: extractedEmail,
        city: detectedCity,
        serviceCategory: 'عام',
        summary: message || (image ? 'قام العميل برفع صورة لمشروع/واجهة بانتظار المراجعة' : 'استفسار عميل'),
        fullConversation: [...history, { sender: 'user', text: message }, { sender: 'bot', text: finalReply }],
        imageUrl: image,
      }).catch((e) => console.error('Silent alert error:', e));
    }

    // 5. Select portfolio items relevant to the text (Only when asking about a service or sending an image)
    const isGeneralGreeting = /^(سلام|السلام عليكم|مرحبا|مرحباً|أهلا|اهلا|يا هلا|هلا|صباح الخير|مساء الخير|كيف الحال|شخبارك|اخبارك|تمام|الحمد لله|شكرا|شكراً|تسلم)[\s!.]*$/i.test(message.trim());
    const isServiceQuery = /لوح|حرف|أحرف|كلادينج|مظل|ساتر|برجول|تسوير|سور|شنكو|كالما|معرض|بوث|ديكور|تشطيب|استيكر|زجاج|عمارة|مشروع|بناء|سعر|تكلفة|متر/i.test(msgLower) || !!image;

    const relatedProjects: PortfolioItem[] = (!isGeneralGreeting && isServiceQuery)
      ? db.portfolio
          .filter((p) => {
            if (/لوح|حرف|كلادينج/.test(msgLower)) return p.category === 'signage';
            if (/مظل|ساتر|برجول/.test(msgLower)) return p.category === 'shades';
            if (/تسوير|سور|شنكو|كالما|عمارة/.test(msgLower)) return p.category === 'hoarding';
            if (/معرض|بوث/.test(msgLower)) return p.category === 'exhibitions';
            if (/ديكور|تشطيب/.test(msgLower)) return p.category === 'interiors';
            return p.featured;
          })
          .slice(0, 2)
      : [];

    return NextResponse.json({
      reply: finalReply,
      relatedProjects,
      isAiActive,
      leadCaptured: !!extractedPhone,
    });
  } catch (error: any) {
    console.error('AI Engineer API Error:', error);
    return NextResponse.json(
      {
        reply:
          'يا أهلاً بك يا غالي! يمكنك دائماً التواصل المباشر مع مهندسينا للاستشارة وعروض الأسعار عبر الواتساب أو الاتصال على: 0565467928.',
        relatedProjects: [],
      },
      { status: 200 }
    );
  }
}
