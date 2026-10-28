'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import ScrollReveal from '@/components/layout/ScrollReveal';
import {
  Star,
  ArrowLeft,
  ArrowRight,
  MessageSquareQuote,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export default function ReviewsHighlightSection() {
  const { dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Show up to 4 reviews on widescreen so 4-column layout is balanced
  const approved = (db.reviews || []).filter((r) => r.approved).slice(0, 4);

  return (
    <section className="py-16 lg:py-22 bg-white dark:bg-[#061121] transition-colors">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-extrabold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.reviewsSection.eyebrow}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">
                {dict.reviewsSection.title}
              </h2>
              <p className="mt-2.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                {dict.reviewsSection.subtitle}
              </p>
            </div>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 whitespace-nowrap px-6 py-3.5 rounded-full bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              <span>{dict.reviewsSection.addReviewBtn}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {approved.map((rev, idx) => (
            <ScrollReveal key={rev.id} delayMs={idx * 50}>
              <article className="h-full flex flex-col justify-between p-6 rounded-[28px] bg-slate-50 dark:bg-[#0c1e36] border border-slate-200/80 dark:border-white/10 hover:border-[#208EC1] transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <MessageSquareQuote className="w-5 h-5 text-[#208EC1]/50" />
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {rev.reply && (
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-[#071324] border border-[#208EC1]/25 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-[#208EC1] block mb-1">
                        {dict.reviewsSection.officialReply}
                      </span>
                      {rev.reply}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {rev.role}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
