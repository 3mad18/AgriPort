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
    name: "برتقال فالنسيا وموالح مصرية",
    category: "موالح",
    variety: "برتقال صيفي فالنسيا، أبو صرة، ليمون، يوسفي",
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
    name: "بصل مصري طازج (أحمر وذهبي)",
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
    name: "فراولة طازجة فاخرة",
    category: "فواكه",
    variety: "فورتونا، فستيفال، سنشريشن",
    season: "نوفمبر — مارس",
    pack: "بانيتات 250 جم داخل كراتين 2 كجم و 2.5 كجم",
    specs: "شحن جوي مبرد سريع، فحص متبقيات معتمد",
    imageUrl:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    icon: "🍓",
    status: "متاح للتصدير",
  },
  {
    id: "pomegranates",
    name: "رمان وندرفول أحمر",
    category: "فواكه",
    variety: "رمان وندرفول عالي السكرية وبريكس مرتفع",
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
    name: "بطاطس مجهزة للتصدير",
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
    name: "عنب طازج بدون بذور",
    category: "فواكه",
    variety: "إيرلي سويت، سوبيريور، فليم، كريمسون",
    season: "مايو — أغسطس",
    pack: "بانيتات 500 جم أو كيس ورقي داخل كرتونة 4.5 كجم",
    specs: "مستوى بريكس مرتفع، قطر الحبة 18-22 مم+",
    imageUrl:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80",
    icon: "🍇",
    status: "موسم قادم",
  },
];

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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
  let directSuccess = false;
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
        directSuccess = true;
        console.log("✅ [AgriPort] Direct Supabase write SUCCESS!");
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

  // 2. Also submit to local API endpoint /api/inquiries (server-side push)
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiryData),
    });
    const result = await res.json();
    console.log("📡 [AgriPort] /api/inquiries response:", result);
    return { success: directSuccess || Boolean(result?.success), ...result };
  } catch (err) {
    console.error("❌ [AgriPort] /api/inquiries submission error:", err);
    return { success: directSuccess, error: err };
  }
}
