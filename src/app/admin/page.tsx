"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Settings,
  Briefcase,
  FolderKanban,
  Bot,
  MessageSquare,
  Users,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Sparkles,
  Phone,
  Mail,
  Handshake,
  BarChart3,
} from "lucide-react";

type AdminTab =
  | "settings"
  | "services"
  | "portfolio"
  | "partners"
  | "ai"
  | "reviews"
  | "leads";

export default function AdminDashboardPage() {
  const { db, updateDb, refreshDb } = useApp();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("settings");
  const [saveBanner, setSaveBanner] = useState(false);

  const [phone, setPhone] = useState(db.settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(
    db.settings.whatsappNumber
  );
  const [email, setEmail] = useState(db.settings.email);
  const [addressAr, setAddressAr] = useState(db.settings.address.ar);

  const [statsProjectsCount, setStatsProjectsCount] = useState(
    db.settings.stats?.projectsCount || "100+"
  );
  const [statsServicesCount, setStatsServicesCount] = useState(
    db.settings.stats?.servicesCount || "8"
  );
  const [statsPartnersCount, setStatsPartnersCount] = useState(
    db.settings.stats?.partnersCount || "45+"
  );
  const [statsWarrantyYears, setStatsWarrantyYears] = useState(
    db.settings.stats?.warrantyYears || "10"
  );

  const [newPartnerNameAr, setNewPartnerNameAr] = useState("");
  const [newPartnerNameEn, setNewPartnerNameEn] = useState("");
  const [newPartnerSector, setNewPartnerSector] = useState<
    "government" | "commercial" | "healthcare"
  >("government");
  const [newPartnerLogo, setNewPartnerLogo] = useState(
    "/assets/images/partners/partner-sustainable-agriculture-center-himam-ghaim-saudi-client.webp"
  );

  const [newProjTitleAr, setNewProjTitleAr] = useState("");
  const [newProjCityAr, setNewProjCityAr] = useState("الرياض");
  const [newProjCat, setNewProjCat] = useState<string>("signage");
  const [newProjImage, setNewProjImage] = useState(
    "/assets/portfolio/3d-signage-letters-luxury-storefront-riyadh-01.webp"
  );
  const [newProjSummaryAr, setNewProjSummaryAr] = useState("");
  const [newProjTags, setNewProjTags] = useState(
    "لوحات_حروف_بارزة, دعاية_وإعلان_الرياض, شركة_همم_غيم"
  );

  const [newSrvTitleAr, setNewSrvTitleAr] = useState("");
  const [newSrvShortAr, setNewSrvShortAr] = useState("");
  const [newSrvPriceAr, setNewSrvPriceAr] = useState(
    "تبدأ من 350 ريال للمتر المربع"
  );

  const [newAiTopic, setNewAiTopic] = useState("");
  const [newAiKeywords, setNewAiKeywords] = useState("");
  const [newAiAnswer, setNewAiAnswer] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [qaDrafts, setQaDrafts] = useState<Record<string, string>>({});

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (pin === "2030" || pin.toLowerCase() === "admin" || pin === "1234") {
      setIsUnlocked(true);
      setPhone(db.settings.phone);
      setWhatsappNumber(db.settings.whatsappNumber);
      setEmail(db.settings.email);
      setAddressAr(db.settings.address.ar);
      setStatsProjectsCount(db.settings.stats?.projectsCount || "100+");
      setStatsServicesCount(db.settings.stats?.servicesCount || "8");
      setStatsPartnersCount(db.settings.stats?.partnersCount || "45+");
      setStatsWarrantyYears(db.settings.stats?.warrantyYears || "10");
    } else {
      setPinError(true);
    }
  }

  function showSavedNotification() {
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);
  }

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    const nextDb = {
      ...db,
      settings: {
        ...db.settings,
        phone,
        phoneClean: phone.replace(/\s+/g, ""),
        whatsappNumber: whatsappNumber.replace(/[^0-9]/g, ""),
        email,
        address: {
          ...db.settings.address,
          ar: addressAr,
        },
        stats: {
          ...db.settings.stats,
          projectsCount: statsProjectsCount.trim(),
          servicesCount: statsServicesCount.trim(),
          partnersCount: statsPartnersCount.trim(),
          warrantyYears: statsWarrantyYears.trim(),
        },
      },
    };
    await updateDb(nextDb);
    showSavedNotification();
  }

  async function handleAddPartner(e: React.FormEvent) {
    e.preventDefault();
    if (!newPartnerNameAr.trim()) return;

    const newId = `partner-custom-${Date.now()}`;
    const newPartner = {
      id: newId,
      slug: newId,
      name: {
        ar: newPartnerNameAr.trim(),
        en: newPartnerNameEn.trim() || newPartnerNameAr.trim(),
        ur: newPartnerNameAr.trim(),
      },
      sector: newPartnerSector,
      logo:
        newPartnerLogo.trim() ||
        "/assets/images/brand/himam-ghaim-favicon-icon.svg",
      featured: true,
    };

    const nextPartners = [newPartner, ...(db.partners || [])];
    const nextDb = {
      ...db,
      partners: nextPartners,
      settings: {
        ...db.settings,
        stats: {
          ...db.settings.stats,
          partnersCount: `+${nextPartners.length}`,
        },
      },
    };
    await updateDb(nextDb);
    setNewPartnerNameAr("");
    setNewPartnerNameEn("");
    setStatsPartnersCount(`+${nextPartners.length}`);
    showSavedNotification();
  }

  async function handleDeletePartner(id: string) {
    const nextPartners = (db.partners || []).filter((p) => p.id !== id);
    const nextDb = {
      ...db,
      partners: nextPartners,
      settings: {
        ...db.settings,
        stats: {
          ...db.settings.stats,
          partnersCount: `+${nextPartners.length}`,
        },
      },
    };
    await updateDb(nextDb);
    setStatsPartnersCount(`+${nextPartners.length}`);
    showSavedNotification();
  }

  async function handleAddPortfolioProject(e: React.FormEvent) {
    e.preventDefault();
    if (!newProjTitleAr.trim()) return;

    const newId = `proj-custom-${Date.now()}`;
    const newItem = {
      id: newId,
      slug: newId,
      category: newProjCat,
      type: "image" as const,
      src: newProjImage,
      title: {
        ar: newProjTitleAr,
        en: newProjTitleAr,
        ur: newProjTitleAr,
      },
      summary: {
        ar:
          newProjSummaryAr ||
          `تنفيذ احترافي لمشروع ${newProjTitleAr} بأعلى معايير الجودة والضمان من شركة همم غيم.`,
        en: newProjSummaryAr || newProjTitleAr,
        ur: newProjSummaryAr || newProjTitleAr,
      },
      description: {
        ar:
          newProjSummaryAr ||
          `تنفيذ احترافي لمشروع ${newProjTitleAr} بأعلى معايير الجودة والضمان من شركة همم غيم.`,
        en: newProjSummaryAr || newProjTitleAr,
        ur: newProjSummaryAr || newProjTitleAr,
      },
      alt: {
        ar: `${newProjTitleAr} - تنفيذ شركة همم غيم للدعاية والإعلان والمقاولات`,
        en: newProjTitleAr,
        ur: newProjTitleAr,
      },
      city: {
        ar: newProjCityAr,
        en: newProjCityAr,
        ur: newProjCityAr,
      },
      duration: {
        ar: "7 أيام عمل",
        en: "7 Business Days",
        ur: "7 کاروباری دن",
      },
      warranty: {
        ar: "ضمان 5 سنوات",
        en: "5 Years Warranty",
        ur: "5 سال وارنٹی",
      },
      hashtags: newProjTags
        .split(",")
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean),
      featured: true,
    };

    const nextDb = {
      ...db,
      portfolio: [newItem, ...db.portfolio],
    };
    await updateDb(nextDb);
    setNewProjTitleAr("");
    setNewProjSummaryAr("");
    showSavedNotification();
  }

  async function handleDeleteProject(id: string) {
    const nextDb = {
      ...db,
      portfolio: db.portfolio.filter((p) => p.id !== id),
    };
    await updateDb(nextDb);
    showSavedNotification();
  }

  async function handleAddService(e: React.FormEvent) {
    e.preventDefault();
    if (!newSrvTitleAr.trim()) return;
    const slug = `service-${Date.now()}`;
    const newSrv = {
      id: slug,
      slug,
      icon: "Sparkles",
      illustration:
        "/assets/services/3d-signage-letters-manufacturing-riyadh.svg",
      coverImage:
        "/assets/portfolio/3d-signage-letters-luxury-storefront-riyadh-01.webp",
      name: {
        ar: newSrvTitleAr,
        en: newSrvTitleAr,
        ur: newSrvTitleAr,
      },
      shortName: {
        ar: newSrvTitleAr,
        en: newSrvTitleAr,
        ur: newSrvTitleAr,
      },
      tagline: {
        ar: newSrvShortAr || newSrvTitleAr,
        en: newSrvShortAr || newSrvTitleAr,
        ur: newSrvShortAr || newSrvTitleAr,
      },
      description: {
        ar: newSrvShortAr || newSrvTitleAr,
        en: newSrvShortAr || newSrvTitleAr,
        ur: newSrvShortAr || newSrvTitleAr,
      },
      features: {
        ar: ["تنفيذ هندسي متكامل بضمان رسمي"],
        en: ["Full engineering execution with official warranty"],
        ur: ["سرکاری وارنٹی کے ساتھ مکمل عملدرآمد"],
      },
      audience: {
        ar: ["الشركات والمؤسسات والمشاريع التجارية"],
        en: ["Commercial & Corporate Projects"],
        ur: ["تجارتی اور کارپوریٹ منصوبے"],
      },
      priceRange: {
        ar: newSrvPriceAr,
        en: newSrvPriceAr,
        ur: newSrvPriceAr,
      },
      hashtags: ["شركة_همم_غيم", "دعاية_وإعلان", "مقاولات"],
      faqs: [],
    };

    await updateDb({
      ...db,
      services: [...db.services, newSrv],
    });
    setNewSrvTitleAr("");
    setNewSrvShortAr("");
    showSavedNotification();
  }

  async function handleAddAiRule(e: React.FormEvent) {
    e.preventDefault();
    if (!newAiAnswer.trim()) return;
    const newRule = {
      id: `rule-${Date.now()}`,
      topic: newAiTopic.trim() || "معلومة هندسية مضافة",
      keywords: newAiKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      answer: newAiAnswer.trim(),
    };
    const nextDb = {
      ...db,
      knowledgeBase: {
        ...db.knowledgeBase,
        rules: [newRule, ...(db.knowledgeBase.rules || [])],
      },
    };
    await updateDb(nextDb);
    setNewAiTopic("");
    setNewAiKeywords("");
    setNewAiAnswer("");
    showSavedNotification();
  }

  async function handleTeachFromUnanswered(qId: string, questionText: string) {
    const answerText = qaDrafts[qId];
    if (!answerText?.trim()) return;

    const newQa = {
      id: `qa-${Date.now()}`,
      question: questionText,
      answer: answerText.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };

    const remainingUnanswered = (
      db.knowledgeBase.unansweredQuestions || []
    ).filter((u) => u.id !== qId);

    await updateDb({
      ...db,
      knowledgeBase: {
        ...db.knowledgeBase,
        learnedQA: [newQa, ...(db.knowledgeBase.learnedQA || [])],
        unansweredQuestions: remainingUnanswered,
      },
    });
    showSavedNotification();
  }

  async function handleReplyToReview(revId: string) {
    const reply = replyDrafts[revId];
    if (!reply?.trim()) return;

    await fetch("/api/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: revId, reply: reply.trim(), approved: true }),
    });
    await refreshDb();
    showSavedNotification();
  }

  async function handleDeleteReview(revId: string) {
    await fetch(`/api/reviews?id=${encodeURIComponent(revId)}`, {
      method: "DELETE",
    });
    await refreshDb();
    showSavedNotification();
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4">
        <div className="clean-card rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#11345C] text-white flex items-center justify-center mx-auto mb-5 shadow-md">
            <Lock className="w-8 h-8 text-[#208EC1]" />
          </div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mb-2">
            لوحة التحكم الشاملة — همم غيم
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            أدخل رمز الدخول الإداري لإدارة الخدمات، المشاريع، أرقام التواصل، وتدريب المهندس الذكي (الرمز الافتراضي للتجربة:{" "}
            <code className="font-bold text-[#208EC1]">2030</code>)
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setPinError(false);
              }}
              placeholder="أدخل رمز المرور (2030)"
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
            />
            {pinError && (
              <p className="text-xs text-rose-500 font-bold">
                رمز الدخول غير صحيح، جرب الرمز الافتراضي: 2030
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-sm transition-all shadow-lg"
            >
              دخول لوحة التحكم
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="smart-container">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#208EC1] mb-1">
              <Sparkles className="w-4 h-4" />
              نظام إدارة المحتوى والذكاء الاصطناعي (CMS)
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              لوحة تحكم شركة همم غيم
            </h1>
          </div>

          {saveBanner && (
            <div className="px-5 py-2.5 rounded-2xl bg-emerald-500 text-white text-sm font-bold flex items-center gap-2 shadow-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم حفظ التعديلات وتحديث الموقع بنجاح!</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          {[
            { id: "settings", label: "بيانات التواصل والإعدادات", icon: Settings },
            {
              id: "portfolio",
              label: `معرض الأعمال (${db.portfolio.length})`,
              icon: FolderKanban,
            },
            {
              id: "services",
              label: `الخدمات (${db.services.length})`,
              icon: Briefcase,
            },
            {
              id: "partners",
              label: `شركاء النجاح (${(db.partners || []).length})`,
              icon: Handshake,
            },
            {
              id: "ai",
              label: `تدريب المهندس الذكي (${
                (db.knowledgeBase.rules || []).length
              })`,
              icon: Bot,
            },
            {
              id: "reviews",
              label: `التقييمات والردود (${db.reviews.length})`,
              icon: MessageSquare,
            },
            {
              id: "leads",
              label: `طلبات التسعير (${db.leads.length})`,
              icon: Users,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-[#11345C] text-white dark:bg-[#208EC1] shadow-md"
                    : "clean-card text-slate-700 dark:text-slate-300 hover:border-[#208EC1]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === "settings" && (
          <div className="clean-card rounded-3xl p-7 sm:p-10 max-w-3xl">
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-6">
              تحديث أرقام الجوال والواتساب والبريد الإلكتروني
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#208EC1]" />
                    رقم الجوال الرسمي المعروض في الموقع
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">
                    رقم الواتساب المباشر (بصيغة دولية)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#208EC1]" />
                  البريد الإلكتروني الرسمي
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">
                  العنوان ونطاق التغطية (بالعربية)
                </label>
                <input
                  type="text"
                  value={addressAr}
                  onChange={(e) => setAddressAr(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#208EC1]" />
                  أرقام الإحصائيات وعدادات القسم الرئيسي (Hero Section)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      المشاريع المنفذة
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={statsProjectsCount}
                      onChange={(e) => setStatsProjectsCount(e.target.value)}
                      placeholder="100+"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      الخدمات المتكاملة
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={statsServicesCount}
                      onChange={(e) => setStatsServicesCount(e.target.value)}
                      placeholder="8"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      الشركاء والعملاء
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={statsPartnersCount}
                      onChange={(e) => setStatsPartnersCount(e.target.value)}
                      placeholder="45+"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      سنوات الضمان
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={statsWarrantyYears}
                      onChange={(e) => setStatsWarrantyYears(e.target.value)}
                      placeholder="10"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-center"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
              >
                <Save className="w-4 h-4" />
                حفظ وتعميم بيانات التواصل والإحصائيات في كامل الموقع
              </button>
            </form>
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="clean-card rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#208EC1]" />
                  إضافة مشروع جديد إلى سابقة الأعمال
                </h2>
                <form onSubmit={handleAddPortfolioProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      عنوان المشروع (غني بالكلمات المفتاحية للسيو) *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProjTitleAr}
                      onChange={(e) => setNewProjTitleAr(e.target.value)}
                      placeholder="مثال: تنفيذ لوحة حروف بارزة وواجهة كلادينج لمجمع طبي بالرياض"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">
                        القسم
                      </label>
                      <select
                        value={newProjCat}
                        onChange={(e) => setNewProjCat(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                      >
                        {db.services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.shortName.ar || s.name.ar}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">
                        المدينة
                      </label>
                      <input
                        type="text"
                        value={newProjCityAr}
                        onChange={(e) => setNewProjCityAr(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      مسار الصورة (أو رابط صورة المشروع)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={newProjImage}
                      onChange={(e) => setNewProjImage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      وصف المشروع والمواصفات المنفذة
                    </label>
                    <textarea
                      rows={3}
                      value={newProjSummaryAr}
                      onChange={(e) => setNewProjSummaryAr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      الهاشتاقات (مفصولة بفاصلة)
                    </label>
                    <input
                      type="text"
                      value={newProjTags}
                      onChange={(e) => setNewProjTags(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#208EC1] hover:bg-[#11345C] text-white font-bold text-sm transition-all"
                  >
                    إضافة المشروع فوراً للمعرض
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="clean-card rounded-3xl p-6 max-h-[680px] overflow-y-auto space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  المشاريع الحالية ({db.portfolio.length} مشروع)
                </h3>
                {db.portfolio.slice(0, 30).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.type === "video"
                            ? item.poster || item.src
                            : item.src
                        }
                        alt={item.title.ar}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                          {item.title.ar}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.city.ar} • {item.category}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(item.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10"
                      title="حذف المشروع"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="clean-card rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-4">
                  إضافة خدمة جديدة للموقع
                </h2>
                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      اسم الخدمة *
                    </label>
                    <input
                      type="text"
                      required
                      value={newSrvTitleAr}
                      onChange={(e) => setNewSrvTitleAr(e.target.value)}
                      placeholder="مثال: الشاشات الرقمية الإلكترونية الخارجية"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      الوصف المختصر والمواصفات
                    </label>
                    <textarea
                      rows={3}
                      value={newSrvShortAr}
                      onChange={(e) => setNewSrvShortAr(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      النطاق السعري التقريبي
                    </label>
                    <input
                      type="text"
                      value={newSrvPriceAr}
                      onChange={(e) => setNewSrvPriceAr(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#208EC1] text-white font-bold text-sm"
                  >
                    إضافة الخدمة وتوليد صفحة مستقلة لها
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {db.services.map((srv) => (
                <div key={srv.id} className="clean-card rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {srv.name.ar}
                    </h3>
                    <span className="text-xs font-bold text-[#208EC1]">
                      {srv.priceRange.ar}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {srv.tagline.ar}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "partners" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="clean-card rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#208EC1]" />
                  إضافة جهة أو شريك نجاح جديد
                </h2>
                <form onSubmit={handleAddPartner} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      اسم الشريك / الجهة (بالعربية) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: وزارة النقل والخدمات اللوجستية"
                      value={newPartnerNameAr}
                      onChange={(e) => setNewPartnerNameAr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      اسم الشريك (بالإنجليزية)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      placeholder="Ministry of Transport"
                      value={newPartnerNameEn}
                      onChange={(e) => setNewPartnerNameEn(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      القطاع
                    </label>
                    <select
                      value={newPartnerSector}
                      onChange={(e) =>
                        setNewPartnerSector(
                          e.target.value as "government" | "commercial" | "healthcare"
                        )
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                    >
                      <option value="government">جهات وهيئات حكومية</option>
                      <option value="commercial">شركات ومجموعات تجارية</option>
                      <option value="healthcare">مستشفيات ومراكز طبية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      رابط شعار الشريك (Logo WebP/SVG)
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={newPartnerLogo}
                      onChange={(e) => setNewPartnerLogo(e.target.value)}
                      placeholder="/assets/images/partners/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة الشريك وتحديث العداد تلقائياً
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="clean-card rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    قائمة شركاء النجاح ({db.partners?.length || 0})
                  </h2>
                  <span className="text-xs font-bold text-[#208EC1] bg-[#208EC1]/10 px-3 py-1 rounded-full">
                    العدد الحالي في شريط الأرقام: {db.settings?.stats?.partnersCount || '45+'}
                  </span>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {(db.partners || []).map((partner) => (
                    <div
                      key={partner.id}
                      className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                          {partner.logo ? (
                            <img
                              src={partner.logo}
                              alt={partner.name?.ar || partner.name?.en}
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Users className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {partner.name?.ar || partner.name?.en}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {partner.sector === 'government'
                              ? 'جهة حكومية'
                              : partner.sector === 'commercial'
                              ? 'قطاع تجاري'
                              : partner.sector === 'healthcare'
                              ? 'قطاع صحي'
                              : 'تجزئة ومطاعم'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeletePartner(partner.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                        title="حذف الشريك"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ai" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-6">
              <div className="clean-card rounded-3xl p-6 sm:p-8">
                <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#208EC1]" />
                  تغذية قاعدة معرفة &ldquo;المهندس همم&rdquo; بقواعد جديدة
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  أضف أي معلومة هندسية، سعر متر محدث، أو عرض موسمي ليتعلمه الشات بوت فوراً ويجيب به على العملاء.
                </p>

                <form onSubmit={handleAddAiRule} className="space-y-3 mb-6">
                  <input
                    type="text"
                    value={newAiTopic}
                    onChange={(e) => setNewAiTopic(e.target.value)}
                    placeholder="عنوان القاعدة (مثال: خصم الفروع المتعددة)"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                  <input
                    type="text"
                    value={newAiKeywords}
                    onChange={(e) => setNewAiKeywords(e.target.value)}
                    placeholder="الكلمات المفتاحية مفصولة بفاصلة (مثال: خصم, فروع, عرض)"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                  <textarea
                    rows={3}
                    value={newAiAnswer}
                    onChange={(e) => setNewAiAnswer(e.target.value)}
                    placeholder="الإجابة الهندسية التي سيقدمها المهندس همم..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#11345C] hover:bg-[#208EC1] text-white text-xs font-bold"
                  >
                    إضافة للذاكرة الهندسية للشات بوت
                  </button>
                </form>

                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-slate-400">
                    القواعد الهندسية المخزنة حالياً (
                    {(db.knowledgeBase.rules || []).length}):
                  </p>
                  {(db.knowledgeBase.rules || []).map((rule) => (
                    <div
                      key={rule.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 text-xs text-slate-700 dark:text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-[#208EC1]">
                        {rule.topic}:{" "}
                      </span>
                      {rule.answer}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="clean-card rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-2">
                    أسئلة الزوار الجديدة بانتظار التدريب (
                    {(db.knowledgeBase.unansweredQuestions || []).length})
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">
                    عندما يطرح زائر سؤالاً غير مألوف، يسجله النظام هنا لتكتب له إجابة معتمدة يتعلمها البوت للأبد.
                  </p>

                  <div className="space-y-3">
                    {(db.knowledgeBase.unansweredQuestions || []).map((uq) => (
                      <div
                        key={uq.id}
                        className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2"
                      >
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          &ldquo;{uq.question}&rdquo;
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={qaDrafts[uq.id] ?? ""}
                            onChange={(e) =>
                              setQaDrafts((prev) => ({
                                ...prev,
                                [uq.id]: e.target.value,
                              }))
                            }
                            placeholder="اكتب الإجابة الهندسية المعتمدة..."
                            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                          />
                          <button
                            onClick={() =>
                              handleTeachFromUnanswered(uq.id, uq.question)
                            }
                            className="px-4 py-2 rounded-xl bg-[#208EC1] text-white text-xs font-bold shrink-0"
                          >
                            تعليم البوت
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                    الأسئلة المتعلمة والمعتمدة (
                    {(db.knowledgeBase.learnedQA || []).length})
                  </h3>
                  <div className="space-y-3">
                    {(db.knowledgeBase.learnedQA || []).map((qa) => (
                      <div
                        key={qa.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1"
                      >
                        <p className="font-bold text-slate-900 dark:text-white">
                          س: {qa.question}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                          ج: {qa.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {db.reviews.map((rev) => (
              <div key={rev.id} className="clean-card rounded-3xl p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {rev.name} —{" "}
                      <span className="text-xs text-[#208EC1]">{rev.role}</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {rev.service} • {rev.date}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(rev.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    حذف
                  </button>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-200">
                  {rev.comment}
                </p>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={replyDrafts[rev.id] ?? rev.reply ?? ""}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({
                        ...prev,
                        [rev.id]: e.target.value,
                      }))
                    }
                    placeholder="اكتب رد إدارة شركة همم غيم على هذا التقييم..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                  <button
                    onClick={() => handleReplyToReview(rev.id)}
                    className="px-5 py-2.5 rounded-xl bg-[#11345C] text-white text-xs font-bold"
                  >
                    حفظ الرد الرسمي
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "leads" && (
          <div className="clean-card rounded-3xl p-6 sm:p-8">
            <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white mb-4">
              طلبات عروض الأسعار والمعاينات الواردة ({db.leads.length})
            </h2>
            {db.leads.length === 0 ? (
              <p className="text-sm text-slate-500">
                لا توجد طلبات مسجلة حتى الآن. ستظهر هنا جميع طلبات صفحة اتصل بنا وحاسبة التكلفة فوراً.
              </p>
            ) : (
              <div className="space-y-4">
                {db.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {lead.name} —{" "}
                        <span dir="ltr" className="text-[#208EC1]">
                          {lead.phone}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500">
                        المدينة: {lead.city} | الخدمة: {lead.service} | المصدر:{" "}
                        {lead.source}
                      </p>
                      {lead.details && (
                        <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                          {lead.details}
                        </p>
                      )}
                    </div>
                    <a
                      href={`https://wa.me/${lead.phone.replace(
                        /[^0-9]/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold"
                    >
                      مراسلة واتساب
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
