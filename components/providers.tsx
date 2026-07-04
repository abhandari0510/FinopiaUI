"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/types";

type LanguageContextValue = { locale: Locale; toggle: () => void; t: typeof translations.en | typeof translations.mr };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("finopia-locale") as Locale | null;
    if (saved === "mr" || saved === "en") setLocale(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    toggle: () => setLocale((current) => {
      const next = current === "en" ? "mr" : "en";
      window.localStorage.setItem("finopia-locale", next);
      return next;
    }),
    t: translations[locale],
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside Providers");
  return context;
}
