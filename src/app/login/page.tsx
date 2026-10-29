import { Suspense } from "react";
import type { Metadata } from "next";
import { VisitorAuthCard } from "@/components/auth/visitor-auth-card";

export const metadata: Metadata = {
  title: "تسجيل الدخول وبوابة الزوار | AgriPort",
  description: "تسجيل الدخول وبوابة حسابات الزوار والعملاء لمنصة AgriPort لتصدير الحاصلات الزراعية.",
};

export default function VisitorLoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      {/* Background organic blur accents */}
      <div
        className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-40 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-10 left-1/3 w-64 h-64 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg">
        <Suspense
          fallback={
            <div className="w-full max-w-lg mx-auto bg-white/80 rounded-3xl p-12 border border-slate-200 text-center shadow-xl">
              <div className="h-8 w-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm font-semibold text-slate-500">جاري تحميل بوابة التسجيل...</p>
            </div>
          }
        >
          <VisitorAuthCard />
        </Suspense>

        {/* Trust Badges Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
         
          
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500">🌱</span>
            <span>AgriPort Global Trade</span>
          </div>
        </div>
      </div>
    </div>
  );
}
