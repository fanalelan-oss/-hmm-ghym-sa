'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpLeft, Bot } from 'lucide-react';

export default function SiteFooter() {
  const { lang, dict, db } = useApp();

  const waUrl = `https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
    tText(db.settings.whatsappGreeting, lang)
  )}`;

  return (
    <footer className="bg-brand-950 text-slate-300 border-t border-white/10">
      <div className="smart-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <img
                src={db.settings.logoLight}
                alt={tText(db.settings.fullLegalName, lang)}
                width={150}
                height={90}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-300/90">
              {dict.footer.aboutText}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                {dict.nav.whatsapp}
              </a>
              <Link
                href="/ai-engineer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-signal-600 hover:bg-signal-500 text-white text-sm font-bold transition-all"
              >
                <Bot className="w-4 h-4" />
                {dict.nav.aiEngineer}
              </Link>
            </div>
          </div>

          {/* Column 2: Site Pages */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-5 pb-2 border-b border-white/10">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-signal-300 transition-colors">{dict.nav.home}</Link></li>
              <li><Link href="/about" className="hover:text-signal-300 transition-colors">{dict.nav.about}</Link></li>
              <li><Link href="/services" className="hover:text-signal-300 transition-colors">{dict.nav.services}</Link></li>
              <li><Link href="/portfolio" className="hover:text-signal-300 transition-colors">{dict.nav.portfolio} (100+)</Link></li>
              <li><Link href="/partners" className="hover:text-signal-300 transition-colors">{dict.nav.partners}</Link></li>
              <li><Link href="/calculator" className="hover:text-signal-300 transition-colors">{dict.nav.calculator}</Link></li>
              <li><Link href="/reviews" className="hover:text-signal-300 transition-colors">{dict.nav.reviews}</Link></li>
              <li><Link href="/blog" className="hover:text-signal-300 transition-colors">{dict.nav.blog}</Link></li>
              <li><Link href="/contact" className="hover:text-signal-300 transition-colors">{dict.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Column 3: All 8 Dedicated Service Pages */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-5 pb-2 border-b border-white/10">
              {dict.footer.ourServices}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {db.services.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-signal-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{tText(srv.name, lang)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Contact Details */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-5 pb-2 border-b border-white/10">
              {dict.footer.contactTitle}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-signal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-400">جوال وواتساب مباشر:</span>
                  <a
                    href={`tel:${db.settings.phoneClean}`}
                    className="text-white font-bold hover:text-signal-300 text-base"
                    dir="ltr"
                  >
                    {db.settings.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-signal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-slate-400">البريد الإلكتروني الرسمي:</span>
                  <a
                    href={`mailto:${db.settings.email}`}
                    className="text-white font-bold hover:text-signal-300 break-all"
                    dir="ltr"
                  >
                    {db.settings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-signal-400 shrink-0 mt-0.5" />
                <span>{tText(db.settings.address, lang)}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-signal-400 shrink-0 mt-0.5" />
                <span>{tText(db.settings.workingHours, lang)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 bg-black/25 py-5">
        <div className="smart-container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {tText(db.settings.fullLegalName, lang)} — {dict.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap XML
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              {dict.nav.admin}
            </Link>
            <Link
              href="/contact"
              className="text-signal-300 hover:text-white font-bold inline-flex items-center gap-1"
            >
              {dict.nav.requestQuote}
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
