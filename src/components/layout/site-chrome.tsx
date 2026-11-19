"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { TrafficTracker } from "@/components/layout/traffic-tracker";
import { SeoHeadSync } from "@/components/layout/seo-head-sync";
import { LanguageProvider } from "@/context/language-context";
import { VisitorAuthProvider } from "@/context/visitor-auth-context";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOpsRoute =
    pathname?.startsWith("/ops") || pathname?.startsWith("/secure-login");

  // Keep scroll at top below navbar on page refresh and clean stale anchor hashes
  useEffect(() => {
    if (typeof window === "undefined" || isOpsRoute) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash === "#products") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [pathname, isOpsRoute]);

  if (isOpsRoute) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <VisitorAuthProvider>
        <TrafficTracker />
        <SeoHeadSync />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </VisitorAuthProvider>
    </LanguageProvider>
  );
}
