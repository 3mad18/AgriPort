import { NextResponse } from "next/server";
import { packProductSpecs, unpackProductRow } from "@/lib/product-packer";
import { EXPORT_CATALOG } from "@/lib/catalog";

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
  let url = rawUrl.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/i, "").replace(/\/rest$/i, "");
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_QAd4C2O8gHk56Uj0SyxCYg_DXS9MyE9";
  return { url, key };
}

// In-memory fallback cache
let memoryProductsCache: any[] | null = null;

export async function GET() {
  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      const res = await fetch(
        `${url}/rest/v1/products?select=*&order=sort_order.asc,created_at.asc`,
        {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
          cache: "no-store",
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const unpacked = data.map(unpackProductRow);
          memoryProductsCache = unpacked;
          return NextResponse.json(
            { success: true, products: unpacked },
            { headers: corsHeaders() }
          );
        }
      }
    } catch (err) {
      console.warn("⚠️ [/api/products] Supabase fetch failed, using fallback:", err);
    }
  }

  // Fallback to in-memory or catalog
  const fallback = memoryProductsCache && memoryProductsCache.length > 0
    ? memoryProductsCache
    : EXPORT_CATALOG;

  return NextResponse.json(
    { success: true, products: fallback },
    { headers: corsHeaders() }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, key } = getSupabaseConfig();

    const packedSpecs = packProductSpecs(body);
    const imagesList = Array.isArray(body.images) ? body.images : (body.imageUrl ? [body.imageUrl] : []);
    const supabasePayload: Record<string, any> = {
      id: body.id,
      name: body.name,
      category: body.category,
      variety: body.variety,
      season: body.season,
      pack: body.pack,
      specs: packedSpecs,
      image_url: body.imageUrl || (imagesList.length > 0 ? imagesList[0] : "") || "",
      icon: body.icon || "🌿",
      status: body.status || "متاح للتصدير",
      featured: body.featured ?? false,
      sort_order: body.sortOrder || body.sort_order || 99,
      images: imagesList,
      description: body.description || "",
      pdf_url: body.pdfUrl || body.pdf_url || "",
      pdf_name: body.pdfName || body.pdf_name || "",
      origin: body.origin || "جمهورية مصر العربية (Egypt)",
      hs_code: body.hsCode || body.hs_code || "",
      storage_temp: body.storageTemp || body.storage_temp || "",
      shelf_life: body.shelfLife || body.shelf_life || "",
    };

    if (url && key) {
      try {
        const postRes = await fetch(`${url}/rest/v1/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: key,
            Authorization: `Bearer ${key}`,
            Prefer: "resolution=merge-duplicates,return=representation",
          },
          body: JSON.stringify(supabasePayload),
        });

        // Fallback to core columns if table does not yet have extended columns
        if (!postRes.ok && postRes.status === 400) {
          const corePayload = {
            id: body.id,
            name: body.name,
            category: body.category,
            variety: body.variety,
            season: body.season,
            pack: body.pack,
            specs: packedSpecs,
            image_url: supabasePayload.image_url,
            icon: body.icon || "🌿",
            status: body.status || "متاح للتصدير",
            featured: body.featured ?? false,
            sort_order: body.sortOrder || body.sort_order || 99,
          };
          await fetch(`${url}/rest/v1/products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: key,
              Authorization: `Bearer ${key}`,
              Prefer: "resolution=merge-duplicates,return=representation",
            },
            body: JSON.stringify(corePayload),
          });
        }
      } catch (err) {
        console.warn("⚠️ [/api/products] Supabase insert failed:", err);
      }
    }

    // Update memory cache
    const unpacked = unpackProductRow(supabasePayload);
    if (!memoryProductsCache) memoryProductsCache = [...EXPORT_CATALOG];
    const existingIndex = memoryProductsCache.findIndex((p) => p.id === body.id);
    if (existingIndex >= 0) {
      memoryProductsCache[existingIndex] = { ...memoryProductsCache[existingIndex], ...unpacked };
    } else {
      memoryProductsCache.push(unpacked);
    }

    return NextResponse.json(
      { success: true, product: unpacked },
      { headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...partial } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const { url, key } = getSupabaseConfig();

    // Prepare packed specs with updated metadata
    const packedSpecs = packProductSpecs(partial);

    const corePayload: Record<string, any> = {
      id,
      specs: packedSpecs,
    };
    if (partial.name !== undefined) corePayload.name = partial.name;
    if (partial.category !== undefined) corePayload.category = partial.category;
    if (partial.variety !== undefined) corePayload.variety = partial.variety;
    if (partial.season !== undefined) corePayload.season = partial.season;
    if (partial.pack !== undefined) corePayload.pack = partial.pack;
    if (partial.imageUrl !== undefined) corePayload.image_url = partial.imageUrl;
    if (partial.icon !== undefined) corePayload.icon = partial.icon;
    if (partial.status !== undefined) corePayload.status = partial.status;
    if (partial.featured !== undefined) corePayload.featured = partial.featured;
    if (partial.sortOrder !== undefined || partial.sort_order !== undefined) {
      corePayload.sort_order = partial.sortOrder || partial.sort_order;
    }

    if (url && key) {
      try {
        const patchRes = await fetch(`${url}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: key,
            Authorization: `Bearer ${key}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify(corePayload),
        });

        const patchData = patchRes.ok ? await patchRes.json() : null;
        if (!patchData || (Array.isArray(patchData) && patchData.length === 0)) {
          await fetch(`${url}/rest/v1/products`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: key,
              Authorization: `Bearer ${key}`,
              Prefer: "resolution=merge-duplicates,return=representation",
            },
            body: JSON.stringify(corePayload),
          });
        }
      } catch (err) {
        console.warn("⚠️ [/api/products] Supabase update failed:", err);
      }
    }

    // Update memory cache
    if (memoryProductsCache) {
      const idx = memoryProductsCache.findIndex((p) => p.id === id);
      if (idx >= 0) {
        memoryProductsCache[idx] = {
          ...memoryProductsCache[idx],
          ...partial,
          imageUrl: partial.imageUrl !== undefined ? partial.imageUrl : (Array.isArray(partial.images) && partial.images.length === 0 ? "" : memoryProductsCache[idx].imageUrl),
          images: Array.isArray(partial.images) ? partial.images : memoryProductsCache[idx].images,
        };
      }
    }

    return NextResponse.json(
      { success: true },
      { headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const urlObj = new URL(request.url);
    const id = urlObj.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const { url, key } = getSupabaseConfig();
    if (url && key) {
      try {
        await fetch(`${url}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
          method: "DELETE",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
        });
      } catch (err) {
        console.warn("⚠️ [/api/products] Supabase delete failed:", err);
      }
    }

    // Update memory cache
    if (memoryProductsCache) {
      memoryProductsCache = memoryProductsCache.filter((p) => p.id !== id);
    }

    return NextResponse.json(
      { success: true },
      { headers: corsHeaders() }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
