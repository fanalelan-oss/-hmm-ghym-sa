'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import { Lang } from '@/lib/types';
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Globe,
  FileText,
  Phone,
  ArrowLeft,
  ArrowRight,
  Check,
} from 'lucide-react';

export default function SiteHeader() {
  const { lang, setLang, theme, toggleTheme, dict, db } = useApp();
  const pathname = usePathname();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Click outside listener for language menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // All main navigation links directly visible (No "More" dropdown, no Calculator, no AI Advisor, no 3D Studio)
  const navLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/services', label: dict.nav.services, hasMega: true },
    { href: '/portfolio', label: dict.nav.portfolio },
    { href: '/partners', label: dict.nav.partners },
    { href: '/reviews', label: dict.nav.reviews },
    { href: '/blog', label: dict.nav.blog },
    { href: '/about', label: dict.nav.about },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky z-50 px-3 sm:px-6 lg:px-10 transition-all duration-300 ${
        isScrolled ? 'top-1.5 sm:top-2' : 'top-2 sm:top-3.5'
      }`}
    >
      <div className="w-full max-w-[1520px] mx-auto">
        {/* Outer Soft Architectural Bezel for Natural Physical Depth */}
        <div className="rounded-full p-[2px] sm:p-[3px] bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-[0_16px_36px_-12px_rgba(15,37,68,0.12),0_4px_12px_-4px_rgba(15,37,68,0.06)]">
          {/* Inner Pure Porcelain Bar with Top Specular Highlight & Bottom Depth Lip */}
          <div
            className={`relative rounded-full bg-white/95 dark:bg-[#0b192e]/95 border border-slate-200/85 dark:border-white/10 shadow-[inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-1.5px_0_rgba(15,37,68,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 px-2.5 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-3 ${
              isScrolled
                ? 'h-[48px] sm:h-[54px] lg:h-[58px]'
                : 'h-[52px] sm:h-[60px] lg:h-[66px]'
            }`}
          >
            {/* ZONE 1 (RTL Start): Brand Logo */}
            <div className="flex items-center shrink-0">
              <Link
                href="/"
                className="flex items-center shrink-0 group"
                aria-label={tText(db.settings.companyName, lang)}
              >
                <img
                  src={
                    (theme === 'dark' ? db.settings.logoLight : db.settings.logoDark)?.startsWith('/')
                      ? (theme === 'dark' ? db.settings.logoLight : db.settings.logoDark)
                      : `/${theme === 'dark' ? db.settings.logoLight : db.settings.logoDark}`
                  }
                  alt={tText(db.settings.fullLegalName, lang)}
                  width={108}
                  height={54}
                  className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                    isScrolled
                      ? 'h-6 sm:h-8 lg:h-9'
                      : 'h-7 sm:h-9 lg:h-11'
                  }`}
                />
              </Link>
            </div>

            {/* ZONE 2 (Center): Natural Recessed Navigation Track with All Direct Links */}
            <nav
              className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#eaf0f7]/95 dark:bg-[#071222]/90 border border-slate-200/80 dark:border-white/10 shadow-[inset_0_2px_4px_rgba(15,37,68,0.06),0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
              aria-label="القائمة الرئيسية"
            >
              {navLinks.map((item) => {
                const active = isActive(item.href);

                if (item.hasMega) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setServicesOpen(false)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-1 ${
                          active
                            ? 'bg-white dark:bg-[#208EC1] text-[#0f2544] dark:text-white shadow-[0_4px_12px_-2px_rgba(15,37,68,0.14),0_1px_2px_rgba(15,37,68,0.08)]'
                            : 'text-[#0f2544] dark:text-slate-200 hover:text-[#208EC1] hover:bg-white/60 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesOpen ? 'rotate-180 text-[#208EC1]' : ''
                          }`}
                        />
                      </Link>

                      {/* 2-Column Porcelain Services Dropdown */}
                      {servicesOpen && (
                        <div className="absolute top-full start-1/2 translate-x-1/2 pt-3 w-[520px] z-50">
                          <div className="rounded-[26px] bg-white dark:bg-[#0c1d34] border border-slate-200/95 dark:border-white/10 shadow-[0_24px_60px_-12px_rgba(15,37,68,0.22)] p-4">
                            <div className="flex items-center justify-between px-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-white/10">
                              <span className="text-xs font-extrabold text-[#0f2544] dark:text-white">
                                {lang === 'ar'
                                  ? `خدماتنا المتكاملة (${db.services.length} أقسام)`
                                  : lang === 'ur'
                                  ? `ہماری جامع خدمات (${db.services.length} شعبہ جات)`
                                  : `Our Core Services (${db.services.length} Sectors)`}
                              </span>
                              <Link
                                href="/services"
                                onClick={() => setServicesOpen(false)}
                                className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#208EC1] hover:underline"
                              >
                                <span>
                                  {lang === 'ar' ? 'عرض الكل' : lang === 'ur' ? 'سب دیکھیں' : 'View All'}
                                </span>
                                <ArrowIcon className="w-3 h-3" />
                              </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5">
                              {db.services.map((srv, idx) => (
                                <Link
                                  key={srv.id}
                                  href={`/services/${srv.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="group flex items-start gap-2.5 p-2.5 rounded-2xl hover:bg-[#eef3f8] dark:hover:bg-white/5 transition-colors"
                                >
                                  <span className="w-7 h-7 rounded-xl bg-[#eef3f8] dark:bg-white/10 group-hover:bg-[#208EC1] text-[#0f2544] dark:text-white group-hover:text-white font-display font-black text-[11px] flex items-center justify-center shrink-0 transition-colors">
                                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                  </span>
                                  <div className="min-w-0">
                                    <p className="text-xs font-extrabold text-[#0f2544] dark:text-white group-hover:text-[#208EC1] truncate transition-colors">
                                      {tText(srv.shortName, lang)}
                                    </p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                      {tText(srv.name, lang)}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 ${
                      active
                        ? 'bg-white dark:bg-[#208EC1] text-[#0f2544] dark:text-white shadow-[0_4px_12px_-2px_rgba(15,37,68,0.14),0_1px_2px_rgba(15,37,68,0.08)]'
                        : 'text-[#0f2544] dark:text-slate-200 hover:text-[#208EC1] hover:bg-white/60 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ZONE 3 (RTL End): Quick Actions + Primary CTA with Natural Depth */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher with Clear Label & Active Flag */}
              <div ref={langMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  aria-expanded={langMenuOpen}
                  aria-label="تبديل اللغة / Change Language"
                  title="تبديل اللغة / Change Language"
                  className="inline-flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-[#eaf0f7] dark:bg-white/10 hover:bg-slate-200/80 text-[11px] font-black text-[#0f2544] dark:text-slate-200 shadow-[inset_0_1px_2px_rgba(15,37,68,0.06)] transition-all cursor-pointer shrink-0"
                >
                  <Globe className="w-3.5 h-3.5 text-[#208EC1] shrink-0" />
                  <span className="font-mono font-black text-[11px] uppercase tracking-wide">
                    {lang.toUpperCase()}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {langMenuOpen && (
                  <div className="absolute top-full end-0 mt-2 w-32 rounded-2xl bg-white dark:bg-[#0d213b] border border-slate-200 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {[
                      { code: 'ar', label: 'العربية', tag: 'AR' },
                      { code: 'en', label: 'English', tag: 'EN' },
                      { code: 'ur', label: 'اردو', tag: 'UR' },
                    ].map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLang(item.code as Lang);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          lang === item.code
                            ? 'bg-[#208EC1]/15 text-[#208EC1] dark:bg-sky-500/20 dark:text-sky-300 font-black'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[10px] px-1 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                            {item.tag}
                          </span>
                          <span>{item.label}</span>
                        </span>
                        {lang === item.code && <Check className="w-3.5 h-3.5 text-[#208EC1] shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Day / Night Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-[#eaf0f7] dark:bg-white/10 hover:bg-slate-200/80 dark:hover:bg-white/20 flex items-center justify-center text-[#0f2544] dark:text-sky-300 shadow-[inset_0_1px_2px_rgba(15,37,68,0.06)] transition-all"
                title={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
                aria-label="تبديل الوضع النهاري والليلي"
              >
                {theme === 'light' ? (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>

              {/* Quick Phone Button */}
              <a
                href={`tel:${db.settings.phoneClean}`}
                className="hidden sm:inline-flex w-9 h-9 rounded-full bg-[#eaf0f7] dark:bg-white/10 hover:bg-[#208EC1] text-[#0f2544] dark:text-white hover:text-white items-center justify-center shadow-[inset_0_1px_2px_rgba(15,37,68,0.06)] transition-all"
                title={db.settings.phone}
                aria-label="اتصال مباشر"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              {/* Primary Dark Navy Pill CTA Button with Elevated Depth (Slimmed on mobile) */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-[#0f2544] hover:bg-[#208EC1] dark:bg-[#208EC1] dark:hover:bg-sky-400 text-white text-[10.5px] sm:text-xs font-black shadow-[0_8px_18px_-4px_rgba(15,37,68,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 shrink-0"
              >
                <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#208EC1] dark:text-white shrink-0" />
                <span>{dict.nav.requestQuote}</span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#0f2544] dark:text-slate-200 shrink-0"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 rounded-[26px] bg-white dark:bg-[#0b192e] border border-slate-200 dark:border-white/10 p-4 shadow-2xl space-y-3">
            {/* Mobile Language Switch Bar */}
            <div className="pb-3 border-b border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-[#0f2544] dark:text-slate-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#208EC1]" />
                <span>{lang === 'ar' ? 'اختر اللغة' : lang === 'ur' ? 'زبان منتخب کریں' : 'Language'}</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                {[
                  { code: 'ar', label: 'AR' },
                  { code: 'en', label: 'EN' },
                  { code: 'ur', label: 'UR' },
                ].map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLang(item.code as Lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-black transition-all ${
                      lang === item.code
                        ? 'bg-[#208EC1] text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                ...navLinks,
                { href: '/contact', label: dict.nav.contact },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`whitespace-nowrap px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                    pathname === item.href
                      ? 'bg-[#208EC1] text-white'
                      : 'bg-[#eef3f8] dark:bg-white/5 text-[#0f2544] dark:text-slate-200'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
