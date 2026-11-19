import { NextResponse } from "next/server";
import { DEFAULT_FACILITIES, FacilityItem } from "@/lib/facilities";

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

// In-memory runtime cache
let memoryFacilitiesCache: FacilityItem[] = [...DEFAULT_FACILITIES];

export async function GET() {
  return NextResponse.json(
    { success: true, facilities: memoryFacilitiesCache },
    { headers: corsHeaders() }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newFacility: FacilityItem = {
      id: body.id || `facility-${Date.now()}`,
      category: body.category || "stations",
      badge: body.badge || "محطة معتمدة",
      title: body.title || "مرفق جديد",
      desc: body.desc || "",
      specs: body.specs || "",
      image: body.image || (body.images && body.images[0]) || "/images/cold-chain-facility.jpg",
      images: Array.isArray(body.images) ? body.images : [body.image || "/images/cold-chain-facility.jpg"],
      tag: body.tag || "مرفق",
    };

    memoryFacilitiesCache = [newFacility, ...memoryFacilitiesCache];

    return NextResponse.json(
      { success: true, facility: newFacility, facilities: memoryFacilitiesCache },
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

    const idx = memoryFacilitiesCache.findIndex((f) => f.id === id);
    if (idx !== -1) {
      memoryFacilitiesCache[idx] = {
        ...memoryFacilitiesCache[idx],
        ...updates,
      };
    } else {
      // Upsert
      memoryFacilitiesCache.push({
        id,
        category: updates.category || "stations",
        badge: updates.badge || "محطة معتمدة",
        title: updates.title || "مرفق",
        desc: updates.desc || "",
        specs: updates.specs || "",
        image: updates.image || (updates.images && updates.images[0]) || "",
        images: updates.images || [],
        tag: updates.tag || "مرفق",
      });
    }

    return NextResponse.json(
      { success: true, facilities: memoryFacilitiesCache },
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

    memoryFacilitiesCache = memoryFacilitiesCache.filter((f) => f.id !== id);

    return NextResponse.json(
      { success: true, facilities: memoryFacilitiesCache },
      { headers: corsHeaders() }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete facility" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
