'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import { Phone, Mail, MapPin, Clock, MessageCircle, Bot } from 'lucide-react';

export default function SiteFooter() {
  const { lang, dict, db } = useApp();

  const waUrl = `https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
    tText(db.settings.whatsappGreeting, lang)
  )}`;

  const developerWaUrl = `https://wa.me/966557517792?text=${encodeURIComponent(
    'مرحباً فن الإعلان، أرغب في الاستفسار عن تصميم وتطوير المواقع والتطبيقات'
  )}`;

  return (
    <footer className="bg-[#071325] text-slate-300 border-t border-white/10 relative z-10 pb-20 lg:pb-0">
      <div className="smart-container py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img
                src={db.settings.logoLight?.startsWith('/') ? db.settings.logoLight : '/' + db.settings.logoLight}
                alt={tText(db.settings.fullLegalName, lang)}
                width={140}
                height={80}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300/90 line-clamp-3 sm:line-clamp-none">
              {dict.footer.aboutText}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{dict.nav.whatsapp}</span>
              </a>
              <Link
                href="/ai-engineer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#208EC1] hover:bg-sky-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95"
              >
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{dict.nav.aiEngineer}</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links (2-Column Grid on Mobile for compact height) */}
          <div>
            <h3 className="text-white font-display font-bold text-sm sm:text-base mb-3 sm:mb-5 pb-2 border-b border-white/10 flex items-center justify-between">
              <span>{dict.footer.quickLinks}</span>
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-2 gap-y-2 text-xs sm:text-sm">
              <li><Link href="/" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.home}</Link></li>
              <li><Link href="/about" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.about}</Link></li>
              <li><Link href="/services" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.services}</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.portfolio} (100+)</Link></li>
              <li><Link href="/partners" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.partners}</Link></li>
              <li><Link href="/calculator" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.calculator}</Link></li>
              <li><Link href="/reviews" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.reviews}</Link></li>
              <li><Link href="/blog" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.blog}</Link></li>
              <li><Link href="/contact" className="hover:text-[#208EC1] transition-colors truncate block">{dict.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Column 3: All 8 Services (2-Column Grid on Mobile - Smart & Compact) */}
          <div>
            <h3 className="text-white font-display font-bold text-sm sm:text-base mb-3 sm:mb-5 pb-2 border-b border-white/10">
              {dict.footer.ourServices}
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-2 gap-y-2 text-xs sm:text-sm">
              {db.services.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-[#208EC1] transition-colors truncate block"
                  >
                    <span>{tText(srv.shortName || srv.name, lang)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Contact Details */}
          <div>
            <h3 className="text-white font-display font-bold text-sm sm:text-base mb-3 sm:mb-5 pb-2 border-b border-white/10">
              {dict.footer.contactTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <Phone className="w-4 h-4 text-[#208EC1] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-400">جوال وواتساب:</span>
                  <a
                    href={`tel:${db.settings.phoneClean}`}
                    className="text-white font-bold hover:text-[#208EC1] text-xs sm:text-sm truncate block"
                    dir="ltr"
                  >
                    {db.settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <Mail className="w-4 h-4 text-[#208EC1] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-400">البريد الإلكتروني:</span>
                  <a
                    href={`mailto:${db.settings.email}`}
                    className="text-white font-bold hover:text-[#208EC1] text-xs truncate block"
                    dir="ltr"
                  >
                    {db.settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <MapPin className="w-4 h-4 text-[#208EC1] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-400">التغطية:</span>
                  <span className="text-slate-200 text-xs leading-tight line-clamp-1">
                    {tText(db.settings.address, lang)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <Clock className="w-4 h-4 text-[#208EC1] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-400">ساعات العمل:</span>
                  <span className="text-slate-200 text-xs leading-tight line-clamp-1">
                    {tText(db.settings.workingHours, lang)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Developer Widget */}
      <div className="border-t border-white/10 bg-black/40 py-4">
        <div className="smart-container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-start">
          <p className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} {tText(db.settings.fullLegalName, lang)} — {dict.footer.rights}
          </p>

          {/* Fanalelan Development Credit Widget */}
          <a
            href={developerWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="تواصل مع المطور عبر واتساب"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 text-slate-300 hover:text-white transition-all text-[11px] font-bold group shadow-sm active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
            <span>تصميم وتطوير: <strong className="text-emerald-400 font-extrabold group-hover:underline">فن الإعلان</strong></span>
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          </a>
        </div>
      </div>
    </footer>
  );
}
