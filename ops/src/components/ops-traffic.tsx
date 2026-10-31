"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { triggerOpsToast } from "@/components/ops-toast";
import {
  Globe2,
  Radio,
  TrendingUp,
  Users,
  Award,
  Globe,
  Package,
  Smartphone,
  Monitor,
  RefreshCw,
  FileSpreadsheet,
  Video,
  Search,
  ExternalLink,
  Pencil,
  Zap,
  Lightbulb,
} from "lucide-react";

export type SiteVisit = {
  id: string;
  created_at: string;
  visitor_id: string;
  path: string;
  page_title: string;
  country: string;
  country_code: string;
  flag: string;
  city?: string;
  device: string;
  os: string;
  browser: string;
  referrer: string;
  referrer_icon?: string;
};

export type TrafficStats = {
  totalVisits: number;
  visitsToday: number;
  uniqueVisitorsToday: number;
  activeNow: number;
  mobileCount: number;
  desktopCount: number;
  mobilePercent: number;
  desktopPercent: number;
  topCountries: Array<{ name: string; flag: string; count: number }>;
  topPages: Array<{ path: string; title: string; count: number }>;
};

const DEFAULT_STATS: TrafficStats = {
  totalVisits: 0,
  visitsToday: 0,
  uniqueVisitorsToday: 0,
  activeNow: 0,
  mobileCount: 0,
  desktopCount: 0,
  mobilePercent: 0,
  desktopPercent: 0,
  topCountries: [],
  topPages: [],
};

