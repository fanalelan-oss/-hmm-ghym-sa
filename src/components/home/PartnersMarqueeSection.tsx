'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function PartnersMarqueeSection() {
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 lg:py-22 bg-slate-50/80 dark:bg-[#081529] border-y border-slate-200/70 dark:border-white/10 transition-colors">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.partnersSection.eyebrow}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">
                {dict.partnersSection.title}
              </h2>
              <p className="mt-2.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                {dict.partnersSection.subtitle}
              </p>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-3.5 rounded-full bg-white dark:bg-[#0d1f38] border border-slate-200 dark:border-white/15 text-[#11345C] dark:text-white font-bold text-xs sm:text-sm hover:border-[#208EC1] transition-all shrink-0"
            >
              <span>{dict.partnersSection.viewAllPartners}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Smart 6-column fluid partner grid on widescreen so cards stay compact and crisp */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5">
          {db.partners.map((partner, idx) => (
            <ScrollReveal key={partner.id} delayMs={idx * 30}>
              <div className="group h-36 rounded-[24px] bg-white dark:bg-[#0d1f38] border border-slate-200/80 dark:border-white/10 p-4 flex flex-col items-center justify-center gap-2.5 hover:border-[#208EC1] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-16 flex items-center justify-center bg-white rounded-xl px-3 py-1.5 w-full">
                  <img
                    src={partner.logo}
                    alt={tText(partner.name, lang)}
                    className="max-h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 text-center line-clamp-1">
                  {tText(partner.name, lang)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
