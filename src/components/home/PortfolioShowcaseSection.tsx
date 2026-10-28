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
    <section className="py-16 lg:py-22 bg-slate-50/80 dark:bg-[#081529] border-t border-slate-200/70 dark:border-white/10 transition-colors">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.portfolioSection.eyebrow}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">
                {dict.portfolioSection.title}
              </h2>
              <p className="mt-2.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                {dict.portfolioSection.subtitle}
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-3.5 rounded-full bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              <span>{dict.portfolioSection.viewAllProjects}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Curved Pill Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#208EC1] text-white shadow-md shadow-[#208EC1]/25'
                : 'bg-white dark:bg-[#0d1f38] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#208EC1]'
            }`}
          >
            {dict.portfolioSection.allFilter} ({db.portfolio.length})
          </button>
          {db.services.map((srv) => {
            const count = db.portfolio.filter((p) => p.category === srv.id).length;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setActiveFilter(srv.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === srv.id
                    ? 'bg-[#208EC1] text-white shadow-md shadow-[#208EC1]/25'
                    : 'bg-white dark:bg-[#0d1f38] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#208EC1]'
                }`}
              >
                {tText(srv.shortName, lang)} ({count})
              </button>
            );
          })}
        </div>

        {/* Smart 4-column fluid grid on desktop/widescreen so cards never stretch! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, idx) => (
            <ScrollReveal key={item.id} delayMs={(idx % 4) * 40}>
              <article className="group h-full flex flex-col rounded-[28px] bg-white dark:bg-[#0d1f38] border border-slate-200/80 dark:border-white/10 overflow-hidden hover:border-[#208EC1] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="relative aspect-[4/3] bg-slate-900 overflow-hidden block"
                >
                  <img
                    src={item.type === 'video' ? item.poster || item.src : item.src}
                    alt={tText(item.alt, lang)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.type === 'video' && (
                    <span className="absolute top-3 start-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#208EC1] text-white text-xs font-bold shadow-md">
                      <Play className="w-3 h-3 fill-current" />
                      {dict.portfolioSection.videoBadge}
                    </span>
                  )}
                  <span className="absolute bottom-3 end-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    {tText(item.city, lang)}
                  </span>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-[#208EC1] transition-colors line-clamp-1">
                      <Link href={`/portfolio/${item.slug}`}>
                        {tText(item.title, lang)}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {tText(item.summary, lang)}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#11345C] dark:text-sky-300 hover:text-[#208EC1]"
                    >
                      <span>{dict.portfolioSection.projectDetails}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] text-slate-400 truncate max-w-[110px]">
                      {item.hashtags?.[0] || '#همم_غيم'}
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
