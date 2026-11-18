import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config";
import { unpackProductRow } from "./product-packer";
import { EXPORT_CATALOG, type ExportProduct } from "./catalog";

/**
 * Server-side loader that fetches live products directly from Supabase Cloud
 * with no-store cache to guarantee fresh real-time data across SSR and client navigations.
 */
export async function getLiveProductsServer(): Promise<ExportProduct[]> {
  const url = SUPABASE_URL;
  const key = SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      const res = await fetch(
        `${url}/rest/v1/products?select=*&order=sort_order.asc,created_at.asc`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
          cache: "no-store",
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(unpackProductRow);
        }
      }
    } catch (err) {
      console.warn("⚠️ [getLiveProductsServer] Failed to fetch products from Supabase:", err);
    }
  }

  return EXPORT_CATALOG;
}
