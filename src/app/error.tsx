'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home, MessageCircle, AlertTriangle } from 'lucide-react';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#eef3f8] dark:bg-[#06101e] text-slate-800 dark:text-slate-100 flex items-center justify-center p-4 transition-colors font-sans"
    >
      <div className="max-w-md w-full bg-white dark:bg-[#0c1d34] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-500 dark:text-amber-400 mx-auto flex items-center justify-center border border-amber-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-[#0f2544] dark:text-white">
            عذراً، حدث خطأ مؤقت في تحميل الصفحة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
            نعتذر عن هذا الخطأ التقني. يمكنك الضغط على زر إعادة المحاولة أو العودة للصفحة الرئيسية للمتابعة.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#208EC1] hover:bg-sky-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة المحاولة</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0f2544] dark:bg-white/10 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>الرئيسية</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>تحتاج مساعدة فورية؟</span>
          <a
            href="https://wa.me/966565467928?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D9%88%D8%A7%D8%AC%D9%87%D8%AA%D9%86%D9%8A%20%D9%85%D8%B4%D9%83%D9%84%D8%A9%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-500 font-bold hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>واتساب همم غيم</span>
          </a>
        </div>
      </div>
    </div>
  );
}
