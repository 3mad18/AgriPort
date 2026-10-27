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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var session = localStorage.getItem("agriport_ops_auth_session");
                  var p = window.location.pathname;
                  var isLogin = p.includes("/login") || p.includes("/secure-login");
                  if (!session && !isLogin && !p.startsWith("/api")) {
                    window.location.replace("/ops/login");
                  } else if (session && isLogin) {
                    window.location.replace("/ops");
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
          {children}
        </div>
      </OpsStoreProvider>
    </OpsAuthProvider>
  );
}
