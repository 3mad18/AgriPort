"use client";

import { useEffect, useState } from "react";
import { useOpsStore, DEFAULT_SEO_KEYWORDS } from "@/context/ops-store-context";
import {
  Settings,
  CheckCircle2,
  AlertCircle,
  Eye,
  ExternalLink,
  Save,
  Search,
  Globe,
  Sparkles,
  Copy,
  Trash2,
  RotateCcw,
  Plus,
  X,
  Check,
  Tag,
  ShieldCheck,
  FileCode2,
  Sprout,
} from "lucide-react";

const CURATED_KEYWORD_SUGGESTIONS = {
  produce: {
    label: "محاصيل وخضروات طازجة (عربي)",
    keywords: [
      "تصدير حاصلات زراعية مصرية",
      "خضروات وفواكه طازجة للتصدير",
      "تصدير خرشوف مصري فاخر",
      "قلوب خرشوف مجمدة ومجهزة",
      "تصدير فاصوليا خضراء مصرية",
      "فاصوليا خضراء رفيعة Fine Beans",
      "تصدير بروكلي وقرنبيط",
      "بروكلي طازج شحن جوي وبحري",
      "قرنبيط أبيض صلب للتصدير",
      "بطاطس مصرية للتصدير سبونتا",
      "بطاطس تصنيع شيبس هيرميس",
      "بصل أحمر إيطالي تصدير",
      "بصل ذهبي جاف للتصدير",
      "موالح وبرتقال صيفي فالنسيا",
      "خس كابوتشا وروكولا مبرد",
    ],
  },
  intl: {
    label: "English / European B2B Produce Buyers",
    keywords: [
      "Egyptian agricultural produce export",
      "Fresh vegetables exporter Egypt",
      "Fresh Egyptian Artichokes export",
      "Egyptian Green Beans Polesta supplier",
      "Fresh Broccoli exporter Cairo",
      "Fresh Cauliflower export Egypt",
      "Egyptian Potatoes Spunta grade A",
      "Egyptian Red Onions exporter",
      "Valencia Orange export Egypt",
      "GlobalGAP certified farms Egypt",
      "BRCGS certified packing house Beheira",
      "Fresh produce supplier Rungis Rotterdam",
      "Alexandria port reefer produce export",
      "Cairo Air Cargo fresh vegetables",
    ],
  },
  languages: {
    label: "لغات المستوردين الأوروبيين (FR, IT, ES)",
    keywords: [
      "Export légumes frais Égypte",
      "Artichauts frais d'Égypte",
      "Haricots verts frais Égypte",
      "Esportazione verdure fresche Egitto",
      "Carciofi freschi egiziani esportazione",
      "Fagiolini freschi Egitto",
      "Exportación hortalizas frescas Egipto",
      "Alcachofas frescas de Egipto",
      "Judías verdes frescas Egipto",
      "Importation fruits et légumes Égypte",
    ],
  },
  cert: {
    label: "شهادات جودة ومعايير لوجستية",
    keywords: [
      "محطة فرز وتعبئة كفر الدوار",
      "محطات تعبئة الحاصلات الزراعية بالبحيرة",
      "سلسلة تبريد معتمدة Cold Chain Egypt",
      "شهادة GlobalGAP للمزارع التصديرية",
      "شهادة BRCGS لسلامة الغذاء",
      "شهادة ISO 22000 لتعبئة الخضروات",
      "تصدير زراعي ميناء الإسكندرية",
      "شحن حاويات مبردة ميناء دمياط",
      "قرية البضائع مطار القاهرة شحن سريع",
      "فحص متبقيات المبيدات MRLs معتمد للاتحاد الأوروبي",
    ],
  },
};

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
    commercialRegister: settings.commercialRegister || "108420",
    taxCard: settings.taxCard || "629-418-735",
    exporterRegNumber: settings.exporterRegNumber || "28410",
    exportBannerText:
      settings.exportBannerText ||
      "موسم تصدير البرتقال الصيفي والبصل مفتوح حالياً للشحن الفوري إلى أوروبا ودول الخليج!",
    showExportBanner: settings.showExportBanner !== false,
    seoTitle:
      settings.seoTitle ||
      "AgriPort — تصدير الحاصلات الزراعية والخضروات المصرية الفاخرة | Fresh Produce Exporter",
    seoDescription:
      settings.seoDescription ||
      "شركة AgriPort الرائدة في تصدير الحاصلات الزراعية والخضروات والفواكه الطازجة وفق شهادات GlobalGAP و BRCGS وسلسلة التبريد المعتمدة إلى أوروبا ودول العالم.",
    seoKeywords:
      Array.isArray(settings.seoKeywords) && settings.seoKeywords.length > 0
        ? settings.seoKeywords
        : DEFAULT_SEO_KEYWORDS,
    googleVerificationId: settings.googleVerificationId || "",
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [activeKeywordTab, setActiveKeywordTab] =
    useState<keyof typeof CURATED_KEYWORD_SUGGESTIONS>("produce");
  const [copiedKeywords, setCopiedKeywords] = useState(false);

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
        commercialRegister: settings.commercialRegister || "108420",
        taxCard: settings.taxCard || "629-418-735",
        exporterRegNumber: settings.exporterRegNumber || "28410",
        exportBannerText: settings.exportBannerText || "",
        showExportBanner: settings.showExportBanner !== false,
        seoTitle:
          settings.seoTitle ||
          "AgriPort — تصدير الحاصلات الزراعية والخضروات المصرية الفاخرة | Fresh Produce Exporter",
        seoDescription:
          settings.seoDescription ||
          "شركة AgriPort الرائدة في تصدير الحاصلات الزراعية والخضروات والفواكه الطازجة وفق شهادات GlobalGAP و BRCGS وسلسلة التبريد المعتمدة إلى أوروبا ودول العالم.",
        seoKeywords:
          Array.isArray(settings.seoKeywords) && settings.seoKeywords.length > 0
            ? settings.seoKeywords
            : DEFAULT_SEO_KEYWORDS,
        googleVerificationId: settings.googleVerificationId || "",
      });
    }
  }, [settings]);

  // Keyword Helpers
  const handleAddKeyword = (rawInput?: string) => {
    const textToAdd = rawInput !== undefined ? rawInput : keywordInput;
    if (!textToAdd.trim()) return;

    // Support comma, semicolon, newline splitting for bulk pasting
    const splitItems = textToAdd
      .split(/[,;\n]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 1);

    if (splitItems.length === 0) return;

    const currentSet = new Set(form.seoKeywords);
    splitItems.forEach((kw) => currentSet.add(kw));

    setForm({
      ...form,
      seoKeywords: Array.from(currentSet),
    });

    if (rawInput === undefined) {
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setForm({
      ...form,
      seoKeywords: form.seoKeywords.filter((kw) => kw !== keywordToRemove),
    });
  };

  const handleClearKeywords = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع الكلمات المفتاحية الحالية؟")) {
      setForm({ ...form, seoKeywords: [] });
    }
  };

  const handleRestoreDefaultKeywords = () => {
    setForm({ ...form, seoKeywords: DEFAULT_SEO_KEYWORDS });
  };

  const handleCopyKeywords = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(form.seoKeywords.join(", "));
      setCopiedKeywords(true);
      setTimeout(() => setCopiedKeywords(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg(null);

    const result = await updateSettings(form);
    setIsSaving(false);

    if (result.success) {
      setStatusMsg({
        type: "success",
        text: "تم حفظ وتحديث إعدادات الموقع والكلمات المفتاحية بنجاح ونشرها في السحابة وموقع الزوار فوراً!",
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
            <Settings className="w-5 h-5 text-emerald-600" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              إعدادات الموقع والتصدير ومحركات البحث
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              التحكم في بيانات التواصل الرسمية، عنوان المقر، الكلمات المفتاحية لمحركات البحث (SEO)، وأشرطة إعلانات المواسم التصديرية
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
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
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
        {/* Box 1: Company Identity & Legal Registration */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            هوية الشركة والمنصة التصديرية
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

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رقم السجل التجاري (Commercial Register)
              </label>
              <input
                type="text"
                value={form.commercialRegister}
                onChange={(e) =>
                  setForm({ ...form, commercialRegister: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رقم البطاقة الضريبية (Tax Card)
              </label>
              <input
                type="text"
                value={form.taxCard}
                onChange={(e) => setForm({ ...form, taxCard: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none font-mono"
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

        {/* Box 4: SEO, Google Keywords & Search Console (جديد وشامل) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
                <Search className="w-4 h-4 text-blue-600" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  تحسين محركات البحث والكلمات المفتاحية في جوجل (Google SEO)
                </h3>
                <p className="text-[11px] text-slate-500">
                  ضبط الكلمات المفتاحية والعناوين التصديرية لمساعدة المستوردين الدوليين في العثور على موقعك عبر محركات البحث
                </p>
              </div>
            </div>

            {/* Sitemap & Robots shortcuts */}
            <div className="flex items-center gap-2 text-xs">
              <a
                href="https://agri-port-zeta.vercel.app/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 font-medium transition-colors"
              >
                <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                <span>sitemap.xml</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href="https://agri-port-zeta.vercel.app/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 font-medium transition-colors"
              >
                <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                <span>robots.txt</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Live Google Search Card Preview */}
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-slate-500" />
                <span>معاينة حية لشكل ظهور الموقع في نتائج بحث جوجل (Google SERP Snippet Preview)</span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                معاينة مطابقة لجوجل
              </span>
            </div>

            {/* Simulated Google Result */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5 font-sans" dir="ltr">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  <Sprout className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-800 font-medium text-[12px] leading-tight">AgriPort Egypt</span>
                  <span className="text-slate-500 text-[11px] leading-tight">https://agri-port-zeta.vercel.app › products › export</span>
                </div>
              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[17px] sm:text-[19px] font-medium text-[#1a0dab] hover:underline cursor-pointer block leading-snug line-clamp-2"
                style={{ fontFamily: "arial, sans-serif" }}
              >
                {form.seoTitle || "AgriPort — تصدير الحاصلات الزراعية والخضروات المصرية الفاخرة | Fresh Produce Exporter"}
              </a>

              <p
                className="text-[13px] text-[#4d5156] leading-relaxed line-clamp-3"
                style={{ fontFamily: "arial, sans-serif" }}
              >
                {form.seoDescription || "شركة AgriPort الرائدة في تصدير الحاصلات الزراعية والخضروات والفواكه الطازجة وفق شهادات GlobalGAP و BRCGS وسلسلة التبريد المعتمدة إلى أوروبا ودول العالم."}
              </p>

              {/* Sitelinks simulation */}
              <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#1a0dab]">
                <span className="hover:underline cursor-pointer">المنتجات التصديرية (Products)</span>
                <span className="hover:underline cursor-pointer">طلب عرض أسعار (Request Quote)</span>
                <span className="hover:underline cursor-pointer">المرافق ومحطات التعبئة</span>
                <span className="hover:underline cursor-pointer">تواصل مع قسم التصدير</span>
              </div>
            </div>
          </div>

          {/* Meta Title & Description Inputs */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  عنوان الموقع الرئيسي في محركات البحث (Meta Title)
                </label>
                <span
                  className={`text-[11px] font-medium ${
                    form.seoTitle.length > 65
                      ? "text-amber-600"
                      : "text-slate-400"
                  }`}
                >
                  {form.seoTitle.length} / 65 حرف (الموصى به: 50-60 حرفاً)
                </span>
              </div>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                placeholder="AgriPort — تصدير الحاصلات الزراعية والخضروات المصرية الفاخرة | Fresh Produce Exporter"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  وصف الموقع لمحركات البحث ومستوردي الخضروات (Meta Description)
                </label>
                <span
                  className={`text-[11px] font-medium ${
                    form.seoDescription.length > 165
                      ? "text-amber-600"
                      : "text-slate-400"
                  }`}
                >
                  {form.seoDescription.length} / 160 حرف (الموصى به: 130-160 حرفاً)
                </span>
              </div>
              <textarea
                rows={3}
                value={form.seoDescription}
                onChange={(e) =>
                  setForm({ ...form, seoDescription: e.target.value })
                }
                placeholder="شركة AgriPort الرائدة في تصدير الحاصلات الزراعية والخضروات والفواكه الطازجة..."
                className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Google Search Console Verification ID */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>كود التحقق من ملكية الموقع في Google Search Console</span>
                </label>
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>فتح Google Search Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <input
                type="text"
                dir="ltr"
                value={form.googleVerificationId}
                onChange={(e) =>
                  setForm({ ...form, googleVerificationId: e.target.value })
                }
                placeholder="e.g. google-site-verification=abc123xyz أو الرمز التعريفي"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                يتم إدراجه تلقائياً كرمز &lt;meta name=&quot;google-site-verification&quot;&gt; لتفعيل أرشفة الموقع وإرسال خرائط الـ sitemap فورياً.
              </span>
            </div>
          </div>

          {/* Keywords Management Section */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>الكلمات المفتاحية النشطة للموقع (Active Keywords Cloud)</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  إجمالي {form.seoKeywords.length} كلمة مفتاحية معتمدة وموجهة لمحركات البحث والمستوردين
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyKeywords}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  title="نسخ جميع الكلمات المفتاحية الحالية"
                >
                  {copiedKeywords ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>نسخ الكل</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRestoreDefaultKeywords}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  title="استعادة الكلمات المفتاحية التصديرية الافتراضية"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>استعادة الافتراضيات</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearKeywords}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                  title="مسح جميع الكلمات"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>مسح</span>
                </button>
              </div>
            </div>

            {/* Keyword Input Box */}
            <div className="flex gap-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddKeyword();
                  }
                }}
                placeholder="اكتب كلمة مفتاحية جديدة واضغط Enter أو زر الإضافة (أو الصق عدة كلمات مفصولة بفواصل)..."
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddKeyword()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة كلمة</span>
              </button>
            </div>

            {/* Active Keywords Cloud Chips */}
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/70 min-h-[90px] flex flex-wrap gap-2 items-center">
              {form.seoKeywords.length === 0 ? (
                <div className="text-center w-full py-4 text-xs text-slate-400">
                  لا توجد كلمات مفتاحية مضافة حالياً. يمكنك إضافة كلمات من الصندوق أعلاه أو النقر على المقترحات بالأسفل.
                </div>
              ) : (
                form.seoKeywords.map((kw, idx) => (
                  <span
                    key={`${kw}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-medium shadow-2xs hover:border-emerald-300 transition-colors group"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="text-slate-400 hover:text-rose-600 rounded-full p-0.5 hover:bg-rose-50 transition-colors"
                      title="حذف هذه الكلمة"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Curated Keywords Suggestion Bank */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>بنك الكلمات المفتاحية التصديرية المقترحة (بنقرة واحدة للإضافة)</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  انقر على أي كلمة لإدراجها فوراً
                </span>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-2">
                {(Object.keys(CURATED_KEYWORD_SUGGESTIONS) as Array<keyof typeof CURATED_KEYWORD_SUGGESTIONS>).map(
                  (tabKey) => {
                    const tab = CURATED_KEYWORD_SUGGESTIONS[tabKey];
                    const isActive = activeKeywordTab === tabKey;
                    return (
                      <button
                        key={tabKey}
                        type="button"
                        onClick={() => setActiveKeywordTab(tabKey)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-colors ${
                          isActive
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-1.5">
                {CURATED_KEYWORD_SUGGESTIONS[activeKeywordTab].keywords.map(
                  (suggested) => {
                    const isAlreadyAdded = form.seoKeywords.includes(suggested);
                    return (
                      <button
                        key={suggested}
                        type="button"
                        disabled={isAlreadyAdded}
                        onClick={() => handleAddKeyword(suggested)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isAlreadyAdded
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 opacity-60 cursor-default"
                            : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 shadow-2xs"
                        }`}
                      >
                        {isAlreadyAdded ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{suggested}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 text-slate-400" />
                            <span>{suggested}</span>
                          </>
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview of the exact Pill Badge in Hero */}
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-slate-500" />
              <span>معاينة الشارة في واجهة الموقع (كما تظهر للزوار تماماً)</span>
            </h4>
            <a
              href="https://agri-port-zeta.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>فتح موقع الزوار للتحقق</span>
              <ExternalLink className="w-3.5 h-3.5" />
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
            className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 w-full sm:w-auto px-8 py-3 text-xs font-bold text-white shadow-xs hover:shadow-emerald-500/20 active:scale-95 transition-all"
          >
            {isSaving ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>جاري الحفظ والمزامنة...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>حفظ ونشر كافة الإعدادات والكلمات المفتاحية</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
