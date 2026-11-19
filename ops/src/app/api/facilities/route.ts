import { NextResponse } from "next/server";
import { DEFAULT_FACILITIES, FacilityItem } from "@/lib/facilities";
import { cleanSupabaseUrl } from "@/lib/supabase-config";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

function getSupabaseConfig() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://gwdyyuezddpbgmmdwiey.supabase.co";
  const url = cleanSupabaseUrl(rawUrl);
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_QAd4C2O8gHk56Uj0SyxCYg_DXS9MyE9";
  return { url, key };
}

// In-memory runtime cache
let memoryFacilitiesCache: FacilityItem[] | null = null;

async function loadFromSupabase(): Promise<FacilityItem[] | null> {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url}/rest/v1/site_settings?id=eq.facilities_data&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].tagline) {
        const parsed = JSON.parse(data[0].tagline);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn("Failed to load facilities from Supabase:", e);
  }
  return null;
}

async function saveToSupabase(list: FacilityItem[]): Promise<boolean> {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return false;
  try {
    const payload = {
      id: "facilities_data",
      company_name: "facilities",
      tagline: JSON.stringify(list),
      email: "facilities@agriport.com",
      phone: "",
      location: "",
      export_banner_text: "",
      show_export_banner: false,
      updated_at: new Date().toISOString(),
    };

    const res = await fetch(`${url}/rest/v1/site_settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    console.warn("Failed to save facilities to Supabase:", e);
    return false;
  }
}

export async function GET() {
  if (!memoryFacilitiesCache) {
    const cloud = await loadFromSupabase();
    if (cloud) {
      memoryFacilitiesCache = cloud;
    } else {
      memoryFacilitiesCache = [...DEFAULT_FACILITIES];
    }
  }

  return NextResponse.json(
    { success: true, facilities: memoryFacilitiesCache },
    { headers: corsHeaders() }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let current = memoryFacilitiesCache;
    if (!current) {
      const cloud = await loadFromSupabase();
      current = cloud || [...DEFAULT_FACILITIES];
    }

    const cleanImages = Array.isArray(body.images) ? body.images : (body.image ? [body.image] : []);
    const cleanCover = body.image || cleanImages[0] || "";

    const newFacility: FacilityItem = {
      id: body.id || `facility-${Date.now()}`,
      category: body.category || "stations",
      badge: body.badge || "محطة معتمدة",
      title: body.title || "مرفق جديد",
      desc: body.desc || "",
      specs: body.specs || "",
      image: cleanCover,
      images: cleanImages,
      tag: body.tag || "مرفق",
    };

    current = [newFacility, ...current];
    memoryFacilitiesCache = current;
    await saveToSupabase(current);

    return NextResponse.json(
      { success: true, facility: newFacility, facilities: current },
      { headers: corsHeaders() }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create facility" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing facility id" },
        { status: 400, headers: corsHeaders() }
      );
    }

    let current = memoryFacilitiesCache;
    if (!current) {
      const cloud = await loadFromSupabase();
      current = cloud || [...DEFAULT_FACILITIES];
    }

    const idx = current.findIndex((f) => f.id === id);
    if (idx !== -1) {
      current[idx] = {
        ...current[idx],
        ...updates,
      };
    } else {
      current.push({
        id,
        category: updates.category || "stations",
        badge: updates.badge || "محطة معتمدة",
        title: updates.title || "مرفق",
        desc: updates.desc || "",
        specs: updates.specs || "",
        image: updates.image || "",
        images: updates.images || [],
        tag: updates.tag || "مرفق",
      });
    }

    memoryFacilitiesCache = current;
    await saveToSupabase(current);

    return NextResponse.json(
      { success: true, facilities: current },
      { headers: corsHeaders() }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update facility" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id parameter" },
        { status: 400, headers: corsHeaders() }
      );
    }

    let current = memoryFacilitiesCache;
    if (!current) {
      const cloud = await loadFromSupabase();
      current = cloud || [...DEFAULT_FACILITIES];
    }

    current = current.filter((f) => f.id !== id);
    memoryFacilitiesCache = current;
    await saveToSupabase(current);

    return NextResponse.json(
      { success: true, facilities: current },
      { headers: corsHeaders() }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete facility" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
