/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import { useOpsStore, type Inquiry } from "@/context/ops-store-context";

export function isFacilityVisit(inquiry: Inquiry): boolean {
  if (!inquiry) return false;
  if (inquiry.incoterms === "Facility Visit") return true;
  if (
    inquiry.product &&
    (inquiry.product.includes("زيارة ميدانية") ||
      inquiry.product.toLowerCase().includes("visit"))
  )
    return true;
  if (inquiry.message && inquiry.message.includes("[Facility Visit Reservation]"))
    return true;
  return false;
}

export type ParsedVisit = {
  inquiry: Inquiry;
  leadVisitor: string;
  company: string;
  country: string;
  preferredDate: string;
  delegationSize: string;
  facilities: string[];
  targetCrops: string;
  airportPickup: boolean;
  notes: string;
};

export function parseVisitInquiry(inquiry: Inquiry): ParsedVisit {
  const msg = inquiry.message || "";

  let preferredDate = "";
  const dateMatch = msg.match(/Preferred Visit Date:\s*([^\n\r]+)/i);
  if (dateMatch) {
    preferredDate = dateMatch[1].trim();
  } else if (inquiry.destinationPort) {
    preferredDate = inquiry.destinationPort
      .replace(/^(Date:|تاريخ الزيارة:)\s*/i, "")
      .trim();
  }

  let delegationSize = inquiry.quantity || "1 شخص";
  const sizeMatch = msg.match(/Delegation Size:\s*([^\n\r]+)/i);
  if (sizeMatch) {
    delegationSize = sizeMatch[1].trim();
  }

  let facilities: string[] = [];
  const facMatch = msg.match(/Facilities to Inspect:\s*([^\n\r]+)/i);
  if (facMatch) {
    facilities = facMatch[1]
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  let targetCrops = "";
  const cropsMatch = msg.match(/Target Crops:\s*([^\n\r]+)/i);
  if (cropsMatch) {
    targetCrops = cropsMatch[1].trim();
  }

  let airportPickup = false;
  const airportMatch = msg.match(/Airport Pickup Required:\s*(YES|نعم|TRUE)/i);
  if (airportMatch) {
    airportPickup = true;
  }

  let notes = "";
  const notesMatch = msg.match(/Special Notes:\s*([\s\S]+)$/i);
  if (notesMatch) {
    notes = notesMatch[1].trim();
  } else if (!msg.includes("[Facility Visit Reservation]")) {
    notes = msg;
  }

  return {
    inquiry,
    leadVisitor: inquiry.name,
    company: inquiry.company,
    country: inquiry.country,
    preferredDate: preferredDate || inquiry.date,
    delegationSize,
    facilities,
    targetCrops,
    airportPickup,
    notes,
  };
}

export function OpsVisitsCenter({ searchQuery }: { searchQuery: string }) {
  const {
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    markInquiryRead,
    markAllInquiriesRead,
    showToast,
  } = useOpsStore();

  const [statusFilter, setStatusFilter] = useState<string>("الكل");
  const [selectedVisit, setSelectedVisit] = useState<ParsedVisit | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // All visit inquiries parsed
  const allVisits = useMemo(() => {
    return inquiries.filter(isFacilityVisit).map(parseVisitInquiry);
  }, [inquiries]);

  // Filtered visits
  const filteredVisits = useMemo(() => {
    return allVisits.filter((v) => {
      const matchesStatus =
        statusFilter === "الكل" ? true : v.inquiry.status === statusFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        v.leadVisitor.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.country.toLowerCase().includes(q) ||
        v.targetCrops.toLowerCase().includes(q) ||
        v.preferredDate.toLowerCase().includes(q) ||
        v.facilities.some((f) => f.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [allVisits, statusFilter, searchQuery]);

  // Counts
  const totalCount = allVisits.length;
  const newCount = allVisits.filter((v) => v.inquiry.status === "جديد").length;
  const coordinatingCount = allVisits.filter(
    (v) => v.inquiry.status === "قيد المتابعة"
  ).length;
  const confirmedCount = allVisits.filter(
    (v) => v.inquiry.status === "تم الاتفاق"
  ).length;
  const airportTransferCount = allVisits.filter((v) => v.airportPickup).length;
  const unreadCount = allVisits.filter((v) => !v.inquiry.read).length;

  const handleCopySummary = (v: ParsedVisit) => {
    const summary = `[حجز زيارة ميدانية - AgriPort]
رئيس الوفد: ${v.leadVisitor}
الشركة والدولة: ${v.company} (${v.country})
تاريخ الزيارة المقترح: ${v.preferredDate}
حجم الوفد: ${v.delegationSize}
المرافق المستهدفة: ${v.facilities.join(" | ") || "جميع المرافق المركزية"}
المحاصيل المطلوبة: ${v.targetCrops || "عام"}
استقبال المطار: ${v.airportPickup ? "نعم - مطلوب استقبال مطار" : "بدون"}
الهاتف: ${v.inquiry.phone}
البريد: ${v.inquiry.email}
ملاحظات: ${v.notes || "لا يوجد"}`;

    navigator.clipboard.writeText(summary);
    setCopiedId(v.inquiry.id);
    showToast("تم نسخ ملخص الزيارة إلى الحافظة بنجاح ✓", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getWhatsAppLink = (v: ParsedVisit) => {
    const cleanPhone = v.inquiry.phone.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `مرحباً م. ${v.leadVisitor}، معك إدارة العلاقات الدولية وتنسيق الزيارات في شركة AgriPort. بخصوص طلبكم الكريم لزيارة مزارعنا ومحطات التعبئة بتاريخ ${v.preferredDate}، يسعدنا الترحيب بكم والتنسيق معكم لترتيب برنامج الزيارة والاستقبال.`
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  const getEmailLink = (v: ParsedVisit) => {
    const subject = encodeURIComponent(
      `AgriPort Delegation Visit Confirmation - ${v.company} (${v.preferredDate})`
    );
    const body = encodeURIComponent(
      `Dear ${v.leadVisitor},\n\nThank you for choosing to visit AgriPort's export facilities and partner farms in Egypt.\n\nWe have received your delegation visit request for:\n- Proposed Date: ${v.preferredDate}\n- Delegation Size: ${v.delegationSize}\n- Facilities to Inspect: ${v.facilities.join(", ") || "Central Packing Stations & Farms"}\n- Airport Pickup: ${v.airportPickup ? "Requested" : "Not requested"}\n\nOur international relations protocol team is preparing your custom inspection program and technical meetings with our quality directors.\n\nPlease let us know if you require hotel recommendations or specialized translation services.\n\nBest regards,\nInternational Relations & Delegations Protocol\nAgriPort Technologies & Exports\nCairo - Alexandria Agricultural Hub, Egypt\nPhone/WhatsApp: +20 100 720 2636`
    );
    return `mailto:${v.inquiry.email}?subject=${subject}&body=${body}`;
  };

  const handleGeneratePdf = () => {
    const listToExport = filteredVisits.length > 0 ? filteredVisits : allVisits;
    if (listToExport.length === 0) {
      alert("لا توجد حجوزات زيارات لتصديرها حالياً.");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert(
        "تعذر فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة (Popups) من إعدادات المتصفح."
      );
      return;
    }

    const escape = (val?: string) => {
      if (!val) return "-";
      return String(val)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const now = new Date();
    const reportDate =
      now.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " - " +
      now.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      });

    const rowsHtml = listToExport
      .map((v, idx) => {
        let badgeBg = "#ecfdf5";
        let badgeColor = "#065f46";
        let badgeBorder = "#a7f3d0";

        if (v.inquiry.status === "قيد المتابعة") {
          badgeBg = "#fffbeb";
          badgeColor = "#92400e";
          badgeBorder = "#fde68a";
        } else if (v.inquiry.status === "تم الاتفاق") {
          badgeBg = "#eff6ff";
          badgeColor = "#1e40af";
          badgeBorder = "#bfdbfe";
        } else if (v.inquiry.status === "مؤرشف") {
          badgeBg = "#f1f5f9";
          badgeColor = "#475569";
          badgeBorder = "#cbd5e1";
        }

        return `
        <tr>
          <td style="text-align: center; font-weight: bold; color: #64748b;">${idx + 1}</td>
          <td style="font-weight: 800; color: #047857; white-space: nowrap;">${escape(v.preferredDate)}</td>
          <td>
            <div style="font-weight: 700; color: #0f172a;">${escape(v.leadVisitor)}</div>
            <div style="font-size: 11px; color: #64748b;">${escape(v.company)} • ${escape(v.country)}</div>
          </td>
          <td style="text-align: center; font-weight: 600;">${escape(v.delegationSize)}</td>
          <td style="font-size: 11px;">${escape(v.facilities.join("، ") || "كافة المرافق المركزية")}</td>
          <td style="font-size: 11px; color: #0f172a;">${escape(v.targetCrops || "عام")}</td>
          <td style="text-align: center; font-size: 11px;">
            ${
              v.airportPickup
                ? `<span style="background: #ecfdf5; color: #065f46; padding: 2px 6px; border-radius: 4px; font-weight: bold;">✈️ نعم (مطلوب)</span>`
                : `<span style="color: #94a3b8;">بدون</span>`
            }
          </td>
          <td style="font-size: 11px; direction: ltr; text-align: left;">
            <div>${escape(v.inquiry.phone)}</div>
            <div style="color: #64748b;">${escape(v.inquiry.email)}</div>
          </td>
          <td style="text-align: center;">
            <span style="display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
              ${escape(v.inquiry.status)}
            </span>
          </td>
          <td style="font-size: 11px; color: #475569; max-width: 160px;">${escape(v.notes || "-")}</td>
        </tr>`;
      })
      .join("");

    const htmlContent = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <title>تقرير جدول الزيارات الميدانية للوفود - AgriPort</title>
  <style>
    @page { size: A4 landscape; margin: 12mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      margin: 0;
      padding: 16px;
      direction: rtl;
    }
    .report-sheet {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
    }
    .header-table {
      width: 100%;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 900;
      color: #065f46;
    }
    .brand-sub {
      font-size: 12px;
      color: #64748b;
      margin-top: 3px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    .data-table th {
      background: #f1f5f9;
      color: #334155;
      padding: 8px 6px;
      font-weight: 700;
      text-align: right;
      border: 1px solid #e2e8f0;
    }
    .data-table td {
      padding: 8px 6px;
      border: 1px solid #e2e8f0;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <div class="report-sheet">
    <table class="header-table">
      <tr>
        <td>
          <div class="brand-title">🏛️ AgriPort Operations — جدول الزيارات الميدانية للوفود والمستوردين</div>
          <div class="brand-sub">إدارة التنسيق والبروتوكول الدولي وتفقد محطات التعبئة والمزارع</div>
        </td>
        <td style="text-align: left; font-size: 11px; color: #475569;">
          <div>تاريخ التقرير: ${reportDate}</div>
          <div>إجمالي الزيارات المعروضة: <strong>${listToExport.length}</strong></div>
        </td>
      </tr>
    </table>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 25px; text-align: center;">#</th>
          <th style="width: 85px;">تاريخ الزيارة</th>
          <th>رئيس الوفد والشركة</th>
          <th style="width: 75px; text-align: center;">حجم الوفد</th>
          <th>المرافق المستهدفة</th>
          <th>المحاصيل</th>
          <th style="width: 70px; text-align: center;">استقبال المطار</th>
          <th>بيانات الاتصال</th>
          <th style="width: 80px; text-align: center;">الحالة</th>
          <th>ملاحظات</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  </div>
  <script>
    window.addEventListener('load', function() {
      setTimeout(function() { window.print(); }, 400);
    });
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 text-2xl font-bold">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                حجوزات الزيارات الميدانية للوفود والمستوردين
              </h2>
              {unreadCount > 0 && (
                <span className="rounded-full bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 animate-pulse">
                  {unreadCount} جديد
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              متابعة مواعيد تفقد المزارع، ومحطات التعبئة، والفرز البصري، وترتيبات الاستقبال لضيوف الشركة الدوليين
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllInquiriesRead}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>✓✓</span>
              <span>تحديد الكل كمقروء</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleGeneratePdf}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all"
          >
            <span>🖨️</span>
            <span>تصدير جدول الوفود (PDF)</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Metrics Strip for Visits */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-start shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            إجمالي الحجوزات
          </span>
          <div className="text-2xl font-extrabold text-slate-900">
            {totalCount}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            وفود تجارية مسجلة
          </span>
        </div>

        <div className="rounded-2xl border border-blue-200/70 bg-blue-50/40 p-4 text-start shadow-2xs">
          <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
            جديدة بحاجة لتواصل
          </span>
          <div className="text-2xl font-extrabold text-blue-800">{newCount}</div>
          <span className="text-[10px] text-blue-600 font-medium">
            في انتظار الرد الأولي
          </span>
        </div>

        <div className="rounded-2xl border border-amber-200/70 bg-amber-50/40 p-4 text-start shadow-2xs">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
            قيد التنسيق والترتيب
          </span>
          <div className="text-2xl font-extrabold text-amber-800">
            {coordinatingCount}
          </div>
          <span className="text-[10px] text-amber-600 font-medium">
            تجهيز خطة الزيارة
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/40 p-4 text-start shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            زيارات مؤكدة وجاهزة
          </span>
          <div className="text-2xl font-extrabold text-emerald-800">
            {confirmedCount}
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">
            تم تثبيت الجدول
          </span>
        </div>

        <div className="col-span-2 sm:col-span-4 lg:col-span-1 rounded-2xl border border-purple-200/70 bg-purple-50/40 p-4 text-start shadow-2xs">
          <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
            استقبال مطار وتوصيل
          </span>
          <div className="text-2xl font-extrabold text-purple-800">
            {airportTransferCount}
          </div>
          <span className="text-[10px] text-purple-600 font-medium">
            خدمات لوجستية مطلوبة
          </span>
        </div>
      </div>

      {/* 3. Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {["الكل", "جديد", "قيد المتابعة", "تم الاتفاق", "مؤرشف"].map(
            (status) => {
              const isActive = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {status === "قيد المتابعة"
                    ? "قيد التنسيق"
                    : status === "تم الاتفاق"
                    ? "تم التأكيد والجدولة"
                    : status}
                </button>
              );
            }
          )}
        </div>

        <div className="text-xs font-medium text-slate-500">
          عرض <strong className="text-slate-800">{filteredVisits.length}</strong>{" "}
          من أصل <strong className="text-slate-800">{totalCount}</strong> حجز
        </div>
      </div>

      {/* 4. Visits Cards List */}
      {filteredVisits.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <span className="text-4xl block mb-2">🤝</span>
          <h3 className="text-base font-bold text-slate-800">
            لا توجد حجوزات زيارات تطابق البحث
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            يمكنك تغيير فلتر الحالة أو استقبال حجوزات جديدة عبر صفحة حجز الزيارة
            الميدانية بالموقع.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVisits.map((v) => {
            const isUnread = !v.inquiry.read;

            return (
              <div
                key={v.inquiry.id}
                onClick={() => {
                  if (isUnread) markInquiryRead(v.inquiry.id);
                }}
                className={`group relative rounded-3xl border transition-all p-5 sm:p-6 bg-white shadow-xs hover:shadow-md ${
                  isUnread
                    ? "border-emerald-400/80 ring-2 ring-emerald-500/10"
                    : "border-slate-200/80 hover:border-emerald-300"
                }`}
              >
                {/* Top Row: Visitor Info & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 text-xl font-bold">
                      👤
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-slate-900">
                          {v.leadVisitor}
                        </h4>
                        {isUnread && (
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        )}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="text-slate-800">{v.company}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">
                          {v.country}
                        </span>
                        <span>•</span>
                        <span className="text-slate-400">
                          تم الحجز: {v.inquiry.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">
                      الحالة:
                    </span>
                    <select
                      value={v.inquiry.status}
                      onChange={(e) => {
                        updateInquiryStatus(
                          v.inquiry.id,
                          e.target.value as Inquiry["status"]
                        );
                        showToast("تم تحديث حالة الزيارة بنجاح ✓", "success");
                      }}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    >
                      <option value="جديد">جديد</option>
                      <option value="قيد المتابعة">قيد التنسيق والترتيب</option>
                      <option value="تم الاتفاق">تم التأكيد والجدولة</option>
                      <option value="مؤرشف">مؤرشف</option>
                    </select>
                  </div>
                </div>

                {/* Core Visit Meta Grid */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 py-4 text-xs font-medium">
                  {/* Proposed Date */}
                  <div className="rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
                      📅 تاريخ وموعد الزيارة
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      {v.preferredDate}
                    </span>
                  </div>

                  {/* Delegation Size */}
                  <div className="rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
                      👥 حجم الوفد الزائر
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {v.delegationSize}
                    </span>
                  </div>

                  {/* Airport Transfer */}
                  <div className="rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
                      ✈️ استقبال المطار
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        v.airportPickup ? "text-emerald-700" : "text-slate-500"
                      }`}
                    >
                      {v.airportPickup
                        ? "نعم - مطلوب استقبال وسيارة خاصة"
                        : "غير مطلوب"}
                    </span>
                  </div>

                  {/* Target Crops */}
                  <div className="rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
                      🍊 المحاصيل المستهدفة
                    </span>
                    <span className="text-xs font-bold text-slate-800 truncate block">
                      {v.targetCrops || "حاصلات زراعية عامة"}
                    </span>
                  </div>
                </div>

                {/* Facilities to Inspect */}
                {v.facilities.length > 0 && (
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                      المرافق والمحطات المطلوب تفقدها:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {v.facilities.map((fac, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-100"
                        >
                          🏭 {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes if any */}
                {v.notes && (
                  <div className="mb-4 rounded-xl bg-amber-50/50 p-3 border border-amber-200/50 text-xs font-medium text-amber-900 leading-relaxed">
                    <span className="font-bold block text-amber-800 mb-0.5">
                      📝 ملاحظات ومتطلبات الوفد:
                    </span>
                    {v.notes}
                  </div>
                )}

                {/* Actions Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* WhatsApp */}
                    <a
                      href={getWhatsAppLink(v)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs font-bold transition-colors shadow-2xs"
                    >
                      <span>💬</span>
                      <span>تنسيق عبر واتساب</span>
                    </a>

                    {/* Email */}
                    <a
                      href={getEmailLink(v)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2 text-xs font-bold transition-colors"
                    >
                      <span>✉️</span>
                      <span>إرسال دعوة رسمية</span>
                    </a>

                    {/* Copy Summary */}
                    <button
                      type="button"
                      onClick={() => handleCopySummary(v)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-3 py-2 text-xs font-semibold transition-colors"
                    >
                      <span>{copiedId === v.inquiry.id ? "✓" : "📋"}</span>
                      <span>{copiedId === v.inquiry.id ? "تم النسخ" : "نسخ الملخص"}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Full Dossier */}
                    <button
                      type="button"
                      onClick={() => setSelectedVisit(v)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold transition-colors shadow-2xs"
                    >
                      <span>👁️</span>
                      <span>عرض ملف الوفد بالكامل</span>
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`هل أنت متأكد من حذف حجز الزيارة الخاص بـ ${v.leadVisitor}؟`)) {
                          deleteInquiry(v.inquiry.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-2 text-xs transition-colors"
                      title="حذف"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Full Visit Dossier Modal */}
      {selectedVisit && (
        <div className="fixed inset-y-0 inset-x-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 text-start space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    ملف الزيارة الميدانية
                  </span>
                  <span className="text-xs text-slate-400">
                    رقم الحجز: {selectedVisit.inquiry.id}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  {selectedVisit.leadVisitor}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  {selectedVisit.company} — {selectedVisit.country}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVisit(null)}
                className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Visit Details Table */}
            <div className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    تاريخ الزيارة المقترح
                  </span>
                  <span className="text-base font-extrabold text-emerald-700">
                    {selectedVisit.preferredDate}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    حجم الوفد
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {selectedVisit.delegationSize}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    الهاتف / واتساب
                  </span>
                  <span className="font-bold text-slate-800" dir="ltr">
                    {selectedVisit.inquiry.phone}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    البريد الإلكتروني
                  </span>
                  <span className="font-bold text-slate-800" dir="ltr">
                    {selectedVisit.inquiry.email}
                  </span>
                </div>
              </div>

              {/* Facilities */}
              <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 block mb-2">
                  المرافق المطلوب معاينتها
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVisit.facilities.length > 0 ? (
                    selectedVisit.facilities.map((fac, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-emerald-100 text-emerald-900 px-2.5 py-1 text-xs font-semibold"
                      >
                        {fac}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">
                      كافة المرافق والمحطات المركزية
                    </span>
                  )}
                </div>
              </div>

              {/* Airport & Crops */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    خدمة استقبال المطار
                  </span>
                  <span
                    className={`font-bold ${
                      selectedVisit.airportPickup
                        ? "text-emerald-700"
                        : "text-slate-500"
                    }`}
                  >
                    {selectedVisit.airportPickup
                      ? "✈️ مطلوب استقبال وتوصيل"
                      : "غير مطلوب"}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    المحاصيل المستهدفة
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedVisit.targetCrops || "عام"}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {selectedVisit.notes && (
                <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200">
                  <span className="text-[11px] font-bold text-amber-800 block mb-1">
                    ملاحظات ومتطلبات الوفد
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    {selectedVisit.notes}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <a
                  href={getWhatsAppLink(selectedVisit)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold transition-colors"
                >
                  💬 فتح محادثة واتساب
                </a>

                <a
                  href={getEmailLink(selectedVisit)}
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 text-xs font-bold transition-colors"
                >
                  ✉️ مراسلة بالإيميل
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVisit(null)}
                className="rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2.5 text-xs font-bold transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
