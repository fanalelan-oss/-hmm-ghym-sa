'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

function getSectorBadge(sector?: string, lang?: string) {
  if (sector === 'government') {
    return lang === 'ar' ? 'قطاع حكومي / وطني' : 'Government';
  }
  if (sector === 'healthcare') {
    return lang === 'ar' ? 'قطاع طبي / صحي' : 'Healthcare';
  }
  return lang === 'ar' ? 'قطاع تجاري / شركات' : 'Commercial';
}

export default function PartnersMarqueeSection() {
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-14 lg:py-18 bg-[#eef3f8] dark:bg-[#081529] border-y border-slate-200/80 dark:border-white/10 transition-colors overflow-hidden">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-extrabold mb-2.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.partnersSection.eyebrow}
              </span>
              <h2 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[28px] leading-snug text-slate-900 dark:text-white">
                {dict.partnersSection.title}
              </h2>
              <p className="mt-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl">
                {dict.partnersSection.subtitle}
              </p>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-2.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_24px_-6px_rgba(15,37,68,0.25)] transition-all hover:-translate-y-0.5 shrink-0"
            >
              <span>{dict.partnersSection.viewAllPartners}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Continuous Seamless Horizontal Marquee Train (Enlarged, Clear & Smooth) */}
      <div
        dir="ltr"
        className="relative w-full py-4 overflow-hidden select-none"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div className="animate-partners-train">
          {[0, 1].map((loopIndex) => (
            <div
              key={loopIndex}
              className="flex items-center gap-5 sm:gap-6 pr-5 sm:pr-6 shrink-0"
              aria-hidden={loopIndex === 1}
            >
              {db.partners.map((partner, pIdx) => {
                const logoSrc = partner.logo?.startsWith('/') ? partner.logo : `/${partner.logo}`;
                const partnerName = tText(partner.name, lang);
                const sectorLabel = getSectorBadge(partner.sector, lang);

                return (
                  <Link
                    key={`${loopIndex}-${partner.id}`}
                    href="/partners"
                    dir={dict.dir}
                    title={partnerName}
                    className="group relative w-[235px] sm:w-[270px] h-[166px] sm:h-[178px] rounded-[24px] p-3.5 sm:p-4 flex flex-col items-center justify-between shrink-0 bg-white/90 dark:bg-[#0c1d34]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/10 shadow-[0_4px_20px_rgba(15,37,68,0.06)] hover:shadow-[0_14px_34px_rgba(32,142,193,0.24)] hover:border-[#208EC1]/70 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Crisp Ultra-Clear Logo Box (Always clean pure white for contrast) */}
                    <div className="h-[96px] sm:h-[106px] w-full flex items-center justify-center bg-white rounded-2xl px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-slate-100 group-hover:border-sky-200/80 transition-colors">
                      <img
                        src={logoSrc}
                        alt={partnerName}
                        width={240}
                        height={100}
                        loading={loopIndex === 0 && pIdx < 8 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="max-h-[70px] sm:max-h-[78px] max-w-[185px] sm:max-w-[215px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-108 filter contrast-[1.03]"
                      />
                    </div>

                    {/* Partner Name & Sector Tag */}
                    <div className="w-full text-center mt-2">
                      <p className="text-xs sm:text-[13px] font-extrabold text-[#0f2544] dark:text-slate-100 line-clamp-1 group-hover:text-[#208EC1] transition-colors leading-tight">
                        {partnerName}
                      </p>
                      <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 group-hover:bg-[#208EC1]/10 group-hover:text-[#208EC1] transition-colors mt-1">
                        {sectorLabel}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
