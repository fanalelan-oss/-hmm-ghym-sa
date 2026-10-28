'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import ScrollReveal from '@/components/layout/ScrollReveal';
import {
  Sun,
  Moon,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Type,
  Layers,
  Box,
  Store,
  CheckCircle2,
  RotateCcw,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Wand2,
} from 'lucide-react';

interface FontOption {
  id: string;
  nameAr: string;
  nameEn: string;
  family: string;
  category: string;
}

const FONT_LIBRARY: FontOption[] = [
  { id: 'kufam', nameAr: 'خط كوفام الهندسي (Kufam)', nameEn: 'Kufam Geometric', family: "'Kufam', sans-serif", category: 'هندسي فاخر' },
  { id: 'cairo', nameAr: 'خط القاهرة التجاري (Cairo)', nameEn: 'Cairo Commercial', family: "'Cairo', sans-serif", category: 'تجاري حديث' },
  { id: 'aref-ruqaa', nameAr: 'خط عارف رقعة الملكي (Aref Ruqaa)', nameEn: 'Aref Ruqaa Calligraphic', family: "'Aref Ruqaa', serif", category: 'خطاطي أصيل' },
  { id: 'reem-kufi', nameAr: 'خط ريم كوفي الإعلاني (Reem Kufi)', nameEn: 'Reem Kufi Display', family: "'Reem Kufi', sans-serif", category: 'كوفي بارز' },
  { id: 'rakkas', nameAr: 'خط رقاص الجريء (Rakkas)', nameEn: 'Rakkas Bold Display', family: "'Rakkas', serif", category: 'مطاعم وكافيهات' },
  { id: 'lalezar', nameAr: 'خط لاليزار العريض (Lalezar)', nameEn: 'Lalezar Heavy', family: "'Lalezar', system-ui", category: 'واجهات كبرى' },
  { id: 'amiri', nameAr: 'خط أميري الكلاسيكي (Amiri)', nameEn: 'Amiri Royal Serif', family: "'Amiri', serif", category: 'ملكي كلاسيكي' },
  { id: 'marhey', nameAr: 'خط مرحي الإبداعي (Marhey)', nameEn: 'Marhey Creative', family: "'Marhey', sans-serif", category: 'عصري شبابي' },
  { id: 'el-messiri', nameAr: 'خط المسيري للبوتيكات (El Messiri)', nameEn: 'El Messiri Boutique', family: "'El Messiri', sans-serif", category: 'أزياء وعطور' },
  { id: 'alexandria', nameAr: 'خط الإسكندرية (Alexandria)', nameEn: 'Alexandria Modern', family: "'Alexandria', sans-serif", category: 'شركات ومكاتب' },
  { id: 'changa', nameAr: 'خط تشانجا المربع (Changa)', nameEn: 'Changa Square', family: "'Changa', sans-serif", category: 'صناعي وهندسي' },
  { id: 'almarai', nameAr: 'خط المراعي الرسمي (Almarai)', nameEn: 'Almarai Corporate', family: "'Almarai', sans-serif", category: 'مؤسسي رسمي' },
  { id: 'readex', nameAr: 'خط ريدكس برو (Readex Pro)', nameEn: 'Readex Pro', family: "'Readex Pro', sans-serif", category: 'تقني نظيف' },
  { id: 'katibeh', nameAr: 'خط كتيبة الديواني (Katibeh)', nameEn: 'Katibeh Diwani', family: "'Katibeh', serif", category: 'تراثي فخم' },
  { id: 'lemonada', nameAr: 'خط ليمونادة الانسيابي (Lemonada)', nameEn: 'Lemonada Smooth', family: "'Lemonada', cursive", category: 'كافيهات وحلويات' },
  { id: 'vibes', nameAr: 'خط فايبز الحر (Vibes)', nameEn: 'Vibes Script', family: "'Vibes', system-ui", category: 'فني مبتكر' },
  { id: 'qahiri', nameAr: 'خط قاهري الكوفي الحاد (Qahiri)', nameEn: 'Qahiri Sharp Kufi', family: "'Qahiri', sans-serif", category: 'معماري حاد' },
  { id: 'ibm-plex', nameAr: 'خط آي بي إم بليكس (IBM Plex)', nameEn: 'IBM Plex Arabic', family: "'IBM Plex Sans Arabic', sans-serif", category: 'طبي وتقني' },
  { id: 'gulzar', nameAr: 'خط جلزار الفارسي/الأوردو (Gulzar)', nameEn: 'Gulzar Nastaliq', family: "'Gulzar', serif", category: 'نستعليق فاخر' },
  { id: 'alkalami', nameAr: 'خط القلمي المغربي (Alkalami)', nameEn: 'Alkalami Traditional', family: "'Alkalami', serif", category: 'خط عربي أصيل' },
  { id: 'mada', nameAr: 'خط مدى المعماري (Mada)', nameEn: 'Mada Architectural', family: "'Mada', sans-serif", category: 'لوحات إرشادية' },
  { id: 'tajawal', nameAr: 'خط تجوال القياسي (Tajawal)', nameEn: 'Tajawal Standard', family: "'Tajawal', sans-serif", category: 'قياسي متوازن' },
];

type MaterialType =
  | 'acrylic'
  | 'gold_mirror'
  | 'silver_chrome'
  | 'zincor'
  | 'double_rim'
  | 'halo'
  | 'neon';

type SideReturnColor =
  | 'gold'
  | 'silver'
  | 'black'
  | 'navy'
  | 'bronze'
  | 'white'
  | 'lit';

type StorefrontStyle = 'cladding' | 'louvers' | 'marble';
type FacadeTone = 'navy' | 'charcoal' | 'wood' | 'marble_white' | 'silver' | 'emerald';
type StudioTab = 'font' | 'material' | 'extrusion' | 'storefront';

