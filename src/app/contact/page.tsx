"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp, pickLang } from "@/context/AppContext";
import ScrollReveal from "@/components/layout/ScrollReveal";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  Sparkles,
} from "lucide-react";

function ContactContent() {
  const { db, lang, dict } = useApp();
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") || "";
  const prefilledProject = searchParams.get("project") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("الرياض");
  const [service, setService] = useState(
    prefilledService || pickLang(db.services[0]?.name, lang) || ""
  );
  const [details, setDetails] = useState(
    prefilledProject
      ? lang === "ar"
        ? `أرغب في طلب عرض سعر لمشروع مماثل لـ: ${prefilledProject}`
        : `I would like a quote for a project similar to: ${prefilledProject}`
      : ""
  );
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSending(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          city,
          service,
          details,
          source: "contact-page",
        }),
      });
      setSentSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setDetails("");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="smart-container">
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#208EC1]/10 text-[#208EC1] text-xs font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              {lang === "ar"
                ? "استجابة هندسية فورية ومعاينة ميدانية مجانية"
                : "Instant Engineering Response & Free Site Survey"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white mb-4">
              {dict.seoSection.ctaTitle}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {dict.seoSection.ctaDesc}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal>
              <div className="clean-card rounded-3xl p-7 sm:p-8 space-y-6">
                <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  {dict.footer.contactTitle}
                </h2>

                <div className="space-y-4">
                  <a
                    href={`tel:${db.settings.phoneClean}`}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 hover:border-[#208EC1] border border-transparent transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#208EC1]/15 text-[#208EC1] flex items-center justify-center shrink-0">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        {lang === "ar"
                          ? "الجوال والاتصال المباشر"
                          : "Direct Mobile & Phone"}
                      </p>
                      <p
                        dir="ltr"
                        className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5"
                      >
                        {db.settings.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${db.settings.whatsappNumber}?text=${encodeURIComponent(
                      pickLang(db.settings.whatsappGreeting, lang)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {dict.nav.whatsapp}
                      </p>
                      <p
                        dir="ltr"
                        className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5"
                      >
                        {db.settings.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${db.settings.email}`}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 hover:border-[#208EC1] border border-transparent transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#208EC1]/15 text-[#208EC1] flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        {lang === "ar"
                          ? "البريد الإلكتروني الرسمي"
                          : "Official Email"}
                      </p>
                      <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5 break-all">
                        {db.settings.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70">
                    <div className="w-12 h-12 rounded-2xl bg-[#208EC1]/15 text-[#208EC1] flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        {lang === "ar"
                          ? "المقر الرئيسي ونطاق التغطية"
                          : "Headquarters & Coverage"}
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {pickLang(db.settings.address, lang)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70">
                    <div className="w-12 h-12 rounded-2xl bg-[#208EC1]/15 text-[#208EC1] flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        {lang === "ar" ? "ساعات العمل" : "Working Hours"}
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {pickLang(db.settings.workingHours, lang)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal delay={100}>
              <div className="clean-card rounded-3xl p-7 sm:p-10 shadow-lg">
                <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mb-2">
                  {lang === "ar"
                    ? "نموذج طلب عرض سعر أو معاينة ميدانية مجانية"
                    : "Request an Official Quote or Free Site Survey"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                  {lang === "ar"
                    ? "أدخل بيانات مشروعك وسيتواصل معك المهندس المختص فوراً لتحديد موعد المعاينة أو إرسال التسعير."
                    : "Fill in your project details and our specialized engineer will contact you promptly."}
                </p>

                {sentSuccess ? (
                  <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {lang === "ar"
                        ? "تم استلام طلبك بنجاح في قسم المشاريع!"
                        : "Your Request Has Been Received!"}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      {lang === "ar"
                        ? "سيتواصل معك مهندس شركة همم غيم قريباً جداً على رقم جوالك المسجل."
                        : "Our engineering team will reach out to your mobile number shortly."}
                    </p>
                    <button
                      onClick={() => setSentSuccess(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#208EC1] text-white text-sm font-bold"
                    >
                      {lang === "ar"
                        ? "إرسال طلب آخر"
                        : "Submit Another Request"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          {lang === "ar"
                            ? "الاسم الكريم / اسم الجهة *"
                            : "Full Name / Company *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={
                            lang === "ar"
                              ? "مثال: شركة الأفق / م. محمد"
                              : "Name or Company"
                          }
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-[#208EC1]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          {lang === "ar"
                            ? "رقم الجوال (واتساب/اتصال) *"
                            : "Mobile Number *"}
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="05xxxxxxxx"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-[#208EC1]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          {lang === "ar"
                            ? "البريد الإلكتروني (اختياري)"
                            : "Email Address (Optional)"}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-[#208EC1]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          {lang === "ar" ? "المدينة / موقع المشروع *" : "City *"}
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-[#208EC1]"
                        >
                          <option value="الرياض">الرياض (Riyadh)</option>
                          <option value="جدة">جدة (Jeddah)</option>
                          <option value="الدمام / الخبر">
                            الدمام / الخبر (Dammam / Khobar)
                          </option>
                          <option value="مكة / المدينة">
                            مكة المكرمة / المدينة المنورة
                          </option>
                          <option value="مدن المملكة الأخرى">
                            مدن المملكة الأخرى
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {lang === "ar"
                          ? "الخدمة المطلوبة *"
                          : "Required Service *"}
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-[#208EC1]"
                      >
                        {db.services.map((srv) => (
                          <option key={srv.id} value={pickLang(srv.name, lang)}>
                            {pickLang(srv.name, lang)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {lang === "ar"
                          ? "تفاصيل المشروع أو المقاسات التقريبية"
                          : "Project Details or Approximate Dimensions"}
                      </label>
                      <textarea
                        rows={4}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder={
                          lang === "ar"
                            ? "اكتب أي تفاصيل إضافية مثل: نوع النشاط، المقاس التقريبي، أو الموعد المناسب للمعاينة..."
                            : "Share details like store type, approximate dimensions, or preferred inspection time..."
                        }
                        className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-[#208EC1]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 rounded-2xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                      {lang === "ar"
                        ? "إرسال الطلب واعتماد المعاينة المجانية"
                        : "Submit Quote & Free Site Visit Request"}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 text-center">Loading Contact...</div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
