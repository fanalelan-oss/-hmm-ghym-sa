"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import AutoMediaCarousel, { buildMediaSlides } from "@/components/common/AutoMediaCarousel";
import SmartLinkedText from "@/components/seo/SmartLinkedText";
import ExpandableHashtagsCard from "@/components/seo/ExpandableHashtagsCard";
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Bot,
  PhoneCall,
  Share2,
} from "lucide-react";

function resolveMediaSrc(raw?: string): string {
  if (!raw) return "";
  if (raw.startsWith("/") || raw.startsWith("http") || raw.startsWith("data:")) {
    return raw;
  }
  return `/${raw}`;
}

export default function PortfolioItemPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string" ? decodeURIComponent(params.slug) : "";
  const { db, lang, dict } = useApp();

  const project =
    db.portfolio.find((p) => p.slug === slug || p.id === slug) ||
    db.portfolio[0];

  const serviceObj = db.services.find((s) => s.id === project.category);

  const relatedProjects = db.portfolio
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  const BackIcon = lang === "en" ? ArrowLeft : ArrowRight;

  const cityText = pickLang(project.city, lang)?.trim();
  const durationText = pickLang(project.duration, lang)?.trim();
  const warrantyText = pickLang(project.warranty, lang)?.trim();
  const summaryText = pickLang(project.summary, lang)?.trim();
  const descriptionText = pickLang(project.description, lang)?.trim();

  // Prioritize project-specific specs entered in Admin over generic service features
  const projectSpecs: string[] =
    project.specs?.[lang] && project.specs[lang].length > 0
      ? project.specs[lang]
      : project.specs?.ar && project.specs.ar.length > 0
      ? project.specs.ar
      : [];

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#208EC1] hover:underline"
            >
              <BackIcon className="w-4 h-4" />
              {dict.portfolioSection.viewAllProjects}
            </Link>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{dict.nav.home}</span>
              <span>/</span>
              <span>{dict.nav.portfolio}</span>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold">
                {pickLang(project.title, lang)}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <AutoMediaCarousel
                slides={buildMediaSlides(project)}
                alt={pickLang(project.alt || project.title, lang)}
                mode="detail"
                imgClassName="w-full max-h-[580px] object-cover rounded-3xl"
              />
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="clean-card rounded-3xl p-7 sm:p-9 mt-8">
                <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3">
                  {dict.portfolioSection.projectDetails}
                </h2>

                {summaryText && summaryText !== descriptionText && (
                  <p className="text-sm font-bold text-[#208EC1] mb-3">
                    <SmartLinkedText text={summaryText} maxLinks={3} />
                  </p>
                )}

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base mb-6 whitespace-pre-line">
                  <SmartLinkedText text={descriptionText || summaryText} maxLinks={6} />
                </p>

                {projectSpecs.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mb-3.5">
                      {lang === "ar"
                        ? "المواصفات والتفاصيل المنفذة في هذا المشروع:"
                        : lang === "ur"
                        ? "اس منصوبے میں مکمل کی گئی تکنیکی تفصیلات:"
                        : "Executed Project Specifications:"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {projectSpecs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#208EC1] shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            <SmartLinkedText text={spec} maxLinks={2} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <ExpandableHashtagsCard
                    primaryTags={project.hashtags || []}
                    category={project.category}
                    variant="inline"
                    visibleCount={8}
                    lang={lang}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <ScrollReveal delay={150}>
              <div className="clean-card rounded-3xl p-7 sm:p-8">
                <Link
                  href={serviceObj ? `/services/${serviceObj.slug}` : "/services"}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#208EC1]/10 hover:bg-[#208EC1] text-[#208EC1] hover:text-white text-xs font-bold mb-4 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {serviceObj
                    ? pickLang(serviceObj.shortName || serviceObj.name, lang)
                    : project.category}
                </Link>

                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mb-6 leading-snug">
                  {pickLang(project.title, lang)}
                </h1>

                <div className="space-y-3 mb-8">
                  {cityText && (
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                        <MapPin className="w-4 h-4 text-[#208EC1]" />
                        <span>
                          {lang === "ar"
                            ? "المدينة / الموقع"
                            : lang === "ur"
                            ? "شہر"
                            : "Location"}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {cityText}
                      </span>
                    </div>
                  )}

                  {durationText && (
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                        <Clock className="w-4 h-4 text-[#208EC1]" />
                        <span>
                          {lang === "ar"
                            ? "مدة التنفيذ"
                            : lang === "ur"
                            ? "تکمیل کا وقت"
                            : "Execution Duration"}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {durationText}
                      </span>
                    </div>
                  )}

                  {warrantyText && (
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                        <ShieldCheck className="w-4 h-4 text-[#208EC1]" />
                        <span>
                          {lang === "ar"
                            ? "الضمان المعتمد"
                            : lang === "ur"
                            ? "وارنٹی"
                            : "Official Warranty"}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {warrantyText}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/contact?project=${encodeURIComponent(
                      pickLang(project.title, lang)
                    )}`}
                    className="w-full py-4 px-6 rounded-2xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <PhoneCall className="w-4 h-4" />
                    {lang === "ar"
                      ? "اطلب تنفيذ مشروع مماثل الآن"
                      : lang === "ur"
                      ? "اسی طرح کے پروجیکٹ کی کوٹیشن حاصل کریں"
                      : "Request a Similar Project Quote"}
                  </Link>

                  <Link
                    href={`/ai-engineer?ask=${encodeURIComponent(
                      lang === "ar"
                        ? `كم تكلفة ومواصفات تنفيذ مشروع مشابه لـ ${project.title.ar}؟`
                        : `What are the specs and cost for a project like ${project.title.en}?`
                    )}`}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#208EC1]/10 hover:bg-[#208EC1]/20 text-[#208EC1] font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    {lang === "ar"
                      ? "اسأل المهندس الذكي عن تكلفة هذا المشروع"
                      : lang === "ur"
                      ? "اسمارٹ انجینئر سے لاگت پوچھیں"
                      : "Ask AI Engineer About Project Cost"}
                  </Link>

                  <a
                    href={`https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
                      `مرحباً شركة همم غيم، أعجبني مشروع (${project.title.ar}) وأرغب في استشارة وعرض سعر لمشروع مماثل.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md shadow-emerald-500/20 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    {dict.nav.whatsapp}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <section className="mt-20 pt-14 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mb-8">
              {lang === "ar"
                ? "مشاريع أخرى ذات صلة"
                : lang === "ur"
                ? "متعلقہ منصوبے"
                : "Related Projects"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/portfolio/${rel.slug}`}
                  className="group clean-card rounded-3xl overflow-hidden block"
                >
                  <div className="h-56 overflow-hidden bg-slate-900">
                    <img
                      src={resolveMediaSrc(
                        rel.type === "video" ? rel.poster || rel.src : rel.src
                      )}
                      alt={pickLang(rel.alt || rel.title, lang)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-[#208EC1] font-bold">
                      {pickLang(rel.city, lang)}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#208EC1] transition-colors">
                      {pickLang(rel.title, lang)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
