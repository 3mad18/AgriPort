import { NextResponse } from "next/server";
import { RECENT_VISITS_CACHE } from "@/lib/traffic-store";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

function getSupabaseConfig() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://gwdyyuezddpbgmmdwiey.supabase.co";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_QAd4C2O8gHk56Uj0SyxCYg_DXS9MyE9";
  return { url, key };
}

export async function GET() {
  const { url, key } = getSupabaseConfig();

  let fetchedVisits: any[] = [];

  // 1. Fetch real visits from Supabase table if available
  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/site_visits?select=*&order=created_at.desc&limit=150`, {
        method: "GET",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          fetchedVisits = data.map((item: any) => ({
            id: item.id,
            created_at: item.created_at,
            visitor_id: item.visitor_id,
            path: item.path,
            page_title: item.page_title,
            country: item.country || "زائر دولي",
            country_code: item.country_code || "",
            flag: item.flag || (item.country_code === "EG" ? "🇪🇬" : item.country_code === "SA" ? "🇸🇦" : item.country_code === "DE" ? "🇩🇪" : item.country_code === "NL" ? "🇳🇱" : item.country_code === "AE" ? "🇦🇪" : "🌐"),
            city: item.city || "",
            device: item.device || "كمبيوتر 💻",
            os: item.os || "نظام غير معروف",
            browser: item.browser || "المتصفح",
            referrer: item.referrer || "مباشر (Direct Visit)",
            referrer_icon: item.referrer_icon || (item.referrer?.includes("Google") ? "🔍" : item.referrer?.includes("WhatsApp") ? "💬" : "🌐"),
          }));
        }
      }
    } catch {}
  }

  // 2. Merge only REAL visits (in-memory live cache + persistent database)
  const mergedMap = new Map<string, any>();
  [...RECENT_VISITS_CACHE, ...fetchedVisits].forEach((v) => {
    if (v && v.id && !mergedMap.has(v.id)) {
      mergedMap.set(v.id, v);
    }
  });

  const allVisits = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // 3. Calculate 100% Real Aggregated Metrics
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const visitsToday = allVisits.filter(
    (v) => new Date(v.created_at).getTime() >= todayStart.getTime()
  );

  const uniqueVisitorsToday = new Set(visitsToday.map((v) => v.visitor_id)).size;

  // Active in last 10 minutes
  const activeNowCount = allVisits.filter(
    (v) => Date.now() - new Date(v.created_at).getTime() < 10 * 60 * 1000
  ).length;

  // Country counts
  const countryMap = new Map<string, { name: string; flag: string; count: number }>();
  allVisits.forEach((v) => {
    const key = v.country || "غير محدد";
    const curr = countryMap.get(key) || { name: key, flag: v.flag || "🌐", count: 0 };
    curr.count += 1;
    countryMap.set(key, curr);
  });
  const topCountries = Array.from(countryMap.values()).sort((a, b) => b.count - a.count);

  // Top Pages
  const pagesMap = new Map<string, { path: string; title: string; count: number }>();
  allVisits.forEach((v) => {
    const key = v.path || "/";
    const curr = pagesMap.get(key) || { path: key, title: v.page_title || key, count: 0 };
    curr.count += 1;
    pagesMap.set(key, curr);
  });
  const topPages = Array.from(pagesMap.values()).sort((a, b) => b.count - a.count);

  // Device Breakdown
  const mobileCount = allVisits.filter(
    (v) => v.device?.includes("محمول") || v.device?.includes("Mobile") || v.device?.includes("📱")
  ).length;
  const desktopCount = allVisits.length - mobileCount;

  return NextResponse.json(
    {
      success: true,
      stats: {
        totalVisits: allVisits.length,
        visitsToday: visitsToday.length,
        uniqueVisitorsToday: uniqueVisitorsToday,
        activeNow: activeNowCount,
        mobileCount,
        desktopCount,
        mobilePercent: allVisits.length ? Math.round((mobileCount / allVisits.length) * 100) : 0,
        desktopPercent: allVisits.length ? Math.round((desktopCount / allVisits.length) * 100) : 0,
        topCountries,
        topPages,
      },
      visits: allVisits.slice(0, 100),
    },
    { headers: corsHeaders() }
  );
}

export async function DELETE() {
  RECENT_VISITS_CACHE.length = 0;
  return NextResponse.json({ success: true, message: "Visits cache cleared" }, { headers: corsHeaders() });
}
