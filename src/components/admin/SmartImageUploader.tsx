'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, CheckCircle2, RefreshCw, X, Link as LinkIcon, Sparkles } from 'lucide-react';

interface SmartImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  fallbackName?: string;
}

export default function SmartImageUploader({
  label,
  value,
  onChange,
  folder = 'portfolio',
  fallbackName = 'project',
}: SmartImageUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressStats, setCompressStats] = useState<{
    originalKb: number;
    compressedKb: number;
    savedPercent: number;
  } | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image client-side to optimal WebP format & dimensions
  const processAndCompressFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)');
      return;
    }

    setIsProcessing(true);
    const originalKb = Math.round(file.size / 1024);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawBase64 = e.target?.result as string;
        const img = new Image();

        img.onload = async () => {
          // Calculate smart responsive dimensions (Max 1400px width/height)
          const MAX_DIM = 1400;
          let width = img.width;
          let height = img.height;

          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Canvas context unavailable');
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to WebP (with fallback to JPEG if browser does not support canvas WebP)
          let compressedBase64 = canvas.toDataURL('image/webp', 0.82);
          if (!compressedBase64.startsWith('data:image/webp')) {
            compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
          }

          // Calculate compressed size
          const head = compressedBase64.indexOf(',') + 1;
          const compressedBytes = Math.round((compressedBase64.length - head) * 0.75);
          const compressedKb = Math.round(compressedBytes / 1024);
          const savedPercent = Math.max(0, Math.round(((originalKb - compressedKb) / originalKb) * 100));

          setCompressStats({
            originalKb,
            compressedKb,
            savedPercent,
          });

          // Upload to server to get permanent relative URL
          try {
            const res = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                image: compressedBase64,
                folder,
                name: fallbackName,
              }),
            });

            const data = await res.json();
            if (res.ok && data.url) {
              onChange(data.url);
            } else {
              // Fallback to compressed base64 if server upload fails
              onChange(compressedBase64);
            }
          } catch (uploadErr) {
            console.warn('Direct upload failed, using compressed base64:', uploadErr);
            onChange(compressedBase64);
          } finally {
            setIsProcessing(false);
          }
        };

        img.onerror = () => {
          setIsProcessing(false);
          alert('تعذر معالجة الصورة، يرجى المحاولة مع صورة أخرى.');
        };

        img.src = rawBase64;
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Compression error:', err);
      setIsProcessing(false);
      alert('حدث خطأ أثناء ضغط الصورة.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndCompressFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndCompressFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setCompressStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-bold text-[#208EC1] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'استخدام رفع الملفات من الاستوديو' : 'أو إدخال رابط يدوي'}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="space-y-2">
          <input
            type="text"
            dir="ltr"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="مثال: /assets/images/portfolio/my-project.webp أو https://..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
          />
          {value && (
            <div className="relative aspect-video max-h-48 rounded-xl overflow-hidden bg-black/10 border border-slate-200 dark:border-slate-700">
              <img src={value} alt="المعاينة" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Interactive Upload Box or Preview */}
          {value ? (
            <div className="relative rounded-2xl border border-sky-400/30 bg-slate-50 dark:bg-slate-800/60 p-3 overflow-hidden shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 dark:border-white/10 shadow-inner">
                  <img
                    src={value}
                    alt="معاينة الصورة"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 start-1.5 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>جاهزة</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1.5 w-full text-start">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
                    <Sparkles className="w-4 h-4 text-[#208EC1]" />
                    <span>تم ضغط الصورة وتحسينها بنجاح للموقع</span>
                  </div>

                  {compressStats ? (
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="line-through">{compressStats.originalKb} KB</span>
                      <span>➔</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                        {compressStats.compressedKb} KB
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-black text-[10px]">
                        وفرت {compressStats.savedPercent}% من الحجم
                      </span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                      {value}
                    </p>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#208EC1] hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                      <span>اختيار صورة أخرى</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRemove}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>إزالة</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`rounded-2xl border-2 border-dashed transition-all p-6 text-center cursor-pointer ${
                isDragging
                  ? 'border-[#208EC1] bg-sky-50 dark:bg-sky-950/30 scale-[0.99]'
                  : 'border-slate-300 dark:border-slate-700 hover:border-[#208EC1] bg-slate-50/70 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-[#208EC1] flex items-center justify-center mx-auto mb-3 shadow-xs">
                {isProcessing ? (
                  <RefreshCw className="w-6 h-6 animate-spin text-[#208EC1]" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>

              {isProcessing ? (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#208EC1]">
                    جاري ضغط الصورة وتنسيقها بأعلى معايير الويب الذكية...
                  </p>
                  <p className="text-[11px] text-slate-400">يرجى الانتظار ثوانٍ معدودة</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1.5">
                    <span>اضغط هنا لاختيار صورة من الاستوديو أو الكاميرا</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    النظام يقوم تلقائياً بضغط الصورة إلى صيغة WebP سريعة وخفيفة مع المحافظة على الدقة
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-700/60 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    يدعم JPG, PNG, WebP (حتى 20 ميجابايت)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
