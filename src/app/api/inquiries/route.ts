import { NextResponse } from "next/server";

// CORS Headers helper
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

// 1. GET: Fetch inquiries from Supabase
export async function GET() {
  const { url, key } = getSupabaseConfig();

  if (!url || !key) {
    return NextResponse.json(
      {
        success: false,
        inquiries: [],
        message: "Supabase environment variables not configured yet",
      },
      { headers: corsHeaders() }
    );
  }

  try {
    const res = await fetch(`${url}/rest/v1/inquiries?select=*&order=created_at.desc`, {
      method: "GET",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { success: false, error: err },
        { status: res.status, headers: corsHeaders() }
      );
    }

    const data = await res.json();
    const formatted = data.map((item: any) => ({
      id: item.id,
      date: item.date,
      name: item.name,
      company: item.company || "",
      country: item.country || "",
      email: item.email,
      phone: item.phone || "",
      product: item.product,
      quantity: item.quantity || "",
      incoterms: item.incoterms || "FOB",
      destinationPort: item.destination_port || item.destinationPort || "",
      message: item.message || "",
      status: item.status || "جديد",
      read: item.read ?? false,
      createdAt: item.created_at ? new Date(item.created_at).getTime() : Date.now(),
    }));

    return NextResponse.json(
      { success: true, inquiries: formatted },
      { headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries from Supabase" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

// 2. POST: Insert new inquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      company,
      country,
      email,
      phone,
      product,
      quantity,
      incoterms,
      destinationPort,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400, headers: corsHeaders() }
      );
    }

    const newInquiry = {
      id: "inq-" + Date.now(),
      date: new Date().toISOString().split("T")[0],
      name: String(name),
      company: String(company || "Individual / Private Buyer"),
      country: String(country || "International"),
      email: String(email),
      phone: String(phone || ""),
      product: String(product || "General Quotation"),
      quantity: String(quantity || "As agreed"),
      incoterms: String(incoterms || "FOB"),
      destination_port: String(destinationPort || ""),
      message: String(message || ""),
      status: "جديد",
      read: false,
    };

    const { url, key } = getSupabaseConfig();
    if (url && key) {
      try {
        await fetch(`${url}/rest/v1/inquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: key,
            Authorization: `Bearer ${key}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(newInquiry),
        });
      } catch (err) {
        console.warn("Could not insert into Supabase:", err);
      }
    }

    return NextResponse.json(
      { success: true, inquiry: { ...newInquiry, destinationPort: newInquiry.destination_port } },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

// 3. PATCH: Update inquiry status or read state
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, read, all } = body;

    if (!id && !all) {
      return NextResponse.json({ error: "Missing inquiry ID" }, { status: 400, headers: corsHeaders() });
    }

    const { url, key } = getSupabaseConfig();
    if (url && key) {
      const updates: Record<string, any> = {};
      if (status !== undefined) updates.status = status;
      if (read !== undefined) updates.read = read;

      const targetUrl = all
        ? `${url}/rest/v1/inquiries?read=eq.false`
        : `${url}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`;

      await fetch(targetUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(updates),
      });
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500, headers: corsHeaders() });
  }
}

// 4. DELETE: Remove inquiry
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing inquiry ID" }, { status: 400, headers: corsHeaders() });
    }

    const { url, key } = getSupabaseConfig();
    if (url && key) {
      await fetch(`${url}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      });
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500, headers: corsHeaders() });
  }
}
