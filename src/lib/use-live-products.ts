"use client";

import { useEffect, useSyncExternalStore } from "react";
import { EXPORT_CATALOG, ExportProduct } from "./catalog";
import { unpackProductRow } from "./product-packer";
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

  let bc: BroadcastChannel | null = null;
  try {
    bc = new BroadcastChannel("agriport_products_channel");
    bc.onmessage = () => {
      callback();
    };
  } catch {
    // BroadcastChannel not supported in older browsers
  }

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PRODUCTS_EVENT, callback);
    window.removeEventListener(OPS_STORE_EVENT, callback);
    if (bc) {
      bc.close();
    }
  };
}

function safeSetItem(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    try {
      localStorage.removeItem("agriport_live_products_cache_v2");
      localStorage.removeItem("agriport_live_settings_cache_v2");
      localStorage.removeItem(key);
      localStorage.setItem(key, value);
    } catch {
      try {
        localStorage.removeItem(key);
      } catch {}
    }
  }
}

function getSnapshot(): ExportProduct[] {
  if (typeof window === "undefined") {
    return cachedProducts || EXPORT_CATALOG;
  }

  const raw =
    localStorage.getItem(PRODUCTS_KEY) ||
    localStorage.getItem(PRODUCTS_CACHE_KEY);

  if (raw === cachedRaw && cachedProducts) return cachedProducts;
  if (!raw) {
    if (cachedProducts && cachedProducts.length > 0) return cachedProducts;
    cachedProducts = EXPORT_CATALOG;
    cachedRaw = JSON.stringify(EXPORT_CATALOG);
    safeSetItem(PRODUCTS_KEY, cachedRaw);
    return EXPORT_CATALOG;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      cachedProducts = parsed;
      cachedRaw = raw;
      return cachedProducts;
    }

    return cachedProducts || EXPORT_CATALOG;
  } catch {
    return cachedProducts || EXPORT_CATALOG;
  }
}

export function useLiveProducts(initialProducts?: ExportProduct[]) {
  // Only use initialProducts to prime the store if localStorage and cachedProducts have nothing yet
  if (initialProducts && Array.isArray(initialProducts) && initialProducts.length > 0) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (!stored && !cachedProducts) {
        const serialized = JSON.stringify(initialProducts);
        cachedProducts = initialProducts;
        cachedRaw = serialized;
        safeSetItem(PRODUCTS_KEY, serialized);
      }
    }
  }

  const products = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => (initialProducts && initialProducts.length > 0 ? initialProducts : (cachedProducts || EXPORT_CATALOG))
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      let remoteList: ExportProduct[] | null = null;

      // 1. Try internal Next.js API route first with cache-busting timestamp
      try {
        const apiRes = await fetch("/api/products?t=" + Date.now(), { cache: "no-store" });
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData.success && Array.isArray(apiData.products) && apiData.products.length > 0) {
            remoteList = apiData.products;
          }
        }
      } catch {
        // fallback to direct Supabase fetch
      }

      // 2. Direct Supabase fetch if API route didn't return list
      if (!remoteList) {
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
            if (Array.isArray(data) && data.length > 0) {
              remoteList = data.map(unpackProductRow);
            }
          }
        } catch {
          // offline
        }
      }

      // 3. Adopt remote data and sync to store
      if (remoteList && remoteList.length > 0 && isMounted) {
        const catalogMap = new Map(EXPORT_CATALOG.map((c) => [c.id, c]));

        const mapped: ExportProduct[] = remoteList.map((item: any) => {
          const base = catalogMap.get(item.id);
          const hasExplicitImages = Array.isArray(item.images);
          const imagesList = hasExplicitImages
            ? item.images
            : (item.imageUrl ? [item.imageUrl] : (base?.images || []));

          let primaryImage = "";
          if (hasExplicitImages) {
            primaryImage = (item.imageUrl && imagesList.includes(item.imageUrl))
              ? item.imageUrl
              : (imagesList.length > 0 ? imagesList[0] : "");
          } else if (item.imageUrl !== undefined && item.imageUrl !== null && item.imageUrl !== "") {
            primaryImage = item.imageUrl;
          } else if (item.imageUrl === "") {
            primaryImage = "";
          } else {
            primaryImage = base?.imageUrl || "";
          }

          return {
            id: item.id,
            name: item.name || base?.name || "",
            category: item.category || base?.category || "خضروات",
            variety: item.variety || base?.variety || "",
            season: item.season || base?.season || "",
            pack: item.pack || base?.pack || "",
            specs: item.specs || base?.specs || "",
            imageUrl: primaryImage,
            icon: item.icon || base?.icon || "🌿",
            status: item.status || base?.status || "متاح للتصدير",
            featured: item.featured ?? base?.featured ?? false,
            description: item.description !== undefined ? item.description : (base?.description || ""),
            images: imagesList,
            pdfUrl: item.pdfUrl !== undefined ? item.pdfUrl : (base?.pdfUrl || ""),
            pdfName: item.pdfName !== undefined ? item.pdfName : (base?.pdfName || ""),
            origin: item.origin || base?.origin || "جمهورية مصر العربية (Egypt)",
            hsCode: item.hsCode || base?.hsCode || "",
            storageTemp: item.storageTemp || base?.storageTemp || "",
            shelfLife: item.shelfLife || base?.shelfLife || "",
          };
        });

        const raw = JSON.stringify(mapped);
        if (raw !== localStorage.getItem(PRODUCTS_KEY) || raw !== cachedRaw) {
          safeSetItem(PRODUCTS_KEY, raw);
          cachedProducts = mapped;
          cachedRaw = raw;
          window.dispatchEvent(new Event(PRODUCTS_EVENT));
          window.dispatchEvent(new Event(OPS_STORE_EVENT));
        }
      }
    }

    fetchProducts();
    const interval = setInterval(fetchProducts, 15000);

    const handleFocus = () => fetchProducts();
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("agriport_products_channel");
      bc.onmessage = () => {
        fetchProducts();
      };
    } catch {}

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
      if (bc) bc.close();
    };
  }, []);

  return { products };
}
