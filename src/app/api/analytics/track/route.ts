import { NextResponse } from "next/server";
import { RECENT_VISITS_CACHE } from "@/lib/traffic-store";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

// Helper to infer country from TimeZone if headers not present
function inferCountryFromTimeZone(tz: string, lang?: string): { country: string; countryCode: string; flag: string } {
  const lower = (tz || "").toLowerCase();
  if (lower.includes("cairo") || lower.includes("egypt")) return { country: "مصر", countryCode: "EG", flag: "🇪🇬" };
  if (lower.includes("riyadh") || lower.includes("jeddah")) return { country: "السعودية", countryCode: "SA", flag: "🇸🇦" };
  if (lower.includes("dubai") || lower.includes("abu_dhabi")) return { country: "الإمارات", countryCode: "AE", flag: "🇦🇪" };
  if (lower.includes("kuwait")) return { country: "الكويت", countryCode: "KW", flag: "🇰🇼" };
  if (lower.includes("qatar") || lower.includes("doha")) return { country: "قطر", countryCode: "QA", flag: "🇶🇦" };
  if (lower.includes("amman")) return { country: "الأردن", countryCode: "JO", flag: "🇯🇴" };
  if (lower.includes("baghdad")) return { country: "العراق", countryCode: "IQ", flag: "🇮🇶" };
  if (lower.includes("beirut")) return { country: "لبنان", countryCode: "LB", flag: "🇱🇧" };
  if (lower.includes("tripoli")) return { country: "ليبيا", countryCode: "LY", flag: "🇱🇾" };
  if (lower.includes("tunis")) return { country: "تونس", countryCode: "TN", flag: "🇹🇳" };
  if (lower.includes("algiers")) return { country: "الجزائر", countryCode: "DZ", flag: "🇩🇿" };
  if (lower.includes("casablanca")) return { country: "المغرب", countryCode: "MA", flag: "🇲🇦" };
  if (lower.includes("muscat")) return { country: "سلطنة عمان", countryCode: "OM", flag: "🇴🇲" };
  if (lower.includes("bahrain")) return { country: "البحرين", countryCode: "BH", flag: "🇧🇭" };
  if (lower.includes("berlin") || lower.includes("frankfurt")) return { country: "ألمانيا", countryCode: "DE", flag: "🇩🇪" };
  if (lower.includes("amsterdam")) return { country: "هولندا", countryCode: "NL", flag: "🇳🇱" };
  if (lower.includes("london")) return { country: "المملكة المتحدة", countryCode: "GB", flag: "🇬🇧" };
  if (lower.includes("paris")) return { country: "فرنسا", countryCode: "FR", flag: "🇫🇷" };
  if (lower.includes("rome") || lower.includes("milan")) return { country: "إيطاليا", countryCode: "IT", flag: "🇮🇹" };
  if (lower.includes("madrid")) return { country: "إسبانيا", countryCode: "ES", flag: "🇪🇸" };
  if (lower.includes("athens")) return { country: "اليونان", countryCode: "GR", flag: "🇬🇷" };
  if (lower.includes("moscow")) return { country: "روسيا", countryCode: "RU", flag: "🇷🇺" };
  if (lower.includes("istanbul")) return { country: "تركيا", countryCode: "TR", flag: "🇹🇷" };
  if (lower.includes("new_york") || lower.includes("chicago") || lower.includes("los_angeles"))
    return { country: "الولايات المتحدة", countryCode: "US", flag: "🇺🇸" };

  if (lang && lang.toLowerCase().startsWith("ar")) {
    return { country: "مصر", countryCode: "EG", flag: "🇪🇬" };
  }
  return { country: "مصر", countryCode: "EG", flag: "🇪🇬" };
}

// Helper to infer page label in Arabic
function getPageLabel(path: string): string {
  if (path === "/" || !path) return "الصفحة الرئيسية";
  if (path.startsWith("/products")) return "كتالوج المحاصيل التصديرية";
  if (path.startsWith("/facilities")) return "المحطات ومرافق التعبئة";
  if (path.startsWith("/farms")) return "المزارع وأراضي الاستصلاح";
  if (path.startsWith("/irrigation")) return "شبكات الري والتكنولوجيا";
  if (path.startsWith("/visit")) return "حجز زيارة ميدانية";
  if (path.startsWith("/contact")) return "اتصل بنا وطلب التسعير";
  if (path.startsWith("/about")) return "عن المنصة ورؤية التصدير";
  if (path.startsWith("/login")) return "تسجيل الدخول وبوابة الحسابات";
  return path;
}

// Helper to categorize Referrer
function categorizeReferrer(ref: string): { source: string; icon: string } {
  if (!ref || ref === "direct") return { source: "مباشر (Direct Visit)", icon: "🌐" };
  const lower = ref.toLowerCase();
  if (lower.includes("google")) return { source: "بحث Google", icon: "🔍" };
  if (lower.includes("whatsapp")) return { source: "رابط WhatsApp", icon: "💬" };
  if (lower.includes("facebook") || lower.includes("fb.com")) return { source: "فيسبوك", icon: "📘" };
  if (lower.includes("instagram")) return { source: "إنستغرام", icon: "📷" };
  if (lower.includes("linkedin")) return { source: "لينكد إن", icon: "💼" };
  if (lower.includes("twitter") || lower.includes("t.co") || lower.includes("x.com"))
    return { source: "منصة X", icon: "🐦" };
  return { source: "موقع خارجي", icon: "🔗" };
}

