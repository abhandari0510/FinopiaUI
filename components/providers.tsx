"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { translations } from "@/i18n/translations";
import type { Locale } from "@/types";

type LanguageContextValue = { locale: Locale; toggle: () => void; t: typeof translations.en | typeof translations.mr };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const faroEnabled = process.env.NEXT_PUBLIC_GRAFANA_FARO_ENABLED === "true";
  const faroUrl = process.env.NEXT_PUBLIC_GRAFANA_FARO_URL;
  const faroAppName = process.env.NEXT_PUBLIC_GRAFANA_APP_NAME ?? "FinOpia UI";
  const faroAppVersion = process.env.NEXT_PUBLIC_GRAFANA_APP_VERSION ?? "1.0.0";
  const faroEnvironment = process.env.NEXT_PUBLIC_GRAFANA_ENVIRONMENT ?? process.env.NODE_ENV ?? "production";
  const faroSessionSamplingRate = Number(process.env.NEXT_PUBLIC_GRAFANA_SESSION_SAMPLING_RATE ?? "1");

  useEffect(() => {
    const saved = window.localStorage.getItem("finopia-locale") as Locale | null;
    if (saved === "mr" || saved === "en") setLocale(saved);
  }, []);

  useEffect(() => {
    if (!faroEnabled || !faroUrl) return;

    let cancelled = false;

    void import("@grafana/faro-web-sdk").then(async ({ getWebInstrumentations, initializeFaro }) => {
      if (cancelled) return;
      const { TracingInstrumentation } = await import("@grafana/faro-web-tracing");

      initializeFaro({
        url: faroUrl,
        app: {
          name: faroAppName,
          version: faroAppVersion,
          environment: faroEnvironment,
        },
        sessionTracking: {
          samplingRate: 1,
          persistent: true
        },
        instrumentations: [
          ...getWebInstrumentations(),
          new TracingInstrumentation(),
        ],
      });
    }).catch((error) => {
      console.error("Grafana Faro failed to initialize:", error);
    });

    return () => {
      cancelled = true;
    };
  }, [faroEnabled, faroUrl, faroAppName, faroAppVersion, faroEnvironment, faroSessionSamplingRate]);

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
