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
} from "lucide-react";

export default function PartnersPage() {
  const { db, lang, dict } = useApp();
  const [sectorFilter, setSectorFilter] = useState<string>("all");

  const filteredPartners =
    sectorFilter === "all"
      ? db.partners
      : db.partners.filter((p) => p.sector === sectorFilter);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="smart-container">
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-bold mb-4">
              <Handshake className="w-4 h-4" />
              {dict.partnersSection.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4">
              {dict.partnersSection.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {dict.partnersSection.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              {
                id: "all",
                label:
                  lang === "ar"
                    ? `جميع الشركاء (${db.partners.length})`
                    : `All Partners (${db.partners.length})`,
              },
              {
                id: "government",
                label:
                  lang === "ar"
                    ? "القطاع الحكومي والمبادرات الوطنية"
                    : "Government & National Initiatives",
              },
              {
                id: "healthcare",
                label:
                  lang === "ar"
                    ? "القطاع الطبي والمستشفيات"
                    : "Healthcare & Hospitals",
              },
              {
                id: "commercial",
                label:
                  lang === "ar"
                    ? "الشركات الكبرى والقطاع التجاري"
                    : "Corporate & Commercial",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSectorFilter(tab.id)}
                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
                  sectorFilter === tab.id
                    ? "bg-[#11345C] text-white dark:bg-[#208EC1] shadow-md"
                    : "clean-card text-slate-700 dark:text-slate-300 hover:border-[#208EC1]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {filteredPartners.map((partner, idx) => (
            <ScrollReveal key={partner.id} delay={idx * 50}>
              <div className="clean-card rounded-3xl p-7 flex flex-col items-center text-center group h-full justify-between">
                <div className="w-full h-32 rounded-2xl bg-white dark:bg-slate-800/90 p-5 flex items-center justify-center border border-slate-100 dark:border-slate-700/60 mb-5">
                  <img
                    src={partner.logo}
                    alt={pickLang(partner.name, lang)}
                    className="max-h-20 max-w-[160px] object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="inline-block text-[11px] font-bold px-3 py-0.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] mb-2">
                    {partner.sector === "government"
                      ? lang === "ar"
                        ? "قطاع حكومي / وطني"
                        : "Government"
                      : partner.sector === "healthcare"
                      ? lang === "ar"
                        ? "قطاع طبي"
                        : "Healthcare"
                      : lang === "ar"
                      ? "قطاع تجاري وشركات"
                      : "Commercial"}
                  </span>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {pickLang(partner.name, lang)}
                  </h2>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={150}>
          <div className="mt-16 clean-card rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#11345C] to-[#1a497d] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
                  {lang === "ar"
                    ? "لماذا تعتمد الجهات الحكومية والشركات الكبرى على شركة همم غيم؟"
                    : "Why Leading Entities Choose Himam Ghaim"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/10">
                    <ShieldCheck className="w-6 h-6 text-sky-300 mb-2" />
                    <p className="font-bold text-sm">
                      {lang === "ar"
                        ? "مطابقة الكود العمراني"
                        : "Urban Code Compliance"}
                    </p>
                    <p className="text-xs text-sky-100 mt-1">
                      {lang === "ar"
                        ? "تنفيذ مطابق لاشتراطات الأمانات والبلديات والدفاع المدني."
                        : "Full compliance with municipal & safety regulations."}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10">
                    <Award className="w-6 h-6 text-sky-300 mb-2" />
                    <p className="font-bold text-sm">
                      {lang === "ar"
                        ? "ضمان موثق يصل 10 سنوات"
                        : "Up to 10-Year Warranty"}
                    </p>
                    <p className="text-xs text-sky-100 mt-1">
                      {lang === "ar"
                        ? "خامات أصلية مقاومة للعوامل الجوية والحرارة العالية."
                        : "Genuine weather-resistant materials."}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10">
                    <Building2 className="w-6 h-6 text-sky-300 mb-2" />
                    <p className="font-bold text-sm">
                      {lang === "ar"
                        ? "قدرة إنتاجية وميدانية عالية"
                        : "High Production Capacity"}
                    </p>
                    <p className="text-xs text-sky-100 mt-1">
                      {lang === "ar"
                        ? "فرق هندسية وفنية لتغطية الفروع والمشاريع في كافة مدن المملكة."
                        : "Engineering teams covering all Saudi cities."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full py-4 px-6 rounded-2xl bg-white text-[#11345C] font-bold text-sm flex items-center justify-center gap-2 hover:bg-sky-50 transition-all shadow-lg"
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
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm text-center transition-all"
                >
                  {lang === "ar"
                    ? "استعرض سابقة أعمالنا (100 مشروع)"
                    : "Explore 100 Executed Projects"}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
