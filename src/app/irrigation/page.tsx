import { PageShell } from "@/components/layout/page-shell";
import { IrrigationList } from "@/features/irrigation/components/irrigation-list";

export default function IrrigationPage() {
  return (
    <PageShell
      title="الري"
      description="مواعيد الري واستهلاك المياه لكل مزرعة. هذه بيانات أولية للبدء."
    >
      <IrrigationList />
    </PageShell>
  );
}
