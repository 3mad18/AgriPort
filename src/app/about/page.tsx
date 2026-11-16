"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";
import {
  ShieldCheck,
  FileText,
  Building2,
  BadgeCheck,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const { settings: siteSettings } = useSiteSettings();
  const about = t.aboutPage;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  const crNumber = siteSettings.commercialRegister || about.commercialRegisterVal || "108420";
  const taxNumber = siteSettings.taxCard || about.taxCardVal || "629-418-735";
  const exporterNumber = siteSettings.exporterRegNumber || about.exporterNumberVal || "28410";

  return (
    <PageShell title={about.title} description={about.subtitle}>
      <div className="space-y-12 sm:space-y-16">
        {/* 1. Executive Overview Story & Mission */}
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 p-6 sm:p-12 shadow-sm text-start">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>{about.badge || "AgriPort Profile"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {about.title}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-medium">
              {about.description}
            </p>
          </div>

          <div className="absolute -bottom-20 -end-20 h-64 w-64 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />
        </div>

        {/* 2. Key Operational Metrics Strip */}
        {about.stats && (
          <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-5 sm:p-6 text-start">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                {about.stats.farms}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {about.stats.farmsVal}
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-5 sm:p-6 text-start">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                {about.stats.capacity}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {about.stats.capacityVal}
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-5 sm:p-6 text-start">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                {about.stats.coldChain}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {about.stats.coldChainVal}
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-5 sm:p-6 text-start">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                {about.stats.markets}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {about.stats.marketsVal}
              </div>
            </div>
          </div>
        )}

        {/* 3. Official Legal & Commercial Credentials Card (السجل التجاري والبطاقة الضريبية) */}
        <div className="rounded-3xl sm:rounded-[2.5rem] border-2 border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-12 text-white shadow-xl relative overflow-hidden text-start">
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>{about.legalBadge || "Official Legal Credentials"}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <BadgeCheck className="h-4 w-4 text-emerald-400" />
                <span>{language === "ar" ? "كيان تجاري مسجل ومعتمد" : "Verified & Registered Legal Entity"}</span>
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                {about.legalTitle || "Verified Commercial Registration & Tax Legitimacy"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
                {about.legalSubtitle}
              </p>
            </div>

            {/* Grid of Credentials */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-2">
              {/* Tile 1: Commercial Registration (السجل التجاري) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md flex flex-col justify-between transition-all hover:border-slate-700">
                <div>
                  <div className="flex items-center justify-between gap-2 text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {about.commercialRegister || "Commercial Registration (C.R)"}
                    </span>
                    <FileText className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400 tracking-wider">
                    {crNumber}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">
                    {about.commercialRegisterDesc}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleCopy(crNumber, "cr")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedKey === "cr" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{language === "ar" ? "تم النسخ بنجاح" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>{language === "ar" ? "نسخ رقم السجل" : "Copy C.R Number"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tile 2: Tax Card / Tax ID (البطاقة الضريبية) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md flex flex-col justify-between transition-all hover:border-slate-700">
                <div>
                  <div className="flex items-center justify-between gap-2 text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {about.taxCard || "Tax ID / Tax Card"}
                    </span>
                    <Building2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400 tracking-wider">
                    {taxNumber}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">
                    {about.taxCardDesc}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleCopy(taxNumber, "tax")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedKey === "tax" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{language === "ar" ? "تم النسخ بنجاح" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>{language === "ar" ? "نسخ رقم البطاقة الضريبية" : "Copy Tax ID"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tile 3: Exporter Registration (سجل المصدرين GOEIC) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md flex flex-col justify-between transition-all hover:border-slate-700">
                <div>
                  <div className="flex items-center justify-between gap-2 text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {about.exporterNumber || "GOEIC Exporter Reg. No."}
                    </span>
                    <BadgeCheck className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400 tracking-wider">
                    {exporterNumber}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">
                    {about.exporterNumberDesc}
                  </p>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleCopy(exporterNumber, "exp")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedKey === "exp" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{language === "ar" ? "تم النسخ بنجاح" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>{language === "ar" ? "نسخ رقم القيد" : "Copy Exporter No."}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tile 4: Chamber of Commerce (الغرفة التجارية) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md flex flex-col justify-between transition-all hover:border-slate-700 md:col-span-1 lg:col-span-1">
                <div>
                  <div className="flex items-center justify-between gap-2 text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {about.chamber || "Chamber of Commerce"}
                    </span>
                    <Building2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-base font-bold text-white leading-snug">
                    {about.chamberVal}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">
                    {about.chamberDesc}
                  </p>
                </div>
              </div>

              {/* Tile 5: Registered Legal Address (المقر القانوني المسجل) */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md flex flex-col justify-between transition-all hover:border-slate-700 md:col-span-2 lg:col-span-2">
                <div>
                  <div className="flex items-center justify-between gap-2 text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {about.registeredAddress || "Registered Corporate Head Office"}
                    </span>
                    <MapPin className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-base font-bold text-white leading-snug">
                    {siteSettings.location || about.registeredAddressVal}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">
                    {about.registeredAddressDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Background Glows */}
          <div className="absolute top-0 end-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 start-0 h-64 w-64 rounded-full bg-emerald-600/10 blur-2xl pointer-events-none" />
        </div>

        {/* 4. The 8 Specialized Export Crops Basket */}
        {about.crops && (
          <div className="space-y-6 text-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold text-slate-700 mb-2">
                <span>🌱</span>
                <span>{about.cropsBadge || "Export Portfolio"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {about.cropsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {about.cropsSubtitle}
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {about.crops.map((crop, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 shadow-xs hover:border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5">
                        {crop.tag}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {crop.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
                      {crop.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      <span>{language === "ar" ? "تفاصيل المحصول ومواصفاته" : "View Crop Specifications"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Core Export Pillars */}
        {about.pillars && (
          <div className="space-y-6 text-start">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              {about.pillarsTitle || "Our Core Export Pillars"}
            </h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {about.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-xs transition-all hover:border-slate-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-2xl">
                    {pillar.icon}
                  </div>
                  <h4 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. International Quality Certifications Strip */}
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

        {/* 7. Call to Action Section */}
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-emerald-600 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-3xl">🤝</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {about.ctaTitle || "Ready to Source Egyptian Vegetables with a Verified Exporter?"}
            </h3>
            <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
              {about.ctaDesc || "Contact our commercial team to discuss volumes, seasonal programs, and reliable seafreight schedules."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-full bg-white text-emerald-900 hover:bg-emerald-50 px-8 py-3.5 text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                {about.ctaQuote || "Request a Quote"}
              </Link>
              <Link
                href="/facilities"
                className="w-full sm:w-auto rounded-full border border-emerald-400 bg-emerald-700/60 hover:bg-emerald-700 text-white px-8 py-3.5 text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                {about.ctaFacilities || "Tour Packing Facilities"}
              </Link>
            </div>
          </div>

          <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -end-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />
        </div>
      </div>
    </PageShell>
  );
}
