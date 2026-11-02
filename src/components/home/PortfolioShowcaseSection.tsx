'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { ArrowLeft, ArrowRight, Play, MapPin, Sparkles } from 'lucide-react';

export default function PortfolioShowcaseSection() {
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Filtered projects: exactly 6 cards (1 per distinct service when 'all', or up to 6 of selected service)
  const filtered = useMemo(() => {
    if (activeFilter === 'all') {
      const pickedCategories = new Set<string>();
      const result: typeof db.portfolio = [];

      for (const item of db.portfolio) {
        if (!pickedCategories.has(item.category) && result.length < 6) {
          pickedCategories.add(item.category);
          result.push(item);
        }
      }
      if (result.length < 6) {
        for (const item of db.portfolio) {
          if (!result.some((r) => r.id === item.id) && result.length < 6) {
            result.push(item);
          }
        }
      }
      return result;
    }
    return db.portfolio.filter((p) => p.category === activeFilter).slice(0, 6);
  }, [activeFilter, db.portfolio]);

  const categories = useMemo(() => {
    return [
      {
        id: 'all',
        label: dict.portfolioSection.allFilter,
        count: db.portfolio.length,
      },
      ...db.services.map((srv) => ({
        id: srv.id,
        label: tText(srv.shortName, lang),
        count: db.portfolio.filter((p) => p.category === srv.id).length,
      })),
    ];
  }, [db.services, db.portfolio, dict.portfolioSection.allFilter, lang]);

  return (
    <section className="py-7 sm:py-12 lg:py-16 bg-[#eaf0f8] dark:bg-[#081529] border-t border-slate-300/70 dark:border-white/10 transition-colors">
      <div className="smart-container">
        {/* Section Header: Compact & Clean */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-xl mx-auto mb-3.5 sm:mb-6">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white dark:bg-[#0d1f38] border border-slate-300/80 dark:border-sky-400/25 text-[#208EC1] text-[11px] font-extrabold mb-1.5 shadow-xs">
              <Sparkles className="w-3 h-3" />
              {dict.portfolioSection.eyebrow}
            </span>
            <h2 className="heading-3d-section font-display font-extrabold text-lg sm:text-2xl lg:text-[24px] leading-snug">
              {dict.portfolioSection.title}
            </h2>
            <p className="mt-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-1 sm:line-clamp-none">
              {dict.portfolioSection.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Filter Tabs: 4 per row on mobile, compact and organized */}
        <ScrollReveal variant="fade-up" delayMs={50}>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3.5 sm:mb-6">
            {categories.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`w-[calc(25%-0.35rem)] sm:w-auto px-1 sm:px-3 py-1.5 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center ${
                    isActive
                      ? 'bg-[#208EC1] text-white shadow-sm ring-1 ring-[#208EC1] -translate-y-0.5'
                      : 'bg-white dark:bg-[#0c1d34] text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-white/10 hover:border-[#208EC1]'
                  }`}
                >
                  <span className="block text-[9.5px] sm:text-xs font-extrabold leading-tight truncate w-full">
                    {cat.label}
                  </span>
                  <span className="block text-[8px] sm:text-[9.5px] font-black opacity-80 mt-0.5">
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* MOBILE ONLY: 3-Column Responsive Grid (نظام شبكة 3 بطاقات متناسقة x سطرين = 6 بطاقات بالضبط) */}
        <div key={`mob-${activeFilter}`} className="grid grid-cols-3 gap-1.5 sm:hidden mb-4">
          {filtered.map((item, idx) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              style={{ animationDelay: `${idx * 40}ms` }}
              className="animate-card-cascade group rounded-xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-1 flex flex-col justify-between text-center transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:border-[#208EC1]/60 shadow-[0_4px_12px_rgba(15,37,68,0.05)]"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-lg bg-slate-900 overflow-hidden block shadow-inner mb-1">
                  <img
                    src={
                      (item.type === 'video' ? item.poster || item.src : item.src)?.startsWith('/')
                        ? item.type === 'video' ? item.poster || item.src : item.src
                        : `/${item.type === 'video' ? item.poster || item.src : item.src}`
                    }
                    alt={tText(item.alt, lang)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  {item.type === 'video' && (
                    <span className="absolute top-1 start-1 inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full bg-[#208EC1] text-white text-[7px] font-black shadow-sm">
                      <Play className="w-1.5 h-1.5 fill-current" />
                      <span>فيديو</span>
                    </span>
                  )}
                  <span className="absolute bottom-1 inset-x-1 inline-flex items-center justify-center gap-0.5 px-1 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-sky-200 text-[7.5px] font-extrabold truncate shadow-sm">
                    <MapPin className="w-1.5 h-1.5 text-[#208EC1] shrink-0" />
                    <span>{tText(item.city, lang)}</span>
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-[9.5px] leading-[1.25] text-[#0f2544] dark:text-white line-clamp-2 min-h-[24px] group-hover:text-[#208EC1] transition-colors">
                  {tText(item.title, lang)}
                </h3>
              </div>

              <div className="mt-1 pt-0.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-0.5 text-[8px] font-extrabold text-[#208EC1]">
                <span>{lang === 'ar' ? 'عرض العمل' : 'Details'}</span>
                <ArrowIcon className="w-2 h-2" />
              </div>
            </Link>
          ))}
        </div>

        {/* DESKTOP ONLY: 3-Column / 6-Card Grid with Expanded Details */}
        <div
          key={activeFilter}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6"
        >
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              style={{ animationDelay: `${idx * 50}ms` }}
              className="animate-card-cascade h-full"
            >
              <article className="floating-card group h-full flex flex-col rounded-[22px] overflow-hidden p-2.5">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="relative aspect-[4/3] rounded-[16px] bg-slate-900 overflow-hidden block shadow-inner"
                >
                  <img
                    src={
                      (item.type === 'video' ? item.poster || item.src : item.src)?.startsWith('/')
                        ? item.type === 'video' ? item.poster || item.src : item.src
                        : `/${item.type === 'video' ? item.poster || item.src : item.src}`
                    }
                    alt={tText(item.alt, lang)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
                  {item.type === 'video' && (
                    <span className="absolute top-3 start-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#208EC1] text-white text-[11px] font-extrabold shadow-md">
                      <Play className="w-3 h-3 fill-current" />
                      {dict.portfolioSection.videoBadge}
                    </span>
                  )}
                  <span className="absolute bottom-3 end-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-950/85 text-[#0f2544] dark:text-white text-[11px] font-extrabold shadow-md">
                    <MapPin className="w-3 h-3 text-[#208EC1]" />
                    {tText(item.city, lang)}
                  </span>
                </Link>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-[#0f2544] dark:text-white group-hover:text-[#208EC1] transition-colors line-clamp-1">
                      <Link href={`/portfolio/${item.slug}`}>
                        {tText(item.title, lang)}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {tText(item.summary, lang)}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#11345C] dark:text-sky-300 hover:text-[#208EC1]"
                    >
                      <span>{dict.portfolioSection.projectDetails}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 truncate max-w-[115px]">
                      {item.hashtags?.[0] || '#همم_غيم'}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* BOTTOM BUTTON: تصفح كل المشاريع - تحت الست بطاقات مباشرة */}
        <ScrollReveal variant="fade-up" delayMs={100}>
          <div className="flex justify-center pt-1 sm:pt-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm shadow-[0_12px_24px_-6px_rgba(15,37,68,0.3)] transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <span>{dict.portfolioSection.viewAllProjects}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/15 text-[11px] font-bold">
                +{db.portfolio.length}
              </span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
