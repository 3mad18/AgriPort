"use client";

import { PageShell } from "@/components/layout/page-shell";
import { IrrigationList } from "@/features/irrigation/components/irrigation-list";
import { useLanguage } from "@/context/language-context";

export default function IrrigationPage() {
  const { t } = useLanguage();
  const irrig = t.irrigationPage;

  return (
    <PageShell title={irrig.title} description={irrig.description}>
      <IrrigationList />
    </PageShell>
  );
}
