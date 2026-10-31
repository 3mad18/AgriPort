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
