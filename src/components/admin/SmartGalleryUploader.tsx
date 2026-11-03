"use client";

import React, { useRef, useState } from "react";
import {
  Upload,
  Sparkles,
  CheckCircle2,
  X,
  Film,
  Image as ImageIcon,
  Star,
  Plus,
} from "lucide-react";

export interface GalleryMediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
}

interface SmartGalleryUploaderProps {
  label?: string;
  items: GalleryMediaItem[];
  onChange: (items: GalleryMediaItem[]) => void;
  folder?: "portfolio" | "services" | "partners" | "blog";
  fallbackName?: string;
}

export default function SmartGalleryUploader({
  label = "صور وفيديوهات العمل (يمكنك اختيار أكثر من صورة وفيديو لتقلب تلقائياً كمعرض)",
  items = [],
  onChange,
  folder = "portfolio",
  fallbackName = "project",
}: SmartGalleryUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function compressImageToWebP(
    file: File
  ): Promise<{ dataUrl: string; finalKB: number }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("تعذر قراءة ملف الصورة"));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error("ملف الصورة غير صالح"));
        img.onload = () => {
          const maxWidth = 1600;
          const maxHeight = 1600;
          let targetW = img.naturalWidth || img.width;
          let targetH = img.naturalHeight || img.height;

          if (targetW > maxWidth || targetH > maxHeight) {
            const ratio = Math.min(maxWidth / targetW, maxHeight / targetH);
            targetW = Math.round(targetW * ratio);
            targetH = Math.round(targetH * ratio);
          }

          const canvas = document.createElement("canvas");
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("تعذر تهيئة معالج الصور"));
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, targetW, targetH);

          let dataUrl = canvas.toDataURL("image/webp", 0.84);
          if (!dataUrl.startsWith("data:image/webp")) {
            dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          }

          const base64Length = dataUrl.split(",")[1]?.length || 0;
          const finalBytes = Math.round((base64Length * 3) / 4);
          resolve({
            dataUrl,
            finalKB: Math.max(1, Math.round(finalBytes / 1024)),
          });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  async function extractVideoPosterDataUrl(file: File): Promise<string | null> {
    return new Promise((resolve) => {
      try {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;
        const objectUrl = URL.createObjectURL(file);
        video.src = objectUrl;

        const cleanup = () => {
          URL.revokeObjectURL(objectUrl);
        };

        const timeout = setTimeout(() => {
          cleanup();
          resolve(null);
        }, 5000);

        video.onloadeddata = () => {
          video.currentTime = Math.min(1, (video.duration || 2) * 0.25);
        };

        video.onseeked = () => {
          clearTimeout(timeout);
          try {
            const canvas = document.createElement("canvas");
            canvas.width = Math.min(800, video.videoWidth || 640);
            canvas.height = Math.min(
              600,
              Math.round(
                canvas.width *
                  ((video.videoHeight || 360) / (video.videoWidth || 640))
              )
            );
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL("image/webp", 0.8);
              cleanup();
              resolve(dataUrl);
              return;
            }
          } catch {}
          cleanup();
          resolve(null);
        };

        video.onerror = () => {
          clearTimeout(timeout);
          cleanup();
          resolve(null);
        };
      } catch {
        resolve(null);
      }
    });
  }

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    setErrorMsg(null);
    setIsProcessing(true);

    const newUploadedItems: GalleryMediaItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo =
          file.type.startsWith("video/") ||
          /\.(mp4|webm|mov|m4v)$/i.test(file.name);

        setProgressText(
          `جاري معالجة ورفع ${isVideo ? "الفيديو" : "الصورة"} (${i + 1} من ${
            files.length
          })...`
        );

        if (isVideo) {
          // 1. Upload video via FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);
          formData.append(
            "name",
            fallbackName || file.name.replace(/\.[^/.]+$/, "")
          );

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (!res.ok || !data.url) {
            throw new Error(data.error || "تعذر رفع الفيديو");
          }

          // 2. Try extracting & uploading a poster frame for the video
          let posterUrl: string | undefined = undefined;
          const posterDataUrl = await extractVideoPosterDataUrl(file);
          if (posterDataUrl) {
            try {
              const pRes = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  image: posterDataUrl,
                  folder,
                  name: `${fallbackName || "video"}-poster`,
                }),
              });
              const pData = await pRes.json();
              if (pRes.ok && pData.url) {
                posterUrl = pData.url;
              }
            } catch {}
          }

          newUploadedItems.push({
            type: "video",
            src: data.url,
            poster: posterUrl,
          });
        } else {
          // Compress image to WebP and upload
          const compressed = await compressImageToWebP(file);
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image: compressed.dataUrl,
              folder,
              name: fallbackName || file.name.replace(/\.[^/.]+$/, ""),
            }),
          });
          const data = await res.json();
          if (!res.ok || !data.url) {
            throw new Error(data.error || "تعذر رفع الصورة");
          }
          newUploadedItems.push({
            type: "image",
            src: data.url,
          });
        }
      }

      const updated = [...items, ...newUploadedItems];
      onChange(updated);
    } catch (err: any) {
      setErrorMsg(err?.message || "حدث خطأ أثناء معالجة الوسائط");
    } finally {
      setIsProcessing(false);
      setProgressText("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleRemoveAt(index: number) {
    const next = items.filter((_, i) => i !== index);
    onChange(next);
  }

  function handleMakePrimary(index: number) {
    if (index <= 0 || index >= items.length) return;
    const picked = items[index];
    const rest = items.filter((_, i) => i !== index);
    onChange([picked, ...rest]);
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
          {label}
        </label>
        {items.length > 1 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
            <Sparkles className="w-3 h-3" />
            معرض متحرك تلقائياً ({items.length} وسائط)
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/mp4,video/webm,video/quicktime"
        onChange={handleFilesChange}
        className="hidden"
      />

      {items.length === 0 ? (
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-6 px-4 rounded-2xl border-2 border-dashed border-[#208EC1]/40 hover:border-[#208EC1] bg-gradient-to-b from-[#208EC1]/5 to-transparent hover:from-[#208EC1]/10 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#208EC1]/15 text-[#208EC1] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white">
              {isProcessing
                ? progressText || "جاري رفع وضغط الصور والفيديوهات..."
                : "اضغط لاختيار صورة أو عدة صور وفيديو من الاستوديو"}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              يمكنك تحديد أكثر من صورة وفيديو معاً • سيتم تقليبها تلقائياً كمعرض متحرك في الموقع
            </p>
          </div>
        </button>
      ) : (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {items.map((media, idx) => (
              <div
                key={`${media.src}-${idx}`}
                className={`relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 border-2 transition-all ${
                  idx === 0
                    ? "border-[#208EC1] shadow-md"
                    : "border-slate-200/80 dark:border-slate-700"
                }`}
              >
                {media.type === "video" ? (
                  media.poster ? (
                    <img
                      src={media.poster}
                      alt="معاينة فيديو"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={media.src}
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <img
                    src={media.src}
                    alt={`وسائط ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

                <span className="absolute top-1.5 start-1.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-1">
                  {media.type === "video" ? (
                    <>
                      <Film className="w-3 h-3 text-sky-400" />
                      فيديو
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 text-emerald-400" />
                      صورة {idx + 1}
                    </>
                  )}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveAt(idx)}
                  className="absolute top-1.5 end-1.5 w-6 h-6 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white flex items-center justify-center shadow-sm transition-all"
                  title="حذف"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-1.5 inset-x-1.5 flex items-center justify-between gap-1">
                  {idx === 0 ? (
                    <span className="px-2 py-0.5 rounded-md bg-[#208EC1] text-white text-[10px] font-extrabold flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      العرض الرئيسي
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMakePrimary(idx)}
                      className="px-2 py-0.5 rounded-md bg-white/90 hover:bg-[#208EC1] text-slate-900 hover:text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <Star className="w-2.5 h-2.5" />
                      جعلها الرئيسية
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Button to add more images/videos */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl border-2 border-dashed border-[#208EC1]/40 hover:border-[#208EC1] aspect-[4/3] flex flex-col items-center justify-center gap-1.5 text-[#208EC1] bg-[#208EC1]/5 hover:bg-[#208EC1]/10 transition-all p-2 text-center"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[11px] font-extrabold leading-tight">
                {isProcessing
                  ? "جاري الرفع..."
                  : "إضافة المزيد من الصور أو الفيديو"}
              </span>
            </button>
          </div>

          {isProcessing && progressText && (
            <p className="text-xs font-bold text-[#208EC1] animate-pulse">
              {progressText}
            </p>
          )}
        </div>
      )}

      {errorMsg && (
        <p className="text-xs font-bold text-rose-500">{errorMsg}</p>
      )}
    </div>
  );
}
