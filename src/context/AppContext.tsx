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
  updateDb: (nextDb: DatabaseSchema) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DB_STORAGE_KEY = 'hg_db_persisted_v2';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [db, setDb] = useState<DatabaseSchema>(initialData as unknown as DatabaseSchema);

  const persistLocalDb = (data: DatabaseSchema) => {
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage quota errors
    }
  };

  const refreshDb = async () => {
    let localCached: DatabaseSchema | null = null;
    try {
      const raw = localStorage.getItem(DB_STORAGE_KEY);
      if (raw) {
        localCached = JSON.parse(raw) as DatabaseSchema;
        if (localCached?.settings && Array.isArray(localCached?.portfolio)) {
          setDb(localCached);
        }
      }
    } catch {
      // ignore parse errors
    }

    try {
      const res = await fetch(`/api/db?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });
      if (res.ok) {
        const serverData = (await res.json()) as DatabaseSchema;
        const localTime = localCached?.updatedAt || 0;
        const serverTime = serverData?.updatedAt || 0;

        if (localCached && localTime > serverTime) {
          // Local admin change is newer than server (e.g. serverless cold-start); re-sync to server
          setDb(localCached);
          fetch('/api/db', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(localCached),
          }).catch(() => {});
        } else {
          setDb(serverData);
          persistLocalDb(serverData);
        }
      }
    } catch {
      // fallback to localCached or initialData
    }
  };

  const updateDb = async (nextDb: DatabaseSchema): Promise<boolean> => {
    const stampedDb: DatabaseSchema = {
      ...nextDb,
      updatedAt: Date.now(),
    };
    setDb(stampedDb);
    persistLocalDb(stampedDb);

    try {
      const res = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stampedDb),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.db) {
          setDb(json.db);
          persistLocalDb(json.db);
        }
        return true;
      }
      return true;
    } catch {
      return true;
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
