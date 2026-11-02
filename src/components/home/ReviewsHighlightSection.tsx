'use client';

import React, { useState, useEffect } from 'react';
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

  const approved = (db.reviews || []).filter((r) => r.approved).slice(0, 4);
  const [activeRev, setActiveRev] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || approved.length === 0) return;
    const t = setInterval(() => {
      setActiveRev((prev) => (prev + 1) % approved.length);
    }, 3200);
    return () => clearInterval(t);
  }, [paused, approved.length]);

  return (
    <section className="py-14 lg:py-16 bg-[#f4f7fb] dark:bg-[#061121] transition-colors">
      <div className="smart-container">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.reviewsSection.eyebrow}
              </span>
              <h2 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug">
                {dict.reviewsSection.title}
              </h2>
              <p className="mt-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                {dict.reviewsSection.subtitle}
              </p>
            </div>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5 shrink-0"
            >
              <span>{dict.reviewsSection.addReviewBtn}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* MOBILE ONLY: 3 Reviews Side-by-Side in 1 Row (شبكة ثلاث بطاقات متناسقة) */}
        <div
          className="grid grid-cols-3 gap-2 sm:hidden"
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 4000)}
        >
          {approved.slice(0, 3).map((rev, idx) => {
            const isSpotlit = activeRev === idx;
            return (
              <article
                key={rev.id}
                onClick={() => setActiveRev(idx)}
                className={`clean-card group relative p-2 sm:p-2.5 rounded-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                  isSpotlit
                    ? 'border-[#208EC1] -translate-y-1 shadow-[0_12px_24px_-6px_rgba(32,142,193,0.28)] bg-gradient-to-b from-[#208EC1]/[0.08] to-transparent'
                    : 'border-slate-200/90 dark:border-white/10'
                }`}
              >
                <div>
                  {/* Rating + Active Dot */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: Math.min(rev.rating || 5, 5) }).map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isSpotlit ? 'bg-[#208EC1] scale-125' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  </div>

                  {/* Comment */}
                  <p className="text-[9.5px] leading-tight text-slate-700 dark:text-slate-200 line-clamp-3 min-h-[36px]">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                {/* Reviewer info */}
                <div className="pt-1.5 mt-2 border-t border-slate-100 dark:border-white/5">
                  <p className="font-bold text-[10px] text-[#0f2544] dark:text-white truncate flex items-center gap-1">
                    <span className="truncate">{rev.name}</span>
                    <CheckCircle className="w-2.5 h-2.5 text-[#208EC1] shrink-0" />
                  </p>
                  <p className="text-[8.5px] text-slate-400 truncate">
                    {rev.role}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* DESKTOP ONLY: 4 Full-Width Cards */}
        <div
          className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {approved.map((rev, idx) => {
            const isSpotlit = activeRev === idx;
            return (
              <ScrollReveal key={rev.id} delayMs={idx * 75} variant="zoom-3d">
                <article
                  onMouseEnter={() => setActiveRev(idx)}
                  className={`clean-card h-full flex flex-col justify-between p-5 sm:p-6 rounded-[24px] transition-all duration-500 ${
                    isSpotlit
                      ? 'border-[#208EC1]/70 -translate-y-1.5 shadow-[0_24px_48px_-12px_rgba(32,142,193,0.18)]'
                      : ''
                  }`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#208EC1]">
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 fill-current transition-transform duration-300 ${
                              isSpotlit ? 'scale-110' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <MessageSquareQuote
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isSpotlit
                            ? 'text-[#208EC1]'
                            : 'text-slate-300 dark:text-white/20'
                        }`}
                      />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    {rev.reply && (
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#071324] border border-slate-200/70 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-[#208EC1] block mb-1">
                          {dict.reviewsSection.officialReply}
                        </span>
                        {rev.reply}
                      </div>
                    )}
                  </div>

                  <div className="pt-3.5 mt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#0f2544] dark:text-white flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-[#208EC1] shrink-0" />
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {rev.role}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {rev.date}
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
