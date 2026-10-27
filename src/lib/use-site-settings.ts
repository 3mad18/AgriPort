"use client";

import { useEffect, useSyncExternalStore } from "react";

export type PublicSiteSettings = {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  exportBannerText: string;
  showExportBanner: boolean;
};

const DEFAULT_SETTINGS: PublicSiteSettings = {
  companyName: "AgriPort",
  tagline: "تصدير الحاصلات الزراعية والخضروات والفواكه المصرية الفاخرة",
  email: "agriporteg@gmail.com",
  phone: "+20 100 720 2636",
  location: "جمهورية مصر العربية — محافظة البحيرة / كفر الدوار",
  exportBannerText:
    "موسم تصدير البرتقال والبصل مفتوح حالياً للشحن الفوري إلى أوروبا ودول الخليج!",
  showExportBanner: true,
};

const STORAGE_KEY = "agriport_live_settings_cache";
const CHANGE_EVENT = "agriport_live_settings_change";

let cachedSettings: PublicSiteSettings | null = null;
let cachedRaw: string | null = null;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot(): PublicSiteSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw && cachedSettings) return cachedSettings;
  if (!raw) return DEFAULT_SETTINGS;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      cachedSettings = parsed;
      cachedRaw = raw;
      return cachedSettings!;
    }
    return DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useSiteSettings() {
  const settings = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => DEFAULT_SETTINGS
  );

  useEffect(() => {
    let isMounted = true;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    async function fetchSettings() {
      if (!supabaseUrl || !supabaseKey) return;
      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/site_settings?limit=1`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
            cache: "no-store",
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            const row = data[0];
            const mapped: PublicSiteSettings = {
              companyName: row.company_name || DEFAULT_SETTINGS.companyName,
              tagline: row.tagline || DEFAULT_SETTINGS.tagline,
              email: row.email || DEFAULT_SETTINGS.email,
              phone: row.phone || DEFAULT_SETTINGS.phone,
              location: row.location || DEFAULT_SETTINGS.location,
              exportBannerText:
                row.export_banner_text || DEFAULT_SETTINGS.exportBannerText,
              showExportBanner: row.show_export_banner ?? true,
            };

            const raw = JSON.stringify(mapped);
            if (raw !== localStorage.getItem(STORAGE_KEY)) {
              localStorage.setItem(STORAGE_KEY, raw);
              cachedSettings = mapped;
              cachedRaw = raw;
              window.dispatchEvent(new Event(CHANGE_EVENT));
            }
          }
        }
      } catch (err) {
        // ignore
      }
    }

    fetchSettings();
    const interval = setInterval(fetchSettings, 3500);

    const handleFocus = () => fetchSettings();
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  return { settings };
}
