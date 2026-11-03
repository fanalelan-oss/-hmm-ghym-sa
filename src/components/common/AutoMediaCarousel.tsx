"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Layers } from "lucide-react";

export interface CarouselMediaSlide {
  type: "image" | "video";
  src: string;
  poster?: string;
  altText?: string;
}

function normalizeUrl(raw?: string): string {
  if (!raw) return "";
  if (raw.startsWith("/") || raw.startsWith("http") || raw.startsWith("data:")) {
    return raw;
  }
  return `/${raw}`;
}

export function buildMediaSlides(item: {
  type?: "image" | "video";
  src?: string;
  coverImage?: string;
  image?: string;
  poster?: string;
  alt?: { ar?: string; en?: string } | string;
  seoNames?: { ar?: string[]; en?: string[] };
  gallery?: Array<
    | {
        type?: "image" | "video";
        src: string;
        poster?: string;
        alt?: { ar?: string; en?: string } | string;
      }
    | string
  >;
}): CarouselMediaSlide[] {
  const fallbackAlt =
    typeof item.alt === "string"
      ? item.alt
      : item.alt?.ar
      ? `${item.alt.ar}${item.alt.en ? ` | ${item.alt.en}` : ""}`
      : item.seoNames?.ar
      ? `${item.seoNames.ar.join(" | ")} | ${(item.seoNames.en || []).join(" | ")}`
      : undefined;

  if (Array.isArray(item.gallery) && item.gallery.length > 0) {
    return item.gallery
      .map((g) => {
        if (typeof g === "string") {
          return {
            type: (g.endsWith(".mp4") || g.endsWith(".webm") ? "video" : "image") as "image" | "video",
            src: normalizeUrl(g),
            altText: fallbackAlt,
          };
        }
        const slideAlt =
          typeof g?.alt === "string"
            ? g.alt
            : g?.alt?.ar
            ? `${g.alt.ar}${g.alt.en ? ` | ${g.alt.en}` : ""}`
            : fallbackAlt;
        return {
          type: (g?.type === "video" ? "video" : "image") as "image" | "video",
          src: normalizeUrl(g?.src),
          poster: g?.poster ? normalizeUrl(g.poster) : undefined,
          altText: slideAlt,
        };
      })
      .filter((g) => Boolean(g.src));
  }

  const primarySrc = normalizeUrl(item.src || item.coverImage || item.image);
  if (!primarySrc) return [];

  return [
    {
      type: item.type === "video" ? "video" : "image",
      src: primarySrc,
      poster: item.poster ? normalizeUrl(item.poster) : undefined,
      altText: fallbackAlt,
    },
  ];
}

interface AutoMediaCarouselProps {
  slides: CarouselMediaSlide[];
  alt: string;
  mode?: "card" | "detail";
  intervalMs?: number;
  imgClassName?: string;
}

export default function AutoMediaCarousel({
  slides,
  alt,
  mode = "card",
  intervalMs = 3500,
  imgClassName = "w-full h-full object-cover",
}: AutoMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const count = slides.length;
  const safeIndex = count > 0 ? activeIndex % count : 0;
  const currentSlide = slides[safeIndex];

  useEffect(() => {
    if (count <= 1 || isPaused) return;
    // In detail mode, if current slide is video, let video onEnded advance or wait longer
    const delay =
      mode === "detail" && currentSlide?.type === "video"
        ? 9000
        : intervalMs;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, delay);

    return () => clearInterval(timer);
  }, [count, isPaused, intervalMs, mode, currentSlide?.type]);

  if (count === 0) return null;

  // Single item: render exactly as before with zero extra chrome
  if (count === 1) {
    const only = slides[0];
    if (mode === "detail") {
      return only.type === "video" ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={only.poster}
          className="w-full max-h-[560px] object-contain bg-black"
        >
          <source src={only.src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={only.src}
          alt={only.altText || alt}
          title={only.altText || alt}
          className={imgClassName}
        />
      );
    }

    // Card mode single item
    return (
      <img
        src={only.type === "video" ? only.poster || only.src : only.src}
        alt={only.altText || alt}
        title={only.altText || alt}
        loading="lazy"
        className={imgClassName}
      />
    );
  }

  // Multi-item auto-flipping gallery!
  if (mode === "card") {
    return (
      <div
        className="relative w-full h-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === safeIndex;
          const slideSeoAlt = slide.altText || `${alt} - ${idx + 1}`;
          return (
            <div
              key={`${slide.src}-${idx}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {slide.type === "video" ? (
                slide.poster ? (
                  <img
                    src={slide.poster}
                    alt={slideSeoAlt}
                    title={slideSeoAlt}
                    className={imgClassName}
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={slide.src}
                    muted
                    loop
                    playsInline
                    autoPlay={isActive}
                    className={imgClassName}
                  />
                )
              ) : (
                <img
                  src={slide.src}
                  alt={slideSeoAlt}
                  title={slideSeoAlt}
                  className={imgClassName}
                  loading="lazy"
                />
              )}
            </div>
          );
        })}

        {/* Slide counter number only (no pill or icon) */}
        <span className="absolute top-2 end-2.5 z-20 text-white font-display font-black text-[11px] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pointer-events-none">
          {safeIndex + 1}/{count}
        </span>

        <div className="absolute bottom-2 inset-x-0 z-20 flex items-center justify-center gap-1 pointer-events-none">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === safeIndex
                  ? "w-4 bg-[#208EC1]"
                  : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Detail mode multi-item gallery with auto-play + arrows + thumbnails
  return (
    <div
      className="space-y-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-xl min-h-[280px] sm:min-h-[420px] flex items-center justify-center">
        {currentSlide.type === "video" ? (
          <video
            key={currentSlide.src}
            controls
            autoPlay
            muted
            playsInline
            poster={currentSlide.poster}
            onEnded={() => setActiveIndex((prev) => (prev + 1) % count)}
            className="w-full max-h-[560px] object-contain bg-black"
          >
            <source src={currentSlide.src} type="video/mp4" />
          </video>
        ) : (
          <img
            key={currentSlide.src}
            src={currentSlide.src}
            alt={`${alt} - ${safeIndex + 1}`}
            className="w-full max-h-[580px] object-cover transition-all duration-500"
          />
        )}

        {/* Prev / Next Controls */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setActiveIndex((prev) => (prev - 1 + count) % count);
          }}
          className="absolute start-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#208EC1] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
          aria-label="السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % count);
          }}
          className="absolute end-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#208EC1] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
          aria-label="التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="absolute top-3 end-3 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>
            {safeIndex + 1} / {count}
          </span>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 px-1">
        {slides.map((s, idx) => {
          const isAct = idx === safeIndex;
          return (
            <button
              key={`${s.src}-thumb-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                isAct
                  ? "border-[#208EC1] scale-105 shadow-md"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {s.type === "video" ? (
                s.poster ? (
                  <img
                    src={s.poster}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={s.src}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <img
                  src={s.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
              {s.type === "video" && (
                <span className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-current" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
