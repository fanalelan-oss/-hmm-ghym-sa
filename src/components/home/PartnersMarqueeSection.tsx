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
    <section className="py-14 lg:py-16 bg-[#eef3f8] dark:bg-[#081529] border-y border-slate-200/80 dark:border-white/10 transition-colors overflow-hidden">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-extrabold mb-2.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.partnersSection.eyebrow}
              </span>
              <h2 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug">
                {dict.partnersSection.title}
              </h2>
              <p className="mt-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                {dict.partnersSection.subtitle}
              </p>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_24px_-6px_rgba(15,37,68,0.25)] transition-all hover:-translate-y-0.5 shrink-0"
            >
              <span>{dict.partnersSection.viewAllPartners}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Continuous Seamless Horizontal Marquee Train */}
      <div
        dir="ltr"
        className="relative w-full py-2.5 overflow-hidden select-none"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        }}
      >
        <div className="animate-partners-train">
          {[0, 1].map((loopIndex) => (
            <div
              key={loopIndex}
              className="flex items-center gap-5 pr-5 shrink-0"
              aria-hidden={loopIndex === 1}
            >
              {db.partners.map((partner) => (
                <Link
                  key={`${loopIndex}-${partner.id}`}
                  href="/partners"
                  dir={dict.dir}
                  className="floating-card group w-[200px] sm:w-[225px] h-[128px] rounded-[22px] p-4 flex flex-col items-center justify-center gap-2.5 shrink-0"
                >
                  <div className="h-14 w-full flex items-center justify-center bg-[#f8fafc] dark:bg-white rounded-xl px-3 py-1.5 border border-slate-100">
                    <img
                      src={partner.logo?.startsWith('/') ? partner.logo : `/${partner.logo}`}
                      alt={tText(partner.name, lang)}
                      className="max-h-11 max-w-[135px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs font-extrabold text-[#0f2544] dark:text-slate-100 text-center line-clamp-1 group-hover:text-[#208EC1] transition-colors">
                    {tText(partner.name, lang)}
                  </p>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
