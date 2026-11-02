'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Upload,
  Image as ImageIcon,
  Move,
  Ruler,
  Building2,
  Coffee,
  Stethoscope,
  ShoppingBag,
  Trash2,
} from 'lucide-react';

interface FontOption {
  id: string;
  nameAr: string;
  nameEn: string;
  family: string;
  category: string;
}

const FONT_LIBRARY: FontOption[] = [
  { id: 'cairo', nameAr: 'خط القاهرة التجاري (Cairo)', nameEn: 'Cairo Commercial', family: "'Cairo', sans-serif", category: 'تجاري حديث' },
  { id: 'kufam', nameAr: 'خط كوفام الهندسي (Kufam)', nameEn: 'Kufam Geometric', family: "'Kufam', sans-serif", category: 'هندسي فاخر' },
  { id: 'alexandria', nameAr: 'خط الإسكندرية (Alexandria)', nameEn: 'Alexandria Modern', family: "'Alexandria', sans-serif", category: 'شركات ومكاتب' },
  { id: 'reem-kufi', nameAr: 'خط ريم كوفي الإعلاني (Reem Kufi)', nameEn: 'Reem Kufi Display', family: "'Reem Kufi', sans-serif", category: 'كوفي بارز' },
  { id: 'almarai', nameAr: 'خط المراعي الرسمي (Almarai)', nameEn: 'Almarai Corporate', family: "'Almarai', sans-serif", category: 'مؤسسي رسمي' },
  { id: 'readex', nameAr: 'خط ريدكس برو (Readex Pro)', nameEn: 'Readex Pro', family: "'Readex Pro', sans-serif", category: 'تقني نظيف' },
  { id: 'ibm-plex', nameAr: 'خط آي بي إم بليكس (IBM Plex)', nameEn: 'IBM Plex Arabic', family: "'IBM Plex Sans Arabic', sans-serif", category: 'طبي وتقني' },
  { id: 'changa', nameAr: 'خط تشانجا المربع (Changa)', nameEn: 'Changa Square', family: "'Changa', sans-serif", category: 'صناعي وهندسي' },
  { id: 'el-messiri', nameAr: 'خط المسيري للبوتيكات (El Messiri)', nameEn: 'El Messiri Boutique', family: "'El Messiri', sans-serif", category: 'أزياء وعطور' },
  { id: 'rakkas', nameAr: 'خط رقاص الجريء (Rakkas)', nameEn: 'Rakkas Bold Display', family: "'Rakkas', serif", category: 'مطاعم وكافيهات' },
  { id: 'aref-ruqaa', nameAr: 'خط عارف رقعة (Aref Ruqaa)', nameEn: 'Aref Ruqaa Calligraphic', family: "'Aref Ruqaa', serif", category: 'خطاطي أصيل' },
  { id: 'lalezar', nameAr: 'خط لاليزار العريض (Lalezar)', nameEn: 'Lalezar Heavy', family: "'Lalezar', system-ui", category: 'واجهات كبرى' },
  { id: 'amiri', nameAr: 'خط أميري الكلاسيكي (Amiri)', nameEn: 'Amiri Royal Serif', family: "'Amiri', serif", category: 'كلاسيكي رسمي' },
  { id: 'marhey', nameAr: 'خط مرحي الإبداعي (Marhey)', nameEn: 'Marhey Creative', family: "'Marhey', sans-serif", category: 'عصري شبابي' },
  { id: 'katibeh', nameAr: 'خط كتيبة الديواني (Katibeh)', nameEn: 'Katibeh Diwani', family: "'Katibeh', serif", category: 'تراثي فخم' },
  { id: 'lemonada', nameAr: 'خط ليمونادة الانسيابي (Lemonada)', nameEn: 'Lemonada Smooth', family: "'Lemonada', cursive", category: 'كافيهات وحلويات' },
  { id: 'vibes', nameAr: 'خط فايبز الحر (Vibes)', nameEn: 'Vibes Script', family: "'Vibes', system-ui", category: 'فني مبتكر' },
  { id: 'qahiri', nameAr: 'خط قاهري الكوفي الحاد (Qahiri)', nameEn: 'Qahiri Sharp Kufi', family: "'Qahiri', sans-serif", category: 'معماري حاد' },
  { id: 'gulzar', nameAr: 'خط جلزار (Gulzar)', nameEn: 'Gulzar Nastaliq', family: "'Gulzar', serif", category: 'نستعليق فاخر' },
  { id: 'alkalami', nameAr: 'خط القلمي (Alkalami)', nameEn: 'Alkalami Traditional', family: "'Alkalami', serif", category: 'خط عربي أصيل' },
  { id: 'mada', nameAr: 'خط مدى المعماري (Mada)', nameEn: 'Mada Architectural', family: "'Mada', sans-serif", category: 'لوحات إرشادية' },
  { id: 'tajawal', nameAr: 'خط تجوال القياسي (Tajawal)', nameEn: 'Tajawal Standard', family: "'Tajawal', sans-serif", category: 'قياسي متوازن' },
];

type MaterialType =
  | 'acrylic'
  | 'silver_chrome'
  | 'double_rim'
  | 'halo'
  | 'zincor'
  | 'gold_mirror'
  | 'neon';

