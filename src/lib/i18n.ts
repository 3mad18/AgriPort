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
      "capabilities": "القدرات والإمكانيات",
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
      "capabilities": "Capabilities",
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
      "capabilities": "Capacités",
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
      "capabilities": "Capacità",
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
      "capabilities": "Capacidades",
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
