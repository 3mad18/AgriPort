"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initClarity, identifyUser, setTag } from "@/lib/clarity";

const VISITOR_ID_KEY = "agriport_anon_visitor_id";
export const CLARITY_ID_KEY = "agriport_clarity_project_id";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = "vis_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return "vis_" + Date.now().toString(36);
  }
}

export function getClarityProjectId(): string {
  if (typeof window === "undefined") return "z6bhtb3yil";
  const envId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (envId && envId.trim()) return envId.trim();
  try {
    return localStorage.getItem(CLARITY_ID_KEY) || "z6bhtb3yil";
  } catch {
    return "z6bhtb3yil";
  }
}

export function TrafficTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const lastTrackedTime = useRef<number>(0);

  useEffect(() => {
    if (!pathname) return;

    // Skip tracking for admin ops routes
    if (pathname.startsWith("/ops") || pathname.startsWith("/secure-login")) {
      return;
    }

    const visitorId = getOrCreateVisitorId();
    const projectId = getClarityProjectId();

    // 1. Initialize Microsoft Clarity & Set Cookie Consent
    initClarity(projectId);

    // 2. Identify API for every page visit (as recommended by Microsoft Clarity docs)
    identifyUser(
      visitorId,
      undefined,
      pathname,
      `زائر المنصة (${visitorId.slice(0, 8)})`
    );

    // 3. Custom Tags API: Set page and session context
    setTag("current_page", pathname);
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    setTag("device_screen", screenWidth < 768 ? "mobile" : "desktop");

    const now = Date.now();
    // Prevent duplicate rapid logging of same page within 5 seconds
    if (lastTrackedPath.current === pathname && now - lastTrackedTime.current < 5000) {
      return;
    }

    lastTrackedPath.current = pathname;
    lastTrackedTime.current = now;

    const referrer = typeof document !== "undefined" ? document.referrer : "";
    if (referrer) {
      setTag("traffic_referrer", referrer);
    }
    const title = typeof document !== "undefined" ? document.title : "";

    // Extract user timezone as geo-hint
    let timeZone = "";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {}

    const userLanguage = typeof navigator !== "undefined" ? navigator.language : "";

    const payload = {
      path: pathname,
      title: title || pathname,
      visitorId,
      referrer,
      screenWidth,
      timeZone,
      language: userLanguage,
      timestamp: new Date().toISOString(),
    };

    // Store in localStorage for immediate client-side tracking & resilience
    try {
      const isMobile =
        screenWidth < 768 ||
        (typeof navigator !== "undefined" && /mobile|android|iphone/i.test(navigator.userAgent));
      const localVisit = {
        id: "vst_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        created_at: new Date().toISOString(),
        visitor_id: visitorId,
        path: pathname,
        page_title: title || pathname,
        country: timeZone.includes("Cairo") ? "مصر" : "زائر المنصة",
        country_code: timeZone.includes("Cairo") ? "EG" : "EG",
        flag: timeZone.includes("Cairo") ? "🇪🇬" : "🌐",
        device: isMobile ? "هاتف محمول 📱" : "كمبيوتر 💻",
        os: typeof navigator !== "undefined" && /iphone|ipad/i.test(navigator.userAgent)
          ? "iOS"
          : typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)
          ? "Android"
          : "Windows",
        browser: typeof navigator !== "undefined" && /edg/i.test(navigator.userAgent)
          ? "Edge"
          : "Chrome",
        referrer: referrer || "مباشر (Direct Visit)",
        referrer_icon: referrer.includes("Google") ? "🔍" : "🌐",
      };
      const existingRaw = localStorage.getItem("agriport_live_visits");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [
        localVisit,
        ...existing.filter(
          (v: any) => v.path !== pathname || Date.now() - new Date(v.created_at).getTime() > 30000
        ),
      ].slice(0, 100);
      localStorage.setItem("agriport_live_visits", JSON.stringify(updated));
      window.dispatchEvent(new Event("agriport_traffic_updated"));
    } catch {}

    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.visit) {
            try {
              const existingRaw = localStorage.getItem("agriport_live_visits");
              const existing = existingRaw ? JSON.parse(existingRaw) : [];
              const updated = [
                data.visit,
                ...existing.filter((v: any) => v.id !== data.visit.id),
              ].slice(0, 100);
              localStorage.setItem("agriport_live_visits", JSON.stringify(updated));
              window.dispatchEvent(new Event("agriport_traffic_updated"));
            } catch {}
          }
        })
        .catch(() => {});
    } catch {
      // Non-blocking tracking
    }
  }, [pathname]);

  return null;
}
