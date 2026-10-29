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
      className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-3.5 print:hidden select-none"
      aria-label="أزرار التواصل السريع والمساعد الذكي"
    >
      {/* 1. Realistic Official 3D WhatsApp Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={dict.nav.whatsapp}
        aria-label={dict.nav.whatsapp}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_38px_rgba(37,211,102,0.65)]"
      >
        {/* Subtle Ping Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping duration-1000 -z-10" />

        {/* Realistic WhatsApp Badge SVG with Gradient & Drop Shadow Handset */}
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waRealisticGrad" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#29E56F" />
              <stop offset="100%" stopColor="#1EBE5D" />
            </linearGradient>
            <linearGradient id="waGloss" x1="32" y1="3" x2="32" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Main Green Circular Body */}
          <circle cx="32" cy="32" r="29" fill="url(#waRealisticGrad)" />
          {/* Subtle Top Inner Gloss Reflection */}
          <ellipse cx="32" cy="18" rx="20" ry="11" fill="url(#waGloss)" />

          {/* Authentic WhatsApp Speech Tail & Handset in White */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 12C20.954 12 12 20.954 12 32c0 3.793 1.055 7.34 2.88 10.368L12.5 51.5l9.467-2.348A19.92 19.92 0 0032 52c11.046 0 20-8.954 20-20S43.046 12 32 12zm-3.4 9.1c.3-.7.7-.7 1-.7h1.4c.3 0 .7.1 1 .8.4 1 1.4 3.4 1.5 3.6.1.3.2.6 0 .9-.1.3-.3.5-.5.7-.3.3-.6.6-.8.8-.3.3-.6.6-.2 1.2.4.7 1.7 2.8 3.7 4.5 2.5 2.2 4.7 2.9 5.4 3.2.6.3 1 .3 1.4-.2.4-.5 1.7-2 2.2-2.7.4-.7.8-.6 1.4-.4.6.2 3.8 1.8 4.4 2.1.6.3 1 .5 1.2.7.1.3.1 1.7-.5 3.3-.6 1.7-3.4 3.2-4.7 3.3-1.3.1-2.5.5-8.4-1.8-7.1-2.8-11.7-10.1-12-10.6-.4-.5-2.8-3.7-2.8-7.1s1.8-5.1 2.4-5.8z"
            fill="#FFFFFF"
          />
        </svg>

        {/* Clean Floating Tooltip Label */}
        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 absolute left-full ml-3.5 whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold shadow-xl border border-white/10 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse" />
          <span>{dict.nav.whatsapp}</span>
          <span className="text-slate-400 font-mono text-[11px] ltr:inline rtl:hidden">({db.settings.phone})</span>
        </span>
      </a>

      {/* 2. Premium AI Engineer / Futuristic Chatbot Floating Button */}
      <Link
        href="/ai-engineer"
        title={dict.nav.aiEngineer}
        aria-label={dict.nav.aiEngineer}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(32,142,193,0.4)] hover:shadow-[0_14px_38px_rgba(32,142,193,0.65)]"
      >
        {/* Futuristic Glowing AI Sphere Badge SVG */}
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full drop-shadow-[0_4px_10px_rgba(15,37,68,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aiSphereGrad" x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#153660" />
              <stop offset="60%" stopColor="#0B1C33" />
              <stop offset="100%" stopColor="#060E1A" />
            </linearGradient>
            <linearGradient id="aiCyanGlow" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <radialGradient id="aiCorePulse" cx="32" cy="32" r="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Navy Base Orb */}
          <circle cx="32" cy="32" r="29" fill="url(#aiSphereGrad)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
          {/* Subtle Inner Glow */}
          <circle cx="32" cy="32" r="22" fill="url(#aiCorePulse)" />

          {/* Futuristic Robot Head / AI Hologram Visor */}
          <g transform="translate(16, 16)">
            {/* Antenna with Glowing Sensor */}
            <path d="M16 3 L16 8" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="16" cy="3" r="2.5" fill="#38BDF8" className="animate-pulse" />

            {/* Robot Chassis Contour */}
            <rect x="5" y="8" width="22" height="18" rx="7" fill="#0F2544" stroke="#38BDF8" strokeWidth="2" />

            {/* Glowing Cybernetic Visor / Eyes */}
            <rect x="9" y="13" width="14" height="6" rx="3" fill="#031022" />
            <circle cx="12.5" cy="16" r="2" fill="#38BDF8" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="12.5" cy="16" r="2" fill="#38BDF8" />
            <circle cx="19.5" cy="16" r="2" fill="#38BDF8" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="19.5" cy="16" r="2" fill="#38BDF8" />

            {/* Tech Smile / Voice Waves */}
            <path d="M12 21 C14 23 18 23 20 21" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

            {/* Subtle Ears / Audio Receptors */}
            <rect x="2" y="13" width="2" height="7" rx="1" fill="#38BDF8" />
            <rect x="28" y="13" width="2" height="7" rx="1" fill="#38BDF8" />
          </g>
        </svg>

        {/* Live Online Status Dot on Top-Right */}
        <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border-2 border-[#0B1C33]" />
        </span>

        {/* Clean Floating Tooltip Label */}
        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 absolute left-full ml-3.5 whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-[#0f2544]/95 backdrop-blur-md text-white text-xs font-bold shadow-xl border border-sky-400/25 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 inline-block animate-pulse" />
          <span>{dict.nav.aiEngineer}</span>
          <span className="text-sky-300 text-[10px] bg-sky-950 px-1.5 py-0.5 rounded-full border border-sky-800">24/7 AI</span>
        </span>
      </Link>
    </div>
  );
}
