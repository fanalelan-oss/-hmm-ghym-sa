'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Start visible=true by default so no section can ever disappear or render blank!
  // We apply a subtle transform animation when entering the viewport.
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setAnimated(true);
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setAnimated(true);
    }, 250);

    if (typeof IntersectionObserver === 'undefined') {
      setAnimated(true);
      return () => clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '80px 0px 80px 0px' }
    );

    observer.observe(el);
    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  const finalDelay = Math.min(delayMs || delay || 0, 200);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${finalDelay}ms` }}
      className={`transition-transform duration-500 ease-out opacity-100 ${
        animated ? 'translate-y-0' : 'translate-y-2'
      } ${className}`}
    >
      {children}
    </div>
  );
}
