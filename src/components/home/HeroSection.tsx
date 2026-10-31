'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Phone,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

interface AnimatedCounterProps {
  valueStr: string;
  duration?: number;
  triggerKey?: number;
}

function AnimatedCounter({
  valueStr,
  duration = 1800,
  triggerKey = 0,
}: AnimatedCounterProps) {
  const numericMatch = valueStr.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const hasPlus = valueStr.includes('+');
  const padZero = target < 10 && !hasPlus;

  const [count, setCount] = useState(0);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, runKey, triggerKey]);

  const formatted = padZero && count < 10 ? `0${count}` : `${count}`;

  return (
    <span
      onMouseEnter={() => setRunKey((k) => k + 1)}
      className="inline-flex items-baseline gap-0.5 tabular-nums tracking-tight select-none"
    >
      {hasPlus && <span className="text-[#208EC1] font-black">+</span>}
      <span>{formatted}</span>
    </span>
  );
}

export default function HeroSection() {
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  const heroRef = useRef<HTMLElement | null>(null);
  const isSnappingRef = useRef<boolean>(false);

  const showcaseProjects = db.portfolio.slice(0, 6);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeSpotlight, setActiveSpotlight] = useState(0);
  const [badgeIdx, setBadgeIdx] = useState(0);

  const badgeMessages =
    lang === 'ar'
      ? [
          'لوحات إعلانية، واجهات ومقاولات في كل مناطق المملكة',
          'تصنيع وتنفيذ مباشر من مصانعنا بضمان يصل إلى 10 سنوات',
          'معاينة مجانية لموقعك وتصميم 3D قبل البدء بالتنفيذ',
        ]
      : lang === 'ur'
      ? [
          'سعودی عرب کے تمام شہروں میں سائن بورڈز، واجهات اور کنٹریکٹنگ',
          'ہماری اپنی فیکٹری سے براہ راست تیاری اور 10 سال تک کی وارنٹی',
          'مفت سائٹ وزٹ اور کام شروع کرنے سے پہلے تھری ڈی ڈیزائن',
        ]
      : [
          'Signage, Facades & Contracting Across Saudi Arabia',
          'Direct In-House Manufacturing With Up to 10-Year Warranty',
          'Free Site Survey & 3D Preview Before Execution',
        ];

  // Seamless 3-message rotation inside the top badge (no dots or indicators)
  useEffect(() => {
    const badgeTimer = setInterval(() => {
      setBadgeIdx((prev) => (prev + 1) % 3);
    }, 3600);
    return () => clearInterval(badgeTimer);
  }, []);

  // Auto-advance project showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % showcaseProjects.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [showcaseProjects.length]);

  // Auto-spotlight cycle across the 3 quick-service rows & 4 stats pods
  useEffect(() => {
    const spotTimer = setInterval(() => {
      setActiveSpotlight((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(spotTimer);
  }, []);

  // Full-Viewport One-Scroll Section Transition
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      const heroEl = heroRef.current;
      if (!heroEl) return;

      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }

      const heroHeight = heroEl.offsetHeight;
      const scrollY = window.scrollY;
      const nextTargetY = Math.max(0, heroHeight - 86);

      if (e.deltaY > 12 && scrollY < nextTargetY - 24) {
        e.preventDefault();
        isSnappingRef.current = true;
        window.scrollTo({
          top: nextTargetY,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isSnappingRef.current = false;
        }, 720);
      } else if (
        e.deltaY < -12 &&
        scrollY > 10 &&
        scrollY <= nextTargetY + 45
      ) {
        e.preventDefault();
        isSnappingRef.current = true;
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isSnappingRef.current = false;
        }, 720);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const heroEl = heroRef.current;
      if (!heroEl) return;
      const heroHeight = heroEl.offsetHeight;
      const scrollY = window.scrollY;
      const nextTargetY = Math.max(0, heroHeight - 86);

      if (
        (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') &&
        scrollY < nextTargetY - 24
      ) {
        e.preventDefault();
        window.scrollTo({ top: nextTargetY, behavior: 'smooth' });
      } else if (
        (e.key === 'ArrowUp' || e.key === 'PageUp') &&
        scrollY > 10 &&
        scrollY <= nextTargetY + 45
      ) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentProject = showcaseProjects[activeIdx] || db.portfolio[0];

  const servicesRow1 = [
    {
      label: lang === 'ar' ? 'الدعاية والإعلان' : 'Signage & Branding',
      href: '/services/3d-signage-and-cladding-facades',
    },
    {
      label: lang === 'ar' ? 'الأحرف البارزة والكلادينج' : '3D Letters & ACP',
      href: '/services/3d-signage-and-cladding-facades',
    },
  ];

  const servicesRow2 = [
    {
      label: lang === 'ar' ? 'المقاولات العامة' : 'General Contracting',
      href: '/services/general-contracting-and-glass',
    },
    {
      label: lang === 'ar' ? 'الديكور والتشطيبات' : 'Interior Fit-Out',
      href: '/services/interior-design-and-fitout',
    },
    {
      label: lang === 'ar' ? 'مظلات وسواتر' : 'Shades & Canopies',
      href: '/services/car-shades-and-pergolas',
    },
  ];

  const servicesRow3 = [
    {
      label: lang === 'ar' ? 'تسوير المشاريع' : 'Project Hoarding',
      href: '/services/project-hoarding-and-fencing',
    },
    {
      label: lang === 'ar' ? 'تجهيز المعارض' : 'Exhibition Booths',
      href: '/services/exhibition-booths-and-events',
    },
    {
      label: lang === 'ar' ? 'تواصل معنا مباشرة' : 'Direct Contact',
      href: '/contact',
    },
  ];

  const statsItems = [
    {
      num: `+${db.settings.stats.projectsCount.replace('+', '')}`,
      title: dict.hero.statsProjects,
      sub:
        lang === 'ar'
          ? 'في الرياض وجدة والدمام ومختلف مدن المملكة'
          : 'Delivered across Riyadh, Jeddah, Dammam & KSA',
    },
    {
      num: db.settings.stats.servicesCount,
      title: dict.hero.statsServices,
      sub:
        lang === 'ar'
          ? 'تصنيع وتنفيذ مباشر من مصانعنا بدون وسطاء'
          : 'Direct in-house fabrication & installation',
    },
    {
      num: `+${db.settings.stats.partnersCount.replace('+', '')}`,
      title: dict.hero.statsPartners,
      sub:
        lang === 'ar'
          ? 'جهات حكومية ومستشفيات وشركات رائدة'
          : 'Trusted by ministries, hospitals & brands',
    },
    {
      num: '+10',
      title: dict.hero.statsWarranty,
      sub:
        lang === 'ar'
          ? 'ضمان شامل على الخامات والتركيب والإضاءة'
          : 'Full warranty on materials & LED systems',
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#eef3f8] dark:bg-[#06101e] transition-colors duration-300 -mt-[90px] pt-[116px] sm:pt-[122px] lg:pt-[96px] pb-8 lg:pb-0 lg:h-[100dvh] lg:min-h-[610px] lg:max-h-[1080px] flex flex-col justify-center"
    >
      {/* Calm, Minimalist Architectural Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 right-[18%] w-[520px] h-[320px] rounded-full bg-white/80 dark:bg-[#208EC1]/12 blur-[95px] animate-aura-slow" />
        <div
          className="absolute bottom-8 left-[15%] w-[460px] h-[280px] rounded-full bg-[#208EC1]/10 dark:bg-sky-500/10 blur-[110px] animate-aura-slow"
          style={{ animationDelay: '-5s' }}
        />

        <div
          className="absolute inset-0 opacity-[0.14] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse at 50% 42%, black 15%, transparent 72%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 42%, black 15%, transparent 72%)',
          }}
        />

        <div className="absolute top-[20%] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#208EC1]/15 to-transparent overflow-hidden">
          <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-[#208EC1]/50 to-transparent animate-line-glide" />
        </div>
      </div>

      {/* Main Center Hero Content */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-1.5">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-7 xl:gap-10 items-center">
          {/* Right Column (RTL Start): Staggered Entrance Typography + CTAs + Auto-Presenting 2x2 Cards */}
          <div className="lg:col-span-7 space-y-3.5 text-start max-w-2xl">
            {/* Minimalist Porcelain Pill Badge with Seamless 3-Message Rotation (Zero Dots/Indicators) */}
            <div
              style={{ animationDelay: '0ms' }}
              className="animate-card-cascade inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#0f2544] dark:text-slate-100 text-[11px] sm:text-xs font-extrabold shadow-[0_4px_14px_-3px_rgba(15,37,68,0.07)] overflow-hidden"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#208EC1] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#208EC1]" />
              </span>
              <span key={badgeIdx} className="animate-badge-text inline-block">
                {badgeMessages[badgeIdx]}
              </span>
            </div>

            {/* Clean Monochromatic 3D Extruded Headline */}
            <h1
              style={{ animationDelay: '80ms' }}
              className="animate-card-cascade heading-3d-hero font-display font-extrabold text-2xl sm:text-3xl lg:text-[31px] xl:text-[34px] leading-[1.4] tracking-tight"
            >
              <span className="block">
                {lang === 'ar' ? (
                  <>
                    نصمم وننفذ{' '}
                    <span className="heading-3d-cyan">واجهة مشروعك</span>
                  </>
                ) : (
                  <span className="heading-3d-cyan">{dict.hero.titleLine1}</span>
                )}
              </span>
              <span className="block mt-1.5">{dict.hero.titleLine2}</span>
            </h1>

            {/* Natural, Easy-to-Read Subtitle */}
            <p
              style={{ animationDelay: '150ms' }}
              className="animate-card-cascade text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium max-w-xl"
            >
              {dict.hero.subtitle}
            </p>

            {/* 2 Primary Pill Buttons */}
            <div
              style={{ animationDelay: '210ms' }}
              className="animate-card-cascade flex items-center gap-2 sm:gap-2.5 pt-0.5"
            >
              <Link
                href="/contact"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-6 py-2.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm shadow-[0_12px_28px_-8px_rgba(15,37,68,0.3)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#208EC1] shrink-0" />
                <span>{dict.hero.ctaPrimary}</span>
                <ArrowIcon className="w-3.5 h-3.5 shrink-0" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full bg-white dark:bg-[#0c1d34] hover:border-[#208EC1] text-[#0f2544] dark:text-white border border-slate-200/95 dark:border-white/15 font-extrabold text-xs sm:text-sm shadow-[0_8px_20px_-6px_rgba(15,37,68,0.08)] transition-all duration-300 hover:-translate-y-0.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#208EC1] shrink-0" />
                <span>{lang === 'ar' ? 'تواصل معنا' : lang === 'ur' ? 'ہم سے رابطہ کریں' : 'Contact Us'}</span>
              </Link>
            </div>

            {/* Condensed 3 Quick-Service Rows: 2 items, then 3 items, then 3 items */}
            <div className="pt-1 space-y-1.5">
              {/* Row 1: بندين (2 items) */}
              <div
                style={{ animationDelay: '260ms' }}
                onMouseEnter={() => setActiveSpotlight(0)}
                className={`animate-card-cascade rounded-2xl bg-white dark:bg-[#0c1d34] border px-3 sm:px-3.5 py-1.5 grid grid-cols-2 gap-2 divide-x divide-x-reverse divide-slate-100 dark:divide-white/10 transition-all duration-500 ${
                  activeSpotlight === 0
                    ? 'border-[#208EC1]/65 shadow-[0_12px_28px_-8px_rgba(32,142,193,0.16)] -translate-y-0.5'
                    : 'border-slate-200/95 dark:border-white/10 shadow-[0_8px_20px_-8px_rgba(15,37,68,0.08)] hover:border-[#208EC1]/50'
                }`}
              >
                {servicesRow1.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`flex items-center gap-1.5 text-xs font-bold text-[#0f2544] dark:text-slate-100 hover:text-[#208EC1] transition-colors truncate ${
                      idx > 0 ? 'ps-2' : ''
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#208EC1]" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Row 2: ثلاثة بنود (3 items) */}
              <div
                style={{ animationDelay: '315ms' }}
                onMouseEnter={() => setActiveSpotlight(1)}
                className={`animate-card-cascade rounded-2xl bg-white dark:bg-[#0c1d34] border px-2.5 sm:px-3.5 py-1.5 grid grid-cols-3 gap-1 sm:gap-2 divide-x divide-x-reverse divide-slate-100 dark:divide-white/10 transition-all duration-500 ${
                  activeSpotlight === 1
                    ? 'border-[#208EC1]/65 shadow-[0_12px_28px_-8px_rgba(32,142,193,0.16)] -translate-y-0.5'
                    : 'border-slate-200/95 dark:border-white/10 shadow-[0_8px_20px_-8px_rgba(15,37,68,0.08)] hover:border-[#208EC1]/50'
                }`}
              >
                {servicesRow2.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#0f2544] dark:text-slate-100 hover:text-[#208EC1] transition-colors truncate ${
                      idx > 0 ? 'ps-1 sm:ps-2' : ''
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#208EC1]" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Row 3: ثلاثة بنود (3 items) */}
              <div
                style={{ animationDelay: '370ms' }}
                onMouseEnter={() => setActiveSpotlight(2)}
                className={`animate-card-cascade rounded-2xl bg-white dark:bg-[#0c1d34] border px-2.5 sm:px-3.5 py-1.5 grid grid-cols-3 gap-1 sm:gap-2 divide-x divide-x-reverse divide-slate-100 dark:divide-white/10 transition-all duration-500 ${
                  activeSpotlight === 2
                    ? 'border-[#208EC1]/65 shadow-[0_12px_28px_-8px_rgba(32,142,193,0.16)] -translate-y-0.5'
                    : 'border-slate-200/95 dark:border-white/10 shadow-[0_8px_20px_-8px_rgba(15,37,68,0.08)] hover:border-[#208EC1]/50'
                }`}
              >
                {servicesRow3.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#0f2544] dark:text-slate-100 hover:text-[#208EC1] transition-colors truncate ${
                      idx > 0 ? 'ps-1 sm:ps-2' : ''
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#208EC1]" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Numbers Bar (شريط الأرقام) Brought Right into the Newly Created Room */}
            <div
              style={{ animationDelay: '425ms' }}
              className="animate-card-cascade pt-1 sm:pt-1.5"
            >
              <div className="rounded-2xl bg-white/90 dark:bg-[#0c1d34]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/10 p-1.5 sm:p-2 shadow-[0_10px_26px_-8px_rgba(15,37,68,0.09)]">
                <div className="grid grid-cols-4 gap-1.5">
                  {statsItems.map((st, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-slate-50/80 dark:bg-white/[0.03] px-1 py-1.5 sm:py-2 text-center"
                    >
                      <p
                        dir="ltr"
                        className="font-display font-black text-sm sm:text-base lg:text-lg leading-none text-[#208EC1]"
                      >
                        <AnimatedCounter
                          valueStr={st.num}
                          duration={1500 + i * 200}
                        />
                      </p>
                      <p className="font-display font-extrabold text-[10px] sm:text-[11px] text-[#0f2544] dark:text-white mt-1 truncate">
                        {st.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Left Column (RTL End): Animated Floating 3D Project Showcase with Smooth Crossfade */}
          <div
            style={{ animationDelay: '180ms' }}
            className="animate-card-cascade lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[435px] animate-float-3d">
              <div className="rounded-[32px] p-2 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/90 dark:border-white/10 shadow-[0_24px_54px_-14px_rgba(15,37,68,0.16),0_6px_18px_-4px_rgba(15,37,68,0.06)]">
                <div className="rounded-[25px] p-2 bg-white dark:bg-[#0c1d34] border border-slate-200/70 dark:border-white/10">
                  <Link
                    href={`/portfolio/${currentProject.slug}`}
                    className="group relative block rounded-[18px] overflow-hidden aspect-[16/11] bg-slate-900"
                  >
                    <img
                      key={currentProject.id}
                      src={
                        currentProject.type === 'video'
                          ? currentProject.poster || currentProject.src
                          : currentProject.src
                      }
                      alt={tText(currentProject.alt, lang)}
                      className="w-full h-full object-cover animate-hero-showcase transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2544]/85 via-[#0f2544]/15 to-transparent" />

                    <div
                      key={`caption-${currentProject.id}`}
                      className="animate-tab-switch absolute bottom-3 inset-x-3.5 flex items-end justify-between gap-2.5"
                    >
                      <div className="text-start">
                        <p className="text-[11px] font-bold text-sky-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#208EC1] shrink-0" />
                          <span>
                            {lang === 'ar'
                              ? `من أعمالنا · ${tText(currentProject.city, lang)}`
                              : `Delivered · ${tText(currentProject.city, lang)}`}
                          </span>
                        </p>
                        <h2 className="text-xs sm:text-sm font-extrabold text-white line-clamp-1 mt-0.5">
                          {tText(currentProject.title, lang)}
                        </h2>
                      </div>

                      <span className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/95 text-[#0f2544] text-[10px] font-extrabold shadow-sm">
                        {lang === 'ar' ? 'ضمان 10 سنوات' : '10-Yr Warranty'}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 mt-2">
                {showcaseProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`عرض مشروع ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeIdx === idx
                        ? 'w-7 bg-[#208EC1]'
                        : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-[#208EC1]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