export function OpsTraffic() {
  const [stats, setStats] = useState<TrafficStats>(DEFAULT_STATS);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [clarityId, setClarityId] = useState("");
  const [clarityInput, setClarityInput] = useState("");
  const [isEditingClarity, setIsEditingClarity] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const envId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
      const saved = localStorage.getItem("agriport_clarity_project_id") || envId || "z6bhtb3yil";
      setClarityId(saved);
      setClarityInput(saved);
    }
  }, []);

  const handleSaveClarity = () => {
    const trimmed = clarityInput.trim();
    if (typeof window !== "undefined") {
      if (trimmed) {
        localStorage.setItem("agriport_clarity_project_id", trimmed);
        setClarityId(trimmed);
        setIsEditingClarity(false);
        triggerOpsToast("ØªÙ… ØªÙØ¹ÙŠÙ„ ÙƒÙˆØ¯ Microsoft Clarity Ø¨Ù†Ø¬Ø§Ø­ ÙÙŠ Ø§Ù„Ù…ÙˆÙ‚Ø¹! ðŸŽ‰", "success", "Ø±Ø¨Ø· ÙƒÙ„Ø§Ø±ÙŠØªÙŠ");
      } else {
        localStorage.removeItem("agriport_clarity_project_id");
        setClarityId("");
        setIsEditingClarity(false);
        triggerOpsToast("ØªÙ… Ø¥Ù„ØºØ§Ø¡ Ø±Ø¨Ø· ÙƒÙˆØ¯ ÙƒÙ„Ø§Ø±ÙŠØªÙŠ", "info", "ØªÙ†Ø¨ÙŠÙ‡");
      }
    }
  };

  const fetchTraffic = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    try {
      const res = await fetch("/api/analytics/visitors", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (data.stats) setStats(data.stats);
          if (Array.isArray(data.visits)) setVisits(data.visits);
        }
      }
    } catch {
      // offline fallback
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTraffic(false);
    // Poll updates every 10 seconds for real-time traffic pulse
    const interval = setInterval(() => {
      fetchTraffic(true);
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchTraffic]);

  // Filtered visits
  const filteredVisits = useMemo(() => {
    return visits.filter((v) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        v.country?.toLowerCase().includes(query) ||
        v.city?.toLowerCase().includes(query) ||
        v.page_title?.toLowerCase().includes(query) ||
        v.path?.toLowerCase().includes(query) ||
        v.device?.toLowerCase().includes(query) ||
        v.referrer?.toLowerCase().includes(query);

      const matchesCountry =
        selectedCountryFilter === "all" || v.country === selectedCountryFilter;

      return matchesQuery && matchesCountry;
    });
  }, [visits, searchQuery, selectedCountryFilter]);

  // Export Traffic to CSV
  const handleExportCSV = () => {
    if (visits.length === 0) {
      triggerOpsToast("Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ø²ÙŠØ§Ø±Ø§Øª Ø­Ø§Ù„ÙŠØ© Ù„Ù„ØªØµØ¯ÙŠØ±", "error", "ØªÙ†Ø¨ÙŠÙ‡");
      return;
    }

    const headers = [
      "Ù…ÙØ¹Ø±Ù Ø§Ù„Ø²Ø§Ø¦Ø± Ø§Ù„Ù…Ø¬Ù‡ÙˆÙ„",
      "Ø§Ù„Ø¯ÙˆÙ„Ø©",
      "Ø§Ù„Ù…Ø¯ÙŠÙ†Ø©",
      "Ø§Ù„ØµÙØ­Ø© Ø§Ù„ØªÙŠ Ø²Ø§Ø±Ù‡Ø§",
      "Ù…Ø³Ø§Ø± Ø§Ù„Ø±Ø§Ø¨Ø·",
      "Ù†ÙˆØ¹ Ø§Ù„Ø¬Ù‡Ø§Ø²",
      "Ù†Ø¸Ø§Ù… Ø§Ù„ØªØ´ØºÙŠÙ„",
      "Ø§Ù„Ù…ØªØµÙØ­",
      "Ù…ØµØ¯Ø± Ø§Ù„Ø²ÙŠØ§Ø±Ø©",
      "ØªØ§Ø±ÙŠØ® ÙˆÙˆÙ‚Øª Ø§Ù„Ø²ÙŠØ§Ø±Ø©",
    ];

    const rows = visits.map((v) => [
      `"${v.visitor_id}"`,
      `"${v.country}"`,
      `"${v.city || ""}"`,
      `"${v.page_title.replace(/"/g, '""')}"`,
      `"${v.path}"`,
      `"${v.device}"`,
      `"${v.os}"`,
      `"${v.browser}"`,
      `"${v.referrer}"`,
      `"${new Date(v.created_at).toLocaleString("ar-EG")}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `agriport-website-traffic-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerOpsToast("ØªÙ… ØªØµØ¯ÙŠØ± Ø³Ø¬Ù„ Ø­Ø±ÙƒØ© Ø§Ù„Ø²ÙˆØ§Ø± Ø¨Ù†Ø¬Ø§Ø­ ðŸ“Š", "success", "ØªØµØ¯ÙŠØ± Ø§Ù„ØªØ±Ø§ÙÙŠÙƒ");
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600">
              <Globe2 className="w-5 h-5" />
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                Ø­Ø±ÙƒØ© ÙˆØ²ÙˆØ§Ø± Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ
              </h2>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Ø¨Ø« Ø­ÙŠ ÙˆÙ…Ø¨Ø§Ø´Ø±</span>
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Ø±ØµØ¯ Ù…Ø¨Ø§Ø´Ø± Ù„Ù„Ø²ÙˆØ§Ø± Ø§Ù„Ø°ÙŠÙ† ÙŠØªØµÙØ­ÙˆÙ† Ù…ÙˆÙ‚Ø¹ Ø§Ù„ØªØµØ¯ÙŠØ± Ø¨Ø¯ÙˆÙ† ØªØ³Ø¬ÙŠÙ„ (Ø§Ù„Ø¯ÙˆÙ„ØŒ Ø§Ù„Ù…Ø­Ø§ØµÙŠÙ„ Ø§Ù„ØªÙŠ ØªØµÙØ­ÙˆÙ‡Ø§ØŒ Ø§Ù„Ø£Ø¬Ù‡Ø²Ø© ÙˆÙ…ØµØ§Ø¯Ø± Ø§Ù„ÙˆØµÙˆÙ„)
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => fetchTraffic(false)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
            title="ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙÙˆØ±Ø§Ù‹"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>ØªØ­Ø¯ÙŠØ« Ø­ÙŠ</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>ØªØµØ¯ÙŠØ± Ø§Ù„Ø³Ø¬Ù„ (Excel)</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Pulse Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Now */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-5 rounded-3xl shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              Ù†Ø´Ø·ÙˆÙ† Ø§Ù„Ø¢Ù† Ø¨Ø§Ù„Ù…ÙˆÙ‚Ø¹
            </span>
            <span className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-sm">
              <Radio className="w-4 h-4 text-white animate-pulse" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight">
              {stats.activeNow}
            </span>
            <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
              ÙÙŠ Ù‡Ø°Ù‡ Ø§Ù„Ù„Ø­Ø¸Ø©
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-emerald-100/90 font-medium">
            ÙŠØªÙ†Ù‚Ù„ÙˆÙ† Ø¨ÙŠÙ† ØµÙØ­Ø§Øª ÙˆÙ…Ø­Ø§ØµÙŠÙ„ Ø§Ù„Ù…ÙˆÙ‚Ø¹
          </p>
        </div>

        {/* Visits Today */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ø²ÙŠØ§Ø±Ø§Øª Ø§Ù„ÙŠÙˆÙ…
            </span>
            <span className="h-8 w-8 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-slate-700" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.visitsToday}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              ØµÙØ­Ø© Ù…Ø¹Ø±ÙˆØ¶Ø©
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„ØªØµÙØ­ Ø§Ù„ÙŠÙˆÙ…ÙŠ
          </p>
        </div>

        {/* Unique Visitors */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ø²ÙˆØ§Ø± ÙØ±ÙŠØ¯ÙˆÙ†
            </span>
            <span className="h-8 w-8 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4.5 h-4.5 text-blue-600" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-800 tracking-tight">
              {stats.uniqueVisitorsToday}
            </span>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
              Ù…Ø´ØªØ±ÙŠÙ† Ù…Ø­ØªÙ…Ù„ÙŠÙ†
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            Ø£Ø¬Ù‡Ø²Ø© ÙØ±ÙŠØ¯Ø© Ø¯Ø®Ù„Øª Ø§Ù„Ù…Ù†ØµØ© Ø§Ù„ÙŠÙˆÙ…
          </p>
        </div>

        {/* Top Country */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ø£ÙƒØ«Ø± Ø³ÙˆÙ‚ Ù…Ù‡ØªÙ…
            </span>
            <span className="h-8 w-8 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4.5 h-4.5 text-amber-600" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>{stats.topCountries[0]?.flag || "ðŸŒ"}</span>
              <span className="truncate">
                {stats.topCountries[0]?.name || (stats.totalVisits === 0 ? "Ø¨Ø§Ù†ØªØ¸Ø§Ø± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª..." : "ØºÙŠØ± Ù…Ø­Ø¯Ø¯")}
              </span>
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            {stats.topCountries[0]?.count
              ? `Ø³Ø¬Ù„ ${stats.topCountries[0].count} Ø²ÙŠØ§Ø±Ø§Øª Ù…Ù† Ù‡Ø°Ø§ Ø§Ù„Ø³ÙˆÙ‚`
              : "Ø£Ø¹Ù„Ù‰ Ù…Ø¹Ø¯Ù„ ØªØµÙØ­ Ù„Ù„ÙƒØªØ§Ù„ÙˆØ¬ Ø§Ù„Ù…ØµØ±ÙŠ"}
          </p>
        </div>
      </div>

      {/* 3. Analytics Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Export Countries */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-start">
          <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Ø§Ù„Ø¯ÙˆÙ„ ÙˆØ§Ù„Ø£Ø³ÙˆØ§Ù‚ Ø§Ù„Ø£ÙƒØ«Ø± ØªØµÙØ­Ø§Ù‹</span>
          </h3>
          <p className="text-[11px] text-slate-400 mb-4 font-medium">
            ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ø²ÙˆØ§Ø± Ø§Ù„Ø£Ø¬Ø§Ù†Ø¨ ÙˆØ§Ù„Ù…Ø­Ù„ÙŠÙŠÙ† Ø­Ø³Ø¨ Ø§Ù„Ø¨Ù„Ø¯
          </p>

          <div className="space-y-3">
            {stats.topCountries.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Ø¨Ø§Ù†ØªØ¸Ø§Ø± Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ Ø£ÙˆÙ„ Ø²Ø§Ø¦Ø± Ø­Ù‚ÙŠÙ‚ÙŠ Ù„Ù„Ù…ÙˆÙ‚Ø¹...
              </div>
            ) : (
              stats.topCountries.slice(0, 5).map((country) => {
                const percent = Math.min(
                  100,
                  Math.round((country.count / (stats.totalVisits || 1)) * 100)
                );
                return (
                  <div key={country.name}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </span>
                      <span className="text-slate-500 text-[11px] font-mono">
                        {country.count} Ø²ÙŠØ§Ø±Ø© ({percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Top Visited Pages & Produce */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-start">
          <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Package className="w-4 h-4 text-teal-600" />
            <span>Ø£ÙƒØ«Ø± Ø§Ù„Ù…Ø­Ø§ØµÙŠÙ„ ÙˆØ§Ù„ØµÙØ­Ø§Øª ØªØµÙØ­Ø§Ù‹</span>
          </h3>
          <p className="text-[11px] text-slate-400 mb-4 font-medium">
            Ù…Ø§ ÙŠØ¨Ø­Ø« Ø¹Ù†Ù‡ Ø§Ù„Ù…Ø³ØªÙˆØ±Ø¯ÙˆÙ† Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…ÙˆÙ‚Ø¹
          </p>

          <div className="space-y-3">
            {stats.topPages.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Ø³ØªØ¸Ù‡Ø± Ù‡Ù†Ø§ Ø£ÙƒØ«Ø± Ø§Ù„Ù…Ø­Ø§ØµÙŠÙ„ ÙˆØ§Ù„ØµÙØ­Ø§Øª ØªØµÙØ­Ø§Ù‹ ÙÙˆØ± Ø²ÙŠØ§Ø±Ø© Ø§Ù„Ù…Ø´ØªØ±ÙŠÙ†.
              </div>
            ) : (
              stats.topPages.slice(0, 5).map((page) => {
                const percent = Math.min(
                  100,
                  Math.round((page.count / (stats.totalVisits || 1)) * 100)
                );
                return (
                  <div key={page.path}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="truncate max-w-[180px] text-slate-800 font-bold">
                        {page.title}
                      </span>
                      <span className="text-slate-500 text-[11px] font-mono">
                        {page.count} Ù…Ø´Ø§Ù‡Ø¯Ø©
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-teal-500 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-start flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-teal-600" />
              <span>ØªÙˆØ²ÙŠØ¹ Ø£Ø¬Ù‡Ø²Ø© Ø§Ù„Ø²ÙˆØ§Ø±</span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-4 font-medium">
              Ù†ÙˆØ¹ Ø§Ù„Ø¬Ù‡Ø§Ø² Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… ÙÙŠ ØªØµÙØ­ Ø§Ù„Ù…ÙˆÙ‚Ø¹
            </p>

            <div className="grid grid-cols-2 gap-3 text-center mb-5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col items-center">
                <Monitor className="w-6 h-6 text-emerald-600 mb-1" />
                <p className="text-xs font-bold text-slate-800">ÙƒÙ…Ø¨ÙŠÙˆØªØ± Ù…ÙƒØªØ¨ÙŠ</p>
                <p className="text-base font-extrabold text-emerald-600 mt-0.5">
                  {stats.desktopPercent}%
                </p>
                <p className="text-[10px] text-slate-400">{stats.desktopCount} Ø²ÙŠØ§Ø±Ø©</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col items-center">
                <Smartphone className="w-6 h-6 text-teal-600 mb-1" />
                <p className="text-xs font-bold text-slate-800">Ù‡Ø§ØªÙ Ø°ÙƒÙŠ</p>
                <p className="text-base font-extrabold text-teal-600 mt-0.5">
                  {stats.mobilePercent}%
                </p>
                <p className="text-[10px] text-slate-400">{stats.mobileCount} Ø²ÙŠØ§Ø±Ø©</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-[11px] text-emerald-900 leading-relaxed font-medium flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p><strong>Ù…Ù„Ø§Ø­Ø¸Ø© Ù„Ù„Ù…ØµØ¯Ø±ÙŠÙ†:</strong> ØºØ§Ù„Ø¨ÙŠØ© Ø§Ù„Ù…Ø³ØªÙˆØ±Ø¯ÙŠÙ† Ø§Ù„Ø£ÙˆØ±ÙˆØ¨ÙŠÙŠÙ† ÙŠØªØµÙØ­ÙˆÙ† Ø§Ù„ÙƒØªØ§Ù„ÙˆØ¬ Ù…Ù† Ø£Ø¬Ù‡Ø²Ø© Ø§Ù„ÙƒÙ…Ø¨ÙŠÙˆØªØ± Ø§Ù„Ù…ÙƒØªØ¨ÙŠØ©ØŒ Ø¨ÙŠÙ†Ù…Ø§ ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ø®Ù„ÙŠØ¬ Ø¨Ù†Ø³Ø¨Ø© Ø£Ø¹Ù„Ù‰ Ø¹Ù„Ù‰ Ø§Ù„Ù‡ÙˆØ§ØªÙ ÙˆØ§Ù„ÙˆØ§ØªØ³Ø§Ø¨.</p>
          </div>
        </div>
      </div>

      {/* 4. Live Stream Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden text-start">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="text-sm font-bold text-slate-900">
              Ø³Ø¬Ù„ Ø§Ù„Ø²ÙŠØ§Ø±Ø§Øª Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø© Ù„Ù„Ù…ÙˆÙ‚Ø¹ (Live Stream)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              ({filteredVisits.length} Ø²ÙŠØ§Ø±Ø© Ù…Ø³Ø¬Ù„Ø©)
            </span>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ø¨Ø­Ø« Ø¨Ø§Ù„Ø¯ÙˆÙ„Ø© Ø£Ùˆ Ø§Ù„ØµÙØ­Ø© Ø£Ùˆ Ø§Ù„Ø¬Ù‡Ø§Ø²..."
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 w-48 sm:w-60"
            />

            <select
              value={selectedCountryFilter}
              onChange={(e) => setSelectedCountryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">ÙƒÙ„ Ø§Ù„Ø¯ÙˆÙ„</option>
              {stats.topCountries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredVisits.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2.5 px-4">
            <Radio className="w-9 h-9 text-slate-300 animate-pulse" />
            <p className="font-bold text-slate-700 text-sm">
              {searchQuery || selectedCountryFilter !== "all"
                ? "Ù„Ø§ ØªÙˆØ¬Ø¯ Ø²ÙŠØ§Ø±Ø§Øª Ù…Ø·Ø§Ø¨Ù‚Ø© Ù„Ù„Ø¨Ø­Ø« Ø­Ø§Ù„ÙŠØ§Ù‹."
                : "Ø¨Ø§Ù†ØªØ¸Ø§Ø± Ø­Ø±ÙƒØ© ÙˆØ²ÙˆØ§Ø± Ø­Ù‚ÙŠÙ‚ÙŠÙŠÙ† Ø¹Ù„Ù‰ Ø§Ù„Ù…ÙˆÙ‚Ø¹"}
            </p>
            <p className="text-[11px] text-slate-400 max-w-md leading-relaxed">
              {searchQuery || selectedCountryFilter !== "all"
                ? "Ø¬Ø±Ø¨ Ø¥Ø²Ø§Ù„Ø© Ù…Ø¹Ø§ÙŠÙŠØ± Ø§Ù„Ø¨Ø­Ø« Ø£Ùˆ Ø§Ø®ØªÙŠØ§Ø± Ø¯ÙˆÙ„Ø© Ø£Ø®Ø±Ù‰."
                : "ØªØµÙØ­ Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø§Ù„Ø¢Ù† Ù…Ù† Ø£ÙŠ Ù‡Ø§ØªÙ Ø£Ùˆ ÙƒÙ…Ø¨ÙŠÙˆØªØ±ØŒ ÙˆØ³ÙŠØªÙ… Ø±ØµØ¯ Ø­Ø±ÙƒØªÙƒ ÙˆØ¯ÙˆÙ„ØªÙƒ ÙˆÙ†ÙˆØ¹ Ø¬Ù‡Ø§Ø²Ùƒ ÙÙŠ Ù‡Ø°Ø§ Ø§Ù„Ø¬Ø¯ÙˆÙ„ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¨Ø§Ù„Ø«ÙˆØ§Ù†ÙŠ!"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold">
                  <th className="py-3 px-6 text-start">Ø§Ù„Ø¯ÙˆÙ„Ø© ÙˆØ§Ù„Ù…Ø¯ÙŠÙ†Ø©</th>
                  <th className="py-3 px-6 text-start">Ø§Ù„ØµÙØ­Ø© / Ø§Ù„Ù…Ø­ØµÙˆÙ„</th>
                  <th className="py-3 px-6 text-start">Ø§Ù„Ø¬Ù‡Ø§Ø² ÙˆØ§Ù„Ù…ØªØµÙØ­</th>
                  <th className="py-3 px-6 text-start">Ù…ØµØ¯Ø± Ø§Ù„Ø²ÙŠØ§Ø±Ø©</th>
                  <th className="py-3 px-6 text-start">ØªÙˆÙ‚ÙŠØª Ø§Ù„Ø²ÙŠØ§Ø±Ø©</th>
                  <th className="py-3 px-6 text-end">Ù…Ø¹Ø±Ù Ø§Ù„Ø²Ø§Ø¦Ø±</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVisits.map((visit) => {
                  const visitDate = new Date(visit.created_at);
                  const isRecent = Date.now() - visitDate.getTime() < 10 * 60 * 1000;

                  return (
                    <tr
                      key={visit.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Country & Flag */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{visit.flag || "ðŸŒ"}</span>
                          <div>
                            <p className="font-bold text-slate-900">
                              {visit.country}
                            </p>
                            {visit.city && (
                              <p className="text-[10px] text-slate-400">{visit.city}</p>
                            )}
                          </div>
                          {isRecent && (
                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold animate-pulse">
                              Ø§Ù„Ø¢Ù†
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Page Visited */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-800">
                            {visit.page_title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 dir-ltr">
                            ({visit.path})
                          </span>
                        </div>
                      </td>

                      {/* Device & Browser */}
                      <td className="py-3.5 px-6">
                        <div className="text-slate-700">
                          <p className="font-medium">{visit.device}</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {visit.os} â€¢ {visit.browser}
                          </p>
                        </div>
                      </td>

                      {/* Referrer */}
                      <td className="py-3.5 px-6">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium">
                          <span>{visit.referrer_icon || "ðŸŒ"}</span>
                          <span>{visit.referrer}</span>
                        </span>
                      </td>

                      {/* Timestamp */}
                      <td className="py-3.5 px-6">
                        <div className="text-slate-600">
                          <p className="font-medium">
                            {visitDate.toLocaleTimeString("ar-EG", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {visitDate.toLocaleDateString("ar-EG", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </td>

                      {/* Anonymous ID */}
                      <td className="py-3.5 px-6 text-end">
                        <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                          {visit.visitor_id.slice(0, 12)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Microsoft Clarity Integration & Live Session Replay */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-indigo-800/40 text-start space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
                <Video className="w-5 h-5 text-indigo-300" />
              </span>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Ø±Ø¨Ø· Ø®Ø¯Ù…Ø© Microsoft Clarity (ØªØ³Ø¬ÙŠÙ„ Ø¬Ù„Ø³Ø§Øª Ø§Ù„Ø²ÙˆØ§Ø± ÙˆØ§Ù„Ø®Ø±ÙŠØ·Ø© Ø§Ù„Ø­Ø±Ø§Ø±ÙŠØ©)</span>
                  {clarityId ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold">
                      â— Ù…ÙØ¹Ù‘Ù„ ÙˆÙ†Ø´Ø·
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[11px] font-bold">
                      â—‹ ØºÙŠØ± Ù…ØªØµÙ„
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Ø£Ø¯Ø§Ø© Ø±Ø³Ù…ÙŠØ© Ù…Ø¬Ø§Ù†ÙŠØ© 100% Ù…Ù† Ù…ÙŠÙƒØ±ÙˆØ³ÙˆÙØª Ù„Ù…Ø´Ø§Ù‡Ø¯Ø© ÙÙŠØ¯ÙŠÙˆ Ø­Ù‚ÙŠÙ‚ÙŠ Ù„Ø´Ø§Ø´Ø© Ø§Ù„Ø²Ø§Ø¦Ø± ÙˆØ­Ø±ÙƒØ§Øª Ø§Ù„Ù…Ø§ÙˆØ³ ÙˆØ§Ù„Ù†Ù‚Ø±Ø§Øª (Heatmaps) Ø¯ÙˆÙ† Ø£ÙŠ Ø±Ø³ÙˆÙ….
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://clarity.microsoft.com/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… ÙƒÙ„Ø§Ø±ÙŠØªÙŠ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Status & Input Area */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-indigo-900/40">
          {clarityId && !isEditingClarity ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>ÙƒÙˆØ¯ Ø§Ù„ØªØªØ¨Ø¹ ÙŠØ¹Ù…Ù„ Ø­Ø§Ù„ÙŠØ§Ù‹ Ø¹Ù„Ù‰ ÙƒÙ„ ØµÙØ­Ø§Øª Ù…ÙˆÙ‚Ø¹ AgriPort</span>
                </div>
                <div className="text-sm font-mono text-slate-200">
                  Project ID: <span className="bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-800 font-bold text-indigo-300">{clarityId}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  ØªØ³ØªØ·ÙŠØ¹ Ø§Ù„Ø¢Ù† ÙØªØ­ Ø­Ø³Ø§Ø¨Ùƒ ÙÙŠ ÙƒÙ„Ø§Ø±ÙŠØªÙŠ Ù„Ù…Ø´Ø§Ù‡Ø¯Ø© ØªØ³Ø¬ÙŠÙ„Ø§Øª ÙƒÙ„ Ø²Ø§Ø¦Ø±ØŒ ÙˆÙ…Ø·Ø§Ø¨Ù‚Ø© Ø§Ù„Ø²ÙˆØ§Ø± Ø¨Ù†ÙØ³ Ø§Ù„Ù€ Visitor ID Ø§Ù„Ù…Ø³Ø¬Ù„ Ù‡Ù†Ø§.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingClarity(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>ØªØºÙŠÙŠØ± Ø§Ù„Ù…Ø¹Ø±Ù</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={clarityInput}
                  onChange={(e) => setClarityInput(e.target.value)}
                  placeholder="Ø£Ù„ØµÙ‚ Ù‡Ù†Ø§ Ø§Ù„Ù€ Project ID Ø§Ù„Ø®Ø§Øµ Ø¨Ùƒ (Ù…Ø«Ø§Ù„: k9xyz123abc)"
                  className="flex-1 rounded-xl bg-slate-950 border border-indigo-800/60 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 font-mono"
                  dir="ltr"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveClarity}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <span>Ø­ÙØ¸ ÙˆØªÙØ¹ÙŠÙ„ Ø§Ù„ÙƒÙˆØ¯</span>
                    <Zap className="w-3.5 h-3.5" />
                  </button>
                  {isEditingClarity && (
                    <button
                      type="button"
                      onClick={() => {
                        setClarityInput(clarityId);
                        setIsEditingClarity(false);
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                    >
                      Ø¥Ù„ØºØ§Ø¡
                    </button>
                  )}
                </div>
              </div>

              {/* 4 Steps Guide */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-start space-y-1">
                  <span className="text-xs font-extrabold text-indigo-400">1. Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ù…Ø¬Ø§Ù†ÙŠ</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Ø§ÙØªØ­ <a href="https://clarity.microsoft.com/" target="_blank" rel="noreferrer" className="text-indigo-300 underline">clarity.microsoft.com</a> ÙˆØ³Ø¬Ù„ Ø¨Ø­Ø³Ø§Ø¨Ùƒ (Ù…Ø¬Ø§Ù†Ø§Ù‹ Ø¨Ø¯ÙˆÙ† ÙÙŠØ²Ø§).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-start space-y-1">
                  <span className="text-xs font-extrabold text-indigo-400">2. Ø¥Ø¶Ø§ÙØ© Ù…Ø´Ø±ÙˆØ¹</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Ø§Ø¶ØºØ· <strong>New Project</strong> ÙˆØ§ÙƒØªØ¨ Ø§Ø³Ù… "AgriPort" ÙˆØ±Ø§Ø¨Ø· Ù…ÙˆÙ‚Ø¹Ùƒ.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-start space-y-1">
                  <span className="text-xs font-extrabold text-indigo-400">3. Ù†Ø³Ø® Project ID</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Ù…Ù† ØµÙØ­Ø© Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù†Ø³Ø® ÙƒÙˆØ¯ Ø§Ù„Ù€ <strong>Project ID</strong> Ø§Ù„Ù…ÙƒÙˆÙ† Ù…Ù† Ø­Ø±ÙˆÙ ÙˆØ£Ø±Ù‚Ø§Ù….
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-start space-y-1">
                  <span className="text-xs font-extrabold text-indigo-400">4. Ù„ØµÙ‚ ÙˆØªÙØ¹ÙŠÙ„</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Ø£Ù„ØµÙ‚Ù‡ ÙÙŠ Ø§Ù„Ø­Ù‚Ù„ Ø£Ø¹Ù„Ø§Ù‡ ÙˆØ§Ø¶ØºØ· Ø­ÙØ¸Ø› ÙˆØ³ÙŠØ¨Ø¯Ø£ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø´Ø§Ø´Ø§Øª ÙÙˆØ±Ø§Ù‹!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

