/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { spaceGrotesk } from "@/lib/fonts";

type BrandLogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showSubtitle?: boolean;
  layout?: "horizontal" | "stacked";
};

export function BrandLogo({
  className = "",
  variant = "light",
  showSubtitle = false,
  layout = "horizontal",
}: BrandLogoProps) {
  const { t } = useLanguage();
  const isDark = variant === "dark";
  const isStacked = layout === "stacked";

  return (
    <Link
      href="/"
      className={`group inline-flex ${
        isStacked ? "flex-col items-center text-center gap-2" : "flex-row items-center gap-3"
      } transition-opacity hover:opacity-95 ${className}`}
      aria-label="AgriPort - Global Agriculture & Export"
    >
      {/* 3D Ribbon Logo Image */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={isDark ? "/brand/agri-flow-symbol-dark.png" : "/brand/agri-flow-symbol.png"}
          alt="AgriPort"
          className={`${
            isStacked ? "h-16 sm:h-20 w-auto" : "h-8 sm:h-9 w-auto"
          } object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md`}
        />
      </div>

      {/* Brand Name as real Font Text: Agri [Green] + Port [Bold Black/White] */}
      <div className={`flex flex-col ${isStacked ? "items-center" : "text-start"} leading-none`} dir="ltr">
        <div className={`flex items-center tracking-tight text-xl sm:text-2xl ${spaceGrotesk.className}`}>
          <span className={`font-medium ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
            Agri
          </span>
          <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            Port
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`mt-1 text-[10px] font-medium tracking-wide ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {t.brandSubtitle}
          </span>
        )}
      </div>
    </Link>
  );
}
