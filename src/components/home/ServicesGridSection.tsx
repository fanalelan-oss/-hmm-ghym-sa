'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import ScrollReveal from '@/components/layout/ScrollReveal';
import AutoMediaCarousel, { buildMediaSlides } from '@/components/common/AutoMediaCarousel';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function ServicesGridSection() {
  const { lang, dict, db } = useApp();
  const router = useRouter();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-14 lg:py-16 bg-[#eef3f8] dark:bg-[#081529] border-y border-slate-200/80 dark:border-white/10 transition-colors">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-extrabold mb-2.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.servicesSection.eyebrow}
              </span>
              <h2 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug">
                {dict.servicesSection.title}
              </h2>
              <p className="mt-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                {dict.servicesSection.subtitle}
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_24px_-6px_rgba(15,37,68,0.25)] transition-all hover:-translate-y-0.5 shrink-0"
            >
              <span>{dict.servicesSection.viewAll}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* MOBILE ONLY: 3 Cards per Row Responsive Grid (نظام شبكة 3 بطاقات متناسقة) */}
        <div className="grid grid-cols-3 gap-2 sm:hidden">
          {db.services.map((service, idx) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group rounded-2xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-1.5 flex flex-col justify-between text-center transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:border-[#208EC1]/60 shadow-[0_4px_14px_rgba(15,37,68,0.06)]"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 mb-1.5 shadow-inner">
                  <AutoMediaCarousel
                    slides={buildMediaSlides(service)}
                    alt={tText(service.name, lang)}
                    mode="card"
                    imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-1.5 start-2 z-20 text-white font-display font-black text-[10px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="absolute bottom-1 inset-x-1 px-1 py-0.5 rounded-md bg-[#208EC1]/90 backdrop-blur-xs text-white text-[8px] font-extrabold truncate text-center shadow-sm">
                    {tText(service.shortName, lang)}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-[10.5px] leading-[1.25] text-[#0f2544] dark:text-white line-clamp-2 min-h-[26px] group-hover:text-[#208EC1] transition-colors">
                  {tText(service.name, lang)}
                </h3>
              </div>

              <div className="mt-1 pt-1 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-0.5 text-[8.5px] font-extrabold text-[#208EC1]">
                <span>{lang === 'ar' ? 'استكشف' : lang === 'ur' ? 'تفصیلات دیکھیں' : 'Explore'}</span>
                <ArrowIcon className="w-2.5 h-2.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* DESKTOP ONLY: 5-Column Grid with Full Clickable Cards */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {db.services.map((service, idx) => (
            <ScrollReveal key={service.id} delayMs={idx * 40}>
              <article
                role="link"
                tabIndex={0}
                onClick={() => router.push(`/services/${service.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    router.push(`/services/${service.slug}`);
                  }
                }}
                className="cursor-pointer floating-card group h-full flex flex-col rounded-[22px] overflow-hidden p-2 select-none"
              >
                <div className="relative aspect-[16/10] rounded-[16px] overflow-hidden bg-slate-900 block">
                  <AutoMediaCarousel
                    slides={buildMediaSlides(service)}
                    alt={tText(service.name, lang)}
                    mode="card"
                    imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2544]/85 via-[#0f2544]/15 to-transparent pointer-events-none" />
                  <span className="absolute top-2 start-2.5 z-20 text-white font-display font-black text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#208EC1] text-white text-[10.5px] font-bold shadow-sm">
                      {tText(service.shortName, lang)}
                    </span>
                  </span>
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-[#0f2544] dark:text-white group-hover:text-[#208EC1] transition-colors line-clamp-1">
                      {tText(service.shortName, lang)}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {tText(service.tagline, lang)}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-extrabold text-[#208EC1]">
                    <span>{dict.servicesSection.exploreService}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
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
