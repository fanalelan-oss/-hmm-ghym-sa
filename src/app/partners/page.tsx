"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import {
  Award,
  Building2,
  ShieldCheck,
  Handshake,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function PartnersPage() {
  const { db, lang, dict } = useApp();
  const [sectorFilter, setSectorFilter] = useState<string>("all");

  const filteredPartners =
    sectorFilter === "all"
      ? db.partners
      : db.partners.filter((p) => p.sector === sectorFilter);

  const sectorCounts = {
    all: db.partners.length,
    government: db.partners.filter((p) => p.sector === "government").length,
    healthcare: db.partners.filter((p) => p.sector === "healthcare").length,
    commercial: db.partners.filter((p) => p.sector === "commercial").length,
  };

  return (
    <div className="min-h-screen py-3 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 bg-[#eef3f8] dark:bg-brand-950">
      <div className="smart-container">
        {/* ترويسة الصفحة: مختصرة ومرفوعة للأعلى وبدون فراغ زائد */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-extrabold shadow-xs">
              <Handshake className="w-3.5 h-3.5" />
              <span>
                {lang === "ar"
                  ? `شركاء نجاحنا (${db.partners.length} شريك موثق)`
                  : `${dict.partnersSection.eyebrow} (${db.partners.length})`}
              </span>
            </span>

            <h1 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#0f2544] dark:text-white leading-tight">
              {dict.partnersSection.title}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-xl mx-auto">
              {dict.partnersSection.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* فلاتر القطاعات: شبكة ثنائية أنيقة في الجوال وممتدة في الشاشات الأكبر */}
        <ScrollReveal delay={50}>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-2.5 mb-5 sm:mb-8">
            {[
              {
                id: "all",
                label: lang === "ar" ? "جميع الشركاء" : "All Partners",
                count: sectorCounts.all,
              },
              {
                id: "government",
                label: lang === "ar" ? "القطاع الحكومي" : "Government",
                count: sectorCounts.government,
              },
              {
                id: "healthcare",
                label: lang === "ar" ? "القطاع الطبي" : "Healthcare",
                count: sectorCounts.healthcare,
              },
              {
                id: "commercial",
                label: lang === "ar" ? "الشركات والتجاري" : "Commercial",
                count: sectorCounts.commercial,
              },
            ].map((tab) => {
              const isSelected = sectorFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSectorFilter(tab.id)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between sm:justify-center gap-2 border select-none active:scale-95 cursor-pointer ${
                    isSelected
                      ? "bg-[#11345C] text-white dark:bg-[#208EC1] border-[#11345C] dark:border-[#208EC1] shadow-xs"
                      : "bg-white dark:bg-[#0c1d34] text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-white/10 hover:border-[#208EC1]"
                  }`}
                >
                  <span className="truncate">{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* شبكة الشركاء: عمودين متناسقين بالجوال مع بطاقات مدمجة وواضحة */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {filteredPartners.map((partner, idx) => (
            <ScrollReveal key={partner.id} delay={(idx % 6) * 40}>
              <div className="clean-card rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center group h-full justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#208EC1]/60 shadow-xs hover:shadow-md">
                <div className="w-full h-20 sm:h-24 rounded-xl bg-white p-2.5 sm:p-3 flex items-center justify-center border border-slate-100 dark:border-white/5 shadow-2xs mb-2.5">
                  <img
                    src={partner.logo?.startsWith("/") ? partner.logo : "/" + partner.logo}
                    alt={pickLang(partner.name, lang)}
                    className="max-h-14 sm:max-h-16 max-w-[120px] object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="w-full flex-1 flex flex-col justify-between">
                  <span className="inline-block text-[9.5px] sm:text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] mb-1 truncate max-w-full">
                    {partner.sector === "government"
                      ? lang === "ar"
                        ? "قطاع حكومي"
                        : "Government"
                      : partner.sector === "healthcare"
                      ? lang === "ar"
                        ? "قطاع طبي"
                        : "Healthcare"
                      : lang === "ar"
                      ? "قطاع تجاري"
                      : "Commercial"}
                  </span>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#208EC1] transition-colors">
                    {pickLang(partner.name, lang)}
                  </h2>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* بطاقة القيمة المضافة: مدمجة ومتجاوبة للجوال */}
        <ScrollReveal delay={100}>
          <div className="mt-8 sm:mt-12 clean-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-gradient-to-r from-[#11345C] to-[#1a497d] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
              <div className="lg:col-span-8 space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-2xl font-extrabold font-heading">
                  {lang === "ar"
                    ? "لماذا تعتمد الجهات الحكومية والشركات الكبرى على همم غيم؟"
                    : "Why Leading Entities Choose Himam Ghaim"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-1">
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10">
                    <ShieldCheck className="w-5 h-5 text-sky-300 mb-1.5" />
                    <p className="font-bold text-xs sm:text-sm">
                      {lang === "ar"
                        ? "مطابقة الكود العمراني"
                        : "Urban Code Compliance"}
                    </p>
                    <p className="text-[11px] sm:text-xs text-sky-100 mt-1 leading-relaxed">
                      {lang === "ar"
                        ? "تنفيذ مطابق لاشتراطات الأمانات والبلديات والدفاع المدني."
                        : "Full compliance with municipal & safety regulations."}
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10">
                    <Award className="w-5 h-5 text-sky-300 mb-1.5" />
                    <p className="font-bold text-xs sm:text-sm">
                      {lang === "ar"
                        ? "ضمان موثق حتى 10 سنوات"
                        : "Up to 10-Year Warranty"}
                    </p>
                    <p className="text-[11px] sm:text-xs text-sky-100 mt-1 leading-relaxed">
                      {lang === "ar"
                        ? "خامات أصلية مقاومة للعوامل الجوية والحرارة العالية."
                        : "Genuine weather-resistant materials."}
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10">
                    <Building2 className="w-5 h-5 text-sky-300 mb-1.5" />
                    <p className="font-bold text-xs sm:text-sm">
                      {lang === "ar"
                        ? "تغطية ميدانية شاملة"
                        : "Kingdom-Wide Coverage"}
                    </p>
                    <p className="text-[11px] sm:text-xs text-sky-100 mt-1 leading-relaxed">
                      {lang === "ar"
                        ? "فرق هندسية وفنية لتغطية الفروع والمشاريع في كافة مناطق المملكة."
                        : "Engineering teams covering all Saudi regions."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-2.5 pt-2 lg:pt-0">
                <Link
                  href="/contact"
                  className="w-full py-3 sm:py-3.5 px-5 rounded-xl bg-white text-[#11345C] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-sky-50 transition-all shadow-md active:scale-95"
                >
                  <span>
                    {lang === "ar"
                      ? "انضم لشركاء نجاحنا واطلب عرض سعر"
                      : "Become a Partner & Request a Quote"}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm text-center transition-all active:scale-95"
                >
                  {lang === "ar"
                    ? `استعرض سابقة أعمالنا (${db.portfolio.length} مشروع منفذ)`
                    : `Explore ${db.portfolio.length} Executed Projects`}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
