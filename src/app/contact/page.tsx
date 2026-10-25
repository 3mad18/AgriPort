"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { submitQuoteInquiry } from "@/lib/catalog";
import { useLanguage } from "@/context/language-context";

export default function ContactPage() {
  const { t, dir } = useLanguage();
  const c = t.contactPage;
  const f = c.fields;

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    incoterms: "FOB",
    destinationPort: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitQuoteInquiry(formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <PageShell title={c.title} description={c.description}>
      <div className="grid gap-8 lg:grid-cols-12">
        
        {/* Direct Contact Info Sidebar (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
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
                    href="mailto:agriporteg@gmail.com"
                    className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    agriporteg@gmail.com
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
                    href="tel:+201007202636"
                    dir="ltr"
                    className="font-bold text-slate-900 hover:text-emerald-600 transition-colors block text-start"
                  >
                    +20 100 720 2636
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
                    {c.locationValue}
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
          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {c.formTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              {c.formDesc}
            </p>

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
                  إرسال طلب آخر / Submit Another Inquiry
                </button>
              </div>
            ) : (
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
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={f.messagePlaceholder}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-xs hover:shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>{f.submitBtn}</span>
                  <span className={dir === "rtl" ? "rotate-180" : ""}>→</span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </PageShell>
  );
}
