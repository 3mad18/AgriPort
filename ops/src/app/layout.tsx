import type { Metadata } from "next";
import "./globals.compiled.css";
import { OpsAuthProvider } from "@/context/ops-auth-context";
import { OpsStoreProvider } from "@/context/ops-store-context";

export const metadata: Metadata = {
  title: "AgriPort Ops — Operations Suite & Trade Center",
  description: "Internal Operations Suite for produce export management, quotes, and international shipments.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <OpsAuthProvider>
          <OpsStoreProvider>
            {children}
          </OpsStoreProvider>
        </OpsAuthProvider>
      </body>
    </html>
  );
}
