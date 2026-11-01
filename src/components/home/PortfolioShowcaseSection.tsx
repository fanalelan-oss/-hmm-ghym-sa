'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { ArrowLeft, ArrowRight, Play, MapPin, Sparkles } from 'lucide-react';

export default function PortfolioShowcaseSection() {
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered =
    activeFilter === 'all'
      ? db.portfolio.slice(0, 12)
      : db.portfolio.filter((p) => p.category === activeFilter).slice(0, 12);

  return (
    <section className="py-14 lg:py-16 bg-[#eaf0f8] dark:bg-[#081529] border-t border-slate-300/70 dark:border-white/10 transition-colors">
      <div className="smart-container">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-[#0d1f38] border border-slate-300/80 dark:border-sky-400/25 text-[#208EC1] text-xs font-extrabold mb-2.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.portfolioSection.eyebrow}
              </span>
              <h2 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug">
                {dict.portfolioSection.title}
              </h2>
              <p className="mt-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                {dict.portfolioSection.subtitle}
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm shadow-[0_12px_26px_-6px_rgba(15,37,68,0.3)] transition-all hover:-translate-y-0.5 shrink-0"
            >
              <span>{dict.portfolioSection.viewAllProjects}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Animated Category Filter Tabs */}
        <ScrollReveal variant="fade-up" delayMs={60}>
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-[#208EC1] text-white shadow-[0_10px_24px_-6px_rgba(32,142,193,0.45)] -translate-y-0.5 scale-[1.03]'
                  : 'bg-white dark:bg-[#0d1f38] text-slate-700 dark:text-slate-200 border border-slate-300/90 dark:border-sky-400/20 shadow-sm hover:border-[#208EC1] hover:-translate-y-0.5'
              }`}
            >
              {dict.portfolioSection.allFilter} ({db.portfolio.length})
            </button>
            {db.services.map((srv) => {
              const count = db.portfolio.filter(
                (p) => p.category === srv.id
              ).length;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setActiveFilter(srv.id)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
                    activeFilter === srv.id
                      ? 'bg-[#208EC1] text-white shadow-[0_10px_24px_-6px_rgba(32,142,193,0.45)] -translate-y-0.5 scale-[1.03]'
                      : 'bg-white dark:bg-[#0d1f38] text-slate-700 dark:text-slate-200 border border-slate-300/90 dark:border-sky-400/20 shadow-sm hover:border-[#208EC1] hover:-translate-y-0.5'
                  }`}
                >
                  {tText(srv.shortName, lang)} ({count})
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* MOBILE ONLY: 3-Column Responsive Grid (نظام شبكة 3 بطاقات متناسقة) */}
        <div key={`mob-${activeFilter}`} className="grid grid-cols-3 gap-2 sm:hidden mb-8">
          {filtered.map((item, idx) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              style={{ animationDelay: `${idx * 40}ms` }}
              className="animate-card-cascade group rounded-2xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-1.5 flex flex-col justify-between text-center transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:border-[#208EC1]/60 shadow-[0_4px_14px_rgba(15,37,68,0.06)]"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl bg-slate-900 overflow-hidden block shadow-inner mb-1.5">
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
                    <span className="absolute top-1 start-1 inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full bg-[#208EC1] text-white text-[7.5px] font-black shadow-sm">
                      <Play className="w-2 h-2 fill-current" />
                      <span>فيديو</span>
                    </span>
                  )}
                  <span className="absolute bottom-1 inset-x-1 inline-flex items-center justify-center gap-0.5 px-1 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-sky-200 text-[8px] font-extrabold truncate shadow-sm">
                    <MapPin className="w-2 h-2 text-[#208EC1] shrink-0" />
                    <span>{tText(item.city, lang)}</span>
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-[10.5px] leading-[1.25] text-[#0f2544] dark:text-white line-clamp-2 min-h-[26px] group-hover:text-[#208EC1] transition-colors">
                  {tText(item.title, lang)}
                </h3>
              </div>

              <div className="mt-1 pt-1 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-0.5 text-[8.5px] font-extrabold text-[#208EC1]">
                <span>{lang === 'ar' ? 'عرض العمل' : 'Details'}</span>
                <ArrowIcon className="w-2.5 h-2.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* DESKTOP ONLY: 4-Column Grid with Expanded Details */}
        <div
          key={activeFilter}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              style={{ animationDelay: `${idx * 55}ms` }}
              className="animate-card-cascade h-full"
            >
              <article className="floating-card group h-full flex flex-col rounded-[24px] overflow-hidden p-2.5">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="relative aspect-[4/3] rounded-[18px] bg-slate-900 overflow-hidden block shadow-inner"
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

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
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

                  <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
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
      </div>
    </section>
  );
}
