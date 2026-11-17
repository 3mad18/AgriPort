export type ExportProduct = {
  id: string;
  name: string;
  category: "موالح" | "خضروات" | "فواكه" | "أخرى" | string;
  variety: string;
  season: string;
  pack: string;
  specs: string;
  imageUrl: string;
  icon: string;
  status: "متاح للتصدير" | "موسم قادم" | "نفد مؤقتاً" | string;
  featured?: boolean;
  description?: string;
  images?: string[];
  pdfUrl?: string;
  pdfName?: string;
  origin?: string;
  hsCode?: string;
  storageTemp?: string;
  shelfLife?: string;
};

export const EXPORT_CATALOG: ExportProduct[] = [
  {
    id: "artichoke",
    name: "الخرشوف المصري الفاخر",
    category: "خضروات",
    variety: "خرشوف بلدي، خرشوف فرنساوي، فيوليت",
    season: "نوفمبر — مايو",
    pack: "براميل حفظ غذائية (محلول ملحي)، كراتين تبريد، أكياس مفرغة",
    specs: "أحجام كاليبر: 50، 60، 65 مم نخب أول، أقماع وقلوب مجهزة ومطابقة للمواصفات الأوروبية",
    imageUrl: "/images/products/artichoke.jpg",
    icon: "🌱",
    status: "متاح للتصدير",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "0709.91.00",
    storageTemp: "0°C — 2°C (نسبة رطوبة 95%)",
    shelfLife: "21 — 28 يوماً في سلسلة التبريد المعتمدة",
    description: "خرشوف مصري طازج ومجهز مطابق للمواصفات التصديرية للاتحاد الأوروبي والأسواق الدولية. يتميز بأقماع مدمجة صلبة وقلوب غنية خالية من الألياف، يقطف يدوياً بعناية في الصباح الباكر مع تطبيق التبريد الأولي الفوري Pre-cooling لضمان النضارة التامة.",
    images: [
      "/images/products/artichoke.jpg",
      "/images/facilities/artichoke-processing.jpg",
      "/images/facilities/vegetable-farms.jpg",
    ],
  },
  {
    id: "green-beans",
    name: "الفاصولياء الخضراء الفاخرة",
    category: "خضروات",
    variety: "بولستا (Polesta)، برونكو (Bronco)، فالنتينو",
    season: "أكتوبر — مايو",
    pack: "كراتين مقواة 4-5 كجم، بانيتات 250 و 500 جم مبردة",
    specs: "قرون مستقيمة ناضرة خالية من الخيوط، طول 10-14 سم، درجات نقاوة Fine & Extra Fine",
    imageUrl: "/images/products/green-beans.jpg",
    icon: "🫘",
    status: "متاح للتصدير",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "0708.20.00",
    storageTemp: "4°C — 7°C (نسبة رطوبة 90-95%)",
    shelfLife: "14 — 21 يوماً",
    description: "فاصوليا خضراء نقية نخب أول، تمتاز بقرون نضرة مستقيمة موحدة اللون وبدون خيوط أو تجويفات بذرية. تفرز وتعبأ يدوياً في محطات التعبئة المعتمدة لدينا مع خيارات تغليف مرنة للبانيتات والكراتين المبردة للشحن الجوي والبحري.",
    images: [
      "/images/products/green-beans.jpg",
      "/images/facilities/broccoli-beans-packing.jpg",
      "/images/facilities/vegetable-farms.jpg",
    ],
  },
  {
    id: "broccoli",
    name: "البروكلي الأخضر الطازج",
    category: "خضروات",
    variety: "كالابريزي (Calabrese)، باراثون، هيريتيدج",
    season: "نوفمبر — أبريل",
    pack: "صناديق بوليسترين مع ثلج مجروش (Iced Styrofoam) 5-6 كجم، كراتين مبردة",
    specs: "رؤوس متراصة مغلقة بلون أخضر داكن مزرق، قطر 10-15 سم، ساق مقصوصة 2-3 سم، تبريد فوري Pre-cooling",
    imageUrl: "/images/products/broccoli.jpg",
    icon: "🥦",
    status: "متاح للتصدير",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "0704.10.00",
    storageTemp: "0°C — 1°C مع ثلج مجروش ملامس",
    shelfLife: "21 — 25 يوماً",
    description: "رؤوس بروكلي عالية الجودة بزهيرات متراصة مشدودة بلون أخضر داكن غني، خالية تماماً من الاصفرار أو التفتح الزهري. يعبأ في صناديق بوليسترين عازلة مع تغطية بالثلج المجهري للحفاظ على الرطوبة والنضارة الفائقة طوال مسار الشحن.",
    images: [
      "/images/products/broccoli.jpg",
      "/images/facilities/broccoli-beans-packing.jpg",
      "/images/facilities/vegetable-farms.jpg",
    ],
  },
  {
    id: "cauliflower",
    name: "القرنبيط الأبيض الفاخر",
    category: "خضروات",
    variety: "سنوبول (Snowball)، فريمانت، إينكلاين",
    season: "نوفمبر — أبريل",
    pack: "كراتين كرتونية مبطنة 6-8 حبات، تغليف محكم بغشاء مسامي (Shrink Wrap)",
    specs: "أقراص زهرية ناصعة البياض كثيفة وصلبة، أوزان 1.0 - 1.8 كجم، محاطة بأوراق حماية مشذبة",
    imageUrl: "/images/products/cauliflower.jpg",
    icon: "🥬",
    status: "متاح للتصدير",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "0704.10.00",
    storageTemp: "0°C — 2°C (نسبة رطوبة 95%)",
    shelfLife: "21 — 30 يوماً",
    description: "أقراص قرنبيط بيضاء نقية عالية الكثافة والصلابة بدون فراغات، محصودة في درجات النضج المثالية ومحمية بأوراق خارجية مشذبة أو مغلفة فردياً بغشاء مسامي مانع للرطوبة لحمايتها أثناء الشحن البحري والجوي.",
    images: [
      "/images/products/cauliflower.jpg",
      "/images/facilities/vegetable-farms.jpg",
    ],
  },
  {
    id: "cabbage",
    name: "الكرنب الأخضر المجهز للتصدير",
    category: "خضروات",
    variety: "كرنب بلدي فاخر، أصناف هجينة (براونشفايغ، برونكو)",
    season: "ديسمبر — مايو",
    pack: "أكياس شبكية 15-20 كجم، صناديق خشبية، باليتات مبردة للشحن البحري",
    specs: "رؤوس كروية متماسكة جيدة الالتفاف، أوزان متجانسة 1.5 - 2.5 كجم، خالية تماماً من العيوب",
    imageUrl: "/images/products/cabbage.jpg",
    icon: "🥬",
    status: "متاح للتصدير",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "0704.90.10",
    storageTemp: "0°C — 1°C (رطوبة نسبية 98%)",
    shelfLife: "4 — 6 أسابيع",
    description: "كرنب أخضر صلب مجهز بعناية للتصدير الخارجي، رؤوس كروية متجانسة الأوزان بأوراق لامعة مشدودة، خالية من أي إصابات حشرية أو ميكانيكية، ومفرزة آلياً ومحملة على باليتات تبريد وفق المعايير الدولية.",
    images: [
      "/images/products/cabbage.jpg",
      "/images/facilities/cabbage-packing.jpg",
    ],
  },
  {
    id: "potatoes",
    name: "البطاطس المجهزة للتصدير",
    category: "خضروات",
    variety: "سبونتا (Spunta)، مونديال، ليدي روزيتا، كارا، هيرميس",
    season: "يناير — يونيو",
    pack: "أكياس شبك 10 كجم و 25 كجم، جامبو باج 1250 كجم، كراتين مبردة",
    specs: "مغسولة ومجففة أو معفرة بالرمال، أحجام مدرجة: 35/55 مم، 55/65 مم، 65+ مم",
    imageUrl: "/images/products/potatoes.jpg",
    icon: "🥔",
    status: "متاح للتصدير",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "0701.90.00",
    storageTemp: "4°C — 8°C (حسب الصنف والاستخدام مائدة أو تصنيع)",
    shelfLife: "3 — 5 أشهر في بيئة تخزين متحكم بها",
    description: "بطاطس مائدة وتصنيع شيبس مستخرجة من أراضٍ صحراوية بكر خالية من العفن البني ومطابقة للبروتوكولات الصارمة للاتحاد الأوروبي والمملكة المتحدة وروسيا والدول العربية. فرز وغسيل وتجفيف ومعايرة إلكترونية دقيقة.",
    images: [
      "/images/products/potatoes.jpg",
      "/images/facilities/potatoes-packhouse.jpg",
    ],
  },
  {
    id: "lettuce",
    name: "خس الكابوتشا والخس الروماني",
    category: "خضروات",
    variety: "آيسبيرج (Iceberg)، خس روماني (Romaine)، لولو روسو",
    season: "نوفمبر — مايو",
    pack: "كراتين مموجة 10-12 حبة مغلفة فردياً بأكياس مسامية (Micro-perforated bags)",
    specs: "رؤوس مقرمشة مبردة بتقنية Vacuum Cooling فور الحصاد، أوزان متناسقة 400 - 700 جم",
    imageUrl: "/images/products/lettuce.jpg",
    icon: "🥗",
    status: "متاح للتصدير",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "0705.11.00",
    storageTemp: "1°C — 2°C (رطوبة نسبية 95-98%)",
    shelfLife: "18 — 24 يوماً",
    description: "خس آيسبيرج وروماني عالي القرمشة والامتلاء الداخلي، محصود في الصباح الباكر ويخضع مباشرة لتقنية التبريد بالشفط الفراغي Vacuum Cooling لخفض حرارة اللب في دقائق وحماية الأوراق من التلف وضمان أطول فترة رف في أسواق الاستيراد.",
    images: [
      "/images/products/lettuce.jpg",
      "/images/facilities/vegetable-farms.jpg",
    ],
  },
  {
    id: "red-cabbage",
    name: "الكرنب الأحمر الفاخر",
    category: "خضروات",
    variety: "روبي بول (Ruby Ball)، رودو، روكسي",
    season: "ديسمبر — مايو",
    pack: "أكياس شبك تهوية 10 و 15 كجم، كراتين تبريد تليسكوبيك، صناديق تصدير",
    specs: "لون أرجواني أحمر غامق متألق، أوراق متراصة شديدة الصلابة، أوزان 1 - 2 كجم للحبة، تحمل شحن وتخزين فائق",
    imageUrl: "/images/products/red-cabbage.jpg",
    icon: "🟣",
    status: "متاح للتصدير",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "0704.90.90",
    storageTemp: "0°C — 1°C",
    shelfLife: "6 — 8 أسابيع",
    description: "كرنب أحمر كروي ممتاز ذو لون بنفسجي داكن جذاب وبنية شديدة الكثافة، يمتاز بقدرة فائقة على تحمل فترات الشحن البحري الطويلة والاحتفاظ بالنضارة والقوام الصلب ومحتواه العالي من مضادات الأكسدة الطبيعية.",
    images: [
      "/images/products/red-cabbage.jpg",
      "/images/facilities/cabbage-packing.jpg",
    ],
  },
];

import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config";

function syncLocalInquiry(item: { id?: string; [key: string]: unknown }) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("agriport_ops_inquiries");
    const list = raw ? JSON.parse(raw) : [];
    if (!list.some((existing: { id?: string }) => existing.id === item.id)) {
      const updated = [item, ...list];
      localStorage.setItem("agriport_ops_inquiries", JSON.stringify(updated));
      window.dispatchEvent(new Event("agriport_ops_store_change"));
    }
  } catch {
    // ignore
  }
}

import { trackEvent, upgradeSession, setTag } from "@/lib/clarity";

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

  // Track Smart Event & Upgrade Session Recording in Microsoft Clarity
  try {
    trackEvent("quote_inquiry_submitted");
    upgradeSession("quote_inquiry_lead");
    setTag("lead_product", inquiryData.product || "General Quotation");
    setTag("lead_country", inquiryData.country || "International");
    if (inquiryData.company) {
      setTag("lead_company", inquiryData.company);
    }
  } catch {}

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
