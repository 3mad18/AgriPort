export type Language = "ar" | "en" | "fr" | "it" | "es";

export type LanguageOption = {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir: "rtl" | "ltr";
};

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    "code": "en",
    "name": "English",
    "nativeName": "English",
    "flag": "🇬🇧",
    "dir": "ltr"
  },
  {
    "code": "ar",
    "name": "Arabic",
    "nativeName": "العربية",
    "flag": "🇪🇬",
    "dir": "rtl"
  },
  {
    "code": "fr",
    "name": "French",
    "nativeName": "Français",
    "flag": "🇫🇷",
    "dir": "ltr"
  },
  {
    "code": "it",
    "name": "Italian",
    "nativeName": "Italiano",
    "flag": "🇮🇹",
    "dir": "ltr"
  },
  {
    "code": "es",
    "name": "Spanish",
    "nativeName": "Español",
    "flag": "🇪🇸",
    "dir": "ltr"
  }
];

export const translations = {
  "ar": {
    "brandName": "AgriPort",
    "brandSubtitle": "بوابة تصدير الحاصلات الزراعية",
    "tagline": "تصدير أجود الخضروات والفواكه الطازجة إلى الأسواق العالمية",
    "nav": {
      "home": "الرئيسية",
      "products": "المنتجات",
      "facilities": "المرافق والمحطات",
      "capabilities": "المرافق والمحطات",
      "company": "عن الشركة",
      "about": "عن الشركة",
      "contact": "تواصل معنا",
      "contactSales": "تواصل مع المبيعات"
    },
    "cta": "طلب عرض سعر",
    "language": "اللغة",
    "trust": {
      "standards": "معتمد وفق أعلى المعايير والمواصفات الدولية"
    },
    "hero": {
      "pillTag": "الإعلان عن موسم حصاد 2026",
      "headlineMain": "الزراعة العالمية،",
      "headlineSub": "تُسلَّم بكل دقة واحترافية.",
      "leadParagraph": "البنية التحتية لتجارة الحاصلات الزراعية الدولية. نقوم بتوريد، معالجة، وشحن أجود المحاصيل بأعلى كفاءة لوجستية وسلسلة تبريد معتمدة.",
      "btnPrimary": "بدء التوريد",
      "btnSecondary": "استعراض الكتالوج",
      "badge": "تصدير زراعي معتمد عالمياً | حاصلات مصرية طازجة",
      "titlePart1": "نصدر أجود",
      "titleHighlight": "الخضروات والفواكه الطازجة",
      "titlePart2": "من مصر إلى كبرى موانئ العالم",
      "subtitle": "شريكك الموثوق لتوريد وتصدير المحاصيل الزراعية (موالح، بصل، ثوم، فراولة، رمان، عنب، بطاطس) بأعلى مواصفات الفرز وسلسلة التبريد والشحن الدولي.",
      "browseCatalog": "استعراض كتالوج المنتجات",
      "requestDeals": "طلب تسعير وشحنات",
      "stats": {
        "countries": {
          "value": "+25",
          "label": "دولة مستوردة"
        },
        "standards": {
          "value": "100%",
          "label": "مطابقة لمعايير EU"
        },
        "coldChain": {
          "value": "سلسلة تبريد",
          "label": "حفظ ونضارة متواصلة"
        },
        "terms": {
          "value": "FOB & CIF",
          "label": "شروط شحن وتوريد مرنة"
        }
      }
    },
    "bento": {
      "title": "هندسة الجودة بأعلى الطاقات التصديرية.",
      "subtitle": "كتالوج متكامل من المحاصيل المخصصة للتصدير، مدعوم ببنية تحتية حديثة لسلسلة التبريد والشحن الدولي.",
      "card1Tag": "إنتاجية تصديرية فاخرة",
      "card1Title": "صادرات الموالح والبرتقال",
      "card1Desc": "برتقال وليمون مصري نخب أول (فالنسيا، أبو صرة، ليمون، يوسفي).",
      "card2Title": "سلامة سلسلة التبريد",
      "card2Desc": "تحكم متواصل في درجات الحرارة لضمان عدم حدوث أي تدهور من المزرعة حتى ميناء الوصول.",
      "card3Title": "المحاصيل الدرنية",
      "card3Desc": "بطاطس وبصل مجهزة للتصدير",
      "card4Title": "مركز التوريد والطلبات المخصصة",
      "card4Desc": "لم تجد المحصول المطلوب؟ استفد من شبكتنا التصديرية لتوريد كميات ومواصفات محددة مباشرة من مزارع معتمدة.",
      "card4Cta": "طلب شحنة مخصصة"
    },
    "features": {
      "sectionTitlePre": "لماذا يختار كبار المستوردين",
      "sectionTitleHighlight": "Agri Port",
      "sectionTitlePost": "؟",
      "sectionSubtitle": "نضمن لك شحنات زراعية مطابقة بنسبة 100% للمواصفات المتفق عليها مع التزام تام بمواعيد الشحن.",
      "moreDetails": "المزيد والتفاصيل",
      "items": [
        {
          "icon": "🍊",
          "title": "كتالوج الخضروات والفواكه",
          "body": "موالح وبرتقال، بصل ذهبي وأحمر، ثوم، فراولة، رمان، وبطاطس بأحجام وتصنيفات قياسية معدة للتصدير.",
          "badge": "طازج ومصنف"
        },
        {
          "icon": "📦",
          "title": "محطات التعبئة وسلسلة التبريد",
          "body": "خطوط فرز إلكتروني وتعبئة في كراتين وبانيتات مبردة تحافظ على نضارة المحصول حتى وصوله لميناء الوصول.",
          "badge": "تعبئة معتمدة"
        },
        {
          "icon": "🤝",
          "title": "عقود توريد وتسهيلات صفقات",
          "body": "اتفاقيات مرنة للمستوردين وشحنات مجدولة مع توفير شهادات المنشأ والفحص الزراعي المعتمدة.",
          "badge": "للمستوردين الدوليين"
        }
      ]
    },
    "productsPage": {
      "title": "كتالوج المنتجات الزراعية للتصدير",
      "description": "نقدم تشكيلة فاخرة من المحاصيل الزراعية المصرية الطازجة المجهزة للتصدير الدولي وفق أعلى معايير الجودة وشهادات Global G.A.P و ISO.",
      "statusTitle": "أبرز المحاصيل الزراعية المتاحة للتصدير",
      "statusDesc": "نوفر أصنافاً متنوعة تم قطافها وتعبئتها حديثاً وفق اشتراطات ومواصفات كل سوق مستورد:",
      "seasonLabel": "الموسم التصديري",
      "packagingLabel": "أنواع التعبئة",
      "specsLabel": "المواصفات والأحجام",
      "requestQuoteBtn": "طلب تسعير لهذا المحصول",
      "productsList": [
        {
          "id": "citrus",
          "name": "الموالح والبرتقال المصري",
          "variety": "برتقال فالنسيا (صيفي)، أبو صرة، ليمون، يوسفي",
          "season": "نوفمبر — مايو",
          "pack": "كراتين تيليسكوبيك 15 كجم، أوبن توب، شبك",
          "specs": "معايرات كاليبر: 40، 48، 56، 64، 72، 80، 88",
          "icon": "🍊",
          "category": "موالح"
        },
        {
          "id": "onions",
          "name": "البصل المصري (الأحمر والذهبي)",
          "variety": "بصل أحمر إيطالي، بصل ذهبي مجفف طبيعياً",
          "season": "فبراير — أغسطس",
          "pack": "أكياس شبكية 10 كجم و 25 كجم، جامبو باج 1 طن",
          "specs": "أحجام: 40/60 مم، 50/70 مم، 70/90 مم، 80/100 مم",
          "icon": "🧅",
          "category": "خضروات"
        },
        {
          "id": "strawberries",
          "name": "الفراولة الطازجة",
          "variety": "فورتونا، فستيفال، سنشريشن",
          "season": "نوفمبر — مارس",
          "pack": "بانيتات 250 جم داخل كراتين 2 كجم و 2.5 كجم",
          "specs": "شحن جوي مبرد سريع، خالية من متبقيات المبيدات",
          "icon": "🍓",
          "category": "فواكه"
        },
        {
          "id": "pomegranates",
          "name": "الرمان الوندي الفاخر",
          "variety": "رمان وندرفول أحمر داكن عالي السكرية",
          "season": "سبتمبر — ديسمبر",
          "pack": "كراتين 4.5 كجم و 5 كجم (بانيتات أو كراتين مفتوحة)",
          "specs": "أحجام: 6، 7، 8، 9، 10، 12، 14 حبة بالكرتونة",
          "icon": "🍎",
          "category": "فواكه"
        },
        {
          "id": "potatoes",
          "name": "البطاطس المجهزة للتصدير",
          "variety": "سبونتا، مونديال، ليدي روزيتا، كارا",
          "season": "يناير — يونيو",
          "pack": "أكياس شبك 10 كجم، 25 كجم، جامبو باج 1250 كجم",
          "specs": "مغسولة ومجففة، أحجام 35/55 مم و 55+ مم",
          "icon": "🥔",
          "category": "خضروات"
        },
        {
          "id": "grapes",
          "name": "العنب الطازج بدون بذور",
          "variety": "إيرلي سويت، سوبيريور، فليم، كريمسون",
          "season": "مايو — أغسطس",
          "pack": "بانيتات 500 جم أو كيس ورقي داخل كرتونة 4.5 كجم",
          "specs": "مستوى بريكس مرتفع، قطر الحبة 18-22 مم+",
          "icon": "🍇",
          "category": "فواكه"
        },
        {
          "id": "artichoke",
          "name": "خرشوف مصري",
          "variety": "خرشوف فرنساوي، خرشوف بلدي",
          "season": "نوفمبر — مايو",
          "pack": "براميل حفظ غذائية، كراتين مبردة، أكياس مجهزة",
          "specs": "أحجام كاليبر: 50، 60 و 55 مم نخب أول",
          "icon": "🌱",
          "category": "خضروات"
        }
      ]
    },
    "aboutPage": {
      "title": "عن شركة Agri Port لتصدير الحاصلات الزراعية",
      "subtitle": "نصدر أفضل ما تجود به الأراضي الزراعية المصرية إلى كبرى الأسواق الأوروبية والعالمية.",
      "description": "تعتبر Agri Port بوابتك الرئيسية وشريكك الاستراتيجي في مصر لتوريد وتصدير الخضروات والفواكه الطازجة. نمتلك شبكة توريد وثيقة مع محطات فرز وتعبئة إلكترونية وسلسلة تبريد حديثة تضمن تسليم الشحنات وفق أشد اشتراطات السلامة والجودة العالمية (Global G.A.P, ISO, BRC).",
      "pillars": [
        {
          "icon": "🌍",
          "title": "تصدير إلى أكثر من 25 سوقاً",
          "desc": "شحنات منتظمة إلى إسبانيا، إيطاليا، فرنسا، ألمانيا، المملكة المتحدة، دول الخليج، وأفريقيا."
        },
        {
          "icon": "🏆",
          "title": "معايير جودة ورقابة صارمة",
          "desc": "فحص دوري للمتبقيات الكيميائية وتدريج قياسي بالألوان والأحجام لتلبية لوائح الاتحاد الأوروبي."
        },
        {
          "icon": "⚡",
          "title": "سلسلة تبريد وشحن سريع",
          "desc": "شحن بحري عبر حاويات مبردة (Reefer Containers) وشحن جوي سريع من موانئ الإسكندرية ودمياط وبورسعيد ومطار القاهرة."
        }
      ]
    },
    "contactPage": {
      "title": "تواصل معنا واطلب عرض سعر",
      "description": "نرحب بجميع استفسارات وطلبات التعاقد من المستوردين والشركات حول العالم. تواصل معنا للحصول على أسعار فورية وشروط تسليم تنافسية.",
      "directTitle": "بيانات التواصل المباشر",
      "directDesc": "يمكنك التحدث مباشرة مع مسؤولي المبيعات والشحن الدولي على مدار الساعة:",
      "emailLabel": "البريد الإلكتروني التجاري",
      "phoneLabel": "الهاتف وواتساب التصدير",
      "locationLabel": "المقر الرئيسي",
      "locationValue": "جمهورية مصر العربية — محافظة البحيرة / كفر الدوار",
      "formTitle": "طلب عرض سعر أو صفقة توريد",
      "formDesc": "املأ بيانات الشحنة المطلوبة وسيقوم فريق التصدير بالرد عليك خلال ساعات:",
      "fields": {
        "name": "اسم المسؤول",
        "namePlaceholder": "مثال: م. أحمد أو Mr. Marco Rossi أو Sr. Carlos",
        "company": "اسم شركة الاستيراد",
        "companyPlaceholder": "اسم شركتك أو مؤسستك",
        "country": "دولة الاستيراد",
        "countryPlaceholder": "إسبانيا، إيطاليا، فرنسا، ألمانيا، السعودية...",
        "email": "البريد الإلكتروني",
        "emailPlaceholder": "importer@company.com",
        "phone": "رقم الهاتف / واتساب",
        "phonePlaceholder": "+34 600 000 000",
        "product": "المحصول المطلوب",
        "productPlaceholder": "برتقال فالنسيا، بصل، فراولة، رمان...",
        "quantity": "الكمية التقديرية",
        "quantityPlaceholder": "مثال: 5 حاويات (120 طن) أو شحنة تجريبية",
        "incoterms": "شروط الشحن (Incoterms)",
        "destinationPort": "ميناء الوصول",
        "destinationPortPlaceholder": "مثال: Port of Valencia, Barcelona, Genoa, Marseille...",
        "message": "ملاحظات ومواصفات إضافية",
        "messagePlaceholder": "أحجام الكاليبر، تفاصيل التعبئة، التوقيت المفضل للشحن...",
        "submitBtn": "إرسال طلب التسعير والتعاقد",
        "successMsg": "تم استلام طلبك بنجاح! سيتواصل معك فريق التصدير في أقرب وقت.",
        "submitAnotherBtn": "إرسال طلب استفسار آخر",
        "submittingBtn": "جاري إرسال الطلب..."
      },
      "selectedCropBadge": "محصول محدد لطلب التسعير",
      "clearSelection": "إلغاء التحديد"
    },
    "footer": {
      "rights": "جميع الحقوق محفوظة",
      "subtext": "بوابة تصدير الخضروات والفواكه الطازجة من مصر إلى موانئ العالم",
      "ctaTitle": "جاهز لتطوير وتأمين سلسلة التوريد الخاصة بك؟",
      "ctaDesc": "تواصل مع فريق المبيعات والتصدير لمناقشة الكميات، اللوجستيات، وتأمين عقود توريد موثوقة لمؤسستك.",
      "emailPlaceholder": "name@company.com",
      "btnContact": "تواصل معنا",
      "colPlatform": "المنصة والتصدير",
      "linkProducts": "كتالوج المنتجات",
      "linkColdChain": "بنية سلسلة التبريد",
      "linkCertifications": "الشهادات والاعتمادات",
      "colCompany": "الشركة",
      "linkAbout": "عن AgriPort",
      "linkFarms": "المزارع الشريكة",
      "linkLegal": "الشروط والتجارة الدولية"
    },
    "facilitiesPage": {
          "title": "مرافق التصدير ومحطات التعبئة والمزارع",
          "subtitle": "بنية تحتية متطورة تدمج أحدث خطوط الفرز البصري الإلكتروني، محطات التعبئة المعتمدة، وسلسلة التبريد السريع من الحقل حتى ميناء الوصول.",
          "badge": "مرافقنا التصديرية",
          "stats": {
                "stations": "محطات تعبئة مركزية",
                "stationsVal": "4 محطات معتمدة",
                "farms": "مزارع تصديرية تحت إشرافنا",
                "farmsVal": "+500 فدان",
                "coldChain": "سلسلة تبريد متواصلة",
                "coldChainVal": "100% ضبط حراري",
                "capacity": "طاقة فرز وتعبئة يومية",
                "capacityVal": "+200 طن/يوم"
          },
          "videoBadge": "جولة فيديو توثيقية حية",
          "videoTitle": "شاهد بالفيديو: خطوات الفرز الآلي والتعبئة وسلسلة التبريد",
          "videoDesc": "تقنيات متقدمة للفرز الإلكتروني بحسب الحجم واللون ونسبة السكر، ومعالجة المحصول وحفظه في أقصى درجات النضارة للأسواق العالمية.",
          "videoPlayBtn": "تشغيل الجولة المصورة",
          "videoDuration": "فيديو توثيقي • 02:45 دقيقة",
          "filterAll": "الكل",
          "filterStations": "محطات الفرز والتعبئة",
          "filterFarms": "المزارع والبساتين",
          "filterColdChain": "سلسلة التبريد والشحن",
          "filterLab": "مختبرات الجودة والفحص",
          "items": [
                {
                      "id": "citrus-packhouse",
                      "category": "stations",
                      "badge": "محطة التعبئة المركزية",
                      "title": "خط الفرز البصري الآلي للموالح والبرتقال",
                      "desc": "كاميرات ثلاثية الأبعاد لفحص وتصنيف البرتقال والليمون بدقة وفق الحجم، اللون، ومستوى السكر، مع استبعاد أي ثمار غير مطابقة آلياً.",
                      "specs": "طاقة فرز: 150 طن/يوم • معايرات كاليبر إلكترونية • معتمد EU",
                      "image": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1200&q=80",
                      "tag": "فرز إلكتروني"
                },
                {
                      "id": "citrus-orchards",
                      "category": "farms",
                      "badge": "مزارع نموذجية",
                      "title": "بساتين ومزارع الموالح والبرتقال التصديرية",
                      "desc": "إدارة زراعية متكاملة بنظام الري بالتنقيط الحديث ومكافحة حيوية للمحصول لضمان خلوه التام من متبقيات المبيدات قبل الحصاد.",
                      "specs": "+250 فدان موالح • محافظة البحيرة والنوبارية • Global G.A.P",
                      "image": "https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=1200&q=80",
                      "tag": "مزارع معتمدة"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "سلسلة التبريد السريع",
                      "title": "غرف التبريد الأولي (Pre-Cooling) وسلسلة الحفظ",
                      "desc": "تخفيض درجة حرارة المحصول مباشرة بعد الحصاد خلال ساعتين لمنع تنفس الثمار والحفاظ على صلابتها ونضارتها حتى وصولها للمستورد.",
                      "specs": "تحكم حراري 0-4°C • رطوبة نسبية 90-95% • حساسات IoT",
                      "image": "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
                      "tag": "تبريد سريع"
                },
                {
                      "id": "onions-potatoes-plant",
                      "category": "stations",
                      "badge": "محطة المحاصيل الدرنية",
                      "title": "خطوط تنظيف وفرز وتعبئة البصل والبطاطس",
                      "desc": "خطوط متطورة لتنظيف وتجفيف البصل والبطاطس وتعبئتها في شكاير شبكية 10 و 25 كجم أو أكياس جامبو 1 طن مجهزة للشحن البحري.",
                      "specs": "طاقة تعبئة 80 طن/يوم • أحجام كاليبر 40/60 حتى 80/100 مم",
                      "image": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80",
                      "tag": "تعبئة بحرية"
                },
                {
                      "id": "strawberry-farms",
                      "category": "farms",
                      "badge": "حقول الفراولة",
                      "title": "حقول الفراولة المغطاة والقطاف اليدوي الفاخر",
                      "desc": "قطاف يومي باكر وتعبئة فورية في بانيتات 250 جم داخل كراتين مبردة ونقلها للشحن الجوي السريع في أقل من 24 ساعة.",
                      "specs": "شحن جوي يومي سريع • أصناف فورتونا وفستيفال • متبقيات صفرية",
                      "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
                      "tag": "شحن جوي"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "رقابة الجودة والمختبرات",
                      "title": "مختبر الفحص الزراعي ومعايير متبقيات المبيدات (MRLs)",
                      "desc": "فحص دوري لكل شحنة للتأكد من نسب البريكس ومطابقة اشتراطات الاتحاد الأوروبي والدول المستوردة وإصدار شهادات الفحص.",
                      "specs": "فحص مخبري معتمد • فحص بريكس ورطوبة ومتبقيات • شهادات ISO 22000",
                      "image": "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
                      "tag": "فحص مخبري"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "اللوجستيات والشحن",
                      "title": "أرصفة تحميل الحاويات المبردة لموانئ الإسكندرية ودمياط",
                      "desc": "أرصفة تحميل مبردة ومغلقة تماماً مع أجهزة تسجيل حراري (Data Loggers) رقمية تتابع درجة الحرارة لحظياً حتى وصول الشحنة لميناء الوجهة.",
                      "specs": "تحميل 10+ حاويات مبردة يومياً • أجهزة تتبع رقمي حراري",
                      "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
                      "tag": "أرصفة مبردة"
                },
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "محطة الخضار المتخصصة",
                      "title": "وحدة تجهيز وتعبئة الخرشوف والبراميل الغذائية",
                      "desc": "معالجة وفرز رؤوس الخرشوف الطازج وتعبئته في براميل غذائية مخصصة وكراتين مبردة للتصدير إلى أسواق إيطاليا وفرنسا وإسبانيا.",
                      "specs": "أحجام 50 و 55 و 60 مم • تعبئة براميل وكراتين مبردة",
                      "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80",
                      "tag": "تعبئة براميل"
                }
          ],
          "cta": {
                "title": "هل ترغب في جدولة زيارة ميدانية أو تفقد شحنتك؟",
                "desc": "نرحب بزيارة وكلائنا والمستوردين والشركات الدولية لمعاينة مزارعنا ومحطات التعبئة وحضور عمليات الفرز والشحن في مصر.",
                "visitBtn": "طلب حجز زيارة ميدانية",
                "quoteBtn": "طلب تسعير وشحنة فورية"
          }
    },
    "visitPage": {
          "badge": "برنامج زيارة المستوردين والوفود التجارية",
          "title": "حجز زيارة ميدانية لمزارعنا ومحطات التعبئة",
          "subtitle": "ندعو شركاءنا التجاريين والمستوردين لمعاينة دورة الإنتاج كاملة، من جمع المحاصيل حتى الفرز البصري والتعبئة وسلسلة التبريد قبل التعاقد والتحميل.",
          "highlightsTitle": "ماذا تتضمن الزيارة الميدانية؟",
          "highlightsSubtitle": "تجربة حية مصممة خصيصاً للمستوردين وسلاسل الإمداد العالمية لتقييم الجودة والكفاءة اللوجستية على أرض الواقع.",
          "highlights": [
                {
                      "icon": "🌱",
                      "title": "معاينة المزارع والقطاف",
                      "desc": "جولة حية في مزارع الحمضيات والخضروات للتحقق من الممارسات الزراعية ومعايير GlobalG.A.P وخلو المحصول من المتبقيات."
                },
                {
                      "icon": "🔬",
                      "title": "خطوط الفرز البصري والمختبر",
                      "desc": "حضور جلسات المعايرة الإلكترونية بالأوزان والألوان واختبارات نسبة السكر (Brix) وفحص الجودة بمختبرات المحطة."
                },
                {
                      "icon": "❄️",
                      "title": "سلسلة التبريد والتحميل",
                      "desc": "تفقد غرف التبريد السريع (Pre-cooling) وأرصفة تحميل الحاويات المبردة المزودة بمسجلات الحرارة والرطوبة."
                },
                {
                      "icon": "🤝",
                      "title": "جلسة التعاقد والجدولة",
                      "desc": "اجتماع مباشر مع إدارة التصدير واللوجستيات لضبط المواصفات الخاصة والشروط اللوجستية (FOB/CIF) وجداول الشحن."
                }
          ],
          "vipServicesTitle": "خدمات الضيافة واللوجستيات لضيوفنا",
          "vipServices": [
                {
                      "icon": "✈️",
                      "title": "استقبال وتوصيل خاص",
                      "desc": "استقبال من مطار القاهرة الدولي أو مطار برج العرب بسيارة خاصة وتنسيق الإقامة الفندقية طوال فترة الزيارة."
                },
                {
                      "icon": "🌐",
                      "title": "فريق متعدد اللغات",
                      "desc": "مرافقة مستشارين فنيين ومسؤولي تصدير يتحدثون الإنجليزية والفرنسية والإسبانية والإيطالية بطلاقة."
                },
                {
                      "icon": "📋",
                      "title": "عينات واعتماد فوري",
                      "desc": "إمكانية أخذ عينات عشوائية واعتماد مواصفات التعبئة والكرتون وطباعة الملصقات مباشرة في المحطة."
                }
          ],
          "form": {
                "title": "نموذج تنسيق وجدولة الزيارة",
                "desc": "يرجى تعبئة بيانات الوفد والمرافق المراد تفقدها، وسيقوم منسق الزيارات الدولية بالتواصل معكم لتأكيد البرنامج وجدول المواعيد.",
                "badge": "تنسيق مخصص للشركات والمستوردين",
                "fields": {
                      "fullName": "اسم رئيس الوفد / الزائر الرئيسي",
                      "fullNamePlaceholder": "مثال: م. أحمد سالم",
                      "company": "اسم الشركة المستوردة",
                      "companyPlaceholder": "مثال: Global Agri Imports Ltd",
                      "country": "الدولة ومقر العمل",
                      "countryPlaceholder": "مثال: المملكة المتحدة، ألمانيا، روسيا، هولندا...",
                      "email": "البريد الإلكتروني للعمل",
                      "emailPlaceholder": "name@company.com",
                      "phone": "رقم الهاتف / واتساب (مع كود الدولة)",
                      "phonePlaceholder": "+20 100 000 0000",
                      "visitDate": "تاريخ الزيارة المقترح",
                      "visitDateHelp": "يرجى اختيار تاريخ قبل 3 أيام على الأقل للتنسيق اللوجستي",
                      "visitorsCount": "عدد أفراد الوفد",
                      "visitorsCountPlaceholder": "اختر عدد الأفراد",
                      "visitorsCountOptions": {
                            "one": "1 شخص (مشتري / ممثل شركة)",
                            "two": "شخصان (2)",
                            "threeToFive": "3 إلى 5 أشخاص (وفد فني وتجاري)",
                            "sixPlus": "أكثر من 5 أشخاص (وفد رسمي)"
                      },
                      "facilitiesTitle": "المرافق والمحطات المراد تفقدها",
                      "facilitiesHelp": "يمكنك تحديد أكثر من محطة أو مرفق وفقاً لاهتمامكم التجاري",
                      "facilitiesList": {
                            "citrus": "محطة فرز وتعبئة الموالح الإلكترونية (البرتقال، الليمون، اليوسفي)",
                            "onionPotato": "محطة معالجة وفرز البصل والبطاطس والثوم",
                            "farms": "المزارع الشريكة والحقول المفتوحة ومزارع الفراولة والرمان",
                            "coldChain": "غرف التبريد السريع وأرصفة الشحن المبرد (Reefer Docks)",
                            "qualityLab": "مختبر مراقبة الجودة وتحليل المتبقيات ومعايرة الأحجام"
                      },
                      "targetCrops": "المحاصيل الزراعية المستهدفة للاستيراد",
                      "targetCropsPlaceholder": "مثال: برتقال صيفي، بصل ذهبي، ثوم طازج، فراولة، خرشوف...",
                      "airportTransfer": "الترتيبات اللوجستية",
                      "airportTransferLabel": "نعم، نطلب تنسيق الاستقبال من المطار والتنقلات الداخلية بسيارة خاصة",
                      "notes": "متطلبات أو ملاحظات إضافية",
                      "notesPlaceholder": "أي مواعيد رحلات طيران، تفضيلات لغوية خاصة، أو استفسارات فنية تودون مناقشتها...",
                      "submitBtn": "تأكيد وإرسال طلب حجز الزيارة",
                      "submitting": "جاري حفظ وتنسيق الزيارة..."
                },
                "success": {
                      "title": "تم استلام طلب حجز الزيارة بنجاح!",
                      "desc": "شكراً لاهتمامكم بالتعامل معنا. تم تسجيل طلبكم وتوجيهه إلى قسم العلاقات الدولية وبروتوكول الزيارات.",
                      "summaryLead": "ملخص طلب الزيارة المقدم:",
                      "dateLabel": "التاريخ المقترح:",
                      "visitorsLabel": "حجم الوفد:",
                      "facilitiesLabel": "المرافق المحددة:",
                      "anotherBtn": "حجز زيارة جديدة",
                      "whatsappSupport": "للتنسيق الفوري والمتابعة المباشرة عبر واتساب:"
                }
          },
          "contactBox": {
                "title": "التنسيق السريع والمباشر",
                "desc": "إذا كنت متواجداً في مصر أو ترغب في تنسيق عاجل خلال أقل من 24 ساعة، يمكنك التحدث مباشرة مع مسؤول العلاقات والزيارات الدولية.",
                "whatsappBtn": "محادثة مباشرة مع منسق الزيارات",
                "locationLabel": "المقر الرئيسي للمحطات",
                "locationValue": "طريق مصر الإسكندرية الصحراوي / الدلتا - مصر",
                "hoursLabel": "أوقات استقبال الوفود",
                "hoursValue": "السبت - الخميس: 8:00 صباحاً - 5:00 مساءً",
                "hotlineLabel": "خط الزيارات الدولية السريع"
          }
    },
    "farmsPage": {
      "title": "المزارع وسلسلة التوريد",
      "description": "نظرة عامة على شبكة مزارعنا الشريكة ومناطق الإنتاج الزراعي في دلتا ووادي النيل بمصر.",
      "activeStatus": "نشطة",
      "monitoringStatus": "قيد المتابعة",
      "feddanUnit": "فدان",
      "farmsList": [
        {
          "id": "1",
          "name": "مزرعة الدلتا",
          "location": "محافظة كفر الشيخ",
          "crop": "خضروات وبصل",
          "areaFeddan": 12,
          "status": "نشطة"
        },
        {
          "id": "2",
          "name": "مزرعة النيل ومصر الوسطى",
          "location": "محافظة المنيا",
          "crop": "موالح وفاكهة",
          "areaFeddan": 8.5,
          "status": "نشطة"
        },
        {
          "id": "3",
          "name": "مزرعة وادي النطرون",
          "location": "محافظة البحيرة",
          "crop": "عنب وفراولة",
          "areaFeddan": 15,
          "status": "نشطة"
        },
        {
          "id": "4",
          "name": "مزرعة النوبارية",
          "location": "النوبارية",
          "crop": "برتقال فالنسيا وبطاطس",
          "areaFeddan": 22,
          "status": "نشطة"
        }
      ]
    },
    "irrigationPage": {
      "title": "إدارة الري والترشيد المائي",
      "description": "متابعة كفاءة استهلاك المياه وأنظمة الري الحديثة والمستدامة في مزارعنا الشريكة.",
      "nextIrrigation": "الري القادم:",
      "waterConsumption": "استهلاك المياه:",
      "litersUnit": "لتر",
      "records": [
        {
          "id": "1",
          "farmName": "مزرعة الدلتا",
          "nextIrrigation": "اليوم 6:00 م",
          "waterUsedLiters": 12500
        },
        {
          "id": "2",
          "farmName": "مزرعة النيل",
          "nextIrrigation": "غداً 5:30 ص",
          "waterUsedLiters": 8200
        }
      ]
    }
  },
  "en": {
    "brandName": "AgriPort",
    "brandSubtitle": "Fresh Produce Export Gateway",
    "tagline": "Exporting Premium Fresh Fruits & Vegetables to Global Markets",
    "nav": {
      "home": "Home",
      "products": "Products",
      "facilities": "Facilities",
      "capabilities": "Facilities",
      "company": "Company",
      "about": "About Us",
      "contact": "Contact Us",
      "contactSales": "Contact Sales"
    },
    "cta": "Request a Quote",
    "language": "Language",
    "trust": {
      "standards": "Certified by global standards"
    },
    "hero": {
      "pillTag": "Announcing 2026 Harvest Season",
      "headlineMain": "Global Agriculture,",
      "headlineSub": "Delivered with Precision.",
      "leadParagraph": "The infrastructure for international produce trade. We source, process, and ship premium crops with unparalleled logistical efficiency.",
      "btnPrimary": "Start Sourcing",
      "btnSecondary": "Explore Catalog",
      "badge": "Certified Global Agricultural Export | Fresh Egyptian Harvest",
      "titlePart1": "Exporting Premium",
      "titleHighlight": "Fresh Fruits & Vegetables",
      "titlePart2": "from Egypt to Leading World Ports",
      "subtitle": "Your trusted partner for supplying and exporting premium crops (citrus, onions, garlic, strawberries, pomegranates, grapes, potatoes) with advanced optical grading, uninterrupted cold chain, and international freight.",
      "browseCatalog": "Browse Produce Catalog",
      "requestDeals": "Request Quote & Shipments",
      "stats": {
        "countries": {
          "value": "+25",
          "label": "Importing Countries"
        },
        "standards": {
          "value": "100%",
          "label": "EU Standards Compliant"
        },
        "coldChain": {
          "value": "Cold Chain",
          "label": "Continuous Freshness"
        },
        "terms": {
          "value": "FOB & CIF",
          "label": "Flexible Delivery Terms"
        }
      }
    },
    "bento": {
      "title": "Engineered for quality at scale.",
      "subtitle": "A streamlined catalog of export-grade produce, backed by modern cold-chain infrastructure.",
      "card1Tag": "Premium Yield",
      "card1Title": "Citrus Exports",
      "card1Desc": "Class A Egyptian Oranges & Lemons.",
      "card2Title": "Cold Chain Integrity",
      "card2Desc": "End-to-end temperature control ensuring zero degradation from farm to destination port.",
      "card3Title": "Root Crops",
      "card3Desc": "Export-Grade Potatoes",
      "card4Title": "Custom Sourcing Hub",
      "card4Desc": "Don't see your required crop? Leverage our API-driven partner network to source specific volumes directly from certified growers.",
      "card4Cta": "Request custom order"
    },
    "features": {
      "sectionTitlePre": "Why Leading Importers Choose",
      "sectionTitleHighlight": "Agri Port",
      "sectionTitlePost": "?",
      "sectionSubtitle": "We guarantee fresh produce matching 100% of agreed export specifications with total supply chain reliability.",
      "moreDetails": "Explore Details",
      "items": [
        {
          "icon": "🍊",
          "title": "Fresh Fruits & Vegetables Catalog",
          "body": "Valencia & Navel oranges, red & golden onions, fresh garlic, strawberries, pomegranates, and potatoes sorted to international market calibers.",
          "badge": "Fresh & Graded"
        },
        {
          "icon": "📦",
          "title": "Packhouses & Cold Chain Management",
          "body": "High-tech optical sorting lines, pre-cooling, and heavy-duty refrigerated carton packaging preserving produce crispness up to discharge ports.",
          "badge": "Certified Packing"
        },
        {
          "icon": "🤝",
          "title": "B2B Supply Contracts & Logistics",
          "body": "Flexible import agreements, scheduled sea/air shipments, Phytosanitary certificates, and authentic Certificates of Origin.",
          "badge": "For Global Importers"
        }
      ]
    },
    "productsPage": {
      "title": "Export Produce Catalog",
      "description": "A premium selection of Egyptian fresh agricultural produce prepared for international export under rigorous Global G.A.P, ISO, and phytosanitary certifications.",
      "statusTitle": "Premier Crops Available for International Export",
      "statusDesc": "Carefully harvested, graded, and packed to satisfy the strict requirements of European, British, and global wholesale markets:",
      "seasonLabel": "Export Season",
      "packagingLabel": "Packaging Types",
      "specsLabel": "Calibers & Specifications",
      "requestQuoteBtn": "Inquire About This Crop",
      "productsList": [
        {
          "id": "citrus",
          "name": "Egyptian Citrus & Oranges",
          "variety": "Valencia Oranges, Navel Oranges, Fresh Lemons, Mandarins",
          "season": "November — May",
          "pack": "15 kg Telescopic Cartons, Open Top Cartons, Net Bags",
          "specs": "Calibers: 40, 48, 56, 64, 72, 80, 88",
          "icon": "🍊",
          "category": "Citrus"
        },
        {
          "id": "onions",
          "name": "Egyptian Fresh Onions (Red & Golden)",
          "variety": "Red Italian Onions, Golden Dry-Cured Onions",
          "season": "February — August",
          "pack": "10 kg & 25 kg Mesh Bags, 1-Ton Jumbo Bags",
          "specs": "Sizes: 40/60 mm, 50/70 mm, 70/90 mm, 80/100 mm",
          "icon": "🧅",
          "category": "Vegetables"
        },
        {
          "id": "strawberries",
          "name": "Fresh Sweet Strawberries",
          "variety": "Fortuna, Festival, Sensation",
          "season": "November — March",
          "pack": "250g Punnets inside 2 kg and 2.5 kg Flat Cartons",
          "specs": "Direct refrigerated air cargo, zero-residue protocols",
          "icon": "🍓",
          "category": "Fruits"
        },
        {
          "id": "pomegranates",
          "name": "Wonderful Pomegranates",
          "variety": "Deep Red Wonderful Variety, High Brix & Sweetness",
          "season": "September — December",
          "pack": "4.5 kg & 5.0 kg Cartons (punnets or open flats)",
          "specs": "Counts: 6, 7, 8, 9, 10, 12, 14 fruits per carton",
          "icon": "🍎",
          "category": "Fruits"
        },
        {
          "id": "potatoes",
          "name": "Fresh Table & Processing Potatoes",
          "variety": "Spunta, Mondial, Lady Rosetta, Cara",
          "season": "January — June",
          "pack": "10 kg, 25 kg Mesh Polybags, 1250 kg Jumbo Bags",
          "specs": "Washed & dry-brushed, sizes 35/55 mm and 55+ mm",
          "icon": "🥔",
          "category": "Vegetables"
        },
        {
          "id": "grapes",
          "name": "Fresh Seedless Grapes",
          "variety": "Early Sweet, Superior, Flame Seedless, Crimson",
          "season": "May — August",
          "pack": "500g Punnets or Carry Bags in 4.5 kg Cartons",
          "specs": "High Brix sugar level, berry diameter 18-22 mm+",
          "icon": "🍇",
          "category": "Fruits"
        },
        {
          "id": "artichoke",
          "name": "Egyptian Fresh Artichokes",
          "variety": "French Artichoke, Baladi Variety",
          "season": "November — May",
          "pack": "Food-Grade Export Drums, Chilled Cartons, Prepared Packs",
          "specs": "Calibers & Sizes: 50, 55, 60 mm Grade A",
          "icon": "🌱",
          "category": "Vegetables"
        }
      ]
    },
    "aboutPage": {
      "title": "About Agri Port — Agricultural Export",
      "subtitle": "Exporting the prime harvest from Egyptian soils to leading European, British, and international markets.",
      "description": "Agri Port is your primary gateway and trusted Egyptian partner for fresh fruit and vegetable exports. Operating certified packing stations, electronic sorting systems, and an integrated cold chain, we guarantee consignments arrive at discharge ports in peak condition, satisfying all European (Global G.A.P, ISO, BRC) standards.",
      "pillars": [
        {
          "icon": "🌍",
          "title": "Exporting to 25+ Global Markets",
          "desc": "Consistent refrigerated shipments to Spain, Italy, France, Germany, the United Kingdom, GCC countries, and Africa."
        },
        {
          "icon": "🏆",
          "title": "Rigorous Quality Assurance",
          "desc": "Continuous laboratory pesticide residue testing, uniform optical color grading, and EU-compliant sanitary measures."
        },
        {
          "icon": "⚡",
          "title": "Unbroken Cold Chain & Prompt Logistics",
          "desc": "Reefer container sea freight and rapid air cargo departures from Alexandria, Damietta, Port Said, and Cairo International Airport."
        }
      ]
    },
    "contactPage": {
      "title": "Contact Us & Request a Quote",
      "description": "We welcome contracts, purchase orders, and inquiries from global fresh produce importers and supermarket distributors. Reach out for immediate FOB/CIF quotations.",
      "directTitle": "Direct Export Inquiries",
      "directDesc": "Speak directly with our international sales and export logistics desk:",
      "emailLabel": "Commercial Export Email",
      "phoneLabel": "Phone & WhatsApp Desk",
      "locationLabel": "Headquarters & Hubs",
      "locationValue": "Arab Republic of Egypt — Beheira Governorate / Kafr El-Dawar",
      "formTitle": "Request a Shipment Quote or Deal",
      "formDesc": "Submit your target produce parameters below and our export team will respond within hours with full pricing and shipping schedules:",
      "fields": {
        "name": "Contact Name",
        "namePlaceholder": "e.g. Mr. Marco Rossi or Carlos Martínez",
        "company": "Company / Import Business",
        "companyPlaceholder": "Your company name",
        "country": "Destination Country",
        "countryPlaceholder": "Spain, Italy, France, Germany, UK, UAE...",
        "email": "Business Email",
        "emailPlaceholder": "importer@company.com",
        "phone": "Phone / WhatsApp",
        "phonePlaceholder": "+34 600 000 000",
        "product": "Target Crop",
        "productPlaceholder": "Valencia Oranges, Red Onions, Strawberries...",
        "quantity": "Estimated Volume",
        "quantityPlaceholder": "e.g. 5 Reefer Containers (120 MT) or trial order",
        "incoterms": "Incoterms Preference",
        "destinationPort": "Discharge Port",
        "destinationPortPlaceholder": "e.g. Port of Valencia, Barcelona, Genoa, Marseille, Rotterdam...",
        "message": "Specifications & Additional Notes",
        "messagePlaceholder": "Caliber sizing, packaging specs, preferred shipping window...",
        "submitBtn": "Submit Quote & Deal Request",
        "successMsg": "Your inquiry has been received! Our export desk will contact you promptly.",
        "submitAnotherBtn": "Submit Another Inquiry",
        "submittingBtn": "Submitting..."
      },
      "selectedCropBadge": "Selected Crop for Quote",
      "clearSelection": "Clear selection"
    },
    "footer": {
      "rights": "All Rights Reserved",
      "subtext": "Fresh Produce Export Gateway from Egypt to Global Ports",
      "ctaTitle": "Ready to upgrade your supply chain?",
      "ctaDesc": "Contact our sales engineering team to discuss volumes, logistics, and establishing a secure B2B pipeline.",
      "emailPlaceholder": "name@company.com",
      "btnContact": "Contact Us",
      "colPlatform": "Platform",
      "linkProducts": "Products Catalog",
      "linkColdChain": "Cold Chain Infrastructure",
      "linkCertifications": "Certifications",
      "colCompany": "Company",
      "linkAbout": "About AgriPort",
      "linkFarms": "Partner Farms",
      "linkLegal": "Legal & Trade"
    },
    "facilitiesPage": {
          "title": "Export Facilities, Packing Stations & Farms",
          "subtitle": "Advanced export infrastructure integrating modern optical grading lines, certified packing houses, and rapid cold chain logistics from field to destination port.",
          "badge": "Our Facilities",
          "stats": {
                "stations": "Central Packing Stations",
                "stationsVal": "4 Certified Stations",
                "farms": "Supervised Export Farmlands",
                "farmsVal": "+500 Feddans",
                "coldChain": "Unbroken Cold Chain",
                "coldChainVal": "100% Climate Controlled",
                "capacity": "Daily Sorting Capacity",
                "capacityVal": "+200 Tons / Day"
          },
          "videoBadge": "Live Documentary Video",
          "videoTitle": "Watch Live: Automated Sorting, Packing & Cold Chain in Action",
          "videoDesc": "Cutting-edge electronic sorting calibrated by size, color, and sugar level, handling premium harvests to preserve peak freshness for global markets.",
          "videoPlayBtn": "Watch Facility Tour",
          "videoDuration": "Documentary Tour • 02:45 min",
          "filterAll": "All Facilities",
          "filterStations": "Packing Stations",
          "filterFarms": "Farms & Orchards",
          "filterColdChain": "Cold Chain & Logistics",
          "filterLab": "Quality & Testing Labs",
          "items": [
                {
                      "id": "citrus-packhouse",
                      "category": "stations",
                      "badge": "Central Packing Facility",
                      "title": "Automated Optical Grading Line for Citrus & Oranges",
                      "desc": "High-speed 3D vision cameras inspect each orange and lemon for caliber, color grading, and brix density, ejecting non-compliant fruit automatically.",
                      "specs": "150 Tons / Day Capacity • Electronic Sizing • EU Compliant",
                      "image": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Optical Sorting"
                },
                {
                      "id": "citrus-orchards",
                      "category": "farms",
                      "badge": "Prime Export Orchards",
                      "title": "Valencia, Navel Orange & Fresh Lemon Groves",
                      "desc": "Integrated farm management featuring automated drip fertigation and biological crop protection, guaranteeing zero harmful pesticide residue.",
                      "specs": "+250 Feddans Citrus • Beheira & Nubariya • Global G.A.P",
                      "image": "https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Certified Farms"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "Rapid Cold Chain",
                      "title": "Rapid Pre-Cooling Chambers & Controlled Atmosphere",
                      "desc": "Fruit pulp temperature is reduced within 2 hours of harvest to arrest respiration, locking in maximum firmness and long transit shelf-life.",
                      "specs": "0–4°C Climate Control • 90–95% Relative Humidity • IoT Sensors",
                      "image": "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Rapid Pre-Cooling"
                },
                {
                      "id": "onions-potatoes-plant",
                      "category": "stations",
                      "badge": "Root Crop Processing Plant",
                      "title": "Onion & Potato Brushing, Grading & Bagging Lines",
                      "desc": "Advanced mechanical screening and curing lines preparing export onions and potatoes in 10/25 kg mesh sacks and 1-ton jumbo export bags.",
                      "specs": "80 Tons / Day Capacity • Accurate Calibers 40/60 to 80/100 mm",
                      "image": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Maritime Export"
                },
                {
                      "id": "strawberry-farms",
                      "category": "farms",
                      "badge": "Covered Strawberry Fields",
                      "title": "Protected Strawberry Tunnels & Delicate Hand Picking",
                      "desc": "Early morning hand harvesting into 250g clamshells and chilled cartons, dispatched for air cargo freight within under 24 hours of picking.",
                      "specs": "Daily Air Freight Flights • Fortuna & Festival • Zero Residues",
                      "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Air Cargo Fresh"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "Quality Control & Lab",
                      "title": "In-House Agricultural Quality & MRL Testing Lab",
                      "desc": "Systematic multi-point batch sampling verifying brix levels, sizing accuracy, and EU chemical residue limits with certified analysis certificates.",
                      "specs": "Accredited Lab Testing • Brix & Residue Analysis • ISO 22000",
                      "image": "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Lab Tested"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "Logistics & Shipping Docks",
                      "title": "Enclosed Refrigerated Container Loading Bays",
                      "desc": "Sealed cold loading docks connected directly to Alexandria and Damietta ports, equipped with digital temperature data loggers tracking every nautical mile.",
                      "specs": "10+ Reefer Containers Daily • Digital Live Tracking Loggers",
                      "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Cold Docking"
                },
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "Specialty Crop Unit",
                      "title": "Artichoke Trimming & Food-Grade Drum Processing Unit",
                      "desc": "Hygiene-controlled trimming and grading lines for fresh artichokes packed into food-grade brine barrels and cartons for Italy, France, and Spain.",
                      "specs": "50, 55, 60 mm Sizing • Food-Grade Drums & Chilled Cartons",
                      "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Barrel Packing"
                }
          ],
          "cta": {
                "title": "Would you like to schedule an on-site visit or inspect your cargo?",
                "desc": "We warmly welcome our international import partners to tour our farms, inspect packing stations, and oversee sorting and loading live in Egypt.",
                "visitBtn": "Schedule a Facility Visit",
                "quoteBtn": "Request Quote & Shipment"
          }
    },
    "visitPage": {
          "badge": "Importers & Commercial Delegations Tour",
          "title": "Book a Field & Packing Station Visit",
          "subtitle": "We welcome commercial partners and importers to inspect our full supply chain—from harvest to electronic optical sorting, packing, and certified cold chain reefer loading.",
          "highlightsTitle": "What Does the On-Site Visit Include?",
          "highlightsSubtitle": "A tailored live experience designed for international importers and food retailers to evaluate product quality and logistics capacity firsthand.",
          "highlights": [
                {
                      "icon": "🌱",
                      "title": "Farm & Harvest Inspection",
                      "desc": "Live walkthrough of citrus groves and vegetable acreage verifying GlobalG.A.P. compliance, crop health, and zero-residue management."
                },
                {
                      "icon": "🔬",
                      "title": "Optical Grading & QA Lab",
                      "desc": "Witness computer-vision optical weight/color calibration lines, Brix sugar content refractometry, and internal QA testing."
                },
                {
                      "icon": "❄️",
                      "title": "Cold Chain & Reefer Loading",
                      "desc": "Tour rapid pre-cooling chambers and seal-docked refrigerated container loading bays equipped with continuous temperature loggers."
                },
                {
                      "icon": "🤝",
                      "title": "Commercial Planning Session",
                      "desc": "Direct meetings with export directors and logistics heads to lock in customized packaging, Incoterms (FOB/CIF), and seasonal volume allocations."
                }
          ],
          "vipServicesTitle": "VIP Hospitality & Support for Visiting Guests",
          "vipServices": [
                {
                      "icon": "✈️",
                      "title": "Private Airport Transfers",
                      "desc": "Dedicated pickup from Cairo International Airport (CAI) or Borg El Arab (HBE) and accommodation arrangements."
                },
                {
                      "icon": "🌐",
                      "title": "Multilingual Technical Hosts",
                      "desc": "Accompaniment by export managers fluent in English, French, Spanish, and Italian throughout your tour."
                },
                {
                      "icon": "📋",
                      "title": "On-Site Sampling & Approvals",
                      "desc": "Immediate sampling, customized carton label proofing, and packaging mockups verified right at the sorting station."
                }
          ],
          "form": {
                "title": "Delegation Visit Booking Form",
                "desc": "Please enter your delegation details and facilities of interest. Our International Relations protocol manager will reach out within 24 hours to confirm itinerary.",
                "badge": "Dedicated to Importers & Wholesalers",
                "fields": {
                      "fullName": "Lead Visitor / Representative Name",
                      "fullNamePlaceholder": "e.g. John Doe / Maria Rossi",
                      "company": "Company / Importing Entity",
                      "companyPlaceholder": "e.g. Global Fresh Direct Ltd",
                      "country": "Country / Operating Market",
                      "countryPlaceholder": "e.g. United Kingdom, Germany, Netherlands, UAE...",
                      "email": "Official Business Email",
                      "emailPlaceholder": "name@company.com",
                      "phone": "Phone / WhatsApp (with country code)",
                      "phonePlaceholder": "+44 7000 000000",
                      "visitDate": "Preferred Visit Date",
                      "visitDateHelp": "Please allow at least 3 business days for security clearance and logistics coordination",
                      "visitorsCount": "Delegation Size",
                      "visitorsCountPlaceholder": "Select number of visitors",
                      "visitorsCountOptions": {
                            "one": "1 Person (Buyer / Executive)",
                            "two": "2 Persons",
                            "threeToFive": "3 to 5 Persons (Commercial & QC Team)",
                            "sixPlus": "6+ Persons (Official Trade Delegation)"
                      },
                      "facilitiesTitle": "Facilities & Units to Inspect",
                      "facilitiesHelp": "Select one or more facilities according to your import focus",
                      "facilitiesList": {
                            "citrus": "Citrus Electronic Optical Sorting & Packing Plant (Valencia, Mandarins, Lemons)",
                            "onionPotato": "Onion, Potato & Fresh Garlic Processing & Sizing Plant",
                            "farms": "Partner Farms, Open-Field Groves & Strawberry Cultivations",
                            "coldChain": "Rapid Pre-Cooling Chambers & Sealed Reefer Loading Docks",
                            "qualityLab": "Quality Control Laboratory, Residue Testing & Calibration Center"
                      },
                      "targetCrops": "Target Crops of Interest for Import",
                      "targetCropsPlaceholder": "e.g. Valencia Oranges, Golden Onions, Fresh Garlic, Strawberries, Artichokes...",
                      "airportTransfer": "Logistics & Transport Assistance",
                      "airportTransferLabel": "Yes, please coordinate airport pickup and private ground transportation",
                      "notes": "Special Requests & Technical Requirements",
                      "notesPlaceholder": "Flight itineraries, language preferences, or specific product calibrations to prepare...",
                      "submitBtn": "Confirm & Book Facility Visit",
                      "submitting": "Submitting Visit Reservation..."
                },
                "success": {
                      "title": "Visit Request Submitted Successfully!",
                      "desc": "Thank you for scheduling a visit. Your request has been routed to our International Relations team.",
                      "summaryLead": "Delegation Request Summary:",
                      "dateLabel": "Preferred Date:",
                      "visitorsLabel": "Delegation Size:",
                      "facilitiesLabel": "Selected Facilities:",
                      "anotherBtn": "Book Another Tour",
                      "whatsappSupport": "For immediate VIP coordination or urgent travel schedules, chat on WhatsApp:"
                }
          },
          "contactBox": {
                "title": "Direct VIP Visit Coordination",
                "desc": "Already in Egypt or traveling within 48 hours? Connect directly with our international delegations coordinator for express scheduling.",
                "whatsappBtn": "Chat with Visit Coordinator on WhatsApp",
                "locationLabel": "Central Hub Location",
                "locationValue": "Cairo - Alexandria Desert Road / Nile Delta, Egypt",
                "hoursLabel": "Delegation Visiting Hours",
                "hoursValue": "Saturday - Thursday: 8:00 AM - 5:00 PM (EET)",
                "hotlineLabel": "International Delegation Hotline"
          }
    },
    "farmsPage": {
      "title": "Farms & Sourcing Network",
      "description": "An overview of our partner farms and agricultural production clusters across the Nile Delta and valley in Egypt.",
      "activeStatus": "Active",
      "monitoringStatus": "In Monitoring",
      "feddanUnit": "Feddan",
      "farmsList": [
        {
          "id": "1",
          "name": "Delta Premier Farm",
          "location": "Kafr El-Sheikh Governorate",
          "crop": "Vegetables & Onions",
          "areaFeddan": 12,
          "status": "Active"
        },
        {
          "id": "2",
          "name": "Nile Valley Estate",
          "location": "Minya Governorate",
          "crop": "Citrus & Fruit",
          "areaFeddan": 8.5,
          "status": "Active"
        },
        {
          "id": "3",
          "name": "Wadi El-Natrun Groves",
          "location": "Beheira Governorate",
          "crop": "Grapes & Strawberries",
          "areaFeddan": 15,
          "status": "Active"
        },
        {
          "id": "4",
          "name": "Nubariya Estate Farm",
          "location": "Nubariya",
          "crop": "Valencia Oranges & Potatoes",
          "areaFeddan": 22,
          "status": "Active"
        }
      ]
    },
    "irrigationPage": {
      "title": "Irrigation & Water Stewardship",
      "description": "Monitoring precision irrigation efficiency and sustainable water consumption across our farm network.",
      "nextIrrigation": "Next Irrigation:",
      "waterConsumption": "Water Consumption:",
      "litersUnit": "Liters",
      "records": [
        {
          "id": "1",
          "farmName": "Delta Premier Farm",
          "nextIrrigation": "Today 6:00 PM",
          "waterUsedLiters": 12500
        },
        {
          "id": "2",
          "farmName": "Nile Valley Estate",
          "nextIrrigation": "Tomorrow 5:30 AM",
          "waterUsedLiters": 8200
        }
      ]
    }
  },
  "fr": {
    "brandName": "AgriPort",
    "brandSubtitle": "Portail Export Fruits & Légumes",
    "tagline": "Exportation de Fruits & Légumes Frais de Première Qualité vers les Marchés Mondiaux",
    "nav": {
      "home": "Accueil",
      "products": "Produits",
      "facilities": "Installations",
      "capabilities": "Installations",
      "company": "Entreprise",
      "about": "À Propos",
      "contact": "Contactez-nous",
      "contactSales": "Contacter les Ventes"
    },
    "cta": "Demander un Devis",
    "language": "Langue",
    "trust": {
      "standards": "Certifié selon les normes internationales"
    },
    "hero": {
      "pillTag": "Annonce de la saison des récoltes 2026",
      "headlineMain": "Agriculture Mondiale,",
      "headlineSub": "Livrée avec Précision.",
      "leadParagraph": "L'infrastructure pour le commerce international de produits frais. Nous approvisionnons, traitons et expédions des récoltes haut de gamme avec une efficacité logistique inégalée.",
      "btnPrimary": "Commencer l'approvisionnement",
      "btnSecondary": "Explorer le catalogue",
      "badge": "Exportation Agricole Certifiée | Récoltes Fraîches d'Égypte",
      "titlePart1": "Nous exportons les meilleurs",
      "titleHighlight": "Fruits & Légumes Frais",
      "titlePart2": "d'Égypte vers les grands ports mondiaux",
      "subtitle": "Votre partenaire de confiance pour la fourniture et l'exportation de cultures agricoles (agrumes, oignons, ail, fraises, grenades, raisins, pommes de terre) avec tri optique avancé, chaîne du froid ininterrompue et fret maritime & aérien.",
      "browseCatalog": "Consulter le Catalogue",
      "requestDeals": "Demander Devis & Expéditions",
      "stats": {
        "countries": {
          "value": "+25",
          "label": "Pays Importateurs"
        },
        "standards": {
          "value": "100%",
          "label": "Conforme aux Normes UE"
        },
        "coldChain": {
          "value": "Chaîne du Froid",
          "label": "Fraîcheur Continue"
        },
        "terms": {
          "value": "FOB & CIF",
          "label": "Conditions de Livraison Souples"
        }
      }
    },
    "bento": {
      "title": "Conçu pour la qualité à grande échelle.",
      "subtitle": "Un catalogue simplifié de produits de qualité export, soutenu par une chaîne du froid moderne.",
      "card1Tag": "Rendement Supérieur",
      "card1Title": "Exportations d'Agrumes",
      "card1Desc": "Oranges et citrons égyptiens de catégorie A.",
      "card2Title": "Intégrité de la Chaîne du Froid",
      "card2Desc": "Contrôle de la température de bout en bout garantissant zéro dégradation du champ au port de destination.",
      "card3Title": "Cultures Racines",
      "card3Desc": "Pommes de terre de qualité export",
      "card4Title": "Pôle d'Approvisionnement Sur Mesure",
      "card4Desc": "Vous ne trouvez pas la récolte souhaitée ? Profitez de notre réseau de partenaires pour vous approvisionner directement auprès de producteurs certifiés.",
      "card4Cta": "Demander une commande sur mesure"
    },
    "features": {
      "sectionTitlePre": "Pourquoi les Grands Importateurs Choisissent",
      "sectionTitleHighlight": "Agri Port",
      "sectionTitlePost": " ?",
      "sectionSubtitle": "Nous garantissons des produits frais conformes à 100% au cahier des charges convenu, avec une ponctualité logistique absolue.",
      "moreDetails": "En savoir plus",
      "items": [
        {
          "icon": "🍊",
          "title": "Catalogue de Fruits & Légumes Frais",
          "body": "Oranges Valencia et Navel, oignons rouges et dorés, ail frais, fraises, grenades et pommes de terre calibrées pour le marché européen.",
          "badge": "Frais & Calibré"
        },
        {
          "icon": "📦",
          "title": "Stations de Conditionnement & Chaîne du Froid",
          "body": "Lignes de tri électronique, pré-refroidissement rapide et emballages réfrigérés en carton renforcé préservant la fraîcheur jusqu'au port d'arrivée.",
          "badge": "Emballage Agréé"
        },
        {
          "icon": "🤝",
          "title": "Contrats B2B & Facilités Logistiques",
          "body": "Accords d'approvisionnement flexibles, expéditions maritimes programmées, certificats phytosanitaires et certificats d'origine officiels.",
          "badge": "Pour Importateurs"
        }
      ]
    },
    "productsPage": {
      "title": "Catalogue d'Exportation Agricole",
      "description": "Une sélection haut de gamme de produits agricoles égyptiens préparés pour l'exportation internationale selon les certifications Global G.A.P, ISO et les normes phytosanitaires.",
      "statusTitle": "Principales Récoltes Disponibles à l'Exportation",
      "statusDesc": "Récoltées, triées et conditionnées avec soin pour répondre aux exigences strictes des marchés de gros et supermarchés européens :",
      "seasonLabel": "Saison d'Exportation",
      "packagingLabel": "Types d'Emballage",
      "specsLabel": "Calibres & Spécifications",
      "requestQuoteBtn": "Demander un Devis pour ce Produit",
      "productsList": [
        {
          "id": "citrus",
          "name": "Agrumes & Oranges d'Égypte",
          "variety": "Oranges Valencia, Navel, Citrons Frais, Mandarines",
          "season": "Novembre — Mai",
          "pack": "Cartons télescopiques 15 kg, Open Top, Filets",
          "specs": "Calibres : 40, 48, 56, 64, 72, 80, 88",
          "icon": "🍊",
          "category": "Agrumes"
        },
        {
          "id": "onions",
          "name": "Oignons Frais d'Égypte (Rouges & Dorés)",
          "variety": "Oignons rouges italiens, Oignons dorés séchés naturellement",
          "season": "Février — Août",
          "pack": "Sacs filets 10 kg & 25 kg, Big Bags 1 tonne",
          "specs": "Tailles : 40/60 mm, 50/70 mm, 70/90 mm, 80/100 mm",
          "icon": "🧅",
          "category": "Légumes"
        },
        {
          "id": "strawberries",
          "name": "Fraises Fraîches Sucrées",
          "variety": "Fortuna, Festival, Sensation",
          "season": "Novembre — Mars",
          "pack": "Barquettes 250g dans cartons plats de 2 kg et 2,5 kg",
          "specs": "Fret aérien réfrigéré direct, contrôle strict des résidus",
          "icon": "🍓",
          "category": "Fruits"
        },
        {
          "id": "pomegranates",
          "name": "Grenades Wonderful Extra",
          "variety": "Variété Wonderful rouge rubis, haute teneur en sucre Brix",
          "season": "Septembre — Décembre",
          "pack": "Cartons 4,5 kg & 5,0 kg (barquettes ou alvéoles)",
          "specs": "Comptages : 6, 7, 8, 9, 10, 12, 14 fruits par carton",
          "icon": "🍎",
          "category": "Fruits"
        },
        {
          "id": "potatoes",
          "name": "Pommes de Terre de Consommation",
          "variety": "Spunta, Mondial, Lady Rosetta, Cara",
          "season": "Janvier — Juin",
          "pack": "Sacs filets 10 kg, 25 kg, Jumbo Bags 1250 kg",
          "specs": "Lavées ou brossées à sec, calibres 35/55 mm et 55+ mm",
          "icon": "🥔",
          "category": "Légumes"
        },
        {
          "id": "grapes",
          "name": "Raisins Frais Sans Pépins",
          "variety": "Early Sweet, Superior, Flame Seedless, Crimson",
          "season": "Mai — Août",
          "pack": "Barquettes 500g ou sachets perforés en cartons 4,5 kg",
          "specs": "Niveau Brix élevé, diamètre des baies 18-22 mm+",
          "icon": "🍇",
          "category": "Fruits"
        },
        {
          "id": "artichoke",
          "name": "Artichauts Égyptiens Frais",
          "variety": "Artichaut Français, Variété Baladi",
          "season": "Novembre — Mai",
          "pack": "Fûts Alimentaires d'Exportation, Cartons Réfrigérés",
          "specs": "Calibres: 50, 55, 60 mm Première Catégorie",
          "icon": "🌱",
          "category": "Légumes"
        }
      ]
    },
    "aboutPage": {
      "title": "À Propos d'Agri Port — Exportation Agricole",
      "subtitle": "Exportation des meilleures récoltes égyptiennes vers les marchés européens, français et mondiaux.",
      "description": "Agri Port est votre porte d'entrée principale et partenaire stratégique en Égypte pour l'exportation de fruits et légumes frais. Disposant de stations de conditionnement modernes, de systèmes de calibrage électronique et d'une chaîne du froid intégrée, nous assurons la livraison de vos cargaisons dans un état optimal conforme aux normes de l'Union Européenne (Global G.A.P, ISO, BRC).",
      "pillars": [
        {
          "icon": "🌍",
          "title": "Export vers plus de 25 Marchés",
          "desc": "Expéditions régulières vers l'Espagne, la France, l'Italie, l'Allemagne, le Royaume-Uni, les pays du Golfe et l'Afrique."
        },
        {
          "icon": "🏆",
          "title": "Contrôle Qualité Rigoureux",
          "desc": "Analyses systématiques des résidus phytopharmaceutiques, tri optique par couleur et calibrage répondant aux réglementations européennes."
        },
        {
          "icon": "⚡",
          "title": "Chaîne du Froid & Logistique Rapide",
          "desc": "Fret maritime en conteneurs frigorifiques (Reefer) et fret aérien direct depuis Alexandrie, Damiette, Port-Saïd et l'Aéroport International du Caire."
        }
      ]
    },
    "contactPage": {
      "title": "Contactez-nous & Demandez un Devis",
      "description": "Nous accueillons toutes les commandes et demandes de partenariat d'importateurs et distributeurs internationaux. Contactez-nous pour des cotations immédiates FOB ou CIF.",
      "directTitle": "Bureau Commercial Export",
      "directDesc": "Échangez directement avec nos responsables des ventes internationales et de la logistique :",
      "emailLabel": "Courriel Commercial Export",
      "phoneLabel": "Téléphone & WhatsApp Export",
      "locationLabel": "Siège & Plateformes",
      "locationValue": "République Arabe d'Égypte — Gouvernorat de Beheira / Kafr El-Dawar",
      "formTitle": "Demande de Devis ou Contrat d'Approvisionnement",
      "formDesc": "Indiquez les détails de votre cargaison ci-dessous et notre équipe commerciale vous répondra avec des tarifs et plannings d'expédition sous quelques heures :",
      "fields": {
        "name": "Nom du Contact",
        "namePlaceholder": "ex: M. Jean Dupont ou Carlos Martínez",
        "company": "Société Importatrice",
        "companyPlaceholder": "Nom de votre entreprise",
        "country": "Pays de Destination",
        "countryPlaceholder": "France, Espagne, Italie, Allemagne, Belgique, Suisse...",
        "email": "Adresse E-mail Professionnelle",
        "emailPlaceholder": "importateur@societe.com",
        "phone": "Téléphone / WhatsApp",
        "phonePlaceholder": "+34 600 000 000",
        "product": "Culture Souhaitée",
        "productPlaceholder": "Oranges Valencia, Oignons Rouges, Fraises, Grenades...",
        "quantity": "Volume Estimé",
        "quantityPlaceholder": "ex: 4 Conteneurs Frigorifiques (100 Tonnes)",
        "incoterms": "Incoterms Souhaités",
        "destinationPort": "Port de Débarquement",
        "destinationPortPlaceholder": "ex: Port de Marseille-Fos, Valence, Barcelone, Le Havre...",
        "message": "Spécifications & Remarques",
        "messagePlaceholder": "Calibres souhaités, emballage spécifique, période d'expédition...",
        "submitBtn": "Envoyer la Demande de Devis",
        "successMsg": "Votre demande a été bien reçue ! Notre équipe export vous répondra dans les plus brefs délais.",
        "submitAnotherBtn": "Envoyer une autre demande",
        "submittingBtn": "Envoi en cours..."
      },
      "selectedCropBadge": "Culture sélectionnée pour devis",
      "clearSelection": "Effacer la sélection"
    },
    "footer": {
      "rights": "Tous droits réservés",
      "subtext": "Portail d'Exportation de Fruits et Légumes Frais d'Égypte vers les Ports du Monde",
      "ctaTitle": "Prêt à moderniser votre chaîne d'approvisionnement ?",
      "ctaDesc": "Contactez notre équipe commerciale pour discuter des volumes, de la logistique et de la mise en place d'un approvisionnement sécurisé.",
      "emailPlaceholder": "nom@entreprise.com",
      "btnContact": "Nous Contacter",
      "colPlatform": "Plateforme",
      "linkProducts": "Catalogue de Produits",
      "linkColdChain": "Infrastructure Chaîne du Froid",
      "linkCertifications": "Certifications",
      "colCompany": "Entreprise",
      "linkAbout": "À propos d'AgriPort",
      "linkFarms": "Fermes Partenaires",
      "linkLegal": "Mentions Légales & Commerce"
    },
    "facilitiesPage": {
          "title": "Installations d'Exportation, Stations de Conditionnement & Domaines",
          "subtitle": "Une infrastructure de pointe intégrant des lignes de tri optique électronique, des stations certifiées et une chaîne du froid rapide du champ au port.",
          "badge": "Nos Installations",
          "stats": {
                "stations": "Stations de Conditionnement",
                "stationsVal": "4 Stations Certifiées",
                "farms": "Domaines Agricoles Suivis",
                "farmsVal": "+500 Feddans",
                "coldChain": "Chaîne du Froid Continue",
                "coldChainVal": "100% Température Contrôlée",
                "capacity": "Capacité Quotidienne de Tri",
                "capacityVal": "+200 Tonnes / Jour"
          },
          "videoBadge": "Vidéo Documentaire en Direct",
          "videoTitle": "En Vidéo : Le Tri Automatisé, le Conditionnement et la Chaîne du Froid",
          "videoDesc": "Technologies de tri électronique par taille, couleur et taux de sucre, préservant une fraîcheur maximale pour les marchés européens et mondiaux.",
          "videoPlayBtn": "Lancer la Visite Virtuelle",
          "videoDuration": "Visite Documentaire • 02:45 min",
          "filterAll": "Toutes les Installations",
          "filterStations": "Stations de Conditionnement",
          "filterFarms": "Domaines & Vergers",
          "filterColdChain": "Chaîne du Froid & Logistique",
          "filterLab": "Laboratoires de Contrôle Qualité",
          "items": [
                {
                      "id": "citrus-packhouse",
                      "category": "stations",
                      "badge": "Station Centrale de Conditionnement",
                      "title": "Ligne de Calibrage Optique Automatisée pour Agrumes",
                      "desc": "Caméras 3D haute cadence examinant le calibre, la couleur et le niveau Brix de chaque orange et citron, éjectant automatiquement les fruits non conformes.",
                      "specs": "Capacité 150 Tonnes / Jour • Calibrage Électronique • Conforme UE",
                      "image": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Tri Optique"
                },
                {
                      "id": "citrus-orchards",
                      "category": "farms",
                      "badge": "Vergers d'Exportation",
                      "title": "Vergers d'Oranges Valencia, Navel et Citrons Frais",
                      "desc": "Gestion agricole intégrée avec fertigation goutte-à-goutte automatisée et protection biologique des cultures, assurant l'absence de résidus chimiques.",
                      "specs": "+250 Feddans d'Agrumes • Beheira & Noubariya • Global G.A.P",
                      "image": "https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Domaines Certifiés"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "Chaîne du Froid Rapide",
                      "title": "Chambres de Pré-refroidissement Rapide (Pre-Cooling)",
                      "desc": "La température à cœur du fruit est abaissée dans les 2 heures suivant la récolte pour bloquer la respiration et préserver une fermeté maximale.",
                      "specs": "Contrôle 0–4°C • Humidité Relative 90–95% • Capteurs IoT",
                      "image": "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Pré-refroidissement"
                },
                {
                      "id": "onions-potatoes-plant",
                      "category": "stations",
                      "badge": "Unité Oignons et Pommes de Terre",
                      "title": "Lignes de Brossage, Séchage et Conditionnement",
                      "desc": "Lignes de calibrage mécanique et séchage préparant les oignons et pommes de terre en sacs filets de 10/25 kg et sacs jumbo de 1 tonne.",
                      "specs": "Capacité 80 Tonnes / Jour • Calibres 40/60 à 80/100 mm",
                      "image": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Export Maritime"
                },
                {
                      "id": "strawberry-farms",
                      "category": "farms",
                      "badge": "Champs de Fraises Sous Tunnels",
                      "title": "Cultures Protégées et Cueillette Manuelle Délicate",
                      "desc": "Cueillette soignée tôt le matin en barquettes de 250g et cartons réfrigérés, expédiés par fret aérien en moins de 24 heures après récolte.",
                      "specs": "Vols Quotidiens Fret Aérien • Fortuna & Festival • Zéro Résidu",
                      "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Fret Aérien Frais"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "Laboratoire de Contrôle Qualité",
                      "title": "Laboratoire d'Analyses Agricoles et Contrôle des LMR",
                      "desc": "Échantillonnage méthodique vérifiant le taux de Brix, la conformité dimensionnelle et le respect des normes européennes avec certificats officiels.",
                      "specs": "Laboratoire Accrédité • Analyses Brix & Résidus • ISO 22000",
                      "image": "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Certifié Labo"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "Quais d'Expédition Logistique",
                      "title": "Quais Réfrigérés d'Empotage de Conteneurs Maritimes",
                      "desc": "Quais sous température dirigée reliant directement les ports d'Alexandrie et Damiette, munis d'enregistreurs de température numériques.",
                      "specs": "Plus de 10 Conteneurs Reefer / Jour • Suivi Numérique en Direct",
                      "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Quais Réfrigérés"
                },
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "Unité Légumes Spécialisés",
                      "title": "Atelier de Parage et Mise en Fûts d'Artichauts Frais",
                      "desc": "Lignes de parage hygiénique et calibrage des artichauts frais conditionnés en fûts alimentaires sous saumure et cartons réfrigérés pour l'Europe.",
                      "specs": "Calibres 50, 55, 60 mm • Fûts Alimentaires & Cartons Réfrigérés",
                      "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Fûts Alimentaires"
                }
          ],
          "cta": {
                "title": "Souhaitez-vous planifier une visite de nos installations ou inspecter vos lots ?",
                "desc": "Nous accueillons avec grand plaisir nos partenaires importateurs internationaux pour visiter nos domaines et assister aux opérations de tri en Égypte.",
                "visitBtn": "Planifier une Visite",
                "quoteBtn": "Demander Devis et Expédition"
          }
    },
    "visitPage": {
          "badge": "Programme de Visite des Importateurs & Délégations",
          "title": "Réserver une Visite sur le Terrain et en Station",
          "subtitle": "Nous invitons nos partenaires commerciaux et importateurs à inspecter l'ensemble de notre chaîne d'approvisionnement : de la récolte au calibrage optique, au conditionnement et au chargement réfrigéré.",
          "highlightsTitle": "Que comprend la visite sur place ?",
          "highlightsSubtitle": "Une expérience immersive conçue pour les importateurs et distributeurs internationaux afin d'évaluer la qualité et les capacités logistiques sur le terrain.",
          "highlights": [
                {
                      "icon": "🌱",
                      "title": "Inspection des Vergers & Récolte",
                      "desc": "Parcours guidé au cœur de nos vergers d'agrumes et parcelles légumières certifiés GlobalG.A.P. et sans résidus."
                },
                {
                      "icon": "🔬",
                      "title": "Calibrage Optique & Laboratoire Qualité",
                      "desc": "Démonstration des lignes électroniques haute vitesse de tri par couleur/diamètre, tests de Brix et contrôles du laboratoire interne."
                },
                {
                      "icon": "❄️",
                      "title": "Chaîne du Froid & Chargement Frigorifique",
                      "desc": "Visite des chambres de pré-réfrigération rapide et quais d'empotage pour conteneurs reefer avec enregistreurs de température."
                },
                {
                      "icon": "🤝",
                      "title": "Session Commerciale & Planification",
                      "desc": "Rencontre directe avec la direction export pour convenir des emballages personnalisés, des Incoterms (FOB/CIF) et des calendriers."
                }
          ],
          "vipServicesTitle": "Accueil VIP & Logistique pour nos Invités",
          "vipServices": [
                {
                      "icon": "✈️",
                      "title": "Transferts Aéroport Dédiés",
                      "desc": "Accueil personnalisé à l'aéroport international du Caire (CAI) ou de Borg El Arab (HBE) et gestion de l'hébergement."
                },
                {
                      "icon": "🌐",
                      "title": "Équipe Polyglotte Dédiée",
                      "desc": "Accompagnement par des directeurs export bilingues en français, anglais, espagnol et italien."
                },
                {
                      "icon": "📋",
                      "title": "Échantillonnage & Validation Immédiate",
                      "desc": "Possibilité de prélever des échantillons et d'approuver les marquages de cartons directement sur place."
                }
          ],
          "form": {
                "title": "Formulaire de Réservation de Visite",
                "desc": "Veuillez renseigner les détails de votre délégation. Notre coordinateur des relations internationales prendra contact sous 24h pour confirmer l'itinéraire.",
                "badge": "Réservé aux Professionnels & Acheteurs",
                "fields": {
                      "fullName": "Nom du représentant / Chef de délégation",
                      "fullNamePlaceholder": "ex. Jean Dupont / Marie Martin",
                      "company": "Entreprise / Entité Importatrice",
                      "companyPlaceholder": "ex. Global Fresh Import France",
                      "country": "Pays d'activité",
                      "countryPlaceholder": "ex. France, Belgique, Suisse, Canada...",
                      "email": "Courriel professionnel",
                      "emailPlaceholder": "nom@entreprise.com",
                      "phone": "Téléphone / WhatsApp (avec indicatif)",
                      "phonePlaceholder": "+33 6000 00000",
                      "visitDate": "Date de visite souhaitée",
                      "visitDateHelp": "Veuillez prévoir un préavis d'au moins 3 jours ouvrables pour l'organisation logistique",
                      "visitorsCount": "Taille de la délégation",
                      "visitorsCountPlaceholder": "Sélectionnez le nombre de participants",
                      "visitorsCountOptions": {
                            "one": "1 personne (acheteur / décideur)",
                            "two": "2 personnes",
                            "threeToFive": "3 à 5 personnes (équipe commerciale & contrôle qualité)",
                            "sixPlus": "Plus de 5 personnes (délégation officielle)"
                      },
                      "facilitiesTitle": "Installations à Inspecter",
                      "facilitiesHelp": "Cochez une ou plusieurs stations selon vos besoins d'importation",
                      "facilitiesList": {
                            "citrus": "Station de calibrage optique et conditionnement d'agrumes (Valencia, mandarines, citrons)",
                            "onionPotato": "Station de tri et conditionnement des oignons, pommes de terre et ail",
                            "farms": "Vergers partenaires, domaines de plein champ et cultures de fraises",
                            "coldChain": "Chambres de pré-refroidissement rapide et quais de chargement reefer",
                            "qualityLab": "Laboratoire de contrôle qualité, analyses de résidus et calibrage"
                      },
                      "targetCrops": "Cultures d'Intérêt à l'Importation",
                      "targetCropsPlaceholder": "ex. Oranges Valencia, Oignons jaunes, Ail frais, Fraises, Artichauts...",
                      "airportTransfer": "Assistance Logistique & Transport",
                      "airportTransferLabel": "Oui, nous souhaitons une prise en charge aéroportuaire et un transport privé",
                      "notes": "Demandes Particulières & Notes",
                      "notesPlaceholder": "Horaires de vol, préférences linguistiques, ou calibres précis à observer...",
                      "submitBtn": "Confirmer et Réserver la Visite",
                      "submitting": "Envoi de la demande de visite en cours..."
                },
                "success": {
                      "title": "Demande de visite transmise avec succès !",
                      "desc": "Merci pour votre intérêt. Votre demande a été enregistrée et transmise au département des relations internationales.",
                      "summaryLead": "Récapitulatif de la visite :",
                      "dateLabel": "Date proposée :",
                      "visitorsLabel": "Nombre de visiteurs :",
                      "facilitiesLabel": "Installations sélectionnées :",
                      "anotherBtn": "Réserver une autre visite",
                      "whatsappSupport": "Pour une coordination VIP immédiate ou des délais serrés, échangez sur WhatsApp :"
                }
          },
          "contactBox": {
                "title": "Coordination VIP Directe",
                "desc": "Déjà sur place en Égypte ou arrivée prévue sous 48h ? Échangez directement avec notre responsable des délégations pour une planification express.",
                "whatsappBtn": "Discuter avec le coordinateur sur WhatsApp",
                "locationLabel": "Emplacement des Stations",
                "locationValue": "Axe Le Caire - Alexandrie / Delta du Nil, Égypte",
                "hoursLabel": "Horaires de Réception",
                "hoursValue": "Samedi - Jeudi : 8h00 - 17h00 (Heure locale)",
                "hotlineLabel": "Ligne Directe Délégations"
          }
    },
    "farmsPage": {
      "title": "Fermes & Réseau d'Approvisionnement",
      "description": "Un aperçu de nos fermes partenaires et de nos zones de production agricole à travers le Delta et la vallée du Nil en Égypte.",
      "activeStatus": "Active",
      "monitoringStatus": "Sous surveillance",
      "feddanUnit": "Feddan",
      "farmsList": [
        {
          "id": "1",
          "name": "Ferme Delta Premier",
          "location": "Gouvernorat de Kafr El-Sheikh",
          "crop": "Légumes & Oignons",
          "areaFeddan": 12,
          "status": "Active"
        },
        {
          "id": "2",
          "name": "Domaine de la Vallée du Nil",
          "location": "Gouvernorat de Minya",
          "crop": "Agrumes & Fruits",
          "areaFeddan": 8.5,
          "status": "Active"
        },
        {
          "id": "3",
          "name": "Domaine Wadi El-Natrun",
          "location": "Gouvernorat de Beheira",
          "crop": "Raisins & Fraises",
          "areaFeddan": 15,
          "status": "Active"
        },
        {
          "id": "4",
          "name": "Ferme Domaine Noubariya",
          "location": "Noubariya",
          "crop": "Oranges Valencia & Pommes de terre",
          "areaFeddan": 22,
          "status": "Active"
        }
      ]
    },
    "irrigationPage": {
      "title": "Gestion de l'Irrigation & de l'Eau",
      "description": "Suivi de l'efficacité de l'eau et des systèmes d'irrigation modernes et durables dans nos fermes.",
      "nextIrrigation": "Prochaine irrigation :",
      "waterConsumption": "Consommation d'eau :",
      "litersUnit": "Litres",
      "records": [
        {
          "id": "1",
          "farmName": "Ferme Delta Premier",
          "nextIrrigation": "Aujourd'hui 18h00",
          "waterUsedLiters": 12500
        },
        {
          "id": "2",
          "farmName": "Domaine Vallée du Nil",
          "nextIrrigation": "Demain 05h30",
          "waterUsedLiters": 8200
        }
      ]
    }
  },
  "it": {
    "brandName": "AgriPort",
    "brandSubtitle": "Portale Esportazione Ortofrutta",
    "tagline": "Esportazione di Frutta e Verdura Fresca di Pregio verso i Mercati Mondiali",
    "nav": {
      "home": "Home",
      "products": "Prodotti",
      "facilities": "Strutture",
      "capabilities": "Strutture",
      "company": "Azienda",
      "about": "Chi Siamo",
      "contact": "Contattaci",
      "contactSales": "Contatta Vendite"
    },
    "cta": "Richiedi Preventivo",
    "language": "Lingua",
    "trust": {
      "standards": "Certificato secondo standard internazionali"
    },
    "hero": {
      "pillTag": "Annuncio della stagione di raccolta 2026",
      "headlineMain": "Agricoltura Globale,",
      "headlineSub": "Consegnata con Precisione.",
      "leadParagraph": "L'infrastruttura per il commercio internazionale di prodotti ortofrutticoli. Selezioniamo, lavoriamo e spediamo colture di prima qualità con un'efficienza logistica senza pari.",
      "btnPrimary": "Inizia Fornitura",
      "btnSecondary": "Esplora Catalogo",
      "badge": "Esportazione Agricola Certificata | Raccolti Freschi dall'Egitto",
      "titlePart1": "Esportiamo la migliore",
      "titleHighlight": "Frutta e Verdura Fresca",
      "titlePart2": "dall'Egitto verso i principali porti mondiali",
      "subtitle": "Il tuo partner di fiducia per la fornitura e l'esportazione di prodotti ortofrutticoli (agrumi, cipolle, aglio, fragole, melagrane, uva, patate) con calibrazione ottica avanzata, catena del freddo ininterrotta e spedizioni marittime ed aeree.",
      "browseCatalog": "Sfoglia Catalogo Prodotti",
      "requestDeals": "Richiedi Preventivo & Spedizioni",
      "stats": {
        "countries": {
          "value": "+25",
          "label": "Paesi Importatori"
        },
        "standards": {
          "value": "100%",
          "label": "Conforme agli Standard UE"
        },
        "coldChain": {
          "value": "Catena del Freddo",
          "label": "Freschezza Continua"
        },
        "terms": {
          "value": "FOB & CIF",
          "label": "Condizioni di Consegna Flessibili"
        }
      }
    },
    "bento": {
      "title": "Progettato per la qualità su larga scala.",
      "subtitle": "Un catalogo snello di prodotti per l'esportazione, supportato da una moderna catena del freddo.",
      "card1Tag": "Resa Premium",
      "card1Title": "Esportazioni di Agrumi",
      "card1Desc": "Arance e limoni egiziani di Classe A.",
      "card2Title": "Integrità della Catena del Freddo",
      "card2Desc": "Controllo della temperatura end-to-end per garantire zero degrado dal campo al porto di destinazione.",
      "card3Title": "Colture a Radice",
      "card3Desc": "Patate per l'esportazione",
      "card4Title": "Hub di Fornitura Personalizzato",
      "card4Desc": "Non trovi la coltura richiesta? Sfrutta la nostra rete di partner per reperire volumi specifici direttamente da coltivatori certificati.",
      "card4Cta": "Richiedi ordine personalizzato"
    },
    "features": {
      "sectionTitlePre": "Perché i Grandi Importatori Scelgono",
      "sectionTitleHighlight": "Agri Port",
      "sectionTitlePost": "?",
      "sectionSubtitle": "Garantiamo prodotti ortofrutticoli conformi al 100% alle specifiche pattuite, con puntualità logistica e trasparenza totale.",
      "moreDetails": "Maggiori Dettagli",
      "items": [
        {
          "icon": "🍊",
          "title": "Catalogo Frutta e Verdura Fresca",
          "body": "Arance Valencia e Navel, cipolle rosse e dorate, aglio fresco, fragole, melagrane e patate calibrate per i mercati ortofrutticoli europei.",
          "badge": "Fresco e Calibrato"
        },
        {
          "icon": "📦",
          "title": "Centri di Confezionamento e Catena del Freddo",
          "body": "Linee di selezione ottica ad alta tecnologia, pre-raffreddamento rapido e casse in cartone rinforzato che preservano la fragranza fino al porto di destino.",
          "badge": "Imballaggio Certificato"
        },
        {
          "icon": "🤝",
          "title": "Accordi B2B e Facilitazioni Logistiche",
          "body": "Contratti di fornitura flessibili, spedizioni marittime programmate, certificati fitosanitari e certificati di origine ufficiali.",
          "badge": "Per Importatori"
        }
      ]
    },
    "productsPage": {
      "title": "Catalogo Esportazione Ortofrutta",
      "description": "Una selezione di eccellenza di prodotti agricoli freschi egiziani preparati per l'esportazione internazionale secondo gli standard Global G.A.P, ISO e le normative fitosanitarie europee.",
      "statusTitle": "Principali Raccolti Disponibili per l'Esportazione",
      "statusDesc": "Raccolti, selezionati e confezionati con cura per soddisfare i rigorosi standard dei mercati all'ingrosso e della GDO europea:",
      "seasonLabel": "Stagione di Esportazione",
      "packagingLabel": "Tipologie di Imballaggio",
      "specsLabel": "Calibri e Specifiche",
      "requestQuoteBtn": "Richiedi Quotazione per Questo Prodotto",
      "productsList": [
        {
          "id": "citrus",
          "name": "Agrumi & Arance Egiziane",
          "variety": "Arance Valencia, Navel, Limoni Freschi, Mandarini",
          "season": "Novembre — Maggio",
          "pack": "Cartoni telescopici da 15 kg, Open Top, Retine",
          "specs": "Calibri: 40, 48, 56, 64, 72, 80, 88",
          "icon": "🍊",
          "category": "Agrumi"
        },
        {
          "id": "onions",
          "name": "Cipolle Fresche Egiziane (Rosse e Dorate)",
          "variety": "Cipolle rosse tipo italiano, Cipolle dorate essiccate al sole",
          "season": "Febbraio — Agosto",
          "pack": "Sacchi a rete da 10 kg e 25 kg, Jumbo Bags da 1 tonnellata",
          "specs": "Calibri: 40/60 mm, 50/70 mm, 70/90 mm, 80/100 mm",
          "icon": "🧅",
          "category": "Verdure"
        },
        {
          "id": "strawberries",
          "name": "Fragole Fresche Extra",
          "variety": "Fortuna, Festival, Sensation",
          "season": "Novembre — Marzo",
          "pack": "Vaschette da 250g in casse piatte da 2 kg e 2,5 kg",
          "specs": "Spedizione aerea refrigerata diretta, residuo chimico controllato",
          "icon": "🍓",
          "category": "Frutta"
        },
        {
          "id": "pomegranates",
          "name": "Melagrane Wonderful Extra",
          "variety": "Varietà Wonderful rosso intenso, elevato grado zuccherino Brix",
          "season": "Settembre — Dicembre",
          "pack": "Cartoni da 4,5 kg e 5,0 kg (in alveolo o vaschetta)",
          "specs": "Conteggi: 6, 7, 8, 9, 10, 12, 14 frutti per cartone",
          "icon": "🍎",
          "category": "Frutta"
        },
        {
          "id": "potatoes",
          "name": "Patate da Consumo e Industria",
          "variety": "Spunta, Mondial, Lady Rosetta, Cara",
          "season": "Gennaio — Giugno",
          "pack": "Sacchi a rete da 10 kg, 25 kg, Jumbo Bags da 1250 kg",
          "specs": "Lavate o spazzolate, calibri 35/55 mm e 55+ mm",
          "icon": "🥔",
          "category": "Verdure"
        },
        {
          "id": "grapes",
          "name": "Uva da Tavola Senza Semi",
          "variety": "Early Sweet, Superior, Flame Seedless, Crimson",
          "season": "Maggio — Agosto",
          "pack": "Vaschette da 500g o sacchetti microforati in cartoni da 4,5 kg",
          "specs": "Alto grado Brix, diametro acino 18-22 mm+",
          "icon": "🍇",
          "category": "Frutta"
        },
        {
          "id": "artichoke",
          "name": "Carciofi Freschi Egiziani",
          "variety": "Carciofo Francese, Varietà Baladi",
          "season": "Novembre — Maggio",
          "pack": "Fusti Alimentari da Esportazione, Cartoni Refrigerati",
          "specs": "Calibri: 50, 55, 60 mm Prima Categoria",
          "icon": "🌱",
          "category": "Verdure"
        }
      ]
    },
    "aboutPage": {
      "title": "Chi Siamo — Agri Port Esportazione Ortofrutticola",
      "subtitle": "Esportiamo il miglior raccolto delle fertili terre d'Egitto verso i mercati italiani, europei e mondiali.",
      "description": "Agri Port è il tuo partner d'eccellenza in Egitto per l'importazione diretta di frutta e verdura fresca. Grazie a moderni centri di condizionamento, linee di calibrazione ottica e una catena del freddo integrata, garantiamo la consegna di partite freschissime nei porti di destino conformi a tutti gli standard europei (Global G.A.P, ISO, BRC).",
      "pillars": [
        {
          "icon": "🌍",
          "title": "Presenza in oltre 25 Mercati",
          "desc": "Spedizioni continue verso la Spagna, l'Italia, la Francia, la Germania, il Regno Unito, i paesi del Golfo e l'Africa."
        },
        {
          "icon": "🏆",
          "title": "Qualità Certificata e Controlli Rigorosi",
          "desc": "Analisi multiresiduale periodica, selezione cromatica accurata e calibrazione conforme alle normative UE."
        },
        {
          "icon": "⚡",
          "title": "Catena del Freddo & Logistica Celere",
          "desc": "Spedizioni marittime in container refrigerati (Reefer) e via aerea rapida dai porti di Alessandria, Damietta, Port Said e dall'Aeroporto del Cairo."
        }
      ]
    },
    "contactPage": {
      "title": "Contattaci & Richiedi Preventivo",
      "description": "Accogliamo ordini, contratti continuativi e richieste di fornitura da importatori ortofrutticoli e dalla grande distribuzione internazionale. Contattaci per quotazioni immediate FOB o CIF.",
      "directTitle": "Ufficio Commerciale Esportazione",
      "directDesc": "Parla direttamente con i nostri responsabili vendite internazionali e logistica marittima:",
      "emailLabel": "Email Commerciale Export",
      "phoneLabel": "Telefono & WhatsApp Export Desk",
      "locationLabel": "Sede Centrale e Hubs",
      "locationValue": "Repubblica Araba d'Egitto — Governatorato di Beheira / Kafr El-Dawar",
      "formTitle": "Richiesta Quotazione o Accordo di Fornitura",
      "formDesc": "Inserisci i dettagli del carico desiderato e il nostro team ti fornirà quotazioni e disponibilità entro poche ore:",
      "fields": {
        "name": "Nome del Referente",
        "namePlaceholder": "es: Marco Rossi o Carlos Martínez",
        "company": "Azienda / Società Importatrice",
        "companyPlaceholder": "Nome della tua azienda",
        "country": "Paese di Destinazione",
        "countryPlaceholder": "Spagna, Italia, Francia, Germania, Regno Unito...",
        "email": "Email Aziendale",
        "emailPlaceholder": "import@azienda.it",
        "phone": "Telefono / WhatsApp",
        "phonePlaceholder": "+34 600 000 000",
        "product": "Prodotto Richiesto",
        "productPlaceholder": "Arance Valencia, Cipolle Rosse, Fragole, Melagrane...",
        "quantity": "Volume Stimato",
        "quantityPlaceholder": "es: 4 Container Reefer (100 Ton) o ordine di prova",
        "incoterms": "Incoterms Desiderati",
        "destinationPort": "Porto di Sbarco",
        "destinationPortPlaceholder": "es: Porto di Valencia, Barcellona, Genova, Marsiglia, Salerno...",
        "message": "Specifiche e Note Aggiuntive",
        "messagePlaceholder": "Calibri preferiti, specifiche di confezionamento, finestra di spedizione...",
        "submitBtn": "Invia Richiesta di Preventivo",
        "successMsg": "La tua richiesta è stata inviata con successo! Il nostro export desk ti contatterà al più presto.",
        "submitAnotherBtn": "Invia un'altra richiesta",
        "submittingBtn": "Invio in corso..."
      },
      "selectedCropBadge": "Coltura selezionata per preventivo",
      "clearSelection": "Cancella selezione"
    },
    "footer": {
      "rights": "Tutti i diritti riservati",
      "subtext": "Portale di Esportazione Ortofrutta Fresca dall'Egitto verso i Porti di Tutto il Mondo",
      "ctaTitle": "Pronto a migliorare la tua catena di fornitura?",
      "ctaDesc": "Contatta il nostro team di vendita per discutere volumi, logistica e attivare accordi commerciali affidabili.",
      "emailPlaceholder": "nome@azienda.com",
      "btnContact": "Contattaci",
      "colPlatform": "Piattaforma",
      "linkProducts": "Catalogo Prodotti",
      "linkColdChain": "Infrastruttura Catena del Freddo",
      "linkCertifications": "Certificazioni",
      "colCompany": "Azienda",
      "linkAbout": "Chi siamo",
      "linkFarms": "Aziende Agricole Partner",
      "linkLegal": "Legale & Commercio"
    },
    "facilitiesPage": {
          "title": "Strutture di Esportazione, Centri di Confezionamento e Tenute",
          "subtitle": "Infrastruttura all'avanguardia che integra moderne linee di calibrazione ottica, stabilimenti certificati e una catena del freddo rapida dal campo al porto.",
          "badge": "Le Nostre Strutture",
          "stats": {
                "stations": "Centri di Confezionamento",
                "stationsVal": "4 Centri Certificati",
                "farms": "Superfici Agricole Monitorate",
                "farmsVal": "+500 Feddan",
                "coldChain": "Catena del Freddo Continua",
                "coldChainVal": "100% Controllo Termico",
                "capacity": "Capacità Giornaliera di Calibrazione",
                "capacityVal": "+200 Tonnellate / Giorno"
          },
          "videoBadge": "Video Documentario dal Vivo",
          "videoTitle": "Guarda in Video: Calibrazione Automatica, Confezionamento e Catena del Freddo",
          "videoDesc": "Tecnologie ottiche avanzate per calibro, colore e grado Brix, preservando la massima freschezza per i mercati ortofrutticoli internazionali.",
          "videoPlayBtn": "Avvia Tour Virtuale",
          "videoDuration": "Tour Documentario • 02:45 min",
          "filterAll": "Tutte le Strutture",
          "filterStations": "Centri di Confezionamento",
          "filterFarms": "Tenute e Agrumeti",
          "filterColdChain": "Catena del Freddo e Logistica",
          "filterLab": "Laboratori di Controllo Qualità",
          "items": [
                {
                      "id": "citrus-packhouse",
                      "category": "stations",
                      "badge": "Stabilimento Centrale di Lavorazione",
                      "title": "Linea di Calibrazione Ottica Elettronica per Agrumi",
                      "desc": "Telecamere 3D ad alta velocità esaminano calibro, colore e grado Brix di ogni arancia e limone, scartando automaticamente i frutti non conformi.",
                      "specs": "150 Tonnellate / Giorno • Calibrazione Elettronica • Conforme UE",
                      "image": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Selezione Ottica"
                },
                {
                      "id": "citrus-orchards",
                      "category": "farms",
                      "badge": "Agrumeti da Esportazione",
                      "title": "Agrumeti di Arance Valencia, Navel e Limoni Freschi",
                      "desc": "Gestione agronomica integrata con fertirrigazione a goccia e difesa biologica, garantendo la totale assenza di residui fitosanitari nocivi.",
                      "specs": "+250 Feddan Agrumi • Beheira e Nubariya • Global G.A.P",
                      "image": "https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Tenute Certificate"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "Catena del Freddo Rapida",
                      "title": "Celle di Pre-refrigerazione Rapida (Pre-Cooling)",
                      "desc": "La temperatura al cuore del frutto viene abbattuta entro 2 ore dalla raccolta per bloccare la respirazione e mantenere la massima consistenza.",
                      "specs": "Controllo 0–4°C • Umidità Relativa 90–95% • Sensori IoT",
                      "image": "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Pre-refrigerazione"
                },
                {
                      "id": "onions-potatoes-plant",
                      "category": "stations",
                      "badge": "Impianto Lavorazione Cipolle e Patate",
                      "title": "Linee di Spazzolatura, Essiccazione e Insacco",
                      "desc": "Linee avanzate di selezione meccanica e cura per preparare cipolle e patate in sacchi a rete da 10/25 kg e sacconi jumbo da 1 tonnellata.",
                      "specs": "Capacità 80 Tonnellate / Giorno • Calibri Precisi 40/60 a 80/100 mm",
                      "image": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Export Marittimo"
                },
                {
                      "id": "strawberry-farms",
                      "category": "farms",
                      "badge": "Campi di Fragole Protetti",
                      "title": "Coltivazioni Protette e Raccolta Manuale Accurata",
                      "desc": "Raccolta delicata al mattino presto direttamente in cestini da 250g e cartoni refrigerati, spediti via aereo entro 24 ore dalla raccolta.",
                      "specs": "Voli Giornalieri Cargo Aereo • Fortuna & Festival • Residuo Zero",
                      "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Aereo Freschissimo"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "Laboratorio Controllo Qualità",
                      "title": "Laboratorio Agronomico e Monitoraggio dei Limiti MRL",
                      "desc": "Campionamento accurato per verificare gradi Brix, uniformità di calibro e rispetto dei limiti di residuo UE con certificati di analisi ufficiali.",
                      "specs": "Laboratorio Accreditato • Analisi Brix e Residui • ISO 22000",
                      "image": "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Testato in Lab"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "Banchine di Spedizione Logistica",
                      "title": "Banchine Sigillate di Carico Container Refrigerati",
                      "desc": "Banchine a temperatura controllata collegate direttamente ai porti di Alessandria e Damietta, dotate di data logger digitali per il tracciamento continuo.",
                      "specs": "Oltre 10 Container Reefer al Giorno • Data Logger Digitali",
                      "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Carico Refrigerato"
                },
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "Reparto Ortaggi Specializzati",
                      "title": "Impianto di Mondatura e Confezionamento Carciofi Freschi",
                      "desc": "Lavorazione igienica e selezione dei capolini di carciofo fresco confezionati in fusti per alimenti in salamoia e cartoni refrigerati per l'Italia.",
                      "specs": "Calibri 50, 55, 60 mm • Fusti Alimentari e Cartoni Refrigerati",
                      "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Fusti Alimentari"
                }
          ],
          "cta": {
                "title": "Desideri concordare una visita aziendale o ispezionare la merce?",
                "desc": "Accogliamo con piacere i buyer internazionali per visitare le nostre tenute e assistere di persona alle operazioni di calibrazione e imbarco in Egitto.",
                "visitBtn": "Prenota una Visita",
                "quoteBtn": "Richiedi Quotazione e Partita"
          }
    },
    "visitPage": {
          "badge": "Programma di Visita per Importatori e Delegazioni",
          "title": "Prenota una Visita sul Campo e nei Centri di Confezionamento",
          "subtitle": "Accogliamo partner commerciali e importatori per verificare di persona l'intera catena di fornitura: dalla raccolta alla calibratura ottica, al confezionamento e al carico refrigerato.",
          "highlightsTitle": "Cosa comprende la visita sul campo?",
          "highlightsSubtitle": "Un'esperienza dal vivo studiata per importatori e operatori della GDO per verificare qualità e capacità logistica direttamente in stabilimento.",
          "highlights": [
                {
                      "icon": "🌱",
                      "title": "Ispezione Campi e Raccolta",
                      "desc": "Tour guidato negli agrumeti e nelle coltivazioni orticole certificate GlobalG.A.P. per verificare la totale assenza di residui."
                },
                {
                      "icon": "🔬",
                      "title": "Linee di Calibratura Ottica e Laboratorio",
                      "desc": "Dimostrazione delle linee elettroniche ad alta velocità con selezione ottica per peso/colore, test Brix e controlli di laboratorio interno."
                },
                {
                      "icon": "❄️",
                      "title": "Catena del Freddo e Carico Frigorifero",
                      "desc": "Ispezione delle celle di pre-raffreddamento rapido e baie sigillate di carico container reefer con monitoraggio termico."
                },
                {
                      "icon": "🤝",
                      "title": "Incontro Commerciale e Pianificazione",
                      "desc": "Confronto diretto con la direzione export per definire packaging personalizzato, condizioni Incoterms (FOB/CIF) e calendari di carico."
                }
          ],
          "vipServicesTitle": "Accoglienza VIP e Logistica per i Nostri Ospiti",
          "vipServices": [
                {
                      "icon": "✈️",
                      "title": "Transfer Aeroportuali Dedicati",
                      "desc": "Accoglienza riservata all'Aeroporto Internazionale del Cairo (CAI) o Borg El Arab (HBE) e coordinamento alberghiero."
                },
                {
                      "icon": "🌐",
                      "title": "Team Multilingue Dedicato",
                      "desc": "Accompagnamento continuo con responsabili export fluenti in italiano, inglese, francese e spagnolo."
                },
                {
                      "icon": "📋",
                      "title": "Campionatura e Approvazione Immediata",
                      "desc": "Possibilità di prelevare campioni e approvare cartoni, marchi e schede tecniche direttamente sul posto."
                }
          ],
          "form": {
                "title": "Modulo di Prenotazione Visita Delegazione",
                "desc": "Inserisci i dati della delegazione e le strutture da ispezionare. Il nostro coordinatore per le relazioni internazionali ti contatterà entro 24 ore per confermare l'itinerario.",
                "badge": "Riservato a Importatori e Buyer Internazionali",
                "fields": {
                      "fullName": "Nome del Capodelegazione / Referente",
                      "fullNamePlaceholder": "es. Marco Rossi / Laura Bianchi",
                      "company": "Azienda / Ente Importatore",
                      "companyPlaceholder": "es. Ortofrutta Italia Srl",
                      "country": "Paese di residenza / Mercato operativo",
                      "countryPlaceholder": "es. Italia, Svizzera, Germania, Regno Unito...",
                      "email": "Email aziendale ufficiale",
                      "emailPlaceholder": "nome@azienda.it",
                      "phone": "Telefono / WhatsApp (con prefisso)",
                      "phonePlaceholder": "+39 300 000000",
                      "visitDate": "Data di visita preferita",
                      "visitDateHelp": "Si richiede un preavviso minimo di 3 giorni lavorativi per l'organizzazione logistica",
                      "visitorsCount": "Numero di Partecipanti",
                      "visitorsCountPlaceholder": "Seleziona il numero di persone",
                      "visitorsCountOptions": {
                            "one": "1 persona (buyer / decisore)",
                            "two": "2 persone",
                            "threeToFive": "Da 3 a 5 persone (team commerciale & controllo qualità)",
                            "sixPlus": "Più di 5 persone (delegazione commerciale ufficiale)"
                      },
                      "facilitiesTitle": "Strutture e Impianti da Visitare",
                      "facilitiesHelp": "Seleziona una o più strutture in base ai tuoi programmi di importazione",
                      "facilitiesList": {
                            "citrus": "Impianto di calibratura ottica elettronica e confezionamento agrumi (arance Valencia, mandarini, limoni)",
                            "onionPotato": "Centro di lavorazione, pulitura e calibrazione cipolle, patate e aglio",
                            "farms": "Tenute agricole partner, coltivazioni in pieno campo e serre di fragole",
                            "coldChain": "Celle di pre-raffreddamento rapido e baie di carico reefer sigillate",
                            "qualityLab": "Laboratorio controllo qualità, test residui e calibrazione lotti"
                      },
                      "targetCrops": "Colture di Interesse per l'Importazione",
                      "targetCropsPlaceholder": "es. Arance Valencia, Cipolle dorate, Aglio fresco, Fragole, Carciofi...",
                      "airportTransfer": "Assistenza Logistica e Trasporti",
                      "airportTransferLabel": "Sì, richiediamo accoglienza all'aeroporto e trasferimenti con auto dedicata",
                      "notes": "Richieste Particolari e Note Tecniche",
                      "notesPlaceholder": "Operativi voli, preferenze linguistiche o calibri specifici da visionare...",
                      "submitBtn": "Conferma e Invia Richiesta di Visita",
                      "submitting": "Registrazione della visita in corso..."
                },
                "success": {
                      "title": "Richiesta di visita inviata con successo!",
                      "desc": "Grazie per l'interesse. La richiesta è stata inoltrata all'Ufficio Relazioni Internazionali per la conferma dell'itinerario.",
                      "summaryLead": "Riepilogo della richiesta di visita:",
                      "dateLabel": "Data proposta:",
                      "visitorsLabel": "Numero partecipanti:",
                      "facilitiesLabel": "Strutture selezionate:",
                      "anotherBtn": "Prenota un'altra visita",
                      "whatsappSupport": "Per coordinamento VIP immediato o viaggi urgenti, scrivici su WhatsApp:"
                }
          },
          "contactBox": {
                "title": "Coordinamento Visite VIP Diretto",
                "desc": "Sei già in Egitto o hai un arrivo previsto entro 48 ore? Contatta direttamente il responsabile delegazioni per una programmazione express.",
                "whatsappBtn": "Parla con il Coordinatore Visite su WhatsApp",
                "locationLabel": "Sede Centrale Impianti",
                "locationValue": "Autostrada Cairo - Alessandria / Delta del Nilo, Egitto",
                "hoursLabel": "Orari di Accoglienza Delegazioni",
                "hoursValue": "Sabato - Giovedì: 8:00 - 17:00 (Ora locale)",
                "hotlineLabel": "Linea Diretta Delegazioni Estere"
          }
    },
    "farmsPage": {
      "title": "Fattorie & Rete di Approvvigionamento",
      "description": "Una panoramica delle nostre aziende agricole partner e delle aree di produzione lungo il Delta e la valle del Nilo in Egitto.",
      "activeStatus": "Attiva",
      "monitoringStatus": "In monitoraggio",
      "feddanUnit": "Feddan",
      "farmsList": [
        {
          "id": "1",
          "name": "Fattoria Delta Premier",
          "location": "Governatorato di Kafr El-Sheikh",
          "crop": "Verdure e Cipolle",
          "areaFeddan": 12,
          "status": "Attiva"
        },
        {
          "id": "2",
          "name": "Tenuta della Valle del Nilo",
          "location": "Governatorato di Minya",
          "crop": "Agrumi e Frutta",
          "areaFeddan": 8.5,
          "status": "Attiva"
        },
        {
          "id": "3",
          "name": "Tenuta Wadi El-Natrun",
          "location": "Governatorato di Beheira",
          "crop": "Uva e Fragole",
          "areaFeddan": 15,
          "status": "Attiva"
        },
        {
          "id": "4",
          "name": "Tenuta Nubariya",
          "location": "Nubariya",
          "crop": "Arance Valencia e Patate",
          "areaFeddan": 22,
          "status": "Attiva"
        }
      ]
    },
    "irrigationPage": {
      "title": "Gestione dell'Irrigazione e dell'Acqua",
      "description": "Monitoraggio dell'efficienza idrica e dei sistemi di irrigazione moderni e sostenibili nelle nostre fattorie.",
      "nextIrrigation": "Prossima irrigazione:",
      "waterConsumption": "Consumo d'acqua:",
      "litersUnit": "Litri",
      "records": [
        {
          "id": "1",
          "farmName": "Fattoria Delta Premier",
          "nextIrrigation": "Oggi 18:00",
          "waterUsedLiters": 12500
        },
        {
          "id": "2",
          "farmName": "Tenuta Valle del Nilo",
          "nextIrrigation": "Domani 05:30",
          "waterUsedLiters": 8200
        }
      ]
    }
  },
  "es": {
    "brandName": "AgriPort",
    "brandSubtitle": "Portal de Exportación Hortofrutícola",
    "tagline": "Exportación de Frutas y Verduras Frescas de Primera Calidad a Mercados Mundiales",
    "nav": {
      "home": "Inicio",
      "products": "Productos",
      "facilities": "Instalaciones",
      "capabilities": "Instalaciones",
      "company": "Empresa",
      "about": "Sobre Nosotros",
      "contact": "Contacto",
      "contactSales": "Contactar Ventas"
    },
    "cta": "Solicitar Cotización",
    "language": "Idioma",
    "trust": {
      "standards": "Certificado según estándares internacionales"
    },
    "hero": {
      "pillTag": "Anuncio de la temporada de cosecha 2026",
      "headlineMain": "Agricultura Global,",
      "headlineSub": "Entregada con Precisión.",
      "leadParagraph": "La infraestructura para el comercio internacional de productos agrícolas. Suministramos, procesamos y enviamos cosechas premium con una eficiencia logística inigualable.",
      "btnPrimary": "Iniciar Suministro",
      "btnSecondary": "Explorar Catálogo",
      "badge": "Exportación Agrícola Certificada | Cosechas Frescas de Egipto",
      "titlePart1": "Exportamos las mejores",
      "titleHighlight": "Frutas y Verduras Frescas",
      "titlePart2": "desde Egipto hacia los principales puertos del mundo",
      "subtitle": "Su socio estratégico y de confianza para el suministro y exportación de productos agrícolas (cítricos, cebollas, ajo, fresas, granadas, uvas, patatas) con clasificación óptica avanzada, cadena de frío continua y fletes marítimos y aéreos directos.",
      "browseCatalog": "Ver Catálogo de Productos",
      "requestDeals": "Solicitar Cotización y Envíos",
      "stats": {
        "countries": {
          "value": "+25",
          "label": "Países Importadores"
        },
        "standards": {
          "value": "100%",
          "label": "Conforme a Normas UE"
        },
        "coldChain": {
          "value": "Cadena de Frío",
          "label": "Frescura Garantizada"
        },
        "terms": {
          "value": "FOB & CIF",
          "label": "Términos de Entrega Flexibles"
        }
      }
    },
    "bento": {
      "title": "Diseñado para la calidad a escala.",
      "subtitle": "Un catálogo simplificado de productos para exportación, respaldado por una cadena de frío moderna.",
      "card1Tag": "Rendimiento Premium",
      "card1Title": "Exportaciones de Cítricos",
      "card1Desc": "Naranjas y limones egipcios de Clase A.",
      "card2Title": "Integridad de la Cadena de Frío",
      "card2Desc": "Control de temperatura de extremo a extremo que garantiza cero degradación del campo al puerto de destino.",
      "card3Title": "Tubérculos y Raíces",
      "card3Desc": "Patatas para exportación",
      "card4Title": "Centro de Suministro Personalizado",
      "card4Desc": "¿No encuentra el cultivo requerido? Aproveche nuestra red de socios para obtener volúmenes específicos directamente de productores certificados.",
      "card4Cta": "Solicitar pedido personalizado"
    },
    "features": {
      "sectionTitlePre": "¿Por qué los Grandes Importadores Eligen",
      "sectionTitleHighlight": "Agri Port",
      "sectionTitlePost": "?",
      "sectionSubtitle": "Garantizamos productos hortofrutícolas que cumplen al 100% con las especificaciones acordadas, con absoluta puntualidad logística.",
      "moreDetails": "Más Detalles",
      "items": [
        {
          "icon": "🍊",
          "title": "Catálogo de Frutas y Verduras Frescas",
          "body": "Naranjas Valencia y Navel, cebollas rojas y doradas, ajo fresco, fresas, granadas y patatas calibradas para los mercados europeos.",
          "badge": "Fresco y Calibrado"
        },
        {
          "icon": "📦",
          "title": "Centros de Empaque y Cadena de Frío",
          "body": "Líneas de selección óptica de alta tecnología, pre-enfriamiento rápido y cajas de cartón reforzado que conservan la frescura hasta el puerto de destino.",
          "badge": "Empaque Certificado"
        },
        {
          "icon": "🤝",
          "title": "Contratos B2B y Facilidades Logísticas",
          "body": "Acuerdos de suministro flexibles, envíos marítimos programados, certificados fitosanitarios y certificados de origen oficiales.",
          "badge": "Para Importadores"
        }
      ]
    },
    "productsPage": {
      "title": "Catálogo de Exportación Hortofrutícola",
      "description": "Una selección de primera calidad de productos agrícolas frescos egipcios preparados para la exportación internacional bajo certificaciones Global G.A.P, ISO y normativas fitosanitarias de la Unión Europea.",
      "statusTitle": "Principales Cosechas Disponibles para Exportación",
      "statusDesc": "Cosechadas, seleccionadas y empacadas con cuidado para cumplir con los estrictos estándares de los mercados mayoristas y cadenas europeas:",
      "seasonLabel": "Temporada de Exportación",
      "packagingLabel": "Tipos de Empaque",
      "specsLabel": "Calibres y Especificaciones",
      "requestQuoteBtn": "Solicitar Cotización de este Producto",
      "productsList": [
        {
          "id": "citrus",
          "name": "Cítricos y Naranjas de Egipto",
          "variety": "Naranjas Valencia, Navel, Limones Frescos, Mandarinas",
          "season": "Noviembre — Mayo",
          "pack": "Cajas telescópicas de 15 kg, Open Top, Mallas",
          "specs": "Calibres: 40, 48, 56, 64, 72, 80, 88",
          "icon": "🍊",
          "category": "Cítricos"
        },
        {
          "id": "onions",
          "name": "Cebollas Frescas de Egipto (Rojas y Doradas)",
          "variety": "Cebolla roja tipo italiano, Cebolla dorada curada al sol",
          "season": "Febrero — Agosto",
          "pack": "Sacos de malla de 10 kg y 25 kg, Jumbo Bags de 1 tonelada",
          "specs": "Tamaños: 40/60 mm, 50/70 mm, 70/90 mm, 80/100 mm",
          "icon": "🧅",
          "category": "Verduras"
        },
        {
          "id": "strawberries",
          "name": "Fresas Frescas Dulces",
          "variety": "Fortuna, Festival, Sensation",
          "season": "Noviembre — Marzo",
          "pack": "Tarrinas de 250g en cajas planas de 2 kg y 2,5 kg",
          "specs": "Carga aérea refrigerada directa, residuo químico controlado",
          "icon": "🍓",
          "category": "Frutas"
        },
        {
          "id": "pomegranates",
          "name": "Granadas Wonderful Extra",
          "variety": "Variedad Wonderful rojo intenso, alto grado de dulzura Brix",
          "season": "Septiembre — Diciembre",
          "pack": "Cajas de 4,5 kg y 5,0 kg (en tarrina o alvéolo)",
          "specs": "Conteos: 6, 7, 8, 9, 10, 12, 14 frutos por caja",
          "icon": "🍎",
          "category": "Frutas"
        },
        {
          "id": "potatoes",
          "name": "Patatas para Consumo e Industria",
          "variety": "Spunta, Mondial, Lady Rosetta, Cara",
          "season": "Enero — Junio",
          "pack": "Sacos de malla de 10 kg, 25 kg, Jumbo Bags de 1250 kg",
          "specs": "Lavadas o cepilladas, calibres 35/55 mm y 55+ mm",
          "icon": "🥔",
          "category": "Verduras"
        },
        {
          "id": "grapes",
          "name": "Uvas de Mesa Sin Semillas",
          "variety": "Early Sweet, Superior, Flame Seedless, Crimson",
          "season": "Mayo — Agosto",
          "pack": "Tarrinas de 500g o bolsas perforadas en cajas de 4,5 kg",
          "specs": "Alto nivel Brix, diámetro de baya 18-22 mm+",
          "icon": "🍇",
          "category": "Frutas"
        },
        {
          "id": "artichoke",
          "name": "Alcachofas Frescas Egipcias",
          "variety": "Alcachofa Francesa, Variedad Baladi",
          "season": "Noviembre — Mayo",
          "pack": "Tambores Alimentarios de Exportación, Cajas Refrigeradas",
          "specs": "Calibres: 50, 55, 60 mm Primera Calidad",
          "icon": "🌱",
          "category": "Verduras"
        }
      ]
    },
    "aboutPage": {
      "title": "Sobre Agri Port — Exportación Agrícola",
      "subtitle": "Exportando la mejor cosecha de las fértiles tierras de Egipto a los principales mercados europeos y mundiales.",
      "description": "Agri Port es su socio estratégico en Egipto para la importación directa de frutas y verduras frescas. Con modernas estaciones de empaque, sistemas de calibración electrónica y una cadena de frío integrada, garantizamos la entrega de cargamentos en óptimas condiciones, cumpliendo con todos los estándares europeos (Global G.A.P, ISO, BRC).",
      "pillars": [
        {
          "icon": "🌍",
          "title": "Presencia en más de 25 Mercados",
          "desc": "Envíos regulares a España, Italia, Francia, Alemania, Reino Unido, países del Golfo y África."
        },
        {
          "icon": "🏆",
          "title": "Control de Calidad Riguroso",
          "desc": "Análisis periódicos de residuos de pesticidas, clasificación óptica por color y calibración conforme a las normativas de la UE."
        },
        {
          "icon": "⚡",
          "title": "Cadena de Frío y Logística Rápida",
          "desc": "Transporte marítimo en contenedores refrigerados (Reefer) y transporte aéreo rápido desde Alejandría, Damietta, Port Said y el Aeropuerto de El Cairo."
        }
      ]
    },
    "contactPage": {
      "title": "Contáctenos y Solicite una Cotización",
      "description": "Damos la bienvenida a pedidos de compra, contratos continuos y solicitudes de distribuidores mayoristas de productos frescos. Contáctenos para cotizaciones inmediatas FOB o CIF.",
      "directTitle": "Departamento Comercial de Exportación",
      "directDesc": "Hable directamente con nuestros responsables de ventas internacionales y logística:",
      "emailLabel": "Correo Electrónico Comercial",
      "phoneLabel": "Teléfono y WhatsApp de Exportación",
      "locationLabel": "Sede Central y Centros de Operación",
      "locationValue": "República Árabe de Egipto — Gobernación de Beheira / Kafr El-Dawar",
      "formTitle": "Solicitud de Cotización o Acuerdo de Suministro",
      "formDesc": "Complete los datos del cargamento deseado a continuación y nuestro equipo le responderá con precios y disponibilidad en pocas horas:",
      "fields": {
        "name": "Nombre de Contacto",
        "namePlaceholder": "ej: Carlos Martínez o John Smith",
        "company": "Empresa / Empresa Importadora",
        "companyPlaceholder": "Nombre de su empresa",
        "country": "País de Destino",
        "countryPlaceholder": "España, Italia, Francia, Alemania, México...",
        "email": "Correo Electrónico Empresarial",
        "emailPlaceholder": "importador@empresa.com",
        "phone": "Teléfono / WhatsApp",
        "phonePlaceholder": "+34 600 000 000",
        "product": "Producto Requerido",
        "productPlaceholder": "Naranjas Valencia, Cebollas Rojas, Fresas, Granadas...",
        "quantity": "Volumen Estimado",
        "quantityPlaceholder": "ej: 4 Contenedores Reefer (100 Ton) o pedido de prueba",
        "incoterms": "Términos Incoterms",
        "destinationPort": "Puerto de Destino",
        "destinationPortPlaceholder": "ej: Puerto de Valencia, Barcelona, Algeciras, Génova...",
        "message": "Especificaciones y Notas Adicionales",
        "messagePlaceholder": "Calibres deseados, tipo de empaque, ventana de envío...",
        "submitBtn": "Enviar Solicitud de Cotización",
        "successMsg": "¡Su solicitud ha sido recibida con éxito! Nuestro equipo de exportación se pondrá en contacto con usted a la brevedad.",
        "submitAnotherBtn": "Enviar otra consulta",
        "submittingBtn": "Enviando..."
      },
      "selectedCropBadge": "Cultivo seleccionado para cotización",
      "clearSelection": "Borrar selección"
    },
    "footer": {
      "rights": "Todos los derechos reservados",
      "subtext": "Portal de Exportación Hortofrutícola desde Egipto hacia los Puertos del Mundo",
      "ctaTitle": "¿Listo para optimizar su cadena de suministro?",
      "ctaDesc": "Póngase en contacto con nuestro equipo comercial para coordinar volúmenes, logística y asegurar un canal B2B confiable.",
      "emailPlaceholder": "nombre@empresa.com",
      "btnContact": "Contáctenos",
      "colPlatform": "Plataforma",
      "linkProducts": "Catálogo de Productos",
      "linkColdChain": "Infraestructura de Cadena de Frío",
      "linkCertifications": "Certificaciones",
      "colCompany": "Empresa",
      "linkAbout": "Sobre AgriPort",
      "linkFarms": "Fincas Asociadas",
      "linkLegal": "Legal y Comercio"
    },
    "facilitiesPage": {
          "title": "Instalaciones de Exportación, Estaciones de Empaque y Fincas",
          "subtitle": "Infraestructura avanzada que integra modernas líneas de calibrado óptico, plantas certificadas y una cadena de frío rápida desde el campo hasta el puerto.",
          "badge": "Nuestras Instalaciones",
          "stats": {
                "stations": "Estaciones de Empaque",
                "stationsVal": "4 Plantas Certificadas",
                "farms": "Superficie Agrícola Supervisada",
                "farmsVal": "+500 Feddans",
                "coldChain": "Cadena de Frío Continua",
                "coldChainVal": "100% Control Térmico",
                "capacity": "Capacidad Diaria de Calibrado",
                "capacityVal": "+200 Toneladas / Día"
          },
          "videoBadge": "Vídeo Documental en Directo",
          "videoTitle": "En Vídeo: Calibrado Automatizado, Empaque y Cadena de Frío en Acción",
          "videoDesc": "Tecnología de calibración electrónica por tamaño, color y nivel brix, conservando la máxima frescura para los mercados internacionales.",
          "videoPlayBtn": "Ver Recorrido en Vídeo",
          "videoDuration": "Recorrido Documental • 02:45 min",
          "filterAll": "Todas las Instalaciones",
          "filterStations": "Plantas de Empaque",
          "filterFarms": "Fincas y Huertos",
          "filterColdChain": "Cadena de Frío y Logística",
          "filterLab": "Laboratorios de Control de Calidad",
          "items": [
                {
                      "id": "citrus-packhouse",
                      "category": "stations",
                      "badge": "Planta Central de Empaque",
                      "title": "Línea de Calibrado Óptico Electrónico para Cítricos",
                      "desc": "Cámaras 3D de alta velocidad analizan calibre, color y nivel Brix de cada naranja y limón, descartando de forma automática las piezas no conformes.",
                      "specs": "Capacidad 150 Ton / Día • Calibrado Electrónico • Conforme UE",
                      "image": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Calibrado Óptico"
                },
                {
                      "id": "citrus-orchards",
                      "category": "farms",
                      "badge": "Huertos de Exportación",
                      "title": "Huertos de Naranja Valencia, Navel y Limón Fresco",
                      "desc": "Manejo agrícola integrado con fertirrigación por goteo automatizada y biocontrol, garantizando la total ausencia de residuos fitosanitarios nocivos.",
                      "specs": "+250 Feddans Cítricos • Beheira y Nubariya • Global G.A.P",
                      "image": "https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Fincas Certificadas"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "Cadena de Frío Rápida",
                      "title": "Túneles de Pre-enfriamiento Rápido (Pre-Cooling)",
                      "desc": "La temperatura interna de la fruta se reduce en menos de 2 horas tras la cosecha para frenar la respiración y mantener la máxima firmeza y frescura.",
                      "specs": "Control 0–4°C • Humedad Relativa 90–95% • Sensores IoT",
                      "image": "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Pre-enfriamiento"
                },
                {
                      "id": "onions-potatoes-plant",
                      "category": "stations",
                      "badge": "Planta de Cebollas y Patatas",
                      "title": "Líneas de Limpieza, Secado, Calibrado y Ensacado",
                      "desc": "Líneas mecánicas de precisión preparando cebollas y patatas en sacos de malla de 10/25 kg y sacas jumbo de 1 tonelada para exportación marítima.",
                      "specs": "Capacidad 80 Ton / Día • Calibres Precisos 40/60 a 80/100 mm",
                      "image": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Exportación Marítima"
                },
                {
                      "id": "strawberry-farms",
                      "category": "farms",
                      "badge": "Campos de Fresas en Macrotúnel",
                      "title": "Cultivos Protegidos y Recolección Manual Cuidadosa",
                      "desc": "Cosecha manual a primera hora en tarrinas de 250g y cajas refrigeradas, despachadas por transporte aéreo en menos de 24 horas desde la recolección.",
                      "specs": "Vuelos Diarios Carga Aérea • Fortuna y Festival • Cero Residuos",
                      "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Carga Aérea Fresca"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "Laboratorio de Control de Calidad",
                      "title": "Laboratorio Agronómico y Control de Límites LMR",
                      "desc": "Muestreo sistemático verificando grados Brix, homogeneidad de calibre y límites de residuos de la UE con certificados analíticos oficiales.",
                      "specs": "Laboratorio Acreditado • Análisis Brix y Residuos • ISO 22000",
                      "image": "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Control de Calidad"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "Muelles de Embarque y Logística",
                      "title": "Muelles Refrigerados de Carga de Contenedores Reefer",
                      "desc": "Muelles estancos a temperatura controlada conectados con los puertos de Alejandría y Damietta, con data loggers digitales que registran cada milla náutica.",
                      "specs": "+10 Contenedores Reefer al Día • Seguimiento Térmico Digital",
                      "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Carga Refrigerada"
                },
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "Sección de Hortalizas Especiales",
                      "title": "Unidad de Pelado, Calibrado y Empaque de Alcachofas",
                      "desc": "Líneas higiénicas de corte y calibrado de alcachofas frescas envasadas en barriles alimentarios en salmuera y cajas refrigeradas para Europa.",
                      "specs": "Calibres 50, 55, 60 mm • Barriles Alimentarios y Cajas Refrigeradas",
                      "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80",
                      "tag": "Barriles Alimentarios"
                }
          ],
          "cta": {
                "title": "¿Desea programar una visita a nuestras instalaciones o inspeccionar sus lotes?",
                "desc": "Invitamos cordialmente a nuestros socios importadores internacionales a recorrer nuestras fincas y supervisar en persona los procesos de calibrado y carga en Egipto.",
                "visitBtn": "Solicitar Visita Técnica",
                "quoteBtn": "Solicitar Cotización y Embarque"
          }
    },
    "visitPage": {
          "badge": "Programa de Visitas para Importadores y Delegaciones",
          "title": "Reservar una Visita de Campo y Estaciones de Empaque",
          "subtitle": "Invitamos a socios comerciales e importadores a inspeccionar de primera mano toda nuestra cadena de suministro: desde la cosecha hasta la selección óptica, el empaque y el despacho refrigerado.",
          "highlightsTitle": "¿Qué incluye la visita de campo?",
          "highlightsSubtitle": "Una experiencia práctica diseñada para importadores internacionales y cadenas de distribución para constatar la calidad y capacidad logística in situ.",
          "highlights": [
                {
                      "icon": "🌱",
                      "title": "Inspección de Fincas y Cosecha",
                      "desc": "Recorrido guiado por huertos de cítricos y cultivos de hortalizas con certificación GlobalG.A.P. y manejo libre de residuos."
                },
                {
                      "icon": "🔬",
                      "title": "Líneas de Calibrado Óptico y Laboratorio",
                      "desc": "Demostración de líneas de calibrado electrónico de alta velocidad por peso/color, pruebas de Brix y controles del laboratorio de calidad."
                },
                {
                      "icon": "❄️",
                      "title": "Cadena de Frío y Despacho Frigorífico",
                      "desc": "Inspección de cámaras de pre-enfriamiento rápido y muelles herméticos de carga en contenedores reefer con registro de temperatura."
                },
                {
                      "icon": "🤝",
                      "title": "Reunión Comercial y Planificación",
                      "desc": "Encuentro directo con la dirección de exportación para acordar empaques a medida, términos Incoterms (FOB/CIF) y cronogramas de carga."
                }
          ],
          "vipServicesTitle": "Hospitalidad VIP y Logística para Nuestros Invitados",
          "vipServices": [
                {
                      "icon": "✈️",
                      "title": "Traslados de Aeropuerto Exclusivos",
                      "desc": "Recepción personalizada en el Aeropuerto Internacional de El Cairo (CAI) o Borg El Arab (HBE) y coordinación de hospedaje."
                },
                {
                      "icon": "🌐",
                      "title": "Equipo Técnico Multilingüe",
                      "desc": "Acompañamiento por directores de exportación con dominio fluido de español, inglés, francés e italiano."
                },
                {
                      "icon": "📋",
                      "title": "Toma de Muestras y Aprobación In Situ",
                      "desc": "Posibilidad de tomar muestras y aprobar etiquetado de cajas y especificaciones técnicas directamente en la planta."
                }
          ],
          "form": {
                "title": "Formulario de Reserva de Visita para Delegaciones",
                "desc": "Complete los datos de su delegación y las instalaciones de su interés. Nuestro coordinador de relaciones internacionales le contactará en menos de 24 horas para definir el itinerario.",
                "badge": "Exclusivo para Importadores y Compradores Comerciales",
                "fields": {
                      "fullName": "Nombre del Jefe de Delegación / Representante",
                      "fullNamePlaceholder": "ej. Carlos Ruiz / Elena Gómez",
                      "company": "Empresa / Entidad Importadora",
                      "companyPlaceholder": "ej. Importadora Frutícola Internacional S.A.",
                      "country": "País de residencia / Mercado de destino",
                      "countryPlaceholder": "ej. España, México, Reino Unido, Alemania...",
                      "email": "Correo electrónico corporativo",
                      "emailPlaceholder": "nombre@empresa.com",
                      "phone": "Teléfono / WhatsApp (con prefijo internacional)",
                      "phonePlaceholder": "+34 600 000000",
                      "visitDate": "Fecha propuesta de visita",
                      "visitDateHelp": "Se sugiere coordinar con un mínimo de 3 días laborables de antelación para gestiones logísticas",
                      "visitorsCount": "Número de personas en la delegación",
                      "visitorsCountPlaceholder": "Seleccione el número de visitantes",
                      "visitorsCountOptions": {
                            "one": "1 persona (comprador / directivo)",
                            "two": "2 personas",
                            "threeToFive": "De 3 a 5 personas (equipo comercial y control de calidad)",
                            "sixPlus": "Más de 5 personas (delegación oficial de compras)"
                      },
                      "facilitiesTitle": "Instalaciones y Módulos a Inspeccionar",
                      "facilitiesHelp": "Seleccione una o varias plantas según sus objetivos de importación",
                      "facilitiesList": {
                            "citrus": "Planta de calibrado óptico electrónico y empaque de cítricos (naranja Valencia, mandarinas, limones)",
                            "onionPotato": "Planta de procesamiento, calibrado y empaque de cebollas, patatas y ajo",
                            "farms": "Fincas colaboradoras, plantaciones a cielo abierto y cultivos de fresas",
                            "coldChain": "Cámaras de pre-enfriamiento rápido y muelles de carga reefer sellados",
                            "qualityLab": "Laboratorio de control de calidad, análisis de residuos y calibrado"
                      },
                      "targetCrops": "Cultivos de Interés para Importar",
                      "targetCropsPlaceholder": "ej. Naranjas Valencia, Cebollas doradas, Ajo fresco, Fresas, Alcachofas...",
                      "airportTransfer": "Asistencia de Transporte y Logística",
                      "airportTransferLabel": "Sí, deseamos coordinar recepción en el aeropuerto y transporte terrestre privado",
                      "notes": "Requerimientos Especiales o Notas Técnicas",
                      "notesPlaceholder": "Detalles de vuelos, preferencia de idioma o calibres específicos a evaluar...",
                      "submitBtn": "Confirmar y Enviar Solicitud de Visita",
                      "submitting": "Registrando la solicitud de visita..."
                },
                "success": {
                      "title": "¡Solicitud de visita enviada con éxito!",
                      "desc": "Gracias por su interés. Su solicitud ha sido enviada al área de Relaciones Internacionales para coordinar la agenda.",
                      "summaryLead": "Resumen de la solicitud:",
                      "dateLabel": "Fecha propuesta:",
                      "visitorsLabel": "Tamaño de delegación:",
                      "facilitiesLabel": "Instalaciones seleccionadas:",
                      "anotherBtn": "Reservar otra visita",
                      "whatsappSupport": "Para coordinación VIP inmediata o visitas urgentes, comuníquese por WhatsApp:"
                }
          },
          "contactBox": {
                "title": "Coordinación Directa de Visitas VIP",
                "desc": "¿Ya se encuentra en Egipto o viaja en las próximas 48 horas? Hable directamente con nuestro coordinador de delegaciones para una programación express.",
                "whatsappBtn": "Hablar con el Coordinador de Visitas por WhatsApp",
                "locationLabel": "Ubicación de las Plantas",
                "locationValue": "Carretera El Cairo - Alejandría / Delta del Nilo, Egipto",
                "hoursLabel": "Horario de Recepción",
                "hoursValue": "Sábado - Jueves: 8:00 - 17:00 (Hora local)",
                "hotlineLabel": "Línea Directa para Delegaciones Internacionales"
          }
    },
    "farmsPage": {
      "title": "Fincas y Red de Abastecimiento",
      "description": "Una visión general de nuestras fincas asociadas y núcleos de producción agrícola a lo largo del Delta y Valle del Nilo en Egipto.",
      "activeStatus": "Activa",
      "monitoringStatus": "En seguimiento",
      "feddanUnit": "Feddan",
      "farmsList": [
        {
          "id": "1",
          "name": "Finca Delta Premier",
          "location": "Gobernación de Kafr El-Sheikh",
          "crop": "Verduras y Cebollas",
          "areaFeddan": 12,
          "status": "Activa"
        },
        {
          "id": "2",
          "name": "Finca Valle del Nilo",
          "location": "Gobernación de Minya",
          "crop": "Cítricos y Frutas",
          "areaFeddan": 8.5,
          "status": "Activa"
        },
        {
          "id": "3",
          "name": "Huertos de Wadi El-Natrun",
          "location": "Gobernación de Beheira",
          "crop": "Uvas y Fresas",
          "areaFeddan": 15,
          "status": "Activa"
        },
        {
          "id": "4",
          "name": "Finca de Nubariya",
          "location": "Nubariya",
          "crop": "Naranjas Valencia y Patatas",
          "areaFeddan": 22,
          "status": "Activa"
        }
      ]
    },
    "irrigationPage": {
      "title": "Gestión del Riego y del Agua",
      "description": "Monitoreo de la eficiencia hídrica y de los sistemas de riego modernos y sostenibles en nuestras fincas.",
      "nextIrrigation": "Próximo riego:",
      "waterConsumption": "Consumo de agua:",
      "litersUnit": "Litros",
      "records": [
        {
          "id": "1",
          "farmName": "Finca Delta Premier",
          "nextIrrigation": "Hoy 18:00",
          "waterUsedLiters": 12500
        },
        {
          "id": "2",
          "farmName": "Finca Valle del Nilo",
          "nextIrrigation": "Mañana 05:30",
          "waterUsedLiters": 8200
        }
      ]
    }
  }
} as const;

