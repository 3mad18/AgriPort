"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/brand-logo";
import { FlagIcon } from "@/components/ui/flag-icon";
import { useLanguage } from "@/context/language-context";
import { useVisitorAuth } from "@/context/visitor-auth-context";
import { SUPPORTED_LANGUAGES, type Language } from "@/lib/i18n";

// Standalone Icons
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

const UserIcon = () => (
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
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export function Header() {
  const { language, setLanguage, currentLangInfo, t, dir } = useLanguage();
  const { user, isAuthenticated, logout } = useVisitorAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
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

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const insideDesktop = langMenuRef.current?.contains(target);
      const insideMobile = mobileLangRef.current?.contains(target);
      const insideUser = userMenuRef.current?.contains(target);

      if (!insideDesktop && !insideMobile) {
        setLangMenuOpen(false);
      }
      if (!insideUser) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change & re-verify scroll
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setLangMenuOpen(false);
    setUserMenuOpen(false);
    if (typeof window !== "undefined") {
      setIsScrolled(window.scrollY > 20);
    }
  }, [pathname]);

  const isHome = pathname === "/";

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setLangMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      if (window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
  };

  const loginLabel = language === "ar" ? "تسجيل الدخول" : "Sign In";

  return (
    <>
      {/* 1. Glassmorphic Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-xs ${
          isScrolled ? "py-3 bg-white/90 shadow-sm" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
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

            {/* Visitor Auth: User Dropdown OR Sign In button */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-950 transition-all shadow-xs"
                  aria-expanded={userMenuOpen}
                >
                  <div className="h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden">
                    {user.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                  <svg
                    className={`h-3 w-3 text-emerald-700 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div
                    className={`absolute ${
                      dir === "rtl" ? "left-0" : "right-0"
                    } mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xl ring-1 ring-black/5 z-50 text-start animate-fade-in`}
                  >
                    <div className="border-b border-slate-100 pb-2.5 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {user.name}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate dir-ltr font-mono mt-0.5">
                        {user.email}
                      </p>
                      {user.phone && (
                        <p className="text-[10px] text-slate-400 dir-ltr font-mono mt-0.5">
                          {user.countryCode} {user.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Link
                        href="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-xl font-medium transition-colors"
                      >
                        <span>👤</span>
                        <span>{language === "ar" ? "بيانات حسابي" : "Account Details"}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-colors text-start"
                      >
                        <span>🚪</span>
                        <span>{language === "ar" ? "تسجيل الخروج" : "Sign Out"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100/70 border border-transparent hover:border-slate-200"
              >
                <UserIcon />
                <span>{loginLabel}</span>
              </Link>
            )}

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

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-fade-in flex flex-col justify-start gap-6 pb-8 overflow-y-auto">
          {/* User Status Bar in Mobile Menu */}
          {isAuthenticated && user ? (
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between text-start">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 font-mono dir-ltr">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                {language === "ar" ? "خروج" : "Logout"}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3 rounded-2xl font-semibold text-sm transition-colors border border-slate-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserIcon />
              <span>{language === "ar" ? "تسجيل الدخول / حساب جديد" : "Sign In / Register"}</span>
            </Link>
          )}

          <div className="flex flex-col gap-5 text-lg font-medium text-start">
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
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-full text-center font-semibold text-base shadow-sm mt-3"
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
