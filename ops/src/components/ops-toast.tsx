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

      // Keep at most 1 toast in center
      setToasts([newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 2800);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none flex flex-col items-center gap-3 px-4"
      dir="rtl"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3.5 rounded-2xl py-3.5 px-6 shadow-2xl backdrop-blur-xl border text-sm font-bold animate-in fade-in zoom-in-95 duration-200 transition-all ${
            toast.type === "error"
              ? "bg-slate-900/95 text-rose-200 border-rose-500/40 shadow-rose-950/40"
              : toast.type === "info"
              ? "bg-slate-900/95 text-sky-200 border-sky-500/40 shadow-sky-950/40"
              : "bg-slate-900/95 text-white border-emerald-500/40 shadow-black/30 ring-1 ring-emerald-500/20"
          }`}
        >
          {/* Status Dot / Icon */}
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold shadow-sm ${
              toast.type === "error"
                ? "bg-rose-500 text-white"
                : toast.type === "info"
                ? "bg-sky-500 text-white"
                : "bg-emerald-500 text-white shadow-emerald-500/50"
            }`}
          >
            {toast.type === "error" ? "✕" : toast.type === "info" ? "ℹ" : "✓"}
          </span>

          {/* Toast Message Text */}
          <span className="tracking-wide text-sm font-bold">{toast.message}</span>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
            className="text-white/40 hover:text-white transition-colors text-xs pr-2"
            title="إغلاق"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
