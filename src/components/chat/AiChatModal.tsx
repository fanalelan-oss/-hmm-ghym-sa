'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp, pickLang } from '@/context/AppContext';
import { PortfolioItem } from '@/lib/types';
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  MessageCircle,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Camera,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  image?: string;
  relatedProjects?: PortfolioItem[];
  leadCaptured?: boolean;
}

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiChatModal({ isOpen, onClose }: AiChatModalProps) {
  const { db, lang } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const botName = pickLang(db.knowledgeBase?.engineerName, lang) || 'المهندس همم';

  const defaultWelcome: ChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text:
      lang === 'ar'
        ? `أهلاً بك! معك **${botName}**، المستشار الفني لـ **شركة همم غيم للدعاية والإعلان والمقاولات** 👷‍♂️.\n\nيسعدني تقديم الاستشارات الفنية والأسعار التقريبية، فحص اشتراطات منصة بلدي، ومساعدتك في اختيار الخامات المناسبة لمشروعك.\n\nكيف يمكنني خدمتك اليوم؟`
        : lang === 'ur'
        ? `خوش آمدید! میں **${botName}** ہوں، ہمم غیم کمپنی کا اسمارٹ انجینئر 👷‍♂️۔ سائن بورڈز، کلیڈنگ، شیڈز، اور جنرل کنٹریکٹنگ میں آپ کی کیا مدد کر سکتا ہوں؟`
        : `Welcome! I am **${botName}**, Technical Consultant at **Himam Ghaim Company** 👷‍♂️.\n\nHow can I help you today with 3D signage, ACP cladding, shades, hoarding, exhibitions, or general contracting?`,
    timestamp: 'الآن',
  };

  // Initialize welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([defaultWelcome]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Lock body scroll ONLY on mobile devices when modal is open (so desktop remains fully interactable)
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, selectedImage]);

  const quickPrompts =
    lang === 'ar'
      ? [
          'أسعار واجهات الكلادينج المقاوم للحريق؟',
          'أفضل نوع حروف بارزة لواجهة كافيه أو محل؟',
          'مواصفات وأسعار مظلات وسواتر الفلل؟',
          'تسوير المشاريع الإنشائية بالشنكو والهوردينج؟',
          'اشتراطات منصة بلدي والكود السعودي للوحات؟',
          'تجهيز بوثات وأجنحة المعارض بتصميم 3D؟',
        ]
      : lang === 'ur'
      ? [
          'فائر ریٹارڈنٹ کلیڈنگ (ACP) کی قیمت کیا ہے؟',
          'کیفے یا دکان کے لیے بہترین 3D سائن بورڈ کون سا ہے؟',
          'کار پارکنگ شیڈز کی تفصیلات کیا ہیں؟',
        ]
      : [
          'Price for fire-rated ACP facade cladding?',
          'Best 3D signage for a cafe or retail store?',
          'Car parking shades and pergolas specs & warranty',
        ];

  // Handle Image Selection and Client-side Compression
  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress to max width/height 1000px for speedy processing
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1000;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setSelectedImage(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  async function handleSend(customText?: string) {
    const query = (customText ?? input).trim();
    const currentImg = selectedImage;
    const currentImgName = selectedImageName;

    if (!query && !currentImg) return;
    if (isLoading) return;

    // Reset input fields immediately
    if (!customText) setInput('');
    setSelectedImage(null);
    setSelectedImageName(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query || 'أرجو مراجعة وتحليل الصورة المرفقة وتقديم استشارة هندسية واقتراح الخامات والتكلفة.',
      image: currentImg || undefined,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build history excluding welcome
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ sender: m.sender, text: m.text }));

      const res = await fetch('/api/ai-engineer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          image: currentImg || undefined,
          imageName: currentImgName || undefined,
          history: historyPayload,
          lang,
        }),
        signal: AbortSignal.timeout(32000), // Max 32s frontend timeout to accommodate thorough engineering calculations
      });
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text:
          data.reply ||
          (lang === 'ar'
            ? 'يا هلا بك! معك المهندس همم. يسعدني دائماً خدمتك وتلقي استفسارك عبر الواتساب على الرقم 0565467928.'
            : lang === 'ur'
            ? 'خوش آمدید! میں انجینئر ہمم ہوں۔ واٹس ایپ 0565467928 پر آپ کی مدد کے لیے ہمہ وقت حاضر ہوں۔'
            : 'Happy to assist! Contact our team at +966 56 546 7928.'),
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        relatedProjects: data.relatedProjects || [],
        leadCaptured: data.leadCaptured,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'bot',
          text:
            lang === 'ar'
              ? 'أهلاً بك يا غالي! لتفاصيل هذا المشروع وحساب التكلفة بدقة هندسية عالية، يسعدنا تواصلك المباشر مع مهندس الموقع لرفع المقاسات وتقديم ريندر 3D مجاناً عبر واتساب: 0565467928.'
              : lang === 'ur'
              ? 'خوش آمدید! اس منصوبے کی تفصیلی قیمت، مفت پیمائش اور تھری ڈی ڈیزائن کے لیے براہ راست واٹس ایپ 0565467928 پر رابطہ کریں۔'
              : 'Welcome! For project specs and custom pricing, please contact our lead engineer directly on WhatsApp: +966 56 546 7928.',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setMessages([defaultWelcome]);
    setSelectedImage(null);
    setSelectedImageName(null);
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="المستشار الهندسي الذكي - شركة همم غيم"
      className={
        isFullscreen
          ? 'fixed inset-0 z-[999999] flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md transition-all duration-300 select-text'
          : 'fixed inset-0 sm:inset-auto sm:bottom-6 sm:left-6 sm:top-auto sm:right-auto z-[999999] flex flex-col justify-end sm:justify-start pointer-events-none select-text'
      }
    >
      {/* Background click to close (Only in Fullscreen mode or on Mobile) */}
      {isFullscreen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto -z-10"
          aria-hidden="true"
        />
      )}

      {/* Main Chat Modal / Floating Widget */}
      <div
        className={`w-full flex flex-col bg-[#071325] border-t sm:border border-sky-500/30 sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 pointer-events-auto ${
          isFullscreen
            ? 'h-[100dvh] sm:h-[85vh] sm:max-w-4xl sm:rounded-3xl'
            : 'h-[100dvh] sm:h-[630px] sm:max-h-[85vh] sm:w-[420px]'
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#0d223f] via-[#102d53] to-[#0d223f] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Glowing Avatar */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#123963] to-[#208EC1] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-[#091b30] flex items-center justify-center">
                  <svg
                    viewBox="0 0 40 40"
                    className="w-6 h-6 text-sky-400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="7" y="10" width="26" height="21" rx="8" fill="#122c4f" stroke="#38BDF8" strokeWidth="2" />
                    <path d="M20 5 L20 10" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="20" cy="4" r="2" fill="#38BDF8" />
                    <rect x="11" y="15" width="18" height="7" rx="3.5" fill="#061220" />
                    <circle cx="15.5" cy="18.5" r="2" fill="#38BDF8" />
                    <circle cx="24.5" cy="18.5" r="2" fill="#38BDF8" />
                    <path d="M16 26 C18 28 22 28 24 26" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
                    <rect x="4" y="16" width="2.5" height="8" rx="1" fill="#38BDF8" />
                    <rect x="33.5" y="16" width="2.5" height="8" rx="1" fill="#38BDF8" />
                  </svg>
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#071325]" />
              </span>
            </div>

            {/* Title & Online Status */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-white font-bold text-sm sm:text-base font-display truncate">{botName}</h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                  {lang === 'ar' ? 'كبير المهندسين' : lang === 'ur' ? 'چیف انجینئر' : 'Lead Engineer'}
                </span>
              </div>
              <p className="text-xs text-slate-300/80 truncate">
                {lang === 'ar'
                  ? 'استشارات هندسية ومعمارية · شركة همم غيم'
                  : lang === 'ur'
                  ? 'انجینئرنگ اور آرکیٹیکچرل مشاورت · ہمم غيم کمپنی'
                  : 'Architectural & Technical Consultations · Himam Ghaim Co.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Reset Chat */}
            <button
              onClick={handleReset}
              type="button"
              title={lang === 'ar' ? 'بدء محادثة جديدة' : lang === 'ur' ? 'نئی گفتگو' : 'New Chat'}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Toggle Fullscreen (Desktop Only) */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              type="button"
              title={isFullscreen ? (lang === 'ar' ? 'تصغير إلى نافذة جانبية' : lang === 'ur' ? 'سائیڈ ونڈو میں چھوٹا کریں' : 'Minimize') : (lang === 'ar' ? 'تكبير النافذة' : lang === 'ur' ? 'فل اسکرین کریں' : 'Maximize')}
              className="hidden sm:inline-flex p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              title={lang === 'ar' ? 'إغلاق المحادثة' : lang === 'ur' ? 'بند کریں' : 'Close'}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.08] hover:bg-rose-500/20 hover:text-rose-300 active:scale-95 transition-all ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Feed Area (Scrollbar hidden) */}
        <div className="flex-1 overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] px-4 sm:px-5 py-4 space-y-4 scroll-smooth min-h-0 bg-radial-[at_top_right] from-[#0c213d]/40 via-transparent to-transparent">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div key={msg.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} gap-1.5`}>
                <div
                  className={`max-w-[88%] sm:max-w-[84%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm transition-all ${
                    isBot
                      ? 'bg-[#10233b] border border-white/10 text-slate-100 rounded-bl-sm'
                      : 'bg-gradient-to-l from-[#208EC1] to-[#12588c] text-white rounded-br-sm font-medium'
                  }`}
                >
                  {/* Uploaded User Image display */}
                  {msg.image && (
                    <div className="mb-2.5 rounded-xl overflow-hidden border border-white/20 bg-black/40">
                      <img src={msg.image} alt="صورة مرفقة للاستشارة" className="max-h-56 w-auto object-contain mx-auto" />
                    </div>
                  )}

                  {msg.text}

                  {/* Lead captured indicator */}
                  {msg.leadCaptured && (
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 text-emerald-300 text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>تم تسجيل بياناتك وإرسال إشعار فوري لإدارة المشاريع للتواصل معك.</span>
                    </div>
                  )}

                  {/* Related Projects Visual Showcase */}
                  {msg.relatedProjects && msg.relatedProjects.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                      <div className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>مشاريع منفذة مطابقة من سابقة أعمال همم غيم:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.relatedProjects.slice(0, 2).map((proj) => {
                          const rawSrc = proj.poster || proj.src || '';
                          const imgSrc = rawSrc.startsWith('http') || rawSrc.startsWith('/') ? rawSrc : `/${rawSrc}`;
                          return (
                            <div
                              key={proj.id}
                              className="flex items-center gap-2.5 p-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200"
                            >
                              <img
                                src={imgSrc}
                                alt={pickLang(proj.title, lang)}
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = '/assets/images/portfolio/saudi-project-hoarding-fence-printing-calma-hoarding-himam-ghaim.webp';
                                }}
                                className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-800"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-white truncate text-[11px] sm:text-xs">
                                  {pickLang(proj.title, lang)}
                                </p>
                                <span className="text-[10px] text-sky-400 block truncate">
                                  {proj.city ? pickLang(proj.city, lang) : 'المملكة العربية السعودية'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Timestamp */}
                <span className="text-[10px] text-slate-400 px-1 font-mono">{msg.timestamp}</span>
              </div>
            );
          })}

          {/* Typing Indicator: Clean bouncing dots with concise text */}
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="rounded-2xl rounded-bl-sm px-3.5 py-2.5 bg-[#10233b] border border-white/10 text-slate-300 flex items-center gap-2.5 shadow-sm">
                <span className="text-[11px] text-sky-400/90 font-medium">جاري التحليل...</span>
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips (Horizontal Scrollbar Hidden) */}
        <div className="px-4 sm:px-5 py-2 border-t border-white/10 bg-[#09182d] shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] py-1">
            <span className="text-[10px] text-slate-400 font-bold shrink-0">
              {lang === 'ar' ? 'مقترحات:' : lang === 'ur' ? 'تجویز کردہ:' : 'Suggested:'}
            </span>
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (q.includes('تحليل صورة')) {
                    fileInputRef.current?.click();
                  } else {
                    handleSend(q);
                  }
                }}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 text-slate-300 hover:text-white text-[11px] font-medium transition-all shrink-0 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Image Attachment Preview Bar */}
        {selectedImage && (
          <div className="px-4 sm:px-6 py-2 bg-[#0c1f38] border-t border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <img src={selectedImage} alt="المعاينة" className="w-10 h-10 rounded-lg object-cover border border-sky-400/30 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs text-white font-bold block truncate">{selectedImageName || (lang === 'ar' ? 'صورة مرفقة' : lang === 'ur' ? 'منسلک تصویر' : 'Attached Image')}</span>
                <span className="text-[10px] text-sky-300">
                  {lang === 'ar'
                    ? 'جاهزة للتحليل الهندسي واستخراج المواصفات'
                    : lang === 'ur'
                    ? 'انجینئرنگ تجزیہ اور تفصیلات کے لیے تیار'
                    : 'Ready for technical analysis & specification extraction'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedImage(null);
                setSelectedImageName(null);
              }}
              type="button"
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Input Area */}
        <div className="p-3 sm:p-4 bg-[#0a1b32] border-t border-white/10 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Hidden File Input for Camera/Gallery */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            {/* Photo / Camera Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title={lang === 'ar' ? 'إرفاق صورة واجهة أو مخطط للتحليل الهندسي' : lang === 'ur' ? 'تصویر یا سائٹ پلان منسلک کریں' : 'Attach photo or site plan'}
              disabled={isLoading}
              className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.08] hover:bg-sky-500/20 text-sky-400 hover:text-white border border-white/15 transition-all shrink-0 active:scale-95"
            >
              <Camera className="w-5 h-5" />
            </button>

            {/* Main Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                selectedImage
                  ? lang === 'ar'
                    ? 'اكتب ملاحظتك على الصورة (أو اضغط إرسال فوراً)...'
                    : lang === 'ur'
                    ? 'تصویر کے بارے میں لکھیں (یا براہ راست ارسال کریں)...'
                    : 'Add notes about the image (or hit send)...'
                  : lang === 'ar'
                  ? 'اكتب استفسارك الهندسي هنا...'
                  : lang === 'ur'
                  ? 'اپنا انجینئرنگ سوال یا پروجیکٹ یہاں لکھیں...'
                  : 'Ask your engineering or pricing question here...'
              }
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 sm:py-3 rounded-2xl bg-white/[0.07] border border-white/15 focus:border-sky-400 focus:bg-white/10 text-white placeholder-slate-400 text-xs sm:text-sm outline-none transition-all"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || isLoading}
              aria-label={lang === 'ar' ? 'إرسال' : lang === 'ur' ? 'ارسال کریں' : 'Send'}
              className="px-4 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#208EC1] to-sky-600 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-4 h-4 rtl:-scale-x-100" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'إرسال' : lang === 'ur' ? 'ارسال کریں' : 'Send'}
              </span>
            </button>
          </form>

          {/* Quick Direct WhatsApp Assist */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
            <span>
              {lang === 'ar'
                ? 'تفضل التحدث مع مهندس المشروع مباشرة؟'
                : lang === 'ur'
                ? 'پروجیکٹ انجینئر سے براہ راست بات کرنا چاہتے ہیں؟'
                : 'Prefer to speak directly with our project engineer?'}
            </span>
            <a
              href={`https://wa.me/966565467928?text=${encodeURIComponent(
                lang === 'en'
                  ? 'Hello, I would like an engineering consultation and direct quote from Himam Ghaim Company.'
                  : lang === 'ur'
                  ? 'السلام علیکم، مجھے ہمم غيم کمپنی سے انجینئرنگ مشاورت اور کوٹیشن درکار ہے۔'
                  : 'السلام عليكم، أرغب في استشارة هندسية وعرض سعر مباشر من شركة همم غيم.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'واتساب فوري (0565467928)'
                  : lang === 'ur'
                  ? 'فوری واٹس ایپ (0565467928)'
                  : 'Instant WhatsApp (+966 56 546 7928)'}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
