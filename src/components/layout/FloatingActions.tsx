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
      className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-50 flex flex-col items-center gap-2.5 print:hidden select-none"
      aria-label="أزرار التواصل السريع والمساعد الذكي"
    >
      {/* 1. Official WhatsApp Floating Button (15% more compact with soft smooth pulse) */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={dict.nav.whatsapp}
        aria-label={dict.nav.whatsapp}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full bg-[#25D366] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(37,211,102,0.40)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.60)]"
      >
        {/* Soft Smooth Ambient Pulse (no huge harsh jump) */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] animate-soft-pulse pointer-events-none -z-10" />

        {/* 100% Authentic Official WhatsApp Vector */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.675.15-.2.3-.775.978-.95 1.178-.175.2-.35.225-.65.075-.3-.15-1.268-.468-2.416-1.492-.894-.798-1.498-1.784-1.674-2.084-.175-.3-.019-.462.131-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.584-.492-.505-.675-.514-.175-.009-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.116 3.231 5.127 4.532.716.31 1.275.495 1.71.633.72.228 1.375.196 1.893.119.578-.086 1.78-.727 2.03-1.428.25-.701.25-1.302.175-1.428-.075-.126-.275-.201-.575-.351zM12.05 0C5.395 0 0 5.395 0 12.05c0 2.12.552 4.11 1.517 5.836L0 24l6.326-1.472A11.966 11.966 0 0012.05 24.1C18.705 24.1 24.1 18.705 24.1 12.05 24.1 5.395 18.705 0 12.05 0zm0 22.062c-1.896 0-3.66-.514-5.183-1.408l-.372-.221-3.856.897.904-3.757-.243-.387A9.97 9.97 0 012.038 12.05c0-5.521 4.491-10.012 10.012-10.012 5.521 0 10.012 4.491 10.012 10.012 0 5.521-4.491 10.012-10.012 10.012z"/>
        </svg>

        {/* Clean Floating Tooltip Label */}
        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 absolute left-full ml-3 whitespace-nowrap px-3 py-1 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold shadow-xl border border-white/10 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse" />
          <span>{dict.nav.whatsapp}</span>
          <span className="text-slate-400 font-mono text-[11px] ltr:inline rtl:hidden">({db.settings.phone})</span>
        </span>
      </a>

      {/* 2. Premium AI Engineer / Futuristic Chatbot Floating Button (15% more compact) */}
      <Link
        href="/ai-engineer"
        title={dict.nav.aiEngineer}
        aria-label={dict.nav.aiEngineer}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full bg-[#0F2544] border border-sky-400/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(15,37,68,0.4)] hover:shadow-[0_12px_30px_rgba(32,142,193,0.55)]"
      >
        {/* Soft Smooth Ambient Pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#208EC1] animate-soft-pulse pointer-events-none -z-10" />

        {/* Futuristic Glowing AI Sphere / Robot Avatar */}
        <svg
          viewBox="0 0 40 40"
          className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Robot Chassis Head */}
          <rect x="7" y="10" width="26" height="21" rx="8" fill="#122c4f" stroke="#38BDF8" strokeWidth="2" />
          {/* Antenna */}
          <path d="M20 5 L20 10" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="4" r="2" fill="#38BDF8" />
          {/* Cyber Visor Screen */}
          <rect x="11" y="15" width="18" height="7" rx="3.5" fill="#061220" />
          {/* Glowing Eyes */}
          <circle cx="15.5" cy="18.5" r="2" fill="#38BDF8" />
          <circle cx="24.5" cy="18.5" r="2" fill="#38BDF8" />
          {/* Subtle Smile */}
          <path d="M16 26 C18 28 22 28 24 26" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
          {/* Audio Receptors */}
          <rect x="4" y="16" width="2.5" height="8" rx="1" fill="#38BDF8" />
          <rect x="33.5" y="16" width="2.5" height="8" rx="1" fill="#38BDF8" />
        </svg>

        {/* Live Online Status Dot on Top-Right */}
        <span className="absolute top-0.5 right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400 border-2 border-[#0F2544]" />
        </span>

        {/* Clean Floating Tooltip Label */}
        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 absolute left-full ml-3 whitespace-nowrap px-3 py-1 rounded-xl bg-[#0f2544]/95 backdrop-blur-md text-white text-xs font-bold shadow-xl border border-sky-400/25 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block animate-pulse" />
          <span>{dict.nav.aiEngineer}</span>
          <span className="text-sky-300 text-[10px] bg-sky-950 px-1.5 py-0.5 rounded-full border border-sky-800">24/7 AI</span>
        </span>
      </Link>
    </div>
  );
}
