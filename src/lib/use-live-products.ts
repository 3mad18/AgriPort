"use client";

import { useEffect, useSyncExternalStore } from "react";
import { EXPORT_CATALOG, ExportProduct } from "./catalog";

const STORAGE_KEY = "agriport_live_products_cache";
const CHANGE_EVENT = "agriport_live_products_change";

let cachedProducts: ExportProduct[] | null = null;
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

function getSnapshot(): ExportProduct[] {
  if (typeof window === "undefined") return EXPORT_CATALOG;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw && cachedProducts) return cachedProducts;
  if (!raw) return EXPORT_CATALOG;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      cachedProducts = parsed;
      cachedRaw = raw;
      return cachedProducts;
    }
    return EXPORT_CATALOG;
  } catch {
    return EXPORT_CATALOG;
  }
}

export function useLiveProducts() {
  const products = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => EXPORT_CATALOG
  );

  useEffect(() => {
    let isMounted = true;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    async function fetchProducts() {
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
            const mapped: ExportProduct[] = data.map((item: any) => ({
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
            }));

            const raw = JSON.stringify(mapped);
            if (raw !== localStorage.getItem(STORAGE_KEY)) {
              localStorage.setItem(STORAGE_KEY, raw);
              cachedProducts = mapped;
              cachedRaw = raw;
              console.log("📦 [AgriPort Live Products] Updated from Supabase:", mapped.map(p => `${p.name} (${p.status})`));
              window.dispatchEvent(new Event(CHANGE_EVENT));
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch live products from Supabase:", err);
      }
    }

    fetchProducts();
    const interval = setInterval(fetchProducts, 3000); // Check every 3 seconds

    const handleFocus = () => fetchProducts();
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  return { products };
}
