"use client";

import { PageShell } from "@/components/layout/page-shell";
import { AccountDashboard, accountTranslations } from "@/components/account/account-dashboard";
import { useLanguage } from "@/context/language-context";

export default function AccountPage() {
  const { language } = useLanguage();
  const tr = accountTranslations[language] || accountTranslations.en;

  return (
    <PageShell title={tr.title} description={tr.description}>
      <AccountDashboard />
    </PageShell>
  );
}
