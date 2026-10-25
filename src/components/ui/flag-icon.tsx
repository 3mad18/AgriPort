import type { FC } from "react";
import type { Language } from "@/lib/i18n";

type FlagIconProps = {
  code: Language;
  className?: string;
};

export const FlagIcon: FC<FlagIconProps> = ({ code, className = "h-4 w-5" }) => {
  switch (code) {
    case "ar":
      // Egypt Flag: Red, White (with Golden Eagle), Black
      return (
        <svg
          viewBox="0 0 36 24"
          className={`shrink-0 overflow-hidden rounded-[3px] border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${className}`}
          aria-hidden="true"
        >
          <rect width="36" height="8" fill="#CE1126" />
          <rect y="8" width="36" height="8" fill="#FFFFFF" />
          <rect y="16" width="36" height="8" fill="#000000" />
          {/* Eagle of Saladin */}
          <g transform="translate(18, 12) scale(0.7)">
            <path
              d="M-3,-3.5 L0,-4.5 L3,-3.5 L4.5,-0.5 L3,4 L0,4.8 L-3,4 L-4.5,-0.5 Z"
              fill="#C09300"
            />
            {/* Eagle Wings */}
            <path
              d="M-5.5,-1 C-4.5,-3 -2,-4 0,-4 C2,-4 4.5,-3 5.5,-1 C5.5,2 3.5,4 2,4.5 L-2,4.5 C-3.5,4 -5.5,2 -5.5,-1 Z"
              fill="#C6A23D"
            />
            {/* Center Shield */}
            <path
              d="M-1.8,-1.5 L1.8,-1.5 L1.8,1.8 L0,3 L-1.8,1.8 Z"
              fill="#FFFFFF"
              stroke="#8B6914"
              strokeWidth="0.4"
            />
          </g>
        </svg>
      );

    case "en":
      // United Kingdom (Union Jack) Flag
      return (
        <svg
          viewBox="0 0 60 36"
          className={`shrink-0 overflow-hidden rounded-[3px] border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${className}`}
          aria-hidden="true"
        >
          <clipPath id="uk-clip">
            <rect width="60" height="36" />
          </clipPath>
          <g clipPath="url(#uk-clip)">
            {/* Blue Background */}
            <rect width="60" height="36" fill="#012169" />
            {/* White Diagonals */}
            <path
              d="M0,0 L60,36 M60,0 L0,36"
              stroke="#FFFFFF"
              strokeWidth="7.2"
            />
            {/* Red Diagonals (St. Patrick's Saltire) */}
            <path
              d="M0,0 L30,18 M60,36 L30,18 M60,0 L30,18 M0,36 L30,18"
              stroke="#C8102E"
              strokeWidth="2.4"
            />
            {/* White Cross */}
            <path
              d="M30,0 V36 M0,18 H60"
              stroke="#FFFFFF"
              strokeWidth="12"
            />
            {/* Red Cross (St. George's Cross) */}
            <path
              d="M30,0 V36 M0,18 H60"
              stroke="#C8102E"
              strokeWidth="7.2"
            />
          </g>
        </svg>
      );

    case "fr":
      // France Flag: Blue, White, Red
      return (
        <svg
          viewBox="0 0 36 24"
          className={`shrink-0 overflow-hidden rounded-[3px] border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${className}`}
          aria-hidden="true"
        >
          <rect width="12" height="24" fill="#002654" />
          <rect x="12" width="12" height="24" fill="#FFFFFF" />
          <rect x="24" width="12" height="24" fill="#CE1126" />
        </svg>
      );

    case "it":
      // Italy Flag: Green, White, Red
      return (
        <svg
          viewBox="0 0 36 24"
          className={`shrink-0 overflow-hidden rounded-[3px] border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${className}`}
          aria-hidden="true"
        >
          <rect width="12" height="24" fill="#009246" />
          <rect x="12" width="12" height="24" fill="#FFFFFF" />
          <rect x="24" width="12" height="24" fill="#CE2B37" />
        </svg>
      );

    case "es":
      // Spain Flag: Red, Yellow (double height), Red with Coat of Arms
      return (
        <svg
          viewBox="0 0 36 24"
          className={`shrink-0 overflow-hidden rounded-[3px] border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${className}`}
          aria-hidden="true"
        >
          <rect width="36" height="6" fill="#AA151B" />
          <rect y="6" width="36" height="12" fill="#F1BF00" />
          <rect y="18" width="36" height="6" fill="#AA151B" />
          {/* Spanish Emblem */}
          <g transform="translate(10, 12) scale(0.65)">
            {/* Crown */}
            <path
              d="M-3,-4.5 L-2,-3 L0,-4.5 L2,-3 L3,-4.5 L2.5,-1.5 L-2.5,-1.5 Z"
              fill="#AA151B"
              stroke="#AA151B"
              strokeWidth="0.3"
            />
            {/* Shield */}
            <path
              d="M-2.5,-1.5 L2.5,-1.5 L2.5,2 C2.5,3.8 0,5.2 0,5.2 C0,5.2 -2.5,3.8 -2.5,2 Z"
              fill="#AA151B"
            />
            <path
              d="M-1.8,-0.8 L1.8,-0.8 L1.8,1.6 C1.8,2.8 0,4 0,4 C0,4 -1.8,2.8 -1.8,1.6 Z"
              fill="#F1BF00"
            />
            {/* Left & Right Columns (Pillars of Hercules) */}
            <rect x="-4.5" y="-3" width="1" height="7.5" fill="#C0C0C0" />
            <rect x="3.5" y="-3" width="1" height="7.5" fill="#C0C0C0" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};
