/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { getVisitorSiteUrl } from "@/lib/urls";
import { useOpsStore, type Inquiry } from "@/context/ops-store-context";
import { isFacilityVisit } from "@/components/ops-visits-center";

export function OpsOverview({
  onNavigateTab,
  onOpenAddProduct,
}: {
  onNavigateTab: (tab: "overview" | "notifications" | "visits" | "products" | "users" | "traffic" | "settings") => void;
  onOpenAddProduct?: () => void;
}) {
  const { inquiries, products, registeredUsers } = useOpsStore();

  const visitInquiries = inquiries.filter(isFacilityVisit);
  const priceQuoteInquiries = inquiries.filter((i) => !isFacilityVisit(i));

  const unreadVisitsCount = visitInquiries.filter((v) => !v.read).length;
  const unreadPriceQuotesCount = priceQuoteInquiries.filter((q) => !q.read).length;

  const closedDealsCount = inquiries.filter(
    (i) => i.status === "تم الاتفاق"
  ).length;

  const inProgressCount = inquiries.filter(
    (i) => i.status === "قيد المتابعة"
  ).length;

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* KPI Stats Grid */}
      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Card 1: Total Price Quotes */}
        <div
          onClick={() => onNavigateTab("notifications")}
          className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs text-start cursor-pointer hover:border-slate-300 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              طلبات عروض الأسعار
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg">
              📈
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {priceQuoteInquiries.length}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              عروض تسعير
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">
            واردة عبر موقع التصدير
          </p>
        </div>

        {/* Card 2: New Unread Price Quotes */}
        <div
          onClick={() => onNavigateTab("notifications")}
          className="rounded-3xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/50 to-white p-5 sm:p-6 shadow-xs text-start cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              تسعير غير مقروء
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white text-lg group-hover:scale-110 transition-transform">
              🔔
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700 tracking-tight">
              {unreadPriceQuotesCount}
            </span>
            {unreadPriceQuotesCount > 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full animate-pulse">
                جديد
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-emerald-600/80 font-medium flex items-center gap-1">
            <span>انقر للمعاينة والرد</span>
            <span>←</span>
          </p>
        </div>

        {/* Card 3: Dedicated Field Visits KPI */}
        <div
          onClick={() => onNavigateTab("visits")}
          className="rounded-3xl border border-teal-300/80 bg-gradient-to-br from-teal-50/60 to-white p-5 sm:p-6 shadow-xs text-start cursor-pointer hover:border-teal-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              الزيارات الميدانية
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-white text-lg group-hover:scale-110 transition-transform">
              🏛️
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-teal-900 tracking-tight">
              {visitInquiries.length}
            </span>
            {unreadVisitsCount > 0 ? (
              <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full animate-pulse">
                {unreadVisitsCount} جديد
              </span>
            ) : (
              <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                وفود تجارية
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-teal-700/80 font-medium flex items-center gap-1">
            <span>تفقد المحطات والمزارع</span>
            <span>←</span>
          </p>
        </div>

        {/* Card 4: Active Produce Catalog */}
        <div
          onClick={() => onNavigateTab("products")}
          className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs text-start cursor-pointer hover:border-slate-300 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              المحاصيل بالكتالوج
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 text-lg">
              🍊
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {products.length}
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              أصناف رئيسية
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">
            موالح، بصل، ثوم، فراولة...
          </p>
        </div>

        {/* Card 5: Closed Deals */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs text-start">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              عقود تم الاتفاق عليها
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-lg">
              🤝
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {closedDealsCount}
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              عقود تصدير
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">
            {inProgressCount} طلبات قيد التفاوض والمتابعة
          </p>
        </div>

        {/* Card 6: Registered Clients */}
        <div
          onClick={() => onNavigateTab("users")}
          className="rounded-3xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/50 to-white p-5 sm:p-6 shadow-xs text-start cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
              العملاء المسجلون
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white text-lg group-hover:scale-110 transition-transform">
              👥
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-900 tracking-tight">
              {registeredUsers.length}
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
              عميل
            </span>
          </div>
          <p className="mt-2 text-xs text-indigo-600/80 font-medium flex items-center gap-1">
            <span>إدارة وتواصل العملاء</span>
            <span>←</span>
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Inquiries Stream & Crops Demand */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Stream of Recent Inquiries (7 Cols) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs lg:col-span-7 text-start">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                أحدث طلبات التصدير الواردة
              </h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                آخر المستوردين الذين تواصلوا لطلب تسعير وشحنات
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("notifications")}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              عرض الكل ({inquiries.length}) ←
            </button>
          </div>

          <div className="space-y-3">
            {recentInquiries.map((item) => {
              const isVisit = isFacilityVisit(item);
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigateTab(isVisit ? "visits" : "notifications")}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 sm:p-4 transition-all cursor-pointer group ${
                    isVisit
                      ? "border-teal-200/80 bg-teal-50/40 hover:bg-teal-50"
                      : "border-slate-100 bg-slate-50/60 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-base sm:text-lg shadow-xs">
                      {isVisit ? "🏛️" : "📦"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-500 truncate">
                          ({item.company})
                        </span>
                        {isVisit && (
                          <span className="rounded-md bg-teal-100 text-teal-800 px-1.5 py-0.5 text-[10px] font-bold">
                            زيارة ميدانية
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500 flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
                        <span className="font-semibold text-emerald-700">
                          {isVisit ? "تفقد المحطات والمزارع" : item.product}
                        </span>
                        <span>•</span>
                        <span>{item.quantity}</span>
                        <span>•</span>
                        <span>{item.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span
                      className={`rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] font-bold ${
                        item.status === "جديد"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "قيد المتابعة"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-slate-400 text-xs group-hover:translate-x-1 transition-transform">
                      ←
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Crops Demand & Quick Shortcuts (5 Cols) */}
        <div className="space-y-6 lg:col-span-5 text-start">
          {/* Top Export Crops Demand */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              المحاصيل الأكثر طلباً في التصدير
            </h3>
            <p className="text-xs text-slate-400 font-medium mb-5">
              نسبة الطلبات وفق استفسارات المستوردين الحالية
            </p>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>🍊 برتقال فالنسيا وموالح صيفية</span>
                  <span className="text-emerald-600 font-extrabold">42%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: "42%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>🧅 بصل أحمر وذهبي مجفف</span>
                  <span className="text-emerald-600 font-extrabold">26%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full"
                    style={{ width: "26%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>🍓 فراولة طازجة (شحن جوي)</span>
                  <span className="text-emerald-600 font-extrabold">18%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: "18%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>🥔 بطاطس تصدير وتصنيع</span>
                  <span className="text-emerald-600 font-extrabold">14%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: "14%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Admin Actions Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-slate-900 p-6 shadow-sm text-white">
            <h3 className="text-base font-bold mb-1">
              إجراءات سريعة للتحكم
            </h3>
            <p className="text-xs text-slate-400 font-medium mb-4">
              إدارة المحاصيل وإعدادات الشركة بضغطة زر
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  if (onOpenAddProduct) {
                    onOpenAddProduct();
                  } else {
                    onNavigateTab("products");
                  }
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 font-semibold text-white transition-colors cursor-pointer"
              >
                <span>➕</span>
                <span>إضافة محصول</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab("visits")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-teal-800/80 hover:bg-teal-700 border border-teal-600/50 p-3 font-semibold text-white transition-colors cursor-pointer"
              >
                <span>🏛️</span>
                <span>جدول الزيارات</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab("settings")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 font-semibold text-white transition-colors"
              >
                <span>⚙️</span>
                <span>تعديل التواصل</span>
              </button>

              <a
                href={getVisitorSiteUrl("/products")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 font-semibold text-white transition-colors"
              >
                <span>🌐</span>
                <span>معاينة الكتالوج</span>
              </a>

              <button
                type="button"
                onClick={() => onNavigateTab("users")}
                className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 p-3 font-semibold text-white transition-colors cursor-pointer"
              >
                <span>👥</span>
                <span>قاعدة بيانات العملاء المسجلين ({registeredUsers.length})</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab("traffic")}
                className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 p-3 font-semibold text-white transition-colors cursor-pointer"
              >
                <span>🌐</span>
                <span>رصد حركة وزوار الموقع المباشر (Traffic)</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab("notifications")}
                className="col-span-2 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 p-3 font-semibold text-white transition-colors"
              >
                <span>🔔</span>
                <span>مركز طلبات عروض الأسعار</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
