export type ExportProduct = {
  id: string;
  name: string;
  category: "موالح" | "خضروات" | "فواكه" | "أخرى";
  variety: string;
  season: string;
  pack: string;
  specs: string;
  imageUrl: string;
  icon: string;
  status: "متاح للتصدير" | "موسم قادم" | "نفد مؤقتاً";
};

export const EXPORT_CATALOG: ExportProduct[] = [
  {
    id: "citrus",
    name: "الموالح والبرتقال المصري",
    category: "موالح",
    variety: "برتقال فالنسيا (صيفي)، أبو صرة، ليمون، يوسفي",
    season: "نوفمبر — مايو",
    pack: "كراتين تليسكوبيك 15 كجم، أوبن توب، شبك",
    specs: "معايرات كاليبر: 40، 48، 56، 64، 72، 80، 88",
    imageUrl:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80",
    icon: "🍊",
    status: "متاح للتصدير",
  },
  {
    id: "onions",
    name: "البصل المصري (الأحمر والذهبي)",
    category: "خضروات",
    variety: "بصل أحمر إيطالي، بصل ذهبي مجفف طبيعياً",
    season: "فبراير — أغسطس",
    pack: "أكياس شبكية 10 كجم و 25 كجم، جامبو باج 1 طن",
    specs: "أحجام: 40/60 مم، 50/70 مم، 70/90 مم، 80/100 مم",
    imageUrl:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
    icon: "🧅",
    status: "متاح للتصدير",
  },
  {
    id: "strawberries",
    name: "الفراولة الطازجة الفاخرة",
    category: "فواكه",
    variety: "فورتونا، فستيفال، سنشريشن",
    season: "نوفمبر — مارس",
    pack: "بانيتات 250 جم داخل كراتين 2 كجم و 2.5 كجم",
    specs: "شحن جوي مبرد سريع، خالية من متبقيات المبيدات",
    imageUrl:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    icon: "🍓",
    status: "متاح للتصدير",
  },
  {
    id: "pomegranates",
    name: "الرمان الوندرفول الفاخر",
    category: "فواكه",
    variety: "رمان وندرفول أحمر داكن عالي السكرية",
    season: "سبتمبر — ديسمبر",
    pack: "كراتين 4.5 كجم و 5 كجم (بانيتات أو كراتين مفتوحة)",
    specs: "أحجام: 6، 7، 8، 9، 10، 12، 14 حبة بالكرتونة",
    imageUrl:
      "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=800&q=80",
    icon: "🍎",
    status: "موسم قادم",
  },
  {
    id: "potatoes",
    name: "البطاطس المجهزة للتصدير",
    category: "خضروات",
    variety: "سبونتا، مونديال، ليدي روزيتا، كارا",
    season: "يناير — يونيو",
    pack: "أكياس شبك 10 كجم، 25 كجم، جامبو باج 1250 كجم",
    specs: "مغسولة ومجففة، أحجام 35/55 مم و 55+ مم",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    icon: "🥔",
    status: "متاح للتصدير",
  },
  {
    id: "grapes",
    name: "العنب الطازج بدون بذور",
    category: "فواكه",
    variety: "إيرلي سويت، سوبيريور، فليم، كريمسون",
    season: "مايو — أغسطس",
    pack: "بانيتات 500 جم أو كيس ورقي داخل كرتونة 4.5 كجم",
    specs: "مستوى بريكس مرتفع، قطر الحبة 18-22 مم+",
    imageUrl:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80",
    icon: "🍇",
    status: "متاح للتصدير",
  },
  {
    id: "artichoke",
    name: "الخرشوف المصري الفاخر",
    category: "خضروات",
    variety: "خرشوف فرنساوي، خرشوف بلدي",
    season: "نوفمبر — مايو",
    pack: "براميل حفظ غذائية، كراتين مبردة، أكياس مجهزة",
    specs: "أحجام كاليبر: 50، 60، 55 مم نخب أول",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    icon: "🌱",
    status: "متاح للتصدير",
  },
];

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config";

function syncLocalInquiry(item: any) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("agriport_ops_inquiries");
    const list = raw ? JSON.parse(raw) : [];
    if (!list.some((existing: any) => existing.id === item.id)) {
      const updated = [item, ...list];
      localStorage.setItem("agriport_ops_inquiries", JSON.stringify(updated));
      window.dispatchEvent(new Event("agriport_ops_store_change"));
    }
  } catch (e) {}
}

export async function submitQuoteInquiry(inquiryData: {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  incoterms: string;
  destinationPort: string;
  message: string;
}) {
  const supabaseUrl = SUPABASE_URL;
  const supabaseKey = SUPABASE_ANON_KEY;

  console.log("📤 [AgriPort] Submitting inquiry...", {
    product: inquiryData.product,
    email: inquiryData.email,
    hasSupabaseUrl: Boolean(supabaseUrl),
    hasSupabaseKey: Boolean(supabaseKey),
  });

  const payload = {
    id: "inq-" + Date.now(),
    date: new Date().toISOString().split("T")[0],
    name: inquiryData.name,
    company: inquiryData.company || "Individual / Private Buyer",
    country: inquiryData.country || "International",
    email: inquiryData.email,
    phone: inquiryData.phone || "",
    product: inquiryData.product || "General Quotation",
    quantity: inquiryData.quantity || "As agreed",
    incoterms: inquiryData.incoterms || "FOB",
    destination_port: inquiryData.destinationPort || "",
    message: inquiryData.message || "",
    status: "جديد",
    read: false,
  };

  // 1. Direct write to Supabase if configured in client
  if (supabaseUrl && supabaseKey) {
    try {
      console.log("⚡ [AgriPort] Writing directly to Supabase REST API...");
      const sbRes = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (sbRes.ok) {
        console.log("✅ [AgriPort] Direct Supabase write SUCCESS!");
        syncLocalInquiry(payload);
        return { success: true, inquiry: payload };
      } else {
        const errorText = await sbRes.text();
        console.error("❌ [AgriPort] Direct Supabase write FAILED:", sbRes.status, errorText);
      }
    } catch (sbErr) {
      console.error("❌ [AgriPort] Supabase direct connection error:", sbErr);
    }
  } else {
    console.warn(
      "⚠️ [AgriPort] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in browser environment!"
    );
  }

  // 2. Fallback to /api/inquiries ONLY if direct client-side write was not used or failed
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...inquiryData, id: payload.id }),
    });
    const result = await res.json();
    console.log("📡 [AgriPort] Fallback /api/inquiries response:", result);
    if (result?.success) {
      syncLocalInquiry(payload);
    }
    return result;
  } catch (err) {
    console.error("❌ [AgriPort] /api/inquiries submission error:", err);
    return { success: false, error: err };
  }
}
