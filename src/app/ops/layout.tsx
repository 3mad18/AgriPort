import type { Metadata } from "next";
import { OpsAuthProvider } from "@/context/ops-auth-context";
import { OpsStoreProvider } from "@/context/ops-store-context";

export const metadata: Metadata = {
  title: "AgriPort Ops — Operations Suite & Trade Center",
  description:
    "Internal Operations Suite for produce export management, quotes, and international shipments.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OpsAuthProvider>
      <OpsStoreProvider>
        <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
          {children}
        </div>
      </OpsStoreProvider>
    </OpsAuthProvider>
  );
}
