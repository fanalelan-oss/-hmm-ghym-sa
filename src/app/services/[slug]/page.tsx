'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { tText, tList } from '@/lib/i18n';
import AutoMediaCarousel, { buildMediaSlides } from '@/components/common/AutoMediaCarousel';
import LetterTypesTabsSection from '@/components/services/LetterTypesTabsSection';
import SmartLinkedText from '@/components/seo/SmartLinkedText';
import ExpandableHashtagsCard from '@/components/seo/ExpandableHashtagsCard';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Phone,
  Bot,
  Play,
  Layers,
} from 'lucide-react';

export default function SingleServicePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang, dict, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  const service =
    db.services.find((s) => s.slug === slug || s.id === slug) || db.services[0];

  const serviceProjects = useMemo(
    () => db.portfolio.filter((p) => p.category === service.id),
    [db.portfolio, service.id]
  );

  // Ensure the single-row train always has enough cards (at least 6) for a seamless infinite loop
  const trainProjects = useMemo(() => {
    if (serviceProjects.length === 0) return [];
    const list = [...serviceProjects];
    while (list.length < 6) {
      list.push(...serviceProjects);
    }
    return list;
  }, [serviceProjects]);

  const features = tList(service.features, lang);
  const audience = tList(service.audience, lang);

  const [interiorTab, setInteriorTab] = useState<'gypsum' | 'cement' | 'relief'>('gypsum');
  const [chipboardTab, setChipboardTab] = useState<'tv' | 'doors' | 'wpc'>('tv');

  const interiorSubTabs = {
    gypsum: {
      title: 'أعمال الجبس بورد والأسقف المستعارة والإضاءة المخفية',
      desc: 'ننفذ أسقف الجبس بورد السادة والفرنسي والمودرن، مع مسارات الإضاءة المخفية (بيت النور) والمسارات المغناطيسية (Magnetic Track)، والقواطع الجبسية العازلة للصوت للمكاتب والفلل باستخدام ألواح جبس سعودي/فرنسي أصلي (عادي، أخضر مقاوم للرطوبة، وأحمر مقاوم للحريق).',
      specs: [
        'ألواح جبس بورد سماكة 12.5 ملم (عادي / مقاوم للرطوبة / مقاوم للحريق)',
        'جسور وصاج حديد مجلفن ثقيل سماكة 0.55 - 0.60 ملم ضد الترخيم',
        'معجون فواصل أمريكي مع شريط فايبر لمنع التشققات نهائياً',
        'تنفيذ بيوت النور ومسارات التكييف المخفي (Hidden Grille) بدقة هندسية',
      ],
    },
    cement: {
      title: 'أعمال الأسمنت بورد (قواطع، ملاحق، وتكسيات داخلية وخارجية)',
      desc: 'توريد وتركيب ألواح الأسمنت بورد (Cement Board) عالية الكثافة والمقاومة للماء والرطوبة والحرارة والصدمات؛ مثالية لبناء القواطع الجدارية، الملاحق الخارجية، واجهات المباني، والمناطق الرطبة مع حشوات الصوف الصخري العازل للحرارة والصوت.',
      specs: [
        'ألواح أسمنت بورد سماكة 8 ملم إلى 18 ملم مقاومة للماء والحريق والعوامل الجوية',
        'هيكل حديد مجلفن ثقيل (C-Studs & Tracks) أو تيوبات حديد حسب الموقع',
        'عزل داخلي بالصوف الصخري (Rockwool) لعزل الصوت والحرارة بكفاءة عالية',
        'تشطيب ناعم يقبل الدهانات الخارجية والداخلية أو السيراميك والرخام مباشرة',
      ],
    },
    relief: {
      title: 'الجداريات الجبسية ثلاثية الأبعاد والأسقف الكلاسيكية',
      desc: 'تصميم وتنفيذ الجداريات المنحوتة البارزة (3D Relief Walls) للمجالس والصالات، والكرانيش والقباب الجبسية الكلاسيكية والنيوكلاسيك مع تكسيات بديل الشيبورد المحيطة والإضاءة الدافئة.',
      specs: [
        'جداريات جبسية ثلاثية الأبعاد منفذة بدقة عالية مع إضاءة غير مباشرة',
        'أسقف مجالس فاخرة مع بحرات جبسية وثريات مركزية وبيوت نور مخفية',
        'دهانات جوتن والجزيرة الفاخرة المقاومة للغسيل والتشققات',
        'تكامل هندسي تام مع قسم تكسيات بديل الشيبورد والواجهات الزجاجية',
      ],
    },
  };

  const chipboardSubTabs = {
    tv: {
      title: 'خلفيات ومكتبات شاشات التلفزيون بتكسيات بديل الشيبورد',
      desc: 'تصميم وتنفيذ أحدث وحدات ومكتبات التلفزيون (TV Media Walls) باستخدام ألواح بديل الشيبورد الكوري والألماني المقاوم للخدش، مع الزوايا المقوسة (Curved Corners)، فواصل الألمنيوم السوداء والذهبية، والرفوف المضيئة وتمديدات الأسلاك المخفية بالكامل.',
      specs: [
        'ألواح بديل الشيبورد عالية الكثافة سماكة 12 - 18 ملم مقاومة للخدش والرطوبة',
        'تشكيل الزوايا المقوسة (Curved Profiles) وفواصل الألمنيوم الغاطسة (Shadow Gaps)',
        'تأسيس مخفي كامل لأسلاك الشاشة والرسيفرات وأنظمة الصوت داخل الهيكل',
        'إضاءة LED مخفية دافئة (COB Warm Light) مع رفوف زجاجية أو خشبية فاخرة',
      ],
    },
    doors: {
      title: 'الأبواب المخفية (Hidden Doors) وتجاليد المداخل وغرف النوم',
      desc: 'تنفيذ تكسيات الجدران المتصلة مع الأبواب المخفية (Flush Hidden Doors) بدون فريم ظاهر بحيث يندمج الباب تماماً داخل تكسيات بديل الشيبورد، بالإضافة إلى تجاليد خلفيات الأسرة الفندقية في غرف النوم ومداخل الفلل والمكاتب.',
      specs: [
        'أبواب مخفية بمفصلات إيطالية مخفية (Concealed Hinges) تنغلق بمستوى الجدار تماماً',
        'تطابق 100% في النقشة واللون بين تكسيات الجدار والباب المخفي والفواصل',
        'تصميم خلفيات سرير غرف النوم الماستر بطابع فندقي مع وحدات الإضاءة والمفاتيح',
        'تجاليد مداخل الفلل مع المرايا الطولية المضيئة والكونسول المعلق',
      ],
    },
    wpc: {
      title: 'دمج بديل الشيبورد مع بديل الخشب المضلع (WPC) والرخام والحجر الصخري',
      desc: 'ابتكار تصاميم جدارية فخمة تجمع بين نعومة ألواح بديل الشيبورد المطفية ودفء بديل الخشب المضلع (Fluted WPC Panels) وفخامة ألواح بديل الرخام (UV Marble) والحجر الصخري البارز (PU Stone) للمجالس والصالات والمكاتب.',
      specs: [
        'ألواح بديل الخشب الكوري المضلع (WPC) المقاوم للماء والرطوبة والحشرات',
        'ألواح بديل الرخام (UV Sheets) وبديل الحجر الصخري خفيف الوزن عالي الصلابة',
        'تثبيت هندسي متين على الجدران أو على شاسيهات مخفية لضمان استواء السطح 100%',
        'ضمان شامل على ثبات الألوان وجودة التركيب والفواصل المعدنية',
      ],
    },
  };

  return (
    <div className="py-8 lg:py-12 space-y-12 bg-[#eef3f8] dark:bg-brand-950">
      {/* Breadcrumb + Quick Department Switcher */}
      <div className="smart-container space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <nav className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:underline">
              {dict.nav.home}
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:underline">
              {dict.nav.services}
            </Link>
            <span>/</span>
            <span className="text-[#208EC1] font-bold">
              {tText(service.name, lang)}
            </span>
          </nav>

          <Link
            href="/services"
            className="text-xs font-extrabold text-[#208EC1] hover:underline"
          >
            {lang === 'ar'
              ? `← العودة لشبكة الأقسام الـ ${db.services.length}`
              : `← Back to All ${db.services.length} Departments`}
          </Link>
        </div>

        {/* Horizontal 11 Departments Switcher Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {db.services.map((srv, idx) => {
            const isCurrent = srv.id === service.id;
            const numStr = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <Link
                key={srv.id}
                href={`/services/${srv.slug}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap border transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-[#0f2544] text-white border-[#0f2544] shadow-sm'
                    : 'bg-white dark:bg-[#0c1d34] text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-white/10 hover:border-[#208EC1]'
                }`}
              >
                <span
                  className={`text-[10px] font-black ${
                    isCurrent ? 'text-sky-300' : 'text-[#208EC1]'
                  }`}
                >
                  {numStr}
                </span>
                <span>{tText(srv.shortName, lang)}</span>
              </Link>
            );
          })}
        </div>

        {/* Dedicated Service Header */}
        <div className="rounded-3xl bg-white dark:bg-[#0c1d34] text-[#0f2544] dark:text-white p-6 sm:p-10 border border-slate-200/90 dark:border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-lg">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#208EC1]/15 border border-[#208EC1]/30 text-[#208EC1] text-xs font-extrabold">
              {tText(service.shortName, lang)} · {serviceProjects.length} مشروع موثق
            </span>
            <h1 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[28px] leading-snug">
              {tText(service.name, lang)}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              <SmartLinkedText text={tText(service.description, lang)} maxLinks={6} />
            </p>
            <div className="p-3.5 rounded-2xl bg-[#f4f7fb] dark:bg-[#081529] border border-slate-200/80 dark:border-white/10 inline-block">
              <span className="text-xs text-[#208EC1] font-bold block">
                التسعير التقديري:
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#0f2544] dark:text-white">
                {tText(service.priceRange, lang)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <Link
                href={`/contact?service=${service.id}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>{dict.servicesSection.requestService}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-engineer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#f4f7fb] dark:bg-white/10 hover:border-[#208EC1] border border-slate-200 dark:border-white/15 text-[#0f2544] dark:text-white font-bold text-xs sm:text-sm transition-all"
              >
                <Bot className="w-4 h-4 text-[#208EC1]" />
                <span>{dict.hero.ctaAi}</span>
              </Link>
              <a
                href={`tel:${db.settings.phoneClean}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-[#081529] border border-slate-200 dark:border-white/15 text-[#0f2544] dark:text-white font-bold text-xs sm:text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#208EC1]" />
                <span dir="ltr">{db.settings.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/15 shadow-lg aspect-[4/3] bg-slate-900">
              <AutoMediaCarousel
                slides={buildMediaSlides(service)}
                alt={tText(service.name, lang)}
                mode="card"
                imgClassName="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* IF SIGNAGE SERVICE: Render Interactive 8 Letter Types Tabs directly! */}
      {service.id === 'signage' && <LetterTypesTabsSection />}

      {/* IF INTERIORS (GYPSUM & CEMENT BOARD) SERVICE: Render Specialized Gypsum/Cement Board Tabs */}
      {service.id === 'interiors' && (
        <section className="smart-container">
          <div className="rounded-3xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-white/10 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#208EC1]">
                  <Layers className="w-4 h-4" />
                  <span>تبويبات تخصصات القسم</span>
                </span>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0f2544] dark:text-white mt-1">
                  تخصصات الجبس بورد والأسمنت بورد والأسقف المستعارة
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'gypsum', label: '01 • أعمال الجبس بورد والأسقف' },
                  { id: 'cement', label: '02 • أعمال الأسمنت بورد والقواطع' },
                  { id: 'relief', label: '03 • الجداريات الجبسية 3D والمجالس' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setInteriorTab(t.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      interiorTab === t.id
                        ? 'bg-[#208EC1] text-white shadow-sm'
                        : 'bg-[#f4f7fb] dark:bg-[#081529] text-[#0f2544] dark:text-slate-200 hover:border-[#208EC1] border border-slate-200/80 dark:border-white/10'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f4f7fb] dark:bg-[#081529] border border-slate-200/80 dark:border-white/10 space-y-4">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0f2544] dark:text-white">
                {interiorSubTabs[interiorTab].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <SmartLinkedText text={interiorSubTabs[interiorTab].desc} maxLinks={5} />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {interiorSubTabs[interiorTab].specs.map((sp, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white dark:bg-[#0c1d34] border border-slate-200/70 dark:border-white/10 flex items-start gap-2.5 text-xs font-bold text-[#0f2544] dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#208EC1] shrink-0 mt-0.5" />
                    <span>
                      <SmartLinkedText text={sp} maxLinks={2} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* IF CHIPBOARD SERVICE: Render Specialized Chipboard & TV Unit Tabs */}
      {service.id === 'chipboard' && (
        <section className="smart-container">
          <div className="rounded-3xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 space-y-5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-white/10 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#208EC1]">
                  <Layers className="w-4 h-4" />
                  <span>تبويبات تخصصات تكسيات بديل الشيبورد</span>
                </span>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0f2544] dark:text-white mt-1">
                  تخصصات بديل الشيبورد وخلفيات التلفزيون والأبواب المخفية
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'tv', label: '01 • خلفيات ومكتبات التلفزيون' },
                  { id: 'doors', label: '02 • الأبواب المخفية وغرف النوم' },
                  { id: 'wpc', label: '03 • دمج الشيبورد مع الخشب والحجر' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setChipboardTab(t.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      chipboardTab === t.id
                        ? 'bg-[#208EC1] text-white shadow-sm'
                        : 'bg-[#f4f7fb] dark:bg-[#081529] text-[#0f2544] dark:text-slate-200 hover:border-[#208EC1] border border-slate-200/80 dark:border-white/10'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f4f7fb] dark:bg-[#081529] border border-slate-200/80 dark:border-white/10 space-y-4">
              <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#0f2544] dark:text-white">
                {chipboardSubTabs[chipboardTab].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <SmartLinkedText text={chipboardSubTabs[chipboardTab].desc} maxLinks={5} />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {chipboardSubTabs[chipboardTab].specs.map((sp, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white dark:bg-[#0c1d34] border border-slate-200/70 dark:border-white/10 flex items-start gap-2.5 text-xs font-bold text-[#0f2544] dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#208EC1] shrink-0 mt-0.5" />
                    <span>
                      <SmartLinkedText text={sp} maxLinks={2} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Features & Target Audience */}
      <div className="smart-container grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl clean-card">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0f2544] dark:text-white mb-5">
            ماذا نقدم في {tText(service.name, lang)}؟
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {features.map((feat, i) => (
              <li
                key={i}
                className="p-4 rounded-2xl bg-[#f4f7fb] dark:bg-brand-950 border border-slate-200/80 dark:border-white/10 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#208EC1] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <SmartLinkedText text={feat} maxLinks={2} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl clean-card flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#0f2544] dark:text-white mb-4">
              القطاعات المستفيدة
            </h3>
            <div className="space-y-2">
              {audience.map((aud, i) => (
                <div
                  key={i}
                  className="px-4 py-2.5 rounded-xl bg-[#f4f7fb] dark:bg-brand-950 border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm font-bold text-[#0f2544] dark:text-sky-300"
                >
                  {aud}
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f2544] text-white space-y-2 shadow-lg">
            <p className="text-xs text-sky-300 font-bold">
              معاينة موقع ورفع مقاسات مجاني
            </p>
            <p className="text-xs sm:text-sm text-slate-200">
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

      {/* Executed Projects in This Service Category — Single Row Marquee Train (قطار أعمال القسم) */}
      <section className="overflow-hidden py-2">
        <div className="smart-container">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0f2544] dark:text-white">
              مشاريع منفذة في {tText(service.shortName, lang)} ({serviceProjects.length})
            </h2>
            <Link
              href={`/portfolio?category=${service.id}`}
              className="text-xs sm:text-sm font-bold text-[#208EC1] hover:underline"
            >
              عرض كل الأعمال ({db.portfolio.length}) ←
            </Link>
          </div>
        </div>

        {trainProjects.length > 0 && (
          <div
            dir="ltr"
            className="relative w-full py-3 overflow-hidden select-none"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
            <div className="animate-partners-train">
              {[0, 1].map((loopIndex) => (
                <div
                  key={loopIndex}
                  className="flex items-stretch gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0"
                  aria-hidden={loopIndex === 1}
                >
                  {trainProjects.map((proj, pIdx) => (
                    <Link
                      key={`${loopIndex}-${proj.id}-${pIdx}`}
                      href={`/portfolio/${proj.slug}`}
                      dir={dict.dir}
                      tabIndex={loopIndex === 1 ? -1 : undefined}
                      className="floating-card group w-[265px] sm:w-[320px] lg:w-[350px] shrink-0 rounded-2xl overflow-hidden p-2 flex flex-col justify-between cursor-pointer hover:border-[#208EC1]"
                    >
                      <div className="relative aspect-[4/3] rounded-xl bg-slate-900 block overflow-hidden">
                        <AutoMediaCarousel
                          slides={buildMediaSlides(proj)}
                          alt={tText(proj.alt, lang)}
                          mode="card"
                          imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {proj.type === 'video' && (
                          <span className="absolute top-2.5 left-2.5 z-20 px-2.5 py-0.5 rounded-full bg-[#208EC1] text-white text-[11px] font-bold inline-flex items-center gap-1 shadow-md">
                            <Play className="w-3 h-3 fill-current" />
                            فيديو
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-display font-extrabold text-xs sm:text-sm text-[#0f2544] dark:text-white group-hover:text-[#208EC1] transition-colors line-clamp-1">
                          {tText(proj.title, lang)}
                        </h3>
                        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                          {tText(proj.summary, lang)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Service FAQs & Expandable Mega SEO Hashtags */}
      <div className="smart-container grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl clean-card space-y-4">
          <h2 className="font-display font-bold text-xl text-[#0f2544] dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#208EC1]" />
            <span>الأسئلة الشائعة حول {tText(service.shortName, lang)}</span>
          </h2>
          <div className="space-y-3">
            {(service.faqs || []).map((faq, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#f4f7fb] dark:bg-brand-950 border border-slate-200/80 dark:border-white/10"
              >
                <h3 className="font-bold text-sm sm:text-base text-[#0f2544] dark:text-white mb-1.5">
                  {tText(faq.q, lang)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <SmartLinkedText text={tText(faq.a, lang)} maxLinks={4} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <ExpandableHashtagsCard
            primaryTags={service.hashtags || []}
            category={service.id}
            visibleCount={8}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
