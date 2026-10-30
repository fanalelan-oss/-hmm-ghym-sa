'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText, tList } from '@/lib/i18n';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Hash,
  Phone,
  Bot,
  Play,
} from 'lucide-react';

export default function SingleServicePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  const service =
    db.services.find((s) => s.slug === slug || s.id === slug) || db.services[0];

  const serviceProjects = db.portfolio.filter((p) => p.category === service.id);
  const features = tList(service.features, lang);
  const audience = tList(service.audience, lang);

  return (
    <div className="py-12 lg:py-20 space-y-20 bg-[#eef3f8] dark:bg-brand-950">
      {/* Dedicated Service Header */}
      <div className="smart-container">
        <nav className="text-xs text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:underline">{dict.nav.home}</Link>
          <span>/</span>
          <Link href="/services" className="hover:underline">{dict.nav.services}</Link>
          <span>/</span>
          <span className="text-[#208EC1] font-bold">
            {tText(service.name, lang)}
          </span>
        </nav>

        <div className="rounded-3xl bg-[#0f2544] text-white p-8 sm:p-12 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#208EC1]/20 border border-[#208EC1]/40 text-sky-300 text-xs font-bold">
              {tText(service.shortName, lang)} · {serviceProjects.length} مشروع موثق
            </span>
            <h1 className="heading-3d-light font-display font-extrabold text-xl sm:text-2xl lg:text-[28px] leading-snug">
              {tText(service.name, lang)}
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {tText(service.description, lang)}
            </p>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 inline-block">
              <span className="text-xs text-sky-300 block">التسعير التقديري:</span>
              <span className="text-sm sm:text-base font-bold text-white">
                {tText(service.priceRange, lang)}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/contact?service=${service.id}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#208EC1] hover:bg-sky-400 text-white font-bold text-sm sm:text-base shadow-lg transition-all"
              >
                <span>{dict.servicesSection.requestService}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-engineer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base transition-all"
              >
                <Bot className="w-4 h-4 text-sky-300" />
                <span>{dict.hero.ctaAi}</span>
              </Link>
              <a
                href={`tel:${db.settings.phoneClean}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white text-[#0f2544] hover:bg-sky-50 font-bold text-sm sm:text-base transition-all"
              >
                <Phone className="w-4 h-4 text-[#208EC1]" />
                <span dir="ltr">{db.settings.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl aspect-[4/3] bg-slate-900">
              <img
                src={service.coverImage}
                alt={tText(service.name, lang)}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Features & Target Audience */}
      <div className="smart-container grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-8 rounded-3xl clean-card">
          <h2 className="font-display font-bold text-2xl text-[#0f2544] dark:text-white mb-6">
            ماذا نقدم في {tText(service.name, lang)}؟
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <li
                key={i}
                className="p-4 rounded-2xl bg-[#f4f7fb] dark:bg-brand-950 border border-slate-200/80 dark:border-white/10 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#208EC1] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 p-8 rounded-3xl clean-card flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-display font-bold text-xl text-[#0f2544] dark:text-white mb-4">
              القطاعات المستفيدة
            </h3>
            <div className="space-y-2.5">
              {audience.map((aud, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-xl bg-[#f4f7fb] dark:bg-brand-950 border border-slate-200/80 dark:border-white/10 text-sm font-bold text-[#0f2544] dark:text-sky-300"
                >
                  {aud}
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f2544] text-white space-y-2 shadow-lg">
            <p className="text-xs text-sky-300 font-bold">معاينة موقع ورفع مقاسات مجاني</p>
            <p className="text-sm text-slate-200">
              تواصل معنا الآن ليقوم مهندس مختص بزيارة موقعك وتقديم مقايسة دقيقة.
            </p>
            <Link
              href={`/contact?service=${service.id}`}
              className="mt-2 block w-full py-2.5 rounded-xl bg-[#208EC1] text-center text-xs font-bold text-white hover:bg-sky-400"
            >
              اطلب معاينة مجانية
            </Link>
          </div>
        </div>
      </div>

      {/* Executed Projects in This Service Category */}
      <div className="smart-container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0f2544] dark:text-white">
            مشاريع منفذة في {tText(service.shortName, lang)} ({serviceProjects.length})
          </h2>
          <Link
            href="/portfolio"
            className="text-sm font-bold text-[#208EC1] hover:underline"
          >
            عرض كل الـ 100 مشروع ←
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceProjects.map((proj) => (
            <article
              key={proj.id}
              className="floating-card group rounded-3xl overflow-hidden p-2.5 flex flex-col justify-between"
            >
              <Link
                href={`/portfolio/${proj.slug}`}
                className="relative aspect-[4/3] rounded-2xl bg-slate-900 block overflow-hidden"
              >
                <img
                  src={proj.type === 'video' ? proj.poster : proj.src}
                  alt={tText(proj.alt, lang)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {proj.type === 'video' && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#208EC1] text-white text-xs font-bold inline-flex items-center gap-1 shadow-md">
                    <Play className="w-3 h-3 fill-current" />
                    فيديو
                  </span>
                )}
              </Link>
              <div className="p-4">
                <h3 className="font-display font-extrabold text-base text-[#0f2544] dark:text-white">
                  <Link href={`/portfolio/${proj.slug}`} className="hover:text-[#208EC1]">
                    {tText(proj.title, lang)}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tText(proj.summary, lang)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Service FAQs & SEO Hashtags */}
      <div className="smart-container grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 p-8 rounded-3xl clean-card space-y-5">
          <h2 className="font-display font-bold text-2xl text-[#0f2544] dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#208EC1]" />
            <span>الأسئلة الشائعة حول {tText(service.shortName, lang)}</span>
          </h2>
          <div className="space-y-4">
            {(service.faqs || []).map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#f4f7fb] dark:bg-brand-950 border border-slate-200/80 dark:border-white/10"
              >
                <h3 className="font-bold text-base text-[#0f2544] dark:text-white mb-2">
                  {tText(faq.q, lang)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tText(faq.a, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 p-8 rounded-3xl clean-card space-y-4">
          <h2 className="font-display font-bold text-xl text-[#0f2544] dark:text-white flex items-center gap-2">
            <Hash className="w-5 h-5 text-[#208EC1]" />
            <span>كلمات مفتاحية وهاشتاقات الخدمة</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {(service.hashtags || []).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-xl bg-[#f4f7fb] dark:bg-brand-950 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
