/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { useLiveProducts } from "@/lib/use-live-products";
import { useLanguage } from "@/context/language-context";
import { useVisitorAuth } from "@/context/visitor-auth-context";
import { ExportProduct } from "@/lib/catalog";
import { ProductDetailsModal } from "@/components/products/product-details-modal";
import { Language } from "@/lib/i18n";
import { getLocalizedProduct } from "@/lib/product-translations";
import { Sprout, Search, FileText, ArrowRight, Tag, Calendar } from "lucide-react";

const productCardTranslations: Record<
  Language,
  {
    hoverPill: string;
    viewDetailsPdf: string;
    imageTitle: string;
  }
> = {
  ar: {
    hoverPill: "عرض التفاصيل والصور",
    viewDetailsPdf: "تفاصيل المحصول وملف الـ PDF",
    imageTitle: "اضغط لعرض تفاصيل وصور المحصول",
  },
  en: {
    hoverPill: "View Details & Specs",
    viewDetailsPdf: "Details & Technical PDF",
    imageTitle: "Click to view details & gallery",
  },
  fr: {
    hoverPill: "Voir Détails et Photos",
    viewDetailsPdf: "Fiche Produit et PDF Technique",
    imageTitle: "Cliquer pour afficher les détails et la galerie",
  },
  it: {
    hoverPill: "Visualizza Dettagli e Foto",
    viewDetailsPdf: "Dettagli Prodotto e Scheda PDF",
    imageTitle: "Clicca per visualizzare dettagli e galleria",
  },
  es: {
    hoverPill: "Ver Detalles y Fotos",
    viewDetailsPdf: "Detalles del Cultivo y PDF Técnico",
    imageTitle: "Haga clic para ver detalles y galería",
  },
};

export function ProductsClientView({
  initialProducts = [],
}: {
  initialProducts?: ExportProduct[];
}) {
  const { t, dir, language } = useLanguage();
  const { isAuthenticated } = useVisitorAuth();
  const p = t.productsPage;
  const { products: liveCatalog } = useLiveProducts(initialProducts);

  const [selectedProduct, setSelectedProduct] = useState<ExportProduct | null>(null);

  const validLang = (["ar", "en", "fr", "it", "es"].includes(language) ? language : "ar") as Language;
  const products = liveCatalog.map((cat) => getLocalizedProduct(cat, validLang));
  const cardTrans = productCardTranslations[validLang] || productCardTranslations.en;

  return (
    <PageShell title={p.title} description={p.description}>
      <div className="space-y-8">
        {/* Intro Banner */}
        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-[#F7F9FC] p-5 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Sprout className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {p.statusTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-500 font-medium">
                {p.statusDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Live Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all hover:border-slate-200 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                {/* Product Image (Clickable for Modal) */}
                <div
                  onClick={() => setSelectedProduct(item)}
                  className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  title={cardTrans.imageTitle}
                >
                  {item.imageUrl ? (
                    <>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-50/70 via-slate-50 to-slate-100 text-slate-400 p-6 text-center select-none">
                      <span className="text-5xl mb-2 transition-transform duration-300 group-hover:scale-110">{item.icon || "🌿"}</span>
                      <span className="text-sm font-bold text-slate-700 line-clamp-1">{item.name}</span>
                      <span className="text-[11px] font-medium text-emerald-600/90 mt-1">AgriPort Premium Export</span>
                    </div>
                  )}

                  {/* Quick View Pill on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25 backdrop-blur-[2px]">
                    <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-900 shadow-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Search className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{cardTrans.hoverPill}</span>
                    </span>
                  </div>

                  {/* Status Badge (Top Start) */}
                  <div className="absolute top-4 start-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-xs backdrop-blur-md ${
                        item.status.includes("متاح") || item.status.toLowerCase().includes("avail")
                          ? "bg-emerald-500/90 text-white"
                          : item.status.includes("قادم") || item.status.toLowerCase().includes("upcom")
                          ? "bg-amber-500/90 text-white"
                          : "bg-rose-500/90 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Season Badge (Top End) */}
                  <div className="absolute top-4 end-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-slate-900 shadow-xs">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>{item.season}</span>
                    </span>
                  </div>

                  {/* Category / Icon */}
                  <div className="absolute bottom-4 start-4">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
                      <Tag className="w-3 h-3 text-emerald-400" />
                      <span>{item.category}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3
                    onClick={() => setSelectedProduct(item)}
                    className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-emerald-600">
                    {item.variety}
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-700">
                        {p.packagingLabel}:
                      </span>{" "}
                      <span className="text-slate-500 font-medium">
                        {item.pack}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">
                        {p.specsLabel}:
                      </span>{" "}
                      <span className="text-slate-500 font-medium">
                        {item.specs}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Details (Modal + PDF) & Request Quote */}
              <div className="p-5 sm:p-6 pt-0 space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(item)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 py-2.5 text-xs font-bold text-slate-700 transition-all shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{cardTrans.viewDetailsPdf}</span>
                </button>

                <Link
                  href={
                    isAuthenticated
                      ? `/contact?id=${encodeURIComponent(item.id)}&crop=${encodeURIComponent(item.name)}`
                      : `/login?tab=register&redirect=${encodeURIComponent(
                          `/contact?id=${encodeURIComponent(item.id)}&crop=${encodeURIComponent(item.name)}`
                        )}&cropName=${encodeURIComponent(item.name)}`
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-emerald-600 py-2.5 text-xs font-semibold text-white transition-all shadow-xs group/btn"
                >
                  <span>{p.requestQuoteBtn}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${dir === "rtl" ? "rotate-180" : ""} group-hover/btn:translate-x-0.5`} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Product Details & PDF Popup Modal */}
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </PageShell>
  );
}
