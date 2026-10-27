import { NextResponse } from "next/server";

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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, key };
}

export async function GET() {
  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/products?select=*&order=sort_order.asc,created_at.asc`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ success: true, products: data }, { headers: corsHeaders() });
      }
    } catch (err) {
      // fallback
    }
  }
  return NextResponse.json({ success: true, products: [] }, { headers: corsHeaders() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, key } = getSupabaseConfig();
    if (url && key) {
      const res = await fetch(`${url}/rest/v1/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return NextResponse.json({ success: res.ok, product: data }, { status: res.status, headers: corsHeaders() });
    }
    return NextResponse.json({ success: true, product: body }, { headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500, headers: corsHeaders() });
  }
}
