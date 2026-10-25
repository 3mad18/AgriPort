import { farms } from "@/features/farms/data";
import { irrigationRecords } from "@/features/irrigation/data";

export function DashboardOverview() {
  const activeFarms = farms.filter((farm) => farm.status === "نشطة").length;
  const totalWater = irrigationRecords.reduce(
    (sum, record) => sum + record.waterUsedLiters,
    0,
  );

  const cards = [
    { label: "عدد المزارع", value: String(farms.length) },
    { label: "مزارع نشطة", value: String(activeFarms) },
    {
      label: "استهلاك المياه",
      value: `${totalWater.toLocaleString("ar-EG")} لتر`,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-emerald-950/70">{card.label}</p>
          <p className="mt-2 text-2xl font-bold">{card.value}</p>
        </article>
      ))}
    </div>
  );
}
