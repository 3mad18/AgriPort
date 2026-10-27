"use client";

import { useEffect, useState } from "react";

export type ToastItem = {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
};

export const TOAST_EVENT = "agriport_ops_toast";

export function triggerOpsToast(
  message: string,
  type: "success" | "error" | "info" = "success"
) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, { detail: { message, type } })
    );
  }
}

export function OpsToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<{
        message: string;
        type?: "success" | "error" | "info";
      }>;
      if (!customEvent.detail?.message) return;

      const newToast: ToastItem = {
        id: Math.random().toString(36).substring(2, 9),
        message: customEvent.detail.message,
        type: customEvent.detail.type || "success",
      };

      // Keep at most 2 toasts simultaneously
      setToasts((prev) => [...prev.slice(-1), newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3500);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-7 inset-x-0 z-[9999] pointer-events-none flex flex-col items-center gap-2 px-4"
      dir="rtl"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 rounded-full py-2.5 px-5 shadow-2xl backdrop-blur-md border text-xs font-semibold animate-in fade-in slide-in-from-bottom-5 duration-300 transition-all ${
            toast.type === "error"
              ? "bg-rose-950/95 text-rose-100 border-rose-500/30 shadow-rose-950/30"
              : toast.type === "info"
              ? "bg-slate-900/95 text-slate-100 border-slate-700/60 shadow-slate-950/30"
              : "bg-slate-950/95 text-white border-emerald-500/30 shadow-emerald-950/20"
          }`}
        >
          {/* Status Dot / Icon */}
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
              toast.type === "error"
                ? "bg-rose-500 text-white"
                : toast.type === "info"
                ? "bg-sky-500 text-white"
                : "bg-emerald-500 text-white shadow-xs shadow-emerald-500/40"
            }`}
          >
            {toast.type === "error" ? "✕" : toast.type === "info" ? "ℹ" : "✓"}
          </span>

          {/* Toast Message Text */}
          <span className="tracking-wide">{toast.message}</span>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
            className="text-white/40 hover:text-white transition-colors text-[10px] pr-1"
            title="إغلاق"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
