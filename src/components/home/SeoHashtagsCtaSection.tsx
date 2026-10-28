'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Phone,
  Mail,
  Bot,
  Hash,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Calculator,
  Sparkles,
} from 'lucide-react';

export default function SeoHashtagsCtaSection() {
  const { dict, db, lang } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [tagsOpen, setTagsOpen] = useState(false);

  const allHashtags = Array.from(
    new Set([
      ...db.services.flatMap((s) => s.hashtags || []),
      '#شركة_همم_غيم',
      '#دعاية_وإعلان_الرياض',
      '#مقاولات_عامة_السعودية',
      '#تركيب_أحرف_بارزة_مضيئة',
      '#واجهات_كلادينج_ACP',
      '#مظلات_وسواتر_الرياض',
      '#تسوير_مشاريع_عقارية',
      '#تجهيز_معارض_ومؤتمرات',
      '#ديكورات_وتشطيبات_داخلية',
      '#زجاج_سيكوريت_وقواطع_مكاتب',
      '#كاميرات_مراقبة_وشبكات_إطفاء',
      '#لوحات_محلات_مطابقة_للبلدية',
      '#برجولات_حدائق_مودرن',
      '#تغليف_سيارات_واستيكرات',
    ])
  );

  return (
    <section className="py-16 lg:py-20 bg-slate-50 dark:bg-[#071324] border-t border-slate-200/70 dark:border-white/10 transition-colors">
      <div className="smart-container space-y-8">
        {/* Luxury Executive CTA Banner */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#09192f] via-[#11345C] to-[#195885] text-white p-8 sm:p-12 lg:p-14 border border-sky-400/25 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-sky-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'ar'
                  ? 'معاينة ميدانية ورفع مقاسات مجاني في موقعك'
                  : 'Complimentary Site Survey & Engineering Study'}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
                {dict.seoSection.ctaTitle}
              </h2>
              <p className="text-sky-100/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                {dict.seoSection.ctaDesc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-sky-300 font-bold">
                <a
                  href={`tel:${db.settings.phoneClean}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <Phone className="w-4 h-4 text-sky-300" />
                  {db.settings.phone}
                </a>
                <a
                  href={`mailto:${db.settings.email}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <Mail className="w-4 h-4 text-sky-300" />
                  {db.settings.email}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-center gap-3.5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 whitespace-nowrap px-7 py-4 rounded-full bg-[#208EC1] hover:bg-sky-400 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#208EC1]/30 transition-all"
              >
                <span>{dict.nav.requestQuote}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-4 rounded-full bg-white text-[#11345C] hover:bg-sky-50 font-extrabold text-sm sm:text-base shadow-md transition-all"
              >
                <Calculator className="w-4 h-4 text-[#208EC1]" />
                <span>{dict.nav.calculator}</span>
              </Link>
              <Link
                href="/ai-engineer"
                className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base transition-all"
              >
                <Bot className="w-5 h-5 text-sky-300" />
                <span>{dict.nav.aiEngineer}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Clean Collapsible SEO Keywords Accordion (Hidden visually by default, 100% indexed in DOM by Google!) */}
        <div className="rounded-3xl bg-white dark:bg-[#0b1b32] border border-slate-200/80 dark:border-white/10 overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setTagsOpen(!tagsOpen)}
            aria-expanded={tagsOpen}
            className="w-full px-6 py-4 flex items-center justify-between gap-4 text-start hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center shrink-0">
                <Hash className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  {dict.seoSection.eyebrow} ({allHashtags.length}+ وسم مفتاحي)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {tagsOpen
                    ? lang === 'ar'
                      ? 'اضغط لإغلاق فهرس الكلمات الدلالية'
                      : 'Click to collapse SEO keywords index'
                    : lang === 'ar'
                    ? 'اضغط هنا لفتح واستعراض الكلمات المفتاحية والخدمات الأكثر بحثاً في المملكة'
                    : 'Click to expand popular search keywords & tags'}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0">
              <span>
                {tagsOpen
                  ? lang === 'ar'
                    ? 'إخفاء الوسوم'
                    : 'Hide Tags'
                  : lang === 'ar'
                  ? 'عرض الوسوم'
                  : 'Show Tags'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  tagsOpen ? 'rotate-180 text-[#208EC1]' : ''
                }`}
              />
            </span>
          </button>

          {/* Kept in DOM for Google Spiders; collapsed visually when tagsOpen === false */}
          <div
            className={`transition-all duration-300 ${
              tagsOpen
                ? 'max-h-[900px] opacity-100 p-6 pt-2 border-t border-slate-100 dark:border-white/10 overflow-y-auto'
                : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
            }`}
          >
            <div className="flex flex-wrap gap-2 pt-3">
              {allHashtags.map((tag) => (
                <Link
                  key={tag}
                  href={`/portfolio?q=${encodeURIComponent(
                    tag.replace('#', '').replace(/_/g, ' ')
                  )}`}
                  className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-[#208EC1] hover:text-white text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
