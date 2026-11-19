"use client";

import { useEffect, useSyncExternalStore } from "react";
import { DEFAULT_FACILITIES, FacilityItem } from "./facilities";

export const FACILITIES_STORAGE_KEY = "agriport_ops_facilities";
export const FACILITIES_EVENT = "agriport_facilities_change";

let cachedFacilities: FacilityItem[] | null = null;
let cachedRaw: string | null = null;

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(FACILITIES_EVENT, callback);

  let bc: BroadcastChannel | null = null;
  try {
    bc = new BroadcastChannel("agriport_facilities_channel");
    bc.onmessage = () => {
      callback();
    };
  } catch {
    // ignore
  }

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(FACILITIES_EVENT, callback);
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
      localStorage.removeItem(key);
      localStorage.setItem(key, value);
    } catch {}
  }
}

function getSnapshot(): FacilityItem[] {
  if (typeof window === "undefined") {
    return cachedFacilities || DEFAULT_FACILITIES;
  }

  const raw = localStorage.getItem(FACILITIES_STORAGE_KEY);
  if (raw === cachedRaw && cachedFacilities) return cachedFacilities;

  if (!raw) {
    if (cachedFacilities && cachedFacilities.length > 0) return cachedFacilities;
    cachedFacilities = DEFAULT_FACILITIES;
    cachedRaw = JSON.stringify(DEFAULT_FACILITIES);
    safeSetItem(FACILITIES_STORAGE_KEY, cachedRaw);
    return DEFAULT_FACILITIES;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      cachedFacilities = parsed;
      cachedRaw = raw;
      return parsed;
    }
  } catch {}

  cachedFacilities = DEFAULT_FACILITIES;
  return DEFAULT_FACILITIES;
}

export function useLiveFacilities(initialFacilities: FacilityItem[] = DEFAULT_FACILITIES) {
  const facilities = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialFacilities
  );

  // Background fetch from /api/facilities
  useEffect(() => {
    let isMounted = true;
    async function fetchApi() {
      try {
        const res = await fetch("/api/facilities", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.facilities) && isMounted) {
            const raw = JSON.stringify(json.facilities);
            if (raw !== localStorage.getItem(FACILITIES_STORAGE_KEY)) {
              safeSetItem(FACILITIES_STORAGE_KEY, raw);
              cachedFacilities = json.facilities;
              cachedRaw = raw;
              window.dispatchEvent(new Event(FACILITIES_EVENT));
            }
          }
        }
      } catch {}
    }

    fetchApi();
    const interval = setInterval(fetchApi, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { facilities };
}
