import { NextResponse } from "next/server";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

function getSupabaseConfig() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://gwdyyuezddpbgmmdwiey.supabase.co";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "sb_publishable_QAd4C2O8gHk56Uj0SyxCYg_DXS9MyE9";
  return { url, key };
}

// 1. GET: Fetch registered users from Supabase table if available
export async function GET() {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    return NextResponse.json(
      { success: true, users: [], message: "Supabase not configured" },
      { headers: corsHeaders() }
    );
  }

  try {
    const res = await fetch(`${url}/rest/v1/registered_users?select=*&order=created_at.desc`, {
      method: "GET",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      // Table may not exist yet in Supabase SQL; return empty gracefully
      return NextResponse.json(
        { success: true, users: [] },
        { headers: corsHeaders() }
      );
    }

    const data = await res.json();
    const formatted = Array.isArray(data)
      ? data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone || "",
          countryCode: item.country_code || item.countryCode || "+20",
          countryIso: item.country_iso || item.countryIso || "EG",
          createdAt: item.created_at || new Date().toISOString(),
        }))
      : [];

    return NextResponse.json(
      { success: true, users: formatted },
      { headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { success: true, users: [] },
      { headers: corsHeaders() }
    );
  }
}

// 2. POST: Insert newly registered user into Supabase table
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, phone, countryCode, countryIso, passwordHash } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const newUserRecord = {
      id: id || "usr_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || "").trim(),
      country_code: String(countryCode || "+20"),
      country_iso: String(countryIso || "EG"),
      password_hash: String(passwordHash || ""),
      created_at: new Date().toISOString(),
    };

    const { url, key } = getSupabaseConfig();
    if (url && key) {
      try {
        await fetch(`${url}/rest/v1/registered_users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: key,
            Authorization: `Bearer ${key}`,
            Prefer: "resolution=merge-duplicates,return=minimal",
          },
          body: JSON.stringify(newUserRecord),
        });
      } catch (err) {
        console.warn("Could not insert user into Supabase table:", err);
      }
    }

    return NextResponse.json(
      { success: true, user: newUserRecord },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process user registration" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

// 3. DELETE: Remove user account
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing user ID" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const { url, key } = getSupabaseConfig();
    if (url && key) {
      try {
        await fetch(`${url}/rest/v1/registered_users?id=eq.${encodeURIComponent(id)}`, {
          method: "DELETE",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
        });
      } catch (err) {
        console.warn("Could not delete user from Supabase:", err);
      }
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