type SideReturnColor =
  | 'silver'
  | 'navy'
  | 'black'
  | 'white'
  | 'lit'
  | 'bronze'
  | 'gold';

type StorefrontStyle = 'cladding' | 'louvers' | 'marble';
type FacadeTone = 'navy' | 'charcoal' | 'silver' | 'marble_white' | 'wood';
type StudioTab = 'font' | 'material' | 'extrusion' | 'storefront';

export default function SignageSimulatorSection() {
  const { dict, lang, db } = useApp();
  const ArrowIcon = dict.dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Studio State — Clean Monochrome/Cyan Defaults (Zero Gold Default!)
  const [activeTab, setActiveTab] = useState<StudioTab>('font');
  const [signText, setSignText] = useState('شركة همم غيم');
  const [subText, setSubText] = useState('HIMAM GHAIM · ARCHITECTURAL SIGNAGE');
  const [fontIdx, setFontIdx] = useState<number>(0);
  const [autoPlayFonts, setAutoPlayFonts] = useState<boolean>(false);

  const [material, setMaterial] = useState<MaterialType>('acrylic');
  const [ledColor, setLedColor] = useState<'white' | 'cyan' | 'warm' | 'ice'>('white');

  const [depthCm, setDepthCm] = useState<number>(8);
  const [sideColor, setSideColor] = useState<SideReturnColor>('silver');
  const [angleDir, setAngleDir] = useState<'br' | 'bl' | 'down'>('br');
  const [fontScale, setFontScale] = useState<number>(100);

  const [storeStyle, setStoreStyle] = useState<StorefrontStyle>('cladding');
  const [facadeTone, setFacadeTone] = useState<FacadeTone>('navy');
  const [isNight, setIsNight] = useState<boolean>(true);

  // Dimensions for Live Cost Estimator
  const [boardWidthM, setBoardWidthM] = useState<number>(5);
  const [boardHeightM, setBoardHeightM] = useState<number>(1.2);

  // Custom Storefront Photo & Custom Logo Upload
  const [customFacadePhoto, setCustomFacadePhoto] = useState<string | null>(null);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const facadeInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  // Interactive Drag Positioning of the Sign on the Canvas
  const [signOffset, setSignOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; origX: number; origY: number }>({
    x: 0,
    y: 0,
    origX: 0,
    origY: 0,
  });

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

  const currentFont = FONT_LIBRARY[fontIdx] || FONT_LIBRARY[0];

  // Map LED colors to hex
  const ledHexMap = {
    white: { core: '#FFFFFF', glow: '#E0F2FE', outer: '#38BDF8' },
    cyan: { core: '#E0F2FE', glow: '#38BDF8', outer: '#0284C7' },
    ice: { core: '#F8FAFC', glow: '#BAE6FD', outer: '#208EC1' },
    warm: { core: '#FFFBEB', glow: '#FDE68A', outer: '#D97706' },
  };

  // Map Side Return (3D Edge) colors to realistic shaded RGB steps
  const sideColorMap: Record<SideReturnColor, { main: string; dark: string; nameAr: string }> = {
    silver: { main: '#94A3B8', dark: '#475569', nameAr: 'فضي كروم' },
    navy: { main: '#1E3A8A', dark: '#0F172A', nameAr: 'كحلي معماري' },
    black: { main: '#1E293B', dark: '#090D16', nameAr: 'أسود مطفي' },
    white: { main: '#CBD5E1', dark: '#64748B', nameAr: 'أبيض ثلجي' },
    lit: { main: ledHexMap[ledColor].glow, dark: ledHexMap[ledColor].outer, nameAr: 'أكريليك مضيء' },
    bronze: { main: '#8C6239', dark: '#4A3219', nameAr: 'برونز مطفي' },
    gold: { main: '#B4881D', dark: '#6E500B', nameAr: 'ستانلس مصقول' },
  };

  // Compute realistic 3D multi-layered text-shadow + face color
  const computedSignStyle = useMemo((): React.CSSProperties => {
    const layers = Math.max(3, Math.round(depthCm * 1.4));
    const dx = angleDir === 'br' ? 1 : angleDir === 'bl' ? -1 : 0;
    const dy = 1;

    const side = sideColorMap[sideColor];
    const led = ledHexMap[ledColor];

    const shadowParts: string[] = [];

    for (let i = 1; i <= layers; i++) {
      const col = i < layers * 0.65 ? side.main : side.dark;
      shadowParts.push(`${dx * i}px ${dy * i}px 0px ${col}`);
    }

    shadowParts.push(
      `${dx * (layers + 4)}px ${dy * (layers + 6)}px 20px rgba(0,0,0,0.65)`
    );

    if (isNight) {
      if (material === 'acrylic' || material === 'double_rim') {
        shadowParts.push(`0 0 14px ${led.core}`);
        shadowParts.push(`0 0 30px ${led.glow}`);
        shadowParts.push(`0 0 60px ${led.outer}`);
      } else if (material === 'halo' || material === 'zincor') {
        shadowParts.push(`0 0 22px ${led.glow}`);
        shadowParts.push(`0 0 45px ${led.outer}`);
        shadowParts.push(`0 0 75px ${led.outer}`);
      } else if (material === 'silver_chrome') {
        shadowParts.push(`0 0 22px rgba(224, 242, 254, 0.55)`);
        shadowParts.push(`0 0 48px rgba(32, 142, 193, 0.4)`);
      } else if (material === 'gold_mirror') {
        shadowParts.push(`0 0 20px rgba(254, 240, 138, 0.45)`);
      } else if (material === 'neon') {
        shadowParts.unshift(`0 0 8px #FFFFFF`);
        shadowParts.push(`0 0 20px ${led.glow}`);
        shadowParts.push(`0 0 45px ${led.outer}`);
      }
    }

    let faceColor = '#FFFFFF';
    let stroke: string | undefined = undefined;

    if (material === 'acrylic') {
      faceColor = isNight ? led.core : '#FFFFFF';
    } else if (material === 'silver_chrome') {
      faceColor = isNight ? '#F8FAFC' : '#E2E8F0';
      stroke = '1px rgba(255,255,255,0.65)';
    } else if (material === 'double_rim') {
      faceColor = isNight ? led.core : '#FFFFFF';
      stroke = '2px #94A3B8';
    } else if (material === 'halo') {
      faceColor = '#0F2544';
      stroke = '1.2px rgba(56,189,248,0.65)';
    } else if (material === 'zincor') {
      faceColor = '#334155';
      stroke = '1px rgba(255,255,255,0.3)';
    } else if (material === 'gold_mirror') {
      faceColor = '#FDE68A';
      stroke = '1px rgba(255,255,255,0.4)';
    } else if (material === 'neon') {
      faceColor = led.core;
    }

    return {
      fontFamily: currentFont.family,
      color: faceColor,
      WebkitTextStroke: stroke,
      textShadow: shadowParts.join(', '),
    };
  }, [depthCm, angleDir, sideColor, ledColor, isNight, material, currentFont]);

  // Compute Logo 3D drop-shadow filter to match the text extrusion
  const computedLogoFilter = useMemo(() => {
    const side = sideColorMap[sideColor];
    const led = ledHexMap[ledColor];
    const glow = isNight ? `drop-shadow(0 0 14px ${led.outer})` : '';
    return `drop-shadow(2px 2px 0px ${side.main}) drop-shadow(3px 3px 0px ${side.dark}) drop-shadow(5px 7px 10px rgba(0,0,0,0.6)) ${glow}`;
  }, [sideColor, ledColor, isNight]);

  // Compute realistic storefront background surface
  const storefrontSurfaceStyle = useMemo((): React.CSSProperties => {
    if (customFacadePhoto) {
      return {
        backgroundImage: `url(${customFacadePhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }

    const baseColors: Record<FacadeTone, string> = {
      navy: '#0B1E36',
      charcoal: '#141923',
      silver: '#2D3A4B',
      marble_white: '#E2E8F0',
      wood: '#362214',
    };
    const bg = baseColors[facadeTone];

    if (storeStyle === 'louvers') {
      return {
        backgroundColor: bg,
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 10px, rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.02) 24px)',
      };
    }

    if (storeStyle === 'marble') {
      return {
        backgroundColor: bg,
        backgroundImage:
          'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0%, transparent 55%), linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(255,255,255,0.08) 70%, transparent 100%)',
      };
    }

    return {
      backgroundColor: bg,
      backgroundImage:
        'linear-gradient(90deg, rgba(0,0,0,0.32) 0 2px, rgba(255,255,255,0.05) 2px 3px, transparent 3px), linear-gradient(180deg, rgba(0,0,0,0.28) 0 2px, rgba(255,255,255,0.04) 2px 3px, transparent 3px)',
      backgroundSize: '150px 100%, 100% 110px',
    };
  }, [storeStyle, facadeTone, customFacadePhoto]);

  // Live Engineering Price Calculation based on Material, Depth, and Dimensions
  const livePricing = useMemo(() => {
    const area = Math.max(1, Number((boardWidthM * boardHeightM).toFixed(1)));
    const materialRateMap: Record<MaterialType, number> = {
      acrylic: 580,
      silver_chrome: 680,
      double_rim: 760,
      halo: 690,
      zincor: 520,
      gold_mirror: 720,
      neon: 490,
    };
    const baseRate = materialRateMap[material] || 600;
    const depthFactor = depthCm <= 3 ? 0.9 : depthCm <= 6 ? 1.0 : depthCm <= 9 ? 1.12 : 1.22;

    const minPrice = Math.round(area * baseRate * depthFactor * 0.92);
    const maxPrice = Math.round(area * baseRate * depthFactor * 1.12);
    return { area, minPrice, maxPrice };
  }, [boardWidthM, boardHeightM, material, depthCm]);

  const materialLabels: Record<MaterialType, string> = {
    acrylic: 'أكريليك كوري مضيء',
    silver_chrome: 'ستانلس 304 فضي كروم',
    double_rim: 'دبل (أكريليك + شفة ستانلس)',
    halo: 'إضاءة خلفية Halo غير مباشرة',
    zincor: 'زنكور مطلي حراري',
    gold_mirror: 'ستانلس مصقول عاكس',
    neon: 'نيون فليكس LED',
  };

  const storeStyleLabels: Record<StorefrontStyle, string> = {
    cladding: 'واجهة كلادينج ACP تجارية',
    louvers: 'واجهة شرائح لوفرز معمارية',
    marble: 'واجهة رخام وحجر فاخر',
  };

  // 1-Click Industry Presets
  const applyPreset = (presetId: 'corporate' | 'cafe' | 'clinic' | 'boutique') => {
    setAutoPlayFonts(false);
    setSignOffset({ x: 0, y: 0 });
    if (presetId === 'corporate') {
      setFontIdx(2); // Alexandria
      setMaterial('silver_chrome');
      setLedColor('white');
      setSideColor('silver');
      setDepthCm(9);
      setStoreStyle('cladding');
      setFacadeTone('navy');
      setSubText('CORPORATE HEADQUARTERS · RIYADH');
    } else if (presetId === 'cafe') {
      setFontIdx(3); // Reem Kufi
      setMaterial('halo');
      setLedColor('cyan');
      setSideColor('navy');
      setDepthCm(6);
      setStoreStyle('louvers');
      setFacadeTone('charcoal');
      setSubText('SPECIALTY COFFEE & ROASTERY');
    } else if (presetId === 'clinic') {
      setFontIdx(6); // IBM Plex
      setMaterial('acrylic');
      setLedColor('ice');
      setSideColor('white');
      setDepthCm(6);
      setStoreStyle('marble');
      setFacadeTone('silver');
      setSubText('MEDICAL CENTER & CLINICS');
    } else if (presetId === 'boutique') {
      setFontIdx(1); // Kufam
      setMaterial('double_rim');
      setLedColor('white');
      setSideColor('black');
      setDepthCm(12);
      setStoreStyle('cladding');
      setFacadeTone('charcoal');
      setSubText('LUXURY CONCEPT BOUTIQUE');
    }
  };

  // Handle Custom Storefront Photo Upload
  const handleFacadeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomFacadePhoto(url);
  };

  // Handle Custom Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomLogoUrl(url);
  };

  // Mouse / Touch Dragging Handlers for Sign Positioning
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: signOffset.x,
      origY: signOffset.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setSignOffset({
      x: Math.max(-180, Math.min(180, dragStartRef.current.origX + dx)),
      y: Math.max(-110, Math.min(110, dragStartRef.current.origY + dy)),
    });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const fullSpecsSummary = `النص: (${signText}) | الخط: ${currentFont.nameAr} | الخامة: ${materialLabels[material]} | البروز: ${depthCm} سم | الجوانب: ${sideColorMap[sideColor].nameAr} | المقاس المقترح: ${boardWidthM}×${boardHeightM}م (${livePricing.area} م²) | التكلفة التقديرية: ${livePricing.minPrice.toLocaleString('en-US')} - ${livePricing.maxPrice.toLocaleString('en-US')} ريال`;

  return (
    <section
      id="design-studio"
      className="hidden lg:block py-16 lg:py-22 bg-[#f4f7fb] dark:bg-[#061121] border-t border-slate-200/80 dark:border-white/10 transition-colors"
    >
      <div className="smart-container space-y-8">
        {/* Section Header + 1-Click Industry Presets */}
        <ScrollReveal>
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-extrabold mb-2.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dict.simulator.eyebrow}</span>
              </span>
              <h2 className="heading-3d-section font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] leading-snug">
                {dict.simulator.title}
              </h2>
              <p className="mt-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                {dict.simulator.subtitle}
              </p>
            </div>

            {/* 1-Click Smart Industry Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 me-1">
                قوالب جاهزة:
              </span>
              {[
                { id: 'corporate', label: 'مقر شركة', icon: Building2 },
                { id: 'cafe', label: 'كافيه ومطعم', icon: Coffee },
                { id: 'clinic', label: 'عيادة طبية', icon: Stethoscope },
                { id: 'boutique', label: 'بوتيك ومعرض', icon: ShoppingBag },
              ].map((pr) => {
                const PrIcon = pr.icon;
                return (
                  <button
                    key={pr.id}
                    type="button"
                    onClick={() =>
                      applyPreset(pr.id as 'corporate' | 'cafe' | 'clinic' | 'boutique')
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/95 dark:border-white/10 text-[#0f2544] dark:text-slate-200 hover:border-[#208EC1] hover:text-[#208EC1] text-xs font-extrabold shadow-sm transition-all hover:-translate-y-0.5"
                  >
                    <PrIcon className="w-3.5 h-3.5 text-[#208EC1]" />
                    <span>{pr.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Main Studio Grid: Controls Card on Right (5 cols) + Interactive Architectural Viewport on Left (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {/* RIGHT COLUMN: Clean Porcelain Control Deck */}
          <div className="lg:col-span-5 clean-card rounded-[30px] p-5 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* 4 Clean Studio Navigation Tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-[#eef3f8] dark:bg-[#071222]">
                {[
                  { id: 'font', label: '1. الخطوط', icon: Type },
                  { id: 'material', label: '2. الخامة', icon: Layers },
                  { id: 'extrusion', label: '3. البروز', icon: Box },
                  { id: 'storefront', label: '4. الواجهة', icon: Store },
                ].map((t) => {
                  const Icon = t.icon;
                  const active = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id as StudioTab)}
                      className={`py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                        active
                          ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Brand Name Input + Logo Upload Button */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#0f2544] dark:text-slate-200">
                    {dict.simulator.inputLabel}
                  </label>
                  <span className="text-[11px] text-[#208EC1] font-bold">
                    {currentFont.nameAr}
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={signText}
                    onChange={(e) => setSignText(e.target.value)}
                    maxLength={32}
                    placeholder={dict.simulator.inputPlaceholder}
                    className="flex-1 px-4 py-3 rounded-2xl bg-[#f4f7fb] dark:bg-[#071324] border border-slate-200/95 dark:border-white/15 text-[#0f2544] dark:text-white font-bold text-sm sm:text-base focus:outline-none focus:border-[#208EC1]"
                  />

                  {/* Hidden Logo File Input */}
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />

                  {customLogoUrl ? (
                    <button
                      type="button"
                      onClick={() => setCustomLogoUrl(null)}
                      title="حذف الشعار المرفوع"
                      className="px-3.5 py-3 rounded-2xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-red-600 text-xs font-extrabold flex items-center gap-1.5 shrink-0 border border-slate-200/90 dark:border-white/10"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">حذف الشعار</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="px-3.5 py-3 rounded-2xl bg-white dark:bg-[#071324] hover:border-[#208EC1] text-[#0f2544] dark:text-sky-200 text-xs font-extrabold flex items-center gap-1.5 shrink-0 border border-slate-200/95 dark:border-white/15 shadow-sm transition-all"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#208EC1]" />
                      <span>ارفع شعارك</span>
                    </button>
                  )}
                </div>
              </div>

              {/* TAB 1: FONTS & AUTO-PLAY REEL */}
              {activeTab === 'font' && (
                <div key="tab-font" className="space-y-4 animate-tab-switch">
                  {/* Auto-Play Font Reel Bar */}
                  <div className="p-3.5 rounded-2xl bg-[#eef3f8] dark:bg-[#071324] border border-slate-200/90 dark:border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold text-[#0f2544] dark:text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#208EC1]" />
                        <span>التبديل التلقائي للخطوط (22 خطاً)</span>
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {autoPlayFonts
                          ? `يعرض الآن (${fontIdx + 1}/${FONT_LIBRARY.length}): ${currentFont.nameAr}`
                          : 'استعرض جميع الخطوط تلقائياً على اسم منشأتك'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoPlayFonts(!autoPlayFonts)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                        autoPlayFonts
                          ? 'bg-[#208EC1] text-white shadow-sm'
                          : 'bg-[#0f2544] hover:bg-[#208EC1] text-white'
                      }`}
                    >
                      {autoPlayFonts ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>إيقاف</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>تشغيل</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Visual Font Grid */}
                  <div>
                    <div className="grid grid-cols-3 gap-2 max-h-[210px] overflow-y-auto p-1">
                      {FONT_LIBRARY.map((f, idx) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => {
                            setAutoPlayFonts(false);
                            setFontIdx(idx);
                          }}
                          style={{ fontFamily: f.family }}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            fontIdx === idx
                              ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white border-transparent shadow-sm'
                              : 'bg-white dark:bg-[#071324] text-[#0f2544] dark:text-slate-200 border-slate-200/90 dark:border-white/10 hover:border-[#208EC1]'
                          }`}
                        >
                          <span className="block text-sm font-bold truncate">
                            {signText.slice(0, 10) || 'همم غيم'}
                          </span>
                          <span
                            className={`block text-[10px] font-sans truncate mt-0.5 ${
                              fontIdx === idx ? 'text-sky-200' : 'text-slate-400'
                            }`}
                          >
                            {f.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MATERIAL TYPE & LED LIGHTING */}
              {activeTab === 'material' && (
                <div key="tab-material" className="space-y-4 animate-tab-switch">
                  <div>
                    <label className="block text-xs font-extrabold text-[#0f2544] dark:text-slate-200 mb-2">
                      اختر خامة تصنيع الحروف البارزة:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          { id: 'acrylic', label: 'أكريليك كوري مضيء', sub: 'إضاءة أمامية كاملة' },
                          { id: 'silver_chrome', label: 'ستانلس 304 فضي كروم', sub: 'معدني لامع للشركات' },
                          { id: 'double_rim', label: 'حرف دبل (أكريليك + ستانلس)', sub: 'وجه مضيء وإطار معدني' },
                          { id: 'halo', label: 'إضاءة خلفية Halo', sub: 'توهج غير مباشر خلف الحرف' },
                          { id: 'zincor', label: 'زنكور مطلي حراري', sub: 'معدن مطفي للمقرات الكبرى' },
                          { id: 'neon', label: 'نيون فليكس LED', sub: 'إضاءة متصلة للكافيهات' },
                        ] as const
                      ).map((mat) => (
                        <button
                          key={mat.id}
                          type="button"
                          onClick={() => setMaterial(mat.id)}
                          className={`p-3 rounded-2xl border text-start transition-all ${
                            material === mat.id
                              ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white border-transparent shadow-sm'
                              : 'bg-white dark:bg-[#071324] text-[#0f2544] dark:text-slate-200 border-slate-200/90 dark:border-white/10 hover:border-[#208EC1]'
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

                  {/* Clean LED Lighting Selector */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#0f2544] dark:text-slate-200 mb-2">
                      درجة الإضاءة (LED Samsung IP68):
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'white', label: 'أبيض نقي', hex: '#FFFFFF' },
                        { id: 'ice', label: 'ثلجي بارد', hex: '#E0F2FE' },
                        { id: 'cyan', label: 'سماوي هوية', hex: '#38BDF8' },
                        { id: 'warm', label: 'وورم هادئ', hex: '#FEF3C7' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setLedColor(c.id as typeof ledColor)}
                          className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                            ledColor === c.id
                              ? 'border-[#208EC1] bg-[#208EC1]/10 font-extrabold text-[#0f2544] dark:text-white'
                              : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#071324] text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <span
                            style={{ backgroundColor: c.hex }}
                            className="w-4 h-4 rounded-full border border-slate-300 shadow-sm shrink-0"
                          />
                          <span className="text-[11px] whitespace-nowrap">{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 3D EXTRUSION DEPTH & SIDE RETURN COLOR */}
              {activeTab === 'extrusion' && (
                <div key="tab-extrusion" className="space-y-4 animate-tab-switch">
                  <div>
                    <div className="flex justify-between text-xs font-extrabold mb-2">
                      <span className="text-[#0f2544] dark:text-slate-200">
                        عمق وسماكة بروز الحرف (3D Depth):
                      </span>
                      <span className="text-[#208EC1]">{depthCm} سم</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { cm: 3, label: '3 سم' },
                        { cm: 6, label: '6 سم' },
                        { cm: 9, label: '9 سم' },
                        { cm: 12, label: '12 سم' },
                      ].map((d) => (
                        <button
                          key={d.cm}
                          type="button"
                          onClick={() => setDepthCm(d.cm)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                            depthCm === d.cm
                              ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white border-transparent'
                              : 'bg-white dark:bg-[#071324] text-[#0f2544] dark:text-slate-300 border-slate-200 dark:border-white/10'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Side Return Color */}
                  <div>
                    <label className="block text-xs font-extrabold text-[#0f2544] dark:text-slate-200 mb-2">
                      لون الشريط الجانبي للحرف (Side Return):
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {(
                        [
                          { id: 'silver', hex: '#94A3B8', label: 'فضي كروم' },
                          { id: 'navy', hex: '#0F2544', label: 'كحلي' },
                          { id: 'black', hex: '#0F172A', label: 'أسود' },
                          { id: 'white', hex: '#F8FAFC', label: 'أبيض' },
                          { id: 'lit', hex: '#38BDF8', label: 'مضيء' },
                          { id: 'bronze', hex: '#8C6239', label: 'برونزي' },
                        ] as const
                      ).map((sc) => (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => setSideColor(sc.id)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                            sideColor === sc.id
                              ? 'border-[#208EC1] bg-[#208EC1]/10 font-extrabold'
                              : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#071324]'
                          }`}
                        >
                          <span
                            style={{ backgroundColor: sc.hex }}
                            className="w-5 h-5 rounded-full border border-slate-300"
                          />
                          <span className="text-[10px] text-[#0f2544] dark:text-slate-200">
                            {sc.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Angle & Font Scale */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#0f2544] dark:text-slate-200 mb-1.5">
                        زاوية المنظور:
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
                                ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white border-transparent'
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
                        <span className="text-[#0f2544] dark:text-slate-200">حجم اللوحة:</span>
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

              {/* TAB 4: STOREFRONT ARCHITECTURE OR REAL PHOTO UPLOAD */}
              {activeTab === 'storefront' && (
                <div key="tab-storefront" className="space-y-4 animate-tab-switch">
                  {/* Upload Real Storefront Photo Card */}
                  <div className="p-3.5 rounded-2xl bg-[#eef3f8] dark:bg-[#071324] border border-dashed border-[#208EC1]/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#208EC1]/15 text-[#208EC1] flex items-center justify-center shrink-0">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-[#0f2544] dark:text-white">
                          جرّب اللوحة على صورة واجهة محلك الحقيقية
                        </p>
                        <p className="text-[10.5px] text-slate-500 dark:text-slate-400">
                          ارفع صورة موقعك ثم اسحب اللوحة بالماوس لتركيبها بالمكان المناسب
                        </p>
                      </div>
                    </div>

                    <input
                      ref={facadeInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFacadeUpload}
                      className="hidden"
                    />

                    {customFacadePhoto ? (
                      <button
                        type="button"
                        onClick={() => setCustomFacadePhoto(null)}
                        className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-extrabold text-red-600 border border-slate-200 shrink-0"
                      >
                        إلغاء الصورة
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => facadeInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-[#0f2544] hover:bg-[#208EC1] text-white text-xs font-extrabold shrink-0 transition-colors"
                      >
                        ارفع صورة
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#0f2544] dark:text-slate-200 mb-2">
                      أو اختر نمط تكسية الواجهة المعمارية:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: 'cladding', label: 'كلادينج ACP', sub: 'معارض وشركات' },
                          { id: 'louvers', label: 'شرائح لوفرز', sub: 'كافيهات ومطاعم' },
                          { id: 'marble', label: 'رخام فاخر', sub: 'عيادات وبوتيكات' },
                        ] as const
                      ).map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            setCustomFacadePhoto(null);
                            setStoreStyle(st.id);
                          }}
                          className={`p-2.5 rounded-2xl border text-center transition-all ${
                            storeStyle === st.id && !customFacadePhoto
                              ? 'bg-[#0f2544] dark:bg-[#208EC1] text-white border-transparent shadow-sm'
                              : 'bg-white dark:bg-[#071324] text-[#0f2544] dark:text-slate-200 border-slate-200 dark:border-white/10'
                          }`}
                        >
                          <p className="text-xs font-extrabold">{st.label}</p>
                          <p className="text-[10px] opacity-75 mt-0.5">{st.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#0f2544] dark:text-slate-200 mb-1.5">
                      النص الإضافي أسفل اللوحة (النشاط أو الاسم الإنجليزي):
                    </label>
                    <input
                      type="text"
                      value={subText}
                      onChange={(e) => setSubText(e.target.value)}
                      maxLength={45}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f7fb] dark:bg-[#071324] border border-slate-200/95 dark:border-white/15 text-xs font-bold text-[#0f2544] dark:text-slate-200"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Live Engineering Dimensions & Price Estimator inside Control Deck */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 space-y-3">
              {/* Width & Height Quick Sliders + Live SAR Price */}
              <div className="p-3.5 rounded-2xl bg-[#eef3f8] dark:bg-[#071324] border border-slate-200/90 dark:border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#0f2544] dark:text-white flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#208EC1]" />
                    <span>المقاس والتقدير المالي الفوري:</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-[#0c1d34] text-[#208EC1] text-[11px] font-extrabold border border-slate-200/80 dark:border-white/10">
                    {boardWidthM}م × {boardHeightM}م ({livePricing.area} م²)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[10.5px] font-bold text-slate-500 mb-1">
                      <span>العرض: {boardWidthM} متر</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      step={0.5}
                      value={boardWidthM}
                      onChange={(e) => setBoardWidthM(Number(e.target.value))}
                      className="w-full accent-[#208EC1]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[10.5px] font-bold text-slate-500 mb-1">
                      <span>الارتفاع: {boardHeightM} متر</span>
                    </div>
                    <input
                      type="range"
                      min={0.6}
                      max={2.5}
                      step={0.1}
                      value={boardHeightM}
                      onChange={(e) => setBoardHeightM(Number(e.target.value))}
                      className="w-full accent-[#208EC1]"
                    />
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between border-t border-slate-200/70 dark:border-white/10">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    التكلفة التقديرية (شامل التركيب):
                  </span>
                  <span dir="ltr" className="font-display font-black text-sm sm:text-base text-[#0f2544] dark:text-white">
                    {livePricing.minPrice.toLocaleString('en-US')} – {livePricing.maxPrice.toLocaleString('en-US')}{' '}
                    <span className="text-xs text-[#208EC1]">SAR</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <Link
                  href={`/contact?service=signage&project=${encodeURIComponent(
                    fullSpecsSummary
                  )}`}
                  className="sm:col-span-7 py-3.5 px-5 rounded-full bg-[#0f2544] hover:bg-[#208EC1] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>{dict.simulator.requestThisSign}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
                    `مرحباً شركة همم غيم، صممت لوحتي في استوديو الموقع بهذه المواصفات وأرغب في اعتماد التسعير:\n${fullSpecsSummary}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:col-span-5 py-3.5 px-4 rounded-full bg-[#208EC1] hover:bg-[#0f2544] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال التصميم واتساب</span>
                </a>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN: Clean Double-Framed Architectural Preview Viewport */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="clean-card rounded-[32px] p-2.5 flex-1 flex flex-col">
              <div className="relative flex-1 rounded-[24px] overflow-hidden bg-[#0b192e] min-h-[460px] sm:min-h-[520px] flex flex-col justify-between border border-slate-200/80 dark:border-white/10">
                {/* Top Viewport Toolbar: Day/Night + Upload Facade + Reset Position */}
                <div className="relative z-20 px-4 py-3 bg-[#081324]/90 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold">
                      <Move className="w-3 h-3 text-[#208EC1]" />
                      <span>اسحب اللوحة بالماوس لتغيير مكانها</span>
                    </span>

                    {(signOffset.x !== 0 || signOffset.y !== 0) && (
                      <button
                        type="button"
                        onClick={() => setSignOffset({ x: 0, y: 0 })}
                        className="px-2.5 py-1 rounded-full bg-[#208EC1]/20 text-sky-300 text-[11px] font-bold hover:bg-[#208EC1] hover:text-white transition-colors"
                      >
                        توسيط اللوحة
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => facadeInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#208EC1] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-sky-300" />
                      <span>
                        {customFacadePhoto ? 'تغيير صورة واجهتك' : 'ارفع صورة واجهة محلك'}
                      </span>
                    </button>

                    {/* Day / Night Switcher */}
                    <div className="inline-flex items-center rounded-full bg-white/10 p-0.5 border border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsNight(false)}
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 transition-all ${
                          !isNight ? 'bg-white text-[#0f2544]' : 'text-slate-300'
                        }`}
                      >
                        <Sun className="w-3 h-3" />
                        <span>نهاري</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsNight(true)}
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 transition-all ${
                          isNight ? 'bg-[#208EC1] text-white' : 'text-slate-300'
                        }`}
                      >
                        <Moon className="w-3 h-3" />
                        <span>ليلي</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Interactive Storefront Facade Canvas */}
                <div
                  style={storefrontSurfaceStyle}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className={`relative flex-1 flex flex-col items-center justify-center px-6 py-10 cursor-grab active:cursor-grabbing select-none overflow-hidden transition-all duration-500 ${
                    !isNight && !customFacadePhoto && facadeTone !== 'marble_white'
                      ? 'brightness-115'
                      : ''
                  }`}
                >
                  {/* Night Illumination Cones */}
                  {isNight && (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-35"
                      style={{
                        backgroundImage:
                          'radial-gradient(ellipse 25% 75% at 22% 0%, rgba(224,242,254,0.35), transparent 80%), radial-gradient(ellipse 25% 75% at 50% 0%, rgba(224,242,254,0.4), transparent 80%), radial-gradient(ellipse 25% 75% at 78% 0%, rgba(224,242,254,0.35), transparent 80%)',
                      }}
                    />
                  )}

                  {/* Draggable 3D Signboard Assembly */}
                  <div
                    style={{
                      transform: `translate3d(${signOffset.x}px, ${signOffset.y}px, 0) scale(${
                        fontScale / 100
                      })`,
                    }}
                    className="relative z-10 w-full max-w-[90%] rounded-2xl border border-white/15 bg-black/25 backdrop-blur-[2px] px-6 py-8 sm:py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.55),inset_0_1px_15px_rgba(255,255,255,0.08)] transition-transform duration-75"
                  >
                    {/* Architectural Corner Fasteners */}
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-slate-300/60" />
                    <span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-slate-300/60" />
                    <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-slate-300/60" />
                    <span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-slate-300/60" />

                    {/* Optional Uploaded 3D Extruded Logo */}
                    {customLogoUrl && (
                      <div className="mb-3 flex justify-center">
                        <img
                          src={customLogoUrl}
                          alt="شعار المنشأة"
                          style={{ filter: computedLogoFilter }}
                          className="h-14 sm:h-16 w-auto object-contain pointer-events-none"
                        />
                      </div>
                    )}

                    {/* Main 3D Extruded Brand Name */}
                    <div className="min-h-[80px] flex items-center justify-center overflow-visible">
                      <p
                        style={computedSignStyle}
                        className="font-bold text-4xl sm:text-6xl xl:text-[62px] leading-relaxed tracking-normal transition-all duration-300 break-words pointer-events-none"
                      >
                        {signText || 'شركة همم غيم'}
                      </p>
                    </div>

                    {/* Secondary Subtitle */}
                    <p
                      className={`mt-2.5 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-extrabold pointer-events-none ${
                        facadeTone === 'marble_white' && !isNight && !customFacadePhoto
                          ? 'text-slate-700'
                          : 'text-white/80'
                      }`}
                    >
                      {subText}
                    </p>
                  </div>

                  {/* Bottom Live Specs Pill Bar */}
                  <div className="absolute bottom-3.5 inset-x-4 flex flex-wrap items-center justify-between gap-2 text-[11px] pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#081324]/85 backdrop-blur-md text-white font-bold border border-white/15 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#208EC1]" />
                      <span>{currentFont.nameAr}</span>
                    </span>

                    <span className="px-3.5 py-1.5 rounded-full bg-[#081324]/85 backdrop-blur-md text-sky-200 font-bold border border-white/15">
                      {materialLabels[material]} · بروز {depthCm} سم · {boardWidthM}×{boardHeightM}م
                    </span>
                  </div>
                </div>

                {/* Architectural Glass Facade Framing Strip at Bottom (Only when no custom photo is used) */}
                {!customFacadePhoto && (
                  <div className="relative h-28 bg-gradient-to-b from-[#081324] to-[#050c18] border-t border-white/15 grid grid-cols-3 px-6 gap-4 items-center">
                    <div className="h-full border-x border-white/10 bg-white/[0.02] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                        واجهة زجاج سيكوريت 12 ملم
                      </span>
                    </div>
                    <div className="h-full border-x border-white/15 bg-white/[0.04] flex flex-col items-center justify-center relative">
                      <span className="text-[10px] font-extrabold text-sky-300/90">
                        المدخل الرئيسي للمنشأة
                      </span>
                      <span className="text-[9px] text-slate-400 mt-0.5">
                        {storeStyleLabels[storeStyle]}
                      </span>
                    </div>
                    <div className="h-full border-x border-white/10 bg-white/[0.02] flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSignText('شركة همم غيم');
                          setMaterial('acrylic');
                          setDepthCm(8);
                          setSideColor('silver');
                          setSignOffset({ x: 0, y: 0 });
                          setCustomFacadePhoto(null);
                          setCustomLogoUrl(null);
                        }}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-300 hover:text-[#208EC1] transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>إعادة ضبط الاستوديو</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
