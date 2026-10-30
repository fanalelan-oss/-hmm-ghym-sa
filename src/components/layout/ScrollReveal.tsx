'use client';

import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-right'
  | 'fade-left'
  | 'zoom-3d';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  delay?: number;
  variant?: RevealVariant;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  delay = 0,
  variant = 'fade-up',
  once = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            // Reset smoothly when scrolled below the screen so scrolling down again replays the entrance
            if (entry.boundingClientRect.top > window.innerHeight * 0.92) {
              setVisible(false);
            }
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const finalDelay = Math.min(delayMs || delay || 0, 480);

  const hiddenClasses: Record<RevealVariant, string> = {
    'fade-up': 'opacity-0 translate-y-9 scale-[0.96]',
    'fade-down': 'opacity-0 -translate-y-8 scale-[0.96]',
    'fade-right': 'opacity-0 translate-x-10 scale-[0.97]',
    'fade-left': 'opacity-0 -translate-x-10 scale-[0.97]',
    'zoom-3d': 'opacity-0 translate-y-7 scale-[0.92]',
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${finalDelay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all duration-700 will-change-[transform,opacity] ${
        visible
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
          : hiddenClasses[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
