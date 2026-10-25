"use client";

import { PageShell } from "@/components/layout/page-shell";
import { useLanguage } from "@/context/language-context";

export default function AboutPage() {
  const { t } = useLanguage();
  const about = t.aboutPage;

  return (
    <PageShell title={about.title} description={about.subtitle}>
      <div className="space-y-8">
        {/* Company Overview Story */}
        <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
          <p className="max-w-4xl text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
            {about.description}
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid gap-6 sm:grid-cols-3">
          {about.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:border-slate-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-2xl">
                {pillar.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 font-medium">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
