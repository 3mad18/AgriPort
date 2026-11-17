import { cookies } from "next/headers";
import { Suspense } from "react";
import type { Metadata } from "next";
import { VisitorAuthCard, VisitorLoadingFallback } from "@/components/auth/visitor-auth-card";
import { Globe2 } from "lucide-react";
import { VISITOR_SESSION_KEY, type VisitorUser } from "@/context/visitor-auth-context";

export const metadata: Metadata = {
  title: "تسجيل الدخول وبوابة الزوار | AgriPort",
  description: "تسجيل الدخول وبوابة حسابات الزوار والعملاء لمنصة AgriPort لتصدير الحاصلات الزراعية.",
};

export default function VisitorLoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-20 px-3 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
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
        <Suspense fallback={<VisitorLoadingFallback />}>
          <VisitorAuthCardLoader />
        </Suspense>

        {/* Trust Badges Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>AgriPort Global Trade</span>
          </div>
        </div>
      </div>
    </div>
  );
}

async function VisitorAuthCardLoader() {
  const cookieStore = await cookies();
  const rawData = cookieStore.get(`${VISITOR_SESSION_KEY}_data`)?.value;
  let initialUser: VisitorUser | null = null;
  if (rawData) {
    try {
      initialUser = JSON.parse(decodeURIComponent(rawData));
    } catch {}
  }

  return <VisitorAuthCard initialUser={initialUser} />;
}
