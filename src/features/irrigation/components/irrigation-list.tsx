"use client";

import { useLanguage } from "@/context/language-context";

export function IrrigationList() {
  const { t, language } = useLanguage();
  const irrig = t.irrigationPage;

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {irrig.records.map((record) => (
        <li
          key={record.id}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-200 hover:shadow-md"
        >
          <h2 className="text-lg font-bold text-slate-900">{record.farmName}</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            <span className="font-semibold text-slate-700">{irrig.nextIrrigation}</span>{" "}
            {record.nextIrrigation}
          </p>
          <p className="mt-1 text-sm text-emerald-600 font-semibold">
            <span className="text-slate-700">{irrig.waterConsumption}</span>{" "}
            {record.waterUsedLiters.toLocaleString(language === "ar" ? "ar-EG" : "en-US")} {irrig.litersUnit}
          </p>
        </li>
      ))}
    </ul>
  );
}
