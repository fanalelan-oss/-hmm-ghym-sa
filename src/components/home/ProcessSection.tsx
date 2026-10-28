'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { Compass, Layers, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProcessSection() {
  const { dict } = useApp();

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
    <section className="py-16 lg:py-22 bg-white dark:bg-[#061121] transition-colors">
      <div className="smart-container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {dict.processSection.eyebrow}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white">
              {dict.processSection.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <ScrollReveal key={st.num} delayMs={idx * 60}>
                <div className="relative h-full p-7 rounded-[28px] bg-slate-50 dark:bg-[#0c1e36] border border-slate-200/80 dark:border-white/10 hover:border-[#208EC1] transition-all">
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#11345C] dark:bg-[#208EC1] text-white shadow-md">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="font-display font-extrabold text-2xl text-[#208EC1]/40">
                      {st.num}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
