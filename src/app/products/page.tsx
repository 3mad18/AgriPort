/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { EXPORT_CATALOG } from "@/lib/catalog";
import { useLanguage } from "@/context/language-context";

export default function ProductsPage() {
  const { t, dir } = useLanguage();
  const p = t.productsPage;

  // Localize products if translation list exists
  const products = EXPORT_CATALOG.map((cat) => {
    const loc = p.productsList?.find((item) => item.id === cat.id);
    return loc ? { ...cat, ...loc } : cat;
  });

  return (
    <PageShell title={p.title} description={p.description}>
      <div className="space-y-8">
        {/* Intro Banner */}
        <div className="rounded-[2rem] border border-slate-100 bg-[#F7F9FC] p-6 sm:p-8">
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
              className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm transition-all hover:border-slate-200 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={
                      item.imageUrl ||
                      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Season Badge */}
                  <div className="absolute top-4 end-4">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-slate-900 shadow-xs">
                      {item.season}
                    </span>
                  </div>

                  {/* Category / Icon */}
                  <div className="absolute bottom-4 start-4">
                    <span className="rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
                      {item.icon} {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
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

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  href={`/contact?id=${encodeURIComponent(item.id)}&crop=${encodeURIComponent(item.name)}`}
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
