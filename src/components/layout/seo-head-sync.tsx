"use client";

import { useEffect } from "react";
import { useSiteSettings } from "@/lib/use-site-settings";

/**
 * Dynamically keeps the client document's meta tags in sync with
 * custom SEO settings configured in the AgriPort Operations dashboard.
 */
export function SeoHeadSync() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (typeof document === "undefined") return;

    // 1. Meta Description
    if (settings.seoDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", settings.seoDescription);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", settings.seoDescription);
      }
    }

    // 2. Meta Keywords
    if (settings.seoKeywords && Array.isArray(settings.seoKeywords) && settings.seoKeywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", settings.seoKeywords.join(", "));
    }

    // 3. Google Site Verification
    if (settings.googleVerificationId && settings.googleVerificationId.trim()) {
      let metaVerify = document.querySelector('meta[name="google-site-verification"]');
      if (!metaVerify) {
        metaVerify = document.createElement("meta");
        metaVerify.setAttribute("name", "google-site-verification");
        document.head.appendChild(metaVerify);
      }
      metaVerify.setAttribute("content", settings.googleVerificationId.trim());
    }
  }, [
    settings.seoTitle,
    settings.seoDescription,
    settings.seoKeywords,
    settings.googleVerificationId,
  ]);

  return null;
}
