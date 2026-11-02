'use client';

import React, { useState } from 'react';
import { ShieldAlert, Lock, CheckCircle2, X } from 'lucide-react';

interface SecurityConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => Promise<void> | void;
  onClose: () => void;
}

export default function SecurityConfirmModal({
  isOpen,
  title,
  description,
  onConfirm,
  onClose,
}: SecurityConfirmModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = password.trim();
    if (clean === '2396@' || clean === '@2396') {
      setError(false);
      setLoading(true);
      try {
        await onConfirm();
        onClose();
        setPassword('');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div
      dir="rtl"
      style={{ position: 'fixed', inset: 0, zIndex: 100000 }}
      className="flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0c1d34] border border-slate-200/90 dark:border-white/15 p-6 sm:p-7 shadow-2xl animate-scaleUp text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-black text-[#0f2544] dark:text-white mb-1.5">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-start">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#208EC1]" />
              <span>كلمة المرور الإدارية لتأكيد العملية:</span>
            </label>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                setError(false);
                // Also support instant auto-confirm if password matched!
                if (val.trim() === '2396@' || val.trim() === '@2396') {
                  onConfirm();
                  onClose();
                  setPassword('');
                }
              }}
              placeholder="أدخل كلمة المرور (2396@)"
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center font-bold tracking-widest text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#208EC1] text-sm"
            />
            {error && (
              <p className="text-xs text-rose-500 font-bold mt-1.5 text-center animate-shake">
                كلمة المرور غير صحيحة، تم رفض تنفيذ العملية!
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              إلغاء الأمر
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl bg-[#11345C] hover:bg-[#208EC1] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{loading ? 'جارِ التنفيذ...' : 'تأكيد وتنفيذ'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
