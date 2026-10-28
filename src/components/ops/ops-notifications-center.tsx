/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  useOpsStore,
  type Inquiry,
} from "@/context/ops-store-context";
import { isFacilityVisit } from "@/components/ops/ops-visits-center";

export function OpsNotificationsCenter({
  searchQuery,
  onOpenInquiry,
  onNavigateToVisits,
}: {
  searchQuery: string;
  onOpenInquiry?: (inquiry: Inquiry) => void;
  onNavigateToVisits?: () => void;
}) {
  const {
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    markInquiryRead,
    markAllInquiriesRead,
  } = useOpsStore();

  const [statusFilter, setStatusFilter] = useState<string>("الكل");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visitInquiries = inquiries.filter(isFacilityVisit);
  const quoteInquiries = inquiries.filter((i) => !isFacilityVisit(i));
  const unreadQuotesCount = quoteInquiries.filter((i) => !i.read).length;
  const unreadVisitsCount = visitInquiries.filter((v) => !v.read).length;

  // Filtered quote inquiries
  const filtered = quoteInquiries.filter((item) => {
    const matchesStatus =
      statusFilter === "الكل" ? true : item.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.company.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.product.toLowerCase().includes(q) ||
      item.destinationPort.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleGeneratePdfReport = () => {
    const listToExport = filtered.length > 0 ? filtered : inquiries;
    if (listToExport.length === 0) {
      alert("لا توجد طلبات لتصديرها في تقرير PDF حالياً.");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("تعذر فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة (Popups) من إعدادات المتصفح.");
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

    const newCount = inquiries.filter((i) => i.status === "جديد").length;
    const inProgressCount = inquiries.filter((i) => i.status === "قيد المتابعة").length;
    const completedCount = inquiries.filter((i) => i.status === "تم الاتفاق").length;
    const archivedCount = inquiries.filter((i) => i.status === "مؤرشف").length;

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

    const filterDescription =
      statusFilter !== "الكل" || searchQuery
        ? `تصفية مخصصة (${statusFilter !== "الكل" ? `الحالة: ${statusFilter}` : ""}${searchQuery ? ` | البحث: "${searchQuery}"` : ""})`
        : "جميع الطلبات المسجلة";

    const rowsHtml = listToExport
      .map((item, index) => {
        let badgeBg = "#ecfdf5";
        let badgeColor = "#065f46";
        let badgeBorder = "#a7f3d0";

        if (item.status === "قيد المتابعة") {
          badgeBg = "#fffbeb";
          badgeColor = "#92400e";
          badgeBorder = "#fde68a";
        } else if (item.status === "تم الاتفاق") {
          badgeBg = "#eff6ff";
          badgeColor = "#1e40af";
          badgeBorder = "#bfdbfe";
        } else if (item.status === "مؤرشف") {
          badgeBg = "#f1f5f9";
          badgeColor = "#475569";
          badgeBorder = "#cbd5e1";
        }

        return `
          <tr>
            <td style="text-align: center; font-weight: bold; color: #64748b;">${index + 1}</td>
            <td style="font-weight: 600; white-space: nowrap;">${escape(item.date)}</td>
            <td>
              <div style="font-weight: 700; color: #0f172a;">${escape(item.name)}</div>
              <div style="font-size: 11px; color: #475569; margin-top: 2px;">${escape(item.company)}</div>
            </td>
            <td>
              <div style="font-weight: 600; color: #1e293b;">${escape(item.country)}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">⚓ ${escape(item.destinationPort)}</div>
            </td>
            <td>
              <div style="font-weight: 700; color: #047857;">${escape(item.product)}</div>
              <div style="font-size: 11px; color: #334155; margin-top: 2px;">📦 ${escape(item.quantity)}</div>
            </td>
            <td style="text-align: center;">
              <span style="display: inline-block; padding: 2px 8px; font-size: 11px; font-weight: 700; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; color: #334155;">
                ${escape(item.incoterms || "FOB")}
              </span>
            </td>
            <td style="font-size: 11px; direction: ltr; text-align: left;">
              <div style="font-weight: 600; color: #0f172a;">${escape(item.phone)}</div>
              <div style="color: #64748b; margin-top: 2px;">${escape(item.email)}</div>
            </td>
            <td style="text-align: center;">
              <span style="display: inline-block; padding: 3px 10px; font-size: 11px; font-weight: 700; border-radius: 9999px; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; white-space: nowrap;">
                ${escape(item.status)}
              </span>
            </td>
            <td style="font-size: 11px; color: #475569; max-width: 180px; line-height: 1.4;">
              ${escape(item.message || "-")}
            </td>
          </tr>
        `;
      })
      .join("");

    const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>تقرير طلبات واستفسارات التصدير - AgriPort</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 landscape;
      margin: 12mm 10mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
    }
    .print-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
    }
    .print-btn {
      background: #10b981;
      color: white;
      border: none;
      padding: 8px 20px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
    }
    .print-btn:hover {
      background: #059669;
    }
    .close-btn {
      background: #334155;
      color: white;
      border: none;
      padding: 8px 16px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
    }
    .close-btn:hover {
      background: #475569;
    }
    .report-sheet {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 16px;
    }
    .header-table td {
      vertical-align: middle;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 900;
      color: #065f46;
      letter-spacing: -0.5px;
    }
    .brand-subtitle {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
      font-weight: 600;
    }
    .report-meta {
      text-align: left;
      font-size: 11px;
      color: #475569;
      line-height: 1.6;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    .stat-card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 10px 14px;
      background: #f8fafc;
      text-align: center;
    }
    .stat-card.primary {
      background: #ecfdf5;
      border-color: #a7f3d0;
    }
    .stat-num {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
    }
    .stat-card.primary .stat-num {
      color: #065f46;
    }
    .stat-label {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      margin-top: 2px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-top: 8px;
    }
    .data-table th {
      background: #f1f5f9;
      color: #334155;
      padding: 10px 8px;
      font-weight: 700;
      text-align: right;
      border: 1px solid #e2e8f0;
      font-size: 11px;
    }
    .data-table td {
      padding: 10px 8px;
      border: 1px solid #e2e8f0;
      vertical-align: middle;
    }
    .data-table tbody tr:nth-child(even) {
      background: #fafafa;
    }
    .footer-note {
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #94a3b8;
    }
    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
      }
      .no-print {
        display: none !important;
      }
      .report-sheet {
        border: none !important;
        padding: 0 !important;
        box-shadow: none !important;
      }
      table {
        page-break-inside: auto;
      }
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
      thead {
        display: table-header-group;
      }
      tfoot {
        display: table-footer-group;
      }
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  </style>
</head>
<body>
  <div class="no-print print-actions">
    <div style="font-size: 13px; font-weight: 600;">
      📄 تم توليد تقرير طلبات التصدير بنجاح (${listToExport.length} طلب) • يمكنك حفظه كملف PDF
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()" class="print-btn">
        🖨️ طباعة / حفظ بتنسيق PDF
      </button>
      <button onclick="window.close()" class="close-btn">
        إغلاق
      </button>
    </div>
  </div>

  <div class="report-sheet">
    <table class="header-table">
      <tr>
        <td style="width: 60%;">
          <div class="brand-title">AgriPort Operations • أجريبورت للصادرات الزراعية</div>
          <div class="brand-subtitle">نظام تتبع وإدارة طلبات التسعير والتصدير الدولي الزراعي</div>
        </td>
        <td style="width: 40%; text-align: left;">
          <div class="report-meta">
            <div><strong>تاريخ الإصدار:</strong> ${reportDate}</div>
            <div><strong>نطاق التقرير:</strong> ${escape(filterDescription)}</div>
            <div><strong>عدد السجلات بالتقرير:</strong> ${listToExport.length} طلب</div>
          </div>
        </td>
      </tr>
    </table>

    <div class="stats-grid">
      <div class="stat-card primary">
        <div class="stat-num">${inquiries.length}</div>
        <div class="stat-label">إجمالي الطلبات بالمنظومة</div>
      </div>
      <div class="stat-card">
        <div class="stat-num" style="color: #059669;">${newCount}</div>
        <div class="stat-label">طلبات جديدة</div>
      </div>
      <div class="stat-card">
        <div class="stat-num" style="color: #d97706;">${inProgressCount}</div>
        <div class="stat-label">قيد المتابعة والتسعير</div>
      </div>
      <div class="stat-card">
        <div class="stat-num" style="color: #2563eb;">${completedCount}</div>
        <div class="stat-label">تم الاتفاق والتعاقد</div>
      </div>
      <div class="stat-card">
        <div class="stat-num" style="color: #64748b;">${archivedCount}</div>
        <div class="stat-label">طلبات مؤرشفة</div>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 32px; text-align: center;">#</th>
          <th style="width: 85px;">التاريخ</th>
          <th>المستورد والشركة</th>
          <th>دولة وميناء الوصول</th>
          <th>المنتج والكمية</th>
          <th style="width: 65px; text-align: center;">الشحن</th>
          <th style="width: 170px;">بيانات الاتصال</th>
          <th style="width: 95px; text-align: center;">الحالة</th>
          <th>ملاحظات واشتراطات</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="footer-note">
      <div>تم استخراج هذا التقرير آلياً عبر لوحة تحكم AgriPort Operations • معتمد لإدارة التصدير والشحن الدولي</div>
      <div>صفحة رسمية موثقة داخلياً • سرّي ومخصص للاستخدام الإداري</div>
    </div>
  </div>

  <script>
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const getWhatsAppLink = (inquiry: Inquiry) => {
    const cleanPhone = inquiry.phone.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `مرحباً ${inquiry.name}، معك إدارة التصدير من شركة AgriPort. بخصوص طلبك لتوريد ${inquiry.product} (${inquiry.quantity}) إلى ${inquiry.destinationPort}، يسعدنا تزويدك بالأسعار وتفاصيل الشحنة.`,
    );
    return `https://wa.me/${cleanPhone}?text=${text}`;
  };

  const getEmailLink = (inquiry: Inquiry) => {
    const subject = encodeURIComponent(
      `AgriPort Quotation - Inquiry for ${inquiry.product} (${inquiry.company})`,
    );
    const body = encodeURIComponent(
      `Dear ${inquiry.name},\n\nThank you for reaching out to AgriPort regarding the supply of ${inquiry.product} to ${inquiry.destinationPort}.\n\nOur export desk has reviewed your specifications (${inquiry.quantity}, ${inquiry.incoterms}) and we are glad to assist you with our latest FOB/CIF quotation.\n\nBest regards,\nExport Sales Department\nAgriPort Technologies & Exports\nKafr El-Dawar, Beheira, Egypt`,
    );
    return `mailto:${inquiry.email}?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = (item: Inquiry) => {
    const summary = `طلب توريد: ${item.product} | العميل: ${item.name} (${item.company} - ${item.country}) | الكمية: ${item.quantity} | الشحن: ${item.incoterms} - ${item.destinationPort} | هاتف: ${item.phone} | بريد: ${item.email}`;
    navigator.clipboard.writeText(summary);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 font-bold">
              🔔
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                مركز تلقي الطلبات والإشعارات
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                متابعة وإدارة طلبات التسعير الواردة من المستوردين الدوليين في الوقت الفعلي
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {unreadQuotesCount > 0 && (
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
            onClick={handleGeneratePdfReport}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:shadow-emerald-600/20 active:scale-95 transition-all"
            title="تصدير تقرير رسمي بصيغة PDF للطلبات الحالية"
          >
            <span>📄</span>
            <span>تصدير تقرير PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Counters */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        {[
          { key: "الكل", label: "جميع عروض الأسعار", count: quoteInquiries.length },
          {
            key: "جديد",
            label: "طلبات جديدة",
            count: quoteInquiries.filter((i) => i.status === "جديد").length,
            color: "text-emerald-600 bg-emerald-50",
          },
          {
            key: "قيد المتابعة",
            label: "قيد المتابعة",
            count: quoteInquiries.filter((i) => i.status === "قيد المتابعة").length,
            color: "text-amber-600 bg-amber-50",
          },
          {
            key: "تم الاتفاق",
            label: "تم الاتفاق",
            count: quoteInquiries.filter((i) => i.status === "تم الاتفاق").length,
            color: "text-blue-600 bg-blue-50",
          },
          {
            key: "مؤرشف",
            label: "مؤرشف",
            count: inquiries.filter((i) => i.status === "مؤرشف").length,
            color: "text-slate-500 bg-slate-100",
          },
        ].map((tab) => {
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : tab.color || "bg-slate-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Inquiries Cards List */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <div className="text-3xl mb-2">📭</div>
          <h3 className="text-base font-bold text-slate-800">
            لا توجد طلبات تطابق الفلتر الحالي
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `لم يتم العثور على أي نتائج لكلمة البحث "${searchQuery}"`
              : "لم يتم استلام أي طلبات في هذا التصنيف حتى الآن."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((item) => {
            const isUnread = item.read === false;

            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl border transition-all ${
                  isUnread
                    ? "border-emerald-300/80 bg-white shadow-sm ring-1 ring-emerald-500/10"
                    : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs"
                } p-5 sm:p-6`}
              >
                {/* Unread Indicator Bar */}
                {isUnread && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                )}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left Column: Customer & Crop Details */}
                  <div className="space-y-3 flex-1 text-start">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-bold text-slate-900 text-base">
                        {item.name}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        •
                      </span>
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {item.company}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {item.country}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        ({item.date})
                      </span>
                    </div>

                    {/* Target Crop Highlight */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800">
                          المحصول المطلوب:
                        </span>
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-emerald-800">
                          {item.product}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800">
                          الكمية التقديرية:
                        </span>
                        <span className="text-slate-600 font-semibold">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800">
                          ميناء الشحن:
                        </span>
                        <span className="text-slate-600">
                          {item.incoterms} — {item.destinationPort}
                        </span>
                      </div>
                    </div>

                    {/* Customer Notes Preview */}
                    {item.message && (
                      <p className="text-xs text-slate-500 font-medium line-clamp-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        💬 &ldquo;{item.message}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Right Column: Status & Direct Action Buttons */}
                  <div className="flex flex-wrap lg:flex-col items-end gap-3 shrink-0">
                    {/* Status Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400">
                        الحالة:
                      </span>
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateInquiryStatus(
                            item.id,
                            e.target.value as Inquiry["status"],
                          )
                        }
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold border focus:outline-none transition-colors cursor-pointer ${
                          item.status === "جديد"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : item.status === "قيد المتابعة"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : item.status === "تم الاتفاق"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <option value="جديد">جديد (New)</option>
                        <option value="قيد المتابعة">قيد المتابعة (In Progress)</option>
                        <option value="تم الاتفاق">تم الاتفاق (Deal Closed)</option>
                        <option value="مؤرشف">مؤرشف (Archived)</option>
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* WhatsApp Direct */}
                      <a
                        href={getWhatsAppLink(item)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white transition-all shadow-xs"
                        title="فتح محادثة واتساب مع المستورد"
                      >
                        <span>💬</span>
                        <span>واتساب</span>
                      </a>

                      {/* Email Direct */}
                      <a
                        href={getEmailLink(item)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors"
                        title="إرسال إيميل رسمي"
                      >
                        <span>✉️</span>
                        <span>إيميل</span>
                      </a>

                      {/* View Dossier Modal */}
                      <button
                        type="button"
                        onClick={() => {
                          markInquiryRead(item.id);
                          setSelectedInquiry(item);
                        }}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors"
                      >
                        <span>👁️</span>
                        <span>التفاصيل</span>
                      </button>

                      {/* Copy summary */}
                      <button
                        type="button"
                        onClick={() => handleCopySummary(item)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="نسخ ملخص الطلب"
                      >
                        {copiedId === item.id ? "✓" : "📋"}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              `هل أنت متأكد من حذف طلب العميل "${item.name}"؟`,
                            )
                          ) {
                            deleteInquiry(item.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="حذف الطلب"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Inquiry Dossier Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-start max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-bold text-emerald-600">
                  📋
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    ملف طلب التوريد والتسعير
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    كود الطلب: {selectedInquiry.id} • بتاريخ:{" "}
                    {selectedInquiry.date}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6 text-sm">
              {/* Buyer Info Grid */}
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  بيانات المستورد والشركة
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <span className="text-xs text-slate-500">اسم المسؤول:</span>
                    <p className="font-bold text-slate-900 text-base">
                      {selectedInquiry.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">اسم الشركة:</span>
                    <p className="font-bold text-slate-900">
                      {selectedInquiry.company}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">دولة الاستيراد:</span>
                    <p className="font-semibold text-slate-800">
                      {selectedInquiry.country}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">البريد الإلكتروني:</span>
                    <p className="font-mono text-xs text-emerald-600">
                      <a href={`mailto:${selectedInquiry.email}`}>
                        {selectedInquiry.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">رقم الهاتف / واتساب:</span>
                    <p className="font-mono text-xs text-slate-800" dir="ltr">
                      {selectedInquiry.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipment & Crop Specs */}
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  مواصفات الشحنة والمحصول
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <span className="text-xs text-slate-500">المحصول المطلوب:</span>
                    <p className="font-bold text-emerald-700 text-base">
                      {selectedInquiry.product}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">الكمية التقديرية:</span>
                    <p className="font-bold text-slate-900">
                      {selectedInquiry.quantity}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">شروط الشحن (Incoterms):</span>
                    <p className="font-bold text-slate-900">
                      {selectedInquiry.incoterms}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">ميناء الوصول المستهدف:</span>
                    <p className="font-bold text-slate-900">
                      {selectedInquiry.destinationPort}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes & Extra Specs */}
              {selectedInquiry.message && (
                <div>
                  <h4 className="text-xs font-bold text-slate-600 mb-1.5">
                    ملاحظات ومواصفات إضافية من المستورد:
                  </h4>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-700 font-medium">
                    {selectedInquiry.message}
                  </div>
                </div>
              )}

              {/* Status Update in Modal */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 shrink-0">
                    تحديث حالة الطلب:
                  </span>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Inquiry["status"];
                      updateInquiryStatus(selectedInquiry.id, newStatus);
                      setSelectedInquiry({
                        ...selectedInquiry,
                        status: newStatus,
                      });
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800"
                  >
                    <option value="جديد">جديد</option>
                    <option value="قيد المتابعة">قيد المتابعة</option>
                    <option value="تم الاتفاق">تم الاتفاق</option>
                    <option value="مؤرشف">مؤرشف</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={getWhatsAppLink(selectedInquiry)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial text-center rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
                  >
                    محادثة واتساب 💬
                  </a>
                  <a
                    href={getEmailLink(selectedInquiry)}
                    className="flex-1 sm:flex-initial text-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-colors"
                  >
                    إرسال إيميل ✉️
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
