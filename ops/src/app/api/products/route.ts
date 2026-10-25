import { NextResponse } from "next/server";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET() {
  // Returns default active export products
  const products = [
    {
      id: "citrus",
      name: "برتقال فالنسيا وموالح مصرية",
      category: "موالح",
      variety: "برتقال صيفي فالنسيا، أبو صرة، ليمون، يوسفي",
      season: "نوفمبر — مايو",
      pack: "كراتين تليسكوبيك 15 كجم، أوبن توب، شبك",
      specs: "معايرات كاليبر: 40، 48، 56، 64، 72، 80، 88",
      imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80",
      icon: "🍊",
      status: "متاح للتصدير",
      featured: true,
    },
    {
      id: "onions",
      name: "بصل مصري طازج (أحمر وذهبي)",
      category: "خضروات",
      variety: "بصل أحمر إيطالي، بصل ذهبي مجفف طبيعياً",
      season: "فبراير — أغسطس",
      pack: "أكياس شبكية 10 كجم و 25 كجم، جامبو باج 1 طن",
      specs: "أحجام: 40/60 مم، 50/70 مم، 70/90 مم، 80/100 مم",
      imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
      icon: "🧅",
      status: "متاح للتصدير",
      featured: true,
    },
    {
      id: "strawberries",
      name: "فراولة طازجة فاخرة",
      category: "فواكه",
      variety: "فورتونا، فستيفال، سنشريشن",
      season: "نوفمبر — مارس",
      pack: "بانيتات 250 جم داخل كراتين 2 كجم و 2.5 كجم",
      specs: "شحن جوي مبرد سريع، فحص متبقيات معتمد",
      imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
      icon: "🍓",
      status: "متاح للتصدير",
      featured: true,
    },
  ];

  return NextResponse.json({ products }, { headers: corsHeaders() });
}
