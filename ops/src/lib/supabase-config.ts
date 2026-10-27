/**
 * AgriPort Centralized Supabase Configuration
 * Provides reliable fallback credentials so both production (Vercel) and development
 * always connect to Supabase Cloud even if dashboard environment variables are pending.
 */

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://gwdyyuezddpbgmmdwiey.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_QAd4C2O8gHk56Uj0SyxCYg_DXS9MyE9";

export const SETTINGS_KEY = "agriport_ops_settings";
export const SETTINGS_CACHE_KEY = "agriport_live_settings_cache";
export const SETTINGS_EVENT = "agriport_live_settings_change";
export const OPS_STORE_EVENT = "agriport_ops_store_change";

export const PRODUCTS_KEY = "agriport_ops_products";
export const PRODUCTS_CACHE_KEY = "agriport_live_products_cache";
export const PRODUCTS_EVENT = "agriport_live_products_change";

export function getSupabaseHeaders(extra?: Record<string, string>) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...extra,
  };
}
