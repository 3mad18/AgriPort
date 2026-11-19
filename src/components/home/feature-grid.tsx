/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { useLiveFacilities } from "@/lib/use-live-facilities";
import {
  Snowflake,
  Globe,
  ArrowRight as LucideArrowRight,
  Zap,
  Truck,
  Activity,
} from "lucide-react";

const ArrowRight = ({ isRTL = false }: { isRTL?: boolean }) => (
  <LucideArrowRight
    className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180" : ""}`}
  />
);

export function FeatureGrid() {
  const { t, dir } = useLanguage();
  const isRTL = dir === "rtl";
  const bento = t.bento;
  const { facilities: liveFacilities } = useLiveFacilities();
  const coldChainImg =
    liveFacilities.find((f) => f.category === "coldchain" && f.image)?.image ||
    liveFacilities.find((f) => !!f.image)?.image ||
    "";

  return (
    <section id="featured-crops" className="py-16 sm:py-24 bg-[#F7F9FC]">
      <div id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16 max-w-2xl text-start">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3 sm:mb-4">
            {bento.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium leading-relaxed">
            {bento.subtitle}
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:auto-rows-[320px]">
          {/* Box 1: Large Product (Span 2 cols, 2 rows - Egyptian Artichoke) */}
          <Link
            href="/products#artichoke"
            className="md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0 bg-white rounded-2xl sm:rounded-[2rem] p-1 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute top-6 start-6 sm:top-8 sm:start-8 z-10 max-w-[85%] sm:max-w-[70%] text-start">
              <div className="text-emerald-400 font-semibold text-xs sm:text-sm mb-1 sm:mb-2 uppercase tracking-wider">
                {bento.card1Tag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md mb-2">
                {bento.card1Title}
              </h3>
              <p className="text-white/90 text-xs sm:text-sm drop-shadow font-medium leading-relaxed">
                {bento.card1Desc}
              </p>
            </div>
            <img
              src="/images/products/artichoke.jpg"
              alt="Egyptian Artichoke Exports"
              className="w-full h-full min-h-[300px] md:min-h-0 object-cover rounded-[1.3rem] sm:rounded-[1.8rem] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-1 rounded-[1.3rem] sm:rounded-[1.8rem] bg-gradient-to-t from-black/60 via-black/20 to-black/60 pointer-events-none" />
          </Link>

          {/* Box 2: Feature (Cold Chain) */}
          <Link
            href="/facilities#cold-chain-pre-cooling"
            className="bg-slate-950 rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 border border-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-start min-h-[300px] md:min-h-0 relative overflow-hidden cursor-pointer"
          >
            {/* Expressive Cold Chain Facility Image */}
            {coldChainImg ? (
              <img
                src={coldChainImg}
                alt="Agricultural Cold Chain Integrity"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.85]"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950" />
            )}

            {/* Multi-layered Cinematic Gradient Scrim for crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/40 pointer-events-none" />
            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay pointer-events-none" />

            {/* Top Bar: Floating Temperature Chip & Icon */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/75 border border-white/20 px-3 py-1.5 backdrop-blur-md shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-bold text-emerald-400 tracking-tight font-mono">0°C – 4°C</span>
                <span className="text-white/30 text-xs">|</span>
                <span className="text-[11px] font-semibold text-slate-200">
                  {bento.card2Tag}
                </span>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-xs">
                <Snowflake />
              </div>
            </div>

            {/* Bottom Content: Coordinated Typography & Technical Specifications */}
            <div className="relative z-10 pt-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                <Snowflake className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{bento.card2Badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 drop-shadow-md group-hover:text-emerald-300 transition-colors">
                {bento.card2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200/95 font-medium leading-relaxed drop-shadow-xs line-clamp-2 mb-3">
                {bento.card2Desc}
              </p>

              {/* Technical Specifications Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] text-white/90 font-medium">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 backdrop-blur-xs border border-white/10">
                  <Zap className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span>Pre-Cooling</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 backdrop-blur-xs border border-white/10">
                  <Truck className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span>Reefer Docks</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 backdrop-blur-xs border border-white/10">
                  <Activity className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span>IoT 24/7</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Box 3: Product (Potatoes) */}
          <Link
            href="/products#potatoes"
            className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group cursor-pointer min-h-[240px] md:min-h-0"
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
              src="/images/products/potatoes.jpg"
              alt="Potatoes"
              className="w-full h-full min-h-[240px] md:min-h-0 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
          </Link>

          {/* Box 4: Global Sourcing Map/Feature (Span 3 cols full width) */}
          <div className="md:col-span-3 bg-slate-900 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 border border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden relative group text-white text-start">
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
