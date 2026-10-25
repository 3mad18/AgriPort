/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";

const Snowflake = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" x2="12" y1="2" y2="22" />
    <line x1="12" x2="12" y1="12" y2="22" />
    <path d="m20 16-4-4 4-4" />
    <path d="m4 8 4 4-4 4" />
    <path d="m16 4-4 4-4-4" />
    <path d="m8 20 4-4 4 4" />
  </svg>
);

const Globe = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

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

export function FeatureGrid() {
  const { t, dir } = useLanguage();
  const isRTL = dir === "rtl";
  const bento = t.bento;

  return (
    <section id="products" className="py-24 bg-[#F7F9FC]">
      <div id="capabilities" className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl text-start">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            {bento.title}
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            {bento.subtitle}
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {/* Box 1: Large Product (Span 2 cols, 2 rows) */}
          <Link
            href="/products#citrus"
            className="md:col-span-2 md:row-span-2 bg-white rounded-[2rem] p-1 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute top-8 start-8 z-10 max-w-[70%] text-start">
              <div className="text-emerald-400 font-semibold text-sm mb-2 uppercase tracking-wider">
                {bento.card1Tag}
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-white drop-shadow-md mb-2">
                {bento.card1Title}
              </h3>
              <p className="text-white/90 text-sm drop-shadow font-medium">
                {bento.card1Desc}
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1000&q=80"
              alt="Citrus Exports"
              className="w-full h-full object-cover rounded-[1.8rem] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-1 rounded-[1.8rem] bg-gradient-to-t from-black/60 via-black/20 to-black/60 pointer-events-none" />
          </Link>

          {/* Box 2: Feature (Cold Chain) */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group text-start">
            <div className="w-12 h-12 bg-[#F7F9FC] rounded-xl flex items-center justify-center text-slate-900 mb-6 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
              <Snowflake />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-2">
                {bento.card2Title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {bento.card2Desc}
              </p>
            </div>
          </div>

          {/* Box 3: Product (Potatoes) */}
          <Link
            href="/products#potatoes"
            className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group cursor-pointer"
          >
            <div className="absolute bottom-6 start-6 z-10 text-start">
              <h3 className="text-xl font-bold tracking-tight text-white mb-1 drop-shadow-md">
                {bento.card3Title}
              </h3>
              <p className="text-xs text-white/80 font-medium drop-shadow">
                {bento.card3Desc}
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80"
              alt="Potatoes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
          </Link>

          {/* Box 4: Global Sourcing Map/Feature (Span 2 cols) */}
          <div className="md:col-span-2 bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden relative group text-white text-start">
            <div className="relative z-10 md:w-3/5">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                <Globe />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {bento.card4Title}
              </h3>
              <p className="text-sm text-slate-400 font-medium mb-6 leading-relaxed">
                {bento.card4Desc}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>{bento.card4Cta}</span>
                <ArrowRight isRTL={isRTL} />
              </Link>
            </div>
            {/* Abstract graphic representing global nodes */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
