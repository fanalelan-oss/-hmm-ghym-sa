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
بيانات الشركة الرسمية:
- الهاتف والواتساب المعتمد: ${db.settings.phone}
- البريد الرسمي: ${db.settings.email}
- الضمان: 10 سنوات ضمان موثق شامل.
- المعاينة: معاينة ورفع مقاسات وريندر 3D مجاناً بالكامل.
- التغطية: الرياض، جدة، مكة، الدمام، الخبر، وكافة مدن المملكة.
- أنشطة الشركة الثمانية فقط:
  1. الأحرف البارزة والكلادينج (زنكور، أكريليك، ستانلس 304، Halo مضيئة، نيون).
  2. الاستيكرات وتغليف أساطيل السيارات بطباعة رولاند اليابانية وفينيل 3M.
  3. تسوير المشاريع الإنشائية والتجارية (الهوردينج) بحواجز نيوجيرسي وشنكو وبوسترات UV.
  4. تجهيز بوثات وأجنحة المعارض والمؤتمرات الكبرى بتصاميم 3D خشبية ومعدنية.
  5. المظلات والسواتر والبرجولات وقص الليزر CNC بأقمشة PVC كوري وألماني.
  6. الديكور والتشطيبات الداخلية وبديل الخشب والرخام والجبس بورد.
  7. المقاولات العامة وزجاج السيكوريت 12مم والواجهات العنكبوتية Spider Glass.
  8. كاميرات المراقبة وشبكات الأمن والسلامة ومكافحة الحريق المعتمدة من الدفاع المدني.

تعليمات التعامل مع الصور والأسئلة:
- إذا أرفق العميل صورة: انظر إلى الصورة بدقة حقيقية! صف ما تراه في الصورة بالضبط (هل هو سور مشروع، هوردينج، واجهة محل، مظلة، تصميم داخلي، كشك، إلخ) وقدم ملاحظات هندسية دقيقة عما هو موجود في الصورة تحديداً ولا تفترض شيئاً غير موجود فيها!
- جاوب بنبرة مهندس استشاري سعودي واقعي ومحترف ومباشر.
- لا تكرر إجابات ثابتة أو ديباجات محفوظة، بل ركز على ما سأل عنه العميل بدقة.
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
              text: `العميل أرفق هذه الصورة وكتب: "${message || 'ما تحليلك الهندسي لهذه الصورة وما هي الخامات المقترحة والتكلفة؟'}"\nافحص الصورة المرفقة بتمعن واشرح بالتفصيل ما تحتويه هندسياً.`,
            });
          }
        } else {
          parts.push({ text: `سؤال العميل: "${message}"` });
        }

        // Verified fast models with active quota (gemini-3-flash-preview & gemini-3.1-flash-lite)
        const modelsToTry = [
          'gemini-3-flash-preview',
          'gemini-3.1-flash-lite',
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
                    temperature: 0.7,
                    maxOutputTokens: 2500,
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
        // Handle natural conversational inquiries honestly
        const isGreeting =
          /^(سلام|السلام عليكم|مرحبا|مرحباً|أهلا|اهلا|يا هلا|هلا|صباح الخير|مساء الخير)[\s!.]*$/i.test(
            message.trim()
          );

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

    // 5. Select portfolio items relevant to the text
    const relatedProjects: PortfolioItem[] = db.portfolio
      .filter((p) => {
        if (/لوح|حرف|كلادينج/.test(msgLower)) return p.category === 'signage';
        if (/مظل|ساتر|برجول/.test(msgLower)) return p.category === 'shades';
        if (/تسوير|سور|شنكو|كالما/.test(msgLower)) return p.category === 'hoarding';
        if (/معرض|بوث/.test(msgLower)) return p.category === 'exhibitions';
        if (/ديكور|تشطيب/.test(msgLower)) return p.category === 'interiors';
        return p.featured;
      })
      .slice(0, 2);

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
