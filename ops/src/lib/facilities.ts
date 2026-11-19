export type FacilityCategory = "stations" | "farms" | "coldchain" | "lab";

export type FacilityItem = {
  id: string;
  category: FacilityCategory;
  badge: string;
  title: string;
  desc: string;
  specs: string;
  image: string;
  images?: string[];
  tag: string;
};

export const DEFAULT_FACILITIES: FacilityItem[] = [
  {
    id: "artichoke-facility",
    category: "stations",
    badge: "محطة الخرشوف المركزية",
    title: "وحدة فرز وتقميع وتجهيز الخرشوف المصري للتصدير",
    desc: "خطوط معقمة لفرز رؤوس الخرشوف الطازج، تقميع وإعداد القلوب والأقماع، وتعبئتها في براميل غذائية بمحلول ملحي أو كراتين مبردة للتصدير لأوروبا.",
    specs: "طاقة إنتاجية 40 طن/يوم • أحجام كاليبر 50، 60، 65 مم • شهادات BRC و Global G.A.P",
    image: "/images/facilities/artichoke-processing.jpg",
    images: ["/images/facilities/artichoke-processing.jpg"],
    tag: "تجهيز وتعبئة",
  },
  {
    id: "vegetable-farms",
    category: "farms",
    badge: "مزارع نموذجية",
    title: "مزارع وبساتين الخضروات التصديرية (خرشوف، بروكلي، خس، كرنب)",
    desc: "إدارة زراعية متكاملة بنظام الري بالتنقيط الحديث ومكافحة حيوية للمحاصيل في محافظات البحيرة والدلتا لضمان خلوها التام من متبقيات المبيدات.",
    specs: "+600 فدان خضروات تصديرية • النوبارية والدلتا • شهادات Global G.A.P و SMETA",
    image: "/images/facilities/vegetable-farms.jpg",
    images: ["/images/facilities/vegetable-farms.jpg"],
    tag: "مزارع معتمدة",
  },
  {
    id: "cold-chain-pre-cooling",
    category: "coldchain",
    badge: "سلسلة التبريد السريع",
    title: "غرف التبريد الأولي (Pre-Cooling) وتفريغ الهواء (Vacuum Cooling)",
    desc: "تخفيض درجة حرارة الخضروات والبروكلي والخرشوف مباشرة بعد الحصاد خلال ساعتين للحفاظ على نضارتها التامة وصلابتها حتى ميناء الوصول.",
    specs: "تحكم حراري 0-4°C • رطوبة نسبية 90-95% • تتبع رقمي لحظي IoT",
    image: "/images/cold-chain-facility.jpg",
    images: ["/images/cold-chain-facility.jpg"],
    tag: "تبريد سريع",
  },
  {
    id: "potatoes-plant",
    category: "stations",
    badge: "محطة البطاطس التصديرية",
    title: "خطوط غسيل وتدريج وتعبئة البطاطس المجهزة للتصدير",
    desc: "خطوط متطورة لغسيل وتجفيف وتدريج البطاطس واستبعاد العيوب وتعبئتها في شكاير شبكية 10 و 25 كجم أو أكياس جامبو 1250 كجم للشحن البحري.",
    specs: "طاقة تعبئة 120 طن/يوم • أحجام كاليبر 35/55 مم و 55+ مم • أحواض غسيل معقمة",
    image: "/images/facilities/potatoes-packhouse.jpg",
    images: ["/images/facilities/potatoes-packhouse.jpg"],
    tag: "فرز وتدريج",
  },
  {
    id: "beans-broccoli-packhouse",
    category: "stations",
    badge: "محطة الفاصوليا والبروكلي والقرنبيط",
    title: "خطوط تدريج وتعبئة الفاصولياء الخضراء والبروكلي والقرنبيط",
    desc: "فرز دقيق لأطوال وجودة الفاصولياء الخضراء وتعبئتها في بانيتات، وتغليف رؤوس البروكلي والقرنبيط بالبوليسترين المثلج (Iced Styrofoam) والغشاء المسامي.",
    specs: "تغليف مثلج Iced Styrofoam • تغليف Shrink Wrap • فرز يدوي دقيق نخب أول",
    image: "/images/facilities/broccoli-beans-packing.jpg",
    images: ["/images/facilities/broccoli-beans-packing.jpg"],
    tag: "تعبئة مبردة",
  },
  {
    id: "cabbage-packing",
    category: "stations",
    badge: "محطة الكرنب والخس",
    title: "خطوط فرز وتغليف الكرنب الأخضر والأحمر وخس الآيسبيرج",
    desc: "محطة مخصصة لفرز رؤوس الكرنب والخس وتبريدها وتغليفها فردياً بأكياس مسامية وتجهيزها للشحن الجوي والبحري.",
    specs: "طاقة 50 طن/يوم • فرز دقيق • باليتات تصدير مبردة",
    image: "/images/facilities/cabbage-packing.jpg",
    images: ["/images/facilities/cabbage-packing.jpg"],
    tag: "تعبئة وتغليف",
  },
  {
    id: "quality-lab",
    category: "lab",
    badge: "رقابة الجودة والمختبرات",
    title: "مختبر فحص سلامة الغذاء ومتبقيات المبيدات (MRLs)",
    desc: "تحاليل معملية دقيقة لكل شحنة قبل الشحن للتأكد التام من خلوها من الآفات ومطابقة المعايير الأوروبية وإصدار الشهادات الصحية المعتمدة.",
    specs: "فحص مخبري معتمد • شهادات ISO 22000 و HACCP • نتائج فحص فورية",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80"],
    tag: "فحص مخبري",
  },
  {
    id: "reefer-loading",
    category: "coldchain",
    badge: "اللوجستيات والشحن",
    title: "أرصفة تحميل الحاويات المبردة لموانئ الإسكندرية ودمياط",
    desc: "أرصفة مغلقة ومحكمة العزل لتحميل الحاويات المبردة مباشرة من المخازن دون التعرض للحرارة الخارجية، مع تزويد الحاويات بأجهزة Data Loggers الرقمية.",
    specs: "تحميل 10+ حاويات مبردة يومياً • أجهزة تتبع رقمي حراري",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"],
    tag: "أرصفة مبردة",
  },
];
