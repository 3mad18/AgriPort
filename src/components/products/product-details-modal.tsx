/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
    return list;
  }, [product]);

  // Reset active image on product change
  useEffect(() => {
    setActiveImageIndex(0);
    setDownloadSuccessMessage(null);
  }, [product?.id]);

  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const handlePrevImage = () => {
    if (galleryImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (galleryImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleNavigateThumbnails = (direction: "left" | "right") => {
    if (!thumbnailsRef.current || galleryImages.length <= 1) return;
    const scrollAmount = 140;

    if (direction === "left") {
      thumbnailsRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setActiveImageIndex((prev) => (prev <= 0 ? galleryImages.length - 1 : prev - 1));
    } else {
      thumbnailsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setActiveImageIndex((prev) => (prev >= galleryImages.length - 1 ? 0 : prev + 1));
    }
  };

  // Keep active thumbnail centered in view
  useEffect(() => {
    if (!thumbnailsRef.current) return;
    const activeBtn = thumbnailsRef.current.children[activeImageIndex] as HTMLElement;
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeImageIndex]);

  // Handle ESC and Arrow keys for navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        e.preventDefault();
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isLightboxOpen, isRtl, galleryImages.length]);

  // Prevent body & html scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const origBodyOverflow = document.body.style.overflow;
      const origHtmlOverflow = document.documentElement.style.overflow;
      const origBodyOverscroll = document.body.style.overscrollBehavior;
      const origHtmlOverscroll = document.documentElement.style.overscrollBehavior;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      document.documentElement.style.overscrollBehavior = "none";

      return () => {
        document.body.style.overflow = origBodyOverflow;
        document.documentElement.style.overflow = origHtmlOverflow;
        document.body.style.overscrollBehavior = origBodyOverscroll;
        document.documentElement.style.overscrollBehavior = origHtmlOverscroll;
      };
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-contain bg-slate-950/75 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (isLightboxOpen) {
          e.stopPropagation();
          return;
        }
        onClose();
      }}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl transition-all my-auto overscroll-contain"
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
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 space-y-6 text-start">
          {/* Main Grid: Gallery on left, Details on right (desktop) */}
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Gallery Column (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-3">
              {/* Active Image Box */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs flex items-center justify-center group/mainimg">
                {galleryImages.length > 0 ? (
                  <>
                    <img
                      src={galleryImages[activeImageIndex] || p.imageUrl}
                      alt={p.name}
                      onClick={() => setIsLightboxOpen(true)}
                      className="h-full w-full object-cover transition-all duration-300 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                    {/* Fullscreen Zoom Button Only */}
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      className="absolute top-3 start-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md transition-all shadow-xs cursor-pointer"
                      title="تكبير الصورة بالحجم الكامل"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-50/70 via-slate-50 to-slate-100 text-slate-400 p-6 text-center select-none">
                    <span className="text-6xl mb-3">{p.icon || "🌿"}</span>
                    <span className="text-base font-bold text-slate-700">{p.name}</span>
                    <span className="text-xs text-slate-400 mt-1">لا تتوفر صور مرفقة لهذا المنتج حالياً</span>
                  </div>
                )}

                {/* Season Badge on Image */}
                <div className="absolute top-3 end-3 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-slate-900 shadow-xs">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    <span>{p.season}</span>
                  </span>
                </div>

                {/* Origin Badge */}
                <div className="absolute bottom-3 start-3 pointer-events-none">
                  <span className="rounded-lg bg-slate-900/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{p.origin}</span>
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails Row with Equal Inline Left and Right Arrows */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 pt-1 w-full" dir="ltr">
                  {/* Left Navigation Arrow */}
                  <button
                    type="button"
                    onClick={() => handleNavigateThumbnails("left")}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all active:scale-90 cursor-pointer"
                    title={isRtl ? "الصورة السابقة" : "Previous image"}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* Scrollable Thumbnails Strip */}
                  <div
                    ref={thumbnailsRef}
                    onWheel={(e) => {
                      if (e.deltaY !== 0 && thumbnailsRef.current) {
                        e.preventDefault();
                        thumbnailsRef.current.scrollLeft += e.deltaY;
                      }
                    }}
                    className="flex-1 flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth"
                  >
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-emerald-500 ring-2 ring-emerald-500/20 scale-105 shadow-xs"
                            : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
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

                  {/* Right Navigation Arrow */}
                  <button
                    type="button"
                    onClick={() => handleNavigateThumbnails("right")}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all active:scale-90 cursor-pointer"
                    title={isRtl ? "الصورة التالية" : "Next image"}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
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

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && galleryImages.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md animate-fade-in select-none overscroll-none"
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(false);
          }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(false);
            }}
            className="fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all shadow-md cursor-pointer"
            title="إغلاق (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation Arrow Button */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 backdrop-blur-md transition-all shadow-2xl active:scale-90 hover:scale-110 cursor-pointer"
              title="الصورة السابقة"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[activeImageIndex]}
              alt={p.name}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <div className="mt-4 flex items-center gap-3 text-white text-xs font-bold bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
              <span>{p.name}</span>
              <span>•</span>
              <span>{activeImageIndex + 1} / {galleryImages.length}</span>
            </div>
          </div>

          {/* Right Navigation Arrow Button */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 backdrop-blur-md transition-all shadow-2xl active:scale-90 hover:scale-110 cursor-pointer"
              title="الصورة التالية"
              aria-label="Next Image"
            >
              <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
