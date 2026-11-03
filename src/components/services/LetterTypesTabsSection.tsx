'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import AutoMediaCarousel, { buildMediaSlides } from '@/components/common/AutoMediaCarousel';
import SmartLinkedText from '@/components/seo/SmartLinkedText';
import {
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Layers,
  LayoutGrid,
} from 'lucide-react';

export default function LetterTypesTabsSection() {
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  const letterTypes = db.letterTypes || [];
  const [activeTabId, setActiveTabId] = useState<string>(
    letterTypes[0]?.id || 'front-lit'
  );
  const [viewMode, setViewMode] = useState<'tabs' | 'grid'>('tabs');

  if (letterTypes.length === 0) return null;

  const activeType =
    letterTypes.find((lt) => lt.id === activeTabId) || letterTypes[0];
  const activeIdx = letterTypes.findIndex((lt) => lt.id === activeType.id);

  return (
    <section
      id="letter-types-tabs"
      className="smart-container pt-4 scroll-mt-24"
    >
      <div className="rounded-3xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-5 sm:p-8 shadow-[0_14px_38px_-12px_rgba(15,37,68,0.08)]">
        {/* Header + View Mode Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-1.5 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'ar'
                ? 'دليل وتبويبات أنواع الأحرف البارزة الـ 8'
                : lang === 'ur'
                ? 'تھری ڈی نمایاں حروف کی 8 اقسام'
                : 'Interactive Guide: 8 Types of 3D Signage Letters'}
            </span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#0f2544] dark:text-white leading-snug">
              {lang === 'ar'
                ? 'اختر نوع الحرف البارز المناسب لواجهة مشروعك'
                : lang === 'ur'
                ? 'اپنے منصوبے کے لیے موزوں تھری ڈی حروف کی قسم منتخب کریں'
                : 'Explore the 8 Types of 3D Channel Letters We Manufacture'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'تصفح التبويبات لمشاهدة صور حقيقية من تنفيذنا لكل نوع من أنواع الحروف البارزة ومواصفاته الفنية وطريقة إضاءته.'
                : lang === 'ur'
                ? 'ہر قسم کے تھری ڈی حروف کی تصاویر، تکنیکی خصوصیات اور روشنی کا طریقہ کار دیکھنے کے لیے ٹیبز پر کلک کریں۔'
                : 'Switch between tabs to inspect real executed examples, technical materials, and LED illumination specs for each letter type.'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start lg:self-auto bg-[#eef3f8] dark:bg-[#081529] p-1 rounded-xl border border-slate-200/80 dark:border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('tabs')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                viewMode === 'tabs'
                  ? 'bg-[#0f2544] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#0f2544] dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'عرض التبويبات التفاعلي'
                  : lang === 'ur'
                  ? 'انٹرایکٹو ٹیبز'
                  : 'Interactive Tabs'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#0f2544] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#0f2544] dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'عرض الـ 8 أنواع معاً'
                  : lang === 'ur'
                  ? 'تمام 8 اقسام'
                  : 'All 8 Grid'}
              </span>
            </button>
          </div>
        </div>

        {/* 8 Interactive Type Tabs Bar */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {letterTypes.map((lt: any, idx: number) => {
            const isActive = lt.id === activeType.id && viewMode === 'tabs';
            const tabLabel = lt.shortTab
              ? tText(lt.shortTab, lang)
              : tText(lt.name, lang);
            return (
              <button
                key={lt.id}
                type="button"
                onClick={() => {
                  setActiveTabId(lt.id);
                  setViewMode('tabs');
                }}
                className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-extrabold whitespace-nowrap border transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-[#208EC1] text-white border-[#208EC1] shadow-[0_8px_20px_-6px_rgba(32,142,193,0.45)] -translate-y-0.5'
                    : 'bg-[#f4f7fb] dark:bg-[#081529] text-[#0f2544] dark:text-slate-200 border-slate-200/90 dark:border-white/10 hover:border-[#208EC1]/60 hover:text-[#208EC1]'
                }`}
              >
                <span
                  className={`text-[11px] font-black ${
                    isActive ? 'text-sky-100' : 'text-[#208EC1]'
                  }`}
                >
                  0{idx + 1}
                </span>
                <span>{tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area: Interactive Tab Spotlight OR 8-Card Grid */}
        {viewMode === 'tabs' ? (
          <div
            key={activeType.id}
            className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#f4f7fb] dark:bg-[#081529]/90 rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-white/10"
          >
            {/* Media Showcase with Auto-Flipping Executed Photos */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/80 dark:border-white/10 shadow-lg">
                <AutoMediaCarousel
                  slides={buildMediaSlides(activeType)}
                  alt={tText(activeType.name, lang)}
                  mode="card"
                  intervalMs={3200}
                  imgClassName="w-full h-full object-cover"
                />
                <span className="absolute top-3 start-3 z-20 px-3 py-1 rounded-full bg-[#0f2544]/90 backdrop-blur-xs text-white text-[11px] font-extrabold shadow-md">
                  {lang === 'ar'
                    ? `النوع 0${activeIdx + 1} من 08`
                    : `Type 0${activeIdx + 1} / 08`}
                </span>
              </div>
            </div>

            {/* Technical Details & CTA */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#208EC1]/15 text-[#208EC1] text-xs font-extrabold">
                  {activeType.shortTab
                    ? tText(activeType.shortTab, lang)
                    : tText(activeType.name, lang)}
                </span>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  {lang === 'ar'
                    ? 'تصنيع مباشر في مصنعنا بالرياض'
                    : lang === 'ur'
                    ? 'ریاض فیکٹری میں براہ راست تیاری'
                    : 'Direct In-House Factory Production'}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#0f2544] dark:text-white">
                {tText(activeType.name, lang)}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <SmartLinkedText text={tText(activeType.desc, lang)} maxLinks={4} />
              </p>

              {/* Specs Box */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#208EC1]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'المواصفات الفنية والخامات المعتمدة:'
                      : lang === 'ur'
                      ? 'تکنیکی خصوصیات اور میٹریل:'
                      : 'Approved Technical Specifications:'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#0f2544] dark:text-slate-100">
                  <SmartLinkedText text={tText(activeType.specs, lang)} maxLinks={3} />
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/contact?service=signage&letterType=${encodeURIComponent(
                    tText(activeType.name, lang)
                  )}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2544] hover:bg-[#208EC1] text-white text-xs sm:text-sm font-extrabold shadow-md transition-all"
                >
                  <span>
                    {lang === 'ar'
                      ? 'اطلب تسعير هذا النوع من الحروف'
                      : lang === 'ur'
                      ? 'اس قسم کی قیمت معلوم کریں'
                      : 'Request Quote for This Letter Type'}
                  </span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="/portfolio?category=signage"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0c1d34] border border-slate-300 dark:border-white/15 text-[#0f2544] dark:text-white hover:border-[#208EC1] text-xs sm:text-sm font-bold transition-all"
                >
                  <span>
                    {lang === 'ar'
                      ? 'مشاهدة أعمال الأحرف البارزة'
                      : lang === 'ur'
                      ? 'تھری ڈی حروف کے منصوبے دیکھیں'
                      : 'View 3D Letters Portfolio'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* 8-Card Grid View of all Letter Types */
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {letterTypes.map((lt: any, idx: number) => (
              <article
                key={lt.id}
                onClick={() => {
                  setActiveTabId(lt.id);
                  setViewMode('tabs');
                }}
                className="cursor-pointer group rounded-2xl bg-[#f4f7fb] dark:bg-[#081529] border border-slate-200/90 dark:border-white/10 hover:border-[#208EC1] p-2 flex flex-col justify-between transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl bg-slate-950 overflow-hidden">
                    <AutoMediaCarousel
                      slides={buildMediaSlides(lt)}
                      alt={tText(lt.name, lang)}
                      mode="card"
                      imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 start-2.5 z-20 text-white font-display font-black text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <h3 className="font-display font-extrabold text-xs sm:text-sm text-[#0f2544] dark:text-white group-hover:text-[#208EC1] line-clamp-1">
                      {tText(lt.name, lang)}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {tText(lt.desc, lang)}
                    </p>
                  </div>
                </div>
                <div className="px-2.5 pb-2 pt-1.5 border-t border-slate-200/60 dark:border-white/10">
                  <p className="text-[10.5px] font-bold text-[#208EC1] line-clamp-1">
                    {tText(lt.specs, lang)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
