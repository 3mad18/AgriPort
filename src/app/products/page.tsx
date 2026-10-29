/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { useLiveProducts } from "@/lib/use-live-products";
import { useLanguage } from "@/context/language-context";
import { useVisitorAuth } from "@/context/visitor-auth-context";
import {
  getProductStatusTranslation,
  getProductCategoryTranslation,
  getProductSeasonTranslation,
  translateAgriText,
} from "@/lib/i18n";

export default function ProductsPage() {
  const { t, dir, language } = useLanguage();
  const { isAuthenticated } = useVisitorAuth();
  const p = t.productsPage;
  const { products: liveCatalog } = useLiveProducts();

  // In Arabic, the live database catalog edited from the Ops dashboard is 100% authoritative!
  // In other languages, we overlay translations where available, but never overwrite customized status/image/icon.
  const products = liveCatalog.map((cat) => {
    if (language === "ar") {
      return cat;
    }

    // 1. Try to find a curated translation in productsList by id or crop keyword
    const loc = p.productsList?.find((item) => {
      if (item.id === cat.id) return true;
      const lowerCatName = (cat.name || "").toLowerCase();
      const lowerItemName = (item.name || "").toLowerCase();
      if (lowerCatName && lowerCatName === lowerItemName) return true;

      if (
        (lowerCatName.includes("خرشوف") || cat.id.toLowerCase().includes("artichoke")) &&
        (item.id === "artichoke" || lowerItemName.includes("artichoke") || lowerItemName.includes("خرشوف"))
      ) {
        return true;
      }
      if (lowerCatName.includes("موالح") && item.id === "citrus") return true;
      if (lowerCatName.includes("بصل") && item.id === "onions") return true;
      if (lowerCatName.includes("فراولة") && item.id === "strawberries") return true;
      if (lowerCatName.includes("رمان") && item.id === "pomegranates") return true;
      if (lowerCatName.includes("بطاطس") && item.id === "potatoes") return true;
      if (lowerCatName.includes("عنب") && item.id === "grapes") return true;
      return false;
    });

    const translatedName =
      loc?.name && !/[\u0600-\u06FF]/.test(loc.name)
        ? loc.name
        : translateAgriText(cat.name, language);

    const translatedVariety =
      loc?.variety && loc.variety !== cat.variety && !/[\u0600-\u06FF]/.test(loc.variety)
        ? loc.variety
        : translateAgriText(cat.variety, language);

    const translatedPack =
      loc?.pack && loc.pack !== cat.pack && !/[\u0600-\u06FF]/.test(loc.pack)
        ? loc.pack
        : translateAgriText(cat.pack, language);

    const translatedSpecs =
      loc?.specs && loc.specs !== cat.specs && !/[\u0600-\u06FF]/.test(loc.specs)
        ? loc.specs
        : translateAgriText(cat.specs, language);

    return {
      ...cat,
      name: translatedName,
      variety: translatedVariety,
      pack: translatedPack,
      specs: translatedSpecs,
      category:
        loc?.category || getProductCategoryTranslation(cat.category, language),
      season:
        loc?.season || getProductSeasonTranslation(cat.season, language),
    };
  });

  return (
    <PageShell title={p.title} description={p.description}>
      <div className="space-y-8">
        {/* Intro Banner */}
        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-[#F7F9FC] p-5 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white text-lg font-bold">
              🌿
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
                {/* Product Image */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={
                      item.imageUrl ||
                      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Status Badge (Top Start) */}
                  <div className="absolute top-4 start-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-xs backdrop-blur-md ${
                        item.status === "متاح للتصدير"
                          ? "bg-emerald-500/90 text-white"
                          : item.status === "موسم قادم"
                          ? "bg-amber-500/90 text-white"
                          : "bg-rose-500/90 text-white"
                      }`}
                    >
                      {getProductStatusTranslation(
                        item.status || "متاح للتصدير",
                        language
                      )}
                    </span>
                  </div>

                  {/* Season Badge (Top End) */}
                  <div className="absolute top-4 end-4">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-slate-900 shadow-xs">
                      {getProductSeasonTranslation(item.season, language)}
                    </span>
                  </div>

                  {/* Category / Icon */}
                  <div className="absolute bottom-4 start-4">
                    <span className="rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
                      {item.icon}{" "}
                      {getProductCategoryTranslation(item.category, language)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
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
                        {translateAgriText(item.pack, language)}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">
                        {p.specsLabel}:
                      </span>{" "}
                      <span className="text-slate-500 font-medium">
                        {translateAgriText(item.specs, language)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href={
                    isAuthenticated
                      ? `/contact?id=${encodeURIComponent(item.id)}&crop=${encodeURIComponent(item.name)}`
                      : `/login?tab=register&redirect=${encodeURIComponent(
                          `/contact?id=${encodeURIComponent(item.id)}&crop=${encodeURIComponent(item.name)}`
                        )}&cropName=${encodeURIComponent(item.name)}`
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-emerald-600 py-3 text-xs font-semibold text-white transition-all shadow-xs"
                >
                  <span>{p.requestQuoteBtn}</span>
                  <span className={dir === "rtl" ? "rotate-180" : ""}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