export default function SignageSimulatorSection() {
  const { dict, lang, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Studio State
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [teaserFontIdx, setTeaserFontIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<StudioTab>('font');
  const [signText, setSignText] = useState('شركة همم غيم');
  const [subText, setSubText] = useState('HIMAM GHAIM · CONTRACTING & SIGNAGE');
  const [fontIdx, setFontIdx] = useState<number>(0);
  const [autoPlayFonts, setAutoPlayFonts] = useState<boolean>(false);

  const [material, setMaterial] = useState<MaterialType>('gold_mirror');
  const [ledColor, setLedColor] = useState<'white' | 'warm' | 'cyan' | 'gold' | 'emerald' | 'rose'>('warm');

  const [depthCm, setDepthCm] = useState<number>(8); // 3, 6, 8, 12 cm
  const [sideColor, setSideColor] = useState<SideReturnColor>('gold');
  const [angleDir, setAngleDir] = useState<'br' | 'bl' | 'down'>('br');
  const [fontScale, setFontScale] = useState<number>(100); // 80% to 125%

  const [storeStyle, setStoreStyle] = useState<StorefrontStyle>('cladding');
  const [facadeTone, setFacadeTone] = useState<FacadeTone>('charcoal');
  const [isNight, setIsNight] = useState<boolean>(true);

  // Dynamically load the 22 Google Fonts once on mount
  useEffect(() => {
    const linkId = 'hg-signage-studio-fonts';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Alexandria:wght@700;800&family=Alkalami&family=Almarai:wght@700;800&family=Amiri:wght@700&family=Aref+Ruqaa:wght@700&family=Cairo:wght@700;900&family=Changa:wght@700;800&family=El+Messiri:wght@700&family=Gulzar&family=IBM+Plex+Sans+Arabic:wght@700&family=Katibeh&family=Kufam:wght@700;900&family=Lalezar&family=Lemonada:wght@700&family=Mada:wght@700;900&family=Marhey:wght@700&family=Qahiri&family=Rakkas&family=Readex+Pro:wght@700&family=Reem+Kufi:wght@700&family=Tajawal:wght@800;900&family=Vibes&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Auto-Play Font Reel every 2 seconds when enabled
  useEffect(() => {
    if (!autoPlayFonts) return;
    const interval = setInterval(() => {
      setFontIdx((prev) => (prev + 1) % FONT_LIBRARY.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoPlayFonts]);

  // Teaser Live Mini-Preview Font Rotation while closed to attract user attention
  useEffect(() => {
    if (isStudioOpen) return;
    const interval = setInterval(() => {
      setTeaserFontIdx((prev) => (prev + 1) % FONT_LIBRARY.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isStudioOpen]);

  const currentFont = FONT_LIBRARY[fontIdx] || FONT_LIBRARY[0];
  const teaserFont = FONT_LIBRARY[teaserFontIdx] || FONT_LIBRARY[0];

  // Map LED colors to hex
  const ledHexMap = {
    white: { core: '#FFFFFF', glow: '#E0F2FE', outer: '#38BDF8' },
    warm: { core: '#FFFBEB', glow: '#FDE68A', outer: '#F59E0B' },
    cyan: { core: '#E0F2FE', glow: '#38BDF8', outer: '#0284C7' },
    gold: { core: '#FEF08A', glow: '#FACC15', outer: '#CA8A04' },
    emerald: { core: '#D1FAE5', glow: '#34D399', outer: '#059669' },
    rose: { core: '#FCE7F3', glow: '#F472B6', outer: '#DB2777' },
  };

  // Map Side Return (3D Edge) colors to realistic shaded RGB steps
  const sideColorMap: Record<SideReturnColor, { main: string; dark: string; nameAr: string }> = {
    gold: { main: '#B4881D', dark: '#6E500B', nameAr: 'ذهبي ستانلس' },
    silver: { main: '#94A3B8', dark: '#475569', nameAr: 'فضي كروم' },
    black: { main: '#1E293B', dark: '#090D16', nameAr: 'أسود مطفي' },
    navy: { main: '#1E3A8A', dark: '#0F172A', nameAr: 'كحلي ملكي' },
    bronze: { main: '#9A5B32', dark: '#542D14', nameAr: 'برونزي نحاسي' },
    white: { main: '#CBD5E1', dark: '#64748B', nameAr: 'أبيض' },
    lit: { main: ledHexMap[ledColor].glow, dark: ledHexMap[ledColor].outer, nameAr: 'شفاف مضيء' },
  };

  // Compute realistic 3D multi-layered text-shadow + face color
  const computedSignStyle = useMemo((): React.CSSProperties => {
    const layers = Math.max(3, Math.round(depthCm * 1.4)); // e.g. 8cm -> 11 3D steps
    const dx = angleDir === 'br' ? 1 : angleDir === 'bl' ? -1 : 0;
    const dy = 1;

    const side = sideColorMap[sideColor];
    const led = ledHexMap[ledColor];

    const shadowParts: string[] = [];

    // 1. Build 3D physical extrusion layers
    for (let i = 1; i <= layers; i++) {
      const col = i < layers * 0.65 ? side.main : side.dark;
      shadowParts.push(`${dx * i}px ${dy * i}px 0px ${col}`);
    }

    // 2. Add ambient drop shadow on the storefront wall
    shadowParts.push(
      `${dx * (layers + 4)}px ${dy * (layers + 6)}px 18px rgba(0,0,0,0.65)`
    );

    // 3. Add night illumination / halo glow based on material
    if (isNight) {
      if (material === 'acrylic' || material === 'double_rim') {
        shadowParts.push(`0 0 14px ${led.core}`);
        shadowParts.push(`0 0 32px ${led.glow}`);
        shadowParts.push(`0 0 65px ${led.outer}`);
      } else if (material === 'halo' || material === 'zincor') {
        shadowParts.push(`0 0 22px ${led.glow}`);
        shadowParts.push(`0 0 45px ${led.outer}`);
        shadowParts.push(`0 0 80px ${led.outer}`);
      } else if (material === 'gold_mirror') {
        shadowParts.push(`0 0 22px rgba(251, 191, 36, 0.55)`);
        shadowParts.push(`0 0 50px rgba(217, 119, 6, 0.35)`);
      } else if (material === 'silver_chrome') {
        shadowParts.push(`0 0 22px rgba(224, 242, 254, 0.55)`);
        shadowParts.push(`0 0 48px rgba(56, 189, 248, 0.35)`);
      } else if (material === 'neon') {
        shadowParts.unshift(`0 0 8px #FFFFFF`);
        shadowParts.push(`0 0 20px ${led.glow}`);
        shadowParts.push(`0 0 45px ${led.outer}`);
        shadowParts.push(`0 0 90px ${led.outer}`);
      }
    }

    // Determine Face Color & Stroke
    let faceColor = '#FFFFFF';
    let stroke: string | undefined = undefined;

    if (material === 'acrylic') {
      faceColor = isNight ? led.core : '#FFFFFF';
    } else if (material === 'gold_mirror') {
      faceColor = isNight ? '#FDE68A' : '#EAB308';
      stroke = '1px rgba(255,255,255,0.45)';
    } else if (material === 'silver_chrome') {
      faceColor = isNight ? '#F8FAFC' : '#E2E8F0';
      stroke = '1px rgba(255,255,255,0.6)';
    } else if (material === 'zincor') {
      faceColor = '#334155';
      stroke = '1px rgba(255,255,255,0.25)';
    } else if (material === 'double_rim') {
      faceColor = isNight ? led.core : '#FFFFFF';
      stroke = '2px #D4AF37';
    } else if (material === 'halo') {
      faceColor = '#1E293B';
      stroke = '1.2px rgba(251,191,36,0.55)';
    } else if (material === 'neon') {
      faceColor = led.core;
    }

    return {
      fontFamily: currentFont.family,
      color: faceColor,
      WebkitTextStroke: stroke,
      textShadow: shadowParts.join(', '),
      transform: `scale(${fontScale / 100})`,
    };
  }, [depthCm, angleDir, sideColor, ledColor, isNight, material, currentFont, fontScale]);

  // Compute realistic storefront background surface (Cladding / Wood Louvers / Luxury Marble)
  const storefrontSurfaceStyle = useMemo((): React.CSSProperties => {
    const baseColors: Record<FacadeTone, string> = {
      navy: '#0B213D',
      charcoal: '#151921',
      wood: '#3E2616',
      marble_white: '#E2E8F0',
      silver: '#334155',
      emerald: '#092E26',
    };
    const bg = baseColors[facadeTone];

    if (storeStyle === 'louvers') {
      // Realistic vertical wood/aluminum louvers pattern
      return {
        backgroundColor: bg,
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(0,0,0,0.48) 0px, rgba(0,0,0,0.48) 10px, rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.02) 24px)',
      };
    }

    if (storeStyle === 'marble') {
      return {
        backgroundColor: bg,
        backgroundImage:
          'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0%, transparent 55%), linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(255,255,255,0.08) 70%, transparent 100%)',
      };
    }

    // Default: Architectural ACP Cladding Panels with joint lines
    return {
      backgroundColor: bg,
      backgroundImage:
        'linear-gradient(90deg, rgba(0,0,0,0.35) 0 2px, rgba(255,255,255,0.05) 2px 3px, transparent 3px), linear-gradient(180deg, rgba(0,0,0,0.3) 0 2px, rgba(255,255,255,0.04) 2px 3px, transparent 3px)',
      backgroundSize: '150px 100%, 100% 110px',
    };
  }, [storeStyle, facadeTone]);

  const materialLabels: Record<MaterialType, string> = {
    acrylic: 'أكريليك كوري مضيء',
    gold_mirror: 'ستانلس 304 ذهبي مرايا',
    silver_chrome: 'ستانلس فضي كروم',
    zincor: 'زنكور مطلي حراري',
    double_rim: 'دبل (أكريليك + شفة ستانلس)',
    halo: 'إضاءة خلفية ملكية Halo',
    neon: 'نيون فليكس حر LED',
  };

  const storeStyleLabels: Record<StorefrontStyle, string> = {
    cladding: 'واجهة كلادينج ACP تجارية',
    louvers: 'واجهة شرائح لوفرز معمارية',
    marble: 'واجهة رخام وحجر فاخر',
  };

  const fullSpecsSummary = `النص: (${signText}) | الخط: ${currentFont.nameAr} | الخامة: ${materialLabels[material]} | البروز: ${depthCm} سم | لون الجوانب: ${sideColorMap[sideColor].nameAr} | الواجهة: ${storeStyleLabels[storeStyle]}`;

  return (
    <section className="py-14 lg:py-20 bg-white dark:bg-[#061121] transition-colors">
      <div className="smart-container">
        {/* Animated Collapsible 3D Studio Launcher Banner (شريط انسدالي متحرك وجذاب) */}
        <ScrollReveal>
          <div className="relative rounded-[36px] p-[2px] bg-gradient-to-r from-[#208EC1] via-amber-400 to-[#36A2D4] shadow-[0_24px_70px_-15px_rgba(32,142,193,0.35)] overflow-hidden group">
            {/* Animated Shimmer Sweep Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-35 group-hover:opacity-60 transition-opacity duration-700"
              style={{
                background:
                  'radial-gradient(circle at 20% 50%, rgba(56,189,248,0.35), transparent 50%), radial-gradient(circle at 80% 50%, rgba(251,191,36,0.28), transparent 50%)',
              }}
            />

            <div className="relative rounded-[34px] bg-gradient-to-br from-[#071529] via-[#0c213d] to-[#08172c] px-6 py-7 sm:px-10 sm:py-9 text-white overflow-hidden">
              {/* Decorative Floating Geometric Orbs & Blueprint Grid */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#208EC1]/25 blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none animate-pulse" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Right Column (5 cols): Title, Animated Badge & Feature Chips */}
                <div className="lg:col-span-5 space-y-3.5 text-right">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="text-xs font-extrabold text-amber-300 tracking-wide">
                      {dict.simulator.eyebrow} · تفاعلي مباشر 3D
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl xl:text-4xl text-white leading-tight">
                    {dict.simulator.title}
                  </h2>

                  <p className="text-slate-200/90 text-xs sm:text-sm leading-relaxed">
                    جرّب كتابة اسم منشأتك وشاهد كيف يبدو بالحروف البارزة ثلاثية الأبعاد على واجهة محل تجاري حقيقي مع تبديل تلقائي لـ 22 خطاً وتخصيص البروز والخامات!
                  </p>

                  {/* Animated Feature Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      '22 خطاً عربياً وعالمياً',
                      'عرض فيديو تلقائي للخطوط',
                      '7 خامات (ستانلس وأكريليك وزنكور)',
                      'تحكم بالبروز ولون الجوانب',
                    ].map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 border border-white/15 text-sky-200 flex items-center gap-1.5"
                      >
                        <Wand2 className="w-3 h-3 text-amber-300" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Center Column (4 cols): Live Animated Mini-Storefront Sign Teaser */}
                <div
                  onClick={() => setIsStudioOpen((prev) => !prev)}
                  className="lg:col-span-4 cursor-pointer group/preview"
                >
                  <div className="relative rounded-2xl border border-white/20 bg-[#07111f] p-4 shadow-2xl overflow-hidden transition-transform duration-500 group-hover/preview:scale-[1.03]">
                    {/* Top Mini Spotlights */}
                    <div className="flex justify-around mb-2">
                      {[1, 2, 3].map((s) => (
                        <span
                          key={s}
                          className="w-8 h-1.5 rounded-full bg-amber-300 shadow-[0_6px_18px_3px_rgba(251,191,36,0.75)] animate-pulse"
                        />
                      ))}
                    </div>

                    {/* Mini Cladding Wall + Auto-Morphing 3D Text */}
                    <div
                      className="rounded-xl py-5 px-3 text-center relative overflow-hidden border border-white/10"
                      style={{
                        backgroundColor: '#131924',
                        backgroundImage:
                          'repeating-linear-gradient(90deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 8px, rgba(255,255,255,0.05) 8px, rgba(255,255,255,0.02) 20px)',
                      }}
                    >
                      <div
                        className="text-2xl sm:text-3xl font-black select-none transition-all duration-500"
                        style={{
                          fontFamily: (isStudioOpen ? currentFont : teaserFont).family,
                          color: '#FDE68A',
                          textShadow:
                            '1px 1px 0px #B4881D, 2px 2px 0px #B4881D, 3px 3px 0px #B4881D, 4px 4px 0px #6E500B, 5px 5px 0px #6E500B, 7px 9px 14px rgba(0,0,0,0.8), 0 0 22px rgba(251,191,36,0.55)',
                        }}
                      >
                        {signText || 'شركة همم غيم'}
                      </div>
                      <p className="mt-2 text-[10px] font-extrabold text-amber-300/90 tracking-wider">
                        الخط المعروض الآن: {(isStudioOpen ? currentFont : teaserFont).nameAr}
                      </p>
                    </div>

                    {/* Bottom Mini Status Bar */}
                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-300 px-1">
                      <span className="flex items-center gap-1.5 font-bold text-sky-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        معاينة حية تتغير تلقائياً
                      </span>
                      <span className="text-amber-300 font-extrabold underline decoration-dotted">
                        {isStudioOpen ? 'الاستوديو مفتوح الآن' : 'اضغط للتجربة والتعديل'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left Column (3 cols): Magnetic Animated Accordion Trigger Button */}
                <div className="lg:col-span-3 flex flex-col items-stretch sm:items-center lg:items-end justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsStudioOpen((prev) => !prev)}
                    aria-expanded={isStudioOpen}
                    className={`relative w-full sm:w-auto min-w-[235px] px-7 py-4 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-xl cursor-pointer ${
                      isStudioOpen
                        ? 'bg-white/15 hover:bg-white/25 text-white border border-white/25'
                        : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 hover:scale-[1.03] shadow-[0_0_35px_rgba(251,191,36,0.5)]'
                    }`}
                  >
                    {!isStudioOpen && (
                      <span className="absolute -inset-1 rounded-2xl bg-amber-400/30 blur-md animate-pulse pointer-events-none" />
                    )}
                    <span className="relative z-10 flex items-center gap-2.5">
                      {isStudioOpen ? (
                        <>
                          <span>طيّ وإغلاق الاستوديو</span>
                          <ChevronUp className="w-5 h-5 transition-transform duration-300" />
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-slate-950 animate-bounce" />
                          <span>افتح استوديو التصميم 3D</span>
                          <ChevronDown className="w-5 h-5 animate-bounce" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Quick Day / Night Switcher inside Banner when Studio is Open */}
                  {isStudioOpen && (
                    <div className="inline-flex items-center rounded-full bg-white/10 p-1 border border-white/15 self-center lg:self-end">
                      <button
                        type="button"
                        onClick={() => setIsNight(false)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                          !isNight
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'text-slate-200 hover:text-white'
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5" />
                        <span>{dict.simulator.dayMode}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsNight(true)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                          isNight
                            ? 'bg-[#208EC1] text-white shadow-sm'
                            : 'text-slate-200 hover:text-white'
                        }`}
                      >
                        <Moon className="w-3.5 h-3.5" />
                        <span>{dict.simulator.nightMode}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Smooth Collapsible Accordion Container for the Full 3D Studio */}
        <div
          className={`grid transition-all duration-700 ease-in-out ${
            isStudioOpen
              ? 'grid-rows-[1fr] opacity-100 mt-8'
              : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            {/* Main Studio Grid: Controls on Right (5 cols) + Realistic Storefront on Left (7 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 pb-4">
              {/* RIGHT COLUMN: Clean 4-Tab Studio Control Deck */}
          <div className="lg:col-span-5 rounded-[32px] bg-[#f8fafc] dark:bg-[#0b1b32] border border-slate-200/90 dark:border-white/10 shadow-lg p-5 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* 4 Clean Studio Navigation Tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-[#071222]">
                {[
                  { id: 'font', label: '1. الخطوط', icon: Type },
                  { id: 'material', label: '2. الخامة', icon: Layers },
                  { id: 'extrusion', label: '3. البروز', icon: Box },
                  { id: 'storefront', label: '4. المحل', icon: Store },
                ].map((t) => {
                  const Icon = t.icon;
                  const active = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id as StudioTab)}
                      className={`py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                        active
                          ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Always-visible Brand Name Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-extrabold text-[#0f2544] dark:text-slate-200">
                    {dict.simulator.inputLabel}
                  </label>
                  <span className="text-[11px] text-[#208EC1] font-bold">
                    {currentFont.nameAr}
                  </span>
                </div>
                <input
                  type="text"
                  value={signText}
                  onChange={(e) => setSignText(e.target.value)}
                  maxLength={30}
                  placeholder={dict.simulator.inputPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#071324] border border-slate-300 dark:border-white/15 text-[#0f2544] dark:text-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
                />
              </div>

              {/* TAB 1: FONTS & AUTO-PLAY REEL */}
              {activeTab === 'font' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Auto-Play Video Reel Button (Changes font every 2 seconds!) */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0f2544] to-[#1a4478] text-white flex items-center justify-between gap-3 shadow-md">
                    <div>
                      <p className="text-xs font-extrabold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-sky-300" />
                        <span>العرض التلقائي الذكي للخطوط (كل ثانيتين)</span>
                      </p>
                      <p className="text-[11px] text-sky-200 mt-0.5">
                        {autoPlayFonts
                          ? `جاري استعراض الخط (${fontIdx + 1} من ${FONT_LIBRARY.length}): ${currentFont.nameAr}`
                          : `جرّب ${FONT_LIBRARY.length} خطاً تلقائياً كالفيديو بضغطة زر`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoPlayFonts(!autoPlayFonts)}
                      className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md ${
                        autoPlayFonts
                          ? 'bg-amber-400 text-slate-950 animate-pulse'
                          : 'bg-[#208EC1] hover:bg-sky-400 text-white'
                      }`}
                    >
                      {autoPlayFonts ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>إيقاف مؤقت</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>تشغيل تلقائي</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Dropdown for all 22 Fonts */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1.5">
                      اختر نوع الخط من القائمة المنسدلة ({FONT_LIBRARY.length} خط احترافي):
                    </label>
                    <select
                      value={fontIdx}
                      onChange={(e) => {
                        setAutoPlayFonts(false);
                        setFontIdx(Number(e.target.value));
                      }}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#071324] border border-slate-300 dark:border-white/15 text-sm font-bold text-[#0f2544] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
                    >
                      {FONT_LIBRARY.map((f, idx) => (
                        <option key={f.id} value={idx}>
                          {idx + 1}. {f.nameAr} — [{f.category}]
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Visual Font Pills Grid */}
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 mb-2">
                      أو اختر مباشرة باللمس:
                    </p>
                    <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto p-1">
                      {FONT_LIBRARY.map((f, idx) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => {
                            setAutoPlayFonts(false);
                            setFontIdx(idx);
                          }}
                          style={{ fontFamily: f.family }}
                          className={`p-2 rounded-xl border text-center transition-all ${
                            fontIdx === idx
                              ? 'bg-[#208EC1] text-white border-[#208EC1] shadow-sm'
                              : 'bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#208EC1]'
                          }`}
                        >
                          <span className="block text-sm font-bold truncate">
                            {signText.slice(0, 10) || 'همم غيم'}
                          </span>
                          <span className="block text-[10px] opacity-75 font-sans truncate">
                            {f.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MATERIAL TYPE (ستانلس، أكريليك، زنكور، دبل، نيون، Halo) */}
              {activeTab === 'material' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-2">
                      نوع خامة الحروف البارزة (7 خامات مصنعية):
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { id: 'gold_mirror', label: 'ستانلس 304 ذهبي مرايا', sub: 'ملكي عاكس فخم' },
                          { id: 'acrylic', label: 'أكريليك كوري مضيء', sub: 'إضاءة أمامية كاملة' },
                          { id: 'silver_chrome', label: 'ستانلس فضي كروم', sub: 'معدني لامع للشركات' },
                          { id: 'zincor', label: 'زنكور مطلي حراري', sub: 'معدن مطفي + إضاءة خلفية' },
                          { id: 'double_rim', label: 'حرف دبل (أكريليك + ستانلس)', sub: 'وجه مضيء وشفة معدنية' },
                          { id: 'halo', label: 'إضاءة خلفية Halo', sub: 'توهج غير مباشر خلف الحرف' },
                          { id: 'neon', label: 'نيون فليكس حر LED', sub: 'للكافيهات والمطاعم' },
                        ] as const
                      ).map((mat) => (
                        <button
                          key={mat.id}
                          type="button"
                          onClick={() => setMaterial(mat.id)}
                          className={`p-3 rounded-2xl border text-start transition-all ${
                            material === mat.id
                              ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white border-transparent shadow-md'
                              : 'bg-white dark:bg-[#071324] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#208EC1]'
                          }`}
                        >
                          <p className="text-xs font-extrabold">{mat.label}</p>
                          <p
                            className={`text-[10px] mt-0.5 ${
                              material === mat.id ? 'text-sky-200' : 'text-slate-400'
                            }`}
                          >
                            {mat.sub}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* LED Glow Color Selector */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-2">
                      لون الإضاءة الداخلية / الخلفية (LED Samsung IP68):
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {[
                        { id: 'warm', label: 'وورم دافئ', hex: '#F59E0B' },
                        { id: 'white', label: 'أبيض ثلجي', hex: '#F8FAFC' },
                        { id: 'cyan', label: 'سماوي', hex: '#38BDF8' },
                        { id: 'gold', label: 'ذهبي', hex: '#EAB308' },
                        { id: 'emerald', label: 'زمردي', hex: '#10B981' },
                        { id: 'rose', label: 'وردي نيون', hex: '#EC4899' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setLedColor(c.id as typeof ledColor)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            ledColor === c.id
                              ? 'border-[#208EC1] bg-[#208EC1]/10 scale-105 font-bold'
                              : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#071324]'
                          }`}
                        >
                          <span
                            style={{ backgroundColor: c.hex }}
                            className="w-6 h-6 rounded-full border border-slate-300 shadow-sm"
                          />
                          <span className="text-[10px] text-slate-700 dark:text-slate-200 whitespace-nowrap">
                            {c.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 3D EXTRUSION DEPTH & SIDE RETURN COLOR (تخصيص البروز ولون الجوانب) */}
              {activeTab === 'extrusion' && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Depth in cm */}
                  <div>
                    <div className="flex justify-between text-xs font-extrabold mb-2">
                      <span className="text-slate-700 dark:text-slate-200">
                        عمق وسماكة بروز الحرف (3D Depth):
                      </span>
                      <span className="text-[#208EC1]">{depthCm} سم</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { cm: 3, label: '3 سم (ناعم)' },
                        { cm: 6, label: '6 سم (قياسي)' },
                        { cm: 9, label: '9 سم (بارز)' },
                        { cm: 12, label: '12 سم (عميق)' },
                      ].map((d) => (
                        <button
                          key={d.cm}
                          type="button"
                          onClick={() => setDepthCm(d.cm)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                            depthCm === d.cm
                              ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white border-transparent'
                              : 'bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Side Return Color (لون جانب الحرف / الكمر الجانبي) */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-2">
                      لون الشريط الجانبي للحرف (Side Return Color):
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {(
                        [
                          { id: 'gold', hex: '#B4881D', label: 'ذهبي' },
                          { id: 'silver', hex: '#94A3B8', label: 'فضي' },
                          { id: 'black', hex: '#0F172A', label: 'أسود' },
                          { id: 'navy', hex: '#1E3A8A', label: 'كحلي' },
                          { id: 'bronze', hex: '#9A5B32', label: 'برونزي' },
                          { id: 'white', hex: '#F1F5F9', label: 'أبيض' },
                          { id: 'lit', hex: '#38BDF8', label: 'مضيء' },
                        ] as const
                      ).map((sc) => (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => setSideColor(sc.id)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            sideColor === sc.id
                              ? 'border-[#208EC1] bg-[#208EC1]/15 scale-105 font-extrabold'
                              : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#071324]'
                          }`}
                        >
                          <span
                            style={{ backgroundColor: sc.hex }}
                            className="w-6 h-6 rounded-full border border-slate-400/50 shadow-inner"
                          />
                          <span className="text-[10px] text-slate-700 dark:text-slate-200">
                            {sc.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3D Perspective Angle & Font Size */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1.5">
                        زاوية منظور البروز:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'br', label: 'يمين ↘' },
                          { id: 'down', label: 'وسط ↓' },
                          { id: 'bl', label: 'يسار ↙' },
                        ].map((ang) => (
                          <button
                            key={ang.id}
                            type="button"
                            onClick={() => setAngleDir(ang.id as 'br' | 'bl' | 'down')}
                            className={`py-2 rounded-xl text-[11px] font-bold border ${
                              angleDir === ang.id
                                ? 'bg-[#208EC1] text-white border-transparent'
                                : 'bg-white dark:bg-[#071324] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'
                            }`}
                          >
                            {ang.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1.5">
                        <span>حجم اللوحة:</span>
                        <span className="text-[#208EC1]">{fontScale}%</span>
                      </div>
                      <input
                        type="range"
                        min={75}
                        max={125}
                        value={fontScale}
                        onChange={(e) => setFontScale(Number(e.target.value))}
                        className="w-full accent-[#208EC1] mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: REALISTIC STOREFRONT SCENE & CLADDING TONES */}
              {activeTab === 'storefront' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-2">
                      نمط واجهة المحل التجاري (Architecture Style):
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: 'cladding', label: 'كلادينج ACP تجاري', sub: 'معارض وشركات' },
                          { id: 'louvers', label: 'شرائح خشب لوفرز', sub: 'كافيهات ومطاعم' },
                          { id: 'marble', label: 'رخام وحجر فاخر', sub: 'عيادات وبوتيكات' },
                        ] as const
                      ).map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setStoreStyle(st.id)}
                          className={`p-3 rounded-2xl border text-center transition-all ${
                            storeStyle === st.id
                              ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white border-transparent shadow-md'
                              : 'bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10'
                          }`}
                        >
                          <p className="text-xs font-extrabold">{st.label}</p>
                          <p className="text-[10px] opacity-75 mt-0.5">{st.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-2">
                      لون كسوة واجهة المحل:
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {(
                        [
                          { id: 'charcoal', hex: '#151921', label: 'أسود مطفي' },
                          { id: 'navy', hex: '#0B213D', label: 'كحلي ملكي' },
                          { id: 'wood', hex: '#4A2E1B', label: 'خشبي جوزي' },
                          { id: 'silver', hex: '#334155', label: 'تيتانيوم' },
                          { id: 'emerald', hex: '#092E26', label: 'أخضر ملكي' },
                          { id: 'marble_white', hex: '#CBD5E1', label: 'رخامي فاتح' },
                        ] as const
                      ).map((ft) => (
                        <button
                          key={ft.id}
                          type="button"
                          onClick={() => setFacadeTone(ft.id)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            facadeTone === ft.id
                              ? 'border-[#208EC1] bg-[#208EC1]/15 scale-105 font-bold'
                              : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#071324]'
                          }`}
                        >
                          <span
                            style={{ backgroundColor: ft.hex }}
                            className="w-6 h-6 rounded-full border border-slate-400/50"
                          />
                          <span className="text-[10px] text-slate-700 dark:text-slate-200 whitespace-nowrap">
                            {ft.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1.5">
                      النص الإضافي أسفل اللوحة (نشاط المحل أو الاسم الإنجليزي):
                    </label>
                    <input
                      type="text"
                      value={subText}
                      onChange={(e) => setSubText(e.target.value)}
                      maxLength={45}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#071324] border border-slate-300 dark:border-white/15 text-xs font-bold text-slate-700 dark:text-slate-200"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Summary & Instant Quote CTA */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#071324] border border-slate-200/80 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between gap-2">
                <div className="truncate">
                  <span className="font-extrabold text-[#0f2544] dark:text-white">
                    المواصفات:{" "}
                  </span>
                  <span>
                    {materialLabels[material]} · بروز {depthCm}سم · جانب{" "}
                    {sideColorMap[sideColor].nameAr}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSignText('شركة همم غيم');
                    setMaterial('gold_mirror');
                    setDepthCm(8);
                    setSideColor('gold');
                    setAutoPlayFonts(false);
                  }}
                  title="إعادة ضبط"
                  className="text-slate-400 hover:text-[#208EC1] p-1 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <Link
                  href={`/contact?service=signage&project=${encodeURIComponent(
                    fullSpecsSummary
                  )}`}
                  className="sm:col-span-8 py-3.5 px-5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>{dict.simulator.requestThisSign}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
                    `مرحباً شركة همم غيم، صممت لوحتي في استوديو الموقع بهذه المواصفات وأرغب في عرض سعر:\n${fullSpecsSummary}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:col-span-4 py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تسعير واتساب</span>
                </a>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN: Realistic Architectural Commercial Storefront Canvas */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className={`relative flex-1 rounded-[34px] overflow-hidden border-4 transition-all duration-500 min-h-[470px] sm:min-h-[520px] flex flex-col justify-between ${
                isNight
                  ? 'border-slate-800 shadow-[0_30px_80px_-15px_rgba(15,37,68,0.65)]'
                  : 'border-slate-200 shadow-2xl'
              }`}
            >
              {/* 1. UPPER ARCHITECTURAL ROOF CORNICE & SPOTLIGHT RIG */}
              <div className="relative z-20 h-9 bg-gradient-to-b from-slate-900 to-slate-800 border-b border-white/15 flex items-center justify-around px-8">
                {[1, 2, 3, 4].map((sp) => (
                  <div key={sp} className="relative flex flex-col items-center">
                    {/* Spotlight fixture housing */}
                    <div className="w-6 h-2.5 rounded-b-md bg-slate-700 border border-white/20 flex items-center justify-center">
                      <div
                        className={`w-3.5 h-1 rounded-full ${
                          isNight
                            ? 'bg-amber-100 shadow-[0_0_16px_4px_rgba(253,230,138,0.85)]'
                            : 'bg-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. MAIN SIGNAGE FASCIA BOARD (Cladding / Wood Louvers / Luxury Marble) */}
              <div
                style={storefrontSurfaceStyle}
                className={`relative flex-1 flex flex-col items-center justify-center px-6 py-10 transition-all duration-500 ${
                  !isNight && facadeTone !== 'marble_white' ? 'brightness-115' : ''
                }`}
              >
                {/* Volumetric Spotlight Cones at Night */}
                {isNight && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-35"
                    style={{
                      backgroundImage:
                        'radial-gradient(ellipse 22% 75% at 16% 0%, rgba(254,243,199,0.45), transparent 80%), radial-gradient(ellipse 22% 75% at 39% 0%, rgba(254,243,199,0.45), transparent 80%), radial-gradient(ellipse 22% 75% at 61% 0%, rgba(254,243,199,0.45), transparent 80%), radial-gradient(ellipse 22% 75% at 84% 0%, rgba(254,243,199,0.45), transparent 80%)',
                    }}
                  />
                )}

                {/* Inner Framed Signboard Fascia Box */}
                <div className="relative z-10 w-full max-w-[92%] rounded-2xl border border-white/15 bg-black/15 backdrop-blur-[1px] px-6 py-8 sm:py-10 text-center shadow-[inset_0_2px_20px_rgba(0,0,0,0.45)]">
                  {/* Corner Metallic Bolts */}
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-slate-400/60" />
                  <span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-slate-400/60" />
                  <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-slate-400/60" />
                  <span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-slate-400/60" />

                  {/* Main 3D Extruded Brand Name */}
                  <div className="min-h-[85px] flex items-center justify-center select-none overflow-visible">
                    <p
                      style={computedSignStyle}
                      className="font-bold text-4xl sm:text-6xl xl:text-[64px] leading-relaxed tracking-normal transition-all duration-300 break-words"
                    >
                      {signText || 'شركة همم غيم'}
                    </p>
                  </div>

                  {/* Secondary Subtitle / English Store Activity */}
                  <p
                    className={`mt-3 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-extrabold ${
                      facadeTone === 'marble_white' && !isNight
                        ? 'text-slate-700'
                        : 'text-white/80'
                    }`}
                  >
                    {subText}
                  </p>
                </div>

                {/* Live Floating Badge Showing Active Font & Spec */}
                <div className="absolute bottom-3 inset-x-5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white font-bold border border-white/15 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{currentFont.nameAr}</span>
                    <span className="text-sky-300">
                      ({fontIdx + 1}/{FONT_LIBRARY.length})
                    </span>
                  </span>

                  <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-sky-200 font-bold border border-white/15">
                    {materialLabels[material]} · بروز {depthCm} سم · جانب{' '}
                    {sideColorMap[sideColor].nameAr}
                  </span>
                </div>
              </div>

              {/* 3. REALISTIC STOREFRONT TEMPERED GLASS ENTRANCE & INTERIOR SCENE BELOW SIGN */}
              <div className="relative h-44 sm:h-48 bg-slate-950 border-t-4 border-slate-700 grid grid-cols-12 overflow-hidden">
                {/* Left Display Window (زجاج سيكوريت جانبي) */}
                <div className="col-span-4 relative border-e-2 border-slate-700/80 overflow-hidden bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 p-3 flex flex-col justify-between">
                  {/* Warm interior pendant lamps */}
                  <div className="flex justify-around">
                    <span className="w-2 h-6 bg-amber-300/80 rounded-b-full shadow-[0_6px_20px_4px_rgba(251,191,36,0.45)]" />
                    <span className="w-2 h-8 bg-amber-300/80 rounded-b-full shadow-[0_6px_20px_4px_rgba(251,191,36,0.45)]" />
                  </div>
                  {/* Storefront window sticker decal */}
                  <div className="my-auto text-center border-y border-white/15 py-1.5 bg-white/5 backdrop-blur-[1px]">
                    <p className="text-[10px] font-bold text-white/75 truncate">
                      {signText}
                    </p>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-t" />
                </div>

                {/* Center Double Securit Glass Entrance Doors (مدخل المحل الزجاجي) */}
                <div className="col-span-4 relative bg-gradient-to-b from-amber-500/15 via-slate-900/90 to-slate-950 flex">
                  {/* Left Door Leaf */}
                  <div className="flex-1 border-e border-white/20 relative flex items-center justify-end pe-2">
                    <span className="w-1 h-10 rounded-full bg-amber-400/80 shadow-sm" />
                  </div>
                  {/* Right Door Leaf */}
                  <div className="flex-1 relative flex items-center justify-start ps-2">
                    <span className="w-1 h-10 rounded-full bg-amber-400/80 shadow-sm" />
                  </div>
                  {/* Top Door Transom Number */}
                  <span className="absolute top-1.5 inset-x-0 text-center text-[9px] text-white/50 font-mono">
                    AUTOMATIC SECURIT 12MM
                  </span>
                  {/* Night Sign Reflection on Glass */}
                  {isNight && (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${ledHexMap[ledColor].glow}, transparent 70%)`,
                      }}
                    />
                  )}
                </div>

                {/* Right Display Window (واجهة العرض الزجاجية) */}
                <div className="col-span-4 relative border-s-2 border-slate-700/80 overflow-hidden bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 p-3 flex flex-col justify-between">
                  <div className="flex justify-around">
                    <span className="w-2 h-8 bg-amber-300/80 rounded-b-full shadow-[0_6px_20px_4px_rgba(251,191,36,0.45)]" />
                    <span className="w-2 h-6 bg-amber-300/80 rounded-b-full shadow-[0_6px_20px_4px_rgba(251,191,36,0.45)]" />
                  </div>
                  <div className="my-auto text-center border-y border-white/15 py-1.5 bg-white/5 backdrop-blur-[1px]">
                    <p className="text-[10px] font-bold text-sky-300/80">
                      مطابق للكود العمراني
                    </p>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-t" />
                </div>

                {/* Diagonal Glass Reflection Sheen across entire storefront */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.35) 26%, transparent 32%, transparent 65%, rgba(255,255,255,0.2) 70%, transparent 76%)',
                  }}
                />

                {/* Bottom Sidewalk / Marble Threshold Step */}
                <div className="absolute bottom-0 inset-x-0 h-3.5 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 border-t border-white/20" />
              </div>
            </div>
          </div>
            </div>

            {/* Bottom Collapse Studio Button */}
            <div className="flex justify-center pt-2 pb-4">
              <button
                type="button"
                onClick={() => setIsStudioOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-[#0c1e36] hover:bg-slate-200 dark:hover:bg-[#142d4c] text-slate-700 dark:text-slate-200 text-xs font-extrabold border border-slate-200 dark:border-white/10 transition-all"
              >
                <ChevronUp className="w-4 h-4 text-[#208EC1]" />
                <span>طيّ وإغلاق استوديو تصميم اللوحات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