export function getProductStatusTranslation(
  status: string,
  language: Language
): string {
  if (language === "ar") return status;
  const normalized = status?.trim();
  const map: Record<string, Record<Language, string>> = {
    "متاح للتصدير": {
      en: "Available for Export",
      fr: "Disponible à l'export",
      it: "Disponibile per l'esportazione",
      es: "Disponible para exportación",
      ar: "متاح للتصدير",
    },
    "موسم قادم": {
      en: "Upcoming Season",
      fr: "Saison à venir",
      it: "Prossima stagione",
      es: "Próxima temporada",
      ar: "موسم قادم",
    },
    "نفد مؤقتاً": {
      en: "Temporarily Out of Stock",
      fr: "Temporairement épuisé",
      it: "Esaurito temporaneamente",
      es: "Agotado temporalmente",
      ar: "نفد مؤقتاً",
    },
  };
  return map[normalized]?.[language] || normalized || status;
}

export function getProductCategoryTranslation(
  category: string,
  language: Language
): string {
  if (language === "ar") return category;
  const normalized = category?.trim();
  const map: Record<string, Record<Language, string>> = {
    "موالح": {
      en: "Citrus",
      fr: "Agrumes",
      it: "Agrumi",
      es: "Cítricos",
      ar: "موالح",
    },
    "خضروات": {
      en: "Vegetables",
      fr: "Légumes",
      it: "Verdure",
      es: "Verduras",
      ar: "خضروات",
    },
    "فواكه": {
      en: "Fruits",
      fr: "Fruits",
      it: "Frutta",
      es: "Frutas",
      ar: "فواكه",
    },
    "أخرى": {
      en: "Other",
      fr: "Autres",
      it: "Altro",
      es: "Otros",
      ar: "أخرى",
    },
  };
  return map[normalized]?.[language] || normalized || category;
}

