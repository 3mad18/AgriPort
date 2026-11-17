import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/ops/", "/api/", "/secure-login/", "/login/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/ops/", "/api/", "/secure-login/"],
      },
    ],
    sitemap: "https://agri-port-zeta.vercel.app/sitemap.xml",
  };
}
