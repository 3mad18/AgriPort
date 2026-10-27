"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { LanguageProvider } from "@/context/language-context";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOpsRoute =
    pathname?.startsWith("/ops") || pathname?.startsWith("/secure-login");

  if (isOpsRoute) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </LanguageProvider>
  );
}
