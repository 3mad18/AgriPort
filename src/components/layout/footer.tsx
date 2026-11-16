"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const CURRENT_YEAR = 2026;

export function Footer() {
  const { t, language, dir } = useLanguage();
  const { settings: siteSettings } = useSiteSettings();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const isRTL = dir === "rtl";

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      router.push(`/contact?email=${encodeURIComponent(email)}`);
    } else {
      router.push("/contact");
    }
  };

  const footer = t.footer;
  const isAr = language === "ar";

  return (
    <footer
      id="contact"
      className="bg-slate-950 text-white pt-14 sm:pt-20 pb-10 border-t border-slate-800/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Harmonious Top CTA Banner (Full-Width Card) */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-10 mb-14 sm:mb-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl text-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {isAr
                    ? "عقود توريد وتصدير الخضروات الطازجة 2026"
                    : "Fresh Vegetables Export & Sourcing Contracts 2026"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
                {footer.ctaTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                {footer.ctaDesc}
              </p>
            </div>

            <div className="lg:min-w-[360px] w-full lg:w-auto">
              <form
                onSubmit={handleContactSubmit}
                className="flex flex-col sm:flex-row gap-2.5"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footer.emailPlaceholder}
                  className="bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm flex-1 placeholder:text-slate-500 shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center whitespace-nowrap shadow-md hover:shadow-emerald-500/25 active:scale-95"
                >
                  {footer.btnContact}
                </button>
              </form>
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? "رد رسمي سريع خلال 4 ساعات" : "4h Fast Export Response"}</span>
                </span>
                <span className="text-slate-700">•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? "شحن بحري وجوي مباشر" : "Direct Ocean & Air Freight"}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 end-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* 2. Symmetrical 4-Column Navigation & Identity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-14 text-start border-b border-slate-800/80">
          {/* Col 1: Brand & Strategic Hub */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/brand/agri-flow-symbol-dark.png"
                alt="AgriPort"
                className="h-7 w-auto object-contain"
              />
              <span className="flex items-center text-lg tracking-tight" dir="ltr">
                <span className="font-medium text-emerald-400">Agri</span>
                <span className="font-bold text-white">Port</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              {footer.subtext ||
                (isAr
                  ? "بوابة مصرية متخصصة في فرز وتجهيز وتصدير أجود محاصيل الخضروات الطازجة إلى كبرى موانئ الاتحاد الأوروبي والعالم."
                  : "Certified Egyptian exporter sourcing and shipping premium fresh vegetables to major EU and world ports.")}
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {isAr && siteSettings.location
                    ? siteSettings.location
                    : isAr
                    ? "جمهورية مصر العربية — محافظة البحيرة / كفر الدوار"
                    : "Kafr El-Dawar, Beheira Governorate, Egypt"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${(siteSettings.phone || "+20 100 720 2636").replace(/\s+/g, "")}`}
                  dir="ltr"
                  className="hover:text-emerald-400 transition-colors font-mono"
                >
                  {siteSettings.phone || "+20 100 720 2636"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${siteSettings.email || "agriporteg@gmail.com"}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {siteSettings.email || "agriporteg@gmail.com"}
                </a>
              </div>
            </div>

            {/* Official Registration Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono">
              <span
                className="inline-flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400"
                title="Commercial Registration / السجل التجاري"
              >
                <span className="text-slate-500 font-sans">{isAr ? "س.ت:" : "CR:"}</span>
                <span className="text-emerald-400 font-bold">
                  {siteSettings.commercialRegister || "108420"}
                </span>
              </span>
              <span
                className="inline-flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400"
                title="Tax ID / البطاقة الضريبية"
              >
                <span className="text-slate-500 font-sans">{isAr ? "ب.ض:" : "Tax:"}</span>
                <span className="text-emerald-400 font-bold">
                  {siteSettings.taxCard || "629-418-735"}
                </span>
              </span>
            </div>
          </div>

          {/* Col 2: Crops & Infrastructure */}
          <div className="space-y-3.5">
            <h4 className="text-slate-400 uppercase tracking-widest text-xs font-bold border-b border-slate-800/80 pb-2">
              {isAr ? "المحاصيل والمرافق" : "Produce & Facilities"}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium">
              <Link
                href="/products"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>{footer.linkProducts || (isAr ? "كتالوج الخضروات الطازجة" : "Fresh Produce Catalog")}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/facilities"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>{isAr ? "محطات التعبئة وسلسلة التبريد" : "Packing Stations & Cold Chain"}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/visit"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>{isAr ? "حجز زيارة ميدانية للمرافق" : "Schedule Facility Visit"}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/facilities#artichoke-facility"
                className="text-slate-400 hover:text-emerald-400 text-xs transition-colors"
              >
                {isAr ? "محطة تجهيز الخرشوف المركزي" : "Artichoke Processing Facility"}
              </Link>
            </div>
          </div>

          {/* Col 3: Company & Credentials */}
          <div className="space-y-3.5">
            <h4 className="text-slate-400 uppercase tracking-widest text-xs font-bold border-b border-slate-800/80 pb-2">
              {isAr ? "الشركة والتوثيق" : "Company & Compliance"}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium">
              <Link
                href="/about"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>{footer.linkAbout || (isAr ? "عن شركة AgriPort" : "About AgriPort")}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/about#credentials"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>{isAr ? "السجل والاعتمادات الرسمية" : "Official Legal Credentials"}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/about#map"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>{isAr ? "الموقع الجغرافي وخريطة الموانئ" : "Strategic Location & Map"}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/about#pillars"
                className="text-slate-400 hover:text-emerald-400 text-xs transition-colors"
              >
                {isAr ? "ركائز التصدير والتنمية المستدامة" : "Export Pillars & Sustainability"}
              </Link>
            </div>
          </div>

          {/* Col 4: Quality & International Trade Terms */}
          <div className="space-y-3.5">
            <h4 className="text-slate-400 uppercase tracking-widest text-xs font-bold border-b border-slate-800/80 pb-2">
              {isAr ? "الجودة والتجارة الدولية" : "Quality & Global Trade"}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium">
              <Link
                href="/about#certifications"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center justify-between group"
              >
                <span>{footer.linkCertifications || (isAr ? "الشهادات والاعتمادات الدولية" : "Quality Certifications")}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-emerald-500 group-hover:text-emerald-300 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/terms"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center justify-between group"
              >
                <span>{footer.linkLegal || (isAr ? "الشروط والتجارة الدولية (Incoterms)" : "International Trade Terms")}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-emerald-500 group-hover:text-emerald-300 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/contact"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>{isAr ? "طلب عرض أسعار فوري" : "Request Export Quote"}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-all ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/contact?subject=WhatsApp"
                className="text-slate-400 hover:text-emerald-400 text-xs transition-colors inline-flex items-center gap-1"
              >
                <span>{isAr ? "المحادثة الفورية عبر واتساب" : "Direct WhatsApp Sourcing Desk"}</span>
                <ExternalLink className="w-3 h-3 text-emerald-500" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Clean Copyright & Global Certifications Micro-Strip */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs text-slate-500 font-medium">
          <p>
            &copy; {CURRENT_YEAR} {siteSettings.companyName || "AgriPort"} Technologies & Exports.{" "}
            {footer.rights}.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500">
            <span>GLOBALG.A.P.</span>
            <span>•</span>
            <span>ISO 22000</span>
            <span>•</span>
            <span>BRCGS</span>
            <span>•</span>
            <span>FDA Reg</span>
            <span>•</span>
            <span>Incoterms® 2020</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
