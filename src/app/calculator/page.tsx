"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import {
  Calculator,
  CheckCircle2,
  Ruler,
  Layers,
  ShieldCheck,
  Send,
  Bot,
  Sparkles,
} from "lucide-react";

export default function CalculatorPage() {
  const { db, lang } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    db.services[0]?.id || "signage"
  );
  const [widthM, setWidthM] = useState<number>(6);
  const [heightM, setHeightM] = useState<number>(2);
  const [tier, setTier] = useState<"standard" | "premium" | "vip">("premium");
  const [city, setCity] = useState<string>("الرياض");
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedService = useMemo(
    () =>
      db.services.find((s) => s.id === selectedServiceId) || db.services[0],
    [db.services, selectedServiceId]
  );

  const baseRates: Record<string, { min: number; max: number }> = {
    signage: { min: 450, max: 850 },
    stickers: { min: 95, max: 220 },
    hoarding: { min: 190, max: 340 },
    exhibitions: { min: 650, max: 1350 },
    shades: { min: 140, max: 270 },
    interiors: { min: 550, max: 1100 },
    contracting: { min: 600, max: 1250 },
    safety: { min: 220, max: 460 },
  };

  const calculation = useMemo(() => {
    const area = Math.max(1, Number((widthM * heightM).toFixed(1)));
    const rate = baseRates[selectedServiceId] || { min: 300, max: 600 };

    const tierMultiplier =
      tier === "standard" ? 0.9 : tier === "premium" ? 1.05 : 1.28;
    const installMultiplier = includeInstallation ? 1.0 : 0.85;

    const minTotal = Math.round(
      area * rate.min * tierMultiplier * installMultiplier
    );
    const maxTotal = Math.round(
      area * rate.max * tierMultiplier * installMultiplier
    );

    return { area, minTotal, maxTotal };
  }, [widthM, heightM, selectedServiceId, tier, includeInstallation]);

  async function handleSaveLead(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: clientName,
        phone: clientPhone,
        city,
        service: pickLang(selectedService.name, "ar"),
        source: "cost-calculator",
        details: `طلب تسعير من الحاسبة الهندسية - الأبعاد: ${widthM}×${heightM} متر (${calculation.area} م²) - الفئة: ${tier} - التقدير: ${calculation.minTotal.toLocaleString()} - ${calculation.maxTotal.toLocaleString()} ريال`,
      }),
    });

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="smart-container">
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-bold mb-4">
              <Calculator className="w-4 h-4" />
              {lang === "ar"
                ? "حاسبة التكلفة الهندسية الفورية"
                : lang === "ur"
                ? "فوری انجینئرنگ لاگت کیلکولیٹر"
                : "Instant Engineering Cost Estimator"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4">
              {lang === "ar"
                ? "احسب التكلفة التقديرية لمشروعك في ثوانٍ"
                : lang === "ur"
                ? "سیکنڈوں میں اپنے پروجیکٹ کی تخمینی لاگت کا حساب لگائیں"
                : "Estimate Your Project Cost in Seconds"}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {lang === "ar"
                ? "اختر الخدمة، حدد المقاسات التقريبية وفئة الخامات لتحصل على نطاق سعري هندسي فوري قبل المعاينة الميدانية المجانية."
                : "Select your service, enter approximate dimensions and material grade for an instant engineering estimate."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="clean-card rounded-3xl p-6 sm:p-8 space-y-7">
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#208EC1]" />
                  {lang === "ar"
                    ? "1. اختر القسم الهندسي أو الخدمة المطلوبة"
                    : "1. Select Engineering Service"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {db.services.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-4 rounded-2xl border text-start transition-all ${
                        selectedServiceId === srv.id
                          ? "border-[#208EC1] bg-[#208EC1]/10 text-[#11345C] dark:text-white font-bold shadow-sm"
                          : "border-slate-200 dark:border-slate-800 hover:border-[#208EC1]/50 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <p className="text-sm font-bold">
                        {pickLang(srv.shortName || srv.name, lang)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {pickLang(srv.priceRange, lang)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#208EC1]" />
                  {lang === "ar"
                    ? "2. حدد الأبعاد التقريبية بالمتر (العرض × الارتفاع أو الطول)"
                    : "2. Enter Approximate Dimensions (Meters)"}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>
                        {lang === "ar"
                          ? "العرض / الطول (متر)"
                          : "Width / Length (m)"}
                      </span>
                      <span className="text-[#208EC1]">{widthM} m</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      step={0.5}
                      value={widthM}
                      onChange={(e) => setWidthM(Number(e.target.value))}
                      className="w-full accent-[#208EC1]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>
                        {lang === "ar"
                          ? "الارتفاع / العمق (متر)"
                          : "Height / Depth (m)"}
                      </span>
                      <span className="text-[#208EC1]">{heightM} m</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={0.5}
                      value={heightM}
                      onChange={(e) => setHeightM(Number(e.target.value))}
                      className="w-full accent-[#208EC1]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#208EC1]" />
                  {lang === "ar"
                    ? "3. فئة الخامات والمواصفات"
                    : "3. Material Specification Tier"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "standard",
                      title:
                        lang === "ar" ? "اقتصادي عملي" : "Standard Commercial",
                      sub:
                        lang === "ar"
                          ? "ضمان سنتين - خامات تجارية"
                          : "2-Year Warranty",
                    },
                    {
                      id: "premium",
                      title:
                        lang === "ar"
                          ? "قياسي ممتاز (الأكثر طلباً)"
                          : "Premium (Recommended)",
                      sub:
                        lang === "ar"
                          ? "ضمان 5 سنوات - كوري/تايواني"
                          : "5-Year Warranty",
                    },
                    {
                      id: "vip",
                      title:
                        lang === "ar"
                          ? "ملكي VIP للمقرات الكبرى"
                          : "Royal VIP / Corporate",
                      sub:
                        lang === "ar"
                          ? "ضمان حتى 10 سنوات - ألماني/FR"
                          : "Up to 10-Year Warranty",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setTier(item.id as "standard" | "premium" | "vip")
                      }
                      className={`p-4 rounded-2xl border text-start transition-all ${
                        tier === item.id
                          ? "border-[#208EC1] bg-[#208EC1]/10 font-bold"
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {lang === "ar" ? "المدينة:" : "City:"}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold"
                  >
                    <option value="الرياض">الرياض (Riyadh)</option>
                    <option value="جدة">جدة (Jeddah)</option>
                    <option value="الدمام">الدمام / الخبر (Dammam)</option>
                    <option value="مكة المكرمة">مكة / المدينة</option>
                    <option value="أخرى">مدن المملكة الأخرى</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="w-4 h-4 accent-[#208EC1] rounded"
                  />
                  <span>
                    {lang === "ar"
                      ? "شامل التوريد والتركيب والهيكل الحديدي"
                      : "Include Steel Structure & Installation"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="clean-card rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-[#11345C] to-[#0c2340] text-white shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  {lang === "ar"
                    ? "التقدير المالي الهندسي"
                    : "Engineering Estimate"}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-bold">
                  {calculation.area} m²
                </span>
              </div>

              <h2 className="text-lg font-bold text-sky-100 mb-2">
                {pickLang(selectedService.name, lang)}
              </h2>

              <div className="my-6 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-xs text-sky-200 mb-1">
                  {lang === "ar"
                    ? "النطاق السعري التقريبي (ريال سعودي):"
                    : "Estimated Price Range (SAR):"}
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">
                  {calculation.minTotal.toLocaleString()} –{" "}
                  {calculation.maxTotal.toLocaleString()}{" "}
                  <span className="text-base font-normal text-sky-300">
                    SAR
                  </span>
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-sky-100 mb-7">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>
                    {lang === "ar"
                      ? "يشمل المعاينة ورفع المقاسات والتصميم ثلاثي الأبعاد 3D"
                      : "Includes site survey & 3D mockup design"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>
                    {lang === "ar"
                      ? "مطابق لاشتراطات البلديات والكود العمراني السعودي"
                      : "Compliant with Saudi Municipal & Urban Code"}
                  </span>
                </li>
              </ul>

              {submitted ? (
                <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
                  <p className="font-bold text-base">
                    {lang === "ar"
                      ? "تم إرسال طلب التسعير للإدارة الهندسية بنجاح!"
                      : "Estimate Request Sent Successfully!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSaveLead} className="space-y-3">
                  <p className="text-xs font-bold text-sky-200">
                    {lang === "ar"
                      ? "احفظ هذا العرض واطلب معاينة مجانية:"
                      : "Lock in this estimate & request free inspection:"}
                  </p>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={
                      lang === "ar"
                        ? "الاسم الكريم أو اسم الشركة"
                        : "Your Name / Company"
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-sky-200/60 text-sm focus:outline-none focus:border-sky-300"
                  />
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={
                      lang === "ar"
                        ? "رقم الجوال (05xxxxxxxx)"
                        : "Mobile Number (05xxxxxxxx)"
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-sky-200/60 text-sm focus:outline-none focus:border-sky-300"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#208EC1] hover:bg-sky-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    {lang === "ar"
                      ? "اعتماد العرض وطلب عرض سعر رسمي"
                      : "Submit for Official PDF Quote"}
                  </button>
                </form>
              )}

              <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
                <Link
                  href="/ai-engineer"
                  className="text-sky-300 hover:underline flex items-center gap-1 font-bold"
                >
                  <Bot className="w-4 h-4" />
                  {lang === "ar"
                    ? "ناقش التفاصيل مع المهندس الذكي"
                    : "Discuss with AI Engineer"}
                </Link>
                <a
                  href={`https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
                    `مرحباً شركة همم غيم، حسبت تكلفة مشروع (${selectedService.name.ar}) بمساحة ${calculation.area} م² (${calculation.minTotal} - ${calculation.maxTotal} ريال) وأرغب في عرض سعر رسمي.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:underline font-bold"
                >
                  {lang === "ar" ? "إرسال عبر واتساب ←" : "Send via WhatsApp →"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
