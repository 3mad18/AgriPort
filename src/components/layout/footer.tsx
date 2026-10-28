"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";

const CURRENT_YEAR = 2026;

export function Footer() {
  const { t, language } = useLanguage();
  const { settings: siteSettings } = useSiteSettings();
  const pathname = usePathname();
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
      className="bg-slate-900 text-white pt-16 sm:pt-24 pb-12 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 mb-16 sm:mb-24 text-start">
          {/* CTA Text & Contact input */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 sm:mb-6 leading-tight text-white">
              {footer.ctaTitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-400 font-medium mb-6 sm:mb-8 max-w-md leading-relaxed">
              {footer.ctaDesc}
            </p>
            <form onSubmit={handleContactSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footer.emailPlaceholder}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all w-full sm:flex-1 placeholder:text-slate-500 text-sm"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center whitespace-nowrap text-sm shadow-xs hover:shadow-emerald-500/20 active:scale-95"
              >
                {footer.btnContact}
              </button>
            </form>

            {/* Location & Direct Contact Tag */}
            <div className="mt-6 flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">📍</span>
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
                  <span>✉</span>
                  <span>{siteSettings.email || "agriporteg@gmail.com"}</span>
                </a>
                <a
                  href={`tel:${(siteSettings.phone || "+20 100 720 2636").replace(/\s+/g, "")}`}
                  dir="ltr"
                  className="hover:text-emerald-400 transition-colors font-mono flex items-center gap-1.5"
                >
                  <span>📞</span>
                  <span>{siteSettings.phone || "+20 100 720 2636"}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 text-sm font-medium">
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">
                {footer.colPlatform}
              </h4>
              <Link
                href="/products"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkProducts}
              </Link>
              <Link
                href="/facilities"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkColdChain}
              </Link>
              <Link
                href="/about"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkCertifications}
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-2">
                {footer.colCompany}
              </h4>
              <Link
                href="/about"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkAbout}
              </Link>
              <Link
                href="/facilities"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkFarms}
              </Link>
              <Link
                href="/about"
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {footer.linkLegal}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2.5">
            <img
              src="/brand/agri-flow-symbol-dark.png"
              alt="AgriPort"
              className="h-6 w-auto object-contain"
            />
            <span className="flex items-center text-base tracking-tight" dir="ltr">
              <span className="font-medium text-emerald-400">Agri</span>
              <span className="font-bold text-white">Port</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
            <p>
              &copy; {CURRENT_YEAR} {siteSettings.companyName || "AgriPort"} Technologies & Exports.{" "}
              {footer.rights}.
            </p>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <Link
              href="/ops"
              className="text-xs text-slate-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/40 hover:bg-slate-800"
              title={
                language === "ar"
                  ? "بوابة إدارة العمليات والموقع"
                  : "Operations Suite Portal"
              }
            >
              <span>🔒</span>
              <span>{language === "ar" ? "لوحة العمليات" : "Ops Portal"}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
