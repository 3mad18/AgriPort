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
  MapPin,
  Sparkles,
  ExternalLink,
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
        <div id="credentials" className="rounded-3xl sm:rounded-[2.5rem] border-2 border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-12 text-white shadow-xl relative overflow-hidden text-start scroll-mt-24">
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
                    {about.registeredAddressVal || siteSettings.location}
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

        {/* 4. Strategic Geographic Location & Interactive Map */}
        {about.map && (
          <div id="map" className="space-y-6 text-start scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-2">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{about.map.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {about.map.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl leading-relaxed">
                  {about.map.subtitle}
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Kafr+El-Dawar,+Beheira+Governorate,+Egypt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-xs hover:border-emerald-500 hover:text-emerald-600 transition-all self-start sm:self-auto shrink-0"
              >
                <span>{about.map.openGoogleMaps}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Logistics Connectivity Quick Metrics */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-[#F7F9FC] p-4 text-start">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <span>🚢</span>
                  <span>{about.map.alexPort}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900">
                  {about.map.alexPortDist}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#F7F9FC] p-4 text-start">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <span>⚓</span>
                  <span>{about.map.damiettaPort}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900">
                  {about.map.damiettaPortDist}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#F7F9FC] p-4 text-start">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <span>✈️</span>
                  <span>{about.map.cairoAirport}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900">
                  {about.map.cairoAirportDist}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#F7F9FC] p-4 text-start">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <span>🛣️</span>
                  <span>{about.map.highway}</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900">
                  {about.map.highwayDist}
                </div>
              </div>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="relative h-[360px] sm:h-[450px] w-full overflow-hidden rounded-3xl sm:rounded-[2rem] border border-slate-200/80 shadow-md bg-slate-100">
              <iframe
                title="AgriPort Strategic Location"
                src="https://maps.google.com/maps?q=Kafr%20El-Dawar%2C%20Beheira%20Governorate%2C%20Egypt&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="absolute bottom-4 start-4 rounded-xl bg-white/95 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-slate-800 shadow-md border border-slate-200/60 pointer-events-none hidden sm:flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{about.registeredAddressVal || "Kafr El-Dawar, Beheira, Egypt"}</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Core Export Pillars */}
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

        {/* 6. International Quality Certifications */}
        <div id="certifications" className="space-y-6 text-start scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-2">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === "ar" ? "اعتمادات وشهادات الجودة الدولية" : "International Quality Certifications"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {language === "ar" ? "شهادات الجودة والسلامة الغذائية المعتمَدة" : "Certified Food Safety & Quality Standards"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl leading-relaxed">
                {language === "ar"
                  ? "تلتزم مزارعنا ومحطات التعبئة التابعة لـ AgriPort بأدق بروتوكولات الفحص الزراعي والممارسات الدولية لضمان أعلى مواصفات خلو متبقيات المبيدات ومأمونية الغذاء:"
                  : "All AgriPort partner farms and packhouses operate under accredited international auditing schemes guaranteeing full food safety and traceability:"}
              </p>
            </div>

            <Link
              href="/contact?subject=Certificates"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 shadow-xs hover:border-emerald-500 hover:text-emerald-600 transition-all self-start sm:self-auto shrink-0"
            >
              <span>{language === "ar" ? "طلب نسخ الشهادات الرسمية" : "Request Certificate Copies"}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-extrabold font-serif text-slate-900 tracking-tight">GLOBALG.A.P.</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">IFA v6</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                {language === "ar" ? "الممارسات الزراعية الجيدة العالمية" : "Integrated Farm Assurance"}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {language === "ar"
                  ? "إدارة متكاملة للمزارع، ترشيد استخدام المياه والأسمدة، ونظام تتبع رقمي كامل للدفعة (Lot Traceability) من الحقل حتى الصندوق."
                  : "Certified farm management, rational water/nutrient usage, and complete harvest lot traceability from field to carton."}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">ISO 22000:2018</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Food Safety</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                {language === "ar" ? "نظام إدارة سلامة الغذاء" : "Food Safety Management System"}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {language === "ar"
                  ? "معايير صارمة في محطات التعبئة تشمل التعقيم، النظافة الشخصية، الرقابة على درجات الحرارة ومكافحة الملوثات البيولوجية."
                  : "Stringent packhouse protocols governing hygiene, rapid cold chain controls, and biological contaminant prevention."}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">BRCGS Food Safety</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">GFSI Benchmark</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                {language === "ar" ? "المعيار العالمي لسلامة وتغليف الأغذية" : "Global Food Safety Standard"}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {language === "ar"
                  ? "المعيار المفضل لكبرى سلاسل السوبرماركت والموزعين في بريطانيا والاتحاد الأوروبي لمطابقة خامات التغليف والفرز."
                  : "The gold benchmark for top European retail supermarket chains covering packaging materials and grading lines."}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">FDA Registered</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">US Compliant</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                {language === "ar" ? "تسجيل هيئة الغذاء والدواء الأمريكية" : "US FDA Food Facility Registration"}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {language === "ar"
                  ? "منشآت ومحطات مسجلة رسمياً لدى الـ FDA ومطابقة لقانون تحديث سلامة الأغذية الأمريكي (FSMA)."
                  : "Official US FDA registration verifying compliance with Food Safety Modernization Act (FSMA) standards."}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">HACCP Certified</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Risk Control</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                {language === "ar" ? "تحليل المخاطر ونقاط التحكم الحرجة" : "Hazard Analysis & Critical Points"}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {language === "ar"
                  ? "تحديد ومراقبة كافة نقاط التحكم الحرجة في مسار الفرز والغسيل والتبريد لاستبعاد أي شوائب أو خلل حراري."
                  : "Systematic monitoring of critical control points across sorting, washing, pre-cooling, and carton sealing."}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">SEDEX / SMETA</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Ethical Trade</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                {language === "ar" ? "تدقيق التجارة الأخلاقية والمسؤولية الاجتماعية" : "Ethical Trade & Social Audit"}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {language === "ar"
                  ? "التزام كامل بمعايير العمل اللائق، السلامة والصحة المهنية للعاملين، وحماية البيئة والتجارة المستدامة."
                  : "Audit verifying worker health and safety, fair compensation, zero child labor, and responsible environmental stewardship."}
              </p>
            </div>
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
