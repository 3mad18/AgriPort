"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export type PopupPayload = {
  title?: string;
  message?: string;
  type?: "success" | "error" | "info";
};

export const TOAST_EVENT = "agriport_ops_toast";

export function triggerOpsToast(
  message: string = "تم الحفظ بنجاح",
  type: "success" | "error" | "info" = "success",
  title: string = "تم الحفظ بنجاح"
) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, { detail: { message, title, type } })
    );
  }
}

export function OpsToast() {
  const [modal, setModal] = useState<PopupPayload | null>(null);

  useEffect(() => {
    const handlePopup = (e: Event) => {
      const customEvent = e as CustomEvent<{
        message?: string;
        title?: string;
        type?: "success" | "error" | "info";
      }>;
      if (!customEvent.detail) return;

      setModal({
        title: customEvent.detail.title || "تم الحفظ بنجاح",
        message: customEvent.detail.message || "تم حفظ وتحديث البيانات بنجاح في الموقع.",
        type: customEvent.detail.type || "success",
      });
    };

    window.addEventListener(TOAST_EVENT, handlePopup);
    return () => window.removeEventListener(TOAST_EVENT, handlePopup);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!modal) return null;

  const isError = modal.type === "error";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      dir="rtl"
      onClick={() => setModal(null)}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-sm rounded-3xl bg-white p-6 sm:p-8 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setModal(null)}
          className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          title="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Status Icon Circle */}
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-xs ${
            isError
              ? "bg-rose-50 text-rose-600"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {isError ? <X className="w-8 h-8" /> : <Check className="w-8 h-8 stroke-[2.5]" />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {modal.title || "تم الحفظ بنجاح"}
        </h3>

        {/* Message */}
        <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
          {modal.message}
        </p>

        {/* Confirm Action Button */}
        <button
          type="button"
          onClick={() => setModal(null)}
          className={`w-full rounded-full py-3 text-xs font-bold text-white shadow-xs transition-all active:scale-95 ${
            isError
              ? "bg-rose-600 hover:bg-rose-700 hover:shadow-rose-500/25"
              : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-emerald-500/25"
          }`}
        >
          حسناً
        </button>
      </div>
    </div>
  );
}
