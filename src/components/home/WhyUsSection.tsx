'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { ShieldCheck, Award, FileCheck2, Layers, Sparkles } from 'lucide-react';

export default function WhyUsSection() {
  const { dict, lang } = useApp();
  const [activeCard, setActiveCard] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-cycle spotlight across the 4 feature cards so they dynamically present themselves
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(t);
  }, [paused]);

  const cards = [
    {
      num: '01',
      icon: ShieldCheck,
      title: dict.whyUs.c1Title,
      desc: dict.whyUs.c1Desc,
    },
    {
      num: '02',
      icon: Award,
      title: dict.whyUs.c2Title,
      desc: dict.whyUs.c2Desc,
    },
    {
      num: '03',
      icon: FileCheck2,
      title: dict.whyUs.c3Title,
      desc: dict.whyUs.c3Desc,
    },
    {
      num: '04',
      icon: Layers,
      title: dict.whyUs.c4Title,
      desc: dict.whyUs.c4Desc,
    },
  ];

  return (
    <section className="py-14 lg:py-16 bg-[#f4f7fb] dark:bg-[#061121] transition-colors">
      <div className="smart-container">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-9">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.whyUs.eyebrow}
              </span>
              <h2 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug">
                {dict.whyUs.title}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
              {dict.whyUs.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {cards.map((c, idx) => {
            const Icon = c.icon;
            const isSpotlit = activeCard === idx;
            return (
              <ScrollReveal key={idx} delayMs={idx * 80} variant="zoom-3d">
                <article
                  onMouseEnter={() => setActiveCard(idx)}
                  className={`clean-card group relative h-full p-6 rounded-[24px] flex flex-col justify-between transition-all duration-500 ${
                    isSpotlit
                      ? 'border-[#208EC1]/70 -translate-y-1.5 shadow-[0_24px_48px_-12px_rgba(32,142,193,0.18)]'
                      : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isSpotlit
                            ? 'bg-[#208EC1] text-white scale-105 shadow-[0_8px_20px_-4px_rgba(32,142,193,0.45)]'
                            : 'bg-[#208EC1]/10 text-[#208EC1] group-hover:bg-[#208EC1] group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`font-display font-extrabold text-xl transition-colors duration-500 ${
                          isSpotlit
                            ? 'text-[#208EC1]/45'
                            : 'text-slate-200 dark:text-white/10 group-hover:text-[#208EC1]/30'
                        }`}
                      >
                        {c.num}
                      </span>
                    </div>

                    <h3
                      className={`font-display font-bold text-base mb-2 transition-colors duration-300 ${
                        isSpotlit
                          ? 'text-[#208EC1]'
                          : 'text-[#0f2544] dark:text-white group-hover:text-[#208EC1]'
                      }`}
                    >
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-bold text-[#208EC1]">
                    <span>
                      {lang === 'ar'
                        ? 'ضمان وجودة معتمدة'
                        : 'Guaranteed Quality'}
                    </span>
                    <span
                      className={`h-2 rounded-full bg-[#208EC1] transition-all duration-500 ${
                        isSpotlit ? 'w-7' : 'w-2'
                      }`}
                    />
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
