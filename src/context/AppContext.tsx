'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DatabaseSchema, Lang, LocalizedText } from '@/lib/types';
import { UI_DICT, tText } from '@/lib/i18n';
import initialData from '@/data/initial-db.json';

export function pickLang(obj: LocalizedText | string | undefined, lang: Lang): string {
  return tText(obj, lang);
}

interface AppContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  dict: (typeof UI_DICT)[Lang];
  t: (typeof UI_DICT)[Lang];
  db: DatabaseSchema;
  refreshDb: () => Promise<void>;
  updateDb: (nextDb: DatabaseSchema) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [db, setDb] = useState<DatabaseSchema>(initialData as unknown as DatabaseSchema);

  const refreshDb = async () => {
    try {
      const res = await fetch('/api/db', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setDb(data);
      }
    } catch {
      // fallback to initialData
    }
  };

  const updateDb = async (nextDb: DatabaseSchema) => {
    setDb(nextDb);
    try {
      await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextDb),
      });
    } catch {
      // ignore offline write error
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('hg_lang') as Lang | null;
    if (savedLang && ['ar', 'en', 'ur'].includes(savedLang)) {
      setLangState(savedLang);
    }
    const savedTheme = localStorage.getItem('hg_theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
    refreshDb();
  }, []);

  useEffect(() => {
    const dir = UI_DICT[lang].dir;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem('hg_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('hg_theme', theme);
  }, [theme]);

  const setLang = (l: Lang) => {
    setLangState(l);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        toggleTheme,
        dict: UI_DICT[lang],
        t: UI_DICT[lang],
        db,
        refreshDb,
        updateDb,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
