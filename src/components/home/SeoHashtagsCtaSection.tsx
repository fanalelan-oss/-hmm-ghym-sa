'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import SmartLinkedText from '@/components/seo/SmartLinkedText';
import ExpandableHashtagsCard from '@/components/seo/ExpandableHashtagsCard';
import {
  Phone,
  Mail,
  Bot,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Sparkles,
} from 'lucide-react';

export default function SeoHashtagsCtaSection() {
  const { dict, db, lang } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  const primaryHashtags = Array.from(
    new Set([
      ...db.services.flatMap((s) => (s.hashtags || []).slice(0, 2)),
      '#شركة_همم_غيم',
      '#دعاية_وإعلان_الرياض',
      '#تركيب_أحرف_بارزة_مضيئة',
      '#واجهات_كلادينج_ACP',
      '#مظلات_وسواتر_الرياض',
      '#أعمال_الجبس_بورد_والأسمنت_بورد',
      '#الواجهات_الزجاجية_والسيكوريت',
      '#الأمن_والسلامة_وشبكات_الإطفاء',
      '#كاميرات_المراقبة_والأنظمة_الأمنية',
    ])
  );

  return (
    <section className="py-14 lg:py-16 bg-[#eef3f8] dark:bg-[#071324] border-t border-slate-200/70 dark:border-white/10 transition-colors">
      <div className="smart-container space-y-6">
        {/* Clean Direct CTA Banner */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#09192f] via-[#0f2544] to-[#195885] text-white p-7 sm:p-10 lg:p-11 border border-sky-400/20 shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-sky-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                {lang === 'ar'
                  ? 'معاينة واستشارة مجانية لمشروعك'
                  : lang === 'ur'
                  ? 'مفت معائنہ اور تکنیکی مشاورت'
                  : 'Free Site Visit & Consultation'}
              </span>
              <h2 className="heading-3d-light font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug">
                {dict.seoSection.ctaTitle}
              </h2>
              <p className="text-sky-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
                <SmartLinkedText text={dict.seoSection.ctaDesc} maxLinks={5} />
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-sky-300 font-bold">
                <a
                  href={`tel:${db.settings.phoneClean}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-300" />
                  {db.settings.phone}
                </a>
                <a
                  href={`mailto:${db.settings.email}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-300" />
                  {db.settings.email}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-full bg-[#208EC1] hover:bg-sky-400 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#208EC1]/30 transition-all"
              >
                <span>{dict.nav.requestQuote}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-full bg-white text-[#0f2544] hover:bg-sky-50 font-extrabold text-xs sm:text-sm shadow-md transition-all"
              >
                <Calculator className="w-4 h-4 text-[#208EC1]" />
                <span>{dict.nav.calculator}</span>
              </Link>
              <Link
                href="/ai-engineer"
                className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <Bot className="w-4 h-4 text-sky-300" />
                <span>{dict.nav.aiEngineer}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dedicated Hashtags Card: Current Visible Tags + Massive Expandable Dropdown */}
        <ExpandableHashtagsCard
          primaryTags={primaryHashtags}
          visibleCount={12}
          title={dict.seoSection.eyebrow}
        />
      </div>
    </section>
  );
}
