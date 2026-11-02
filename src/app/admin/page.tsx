"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Settings,
  Briefcase,
  FolderKanban,
  Bot,
  MessageSquare,
  Bell,
  MessageCircle,
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
  ArrowRight,
  Home,
  LogOut,
  Share2,
  Layers,
  ChevronUp,
  X,
  ExternalLink,
  Folder,
} from "lucide-react";
import Link from "next/link";
import SocialPreviewManager from "@/components/admin/SocialPreviewManager";
import SecurityConfirmModal from "@/components/admin/SecurityConfirmModal";

type AdminTab =
  | "settings"
  | "services"
  | "portfolio"
  | "partners"
  | "ai"
  | "reviews"
  | "leads"
  | "social-og";

export default function AdminDashboardPage() {
  const { db, updateDb, refreshDb } = useApp();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("settings");
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  const [phone, setPhone] = useState(db.settings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(
    db.settings.whatsappNumber
  );
  const [email, setEmail] = useState(db.settings.email);
  const [addressAr, setAddressAr] = useState(db.settings.address.ar);
  const [geminiApiKey, setGeminiApiKey] = useState(db.settings.aiConfig?.geminiApiKey || "");

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
    const cleanPin = pin.trim();
    if (cleanPin === "2396@" || cleanPin === "@2396") {
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

  async function executeSaveSettings() {
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
        aiConfig: {
          ...(db.settings.aiConfig || {}),
          geminiApiKey: geminiApiKey.trim(),
        },
      },
    };
    await updateDb(nextDb);
    showSavedNotification();
  }

  function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    requestSecureAction(
      "حفظ إعدادات المنصة وأرقام التواصل",
      `سيتم تحديث رقم الاتصال (${phone}) ورقم الواتساب والبريد وساعات العمل والضمان على كافة صفحات الموقع فوراً.`,
      executeSaveSettings
    );
  }

  async function handleDeleteLead(leadId: string, leadName: string) {
    requestSecureAction(
      "حذف طلب تسعير",
      `أنت على وشك حذف طلب العميل "${leadName}". لا يمكن التراجع عن هذا الإجراء.`,
      async () => {
        const nextLeads = db.leads.filter((l) => l.id !== leadId);
        await updateDb({ ...db, leads: nextLeads });
        showSavedNotification();
      }
    );
  }

  async function handleToggleLeadStatus(leadId: string, newStatus: string) {
    const nextLeads = db.leads.map((l) =>
      l.id === leadId ? { ...l, status: newStatus as any } : l
    );
    await updateDb({ ...db, leads: nextLeads });
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
      <div className="min-h-screen py-16 flex flex-col items-center justify-center px-4 bg-slate-50 dark:bg-slate-950">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#208EC1] text-xs font-bold transition-all shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى الموقع الرئيسي</span>
          </Link>
        </div>
        <div className="clean-card rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-xl">
          <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-3.5 flex items-center justify-center mx-auto mb-5 shadow-xl">
            <img
              src="/assets/images/brand/himam-ghaim-favicon-icon.svg"
              alt="شعار شركة همم غيم"
              width={64}
              height={64}
              className="w-14 h-14 object-contain filter drop-shadow-sm"
            />
          </div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white mb-2">
            لوحة التحكم الشاملة — همم غيم
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            أدخل كلمة المرور الإدارية للوصول إلى لوحة التحكم
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                const val = e.target.value;
                setPin(val);
                setPinError(false);
                checkAndAutoUnlock(val);
              }}
              placeholder="أدخل كلمة المرور"
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#208EC1]"
            />
            {pinError && (
              <p className="text-xs text-rose-500 font-bold">
                كلمة المرور غير صحيحة، يرجى إعادة المحاولة.
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
    <>
      <div className="min-h-screen pb-28 md:pb-12 bg-slate-50/60 dark:bg-slate-950">
      {/* Mobile Top App Bar (شريط علوي احترافي مدمج لوضع الجوال) */}
      <header className="md:hidden sticky top-0 z-30 bg-white/95 dark:bg-[#071325]/95 backdrop-blur-xl border-b border-slate-200/90 dark:border-white/10 px-4 py-2.5 flex items-center justify-between shadow-xs mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-1.5 flex items-center justify-center shadow-xs shrink-0">
            <img
              src="/assets/images/brand/himam-ghaim-favicon-icon.svg"
              alt="شعار شركة همم غيم"
              width={36}
              height={36}
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs font-black text-[#0f2544] dark:text-white leading-tight">
                لوحة تحكم همم غيم
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-none mt-0.5">
              الدعاية والإعلان والمقاولات العامة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#208EC1] transition-colors"
            title="معاينة الموقع"
          >
            <Home className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => setIsUnlocked(false)}
            className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
            title="قفل وخروج"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Save Toast for Mobile & Desktop */}
      {saveBanner && (
        <div className="fixed top-3 inset-x-4 z-50 max-w-sm mx-auto px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-2xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>تم حفظ التعديلات وتحديث الموقع بنجاح!</span>
        </div>
      )}

      <div className="smart-container">
        {/* Desktop Top Header (يظهر فقط في الشاشات الأكبر) */}
        <div className="hidden md:flex mb-6 items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#208EC1] text-slate-800 dark:text-slate-100 hover:text-white text-xs sm:text-sm font-bold transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للموقع الرئيسي</span>
            </Link>
            <span className="hidden sm:inline-block text-xs text-slate-400">|</span>
            <span className="hidden sm:inline-block text-xs font-medium text-slate-500 dark:text-slate-400">
              أنت الآن في وضع إدارة موقع شركة همم غيم
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#208EC1]"
            >
              <Home className="w-3.5 h-3.5" />
              <span>معاينة الموقع</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsUnlocked(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-bold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>قفل وخروج</span>
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/10 p-3 flex items-center justify-center shadow-md shrink-0">
              <img
                src="/assets/images/brand/himam-ghaim-favicon-icon.svg"
                alt="شعار همم غيم"
                width={52}
                height={52}
                className="w-11 h-11 object-contain"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#208EC1] mb-1">
                <Sparkles className="w-4 h-4" />
                شركة همم غيم للدعاية والإعلان والمقاولات العامة
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
                لوحة التحكم وإدارة المحتوى (CMS)
              </h1>
            </div>
          </div>
        </div>

        {/* Desktop Tab Navigation (أزرار أفقية في شاشات الكمبيوتر) */}
        <div className="hidden md:flex flex-wrap gap-2 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
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
            {
              id: "social-og",
              label: "معاينات الروابط والسوشيال",
              icon: Share2,
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

        {/* Mobile Section Badge Indicator (مؤشر القسم النشط للجوال) */}
        <div className="md:hidden flex items-center justify-between mb-4 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#208EC1]" />
            <span className="text-xs font-black text-slate-800 dark:text-slate-100">
              {activeTab === "settings" && "بيانات التواصل والإعدادات العامة"}
              {activeTab === "portfolio" && `معرض الأعمال (${db.portfolio.length} مشروع)`}
              {activeTab === "services" && `الخدمات (${db.services.length} خدمات)`}
              {activeTab === "partners" && `شركاء النجاح (${(db.partners || []).length} شريك)`}
              {activeTab === "ai" && `تدريب المهندس الذكي (${(db.knowledgeBase.rules || []).length} قاعدة)`}
              {activeTab === "reviews" && `التقييمات والردود (${db.reviews.length})`}
              {activeTab === "leads" && `طلبات التسعير الواردة (${db.leads.length})`}
              {activeTab === "social-og" && "معاينات الروابط والسوشيال ميديا"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsFolderOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-[#208EC1] hover:bg-[#208EC1]/15"
          >
            <Layers className="w-3 h-3" />
            <span>تبديل القسم</span>
          </button>
        </div>

        {activeTab === "settings" && (
          <div className="clean-card rounded-3xl p-7 sm:p-10 max-w-3xl">
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-6">
              تحديث أرقام الجوال والواتساب والبريد الإلكتروني
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#208EC1]" />
                      رقم الجوال الرسمي
                    </span>
                    {/^(05\d{8}|\+?9665\d{8}|01\d{7})$/.test(phone.replace(/[\s-]/g, '')) ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ معتمد وصحيح</span>
                    ) : (
                      <span className="text-[10px] text-amber-500 font-bold">صيغة 05 أو +966</span>
                    )}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold focus:ring-2 focus:ring-[#208EC1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      رقم الواتساب المباشر
                    </span>
                    {/^(\+?9665\d{8}|05\d{8})$/.test(whatsappNumber.replace(/[\s-]/g, '')) ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ صيغة دولية صحيحة</span>
                    ) : (
                      <span className="text-[10px] text-amber-500 font-bold">مثل: +966565467928</span>
                    )}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold focus:ring-2 focus:ring-[#208EC1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#208EC1]" />
                    البريد الإلكتروني الرسمي
                  </span>
                  {/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim()) ? (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">✓ بريد رسمي معتمد</span>
                  ) : (
                    <span className="text-[10px] text-amber-500 font-bold">أدخل بريداً بصيغة صحيحة</span>
                  )}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold focus:ring-2 focus:ring-[#208EC1]"
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
          <div className="space-y-8">
            {/* Live Generative AI Key (Google Gemini 2.0 Flash) */}
            <div className="clean-card rounded-3xl p-6 sm:p-8 border border-sky-500/25 bg-gradient-to-r from-sky-500/[0.07] via-transparent to-transparent space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#208EC1]" />
                    محرك الذكاء التوليدي المباشر (Google Gemini 2.0 Flash)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    أدخل مفتاح Gemini API المجاني من Google AI Studio لتحويل الشات بوت إلى مهندس بشري فائق الذكاء، يحلل صور الواجهات بدقة ويجيب بإبداع كامل وبدون أي قوالب ثابتة.
                  </p>
                </div>
                <div>
                  {geminiApiKey.trim() ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      الذكاء التوليدي مفعل (Gemini 2.0)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      يعمل بالمحرك الهندسي المحلي
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder="ألصق مفتاح Gemini API هنا (مثال: AIzaSy...)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    requestSecureAction(
                      "حفظ وتفعيل مفتاح الذكاء التوليدي Gemini API",
                      "سيتم ربط الشات بوت مباشرة بنموذج Gemini 2.0 Flash لتحليل الصور والمحادثة البشرية الحية.",
                      async () => {
                        const nextDb = {
                          ...db,
                          settings: {
                            ...db.settings,
                            aiConfig: {
                              ...(db.settings.aiConfig || {}),
                              geminiApiKey: geminiApiKey.trim(),
                            },
                          },
                        };
                        await updateDb(nextDb);
                        showSavedNotification();
                      }
                    );
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#208EC1] hover:bg-sky-500 text-white text-xs font-bold transition-all shrink-0 shadow-sm"
                >
                  حفظ وتفعيل المفتاح
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 pt-1 gap-2">
                <span>ليس لديك مفتاح؟ يمكنك توليد مفتاح مجاني رسمي بنقرة واحدة (بدون بطاقة ائتمانية):</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#208EC1] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Google AI Studio (احصل على مفتاح مجاني)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Real-time Customer Inquiries & Image Consultations Alert Center */}
            <div className="clean-card rounded-3xl p-6 sm:p-8 border border-sky-500/20 bg-gradient-to-r from-sky-500/[0.04] to-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#208EC1]" />
                    سجل استشارات العملاء وتنبيهات الصور الفورية ({(db.knowledgeBase.chatAlerts || []).length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    يسجل الشات بوت تلقائياً أي استفسار عاجل، صورة واجهة مرفقة، أو رقم جوال يتركه العميل مع إمكانية التنبيه المباشر بالإيميل.
                  </p>
                </div>
              </div>

              {(db.knowledgeBase.chatAlerts || []).length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-400">
                  لا توجد تنبيهات جديدة حتى الآن. سيسجل الشات بوت أي استشارة أو صورة مرفقة تلقائياً هنا مع خيار المراسلة المباشرة.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(db.knowledgeBase.chatAlerts || []).slice(0, 6).map((alert: any) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                          {alert.trigger === 'image_uploaded' ? '📸 صورة واجهة مرفقة' : alert.trigger === 'customer_phone' ? '📞 رقم عميل جديد' : alert.trigger === 'site_visit' ? '📍 طلب معاينة موقع' : 'استفسار هندسي'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{alert.createdAt}</span>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-200 font-medium line-clamp-3">
                        {alert.summary}
                      </p>

                      {alert.imageUrl && (
                        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-36 bg-black/10">
                          <img src={alert.imageUrl} alt="صورة العميل" className="w-full h-32 object-cover" />
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                          <span>{alert.customerPhone || 'بدون رقم مسجل'}</span>
                        </div>
                        {alert.customerPhone && (
                          <a
                            href={'https://wa.me/' + alert.customerPhone.replace(/[^0-9]/g, '')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>مراسلة واتساب</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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

        {activeTab === "social-og" && (
          <SocialPreviewManager
            db={db}
            updateDb={updateDb}
            showSavedNotification={showSavedNotification}
          />
        )}

        {activeTab === "leads" && (
          <div className="clean-card rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <span>طلبات عروض الأسعار والمعاينات الواردة</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#208EC1]/15 text-[#208EC1] text-xs font-black">
                    {db.leads.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  طلبات حقيقية مسجلة من حاسبة التكلفة وصفحة اتصل بنا مع الرد والتتبع الفوري
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                {[
                  { id: 'all', label: `الكل (${db.leads.length})` },
                  { id: 'new', label: `جديدة (${db.leads.filter(l => l.status === 'new' || !l.status).length})` },
                  { id: 'contacted', label: `تم التواصل (${db.leads.filter(l => l.status === 'contacted').length})` },
                  { id: 'closed', label: `مكتملة (${db.leads.filter(l => l.status === 'closed').length})` },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setLeadStatusFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      leadStatusFilter === f.id
                        ? 'bg-[#11345C] text-white dark:bg-[#208EC1] shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {db.leads.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700">
                <Users className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-60" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  لا توجد طلبات مسجلة حتى الآن.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  أي طلب تسعير أو استشارة يُرسله العميل من الموقع يظهر هنا فوراً بلحظتها.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {db.leads
                  .filter((lead) => {
                    if (leadStatusFilter === 'all') return true;
                    if (leadStatusFilter === 'new') return lead.status === 'new' || !lead.status;
                    return lead.status === leadStatusFilter;
                  })
                  .map((lead) => {
                    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                    const waGreeting = encodeURIComponent(
                      `السلام عليكم أستاذ ${lead.name}، معك إدارة شركة همم غيم للدعاية والإعلان والمقاولات بخصوص طلبكم لخدمة (${lead.service}) في مدينة ${lead.city || 'الرياض'}. نسعد بخدمتك!`
                    );
                    const isNew = lead.status === 'new' || !lead.status;
                    const isContacted = lead.status === 'contacted';

                    return (
                      <div
                        key={lead.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#208EC1]/60"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                              {lead.name}
                            </p>
                            <span dir="ltr" className="font-bold text-xs text-[#208EC1] bg-[#208EC1]/10 px-2.5 py-0.5 rounded-full">
                              {lead.phone}
                            </span>
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                isNew
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : isContacted
                                  ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {isNew ? 'طلب جديد' : isContacted ? 'تم التواصل' : 'مكتمل'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            المدينة: <strong className="text-slate-700 dark:text-slate-200">{lead.city}</strong> | الخدمة: <strong className="text-slate-700 dark:text-slate-200">{lead.service}</strong> | المصدر: {lead.source}
                            {lead.createdAt && (
                              <span className="text-[10px] opacity-75 mr-2">({lead.createdAt})</span>
                            )}
                          </p>

                          {lead.details && (
                            <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 mt-1">
                              {lead.details}
                            </p>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          {/* Toggle Status */}
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleLeadStatus(
                                lead.id,
                                isNew ? 'contacted' : isContacted ? 'closed' : 'new'
                              )
                            }
                            className="px-3 py-2 rounded-xl bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-colors"
                            title="تغيير حالة الطلب"
                          >
                            {isNew ? 'تحديد كـ "تم التواصل"' : isContacted ? 'تحديد كـ "مكتمل"' : 'إعادة تعيين كـ "جديد"'}
                          </button>

                          {/* WhatsApp Direct */}
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${waGreeting}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>واتساب</span>
                          </a>

                          {/* Delete Lead with Security Confirmation */}
                          <button
                            type="button"
                            onClick={() => handleDeleteLead(lead.id, lead.name)}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="حذف هذا الطلب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* Mobile Bottom Dock Bar (تطبيق جوال احترافي ثابت أسفل الشاشة) */}
        

        {/* Interactive Folder Drawer (فولدر أقسام المنصة للجوال) */}
        
              </div>
      </div>

      <nav
          dir="rtl"
          aria-label="شريط التنقل السفلي للوحة التحكم"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99999, transform: "none" }}
        className="md:hidden w-full bg-white/95 dark:bg-[#071325]/95 backdrop-blur-2xl border-t border-slate-200/90 dark:border-white/10 px-2 pt-1 pb-safe shadow-[0_-10px_35px_rgba(0,0,0,0.25)]"
        >
          <div className="grid grid-cols-5 items-center gap-1 max-w-md mx-auto">
            {/* 1. الإعدادات */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("settings");
                setIsFolderOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all ${
                activeTab === "settings" && !isFolderOpen
                  ? "text-[#208EC1] scale-105 font-black"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-bold"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${activeTab === "settings" && !isFolderOpen ? "bg-[#208EC1]/15 text-[#208EC1]" : ""}`}>
                <Settings className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">الإعدادات</span>
            </button>

            {/* 2. المشاريع */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("portfolio");
                setIsFolderOpen(false);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all ${
                activeTab === "portfolio" && !isFolderOpen
                  ? "text-[#208EC1] scale-105 font-black"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-bold"
              }`}
            >
              <div className={`p-1.5 rounded-xl relative transition-colors ${activeTab === "portfolio" && !isFolderOpen ? "bg-[#208EC1]/15 text-[#208EC1]" : ""}`}>
                <FolderKanban className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#208EC1] text-white text-[8px] font-black">
                  {db.portfolio.length}
                </span>
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">المشاريع</span>
            </button>

            {/* 3. معاينة السوشيال */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("social-og");
                setIsFolderOpen(false);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all ${
                activeTab === "social-og" && !isFolderOpen
                  ? "text-[#208EC1] scale-105 font-black"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-bold"
              }`}
            >
              <div className={`p-1.5 rounded-xl relative transition-colors ${activeTab === "social-og" && !isFolderOpen ? "bg-[#208EC1]/15 text-[#208EC1]" : ""}`}>
                <Share2 className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-emerald-500 text-white text-[7.5px] font-black">
                  OG
                </span>
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">السوشيال</span>
            </button>

            {/* 4. طلبات التسعير */}
            <button
              type="button"
              onClick={() => {
                setActiveTab("leads");
                setIsFolderOpen(false);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all ${
                activeTab === "leads" && !isFolderOpen
                  ? "text-[#208EC1] scale-105 font-black"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-bold"
              }`}
            >
              <div className={`p-1.5 rounded-xl relative transition-colors ${activeTab === "leads" && !isFolderOpen ? "bg-[#208EC1]/15 text-[#208EC1]" : ""}`}>
                <Users className="w-5 h-5" />
                {db.leads.length > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-white text-[8px] font-black">
                    {db.leads.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">الطلبات</span>
            </button>

            {/* 5. زر الفولدر الرئيسي (Bottom Sheet Folder) */}
            <button
              type="button"
              onClick={() => setIsFolderOpen(!isFolderOpen)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all ${
                isFolderOpen || ["services", "partners", "ai", "reviews"].includes(activeTab)
                  ? "text-[#208EC1] scale-105 font-black"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-bold"
              }`}
            >
              <div className={`p-1.5 rounded-xl relative transition-all ${
                isFolderOpen || ["services", "partners", "ai", "reviews"].includes(activeTab)
                  ? "bg-gradient-to-tr from-[#11345C] to-[#208EC1] text-white shadow-md ring-2 ring-[#208EC1]/40"
                  : "bg-slate-100 dark:bg-slate-800"
              }`}>
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 flex items-center gap-0.5">
                <span>الفولدر</span>
                <ChevronUp className={`w-2.5 h-2.5 transition-transform duration-300 ${isFolderOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
          </div>
        </nav>

      {isFolderOpen && (
          <div
            dir="rtl"
            style={{ position: "fixed", inset: 0, zIndex: 100000 }}
          className="md:hidden flex flex-col justify-end bg-black/60 backdrop-blur-md animate-fadeIn"
            onClick={() => setIsFolderOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#0c1d34] rounded-t-[32px] p-5 pb-8 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] border-t border-slate-200/90 dark:border-white/15 max-h-[85vh] overflow-y-auto animate-slideUp"
            >
              {/* Drawer Drag Pill */}
              <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-4" />

              {/* Drawer Header */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100 dark:border-white/10">
                <div>
                  <span className="text-[11px] font-black text-[#208EC1] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    فولدر التطبيق الذكي
                  </span>
                  <h3 className="text-base font-extrabold text-[#0f2544] dark:text-white">
                    كافة أقسام وأدوات لوحة التحكم
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFolderOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid of Section Tiles */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {[
                  {
                    id: "services",
                    label: "الخدمات الرئيسية",
                    count: `${db.services.length} خدمات`,
                    desc: "الأسعار والتفاصيل والصور",
                    icon: Briefcase,
                    color: "from-blue-600 to-sky-500",
                  },
                  {
                    id: "partners",
                    label: "شركاء النجاح",
                    count: `${(db.partners || []).length} شريك`,
                    desc: "الشعارات والقطاعات",
                    icon: Handshake,
                    color: "from-emerald-600 to-teal-500",
                  },
                  {
                    id: "ai",
                    label: "المهندس الذكي",
                    count: `${(db.knowledgeBase.rules || []).length} قاعدة`,
                    desc: "تدريب الردود والأسئلة",
                    icon: Bot,
                    color: "from-purple-600 to-indigo-500",
                  },
                  {
                    id: "reviews",
                    label: "آراء العملاء",
                    count: `${db.reviews.length} تقييم`,
                    desc: "الردود والتقييمات الرسمية",
                    icon: MessageSquare,
                    color: "from-amber-600 to-orange-500",
                  },
                  {
                    id: "social-og",
                    label: "معاينات السوشيال",
                    count: "ديناميكي",
                    desc: "روابط واتساب وإكس وفيسبوك",
                    icon: Share2,
                    color: "from-pink-600 to-rose-500",
                  },
                  {
                    id: "portfolio",
                    label: "معرض الأعمال",
                    count: `${db.portfolio.length} عمل`,
                    desc: "المشاريع والشارات والمدن",
                    icon: FolderKanban,
                    color: "from-cyan-600 to-blue-500",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id as AdminTab);
                        setIsFolderOpen(false);
                      }}
                      className={`p-3 rounded-2xl flex flex-col justify-between text-start transition-all border ${
                        isActive
                          ? "bg-[#208EC1]/10 border-[#208EC1] shadow-md ring-2 ring-[#208EC1]/30"
                          : "bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-white/10 hover:border-[#208EC1]/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300">
                          {item.count}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#0f2544] dark:text-white leading-tight">
                          {item.label}
                        </p>
                        <p className="text-[9.5px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions Footer inside Drawer */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#208EC1] hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#208EC1]" />
                  <span>معاينة الموقع كزائر</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsUnlocked(false);
                    setIsFolderOpen(false);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>قفل وخروج</span>
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