export function getProductSeasonTranslation(
  season: string,
  language: Language
): string {
  if (language === "ar" || !season) return season;
  let text = season;
  const monthMap: Record<Language, Record<string, string>> = {
    en: {
      "يناير": "January",
      "فبراير": "February",
      "مارس": "March",
      "إبريل": "April",
      "ابريل": "April",
      "مايو": "May",
      "يونيو": "June",
      "يوليو": "July",
      "أغسطس": "August",
      "اغسطس": "August",
      "سبتمبر": "September",
      "أكتوبر": "October",
      "اكتوبر": "October",
      "نوفمبر": "November",
      "ديسمبر": "December",
      "طوال العام": "All Year Round",
      "طوال الموسم": "All Season Long",
    },
    fr: {
      "يناير": "Janvier",
      "فبراير": "Février",
      "مارس": "Mars",
      "إبريل": "Avril",
      "ابريل": "Avril",
      "مايو": "Mai",
      "يونيو": "Juin",
      "يوليو": "Juillet",
      "أغسطس": "Août",
      "اغسطس": "Août",
      "سبتمبر": "Septembre",
      "أكتوبر": "Octobre",
      "اكتوبر": "Octobre",
      "نوفمبر": "Novembre",
      "ديسمبر": "Décembre",
      "طوال العام": "Toute l'année",
      "طوال الموسم": "Toute la saison",
    },
    it: {
      "يناير": "Gennaio",
      "فبراير": "Febbraio",
      "مارس": "Marzo",
      "إبريل": "Aprile",
      "ابريل": "Aprile",
      "مايو": "Maggio",
      "يونيو": "Giugno",
      "يوليو": "Luglio",
      "أغسطس": "Agosto",
      "اغسطس": "Agosto",
      "سبتمبر": "Settembre",
      "أكتوبر": "Ottobre",
      "اكتوبر": "Ottobre",
      "نوفمبر": "Novembre",
      "ديسمبر": "Dicembre",
      "طوال العام": "Tutto l'anno",
      "طوال الموسم": "Tutta la stagione",
    },
    es: {
      "يناير": "Enero",
      "فبراير": "Febrero",
      "مارس": "Marzo",
      "إبريل": "Abril",
      "ابريل": "Abril",
      "مايو": "Mayo",
      "يونيو": "Junio",
      "يوليو": "Julio",
      "أغسطس": "Agosto",
      "اغسطس": "Agosto",
      "سبتمبر": "Septiembre",
      "أكتوبر": "Octubre",
      "اكتوبر": "Octubre",
      "نوفمبر": "Noviembre",
      "ديسمبر": "Diciembre",
      "طوال العام": "Todo el año",
      "طوال الموسم": "Toda la temporada",
    },
    ar: {},
  };

  const currentMap = monthMap[language] || monthMap.en;
  for (const [arWord, transWord] of Object.entries(currentMap)) {
    text = text.replace(new RegExp(arWord, "g"), transWord);
  }
  return text;
}

