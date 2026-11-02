import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#eef3f8] dark:bg-[#06101e] text-slate-800 dark:text-slate-100 flex items-center justify-center p-4 transition-colors font-sans"
    >
      <div className="max-w-md w-full bg-white dark:bg-[#0c1d34] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#208EC1]/10 text-[#208EC1] mx-auto flex items-center justify-center border border-[#208EC1]/20">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black text-[#208EC1] tracking-widest uppercase">
            رمز الخطأ 404
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-[#0f2544] dark:text-white">
            الصفحة المطلوبة غير موجودة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
            يبدو أن الرابط الذي طلبته غير صحيح أو تم نقله. يمكنك تصفح خدماتنا أو العودة للصفحة الرئيسية.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#208EC1] hover:bg-sky-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0f2544] dark:bg-white/10 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <span>خدماتنا</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
