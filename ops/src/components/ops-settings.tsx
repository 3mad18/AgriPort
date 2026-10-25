"use client";

import { useState } from "react";
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

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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

      {savedSuccess && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>تم حفظ وتحديث إعدادات الموقع بنجاح، وستنعكس فوراً على موقع الزوار!</span>
          </div>
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

        {/* Box 3: Export Season Announcement Banner */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              شريط إعلانات المواسم التصديرية
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
                تفعيل الإعلان أعلى الموقع
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

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-8 py-3 text-xs font-bold text-white shadow-xs hover:shadow-emerald-500/20 active:scale-95 transition-all"
          >
            💾 حفظ ونشر الإعدادات
          </button>
        </div>
      </form>
    </div>
  );
}
