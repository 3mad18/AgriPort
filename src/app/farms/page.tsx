"use client";

import { PageShell } from "@/components/layout/page-shell";
import { FarmList } from "@/features/farms/components/farm-list";
import { useLanguage } from "@/context/language-context";

export default function FarmsPage() {
  const { t } = useLanguage();
  const farms = t.farmsPage;

  return (
    <PageShell title={farms.title} description={farms.description}>
      <FarmList />
    </PageShell>
  );
}
