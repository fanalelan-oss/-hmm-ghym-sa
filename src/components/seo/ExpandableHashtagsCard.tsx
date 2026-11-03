'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Hash, ChevronDown } from 'lucide-react';
import {
  getMegaHashtagsForCategory,
  getHashtagTargetHref,
} from '@/lib/seo-links';

interface ExpandableHashtagsCardProps {
  primaryTags?: string[];
  category?: string;
  title?: string;
  visibleCount?: number;
  variant?: 'card' | 'inline';
  lang?: 'ar' | 'en' | 'ur';
}

export default function ExpandableHashtagsCard({
  primaryTags = [],
  category,
  title,
  visibleCount = 8,
  variant = 'card',
  lang = 'ar',
}: ExpandableHashtagsCardProps) {
  const [expanded, setExpanded] = useState(false);

  const allTags = getMegaHashtagsForCategory(category, primaryTags);
  const visibleTags = allTags.slice(0, visibleCount);
  const extraTags = allTags.slice(visibleCount);

  const headingText =
    title ||
    (lang === 'ar'
      ? 'كلمات مفتاحية وهاشتاقات القسم'
      : lang === 'ur'
      ? 'متعلقہ کلیدی الفاظ اور ہیش ٹیگز'
      : 'Specialized SEO Keywords & Hashtags');

  const content = (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display font-bold text-base sm:text-lg text-[#0f2544] dark:text-white flex items-center gap-2">
          <Hash className="w-5 h-5 text-[#208EC1] shrink-0" />
          <span>{headingText}</span>
        </h2>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#208EC1]/10 text-[#208EC1]">
          {allTags.length}+ {lang === 'ar' ? 'كلمة بحثية' : 'SEO Tags'}
        </span>
      </div>

      {/* Currently Visible Hashtags (الظاهرة افتراضياً) */}
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <Link
            key={tag}
            href={getHashtagTargetHref(tag, category)}
            className="px-3 py-1.5 rounded-xl bg-[#f4f7fb] dark:bg-brand-950 hover:bg-[#208EC1] hover:text-white border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* Expandable Dropdown for Massive Specialized SEO Keywords (انسدال الكلمات المتخصصة الكثيرة) */}
      {extraTags.length > 0 && (
        <div className="pt-2 border-t border-slate-200/70 dark:border-white/10">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="w-full py-2 px-3 rounded-xl bg-[#eef3f8] dark:bg-white/5 hover:bg-[#208EC1]/15 text-[#0f2544] dark:text-sky-300 text-xs font-extrabold flex items-center justify-between gap-2 transition-colors"
          >
            <span>
              {expanded
                ? lang === 'ar'
                  ? 'إخفاء الكلمات المفتاحية المتخصصة الإضافية'
                  : 'Hide Additional Specialized Keywords'
                : lang === 'ar'
                ? `انسدال الكلمات المفتاحية والهاشتاقات المتخصصة (+${extraTags.length} وسم بحثي)`
                : `Show Specialized SEO Keywords (+${extraTags.length} Tags)`}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#208EC1] transition-transform duration-300 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Kept in DOM for 100% Search Engine Indexing */}
          <div
            className={`transition-all duration-300 ${
              expanded
                ? 'max-h-[650px] opacity-100 pt-3 overflow-y-auto'
                : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
            }`}
          >
            <div className="flex flex-wrap gap-1.5">
              {extraTags.map((tag) => (
                <Link
                  key={tag}
                  href={getHashtagTargetHref(tag, category)}
                  className="px-2.5 py-1 rounded-lg bg-[#f4f7fb] dark:bg-brand-950/80 hover:bg-[#208EC1] hover:text-white border border-slate-200/80 dark:border-white/10 text-[11px] font-medium text-slate-600 dark:text-slate-300 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (variant === 'inline') {
    return content;
  }

  return <div className="p-6 sm:p-8 rounded-3xl clean-card">{content}</div>;
}
