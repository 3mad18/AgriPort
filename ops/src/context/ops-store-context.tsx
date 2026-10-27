"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { triggerOpsToast } from "@/components/ops-toast";

export type Product = {
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
  featured?: boolean;
};

export type Inquiry = {
  id: string;
  date: string;
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
  status: "جديد" | "قيد المتابعة" | "تم الاتفاق" | "مؤرشف";
  read?: boolean;
  createdAt?: number;
};

export type SiteSettings = {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  exportBannerText: string;
  showExportBanner: boolean;
};

type OpsStoreContextType = {
  products: Product[];
  inquiries: Inquiry[];
  settings: SiteSettings;
  unreadInquiriesCount: number;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "date" | "status" | "read" | "createdAt">) => void;
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  markInquiryRead: (id: string) => void;
  markAllInquiriesRead: () => void;
  deleteInquiry: (id: string) => void;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<{ success: boolean; error?: string }>;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
};

const DEFAULT_PRODUCTS: Product[] = [
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
];

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    date: "2026-10-25",
    name: "Marco Rossi",
    company: "Mediterranea Ortofrutta S.p.A",
    country: "إيطاليا",
    email: "m.rossi@mediterranea-fruit.it",
    phone: "+39 345 8899123",
    product: "برتقال فالنسيا الصيفي",
    quantity: "4 حاويات مبردة (100 طن)",
    incoterms: "CIF",
    destinationPort: "Port of Genoa, Italy",
    message: "نحتاج كاليبر 64 و 72 في كراتين تلسكوبية 15 كجم مع شحن مبرد خلال الأسبوع القادم.",
    status: "جديد",
    read: false,
    createdAt: 1761386400000,
  },
  {
    id: "inq-2",
    date: "2026-10-24",
    name: "Jean Dupont",
    company: "EuroImport Rungis",
    country: "فرنسا",
    email: "j.dupont@rungis-import.fr",
    phone: "+33 6 45 12 78 90",
    product: "فراولة طازجة",
    quantity: "15 طن شحن جوي",
    incoterms: "FOB",
    destinationPort: "Paris CDG Airport",
    message: "مطلوب فحص شهادات متبقيات المبيدات وأسعار FOB مطار القاهرة.",
    status: "قيد المتابعة",
    read: true,
    createdAt: 1761300000000,
  },
  {
    id: "inq-3",
    date: "2026-10-23",
    name: "Carlos Martínez",
    company: "Iberica Fresh Produce SL",
    country: "إسبانيا",
    email: "carlos@ibericafresh.es",
    phone: "+34 612 345 678",
    product: "بصل أحمر إيطالي",
    quantity: "6 حاويات (150 طن)",
    incoterms: "CIF",
    destinationPort: "Port of Valencia",
    message: "أكياس شبكية 25 كجم، أحجام 50/70 مم.",
    status: "تم الاتفاق",
    read: true,
    createdAt: 1761213600000,
  },
];

const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "AgriPort Operations",
  tagline: "منظومة إدارة وتصدير الحاصلات الزراعية والخضروات والفواكه الطازجة",
  email: "ops@agriport.com",
  phone: "+20 100 000 0000",
  location: "جمهورية مصر العربية — محافظة البحيرة / كفر الدوار",
  exportBannerText: "موسم تصدير البرتقال والبصل مفتوح حالياً للشحن الفوري إلى أوروبا ودول الخليج!",
  showExportBanner: true,
};

const PRODUCTS_KEY = "agriport_ops_products";
const INQUIRIES_KEY = "agriport_ops_inquiries";
const SETTINGS_KEY = "agriport_ops_settings";
const STORE_EVENT = "agriport_ops_store_change";

function subscribeStore(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORE_EVENT, callback);
  };
}

let cachedProducts: Product[] | null = null;
let cachedProductsRaw: string | null = null;

