export type SiteVisitRecord = {
  id: string;
  created_at: string;
  visitor_id: string;
  path: string;
  page_title: string;
  country: string;
  country_code: string;
  flag: string;
  city?: string;
  device: string;
  os: string;
  browser: string;
  referrer: string;
  referrer_icon?: string;
};

// Global in-memory cache preserved across requests in server process
export const RECENT_VISITS_CACHE: SiteVisitRecord[] = [];

export function getPersistedVisits(): SiteVisitRecord[] {
  try {
    const fs = require("fs");
    const path = require("path");
    const os = require("os");
    const tmpDir = os.tmpdir() || "/tmp";
    const filePath = path.join(tmpDir, "agriport_visits.json");
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (Array.isArray(data)) return data;
    }
  } catch {}
  return [];
}

export function savePersistedVisits(visits: SiteVisitRecord[]) {
  try {
    const fs = require("fs");
    const path = require("path");
    const os = require("os");
    const tmpDir = os.tmpdir() || "/tmp";
    const filePath = path.join(tmpDir, "agriport_visits.json");
    fs.writeFileSync(filePath, JSON.stringify(visits.slice(0, 200)), "utf8");
  } catch {}
}
