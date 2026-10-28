'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { ShieldCheck, Award, FileCheck2, Layers, Sparkles } from 'lucide-react';

export default function WhyUsSection() {
  const { dict } = useApp();

  const cards = [
    {
      num: '01',
      icon: ShieldCheck,
      title: dict.whyUs.c1Title,
      desc: dict.whyUs.c1Desc,
      accent: 'from-[#208EC1] to-[#11345C]',
    },
    {
      num: '02',
      icon: Award,
      title: dict.whyUs.c2Title,
      desc: dict.whyUs.c2Desc,
      accent: 'from-emerald-500 to-teal-700',
    },
    {
      num: '03',
      icon: FileCheck2,
      title: dict.whyUs.c3Title,
      desc: dict.whyUs.c3Desc,
      accent: 'from-amber-500 to-orange-600',
    },
    {
      num: '04',
      icon: Layers,
      title: dict.whyUs.c4Title,
      desc: dict.whyUs.c4Desc,
      accent: 'from-indigo-500 to-[#11345C]',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-[#061121] transition-colors">
      <div className="smart-container">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-extrabold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {dict.whyUs.eyebrow}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                {dict.whyUs.title}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {dict.whyUs.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((c, idx) => {
            const Icon = c.icon;
            return (
              <ScrollReveal key={idx} delayMs={idx * 60}>
                <article className="group relative h-full p-7 rounded-[28px] bg-slate-50/90 dark:bg-[#0c1e36] border border-slate-200/80 dark:border-white/10 hover:border-[#208EC1] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br ${c.accent} text-white flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-display font-extrabold text-3xl text-slate-200 dark:text-white/10 group-hover:text-[#208EC1]/30 transition-colors">
                        {c.num}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-3 group-hover:text-[#208EC1] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs font-bold text-[#208EC1]">
                    <span>معيار هندسي معتمد</span>
                    <span className="w-2 h-2 rounded-full bg-[#208EC1]" />
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
