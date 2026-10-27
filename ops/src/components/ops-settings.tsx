"use client";

import { useEffect, useState } from "react";
import { useOpsStore } from "@/context/ops-store-context";

export function OpsSettings() {
  const { settings, updateSettings } = useOpsStore();

  const [form, setForm] = useState({
    companyName: settings.companyName || "AgriPort",
    tagline:
      settings.tagline ||
      "بوابة تصدير الحاصلات الزراعية والخضروات والفواكه الطازجة",
    email: settings.email || "agriporteg@gmail.com",
    phone: settings.phone || "+20 100 720 2636",
    location:
      settings.location ||
      "جمهورية مصر العربية — محافظة البحيرة / كفر الدوار",
    exportBannerText:
      settings.exportBannerText ||
      "موسم تصدير البرتقال الصيفي والبصل مفتوح حالياً للشحن الفوري إلى أوروبا ودول الخليج!",
    showExportBanner: settings.showExportBanner !== false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Sync form when settings change in store / cloud
  useEffect(() => {
    if (settings) {
      setForm({
        companyName: settings.companyName || "AgriPort",
        tagline: settings.tagline || "",
        email: settings.email || "agriporteg@gmail.com",
        phone: settings.phone || "+20 100 720 2636",
        location:
          settings.location ||
          "جمهورية مصر العربية — محافظة البحيرة / كفر الدوار",
        exportBannerText: settings.exportBannerText || "",
        showExportBanner: settings.showExportBanner !== false,
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const result = await updateSettings(form);
    setIsSaving(false);

    if (result.success) {
      setStatusMsg({
        type: "success",
        text: "تم حفظ وتحديث إعدادات الموقع ونشرها بنجاح في السحابة وموقع الزوار فوراً!",
      });
    } else {
      setStatusMsg({
        type: "error",
        text: result.error || "تعذر الحفظ في قاعدة البيانات السحابية.",
      });
    }

    setTimeout(() => {
      setStatusMsg((prev) => (prev?.type === "success" ? null : prev));
    }, 6000);
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 font-bold">
            ⚙️
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              إعدادات الموقع والتصدير
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              التحكم في بيانات التواصل الرسمية، عنوان المقر، وأشرطة إعلانات المواسم التصديرية
            </p>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`rounded-2xl border p-4 text-xs font-bold flex items-center justify-between animate-fade-in ${
            statusMsg.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{statusMsg.type === "success" ? "✅" : "⚠️"}</span>
            <span>{statusMsg.text}</span>
          </div>
          {statusMsg.type === "error" && (
            <button
              type="button"
              onClick={() => setStatusMsg(null)}
              className="text-amber-700 hover:text-amber-900 text-xs px-2 py-0.5 rounded-lg border border-amber-300"
            >
              إغلاق
            </button>
          )}
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Box 1: Company Identity */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            هوية الشركة والمنصة
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                اسم المنصة / الشركة
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                الشعار اللفظي الترويجي
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Box 2: Official Export Contacts */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            بيانات التواصل الرسمية للتصدير (Direct Export Channels)
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رقم الهاتف وواتساب التصدير الدولي
              </label>
              <input
                type="text"
                dir="ltr"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+20 100 720 2636"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                تُربط به أزرار محادثات الواتساب التلقائية مع المستوردين
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                البريد الإلكتروني التجاري للتصدير
              </label>
              <input
                type="email"
                dir="ltr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="agriporteg@gmail.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                البريد الرسمي المعتمد لتلقي طلبات التسعير
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              عنوان المقر الرئيسي ومحطات التعبئة
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Box 3: Export Season Announcement Badge */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              شارة إعلان المواسم التصديرية (أعلى واجهة الموقع)
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.showExportBanner}
                onChange={(e) =>
                  setForm({ ...form, showExportBanner: e.target.checked })
                }
                className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs font-bold text-slate-700">
                تفعيل ظهور الشارة في واجهة الموقع
              </span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              نص الإعلان التصديري
            </label>
            <textarea
              rows={2}
              value={form.exportBannerText}
              onChange={(e) =>
                setForm({ ...form, exportBannerText: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Live Preview of the exact Pill Badge in Hero */}
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              👁️ معاينة الشارة في واجهة الموقع (كما تظهر للزوار تماماً)
            </h4>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>فتح موقع الزوار (Port 3000) للتحقق</span>
              <span>↗</span>
            </a>
          </div>

          <div className="flex justify-center p-6 bg-white rounded-2xl border border-slate-100">
            {form.showExportBanner ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{form.exportBannerText || "موسم تصدير البرتقال والبصل مفتوح حالياً للشحن الفوري إلى أوروبا ودول الخليج!"}</span>
              </div>
            ) : (
              <div className="text-xs text-slate-400 font-medium py-1">
                (الشارة معطّلة حالياً ولن تظهر في الصفحة الرئيسية)
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 px-8 py-3 text-xs font-bold text-white shadow-xs hover:shadow-emerald-500/20 active:scale-95 transition-all"
          >
            {isSaving ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>جاري الحفظ والمزامنة...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>حفظ ونشر الإعدادات</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
