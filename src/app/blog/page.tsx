"use client";

import React from "react";
import Link from "next/link";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import { BookOpen, Calendar, ArrowUpRight, Sparkles } from "lucide-react";

export default function BlogPage() {
  const { db, lang } = useApp();

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="smart-container">
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-bold mb-4">
              <BookOpen className="w-4 h-4" />
              {lang === "ar"
                ? "الموسوعة الهندسية للدعاية والإعلان والمقاولات"
                : "Engineering & Signage Knowledge Hub"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4">
              {lang === "ar"
                ? "الدليل الهندسي ومقالات الخبراء"
                : lang === "ur"
                ? "انجینئرنگ گائیڈ اور مضامین"
                : "Engineering Guides & Expert Articles"}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {lang === "ar"
                ? "دليلك الشامل لاختيار أفضل أنواع الحروف البارزة، مواصفات الكلادينج المقاوم للحريق، مظلات السيارات، واشتراطات البلديات في المملكة."
                : "Comprehensive guides on choosing 3D signage, fire-rated ACP cladding, car shades, and Saudi municipal regulations."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(db.blogPosts || []).map((post, idx) => (
            <ScrollReveal key={post.id} delay={idx * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="group clean-card rounded-3xl overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={pickLang(post.title, lang)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 start-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#208EC1]" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#208EC1] transition-colors mb-3 leading-snug">
                      {pickLang(post.title, lang)}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
                      {pickLang(post.excerpt, lang)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#208EC1] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === "ar" ? "اقرأ الدليل الكامل" : "Read Full Guide"}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#208EC1] transition-colors" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
