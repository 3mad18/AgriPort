/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { submitQuoteInquiry } from "@/lib/catalog";
import { useLiveProducts } from "@/lib/use-live-products";
import { useSiteSettings } from "@/lib/use-site-settings";
import { useLanguage } from "@/context/language-context";
import { useVisitorAuth } from "@/context/visitor-auth-context";
import { getLocalizedProduct } from "@/lib/product-translations";
import {
  getProductCategoryTranslation,
  translateAgriText,
  type Language,
} from "@/lib/i18n";
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Sprout,
  X,
  CheckCircle2,
  Lock,
} from "lucide-react";

const waMessages: Record<Language, string> = {
  ar: "مرحباً، أود الاستفسار عن تفاصيل وأسعار تصدير الحاصلات الزراعية",
  en: "Hello, I would like to inquire about export quotes and specifications",
  fr: "Bonjour, je souhaite me renseigner sur les devis et spécifications d'exportation",
  it: "Buongiorno, vorrei informazioni su preventivi e specifiche di esportazione",
  es: "Hola, quisiera consultar sobre cotizaciones y especificaciones de exportación",
};

const waButtons: Record<Language, string> = {
  ar: "محادثة واتساب فورية",
  en: "Instant WhatsApp Chat",
  fr: "Chat WhatsApp instantané",
  it: "Chat WhatsApp istantanea",
  es: "Chat de WhatsApp directo",
};

