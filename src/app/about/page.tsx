"use client";

import React from "react";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import SmartLinkedText from "@/components/seo/SmartLinkedText";
import ExpandableHashtagsCard from "@/components/seo/ExpandableHashtagsCard";
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  CheckCircle2,
  Printer,
  PhoneCall,
  Bot,
  Building2,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const { db, lang, dict } = useApp();

  return (
    <div className="min-h-screen py-3 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 bg-[#eef3f8] dark:bg-brand-950">
      <div className="smart-container">
        {/* بطاقة التعريف الرئيسية للشركة */}
        <ScrollReveal>
          <div className="clean-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-4 sm:mb-6 relative overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
              <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold shadow-2xs">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{pickLang(db.settings.companyName, lang)}</span>
                </span>

                <h1 className="font-display font-extrabold text-xl sm:text-3xl lg:text-4xl text-[#0f2544] dark:text-white leading-tight">
                  {dict.whyUs.title}
                </h1>

                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  <SmartLinkedText text={dict.whyUs.subtitle} maxLinks={6} />
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  <SmartLinkedText text={dict.footer.aboutText} maxLinks={6} />
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1 max-w-md">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="h-11 sm:h-12 px-3 rounded-xl sm:rounded-2xl bg-[#11345C] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <Printer className="w-4 h-4 shrink-0 text-sky-300" />
                    <span className="truncate">
                      {lang === "ar" ? "بروفايل الشركة" : "Company Profile"}
                    </span>
                  </button>

                  <Link
                    href="/contact"
                    className="h-11 sm:h-12 px-3 rounded-xl sm:rounded-2xl bg-[#208EC1] hover:bg-[#1975a0] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 whitespace-nowrap"
                  >
                    <PhoneCall className="w-4 h-4 shrink-0" />
                    <span className="truncate">{dict.nav.requestQuote}</span>
                  </Link>
                </div>
              </div>

              {/* أرقام وإحصائيات الشركة: 4 بطاقات متناسقة 2x2 في الجوال */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    {
                      num: db.settings.stats.projectsCount,
                      label: dict.hero.statsProjects,
                    },
                    {
                      num: db.settings.stats.servicesCount,
                      label: dict.hero.statsServices,
                    },
                    {
                      num: db.settings.stats.partnersCount,
                      label: dict.hero.statsPartners,
                    },
                    {
                      num: db.settings.stats.warrantyYears,
                      label: dict.hero.statsWarranty,
                    },
                  ].map((st, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 text-center shadow-2xs"
                    >
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#208EC1] font-heading">
                        {st.num}
                      </p>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">
                        {st.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* الركائز الثلاث: الرؤية، الرسالة، الجودة والضمان */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
          <ScrollReveal>
            <div className="clean-card rounded-2xl p-4 sm:p-6 h-full shadow-xs">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center mb-3">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold font-heading text-slate-900 dark:text-white mb-1.5">
                {lang === "ar" ? "رؤيتنا المتوافقة مع 2030" : "Our Vision"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <SmartLinkedText
                  text={
                    lang === "ar"
                      ? "أن نكون الشريك الهندسي والإعلاني الأول في المملكة لتطوير المشهد الحضري، وتصنيع الأحرف البارزة، والكلادينج والزجاج السيكوريت، وأعمال الجبس والأسمنت بورد وفق أرقى المعايير."
                      : "To be Saudi Arabia's leading engineering and architectural branding partner aligned with Vision 2030 urban excellence."
                  }
                  maxLinks={5}
                />
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <div className="clean-card rounded-2xl p-4 sm:p-6 h-full shadow-xs">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center mb-3">
                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold font-heading text-slate-900 dark:text-white mb-1.5">
                {lang === "ar" ? "رسالتنا الهندسية" : "Our Mission"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <SmartLinkedText
                  text={
                    lang === "ar"
                      ? "تحويل هويات عملائنا إلى معالم معمارية ملموسة تشمل تجهيز المعارض وتسوير المشاريع والمظلات والاستيكرات وأنظمة السلامة والمراقبة بدقة متناهية والتزام بالجدول الزمني."
                      : "Transforming brand identities into durable architectural landmarks with precision manufacturing and on-time delivery."
                  }
                  maxLinks={5}
                />
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="clean-card rounded-2xl p-4 sm:p-6 h-full shadow-xs">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center mb-3">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold font-heading text-slate-900 dark:text-white mb-1.5">
                {lang === "ar" ? "التزامنا بالضمان والجودة" : "Quality & Warranty"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <SmartLinkedText
                  text={
                    lang === "ar"
                      ? "اعتماد خامات أصلية (أكريليك كوري، إضاءة IP68، كلادينج مقاوم للحريق، وزجاج سيكوريت 12 ملم) مع شهادة ضمان موثقة تصل إلى 10 سنوات لكافة أعمالنا المنفذة."
                      : "We exclusively use certified materials (Korean Acrylic, IP68 LEDs, FR Cladding, Tempered Glass) backed by up to 10 years of written warranty."
                  }
                  maxLinks={5}
                />
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* قسم الاعتمادات الهندسية ومطابقة الكود العمراني السعودي */}
        <ScrollReveal>
          <div className="clean-card rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3.5 sm:mb-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-sm sm:text-xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
                {lang === "ar"
                  ? "الاعتمادات الهندسية ومطابقة الكود العمراني السعودي"
                  : "Engineering Standards & Saudi Urban Code Compliance"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {[
                dict.whyUs.c1Desc,
                dict.whyUs.c2Desc,
                dict.whyUs.c3Desc,
                dict.whyUs.c4Desc,
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#208EC1] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                    <SmartLinkedText text={point} maxLinks={3} />
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {lang === "ar" ? "للتواصل المباشر:" : "Direct Contact:"}
                </span>{" "}
                <span dir="ltr">{db.settings.phone}</span> |{" "}
                <span>{db.settings.email}</span>
              </div>

              <Link
                href="/ai-engineer"
                className="inline-flex items-center gap-1.5 font-bold text-[#208EC1] hover:underline"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>
                  {lang === "ar"
                    ? "استشر المهندس الذكي حول مشروعك ←"
                    : "Consult AI Engineer →"}
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* كارت الهاشتاقات في أسفل الصفحة */}
        <div className="mt-6 sm:mt-10">
          <ExpandableHashtagsCard visibleCount={10} />
        </div>
      </div>
    </div>
  );
}
