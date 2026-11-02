'use client';

import React, { useState, useEffect } from 'react';
import { DatabaseSchema, OgSettings } from '@/lib/types';
import {
  Share2,
  Sparkles,
  Clock,
  Pin,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  MessageCircle,
  Twitter,
  Facebook,
  Globe,
  Sliders,
  Image as ImageIcon,
} from 'lucide-react';

interface Props {
  db: DatabaseSchema;
  updateDb: (nextDb: DatabaseSchema) => Promise<boolean>;
  showSavedNotification: () => void;
}

export default function SocialPreviewManager({
  db,
  updateDb,
  showSavedNotification,
}: Props) {
  const currentOg: OgSettings = db.ogSettings || {
    mode: 'auto',
    customTitle: 'شركة همم غيم — من الحرف البارز إلى تسليم المفتاح',
    customSubtitle: 'واجهات كلادينج، أحرف بارزة مضيئة، مظلات وسواتر، ومقاولات عامة',
    customDescription:
      'نصمم وننفذ واجهات المحلات والشركات بأعلى جودة وضمان معتمد حتى 10 سنوات مطابق لاشتراطات بلدي والدفاع المدني في كافة مدن المملكة.',
    customCategory: 'دعاية وإعلان ومقاولات عامة',
    customImageFile:
      'saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp',
    customWarranty: 'ضمان حتى 10 سنوات',
    customCity: 'كافة مناطق المملكة',
    pinnedUntil: null,
  };

  const [mode, setMode] = useState<'auto' | 'custom' | 'temporary_24h'>(
    currentOg.mode || 'auto'
  );
  const [title, setTitle] = useState(
    currentOg.customTitle || 'شركة همم غيم — من الحرف البارز إلى تسليم المفتاح'
  );
  const [subtitle, setSubtitle] = useState(
    currentOg.customSubtitle ||
      'واجهات كلادينج، أحرف بارزة مضيئة، مظلات وسواتر، ومقاولات عامة'
  );
  const [description, setDescription] = useState(
    currentOg.customDescription ||
      'نصمم وننفذ واجهات المحلات والشركات بأعلى جودة وضمان معتمد حتى 10 سنوات مطابق لاشتراطات بلدي في كافة مدن المملكة.'
  );
  const [category, setCategory] = useState(
    currentOg.customCategory || 'دعاية وإعلان ومقاولات عامة'
  );
  const [imageFile, setImageFile] = useState(
    currentOg.customImageFile ||
      'saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp'
  );
  const [warranty, setWarranty] = useState(
    currentOg.customWarranty || 'ضمان حتى 10 سنوات'
  );
  const [city, setCity] = useState(
    currentOg.customCity || 'كافة مناطق المملكة'
  );
  const [pinnedUntil, setPinnedUntil] = useState<string | null>(
    currentOg.pinnedUntil || null
  );

  const [simulatorPlatform, setSimulatorPlatform] = useState<
    'whatsapp' | 'x' | 'facebook'
  >('whatsapp');

  const [remainingTime, setRemainingTime] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  // Check 24-hour remaining time
  useEffect(() => {
    function calculateRemaining() {
      if (mode === 'temporary_24h' && pinnedUntil) {
        const diff = new Date(pinnedUntil).getTime() - Date.now();
        if (diff <= 0) {
          setRemainingTime('انتهت مدة الـ 24 ساعة (سيعود تلقائياً للتدوير الذكي)');
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setRemainingTime(`${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`);
        }
      } else {
        setRemainingTime('');
      }
    }

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);
    return () => clearInterval(interval);
  }, [mode, pinnedUntil]);

  // Apply Quick Preset
  function applyPreset(presetType: string) {
    if (presetType === 'signage') {
      setTitle('نصمم وننفذ واجهة متجرك بأحدث تصاميم 3D وضمان 10 سنوات');
      setSubtitle('أحرف بارزة زنكور واستيل وإكريليك، وكلادينج معتمد مطابق لاشتراطات بلدي');
      setDescription(
        'فريق هندسي متخصص في تصنيع وتركيب اللوحات الإعلانية والكلادينج بأعلى مواصفات الجودة مع التزام بالمواعيد وضمان موثق حتى 10 سنوات.'
      );
      setCategory('واجهات كلادينج وأحرف بارزة');
      setImageFile('saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp');
      setWarranty('ضمان معتمد 10 سنوات');
      setCity('الرياض · جدة · كافة المدن');
    } else if (presetType === 'shades') {
      setTitle('مظلات وسواتر وبرجولات عصرية للمشاريع والفلل السكنية');
      setSubtitle('سواتر قص ليزر، مظلات سيارات كورية وألمانية، وبرجولات حدائق فاخرة');
      setDescription(
        'تصاميم مودرن مقاومة للشمس والرياح مع معالجة ضد الصدأ ودهانات حرارية معتمدة. توريد وتركيب سريع في كافة مناطق المملكة.'
      );
      setCategory('مظلات وسواتر وبرجولات');
      setImageFile('saudi-car-shades-pergolas-laser-screens-modern-villa-pergola-himam-ghaim.webp');
      setWarranty('ضمان شامل 5 سنوات');
      setCity('الرياض والمنطقة الشرقية');
    } else if (presetType === 'hoarding') {
      setTitle('تسوير مشاريع إنشائية بالشنكو وتجهيز بوثات المعارض والفعاليات');
      setSubtitle('حواجز أمنية معتمدة وطباعة بوسترات دعائية عملاقة مقاومة للعوامل الجوية');
      setDescription(
        'خدمات متكاملة للمطورين العقاريين والمقاولين: تسوير المواقع، بوابات إنشائية، وتصميم وتنفيذ بوثات المؤتمرات والمعارض بدقة عالية.'
      );
      setCategory('تسوير مشاريع وتجهيز معارض');
      setImageFile('saudi-project-hoarding-fence-printing-aramco-hoarding-himam-ghaim.webp');
      setWarranty('معتمد للمشاريع الكبرى');
      setCity('المملكة العربية السعودية');
    } else if (presetType === 'promo') {
      setTitle('عرض حصري: معاينة وتصميم 3D مجاناً لجميع واجهات المحلات');
      setSubtitle('خصم خاص للمشاريع الجديدة مع خيارات تقسيط وضمان شامل حتى 10 سنوات');
      setDescription(
        'استفد الآن من باقة همم غيم الشاملة: رفع مساحي وتصميم ثلاثي الأبعاد مجاني وعرض سعر تفصيلي خلال 24 ساعة فقط.'
      );
      setCategory('عرض خاص لفترة محدودة');
      setImageFile('saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp');
      setWarranty('معاينة وتصميم 3D مجاناً');
      setCity('جوال وواتساب: 0565467928');
    }
  }

  // Save as Permanent Override
  async function handleSavePermanent() {
    setIsSaving(true);
    const newOgSettings: OgSettings = {
      mode: 'custom',
      customTitle: title.trim(),
      customSubtitle: subtitle.trim(),
      customDescription: description.trim(),
      customCategory: category.trim(),
      customImageFile: imageFile.trim(),
      customWarranty: warranty.trim(),
      customCity: city.trim(),
      pinnedUntil: null,
      lastUpdated: new Date().toISOString(),
    };

    setMode('custom');
    setPinnedUntil(null);

    const nextDb = {
      ...db,
      ogSettings: newOgSettings,
    };
    await updateDb(nextDb);
    setIsSaving(false);
    showSavedNotification();
  }

  // Save as 24-Hour Temporary Campaign
  async function handleSave24Hours() {
    setIsSaving(true);
    const until = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const newOgSettings: OgSettings = {
      mode: 'temporary_24h',
      customTitle: title.trim(),
      customSubtitle: subtitle.trim(),
      customDescription: description.trim(),
      customCategory: category.trim(),
      customImageFile: imageFile.trim(),
      customWarranty: warranty.trim(),
      customCity: city.trim(),
      pinnedUntil: until,
      lastUpdated: new Date().toISOString(),
    };

    setMode('temporary_24h');
    setPinnedUntil(until);

    const nextDb = {
      ...db,
      ogSettings: newOgSettings,
    };
    await updateDb(nextDb);
    setIsSaving(false);
    showSavedNotification();
  }

  // Reset to Auto Rotate
  async function handleResetAuto() {
    setIsSaving(true);
    const newOgSettings: OgSettings = {
      ...currentOg,
      mode: 'auto',
      pinnedUntil: null,
      lastUpdated: new Date().toISOString(),
    };

    setMode('auto');
    setPinnedUntil(null);

    const nextDb = {
      ...db,
      ogSettings: newOgSettings,
    };
    await updateDb(nextDb);
    setIsSaving(false);
    showSavedNotification();
  }

  // Build live test OG image URL
  const testOgUrl = `/api/og?category=${encodeURIComponent(category)}&title=${encodeURIComponent(
    title
  )}&subtitle=${encodeURIComponent(subtitle)}&warranty=${encodeURIComponent(
    warranty
  )}&city=${encodeURIComponent(city)}&image=${encodeURIComponent(imageFile)}`;

  return (
    <div className="space-y-8">
      {/* 1. Header & Live Status Card */}
      <div className="clean-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#208EC1]/15 text-[#208EC1] text-xs font-bold">
              <Share2 className="w-3.5 h-3.5" />
              محرك معاينات الروابط ومشاركات السوشيال ميديا
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              تخصيص بطاقات مشاركة الروابط على الشبكات (Social Link Previews)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              تحكم بما يظهر للعملاء عند إرسال أو مشاركة روابط الموقع على واتساب، تويتر (إكس)، فيسبوك، ولينكدإن.
            </p>
          </div>

          <a
            href={testOgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shrink-0"
          >
            <span>معاينة صورة OG الأصلية</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Current Active Mode Indicator */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            mode === 'auto'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
              : mode === 'temporary_24h'
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-900 dark:text-purple-200'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {mode === 'auto' && <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />}
              {mode === 'temporary_24h' && <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />}
              {mode === 'custom' && <Pin className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />}

              <div>
                <p className="font-extrabold text-sm sm:text-base">
                  {mode === 'auto' && 'الوضع النشط: التدوير الذكي التلقائي (Dynamic Auto-Rotate)'}
                  {mode === 'temporary_24h' && 'الوضع النشط: حملة مؤقتة لمدة 24 ساعة (Temporary Campaign)'}
                  {mode === 'custom' && 'الوضع النشط: تثبيت دائم مخصص (Permanent Pin Override)'}
                </p>
                <p className="text-xs opacity-90 mt-0.5">
                  {mode === 'auto' &&
                    'يدور النظام تلقائياً كل 6 ساعات بين خدمات ومشاريع الشركة الـ 8 لعرض محتوى متنوع وجذاب دون تدخل يدوي.'}
                  {mode === 'temporary_24h' &&
                    (remainingTime
                      ? `الوقت المتبقي لانتهاء الحملة والعودة للتدوير التلقائي: ${remainingTime}`
                      : 'نشط لمدة 24 ساعة ثم يعود تلقائياً.')}
                  {mode === 'custom' &&
                    'المعاينة المخصصة أدناه مثبتة بشكل دائم لجميع الروابط العامة في الموقع.'}
                </p>
              </div>
            </div>

            {mode !== 'auto' && (
              <button
                type="button"
                onClick={handleResetAuto}
                className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 transition-all shrink-0 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إلغاء التثبيت والعودة للتدوير التلقائي</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Live Social Card Simulator (WhatsApp vs Twitter vs Facebook) */}
      <div className="clean-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#208EC1]" />
              <span>محاكي المعاينة المباشرة (Live Social Card Simulator)</span>
            </h3>
            <p className="text-xs text-slate-500">
              شاهد كيف ستظهر بطاقة المشاركة للعملاء على مختلف التطبيقات لحظة إرسال الرابط:
            </p>
          </div>

          {/* Platform Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSimulatorPlatform('whatsapp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                simulatorPlatform === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </button>
            <button
              type="button"
              onClick={() => setSimulatorPlatform('x')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                simulatorPlatform === 'x'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>منصة إكس / تويتر</span>
            </button>
            <button
              type="button"
              onClick={() => setSimulatorPlatform('facebook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                simulatorPlatform === 'facebook'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>فيسبوك / لينكدإن</span>
            </button>
          </div>
        </div>

        {/* Simulator Preview Container */}
        <div className="p-4 sm:p-8 rounded-2xl bg-[#f0f4f9] dark:bg-[#071324] border border-slate-200/80 dark:border-white/10 flex justify-center">
          {/* A. WhatsApp Card Simulator */}
          {simulatorPlatform === 'whatsapp' && (
            <div className="w-full max-w-md bg-[#e2f0d9] dark:bg-[#054640] rounded-2xl p-3 shadow-md border border-[#c4e3b2] dark:border-[#0a665e] space-y-2">
              <div className="rounded-xl overflow-hidden bg-white dark:bg-[#0f2544] border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="relative aspect-[1200/630] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={testOgUrl}
                    alt="معاينة الرابط"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                    ✦ {category}
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1">
                    {title}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 pt-1">
                    <Globe className="w-3 h-3 text-[#208EC1]" />
                    <span>himam-ghaim.sa</span>
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-700 dark:text-emerald-100 px-1 text-right">
                رابط المعاينة الرسمية لشركة همم غيم للدعاية والإعلان والمقاولات بالرياض والمملكة.
              </p>
            </div>
          )}

          {/* B. Twitter / X Card Simulator */}
          {simulatorPlatform === 'x' && (
            <div className="w-full max-w-lg bg-white dark:bg-black rounded-2xl p-4 shadow-md border border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#11345C] text-white flex items-center justify-center font-bold text-xs">
                  همم
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                    شركة همم غيم للدعاية والإعلان والمقاولات
                  </p>
                  <p className="text-[10px] text-slate-400">@himam_ghaim · الآن</p>
                </div>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200">
                من الحرف البارز إلى تسليم المفتاح — خدمات متكاملة في كافة مناطق المملكة 🇸🇦
              </p>
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm">
                <div className="relative aspect-[1200/630] w-full bg-slate-900">
                  <img
                    src={testOgUrl}
                    alt="معاينة الرابط"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-slate-50 dark:bg-zinc-950">
                  <p className="text-[11px] text-slate-500 font-mono">himam-ghaim.sa</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                    {title}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* C. Facebook / LinkedIn Simulator */}
          {simulatorPlatform === 'facebook' && (
            <div className="w-full max-w-lg bg-white dark:bg-[#18191a] rounded-2xl p-4 shadow-md border border-slate-200 dark:border-zinc-700 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#208EC1] text-white flex items-center justify-center font-bold text-xs">
                  HG
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Himam Ghaim Company | همم غيم
                  </p>
                  <p className="text-[10px] text-slate-400">موصى به · برعاية</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200">
                واجهات كلادينج، أحرف بارزة مضيئة، ومقاولات عامة بضمان حتى 10 سنوات.
              </p>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700">
                <div className="relative aspect-[1200/630] w-full bg-slate-900">
                  <img
                    src={testOgUrl}
                    alt="معاينة الرابط"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-slate-100 dark:bg-[#242526]">
                  <p className="text-[10px] text-slate-500 uppercase font-mono">HIMAM-GHAIM.SA</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {title}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Form Controls & Quick Presets */}
      <div className="clean-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            تخصيص محتوى المعاينة المباشرة (Customize Link Preview)
          </h3>
          <p className="text-xs text-slate-500">
            اختر قالباً سريعاً بنقرة واحدة أو اكتب المحتوى المخصص الذي تريده:
          </p>
        </div>

        {/* Quick Presets Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => applyPreset('signage')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all flex items-center gap-1.5"
          >
            <span>✨ واجهات وكلادينج وأحرف بارزة</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('shades')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all flex items-center gap-1.5"
          >
            <span>🏡 مظلات وسواتر وبرجولات</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('hoarding')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all flex items-center gap-1.5"
          >
            <span>🏗️ تسوير مشاريع وبوثات معارض</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('promo')}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>🔥 عرض ترويجي خاص ومعاينة مجانية</span>
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Title */}
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                عنوان المعاينة الرئيسي (Title)
              </label>
              <span className={`text-[11px] font-mono ${title.length > 50 ? 'text-amber-500' : 'text-slate-400'}`}>
                {title.length} / 55 حرف موصى به
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
              placeholder="مثال: شركة همم غيم — من الحرف البارز إلى تسليم المفتاح"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              السطر الترويجي / العنوان الفرعي (Subtitle)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
              placeholder="واجهات كلادينج، أحرف بارزة مضيئة، ومقاولات عامة"
            />
          </div>

          {/* Category Badge */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              شارة التصنيف العلوية (Badge / Category)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
              placeholder="مثال: واجهات كلادينج وأحرف بارزة"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                الوصف المختصر (Meta Description)
              </label>
              <span className={`text-[11px] font-mono ${description.length > 150 ? 'text-amber-500' : 'text-slate-400'}`}>
                {description.length} / 150 حرف موصى به
              </span>
            </div>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
              placeholder="اكتب وصفاً ترويجياً واضحاً ومقنعاً للمعاينة..."
            />
          </div>

          {/* Image Selection from Portfolio */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>صورة المعاينة (اختر من مشاريع همم غيم أو حدد مسار الصورة)</span>
              <span className="text-slate-400 text-[11px] font-mono">
                {imageFile}
              </span>
            </label>
            <select
              value={imageFile}
              onChange={(e) => setImageFile(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
            >
              <option value="saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp">
                ☕ مقهى بلاك ستامب — واجهة وأحرف بارزة مضيئة (الرياض)
              </option>
              <option value="saudi-car-shades-pergolas-laser-screens-modern-villa-pergola-himam-ghaim.webp">
                🏡 فيلا سكنية فاخرة — برجولات ومظلات وسواتر قص ليزر (الرياض)
              </option>
              <option value="saudi-project-hoarding-fence-printing-aramco-hoarding-himam-ghaim.webp">
                🏗️ تسوير مشاريع إنشائية وبوسترات شنكو عملاقة (أرامكو والرياض)
              </option>
              <option value="saudi-interior-design-gypsum-decor-finishing-modern-office-fitout-himam-ghaim.webp">
                🏢 صالات عرض ومكاتب — تشطيبات وديكورات داخلية وتسليم مفتاح
              </option>
              <option value="saudi-stickers-wrapping-wall-mural-beez-truck-wrap-himam-ghaim.webp">
                🚚 أسطول شاحنات تجارية — استيكرات وتغليف سيارات فينيل ألماني
              </option>
              <option value="saudi-exhibition-booth-stand-events-ncrdsa-booth-himam-ghaim.webp">
                🎪 جناح ومعرض المركز الوطني (استدامة) — بوثات معارض 3D
              </option>
              <option value="saudi-3d-signage-cladding-letters-al-saudi-restaurant-facade-himam-ghaim.webp">
                🍽️ واجهة مطاعم ومحلات — أحرف زنكور وكلادينج حديث
              </option>
              {db.portfolio.map((p) => (
                <option key={p.id} value={p.src.replace(/^\//, '')}>
                  {p.title.ar} ({p.city.ar})
                </option>
              ))}
            </select>
          </div>

          {/* Warranty Badge */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              شارة الضمان المعتمد (Warranty Badge)
            </label>
            <input
              type="text"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
              placeholder="مثال: ضمان حتى 10 سنوات"
            />
          </div>

          {/* City / Coverage */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              المدينة / نطاق الخدمة (City & Area)
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
              placeholder="مثال: الرياض · جدة · كافة مناطق المملكة"
            />
          </div>
        </div>

        {/* 4. Action Save Buttons */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center gap-3">
          {/* Button 1: Pin Permanently */}
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSavePermanent}
            className="px-6 py-3 rounded-2xl bg-[#0f2544] hover:bg-[#208EC1] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <Pin className="w-4 h-4" />
            <span>تثبيت دائم للمعاينة (Permanent Pin)</span>
          </button>

          {/* Button 2: 24-Hour Temporary */}
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave24Hours}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <Clock className="w-4 h-4" />
            <span>تفعيل مؤقت لمدة 24 ساعة ثم العودة للديناميكي</span>
          </button>

          {/* Button 3: Reset to Dynamic Auto */}
          <button
            type="button"
            disabled={isSaving}
            onClick={handleResetAuto}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة للوضع الديناميكي التلقائي</span>
          </button>
        </div>
      </div>
    </div>
  );
}