const AGRI_PHRASE_DICT: Record<string, Record<Language, string>> = {
  // Crop Names & Varieties
  "الخرشوف المصري الفاخر": {
    en: "Premium Egyptian Artichokes",
    fr: "Artichauts Égyptiens Supérieurs",
    it: "Carciofi Egiziani Superiori",
    es: "Alcachofas Egipcias Prémium",
    ar: "الخرشوف المصري الفاخر",
  },
  "خرشوف مصري": {
    en: "Egyptian Fresh Artichokes",
    fr: "Artichauts Égyptiens Frais",
    it: "Carciofi Freschi Egiziani",
    es: "Alcachofas Frescas Egipcias",
    ar: "خرشوف مصري",
  },
  "خرشوف فرنساوي": {
    en: "French Artichoke Variety",
    fr: "Variété d'Artichaut Français",
    it: "Varietà di Carciofo Francese",
    es: "Variedad de Alcachofa Francesa",
    ar: "خرشوف فرنساوي",
  },
  "خرشوف بلدي": {
    en: "Baladi Artichoke Variety",
    fr: "Variété d'Artichaut Baladi",
    it: "Varietà di Carciofo Baladi",
    es: "Variedad de Alcachofa Baladi",
    ar: "خرشوف بلدي",
  },
  "خرشوف": {
    en: "Artichokes",
    fr: "Artichauts",
    it: "Carciofi",
    es: "Alcachofas",
    ar: "خرشوف",
  },
  "ثوم مصري": {
    en: "Egyptian Fresh Garlic",
    fr: "Ail Frais Égyptien",
    it: "Aglio Fresco Egiziano",
    es: "Ajo Fresco Egipcio",
    ar: "ثوم مصري",
  },
  "ثوم أحمر": {
    en: "Red Garlic",
    fr: "Ail Rouge",
    it: "Aglio Rosso",
    es: "Ajo Rojo",
    ar: "ثوم أحمر",
  },
  "ثوم أبيض": {
    en: "White Garlic",
    fr: "Ail Blanc",
    it: "Aglio Bianco",
    es: "Ajo Blanco",
    ar: "ثوم أبيض",
  },
  "ثوم": {
    en: "Garlic",
    fr: "Ail",
    it: "Aglio",
    es: "Ajo",
    ar: "ثوم",
  },
  "بصل أحمر إيطالي": {
    en: "Italian Red Onions",
    fr: "Oignons Rouges Italiens",
    it: "Cipolle Rosse Italiane",
    es: "Cebollas Rojas Italianas",
    ar: "بصل أحمر إيطالي",
  },
  "بصل ذهبي مجفف طبيعياً": {
    en: "Naturally Dried Golden Onions",
    fr: "Oignons Jaunes Séchés Naturellement",
    it: "Cipolle Dorate Essiccate Naturalmente",
    es: "Cebollas Doradas Secadas Naturalmente",
    ar: "بصل ذهبي مجفف طبيعياً",
  },
  "البصل المصري (الأحمر والذهبي)": {
    en: "Egyptian Onions (Red & Golden)",
    fr: "Oignons Égyptiens (Rouges & Jaunes)",
    it: "Cipolle Egiziane (Rosse e Dorate)",
    es: "Cebollas Egipcias (Rojas y Doradas)",
    ar: "البصل المصري (الأحمر والذهبي)",
  },
  "بصل مصري": {
    en: "Egyptian Onions",
    fr: "Oignons Égyptiens",
    it: "Cipolle Egiziane",
    es: "Cebollas Egipcias",
    ar: "بصل مصري",
  },
  "بصل أحمر": {
    en: "Red Onions",
    fr: "Oignons Rouges",
    it: "Cipolle Rosse",
    es: "Cebollas Rojas",
    ar: "بصل أحمر",
  },
  "بصل ذهبي": {
    en: "Golden Onions",
    fr: "Oignons Jaunes",
    it: "Cipolle Dorate",
    es: "Cebollas Doradas",
    ar: "بصل ذهبي",
  },
  "بصل أصفر": {
    en: "Yellow Onions",
    fr: "Oignons Jaunes",
    it: "Cipolle Gialle",
    es: "Cebollas Amarillas",
    ar: "بصل أصفر",
  },
  "بصل أبيض": {
    en: "White Onions",
    fr: "Oignons Blancs",
    it: "Cipolle Bianche",
    es: "Cebollas Blancas",
    ar: "بصل أبيض",
  },
  "بصل": {
    en: "Onions",
    fr: "Oignons",
    it: "Cipolle",
    es: "Cebollas",
    ar: "بصل",
  },
  "البطاطس المجهزة للتصدير": {
    en: "Egyptian Export Potatoes",
    fr: "Pommes de Terre d'Exportation",
    it: "Patate da Esportazione",
    es: "Patatas de Exportación",
    ar: "البطاطس المجهزة للتصدير",
  },
  "بطاطس مصرية": {
    en: "Egyptian Potatoes",
    fr: "Pommes de Terre Égyptiennes",
    it: "Patate Egiziane",
    es: "Patatas Egipcias",
    ar: "بطاطس مصرية",
  },
  "بطاطس": {
    en: "Potatoes",
    fr: "Pommes de Terre",
    it: "Patate",
    es: "Patatas",
    ar: "بطاطس",
  },
  "بطاطا حلوة": {
    en: "Egyptian Sweet Potatoes",
    fr: "Patates Douces Égyptiennes",
    it: "Patate Dolci Egiziane",
    es: "Batatas Egipcias",
    ar: "بطاطا حلوة",
  },
  "بطاطا": {
    en: "Sweet Potatoes",
    fr: "Patates Douces",
    it: "Patate Dolci",
    es: "Batatas",
    ar: "بطاطا",
  },
  "الموالح والبرتقال المصري": {
    en: "Egyptian Citrus & Oranges",
    fr: "Agrumes & Oranges d'Égypte",
    it: "Agrumi e Arance Egiziane",
    es: "Cítricos y Naranjas Egipcias",
    ar: "الموالح والبرتقال المصري",
  },
  "برتقال فالنسيا (صيفي)": {
    en: "Valencia Summer Oranges",
    fr: "Oranges Valencia d'Été",
    it: "Arance Valencia Estive",
    es: "Naranjas Valencia de Verano",
    ar: "برتقال فالنسيا (صيفي)",
  },
  "برتقال فالنسيا": {
    en: "Valencia Oranges",
    fr: "Oranges Valencia",
    it: "Arance Valencia",
    es: "Naranjas Valencia",
    ar: "برتقال فالنسيا",
  },
  "برتقال أبو صرة": {
    en: "Navel Oranges",
    fr: "Oranges Navel",
    it: "Arance Navel",
    es: "Naranjas Navel",
    ar: "برتقال أبو صرة",
  },
  "أبو صرة": {
    en: "Navel",
    fr: "Navel",
    it: "Navel",
    es: "Navel",
    ar: "أبو صرة",
  },
  "برتقال بلدي": {
    en: "Baladi Oranges",
    fr: "Oranges Baladi",
    it: "Arance Baladi",
    es: "Naranjas Baladi",
    ar: "برتقال بلدي",
  },
  "برتقال صيفي": {
    en: "Summer Oranges",
    fr: "Oranges d'Été",
    it: "Arance Estive",
    es: "Naranjas de Verano",
    ar: "برتقال صيفي",
  },
  "برتقال": {
    en: "Oranges",
    fr: "Oranges",
    it: "Arance",
    es: "Naranjas",
    ar: "برتقال",
  },
  "ليمون مصري": {
    en: "Egyptian Fresh Lemons",
    fr: "Citrons Égyptiens",
    it: "Limoni Egiziani",
    es: "Limones Egipcios",
    ar: "ليمون مصري",
  },
  "ليمون أضاليا": {
    en: "Adalia Lemons",
    fr: "Citrons Adalia",
    it: "Limoni Adalia",
    es: "Limones Adalia",
    ar: "ليمون أضاليا",
  },
  "ليمون": {
    en: "Lemons",
    fr: "Citrons",
    it: "Limoni",
    es: "Limones",
    ar: "ليمون",
  },
  "يوسفي ميركوت": {
    en: "Murcott Mandarins",
    fr: "Mandarines Murcott",
    it: "Mandarini Murcott",
    es: "Mandarinas Murcott",
    ar: "يوسفي ميركوت",
  },
  "يوسفي بلدي": {
    en: "Baladi Mandarins",
    fr: "Mandarines Baladi",
    it: "Mandarini Baladi",
    es: "Mandarinas Baladi",
    ar: "يوسفي بلدي",
  },
  "يوسفي": {
    en: "Mandarins",
    fr: "Mandarines",
    it: "Mandarini",
    es: "Mandarinas",
    ar: "يوسفي",
  },
  "موالح": {
    en: "Citrus",
    fr: "Agrumes",
    it: "Agrumi",
    es: "Cítricos",
    ar: "موالح",
  },
  "الفراولة الطازجة الفاخرة": {
    en: "Premium Fresh Strawberries",
    fr: "Fraises Fraîches Supérieures",
    it: "Fragole Fresche Superiori",
    es: "Fresas Frescas Prémium",
    ar: "الفراولة الطازجة الفاخرة",
  },
  "فراولة مصرية": {
    en: "Egyptian Strawberries",
    fr: "Fraises Égyptiennes",
    it: "Fragole Egiziane",
    es: "Fresas Egipcias",
    ar: "فراولة مصرية",
  },
  "فراولة": {
    en: "Strawberries",
    fr: "Fraises",
    it: "Fragole",
    es: "Fresas",
    ar: "فراولة",
  },
  "الرمان الوندرفول الفاخر": {
    en: "Premium Wonderful Pomegranates",
    fr: "Grenades Wonderful Supérieures",
    it: "Melograni Wonderful Superiori",
    es: "Granadas Wonderful Prémium",
    ar: "الرمان الوندرفول الفاخر",
  },
  "رمان وندرفول": {
    en: "Wonderful Pomegranates",
    fr: "Grenades Wonderful",
    it: "Melograni Wonderful",
    es: "Granadas Wonderful",
    ar: "رمان وندرفول",
  },
  "رمان مصري": {
    en: "Egyptian Pomegranates",
    fr: "Grenades Égyptiennes",
    it: "Melograni Egiziani",
    es: "Granadas Egipcias",
    ar: "رمان مصري",
  },
  "رمان": {
    en: "Pomegranates",
    fr: "Grenades",
    it: "Melograni",
    es: "Granadas",
    ar: "رمان",
  },
  "العنب الطازج بدون بذور": {
    en: "Fresh Seedless Grapes",
    fr: "Raisins Frais Sans Pépins",
    it: "Uva Fresca Senza Semi",
    es: "Uvas Frescas Sin Semillas",
    ar: "العنب الطازج بدون بذور",
  },
  "عنب بدون بذور": {
    en: "Seedless Grapes",
    fr: "Raisins Sans Pépins",
    it: "Uva Senza Semi",
    es: "Uvas Sin Semillas",
    ar: "عنب بدون بذور",
  },
  "عنب مصري": {
    en: "Egyptian Grapes",
    fr: "Raisins Égyptiens",
    it: "Uva Egiziana",
    es: "Uvas Egipcias",
    ar: "عنب مصري",
  },
  "عنب": {
    en: "Grapes",
    fr: "Raisins",
    it: "Uva",
    es: "Uvas",
    ar: "عنب",
  },
  "مانجو مصري فاخر": {
    en: "Premium Egyptian Mangoes",
    fr: "Mangues Égyptiennes Supérieures",
    it: "Manghi Egiziani Superiori",
    es: "Mangos Egipcios Prémium",
    ar: "مانجو مصري فاخر",
  },
  "مانجو نعومي": {
    en: "Naomi Mangoes",
    fr: "Mangues Naomi",
    it: "Manghi Naomi",
    es: "Mangos Naomi",
    ar: "مانجو نعومي",
  },
  "مانجو كيت": {
    en: "Keitt Mangoes",
    fr: "Mangues Keitt",
    it: "Manghi Keitt",
    es: "Mangos Keitt",
    ar: "مانجو كيت",
  },
  "مانجو": {
    en: "Mangoes",
    fr: "Mangues",
    it: "Manghi",
    es: "Mangos",
    ar: "مانجو",
  },
  "فلفل ألوان": {
    en: "Colored Bell Peppers",
    fr: "Poivrons Colorés",
    it: "Peperoni Colorati",
    es: "Pimientos de Colores",
    ar: "فلفل ألوان",
  },
  "فلفل رومي": {
    en: "Bell Peppers",
    fr: "Poivrons",
    it: "Peperoni",
    es: "Pimientos Morrón",
    ar: "فلفل رومي",
  },
  "فلفل حار": {
    en: "Hot Chili Peppers",
    fr: "Piments Forts",
    it: "Peperoncini Piccanti",
    es: "Chiles Picantes",
    ar: "فلفل حار",
  },
  "فلفل": {
    en: "Peppers",
    fr: "Poivrons",
    it: "Peperoni",
    es: "Pimientos",
    ar: "فلفل",
  },
  "فاصوليا خضراء": {
    en: "Fresh Green Beans",
    fr: "Haricots Verts Frais",
    it: "Fagiolini Freschi",
    es: "Judías Verdes Frescas",
    ar: "فاصوليا خضراء",
  },
  "فاصوليا": {
    en: "Green Beans",
    fr: "Haricots",
    it: "Fagiolini",
    es: "Judías",
    ar: "فاصوليا",
  },
  "خس كابوتشا": {
    en: "Iceberg Lettuce",
    fr: "Laitue Iceberg",
    it: "Lattuga Iceberg",
    es: "Lechuga Iceberg",
    ar: "خس كابوتشا",
  },
  "خس": {
    en: "Lettuce",
    fr: "Laitue",
    it: "Lattuga",
    es: "Lechuga",
    ar: "خس",
  },
  "طماطم": {
    en: "Tomatoes",
    fr: "Tomates",
    it: "Pomodori",
    es: "Tomates",
    ar: "طماطم",
  },
  "خيار": {
    en: "Cucumbers",
    fr: "Concombres",
    it: "Cetrioli",
    es: "Pepinos",
    ar: "خيار",
  },
  "تمور مجدول": {
    en: "Medjool Dates",
    fr: "Dattes Medjool",
    it: "Datteri Medjool",
    es: "Dátiles Medjool",
    ar: "تمور مجدول",
  },
  "تمور": {
    en: "Dates",
    fr: "Dattes",
    it: "Datteri",
    es: "Dátiles",
    ar: "تمور",
  },
  "بلح": {
    en: "Dates",
    fr: "Dattes",
    it: "Datteri",
    es: "Dátiles",
    ar: "بلح",
  },
  "جوافة": {
    en: "Guava",
    fr: "Goyaves",
    it: "Guava",
    es: "Guayaba",
    ar: "جوافة",
  },
  "بطيخ": {
    en: "Watermelons",
    fr: "Pastèques",
    it: "Angurie",
    es: "Sandías",
    ar: "بطيخ",
  },
  "كانتالوب": {
    en: "Cantaloupe Melons",
    fr: "Melons Cantaloup",
    it: "Meloni Cantalupo",
    es: "Melones Cantalupo",
    ar: "كانتالوب",
  },
  "أعشاب": {
    en: "Herbs",
    fr: "Herbes",
    it: "Erbe",
    es: "Hierbas",
    ar: "أعشاب",
  },

  // Packaging
  "براميل حفظ غذائية": {
    en: "Food-Grade Export Drums",
    fr: "Fûts Alimentaires d'Exportation",
    it: "Fusti Alimentari da Esportazione",
    es: "Tambores Alimentarios de Exportación",
    ar: "براميل حفظ غذائية",
  },
  "براميل تصدير": {
    en: "Export Barrels / Drums",
    fr: "Fûts d'exportation",
    it: "Fusti da esportazione",
    es: "Barriles de exportación",
    ar: "براميل تصدير",
  },
  "براميل": {
    en: "Export Drums / Barrels",
    fr: "Fûts / Barils d'exportation",
    it: "Fusti / Barili da esportazione",
    es: "Barriles / Tambores de exportación",
    ar: "براميل",
  },
  "برميل": {
    en: "Export Drum / Barrel",
    fr: "Fût / Baril d'exportation",
    it: "Fusto / Barile da esportazione",
    es: "Barril / Tambor de exportación",
    ar: "برميل",
  },
  "كراتين تيليسكوبيك": {
    en: "Telescopic Cartons",
    fr: "Cartons Télescopiques",
    it: "Cartoni Telescopici",
    es: "Cajas Telescópicas",
    ar: "كراتين تيليسكوبيك",
  },
  "كراتين تليسكوبيك": {
    en: "Telescopic Cartons",
    fr: "Cartons Télescopiques",
    it: "Cartoni Telescopici",
    es: "Cajas Telescópicas",
    ar: "كراتين تليسكوبيك",
  },
  "كراتين مبردة": {
    en: "Chilled Cartons",
    fr: "Cartons Réfrigérés",
    it: "Cartoni Refrigerati",
    es: "Cajas Refrigeradas",
    ar: "كراتين مبردة",
  },
  "كراتين مفتوحة": {
    en: "Open Top Cartons",
    fr: "Cartons Ouverts",
    it: "Cartoni Aperti",
    es: "Cajas Abiertas",
    ar: "كراتين مفتوحة",
  },
  "أوبن توب": {
    en: "Open Top",
    fr: "Open Top",
    it: "Open Top",
    es: "Open Top",
    ar: "أوبن توب",
  },
  "كراتين": {
    en: "Cartons",
    fr: "Cartons",
    it: "Cartoni",
    es: "Cajas de cartón",
    ar: "كراتين",
  },
  "كرتونة": {
    en: "Carton",
    fr: "Carton",
    it: "Cartone",
    es: "Caja",
    ar: "كرتونة",
  },
  "أكياس شبك": {
    en: "Net Bags",
    fr: "Sacs Filet",
    it: "Sacchi a Rete",
    es: "Sacos de Malla",
    ar: "أكياس شبك",
  },
  "أكياس شبكية": {
    en: "Mesh Bags",
    fr: "Sacs en Filet",
    it: "Sacchi a Rete",
    es: "Sacos de Malla",
    ar: "أكياس شبكية",
  },
  "أكياس": {
    en: "Bags",
    fr: "Sacs",
    it: "Sacchi",
    es: "Sacos",
    ar: "أكياس",
  },
  "كيس ورقي": {
    en: "Paper Bag",
    fr: "Sac en Papier",
    it: "Sacchetto di Carta",
    es: "Bolsa de Papel",
    ar: "كيس ورقي",
  },
  "بانيتات": {
    en: "Punnets",
    fr: "Barquettes",
    it: "Cestini",
    es: "Tarrinas",
    ar: "بانيتات",
  },
  "بانيت": {
    en: "Punnet",
    fr: "Barquette",
    it: "Cestino",
    es: "Tarrina",
    ar: "بانيت",
  },
  "جامبو باج": {
    en: "Jumbo Bags",
    fr: "Sacs Jumbo",
    it: "Sacchi Jumbo",
    es: "Sacos Jumbo",
    ar: "جامبو باج",
  },
  "جامبو": {
    en: "Jumbo",
    fr: "Jumbo",
    it: "Jumbo",
    es: "Jumbo",
    ar: "جامبو",
  },
  "باليتات": {
    en: "Pallets",
    fr: "Palettes",
    it: "Bancali",
    es: "Palets",
    ar: "باليتات",
  },
  "باليت": {
    en: "Pallet",
    fr: "Palette",
    it: "Bancale",
    es: "Palet",
    ar: "باليت",
  },

  // Specs & Modifiers
  "شحن جوي مبرد سريع": {
    en: "Rapid Chilled Air Freight",
    fr: "Fret Aérien Réfrigéré Rapide",
    it: "Trasporto Aereo Refrigerato Rapido",
    es: "Transporte Aéreo Refrigerado Rápido",
    ar: "شحن جوي مبرد سريع",
  },
  "خالية من متبقيات المبيدات": {
    en: "Zero Pesticide Residue",
    fr: "Sans Résidus de Pesticides",
    it: "Senza Residui di Pesticidi",
    es: "Sin Residuos de Plaguicidas",
    ar: "خالية من متبقيات المبيدات",
  },
  "مغسولة ومجففة": {
    en: "Washed & Dried",
    fr: "Lavé et Séché",
    it: "Lavato e Asciugato",
    es: "Lavado y Secado",
    ar: "مغسولة ومجففة",
  },
  "مستوى بريكس مرتفع": {
    en: "High Brix Level",
    fr: "Teneur Élevée en Brix",
    it: "Alto Grado Brix",
    es: "Alto Nivel Brix",
    ar: "مستوى بريكس مرتفع",
  },
  "قطر الحبة": {
    en: "Berry Diameter",
    fr: "Diamètre du Grain",
    it: "Diametro dell'Acino",
    es: "Diámetro de la Baya",
    ar: "قطر الحبة",
  },
  "حبة بالكرتونة": {
    en: "pieces per carton",
    fr: "pièces par carton",
    it: "pezzi per cartone",
    es: "piezas por caja",
    ar: "حبة بالكرتونة",
  },
  "معايرات كاليبر:": {
    en: "Calibers:",
    fr: "Calibres:",
    it: "Calibri:",
    es: "Calibres:",
    ar: "معايرات كاليبر:",
  },
  "معايرات كاليبر": {
    en: "Calibers",
    fr: "Calibres",
    it: "Calibri",
    es: "Calibres",
    ar: "معايرات كاليبر",
  },
  "كاليبر:": {
    en: "Caliber:",
    fr: "Calibre:",
    it: "Calibro:",
    es: "Calibre:",
    ar: "كاليبر:",
  },
  "كاليبر": {
    en: "Caliber",
    fr: "Calibre",
    it: "Calibro",
    es: "Calibre",
    ar: "كاليبر",
  },
  "أحجام:": {
    en: "Sizes:",
    fr: "Tailles:",
    it: "Dimensioni:",
    es: "Tamaños:",
    ar: "أحجام:",
  },
  "أحجام": {
    en: "Sizes",
    fr: "Tailles",
    it: "Dimensioni",
    es: "Tamaños",
    ar: "أحجام",
  },
  "حجم:": {
    en: "Size:",
    fr: "Taille:",
    it: "Dimensione:",
    es: "Tamaño:",
    ar: "حجم:",
  },
  "حجم": {
    en: "Size",
    fr: "Taille",
    it: "Dimensione",
    es: "Tamaño",
    ar: "حجم",
  },
  "نخب أول": {
    en: "Grade A / First Class",
    fr: "Première Catégorie",
    it: "Prima Categoria",
    es: "Primera Calidad",
    ar: "نخب أول",
  },
  "نخب ممتاز": {
    en: "Extra Class",
    fr: "Catégorie Extra",
    it: "Categoria Extra",
    es: "Categoría Extra",
    ar: "نخب ممتاز",
  },
  "درجة أولى": {
    en: "Grade 1",
    fr: "Catégorie 1",
    it: "Prima Categoria",
    es: "Primera Calidad",
    ar: "درجة أولى",
  },
  "طازج": {
    en: "Fresh",
    fr: "Frais",
    it: "Fresco",
    es: "Fresco",
    ar: "طازج",
  },
  "طازجة": {
    en: "Fresh",
    fr: "Fraîche",
    it: "Fresca",
    es: "Fresca",
    ar: "طازجة",
  },
  "فاخر": {
    en: "Premium",
    fr: "Supérieur",
    it: "Superiore",
    es: "Prémium",
    ar: "فاخر",
  },
  "فاخرة": {
    en: "Premium",
    fr: "Supérieure",
    it: "Superiore",
    es: "Prémium",
    ar: "فاخرة",
  },
  "مصري": {
    en: "Egyptian",
    fr: "Égyptien",
    it: "Egiziano",
    es: "Egipcio",
    ar: "مصري",
  },
  "مصرية": {
    en: "Egyptian",
    fr: "Égyptienne",
    it: "Egiziana",
    es: "Egipcia",
    ar: "مصرية",
  },
  "فرنساوي": {
    en: "French",
    fr: "Français",
    it: "Francese",
    es: "Francés",
    ar: "فرنساوي",
  },
  "بلدي": {
    en: "Baladi (Local)",
    fr: "Baladi (Local)",
    it: "Baladi (Locale)",
    es: "Baladi (Local)",
    ar: "بلدي",
  },
  "كجم": {
    en: "kg",
    fr: "kg",
    it: "kg",
    es: "kg",
    ar: "كجم",
  },
  "جم": {
    en: "g",
    fr: "g",
    it: "g",
    es: "g",
    ar: "جم",
  },
  "طن": {
    en: "Ton",
    fr: "Tonne",
    it: "Tonnellata",
    es: "Tonelada",
    ar: "طن",
  },
  "مم": {
    en: "mm",
    fr: "mm",
    it: "mm",
    es: "mm",
    ar: "مم",
  },
  "سم": {
    en: "cm",
    fr: "cm",
    it: "cm",
    es: "cm",
    ar: "سم",
  },
  "و": {
    en: "&",
    fr: "et",
    it: "e",
    es: "y",
    ar: "و",
  },
  "أو": {
    en: "or",
    fr: "ou",
    it: "o",
    es: "o",
    ar: "أو",
  },
};

const SORTED_AGRI_PHRASES = Object.keys(AGRI_PHRASE_DICT).sort(
  (a, b) => b.length - a.length
);

export function translateAgriText(
  text: string | undefined | null,
  language: Language
): string {
  if (!text || language === "ar") return text || "";
  if (!/[\u0600-\u06FF]/.test(text)) return text;

  let result = text.trim();

  // 1. Direct whole-string match
  if (AGRI_PHRASE_DICT[result]?.[language]) {
    return AGRI_PHRASE_DICT[result][language];
  }

  // 2. Multi-word phrase replacement (ordered by length descending)
  for (const phrase of SORTED_AGRI_PHRASES) {
    if (result.includes(phrase)) {
      const replacement = AGRI_PHRASE_DICT[phrase][language];
      result = result.split(phrase).join(` ${replacement} `);
    }
  }

  // 3. Format Arabic commas to western commas
  result = result.replace(/،/g, ", ");

  // 4. Clean up double spaces and spacing before punctuation
  result = result
    .replace(/\s+/g, " ")
    .replace(/\s+([,\.&\/])/g, "$1")
    .replace(/&/g, " & ")
    .replace(/\s+/g, " ")
    .trim();

  return result;
}
