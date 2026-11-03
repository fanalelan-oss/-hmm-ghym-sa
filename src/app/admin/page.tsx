"use client";

import React, { useState, useEffect } from "react";
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
import SmartImageUploader from "@/components/admin/SmartImageUploader";
import SmartGalleryUploader, { GalleryMediaItem } from "@/components/admin/SmartGalleryUploader";

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
    db.settings.stats?.projectsCount || "+155"
  );
  const [statsServicesCount, setStatsServicesCount] = useState(
    db.settings.stats?.servicesCount || "11"
  );
  const [statsPartnersCount, setStatsPartnersCount] = useState(
    db.settings.stats?.partnersCount || "+45"
  );
  const [statsWarrantyYears, setStatsWarrantyYears] = useState(
    db.settings.stats?.warrantyYears || "+10"
  );

  // Sync settings form fields whenever db.settings updates (e.g. after initial fetch or save)
  useEffect(() => {
    setPhone(db.settings.phone || "");
    setWhatsappNumber(db.settings.whatsappNumber || "");
    setEmail(db.settings.email || "");
    setAddressAr(db.settings.address?.ar || "");
    if (db.settings.aiConfig?.geminiApiKey) {
      setGeminiApiKey(db.settings.aiConfig.geminiApiKey);
    }
    setStatsProjectsCount(db.settings.stats?.projectsCount || "+155");
    setStatsServicesCount(db.settings.stats?.servicesCount || "11");
    setStatsPartnersCount(db.settings.stats?.partnersCount || "+45");
    setStatsWarrantyYears(db.settings.stats?.warrantyYears || "+10");
  }, [db.settings, db.updatedAt]);

  const [newPartnerNameAr, setNewPartnerNameAr] = useState("");
  const [newPartnerNameEn, setNewPartnerNameEn] = useState("");
  const [newPartnerSector, setNewPartnerSector] = useState<
    "government" | "commercial" | "healthcare"
  >("government");
  const [newPartnerLogo, setNewPartnerLogo] = useState(
    "/assets/images/partners/partner-sustainable-agriculture-center-himam-ghaim-saudi-client.webp"
  );

  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projSearchQuery, setProjSearchQuery] = useState("");
  const [isAiAnalyzingProj, setIsAiAnalyzingProj] = useState(false);
  const [aiAnalyzeStatus, setAiAnalyzeStatus] = useState<string | null>(null);
  const [showMultilingualProj, setShowMultilingualProj] = useState(false);

  const [newProjTitleAr, setNewProjTitleAr] = useState("");
  const [newProjTitleEn, setNewProjTitleEn] = useState("");
  const [newProjTitleUr, setNewProjTitleUr] = useState("");

  const [newProjCityAr, setNewProjCityAr] = useState("الرياض");
  const [newProjCityEn, setNewProjCityEn] = useState("Riyadh");
  const [newProjCityUr, setNewProjCityUr] = useState("ریاض");

  const [newProjCat, setNewProjCat] = useState<string>("signage");
  const [newProjImage, setNewProjImage] = useState("");
  const [newProjGallery, setNewProjGallery] = useState<GalleryMediaItem[]>([]);

  const [newProjDurationAr, setNewProjDurationAr] = useState("");
  const [newProjDurationEn, setNewProjDurationEn] = useState("");
  const [newProjDurationUr, setNewProjDurationUr] = useState("");

  const [newProjWarrantyAr, setNewProjWarrantyAr] = useState("");
  const [newProjWarrantyEn, setNewProjWarrantyEn] = useState("");
  const [newProjWarrantyUr, setNewProjWarrantyUr] = useState("");

  const [newProjSummaryAr, setNewProjSummaryAr] = useState("");
  const [newProjSummaryEn, setNewProjSummaryEn] = useState("");
  const [newProjSummaryUr, setNewProjSummaryUr] = useState("");

  const [newProjDescAr, setNewProjDescAr] = useState("");
  const [newProjDescEn, setNewProjDescEn] = useState("");
  const [newProjDescUr, setNewProjDescUr] = useState("");

  const [newProjSpecsAr, setNewProjSpecsAr] = useState("");
  const [newProjSpecsEn, setNewProjSpecsEn] = useState("");
  const [newProjSpecsUr, setNewProjSpecsUr] = useState("");

  const [newProjTags, setNewProjTags] = useState(
    "لوحات_حروف_بارزة, دعاية_وإعلان_الرياض, شركة_همم_غيم"
  );

  const [editingSrvId, setEditingSrvId] = useState<string | null>(null);
  const [isAiAnalyzingSrv, setIsAiAnalyzingSrv] = useState(false);
  const [newSrvTitleAr, setNewSrvTitleAr] = useState("");
  const [newSrvShortAr, setNewSrvShortAr] = useState("");
  const [newSrvFeaturesAr, setNewSrvFeaturesAr] = useState("");
  const [newSrvGallery, setNewSrvGallery] = useState<GalleryMediaItem[]>([]);
  const [newSrvPriceAr, setNewSrvPriceAr] = useState(
    "تبدأ من 350 ريال للمتر المربع"
  );

  const [newAiTopic, setNewAiTopic] = useState("");
  const [newAiKeywords, setNewAiKeywords] = useState("");
  const [newAiAnswer, setNewAiAnswer] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [qaDrafts, setQaDrafts] = useState<Record<string, string>>({});
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');

  function checkAndAutoUnlock(val: string) {
    const clean = val.trim();
    if (clean === "2396@" || clean === "@2396") {
      setIsUnlocked(true);
      setPhone(db.settings.phone);
      setWhatsappNumber(db.settings.whatsappNumber);
      setEmail(db.settings.email);
      setAddressAr(db.settings.address.ar);
      setStatsProjectsCount(db.settings.stats?.projectsCount || "100+");
      setStatsServicesCount(db.settings.stats?.servicesCount || "8");
      setStatsPartnersCount(db.settings.stats?.partnersCount || "45+");
      setStatsWarrantyYears(db.settings.stats?.warrantyYears || "10");
    }
  }

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

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    await executeSaveSettings();
  }

  async function handleDeleteLead(leadId: string) {
    const nextLeads = db.leads.filter((l) => l.id !== leadId);
    await updateDb({ ...db, leads: nextLeads });
    showSavedNotification();
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

  function resetProjectForm() {
    setEditingProjId(null);
    setNewProjTitleAr("");
    setNewProjTitleEn("");
    setNewProjTitleUr("");
    setNewProjCityAr("الرياض");
    setNewProjCityEn("Riyadh");
    setNewProjCityUr("ریاض");
    setNewProjCat("signage");
    setNewProjImage("");
    setNewProjGallery([]);
    setNewProjDurationAr("");
    setNewProjDurationEn("");
    setNewProjDurationUr("");
    setNewProjWarrantyAr("");
    setNewProjWarrantyEn("");
    setNewProjWarrantyUr("");
    setNewProjSummaryAr("");
    setNewProjSummaryEn("");
    setNewProjSummaryUr("");
    setNewProjDescAr("");
    setNewProjDescEn("");
    setNewProjDescUr("");
    setNewProjSpecsAr("");
    setNewProjSpecsEn("");
    setNewProjSpecsUr("");
    setNewProjTags("لوحات_حروف_بارزة, دعاية_وإعلان_الرياض, شركة_همم_غيم");
    setAiAnalyzeStatus(null);
  }

  function handleEditProject(item: any) {
    setEditingProjId(item.id);
    setNewProjTitleAr(item.title?.ar || "");
    setNewProjTitleEn(item.title?.en || "");
    setNewProjTitleUr(item.title?.ur || "");
    setNewProjCityAr(item.city?.ar || "");
    setNewProjCityEn(item.city?.en || "");
    setNewProjCityUr(item.city?.ur || "");
    setNewProjCat(item.category || "signage");
    setNewProjImage(item.src || "");
    const existingGallery: GalleryMediaItem[] =
      Array.isArray(item.gallery) && item.gallery.length > 0
        ? item.gallery
        : item.src
        ? [{ type: item.type === "video" ? "video" : "image", src: item.src, poster: item.poster }]
        : [];
    setNewProjGallery(existingGallery);
    setNewProjDurationAr(item.duration?.ar || "");
    setNewProjDurationEn(item.duration?.en || "");
    setNewProjDurationUr(item.duration?.ur || "");
    setNewProjWarrantyAr(item.warranty?.ar || "");
    setNewProjWarrantyEn(item.warranty?.en || "");
    setNewProjWarrantyUr(item.warranty?.ur || "");
    setNewProjSummaryAr(item.summary?.ar || "");
    setNewProjSummaryEn(item.summary?.en || "");
    setNewProjSummaryUr(item.summary?.ur || "");
    setNewProjDescAr(item.description?.ar || "");
    setNewProjDescEn(item.description?.en || "");
    setNewProjDescUr(item.description?.ur || "");
    setNewProjSpecsAr((item.specs?.ar || []).join("\n"));
    setNewProjSpecsEn((item.specs?.en || []).join("\n"));
    setNewProjSpecsUr((item.specs?.ur || []).join("\n"));
    setNewProjTags((item.hashtags || []).join(", "));
    setAiAnalyzeStatus(null);
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  async function handleAiAutofillProject(overrideGallery?: GalleryMediaItem[]) {
    const galleryList = overrideGallery !== undefined ? overrideGallery : newProjGallery;
    const imageUrls = galleryList
      .map((g) => (g.type === "video" ? g.poster || "" : g.src))
      .filter(Boolean);
    const primaryImg = imageUrls[0] || newProjImage;

    if (!newProjTitleAr.trim() && !primaryImg.trim()) {
      alert("يرجى إدخال عنوان العمل أو اختيار صورة المشروع أولاً ليقوم الذكاء الاصطناعي بتحليلها وتعبئة البيانات.");
      return;
    }

    setIsAiAnalyzingProj(true);
    setAiAnalyzeStatus(
      newProjTitleAr.trim()
        ? `جاري تحليل العنوان ("${newProjTitleAr.trim()}") وفحص الصور بالذكاء الاصطناعي...`
        : "جاري فحص الصور وتحليل تفاصيل المشروع بالذكاء الاصطناعي..."
    );

    try {
      const res = await fetch("/api/ai-project-autofill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProjTitleAr,
          image: primaryImg,
          images: imageUrls,
          city: newProjCityAr,
          category: newProjCat,
        }),
      });
      const json = await res.json();
      if (!res.ok || (!json.ok && !json.success) || !json.data) {
        throw new Error(json.error || "تعذر تحليل المشروع بالذكاء الاصطناعي");
      }

      const d = json.data;
      if (d.titleAr) setNewProjTitleAr(d.titleAr);
      if (d.titleEn) setNewProjTitleEn(d.titleEn);
      if (d.titleUr) setNewProjTitleUr(d.titleUr);

      if (d.category) setNewProjCat(d.category);

      if (d.cityAr) setNewProjCityAr(d.cityAr);
      if (d.cityEn) setNewProjCityEn(d.cityEn);
      if (d.cityUr) setNewProjCityUr(d.cityUr);

      if (d.durationAr !== undefined) setNewProjDurationAr(d.durationAr);
      if (d.durationEn !== undefined) setNewProjDurationEn(d.durationEn);
      if (d.durationUr !== undefined) setNewProjDurationUr(d.durationUr);

      if (d.warrantyAr !== undefined) setNewProjWarrantyAr(d.warrantyAr);
      if (d.warrantyEn !== undefined) setNewProjWarrantyEn(d.warrantyEn);
      if (d.warrantyUr !== undefined) setNewProjWarrantyUr(d.warrantyUr);

      if (d.summaryAr) setNewProjSummaryAr(d.summaryAr);
      if (d.summaryEn) setNewProjSummaryEn(d.summaryEn);
      if (d.summaryUr) setNewProjSummaryUr(d.summaryUr);

      if (d.descriptionAr) setNewProjDescAr(d.descriptionAr);
      if (d.descriptionEn) setNewProjDescEn(d.descriptionEn);
      if (d.descriptionUr) setNewProjDescUr(d.descriptionUr);

      if (Array.isArray(d.specsAr)) setNewProjSpecsAr(d.specsAr.join("\n"));
      if (Array.isArray(d.specsEn)) setNewProjSpecsEn(d.specsEn.join("\n"));
      if (Array.isArray(d.specsUr)) setNewProjSpecsUr(d.specsUr.join("\n"));

      if (Array.isArray(d.hashtags) && d.hashtags.length > 0) {
        setNewProjTags(d.hashtags.join(", "));
      }

      setAiAnalyzeStatus("✨ تم تحليل العنوان والصور وتعبئة كافة المواصفات والضمان والتفاصيل بدقة! يمكنك مراجعتها وتعديل أي حقل قبل الحفظ.");
    } catch (err: any) {
      setAiAnalyzeStatus(`⚠️ ${err?.message || "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي"}`);
    } finally {
      setIsAiAnalyzingProj(false);
    }
  }

  async function handleAddPortfolioProject(e: React.FormEvent) {
    e.preventDefault();
    if (!newProjTitleAr.trim()) {
      alert("يرجى إدخال اسم المشروع أولاً");
      return;
    }
    const finalGallery: GalleryMediaItem[] =
      newProjGallery.length > 0
        ? newProjGallery
        : newProjImage.trim()
        ? [{ type: "image", src: newProjImage.trim() }]
        : [];

    if (finalGallery.length === 0) {
      alert("يرجى اختيار صورة أو فيديو للمشروع من الاستوديو أولاً");
      return;
    }

    const primaryMedia = finalGallery[0];

    const specsArList = newProjSpecsAr
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const specsEnList = newProjSpecsEn
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const specsUrList = newProjSpecsUr
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const existingItem = editingProjId
      ? db.portfolio.find((p) => p.id === editingProjId)
      : null;

    const itemId = existingItem ? existingItem.id : `proj-custom-${Date.now()}`;
    const itemSlug = existingItem ? existingItem.slug : itemId;

    const summaryArFinal =
      newProjSummaryAr.trim() ||
      newProjDescAr.trim() ||
      newProjTitleAr.trim();
    const descArFinal =
      newProjDescAr.trim() ||
      newProjSummaryAr.trim() ||
      newProjTitleAr.trim();

    const updatedItem = {
      ...(existingItem || {}),
      id: itemId,
      slug: itemSlug,
      category: newProjCat,
      type: primaryMedia.type,
      src: primaryMedia.src,
      poster: primaryMedia.poster,
      gallery: finalGallery,
      title: {
        ar: newProjTitleAr.trim(),
        en: newProjTitleEn.trim() || newProjTitleAr.trim(),
        ur: newProjTitleUr.trim() || newProjTitleAr.trim(),
      },
      summary: {
        ar: summaryArFinal,
        en: newProjSummaryEn.trim() || summaryArFinal,
        ur: newProjSummaryUr.trim() || summaryArFinal,
      },
      description: {
        ar: descArFinal,
        en: newProjDescEn.trim() || descArFinal,
        ur: newProjDescUr.trim() || descArFinal,
      },
      alt: {
        ar: `${newProjTitleAr.trim()} - تنفيذ شركة همم غيم`,
        en: newProjTitleEn.trim() || newProjTitleAr.trim(),
        ur: newProjTitleUr.trim() || newProjTitleAr.trim(),
      },
      city: {
        ar: newProjCityAr.trim(),
        en: newProjCityEn.trim() || newProjCityAr.trim(),
        ur: newProjCityUr.trim() || newProjCityAr.trim(),
      },
      duration: {
        ar: newProjDurationAr.trim(),
        en: newProjDurationEn.trim() || newProjDurationAr.trim(),
        ur: newProjDurationUr.trim() || newProjDurationAr.trim(),
      },
      warranty: {
        ar: newProjWarrantyAr.trim(),
        en: newProjWarrantyEn.trim() || newProjWarrantyAr.trim(),
        ur: newProjWarrantyUr.trim() || newProjWarrantyAr.trim(),
      },
      specs: {
        ar: specsArList,
        en: specsEnList.length > 0 ? specsEnList : specsArList,
        ur: specsUrList.length > 0 ? specsUrList : specsArList,
      },
      hashtags: newProjTags
        .split(",")
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean),
      featured: true,
    };

    const nextPortfolio = existingItem
      ? db.portfolio.map((p) => (p.id === editingProjId ? updatedItem : p))
      : [updatedItem, ...db.portfolio];

    const nextDb = {
      ...db,
      portfolio: nextPortfolio,
    };
    await updateDb(nextDb);
    resetProjectForm();
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

  function resetServiceForm() {
    setEditingSrvId(null);
    setNewSrvTitleAr("");
    setNewSrvShortAr("");
    setNewSrvFeaturesAr("");
    setNewSrvGallery([]);
    setNewSrvPriceAr("تبدأ من 350 ريال للمتر المربع");
  }

  function handleEditService(srv: any) {
    setEditingSrvId(srv.id);
    setNewSrvTitleAr(srv.name?.ar || "");
    setNewSrvShortAr(srv.description?.ar || srv.tagline?.ar || "");
    setNewSrvFeaturesAr((srv.features?.ar || []).join("\n"));
    setNewSrvPriceAr(srv.priceRange?.ar || "");
    const existingGallery: GalleryMediaItem[] =
      Array.isArray(srv.gallery) && srv.gallery.length > 0
        ? srv.gallery
        : srv.coverImage
        ? [{ type: "image", src: srv.coverImage }]
        : [];
    setNewSrvGallery(existingGallery);
    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  async function handleAiAutofillService() {
    const imgUrls = newSrvGallery
      .map((g) => (g.type === "video" ? g.poster || "" : g.src))
      .filter(Boolean);
    if (!newSrvTitleAr.trim() && imgUrls.length === 0) {
      alert("يرجى إدخال اسم الخدمة أو اختيار صورة للخدمة أولاً ليقوم الذكاء الاصطناعي بتحليلها.");
      return;
    }

    setIsAiAnalyzingSrv(true);
    try {
      const res = await fetch("/api/ai-project-autofill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newSrvTitleAr,
          image: imgUrls[0] || "",
          images: imgUrls,
        }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        const d = json.data;
        if (d.titleAr && !newSrvTitleAr.trim()) setNewSrvTitleAr(d.titleAr);
        if (d.descriptionAr) setNewSrvShortAr(d.descriptionAr);
        if (Array.isArray(d.specsAr) && d.specsAr.length > 0) {
          setNewSrvFeaturesAr(d.specsAr.join("\n"));
        }
      }
    } catch {}
    setIsAiAnalyzingSrv(false);
  }

  async function handleAddService(e: React.FormEvent) {
    e.preventDefault();
    if (!newSrvTitleAr.trim()) return;

    const existingSrv = editingSrvId
      ? db.services.find((s) => s.id === editingSrvId)
      : null;

    const slug = existingSrv ? existingSrv.slug : `service-${Date.now()}`;
    const id = existingSrv ? existingSrv.id : slug;

    const primaryCover =
      newSrvGallery[0]?.type === "video"
        ? newSrvGallery[0]?.poster || newSrvGallery[0]?.src
        : newSrvGallery[0]?.src ||
          existingSrv?.coverImage ||
          "/assets/images/portfolio/saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp";

    const featList = newSrvFeaturesAr
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const updatedSrv = {
      ...(existingSrv || {}),
      id,
      slug,
      icon: existingSrv?.icon || "Sparkles",
      illustration:
        existingSrv?.illustration ||
        "/assets/services/3d-signage-letters-manufacturing-riyadh.svg",
      coverImage: primaryCover,
      gallery: newSrvGallery.length > 0 ? newSrvGallery : existingSrv?.gallery,
      name: {
        ar: newSrvTitleAr.trim(),
        en: existingSrv?.name?.en || newSrvTitleAr.trim(),
        ur: existingSrv?.name?.ur || newSrvTitleAr.trim(),
      },
      shortName: {
        ar: existingSrv?.shortName?.ar || newSrvTitleAr.trim(),
        en: existingSrv?.shortName?.en || newSrvTitleAr.trim(),
        ur: existingSrv?.shortName?.ur || newSrvTitleAr.trim(),
      },
      tagline: {
        ar: newSrvShortAr.trim() || newSrvTitleAr.trim(),
        en: existingSrv?.tagline?.en || newSrvShortAr.trim() || newSrvTitleAr.trim(),
        ur: existingSrv?.tagline?.ur || newSrvShortAr.trim() || newSrvTitleAr.trim(),
      },
      description: {
        ar: newSrvShortAr.trim() || newSrvTitleAr.trim(),
        en: existingSrv?.description?.en || newSrvShortAr.trim() || newSrvTitleAr.trim(),
        ur: existingSrv?.description?.ur || newSrvShortAr.trim() || newSrvTitleAr.trim(),
      },
      features: {
        ar:
          featList.length > 0
            ? featList
            : existingSrv?.features?.ar || ["تنفيذ هندسي متكامل بضمان رسمي"],
        en:
          existingSrv?.features?.en ||
          (featList.length > 0
            ? featList
            : ["Full engineering execution with official warranty"]),
        ur:
          existingSrv?.features?.ur ||
          (featList.length > 0
            ? featList
            : ["سرکاری وارنٹی کے ساتھ مکمل عملدرآمد"]),
      },
      audience: existingSrv?.audience || {
        ar: ["الشركات والمؤسسات والمشاريع التجارية"],
        en: ["Commercial & Corporate Projects"],
        ur: ["تجارتی اور کارپوریٹ منصوبے"],
      },
      priceRange: {
        ar: newSrvPriceAr.trim(),
        en: existingSrv?.priceRange?.en || newSrvPriceAr.trim(),
        ur: existingSrv?.priceRange?.ur || newSrvPriceAr.trim(),
      },
      hashtags: existingSrv?.hashtags || ["شركة_همم_غيم", "دعاية_وإعلان", "مقاولات"],
      faqs: existingSrv?.faqs || [],
    };

    const nextServices = existingSrv
      ? db.services.map((s) => (s.id === editingSrvId ? updatedSrv : s))
      : [...db.services, updatedSrv];

    await updateDb({
      ...db,
      services: nextServices,
    });
    resetServiceForm();
    showSavedNotification();
  }

  async function handleDeleteService(id: string) {
    await updateDb({
      ...db,
      services: db.services.filter((s) => s.id !== id),
    });
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

    const nextReviews = (db.reviews || []).map((r) =>
      r.id === revId
        ? { ...r, reply: reply.trim(), approved: true }
        : r
    );
    await updateDb({ ...db, reviews: nextReviews });
    showSavedNotification();
  }

  async function handleDeleteReview(revId: string) {
    const nextReviews = (db.reviews || []).filter((r) => r.id !== revId);
    await updateDb({ ...db, reviews: nextReviews });
    showSavedNotification();
  }

  async function handleDeleteAiRule(ruleId: string) {
    const nextRules = (db.knowledgeBase.rules || []).filter((r) => r.id !== ruleId);
    await updateDb({
      ...db,
      knowledgeBase: {
        ...db.knowledgeBase,
        rules: nextRules,
      },
    });
    showSavedNotification();
  }

  async function handleDeleteLearnedQA(qaId: string) {
    const nextQA = (db.knowledgeBase.learnedQA || []).filter((q) => q.id !== qaId);
    await updateDb({
      ...db,
      knowledgeBase: {
        ...db.knowledgeBase,
        learnedQA: nextQA,
      },
    });
    showSavedNotification();
  }

  async function handleDeleteChatAlert(alertId: string) {
    const nextAlerts = (db.knowledgeBase.chatAlerts || []).filter((a: any) => a.id !== alertId);
    await updateDb({
      ...db,
      knowledgeBase: {
        ...db.knowledgeBase,
        chatAlerts: nextAlerts,
      },
    });
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
            <div className="lg:col-span-6">
              <div className="clean-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#208EC1]" />
                    {editingProjId ? "تعديل بيانات وتفاصيل المشروع" : "إضافة مشروع ذكي إلى سابقة الأعمال"}
                  </h2>
                  {editingProjId && (
                    <button
                      type="button"
                      onClick={resetProjectForm}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                      إلغاء التعديل + مشروع جديد
                    </button>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-l from-[#11345C]/10 via-[#208EC1]/10 to-transparent border border-[#208EC1]/25 mb-5">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
                    💡 <span className="text-[#208EC1]">المساعد الذكي لإدخال المشاريع:</span> فقط اكتب <strong>عنوان العمل</strong> وارفع <strong>صورة المشروع</strong> من الاستوديو، ثم اضغط زر التحليل الذكي ليقوم الذكاء الاصطناعي بقراءة الصورة وتعبئة الأوصاف والضمان ومدة التنفيذ والمواصفات الفنية والترجمات تلقائياً، ويمكنك تعديل أي تفصيل قبل الحفظ!
                  </p>
                </div>

                <form onSubmit={handleAddPortfolioProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                      1. عنوان العمل واسم العميل (سيعتمد عليه الذكاء الاصطناعي بدقة في كتابة الأوصاف) *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProjTitleAr}
                      onChange={(e) => setNewProjTitleAr(e.target.value)}
                      placeholder="مثال: عمل عامود أسعار لمحطة درب الوقود"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                    />
                  </div>

                  <SmartGalleryUploader
                    label="2. صور وفيديوهات المشروع (اختر صورة أو عدة صور وفيديو لتقلب تلقائياً كمعرض)"
                    items={newProjGallery}
                    onChange={(nextItems) => {
                      setNewProjGallery(nextItems);
                      setNewProjImage(nextItems[0]?.src || "");
                    }}
                    folder="portfolio"
                    fallbackName={newProjTitleAr || "project"}
                  />

                  <button
                    type="button"
                    disabled={isAiAnalyzingProj}
                    onClick={() => handleAiAutofillProject()}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#11345C] via-[#208EC1] to-[#11345C] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#208EC1]/20 transition-all disabled:opacity-60"
                  >
                    <Sparkles className={`w-4 h-4 ${isAiAnalyzingProj ? "animate-spin" : ""}`} />
                    {isAiAnalyzingProj
                      ? "جاري تحليل العنوان والصور وتوليد الأوصاف والضمان والمواصفات..."
                      : "✨ تحليل العنوان والصور وتعبئة كافة التفاصيل بالذكاء الاصطناعي"}
                  </button>

                  {aiAnalyzeStatus && (
                    <div
                      className={`p-3 rounded-xl text-xs font-bold leading-relaxed border ${
                        aiAnalyzeStatus.startsWith("⚠️")
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                      }`}
                    >
                      {aiAnalyzeStatus}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800">
                    <p className="text-xs font-bold text-[#208EC1] mb-3">
                      3. تفاصيل المشروع والضمان والمواصفات (تُعبأ بالذكاء الاصطناعي ويمكنك تعديلها بحرية):
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">
                          القسم الهندسي
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
                          المدينة (اتركها فارغة لإخفائها)
                        </label>
                        <input
                          type="text"
                          value={newProjCityAr}
                          onChange={(e) => setNewProjCityAr(e.target.value)}
                          placeholder="مثال: الرياض"
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">
                          مدة التنفيذ (اتركها فارغة إذا لا ترغب بعرضها)
                        </label>
                        <input
                          type="text"
                          value={newProjDurationAr}
                          onChange={(e) => setNewProjDurationAr(e.target.value)}
                          placeholder="مثال: 5 - 7 أيام عمل"
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">
                          الضمان المعتمد (اتركه فارغاً إذا بدون ضمان)
                        </label>
                        <input
                          type="text"
                          value={newProjWarrantyAr}
                          onChange={(e) => setNewProjWarrantyAr(e.target.value)}
                          placeholder="مثال: ضمان 5 سنوات على الإضاءة والخامات"
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-bold text-slate-500 mb-1">
                        وصف مختصر (يظهر في بطاقة المعرض)
                      </label>
                      <textarea
                        rows={2}
                        value={newProjSummaryAr}
                        onChange={(e) => setNewProjSummaryAr(e.target.value)}
                        placeholder="ملخص جذاب من سطر أو سطرين يوضح طبيعة المشروع..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-bold text-slate-500 mb-1">
                        التفاصيل الهندسية الكاملة للمشروع (تظهر داخل صفحة المشروع)
                      </label>
                      <textarea
                        rows={4}
                        value={newProjDescAr}
                        onChange={(e) => setNewProjDescAr(e.target.value)}
                        placeholder="شرح تفصيلي للخامات المستخدمة وطريقة التصنيع والتركيب والإضاءة..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-bold text-slate-500 mb-1">
                        المواصفات الفنية المنفذة في هذا المشروع (كل ميزة في سطر مستقل)
                      </label>
                      <textarea
                        rows={4}
                        value={newProjSpecsAr}
                        onChange={(e) => setNewProjSpecsAr(e.target.value)}
                        placeholder={`قص ليزر CNC عالي الدقة مع حواف مصقولة\nإضاءة ليد كورية عدسات مقاومة للحرارة والغبار IP68\nهيكل تثبيت هندسي مخفي مقاوم للرياح والعوامل الجوية\nتشطيب ألوان حراري مقاوم لأشعة الشمس`}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-bold text-slate-500 mb-1">
                        الهاشتاقات والكلمات المفتاحية (مفصولة بفاصلة)
                      </label>
                      <input
                        type="text"
                        value={newProjTags}
                        onChange={(e) => setNewProjTags(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    <div className="mb-2">
                      <button
                        type="button"
                        onClick={() => setShowMultilingualProj(!showMultilingualProj)}
                        className="text-xs font-bold text-[#208EC1] hover:underline flex items-center gap-1"
                      >
                        {showMultilingualProj
                          ? "إخفاء حقول الترجمة الإنجليزية والأردية ▲"
                          : "عرض/تعديل الترجمة الإنجليزية والأردية التلقائية (EN / UR) ▼"}
                      </button>

                      {showMultilingualProj && (
                        <div className="mt-3 p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                                Title (EN)
                              </label>
                              <input
                                type="text"
                                dir="ltr"
                                value={newProjTitleEn}
                                onChange={(e) => setNewProjTitleEn(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                                عنوان (UR)
                              </label>
                              <input
                                type="text"
                                value={newProjTitleUr}
                                onChange={(e) => setNewProjTitleUr(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                                Warranty (EN)
                              </label>
                              <input
                                type="text"
                                dir="ltr"
                                value={newProjWarrantyEn}
                                onChange={(e) => setNewProjWarrantyEn(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                                Duration (EN)
                              </label>
                              <input
                                type="text"
                                dir="ltr"
                                value={newProjDurationEn}
                                onChange={(e) => setNewProjDurationEn(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 mb-1">
                              Description (EN)
                            </label>
                            <textarea
                              rows={2}
                              dir="ltr"
                              value={newProjDescEn}
                              onChange={(e) => setNewProjDescEn(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#208EC1] hover:bg-[#11345C] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    {editingProjId
                      ? "حفظ التعديلات وتحديث المشروع فوراً"
                      : "اعتماد وحفظ المشروع في سابقة الأعمال"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="clean-card rounded-3xl p-6 max-h-[950px] flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    المشاريع الحالية ({db.portfolio.length} مشروع)
                  </h3>
                  <input
                    type="text"
                    value={projSearchQuery}
                    onChange={(e) => setProjSearchQuery(e.target.value)}
                    placeholder="ابحث في المشاريع بالاسم أو المدينة..."
                    className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs w-full sm:w-64"
                  />
                </div>

                <div className="overflow-y-auto space-y-3 pr-1 flex-1">
                  {db.portfolio
                    .filter((item) => {
                      if (!projSearchQuery.trim()) return true;
                      const q = projSearchQuery.trim().toLowerCase();
                      return (
                        (item.title?.ar || "").toLowerCase().includes(q) ||
                        (item.city?.ar || "").toLowerCase().includes(q) ||
                        (item.category || "").toLowerCase().includes(q)
                      );
                    })
                    .map((item) => {
                      const isEditingThis = editingProjId === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all ${
                            isEditingThis
                              ? "bg-[#208EC1]/10 border-[#208EC1]"
                              : "bg-slate-50 dark:bg-slate-800/60 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={
                                item.type === "video"
                                  ? item.poster || item.src
                                  : item.src
                              }
                              alt={item.title.ar}
                              className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-200 dark:bg-slate-700"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                                {item.title.ar}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                                {item.city?.ar && <span>📍 {item.city.ar}</span>}
                                {item.warranty?.ar && (
                                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                                    {item.warranty.ar}
                                  </span>
                                )}
                                {item.duration?.ar && (
                                  <span className="px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    ⏱ {item.duration.ar}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Link
                              href={`/portfolio/${item.slug}`}
                              target="_blank"
                              className="p-2 rounded-xl text-slate-500 hover:bg-slate-200/60 dark:hover:bg-slate-700"
                              title="معاينة صفحة المشروع"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleEditProject(item)}
                              className="px-3 py-1.5 rounded-xl bg-[#208EC1]/10 hover:bg-[#208EC1] text-[#208EC1] hover:text-white text-xs font-bold transition-all"
                            >
                              تعديل
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(item.id)}
                              className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10"
                              title="حذف المشروع"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <div className="clean-card rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#208EC1]" />
                    {editingSrvId ? "تعديل الخدمة ومعرض الصور/الفيديو" : "إضافة خدمة جديدة للموقع (مع معرض صور وفيديو متحرك)"}
                  </h2>
                  {editingSrvId && (
                    <button
                      type="button"
                      onClick={resetServiceForm}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                      إلغاء التعديل + خدمة جديدة
                    </button>
                  )}
                </div>

                <form onSubmit={handleAddService} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      1. اسم الخدمة *
                    </label>
                    <input
                      type="text"
                      required
                      value={newSrvTitleAr}
                      onChange={(e) => setNewSrvTitleAr(e.target.value)}
                      placeholder="مثال: الشاشات الرقمية وعواميد الأسعار لمحطات الوقود"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                    />
                  </div>

                  <SmartGalleryUploader
                    label="2. صور وفيديوهات الخدمة (يمكنك اختيار أكثر من صورة وفيديو لتقلب تلقائياً كمعرض)"
                    items={newSrvGallery}
                    onChange={setNewSrvGallery}
                    folder="services"
                    fallbackName={newSrvTitleAr || "service"}
                  />

                  <button
                    type="button"
                    disabled={isAiAnalyzingSrv}
                    onClick={handleAiAutofillService}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#11345C] via-[#208EC1] to-[#11345C] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-60"
                  >
                    <Sparkles className={`w-4 h-4 ${isAiAnalyzingSrv ? "animate-spin" : ""}`} />
                    {isAiAnalyzingSrv
                      ? "جاري تحليل عنوان الخدمة والصور بالذكاء الاصطناعي..."
                      : "✨ توليد وصف ومميزات الخدمة بالذكاء الاصطناعي من العنوان والصور"}
                  </button>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      الوصف التفصيلي للخدمة
                    </label>
                    <textarea
                      rows={3}
                      value={newSrvShortAr}
                      onChange={(e) => setNewSrvShortAr(e.target.value)}
                      placeholder="شرح للخدمة وما تقدمه الشركة للعملاء..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      مميزات ومواصفات الخدمة (كل ميزة في سطر مستقل)
                    </label>
                    <textarea
                      rows={3}
                      value={newSrvFeaturesAr}
                      onChange={(e) => setNewSrvFeaturesAr(e.target.value)}
                      placeholder={`تصنيع وتركيب بأعلى معايير الجودة\nضمان رسمي موثق على الخامات والإضاءة`}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#208EC1] hover:bg-[#11345C] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    {editingSrvId
                      ? "حفظ التعديلات وتحديث الخدمة"
                      : "إضافة الخدمة وتوليد صفحة مستقلة لها"}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              {db.services.map((srv) => {
                const mediaCount = Array.isArray(srv.gallery) ? srv.gallery.length : 1;
                return (
                  <div key={srv.id} className="clean-card rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={srv.coverImage}
                        alt={srv.name.ar}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-200 dark:bg-slate-700"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {srv.name.ar}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {srv.tagline.ar}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[11px] font-bold text-[#208EC1]">
                            {srv.priceRange.ar}
                          </span>
                          {mediaCount > 1 && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">
                              معرض متحرك ({mediaCount} وسائط)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditService(srv)}
                        className="px-3 py-1.5 rounded-xl bg-[#208EC1]/10 hover:bg-[#208EC1] text-[#208EC1] hover:text-white text-xs font-bold transition-all"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteService(srv.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10"
                        title="حذف الخدمة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
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

                  <SmartImageUploader
                    label="شعار الشريك (اختيار من الاستوديو أو رابط WebP/SVG)"
                    value={newPartnerLogo}
                    onChange={setNewPartnerLogo}
                    folder="partners"
                    fallbackName={newPartnerNameAr || 'partner'}
                  />

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
                  onClick={async () => {
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
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 font-mono">{alert.createdAt}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteChatAlert(alert.id)}
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/10"
                            title="حذف التنبيه"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 text-xs text-slate-700 dark:text-slate-200 leading-relaxed flex items-start justify-between gap-2"
                    >
                      <div>
                        <span className="font-bold text-[#208EC1]">
                          {rule.topic}:{" "}
                        </span>
                        {rule.answer}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteAiRule(rule.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 shrink-0"
                        title="حذف القاعدة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            &ldquo;{uq.question}&rdquo;
                          </p>
                          <button
                            type="button"
                            onClick={async () => {
                              const remaining = (db.knowledgeBase.unansweredQuestions || []).filter(
                                (u) => u.id !== uq.id
                              );
                              await updateDb({
                                ...db,
                                knowledgeBase: {
                                  ...db.knowledgeBase,
                                  unansweredQuestions: remaining,
                                },
                              });
                              showSavedNotification();
                            }}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 shrink-0"
                            title="حذف السؤال"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs flex items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <p className="font-bold text-slate-900 dark:text-white">
                            س: {qa.question}
                          </p>
                          <p className="text-slate-600 dark:text-slate-300">
                            ج: {qa.answer}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteLearnedQA(qa.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 shrink-0"
                          title="حذف السؤال"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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

                          {/* Delete Lead Instantly */}
                          <button
                            type="button"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="حذف هذا الطلب فوراً"
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
