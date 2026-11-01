'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function ServicesGridSection() {
  const { lang, dict, db } = useApp();
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
                  <img
                    src={service.coverImage?.startsWith('/') ? service.coverImage : `/${service.coverImage}`}
                    alt={tText(service.name, lang)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-1 start-1 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm text-white font-display font-black text-[9px] flex items-center justify-center shadow-sm">
                    0{idx + 1}
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
                <span>{lang === 'ar' ? 'استكشف' : 'Explore'}</span>
                <ArrowIcon className="w-2.5 h-2.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* DESKTOP ONLY: 4-Column Grid with Full Expanded Content */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {db.services.map((service, idx) => (
            <ScrollReveal key={service.id} delayMs={idx * 40}>
              <article className="floating-card group h-full flex flex-col rounded-[24px] overflow-hidden p-2.5">
                <Link
                  href={`/services/${service.slug}`}
                  className="relative aspect-[16/10] rounded-[18px] overflow-hidden bg-slate-900 block"
                >
                  <img
                    src={service.coverImage?.startsWith('/') ? service.coverImage : `/${service.coverImage}`}
                    alt={tText(service.name, lang)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2544]/85 via-[#0f2544]/15 to-transparent" />
                  <span className="absolute top-3 start-3 w-7 h-7 rounded-full bg-white/95 text-[#0f2544] font-display font-black text-xs flex items-center justify-center shadow-sm">
                    0{idx + 1}
                  </span>
                  <span className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#208EC1] text-white text-[11px] font-bold shadow-sm">
                      {tText(service.shortName, lang)}
                    </span>
                  </span>
                </Link>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0f2544] dark:text-white group-hover:text-[#208EC1] transition-colors">
                      <Link href={`/services/${service.slug}`}>
                        {tText(service.name, lang)}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {tText(service.tagline, lang)}
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {(service.features[lang] || service.features.ar)
                        .slice(0, 2)
                        .map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                          >
                            <Check className="w-3.5 h-3.5 text-[#208EC1] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0f2544] dark:text-sky-300 hover:text-[#208EC1]"
                    >
                      <span>{dict.servicesSection.exploreService}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/contact?service=${encodeURIComponent(
                        tText(service.name, lang)
                      )}`}
                      className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#eef3f8] dark:bg-white/10 hover:bg-[#208EC1] hover:text-white text-[#0f2544] dark:text-slate-200 text-xs font-bold transition-colors"
                    >
                      {dict.servicesSection.requestService}
                    </Link>
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
