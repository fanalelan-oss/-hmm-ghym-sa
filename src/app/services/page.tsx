'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText, tList } from '@/lib/i18n';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { Check, ArrowLeft, ArrowRight, Sparkles, Phone } from 'lucide-react';

export default function ServicesPage() {
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="py-14 lg:py-20 space-y-24">
      {/* Page Hero */}
      <div className="smart-container">
        <div className="rounded-3xl bg-gradient-to-br from-brand-950 via-brand-800 to-brand-950 text-white p-8 sm:p-14 border border-white/10 shadow-xl">
          <p className="text-signal-300 font-bold text-sm mb-2">
            {dict.servicesSection.eyebrow}
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight">
            {dict.servicesSection.title}
          </h1>
          <p className="mt-4 text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            {dict.servicesSection.subtitle}
          </p>

          {/* Quick Jump Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {db.services.map((srv) => (
              <Link
                key={srv.id}
                href={`/services/${srv.slug}`}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-signal-500 text-white text-xs sm:text-sm font-bold border border-white/15 transition-all"
              >
                {tText(srv.name, lang)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* All 8 Services Detailed Cards */}
      <div className="smart-container space-y-12">
        {db.services.map((srv, idx) => {
          const features = tList(srv.features, lang);
          const count = db.portfolio.filter((p) => p.category === srv.id).length;
          return (
            <ScrollReveal key={srv.id} delayMs={40}>
              <article className="rounded-3xl bg-slate-50 dark:bg-brand-900/70 border border-slate-200/80 dark:border-white/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="block relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-950 border border-slate-200 dark:border-white/10 group"
                  >
                    <img
                      src={srv.coverImage}
                      alt={tText(srv.name, lang)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-brand-950/85 text-signal-300 text-xs font-bold">
                      {count} مشروع منفذ
                    </span>
                  </Link>
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-signal-500/15 text-signal-600 dark:text-signal-300 text-xs font-bold">
                    <span>0{idx + 1}</span>
                    <span>•</span>
                    <span>{tText(srv.shortName, lang)}</span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                    <Link href={`/services/${srv.slug}`} className="hover:text-signal-500 transition-colors">
                      {tText(srv.name, lang)}
                    </Link>
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {tText(srv.description, lang)}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm font-bold text-brand-600 dark:text-signal-300">
                      {tText(srv.priceRange, lang)}
                    </span>

                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 dark:bg-signal-500 text-white text-xs sm:text-sm font-bold transition-all"
                      >
                        <span>{dict.servicesSection.exploreService}</span>
                        <ArrowIcon className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/contact?service=${srv.id}`}
                        className="px-4 py-2.5 rounded-xl bg-white dark:bg-brand-950 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-xs sm:text-sm font-bold hover:border-signal-500 transition-all"
                      >
                        {dict.servicesSection.requestService}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      {/* 8 Types of 3D Signage Letters Showcase */}
      <section className="smart-container pt-6">
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-signal-500/10 text-signal-600 dark:text-signal-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              دليل أنواع الأحرف البارزة الـ 8
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              أنواع الأحرف البارزة واللوحات التي نصنعها في ورشنا
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-base">
              لكل واجهة نوع حرف يناسبها حسب طريقة الإضاءة والخامة والميزانية واشتراطات البلدية.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {db.letterTypes.map((lt, idx) => (
            <ScrollReveal key={lt.id} delayMs={idx * 50}>
              <article className="h-full flex flex-col rounded-3xl bg-white dark:bg-brand-900 border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-square bg-slate-950 overflow-hidden">
                  <img
                    src={lt.image}
                    alt={tText(lt.name, lang)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {tText(lt.name, lang)}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {tText(lt.desc, lang)}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-white/10">
                    <p className="text-[11px] font-semibold text-brand-600 dark:text-signal-300">
                      {tText(lt.specs, lang)}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
