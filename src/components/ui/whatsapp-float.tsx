"use client";

import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";
import type { Language } from "@/lib/i18n";

const whatsappMessages: Record<Language, string> = {
  ar: "مرحباً AgriPort، أود الاستفسار عن تصدير الحاصلات الزراعية والتسعير الحالي",
  en: "Hello AgriPort, I would like to inquire about export products, availability, and pricing",
  fr: "Bonjour AgriPort, je souhaite me renseigner sur les produits d'exportation et les tarifs actuels",
  it: "Buongiorno AgriPort, vorrei richiedere informazioni sui prodotti da esportazione e sui prezzi",
  es: "Hola AgriPort, quisiera consultar sobre los productos de exportación y precios actuales",
};

const whatsappTooltips: Record<Language, string> = {
  ar: "تواصل فوري عبر واتساب",
  en: "Direct WhatsApp",
  fr: "WhatsApp Direct",
  it: "WhatsApp Diretto",
  es: "WhatsApp Directo",
};

export function WhatsAppFloat() {
  const { dir, language } = useLanguage();
  const { settings } = useSiteSettings();
  const isRTL = dir === "rtl";

  const rawPhone = settings.phone || "+20 100 720 2636";
  const cleanPhone = rawPhone.replace(/\D/g, "");

  const message = whatsappMessages[language] || whatsappMessages.en;
  const tooltipText = whatsappTooltips[language] || whatsappTooltips.en;

  const href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      className={`fixed bottom-5 sm:bottom-6 ${
        isRTL ? "left-4 sm:left-6" : "right-4 sm:right-6"
      } z-40 flex items-center gap-2 group print:hidden`}
      aria-label="WhatsApp Contact"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
        {tooltipText}
      </span>

      {/* Floating Action Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact"
        className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/20 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Radar Pulse */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        {/* WhatsApp SVG Icon */}
        <svg
          className="h-6 w-6 sm:h-7 sm:w-7 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </aside>
  );
}
