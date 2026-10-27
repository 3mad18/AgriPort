"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SETTINGS_KEY,
  SETTINGS_CACHE_KEY,
  SETTINGS_EVENT,
  OPS_STORE_EVENT,
} from "./supabase-config";

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

let cachedSettings: PublicSiteSettings | null = null;
let cachedRaw: string | null = null;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(SETTINGS_EVENT, callback);
  window.addEventListener(OPS_STORE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SETTINGS_EVENT, callback);
    window.removeEventListener(OPS_STORE_EVENT, callback);
  };
}

function parseSettings(raw: string | null): PublicSiteSettings | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return {
        companyName: parsed.companyName || DEFAULT_SETTINGS.companyName,
        tagline: parsed.tagline || DEFAULT_SETTINGS.tagline,
        email: parsed.email || DEFAULT_SETTINGS.email,
        phone: parsed.phone || DEFAULT_SETTINGS.phone,
        location: parsed.location || DEFAULT_SETTINGS.location,
        exportBannerText:
          parsed.exportBannerText !== undefined && parsed.exportBannerText !== null
            ? parsed.exportBannerText
            : DEFAULT_SETTINGS.exportBannerText,
        showExportBanner:
          parsed.showExportBanner !== undefined && parsed.showExportBanner !== null
            ? Boolean(parsed.showExportBanner)
            : DEFAULT_SETTINGS.showExportBanner,
      };
    }
  } catch {}
  return null;
}

function getSnapshot(): PublicSiteSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const raw =
    localStorage.getItem(SETTINGS_KEY) ||
    localStorage.getItem(SETTINGS_CACHE_KEY);

  if (raw === cachedRaw && cachedSettings) return cachedSettings;
  if (!raw) return DEFAULT_SETTINGS;

  const parsed = parseSettings(raw);
  if (parsed) {
    cachedSettings = parsed;
    cachedRaw = raw;
    return cachedSettings;
  }
  return DEFAULT_SETTINGS;
}

export function useSiteSettings() {
  const settings = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => DEFAULT_SETTINGS
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchSettings() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/site_settings?limit=1`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
                row.export_banner_text !== undefined && row.export_banner_text !== null
                  ? row.export_banner_text
                  : DEFAULT_SETTINGS.exportBannerText,
              showExportBanner:
                row.show_export_banner !== undefined && row.show_export_banner !== null
                  ? Boolean(row.show_export_banner)
                  : true,
            };

            const raw = JSON.stringify(mapped);
            if (raw !== localStorage.getItem(SETTINGS_KEY)) {
              localStorage.setItem(SETTINGS_KEY, raw);
              localStorage.setItem(SETTINGS_CACHE_KEY, raw);
              cachedSettings = mapped;
              cachedRaw = raw;
              window.dispatchEvent(new Event(SETTINGS_EVENT));
              window.dispatchEvent(new Event(OPS_STORE_EVENT));
            }
          }
        }
      } catch (err) {
        // silent catch
      }
    }

    fetchSettings();
    const interval = setInterval(fetchSettings, 2500);

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
