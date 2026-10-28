/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";
import { submitQuoteInquiry } from "@/lib/catalog";
import type { Language } from "@/lib/i18n";

const visitWaMessages: Record<Language, string> = {
  ar: "مرحباً، أود تنسيق موعد لزيارة مزارع ومحطات تعبئة AgriPort في مصر.",
  en: "Hello, I would like to schedule an on-site visit to AgriPort packing stations and farms in Egypt.",
  fr: "Bonjour, je souhaite planifier une visite sur place des stations et vergers AgriPort en Égypte.",
  it: "Buongiorno, vorrei organizzare una visita ai centri di confezionamento e campi AgriPort in Egitto.",
  es: "Hola, quisiera coordinar una visita a las estaciones de empaque y fincas de AgriPort en Egipto.",
};

function VisitPageInner() {
  const { t, dir, language } = useLanguage();
  const v = t.visitPage;
  const isRTL = dir === "rtl";
  const { settings: siteSettings } = useSiteSettings();

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    try {
      setMinDate(new Date().toISOString().split("T")[0]);
    } catch {
      // fallback
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    country: "",
    email: "",
    phone: "",
    visitDate: "",
    visitorsCount: "one",
    targetCrops: "",
    airportTransfer: false,
    notes: "",
  });

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([
    "citrus",
    "coldChain",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const toggleFacility = (key: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const fList = v.form.fields.facilitiesList as Record<string, string>;
    const facilityNames = selectedFacilities
      .map((k) => fList[k] || k)
      .join(" | ");

    const visitorsOptions = v.form.fields.visitorsCountOptions as Record<
      string,
      string
    >;
    const visitorsLabel =
      visitorsOptions[formData.visitorsCount] || formData.visitorsCount;

    const messageContent = [
      `[Facility Visit Reservation]`,
      `Lead Visitor: ${formData.fullName}`,
      `Company: ${formData.company} (${formData.country})`,
      `Preferred Visit Date: ${formData.visitDate}`,
      `Delegation Size: ${visitorsLabel}`,
      `Facilities to Inspect: ${facilityNames || "All central facilities"}`,
      `Target Crops: ${formData.targetCrops || "General fresh produce"}`,
      `Airport Pickup Required: ${formData.airportTransfer ? "YES" : "NO"}`,
      formData.notes ? `Special Notes: ${formData.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const result = await submitQuoteInquiry({
        name: formData.fullName,
        company: formData.company,
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
        product:
          language === "ar"
            ? "حجز زيارة ميدانية للمرافق ومحطات التعبئة"
            : "Field & Packing Station Visit Booking",
        quantity: visitorsLabel,
        incoterms: "Facility Visit",
        destinationPort: `Date: ${formData.visitDate}`,
        message: messageContent,
      });

      if (result && (result.success || result.inquiry)) {
        setIsSuccess(true);
      } else {
        setSubmitError(
          language === "ar"
            ? "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى أو مراسلتنا عبر واتساب."
            : "Failed to submit request. Please try again or reach out directly on WhatsApp."
        );
      }
    } catch (err) {
      console.error("Error submitting visit inquiry:", err);
      setSubmitError(
        language === "ar"
          ? "حدث خطأ في الاتصال، يرجى المحاولة لاحقاً."
          : "Connection error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      visitDate: "",
      visitorsCount: "one",
      targetCrops: "",
      airportTransfer: false,
      notes: "",
    });
    setSelectedFacilities(["citrus", "coldChain"]);
    setIsSuccess(false);
    setSubmitError("");
  };

  const whatsappNumber = (siteSettings.phone || "201007202636").replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    visitWaMessages[language] || visitWaMessages.en
  )}`;

  const facilitiesListEntries = Object.entries(v.form.fields.facilitiesList) as [
    string,
    string,
  ][];

  return (
    <PageShell title={v.title} description={v.subtitle}>
      <div className="space-y-12 sm:space-y-16">
        {/* 1. Header Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-2xs">
            <span>🏛️</span>
            <span>{v.badge}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs">
            <span>⭐</span>
            <span>GLOBALG.A.P. | ISO 22000 | BRCGS | FDA</span>
          </span>
        </div>

        {/* 2. Highlights Cards (What the visit includes) */}
        <div>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {v.highlightsTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              {v.highlightsSubtitle}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {v.highlights.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-xs transition-all hover:border-emerald-500/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600 transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Main Form & Hospitality Sidebar */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* VIP Hospitality & Coordination Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* VIP Services Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-[#F7F9FC] p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  VIP Experience
                </span>
                <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {v.vipServicesTitle}
                </h3>
              </div>

              <div className="space-y-4">
                {v.vipServices.map((svc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-2xl bg-white p-4 border border-slate-100 shadow-2xs"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                      {svc.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {svc.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact & Location Box */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 space-y-5 shadow-xs">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {v.contactBox.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {v.contactBox.desc}
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>💬</span>
                <span>{v.contactBox.whatsappBtn}</span>
              </a>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs font-medium text-slate-600">
                <div className="flex items-start gap-2.5">
                  <span className="text-base">📍</span>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {v.contactBox.locationLabel}
                    </span>
                    <span>{v.contactBox.locationValue}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base">🕒</span>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {v.contactBox.hoursLabel}
                    </span>
                    <span>{v.contactBox.hoursValue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Link to Facilities Showcase */}
            <div className="text-center">
              <Link
                href="/facilities"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                <span>←</span>
                <span>
                  {language === "ar"
                    ? "العودة لاستعراض صور وفيديوهات المرافق"
                    : "Back to Facilities & Packing Stations Showcase"}
                </span>
              </Link>
            </div>
          </div>

          {/* Interactive Delegation Booking Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-5 sm:p-8 shadow-sm">
              {/* Form Title & Description */}
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 mb-2">
                  {v.form.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {v.form.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  {v.form.desc}
                </p>
              </div>

              {/* SUCCESS VIEW */}
              {isSuccess ? (
                <div className="py-6 text-center space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900">
                      {v.form.success.title}
                    </h4>
                    <p className="max-w-md mx-auto text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      {v.form.success.desc}
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/70 text-start text-xs space-y-2 max-w-md mx-auto">
                    <div className="font-bold text-slate-700 pb-1 border-b border-slate-200">
                      {v.form.success.summaryLead}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {v.form.success.dateLabel}
                      </span>
                      <span className="font-bold text-slate-800">
                        {formData.visitDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {v.form.success.visitorsLabel}
                      </span>
                      <span className="font-bold text-slate-800">
                        {(
                          v.form.fields.visitorsCountOptions as Record<
                            string,
                            string
                          >
                        )[formData.visitorsCount] || formData.visitorsCount}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1">
                        {v.form.success.facilitiesLabel}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedFacilities.map((key) => (
                          <span
                            key={key}
                            className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
                          >
                            {(
                              v.form.fields.facilitiesList as Record<
                                string,
                                string
                              >
                            )[key] || key}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Support Option */}
                  <div className="pt-2">
                    <p className="text-xs text-slate-500 mb-2 font-medium">
                      {v.form.success.whatsappSupport}
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs"
                    >
                      <span>💬</span>
                      <span>{v.contactBox.whatsappBtn}</span>
                    </a>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
                    >
                      {v.form.success.anotherBtn}
                    </button>
                  </div>
                </div>
              ) : (
                /* INTERACTIVE FORM */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="rounded-xl bg-rose-50 p-3.5 text-xs font-bold text-rose-700 border border-rose-200">
                      {submitError}
                    </div>
                  )}

                  {/* Full Name & Company */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        {v.form.fields.fullName} *
                      </label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={v.form.fields.fullNamePlaceholder}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        {v.form.fields.company} *
                      </label>
                      <input
                        required
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={v.form.fields.companyPlaceholder}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Country & Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        {v.form.fields.country} *
                      </label>
                      <input
                        required
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder={v.form.fields.countryPlaceholder}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        {v.form.fields.email} *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={v.form.fields.emailPlaceholder}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Proposed Visit Date */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        {v.form.fields.phone} *
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={v.form.fields.phonePlaceholder}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                        {v.form.fields.visitDate} *
                      </label>
                      <input
                        required
                        type="date"
                        name="visitDate"
                        value={formData.visitDate}
                        onChange={handleChange}
                        min={minDate || undefined}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                      />
                      <span className="block mt-1 text-[11px] text-slate-400 font-medium">
                        {v.form.fields.visitDateHelp}
                      </span>
                    </div>
                  </div>

                  {/* Delegation Size Select */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {v.form.fields.visitorsCount}
                    </label>
                    <select
                      name="visitorsCount"
                      value={formData.visitorsCount}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    >
                      <option value="one">
                        {v.form.fields.visitorsCountOptions.one}
                      </option>
                      <option value="two">
                        {v.form.fields.visitorsCountOptions.two}
                      </option>
                      <option value="threeToFive">
                        {v.form.fields.visitorsCountOptions.threeToFive}
                      </option>
                      <option value="sixPlus">
                        {v.form.fields.visitorsCountOptions.sixPlus}
                      </option>
                    </select>
                  </div>

                  {/* Facilities Selection Multi-Select Pills */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-zinc-700">
                        {v.form.fields.facilitiesTitle}
                      </label>
                      <span className="text-[11px] text-emerald-600 font-bold">
                        ({selectedFacilities.length} {language === "ar" ? "محدد" : "Selected"})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mb-2.5">
                      {v.form.fields.facilitiesHelp}
                    </p>

                    <div className="space-y-2">
                      {facilitiesListEntries.map(([fKey, fTitle]) => {
                        const isSelected = selectedFacilities.includes(fKey);
                        return (
                          <button
                            key={fKey}
                            type="button"
                            onClick={() => toggleFacility(fKey)}
                            className={`w-full text-start flex items-center justify-between p-3 rounded-xl border transition-all text-xs font-semibold ${
                              isSelected
                                ? "border-emerald-600 bg-emerald-50/60 text-emerald-950 shadow-2xs"
                                : "border-zinc-200 bg-zinc-50/40 text-slate-600 hover:border-zinc-300 hover:bg-zinc-50"
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs transition-colors ${
                                  isSelected
                                    ? "bg-emerald-600 border-emerald-600 text-white"
                                    : "border-zinc-300 bg-white"
                                }`}
                              >
                                {isSelected ? "✓" : ""}
                              </span>
                              <span>{fTitle}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Crops */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {v.form.fields.targetCrops}
                    </label>
                    <input
                      type="text"
                      name="targetCrops"
                      value={formData.targetCrops}
                      onChange={handleChange}
                      placeholder={v.form.fields.targetCropsPlaceholder}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Airport Transfer Coordination Checkbox */}
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/40 p-3.5">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="airportTransfer"
                        checked={formData.airportTransfer}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs font-bold text-emerald-900 leading-tight">
                        {v.form.fields.airportTransferLabel}
                      </span>
                    </label>
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      {v.form.fields.notes}
                    </label>
                    <textarea
                      rows={3}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={v.form.fields.notesPlaceholder}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-emerald-600 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-all hover:bg-emerald-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {isSubmitting
                        ? v.form.fields.submitting
                        : v.form.fields.submitBtn}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default function VisitPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-28 text-center text-sm font-medium text-slate-400">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      }
    >
      <VisitPageInner />
    </Suspense>
  );
}
