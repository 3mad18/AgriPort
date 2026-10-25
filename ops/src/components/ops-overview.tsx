/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { getVisitorSiteUrl } from "@/lib/urls";
import { useOpsStore, type Inquiry } from "@/context/ops-store-context";

export function OpsOverview({
  onNavigateTab,
}: {
  onNavigateTab: (tab: "overview" | "notifications" | "products" | "settings") => void;
}) {
  const { inquiries, products, unreadInquiriesCount } = useOpsStore();

  const closedDealsCount = inquiries.filter(
    (i) => i.status === "تم الاتفاق"
  ).length;

  const inProgressCount = inquiries.filter(
    (i) => i.status === "قيد المتابعة"
  ).length;

  const recentInquiries = inquiries.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* KPI Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Inquiries */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs text-start">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              إجمالي طلبات التوريد
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg">
              📈
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {inquiries.length}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              صفقات دولية
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400 font-medium">
            واردة عبر موقع التصدير الرسمي
          </p>
        </div>

        {/* Card 2: New Unread Inquiries */}
        <div
          onClick={() => onNavigateTab("notifications")}
          className="rounded-3xl border border-emerald-300/80 bg-gradient-to-br from-emerald-50/50 to-white p-6 shadow-xs text-start cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              طلبات جديدة غير مقروءة
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white text-lg group-hover:scale-110 transition-transform">
              🔔
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700 tracking-tight">
              {unreadInquiriesCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full animate-pulse">
              تحتاج متابعة فورا
            </span>
          </div>
          <p className="mt-2 text-xs text-emerald-600/80 font-medium flex items-center gap-1">
            <span>انقر للمعاينة والرد</span>
            <span>←</span>
          </p>
        </div>

        {/* Card 3: Active Produce Catalog */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs text-start">
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
            موالح، بصل، ثوم، فراولة، رمان، بطاطس
          </p>
        </div>

        {/* Card 4: Closed Deals */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs text-start">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              صفقات تم الاتفاق عليها
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
            {recentInquiries.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigateTab("notifications")}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 hover:bg-slate-100/70 hover:border-slate-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-lg shadow-xs">
                    📦
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({item.company})
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-emerald-700">
                        {item.product}
                      </span>
                      <span>•</span>
                      <span>{item.quantity}</span>
                      <span>•</span>
                      <span>{item.country}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
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
            ))}
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
                onClick={() => onNavigateTab("products")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 p-3 font-semibold text-white transition-colors"
              >
                <span>➕</span>
                <span>إضافة محصول</span>
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
                onClick={() => onNavigateTab("notifications")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 p-3 font-semibold text-white transition-colors"
              >
                <span>🔔</span>
                <span>مركز الإشعارات</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
