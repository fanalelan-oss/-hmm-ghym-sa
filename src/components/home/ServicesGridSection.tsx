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
    <section className="py-16 lg:py-22 bg-slate-50/80 dark:bg-[#081529] border-y border-slate-200/70 dark:border-white/10 transition-colors">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.servicesSection.eyebrow}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">
                {dict.servicesSection.title}
              </h2>
              <p className="mt-2.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                {dict.servicesSection.subtitle}
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-3.5 rounded-full bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              <span>{dict.servicesSection.viewAll}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Smart 4-column grid: 8 services form 2 balanced rows on desktop/widescreen without stretching */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {db.services.map((service, idx) => (
            <ScrollReveal key={service.id} delayMs={idx * 40}>
              <article className="group h-full flex flex-col rounded-[28px] bg-white dark:bg-[#0d1f38] border border-slate-200/80 dark:border-white/10 overflow-hidden hover:border-[#208EC1] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <Link
                  href={`/services/${service.slug}`}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 block"
                >
                  <img
                    src={service.coverImage}
                    alt={tText(service.name, lang)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3.5 start-3.5 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md text-white font-display font-extrabold text-xs flex items-center justify-center border border-white/20">
                    0{idx + 1}
                  </span>
                  <span className="absolute bottom-3 inset-x-3.5 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#208EC1] text-white text-[11px] font-bold shadow-sm">
                      {tText(service.shortName, lang)}
                    </span>
                  </span>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-[#208EC1] transition-colors">
                      <Link href={`/services/${service.slug}`}>
                        {tText(service.name, lang)}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {tText(service.tagline, lang)}
                    </p>

                    <ul className="mt-4 space-y-1.5">
                      {(service.features[lang] || service.features.ar)
                        .slice(0, 2)
                        .map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#11345C] dark:text-sky-300 hover:text-[#208EC1]"
                    >
                      <span>{dict.servicesSection.exploreService}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/contact?service=${encodeURIComponent(
                        tText(service.name, lang)
                      )}`}
                      className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#208EC1] hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
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