function ContactFormInner() {
  const router = useRouter();
  const { user, isAuthenticated } = useVisitorAuth();
  const { t, dir, language } = useLanguage();
  const c = t.contactPage;
  const f = c.fields;
  const p = t.productsPage;
  const searchParams = useSearchParams();
  const { products: liveCatalog } = useLiveProducts();
  const { settings: siteSettings } = useSiteSettings();

  const cropParam = searchParams.get("crop") || searchParams.get("product") || "";
  const idParam = searchParams.get("id") || "";
  const emailParam = searchParams.get("email") || "";

  // Locate product from liveCatalog if matched
  const matchedProduct = liveCatalog.find((item) => {
    if (idParam && item.id.toLowerCase() === idParam.toLowerCase()) return true;
    if (cropParam) {
      const lowerCrop = cropParam.toLowerCase();
      const lowerName = item.name.toLowerCase();
      const lowerId = item.id.toLowerCase();
      return (
        lowerId === lowerCrop ||
        lowerName.includes(lowerCrop) ||
        lowerCrop.includes(lowerName) ||
        item.variety.toLowerCase().includes(lowerCrop)
      );
    }
    return false;
  });

  const validLang = (["ar", "en", "fr", "it", "es"].includes(language)
    ? language
    : "en") as Language;

  const localizedProduct = matchedProduct
    ? getLocalizedProduct(matchedProduct, validLang)
    : null;

  const resolvedProductName =
    localizedProduct?.name ||
    (validLang !== "ar" && cropParam
      ? translateAgriText(cropParam, validLang)
      : cropParam);
  const resolvedVariety =
    localizedProduct?.variety ||
    (validLang !== "ar" && matchedProduct?.variety
      ? translateAgriText(matchedProduct.variety, validLang)
      : matchedProduct?.variety || "");

  const [isCleared, setIsCleared] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    email: emailParam,
    phone: "",
    product: resolvedProductName,
    quantity: "",
    incoterms: "FOB",
    destinationPort: "",
    message: "",
  });

  // Sync state if search params arrive
  useEffect(() => {
    if (!isCleared && (resolvedProductName || emailParam)) {
      setFormData((prev) => ({
        ...prev,
        product: resolvedProductName || prev.product,
        email: emailParam || prev.email,
      }));
    }
  }, [isCleared, resolvedProductName, emailParam]);

  // Auto-fill from authenticated visitor user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || (user.phone ? `${user.countryCode || ""} ${user.phone}`.trim() : ""),
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If user completely clears the product input, also clear URL so refresh doesn't bring it back
    if (name === "product" && value.trim() === "") {
      setIsCleared(true);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("id");
        url.searchParams.delete("crop");
        url.searchParams.delete("product");
        window.history.replaceState(
          {},
          "",
          url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : "")
        );
      }
    }
  };

  const handleClearSelectedProduct = () => {
    setIsCleared(true);
    setFormData((prev) => ({
      ...prev,
      product: "",
    }));

    // Clean URL in the browser so refresh doesn't bring it back
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("id");
      url.searchParams.delete("crop");
      url.searchParams.delete("product");
      window.history.replaceState(
        {},
        "",
        url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If requesting a quote for a product and not authenticated: redirect to register first!
    if (!isAuthenticated && (formData.product || cropParam || idParam)) {
      const returnUrl = `/contact?id=${encodeURIComponent(idParam)}&crop=${encodeURIComponent(formData.product || cropParam)}`;
      router.push(
        `/login?tab=register&redirect=${encodeURIComponent(returnUrl)}&cropName=${encodeURIComponent(formData.product || cropParam)}`
      );
      return;
    }

    console.log("📝 [Contact Form] Submit clicked, data:", formData);
    setIsSubmitting(true);
    const res = await submitQuoteInquiry(formData);
    console.log("📨 [Contact Form] Submit completed, response:", res);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <PageShell title={c.title} description={c.description}>
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 w-full min-w-0">
        {/* Direct Contact Info Sidebar (5 Cols) */}
        <div className="space-y-6 lg:col-span-5 w-full min-w-0">
          <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-8 shadow-sm w-full min-w-0 overflow-hidden">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              {c.directTitle}
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
              {c.directDesc}
            </p>

            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 w-full min-w-0">
              {/* Email */}
              <div className="flex items-start gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <Mail className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-400">
                    {c.emailLabel}
                  </div>
                  <a
                    href={`mailto:${siteSettings.email || "agriporteg@gmail.com"}`}
                    className="font-bold text-slate-900 hover:text-emerald-600 transition-colors text-xs sm:text-sm break-all block mt-0.5"
                  >
                    {siteSettings.email || "agriporteg@gmail.com"}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <Phone className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-400">
                    {c.phoneLabel}
                  </div>
                  <a
                    href={`tel:${(siteSettings.phone || "+20 100 720 2636").replace(/\s+/g, "")}`}
                    dir="ltr"
                    className="font-bold text-slate-900 hover:text-emerald-600 transition-colors block text-start font-mono text-xs sm:text-sm mt-0.5"
                  >
                    {siteSettings.phone || "+20 100 720 2636"}
                  </a>
                  <a
                    href={`https://wa.me/${(siteSettings.phone || "201007202636").replace(/\D/g, "")}?text=${encodeURIComponent(
                      waMessages[language] || waMessages.en
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors border border-emerald-100"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{waButtons[language] || waButtons.en}</span>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <MapPin className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-400">
                    {c.locationLabel}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5 leading-relaxed break-words">
                    {language === "ar" && siteSettings.location
                      ? siteSettings.location
                      : c.locationValue}
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Certifications Badge */}
            <div className="mt-6 sm:mt-8 rounded-2xl bg-slate-50 p-3 sm:p-4 border border-slate-100 w-full min-w-0">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-600 flex-wrap">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="break-words leading-relaxed">GLOBALG.A.P. | ISO 22000 | BRCGS | FDA Reg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Quote Request Form (7 Cols) */}
        <div className="lg:col-span-7 w-full min-w-0">
          <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-8 shadow-sm w-full min-w-0 overflow-hidden">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              {c.formTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              {c.formDesc}
            </p>

            {/* Active Selected Product Badge */}
            {!isCleared && resolvedProductName && formData.product && (
              <div className="mt-4 sm:mt-5 flex items-center justify-between gap-2.5 sm:gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-50/70 p-3 sm:p-4 shadow-2xs w-full min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                  {matchedProduct?.imageUrl ? (
                    <div className="relative h-11 w-11 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-emerald-500/20 shadow-2xs">
                      <img
                        src={matchedProduct.imageUrl}
                        alt={resolvedProductName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Sprout className="w-6 h-6" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        {c.selectedCropBadge}
                      </span>
                      {(localizedProduct?.category || matchedProduct?.category) && (
                        <span className="rounded-full bg-emerald-200/60 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold text-emerald-900">
                          {localizedProduct?.category ||
                            getProductCategoryTranslation(
                              matchedProduct?.category || "",
                              validLang
                            )}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 truncate">
                      {resolvedProductName}
                    </h4>
                    {resolvedVariety && (
                      <p className="text-[11px] sm:text-xs text-slate-600 truncate mt-0.5 font-medium">
                        {resolvedVariety}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClearSelectedProduct}
                  className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-400 hover:text-rose-600 shadow-2xs border border-slate-200/60 hover:border-rose-200 transition-colors"
                  title={c.clearSelection}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {submitted ? (
              <div className="mt-6 sm:mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8 text-center animate-in fade-in duration-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="mt-3 text-base sm:text-lg font-bold text-slate-900">
                  {f.successMsg}
                </h4>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-semibold text-white hover:bg-emerald-600 transition-colors"
                >
                  {f.submitAnotherBtn}
                </button>
              </div>
            ) : (
              <>
                {/* Notice if requesting a quote while not logged in */}
                {!isAuthenticated && (cropParam || idParam || formData.product) && (
                  <div className="mt-4 sm:mt-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 animate-fade-in text-start w-full min-w-0">
                    <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 mt-0.5">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                          {language === "ar"
                            ? "تسجيل الدخول مطلوب لإتمام طلب عرض السعر"
                            : "Sign in required to request a quote"}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-amber-800 mt-1 leading-relaxed">
                          {language === "ar"
                            ? `لطلب تسعير محصول «${resolvedProductName || formData.product || "المحدد"}»، يُرجى إنشاء حساب سريعاً أو تسجيل الدخول للمتابعة.`
                            : `To request a quote for ${resolvedProductName || formData.product || "the selected crop"}, please register or sign in first.`}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/login?tab=register&redirect=${encodeURIComponent(
                        `/contact?id=${encodeURIComponent(idParam)}&crop=${encodeURIComponent(cropParam || formData.product)}`
                      )}&cropName=${encodeURIComponent(resolvedProductName || cropParam || formData.product)}`}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-xs text-center whitespace-nowrap active:scale-95 shrink-0"
                    >
                      {language === "ar" ? "تسجيل الدخول / إنشاء حساب" : "Sign In / Register"}
                    </Link>
                  </div>
                )}

                {/* Verified user badge */}
                {isAuthenticated && user && (
                  <div className="mt-4 sm:mt-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-start animate-fade-in w-full min-w-0">
                    <div className="flex items-start sm:items-center gap-2 min-w-0 flex-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1 sm:mt-0"></span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-emerald-950 truncate">
                          {language === "ar" ? "طلب تسعير بحساب: " : "Quoting as: "}
                          <span className="font-bold text-slate-900">{user.name}</span>
                        </p>
                        <p className="text-emerald-700 font-mono text-[11px] truncate dir-ltr">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full shrink-0 border border-emerald-200/50 self-start sm:self-auto">
                      {language === "ar" ? "عميل معتمد" : "Verified"}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4 w-full min-w-0">
                {/* Name & Company */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 w-full min-w-0">
                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.name} *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={f.namePlaceholder}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.company} *
                    </label>
                    <input
                      required
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={f.companyPlaceholder}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Country & Email */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 w-full min-w-0">
                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.country} *
                    </label>
                    <input
                      required
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder={f.countryPlaceholder}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.email} *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={f.emailPlaceholder}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Product */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 w-full min-w-0">
                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={f.phonePlaceholder}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.product} *
                    </label>
                    <input
                      required
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      placeholder={f.productPlaceholder}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Quantity, Incoterms, & Port */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-3 w-full min-w-0">
                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.quantity} *
                    </label>
                    <input
                      required
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder={f.quantityPlaceholder}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.incoterms}
                    </label>
                    <select
                      name="incoterms"
                      value={formData.incoterms}
                      onChange={handleChange}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    >
                      <option value="FOB">FOB (Alexandria / Damietta)</option>
                      <option value="CIF">CIF (Discharge Port)</option>
                      <option value="CFR">CFR</option>
                      <option value="EXW">EXW (Packhouse)</option>
                    </select>
                  </div>

                  <div className="w-full min-w-0">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.destinationPort} *
                    </label>
                    <select
                      required
                      name="destinationPort"
                      value={formData.destinationPort}
                      onChange={handleChange}
                      className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    >
                      <option value="">
                        {language === "ar" ? "-- اختر ميناء الوصول المستهدف --" : "-- Select Destination Port --"}
                      </option>

                      <optgroup label={language === "ar" ? "🇪🇺 موانئ أوروبا (Europe)" : "🇪🇺 Europe"}>
                        <option value="Port of Rotterdam (Netherlands)">Port of Rotterdam (Netherlands) - ميناء روتردام</option>
                        <option value="Port of Antwerp-Bruges (Belgium)">Port of Antwerp-Bruges (Belgium) - ميناء أنتويرب</option>
                        <option value="Port of Hamburg (Germany)">Port of Hamburg (Germany) - ميناء هامبورغ</option>
                        <option value="Port of Bremen / Bremerhaven (Germany)">Port of Bremerhaven (Germany) - ميناء بريمن</option>
                        <option value="Port of Valencia (Spain)">Port of Valencia (Spain) - ميناء فالنسيا</option>
                        <option value="Port of Barcelona (Spain)">Port of Barcelona (Spain) - ميناء برشلونة</option>
                        <option value="Port of Algeciras (Spain)">Port of Algeciras (Spain) - ميناء الجزيرة الخضراء</option>
                        <option value="Port of Genoa (Italy)">Port of Genoa (Italy) - ميناء جنوة</option>
                        <option value="Port of Trieste (Italy)">Port of Trieste (Italy) - ميناء ترييستي</option>
                        <option value="Port of Salerno / Naples (Italy)">Port of Salerno / Naples (Italy) - ميناء ساليرنو / نابولي</option>
                        <option value="Port of Marseille-Fos (France)">Port of Marseille-Fos (France) - ميناء مرسيليا</option>
                        <option value="Port of Le Havre (France)">Port of Le Havre (France) - ميناء لو هافر</option>
                        <option value="Port of Koper (Slovenia)">Port of Koper (Slovenia) - ميناء كوبر</option>
                        <option value="Port of Piraeus (Greece)">Port of Piraeus (Greece) - ميناء بيرايوس</option>
                        <option value="Port of Thessaloniki (Greece)">Port of Thessaloniki (Greece) - ميناء سالونيك</option>
                        <option value="Port of Felixstowe (United Kingdom)">Port of Felixstowe (UK) - ميناء فيلكستو</option>
                        <option value="London Gateway (United Kingdom)">London Gateway (UK) - ميناء بوابة لندن</option>
                        <option value="Port of Southampton (United Kingdom)">Port of Southampton (UK) - ميناء ساوثهامبتون</option>
                        <option value="Port of St. Petersburg (Russia)">Port of St. Petersburg (Russia) - ميناء سانت بطرسبرغ</option>
                        <option value="Port of Novorossiysk (Russia)">Port of Novorossiysk (Russia) - ميناء نوفوروسيسك</option>
                        <option value="Port of Constanta (Romania)">Port of Constanta (Romania) - ميناء كونستانتسا</option>
                        <option value="Port of Varna (Bulgaria)">Port of Varna (Bulgaria) - ميناء فارنا</option>
                        <option value="Port of Gdansk (Poland)">Port of Gdansk (Poland) - ميناء غدانسك</option>
                      </optgroup>

                      <optgroup label={language === "ar" ? "🇸🇦🇦🇪 موانئ الخليج والشرق الأوسط (Middle East & GCC)" : "🇸🇦🇦🇪 Middle East & GCC"}>
                        <option value="Jebel Ali Port, Dubai (UAE)">Jebel Ali Port, Dubai (UAE) - ميناء جبل علي، دبي</option>
                        <option value="Khalifa Port, Abu Dhabi (UAE)">Khalifa Port, Abu Dhabi (UAE) - ميناء خليفة، أبوظبي</option>
                        <option value="Sharjah Port Khalid (UAE)">Port Khalid, Sharjah (UAE) - ميناء خالد، الشارقة</option>
                        <option value="Jeddah Islamic Port (Saudi Arabia)">Jeddah Islamic Port (Saudi Arabia) - ميناء جدة الإسلامي</option>
                        <option value="King Abdulaziz Port, Dammam (Saudi Arabia)">King Abdulaziz Port, Dammam (KSA) - ميناء الملك عبد العزيز، الدمام</option>
                        <option value="King Abdullah Port, Rabigh (Saudi Arabia)">King Abdullah Port, Rabigh (KSA) - ميناء الملك عبد الله، رابغ</option>
                        <option value="Hamad Port, Doha (Qatar)">Hamad Port, Doha (Qatar) - ميناء حمد، الدوحة</option>
                        <option value="Shuwaikh Port (Kuwait)">Shuwaikh Port (Kuwait) - ميناء الشويخ، الكويت</option>
                        <option value="Shuaiba Port (Kuwait)">Shuaiba Port (Kuwait) - ميناء الشعيبة، الكويت</option>
                        <option value="Khalifa Bin Salman Port (Bahrain)">Khalifa Bin Salman Port (Bahrain) - ميناء خليفة بن سلمان، البحرين</option>
                        <option value="Port of Sohar (Oman)">Port of Sohar (Oman) - ميناء صحار، عمان</option>
                        <option value="Port of Salalah (Oman)">Port of Salalah (Oman) - ميناء صلالة، عمان</option>
                        <option value="Port Sultan Qaboos, Muscat (Oman)">Port Sultan Qaboos (Oman) - ميناء السلطان قابوس، مسقط</option>
                        <option value="Port of Aqaba (Jordan)">Port of Aqaba (Jordan) - ميناء العقبة، الأردن</option>
                        <option value="Port of Beirut (Lebanon)">Port of Beirut (Lebanon) - ميناء بيروت، لبنان</option>
                        <option value="Port of Tripoli (Lebanon)">Port of Tripoli (Lebanon) - ميناء طرابلس، لبنان</option>
                        <option value="Umm Qasr Port, Basra (Iraq)">Umm Qasr Port, Basra (Iraq) - ميناء أم قصر، البصرة</option>
                      </optgroup>

                      <optgroup label={language === "ar" ? "🇪🇬 موانئ الشحن والتصدير المصرية (Egypt Loading Ports)" : "🇪🇬 Egypt Loading Ports"}>
                        <option value="Port of Alexandria (Egypt)">Port of Alexandria (Egypt) - ميناء الإسكندرية البحري</option>
                        <option value="Port of Damietta (Egypt)">Port of Damietta (Egypt) - ميناء دمياط البحري</option>
                        <option value="Port of El-Dekheila (Egypt)">Port of El-Dekheila (Egypt) - ميناء الدخيلة</option>
                        <option value="Port Said Port (Egypt)">Port Said Port (Egypt) - ميناء بورسعيد (شرق / غرب)</option>
                        <option value="Sokhna Port, Red Sea (Egypt)">Sokhna Port, Red Sea (Egypt) - ميناء العين السخنة</option>
                        <option value="Cairo Cargo Airport (Egypt)">Cairo Cargo Airport (Egypt) - قرية البضائع بمطار القاهرة الدولي</option>
                      </optgroup>

                      <optgroup label={language === "ar" ? "🌍 موانئ أفريقيا (Africa)" : "🌍 Africa"}>
                        <option value="Tanger Med Port (Morocco)">Tanger Med Port (Morocco) - ميناء طنجة المتوسط</option>
                        <option value="Casablanca Port (Morocco)">Casablanca Port (Morocco) - ميناء الدار البيضاء</option>
                        <option value="Port of Algiers (Algeria)">Port of Algiers (Algeria) - ميناء الجزائر العاصمة</option>
                        <option value="Port of Oran (Algeria)">Port of Oran (Algeria) - ميناء وهران</option>
                        <option value="Port of Rades / Tunis (Tunisia)">Port of Rades (Tunisia) - ميناء رادس، تونس</option>
                        <option value="Port of Tripoli (Libya)">Port of Tripoli (Libya) - ميناء طرابلس، ليبيا</option>
                        <option value="Port of Misrata (Libya)">Port of Misrata (Libya) - ميناء مصراتة، ليبيا</option>
                        <option value="Port of Benghazi (Libya)">Port of Benghazi (Libya) - ميناء بنغازي، ليبيا</option>
                        <option value="Port Sudan (Sudan)">Port Sudan (Sudan) - ميناء بورتسودان</option>
                        <option value="Port of Djibouti (Djibouti)">Port of Djibouti (Djibouti) - ميناء جيبوتي</option>
                        <option value="Port of Mombasa (Kenya)">Port of Mombasa (Kenya) - ميناء مومباسا، كينيا</option>
                        <option value="Port of Dar es Salaam (Tanzania)">Port of Dar es Salaam (Tanzania) - ميناء دار السلام، تنزانيا</option>
                        <option value="Port of Durban (South Africa)">Port of Durban (South Africa) - ميناء ديربان، جنوب أفريقيا</option>
                        <option value="Port of Cape Town (South Africa)">Port of Cape Town (South Africa) - ميناء كيب تاون</option>
                      </optgroup>

                      <optgroup label={language === "ar" ? "🌏 موانئ آسيا والشرق الأقصى (Asia & Far East)" : "🌏 Asia & Far East"}>
                        <option value="Port of Singapore">Port of Singapore - ميناء سنغافورة</option>
                        <option value="Port Klang (Malaysia)">Port Klang (Malaysia) - ميناء بورت كلانج، ماليزيا</option>
                        <option value="Port of Shanghai (China)">Port of Shanghai (China) - ميناء شنغهاي، الصين</option>
                        <option value="Port of Ningbo-Zhoushan (China)">Port of Ningbo-Zhoushan (China) - ميناء نينغبو، الصين</option>
                        <option value="Port of Shenzhen (China)">Port of Shenzhen (China) - ميناء شنتشن، الصين</option>
                        <option value="Port of Guangzhou (China)">Port of Guangzhou (China) - ميناء قوانغتشو، الصين</option>
                        <option value="Port of Qingdao (China)">Port of Qingdao (China) - ميناء تشينغداو، الصين</option>
                        <option value="Port of Tianjin (China)">Port of Tianjin (China) - ميناء تيانجين، الصين</option>
                        <option value="Port of Hong Kong">Port of Hong Kong - ميناء هونغ كونغ</option>
                        <option value="Port of Busan (South Korea)">Port of Busan (South Korea) - ميناء بوسان، كوريا الجنوبية</option>
                        <option value="Port of Tokyo / Yokohama (Japan)">Port of Tokyo / Yokohama (Japan) - ميناء طوكيو / يوكوهاما</option>
                        <option value="Nhava Sheva Port, Mumbai (India)">Nhava Sheva Port, Mumbai (India) - ميناء نهافا شيفا، مومباي</option>
                        <option value="Mundra Port, Gujarat (India)">Mundra Port, Gujarat (India) - ميناء موندرا، الهند</option>
                        <option value="Port of Karachi (Pakistan)">Port of Karachi (Pakistan) - ميناء كراتشي، باكستان</option>
                        <option value="Port of Colombo (Sri Lanka)">Port of Colombo (Sri Lanka) - ميناء كولومبو، سريلانكا</option>
                        <option value="Port of Chittagong (Bangladesh)">Port of Chittagong (Bangladesh) - ميناء تشيتاغونغ، بنغلاديش</option>
                        <option value="Laem Chabang Port (Thailand)">Laem Chabang Port (Thailand) - ميناء لايم شابانج، تايلاند</option>
                        <option value="Tanjung Priok Port, Jakarta (Indonesia)">Tanjung Priok Port, Jakarta (Indonesia) - ميناء جاكرتا</option>
                        <option value="Port of Manila (Philippines)">Port of Manila (Philippines) - ميناء مانيلا، الفلبين</option>
                        <option value="Port of Haiphong / Cat Lai (Vietnam)">Port of Haiphong / Cat Lai (Vietnam) - ميناء هايفونغ، فيتنام</option>
                      </optgroup>

                      <optgroup label={language === "ar" ? "🌎 موانئ الأمريكتين وأستراليا (Americas & Australia)" : "🌎 Americas & Australia"}>
                        <option value="Port of New York and New Jersey (USA)">Port of New York & New Jersey (USA) - ميناء نيويورك</option>
                        <option value="Port of Savannah, Georgia (USA)">Port of Savannah, Georgia (USA) - ميناء سافانا</option>
                        <option value="Port of Houston, Texas (USA)">Port of Houston, Texas (USA) - ميناء هيوستن</option>
                        <option value="Port of Los Angeles / Long Beach (USA)">Port of Los Angeles (USA) - ميناء لوس أنجلوس</option>
                        <option value="Port of Miami, Florida (USA)">Port of Miami, Florida (USA) - ميناء ميامي</option>
                        <option value="Port of Norfolk, Virginia (USA)">Port of Norfolk, Virginia (USA) - ميناء نورفولك</option>
                        <option value="Port of Montreal (Canada)">Port of Montreal (Canada) - ميناء مونتريال، كندا</option>
                        <option value="Port of Vancouver (Canada)">Port of Vancouver (Canada) - ميناء فانكوفر، كندا</option>
                        <option value="Port of Santos, Sao Paulo (Brazil)">Port of Santos (Brazil) - ميناء سانتوس، البرازيل</option>
                        <option value="Port of Buenos Aires (Argentina)">Port of Buenos Aires (Argentina) - ميناء بوينس آيرس</option>
                        <option value="Port of Valparaiso (Chile)">Port of Valparaiso (Chile) - ميناء فالبارايسو، تشيلي</option>
                        <option value="Port of Sydney / Melbourne (Australia)">Port of Sydney / Melbourne (Australia) - ميناء سيدني / ملبورن</option>
                      </optgroup>

                      <optgroup label={language === "ar" ? "🌐 وجهة أخرى (Other Destination)" : "🌐 Other Destination"}>
                        <option value="Other Port (Specified in notes)">
                          {language === "ar" ? "ميناء آخر (يُحدد في تفاصيل الملاحظات بالأسفل)" : "Other Port (Specified in notes below)"}
                        </option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="w-full min-w-0">
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                    {f.message}
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={f.messagePlaceholder}
                    className="w-full min-w-0 max-w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none leading-relaxed transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>
                    {isSubmitting ? f.submittingBtn : f.submitBtn}
                  </span>
                  <span className={dir === "rtl" ? "rotate-180" : ""}>→</span>
                </button>
              </form>
            </>
          )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-20 text-center text-sm font-medium text-slate-400">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
