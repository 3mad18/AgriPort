/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  useOpsStore,
  type Inquiry,
} from "@/context/ops-store-context";

export function OpsNotificationsCenter({
  searchQuery,
  onOpenInquiry,
}: {
  searchQuery: string;
  onOpenInquiry?: (inquiry: Inquiry) => void;
}) {
  const {
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    markInquiryRead,
    markAllInquiriesRead,
    addInquiry,
    unreadInquiriesCount,
  } = useOpsStore();

  const [statusFilter, setStatusFilter] = useState<string>("الكل");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered inquiries
  const filtered = inquiries.filter((item) => {
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

  const handleSimulateInquiry = () => {
    const demoInquiries = [
      {
        name: "David Smith",
        company: "British Produce Direct Ltd",
        country: "المملكة المتحدة 🇬🇧",
        email: "d.smith@britishproduce.co.uk",
        phone: "+44 7700 900123",
        product: "برتقال صيفي فالنسيا",
        quantity: "5 حاويات مبردة (125 طن)",
        incoterms: "CIF",
        destinationPort: "Port of Felixstowe",
        message:
          "نحتاج كاليبر 56 و 64 في كراتين 15 كجم مع فحص Phyto معتمد وجاهزية الشحن خلال 10 أيام.",
      },
      {
        name: "Hassan Al-Zahrani",
        company: "مؤسسة الأغذية الطازجة الخليجية",
        country: "السعودية 🇸🇦",
        email: "hassan@gulf-fresh.com",
        phone: "+966 55 123 4567",
        product: "بصل أحمر إيطالي مصري",
        quantity: "10 حاويات (250 طن)",
        incoterms: "CFR",
        destinationPort: "ميناء جدة الإسلامي",
        message:
          "أكياس شبكية 25 كجم، أحجام 60/80 مم، مطلوب شحن أسبوعي مجدول لمدة شهرين.",
      },
      {
        name: "Alessandro Conti",
        company: "ItalFruit Import Srl",
        country: "إيطاليا 🇮🇹",
        email: "alessandro@italfruit.it",
        phone: "+39 333 4567890",
        product: "فراولة طازجة فاخرة",
        quantity: "8 أطنان شحن جوي مبرد",
        incoterms: "FOB",
        destinationPort: "Milan Malpensa Airport",
        message:
          "مطلوب بانيتات 250 جم داخل كراتين 2.5 كجم، خالية تماماً من متبقيات المبيدات وفق معايير الاتحاد الأوروبي.",
      },
    ];

    const random =
      demoInquiries[Math.floor(Math.random() * demoInquiries.length)];
    addInquiry(random);
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
          {unreadInquiriesCount > 0 && (
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
            onClick={handleSimulateInquiry}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:shadow-emerald-500/20 active:scale-95 transition-all"
            title="إنشاء طلب تجريبي فوري لتجربة وصول الإشعارات"
          >
            <span>+</span>
            <span>محاكاة طلب جديد (Live Demo)</span>
          </button>
        </div>
      </div>

      {/* Unread Alert Bar if any */}
      {unreadInquiriesCount > 0 && (
        <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/80 px-5 py-3 text-xs text-emerald-900 font-semibold animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span>
              لديك <strong className="text-emerald-700 font-bold">{unreadInquiriesCount}</strong> طلبات جديدة بانتظار المراجعة والرد!
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-normal">
            يتم تحديث الطلبات لحظياً عند إرسالها من صفحة التواصل
          </span>
        </div>
      )}

      {/* Filter Tabs & Counters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { key: "الكل", label: "جميع الطلبات", count: inquiries.length },
          {
            key: "جديد",
            label: "طلبات جديدة",
            count: inquiries.filter((i) => i.status === "جديد").length,
            color: "text-emerald-600 bg-emerald-50",
          },
          {
            key: "قيد المتابعة",
            label: "قيد المتابعة",
            count: inquiries.filter((i) => i.status === "قيد المتابعة").length,
            color: "text-amber-600 bg-amber-50",
          },
          {
            key: "تم الاتفاق",
            label: "تم الاتفاق",
            count: inquiries.filter((i) => i.status === "تم الاتفاق").length,
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
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
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
            const isUnread = item.read === false || item.status === "جديد";

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
              <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">
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

                <div className="flex items-center gap-2">
                  <a
                    href={getWhatsAppLink(selectedInquiry)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
                  >
                    محادثة واتساب 💬
                  </a>
                  <a
                    href={getEmailLink(selectedInquiry)}
                    className="rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-colors"
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
