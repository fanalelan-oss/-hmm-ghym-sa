'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { INTERNAL_LINK_RULES } from '@/lib/seo-links';

interface SmartLinkedTextProps {
  text: string;
  maxLinks?: number;
  className?: string;
}

interface FlatCandidate {
  phrase: string;
  href: string;
  titleAr: string;
}

const SORTED_CANDIDATES: FlatCandidate[] = INTERNAL_LINK_RULES.flatMap((rule) =>
  rule.phrases.map((phrase) => ({
    phrase,
    href: rule.href,
    titleAr: rule.titleAr,
  }))
).sort((a, b) => b.phrase.length - a.phrase.length);

export default function SmartLinkedText({
  text,
  maxLinks = 5,
  className,
}: SmartLinkedTextProps) {
  const pathname = usePathname() || '';

  if (!text) return null;

  const usedHrefs = new Set<string>();
  if (pathname) {
    usedHrefs.add(pathname);
  }

  let totalLinksCreated = 0;

  function linkifySegment(segment: string, keyPrefix: string): React.ReactNode[] {
    if (!segment || totalLinksCreated >= maxLinks) {
      return [segment];
    }

    for (const cand of SORTED_CANDIDATES) {
      if (usedHrefs.has(cand.href)) continue;

      const idx = segment.indexOf(cand.phrase);
      if (idx !== -1) {
        // Check word boundaries so we don't split inside another word
        const charBefore = idx > 0 ? segment[idx - 1] : ' ';
        const charAfter =
          idx + cand.phrase.length < segment.length
            ? segment[idx + cand.phrase.length]
            : ' ';

        const isBoundaryBefore = /[\s،.؛:()«»"\-\/]/.test(charBefore);
        const isBoundaryAfter = /[\s،.؛:()«»"\-\/]/.test(charAfter);

        if (isBoundaryBefore && isBoundaryAfter) {
          usedHrefs.add(cand.href);
          totalLinksCreated++;

          const before = segment.slice(0, idx);
          const matched = segment.slice(idx, idx + cand.phrase.length);
          const after = segment.slice(idx + cand.phrase.length);

          return [
            ...linkifySegment(before, `${keyPrefix}-b`),
            <Link
              key={`${keyPrefix}-lnk-${cand.href}`}
              href={cand.href}
              title={cand.titleAr}
              onClick={(e) => e.stopPropagation()}
              className="text-inherit underline decoration-[#208EC1]/55 hover:text-[#208EC1] hover:decoration-[#208EC1] underline-offset-4 font-semibold transition-colors"
            >
              {matched}
            </Link>,
            ...linkifySegment(after, `${keyPrefix}-a`),
          ];
        }
      }
    }

    return [segment];
  }

  const lines = text.split('\n');

  return (
    <span className={className}>
      {lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {linkifySegment(line, `ln-${idx}`)}
          {idx < lines.length - 1 && '\n'}
        </React.Fragment>
      ))}
    </span>
  );
}
