"use client";

import { useEffect, useSyncExternalStore } from "react";
import { EXPORT_CATALOG, ExportProduct } from "./catalog";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  PRODUCTS_KEY,
  PRODUCTS_CACHE_KEY,
  PRODUCTS_EVENT,
  OPS_STORE_EVENT,
} from "./supabase-config";

let cachedProducts: ExportProduct[] | null = null;
let cachedRaw: string | null = null;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(PRODUCTS_EVENT, callback);
  window.addEventListener(OPS_STORE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PRODUCTS_EVENT, callback);
    window.removeEventListener(OPS_STORE_EVENT, callback);
  };
}

function getSnapshot(): ExportProduct[] {
  if (typeof window === "undefined") return EXPORT_CATALOG;

  // Clean up legacy unversioned storage caches
  try {
    localStorage.removeItem("agriport_ops_products");
    localStorage.removeItem("agriport_live_products_cache");
  } catch {
    // ignore
  }

  const raw =
    localStorage.getItem(PRODUCTS_KEY) ||
    localStorage.getItem(PRODUCTS_CACHE_KEY);

  if (raw === cachedRaw && cachedProducts) return cachedProducts;
  if (!raw) {
    cachedProducts = EXPORT_CATALOG;
    cachedRaw = JSON.stringify(EXPORT_CATALOG);
    try {
      localStorage.setItem(PRODUCTS_KEY, cachedRaw);
      localStorage.setItem(PRODUCTS_CACHE_KEY, cachedRaw);
    } catch {
      // ignore
    }
    return EXPORT_CATALOG;
  }

  try {
    const parsed = JSON.parse(raw);
    const isValid =
      Array.isArray(parsed) &&
      parsed.length >= 8 &&
      parsed.some((p: { id?: string }) => p.id === "green-beans") &&
      parsed.some((p: { id?: string }) => p.id === "broccoli") &&
      !parsed.some((p: { id?: string }) => p.id === "citrus");

    if (isValid) {
      cachedProducts = parsed;
      cachedRaw = raw;
      return cachedProducts;
    }

    // Cache is obsolete, overwrite with current EXPORT_CATALOG
    cachedProducts = EXPORT_CATALOG;
    cachedRaw = JSON.stringify(EXPORT_CATALOG);
    try {
      localStorage.setItem(PRODUCTS_KEY, cachedRaw);
      localStorage.setItem(PRODUCTS_CACHE_KEY, cachedRaw);
    } catch {
      // ignore
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

    async function fetchProducts() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/products?select=*&order=sort_order.asc,created_at.asc`,
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
          // Only adopt remote data if it matches the current updated crops (contains green-beans & broccoli and not citrus)
          const isRemoteUpdated =
            Array.isArray(data) &&
            data.length >= 8 &&
            data.some((item: { id?: string }) => item.id === "green-beans") &&
            !data.some((item: { id?: string }) => item.id === "citrus");

          if (isRemoteUpdated && isMounted) {
            const mapped: ExportProduct[] = data.map((item: {
              id: string;
              name: string;
              category: "موالح" | "خضروات" | "فواكه" | "أخرى";
              variety: string;
              season: string;
              pack: string;
              specs: string;
              image_url?: string;
              imageUrl?: string;
              icon?: string;
              status?: "متاح للتصدير" | "موسم قادم" | "نفد مؤقتاً";
            }) => ({
              id: item.id,
              name: item.name,
              category: item.category,
              variety: item.variety,
              season: item.season,
              pack: item.pack,
              specs: item.specs,
              imageUrl: item.image_url || item.imageUrl || "/images/products/artichoke.jpg",
              icon: item.icon || "🌿",
              status: item.status || "متاح للتصدير",
            }));

            const raw = JSON.stringify(mapped);
            if (raw !== localStorage.getItem(PRODUCTS_KEY)) {
              localStorage.setItem(PRODUCTS_KEY, raw);
              localStorage.setItem(PRODUCTS_CACHE_KEY, raw);
              cachedProducts = mapped;
              cachedRaw = raw;
              window.dispatchEvent(new Event(PRODUCTS_EVENT));
              window.dispatchEvent(new Event(OPS_STORE_EVENT));
            }
          }
        }
      } catch {
        // silent
      }
    }

    fetchProducts();
    const interval = setInterval(fetchProducts, 2500);

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
