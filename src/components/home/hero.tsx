/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";

const ArrowRight = ({ isRTL = false }: { isRTL?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform ${isRTL ? "rotate-180" : ""}`}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export function Hero() {
  const { t, dir } = useLanguage();
  const isRTL = dir === "rtl";

  return (
    <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Pill Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold tracking-wide mb-8 animate-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        {t.hero.pillTag}
      </div>

      {/* Massive Heading */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.25] sm:leading-[1.2] max-w-4xl">
        <span className="block">{t.hero.headlineMain}</span>
        <span className="block text-slate-400 mt-2 sm:mt-3 lg:mt-4">
          {t.hero.headlineSub}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 font-medium leading-relaxed">
        {t.hero.leadParagraph}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto justify-center">
        <Link
          href="/contact"
          className="inline-flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{t.hero.btnPrimary}</span>
          <ArrowRight isRTL={isRTL} />
        </Link>
        <Link
          href="/products"
          className="inline-flex justify-center items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-full text-sm font-semibold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
        >
          {t.hero.btnSecondary}
        </Link>
      </div>

      {/* Sprawling Rounded Image */}
      <div className="w-full relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2000"
          alt="Modern Farm Logistics"
          className="w-full h-[380px] sm:h-[480px] md:h-[600px] object-cover"
        />
        {/* Soft inner glow */}
        <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 rounded-[2rem] pointer-events-none" />
      </div>
    </section>
  );
}
