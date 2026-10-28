"use client";

import React from "react";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
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
} from "lucide-react";

export default function AboutPage() {
  const { db, lang, dict } = useApp();

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="smart-container">
        <ScrollReveal>
          <div className="clean-card rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-bold">
                  <Building2 className="w-4 h-4" />
                  {pickLang(db.settings.companyName, lang)}
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
                  {dict.whyUs.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {dict.whyUs.subtitle}
                </p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {dict.footer.aboutText}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3.5 rounded-2xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md"
                  >
                    <Printer className="w-4 h-4" />
                    {lang === "ar"
                      ? "طباعة البروفايل التعريفي للشركة (PDF)"
                      : "Print Company Profile (PDF)"}
                  </button>
                  <Link
                    href="/contact"
                    className="px-6 py-3.5 rounded-2xl border border-[#208EC1] text-[#208EC1] hover:bg-[#208EC1] hover:text-white font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    {dict.nav.requestQuote}
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-4">
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
                      className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 text-center"
                    >
                      <p className="text-3xl sm:text-4xl font-extrabold text-[#208EC1] font-heading">
                        {st.num}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mt-2">
                        {st.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
          <ScrollReveal>
            <div className="clean-card rounded-3xl p-8 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                {lang === "ar" ? "رؤيتنا المتوافقة مع 2030" : "Our Vision"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === "ar"
                  ? "أن نكون الشريك الهندسي والإعلاني الأول في المملكة العربية السعودية لتطوير المشهد الحضري والواجهات التجارية والمشاريع الوطنية بأعلى معايير الابتكار والاستدامة."
                  : "To be Saudi Arabia's leading engineering and architectural branding partner aligned with Vision 2030 urban excellence."}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="clean-card rounded-3xl p-8 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                {lang === "ar" ? "رسالتنا الهندسية" : "Our Mission"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === "ar"
                  ? "تحويل أفكار عملائنا وهوياتهم البصرية إلى واقع معماري ملموس يجمع بين المتانة الإنشائية، الدقة الجمالية، والالتزام الصارم بمواعيد التسليم."
                  : "Transforming brand identities into durable architectural landmarks with precision manufacturing and on-time delivery."}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div className="clean-card rounded-3xl p-8 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                {lang === "ar" ? "التزامنا بالضمان والجودة" : "Quality & Warranty"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === "ar"
                  ? "نستخدم خامات أصلية معتمدة (أكريليك كوري، إضاءة LED كورية IP68، كلادينج مقاوم للحريق FR، وأقمشة PVC ألمانية) مع ضمان رسمي مكتوب يصل إلى 10 سنوات."
                  : "We exclusively use certified materials (Korean Acrylic, IP68 LEDs, FR Cladding, German PVC) backed by up to 10 years of written warranty."}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="clean-card rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-7 h-7 text-[#208EC1]" />
              <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
                {lang === "ar"
                  ? "الاعتمادات الهندسية ومطابقة الكود العمراني السعودي"
                  : "Engineering Standards & Saudi Urban Code Compliance"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                dict.whyUs.c1Desc,
                dict.whyUs.c2Desc,
                dict.whyUs.c3Desc,
                dict.whyUs.c4Desc,
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#208EC1] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white">
                  {lang === "ar" ? "للتواصل المباشر:" : "Direct Contact:"}
                </span>{" "}
                <span dir="ltr">{db.settings.phone}</span> |{" "}
                <span>{db.settings.email}</span>
              </div>

              <Link
                href="/ai-engineer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#208EC1] hover:underline"
              >
                <Bot className="w-4 h-4" />
                {lang === "ar"
                  ? "استشر المهندس الذكي حول مشروعك ←"
                  : "Consult AI Engineer →"}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
