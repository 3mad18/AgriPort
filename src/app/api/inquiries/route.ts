import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. If Supabase is configured in environment variables, write directly to database
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const sbRes = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            id: "inq-" + Date.now(),
            date: new Date().toISOString().split("T")[0],
            name: data.name,
            company: data.company || "Individual / Private Buyer",
            country: data.country || "International",
            email: data.email,
            phone: data.phone || "",
            product: data.product || "General Quotation",
            quantity: data.quantity || "As agreed",
            incoterms: data.incoterms || "FOB",
            destination_port: data.destinationPort || "",
            message: data.message || "",
            status: "جديد",
            read: false,
          }),
        });
        if (!sbRes.ok) {
          const errText = await sbRes.text();
          console.error("Supabase REST error:", sbRes.status, errText);
        } else {
          console.log("Supabase insert from API route success!");
        }
      } catch (err) {
        console.warn("Could not push to Supabase from server:", err);
      }
    } else {
      console.warn("Server API: Supabase URL or Key missing in process.env");
    }

    // 2. If Ops API URL is configured (e.g. https://ops.agriport.com/api/inquiries)
    const opsApiUrl = process.env.NEXT_PUBLIC_OPS_API_URL;
    if (opsApiUrl) {
      try {
        await fetch(`${opsApiUrl}/api/inquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.warn("Could not push to Ops API:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
