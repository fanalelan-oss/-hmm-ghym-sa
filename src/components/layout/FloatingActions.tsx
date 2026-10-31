'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';

export default function FloatingActions() {
  const { lang, dict, db } = useApp();

  const waUrl = `https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
    tText(db.settings.whatsappGreeting, lang)
  )}`;

  return (
    <div
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-center gap-3.5 print:hidden select-none"
      aria-label="أزرار التواصل السريع والمساعد الذكي"
    >
      {/* 1. زر المساعد الذكي الهندسي */}
      <Link
        href="/ai-engineer"
        title={dict.nav.aiEngineer}
        aria-label={dict.nav.aiEngineer}
        className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/95 backdrop-blur-md text-sky-400 border border-sky-500/30 shadow-[0_8px_20px_rgba(15,23,42,0.4)] hover:shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 stroke-current fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16.01" strokeWidth="2.5" />
          <line x1="16" y1="16" x2="16" y2="16.01" strokeWidth="2.5" />
        </svg>

        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500 border-2 border-slate-900" />
        </span>
      </Link>

      {/* 2. زر الواتساب الرسمي الاحترافي الدقيق والأيقونة القياسية */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={dict.nav.whatsapp}
        aria-label={dict.nav.whatsapp}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-25 animate-ping -z-10" />

        {/* WhatsApp Official Clean Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-white drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.67 20.16 9.32 19.8 8.13 19.1L7.84 18.93L4.72 19.75L5.55 16.7L5.36 16.4C4.59 15.17 4.19 13.76 4.19 11.91C4.19 7.37 7.89 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.15 12.39 9.73 14.83 12.16 15.88C12.74 16.13 13.19 16.28 13.54 16.39C14.12 16.57 14.65 16.55 15.07 16.49C15.54 16.42 16.51 15.9 16.71 15.34C16.92 14.78 16.92 14.3 16.86 14.2C16.8 14.1 16.63 14.04 16.38 13.91C16.13 13.79 14.89 13.18 14.66 13.1C14.43 13.01 14.27 12.97 14.1 13.22C13.94 13.47 13.48 14.01 13.34 14.17C13.2 14.33 13.06 14.35 12.81 14.22C12.56 14.1 11.76 13.84 10.81 12.99C10.07 12.33 9.57 11.52 9.43 11.27C9.28 11.02 9.41 10.89 9.54 10.76C9.65 10.65 9.79 10.47 9.92 10.32C10.05 10.17 10.09 10.06 10.17 9.9C10.25 9.74 10.21 9.6 10.15 9.48C10.09 9.36 9.63 8.22 9.44 7.76C9.25 7.31 9.06 7.37 8.92 7.36C8.79 7.35 8.66 7.33 8.53 7.33Z" />
        </svg>
      </a>
    </div>
  );
}