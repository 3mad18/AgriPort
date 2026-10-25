"use client";

import { useLanguage } from "@/context/language-context";

export function TrustStrip() {
  const { t } = useLanguage();

  return (
    <section className="py-12 border-b border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
          {t.trust.standards}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14 md:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-300">
          <div className="text-2xl font-bold font-serif tracking-tighter text-slate-900">
            GLOBALG.A.P.
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            ISO<span className="font-light">22000</span>
          </div>
          <div className="text-2xl font-bold tracking-tighter text-slate-900">
            BRCGS
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            FDA
            <span className="font-light text-sm align-top">Reg</span>
          </div>
        </div>
      </div>
    </section>
  );
}
