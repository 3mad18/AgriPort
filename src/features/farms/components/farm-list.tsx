import { farms } from "../data";

export function FarmList() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {farms.map((farm) => (
        <li
          key={farm.id}
          className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-semibold">{farm.name}</h2>
            <span className="rounded-full bg-emerald-700/10 px-2 py-0.5 text-xs text-emerald-800">
              {farm.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-emerald-950/70">{farm.location}</p>
          <p className="mt-1 text-sm text-emerald-950/70">
            {farm.crop} — {farm.areaFeddan} فدان
          </p>
        </li>
      ))}
    </ul>
  );
}