export async function POST(request: Request) {
  try {
    let body: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const { path, visitorId, referrer, screenWidth, timeZone, language } = body;

    // Do not track internal admin ops routes
    if (path && (path.startsWith("/ops") || path.startsWith("/secure-login"))) {
      return NextResponse.json({ success: true, ignored: true }, { headers: corsHeaders() });
    }

    const userAgent = request.headers.get("user-agent") || "";

    // 1. Detect Device & OS & Browser
    const isMobile =
      screenWidth < 768 ||
      /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    const device = isMobile ? "هاتف محمول 📱" : "كمبيوتر 💻";

    let os = "Windows";
    if (/iphone|ipad|ipod/i.test(userAgent)) os = "iOS (Apple)";
    else if (/android/i.test(userAgent)) os = "Android";
    else if (/macintosh|mac os x/i.test(userAgent)) os = "macOS";
    else if (/linux/i.test(userAgent)) os = "Linux";

    let browser = "Chrome";
    if (/edg/i.test(userAgent)) browser = "Edge";
    else if (/firefox/i.test(userAgent)) browser = "Firefox";
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = "Safari";
    else if (/opr|opera/i.test(userAgent)) browser = "Opera";

    // 2. Detect Geolocation
    const headerCountry =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      request.headers.get("x-country-code");
    const headerCity = request.headers.get("x-vercel-ip-city") || "";

    let geoInfo = inferCountryFromTimeZone(timeZone || "", language || "");
    if (headerCountry && headerCountry.length === 2) {
      geoInfo.countryCode = headerCountry.toUpperCase();
      if (geoInfo.countryCode === "EG") { geoInfo.country = "مصر"; geoInfo.flag = "🇪🇬"; }
      else if (geoInfo.countryCode === "SA") { geoInfo.country = "السعودية"; geoInfo.flag = "🇸🇦"; }
      else if (geoInfo.countryCode === "DE") { geoInfo.country = "ألمانيا"; geoInfo.flag = "🇩🇪"; }
      else if (geoInfo.countryCode === "NL") { geoInfo.country = "هولندا"; geoInfo.flag = "🇳🇱"; }
      else if (geoInfo.countryCode === "AE") { geoInfo.country = "الإمارات"; geoInfo.flag = "🇦🇪"; }
      else if (geoInfo.countryCode === "GB") { geoInfo.country = "المملكة المتحدة"; geoInfo.flag = "🇬🇧"; }
      else if (geoInfo.countryCode === "FR") { geoInfo.country = "فرنسا"; geoInfo.flag = "🇫🇷"; }
      else if (geoInfo.countryCode === "IT") { geoInfo.country = "إيطاليا"; geoInfo.flag = "🇮🇹"; }
      else if (geoInfo.countryCode === "RU") { geoInfo.country = "روسيا"; geoInfo.flag = "🇷🇺"; }
      else if (geoInfo.countryCode === "US") { geoInfo.country = "الولايات المتحدة"; geoInfo.flag = "🇺🇸"; }
      else { geoInfo.country = headerCountry; geoInfo.flag = "🌐"; }
    }

    const refInfo = categorizeReferrer(referrer);
    const pageTitle = getPageLabel(path || "/");

    const visitRecord = {
      id: "vst_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      created_at: new Date().toISOString(),
      visitor_id: visitorId || "anon",
      path: path || "/",
      page_title: pageTitle,
      country: geoInfo.country,
      country_code: geoInfo.countryCode,
      flag: geoInfo.flag,
      city: headerCity || "",
      device,
      os,
      browser,
      referrer: refInfo.source,
      referrer_icon: refInfo.icon,
    };

    // Keep in local cache (max 200 recent visits)
    RECENT_VISITS_CACHE.unshift(visitRecord);
    if (RECENT_VISITS_CACHE.length > 200) {
      RECENT_VISITS_CACHE.pop();
    }

    // Persist to Supabase table if available
    const { url, key } = getSupabaseConfig();
    if (url && key) {
      try {
        fetch(`${url}/rest/v1/site_visits`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: key,
            Authorization: `Bearer ${key}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            id: visitRecord.id,
            created_at: visitRecord.created_at,
            visitor_id: visitRecord.visitor_id,
            path: visitRecord.path,
            page_title: visitRecord.page_title,
            country: visitRecord.country,
            country_code: visitRecord.country_code,
            flag: visitRecord.flag,
            city: visitRecord.city,
            device: visitRecord.device,
            os: visitRecord.os,
            browser: visitRecord.browser,
            referrer: visitRecord.referrer,
            referrer_icon: visitRecord.referrer_icon,
          }),
        }).catch(() => {});
      } catch {}
    }

    return NextResponse.json({ success: true, visit: visitRecord }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500, headers: corsHeaders() });
  }
}
