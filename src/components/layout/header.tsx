"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/brand-logo";
import { FlagIcon } from "@/components/ui/flag-icon";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";
import { SUPPORTED_LANGUAGES, type Language } from "@/lib/i18n";

// Standalone Icons mimicking user snippet
const MenuIcon = () => (
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
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const CloseIcon = () => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export function Header() {
  const { language, setLanguage, currentLangInfo, t, dir } = useLanguage();
  const { settings: siteSettings } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY > 15);
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change & re-verify scroll
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setLangMenuOpen(false);
    if (typeof window !== "undefined") {
      setIsScrolled(window.scrollY > 20);
    }
  }, [pathname]);

  const isHome = pathname === "/";

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setLangMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
        {/* 1. Original Glassmorphic Navbar on TOP */}
        <nav
          className={`transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-xs ${
            isScrolled
              ? "py-3 bg-white/90 shadow-sm"
              : "py-4"
          }`}
        >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href={isHome ? "#products" : "/products"}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              {t.nav.products}
            </Link>
            <Link
              href={isHome ? "#capabilities" : "/about"}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              {t.nav.capabilities}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              {t.nav.company}
            </Link>

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:border-emerald-500/50 hover:bg-white hover:text-slate-900 transition-all"
                aria-expanded={langMenuOpen}
                aria-label="Change language"
              >
                <FlagIcon code={language} className="h-3.5 w-5 rounded-xs" />
                <span>{currentLangInfo.nativeName}</span>
                <svg
                  className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                    langMenuOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langMenuOpen && (
                <div
                  className={`absolute ${
                    dir === "rtl" ? "left-0" : "right-0"
                  } mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 z-50`}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t.language} / Language
                  </div>
                  <div className="space-y-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = lang.code === language;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => handleSelectLanguage(lang.code)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                            isSelected
                              ? "bg-emerald-50 text-emerald-900 font-bold"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <FlagIcon
                              code={lang.code}
                              className="h-3.5 w-5 rounded-xs"
                            />
                            <span>{lang.nativeName}</span>
                          </div>
                          {isSelected && (
                            <svg
                              className="h-3.5 w-3.5 text-emerald-600"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Sales Pill Button */}
            <Link
              href="/contact"
              className="text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full transition-all flex items-center gap-2 shadow-xs hover:shadow-emerald-500/20 active:scale-95"
            >
              {t.nav.contactSales}
            </Link>
          </div>

          {/* Mobile Right Controls: Language Pill + Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Language Button */}
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-xs"
            >
              <FlagIcon code={language} className="h-3 w-4.5 rounded-xs" />
              <span>{currentLangInfo.code.toUpperCase()}</span>
            </button>

            {/* Mobile Toggle */}
            <button
              className="p-1.5 text-slate-900 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Language Popup if clicked on mobile */}
        {langMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-3 shadow-md">
            <div className="flex flex-wrap gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border ${
                    lang.code === language
                      ? "bg-emerald-500 text-white border-emerald-500 font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <FlagIcon code={lang.code} className="h-3 w-4.5" />
                  <span>{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 2. Export Announcement Banner BELOW (أسفل) the Navbar */}
      {siteSettings.showExportBanner && siteSettings.exportBannerText && (
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white text-[11px] sm:text-xs py-2 px-4 font-bold shadow-xs border-b border-emerald-800/40">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="truncate max-w-xl sm:max-w-3xl">
              {siteSettings.exportBannerText}
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-extrabold text-white transition-all shrink-0 ml-2"
            >
              <span>{language === "ar" ? "تصدير الآن" : "Export Now"}</span>
              <span className={dir === "rtl" ? "rotate-180" : ""}>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-fade-in flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-6 text-lg font-medium">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <BrandLogo />
            </div>
            <Link
              href={isHome ? "#products" : "/products"}
              className="text-slate-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.products}
            </Link>
            <Link
              href={isHome ? "#capabilities" : "/about"}
              className="text-slate-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.capabilities}
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.company}
            </Link>
            <Link
              href="/contact"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full text-center font-semibold text-base shadow-sm mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.contactSales}
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
              {t.language}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium border ${
                    lang.code === language
                      ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <FlagIcon code={lang.code} className="h-3.5 w-5" />
                  <span>{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
