"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/brand-logo";
import { FlagIcon } from "@/components/ui/flag-icon";
import { useLanguage } from "@/context/language-context";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
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
      const target = event.target as Node;
      const insideDesktop = langMenuRef.current?.contains(target);
      const insideMobile = mobileLangRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
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
      {/* 1. Glassmorphic Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-xs ${
          isScrolled
            ? "py-3 bg-white/90 shadow-sm"
            : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
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
              href="/facilities"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              {t.nav.facilities}
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
            {/* Mobile Language Button & Popover */}
            <div className="relative" ref={mobileLangRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-xs active:scale-95 transition-all"
                aria-expanded={langMenuOpen}
                aria-label="Change language"
              >
                <FlagIcon code={language} className="h-3 w-4.5 rounded-xs" />
                <span>{currentLangInfo.code.toUpperCase()}</span>
                <svg
                  className={`h-2.5 w-2.5 text-slate-400 transition-transform duration-200 ${
                    langMenuOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langMenuOpen && (
                <div
                  className={`absolute top-full mt-2 ${
                    dir === "rtl" ? "left-0" : "right-0"
                  } w-52 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-2xl ring-1 ring-black/10 z-50 animate-fade-in text-start`}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    {t.language} / Language
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-0.5">
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
                              : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
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

            {/* Mobile Toggle */}
            <button
              className="p-1.5 text-slate-900 hover:text-emerald-600 transition-colors"
              onClick={() => {
                setIsMobileMenuOpen((prev) => !prev);
                setLangMenuOpen(false);
              }}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-fade-in flex flex-col justify-start gap-8 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-6 text-lg font-medium text-start">
            <Link
              href={isHome ? "#products" : "/products"}
              className="text-slate-700 hover:text-emerald-600 transition-colors py-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.products}
            </Link>
            <Link
              href="/facilities"
              className="text-slate-700 hover:text-emerald-600 transition-colors py-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.facilities}
            </Link>
            <Link
              href="/about"
              className="text-slate-700 hover:text-emerald-600 transition-colors py-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.company}
            </Link>
            <Link
              href="/contact"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-full text-center font-semibold text-base shadow-sm mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.contactSales}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
