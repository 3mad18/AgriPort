/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { useLanguage } from "@/context/language-context";

type FacilityItem = {
  id: string;
  category: "stations" | "farms" | "coldchain" | "lab";
  badge: string;
  title: string;
  desc: string;
  specs: string;
  image: string;
  tag: string;
};

export default function FacilitiesPage() {
  const { t, dir, language } = useLanguage();
  const f = t.facilitiesPage;
  const isRTL = dir === "rtl";

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedMedia, setSelectedMedia] = useState<FacilityItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const filters = [
    { id: "all", label: f.filterAll },
    { id: "stations", label: f.filterStations },
    { id: "farms", label: f.filterFarms },
    { id: "coldchain", label: f.filterColdChain },
    { id: "lab", label: f.filterLab },
  ];

  const items = (f.items || []) as unknown as FacilityItem[];

  const filteredItems = items.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <PageShell title={f.title} description={f.subtitle}>
      <div className="space-y-12 sm:space-y-16">
        {/* 1. Key Operational KPI Strip */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-5 sm:p-6 text-start">
            <div className="flex items-center gap-2.5 text-emerald-600 mb-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/70 text-lg">
                🏭
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {f.stats.stations}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {f.stats.stationsVal}
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-5 sm:p-6 text-start">
            <div className="flex items-center gap-2.5 text-emerald-600 mb-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/70 text-lg">
                🌱
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {f.stats.farms}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {f.stats.farmsVal}
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-5 sm:p-6 text-start">
            <div className="flex items-center gap-2.5 text-emerald-600 mb-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/70 text-lg">
                ❄️
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {f.stats.coldChain}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {f.stats.coldChainVal}
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-5 sm:p-6 text-start">
            <div className="flex items-center gap-2.5 text-emerald-600 mb-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100/70 text-lg">
                ⚡
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {f.stats.capacity}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {f.stats.capacityVal}
            </div>
          </div>
        </div>

        {/* 2. Featured Video Showcase Card */}
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-slate-900 text-white border border-slate-800 shadow-xl group">
          <div className="relative h-[340px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1600&q=85"
              alt="Live Packing Station Video"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-6 start-6 sm:top-8 sm:start-8 flex flex-wrap items-center gap-2 z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white shadow-xs">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                <span>{f.videoBadge}</span>
              </span>
              <span className="rounded-full bg-black/50 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-slate-300">
                {f.videoDuration}
              </span>
            </div>

            {/* Play Button Trigger */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="group/btn relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white text-slate-900 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
                aria-label={f.videoPlayBtn}
              >
                <span className="absolute -inset-3 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
                <svg
                  className={`h-8 w-8 sm:h-10 sm:w-10 fill-current text-emerald-600 transition-transform group-hover/btn:scale-110 ${
                    isRTL ? "translate-x-0.5" : "-translate-x-0.5"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 start-6 end-6 sm:bottom-10 sm:start-10 sm:end-10 z-10 text-start max-w-3xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 sm:mb-3">
                {f.videoTitle}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                {f.videoDesc}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Filter Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isSelected = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-slate-400 text-start">
            {filteredItems.length} {isRTL ? "مرفق ومحطة عرض" : "facilities displayed"}
          </div>
        </div>

        {/* 4. Masonry / Bento Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white shadow-xs transition-all hover:border-slate-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer text-start"
            >
              <div>
                {/* Image Viewport */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

                  {/* Category Pill (Top Start) */}
                  <div className="absolute top-4 start-4">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-slate-900 shadow-xs">
                      {item.badge}
                    </span>
                  </div>

                  {/* Tag Pill (Top End) */}
                  <div className="absolute top-4 end-4">
                    <span className="rounded-full bg-emerald-500/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                      {item.tag}
                    </span>
                  </div>

                  {/* Zoom Indicator (Bottom End) */}
                  <div className="absolute bottom-4 end-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      🔍
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Footer */}
              <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2">
                <div className="flex items-center gap-2 pt-3 text-xs text-slate-600 font-medium">
                  <span className="text-emerald-500">⚙️</span>
                  <span>{item.specs}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. Quality Standards & Certifications Strip */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-6 sm:p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 sm:mb-6">
            {t.trust.standards}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-16 opacity-60">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-serif">
              GLOBALG.A.P.
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              ISO<span className="font-light">22000</span>
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              BRCGS
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              FDA <span className="font-light text-xs align-top">Reg</span>
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              SEDEX <span className="font-light text-xs">SMETA</span>
            </span>
          </div>
        </div>

        {/* 6. On-Site Inspection & Tour Booking CTA */}
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-emerald-600 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-3xl">🤝</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {f.cta.title}
            </h3>
            <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
              {f.cta.desc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/visit"
                className="w-full sm:w-auto rounded-full bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3.5 text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                {f.cta.visitBtn}
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto rounded-full border border-emerald-400 bg-emerald-700/60 hover:bg-emerald-700 text-white px-8 py-3.5 text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                {f.cta.quoteBtn}
              </Link>
            </div>
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -end-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* 7. Image Lightbox Modal */}
      {selectedMedia && (
        <div
          onClick={() => setSelectedMedia(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full overflow-hidden rounded-3xl bg-white shadow-2xl animate-zoom-in text-start"
          >
            <div className="relative h-[320px] sm:h-[450px] w-full overflow-hidden bg-slate-900">
              <img
                src={selectedMedia.image}
                alt={selectedMedia.title}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 end-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold">
                  {selectedMedia.badge}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {selectedMedia.tag}
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                {selectedMedia.title}
              </h4>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {selectedMedia.desc}
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 font-medium border border-slate-100">
                <span>⚙️</span>
                <span>{selectedMedia.specs}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Video Player Modal */}
      {isVideoModalOpen && (
        <div
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full overflow-hidden rounded-3xl bg-slate-950 shadow-2xl border border-slate-800 text-white text-start"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {f.videoTitle}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close video"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1600&q=85"
                alt="Packing station showcase"
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500 flex items-center justify-center text-white text-2xl shadow-xl mb-4 animate-bounce">
                  ▶
                </div>
                <h5 className="text-lg sm:text-xl font-bold mb-2">
                  {f.videoTitle}
                </h5>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                  {f.videoDesc}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-slate-400">
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded-md">
                    00:15 خطوط الفرز البصري
                  </span>
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded-md">
                    01:10 غرف Pre-Cooling
                  </span>
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded-md">
                    02:00 تحميل الحاويات المبردة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
