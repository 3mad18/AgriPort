export type ExportProduct = {
  id: string;
  name: string;
  category: "موالح" | "خضروات" | "فواكه" | "أخرى";
  variety: string;
  season: string;
  pack: string;
  specs: string;
  imageUrl: string;
  icon: string;
  status: "متاح للتصدير" | "موسم قادم" | "نفد مؤقتاً";
};

export const EXPORT_CATALOG: ExportProduct[] = [
  {
    id: "citrus",
    name: "برتقال فالنسيا وموالح مصرية",
    category: "موالح",
    variety: "برتقال صيفي فالنسيا، أبو صرة، ليمون، يوسفي",
    season: "نوفمبر — مايو",
    pack: "كراتين تليسكوبيك 15 كجم، أوبن توب، شبك",
    specs: "معايرات كاليبر: 40، 48، 56، 64، 72، 80، 88",
    imageUrl:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80",
    icon: "🍊",
    status: "متاح للتصدير",
  },
  {
    id: "onions",
    name: "بصل مصري طازج (أحمر وذهبي)",
    category: "خضروات",
    variety: "بصل أحمر إيطالي، بصل ذهبي مجفف طبيعياً",
    season: "فبراير — أغسطس",
    pack: "أكياس شبكية 10 كجم و 25 كجم، جامبو باج 1 طن",
    specs: "أحجام: 40/60 مم، 50/70 مم، 70/90 مم، 80/100 مم",
    imageUrl:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
    icon: "🧅",
    status: "متاح للتصدير",
  },
  {
    id: "strawberries",
    name: "فراولة طازجة فاخرة",
    category: "فواكه",
    variety: "فورتونا، فستيفال، سنشريشن",
    season: "نوفمبر — مارس",
    pack: "بانيتات 250 جم داخل كراتين 2 كجم و 2.5 كجم",
    specs: "شحن جوي مبرد سريع، فحص متبقيات معتمد",
    imageUrl:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    icon: "🍓",
    status: "متاح للتصدير",
  },
  {
    id: "pomegranates",
    name: "رمان وندرفول أحمر",
    category: "فواكه",
    variety: "رمان وندرفول عالي السكرية وبريكس مرتفع",
    season: "سبتمبر — ديسمبر",
    pack: "كراتين 4.5 كجم و 5 كجم (بانيتات أو كراتين مفتوحة)",
    specs: "أحجام: 6، 7، 8، 9، 10، 12، 14 حبة بالكرتونة",
    imageUrl:
      "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=800&q=80",
    icon: "🍎",
    status: "موسم قادم",
  },
  {
    id: "potatoes",
    name: "بطاطس مجهزة للتصدير",
    category: "خضروات",
    variety: "سبونتا، مونديال، ليدي روزيتا، كارا",
    season: "يناير — يونيو",
    pack: "أكياس شبك 10 كجم، 25 كجم، جامبو باج 1250 كجم",
    specs: "مغسولة ومجففة، أحجام 35/55 مم و 55+ مم",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    icon: "🥔",
    status: "متاح للتصدير",
  },
  {
    id: "grapes",
    name: "عنب طازج بدون بذور",
    category: "فواكه",
    variety: "إيرلي سويت، سوبيريور، فليم، كريمسون",
    season: "مايو — أغسطس",
    pack: "بانيتات 500 جم أو كيس ورقي داخل كرتونة 4.5 كجم",
    specs: "مستوى بريكس مرتفع، قطر الحبة 18-22 مم+",
    imageUrl:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80",
    icon: "🍇",
    status: "موسم قادم",
  },
];

export async function submitQuoteInquiry(inquiryData: {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  incoterms: string;
  destinationPort: string;
  message: string;
}) {
  // 1. Submit to local API endpoint /api/inquiries
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiryData),
    });
    return await res.json();
  } catch (err) {
    console.error("Inquiry submission error:", err);
    return { success: false, error: err };
  }
}
