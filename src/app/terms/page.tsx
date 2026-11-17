"use client";

import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";
import {
  Ship,
  ShieldCheck,
  ThermometerSnowflake,
  FileText,
  BadgeCheck,
  Scale,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function TermsPage() {
  const { language, dir } = useLanguage();
  const { settings: siteSettings } = useSiteSettings();
  const isRTL = dir === "rtl";

  const isAr = language === "ar";

  const titles = {
    title: isAr
      ? "الشروط والتجارة الدولية وضوابط التصدير"
      : "International Trade Terms & Commercial Guidelines",
    description: isAr
      ? "المعايير المعتمدة لشركة AgriPort لتوريد وتصدير الحاصلات الزراعية والخضروات الطازجة وفق قواعد غرفة التجارة الدولية (Incoterms 2020) والاشتراطات الصحية والرقابية العالمية."
      : "AgriPort official export terms, ICC Incoterms 2020 delivery rules, phytosanitary standards, and payment protocols for international fresh vegetable buyers.",
  };

  const incotermsList = [
    {
      code: "FOB",
      name: isAr ? "التسليم على ظهر السفينة (Free On Board)" : "Free On Board (Egyptian Ports)",
      ports: isAr ? "موانئ الإسكندرية / الدخيلة / دمياط" : "Alexandria / El-Dekheila / Damietta Ports",
      desc: isAr
        ? "تتحمل AgriPort كافة تكاليف التعبئة، النقل الداخلي، التخليص الجمركي للتصدير، ورسوم التحميل على ظهر السفينة. يتحمل المشتري النولون البحري والتأمين بدءاً من حاجز السفينة."
        : "AgriPort covers all packaging, inland refrigerated transport, export customs clearance, and terminal handling charges. Buyer covers ocean freight and marine insurance from ship's rail.",
      badge: isAr ? "الأكثر طلباً للشركاء الأوروبيين" : "Most Popular for EU Importers",
      recommended: true,
    },
    {
      code: "CIF",
      name: isAr ? "التكلفة والتأمين ونولون الشحن (Cost, Insurance & Freight)" : "Cost, Insurance & Freight",
      ports: isAr ? "موانئ روتردام، هامبورغ، كوبر، جنوة، فالنسيا، جبل علي" : "Rotterdam, Hamburg, Koper, Genoa, Valencia, Jebel Ali",
      desc: isAr
        ? "تتحمل AgriPort تكلفة البضاعة كاملة + التأمين البحري الشامل ضد كافة المخاطر (Institute Cargo Clauses A) + نولون الشحن البحري بالحاويات المبردة حتى ميناء الوصول المتفق عليه."
        : "AgriPort covers full cargo cost, all-risk marine insurance, and ocean reefer freight directly to the buyer's designated destination port.",
      badge: isAr ? "تسليم متكامل وشامل التأمين" : "All-Inclusive CIF to Destination",
      recommended: false,
    },
    {
      code: "CFR",
      name: isAr ? "التكلفة والشحن البحري (Cost and Freight)" : "Cost and Freight",
      ports: isAr ? "موانئ الوصول الدولية المحددة بالعقد" : "Designated Global Discharge Ports",
      desc: isAr
        ? "شامل تكلفة تجهيز الخضروات ونولون الحاوية المبردة حتى ميناء التفريغ، بينما يقوم المشتري بتغطية التأمين البحري المستقل بمعرفته."
        : "Includes vegetable grading, packing, and reefer ocean freight to destination port; cargo insurance is handled independently by the importer.",
      badge: isAr ? "شحن بحري بدون تأمين" : "Freight Paid by Exporter",
      recommended: false,
    },
    {
      code: "EXW",
      name: isAr ? "التسليم بأرض المحطة (Ex Works Kafr El-Dawar)" : "Ex Works (Packhouse Gate)",
      ports: isAr ? "محطات التعبئة المركزية — كفر الدوار / البحيرة" : "Central Packhouses — Kafr El-Dawar, Beheira",
      desc: isAr
        ? "استلام مباشر للبضاعة المعبأة والمبردة مسبقاً (Pre-Cooled) من أرصفة محطات التعبئة بكفر الدوار، ويتولى المشتري أو وكيل الشحن الخاص به كافة مراحل النقل والتصدير."
        : "Direct cargo handover at packhouse cold store loading docks in Kafr El-Dawar; buyer or their logistics agent manages inland transport and freight.",
      badge: isAr ? "استلام مباشر من المحطة" : "Direct Packhouse Pickup",
      recommended: false,
    },
  ];

  const pillars = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
      title: isAr ? "1. الرقابة وفحص الحجر الزراعي (Phytosanitary & GOEIC)" : "1. Phytosanitary & Inspection Control",
      desc: isAr
        ? "تخضع كل شحنة لفحص دقيق وإلزامي من مفتشي الحجر الزراعي المصري وهيئة الرقابة على الصادرات والواردات (GOEIC)، ويصدر مع كل بوليصة شهادة صحة نباتية رسمية (Phytosanitary Certificate) تثبت خلو المحصول التام من أي آفات حجرية."
        : "Every single export container undergoes mandatory official inspection by the Egyptian Central Administration of Plant Quarantine and GOEIC, issuing an official Phytosanitary Certificate confirming 100% quarantine pest-free status.",
    },
    {
      icon: <ThermometerSnowflake className="h-6 w-6 text-emerald-500" />,
      title: isAr ? "2. معايير سلسلة التبريد السريع (Cold Chain Protocol)" : "2. Cold Chain & Temperature Protocol",
      desc: isAr
        ? "تطبق AgriPort التبريد الأولي الفوري (Pre-Cooling & Vacuum Cooling) خلال ساعتين من القطف لخفض حرارة اللب إلى (0-4°C). يتم شحن الخضروات في حاويات مبردة 40ft High Cube Reefer مزودة بجهازي USB Data Loggers لتوثيق منحنى درجات الحرارة طوال الرحلة."
        : "All fresh vegetables undergo rapid Pre-Cooling and Vacuum Cooling within 2 hours of harvest to reach 0°C–4°C core temperature. Reefer containers are calibrated with IoT sensors and dual USB Temperature Data Loggers verifying thermal stability.",
    },
    {
      icon: <Scale className="h-6 w-6 text-emerald-500" />,
      title: isAr ? "3. مطابقة متبقيات المبيدات (EU MRLs Compliance)" : "3. Pesticide Residue & MRLs Compliance",
      desc: isAr
        ? "تخضع المزارع التابعة لنا لبروتوكول حماية متكامل ومكافحة حيوية. يتم تحليل كل لوط حصاد معملياً في المعمل المركزي لمتبقيات المبيدات (QCAP) المعتمد دولياً لضمان مطابقة الحدود القصوى للمتبقيات مع معايير الاتحاد الأوروبي (EU Regulation)."
        : "Crops are grown under strict IPM biological control programs. Representative samples from each harvest lot are tested at ISO 17025 accredited QCAP laboratories, certifying strict compliance with EU Maximum Residue Limits (MRLs).",
    },
    {
      icon: <FileText className="h-6 w-6 text-emerald-500" />,
      title: isAr ? "4. شروط الدفع والتعاملات البنكية (Payment Terms)" : "4. Commercial Payment Terms",
      desc: isAr
        ? "نقبل الاعتمادات المستندية غير القابلة للإلغاء والمؤكدة (Irrevocable Confirmed L/C at sight) من بنوك دولية معتمدة من الدرجة الأولى، كما نوفر تسهيلات التحصيل المستندي (CAD) للعملاء المنتظمين، أو التحويل البنكي المسبق (T/T) حسب جداول التوريد."
        : "Payment methods include Irrevocable Confirmed Letters of Credit (L/C at sight) issued by prime tier-1 international banks, Cash Against Documents (CAD) for established partners, and Telegraphic Transfer (T/T) advances.",
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-emerald-500" />,
      title: isAr ? "5. الوثائق والمستندات التصديرية الرسمية (Export Documents)" : "5. Full Export Documentation Package",
      desc: isAr
        ? "يتم تسليم العميل حزمة الوثائق الكاملة: أصل بوليصة الشحن البحري النظيفة (3/3 Clean B/L)، الفاتورة التجارية المعتمدة، قائمة التعبئة الدقيقة، شهادة المنشأ الرسمية (Certificate of Origin / EUR.1) للاستفادة من الإعفاءات الجمركية، وشهادات التحاليل الفنية."
        : "Buyers receive a complete original documentation package: 3/3 Clean on Board Ocean Bills of Lading, Certified Commercial Invoice, Detailed Packing List, EUR.1 / Certificate of Origin for customs exemption, and Laboratory Certificates.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-500" />,
      title: isAr ? "6. الفحص المحايد المستقل (Third-Party Inspection)" : "6. Independent Third-Party Inspection",
      desc: isAr
        ? "يحق للعميل والمستورد تكليف جهات تفتيش دولية مستقلة مثل (SGS, Bureau Veritas, TÜV) لمعاينة وفرز الشحنة وسحب عينات عشوائية داخل محطات التعبئة قبل التحميل وإصدار تقرير جودة وفحص مستقل."
        : "Importers have the full right to mandate international independent inspection agencies (e.g. SGS, Bureau Veritas, TÜV) to conduct pre-shipment quality and grade audits at our packhouses prior to container sealing.",
    },
  ];

  return (
    <PageShell title={titles.title} description={titles.description}>
      <div className="space-y-12 sm:space-y-16">
        {/* Top Trust Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 font-mono font-bold text-sm">
              ICC
            </span>
            <div>
              <h3 className="text-sm font-bold">
                {isAr
                  ? "تطبيق معايير غرفة التجارة الدولية (ICC Incoterms® 2020)"
                  : "Compliant with ICC Incoterms® 2020 Rules"}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr
                  ? "عقود تصدير رسمية تحمي حقوق المستورد وتضمن جودة ومواعيد الشحن"
                  : "Binding export contracts safeguarding buyer rights and shipping timelines"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            <BadgeCheck className="h-4 w-4" />
            <span>{isAr ? "ضمان جودة ومطابقة 100%" : "100% Quality & Grade Guaranteed"}</span>
          </div>
        </div>

        {/* Section 1: Incoterms Delivery Modes */}
        <div className="space-y-6 text-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 mb-2">
              <Ship className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isAr ? "خيارات الشحن والتسليم" : "Delivery Terms & Incoterms"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {isAr ? "خيارات شروط التسليم الدولية (Incoterms 2020)" : "International Delivery Terms (Incoterms 2020)"}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
              {isAr
                ? "نوفر مرونة كاملة في شروط الشحن لتتناسب مع متطلبات شركات الاستيراد وسلاسل السوبرماركت في مختلف موانئ العالم:"
                : "We provide full logistical flexibility to meet the exact sourcing criteria of international produce importers and supermarket chains:"}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {incotermsList.map((item) => (
              <div
                key={item.code}
                className={`rounded-3xl border p-6 sm:p-7 flex flex-col justify-between transition-all text-start relative ${
                  item.recommended
                    ? "border-emerald-500/40 bg-gradient-to-br from-emerald-50/40 via-white to-white shadow-sm"
                    : "border-slate-200 bg-white shadow-xs hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-2xl font-extrabold font-mono text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-xl">
                      {item.code}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.recommended
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{item.ports}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isAr ? "موانئ التحميل: مصر" : "Origin Ports: Egypt"}
                  </span>
                  <Link
                    href={`/contact?incoterm=${encodeURIComponent(item.code)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <span>{isAr ? "طلب تسعير بهذا الشرط" : "Quote with this term"}</span>
                    <ArrowRight className={`h-3 w-3 ${isRTL ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Export Pillars & Quality Protocols */}
        <div className="space-y-6 text-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800 mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isAr ? "ضمانات الجودة والتعاقد" : "Quality & Commercial Safeguards"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {isAr ? "الضوابط الرقابية والفنية المعتمدة" : "Standard Export & Quality Regulations"}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
              {isAr
                ? "تلتزم AgriPort بكافة المعايير القانونية والبيطرية والزراعية المعمول بها محلياً ودولياً لضمان استلام الشحنة في أعلى مستويات النضارة والسلامة:"
                : "AgriPort strictly enforces European and global phytosanitary directives, guaranteeing maximum food safety and flawless execution:"}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-3 text-start"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Contact Logistics & Commercial Desk */}
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 text-white text-start relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span>{isAr ? "إدارة التصدير واللوجستيات" : "Commercial & Logistics Desk"}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {isAr
                ? "هل تود مناقشة عقد توريد مخصص أو شروط تسليم خاصة؟"
                : "Need a Custom Export Contract or Specific Sourcing Incoterms?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {isAr
                ? "فريق العلاقات الدولية واللوجستيات متاح لتزويدكم بالمواصفات القياسية، جداول الشحن المتاحة، وعروض الأسعار الفورية (FOB / CIF) خلال أقل من 4 ساعات عمل."
                : "Our export specialists are available to share technical crop specs, reefer vessel schedules, and tailored FOB/CIF quotations within 4 working hours."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3.5 text-xs sm:text-sm font-bold shadow-md hover:shadow-emerald-500/25 transition-all"
              >
                <span>{isAr ? "طلب عرض أسعار فوري" : "Request Export Quote"}</span>
                <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
              <Link
                href="/visit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-6 py-3.5 text-xs sm:text-sm font-semibold transition-all"
              >
                <span>{isAr ? "حجز زيارة وتفقد المحطات" : "Schedule Facility Audit"}</span>
              </Link>
              <a
                href={`tel:${(siteSettings.phone || "+20 100 720 2636").replace(/\s+/g, "")}`}
                dir="ltr"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-emerald-400 px-4 py-2 rounded-full bg-slate-800/40"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                <span>{siteSettings.phone || "+20 100 720 2636"}</span>
              </a>
            </div>
          </div>

          <div className="absolute top-0 end-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>
      </div>
    </PageShell>
  );
}
