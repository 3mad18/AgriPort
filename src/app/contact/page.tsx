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
import {
  getProductCategoryTranslation,
  translateAgriText,
  type Language,
} from "@/lib/i18n";

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

  const localizedItem = matchedProduct
    ? p.productsList?.find((item) => {
        if (item.id === matchedProduct.id) return true;
        const lowerName = (matchedProduct.name || "").toLowerCase();
        if (lowerName.includes("خرشوف") && item.id === "artichoke") return true;
        if (lowerName.includes("موالح") && item.id === "citrus") return true;
        if (lowerName.includes("بصل") && item.id === "onions") return true;
        if (lowerName.includes("فراولة") && item.id === "strawberries") return true;
        if (lowerName.includes("رمان") && item.id === "pomegranates") return true;
        if (lowerName.includes("بطاطس") && item.id === "potatoes") return true;
        if (lowerName.includes("عنب") && item.id === "grapes") return true;
        return false;
      })
    : null;

  const rawProductName =
    localizedItem?.name || matchedProduct?.name || cropParam;
  const rawVariety =
    localizedItem?.variety || matchedProduct?.variety || "";

  const resolvedProductName =
    language !== "ar"
      ? translateAgriText(rawProductName, language)
      : rawProductName;
  const resolvedVariety =
    language !== "ar"
      ? translateAgriText(rawVariety, language)
      : rawVariety;

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
        product: prev.product ? prev.product : resolvedProductName,
        email: prev.email ? prev.email : emailParam,
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
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Direct Contact Info Sidebar (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-5 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {c.directTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 font-medium">
              {c.directDesc}
            </p>

            <div className="mt-8 space-y-5">
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg">
                  ✉
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    {c.emailLabel}
                  </div>
                  <a
                    href={`mailto:${siteSettings.email || "agriporteg@gmail.com"}`}
                    className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    {siteSettings.email || "agriporteg@gmail.com"}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg">
                  📞
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    {c.phoneLabel}
                  </div>
                  <a
                    href={`tel:${(siteSettings.phone || "+20 100 720 2636").replace(/\s+/g, "")}`}
                    dir="ltr"
                    className="font-bold text-slate-900 hover:text-emerald-600 transition-colors block text-start font-mono"
                  >
                    {siteSettings.phone || "+20 100 720 2636"}
                  </a>
                  <a
                    href={`https://wa.me/${(siteSettings.phone || "201007202636").replace(/\D/g, "")}?text=${encodeURIComponent(
                      waMessages[language] || waMessages.en
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <span>💬</span>
                    <span>{waButtons[language] || waButtons.en}</span>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg">
                  📍
                </span>
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    {c.locationLabel}
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    {language === "ar" && siteSettings.location
                      ? siteSettings.location
                      : c.locationValue}
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Certifications Badge */}
            <div className="mt-8 rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span>🛡</span>
                <span>GLOBALG.A.P. | ISO 22000 | BRCGS | FDA Reg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Quote Request Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-5 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {c.formTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              {c.formDesc}
            </p>

            {/* Active Selected Product Badge */}
            {!isCleared && resolvedProductName && formData.product && (
              <div className="mt-5 flex items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-50/70 p-3 sm:p-4 shadow-2xs">
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                  {matchedProduct?.imageUrl ? (
                    <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-emerald-500/20 shadow-2xs">
                      <img
                        src={matchedProduct.imageUrl}
                        alt={resolvedProductName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                      🌿
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        {c.selectedCropBadge}
                      </span>
                      {(localizedItem?.category || matchedProduct?.category) && (
                        <span className="rounded-full bg-emerald-200/60 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                          {getProductCategoryTranslation(
                            localizedItem?.category || matchedProduct?.category || "",
                            language
                          )}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                      {resolvedProductName}
                    </h4>
                    {resolvedVariety && (
                      <p className="text-xs text-slate-600 truncate mt-0.5 font-medium">
                        {resolvedVariety}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClearSelectedProduct}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-400 hover:text-rose-600 shadow-2xs border border-slate-200/60 hover:border-rose-200 transition-colors"
                  title={c.clearSelection}
                >
                  ✕
                </button>
              </div>
            )}

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center animate-in fade-in duration-200">
                <span className="text-4xl">🎉</span>
                <h4 className="mt-3 text-lg font-bold text-slate-900">
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
                  <div className="mt-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in text-start">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0 mt-0.5">🔒</span>
                      <div>
                        <h4 className="text-sm font-bold text-amber-950">
                          {language === "ar"
                            ? "تسجيل الدخول مطلوب لإتمام طلب عرض السعر"
                            : "Sign in required to request a quote"}
                        </h4>
                        <p className="text-xs text-amber-800 mt-1 leading-relaxed">
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
                      className="shrink-0 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-xs text-center whitespace-nowrap active:scale-95"
                    >
                      {language === "ar" ? "تسجيل الدخول / إنشاء حساب" : "Sign In / Register"}
                    </Link>
                  </div>
                )}

                {/* Verified user badge */}
                {isAuthenticated && user && (
                  <div className="mt-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 p-3 sm:p-4 flex items-center justify-between gap-3 text-start animate-fade-in">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                      <p className="text-xs font-semibold text-emerald-950 truncate">
                        {language === "ar" ? "طلب تسعير بحساب: " : "Quoting as: "}
                        <span className="font-bold text-slate-900">{user.name}</span>
                        <span className="text-emerald-700 font-mono text-[11px] ms-1.5 dir-ltr">({user.email})</span>
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full shrink-0 border border-emerald-200/50">
                      {language === "ar" ? "عميل معتمد" : "Verified"}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Name & Company */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
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
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
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
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Country & Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
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
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
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
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone & Product */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={f.phonePlaceholder}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
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
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quantity, Incoterms, & Port */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
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
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.incoterms}
                    </label>
                    <select
                      name="incoterms"
                      value={formData.incoterms}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    >
                      <option value="FOB">FOB (Alexandria / Damietta)</option>
                      <option value="CIF">CIF (Discharge Port)</option>
                      <option value="CFR">CFR</option>
                      <option value="EXW">EXW (Packhouse)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {f.destinationPort}
                    </label>
                    <input
                      type="text"
                      name="destinationPort"
                      value={formData.destinationPort}
                      onChange={handleChange}
                      placeholder={f.destinationPortPlaceholder}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                    {f.message}
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={f.messagePlaceholder}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 py-3.5 text-sm font-semibold text-white shadow-xs hover:shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
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
