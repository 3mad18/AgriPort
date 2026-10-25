import { NextResponse } from "next/server";

// CORS Headers helper
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

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
        { error: "الاسم والبريد الإلكتروني مطلوبان لإتمام الطلب" },
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
      product: String(product || "طلب تسعير عام"),
      quantity: String(quantity || "حسب الاتفاق"),
      incoterms: String(incoterms || "FOB / CIF"),
      destinationPort: String(destinationPort || "To be specified"),
      message: String(message || ""),
      status: "جديد",
      read: false,
      createdAt: Date.now(),
    };

    // If Supabase is configured via environment variables, write to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify(newInquiry),
        });
      } catch (err) {
        console.warn("Failed to forward inquiry to Supabase:", err);
      }
    }

    return NextResponse.json(
      { success: true, inquiry: newInquiry },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "AgriPort Ops Inquiries API is active" },
    { headers: corsHeaders() }
  );
}
