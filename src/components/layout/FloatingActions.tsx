'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText } from '@/lib/i18n';
import { MessageCircle, Bot } from 'lucide-react';

export default function FloatingActions() {
  const { lang, dict, db } = useApp();

  const waUrl = `https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
    tText(db.settings.whatsappGreeting, lang)
  )}`;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3 print:hidden"
      aria-label="أزرار التواصل السريع"
    >
      {/* Green Circular WhatsApp Button matching reference image */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={dict.nav.whatsapp}
        aria-label={dict.nav.whatsapp}
        className="group relative w-13 h-13 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_8px_25px_rgba(16,185,129,0.45)] flex items-center justify-center transition-all hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute left-full ml-3 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-lg">
          {dict.nav.whatsapp} ({db.settings.phone})
        </span>
      </a>

      {/* Dark Navy Circular AI Consultant Button matching reference image */}
      <Link
        href="/ai-engineer"
        title={dict.nav.aiEngineer}
        aria-label={dict.nav.aiEngineer}
        className="group relative w-13 h-13 p-3.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-sky-300 hover:text-white border border-sky-400/30 shadow-[0_8px_25px_rgba(15,37,68,0.45)] flex items-center justify-center transition-all hover:scale-110"
      >
        <Bot className="w-6 h-6" />
        <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute left-full ml-3 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#0f2544] text-white text-xs font-bold shadow-lg">
          {dict.nav.aiEngineer}
        </span>
      </Link>
    </div>
  );
}
