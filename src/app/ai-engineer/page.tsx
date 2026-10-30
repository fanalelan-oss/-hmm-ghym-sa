"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import { PortfolioItem } from "@/lib/types";
import ScrollReveal from "@/components/layout/ScrollReveal";
import {
  Bot,
  Send,
  Sparkles,
  Calculator,
  CheckCircle2,
  ArrowUpRight,
  PhoneCall,
  BookOpen,
  Ruler,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  relatedProjects?: PortfolioItem[];
}

function AiEngineerContent() {
  const { db, lang } = useApp();
  const searchParams = useSearchParams();
  const initialAsk = searchParams.get("ask") || "";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [calcService, setCalcService] = useState("signage");
  const [calcArea, setCalcArea] = useState<number>(12);

  const botName = pickLang(db.knowledgeBase?.engineerName, lang) || "المهندس همم";

  const welcomeMessage =
    lang === "ar"
      ? `أهلاً بك! معك ${botName}، المستشار الهندسي الذكي لشركة همم غيم للمقاولات والدعاية والإعلان 👷‍♂️. كيف يمكنني مساعدتك اليوم في تسعير أو اختيار مواصفات اللوحات البارزة، واجهات الكلادينج، المظلات، الهوردينج، المعارض أو المقاولات؟`
      : lang === "ur"
      ? `خوش آمدید! میں ${botName} ہوں، ہمم غیم کمپنی کا اسمارٹ انجینئرنگ کنسلٹنٹ 👷‍♂️۔ میں آج آپ کے پروجیکٹ میں کس طرح مدد کر سکتا ہوں؟`
      : `Welcome! I am ${botName}, AI Engineering & Advertising Consultant at Himam Ghaim 👷‍♂️. How can I assist you today with 3D signage, ACP cladding, shades, hoarding, exhibitions, or contracting specs and pricing?`;

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }, [welcomeMessage]);

  useEffect(() => {
    if (initialAsk && messages.length === 1) {
      handleSend(initialAsk);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAsk, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const quickPrompts =
    lang === "ar"
      ? [
          "ما هو أفضل نوع حروف بارزة لواجهة محل أو كافيه بالرياض؟",
          "كم سعر المتر المربع لتكسيات الواجهات بالكلادينج المقاوم للحريق؟",
          "أرغب في معرفة أسعار ومواصفات مظلات السيارات الكابولي PVC",
          "ما هي اشتراطات البلدية والضمان للوحات التجارية؟",
          "كيف يتم تسعير وتجهيز أجنحة المعارض والمؤتمرات؟",
          "ما هي مواصفات تسوير المشاريع الإنشائية (الهوردينج)؟",
        ]
      : lang === "ur"
      ? [
          "دکان یا کیفے کے لیے بہترین 3D سائن بورڈ کون سا ہے؟",
          "فائر ریٹارڈنٹ کلیڈنگ (ACP) کی فی مربع میٹر قیمت کیا ہے؟",
          "کار پارکنگ شیڈز (PVC / HDPE) کی تفصیلات اور قیمت کیا ہے؟",
          "بلدیہ کی شرائط اور وارنٹی کی مدت کیا ہے؟",
        ]
      : [
          "What is the best 3D letter signage type for a storefront or cafe in Riyadh?",
          "What is the price per m² for fire-rated ACP facade cladding?",
          "Tell me about cantilever PVC car parking shades specs and warranty",
          "What are the municipality regulations & warranties for commercial signage?",
          "How do you design and build custom exhibition booths?",
        ];

  async function handleSend(customText?: string) {
    const query = (customText ?? input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-engineer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, lang }),
      });
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text:
          data.reply ||
          (lang === "ar"
            ? "يسعدني خدمتك! يمكنك التواصل مباشرة مع فريقنا الهندسي عبر الجوال أو واتساب على الرقم +966 56 546 7928."
            : "I am happy to assist you! Contact our engineering team directly at +966 56 546 7928."),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        relatedProjects: data.relatedProjects || [],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "bot",
          text:
            lang === "ar"
              ? "حدث خطأ بسيط في الاتصال. يمكنك التواصل مباشرة مع المهندس المختص على الرقم +966 56 546 7928."
              : "Connection issue. Please reach our engineer directly at +966 56 546 7928.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuickEstimateAsk() {
    const srv = db.services.find((s) => s.id === calcService) || db.services[0];
    const srvName = pickLang(srv.name, lang);
    const prompt =
      lang === "ar"
        ? `كم سعر وتكلفة تنفيذ (${srvName}) بمقاس ${calcArea} متر مربع مع المواصفات والضمان؟`
        : `What is the price and cost for (${srvName}) with ${calcArea} meter area?`;
    handleSend(prompt);
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="smart-container">
        <ScrollReveal>
          <div className="clean-card rounded-3xl p-7 sm:p-10 mb-8 bg-gradient-to-r from-[#11345C] via-[#164273] to-[#208EC1] text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold mb-4">
                  <Sparkles className="w-4 h-4 text-sky-300" />
                  <span>
                    {lang === "ar"
                      ? "قاعدة معرفة هندسية ذكية متصلة بـ 100 مشروع و8 قطاعات"
                      : lang === "ur"
                      ? "100 منصوبوں اور 8 خدمات سے منسلک اسمارٹ انجینئر"
                      : "Smart Engineering Knowledge Base Connected to 100 Projects & 8 Sectors"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-heading mb-3">
                  {botName} —{" "}
                  {lang === "ar"
                    ? "مستشارك الهندسي للدعاية والإعلان والمقاولات"
                    : "AI Contracting & Signage Engineer"}
                </h1>
                <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
                  {lang === "ar"
                    ? "صفحة استشارية مستقلة بالكامل بدون نوافذ مزعجة. اسأل المهندس همم عن أفضل الخامات، اشتراطات البلديات السعودية، أسعار المتر التقريبية، أو اطلب ترشيح مشاريع مماثلة من سابقة أعمالنا."
                    : "Dedicated full-page engineering advisor. Ask about materials, Saudi municipal compliance, rough per-meter pricing, or matching portfolio projects."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/calculator"
                  className="px-5 py-3.5 rounded-2xl bg-white text-[#11345C] font-bold text-sm flex items-center gap-2 hover:bg-sky-50 transition-all shadow-lg"
                >
                  <Calculator className="w-4 h-4 text-[#208EC1]" />
                  {lang === "ar"
                    ? "حاسبة التكلفة التفصيلية"
                    : "Full Cost Calculator"}
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm flex items-center gap-2 border border-white/25 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  {lang === "ar"
                    ? "طلب معاينة ميدانية مجانية"
                    : "Free Site Inspection"}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="clean-card rounded-3xl p-6">
              <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#208EC1]" />
                {lang === "ar"
                  ? "استشارات هندسية سريعة (اضغط للسؤال)"
                  : "Quick Engineering Questions"}
              </h2>
              <div className="space-y-2.5">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="w-full text-start p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 hover:bg-[#208EC1]/10 dark:hover:bg-[#208EC1]/20 border border-slate-200/70 dark:border-slate-700/70 hover:border-[#208EC1] text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="clean-card rounded-3xl p-6">
              <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#208EC1]" />
                {lang === "ar"
                  ? "اسأل المهندس بالتسعير حسب المساحة"
                  : "Ask Engineer by Area (m²)"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">
                    {lang === "ar" ? "نوع الخدمة" : "Service Type"}
                  </label>
                  <select
                    value={calcService}
                    onChange={(e) => setCalcService(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium"
                  >
                    {db.services.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {pickLang(srv.shortName || srv.name, lang)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">
                      {lang === "ar"
                        ? "المساحة التقريبية (متر مربع)"
                        : "Approximate Area (m²)"}
                    </span>
                    <span className="text-[#208EC1]">{calcArea} m²</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={250}
                    value={calcArea}
                    onChange={(e) => setCalcArea(Number(e.target.value))}
                    className="w-full accent-[#208EC1]"
                  />
                </div>

                <button
                  onClick={handleQuickEstimateAsk}
                  className="w-full py-3 rounded-xl bg-[#11345C] hover:bg-[#208EC1] text-white text-xs sm:text-sm font-bold transition-all"
                >
                  {lang === "ar"
                    ? "احسب التكلفة والمواصفات الآن"
                    : "Calculate Specs & Cost in Chat"}
                </button>
              </div>
            </div>

            <div className="clean-card rounded-3xl p-5 bg-emerald-500/5 border-emerald-500/20">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    {lang === "ar"
                      ? "يتعلم ويتطور باستمرار"
                      : "Self-Learning Knowledge Base"}
                  </p>
                  {lang === "ar"
                    ? "يتم حفظ الاستفسارات الجديدة وتحديث قاعدة معرفة المهندس همم من لوحة التحكم لضمان أدق إجابة هندسية."
                    : "New questions are logged so our engineering admins can continuously enrich the knowledge base."}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="clean-card rounded-3xl overflow-hidden flex flex-col h-[680px] shadow-xl">
              <div className="p-5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#11345C] to-[#208EC1] text-white flex items-center justify-center shadow-md">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">
                        {botName}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {lang === "ar" ? "متصل الآن" : "Online"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {pickLang(db.settings.companyName, lang)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: "welcome-reset",
                        sender: "bot",
                        text: welcomeMessage,
                        timestamp: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      },
                    ])
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#208EC1] text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {lang === "ar" ? "محادثة جديدة" : "Reset"}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/40 dark:bg-slate-950/40">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] sm:max-w-[80%] rounded-3xl p-5 leading-relaxed text-sm sm:text-base whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-[#11345C] text-white rounded-ee-sm shadow-md"
                          : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-es-sm shadow-sm"
                      }`}
                    >
                      {msg.text}

                      {msg.relatedProjects && msg.relatedProjects.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <p className="text-xs font-bold text-[#208EC1] mb-3 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            {lang === "ar"
                              ? "مشاريع حقيقية نفذناها مرتبطة باستفسارك:"
                              : "Verified Projects We Executed Matching Your Query:"}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {msg.relatedProjects.map((proj) => (
                              <Link
                                key={proj.id}
                                href={`/portfolio/${proj.slug}`}
                                className="group block rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-[#208EC1] transition-all"
                              >
                                <div className="h-24 overflow-hidden bg-slate-900">
                                  <img
                                    src={
                                      proj.type === "video"
                                        ? proj.poster || proj.src
                                        : proj.src
                                    }
                                    alt={pickLang(proj.title, lang)}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <div className="p-2.5">
                                  <p className="text-[11px] text-[#208EC1] font-bold">
                                    {pickLang(proj.city, lang)}
                                  </p>
                                  <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 flex items-center justify-between gap-1">
                                    <span>{pickLang(proj.title, lang)}</span>
                                    <ArrowUpRight className="w-3 h-3 shrink-0" />
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1.5 px-2">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-8 h-8 rounded-xl bg-[#208EC1]/15 text-[#208EC1] flex items-center justify-center animate-spin">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <span>
                      {lang === "ar"
                        ? "المهندس همم يراجع المواصفات الهندسية وسابقة الأعمال..."
                        : "Eng. Himam is analyzing technical specs & portfolio..."}
                    </span>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "اكتب سؤالك الهندسي هنا... (مثال: كم تكلفة لوحة حروف بارزة 6 متر في الرياض؟)"
                      : lang === "ur"
                      ? "اپنا انجینئرنگ سوال یہاں لکھیں..."
                      : "Ask your engineering question (e.g., Cost of 6m 3D acrylic sign in Riyadh?)..."
                  }
                  className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3.5 rounded-2xl bg-[#208EC1] hover:bg-[#11345C] disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  <span>{lang === "ar" ? "إرسال" : "Send"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiEngineerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 text-center">
          Loading AI Engineer...
        </div>
      }
    >
      <AiEngineerContent />
    </Suspense>
  );
}
