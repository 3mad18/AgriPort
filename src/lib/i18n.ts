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
      "card1Title": "صادرات الخرشوف المصري الفاخر",
      "card1Desc": "خرشوف بلدي وفرنساوي نخب أول طازج ومجهز للتصدير الدولي (أقماع، قلوب، وبراميل حفظ غذائية).",
      "card2Tag": "تحكم حراري فوري",
      "card2Badge": "سلسلة تبريد غير منقطعة",
      "card2Title": "سلامة سلسلة التبريد",
      "card2Desc": "تحكم متواصل في درجات الحرارة لضمان عدم حدوث أي تدهور من المزرعة حتى ميناء الوصول.",
      "card2Specs": "تبريد أولي Pre-Cooling • أرصفة مبردة • حساسات IoT",
      "card2Cta": "استكشف بنية التبريد",
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
          "id": "artichoke",
          "name": "الخرشوف المصري الفاخر",
          "variety": "خرشوف بلدي، خرشوف فرنساوي، فيوليت",
          "season": "نوفمبر — مايو",
          "pack": "براميل حفظ غذائية (محلول ملحي)، كراتين تبريد، أكياس مفرغة",
          "specs": "أحجام كاليبر: 50، 60، 65 مم نخب أول، أقماع وقلوب مجهزة ومطابقة للمواصفات الأوروبية",
          "icon": "🌱",
          "category": "خضروات"
        },
        {
          "id": "green-beans",
          "name": "الفاصولياء الخضراء الفاخرة",
          "variety": "بولستا (Polesta)، برونكو (Bronco)، فالنتينو",
          "season": "أكتوبر — مايو",
          "pack": "كراتين مقواة 4-5 كجم، بانيتات 250 و 500 جم مبردة",
          "specs": "قرون مستقيمة ناضرة خالية من الخيوط، طول 10-14 سم، درجات نقاوة Fine & Extra Fine",
          "icon": "🫘",
          "category": "خضروات"
        },
        {
          "id": "broccoli",
          "name": "البروكلي الأخضر الطازج",
          "variety": "كالابريزي (Calabrese)، باراثون، هيريتيدج",
          "season": "نوفمبر — أبريل",
          "pack": "صناديق بوليسترين مع ثلج مجروش (Iced Styrofoam) 5-6 كجم، كراتين مبردة",
          "specs": "رؤوس متراصة مغلقة بلون أخضر داكن مزرق، قطر 10-15 سم، ساق مقصوصة 2-3 سم، تبريد فوري Pre-cooling",
          "icon": "🥦",
          "category": "خضروات"
        },
        {
          "id": "cauliflower",
          "name": "القرنبيط الأبيض الفاخر",
          "variety": "سنوبول (Snowball)، فريمانت، إينكلاين",
          "season": "نوفمبر — أبريل",
          "pack": "كراتين كرتونية مبطنة 6-8 حبات، تغليف محكم بغشاء مسامي (Shrink Wrap)",
          "specs": "أقراص زهرية ناصعة البياض كثيفة وصلبة، أوزان 1.0 - 1.8 كجم، محاطة بأوراق حماية مشذبة",
          "icon": "🥬",
          "category": "خضروات"
        },
        {
          "id": "cabbage",
          "name": "الكرنب الأخضر المجهز للتصدير",
          "variety": "كرنب بلدي فاخر، أصناف هجينة (براونشفايغ، برونكو)",
          "season": "ديسمبر — مايو",
          "pack": "أكياس شبكية 15-20 كجم، صناديق خشبية، باليتات مبردة للشحن البحري",
          "specs": "رؤوس كروية متماسكة جيدة الالتفاف، أوزان متجانسة 1.5 - 2.5 كجم، خالية تماماً من العيوب",
          "icon": "🥬",
          "category": "خضروات"
        },
        {
          "id": "potatoes",
          "name": "البطاطس المجهزة للتصدير",
          "variety": "سبونتا (Spunta)، مونديال، ليدي روزيتا، كارا، هيرميس",
          "season": "يناير — يونيو",
          "pack": "أكياس شبك 10 كجم و 25 كجم، جامبو باج 1250 كجم، كراتين مبردة",
          "specs": "مغسولة ومجففة أو معفرة بالرمال، أحجام مدرجة: 35/55 مم، 55/65 مم، 65+ مم",
          "icon": "🥔",
          "category": "خضروات"
        },
        {
          "id": "lettuce",
          "name": "خس الكابوتشا والخس الروماني",
          "variety": "آيسبيرج (Iceberg)، خس روماني (Romaine)، لولو روسو",
          "season": "نوفمبر — مايو",
          "pack": "كراتين مموجة 10-12 حبة مغلفة فردياً بأكياس مسامية (Micro-perforated bags)",
          "specs": "رؤوس مقرمشة مبردة بتقنية Vacuum Cooling فور الحصاد، أوزان متناسقة 400 - 700 جم",
          "icon": "🥗",
          "category": "خضروات"
        },
        {
          "id": "red-cabbage",
          "name": "الكرنب الأحمر الفاخر",
          "variety": "روبي بول (Ruby Ball)، رودو، روكسي",
          "season": "ديسمبر — مايو",
          "pack": "أكياس شبك تهوية 10 و 15 كجم، كراتين تبريد تليسكوبيك، صناديق تصدير",
          "specs": "لون أرجواني أحمر غامق متألق، أوراق متراصة شديدة الصلابة، أوزان 1 - 2 كجم للحبة، تحمل شحن وتخزين فائق",
          "icon": "🟣",
          "category": "خضروات"
        }
      ]
    },
    "aboutPage": {
      "badge": "عن الشركة والمصداقية القانونية",
      "title": "عن شركة Agri Port لتصدير الخضروات والحاصلات الزراعية",
      "subtitle": "شركة مصرية مسجلة وموثقة لتصدير أجود محاصيل الخضروات الطازجة من مزارع النوبارية والدلتا إلى كبرى الأسواق الأوروبية والعالمية.",
      "description": "تعتبر شركة Agri Port بوابتك الرئيسية وشريكك الاستراتيجي الموثوق في مصر لتوريد وتصدير الخضروات الطازجة عالية الجودة. نتخصص في 8 محاصيل خضروات رئيسية: الخرشوف المصري الفاخر، الفاصولياء الخضراء الرفيعة، البروكلي، القرنبيط، الكرنب الأخضر، البطاطس المجهزة، خس الكابوتشا (الآيسبيرج)، والكرنب الأحمر. نمتلك شبكة توريد زراعية ممتدة على مساحة تتجاوز 600 فدان، ومحطات فرز وتعبئة إلكترونية معتمدة وسلسلة تبريد سريعة (Pre-Cooling & Vacuum Cooling) تضمن تسليم الشحنات طازجة ومطابقة لأدق المعايير الأوروبية والعالمية (Global G.A.P, ISO 22000, BRCGS, HACCP).",
      "legalBadge": "بيانات التوثيق والمصداقية التجارية الرسمية",
      "legalTitle": "السجل التجاري والبيانات الضريبية المعتمدة",
      "legalSubtitle": "شركة مسجلة رسمياً وخاضعة لإشراف الهيئة العامة للرقابة على الصادرات والواردات والغرفة التجارية ومصلحة الضرائب المصرية:",
      "commercialRegister": "رقم السجل التجاري (C.R)",
      "commercialRegisterVal": "108420",
      "commercialRegisterDesc": "مكتب سجل تجاري الاستثمار — تصدير حواصل زراعية وخضروات طازجة",
      "taxCard": "رقم البطاقة الضريبية (Tax ID)",
      "taxCardVal": "629-418-735",
      "taxCardDesc": "مأمورية ضرائب الاستثمار — ملف ضريبي ساري وخاضع لمنظومة الفاتورة الإلكترونية",
      "exporterNumber": "رقم القيد بسجل المصدرين",
      "exporterNumberVal": "28410",
      "exporterNumberDesc": "الهيئة العامة للرقابة على الصادرات والواردات (GOEIC)",
      "chamber": "الغرفة التجارية المصرية",
      "chamberVal": "عضو الشعبة العامة للمصدرين — الغرفة التجارية بالبحيرة",
      "chamberDesc": "اتحاد الغرف التجارية المصرية — ترخيص تصدير ساري",
      "registeredAddress": "المقر الرئيسي المسجل",
      "registeredAddressVal": "جمهورية مصر العربية — محافظة البحيرة / كفر الدوار",
      "registeredAddressDesc": "موقع لوجستي استراتيجي بالقرب من موانئ الإسكندرية والدخيلة ودمياط",
      "map": {
        "badge": "الموقع الجغرافي واللوجستي",
        "title": "مقر الشركة وخريطة الموقع الاستراتيجي",
        "subtitle": "يقع مقرنا الرئيسي ومحطات التعبئة في كفر الدوار بمحافظة البحيرة، في قلب الدلتا وبالقرب المباشر من موانئ التصدير البحرية الرئيسية:",
        "openGoogleMaps": "فتح في خرائط Google",
        "alexPort": "موانئ الإسكندرية والدخيلة",
        "alexPortDist": "25 كم (شحن بحري سريع لأوروبا)",
        "damiettaPort": "ميناء دمياط البحري",
        "damiettaPortDist": "140 كم (ترانزيت وخطوط ملاحية منتظمة)",
        "cairoAirport": "مطار القاهرة للشحن الجوي",
        "cairoAirportDist": "180 كم (شحنات جوية طازجة فائقة السرعة)",
        "highway": "محور لوجستي رئيسي",
        "highwayDist": "موقع مباشر على طريق الإسكندرية الزراعي والدولي الساحلي"
      },
      "cropsBadge": "سلتنا التصديرية المتخصصة",
      "cropsTitle": "محاصيل الخضروات الثمانية للتصدير الدولي",
      "cropsSubtitle": "نلتزم بالتخصص الدقيق في 8 محاصيل خضروات رئيسية مجهزة بأعلى مواصفات الجودة والفرز:",
      "crops": [
        { "name": "الخرشوف المصري الفاخر", "desc": "طازج، قلوب، وأقماع مجهزة ومحفوظة في براميل غذائية بمحلول ملحي وكراتين مبردة", "tag": "محصول رئيسي" },
        { "name": "الفاصولياء الخضراء الرفيعة", "desc": "أطوال متجانسة وخالية من الخيوط، معبأة في بانيتات مبردة مخصصة للشحن الجوي والبحري", "tag": "شحن سريع" },
        { "name": "البروكلي الأخضر الطازج", "desc": "رؤوس خضراء داكنة صلبة، معبأة في بوليسترين مثلج Iced Styrofoam لحفظ النضارة", "tag": "تبريد فائق" },
        { "name": "القرنبيط الأبيض الناصع", "desc": "رؤوس متماسكة ناصعة البياض بتغليف Shrink Wrap مسامي يحمي القوام أثناء الترانزيت", "tag": "نخب أول" },
        { "name": "الكرنب البلدي والأبيض", "desc": "أوزان متجانسة (1 - 2.5 كجم) وتشذيب دقيق معبأ في كراتين تهوية للشحن البحري", "tag": "تصدير بحري" },
        { "name": "البطاطس التصديرية", "desc": "سبونتا وكارا مغسولة ومجففة ومدرجة كاليبر في شكاير شبك وجامبو للشحن الدولي", "tag": "كميات ضخمة" },
        { "name": "خس الكابوتشا (آيسبيرج)", "desc": "رؤوس مقرمشة طازجة معبأة بفيلم مسامي Micro-perforated مبرد حتى ميناء الوصول", "tag": "سلسلة تبريد" },
        { "name": "الكرنب الأحمر للسلطات", "desc": "لون قرمزي جذاب وصلابة فائقة وأعمار تخزينية طويلة للأسواق العالمية ومصانع الأغذية", "tag": "عمر تخزيني" }
      ],
      "pillarsTitle": "ركائز عملنا ومعاييرنا التصديرية",
      "pillars": [
        {
          "icon": "🌍",
          "title": "تصدير إلى أكثر من 25 سوقاً عالمياً",
          "desc": "شحنات منتظمة ومجدولة إلى إسبانيا، إيطاليا، فرنسا، ألمانيا، المملكة المتحدة، دول الخليج العربي، وأفريقيا."
        },
        {
          "icon": "🏆",
          "title": "معايير جودة ورقابة مخبرية صارمة",
          "desc": "فحص دوري للمتبقيات الكيميائية (MRLs) ومطابقة كاملة للوائح الاتحاد الأوروبي مع شهادات صحية رسمية."
        },
        {
          "icon": "⚡",
          "title": "سلسلة تبريد حديثة وشحن مبرد مباشر",
          "desc": "تبريد أولي Pre-Cooling وحاويات مبردة Reefer Containers مزودة بمسجلات حرارة رقمية من ميناء الإسكندرية ودمياط."
        }
      ],
      "stats": {
        "farms": "المساحات الزراعية التصديرية",
        "farmsVal": "+600 فدان",
        "capacity": "طاقة الفرز والتعبئة اليومية",
        "capacityVal": "+200 طن/يوم",
        "coldChain": "سلسلة تبريد متواصلة",
        "coldChainVal": "100% ضبط حراري",
        "markets": "الأسواق والوجهات العالمية",
        "marketsVal": "+25 دولة"
      },
      "ctaTitle": "جاهز للتعاقد وبدء توريد شحناتك مع شريك رسمي معتمد؟",
      "ctaDesc": "فريق التصدير التجاري مستعد لتقديم عروض أسعار تنافسية (FOB / CIF) وجداول شحن دقيقة لموسم الخضار الحالي.",
      "ctaQuote": "طلب عرض سعر رسمي",
      "ctaFacilities": "استكشاف محطات الفرز والمرافق"
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
        "productPlaceholder": "خرشوف، فاصولياء خضراء، بروكلي، قرنبيط، بطاطس...",
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
          "subtitle": "بنية تحتية متطورة تدمج أحدث خطوط الفرز الإلكتروني، محطات تعبئة الخضروات المعتمدة، وسلسلة التبريد السريع من الحقل حتى ميناء الوصول.",
          "badge": "مرافقنا التصديرية",
          "stats": {
                "stations": "محطات تعبئة مركزية",
                "stationsVal": "4 محطات معتمدة",
                "farms": "مزارع تصديرية تحت إشرافنا",
                "farmsVal": "+600 فدان خضار",
                "coldChain": "سلسلة تبريد متواصلة",
                "coldChainVal": "100% ضبط حراري",
                "capacity": "طاقة فرز وتعبئة يومية",
                "capacityVal": "+200 طن/يوم"
          },
          "videoBadge": "جولة فيديو توثيقية حية",
          "videoTitle": "شاهد بالفيديو: خطوات الفرز الآلي وتعبئة الخضروات وسلسلة التبريد",
          "videoDesc": "تقنيات متقدمة للفرز الإلكتروني، تجهيز الخرشوف والفاصولياء والبروكلي، وحفظ المحاصيل في أقصى درجات النضارة للأسواق العالمية.",
          "videoPlayBtn": "تشغيل الجولة المصورة",
          "videoDuration": "فيديو توثيقي • 02:45 دقيقة",
          "filterAll": "الكل",
          "filterStations": "محطات الفرز والتعبئة",
          "filterFarms": "المزارع والبساتين",
          "filterColdChain": "سلسلة التبريد والشحن",
          "filterLab": "مختبرات الجودة والفحص",
          "items": [
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "محطة الخرشوف المركزية",
                      "title": "وحدة فرز وتقميع وتجهيز الخرشوف المصري للتصدير",
                      "desc": "خطوط معقمة لفرز رؤوس الخرشوف الطازج، تقميع وإعداد القلوب والأقماع، وتعبئتها في براميل غذائية بمحلول ملحي أو كراتين مبردة للتصدير لأوروبا.",
                      "specs": "طاقة إنتاجية 40 طن/يوم • أحجام كاليبر 50، 60، 65 مم • شهادات BRC و Global G.A.P",
                      "image": "",
                      "tag": "تجهيز وتعبئة"
                },
                {
                      "id": "vegetable-farms",
                      "category": "farms",
                      "badge": "مزارع نموذجية",
                      "title": "مزارع وبساتين الخضروات التصديرية (خرشوف، بروكلي، خس، كرنب)",
                      "desc": "إدارة زراعية متكاملة بنظام الري بالتنقيط الحديث ومكافحة حيوية للمحاصيل في محافظات البحيرة والدلتا لضمان خلوها التام من متبقيات المبيدات.",
                      "specs": "+600 فدان خضروات تصديرية • النوبارية والدلتا • شهادات Global G.A.P و SMETA",
                      "image": "",
                      "tag": "مزارع معتمدة"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "سلسلة التبريد السريع",
                      "title": "غرف التبريد الأولي (Pre-Cooling) وتفريغ الهواء (Vacuum Cooling)",
                      "desc": "تخفيض درجة حرارة الخضروات والبروكلي والخرشوف مباشرة بعد الحصاد خلال ساعتين للحفاظ على نضارتها التامة وصلابتها حتى ميناء الوصول.",
                      "specs": "تحكم حراري 0-4°C • رطوبة نسبية 90-95% • تتبع رقمي لحظي IoT",
                      "image": "",
                      "tag": "تبريد سريع"
                },
                {
                      "id": "potatoes-plant",
                      "category": "stations",
                      "badge": "محطة البطاطس التصديرية",
                      "title": "خطوط غسيل وتدريج وتعبئة البطاطس المجهزة للتصدير",
                      "desc": "خطوط متطورة لغسيل وتجفيف وتدريج البطاطس واستبعاد العيوب وتعبئتها في شكاير شبكية 10 و 25 كجم أو أكياس جامبو 1250 كجم للشحن البحري.",
                      "specs": "طاقة تعبئة 120 طن/يوم • أحجام كاليبر 35/55 مم و 55+ مم • أحواض غسيل معقمة",
                      "image": "",
                      "tag": "فرز وتدريج"
                },
                {
                      "id": "beans-broccoli-packhouse",
                      "category": "stations",
                      "badge": "محطة الفاصوليا والبروكلي والقرنبيط",
                      "title": "خطوط تدريج وتعبئة الفاصولياء الخضراء والبروكلي والقرنبيط",
                      "desc": "فرز دقيق لأطوال وجودة الفاصولياء الخضراء وتعبئتها في بانيتات، وتغليف رؤوس البروكلي والقرنبيط بالبوليسترين المثلج (Iced Styrofoam) والغشاء المسامي.",
                      "specs": "تغليف مثلج Iced Styrofoam • تغليف Shrink Wrap • فرز يدوي دقيق نخب أول",
                      "image": "",
                      "tag": "تعبئة مبردة"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "رقابة الجودة والمختبرات",
                      "title": "مختبر فحص سلامة الغذاء ومتبقيات المبيدات (MRLs)",
                      "desc": "تحاليل معملية دقيقة لكل شحنة قبل الشحن للتأكد التام من خلوها من الآفات ومطابقة المعايير الأوروبية وإصدار الشهادات الصحية المعتمدة.",
                      "specs": "فحص مخبري معتمد • شهادات ISO 22000 و HACCP • نتائج فحص فورية",
                      "image": "",
                      "tag": "فحص مخبري"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "اللوجستيات والشحن",
                      "title": "أرصفة تحميل الحاويات المبردة لموانئ الإسكندرية ودمياط",
                      "desc": "أرصفة مغلقة ومحكمة العزل لتحميل الحاويات المبردة مباشرة من المخازن دون التعرض للحرارة الخارجية، مع تزويد الحاويات بأجهزة Data Loggers الرقمية.",
                      "specs": "تحميل 10+ حاويات مبردة يومياً • أجهزة تتبع رقمي حراري",
                      "image": "",
                      "tag": "أرصفة مبردة"
                },
                {
                      "id": "cabbage-lettuce-unit",
                      "category": "stations",
                      "badge": "محطة الكرنب والخس",
                      "title": "وحدة فرز وتعبئة الكرنب (الأخضر والأحمر) وخس الكابوتشا",
                      "desc": "تنظيف وتشذيب أوراق الحماية الخارجية للكرنب والخس، وتعبئتها في كراتين مموجة وأكياس شبك تهوية مجهزة للشحن السريع للحفاظ على القوام المقرمش.",
                      "specs": "تغليف فردي Micro-perforated • أوزان متجانسة 1 - 2.5 كجم • شحن بحري مبرد",
                      "image": "",
                      "tag": "تعبئة وتغليف"
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
                      "desc": "جولة حية في مزارع الخضروات التصديرية المعتمَدة للتحقق من الممارسات الزراعية ومعايير GlobalG.A.P وخلو المحصول من المتبقيات."
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
                            "artichoke": "محطة فرز وتقميع وتجهيز الخرشوف المصري للتصدير",
                            "potatoes": "محطة غسيل وتدريج وتعبئة البطاطس المجهزة",
                            "beansBroccoli": "محطة تدريج وتعبئة الفاصولياء الخضراء والبروكلي والقرنبيط",
                            "farms": "المزارع وبساتين الخضروات التصديرية المعتمَدة (+600 فدان)",
                            "coldChain": "غرف التبريد الأولي (Pre-Cooling) وأرصفة الشحن المبرد",
                            "qualityLab": "مختبر مراقبة الجودة وفحص سلامة الغذاء ومتبقيات المبيدات (MRLs)"
                      },
                      "targetCrops": "المحاصيل الزراعية المستهدفة للاستيراد",
                      "targetCropsPlaceholder": "مثال: خرشوف طازج، فاصولياء خضراء، بروكلي، قرنبيط، بطاطس، خس، كرنب...",
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
      "card1Title": "Egyptian Artichoke Exports",
      "card1Desc": "Class A Egyptian Artichokes (French & Baladi Varieties, Fresh & Processed).",
      "card2Tag": "Instant Thermal Control",
      "card2Badge": "Unbroken Cold Chain",
      "card2Title": "Cold Chain Integrity",
      "card2Desc": "End-to-end temperature control ensuring zero degradation from farm to destination port.",
      "card2Specs": "Pre-Cooling Chambers • Reefer Docks • IoT Telemetry",
      "card2Cta": "Explore Cold Facilities",
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
          "id": "artichoke",
          "name": "Egyptian Fresh Artichokes",
          "variety": "French Artichoke, Baladi Variety, Violet",
          "season": "November — May",
          "pack": "Food-grade Brine Drums, Chilled Cartons, Vacuum Bags",
          "specs": "Calibers: 50, 60, 65 mm Grade A, cleanly trimmed bottoms & hearts, EU compliant",
          "icon": "🌱",
          "category": "Vegetables"
        },
        {
          "id": "green-beans",
          "name": "Fresh Egyptian Green Beans",
          "variety": "Polesta, Bronco, Valentino",
          "season": "October — May",
          "pack": "Reinforced 4-5 kg Cartons, 250g & 500g Punnets in Chilled Flats",
          "specs": "Straight, stringless crisp pods, 10-14 cm length, Extra Fine & Fine grades",
          "icon": "🫘",
          "category": "Vegetables"
        },
        {
          "id": "broccoli",
          "name": "Fresh Green Broccoli",
          "variety": "Calabrese, Marathon, Heritage",
          "season": "November — April",
          "pack": "Iced Styrofoam boxes 5-6 kg, Shrink-wrapped Chilled Cartons",
          "specs": "Compact dark blue-green florets, 10-15 cm head diameter, 2-3 cm trimmed stem, Pre-cooled",
          "icon": "🥦",
          "category": "Vegetables"
        },
        {
          "id": "cauliflower",
          "name": "Premium White Cauliflower",
          "variety": "Snowball, Fremantle, Incline",
          "season": "November — April",
          "pack": "Lined Cartons 6-8 heads, Micro-perforated Shrink Wrap",
          "specs": "Dense snow-white curds, 1.0 - 1.8 kg per head, jacket leaves trimmed for protection",
          "icon": "🥬",
          "category": "Vegetables"
        },
        {
          "id": "cabbage",
          "name": "Fresh Green Cabbage",
          "variety": "Premium Local Baladi, Hybrid F1 (Braunschweig, Bronco)",
          "season": "December — May",
          "pack": "15-20 kg Mesh Bags, Wooden Crates, Reefer Sea Pallets",
          "specs": "Dense, firmly wrapped spherical heads, uniform weights 1.5 - 2.5 kg, blemish-free",
          "icon": "🥬",
          "category": "Vegetables"
        },
        {
          "id": "potatoes",
          "name": "Fresh Table & Processing Potatoes",
          "variety": "Spunta, Mondial, Lady Rosetta, Cara, Hermes",
          "season": "January — June",
          "pack": "10 kg & 25 kg Poly Mesh Bags, 1250 kg Jumbo Bags, Chilled Cartons",
          "specs": "Washed & dry-brushed or sand-dusted, graded: 35/55 mm, 55/65 mm, 65+ mm",
          "icon": "🥔",
          "category": "Vegetables"
        },
        {
          "id": "lettuce",
          "name": "Iceberg & Romaine Lettuce",
          "variety": "Iceberg, Romaine, Lollo Rosso",
          "season": "November — May",
          "pack": "Corrugated Cartons 10-12 heads individually wrapped in micro-perforated bags",
          "specs": "Crisp heads vacuum-cooled immediately post-harvest, uniform weights 400 - 700 g",
          "icon": "🥗",
          "category": "Vegetables"
        },
        {
          "id": "red-cabbage",
          "name": "Fresh Red Cabbage",
          "variety": "Ruby Ball, Rodon, Roxy",
          "season": "December — May",
          "pack": "10 kg & 15 kg Ventilated Mesh Bags, Telescopic Cartons",
          "specs": "Vibrant deep purple-red color, tightly packed dense leaves, 1 - 2 kg per head, superior shelf-life",
          "icon": "🟣",
          "category": "Vegetables"
        }
      ]
    },
    "aboutPage": {
      "badge": "Company Background & Official Credentials",
      "title": "About AgriPort — Fresh Vegetable Export Enterprise",
      "subtitle": "Officially certified Egyptian enterprise exporting premium fresh vegetables from the Nile Delta and Beheira farmlands to top European and global markets.",
      "description": "AgriPort is your primary gateway and trusted Egyptian partner for fresh agricultural vegetable exports. We specialize in 8 high-demand vegetable crops: Fresh Globe Artichokes, Fine Green Beans, Broccoli, Cauliflower, Green Cabbage, Export Potatoes, Iceberg Lettuce, and Red Cabbage. Supported by over 600 feddans of GlobalG.A.P-certified farmlands, state-of-the-art optical grading stations, and rapid cold chain logistics (Pre-Cooling & Vacuum Cooling), we guarantee peak crispness and compliance with stringent EU and UK food safety standards (Global G.A.P, ISO 22000, BRCGS, HACCP).",
      "legalBadge": "Official Legal & Commercial Credentials",
      "legalTitle": "Verified Commercial Registration & Tax Legitimacy",
      "legalSubtitle": "Officially registered enterprise governed by the General Organization for Export and Import Control (GOEIC), the Egyptian Chamber of Commerce, and the Egyptian Tax Authority:",
      "commercialRegister": "Commercial Registration (C.R.)",
      "commercialRegisterVal": "108420",
      "commercialRegisterDesc": "Investment Commercial Registry Office — Agricultural Crops & Fresh Vegetable Exports",
      "taxCard": "Tax Card / Tax ID",
      "taxCardVal": "629-418-735",
      "taxCardDesc": "Investment Tax Directorate — Active corporate tax file compliant with the Egyptian e-Invoicing system",
      "exporterNumber": "GOEIC Exporter Reg. Number",
      "exporterNumberVal": "28410",
      "exporterNumberDesc": "General Organization for Export and Import Control (GOEIC Verified Exporter)",
      "chamber": "Chamber of Commerce Membership",
      "chamberVal": "Federation of Egyptian Chambers of Commerce — Exporters Division",
      "chamberDesc": "Active commercial export license and chamber accreditation",
      "registeredAddress": "Registered Corporate Address",
      "registeredAddressVal": "Arab Republic of Egypt — Beheira Governorate / Kafr El-Dawar",
      "registeredAddressDesc": "Strategic logistics hub minutes away from Alexandria, Dekheila, and Damietta export seaports",
      "map": {
        "badge": "Geographic & Logistics Location",
        "title": "Headquarters & Strategic Seaport Proximity",
        "subtitle": "Our central headquarters and packing stations are based in Kafr El-Dawar, Beheira Governorate — positioned directly alongside Egypt's prime agricultural basins and major Mediterranean container ports:",
        "openGoogleMaps": "Open in Google Maps",
        "alexPort": "Alexandria & Dekheila Seaports",
        "alexPortDist": "25 km (Direct European Reefer Seafreight)",
        "damiettaPort": "Damietta Export Port",
        "damiettaPortDist": "140 km (Scheduled Mediterranean Cargo Routes)",
        "cairoAirport": "Cairo Cargo Airport",
        "cairoAirportDist": "180 km (Rapid Airfreight Deliveries < 24h)",
        "highway": "Key Logistics Arteries",
        "highwayDist": "Direct access to Cairo-Alexandria Highway & Coastal Road"
      },
      "cropsBadge": "Our Specialized Export Basket",
      "cropsTitle": "The 8 Fresh Egyptian Vegetables for Global Export",
      "cropsSubtitle": "We specialize strictly in 8 prime vegetable crops harvested and packed to the highest international specifications:",
      "crops": [
        { "name": "Fresh Egyptian Artichokes", "desc": "Fresh heads, trimmed bottoms and tender hearts preserved in food-grade brine barrels or refrigerated cartons", "tag": "Core Flagship" },
        { "name": "Fine Green Beans", "desc": "Straight, stringless pods hand-selected into punnets and modified atmosphere cartons for air and sea freight", "tag": "Rapid Transit" },
        { "name": "Fresh Green Broccoli", "desc": "Firm, deep green heads packed in iced styrofoam boxes to lock in pristine field freshness throughout transit", "tag": "Deep Chilled" },
        { "name": "Snow-White Cauliflower", "desc": "Dense, crisp white curds individually wrapped in breathable micro-perforated shrink film", "tag": "Grade A Export" },
        { "name": "White & Green Cabbage", "desc": "Uniform weights (1.0–2.5 kg), expertly trimmed outer leaves packed into ventilated seafreight cartons", "tag": "Seafreight Cargo" },
        { "name": "Graded Export Potatoes", "desc": "Spunta & Cara varieties washed, dry-cured, and calibrated into 10/25 kg mesh sacks and 1250 kg jumbo bags", "tag": "High Volume" },
        { "name": "Crisp Iceberg Lettuce", "desc": "Crispy, compact heads individually film-wrapped with cold chain pre-cooling direct to destination ports", "tag": "Cold Chain" },
        { "name": "Vibrant Red Cabbage", "desc": "Deep purple heads, high density, and extended shelf-life tailored for fresh retail and food service", "tag": "Long Shelf-Life" }
      ],
      "pillarsTitle": "Core Pillars of Our Export Model",
      "pillars": [
        {
          "icon": "🌍",
          "title": "Exporting to 25+ Global Markets",
          "desc": "Consistent refrigerated containerized seafreight to Spain, Italy, France, Germany, the UK, GCC nations, and Africa."
        },
        {
          "icon": "🏆",
          "title": "Rigorous Quality Assurance & MRL Limits",
          "desc": "Continuous certified laboratory pesticide residue testing, uniform sizing, and sanitary EU/UK compliance."
        },
        {
          "icon": "⚡",
          "title": "Unbroken Cold Chain & Prompt Logistics",
          "desc": "Rapid pre-cooling within 2 hours of harvest and sealed reefer containers equipped with real-time temperature loggers."
        }
      ],
      "stats": {
        "farms": "Certified Farmland Acreage",
        "farmsVal": "+600 Feddans",
        "capacity": "Daily Sorting & Packing Output",
        "capacityVal": "+200 Tons / Day",
        "coldChain": "Climate Controlled Cold Chain",
        "coldChainVal": "100% Guaranteed",
        "markets": "Export Destination Countries",
        "marketsVal": "+25 Countries"
      },
      "ctaTitle": "Ready to Secure Your Fresh Vegetable Consignments with a Verified Exporter?",
      "ctaDesc": "Our international sales desk is ready to provide immediate FOB/CIF quotations and customized seasonal programs for your target ports.",
      "ctaQuote": "Request Commercial Quote",
      "ctaFacilities": "Explore Packing Facilities"
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
        "productPlaceholder": "Fresh Artichokes, Green Beans, Broccoli, Cauliflower, Potatoes...",
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
          "subtitle": "Advanced export infrastructure integrating modern electronic sorting lines, certified vegetable packing houses, and rapid cold chain logistics from field to destination port.",
          "badge": "Our Facilities",
          "stats": {
                "stations": "Central Packing Stations",
                "stationsVal": "4 Certified Stations",
                "farms": "Supervised Export Farmlands",
                "farmsVal": "+600 Feddans Vegetables",
                "coldChain": "Unbroken Cold Chain",
                "coldChainVal": "100% Climate Controlled",
                "capacity": "Daily Sorting Capacity",
                "capacityVal": "+200 Tons / Day"
          },
          "videoBadge": "Live Documentary Video",
          "videoTitle": "Watch Live: Automated Vegetable Sorting, Packing & Cold Chain in Action",
          "videoDesc": "Cutting-edge electronic sorting, processing artichokes, green beans, and broccoli to preserve peak freshness for global markets.",
          "videoPlayBtn": "Watch Facility Tour",
          "videoDuration": "Documentary Tour • 02:45 min",
          "filterAll": "All Facilities",
          "filterStations": "Packing Stations",
          "filterFarms": "Farms & Orchards",
          "filterColdChain": "Cold Chain & Logistics",
          "filterLab": "Quality & Testing Labs",
          "items": [
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "Central Artichoke Plant",
                      "title": "Egyptian Artichoke Sorting, Trimming & Export Processing Unit",
                      "desc": "Sterile processing and sorting lines for fresh artichokes, trimming bottoms and hearts packed into food-grade brine barrels and chilled cartons for Europe.",
                      "specs": "40 Tons / Day Output • Calibers 50, 60, 65 mm • BRC & Global G.A.P Certified",
                      "image": "",
                      "tag": "Processing & Packing"
                },
                {
                      "id": "vegetable-farms",
                      "category": "farms",
                      "badge": "Model Farmlands",
                      "title": "Certified Vegetable Farmlands (Artichoke, Broccoli, Lettuce, Cabbage)",
                      "desc": "Integrated farm management with automated drip irrigation and biocontrol protocols across Beheira and Nile Delta, ensuring zero harmful pesticide residues.",
                      "specs": "+600 Feddans Export Vegetables • Nubariya & Nile Delta • Global G.A.P & SMETA",
                      "image": "",
                      "tag": "Certified Farms"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "Rapid Cold Chain",
                      "title": "Rapid Pre-Cooling Chambers & Vacuum Cooling Facilities",
                      "desc": "Vegetable pulp temperature is rapidly reduced within 2 hours of harvest to arrest respiration, locking in maximum crispness and long transit shelf-life.",
                      "specs": "0–4°C Climate Control • 90–95% Relative Humidity • IoT Real-time Telemetry",
                      "image": "",
                      "tag": "Rapid Pre-Cooling"
                },
                {
                      "id": "potatoes-plant",
                      "category": "stations",
                      "badge": "Potato Export Facility",
                      "title": "Potato Washing, Grading & Packing Facility",
                      "desc": "Advanced mechanical screening and curing lines preparing export potatoes in 10/25 kg mesh sacks and 1250 kg jumbo export bags for maritime freight.",
                      "specs": "120 Tons / Day Capacity • Calibers 35/55 mm & 55+ mm • Disinfected Wash Basins",
                      "image": "",
                      "tag": "Grading & Packing"
                },
                {
                      "id": "beans-broccoli-packhouse",
                      "category": "stations",
                      "badge": "Beans, Broccoli & Cauliflower Plant",
                      "title": "Green Beans, Broccoli & Cauliflower Sizing & Packing Lines",
                      "desc": "Precise sizing for tender green beans into punnets, plus shrink-wrapped cauliflower and iced styrofoam packing for crisp broccoli florets.",
                      "specs": "Iced Styrofoam Packing • Shrink Wrap Packaging • Grade A Hand Selection",
                      "image": "",
                      "tag": "Chilled Packing"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "Quality Control & Lab",
                      "title": "In-House Agricultural Quality & MRL Testing Lab",
                      "desc": "Systematic multi-point batch sampling verifying brix levels, sizing accuracy, and EU chemical residue limits with certified analysis certificates.",
                      "specs": "Accredited Lab Testing • Brix & Residue Analysis • ISO 22000",
                      "image": "",
                      "tag": "Lab Tested"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "Logistics & Shipping Docks",
                      "title": "Enclosed Refrigerated Container Loading Bays",
                      "desc": "Sealed cold loading docks connected directly to Alexandria and Damietta ports, equipped with digital temperature data loggers tracking every nautical mile.",
                      "specs": "10+ Reefer Containers Daily • Digital Live Tracking Loggers",
                      "image": "",
                      "tag": "Cold Docking"
                },
                {
                      "id": "cabbage-lettuce-unit",
                      "category": "stations",
                      "badge": "Cabbage & Lettuce Facility",
                      "title": "Green & Red Cabbage and Iceberg Lettuce Conditioning Unit",
                      "desc": "Exterior leaf trimming, micro-perforated individual wrapping, and packing into ventilated cartons ensuring superior crispness throughout export journeys.",
                      "specs": "Micro-perforated Film Wrapping • 1.0 - 2.5 kg Uniform Weights • Reefer Sea Freight",
                      "image": "",
                      "tag": "Trimming & Wrapping"
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
                      "desc": "Live walkthrough of certified export vegetable farmlands verifying GlobalG.A.P. compliance, crop health, and zero-residue management."
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
                            "artichoke": "Egyptian Artichoke Sorting, Trimming & Export Processing Plant",
                            "potatoes": "Export Potato Washing, Sizing & Packhouse Facility",
                            "beansBroccoli": "Fine Green Beans, Broccoli & Cauliflower Packing Lines",
                            "farms": "Certified Export Vegetable Farmlands (+600 Feddans)",
                            "coldChain": "Rapid Pre-Cooling Chambers & Sealed Reefer Loading Docks",
                            "qualityLab": "In-House Quality Control, Food Safety & MRL Residue Testing Lab"
                      },
                      "targetCrops": "Target Crops of Interest for Import",
                      "targetCropsPlaceholder": "e.g. Fresh Artichokes, Green Beans, Broccoli, Cauliflower, Potatoes, Lettuce...",
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
      "card1Title": "Exportations d'Artichauts Égyptiens",
      "card1Desc": "Artichauts égyptiens de catégorie A (variétés françaises et locales, frais et usinés).",
      "card2Tag": "Contrôle Thermique Instantané",
      "card2Badge": "Chaîne du Froid Ininterrompue",
      "card2Title": "Intégrité de la Chaîne du Froid",
      "card2Desc": "Contrôle de la température de bout en bout garantissant zéro dégradation du champ au port de destination.",
      "card2Specs": "Chambres de Pré-refroidissement • Quais Frigo • Télémétrie IoT",
      "card2Cta": "Explorer les Installations",
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
          "id": "artichoke",
          "name": "Artichauts Égyptiens Frais",
          "variety": "Artichaut Français, Variété Baladi, Violet",
          "season": "Novembre — Mai",
          "pack": "Fûts alimentaires en saumure, Cartons réfrigérés, Sachets sous vide",
          "specs": "Calibres : 50, 60, 65 mm Première Catégorie, fonds et cœurs parés selon normes UE",
          "icon": "🌱",
          "category": "Légumes"
        },
        {
          "id": "green-beans",
          "name": "Haricots Verts Frais d'Égypte",
          "variety": "Polesta, Bronco, Valentino",
          "season": "Octobre — Mai",
          "pack": "Cartons renforcés 4-5 kg, Barquettes 250g et 500g sous froid",
          "specs": "Gousses droites sans fil, longueur 10-14 cm, calibres Fin & Extra-Fin",
          "icon": "🫘",
          "category": "Légumes"
        },
        {
          "id": "broccoli",
          "name": "Brocoli Frais d'Exportation",
          "variety": "Calabrais, Marathon, Heritage",
          "season": "Novembre — Avril",
          "pack": "Boîtes polystyrène glacées 5-6 kg, Cartons filmés réfrigérés",
          "specs": "Têtes compactes vert bleuté foncé, diamètre 10-15 cm, tige parée 2-3 cm, pré-refroidi",
          "icon": "🥦",
          "category": "Légumes"
        },
        {
          "id": "cauliflower",
          "name": "Chou-fleur Blanc Extra",
          "variety": "Snowball, Fremantle, Incline",
          "season": "Novembre — Avril",
          "pack": "Cartons doublés 6-8 pièces, Film thermorétractable micro-perforé",
          "specs": "Pommes blanches denses et fermes, poids 1,0 - 1,8 kg, feuilles de protection parées",
          "icon": "🥬",
          "category": "Légumes"
        },
        {
          "id": "cabbage",
          "name": "Chou Blanc & Vert Frais",
          "variety": "Variété locale Baladi, Hybrides F1 (Braunschweig, Bronco)",
          "season": "Décembre — Mai",
          "pack": "Sacs filets 15-20 kg, Caisses bois, Palettes maritimes réfrigérées",
          "specs": "Pommes sphériques denses et bien serrées, poids uniformes 1,5 - 2,5 kg, sans défauts",
          "icon": "🥬",
          "category": "Légumes"
        },
        {
          "id": "potatoes",
          "name": "Pommes de Terre de Consommation",
          "variety": "Spunta, Mondial, Lady Rosetta, Cara, Hermes",
          "season": "Janvier — Juin",
          "pack": "Sacs filets 10 kg et 25 kg, Jumbo Bags 1250 kg, Cartons réfrigérés",
          "specs": "Lavées ou brossées, calibres : 35/55 mm, 55/65 mm, 65+ mm",
          "icon": "🥔",
          "category": "Légumes"
        },
        {
          "id": "lettuce",
          "name": "Laitues Iceberg & Romaine",
          "variety": "Iceberg, Romaine, Lollo Rosso",
          "season": "Novembre — Mai",
          "pack": "Cartons ondulés 10-12 pièces emballées individuellement sous sachet micro-perforé",
          "specs": "Têtes croquantes refroidies sous vide (Vacuum Cooling), poids 400 - 700 g",
          "icon": "🥗",
          "category": "Légumes"
        },
        {
          "id": "red-cabbage",
          "name": "Chou Rouge Frais Extra",
          "variety": "Ruby Ball, Rodon, Roxy",
          "season": "Décembre — Mai",
          "pack": "Sacs filets ventilés 10 et 15 kg, Cartons télescopiques d'export",
          "specs": "Couleur pourpre foncé intense, feuilles très serrées, 1 - 2 kg par tête, excellente conservation",
          "icon": "🟣",
          "category": "Légumes"
        }
      ]
    },
    "aboutPage": {
      "badge": "Entreprise & Références Officielles",
      "title": "À Propos d'AgriPort — Entreprise d'Exportation Maraîchère",
      "subtitle": "Entreprise égyptienne officiellement enregistrée et certifiée, exportant des légumes frais de haute qualité du delta du Nil et de Beheira vers les marchés mondiaux.",
      "description": "AgriPort est votre passerelle d'excellence et votre partenaire égyptien de confiance pour l'exportation de légumes frais. Nous sommes spécialisés dans 8 cultures de premier plan : Artichauts frais égyptiens, Haricots verts fins, Brocolis, Choux-fleurs, Choux blancs & verts, Pommes de terre de consommation, Laitues Iceberg et Choux rouges. Forts de plus de 600 feddans de cultures certifiées GlobalG.A.P, de stations de conditionnement automatisées et d'une chaîne du froid continue (Pre-Cooling & Vacuum Cooling), nous garantissons une fraîcheur optimale et une conformité rigoureuse avec les exigences de l'Union Européenne (Global G.A.P, ISO 22000, BRCGS, HACCP).",
      "legalBadge": "Références Légales & Légitimité Commerciale",
      "legalTitle": "Registre du Commerce & Identifiants Fiscaux Officiels",
      "legalSubtitle": "Société officiellement immatriculée auprès de l'Autorité Générale pour le Contrôle des Exportations et Importations (GOEIC), de la Chambre de Commerce et de l'Administration Fiscale Égyptienne :",
      "commercialRegister": "Registre du Commerce (C.R)",
      "commercialRegisterVal": "108420",
      "commercialRegisterDesc": "Bureau du Registre du Commerce des Investissements — Exportation de produits agricoles et légumes frais",
      "taxCard": "Matricule Fiscale / Tax ID",
      "taxCardVal": "629-418-735",
      "taxCardDesc": "Direction Fiscale des Investissements — Dossier fiscal actif conforme à la facturation électronique égyptienne",
      "exporterNumber": "Numéro d'Exportateur GOEIC",
      "exporterNumberVal": "28410",
      "exporterNumberDesc": "Organisme Général du Contrôle des Exportations et Importations (GOEIC)",
      "chamber": "Chambre de Commerce Égyptienne",
      "chamberVal": "Membre de la Division Générale des Exportateurs — Chambre de Commerce",
      "chamberDesc": "Fédération des Chambres de Commerce Égyptiennes — Licence d'exportation active",
      "registeredAddress": "Siège Social Immatriculé",
      "registeredAddressVal": "République Arabe d'Égypte — Gouvernorat de Beheira / Kafr El-Dawar",
      "registeredAddressDesc": "Pôle logistique stratégique situé à quelques minutes des ports d'Alexandrie, Dekheila et Damiette",
      "map": {
        "badge": "Localisation Géographique & Logistique",
        "title": "Siège Social & Proximité Stratégique des Ports",
        "subtitle": "Notre siège et nos installations sont implantés à Kafr El-Dawar (Beheira), au cœur du delta agricole et à proximité immédiate des grands ports d'exportation méditerranéens :",
        "openGoogleMaps": "Ouvrir dans Google Maps",
        "alexPort": "Ports d'Alexandrie et Dekheila",
        "alexPortDist": "25 km (Fret maritime réfrigéré direct vers l'Europe)",
        "damiettaPort": "Port d'Exportation de Damiette",
        "damiettaPortDist": "140 km (Lignes maritimes régulières)",
        "cairoAirport": "Aéroport Fret du Caire",
        "cairoAirportDist": "180 km (Vols cargo express en moins de 24h)",
        "highway": "Axes Logistiques Majeurs",
        "highwayDist": "Accès direct à la route agricole et l'autoroute côtière internationale"
      },
      "cropsBadge": "Notre Panier Maraîcher Spécialisé",
      "cropsTitle": "Les 8 Légumes Frais pour l'Exportation Internationale",
      "cropsSubtitle": "Nous appliquons une spécialisation rigoureuse sur 8 légumes phares conditionnés selon les exigences internationales :",
      "crops": [
        { "name": "Artichauts Frais d'Égypte", "desc": "Têtes fraîches, fonds et cœurs parés conservés en fûts alimentaires sous saumure ou cartons réfrigérés", "tag": "Culture Phare" },
        { "name": "Haricots Verts Extra-Fins", "desc": "Gousses régulières sans fils, calibrées en barquettes fraîches pour fret aérien ou maritime", "tag": "Fret Rapide" },
        { "name": "Brocolis Frais d'Égypte", "desc": "Têtes compactes vert foncé emballées en caisses polystyrène glacées Iced Styrofoam", "tag": "Froid Polaire" },
        { "name": "Choux-fleurs Blancs Denses", "desc": "Pommes fermes et immaculées sous film rétractable micro-perforé protecteur", "tag": "Sélection Extra" },
        { "name": "Choux Blancs & Verts", "desc": "Poids homogènes (1,5 à 2,5 kg), parage soigné et emballage en cartons aérés pour transport maritime", "tag": "Fret Maritime" },
        { "name": "Pommes de Terre Calibrées", "desc": "Variétés Spunta et Cara lavées, séchées et calibrées en sacs filets et big bags jumbo", "tag": "Grands Volumes" },
        { "name": "Laitues Iceberg Croquantes", "desc": "Pommes très croquantes emballées individuellement avec pré-refroidissement rapide jusqu'au port d'arrivée", "tag": "Chaîne du Froid" },
        { "name": "Choux Rouges Spéciaux", "desc": "Couleur pourpre vive, densité élevée et excellente tenue en rayon pour la distribution et l'industrie", "tag": "Longue Conservation" }
      ],
      "pillarsTitle": "Piliers de Notre Engagement d'Exportation",
      "pillars": [
        {
          "icon": "🌍",
          "title": "Export vers plus de 25 Marchés Mondiaux",
          "desc": "Expéditions régulières en conteneurs frigorifiques vers la France, l'Espagne, l'Italie, l'Allemagne, le Royaume-Uni, le Golfe et l'Afrique."
        },
        {
          "icon": "🏆",
          "title": "Contrôle Qualité Rigoureux & Respect des LMR",
          "desc": "Analyses multirésidus systématiques en laboratoire et conformité stricte avec les normes sanitaires européennes."
        },
        {
          "icon": "⚡",
          "title": "Chaîne du Froid Ininterrompue & Logistique Rapide",
          "desc": "Pré-refroidissement en moins de 2 heures après récolte et conteneurs maritimes Reefer avec enregistreurs de température numériques."
        }
      ],
      "stats": {
        "farms": "Surfaces Agricoles Certifiées",
        "farmsVal": "+600 Feddans",
        "capacity": "Capacité Journalière de Tri & Emballage",
        "capacityVal": "+200 Tonnes / Jour",
        "coldChain": "Chaîne du Froid Sous Contrôle",
        "coldChainVal": "100% Température Gérée",
        "markets": "Pays de Destination Desservis",
        "marketsVal": "+25 Pays"
      },
      "ctaTitle": "Prêt à Sécuriser Vos Approvisionnements avec un Exportateur Officiel Agréé ?",
      "ctaDesc": "Notre bureau commercial international est à votre disposition pour vous fournir des cotations FOB/CIF compétitives et des calendriers d'expédition détaillés.",
      "ctaQuote": "Demander une Cotation Officielle",
      "ctaFacilities": "Découvrir Nos Stations de Conditionnement"
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
        "productPlaceholder": "Artichauts frais, Haricots verts, Brocolis, Choux-fleurs, Pommes de terre...",
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
          "subtitle": "Une infrastructure d'exportation avancée intégrant des lignes modernes de tri électronique, des stations de conditionnement de légumes certifiées et une chaîne du froid rapide du champ au port de destination.",
          "badge": "Nos Installations",
          "stats": {
                "stations": "Stations de Conditionnement Centrales",
                "stationsVal": "4 Stations Certifiées",
                "farms": "Domaines Agricoles Suivis",
                "farmsVal": "+600 Feddans de Légumes",
                "coldChain": "Chaîne du Froid Continue",
                "coldChainVal": "100% Température Contrôlée",
                "capacity": "Capacité Quotidienne de Tri",
                "capacityVal": "+200 Tonnes / Jour"
          },
          "videoBadge": "Vidéo Documentaire en Direct",
          "videoTitle": "En Vidéo : Le Tri Automatisé des Légumes, le Conditionnement et la Chaîne du Froid",
          "videoDesc": "Technologies de tri électronique de pointe, traitement des artichauts, haricots verts et brocolis préservant une fraîcheur maximale pour les marchés mondiaux.",
          "videoPlayBtn": "Lancer la Visite Virtuelle",
          "videoDuration": "Visite Documentaire • 02:45 min",
          "filterAll": "Toutes les Installations",
          "filterStations": "Stations de Conditionnement",
          "filterFarms": "Domaines & Parcelles",
          "filterColdChain": "Chaîne du Froid & Logistique",
          "filterLab": "Laboratoires de Contrôle Qualité",
          "items": [
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "Unité Centrale Artichauts",
                      "title": "Atelier de Tri, Parage et Conditionnement d'Artichauts Égyptiens",
                      "desc": "Lignes stériles de tri et de parage des artichauts frais, fonds et cœurs conditionnés en fûts alimentaires sous saumure et cartons réfrigérés pour l'exportation vers l'Europe.",
                      "specs": "Capacité 40 Tonnes / Jour • Calibres 50, 60, 65 mm • Certifications BRC & Global G.A.P",
                      "image": "",
                      "tag": "Parage & Conditionnement"
                },
                {
                      "id": "vegetable-farms",
                      "category": "farms",
                      "badge": "Domaines Maraîchers Modèles",
                      "title": "Domaines Agricoles Certifiés (Artichauts, Brocolis, Laitues, Choux)",
                      "desc": "Gestion agricole intégrée avec fertigation goutte-à-goutte automatisée et biocontrôle à Beheira et dans le delta du Nil, assurant l'absence de résidus chimiques nocifs.",
                      "specs": "+600 Feddans Légumes Export • Noubariya & Delta • Global G.A.P & SMETA",
                      "image": "",
                      "tag": "Domaines Certifiés"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "Chaîne du Froid Rapide",
                      "title": "Chambres de Pré-refroidissement Rapide (Pre-Cooling) & Vacuum Cooling",
                      "desc": "La température à cœur des légumes est abaissée dans les 2 heures suivant la récolte pour bloquer la respiration et garantir une fermeté et une fraîcheur durables.",
                      "specs": "Contrôle 0–4°C • Humidité Relative 90–95% • Télémétrie IoT en Direct",
                      "image": "",
                      "tag": "Pré-refroidissement"
                },
                {
                      "id": "potatoes-plant",
                      "category": "stations",
                      "badge": "Station Pommes de Terre",
                      "title": "Lignes de Lavage, Calibrage et Conditionnement de Pommes de Terre",
                      "desc": "Lignes modernes de lavage, séchage et tri éliminant les défauts, préparant les pommes de terre en sacs filets de 10/25 kg et sacs jumbo de 1250 kg pour l'export maritime.",
                      "specs": "Capacité 120 Tonnes / Jour • Calibres 35/55 mm & 55+ mm • Bacs de lavage désinfectés",
                      "image": "",
                      "tag": "Calibrage & Conditionnement"
                },
                {
                      "id": "beans-broccoli-packhouse",
                      "category": "stations",
                      "badge": "Station Haricots, Brocolis et Choux-fleurs",
                      "title": "Lignes de Tri et d'Emballage pour Haricots Verts, Brocolis & Choux-fleurs",
                      "desc": "Calibrage précis des haricots verts extra-fins en barquettes, emballage sous film rétractable pour le chou-fleur et caisses polystyrène glacées pour le brocoli.",
                      "specs": "Emballage Iced Styrofoam • Film Rétractable • Sélection Manuelle Extra",
                      "image": "",
                      "tag": "Conditionnement Réfrigéré"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "Laboratoire de Contrôle Qualité",
                      "title": "Laboratoire d'Analyses Agricoles et Contrôle des LMR",
                      "desc": "Échantillonnage méthodique vérifiant la conformité dimensionnelle, la fraîcheur et le respect strict des limites maximales de résidus de l'Union Européenne.",
                      "specs": "Laboratoire Accrédité • Analyses Résidus & Qualité • ISO 22000 & HACCP",
                      "image": "",
                      "tag": "Certifié Labo"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "Quais d'Expédition Logistique",
                      "title": "Quais Réfrigérés d'Empotage de Conteneurs Maritimes",
                      "desc": "Quais étanches sous température dirigée reliant directement les ports d'Alexandrie et Damiette, munis d'enregistreurs de température numériques IoT.",
                      "specs": "Plus de 10 Conteneurs Reefer / Jour • Suivi Numérique en Direct",
                      "image": "",
                      "tag": "Quais Réfrigérés"
                },
                {
                      "id": "cabbage-lettuce-unit",
                      "category": "stations",
                      "badge": "Station Choux & Laitues",
                      "title": "Unité de Parage et d'Emballage de Choux (Vert et Rouge) & Laitue Iceberg",
                      "desc": "Parage hygiénique des feuilles extérieures, ensachage individuel micro-perforé et mise en cartons ondulés ventilés assurant un croquant intact durant l'exportation.",
                      "specs": "Film Micro-perforé • Poids Homogènes 1,0 - 2,5 kg • Fret Maritime Réfrigéré",
                      "image": "",
                      "tag": "Parage & Filmage"
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
                      "title": "Inspection des Domaines & Récolte",
                      "desc": "Parcours guidé au cœur de nos domaines de légumes frais certifiés GlobalG.A.P. et sans résidus."
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
                            "artichoke": "Atelier de Tri, Parage et Conditionnement d'Artichauts Égyptiens",
                            "potatoes": "Station de Lavage, Calibrage et Conditionnement de Pommes de Terre",
                            "beansBroccoli": "Lignes de Tri et d'Emballage pour Haricots Verts, Brocolis & Choux-fleurs",
                            "farms": "Domaines Agricoles de Légumes Frais Certifiés (+600 Feddans)",
                            "coldChain": "Chambres de Pré-refroidissement Rapide & Quais Frigorifiques",
                            "qualityLab": "Laboratoire d'Analyses Qualité, Sécurité Alimentaire et LMR"
                      },
                      "targetCrops": "Cultures d'Intérêt à l'Importation",
                      "targetCropsPlaceholder": "ex: Artichauts frais, Haricots verts, Brocolis, Choux-fleurs, Pommes de terre...",
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
      "card1Title": "Esportazioni di Carciofi Egiziani",
      "card1Desc": "Carciofi egiziani di Classe A (varietà francesi e locali, freschi e lavorati).",
      "card2Tag": "Controllo Termico Istantaneo",
      "card2Badge": "Catena del Freddo Continua",
      "card2Title": "Integrità della Catena del Freddo",
      "card2Desc": "Controllo della temperatura end-to-end per garantire zero degrado dal campo al porto di destinazione.",
      "card2Specs": "Camere di Pre-raffreddamento • Baie Reefer • Sensori IoT",
      "card2Cta": "Esplora gli Impianti",
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
          "id": "artichoke",
          "name": "Carciofi Freschi Egiziani",
          "variety": "Carciofo Francese, Varietà Baladi, Violetto",
          "season": "Novembre — Maggio",
          "pack": "Fusti per alimenti in salamoia, Cartoni refrigerati, Sottovuoto",
          "specs": "Calibri: 50, 60, 65 mm Prima Categoria, fondi e cuori puliti conformi standard UE",
          "icon": "🌱",
          "category": "Verdure"
        },
        {
          "id": "green-beans",
          "name": "Fagiolini Verdi Freschi",
          "variety": "Polesta, Bronco, Valentino",
          "season": "Ottobre — Maggio",
          "pack": "Cartoni rinforzati 4-5 kg, Vaschette 250g e 500g refrigerate",
          "specs": "Baccelli dritti senza filo, lunghezza 10-14 cm, calibri Fine & Extra Fine",
          "icon": "🫘",
          "category": "Verdure"
        },
        {
          "id": "broccoli",
          "name": "Broccoli Verdi Freschi",
          "variety": "Calabrese, Marathon, Heritage",
          "season": "Novembre — Aprile",
          "pack": "Casse in polistirolo con ghiaccio 5-6 kg, Cartoni refrigerati filmati",
          "specs": "Infiorescenze serrate verde-bluastro scuro, diametro 10-15 cm, gambo rifilato 2-3 cm, pre-raffreddati",
          "icon": "🥦",
          "category": "Verdure"
        },
        {
          "id": "cauliflower",
          "name": "Cavolfiore Bianco Pregiato",
          "variety": "Snowball, Fremantle, Incline",
          "season": "Novembre — Aprile",
          "pack": "Cartoni foderati 6-8 pezzi, Film termoretraibile microforato",
          "specs": "Cime dense bianco neve compatte, peso 1,0 - 1,8 kg, foglie di protezione rifilate",
          "icon": "🥬",
          "category": "Verdure"
        },
        {
          "id": "cabbage",
          "name": "Cavolo Cappuccio Bianco/Verde",
          "variety": "Varietà locale Baladi, Ibridi F1 (Braunschweig, Bronco)",
          "season": "Dicembre — Maggio",
          "pack": "Sacchi a rete 15-20 kg, Casse in legno, Pallet marittimi reefer",
          "specs": "Teste sferiche compatte ben serrate, calibri omogenei 1,5 - 2,5 kg, esenti da difetti",
          "icon": "🥬",
          "category": "Verdure"
        },
        {
          "id": "potatoes",
          "name": "Patate da Consumo e Industria",
          "variety": "Spunta, Mondial, Lady Rosetta, Cara, Hermes",
          "season": "Gennaio — Giugno",
          "pack": "Sacchi a rete 10 kg e 25 kg, Jumbo Bags 1250 kg, Cartoni refrigerati",
          "specs": "Lavate o spazzolate, calibri: 35/55 mm, 55/65 mm, 65+ mm",
          "icon": "🥔",
          "category": "Verdure"
        },
        {
          "id": "lettuce",
          "name": "Lattuga Iceberg & Romana",
          "variety": "Iceberg, Romana, Lollo Rosso",
          "season": "Novembre — Maggio",
          "pack": "Cartoni ondulati 10-12 pezzi incartati singolarmente in sacchetti microforati",
          "specs": "Cespi croccanti raffreddati con tecnologia Vacuum Cooling, peso 400 - 700 g",
          "icon": "🥗",
          "category": "Verdure"
        },
        {
          "id": "red-cabbage",
          "name": "Cavolo Cappuccio Rosso",
          "variety": "Ruby Ball, Rodon, Roxy",
          "season": "Dicembre — Maggio",
          "pack": "Sacchi a rete ventilati 10 e 15 kg, Cartoni telescopici da esportazione",
          "specs": "Colore viola scuro intenso, foglie molto serrate, peso 1 - 2 kg, eccezionale conservabilità",
          "icon": "🟣",
          "category": "Verdure"
        }
      ]
    },
    "aboutPage": {
      "badge": "Azienda & Credenziali Ufficiali",
      "title": "Chi Siamo — AgriPort Esportazione Ortaggi Freschi",
      "subtitle": "Impresa egiziana registrata e certificata per l'esportazione di ortaggi freschi di prima scelta dal Delta del Nilo e da Beheira verso i mercati europei e globali.",
      "description": "AgriPort è il tuo partner strategico di fiducia in Egitto per l'importazione diretta di ortaggi freschi di qualità superiore. Siamo specializzati in 8 colture cardine: Carciofi freschi egiziani, Fagiolini finissimi, Broccoli, Cavolfiori, Cavolo cappuccio bianco e verde, Patate da esportazione, Lattuga Iceberg e Cavolo rosso. Grazie a oltre 600 feddan di terreni certificati GlobalG.A.P, moderni centri di condizionamento automatizzati e una catena del freddo rapida (Pre-Cooling & Vacuum Cooling), garantiamo partite freschissime e pienamente conformi alle severe normative dell'Unione Europea (Global G.A.P, ISO 22000, BRCGS, HACCP).",
      "legalBadge": "Riferimenti Legali & Credenziali Commerciali",
      "legalTitle": "Registro delle Imprese & Dati Fiscali Ufficiali",
      "legalSubtitle": "Società ufficialmente iscritta presso l'Autorità Generale di Controllo su Import-Export (GOEIC), la Camera di Commercio e l'Amministrazione Tributaria Egiziana:",
      "commercialRegister": "Registro delle Imprese (C.R)",
      "commercialRegisterVal": "108420",
      "commercialRegisterDesc": "Ufficio del Registro delle Imprese per gli Investimenti — Esportazione prodotti agricoli e ortaggi freschi",
      "taxCard": "Codice Fiscale Aziendale / Tax ID",
      "taxCardVal": "629-418-735",
      "taxCardDesc": "Ufficio Tributario Investimenti — Posizione fiscale attiva e conforme al sistema di fatturazione elettronica",
      "exporterNumber": "Numero Esportatore GOEIC",
      "exporterNumberVal": "28410",
      "exporterNumberDesc": "Organizzazione Generale per il Controllo delle Esportazioni e Importazioni (GOEIC)",
      "chamber": "Camera di Commercio Egiziana",
      "chamberVal": "Membro della Divisione Generale degli Esportatori — Camera di Commercio",
      "chamberDesc": "Federazione delle Camere di Commercio Egiziane — Licenza di esportazione attiva",
      "registeredAddress": "Sede Legale Registrata",
      "registeredAddressVal": "Repubblica Araba d'Egitto — Governatorato di Beheira / Kafr El-Dawar",
      "registeredAddressDesc": "Polo logistico strategico a pochi minuti dai porti d'imbarco di Alessandria, Dekheila e Damietta",
      "map": {
        "badge": "Posizione Geografica & Logistica",
        "title": "Sede Aziendale & Vicinanza Strategica ai Porti",
        "subtitle": "La nostra sede centrale e gli stabilimenti si trovano a Kafr El-Dawar (Beheira), nel cuore fertile del Delta del Nilo e a brevissima distanza dai principali porti container del Mediterraneo:",
        "openGoogleMaps": "Apri in Google Maps",
        "alexPort": "Porti di Alessandria e Dekheila",
        "alexPortDist": "25 km (Fret marittimo reefer diretto per l'Europa)",
        "damiettaPort": "Porto Commerciale di Damietta",
        "damiettaPortDist": "140 km (Rotte marittime continue)",
        "cairoAirport": "Aeroporto Cargo del Cairo",
        "cairoAirportDist": "180 km (Spedizioni aeree fresche entro 24h)",
        "highway": "Arterie Logistiche Principali",
        "highwayDist": "Accesso immediato all'autostrada costiera e agricola"
      },
      "cropsBadge": "La Nostra Selezione Orticola",
      "cropsTitle": "Gli 8 Ortaggi Freschi per l'Esportazione Mondiale",
      "cropsSubtitle": "Adottiamo una rigorosa specializzazione su 8 ortaggi primari selezionati secondo i massimi requisiti internazionali:",
      "crops": [
        { "name": "Carciofi Freschi Egiziani", "desc": "Capolini freschi, fondi e cuori calibrati confezionati in fusti alimentari in salamoia o cartoni refrigerati", "tag": "Coltura Cardine" },
        { "name": "Fagiolini Finissimi", "desc": "Baccelli dritti e teneri senza filo, calibrati in cestini protetti per trasporto aereo e marittimo", "tag": "Spedizione Rapida" },
        { "name": "Broccoli Freschi d'Egitto", "desc": "Cime compatte verde intenso imballate in casse di polistirolo ghiacciate Iced Styrofoam", "tag": "Ghiaccio Diretto" },
        { "name": "Cavolfiori Bianco Candido", "desc": "Corimbi sodi e immacolati avvolti singolarmente in film termoretraibile microforato protettivo", "tag": "Prima Scelta" },
        { "name": "Cavolo Bianco e Verde", "desc": "Pezzature uniformi (1,5 - 2,5 kg), rifilatura accurata in cartoni areati per spedizioni marittime", "tag": "Export Marittimo" },
        { "name": "Patate Calibrate da Export", "desc": "Varietà Spunta e Cara lavate, asciugate e calibrate in sacchi a rete e sacconi jumbo", "tag": "Grandi Volumi" },
        { "name": "Lattuga Iceberg Croccante", "desc": "Cespi croccantissimi filmati singolarmente con pre-raffreddamento rapido fino al porto d'arrivo", "tag": "Catena del Freddo" },
        { "name": "Cavolo Rosso Selezionato", "desc": "Colore porpora brillante, elevata compattezza e lunga shelf-life per ortomercati e industria", "tag": "Lunga Durata" }
      ],
      "pillarsTitle": "I Nostri Pilastri di Esportazione",
      "pillars": [
        {
          "icon": "🌍",
          "title": "Presenza in oltre 25 Mercati Globali",
          "desc": "Spedizioni continue e programmate in container refrigerati verso l'Italia, la Spagna, la Francia, la Germania, il Regno Unito, il Golfo e l'Africa."
        },
        {
          "icon": "🏆",
          "title": "Qualità Certificata & Rispetto Limiti MRL",
          "desc": "Analisi multiresiduo sistematiche in laboratorio e rigorosa conformità ai requisiti fitosanitari dell'Unione Europea."
        },
        {
          "icon": "⚡",
          "title": "Catena del Freddo Continua & Spedizioni Reefer",
          "desc": "Pre-raffreddamento entro 2 ore dalla raccolta e container marittimi Reefer monitorati costantemente con datalogger digitali."
        }
      ],
      "stats": {
        "farms": "Superfici Agricole Certificate",
        "farmsVal": "+600 Feddan",
        "capacity": "Capacità Giornaliera di Calibrazione",
        "capacityVal": "+200 Ton / Giorno",
        "coldChain": "Catena del Freddo Integrata",
        "coldChainVal": "100% Controllata",
        "markets": "Mercati Internazionali Serviti",
        "marketsVal": "+25 Paesi"
      },
      "ctaTitle": "Pronto a Pianificare le Tue Forniture con un Esportatore Ufficiale Certificato?",
      "ctaDesc": "Il nostro ufficio commerciale internazionale è a tua disposizione per formulare quotazioni FOB/CIF competitive e calendari di carico personalizzati.",
      "ctaQuote": "Richiedi Preventivo Ufficiale",
      "ctaFacilities": "Scopri i Centri di Confezionamento"
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
        "productPlaceholder": "Carciofi freschi, Fagiolini, Broccoli, Cavolfiori, Patate...",
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
          "subtitle": "Infrastruttura di esportazione all'avanguardia che integra moderne linee di calibrazione elettronica, stabilimenti di confezionamento ortaggi certificati e catena del freddo rapida dal campo al porto di destinazione.",
          "badge": "Le Nostre Strutture",
          "stats": {
                "stations": "Centri di Confezionamento Centrali",
                "stationsVal": "4 Centri Certificati",
                "farms": "Superfici Agricole Monitorate",
                "farmsVal": "+600 Feddan di Ortaggi",
                "coldChain": "Catena del Freddo Continua",
                "coldChainVal": "100% Controllo Termico",
                "capacity": "Capacità Giornaliera di Calibrazione",
                "capacityVal": "+200 Tonnellate / Giorno"
          },
          "videoBadge": "Video Documentario dal Vivo",
          "videoTitle": "Guarda in Video: Calibrazione Automatica Ortaggi, Confezionamento e Catena del Freddo",
          "videoDesc": "Tecnologie elettroniche avanzate per il trattamento di carciofi, fagiolini e broccoli, preservando la massima freschezza per i mercati ortofrutticoli internazionali.",
          "videoPlayBtn": "Avvia Tour Virtuale",
          "videoDuration": "Tour Documentario • 02:45 min",
          "filterAll": "Tutte le Strutture",
          "filterStations": "Centri di Confezionamento",
          "filterFarms": "Tenute e Campi",
          "filterColdChain": "Catena del Freddo e Logistica",
          "filterLab": "Laboratori di Controllo Qualità",
          "items": [
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "Unità Centrale Carciofi",
                      "title": "Impianto di Calibrazione, Mondatura e Confezionamento Carciofi Egiziani",
                      "desc": "Linee sterili per la selezione di carciofi freschi, rifilatura di fondi e cuori confezionati in fusti alimentari in salamoia e cartoni refrigerati per l'Europa.",
                      "specs": "Capacità 40 Ton / Giorno • Calibri 50, 60, 65 mm • Certificato BRC e Global G.A.P",
                      "image": "",
                      "tag": "Lavorazione & Confezionamento"
                },
                {
                      "id": "vegetable-farms",
                      "category": "farms",
                      "badge": "Tenute Orticole Modello",
                      "title": "Tenute Agricole Certificate (Carciofi, Broccoli, Lattuga, Cavolo)",
                      "desc": "Gestione agronomica integrata con fertirrigazione a goccia e lotta biologica nel governatorato di Beheira e Delta del Nilo, garantendo zero residui chimici nocivi.",
                      "specs": "+600 Feddan Ortaggi Export • Nubariya e Delta • Global G.A.P & SMETA",
                      "image": "",
                      "tag": "Tenute Certificate"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "Catena del Freddo Rapida",
                      "title": "Celle di Pre-refrigerazione Rapida (Pre-Cooling) & Vacuum Cooling",
                      "desc": "La temperatura interna degli ortaggi viene abbattuta entro 2 ore dalla raccolta per bloccare la respirazione cellulare e preservare massima croccantezza e freschezza.",
                      "specs": "Controllo 0–4°C • Umidità Relativa 90–95% • Monitoraggio IoT in Tempo Reale",
                      "image": "",
                      "tag": "Pre-refrigerazione"
                },
                {
                      "id": "potatoes-plant",
                      "category": "stations",
                      "badge": "Stabilimento Patate da Export",
                      "title": "Linee di Lavaggio, Calibrazione e Confezionamento Patate",
                      "desc": "Linee meccaniche evolute di lavaggio, asciugatura e calibratura per patate da export in sacchi a rete da 10/25 kg e sacconi jumbo da 1250 kg per spedizioni marittime.",
                      "specs": "Capacità 120 Ton / Giorno • Calibri 35/55 mm e 55+ mm • Vasche di lavaggio sanificate",
                      "image": "",
                      "tag": "Calibrazione & Insacco"
                },
                {
                      "id": "beans-broccoli-packhouse",
                      "category": "stations",
                      "badge": "Impianto Fagiolini, Broccoli e Cavolfiori",
                      "title": "Linee di Selezione e Confezionamento per Fagiolini, Broccoli e Cavolfiori",
                      "desc": "Calibrazione accurata di fagiolini finissimi in cestini, pellicola termoretraibile per cavolfiori e polistirolo ghiacciato (Iced Styrofoam) per le cime di broccolo fresco.",
                      "specs": "Imballo Iced Styrofoam • Film Termoretraibile • Selezione Manuale Prima Scelta",
                      "image": "",
                      "tag": "Confezionamento Refrigerato"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "Controllo Qualità & Laboratorio",
                      "title": "Laboratorio Interno di Controllo Qualità e Residui Fitosanitari (MRL)",
                      "desc": "Campionamento accurato per ogni lotto per verificare pezzatura, croccantezza e rigorosa conformità ai limiti chimici dell'Unione Europea con certificati ufficiali.",
                      "specs": "Laboratorio Accreditato • Analisi Residui & Qualità • ISO 22000 & HACCP",
                      "image": "",
                      "tag": "Certificato Lab"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "Logistica & Baie di Carico",
                      "title": "Baie di Carico Refrigerate Sigillate per Container Marittimi",
                      "desc": "Baie isotermiche direttamente collegate ai porti di Alessandria e Damietta, con datalogger digitali IoT per monitorare la temperatura per ogni miglio nautico.",
                      "specs": "Più di 10 Container Reefer / Giorno • Tracciamento Digitale Continuo",
                      "image": "",
                      "tag": "Baie Refrigerate"
                },
                {
                      "id": "cabbage-lettuce-unit",
                      "category": "stations",
                      "badge": "Impianto Cavoli & Lattuga",
                      "title": "Unità di Mondatura e Confezionamento Cavolo (Verde e Rosso) e Lattuga Iceberg",
                      "desc": "Rifilatura accurata delle foglie esterne protettive, film protettivo microforato individuale e imballaggio in cartoni areati per conservare croccantezza perfetta.",
                      "specs": "Film Microforato • Pesi Uniformi 1,0 - 2,5 kg • Spedizioni Marittime Reefer",
                      "image": "",
                      "tag": "Mondatura & Imballo"
                }
          ],
          "cta": {
                "title": "Desideri programmare una visita alle strutture o ispezionare il tuo carico?",
                "desc": "Accogliamo con piacere i nostri partner importatori internazionali per visitare le nostre tenute, ispezionare gli stabilimenti e assistere al confezionamento in Egitto.",
                "visitBtn": "Prenota una Visita",
                "quoteBtn": "Richiedi Preventivo e Spedizione"
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
                      "desc": "Tour guidato nelle coltivazioni orticole da esportazione certificate GlobalG.A.P. per verificare la totale assenza di residui."
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
                            "artichoke": "Impianto di Calibrazione, Mondatura e Confezionamento Carciofi Egiziani",
                            "potatoes": "Stabilimento di Lavaggio, Calibratura e Insacco Patate da Export",
                            "beansBroccoli": "Linee di Confezionamento Fagiolini, Broccoli e Cavolfiori",
                            "farms": "Tenute Agricole Certificate per Ortaggi da Export (+600 Feddan)",
                            "coldChain": "Celle di Pre-refrigerazione Rapida & Baie di Carico Reefer Sigillate",
                            "qualityLab": "Laboratorio Controllo Qualità, Sicurezza Alimentare e Residui MRL"
                      },
                      "targetCrops": "Colture di Interesse per l'Importazione",
                      "targetCropsPlaceholder": "es. Carciofi freschi, Fagiolini, Broccoli, Cavolfiori, Patate, Lattuga...",
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
      "card1Title": "Exportaciones de Alcachofas Egipcias",
      "card1Desc": "Alcachofas egipcias de Clase A (variedades francesas y locales, frescas y procesadas).",
      "card2Tag": "Control Térmico Instantáneo",
      "card2Badge": "Cadena de Frío Continua",
      "card2Title": "Integridad de la Cadena de Frío",
      "card2Desc": "Control de temperatura de extremo a extremo que garantiza cero degradación del campo al puerto de destino.",
      "card2Specs": "Cámaras de Pre-enfriamiento • Muelles Reefer • Sensores IoT",
      "card2Cta": "Explorar Cadena de Frío",
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
          "id": "artichoke",
          "name": "Alcachofas Frescas Egipcias",
          "variety": "Alcachofa Francesa, Variedad Baladi, Violeta",
          "season": "Noviembre — Mayo",
          "pack": "Tambores alimentarios en salmuera, Cajas refrigeradas, Bolsas al vacío",
          "specs": "Calibres: 50, 60, 65 mm Primera Categoría, fondos y corazones recortados según normas UE",
          "icon": "🌱",
          "category": "Verduras"
        },
        {
          "id": "green-beans",
          "name": "Judías Verdes Frescas de Egipto",
          "variety": "Polesta, Bronco, Valentino",
          "season": "Octubre — Mayo",
          "pack": "Cajas reforzadas 4-5 kg, Tarrinas 250g y 500g refrigeradas",
          "specs": "Vainas rectas sin hebras, longitud 10-14 cm, calibres Fino & Extra Fino",
          "icon": "🫘",
          "category": "Verduras"
        },
        {
          "id": "broccoli",
          "name": "Brócoli Verde Fresco",
          "variety": "Calabrese, Marathon, Heritage",
          "season": "Noviembre — Abril",
          "pack": "Cajas de poliestireno con hielo 5-6 kg, Cajas refrigeradas filmadas",
          "specs": "Pellas densas verde azulado oscuro, diámetro 10-15 cm, tallo recortado 2-3 cm, pre-enfriado",
          "icon": "🥦",
          "category": "Verduras"
        },
        {
          "id": "cauliflower",
          "name": "Coliflor Blanca de Primera",
          "variety": "Snowball, Fremantle, Incline",
          "season": "Noviembre — Abril",
          "pack": "Cajas forradas 6-8 piezas, Film retráctil microperforado",
          "specs": "Pellas blancas densas y firmes, peso 1,0 - 1,8 kg, hojas protectoras recortadas",
          "icon": "🥬",
          "category": "Verduras"
        },
        {
          "id": "cabbage",
          "name": "Repollo / Col Verde Fresca",
          "variety": "Variedad local Baladi, Híbridos F1 (Braunschweig, Bronco)",
          "season": "Diciembre — Mayo",
          "pack": "Sacos de malla 15-20 kg, Cajas de madera, Palés marítimos reefer",
          "specs": "Cabezas esféricas densas y compactas, pesos uniformes 1,5 - 2,5 kg, libres de defectos",
          "icon": "🥬",
          "category": "Verduras"
        },
        {
          "id": "potatoes",
          "name": "Patatas para Consumo e Industria",
          "variety": "Spunta, Mondial, Lady Rosetta, Cara, Hermes",
          "season": "Enero — Junio",
          "pack": "Sacos de malla 10 kg y 25 kg, Jumbo Bags 1250 kg, Cajas refrigeradas",
          "specs": "Lavadas o cepilladas, calibres: 35/55 mm, 55/65 mm, 65+ mm",
          "icon": "🥔",
          "category": "Verduras"
        },
        {
          "id": "lettuce",
          "name": "Lechuga Iceberg & Romana",
          "variety": "Iceberg, Romana, Lollo Rosso",
          "season": "Noviembre — Mayo",
          "pack": "Cajas de cartón corrugado 10-12 piezas envasadas individualmente en bolsas microperforadas",
          "specs": "Cogollos crujientes pre-enfriados al vacío (Vacuum Cooling), peso 400 - 700 g",
          "icon": "🥗",
          "category": "Verduras"
        },
        {
          "id": "red-cabbage",
          "name": "Repollo / Col Lombarda Roja",
          "variety": "Ruby Ball, Rodon, Roxy",
          "season": "Diciembre — Mayo",
          "pack": "Sacos de malla ventilados 10 y 15 kg, Cajas telescópicas de exportación",
          "specs": "Color morado oscuro brillante, hojas muy compactas, 1 - 2 kg por pieza, excelente conservación",
          "icon": "🟣",
          "category": "Verduras"
        }
      ]
    },
    "aboutPage": {
      "badge": "Empresa y Credenciales Oficiales",
      "title": "Sobre AgriPort — Empresa de Exportación de Hortalizas Frescas",
      "subtitle": "Empresa egipcia registrada y certificada oficialmente para la exportación de hortalizas frescas de primera calidad desde el Delta del Nilo y Beheira a los mercados mundiales.",
      "description": "AgriPort es su socio estratégico y confiable en Egipto para la importación directa de hortalizas frescas de la más alta calidad. Nos especializamos en 8 cultivos clave: Alcachofas frescas egipcias, Judías verdes finas, Brócoli, Coliflor, Col blanca y verde, Patatas de exportación, Lechuga Iceberg y Col roja. Con más de 600 feddans de cultivos certificados GlobalG.A.P, modernas estaciones de empaque automatizadas y una cadena de frío ininterrumpida (Pre-Cooling y Vacuum Cooling), garantizamos la entrega de partidas frescas y en pleno cumplimiento de las rigurosas normativas de la Unión Europea (Global G.A.P, ISO 22000, BRCGS, HACCP).",
      "legalBadge": "Credenciales Legales y Legitimidad Comercial",
      "legalTitle": "Registro Mercantil y Datos Fiscales Oficiales",
      "legalSubtitle": "Empresa oficialmente inscrita y supervisada por la Organización General para el Control de Exportaciones e Importaciones (GOEIC), la Cámara de Comercio y la Agencia Tributaria Egipcia:",
      "commercialRegister": "Registro Mercantil (C.R)",
      "commercialRegisterVal": "108420",
      "commercialRegisterDesc": "Oficina del Registro Mercantil de Inversiones — Exportación de productos agrícolas y hortalizas frescas",
      "taxCard": "Número de Identificación Fiscal / Tax ID",
      "taxCardVal": "629-418-735",
      "taxCardDesc": "Delegación de Tributos de Inversión — Expediente fiscal activo y habilitado en el sistema de facturación electrónica",
      "exporterNumber": "Número de Exportador GOEIC",
      "exporterNumberVal": "28410",
      "exporterNumberDesc": "Organización General para el Control de Exportaciones e Importaciones (GOEIC)",
      "chamber": "Cámara de Comercio Egipcia",
      "chamberVal": "Miembro de la División General de Exportadores — Cámara de Comercio",
      "chamberDesc": "Federación de Cámaras de Comercio Egipcias — Licencia de exportación activa",
      "registeredAddress": "Domicilio Social Registrado",
      "registeredAddressVal": "República Árabe de Egipto — Gobernación de Beheira / Kafr El-Dawar",
      "registeredAddressDesc": "Enclave logístico estratégico a pocos minutos de los puertos marítimos de Alejandría, Dekheila y Damietta",
      "map": {
        "badge": "Ubicación Geográfica y Logística",
        "title": "Sede Central y Proximidad Estratégica a los Puertos",
        "subtitle": "Nuestra sede principal y plantas de empaque se ubican en Kafr El-Dawar (Beheira), en el corazón de las cuencas agrícolas del Delta del Nilo y a corta distancia de los principales puertos marítimos:",
        "openGoogleMaps": "Abrir en Google Maps",
        "alexPort": "Puertos de Alejandría y Dekheila",
        "alexPortDist": "25 km (Flete marítimo reefer directo a Europa)",
        "damiettaPort": "Puerto de Exportación de Damietta",
        "damiettaPortDist": "140 km (Rutas marítimas programadas)",
        "cairoAirport": "Aeropuerto de Carga de El Cairo",
        "cairoAirportDist": "180 km (Carga aérea exprés en menos de 24h)",
        "highway": "Ejes Logísticos Principales",
        "highwayDist": "Acceso directo a la autopista agrícola y carretera costera"
      },
      "cropsBadge": "Nuestra Cesta Hortícola Especializada",
      "cropsTitle": "Las 8 Hortalizas Frescas para la Exportación Mundial",
      "cropsSubtitle": "Mantenemos una rigurosa especialización en 8 hortalizas insignia procesadas con los máximos estándares internacionales:",
      "crops": [
        { "name": "Alcachofa Fresca Egipcia", "desc": "Cabezas frescas, fondos y corazones torneados envasados en bidones con salmuera o cajas refrigeradas", "tag": "Cultivo Insignia" },
        { "name": "Judías Verdes Finas", "desc": "Vainas tiernas y rectas sin hebras, calibradas en tarrinas frescas para transporte aéreo y marítimo", "tag": "Envío Rápido" },
        { "name": "Brócoli Fresco de Egipto", "desc": "Pellas compactas de color verde intenso envasadas en cajas de poliestireno con hielo Iced Styrofoam", "tag": "Frío Extremo" },
        { "name": "Coliflor Blanco Níveo", "desc": "Pellas densas e inmaculadas envueltas individualmente en film retráctil microperforado", "tag": "Primera Categoría" },
        { "name": "Col Blanca y Verde", "desc": "Pesos homogéneos (1,5 a 2,5 kg), deshojado cuidadoso y empaque en cajas ventiladas para flete marítimo", "tag": "Flete Marítimo" },
        { "name": "Patatas Calibradas de Exportación", "desc": "Variedades Spunta y Cara lavadas, secadas y clasificadas en sacos de malla y sacas jumbo", "tag": "Grandes Volúmenes" },
        { "name": "Lechuga Iceberg Crujiente", "desc": "Piezas muy crujientes enfardadas individualmente con pre-enfriamiento rápido hasta el puerto de descarga", "tag": "Cadena de Frío" },
        { "name": "Col Roja para Ensaladas", "desc": "Color púrpura intenso, alta densidad y larga vida útil para cadenas de supermercados e industria", "tag": "Larga Duración" }
      ],
      "pillarsTitle": "Pilares de Nuestro Compromiso Exportador",
      "pillars": [
        {
          "icon": "🌍",
          "title": "Presencia en más de 25 Mercados Globales",
          "desc": "Cargamentos regulares en contenedores refrigerados hacia España, Italia, Francia, Alemania, Reino Unido, el Golfo y África."
        },
        {
          "icon": "🏆",
          "title": "Calidad Certificada y Control de LMRs",
          "desc": "Análisis multirriesgo sistemáticos en laboratorio y pleno cumplimiento de los estándares fitosanitarios de la UE."
        },
        {
          "icon": "⚡",
          "title": "Cadena de Frío Ininterrumpida y Logística Ágil",
          "desc": "Pre-enfriamiento en menos de 2 horas tras la cosecha y contenedores marítimos Reefer con registro continuo de temperatura."
        }
      ],
      "stats": {
        "farms": "Superficie Agrícola Certificada",
        "farmsVal": "+600 Feddans",
        "capacity": "Capacidad Diaria de Calibrado y Empaque",
        "capacityVal": "+200 Ton / Día",
        "coldChain": "Cadena de Frío Controlada",
        "coldChainVal": "100% Garantizada",
        "markets": "Países de Destino Internacional",
        "marketsVal": "+25 Países"
      },
      "ctaTitle": "¿Listo para Asegurar sus Suministros con un Exportador Oficial Acreditado?",
      "ctaDesc": "Nuestro departamento comercial internacional está a su disposición para ofrecerle cotizaciones FOB/CIF competitivas y calendarios de embarque personalizados.",
      "ctaQuote": "Solicitar Cotización Oficial",
      "ctaFacilities": "Ver Plantas de Empaque"
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
        "productPlaceholder": "Alcachofas frescas, Judías verdes, Brócoli, Coliflor, Patatas...",
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
          "subtitle": "Infraestructura avanzada de exportación que integra modernas líneas de calibrado electrónico, plantas de empaque de hortalizas certificadas y cadena de frío rápida desde el campo hasta el puerto de destino.",
          "badge": "Nuestras Instalaciones",
          "stats": {
                "stations": "Estaciones Centrales de Empaque",
                "stationsVal": "4 Plantas Certificadas",
                "farms": "Superficie Agrícola Supervisada",
                "farmsVal": "+600 Feddans de Hortalizas",
                "coldChain": "Cadena de Frío Continua",
                "coldChainVal": "100% Control Térmico",
                "capacity": "Capacidad Diaria de Calibrado",
                "capacityVal": "+200 Toneladas / Día"
          },
          "videoBadge": "Vídeo Documental en Directo",
          "videoTitle": "En Vídeo: Calibrado Automatizado de Hortalizas, Empaque y Cadena de Frío",
          "videoDesc": "Tecnología electrónica de vanguardia para el procesamiento de alcachofas, judías verdes y brócoli, preservando la máxima frescura para los mercados internacionales.",
          "videoPlayBtn": "Ver Recorrido en Vídeo",
          "videoDuration": "Recorrido Documental • 02:45 min",
          "filterAll": "Todas las Instalaciones",
          "filterStations": "Plantas de Empaque",
          "filterFarms": "Fincas y Campos",
          "filterColdChain": "Cadena de Frío y Logística",
          "filterLab": "Laboratorios de Control de Calidad",
          "items": [
                {
                      "id": "artichoke-facility",
                      "category": "stations",
                      "badge": "Planta Central de Alcachofas",
                      "title": "Unidad de Calibrado, Torneado y Empaque de Alcachofa Egipcia",
                      "desc": "Líneas estériles de selección y torneado de alcachofa fresca, corazones y fondos envasados en bidones alimentarios con salmuera y cajas refrigeradas para Europa.",
                      "specs": "Capacidad 40 Ton / Día • Calibres 50, 60, 65 mm • Certificaciones BRC y Global G.A.P",
                      "image": "",
                      "tag": "Procesado y Empaque"
                },
                {
                      "id": "vegetable-farms",
                      "category": "farms",
                      "badge": "Fincas Hortícolas Modelo",
                      "title": "Fincas Agrícolas Certificadas (Alcachofa, Brócoli, Lechuga, Col)",
                      "desc": "Gestión agrícola integral con fertirrigación por goteo automatizada y biocontrol en Beheira y el Delta del Nilo, garantizando cero residuos fitosanitarios nocivos.",
                      "specs": "+600 Feddans Hortalizas Export • Nubariya y Delta • Global G.A.P y SMETA",
                      "image": "",
                      "tag": "Fincas Certificadas"
                },
                {
                      "id": "cold-chain-pre-cooling",
                      "category": "coldchain",
                      "badge": "Cadena de Frío Rápida",
                      "title": "Túneles de Pre-enfriamiento Rápido (Pre-Cooling) y Vacuum Cooling",
                      "desc": "La temperatura interna de las hortalizas se reduce en menos de 2 horas tras la cosecha para frenar la respiración celular y asegurar máxima frescura y turgencia.",
                      "specs": "Control 0–4°C • Humedad Relativa 90–95% • Telemetría IoT en Tiempo Real",
                      "image": "",
                      "tag": "Pre-enfriamiento"
                },
                {
                      "id": "potatoes-plant",
                      "category": "stations",
                      "badge": "Planta de Patatas de Exportación",
                      "title": "Líneas de Lavado, Calibrado y Ensacado de Patatas",
                      "desc": "Líneas mecánicas avanzadas de lavado, secado y calibrado preparando patatas en sacos de malla de 10/25 kg y sacas jumbo de 1250 kg para flete marítimo.",
                      "specs": "Capacidad 120 Ton / Día • Calibres 35/55 mm y 55+ mm • Balsas de lavado desinfectadas",
                      "image": "",
                      "tag": "Calibrado y Ensacado"
                },
                {
                      "id": "beans-broccoli-packhouse",
                      "category": "stations",
                      "badge": "Planta Judías, Brócoli y Coliflor",
                      "title": "Líneas de Selección y Empaque para Judías Verdes, Brócoli y Coliflor",
                      "desc": "Calibrado riguroso de judías verdes finas en tarrinas, film retráctil para coliflor y empaque en cajas de poliestireno con hielo (Iced Styrofoam) para brócoli fresco.",
                      "specs": "Empaque Iced Styrofoam • Film Retráctil • Selección Manual Primera Categoría",
                      "image": "",
                      "tag": "Empaque Refrigerado"
                },
                {
                      "id": "quality-lab",
                      "category": "lab",
                      "badge": "Control de Calidad y Laboratorio",
                      "title": "Laboratorio Propio de Calidad Agrícola y Control de LMRs",
                      "desc": "Muestreo sistemático de lotes verificando calibre, firmeza y estricto cumplimiento de los límites máximos de residuos de la UE con certificados oficiales.",
                      "specs": "Laboratorio Acreditado • Análisis de Residuos y Calidad • ISO 22000 y HACCP",
                      "image": "",
                      "tag": "Certificado Lab"
                },
                {
                      "id": "reefer-loading",
                      "category": "coldchain",
                      "badge": "Logística y Muelles de Carga",
                      "title": "Muelles Refrigerados Herméticos de Carga de Contenedores",
                      "desc": "Muelles isotérmicos sellados conectados con los puertos de Alejandría y Damietta, equipados con registradores digitales IoT durante toda la travesía marina.",
                      "specs": "Más de 10 Contenedores Reefer / Día • Registro Digital Continuo",
                      "image": "",
                      "tag": "Muelles Refrigerados"
                },
                {
                      "id": "cabbage-lettuce-unit",
                      "category": "stations",
                      "badge": "Planta de Col y Lechuga",
                      "title": "Unidad de Deshojado y Empaque de Col (Verde y Roja) y Lechuga Iceberg",
                      "desc": "Deshojado higiénico exterior, envoltura individual con film microperforado y empaque en cajas ventiladas asegurando textura crujiente durante la exportación.",
                      "specs": "Film Microperforado • Pesos Uniformes 1,0 - 2,5 kg • Flete Marítimo Reefer",
                      "image": "",
                      "tag": "Deshojado y Filmado"
                }
          ],
          "cta": {
                "title": "¿Desea programar una visita a nuestras instalaciones o inspeccionar su carga?",
                "desc": "Recibimos con agrado a nuestros socios importadores internacionales para visitar nuestras fincas, inspeccionar las plantas y presenciar el empaque en Egipto.",
                "visitBtn": "Programar una Visita",
                "quoteBtn": "Solicitar Cotización y Envío"
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
                      "desc": "Recorrido guiado por cultivos de hortalizas de exportación con certificación GlobalG.A.P. y manejo libre de residuos."
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
                            "artichoke": "Planta Central de Calibrado, Torneado y Empaque de Alcachofa",
                            "potatoes": "Planta de Lavado, Calibrado y Ensacado de Patatas de Exportación",
                            "beansBroccoli": "Líneas de Selección y Empaque de Judías Verdes, Brócoli y Coliflor",
                            "farms": "Fincas Agrícolas Certificadas de Hortalizas (+600 Feddans)",
                            "coldChain": "Túneles de Pre-enfriamiento Rápido y Muelles Refrigerados",
                            "qualityLab": "Laboratorio Propio de Calidad Agrícola, Inocuidad y LMRs"
                      },
                      "targetCrops": "Cultivos de Interés para Importar",
                      "targetCropsPlaceholder": "ej. Alcachofas frescas, Judías verdes, Brócoli, Coliflor, Patatas, Lechuga...",
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
  "الفاصولياء الخضراء الفاخرة": {
    en: "Premium Egyptian Green Beans",
    fr: "Haricots Verts Frais Supérieurs",
    it: "Fagiolini Verdi Pregiati",
    es: "Judías Verdes Frescas Prémium",
    ar: "الفاصولياء الخضراء الفاخرة",
  },
  "الفاصولياء الخضراء": {
    en: "Fresh Green Beans",
    fr: "Haricots Verts Frais",
    it: "Fagiolini Verdi Freschi",
    es: "Judías Verdes Frescas",
    ar: "الفاصولياء الخضراء",
  },
  "البروكلي الأخضر الطازج": {
    en: "Fresh Green Broccoli",
    fr: "Brocoli Vert Frais",
    it: "Broccoli Verdi Freschi",
    es: "Brócoli Verde Fresco",
    ar: "البروكلي الأخضر الطازج",
  },
  "البروكلي": {
    en: "Fresh Broccoli",
    fr: "Brocoli Frais",
    it: "Broccoli",
    es: "Brócoli",
    ar: "البروكلي",
  },
  "بروكلي": {
    en: "Broccoli",
    fr: "Brocoli",
    it: "Broccoli",
    es: "Brócoli",
    ar: "بروكلي",
  },
  "القرنبيط الأبيض الفاخر": {
    en: "Premium White Cauliflower",
    fr: "Chou-fleur Blanc Extra",
    it: "Cavolfiore Bianco Pregiato",
    es: "Coliflor Blanca de Primera",
    ar: "القرنبيط الأبيض الفاخر",
  },
  "القرنبيط": {
    en: "White Cauliflower",
    fr: "Chou-fleur Blanc",
    it: "Cavolfiore",
    es: "Coliflor",
    ar: "القرنبيط",
  },
  "قرنبيط": {
    en: "Cauliflower",
    fr: "Chou-fleur",
    it: "Cavolfiore",
    es: "Coliflor",
    ar: "قرنبيط",
  },
  "الكرنب الأخضر المجهز للتصدير": {
    en: "Fresh Green Cabbage for Export",
    fr: "Chou Vert Frais pour l'Export",
    it: "Cavolo Cappuccio Verde da Esportazione",
    es: "Col / Repollo Verde para Exportación",
    ar: "الكرنب الأخضر المجهز للتصدير",
  },
  "الكرنب الأخضر": {
    en: "Green Cabbage",
    fr: "Chou Vert",
    it: "Cavolo Cappuccio Verde",
    es: "Repollo Verde",
    ar: "الكرنب الأخضر",
  },
  "كرنب": {
    en: "Cabbage",
    fr: "Chou",
    it: "Cavolo",
    es: "Repollo",
    ar: "كرنب",
  },
  "خس الكابوتشا والخس الروماني": {
    en: "Iceberg & Romaine Lettuce",
    fr: "Laitues Iceberg & Romaine",
    it: "Lattuga Iceberg & Romana",
    es: "Lechuga Iceberg y Romana",
    ar: "خس الكابوتشا والخس الروماني",
  },
  "الكرنب الأحمر الفاخر": {
    en: "Premium Red Cabbage",
    fr: "Chou Rouge Extra",
    it: "Cavolo Cappuccio Rosso",
    es: "Col Lombarda / Repollo Rojo",
    ar: "الكرنب الأحمر الفاخر",
  },
  "الكرنب الأحمر": {
    en: "Red Cabbage",
    fr: "Chou Rouge",
    it: "Cavolo Rosso",
    es: "Col Lombarda",
    ar: "الكرنب الأحمر",
  },
  "كرنب احمر": {
    en: "Red Cabbage",
    fr: "Chou Rouge",
    it: "Cavolo Rosso",
    es: "Col Lombarda",
    ar: "كرنب احمر",
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
