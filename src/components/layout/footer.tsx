"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";
import { MapPin, Mail, Phone } from "lucide-react";

const CURRENT_YEAR = 2026;

export function Footer() {
  const { t, language } = useLanguage();
  const { settings: siteSettings } = useSiteSettings();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      router.push(`/contact?email=${encodeURIComponent(email)}`);
    } else {
      router.push("/contact");
    }
  };

  const footer = t.footer;

  return (
    <footer
      id="contact"
      className="bg-slate-900 text-white pt-16 sm:pt-20 pb-10 border-t border-slate-800 text-start"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Professional CTA Section: Title + Description on one side, Form + Contacts directly beside it */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 sm:pb-16 border-b border-slate-800">
          {/* Title & Description Block */}
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug text-balance">
              {footer.ctaTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-xl">
              {footer.ctaDesc}
            </p>
          </div>

          {/* Form + Location + Contacts (Beside the description) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end w-full">
            <form
              onSubmit={handleContactSubmit}
              className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footer.emailPlaceholder}
                className="bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all w-full sm:flex-1 placeholder:text-slate-500 text-sm"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center whitespace-nowrap text-sm shadow-xs hover:shadow-emerald-500/20 active:scale-95"
              >
                {footer.btnContact}
              </button>
            </form>

            {/* Location & Direct Contact Tag */}
            <div className="mt-3.5 flex flex-col gap-2 text-xs text-slate-400 font-medium w-full max-w-md">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {language === "ar" && siteSettings.location
                    ? siteSettings.location
                    : t.contactPage.locationValue}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-slate-300">
                <a
                  href={`mailto:${siteSettings.email || "agriporteg@gmail.com"}`}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{siteSettings.email || "agriporteg@gmail.com"}</span>
                </a>
                <a
                  href={`tel:${(siteSettings.phone || "+20 100 720 2636").replace(/\s+/g, "")}`}
                  dir="ltr"
                  className="hover:text-emerald-400 transition-colors font-mono flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{siteSettings.phone || "+20 100 720 2636"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Structured Middle Navigation: Brand (6 cols), Platform (3 cols), Company (3 cols) */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 border-b border-slate-800">
          {/* Brand & CR / Tax Details (Span 6) */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <img
                src="/brand/agri-flow-symbol-dark.png"
                alt="AgriPort"
                className="h-6 w-auto object-contain"
              />
              <span className="flex items-center text-lg tracking-tight" dir="ltr">
                <span className="font-medium text-emerald-400">Agri</span>
                <span className="font-bold text-white">Port</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md">
              {footer.subtext ||
                (language === "ar"
                  ? "بوابة تصدير الخضروات والحاصلات الزراعية من مصر إلى موانئ العالم"
                  : "Export portal for premium fresh vegetables from Egypt to world ports")}
            </p>

            {/* Official Registration Chips */}
            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <span
                className="inline-flex items-center gap-1 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700/60"
                title="Commercial Registration / السجل التجاري"
              >
                <span className="text-slate-500 font-sans">
                  {language === "ar" ? "س.ت:" : "CR:"}
                </span>
                <span className="text-emerald-400 font-bold">
                  {siteSettings.commercialRegister || "108420"}
                </span>
              </span>
              <span
                className="inline-flex items-center gap-1 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700/60"
                title="Tax ID / البطاقة الضريبية"
              >
                <span className="text-slate-500 font-sans">
                  {language === "ar" ? "ب.ض:" : "Tax:"}
                </span>
                <span className="text-emerald-400 font-bold">
                  {siteSettings.taxCard || "629-418-735"}
                </span>
              </span>
            </div>
          </div>

          {/* Quick Links: المنصة والتصدير (Span 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {footer.colPlatform}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium">
              <Link
                href="/products"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkProducts}
              </Link>
              <Link
                href="/about#certifications"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkCertifications}
              </Link>
            </div>
          </div>

          {/* Quick Links: الشركة (Span 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {footer.colCompany}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium">
              <Link
                href="/about"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkAbout}
              </Link>
              <Link
                href="/terms"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkLegal}
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Clean Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>
            &copy; {CURRENT_YEAR} {siteSettings.companyName || "AgriPort"} Technologies & Exports.{" "}
            {footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
