export function getVisitorSiteUrl(path: string = ""): string {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  // 1. If explicit env variable is configured
  if (process.env.NEXT_PUBLIC_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_PUBLIC_SITE_URL.replace(/\/+$/, "")}${cleanPath}`;
  }

  // 2. Client-side dynamic detection
  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;

    // Local development: ops is on 3001, visitor site is on 3000
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `http://localhost:3000${cleanPath}`;
    }

    // Production subdomain (e.g. ops.agriport.com -> agriport.com)
    const parts = hostname.split(".");
    if (parts.length > 2 && parts[0] === "ops") {
      return `${protocol}//${parts.slice(1).join(".")}${cleanPath}`;
    }
  }

  // 3. Default fallback
  return `http://localhost:3000${cleanPath}`;
}
