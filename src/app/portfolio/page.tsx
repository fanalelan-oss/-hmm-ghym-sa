"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import {
  Search,
  MapPin,
  ArrowUpRight,
  Play,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function PortfolioPage() {
  const { db, lang, dict } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mediaFilter, setMediaFilter] = useState<"all" | "image" | "video">("all");
  const [visibleCount, setVisibleCount] = useState<number>(18);

  const categories = useMemo(() => {
    return [
      { id: "all", label: dict.portfolioSection.allFilter },
      ...db.services.map((s) => ({
        id: s.id,
        label: pickLang(s.shortName || s.name, lang),
      })),
    ];
  }, [db.services, dict.portfolioSection.allFilter, lang]);

  const filteredItems = useMemo(() => {
    return db.portfolio.filter((item) => {
      const matchesCat =
        activeCategory === "all" || item.category === activeCategory;
      const matchesMedia = mediaFilter === "all" || item.type === mediaFilter;

      if (!searchQuery.trim()) return matchesCat && matchesMedia;

      const q = searchQuery.toLowerCase();
      const titleMatch =
        item.title.ar.toLowerCase().includes(q) ||
        item.title.en.toLowerCase().includes(q) ||
        item.title.ur.toLowerCase().includes(q);
      const cityMatch =
        item.city.ar.toLowerCase().includes(q) ||
        item.city.en.toLowerCase().includes(q);
      const tagMatch = (item.hashtags || []).some((h) =>
        h.toLowerCase().includes(q)
      );

      return matchesCat && matchesMedia && (titleMatch || cityMatch || tagMatch);
    });
  }, [db.portfolio, activeCategory, mediaFilter, searchQuery]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <section className="relative py-14 bg-gradient-to-b from-[#11345C]/10 to-transparent">
        <div className="smart-container">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-sm font-bold mb-4">
                <Sparkles className="w-4 h-4" />
                {dict.portfolioSection.eyebrow} ({db.portfolio.length})
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4 leading-tight">
                {dict.portfolioSection.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {dict.portfolioSection.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mt-10 clean-card rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-5 relative">
                  <Search className="w-5 h-5 text-slate-400 absolute top-1/2 -translate-y-1/2 start-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(18);
                    }}
                    placeholder={
                      lang === "ar"
                        ? "ابحث باسم المشروع، الخدمة، المدينة (الرياض، جدة...) أو الهاشتاق"
                        : lang === "ur"
                        ? "پروجیکٹ، شہر یا ہیش ٹیگ تلاش کریں..."
                        : "Search by project title, city (Riyadh, Jeddah...), or hashtag..."
                    }
                    className="w-full ps-12 pe-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-[#208EC1] transition-colors"
                  />
                </div>

                <div className="lg:col-span-3 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
                  {(["all", "image", "video"] as const).map((mType) => (
                    <button
                      key={mType}
                      onClick={() => {
                        setMediaFilter(mType);
                        setVisibleCount(18);
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        mediaFilter === mType
                          ? "bg-[#11345C] text-white dark:bg-[#208EC1]"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      }`}
                    >
                      {mType === "all"
                        ? lang === "ar"
                          ? "الكل"
                          : lang === "ur"
                          ? "سب"
                          : "All"
                        : mType === "image"
                        ? lang === "ar"
                          ? "صور (96)"
                          : lang === "ur"
                          ? "تصاویر"
                          : "Photos (96)"
                        : lang === "ar"
                        ? "فيديو (4)"
                        : lang === "ur"
                        ? "ویڈیوز"
                        : "Videos (4)"}
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-4 flex items-center justify-end gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-[#208EC1]" />
                  <span>
                    {lang === "ar"
                      ? `عرض ${displayedItems.length} من أصل ${filteredItems.length} مشروع`
                      : lang === "ur"
                      ? `${filteredItems.length} میں سے ${displayedItems.length} منصوبے`
                      : `Showing ${displayedItems.length} of ${filteredItems.length} projects`}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                {categories.map((cat) => {
                  const count =
                    cat.id === "all"
                      ? db.portfolio.length
                      : db.portfolio.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setVisibleCount(18);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                        activeCategory === cat.id
                          ? "bg-[#208EC1] text-white shadow-md shadow-[#208EC1]/25"
                          : "bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          activeCategory === cat.id
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="smart-container mt-8">
        {displayedItems.length === 0 ? (
          <div className="clean-card rounded-3xl p-12 text-center">
            <p className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-3">
              {lang === "ar"
                ? "لا توجد مشاريع مطابقة لبحثك حالياً"
                : "No projects match your current filter"}
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setMediaFilter("all");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-xl bg-[#208EC1] text-white text-sm font-bold"
            >
              {lang === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedItems.map((project, idx) => {
              const imgSrc =
                project.type === "video"
                  ? project.poster || project.src
                  : project.src;
              return (
                <ScrollReveal key={project.id} delay={(idx % 6) * 50}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block clean-card rounded-3xl overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden bg-slate-900">
                      <img
                        src={imgSrc}
                        alt={pickLang(project.alt, lang)}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      <div className="absolute top-4 start-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#208EC1]" />
                          {pickLang(project.city, lang)}
                        </span>
                      </div>

                      {project.type === "video" && (
                        <div className="absolute top-4 end-4 w-10 h-10 rounded-full bg-[#208EC1] text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                      )}

                      <div className="absolute bottom-4 inset-x-4 flex items-end justify-between gap-2">
                        <h2 className="text-lg font-bold text-white group-hover:text-[#7dd3fc] transition-colors line-clamp-1">
                          {pickLang(project.title, lang)}
                        </h2>
                        <span className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#208EC1] transition-colors shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                        {pickLang(project.summary, lang)}
                      </p>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                        {(project.hashtags || []).slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
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

        {visibleCount < filteredItems.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 18)}
              className="px-8 py-4 rounded-2xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-sm transition-all shadow-lg"
            >
              {lang === "ar"
                ? `عرض المزيد من المشاريع (${filteredItems.length - visibleCount} متبقي)`
                : lang === "ur"
                ? `مزید منصوبے دیکھیں (${filteredItems.length - visibleCount})`
                : `Load More Projects (${filteredItems.length - visibleCount} remaining)`}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
