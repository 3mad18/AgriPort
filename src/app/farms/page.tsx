import { PageShell } from "@/components/layout/page-shell";
import { FarmList } from "@/features/farms/components/farm-list";

export default function FarmsPage() {
  return (
    <PageShell
      title="المزارع"
      description="قائمة تجريبية للمزارع. أضف مزارعك الحقيقية داخل features/farms."
    >
      <FarmList />
    </PageShell>
  );
}
