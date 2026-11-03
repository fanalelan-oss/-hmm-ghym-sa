'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import AutoMediaCarousel, { buildMediaSlides } from '@/components/common/AutoMediaCarousel';
import LetterTypesTabsSection from '@/components/services/LetterTypesTabsSection';
import SmartLinkedText from '@/components/seo/SmartLinkedText';
import ExpandableHashtagsCard from '@/components/seo/ExpandableHashtagsCard';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function ServicesPage() {
  const { lang, dict, db } = useApp();
  const router = useRouter();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="py-6 sm:py-8 lg:py-10 space-y-8 bg-[#eef3f8] dark:bg-brand-950 min-h-screen">
      {/* Centered, Balanced Page Header — Not cornered or cramped */}
      <div className="smart-container">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-extrabold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar'
                ? 'أقسامنا الهندسية والتنفيذية'
                : lang === 'ur'
                ? 'ہماری انجینئرنگ خدمات'
                : 'Our Engineering Departments'}
            </span>
          </span>

          <h1 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#0f2544] dark:text-white leading-snug">
            {dict.servicesSection.title}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            <SmartLinkedText
              text={
                lang === 'ar'
                  ? 'اختر القسم المطلوب من الأحرف البارزة وواجهات الكلادينج والزجاج السيكوريت إلى الجبس بورد والأسمنت بورد وتكسيات بديل الشيبورد والمظلات والسواتر والأمن والسلامة وكاميرات المراقبة لاستعراض الأعمال المنفذة والمواصفات الفنية والأسعار التقديرية'
                  : dict.servicesSection.subtitle
              }
              maxLinks={9}
            />
          </p>
        </div>
      </div>

      {/* Clean, Uncluttered Department Cards Grid — Entire Card Clickable */}
      <div className="smart-container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {db.services.map((srv, idx) => {
            const count = db.portfolio.filter((p) => p.category === srv.id).length;
            const targetUrl = `/services/${srv.slug}`;

            return (
              <article
                key={srv.id}
                role="link"
                tabIndex={0}
                onClick={() => router.push(targetUrl)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    router.push(targetUrl);
                  }
                }}
                className="cursor-pointer floating-card group h-full flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 hover:border-[#208EC1] overflow-hidden p-2.5 transition-all duration-300 hover:-translate-y-1 shadow-xs select-none"
              >
                <div>
                  {/* Card Media Header */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 block">
                    <AutoMediaCarousel
                      slides={buildMediaSlides(srv)}
                      alt={tText(srv.name, lang)}
                      mode="card"
                      imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2544]/70 via-transparent to-black/15 pointer-events-none" />

                    {/* Top Number Only (No circle widget) */}
                    <span className="absolute top-2 start-2.5 z-20 text-white font-display font-black text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>

                    {/* Project Count Pill */}
                    <span className="absolute bottom-2 start-2 z-20 px-2.5 py-0.5 rounded-full bg-[#0f2544]/85 backdrop-blur-xs text-white text-[10px] font-bold pointer-events-none">
                      {count}{' '}
                      {lang === 'ar'
                        ? 'عمل منفذ'
                        : lang === 'ur'
                        ? 'منصوبے'
                        : 'Projects'}
                    </span>
                  </div>

                  {/* Clean Card Body: Title + Concise 2-line Summary only */}
                  <div className="pt-3 px-1.5 pb-2 space-y-1.5">
                    <h2 className="font-display font-extrabold text-xs sm:text-sm lg:text-[15px] leading-snug text-[#0f2544] dark:text-white group-hover:text-[#208EC1] transition-colors line-clamp-1">
                      {tText(srv.shortName, lang)}
                    </h2>

                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {tText(srv.tagline, lang)}
                    </p>
                  </div>
                </div>

                {/* Clean Single-Action Footer */}
                <div className="px-1.5 pt-2 pb-0.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-extrabold text-[#208EC1]">
                  <span>
                    {lang === 'ar'
                      ? 'استعراض القسم والأعمال'
                      : lang === 'ur'
                      ? 'تفصیلات دیکھیں'
                      : 'Explore Department'}
                  </span>
                  <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive 8 Types of 3D Signage Letters Tabs Section */}
      <LetterTypesTabsSection />

      {/* Massive SEO Hashtags Card with Expandable Dropdown */}
      <div className="smart-container">
        <ExpandableHashtagsCard
          visibleCount={12}
          title={
            lang === 'ar'
              ? 'الكلمات المفتاحية والهاشتاقات التخصصية لجميع أقسامنا الهندسية الـ 11'
              : 'Specialized Engineering Hashtags & Keywords for All 11 Departments'
          }
        />
      </div>
    </div>
  );
}
