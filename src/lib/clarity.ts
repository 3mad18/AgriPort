"use client";

import Clarity from "@microsoft/clarity";

export const CLARITY_PROJECT_ID = "z6bhtb3yil";

let isInitialized = false;

/**
 * 1. Initialize Clarity with Project ID and default consent
 */
export function initClarity(projectId: string = CLARITY_PROJECT_ID) {
  if (typeof window === "undefined" || !projectId) return;
  if (isInitialized) return;

  try {
    Clarity.init(projectId);
    isInitialized = true;

    // Grant default cookie & analytics consent
    Clarity.consentV2({ ad_Storage: "granted", analytics_Storage: "granted" });
  } catch (err) {
    console.error("Clarity init error:", err);
  }
}

/**
 * 2. Identify API: Track user identity across pages
 * Clarity securely hashes the customId on the client before being sent to Clarity servers.
 */
export function identifyUser(
  customId: string,
  customSessionId?: string,
  customPageId?: string,
  friendlyName?: string
) {
  if (typeof window === "undefined" || !customId) return;
  try {
    Clarity.identify(customId, customSessionId, customPageId, friendlyName);
  } catch (err) {
    console.error("Clarity identify error:", err);
  }
}

/**
 * 3. Custom tags API: Set arbitrary session tags (e.g. crop category, language, role)
 */
export function setTag(key: string, value: string | string[]) {
  if (typeof window === "undefined" || !key) return;
  try {
    Clarity.setTag(key, value);
  } catch (err) {
    console.error("Clarity setTag error:", err);
  }
}

/**
 * 4. Custom events API: Track user actions (e.g. quote_requested, whatsapp_clicked)
 */
export function trackEvent(eventName: string) {
  if (typeof window === "undefined" || !eventName) return;
  try {
    Clarity.event(eventName);
  } catch (err) {
    console.error("Clarity event error:", err);
  }
}

/**
 * 5. Upgrade session API: Prioritize session recording for valuable leads/buyers
 */
export function upgradeSession(reason: string) {
  if (typeof window === "undefined" || !reason) return;
  try {
    Clarity.upgrade(reason);
  } catch (err) {
    console.error("Clarity upgrade error:", err);
  }
}

/**
 * 6. Cookie consent API: Configure consent preferences
 */
export function setConsent(granted: boolean = true) {
  if (typeof window === "undefined") return;
  try {
    Clarity.consentV2({
      ad_Storage: granted ? "granted" : "denied",
      analytics_Storage: granted ? "granted" : "denied",
    });
    Clarity.consent(granted);
  } catch (err) {
    console.error("Clarity consent error:", err);
  }
}

export { Clarity };
