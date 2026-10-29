"use client";

import React, { useState } from "react";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import {
  Star,
  CheckCircle2,
  MessageSquarePlus,
  Building2,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function ReviewsPage() {
  const { db, lang, dict, refreshDb } = useApp();

  const [clientName, setClientName] = useState("");
  const [role, setRole] = useState("");
  const [serviceUsed, setServiceUsed] = useState(
    db.services[0]?.name.ar || "الأحرف البارزة والواجهات"
  );
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const approvedReviews = db.reviews.filter((r) => r.approved);

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim()) return;
    setIsSubmitting(true);

    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          role: role || (lang === "ar" ? "عميل موثق" : "Verified Client"),
          rating,
          service: serviceUsed,
          comment,
        }),
      });
      await refreshDb();
      setClientName("");
      setRole("");
      setComment("");
      setSuccessMsg(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#eef3f8] dark:bg-brand-950">
      <div className="smart-container">
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-bold mb-4 shadow-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9 / 5.0 ({approvedReviews.length} تقييم موثق)</span>
            </div>
            <h1 className="heading-3d-section text-xl sm:text-2xl lg:text-[28px] font-extrabold font-heading mb-2.5">
              {dict.reviewsSection.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              {dict.reviewsSection.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            {approvedReviews.map((rev, idx) => (
              <ScrollReveal key={rev.id} delay={idx * 60}>
                <div className="clean-card rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-[#0f2544] dark:text-white">
                          {rev.name}
                        </h2>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          {lang === "ar" ? "عميل موثق" : "Verified"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                        <Building2 className="w-3.5 h-3.5 text-[#208EC1]" />
                        <span>{rev.role}</span>
                        <span>•</span>
                        <span>{rev.service}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[#208EC1]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? "fill-current text-[#208EC1]"
                              : "text-slate-300 dark:text-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {rev.reply && (
                    <div className="mt-5 p-4 rounded-2xl bg-[#208EC1]/5 border-s-4 border-[#208EC1]">
                      <p className="text-xs font-bold text-[#208EC1] mb-1">
                        {dict.reviewsSection.officialReply}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {rev.reply}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                    {rev.date}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ScrollReveal delay={150}>
              <div className="clean-card rounded-3xl p-7 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center">
                    <MessageSquarePlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-heading text-[#0f2544] dark:text-white">
                      {dict.reviewsSection.addReviewBtn}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {lang === "ar"
                        ? "شاركنا تجربتك مع شركة همم غيم بكل شفافية"
                        : "Share your experience working with Himam Ghaim"}
                    </p>
                  </div>
                </div>

                {successMsg && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#208EC1]/10 border border-[#208EC1]/30 text-[#0f2544] dark:text-sky-200 text-sm font-medium flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#208EC1] shrink-0" />
                    <span>
                      {lang === "ar"
                        ? "شكراً لتقييمك! تم نشر تقييمك في سجل آراء العملاء بنجاح."
                        : "Thank you! Your review has been published."}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                      {lang === "ar" ? "الاسم الكريم *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={
                        lang === "ar" ? "مثال: م. عبدالله العتيبي" : "Your Name"
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                      {lang === "ar"
                        ? "اسم الشركة أو الجهة"
                        : "Company / Organization"}
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder={
                        lang === "ar"
                          ? "مثال: مجموعة طبية / كافيه / شركة مقاولات"
                          : "Company Name"
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                      {lang === "ar"
                        ? "الخدمة التي تم تنفيذها"
                        : "Service Executed"}
                    </label>
                    <select
                      value={serviceUsed}
                      onChange={(e) => setServiceUsed(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    >
                      {db.services.map((s) => (
                        <option key={s.id} value={pickLang(s.name, lang)}>
                          {pickLang(s.name, lang)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
                      {lang === "ar" ? "التقييم بالنجوم" : "Star Rating"}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-2 rounded-xl hover:bg-[#208EC1]/10 transition-colors"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              num <= rating
                                ? "fill-[#208EC1] text-[#208EC1]"
                                : "text-slate-300 dark:text-slate-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                      {lang === "ar"
                        ? "تفاصيل تجربتك ورأيك في جودة التنفيذ *"
                        : "Your Review *"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={
                        lang === "ar"
                          ? "اكتب رأيك حول دقة المواعيد، جودة الخامات، واحترافية فريق التركيب..."
                          : "Share your feedback on quality, timing, and installation..."
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-[#0f2544] hover:bg-[#208EC1] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    {lang === "ar" ? "نشر التقييم الآن" : "Publish Review"}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
