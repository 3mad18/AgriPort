"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { triggerOpsToast } from "@/components/ops/ops-toast";

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
        triggerOpsToast("تم تفعيل كود Microsoft Clarity بنجاح في الموقع! 🎉", "success", "ربط كلاريتي");
      } else {
        localStorage.removeItem("agriport_clarity_project_id");
        setClarityId("");
        setIsEditingClarity(false);
        triggerOpsToast("تم إلغاء ربط كود كلاريتي", "info", "تنبيه");
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
      triggerOpsToast("لا توجد بيانات زيارات حالية للتصدير", "error", "تنبيه");
      return;
    }

    const headers = [
      "مُعرف الزائر المجهول",
      "الدولة",
      "المدينة",
      "الصفحة التي زارها",
      "مسار الرابط",
      "نوع الجهاز",
      "نظام التشغيل",
      "المتصفح",
      "مصدر الزيارة",
      "تاريخ ووقت الزيارة",
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

    triggerOpsToast("تم تصدير سجل حركة الزوار بنجاح 📊", "success", "تصدير الترافيك");
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 text-lg">
              🌐
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                حركة وزوار الموقع في الوقت الفعلي
              </h2>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>بث حي ومباشر</span>
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            رصد مباشر للزوار الذين يتصفحون موقع التصدير بدون تسجيل (الدول، المحاصيل التي تصفحوها، الأجهزة ومصادر الوصول)
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => fetchTraffic(false)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
            title="تحديث البيانات فوراً"
          >
            <span className={isLoading ? "animate-spin" : ""}>🔄</span>
            <span>تحديث حي</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span>📊</span>
            <span>تصدير السجل (Excel)</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Pulse Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Now */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-5 rounded-3xl shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
              نشطون الآن بالموقع
            </span>
            <span className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-sm animate-pulse">
              🔴
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight">
              {stats.activeNow}
            </span>
            <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
              في هذه اللحظة
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-emerald-100/90 font-medium">
            يتنقلون بين صفحات ومحاصيل الموقع
          </p>
        </div>

        {/* Visits Today */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              زيارات اليوم
            </span>
            <span className="h-8 w-8 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm">
              📈
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.visitsToday}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              صفحة معروضة
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            إجمالي التصفح اليومي
          </p>
        </div>

        {/* Unique Visitors */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              زوار فريدون
            </span>
            <span className="h-8 w-8 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
              👥
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-800 tracking-tight">
              {stats.uniqueVisitorsToday}
            </span>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
              مشترين محتملين
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            أجهزة فريدة دخلت المنصة اليوم
          </p>
        </div>

        {/* Top Country */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              أكثر سوق مهتم
            </span>
            <span className="h-8 w-8 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm">
              🏆
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>{stats.topCountries[0]?.flag || "🌐"}</span>
              <span className="truncate">
                {stats.topCountries[0]?.name || (stats.totalVisits === 0 ? "بانتظار البيانات..." : "غير محدد")}
              </span>
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            {stats.topCountries[0]?.count
              ? `سجل ${stats.topCountries[0].count} زيارات من هذا السوق`
              : "أعلى معدل تصفح للكتالوج المصري"}
          </p>
        </div>
      </div>

      {/* 3. Analytics Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Export Countries */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-start">
          <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span>🌍</span>
            <span>الدول والأسواق الأكثر تصفحاً</span>
          </h3>
          <p className="text-[11px] text-slate-400 mb-4 font-medium">
            توزيع الزوار الأجانب والمحليين حسب البلد
          </p>

          <div className="space-y-3">
            {stats.topCountries.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                بانتظار استقبال أول زائر حقيقي للموقع...
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
                        {country.count} زيارة ({percent}%)
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
            <span>📦</span>
            <span>أكثر المحاصيل والصفحات تصفحاً</span>
          </h3>
          <p className="text-[11px] text-slate-400 mb-4 font-medium">
            ما يبحث عنه المستوردون داخل الموقع
          </p>

          <div className="space-y-3">
            {stats.topPages.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                ستظهر هنا أكثر المحاصيل والصفحات تصفحاً فور زيارة المشترين.
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
                        {page.count} مشاهدة
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
              <span>📱</span>
              <span>توزيع أجهزة الزوار</span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-4 font-medium">
              نوع الجهاز المستخدم في تصفح الموقع
            </p>

            <div className="grid grid-cols-2 gap-3 text-center mb-5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="text-2xl">💻</span>
                <p className="text-xs font-bold text-slate-800 mt-1">كمبيوتر مكتبي</p>
                <p className="text-base font-extrabold text-emerald-600 mt-0.5">
                  {stats.desktopPercent}%
                </p>
                <p className="text-[10px] text-slate-400">{stats.desktopCount} زيارة</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className="text-2xl">📱</span>
                <p className="text-xs font-bold text-slate-800 mt-1">هاتف ذكي</p>
                <p className="text-base font-extrabold text-teal-600 mt-0.5">
                  {stats.mobilePercent}%
                </p>
                <p className="text-[10px] text-slate-400">{stats.mobileCount} زيارة</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-[11px] text-emerald-900 leading-relaxed font-medium">
            💡 <strong>ملاحظة للمصدرين:</strong> غالبية المستوردين الأوروبيين يتصفحون الكتالوج من أجهزة الكمبيوتر المكتبية، بينما يعتمد عملاء الخليج بنسبة أعلى على الهواتف والواتساب.
          </div>
        </div>
      </div>

      {/* 4. Live Stream Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden text-start">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="text-sm font-bold text-slate-900">
              سجل الزيارات المباشرة للموقع (Live Stream)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              ({filteredVisits.length} زيارة مسجلة)
            </span>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالدولة أو الصفحة أو الجهاز..."
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 w-48 sm:w-60"
            />

            <select
              value={selectedCountryFilter}
              onChange={(e) => setSelectedCountryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">كل الدول</option>
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
            <span className="text-3xl animate-pulse">📡</span>
            <p className="font-bold text-slate-700 text-sm">
              {searchQuery || selectedCountryFilter !== "all"
                ? "لا توجد زيارات مطابقة للبحث حالياً."
                : "بانتظار حركة وزوار حقيقيين على الموقع"}
            </p>
            <p className="text-[11px] text-slate-400 max-w-md leading-relaxed">
              {searchQuery || selectedCountryFilter !== "all"
                ? "جرب إزالة معايير البحث أو اختيار دولة أخرى."
                : "تصفح الموقع الآن من أي هاتف أو كمبيوتر، وسيتم رصد حركتك ودولتك ونوع جهازك في هذا الجدول مباشرة بالثواني!"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold">
                  <th className="py-3 px-6 text-start">الدولة والمدينة</th>
                  <th className="py-3 px-6 text-start">الصفحة / المحصول</th>
                  <th className="py-3 px-6 text-start">الجهاز والمتصفح</th>
                  <th className="py-3 px-6 text-start">مصدر الزيارة</th>
                  <th className="py-3 px-6 text-start">توقيت الزيارة</th>
                  <th className="py-3 px-6 text-end">معرف الزائر</th>
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
                          <span className="text-lg">{visit.flag || "🌐"}</span>
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
                              الآن
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
                            {visit.os} • {visit.browser}
                          </p>
                        </div>
                      </td>

                      {/* Referrer */}
                      <td className="py-3.5 px-6">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium">
                          <span>{visit.referrer_icon || "🌐"}</span>
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
                🎥
              </span>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>ربط خدمة Microsoft Clarity (تسجيل جلسات الزوار والخريطة الحرارية)</span>
                  {clarityId ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold">
                      ● مفعّل ونشط
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[11px] font-bold">
                      ○ غير متصل
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  أداة رسمية مجانية 100% من ميكروسوفت لمشاهدة فيديو حقيقي لشاشة الزائر وحركات الماوس والنقرات (Heatmaps) دون أي رسوم.
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
              <span>لوحة تحكم كلاريتي</span>
              <span>↗</span>
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
                  <span>كود التتبع يعمل حالياً على كل صفحات موقع AgriPort</span>
                </div>
                <div className="text-sm font-mono text-slate-200">
                  Project ID: <span className="bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-800 font-bold text-indigo-300">{clarityId}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  تستطيع الآن فتح حسابك في كلاريتي لمشاهدة تسجيلات كل زائر، ومطابقة الزوار بنفس الـ Visitor ID المسجل هنا.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingClarity(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  ✏️ تغيير المعرف
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
                  placeholder="ألصق هنا الـ Project ID الخاص بك (مثال: k9xyz123abc)"
                  className="flex-1 rounded-xl bg-slate-950 border border-indigo-800/60 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 font-mono"
                  dir="ltr"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveClarity}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md"
                  >
                    حفظ وتفعيل الكود ⚡
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
                      إلغاء
                    </button>
                  )}
                </div>
              </div>

              {/* 4 Steps Guide */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-start space-y-1">
                  <span className="text-xs font-extrabold text-indigo-400">1. التسجيل المجاني</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    افتح <a href="https://clarity.microsoft.com/" target="_blank" rel="noreferrer" className="text-indigo-300 underline">clarity.microsoft.com</a> وسجل بحسابك (مجاناً بدون فيزا).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-start space-y-1">
                  <span className="text-xs font-extrabold text-indigo-400">2. إضافة مشروع</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    اضغط <strong>New Project</strong> واكتب اسم "AgriPort" ورابط موقعك.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-start space-y-1">
                  <span className="text-xs font-extrabold text-indigo-400">3. نسخ Project ID</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    من صفحة الإعدادات انسخ كود الـ <strong>Project ID</strong> المكون من حروف وأرقام.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-start space-y-1">
                  <span className="text-xs font-extrabold text-indigo-400">4. لصق وتفعيل</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    ألصقه في الحقل أعلاه واضغط حفظ؛ وسيبدأ تسجيل الشاشات فوراً!
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
