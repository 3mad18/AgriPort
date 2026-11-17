/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ExportProduct } from "@/lib/catalog";
import { useLanguage } from "@/context/language-context";
import { useVisitorAuth } from "@/context/visitor-auth-context";
import { Language } from "@/lib/i18n";
import { downloadProductPdf } from "@/lib/generate-product-pdf";
import { getLocalizedProduct } from "@/lib/product-translations";
import {
  X,
  Package,
  Sliders,
  Calendar,
  ThermometerSnowflake,
  Clock,
  Hash,
  FileDown,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Sprout,
} from "lucide-react";

type ProductDetailsModalProps = {
  product: ExportProduct | null;
  isOpen: boolean;
  onClose: () => void;
};

const modalTranslations: Record<
  Language,
  {
    certifications: string;
    specsTitle: string;
    packaging: string;
    caliber: string;
    season: string;
    coldChain: string;
    shelfLife: string;
    hsCode: string;
    downloadPdf: string;
    preparingPdf: string;
    downloadSuccess: string;
    close: string;
    requestQuote: string;
  }
> = {
  ar: {
    certifications: "شهادات الجودة والمحطات المعتمدة",
    specsTitle: "المواصفات الفنية والشحن",
    packaging: "التعبئة والتغليف",
    caliber: "أحجام الكاليبر والمواصفات",
    season: "الموسم التصديري",
    coldChain: "درجات حرارة الحفظ والتبريد",
    shelfLife: "فترة الصلاحية التقديرية",
    hsCode: "الكود الجمركي (HS Code)",
    downloadPdf: "تحميل ملف المواصفات الفنية PDF",
    preparingPdf: "جاري تجهيز الملف...",
    downloadSuccess: "تم فتح / تحميل ملف المواصفات الفنية PDF بنجاح.",
    close: "إغلاق",
    requestQuote: "طلب تسعير أو حجز شحنة",
  },
  en: {
    certifications: "Quality & Packhouse Certifications",
    specsTitle: "Technical & Shipping Specifications",
    packaging: "Packaging",
    caliber: "Caliber & Sizing",
    season: "Export Season",
    coldChain: "Cold Chain Temp",
    shelfLife: "Shelf Life",
    hsCode: "HS Customs Code",
    downloadPdf: "Download Specs Datasheet (PDF)",
    preparingPdf: "Preparing Datasheet...",
    downloadSuccess: "Technical PDF datasheet generated / opened successfully.",
    close: "Close",
    requestQuote: "Request Quote or Shipment",
  },
  fr: {
    certifications: "Certifications Qualité & Stations Agréées",
    specsTitle: "Spécifications Techniques et Expédition",
    packaging: "Conditionnement",
    caliber: "Calibres et Spécifications",
    season: "Calendrier d'Exportation",
    coldChain: "Température de Conservation",
    shelfLife: "Durée de Conservation",
    hsCode: "Code Douanier (Code SH)",
    downloadPdf: "Télécharger la Fiche Technique (PDF)",
    preparingPdf: "Génération de la fiche...",
    downloadSuccess: "Fiche technique PDF générée et ouverte avec succès.",
    close: "Fermer",
    requestQuote: "Demander un Devis ou Expédition",
  },
  it: {
    certifications: "Certificazioni di Qualità e Centri Confezionamento",
    specsTitle: "Specifiche Tecniche e di Spedizione",
    packaging: "Imballaggio e Confezionamento",
    caliber: "Calibro e Specifiche",
    season: "Stagione di Esportazione",
    coldChain: "Temperatura Catena del Freddo",
    shelfLife: "Durata di Conservazione",
    hsCode: "Codice Doganale (Codice SA)",
    downloadPdf: "Scarica Scheda Tecnica (PDF)",
    preparingPdf: "Preparazione in corso...",
    downloadSuccess: "Scheda tecnica PDF generata con successo.",
    close: "Chiudi",
    requestQuote: "Richiedi Preventivo o Spedizione",
  },
  es: {
    certifications: "Certificaciones de Calidad y Empaque",
    specsTitle: "Especificaciones Técnicas y de Envío",
    packaging: "Envasado y Empaque",
    caliber: "Calibres y Especificaciones",
    season: "Temporada de Exportación",
    coldChain: "Temperatura Cadena de Frío",
    shelfLife: "Vida Útil Comercial",
    hsCode: "Código Arancelario (Código SA)",
    downloadPdf: "Descargar Ficha Técnica (PDF)",
    preparingPdf: "Generando ficha técnica...",
    downloadSuccess: "Ficha técnica PDF generada correctamente.",
    close: "Cerrar",
    requestQuote: "Solicitar Cotización o Pedido",
  },
};

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const { language, dir } = useLanguage();
  const { isAuthenticated } = useVisitorAuth();
  const isRtl = dir === "rtl";

  // Gallery active image state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [fitMode, setFitMode] = useState<"contain" | "cover">("contain");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Collect all gallery images
  const galleryImages = useMemo(() => {
    if (!product) return [];
    const list: string[] = [];
    if (product.imageUrl) list.push(product.imageUrl);
    if (Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    // Fallback if empty
    if (list.length === 0) {
      list.push("/images/products/artichoke.jpg");
    }
    return list;
  }, [product]);

  // Reset active image on product change
  useEffect(() => {
    setActiveImageIndex(0);
    setDownloadSuccessMessage(null);
  }, [product?.id]);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const validLang = (["ar", "en", "fr", "it", "es"].includes(language) ? language : "ar") as Language;
  const p = getLocalizedProduct(product, validLang);
  const trans = modalTranslations[validLang] || modalTranslations.en;

  const handleDownloadPdf = () => {
    setIsDownloadingPdf(true);
    setDownloadSuccessMessage(null);
    try {
      const res = downloadProductPdf(p, validLang);
      if (res?.success) {
        setDownloadSuccessMessage(trans.downloadSuccess);
        setTimeout(() => setDownloadSuccessMessage(null), 4000);
      }
    } catch (e) {
      console.error("Failed to download PDF:", e);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  const contactUrl = isAuthenticated
    ? `/contact?id=${encodeURIComponent(p.id)}&crop=${encodeURIComponent(p.name)}`
    : `/login?tab=register&redirect=${encodeURIComponent(
        `/contact?id=${encodeURIComponent(p.id)}&crop=${encodeURIComponent(p.name)}`
      )}&cropName=${encodeURIComponent(p.name)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl transition-all my-auto"
        onClick={(e) => e.stopPropagation()}
        dir={dir}
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 bg-white/95 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              <Sprout className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                  {p.category}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    p.status.includes("متاح") || p.status.toLowerCase().includes("avail")
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : p.status.includes("قادم") || p.status.toLowerCase().includes("upcom")
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate mt-0.5">
                {p.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-start">
          {/* Main Grid: Gallery on left, Details on right (desktop) */}
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Gallery Column (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-3">
              {/* Active Image Box */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs">
                <img
                  src={galleryImages[activeImageIndex] || p.imageUrl}
                  alt={p.name}
                  className="h-full w-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Season Badge on Image */}
                <div className="absolute top-3 end-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-slate-900 shadow-xs">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    <span>{p.season}</span>
                  </span>
                </div>

                {/* Origin Badge */}
                <div className="absolute bottom-3 start-3">
                  <span className="rounded-lg bg-slate-900/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{p.origin}</span>
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-emerald-500 ring-2 ring-emerald-500/20 scale-105"
                          : "border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${p.name} thumb ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Certifications Strip */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {trans.certifications}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-slate-700">
                  <span className="rounded-lg bg-white border border-slate-200/80 px-2 py-1 shadow-2xs">
                    GLOBALG.A.P.
                  </span>
                  <span className="rounded-lg bg-white border border-slate-200/80 px-2 py-1 shadow-2xs">
                    ISO 22000
                  </span>
                  <span className="rounded-lg bg-white border border-slate-200/80 px-2 py-1 shadow-2xs">
                    BRCGS
                  </span>
                  <span className="rounded-lg bg-white border border-slate-200/80 px-2 py-1 shadow-2xs">
                    FDA Registered
                  </span>
                </div>
              </div>
            </div>

            {/* Details Column (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Title & Variety */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-emerald-600">
                  {p.variety}
                </p>
              </div>

              {/* Description Paragraph */}
              <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {p.description}
              </div>

              {/* Technical Specifications Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>
                    {trans.specsTitle}
                  </span>
                </h4>

                <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                  {/* Packaging */}
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1">
                      <Package className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{trans.packaging}</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {p.pack}
                    </span>
                  </div>

                  {/* Specs & Caliber */}
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1">
                      <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{trans.caliber}</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {p.specs}
                    </span>
                  </div>

                  {/* Season */}
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{trans.season}</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {p.season}
                    </span>
                  </div>

                  {/* Cold Chain Temp */}
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1">
                      <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{trans.coldChain}</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {p.storageTemp}
                    </span>
                  </div>

                  {/* Shelf Life */}
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{trans.shelfLife}</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {p.shelfLife}
                    </span>
                  </div>

                  {/* HS Code */}
                  <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-2xs">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1">
                      <Hash className="w-3.5 h-3.5 text-slate-600" />
                      <span>{trans.hsCode}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-800">
                      {p.hsCode || "0709.99.00"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feedback Alert if PDF was downloaded */}
              {downloadSuccessMessage && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{downloadSuccessMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Footer Bar */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 p-4 sm:p-5 bg-slate-50/70 shrink-0">
          {/* PDF Download Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 px-5 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition-all active:scale-95 disabled:opacity-50"
          >
            <FileDown className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isDownloadingPdf
                ? trans.preparingPdf
                : trans.downloadPdf}
            </span>
          </button>

          {/* Direct Request Quote & Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="hidden sm:inline-flex rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
            >
              {trans.close}
            </button>

            <Link
              href={contactUrl}
              onClick={onClose}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all active:scale-95 hover:shadow-emerald-600/20 group/btn"
            >
              <span>{trans.requestQuote}</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform ${dir === "rtl" ? "rotate-180" : ""} group-hover/btn:translate-x-0.5`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
