import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { LanguageProvider } from "@/context/language-context";
import { siteConfig } from "@/config/site";
import "./globals.compiled.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className="h-full antialiased scroll-smooth"
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem("agrinile_preferred_language") || "en";
                  if (saved === "ar") {
                    document.documentElement.lang = "ar";
                    document.documentElement.dir = "rtl";
                  } else {
                    document.documentElement.lang = saved;
                    document.documentElement.dir = "ltr";
                  }
                  if (saved && saved !== "en") {
                    document.documentElement.classList.add("lang-hydrating");
                    setTimeout(function() {
                      document.documentElement.classList.remove("lang-hydrating");
                    }, 400);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        <LanguageProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
