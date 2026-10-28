'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import {
  Bot,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Calculator,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Compass,
  Building2,
  Umbrella,
  Paintbrush,
  PhoneCall,
} from 'lucide-react';

export default function HeroSection() {
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Cycle through top executed storefront/cladding projects or allow clicking
  const showcaseProjects = db.portfolio.slice(0, 6);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % showcaseProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [showcaseProjects.length]);

  const currentProject = showcaseProjects[activeIdx] || db.portfolio[0];

  // 4 Frosted Glass Bento Cards (each holding 2 core links just like the reference image)
  const glassCards = [
    {
      items: [
        {
          label: lang === 'ar' ? 'الدعاية والإعلان' : 'Signage & Branding',
          href: '/services/3d-signage-and-cladding-facades',
          icon: Sparkles,
        },
        {
          label: lang === 'ar' ? 'الديكور والتشطيبات' : 'Interior Fit-Out',
          href: '/services/interior-design-and-fitout',
          icon: Paintbrush,
        },
      ],
    },
    {
      items: [
        {
          label: lang === 'ar' ? 'المقاولات العامة' : 'General Contracting',
          href: '/services/general-contracting-and-glass',
          icon: Building2,
        },
        {
          label: lang === 'ar' ? 'تسوير المشاريع' : 'Project Hoarding',
          href: '/services/project-hoarding-and-fencing',
          icon: Layers,
        },
      ],
    },
    {
      items: [
        {
          label: lang === 'ar' ? 'الأحرف البارزة والكلادينج' : '3D Letters & ACP',
          href: '/services/3d-signage-and-cladding-facades',
          icon: Compass,
        },
        {
          label: lang === 'ar' ? 'مظلات وسواتر' : 'Shades & Canopies',
          href: '/services/car-shades-and-pergolas',
          icon: Umbrella,
        },
      ],
    },
    {
      items: [
        {
          label: lang === 'ar' ? 'تجهيز المعارض' : 'Exhibition Booths',
          href: '/services/exhibition-booths-and-events',
          icon: ShieldCheck,
        },
        {
          label: lang === 'ar' ? 'تواصل معنا' : 'Contact Us',
          href: '/contact',
          icon: PhoneCall,
        },
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f4f7fb] dark:bg-[#071324] transition-colors duration-300 -mt-24 pt-28">
      {/* Continuous Flowing Geometric Stream & Animated Wave Background (انميشن سيل هندسي متصل بدون توقف) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Ambient Light Glows (No harsh giant circles) */}
        <div className="absolute top-10 right-1/4 w-[420px] h-[260px] rounded-full bg-[#38bdf8]/12 dark:bg-[#208EC1]/15 blur-[95px]" />
        <div className="absolute bottom-16 left-1/4 w-[380px] h-[240px] rounded-full bg-[#208EC1]/10 dark:bg-sky-500/10 blur-[90px]" />

        {/* Subtle Architectural Blueprint Mesh (Soft Faded Edges) */}
        <div
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '38px 38px',
            maskImage:
              'radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)',
          }}
        />

        {/* Animated Flowing Wave Ribbons across the bottom */}
        <svg
          className="absolute -inset-x-10 bottom-0 w-[calc(100%+80px)] h-[490px] opacity-90 dark:opacity-35 animate-wave-float"
          viewBox="0 0 1920 500"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 390 C 340 240, 720 490, 1140 315 C 1490 175, 1730 250, 2020 365 L 2020 500 L -100 500 Z"
            fill="url(#cyanWaveGrad)"
          />
          <path
            d="M-100 330 C 380 175, 760 445, 1200 265 C 1540 125, 1780 215, 2020 325"
            stroke="#208EC1"
            strokeOpacity="0.26"
            strokeWidth="2"
            strokeDasharray="10 8"
          />
          <path
            d="M-100 358 C 380 200, 760 470, 1200 292 C 1540 152, 1780 242, 2020 352"
            stroke="#11345C"
            strokeOpacity="0.14"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="cyanWaveGrad" x1="0" y1="0" x2="1920" y2="500" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#7dd3fc" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.22" />
            </linearGradient>
          </defs>
        </svg>

        {/* Continuous Non-Stop Stream of Delicate Geometric Triangles & Diamonds (سيل متحرك بلا توقف) */}
        {[
          { top: '9%', size: 22, dur: '18s', delay: '-1s', color: '#208EC1', type: 'tri-solid', rev: false },
          { top: '14%', size: 16, dur: '22s', delay: '-7s', color: '#38bdf8', type: 'tri-outline', rev: false },
          { top: '19%', size: 28, dur: '25s', delay: '-14s', color: '#11345C', type: 'tri-solid', rev: false },
          { top: '24%', size: 18, dur: '19s', delay: '-4s', color: '#0284c7', type: 'diamond', rev: true },
          { top: '29%', size: 24, dur: '21s', delay: '-11s', color: '#38bdf8', type: 'tri-solid', rev: false },
          { top: '34%', size: 15, dur: '17s', delay: '-16s', color: '#f59e0b', type: 'tri-outline', rev: false },
          { top: '39%', size: 26, dur: '24s', delay: '-6s', color: '#208EC1', type: 'tri-outline', rev: true },
          { top: '44%', size: 20, dur: '20s', delay: '-13s', color: '#7dd3fc', type: 'tri-solid', rev: false },
          { top: '49%', size: 16, dur: '16s', delay: '-2s', color: '#11345C', type: 'diamond', rev: false },
          { top: '54%', size: 24, dur: '23s', delay: '-9s', color: '#208EC1', type: 'tri-solid', rev: true },
          { top: '59%', size: 19, dur: '18s', delay: '-15s', color: '#38bdf8', type: 'tri-outline', rev: false },
          { top: '64%', size: 28, dur: '26s', delay: '-5s', color: '#0ea5e9', type: 'tri-solid', rev: false },
          { top: '69%', size: 17, dur: '19s', delay: '-12s', color: '#fbbf24', type: 'diamond', rev: true },
          { top: '74%', size: 23, dur: '22s', delay: '-8s', color: '#11345C', type: 'tri-outline', rev: false },
          { top: '79%', size: 21, dur: '20s', delay: '-17s', color: '#38bdf8', type: 'tri-solid', rev: false },
          { top: '84%', size: 15, dur: '17s', delay: '-3s', color: '#208EC1', type: 'tri-outline', rev: true },
          { top: '16%', size: 20, dur: '21s', delay: '-19s', color: '#0284c7', type: 'tri-solid', rev: false },
          { top: '62%', size: 22, dur: '24s', delay: '-21s', color: '#38bdf8', type: 'tri-outline', rev: false },
        ].map((p, idx) => (
          <div
            key={idx}
            className={`absolute left-1/2 ${
              p.rev ? 'animate-hero-stream-reverse' : 'animate-hero-stream'
            }`}
            style={{
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          >
            <svg
              viewBox="0 0 32 32"
              className="w-full h-full overflow-visible drop-shadow-sm"
            >
              {p.type === 'tri-solid' && (
                <polygon
                  points="16,3 29,27 3,27"
                  fill={p.color}
                  fillOpacity="0.45"
                />
              )}
              {p.type === 'tri-outline' && (
                <polygon
                  points="16,3 29,27 3,27"
                  fill="none"
                  stroke={p.color}
                  strokeWidth="2.4"
                  strokeOpacity="0.55"
                />
              )}
              {p.type === 'diamond' && (
                <polygon
                  points="16,2 30,16 16,30 2,16"
                  fill={p.color}
                  fillOpacity="0.38"
                />
              )}
            </svg>
          </div>
        ))}
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-14 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Right Column (RTL Start): Badge + Giant Headline + Subtitle + 2 Pill Buttons + 4 Glass Cards */}
          <div className="lg:col-span-7 space-y-6 text-start">
            {/* Soft Frosted Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 border border-slate-300/80 dark:border-white/15 text-[#0f2544] dark:text-sky-200 text-xs sm:text-[13px] font-bold shadow-sm">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full border border-slate-500 dark:border-sky-300" />
                <span className="w-2 h-2 rounded-full bg-[#208EC1]" />
              </span>
              <span>{dict.hero.badge}</span>
            </div>

            {/* 3-Line Executive Headline with New Cairo Display Font */}
            <h1 className="font-display font-black text-3xl sm:text-5xl xl:text-[54px] leading-[1.32] text-[#0f2544] dark:text-white tracking-tight">
              <span className="block">
                {lang === 'ar' ? (
                  <>
                    نصنع <span className="text-[#208EC1]">حضورك البصري..</span>
                  </>
                ) : (
                  <span className="text-[#208EC1]">{dict.hero.titleLine1}</span>
                )}
              </span>
              <span className="block mt-1.5">
                {lang === 'ar'
                  ? 'ونبني واجهات المستقبل بأعلى'
                  : dict.hero.titleLine2}
              </span>
              {lang === 'ar' && (
                <span className="block mt-1.5">المعايير الهندسية</span>
              )}
            </h1>

            {/* Clean Subtitle */}
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15.5px] leading-relaxed max-w-2xl font-medium">
              {dict.hero.subtitle}
            </p>

            {/* 2 Primary Pill Buttons in a Horizontal Row (Removed AI Engineer Button as requested) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 whitespace-nowrap px-7 py-3.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-[#0f2544]/20 transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-sky-300" />
                <span>{dict.hero.ctaPrimary}</span>
                <ArrowIcon className="w-4 h-4 text-sky-300" />
              </Link>

              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-3.5 rounded-full bg-white/90 dark:bg-white/10 hover:bg-white text-[#0f2544] dark:text-white border border-slate-300/80 dark:border-white/20 font-extrabold text-xs sm:text-sm shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4 text-[#208EC1]" />
                <span>{dict.nav.calculator}</span>
              </Link>
            </div>

            {/* 4 Frosted Glass Bento Cards Below Buttons */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {glassCards.map((card, cIdx) => (
                <div
                  key={cIdx}
                  className="rounded-2xl bg-white/75 dark:bg-[#0d213b]/80 backdrop-blur-md border border-white dark:border-white/10 shadow-[0_8px_25px_-8px_rgba(15,37,68,0.1)] p-3.5 flex flex-col justify-center space-y-2.5"
                >
                  {card.items.map((it, iIdx) => {
                    const ItemIcon = it.icon;
                    return (
                      <Link
                        key={iIdx}
                        href={it.href}
                        className="group flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#0f2544] dark:text-slate-100 hover:text-[#208EC1] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#208EC1] shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{it.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Left Column (RTL End): Single Bold Framed Project Card matching reference image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[490px]">
              {/* Outer White/Glass Frame */}
              <div className="rounded-[34px] p-2.5 bg-white/85 dark:bg-white/10 backdrop-blur-xl border border-white dark:border-white/20 shadow-[0_30px_70px_-15px_rgba(15,37,68,0.32)]">
                <Link
                  href={`/portfolio/${currentProject.slug}`}
                  className="group relative block rounded-[26px] overflow-hidden aspect-[11/10] bg-slate-900"
                >
                  <img
                    src={
                      currentProject.type === 'video'
                        ? currentProject.poster || currentProject.src
                        : currentProject.src
                    }
                    alt={tText(currentProject.alt, lang)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                  {/* Bottom Overlay Info matching reference image */}
                  <div className="absolute bottom-4 inset-x-4 flex items-end justify-between gap-3">
                    <div className="text-start">
                      <p className="text-[11px] font-bold text-sky-300">
                        {lang === 'ar'
                          ? `مشروع منفذ ومعتمد · ${tText(currentProject.city, lang)}`
                          : `Verified Project · ${tText(currentProject.city, lang)}`}
                      </p>
                      <h2 className="text-base sm:text-lg font-extrabold text-white line-clamp-1">
                        {tText(currentProject.title, lang)}
                      </h2>
                    </div>

                    <span className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-white text-xs font-bold border border-white/15">
                      {lang === 'ar' ? 'ضمان 10 سنوات' : '10-Yr Warranty'}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Subtle Slide Dots under the frame */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {showcaseProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`عرض مشروع ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      activeIdx === idx
                        ? 'w-7 bg-[#208EC1]'
                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-[#208EC1]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Unified Stats Bar on Soft Grey Band matching reference image */}
      <div className="relative z-10 bg-[#e9eef5]/90 dark:bg-[#09182c] py-7 border-y border-slate-200/80 dark:border-white/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="rounded-[28px] bg-white dark:bg-[#0d213b] border border-slate-200/80 dark:border-white/10 shadow-[0_10px_30px_-12px_rgba(15,37,68,0.08)] px-6 sm:px-10 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-x-reverse divide-slate-100 dark:divide-white/10">
            {[
              {
                num: `+${db.settings.stats.projectsCount.replace('+', '')}`,
                title: dict.hero.statsProjects,
                sub:
                  lang === 'ar'
                    ? 'في الرياض وجدة والدمام وكافة مناطق المملكة'
                    : 'Delivered across Riyadh, Jeddah, Dammam & KSA',
              },
              {
                num: db.settings.stats.servicesCount,
                title: dict.hero.statsServices,
                sub:
                  lang === 'ar'
                    ? 'تصنيع وتنفيذ مباشر بأحدث المكائن بدون وسطاء'
                    : 'Direct in-house fabrication & engineering',
              },
              {
                num: `+${db.settings.stats.partnersCount.replace('+', '')}`,
                title: dict.hero.statsPartners,
                sub:
                  lang === 'ar'
                    ? 'شراكات استراتيجية مع وزارات ومستشفيات كبرى'
                    : 'Trusted by ministries, hospitals & top brands',
              },
              {
                num: '+10',
                title: dict.hero.statsWarranty,
                sub:
                  lang === 'ar'
                    ? 'ضمان رسمي مكتوب على الخامات والتركيب والإضاءة'
                    : 'Written warranty on materials & LED systems',
              },
            ].map((st, i) => (
              <div key={i} className="text-center px-2">
                <p
                  dir="ltr"
                  className="font-display font-extrabold text-3xl sm:text-4xl text-[#208EC1]"
                >
                  {st.num}
                </p>
                <p className="font-display font-bold text-xs sm:text-sm text-[#0f2544] dark:text-white mt-1">
                  {st.title}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {st.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
