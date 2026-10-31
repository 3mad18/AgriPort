"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { TrafficTracker } from "@/components/layout/traffic-tracker";
import { LanguageProvider } from "@/context/language-context";
import { VisitorAuthProvider } from "@/context/visitor-auth-context";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOpsRoute =
    pathname?.startsWith("/ops") || pathname?.startsWith("/secure-login");

  if (isOpsRoute) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <VisitorAuthProvider>
        <TrafficTracker />
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </VisitorAuthProvider>
    </LanguageProvider>
  );
}
