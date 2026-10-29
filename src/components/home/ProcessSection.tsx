'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { Compass, Layers, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProcessSection() {
  const { dict } = useApp();
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance through steps 01 -> 02 -> 03 -> 04 so the workflow presents itself live
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2600);
    return () => clearInterval(t);
  }, [paused]);

  const steps = [
    {
      num: '01',
      icon: Compass,
      title: dict.processSection.s1Title,
      desc: dict.processSection.s1Desc,
    },
    {
      num: '02',
      icon: Layers,
      title: dict.processSection.s2Title,
      desc: dict.processSection.s2Desc,
    },
    {
      num: '03',
      icon: Cpu,
      title: dict.processSection.s3Title,
      desc: dict.processSection.s3Desc,
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: dict.processSection.s4Title,
      desc: dict.processSection.s4Desc,
    },
  ];

  return (
    <section className="py-14 lg:py-16 bg-[#f4f7fb] dark:bg-[#061121] transition-colors">
      <div className="smart-container">
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-9">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              {dict.processSection.eyebrow}
            </span>
            <h2 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug">
              {dict.processSection.title}
            </h2>
          </div>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeStep === idx;
            return (
              <ScrollReveal key={st.num} delayMs={idx * 85} variant="zoom-3d">
                <div
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`clean-card group relative h-full p-6 rounded-[24px] transition-all duration-500 ${
                    isActive
                      ? 'border-[#208EC1]/75 -translate-y-1.5 shadow-[0_24px_48px_-12px_rgba(32,142,193,0.18)]'
                      : ''
                  }`}
                >
                  {/* Animated Top Step Progress Bar */}
                  <div className="w-full h-1 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden mb-5">
                    <div
                      className={`h-full rounded-full bg-[#208EC1] transition-all duration-700 ${
                        isActive ? 'w-full' : 'w-1/4 opacity-35'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-500 ${
                        isActive
                          ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white scale-105 shadow-md'
                          : 'bg-[#208EC1]/10 text-[#208EC1] group-hover:bg-[#0f2544] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span
                      className={`font-display font-extrabold text-xl transition-colors duration-500 ${
                        isActive
                          ? 'text-[#208EC1]'
                          : 'text-slate-200 dark:text-white/15'
                      }`}
                    >
                      {st.num}
                    </span>
                  </div>
                  <h3
                    className={`font-display font-bold text-base mb-2 transition-colors duration-300 ${
                      isActive
                        ? 'text-[#208EC1]'
                        : 'text-[#0f2544] dark:text-white'
                    }`}
                  >
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
