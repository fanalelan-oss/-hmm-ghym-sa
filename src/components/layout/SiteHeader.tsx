'use client';

import React, { useState } from 'react';
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
  Bot,
  ChevronDown,
  Globe,
  FileText,
} from 'lucide-react';

export default function SiteHeader() {
  const { lang, setLang, theme, toggleTheme, dict, db } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const primaryLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/services', label: dict.nav.services },
    { href: '/portfolio', label: dict.nav.portfolio },
    { href: '/ai-engineer', label: dict.nav.aiEngineer, icon: Bot },
    { href: '/calculator', label: dict.nav.calculator },
    { href: '/reviews', label: dict.nav.reviews },
  ];

  const secondaryLinks = [
    { href: '/partners', label: dict.nav.partners },
    { href: '/blog', label: dict.nav.blog },
    { href: '/about', label: dict.nav.about },
    { href: '/contact', label: dict.nav.contact },
    { href: '/admin', label: dict.nav.admin },
  ];

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-8 lg:px-12 transition-all duration-300">
      <div className="w-full max-w-[1560px] mx-auto">
        {/* Clean White Floating Pill Navbar matching the reference design */}
        <div className="rounded-full bg-white/95 dark:bg-[#0b192e]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-[0_10px_35px_-10px_rgba(15,37,68,0.12)] px-5 sm:px-8 h-[74px] flex items-center justify-between gap-4">
          {/* Right (RTL Start): Logo + Navigation Links */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="flex items-center shrink-0 group"
              aria-label={tText(db.settings.companyName, lang)}
            >
              <img
                src={theme === 'dark' ? db.settings.logoLight : db.settings.logoDark}
                alt={tText(db.settings.fullLegalName, lang)}
                width={110}
                height={60}
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Clean Text Navigation Links */}
            <nav
              className="hidden xl:flex items-center gap-5 2xl:gap-7"
              aria-label="القائمة الرئيسية"
            >
              {primaryLinks.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap text-[13.5px] font-bold transition-colors flex items-center gap-1.5 py-1 ${
                      active
                        ? 'text-[#208EC1] font-extrabold'
                        : 'text-[#0f2544] dark:text-slate-200 hover:text-[#208EC1]'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 text-[#208EC1] shrink-0" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* "المزيد ▾" Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="whitespace-nowrap text-[13.5px] font-bold text-[#0f2544] dark:text-slate-200 hover:text-[#208EC1] flex items-center gap-1 py-1 transition-colors"
                >
                  <span>
                    {lang === 'ar'
                      ? 'المزيد'
                      : lang === 'ur'
                      ? 'مزید'
                      : 'More'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      moreOpen ? 'rotate-180 text-[#208EC1]' : ''
                    }`}
                  />
                </button>

                {moreOpen && (
                  <div className="absolute top-full start-0 pt-3 w-52 z-50">
                    <div className="rounded-2xl bg-white dark:bg-[#0d213b] border border-slate-200/90 dark:border-white/10 shadow-xl p-2 space-y-1">
                      {secondaryLinks.map((sub) => {
                        const active = pathname.startsWith(sub.href);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMoreOpen(false)}
                            className={`whitespace-nowrap block px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                              active
                                ? 'bg-[#208EC1]/10 text-[#208EC1]'
                                : 'text-[#0f2544] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Left (RTL End): Language + Theme Toggle + Dark Navy Pill CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold text-[#0f2544] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <span className="uppercase">
                  {lang === 'ar' ? 'EN' : lang === 'en' ? 'عربي' : 'اردو'}
                </span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <Globe className="w-4 h-4 text-slate-500 dark:text-slate-300" />
              </button>

              {langMenuOpen && (
                <div className="absolute top-full end-0 mt-2 w-32 rounded-2xl bg-white dark:bg-[#0d213b] border border-slate-200 dark:border-white/10 shadow-xl p-1.5 z-50">
                  {(['ar', 'en', 'ur'] as Lang[]).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => {
                        setLang(l);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        lang === l
                          ? 'bg-[#208EC1]/15 text-[#208EC1]'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {l === 'ar' ? 'العربية' : l === 'en' ? 'English' : 'اردو'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Day / Night Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 flex items-center justify-center text-[#0f2544] dark:text-amber-300 transition-all"
              title={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
              aria-label="تبديل الوضع النهاري والليلي"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {/* Primary Dark Navy Pill CTA Button matching reference image */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 whitespace-nowrap px-5 sm:px-6 py-2.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] dark:bg-[#208EC1] dark:hover:bg-sky-400 text-white text-xs sm:text-[13px] font-extrabold shadow-md transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-sky-300 dark:text-white shrink-0" />
              <span>{dict.nav.requestQuote}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-2 rounded-3xl bg-white dark:bg-[#0b192e] border border-slate-200 dark:border-white/10 p-5 shadow-2xl space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[...primaryLinks, ...secondaryLinks].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                    pathname === item.href
                      ? 'bg-[#208EC1]/15 text-[#208EC1]'
                      : 'bg-slate-50 dark:bg-white/5 text-[#0f2544] dark:text-slate-200'
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
