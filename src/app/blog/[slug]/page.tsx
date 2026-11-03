"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import SmartLinkedText from "@/components/seo/SmartLinkedText";
import ExpandableHashtagsCard from "@/components/seo/ExpandableHashtagsCard";
import {
  Calendar,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  Bot,
  Layers,
} from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string" ? decodeURIComponent(params.slug) : "";
  const { db, lang } = useApp();

  const post =
    (db.blogPosts || []).find((b) => b.slug === slug) || db.blogPosts[0];
  const BackIcon = lang === "en" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#208EC1] hover:underline"
            >
              <BackIcon className="w-4 h-4" />
              {lang === "ar"
                ? "العودة إلى الدليل الهندسي والمقالات"
                : "Back to Engineering Guides"}
            </Link>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/" className="hover:underline">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:underline">
                {lang === "ar" ? "المدونة" : "Blog"}
              </Link>
              <span>/</span>
              <span className="text-[#208EC1] font-bold line-clamp-1 max-w-[200px]">
                {pickLang(post.title, lang)}
              </span>
            </div>
          </div>

          <article className="clean-card rounded-3xl overflow-hidden shadow-lg">
            <div className="h-72 sm:h-96 overflow-hidden bg-slate-900 relative">
              <img
                src={post.image}
                alt={pickLang(post.title, lang)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 inset-x-6 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#208EC1] text-xs font-bold mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight">
                  {pickLang(post.title, lang)}
                </h1>
              </div>
            </div>

            <div className="p-7 sm:p-10 space-y-8">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed pb-6 border-b border-slate-100 dark:border-slate-800">
                <SmartLinkedText text={pickLang(post.excerpt, lang)} maxLinks={4} />
              </p>

              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-200 leading-loose text-base whitespace-pre-line">
                <SmartLinkedText text={pickLang(post.content, lang)} maxLinks={10} />
              </div>

              {/* Quick Internal Links to All 10 Engineering Departments */}
              <div className="p-5 rounded-2xl bg-[#f4f7fb] dark:bg-brand-950 border border-slate-200/80 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#208EC1]">
                  <Layers className="w-4 h-4" />
                  <span>
                    {lang === "ar"
                      ? "تصفح أقسامنا الهندسية وخدماتنا ذات الصلة:"
                      : "Explore Our Related Engineering Departments:"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {db.services.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0c1d34] hover:bg-[#208EC1] hover:text-white border border-slate-200/80 dark:border-white/10 text-xs font-bold text-[#0f2544] dark:text-slate-200 transition-colors"
                    >
                      {pickLang(s.shortName || s.name, lang)}
                    </Link>
                  ))}
                  <Link
                    href="/portfolio"
                    className="px-3 py-1.5 rounded-xl bg-[#0f2544] hover:bg-[#208EC1] text-white text-xs font-bold transition-colors"
                  >
                    {lang === "ar" ? "معرض الأعمال المنفذة ←" : "View Portfolio →"}
                  </Link>
                </div>
              </div>

              {/* Expandable Mega SEO Hashtags Card */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <ExpandableHashtagsCard
                  primaryTags={post.hashtags || []}
                  category={post.category}
                  variant="inline"
                  visibleCount={8}
                  lang={lang}
                />
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#11345C] to-[#208EC1] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-xl font-bold font-heading mb-1">
                    {lang === "ar"
                      ? "هل ترغب في تطبيق هذه المواصفات في مشروعك القادم؟"
                      : "Ready to apply these engineering standards to your project?"}
                  </h2>
                  <p className="text-xs sm:text-sm text-sky-100">
                    {lang === "ar"
                      ? "تواصل مع مهندسينا لمعاينة موقعك مجاناً أو استشر المهندس الذكي الآن."
                      : "Request a free site survey or consult our AI Engineer immediately."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <Link
                    href="/contact"
                    className="px-5 py-3 rounded-2xl bg-white text-[#11345C] font-bold text-xs sm:text-sm flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    {lang === "ar" ? "اطلب عرض سعر" : "Get a Quote"}
                  </Link>
                  <Link
                    href="/ai-engineer"
                    className="px-5 py-3 rounded-2xl bg-white/15 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/25"
                  >
                    <Bot className="w-4 h-4" />
                    {lang === "ar" ? "اسأل المهندس الذكي" : "Ask AI Engineer"}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </div>
  );
}