function getProductsSnapshot(): Product[] {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (raw === cachedProductsRaw && cachedProducts) return cachedProducts;
  if (!raw) return DEFAULT_PRODUCTS;
  try {
    cachedProducts = JSON.parse(raw);
    cachedProductsRaw = raw;
    return cachedProducts!;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

let cachedInquiries: Inquiry[] | null = null;
let cachedInquiriesRaw: string | null = null;

function getInquiriesSnapshot(): Inquiry[] {
  if (typeof window === "undefined") return DEFAULT_INQUIRIES;
  const raw = localStorage.getItem(INQUIRIES_KEY);
  if (raw === cachedInquiriesRaw && cachedInquiries) return cachedInquiries;
  if (!raw) return DEFAULT_INQUIRIES;
  try {
    cachedInquiries = JSON.parse(raw);
    cachedInquiriesRaw = raw;
    return cachedInquiries!;
  } catch {
    return DEFAULT_INQUIRIES;
  }
}

let cachedSettings: SiteSettings | null = null;
let cachedSettingsRaw: string | null = null;

function getSettingsSnapshot(): SiteSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (raw === cachedSettingsRaw && cachedSettings) return cachedSettings;
  if (!raw) return DEFAULT_SETTINGS;
  try {
    cachedSettings = JSON.parse(raw);
    cachedSettingsRaw = raw;
    return cachedSettings!;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

const OpsStoreContext = createContext<OpsStoreContextType | undefined>(undefined);

export function OpsStoreProvider({ children }: { children: ReactNode }) {
  const products = useSyncExternalStore(
    subscribeStore,
    getProductsSnapshot,
    () => DEFAULT_PRODUCTS,
  );

  const inquiries = useSyncExternalStore(
    subscribeStore,
    getInquiriesSnapshot,
    () => DEFAULT_INQUIRIES,
  );

  const settings = useSyncExternalStore(
    subscribeStore,
    getSettingsSnapshot,
    () => DEFAULT_SETTINGS,
  );

  const notifyChange = () => {
    window.dispatchEvent(new Event(STORE_EVENT));
  };

  // 1. Cloud Sync: Automatically fetch & listen for inquiries from Supabase
  useEffect(() => {
    let isMounted = true;

    async function syncInquiriesFromCloud() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      console.log("🔄 [AgriPort Ops] Cloud sync triggered...", {
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasSupabaseKey: Boolean(supabaseKey),
      });

      let cloudList: Inquiry[] | null = null;

      // 1. Try direct Supabase query if credentials in browser
      if (supabaseUrl && supabaseKey) {
        try {
          const sbRes = await fetch(`${supabaseUrl}/rest/v1/inquiries?select=*&order=created_at.desc`, {
            method: "GET",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
            cache: "no-store",
          });

          if (sbRes.ok) {
            const rawData = await sbRes.json();
            console.log(`✅ [AgriPort Ops] Direct Supabase fetch success (${rawData.length} inquiries found):`, rawData);
            cloudList = rawData.map((item: any) => ({
              id: item.id,
              date: item.date,
              name: item.name,
              company: item.company || "",
              country: item.country || "",
              email: item.email,
              phone: item.phone || "",
              product: item.product,
              quantity: item.quantity || "",
              incoterms: item.incoterms || "FOB",
              destinationPort: item.destination_port || item.destinationPort || "",
              message: item.message || "",
              status: item.status || "جديد",
              read: item.read ?? false,
              createdAt: item.created_at ? new Date(item.created_at).getTime() : Date.now(),
            }));
          } else {
            console.error("❌ [AgriPort Ops] Direct Supabase fetch failed:", sbRes.status, await sbRes.text());
          }
        } catch (sbErr) {
          console.error("❌ [AgriPort Ops] Direct Supabase connection error:", sbErr);
        }
      } else {
        console.warn("⚠️ [AgriPort Ops] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set in Ops environment!");
      }

      // 2. Fallback to /api/inquiries if direct fetch was not used or failed
      if (!cloudList) {
        try {
          const res = await fetch("/api/inquiries", { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.inquiries)) {
              console.log(`📡 [AgriPort Ops] /api/inquiries returned ${data.inquiries.length} inquiries`);
              cloudList = data.inquiries;
            }
          }
        } catch (err) {
          console.warn("⚠️ [AgriPort Ops] /api/inquiries fallback unreachable:", err);
        }
      }

      // 3. Merge into store
      if (cloudList && isMounted) {
        const local = getInquiriesSnapshot();
        const localIds = new Set(local.map((i) => i.id));
        const hasNew = cloudList.some((item: Inquiry) => !localIds.has(item.id));

        const cloudIds = new Set(cloudList.map((i: any) => i.id));
        const merged = [...cloudList];
        local.forEach((loc) => {
          if (!cloudIds.has(loc.id) && !loc.id.startsWith("demo-")) {
            merged.push(loc);
          }
        });

        merged.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(merged));
        cachedInquiries = merged;
        cachedInquiriesRaw = JSON.stringify(merged);
        notifyChange();

        if (hasNew && typeof window !== "undefined") {
          const newest = cloudList[0];
          console.log("🔔 [AgriPort Ops] New incoming inquiry detected:", newest);
          window.dispatchEvent(
            new CustomEvent("agriport_new_inquiry_event", { detail: newest })
          );
        }
      }
    }

    async function syncProductsFromCloud() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) return;
      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/products?select=*&order=sort_order.asc,created_at.asc`,
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
            const mapped: Product[] = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              category: item.category,
              variety: item.variety,
              season: item.season,
              pack: item.pack,
              specs: item.specs,
              imageUrl: item.image_url || item.imageUrl,
              icon: item.icon || "🌿",
              status: item.status || "متاح للتصدير",
              featured: item.featured ?? false,
            }));
            localStorage.setItem(PRODUCTS_KEY, JSON.stringify(mapped));
            cachedProducts = mapped;
            cachedProductsRaw = JSON.stringify(mapped);
            notifyChange();
          }
        }
      } catch (err) {
        // Silently skip if network offline
      }
    }

    async function syncSettingsFromCloud() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseKey) return;
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/site_settings?limit=1`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            const row = data[0];
            const mapped: SiteSettings = {
              companyName: row.company_name || DEFAULT_SETTINGS.companyName,
              tagline: row.tagline || DEFAULT_SETTINGS.tagline,
              email: row.email || DEFAULT_SETTINGS.email,
              phone: row.phone || DEFAULT_SETTINGS.phone,
              location: row.location || DEFAULT_SETTINGS.location,
              exportBannerText: row.export_banner_text || DEFAULT_SETTINGS.exportBannerText,
              showExportBanner: row.show_export_banner ?? true,
            };
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(mapped));
            cachedSettings = mapped;
            cachedSettingsRaw = JSON.stringify(mapped);
            notifyChange();
          }
        }
      } catch (err) {
        // ignore
      }
    }

    // Initial fetch
    syncInquiriesFromCloud();
    syncProductsFromCloud();
    syncSettingsFromCloud();

    // Poll every 15s
    const timer = setInterval(() => {
      syncInquiriesFromCloud();
      syncProductsFromCloud();
      syncSettingsFromCloud();
    }, 15000);

    // Sync on tab focus / visibility
    const handleFocus = () => {
      syncInquiriesFromCloud();
      syncProductsFromCloud();
      syncSettingsFromCloud();
    };
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      isMounted = false;
      clearInterval(timer);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  const addProduct = useCallback(
    async (item: Omit<Product, "id">) => {
      const current = getProductsSnapshot();
      const newProduct: Product = {
        ...item,
        id: "prod-" + Date.now(),
      };
      const updated = [newProduct, ...current];
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      cachedProducts = updated;
      cachedProductsRaw = JSON.stringify(updated);
      notifyChange();
      triggerOpsToast(`تمت إضافة منتج "${newProduct.name}" بنجاح! 🌿`);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        try {
          await fetch(`${supabaseUrl}/rest/v1/products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              id: newProduct.id,
              name: newProduct.name,
              category: newProduct.category,
              variety: newProduct.variety,
              season: newProduct.season,
              pack: newProduct.pack,
              specs: newProduct.specs,
              image_url: newProduct.imageUrl,
              icon: newProduct.icon || "🌿",
              status: newProduct.status,
              featured: newProduct.featured ?? false,
              sort_order: 0,
            }),
          });
        } catch (e) {
          console.error("Failed to push product to Supabase:", e);
        }
      }
    },
    [],
  );

  const updateProduct = useCallback(
    async (id: string, partial: Partial<Product>) => {
      const current = getProductsSnapshot();
      const updated = current.map((p) =>
        p.id === id ? { ...p, ...partial } : p,
      );
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      cachedProducts = updated;
      cachedProductsRaw = JSON.stringify(updated);
      notifyChange();
      triggerOpsToast("تم حفظ وتحديث بيانات المنتج بنجاح! ✏️");

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        try {
          const payload: Record<string, any> = {};
          if (partial.name !== undefined) payload.name = partial.name;
          if (partial.category !== undefined) payload.category = partial.category;
          if (partial.variety !== undefined) payload.variety = partial.variety;
          if (partial.season !== undefined) payload.season = partial.season;
          if (partial.pack !== undefined) payload.pack = partial.pack;
          if (partial.specs !== undefined) payload.specs = partial.specs;
          if (partial.imageUrl !== undefined) payload.image_url = partial.imageUrl;
          if (partial.icon !== undefined) payload.icon = partial.icon;
          if (partial.status !== undefined) payload.status = partial.status;
          if (partial.featured !== undefined) payload.featured = partial.featured;

          await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify(payload),
          });
        } catch (e) {
          console.error("Failed to patch product in Supabase:", e);
        }
      }
    },
    [],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      const current = getProductsSnapshot();
      const updated = current.filter((p) => p.id !== id);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      cachedProducts = updated;
      cachedProductsRaw = JSON.stringify(updated);
      notifyChange();
      triggerOpsToast("تم حذف المنتج من الكتالوج بنجاح 🗑️");

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        try {
          await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          });
        } catch (e) {
          console.error("Failed to delete product in Supabase:", e);
        }
      }
    },
    [],
  );

  const addInquiry = useCallback(
    (data: Omit<Inquiry, "id" | "date" | "status" | "read" | "createdAt">) => {
      const current = getInquiriesSnapshot();
      const newInquiry: Inquiry = {
        ...data,
        id: "inq-" + Date.now(),
        date: new Date().toISOString().split("T")[0],
        status: "جديد",
        read: false,
        createdAt: Date.now(),
      };
      const updated = [newInquiry, ...current];
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
      cachedInquiries = updated;
      cachedInquiriesRaw = JSON.stringify(updated);
      notifyChange();
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("agriport_new_inquiry_event", { detail: newInquiry })
        );
      }

      // Sync to cloud
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInquiry),
      }).catch(() => {});
    },
    [],
  );

  const markInquiryRead = useCallback((id: string) => {
    const current = getInquiriesSnapshot();
    const updated = current.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    cachedInquiries = updated;
    cachedInquiriesRaw = JSON.stringify(updated);
    notifyChange();

    fetch("/api/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    }).catch(() => {});
  }, []);

  const markAllInquiriesRead = useCallback(() => {
    const current = getInquiriesSnapshot();
    const updated = current.map((item) => ({ ...item, read: true }));
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    cachedInquiries = updated;
    cachedInquiriesRaw = JSON.stringify(updated);
    notifyChange();
    triggerOpsToast("تم تمييز جميع الطلبات كمقروءة ✓");
  }, []);

  const updateInquiryStatus = useCallback(
    (id: string, status: Inquiry["status"]) => {
      const current = getInquiriesSnapshot();
      const updated = current.map((item) =>
        item.id === id ? { ...item, status, read: true } : item,
      );
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
      cachedInquiries = updated;
      cachedInquiriesRaw = JSON.stringify(updated);
      notifyChange();
      triggerOpsToast(`تم تحديث حالة الطلب إلى "${status}" 📋`);

      fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, read: true }),
      }).catch(() => {});
    },
    [],
  );

  const deleteInquiry = useCallback(
    (id: string) => {
      const current = getInquiriesSnapshot();
      const updated = current.filter((item) => item.id !== id);
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
      cachedInquiries = updated;
      cachedInquiriesRaw = JSON.stringify(updated);
      notifyChange();
      triggerOpsToast("تم حذف الطلب بنجاح 🗑️");

      fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      }).catch(() => {});
    },
    [],
  );

  const updateSettings = useCallback(
    async (partial: Partial<SiteSettings>): Promise<{ success: boolean; error?: string }> => {
      const current = getSettingsSnapshot();
      const updated = { ...current, ...partial };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      cachedSettings = updated;
      cachedSettingsRaw = JSON.stringify(updated);
      notifyChange();

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        try {
          const res = await fetch(`${supabaseUrl}/rest/v1/site_settings`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              Prefer: "resolution=merge-duplicates,return=representation",
            },
            body: JSON.stringify({
              id: "main",
              company_name: updated.companyName,
              tagline: updated.tagline,
              email: updated.email,
              phone: updated.phone,
              location: updated.location,
              export_banner_text: updated.exportBannerText,
              show_export_banner: updated.showExportBanner,
              updated_at: new Date().toISOString(),
            }),
          });

          if (!res.ok) {
            const errText = await res.text();
            console.error("❌ [AgriPort Ops] Failed to update site_settings in Supabase:", res.status, errText);
            let userFriendly = `خطأ في حفظ الإعدادات في Supabase (${res.status})`;
            if (res.status === 404 || errText.includes("schema cache")) {
              userFriendly = "جدول site_settings غير موجود بعد في Supabase. يرجى تشغيل كود SQL في Supabase SQL Editor أولاً لتفعيله.";
            }
            return {
              success: false,
              error: userFriendly,
            };
          }

          console.log("✅ [AgriPort Ops] site_settings successfully synced to Supabase:", updated);
          triggerOpsToast("تم حفظ ونشر إعدادات الموقع بنجاح! ✨");
          return { success: true };
        } catch (e: any) {
          console.error("Failed to update site_settings in Supabase:", e);
          triggerOpsToast("تعذر الحفظ في السحابة", "error");
          return {
            success: false,
            error: e?.message || "خطأ أثناء محاولة الاتصال بـ Supabase",
          };
        }
      }
      triggerOpsToast("تم حفظ إعدادات الموقع محلياً بنجاح! ✨");
      return { success: true };
    },
    [],
  );

  const unreadInquiriesCount = inquiries.filter(
    (item) => item.read === false || item.status === "جديد"
  ).length;

  return (
    <OpsStoreContext.Provider
      value={{
        products,
        inquiries,
        settings,
        unreadInquiriesCount,
        addProduct,
        updateProduct,
        deleteProduct,
        addInquiry,
        updateInquiryStatus,
        markInquiryRead,
        markAllInquiriesRead,
        deleteInquiry,
        updateSettings,
        showToast: triggerOpsToast,
      }}
    >
      {children}
    </OpsStoreContext.Provider>
  );
}

export function useOpsStore() {
  const context = useContext(OpsStoreContext);
  if (!context) {
    throw new Error("useOpsStore must be used within an OpsStoreProvider");
  }
  return context;
}
