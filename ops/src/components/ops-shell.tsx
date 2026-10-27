"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { getVisitorSiteUrl } from "@/lib/urls";
import { useOpsAuth } from "@/context/ops-auth-context";
import { useOpsStore, type Inquiry } from "@/context/ops-store-context";
import { OpsOverview } from "@/components/ops-overview";
import { OpsNotificationsCenter } from "@/components/ops-notifications-center";
import { OpsProducts } from "@/components/ops-products";
import { OpsSettings } from "@/components/ops-settings";
import { OpsToast } from "@/components/ops-toast";

export type OpsTab = "overview" | "notifications" | "products" | "settings";

const OPS_TAB_STORAGE_KEY = "agriport_ops_persisted_tab";

function getInitialOpsTab(): OpsTab {
  if (typeof window === "undefined") return "overview";
  try {
    // 1. Check URL hash (e.g. #settings, #products, #notifications, #overview)
    const hash = window.location.hash.replace(/^#/, "").toLowerCase() as OpsTab;
    if (["overview", "notifications", "products", "settings"].includes(hash)) {
      return hash;
    }

    // 2. Check query param (e.g. ?tab=settings)
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab")?.toLowerCase() as OpsTab;
    if (["overview", "notifications", "products", "settings"].includes(tabParam)) {
      return tabParam;
    }

    // 3. Check localStorage
    const saved = localStorage.getItem(OPS_TAB_STORAGE_KEY) as OpsTab;
    if (["overview", "notifications", "products", "settings"].includes(saved)) {
      return saved;
    }
  } catch (e) {}
  return "overview";
}

export function OpsShell() {
  const { isAuthenticated, isLoading, user, logout } = useOpsAuth();
  const router = useRouter();

  const {
    inquiries,
    unreadInquiriesCount,
    markInquiryRead,
    markAllInquiriesRead,
  } = useOpsStore();

  const [activeTab, setActiveTab] = useState<OpsTab>(getInitialOpsTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback((tab: OpsTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(OPS_TAB_STORAGE_KEY, tab);
        if (window.location.hash !== `#${tab}`) {
          window.history.replaceState(null, "", `#${tab}`);
        }
      } catch (e) {}
    }
  }, []);

  // Authentication Guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/secure-login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Close notifications dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Preserve and sync active tab across refreshes and history navigation
  useEffect(() => {
    const tab = getInitialOpsTab();
    setActiveTab(tab);
    try {
      if (window.location.hash !== `#${tab}`) {
        window.history.replaceState(null, "", `#${tab}`);
      }
    } catch (e) {}

    const handleHashChange = () => {
      const current = getInitialOpsTab();
      setActiveTab(current);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center" dir="rtl">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/brand/agri-flow-3d.png"
            alt="AgriPort Ops"
            className="h-14 w-auto animate-pulse drop-shadow-md"
          />
          <span className="text-xs font-bold text-slate-400">
            جاري فتح منظومة العمليات...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    {
      id: "overview" as OpsTab,
      label: "نظرة عامة والإحصائيات",
      icon: "📊",
    },
    {
      id: "notifications" as OpsTab,
      label: "مركز الطلبات والإشعارات",
      icon: "🔔",
      badge: unreadInquiriesCount > 0 ? `${unreadInquiriesCount} جديد` : undefined,
    },
    {
      id: "products" as OpsTab,
      label: "إدارة كتالوج المحاصيل",
      icon: "📦",
    },
    {
      id: "settings" as OpsTab,
      label: "إعدادات الموقع والتصدير",
      icon: "⚙️",
    },
  ];

  const recentUnreadInquiries = inquiries.filter(
    (i) => i.read === false || i.status === "جديد"
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Desktop & Mobile Persistent Sidebar */}
      <aside
        className={`fixed inset-y-0 start-0 z-40 w-72 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out border-e border-slate-800 ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0 rtl:translate-x-full rtl:md:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <BrandLogo variant="dark" />

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1 text-start">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              القوائم الرئيسية
            </div>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabChange(item.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-white text-emerald-900"
                          : "bg-emerald-500 text-white animate-pulse"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Separator */}
            <div className="pt-4 border-t border-slate-800/80 my-2">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                موقع الزوار
              </div>
              <a
                href={getVisitorSiteUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors mt-1"
              >
                <div className="flex items-center gap-3">
                  <span>🌐</span>
                  <span>معاينة موقع الزوار</span>
                </div>
                <span className="text-[10px] text-slate-500">فتح ↗</span>
              </a>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer: Admin Profile & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-slate-800/60 border border-slate-800 text-start">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30">
                AD
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-white truncate">
                  {user?.name || "مدير التصدير"}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user?.email || "admin@agriport.com"}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              title="تسجيل الخروج"
              className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors shrink-0"
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:ps-72 transition-all">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between gap-4">
          {/* Left / Start: Mobile Toggle & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              ☰
            </button>

            <div className="text-start">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                منظومة عمل AgriPort Ops
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {activeTab === "overview" && "نظرة عامة وإحصائيات التصدير"}
                {activeTab === "notifications" && "مركز تلقي الطلبات والإشعارات"}
                {activeTab === "products" && "إدارة كتالوج المحاصيل"}
                {activeTab === "settings" && "إعدادات الموقع والتصدير"}
              </h1>
            </div>
          </div>

          {/* Right / End: Search Bar, Notifications Center Bell, Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في الطلبات والمحاصيل..."
                className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2 ps-9 pe-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
              />
              <span className="absolute inset-y-0 start-3 flex items-center text-slate-400 text-xs">
                🔍
              </span>
            </div>

            {/* Notifications Popover Bell */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-700 shadow-xs"
                title="مركز الإشعارات السريعة"
              >
                <span>🔔</span>
                {unreadInquiriesCount > 0 && (
                  <span className="absolute -top-1 -end-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-extrabold text-white shadow-xs animate-bounce">
                    {unreadInquiriesCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Window */}
              {isNotifDropdownOpen && (
                <div className="absolute end-0 mt-3 w-80 sm:w-96 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl ring-1 ring-black/5 animate-fade-in z-50 text-start">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        التنبيهات والطلبات الحديثة
                      </span>
                      {unreadInquiriesCount > 0 && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          {unreadInquiriesCount} جديد
                        </span>
                      )}
                    </div>
                    {unreadInquiriesCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllInquiriesRead}
                        className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        تحديد الكل كمقروء
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {inquiries.slice(0, 5).map((item) => {
                      const isUnread =
                        item.read === false || item.status === "جديد";
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            markInquiryRead(item.id);
                            handleTabChange("notifications");
                            setIsNotifDropdownOpen(false);
                          }}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                            isUnread
                              ? "bg-emerald-50/60 border-emerald-200 hover:bg-emerald-50"
                              : "bg-slate-50/60 border-slate-100 hover:bg-slate-100/70"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {item.date}
                            </span>
                          </div>
                          <div className="text-xs text-slate-600 font-medium mt-1">
                            طلب تسعير:{" "}
                            <strong className="text-emerald-700">
                              {item.product}
                            </strong>{" "}
                            ({item.quantity})
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {item.company} • {item.country}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-slate-100 pt-3 mt-3 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        handleTabChange("notifications");
                        setIsNotifDropdownOpen(false);
                      }}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 block w-full py-1"
                    >
                      فتح مركز الطلبات الكامل ←
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Visit Site */}
            <Link
              href="/"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-colors"
            >
              <span>🌐</span>
              <span>الموقع</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Section Container */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          {activeTab === "overview" && (
            <OpsOverview onNavigateTab={handleTabChange} />
          )}

          {activeTab === "notifications" && (
            <OpsNotificationsCenter searchQuery={searchQuery} />
          )}

          {activeTab === "products" && (
            <OpsProducts searchQuery={searchQuery} />
          )}

          {activeTab === "settings" && <OpsSettings />}
        </main>
      </div>

      {/* Global Toast Notification */}
      <OpsToast />
    </div>
  );
}
