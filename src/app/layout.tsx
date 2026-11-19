import type { Metadata, Viewport } from "next";
import { SiteChrome } from "@/components/layout/site-chrome";
import { siteConfig } from "@/config/site";
import { DEFAULT_SEO_KEYWORDS } from "@/config/seo-keywords";
import "./globals.compiled.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#059669",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://agri-port-zeta.vercel.app"),
  title: {
    default: "AgriPort — تصدير الحاصلات الزراعية والخضروات المصرية الفاخرة | Fresh Produce Exporter",
    template: "%s | AgriPort Egypt",
  },
  description:
    "شركة AgriPort الرائدة في تصدير الحاصلات الزراعية والخضروات والفواكه الطازجة (خرشوف، فاصوليا خضراء، بروكلي، قرنبيط، بطاطس وموالح) من مصر إلى الأسواق الأوروبية والعالمية بشهادات GlobalGAP و BRCGS وسلسلة تبريد معتمدة.",
  keywords: DEFAULT_SEO_KEYWORDS,
  authors: [
    { name: "AgriPort Agricultural Produce Export", url: "https://agri-port-zeta.vercel.app" },
  ],
  creator: "AgriPort Egypt",
  publisher: "AgriPort",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://agri-port-zeta.vercel.app",
    languages: {
      "ar": "https://agri-port-zeta.vercel.app",
      "en": "https://agri-port-zeta.vercel.app",
      "fr": "https://agri-port-zeta.vercel.app",
      "it": "https://agri-port-zeta.vercel.app",
      "es": "https://agri-port-zeta.vercel.app",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US", "fr_FR", "it_IT", "es_ES"],
    url: "https://agri-port-zeta.vercel.app",
    siteName: "AgriPort Egypt — تصدير الحاصلات الزراعية",
    title: "AgriPort — تصدير الحاصلات الزراعية والخضروات المصرية الفاخرة",
    description:
      "تصدير أجود المحاصيل الزراعية والخضروات والفواكه الطازجة من مصر إلى أوروبا والشرق الأوسط والعالم بمعايير GlobalGAP و BRCGS.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "AgriPort Egyptian Fresh Agricultural Produce Export",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriPort — تصدير الحاصلات الزراعية والخضروات المصرية",
    description:
      "تصدير الخضروات والحاصلات الزراعية المصرية الفاخرة بجودة GlobalGAP للشحن الفوري.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

const jsonLdStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://agri-port-zeta.vercel.app/#organization",
      name: "AgriPort",
      legalName: "AgriPort for Agricultural Produce & Export",
      url: "https://agri-port-zeta.vercel.app",
      logo: "https://agri-port-zeta.vercel.app/icon.png",
      email: "agriporteg@gmail.com",
      telephone: "+201007202636",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cairo - Alexandria Agricultural Road",
        addressLocality: "Kafr El Dawar",
        addressRegion: "Beheira Governorate",
        postalCode: "22722",
        addressCountry: "EG",
      },
      sameAs: [
        "https://wa.me/201007202636",
      ],
      description:
        "Leading Egyptian exporter of premium fresh produce, artichokes, green beans, broccoli, cauliflower, citrus, and potatoes to European and international markets under GlobalGAP and BRCGS certified standards.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Fresh Egyptian Produce for Export",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Fresh Egyptian Artichokes (الخرشوف المصري)",
              category: "Vegetables",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Fresh Egyptian Green Beans (الفاصولياء الخضراء)",
              category: "Vegetables",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Fresh Egyptian Broccoli (البروكلي المصري)",
              category: "Vegetables",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Fresh Egyptian Potatoes Spunta (البطاطس المجهزة)",
              category: "Vegetables",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://agri-port-zeta.vercel.app/#website",
      url: "https://agri-port-zeta.vercel.app",
      name: "AgriPort",
      description: "AgriPort — تصدير الحاصلات الزراعية والخضروات المصرية الفاخرة",
      publisher: {
        "@id": "https://agri-port-zeta.vercel.app/#organization",
      },
      inLanguage: ["ar", "en", "fr", "it", "es"],
    },
  ],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdStructuredData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "z6bhtb3yil");
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                  if (!window.location.hash || window.location.hash === '#products') {
                    window.scrollTo(0, 0);
                  }
                  var p = window.location.pathname;
                  if (p.startsWith("/ops") || p.startsWith("/secure-login")) {
                    document.documentElement.lang = "ar";
                    document.documentElement.dir = "rtl";
                    return;
                  }
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
      <body className="flex min-h-full flex-col font-sans bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
