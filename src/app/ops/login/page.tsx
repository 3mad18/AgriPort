"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/ops/brand-logo";
import { getVisitorSiteUrl } from "@/lib/urls";
import {
  useOpsAuth,
  DEFAULT_OPS_CREDENTIALS,
} from "@/context/ops-auth-context";

export default function SecureLoginPage() {
  const { login, isAuthenticated, isLoading } = useOpsAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect to Ops dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/ops");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = login(email, password);
    if (result.success) {
      router.push("/ops");
    } else {
      setError(result.error || "بيانات الدخول غير صحيحة");
      setSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail(DEFAULT_OPS_CREDENTIALS.email);
    setPassword(DEFAULT_OPS_CREDENTIALS.password);
    setError(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <div className="text-sm font-semibold text-emerald-400 animate-pulse flex items-center gap-2">
          <span>🔒</span>
          <span>جاري التحقق من جلسة العمليات...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 px-4 py-12 text-slate-100 relative overflow-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -start-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -end-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Top Logo / Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <BrandLogo variant="dark" layout="stacked" className="mb-3" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
            <span>🔒</span>
            <span>بوابة منظومة العمليات (Ops Suite)</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed font-medium">
            التحكم الكامل في كتالوج المحاصيل، مركز تلقي الطلبات والإشعارات، وإعدادات التصدير
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-800/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs font-semibold text-red-300 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-start">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                بريد العمليات المعتمد
              </label>
              <input
                required
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ops@agriport.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  كلمة المرور
                </label>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 flex items-center px-3.5 text-slate-400 hover:text-slate-200 text-xs"
                >
                  {showPassword ? "إخفاء" : "إظهار"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-full bg-emerald-500 hover:bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 active:scale-95 transition-all disabled:opacity-50"
            >
              {submitting ? "جاري الدخول..." : "تسجيل الدخول إلى منظومة العمليات"}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 border-t border-slate-700/80 pt-5">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-start">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400">
                  🔑 بيانات الدخول الافتراضية
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                >
                  تعبئة تلقائية
                </button>
              </div>
              <div className="mt-2 space-y-1 text-xs text-slate-400 font-mono" dir="ltr">
                <div>
                  Email: <strong className="text-white">{DEFAULT_OPS_CREDENTIALS.email}</strong>
                </div>
                <div>
                  Pass: <strong className="text-white">{DEFAULT_OPS_CREDENTIALS.password}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Public Visitor Site */}
        <div className="text-center mt-6">
          <Link
            href={getVisitorSiteUrl()}
            className="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
          >
            <span>←</span>
            <span>العودة إلى الموقع الرئيسي للزوار</span>
          </Link>
        </div>

        <p className="text-center text-[10px] text-slate-500 font-medium mt-4">
          &copy; 2026 AgriPort Technologies & Export Operations. Restricted internal access.
        </p>
      </div>
    </div>
  );
}
