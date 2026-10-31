import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config";

let clientInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!clientInstance) {
    clientInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: typeof window !== "undefined",
        autoRefreshToken: typeof window !== "undefined",
        detectSessionInUrl: typeof window !== "undefined",
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
      },
    });
  }
  return clientInstance;
}

export const supabase = getSupabase();
