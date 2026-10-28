"use client";

import { useLanguage } from "@/context/language-context";

export function FarmList() {
  const { t } = useLanguage();
  const f = t.farmsPage;

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {f.farmsList.map((farm) => (
        <li
          key={farm.id}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-200 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">{farm.name}</h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
              {farm.status === f.activeStatus ||
              ["Active", "نشطة", "Attiva", "Activa"].includes(farm.status)
                ? f.activeStatus
                : f.monitoringStatus}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500 font-medium">{farm.location}</p>
          <p className="mt-2 text-sm font-semibold text-emerald-600">
            {farm.crop} — {farm.areaFeddan} {f.feddanUnit}
          </p>
        </li>
      ))}
    </ul>
  );
}
