"use client";

import React, { useState, useRef } from "react";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import {
  Star,
  CheckCircle2,
  MessageSquarePlus,
  Building2,
  Send,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export default function ReviewsPage() {
  const { db, lang, dict, updateDb } = useApp();

  const [clientName, setClientName] = useState("");
  const [role, setRole] = useState("");
  const [serviceUsed, setServiceUsed] = useState(
    db.services[0]?.name.ar || "الأحرف البارزة والواجهات"
  );
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const approvedReviews = db.reviews.filter((r) => r.approved);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim()) return;
    setIsSubmitting(true);

    try {
      const newReview = {
        id: "rev-" + Date.now(),
        name: clientName.trim(),
        role: role.trim() || (lang === "ar" ? "عميل موثق" : "Verified Client"),
        rating,
        service: serviceUsed,
        date: new Date().toISOString().slice(0, 10),
        comment: comment.trim(),
        reply: "",
        approved: true,
        featured: false,
      };
      await updateDb({
        ...db,
        reviews: [newReview, ...(db.reviews || [])],
      });
      setClientName("");
      setRole("");
      setComment("");
      setSuccessMsg(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen py-3 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 bg-[#eef3f8] dark:bg-brand-950">
      <div className="smart-container">
        {/* ترويسة الصفحة: مختصرة ومرفوعة للأعلى وبدون فراغ زائد */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 text-[#208EC1] text-xs font-extrabold shadow-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>4.9 / 5.0 ({approvedReviews.length} تقييم موثق)</span>
            </span>

            <h1 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-[#0f2544] dark:text-white leading-tight">
              {dict.reviewsSection.title}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-xl mx-auto">
              {dict.reviewsSection.subtitle}
            </p>

            {/* زر انتقال سريع لإضافة تقييم في الجوال */}
            <div className="pt-1 block lg:hidden">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#208EC1] text-white text-xs font-bold shadow-xs active:scale-95 cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>{dict.reviewsSection.addReviewBtn}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* تقسيم الشاشة: قائمة التقييمات في عمود، والنموذج في عمود جانبي */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* عمود التقييمات */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {approvedReviews.map((rev, idx) => (
              <ScrollReveal key={rev.id} delay={(idx % 6) * 35}>
                <div className="clean-card rounded-2xl p-3.5 sm:p-5 shadow-xs transition-all hover:border-[#208EC1]/40">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm sm:text-base font-bold text-[#0f2544] dark:text-white">
                          {rev.name}
                        </h2>
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-[10px] font-bold">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{lang === "ar" ? "موثق" : "Verified"}</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-[#208EC1] shrink-0" />
                        <span>{rev.role}</span>
                        <span>•</span>
                        <span className="text-[#208EC1] font-medium truncate max-w-[140px] sm:max-w-none">
                          {rev.service}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-0.5 text-[#208EC1] shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? "fill-current text-[#208EC1]"
                              : "text-slate-200 dark:text-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-xs sm:text-sm">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {rev.reply && (
                    <div className="mt-2.5 p-2.5 sm:p-3 rounded-xl bg-[#208EC1]/5 border-s-3 border-[#208EC1]">
                      <p className="text-[10.5px] font-bold text-[#208EC1] mb-0.5">
                        {dict.reviewsSection.officialReply}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {rev.reply}
                      </p>
                    </div>
                  )}

                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>{rev.date}</span>
                    <span className="text-slate-400">{lang === "ar" ? "ضمان موثق" : "Verified Warranty"}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* عمود نموذج إضافة التقييم */}
          <div ref={formRef} className="lg:col-span-5 lg:sticky lg:top-20">
            <ScrollReveal delay={80}>
              <div className="clean-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#208EC1]/10 text-[#208EC1] flex items-center justify-center shrink-0">
                    <MessageSquarePlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold font-heading text-[#0f2544] dark:text-white">
                      {dict.reviewsSection.addReviewBtn}
                    </h2>
                    <p className="text-[10.5px] text-slate-500 line-clamp-1">
                      {lang === "ar"
                        ? "شاركنا تجربتك مع شركة همم غيم بكل شفافية"
                        : "Share your experience working with Himam Ghaim"}
                    </p>
                  </div>
                </div>

                {successMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-[#208EC1]/10 border border-[#208EC1]/30 text-[#0f2544] dark:text-sky-200 text-xs font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#208EC1] shrink-0" />
                    <span>
                      {lang === "ar"
                        ? "شكراً لتقييمك! تم نشر تقييمك في سجل آراء العملاء بنجاح."
                        : "Thank you! Your review has been published."}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-2.5 sm:space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
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
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-[#208EC1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
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
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-[#208EC1]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      {lang === "ar"
                        ? "الخدمة التي تم تنفيذها"
                        : "Service Executed"}
                    </label>
                    <select
                      value={serviceUsed}
                      onChange={(e) => setServiceUsed(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-[#208EC1]"
                    >
                      {db.services.map((s) => (
                        <option key={s.id} value={pickLang(s.name, lang)}>
                          {pickLang(s.name, lang)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      {lang === "ar" ? "التقييم بالنجوم" : "Star Rating"}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-1 rounded-lg hover:bg-[#208EC1]/10 transition-colors"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              num <= rating
                                ? "fill-[#208EC1] text-[#208EC1]"
                                : "text-slate-200 dark:text-slate-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      {lang === "ar"
                        ? "تفاصيل تجربتك ورأيك في جودة التنفيذ *"
                        : "Your Review *"}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={
                        lang === "ar"
                          ? "اكتب رأيك حول دقة المواعيد، جودة الخامات، واحترافية فريق التركيب..."
                          : "Share your feedback on quality, timing, and installation..."
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-[#208EC1]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-[#0f2544] hover:bg-[#208EC1] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
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
