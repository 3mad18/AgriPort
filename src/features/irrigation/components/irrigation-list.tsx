import { irrigationRecords } from "../data";

export function IrrigationList() {
  return (
    <ul className="grid gap-4">
      {irrigationRecords.map((record) => (
        <li
          key={record.id}
          className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm"
        >
          <h2 className="font-semibold">{record.farmName}</h2>
          <p className="mt-2 text-sm text-emerald-950/70">
            الري القادم: {record.nextIrrigation}
          </p>
          <p className="mt-1 text-sm text-emerald-950/70">
            استهلاك المياه: {record.waterUsedLiters.toLocaleString("ar-EG")} لتر
          </p>
        </li>
      ))}
    </ul>
  );
}
