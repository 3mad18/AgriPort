/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { spaceGrotesk } from "@/lib/fonts";

type BrandLogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showSubtitle?: boolean;
  layout?: "horizontal" | "stacked";
};

export function BrandLogo({
  className = "",
  variant = "dark",
  showSubtitle = true,
  layout = "horizontal",
}: BrandLogoProps) {
  const isDark = variant === "dark";
  const isStacked = layout === "stacked";

  return (
    <Link
      href="/ops"
      className={`group inline-flex ${
        isStacked ? "flex-col items-center text-center gap-2" : "flex-row items-center gap-2.5"
      } transition-opacity hover:opacity-95 ${className}`}
      aria-label="AgriPort Ops - Operations Suite"
    >
      {/* 3D Ribbon Logo Image */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={isDark ? "/brand/agri-flow-symbol-dark.png" : "/brand/agri-flow-symbol.png"}
          alt="AgriPort Ops"
          className={`${
            isStacked ? "h-16 sm:h-20 w-auto" : "h-8 sm:h-9 w-auto"
          } object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md`}
        />
      </div>

      {/* Brand Name as real Font Text: Agri [Green] + Port [Bold White/Black] + OPS Badge */}
      <div className={`flex flex-col ${isStacked ? "items-center" : "text-start"} leading-none`} dir="ltr">
        <div className="flex items-center gap-1.5">
          <span className={`text-xl tracking-tight flex items-center ${spaceGrotesk.className}`}>
            <span className={`font-medium ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>Agri</span>
            <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Port</span>
          </span>
          <span className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            OPS
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 mt-1">
            Operations & Trade
          </span>
        )}
      </div>
    </Link>
  );
}
