import { NextResponse } from "next/server";
import { DEFAULT_FACILITIES, FacilityItem } from "@/lib/facilities";
import { cleanSupabaseUrl } from "@/lib/supabase-config";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Expires": "0",
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

// Fallback in-memory cache if Supabase network fails
let fallbackMemoryCache: FacilityItem[] | null = null;

async function loadFromSupabase(): Promise<FacilityItem[] | null> {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url}/rest/v1/site_settings?id=eq.facilities_data&limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].tagline) {
        const parsed = JSON.parse(data[0].tagline);
        if (Array.isArray(parsed) && parsed.length > 0) {
          fallbackMemoryCache = parsed;
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

    const res = await fetch(`${url}/rest/v1/site_settings?on_conflict=id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fallbackMemoryCache = list;
      return true;
    }
    console.warn("Supabase upsert returned status:", res.status);
    return false;
  } catch (e) {
    console.warn("Failed to save facilities to Supabase:", e);
    return false;
  }
}

export async function GET(req: Request) {
  // Always query freshest data from Supabase
  const cloud = await loadFromSupabase();
  const list = cloud || fallbackMemoryCache || [...DEFAULT_FACILITIES];

  return NextResponse.json(
    { success: true, facilities: list },
    { headers: corsHeaders() }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Always start with latest data from Supabase
    const cloud = await loadFromSupabase();
    let current = cloud || fallbackMemoryCache || [...DEFAULT_FACILITIES];

    const cleanImages = Array.isArray(body.images) && body.images.length > 0
      ? body.images.map((img: string) => (img || "").trim()).filter(Boolean)
      : (body.image ? [body.image.trim()] : []);
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

    current = [newFacility, ...current.filter((f) => f.id !== newFacility.id)];
    fallbackMemoryCache = current;
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

    // Always load freshest data from Supabase first
    const cloud = await loadFromSupabase();
    let current = cloud || fallbackMemoryCache || [...DEFAULT_FACILITIES];

    const idx = current.findIndex((f) => f.id === id);
    if (idx !== -1) {
      const existing = current[idx];
      const mergedImages = updates.images !== undefined
        ? (Array.isArray(updates.images) ? updates.images.filter(Boolean) : [])
        : existing.images;
      const mergedImage = updates.image !== undefined
        ? (updates.image || "")
        : existing.image;

      current[idx] = {
        ...existing,
        ...updates,
        image: mergedImage,
        images: mergedImages,
      };
    } else {
      const cleanImages = Array.isArray(updates.images) ? updates.images.filter(Boolean) : (updates.image ? [updates.image] : []);
      current.push({
        id,
        category: updates.category || "stations",
        badge: updates.badge || "محطة معتمدة",
        title: updates.title || "مرفق",
        desc: updates.desc || "",
        specs: updates.specs || "",
        image: updates.image || cleanImages[0] || "",
        images: cleanImages,
        tag: updates.tag || "مرفق",
      });
    }

    fallbackMemoryCache = current;
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

    // Always load freshest data from Supabase first
    const cloud = await loadFromSupabase();
    let current = cloud || fallbackMemoryCache || [...DEFAULT_FACILITIES];

    current = current.filter((f) => f.id !== id);
    fallbackMemoryCache = current;
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
