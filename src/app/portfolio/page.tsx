"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import AutoMediaCarousel, {
  buildMediaSlides,
  CarouselMediaSlide,
} from "@/components/common/AutoMediaCarousel";
import ExpandableHashtagsCard from "@/components/seo/ExpandableHashtagsCard";
import {
  Search,
  MapPin,
  ArrowUpRight,
  Play,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Building2,
  Grid3x3,
  Paintbrush,
  LayoutGrid,
  Umbrella,
  Truck,
  HardHat,
  Store,
  Flame,
  Camera,
  Layers,
  X,
  Video,
  Image as ImageIcon,
} from "lucide-react";

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  signage: Sparkles,
  contracting: Building2,
  glass: Grid3x3,
  interiors: Paintbrush,
  chipboard: LayoutGrid,
  shades: Umbrella,
  stickers: Truck,
  hoarding: HardHat,
  exhibitions: Store,
  safety: Flame,
  cctv: Camera,
};

function PortfolioContent() {
  const { db, lang, dict } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();

  // القسم المحدد حالياً (إن وجد)
  const initialCategory = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory && db.services.some((s) => s.id === initialCategory)
      ? initialCategory
      : null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mediaFilter, setMediaFilter] = useState<"all" | "image" | "video">("all");
  const [visibleCount, setVisibleCount] = useState<number>(18);

  // مزامنة القسم المختار مع معلمة الرابط ?category= ومع أزرار الرجوع/التقدم بالمتصفح
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && db.services.some((s) => s.id === cat)) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams, db.services]);

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      setSelectedCategory(cat && db.services.some((s) => s.id === cat) ? cat : null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [db.services]);

  const selectCategory = (catId: string | null) => {
    setSelectedCategory(catId);
    setVisibleCount(18);
    setSearchQuery("");
    setMediaFilter("all");
    if (typeof window !== "undefined") {
      const url = catId ? `/portfolio?category=${catId}` : "/portfolio";
      if (window.location.pathname + window.location.search !== url) {
        window.history.pushState({ category: catId }, "", url);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentService = useMemo(() => {
    if (!selectedCategory) return null;
    return db.services.find((s) => s.id === selectedCategory) || null;
  }, [db.services, selectedCategory]);

  // تحضير بطاقات الأقسام مع شرائح الصور المتحركة
  const departmentCards = useMemo(() => {
    return db.services.map((srv) => {
      let slides = buildMediaSlides(srv);
      if (slides.length === 0) {
        slides = db.portfolio
          .filter((p) => p.category === srv.id)
          .slice(0, 6)
          .map((p) => ({
            type: (p.type === "video" ? "video" : "image") as "image" | "video",
            src: p.src,
            poster: p.poster,
            altText: pickLang(p.title, lang),
          }));
      }

      const count = db.portfolio.filter((p) => p.category === srv.id).length;

      return {
        id: srv.id,
        label: pickLang(srv.shortName || srv.name, lang),
        tagline: pickLang(srv.tagline, lang),
        count,
        slides,
      };
    });
  }, [db.services, db.portfolio, lang]);

  // فلترة الأقسام بناءً على شريط البحث (في صفحة الأقسام الرئيسية)
  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) return departmentCards;
    const q = searchQuery.toLowerCase().trim();
    return departmentCards.filter(
      (dept) =>
        dept.label.toLowerCase().includes(q) ||
        (dept.tagline && dept.tagline.toLowerCase().includes(q))
    );
  }, [departmentCards, searchQuery]);

  // إحصائيات مشاريع القسم الحالي بدقة (الكل، الصور، الفيديوهات)
  const categoryStats = useMemo(() => {
    if (!selectedCategory) return { total: 0, images: 0, videos: 0 };
    const allInCat = db.portfolio.filter((item) => {
      return (
        item.category === selectedCategory ||
        (selectedCategory === "chipboard" &&
          (item.category as string) === "chipboard-wood-marble-cladding") ||
        (selectedCategory === "interiors" &&
          (item.category as string) === "interior-design-decor-finishing") ||
        (selectedCategory === "shades" &&
          (item.category as string) === "car-shades-pergolas-screens")
      );
    });
    return {
      total: allInCat.length,
      images: allInCat.filter((p) => p.type === "image").length,
      videos: allInCat.filter((p) => p.type === "video").length,
    };
  }, [db.portfolio, selectedCategory]);

  // فلترة مشاريع القسم المحدد (عند دخول القسم)
  const departmentProjects = useMemo(() => {
    if (!selectedCategory) return [];

    return db.portfolio.filter((item) => {
      const matchesCat =
        item.category === selectedCategory ||
        (selectedCategory === "chipboard" &&
          (item.category as string) === "chipboard-wood-marble-cladding") ||
        (selectedCategory === "interiors" &&
          (item.category as string) === "interior-design-decor-finishing") ||
        (selectedCategory === "shades" &&
          (item.category as string) === "car-shades-pergolas-screens");

      const matchesMedia = mediaFilter === "all" || item.type === mediaFilter;
      if (!matchesCat || !matchesMedia) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch =
        (item.title.ar || "").toLowerCase().includes(q) ||
        (item.title.en || "").toLowerCase().includes(q) ||
        (item.title.ur || "").toLowerCase().includes(q);
      const cityMatch =
        (item.city.ar || "").toLowerCase().includes(q) ||
        (item.city.en || "").toLowerCase().includes(q);
      const tagMatch = (((item as unknown as { tags?: string[] }).tags || item.hashtags || [])).some((h: string) =>
        h.toLowerCase().includes(q)
      );

      return titleMatch || cityMatch || tagMatch;
    });
  }, [db.portfolio, selectedCategory, mediaFilter, searchQuery]);

  const displayedProjects = departmentProjects.slice(0, visibleCount);
  const BackArrow = dict.dir === "rtl" ? ArrowRight : ArrowLeft;

  // =========================================================================
  // الحالة 1: صفحة أعمالنا الرئيسية (أقسام فقط وبحث فقط - بدون أي أعمال بالأسفل)
  // =========================================================================
  if (!selectedCategory) {
    return (
      <div className="min-h-screen py-3 sm:py-6 lg:py-8 space-y-3.5 sm:space-y-5 bg-[#eef3f8] dark:bg-brand-950">
        {/* 1. العنوان الرئيسي والتبرير حقه (سطرين فقط، مرفوعين للأعلى وبدون فراغ زائد) */}
        <div className="smart-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-extrabold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {lang === "ar"
                    ? `أقسام أعمالنا المنفذة (11 قسماً هندسياً)`
                    : lang === "ur"
                    ? `ہمارے کاروباری شعبہ جات (11 شعبے)`
                    : `Our Project Departments (11 Sectors)`}
                </span>
              </span>

              <h1 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#0f2544] dark:text-white leading-tight">
                {dict.portfolioSection.title}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-xl mx-auto">
                {lang === "ar"
                  ? "اختر القسم المطلوب لاستعراض نماذج مشاريعنا المنفذة والمواصفات المعتمدة بأعلى معايير الجودة والضمان في كافة مناطق المملكة."
                  : dict.portfolioSection.subtitle}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 2. شريط البحث مباشرة تحت العنوان والتبرير */}
        <div className="smart-container">
          <div className="clean-card rounded-2xl p-2 sm:p-3 shadow-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "ar"
                    ? "ابحث في أقسام الأعمال (لوحات، كلادينج، مظلات، ديكور، سيكوريت...)"
                    : lang === "ur"
                    ? "کاروباری شعبہ تلاش کریں..."
                    : "Search project departments (signage, cladding, shades...)"
                }
                className="w-full ps-10 pe-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-[#208EC1] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 -translate-y-1/2 end-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="مسح البحث"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. مباشرة تبدأ بطاقات أقسام الأعمال (3 بطاقات في الصف بالجوال وبصور متحركة) */}
        <div className="smart-container">
          <ScrollReveal delay={50}>
            {filteredDepartments.length === 0 ? (
              <div className="clean-card rounded-2xl p-8 text-center">
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-2">
                  {lang === "ar"
                    ? "لم يتم العثور على قسم مطابق للبحث"
                    : "No matching department found"}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-1.5 rounded-xl bg-[#208EC1] text-white text-xs font-bold"
                >
                  {lang === "ar" ? "مسح البحث" : "Clear Search"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3.5">
                {filteredDepartments.map((dept) => {
                  const IconComponent = categoryIconMap[dept.id] || Layers;

                  return (
                    <article
                      key={dept.id}
                      role="link"
                      tabIndex={0}
                      onClick={() => selectCategory(dept.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectCategory(dept.id);
                        }
                      }}
                      className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200/90 dark:border-white/10 hover:border-[#208EC1] bg-white dark:bg-[#0c1d34] transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 select-none active:scale-95"
                    >
                      {/* جزء الصور المتحركة للقسم كبطاقة عمل متكاملة */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                        <AutoMediaCarousel
                          slides={dept.slides}
                          alt={dept.label}
                          mode="card"
                          compact={true}
                          imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                        {/* أيقونة القسم في الأعلى مصغرة */}
                        <div className="absolute top-1 start-1 z-20 w-4 h-4 sm:w-5 sm:h-5 rounded sm:rounded-md bg-slate-900/75 backdrop-blur-xs text-[#208EC1] flex items-center justify-center">
                          <IconComponent className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                        </div>
                      </div>

                      {/* عنوان القسم تحت الصورة ومعه عدد الأعمال بخط مصغر بدون أي فقاعة */}
                      <div className="p-1.5 sm:p-2 text-center flex-1 flex flex-col items-center justify-center">
                        <h2 className="font-display font-extrabold text-[10px] sm:text-xs leading-tight line-clamp-2 text-[#0f2544] dark:text-white group-hover:text-[#208EC1] transition-colors">
                          {dept.label}
                        </h2>
                        <span className="text-[7.5px] sm:text-[9px] font-bold text-slate-400 dark:text-slate-400 mt-0.5">
                          ({dept.count} {lang === "ar" ? "عمل" : "Projects"})
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </ScrollReveal>
        </div>

        {/* كارت الهاشتاقات في أسفل الصفحة */}
        <div className="smart-container pt-4">
          <ExpandableHashtagsCard
            visibleCount={10}
            title={
              lang === "ar"
                ? "هاشتاقات مشاريعنا المنفذة في الرياض وجدة وجميع مدن المملكة"
                : "Executed Projects SEO Hashtags Across Saudi Arabia"
            }
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // الحالة 2: الزائر داخل القسم المحدد (مشاهدة أعمال هذا القسم بالتفصيل)
  // =========================================================================
  const SectionIcon = categoryIconMap[selectedCategory] || Layers;

  return (
    <div className="min-h-screen py-3 sm:py-6 lg:py-8 space-y-4 sm:space-y-5 bg-[#eef3f8] dark:bg-brand-950">
      {/* شريط الرجوع لكافة الأقسام + ترويسة القسم */}
      <div className="smart-container">
        <ScrollReveal>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => selectCategory(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#0f2544] dark:text-white text-xs font-extrabold hover:text-[#208EC1] hover:border-[#208EC1] transition-all shadow-xs group cursor-pointer"
            >
              <BackArrow className="w-3.5 h-3.5 text-[#208EC1] transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
              <span>{lang === "ar" ? "العودة لكافة أقسام الأعمال" : "Back to All Departments"}</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center shrink-0">
                  <SectionIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h1 className="font-display font-extrabold text-lg sm:text-2xl text-[#0f2544] dark:text-white leading-tight">
                    {currentService ? pickLang(currentService.name, lang) : "أعمال القسم"}
                  </h1>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {currentService
                      ? pickLang(currentService.tagline, lang)
                      : "نماذج حقيقية منفذة بأعلى معايير الجودة"}
                  </p>
                </div>
              </div>

              <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#208EC1] text-white text-xs font-black shadow-xs">
                {categoryStats.total}{" "}
                {lang === "ar" ? "مشروعاً منفذاً" : "Executed Projects"}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* شريط البحث وفلاتر الوسائط داخل القسم مع أعداد دقيقة لكل خيار */}
      <div className="smart-container">
        <div className="clean-card rounded-2xl p-2.5 sm:p-3 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(18);
                }}
                placeholder={
                  lang === "ar"
                    ? "ابحث في مشاريع هذا القسم بالاسم، المدينة (الرياض، جدة...) أو الهاشتاق"
                    : "Search projects in this department..."
                }
                className="w-full ps-10 pe-9 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:border-[#208EC1] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 -translate-y-1/2 end-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="مسح البحث"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* أزرار تصفية الوسائط مع بيان عدد المتوفر لكل نوع */}
            <div className="md:col-span-6 flex items-center gap-1.5">
              {[
                {
                  id: "all" as const,
                  label: lang === "ar" ? "الكل" : "All",
                  count: categoryStats.total,
                  Icon: Layers,
                },
                {
                  id: "image" as const,
                  label: lang === "ar" ? "صور" : "Photos",
                  count: categoryStats.images,
                  Icon: ImageIcon,
                },
                {
                  id: "video" as const,
                  label: lang === "ar" ? "فيديو" : "Videos",
                  count: categoryStats.videos,
                  Icon: Video,
                },
              ].map((mType) => {
                const isSelected = mediaFilter === mType.id;
                const isZero = mType.count === 0;

                return (
                  <button
                    key={mType.id}
                    type="button"
                    onClick={() => {
                      setMediaFilter(mType.id);
                      setVisibleCount(18);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border select-none ${
                      isSelected
                        ? "bg-[#11345C] text-white dark:bg-[#208EC1] border-[#11345C] dark:border-[#208EC1] shadow-xs"
                        : isZero
                        ? "bg-slate-100/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 border-transparent hover:bg-slate-200/60"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-white/5 hover:bg-slate-200"
                    }`}
                  >
                    <span>{mType.label}</span>
                    <span
                      className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-black ${
                        isSelected
                          ? "bg-white/25 text-white"
                          : isZero
                          ? "bg-slate-200/50 dark:bg-slate-700/40 text-slate-400"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {mType.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* شبكة الأعمال المنفذة للقسم المختار (عمودين متجاورين بالجوال) */}
      <div className="smart-container">
        {displayedProjects.length === 0 ? (
          <div className="clean-card rounded-2xl p-8 sm:p-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center">
              {mediaFilter === "video" ? (
                <Video className="w-6 h-6" />
              ) : (
                <Search className="w-6 h-6" />
              )}
            </div>

            <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-white max-w-lg mx-auto">
              {mediaFilter === "video" && categoryStats.videos === 0
                ? lang === "ar"
                  ? `لا توجد مقاطع فيديو مسجلة لهذا القسم حالياً — كافة مشاريع القسم موثقة بالصور عالية الدقة (${categoryStats.images} صورة)`
                  : `No videos currently recorded for this department — all projects are documented in HD photos (${categoryStats.images} photos)`
                : searchQuery.trim()
                ? lang === "ar"
                  ? `لا توجد نتائج تطابق بحثك عن "${searchQuery}" في هذا القسم`
                  : `No projects match "${searchQuery}" in this department`
                : lang === "ar"
                ? "لا توجد مشاريع مطابقة للفلتر المحدد"
                : "No projects match the selected filter"}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {mediaFilter === "video" && categoryStats.images > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setMediaFilter("image");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-xl bg-[#208EC1] text-white text-xs font-bold hover:bg-[#1a76a0] transition-colors shadow-xs"
                >
                  {lang === "ar"
                    ? `عرض صور مشاريع هذا القسم (${categoryStats.images} صورة)`
                    : `View Department Photos (${categoryStats.images})`}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setMediaFilter("all");
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                {lang === "ar" ? "عرض كافة أعمال القسم" : "Show All Department Works"}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
            {displayedProjects.map((project, idx) => {
              const imgSrc =
                project.type === "video"
                  ? project.poster || project.src
                  : project.src;

              return (
                <ScrollReveal key={project.id} delay={(idx % 6) * 40}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block clean-card rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#208EC1]/50 shadow-xs hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] sm:h-60 sm:aspect-auto overflow-hidden bg-slate-900">
                      <AutoMediaCarousel
                        slides={buildMediaSlides(project)}
                        alt={pickLang(project.alt, lang)}
                        mode="card"
                        imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="hidden">
                        <img
                          src={imgSrc}
                          alt={pickLang(project.alt, lang)}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                      <div className="absolute top-2 start-2 flex items-center gap-1 z-20">
                        <span className="px-2 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[9px] sm:text-xs font-bold flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-[#208EC1]" />
                          {pickLang(project.city, lang)}
                        </span>
                      </div>

                      {project.type === "video" && (
                        <div className="absolute top-2 end-2 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-[#208EC1] text-white flex items-center justify-center shadow-md z-20">
                          <Play className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" />
                        </div>
                      )}

                      <div className="absolute bottom-2 inset-x-2 flex items-end justify-between gap-1 z-20">
                        <h2 className="text-xs sm:text-base font-bold text-white group-hover:text-[#7dd3fc] transition-colors line-clamp-1 leading-snug">
                          {pickLang(project.title, lang)}
                        </h2>
                        <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/15 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#208EC1] transition-colors shrink-0">
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between">
                      <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-2">
                        {pickLang(project.summary, lang)}
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
                        {(project.hashtags || []).slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[8.5px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 truncate max-w-[110px]"
                          >
                            {tag.startsWith("#") ? tag : `#${tag}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {visibleCount < departmentProjects.length && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 18)}
              className="px-6 py-3 rounded-xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {lang === "ar"
                ? `عرض المزيد من مشاريع هذا القسم (${departmentProjects.length - visibleCount} متبقي)`
                : `Load More Projects (${departmentProjects.length - visibleCount} remaining)`}
            </button>
          </div>
        )}

        {/* زر العودة لاختيار قسم آخر في أسفل المعرض */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => selectCategory(null)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#0f2544] dark:text-white text-xs font-extrabold hover:text-[#208EC1] hover:border-[#208EC1] transition-all shadow-xs"
          >
            <BackArrow className="w-3.5 h-3.5 text-[#208EC1]" />
            <span>{lang === "ar" ? "العودة لاختيار قسم آخر" : "Choose Another Department"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-12 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#208EC1] border-t-transparent animate-spin" />
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
