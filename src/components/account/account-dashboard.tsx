"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Check,
  Copy,
  Plus,
  MessageSquare,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { useVisitorAuth } from "@/context/visitor-auth-context";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/lib/use-site-settings";
import { translateAgriText, type Language } from "@/lib/i18n";
import type { Inquiry } from "@/context/ops-store-context";

export const accountTranslations: Record<
  Language,
  {
    title: string;
    description: string;
    verifiedClient: string;
    guestClient: string;
    newQuoteBtn: string;
    signOutBtn: string;
    guestUpgradeNotice: string;
    guestUpgradeLink: string;
    statsTotal: string;
    statsInProgress: string;
    statsAgreed: string;
    sectionTitle: string;
    tabAll: string;
    tabInProgress: string;
    tabAgreed: string;
    tabCompleted: string;
    loading: string;
    emptyTitle: string;
    emptyDesc: string;
    emptyBtn: string;
    orderDate: string;
    quantityLabel: string;
    incotermsLabel: string;
    portLabel: string;
    trackingTitle: string;
    currentStatusLabel: string;
    orderNotesLabel: string;
    whatsappBtn: string;
    exportDesk: string;
    copied: string;
    copyId: string;
    modalTitle: string;
    cropField: string;
    cropPlaceholder: string;
    quantityField: string;
    quantityPlaceholder: string;
    incotermsField: string;
    portField: string;
    portPlaceholder: string;
    notesField: string;
    notesPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    notLoggedInTitle: string;
    notLoggedInDesc: string;
    loginBtn: string;
    steps: {
      label: string;
      desc: string;
    }[];
    statuses: Record<string, string>;
  }
> = {
  ar: {
    title: "تفاصيل الحساب ومتابعة الطلبات",
    description: "متابعة عروض أسعار المحاصيل الزراعية وحالة تجهيز وشحن الطلبات في محطة العمليات.",
    verifiedClient: "عميل تصدير معتمد",
    guestClient: "حساب ضيف",
    newQuoteBtn: "طلب منتج",
    signOutBtn: "تسجيل الخروج",
    guestUpgradeNotice: "أنت مسجل كضيف. لتثبيت حسابك وحفظ الطلبات بصفة دائمة، يمكنك إنشاء كلمة مرور.",
    guestUpgradeLink: "ترقية الحساب الآن",
    statsTotal: "إجمالي الطلبات",
    statsInProgress: "قيد المتابعة والتسعير",
    statsAgreed: "تم الاتفاق وجاري التجهيز",
    sectionTitle: "طلبات عروض الأسعار ومتابعة الشحنات",
    tabAll: "الكل",
    tabInProgress: "قيد المتابعة",
    tabAgreed: "تم الاتفاق",
    tabCompleted: "مكتملة",
    loading: "جاري تحميل الطلبات...",
    emptyTitle: "لا توجد طلبات في هذا القسم",
    emptyDesc: "يمكنك طلب تسعير أي محصول من كتالوج محاصيل AgriPort ومتابعة حالته مباشرة.",
    emptyBtn: "طلب تسعير محصول الآن",
    orderDate: "تاريخ الطلب:",
    quantityLabel: "الكمية:",
    incotermsLabel: "شرط الشحن:",
    portLabel: "ميناء الوصول:",
    trackingTitle: "متابعة مسار الطلب:",
    currentStatusLabel: "الحالة الحالية:",
    orderNotesLabel: "ملاحظات الطلب:",
    whatsappBtn: "متابعة الطلب مع مسؤول التصدير عبر واتساب",
    exportDesk: "مكتب تصدير AgriPort",
    copied: "تم النسخ",
    copyId: "نسخ رقم الطلب",
    modalTitle: "طلب تسعير محصول جديد للتصدير",
    cropField: "المحصول الزراعي المطلوب *",
    cropPlaceholder: "-- اختر المحصول من الكتالوج --",
    quantityField: "الكمية التقديرية *",
    quantityPlaceholder: "مثال: حاوية 40 قدم (24 طن)",
    incotermsField: "شرط الشحن (Incoterms)",
    portField: "ميناء الوصول النهائي *",
    portPlaceholder: "مثال: ميناء روتردام / ميناء جبل علي",
    notesField: "ملاحظات ومواصفات التعبئة",
    notesPlaceholder: "أي متطلبات خاصة في الفرز، أحجام الثمار، درجات الجودة...",
    submitBtn: "إرسال طلب التسعير وبدء المتابعة",
    submittingBtn: "جاري إرسال الطلب...",
    successTitle: "تم إرسال الطلب بنجاح!",
    successDesc: "يظهر طلبك الآن في قائمتك وتم توجيهه لفريق العمليات.",
    notLoggedInTitle: "يرجى تسجيل الدخول لعرض حسابك",
    notLoggedInDesc: "سجل دخولك لمتابعة طلبات التسعير وحالة الشحن الدولية.",
    loginBtn: "تسجيل الدخول",
    steps: [
      { label: "استلام الطلب", desc: "تم استلام طلبك وجاري مراجعته من فريق العمليات." },
      { label: "مراجعة التسعير", desc: "فريق التصدير يراجع المواصفات وحساب نولون الشحن." },
      { label: "تم الاتفاق والتجهيز", desc: "تم الاتفاق وجاري الفرز والتعبئة بالمحطة." },
      { label: "اكتمال الشحن", desc: "اكتمل الفحص وتم تجهيز مستندات التصدير والإبحار." },
    ],
    statuses: {
      "جديد": "جديد",
      "قيد المتابعة": "قيد المتابعة",
      "تم الاتفاق": "تم الاتفاق",
      "اكتمال الشحن": "اكتمال الشحن",
      "مؤرشف": "مكتمل",
    },
  },
  en: {
    title: "Account Details & Order Tracking",
    description: "Track fresh produce export quotes, processing status, and container dispatch.",
    verifiedClient: "Verified Export Client",
    guestClient: "Guest Account",
    newQuoteBtn: "Order a Product",
    signOutBtn: "Sign Out",
    guestUpgradeNotice: "You are logged in as a guest. Set a password to save your inquiries permanently.",
    guestUpgradeLink: "Upgrade Account Now",
    statsTotal: "Total Inquiries",
    statsInProgress: "Under Review & Pricing",
    statsAgreed: "Agreed & In Preparation",
    sectionTitle: "Price Quotes & Shipment Tracking",
    tabAll: "All",
    tabInProgress: "In Progress",
    tabAgreed: "Agreed",
    tabCompleted: "Completed",
    loading: "Loading orders...",
    emptyTitle: "No orders found in this section",
    emptyDesc: "You can request a quote for any crop in AgriPort's catalog and track it live.",
    emptyBtn: "Request a Quote Now",
    orderDate: "Date:",
    quantityLabel: "Quantity:",
    incotermsLabel: "Incoterms:",
    portLabel: "Destination Port:",
    trackingTitle: "Order Progress Tracking:",
    currentStatusLabel: "Current Status:",
    orderNotesLabel: "Order Notes:",
    whatsappBtn: "Track with Export Desk on WhatsApp",
    exportDesk: "AgriPort Global Export Desk",
    copied: "Copied",
    copyId: "Copy Order ID",
    modalTitle: "Request New Export Quote",
    cropField: "Requested Fresh Produce *",
    cropPlaceholder: "-- Select crop from catalog --",
    quantityField: "Estimated Quantity *",
    quantityPlaceholder: "e.g., 40ft Reefer Container (24 Tons)",
    incotermsField: "Shipping Terms (Incoterms)",
    portField: "Destination Port *",
    portPlaceholder: "e.g., Port of Rotterdam / Jebel Ali Port",
    notesField: "Packing & Sorting Specifications",
    notesPlaceholder: "Any specific caliber, sizing, grading, or carton requirements...",
    submitBtn: "Submit Quote Request",
    submittingBtn: "Submitting request...",
    successTitle: "Quote Request Sent Successfully!",
    successDesc: "Your inquiry is now visible in your account and assigned to operations.",
    notLoggedInTitle: "Please Sign In to Access Your Account",
    notLoggedInDesc: "Sign in to track your produce export quotes and container shipments.",
    loginBtn: "Sign In",
    steps: [
      { label: "Received", desc: "Your inquiry is received and assigned to operations." },
      { label: "Pricing Review", desc: "Export desk is reviewing specs and freight rates." },
      { label: "Agreed & Prep", desc: "Terms agreed; sorting and packing in progress at packhouse." },
      { label: "Shipped & Cleared", desc: "Customs & phytosanitary inspection cleared; cargo ready/shipped." },
    ],
    statuses: {
      "جديد": "New / Received",
      "قيد المتابعة": "In Review",
      "تم الاتفاق": "Agreed",
      "اكتمال الشحن": "Shipped & Cleared",
      "مؤرشف": "Completed",
    },
  },
  fr: {
    title: "Détails du Compte & Suivi des Commandes",
    description: "Suivez les devis d'exportation de produits frais, l'avancement et l'expédition.",
    verifiedClient: "Client Export Vérifié",
    guestClient: "Compte Invité",
    newQuoteBtn: "Demander un Devis",
    signOutBtn: "Déconnexion",
    guestUpgradeNotice: "Connecté en invité. Définissez un mot de passe pour conserver vos demandes.",
    guestUpgradeLink: "Mettre à niveau le compte",
    statsTotal: "Total des demandes",
    statsInProgress: "En cours de chiffrage",
    statsAgreed: "Convenu & En préparation",
    sectionTitle: "Devis de Prix & Suivi des Expéditions",
    tabAll: "Tous",
    tabInProgress: "En cours",
    tabAgreed: "Convenu",
    tabCompleted: "Terminées",
    loading: "Chargement des commandes...",
    emptyTitle: "Aucune commande trouvée",
    emptyDesc: "Demandez un devis pour tout produit du catalogue AgriPort et suivez-le en direct.",
    emptyBtn: "Demander un devis maintenant",
    orderDate: "Date :",
    quantityLabel: "Quantité :",
    incotermsLabel: "Incoterms :",
    portLabel: "Port de destination :",
    trackingTitle: "Suivi de la commande :",
    currentStatusLabel: "Statut actuel :",
    orderNotesLabel: "Remarques :",
    whatsappBtn: "Suivre la commande sur WhatsApp",
    exportDesk: "Bureau Export AgriPort",
    copied: "Copié",
    copyId: "Copier l'identifiant",
    modalTitle: "Demander un Nouveau Devis Export",
    cropField: "Produit agricole souhaité *",
    cropPlaceholder: "-- Sélectionner un produit --",
    quantityField: "Quantité estimée *",
    quantityPlaceholder: "ex. Conteneur 40ft (24 Tonnes)",
    incotermsField: "Conditions de livraison (Incoterms)",
    portField: "Port de destination finale *",
    portPlaceholder: "ex. Port de Rotterdam / Port de Marseille",
    notesField: "Spécifications de conditionnement",
    notesPlaceholder: "Calibre souhaité, type de carton, exigences de tri...",
    submitBtn: "Envoyer la demande de devis",
    submittingBtn: "Envoi en cours...",
    successTitle: "Demande envoyée avec succès !",
    successDesc: "Votre demande apparaît dans votre liste et a été transmise aux opérations.",
    notLoggedInTitle: "Veuillez vous connecter",
    notLoggedInDesc: "Connectez-vous pour suivre vos devis et expéditions de produits frais.",
    loginBtn: "Se connecter",
    steps: [
      { label: "Reçu", desc: "Votre demande est reçue et en cours d'examen opérationnel." },
      { label: "Chiffrage", desc: "Le bureau export examine les spécifications et le fret maritime." },
      { label: "Convenu & Tri", desc: "Termes convenus ; tri et conditionnement en cours à la station." },
      { label: "Expédié", desc: "Contrôle phytosanitaire validé ; documents d'exportation prêts." },
    ],
    statuses: {
      "جديد": "Reçu",
      "قيد المتابعة": "En cours",
      "تم الاتفاق": "Convenu",
      "اكتمال الشحن": "Expédié & Dédouané",
      "مؤرشف": "Terminé",
    },
  },
  it: {
    title: "Dettagli Account & Tracciamento Ordini",
    description: "Traccia i preventivi di esportazione, l'avanzamento della preparazione e la spedizione.",
    verifiedClient: "Cliente Export Verificato",
    guestClient: "Account Ospite",
    newQuoteBtn: "Nuovo Preventivo",
    signOutBtn: "Disconnetti",
    guestUpgradeNotice: "Accesso come ospite. Imposta una password per salvare i tuoi ordini.",
    guestUpgradeLink: "Aggiorna Account",
    statsTotal: "Totale richieste",
    statsInProgress: "In revisione e prezzi",
    statsAgreed: "Concordato & In preparazione",
    sectionTitle: "Preventivi di Prezzo & Tracciamento",
    tabAll: "Tutti",
    tabInProgress: "In corso",
    tabAgreed: "Concordato",
    tabCompleted: "Completati",
    loading: "Caricamento ordini...",
    emptyTitle: "Nessun ordine trovato",
    emptyDesc: "Richiedi un preventivo per qualsiasi prodotto dal catalogo AgriPort.",
    emptyBtn: "Richiedi un preventivo ora",
    orderDate: "Data:",
    quantityLabel: "Quantità:",
    incotermsLabel: "Incoterms:",
    portLabel: "Porto di destinazione:",
    trackingTitle: "Tracciamento avanzamento ordine:",
    currentStatusLabel: "Stato attuale:",
    orderNotesLabel: "Note ordine:",
    whatsappBtn: "Traccia ordine via WhatsApp",
    exportDesk: "Ufficio Esportazioni AgriPort",
    copied: "Copiato",
    copyId: "Copia ID",
    modalTitle: "Richiedi Nuovo Preventivo Export",
    cropField: "Prodotto agricolo richiesto *",
    cropPlaceholder: "-- Seleziona prodotto dal catalogo --",
    quantityField: "Quantità stimata *",
    quantityPlaceholder: "es. Container 40ft (24 Tonnellate)",
    incotermsField: "Termini di spedizione (Incoterms)",
    portField: "Porto di destinazione *",
    portPlaceholder: "es. Porto di Rotterdam / Porto di Genova",
    notesField: "Specifiche di confezionamento",
    notesPlaceholder: "Calibro desiderato, tipo di cartone, requisiti di selezione...",
    submitBtn: "Invia richiesta di preventivo",
    submittingBtn: "Invio in corso...",
    successTitle: "Richiesta inviata con successo!",
    successDesc: "La tua richiesta è ora visibile nel tuo account ed è in lavorazione.",
    notLoggedInTitle: "Accedi per visualizzare il tuo account",
    notLoggedInDesc: "Accedi per tracciare i tuoi preventivi e lo stato delle spedizioni.",
    loginBtn: "Accedi",
    steps: [
      { label: "Ricevuto", desc: "La tua richiesta è stata ricevuta ed è in fase di revisione." },
      { label: "Revisione prezzi", desc: "L'ufficio esportazioni sta esaminando specifiche e nolo." },
      { label: "Accordo & Prep", desc: "Termini concordati; selezione e confezionamento in corso." },
      { label: "Spedito", desc: "Ispezione fitosanitaria superata; documenti di esportazione pronti." },
    ],
    statuses: {
      "جديد": "Ricevuto",
      "قيد المتابعة": "In corso",
      "تم الاتفاق": "Concordato",
      "اكتمال الشحن": "Spedito & Sdoganato",
      "مؤرشف": "Completato",
    },
  },
  es: {
    title: "Detalles de la Cuenta y Seguimiento",
    description: "Siga las cotizaciones de exportación de productos frescos, el progreso y el despacho.",
    verifiedClient: "Cliente Exportador Verificado",
    guestClient: "Cuenta de Invitado",
    newQuoteBtn: "Nueva Cotización",
    signOutBtn: "Cerrar Sesión",
    guestUpgradeNotice: "Conectado como invitado. Configure una contraseña para guardar sus pedidos.",
    guestUpgradeLink: "Actualizar Cuenta",
    statsTotal: "Total de cotizaciones",
    statsInProgress: "En revisión y precios",
    statsAgreed: "Acordado y en preparación",
    sectionTitle: "Cotizaciones de Precios y Seguimiento",
    tabAll: "Todos",
    tabInProgress: "En progreso",
    tabAgreed: "Acordado",
    tabCompleted: "Completadas",
    loading: "Cargando pedidos...",
    emptyTitle: "No hay pedidos en esta sección",
    emptyDesc: "Puede solicitar una cotización para cualquier cultivo del catálogo de AgriPort.",
    emptyBtn: "Solicitar cotización ahora",
    orderDate: "Fecha:",
    quantityLabel: "Cantidad:",
    incotermsLabel: "Incoterms:",
    portLabel: "Puerto de destino:",
    trackingTitle: "Seguimiento del pedido:",
    currentStatusLabel: "Estado actual:",
    orderNotesLabel: "Notas del pedido:",
    whatsappBtn: "Seguimiento por WhatsApp con exportaciones",
    exportDesk: "Oficina de Exportación AgriPort",
    copied: "Copiado",
    copyId: "Copiar ID",
    modalTitle: "Solicitar Nueva Cotización de Exportación",
    cropField: "Producto agrícola solicitado *",
    cropPlaceholder: "-- Seleccionar producto del catálogo --",
    quantityField: "Cantidad estimada *",
    quantityPlaceholder: "ej. Contenedor 40ft (24 Toneladas)",
    incotermsField: "Términos de envío (Incoterms)",
    portField: "Puerto de destino final *",
    portPlaceholder: "ej. Puerto de Rotterdam / Puerto de Valencia",
    notesField: "Especificaciones de empaque y selección",
    notesPlaceholder: "Calibre deseado, tipo de caja, requisitos de calidad...",
    submitBtn: "Enviar solicitud de cotización",
    submittingBtn: "Enviando solicitud...",
    successTitle: "¡Cotización enviada con éxito!",
    successDesc: "Su cotización aparece ahora en su cuenta y ha sido asignada a operaciones.",
    notLoggedInTitle: "Inicie sesión para acceder a su cuenta",
    notLoggedInDesc: "Inicie sesión para realizar el seguimiento de sus cotizaciones y envíos.",
    loginBtn: "Iniciar Sesión",
    steps: [
      { label: "Recibido", desc: "Su solicitud ha sido recibida y está bajo revisión operativa." },
      { label: "Revisión precios", desc: "El equipo de exportación está revisando especificaciones y flete." },
      { label: "Acuerdo & Prep", desc: "Términos acordados; clasificación y empaque en marcha." },
      { label: "Enviado", desc: "Inspección fitosanitaria aprobada; documentos listos." },
    ],
    statuses: {
      "جديد": "Recibido",
      "قيد المتابعة": "En revisión",
      "تم الاتفاق": "Acordado",
      "اكتمال الشحن": "Enviado y Despachado",
      "مؤرشف": "Completado",
    },
  },
};

function getStepIndex(status: string): number {
  if (status === "مؤرشف" || status === "اكتمال الشحن" || status === "تم الشحن" || status === "مكتمل") return 3;
  if (status === "تم الاتفاق") return 2;
  if (status === "قيد المتابعة") return 1;
  return 0; // "جديد"
}

export function AccountDashboard() {
  const { user, isAuthenticated, logout } = useVisitorAuth();
  const { language, dir } = useLanguage();
  const { settings: siteSettings } = useSiteSettings();

  const tr = accountTranslations[language] || accountTranslations.en;

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "in_progress" | "agreed" | "completed">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch user's orders
  const fetchOrders = useCallback(async () => {
    if (!user) return;
    try {
      let list: Inquiry[] = [];
      const res = await fetch("/api/inquiries", { cache: "no-store" }).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.inquiries)) {
          list = data.inquiries;
        }
      }

      // Direct fallback to Supabase if local API returned empty or failed
      if (list.length === 0) {
        try {
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gwdyyuezddpbgmmdwiey.supabase.co";
          const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_QAd4C2O8gHk56Uj0SyxCYg_DXS9MyE9";
          const supaRes = await fetch(`${supabaseUrl}/rest/v1/inquiries?select=*&order=created_at.desc`, {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
            cache: "no-store",
          });
          if (supaRes.ok) {
            const rawSupa = await supaRes.json();
            if (Array.isArray(rawSupa)) {
              list = rawSupa.map((item: any) => ({
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
                destinationPort:
                  item.destination_port ||
                  item.destinationPort ||
                  item.shipping_port ||
                  item.shippingPort ||
                  "",
                message: item.message || "",
                status: item.status || "جديد",
                read: item.read ?? false,
                createdAt: item.created_at ? new Date(item.created_at).getTime() : Date.now(),
              }));
            }
          }
        } catch {}
      }

      // Merge with local storage: SERVER list MUST override local items!
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("agriport_ops_inquiries");
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (Array.isArray(parsed)) {
              const map = new Map<string, Inquiry>();
              // Local items first as fallback for un-synced inquiries
              parsed.forEach((i) => {
                if (!i.destinationPort && (i as any).destination_port) {
                  i.destinationPort = (i as any).destination_port;
                }
                map.set(i.id, i);
              });
              // Cloud server items take absolute priority
              list.forEach((i) => {
                if (!i.destinationPort && (i as any).destination_port) {
                  i.destinationPort = (i as any).destination_port;
                }
                map.set(i.id, i);
              });
              list = Array.from(map.values());
            }
          } catch {}
        }
        // Save fresh combined state so local cache never stays stale
        if (list.length > 0) {
          try {
            localStorage.setItem("agriport_ops_inquiries", JSON.stringify(list));
          } catch {}
        }
      }

      const userEmail = (user.email || "").trim().toLowerCase();
      const userPhoneClean = (user.phone || "").replace(/\D/g, "");

      const matched = list.filter((item) => {
        const itemEmail = (item.email || "").trim().toLowerCase();
        const itemPhoneClean = (item.phone || "").replace(/\D/g, "");
        if (userEmail && itemEmail && itemEmail === userEmail) return true;
        if (userPhoneClean && itemPhoneClean && (itemPhoneClean.includes(userPhoneClean) || userPhoneClean.includes(itemPhoneClean))) {
          return true;
        }
        return false;
      });

      matched.sort((a, b) => {
        const tA = a.createdAt || (a.date ? new Date(a.date).getTime() : 0);
        const tB = b.createdAt || (b.date ? new Date(b.date).getTime() : 0);
        return tB - tA;
      });

      setInquiries(matched);
    } catch (e) {
      console.warn("Failed to load inquiries:", e);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 1200);

    const handleUpdate = () => fetchOrders();
    window.addEventListener("agriport_inquiries_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("agriport_inquiries_channel");
      bc.onmessage = () => fetchOrders();
    } catch {}

    return () => {
      clearInterval(interval);
      window.removeEventListener("agriport_inquiries_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      if (bc) bc.close();
    };
  }, [fetchOrders]);

  // Copy ID
  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered
  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      if (activeTab === "in_progress") {
        return inq.status === "جديد" || inq.status === "قيد المتابعة";
      }
      if (activeTab === "agreed") {
        return inq.status === "تم الاتفاق";
      }
      if (activeTab === "completed") {
        return inq.status === "مؤرشف" || inq.status === "اكتمال الشحن";
      }
      return true;
    });
  }, [inquiries, activeTab]);

  const fontClass = language === "ar" ? "font-['Cairo',sans-serif]" : "font-['Inter',sans-serif]";

  if (!isAuthenticated || !user) {
    return (
      <div className={`py-20 text-center ${fontClass}`} dir={dir}>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{tr.notLoggedInTitle}</h2>
        <p className="text-sm text-slate-500 mb-6">{tr.notLoggedInDesc}</p>
        <Link
          href="/login"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          {tr.loginBtn}
        </Link>
      </div>
    );
  }

  return (
    <div className={`${fontClass} text-slate-800 text-start space-y-6`} dir={dir}>
      
      {/* 1. Profile Summary Card (Simple & Matching Website Theme) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xl flex items-center justify-center shrink-0">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                {user.isGuest ? tr.guestClient : tr.verifiedClient}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
              {user.email && <span>{user.email}</span>}
              {user.phone && <span dir="ltr">{user.countryCode} {user.phone}</span>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
          <Link
            href="/products"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-full text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{tr.newQuoteBtn}</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 px-3 py-2 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{tr.signOutBtn}</span>
          </button>
        </div>
      </div>

      {/* Guest Notice */}
      {user.isGuest && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-center justify-between gap-3">
          <span>{tr.guestUpgradeNotice}</span>
          <Link href="/login?tab=register" className="font-bold underline text-amber-800 hover:text-amber-950 shrink-0">
            {tr.guestUpgradeLink}
          </Link>
        </div>
      )}

      {/* 2. Simple Statistics Numbers */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 text-center">
          <div className="text-2xl font-black text-slate-900">{inquiries.length}</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">{tr.statsTotal}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 text-center">
          <div className="text-2xl font-black text-amber-600">
            {inquiries.filter((i) => i.status === "جديد" || i.status === "قيد المتابعة").length}
          </div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">{tr.statsInProgress}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 text-center">
          <div className="text-2xl font-black text-emerald-600">
            {inquiries.filter((i) => i.status === "تم الاتفاق" || i.status === "اكتمال الشحن" || i.status === "مؤرشف").length}
          </div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">{tr.statsAgreed}</div>
        </div>
      </div>

      {/* 3. Section Title & Tabs */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {tr.sectionTitle}
          </h3>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tr.tabAll} ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("in_progress")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "in_progress"
                  ? "bg-amber-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tr.tabInProgress} ({inquiries.filter((i) => i.status === "جديد" || i.status === "قيد المتابعة").length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("agreed")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "agreed"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tr.tabAgreed} ({inquiries.filter((i) => i.status === "تم الاتفاق").length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("completed")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "completed"
                  ? "bg-slate-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tr.tabCompleted} ({inquiries.filter((i) => i.status === "مؤرشف" || i.status === "اكتمال الشحن").length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
            {tr.loading}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">{tr.emptyTitle}</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {tr.emptyDesc}
            </p>
            <Link
              href="/products"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              {tr.emptyBtn}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((inquiry) => {
              const currentStep = getStepIndex(inquiry.status);
              const localizedCrop = translateAgriText(inquiry.product, language);
              const statusLabel = tr.statuses[inquiry.status] || inquiry.status;

              return (
                <div
                  key={inquiry.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
                >
                  {/* Top Bar: Crop Name + Status + Date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🌿</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-slate-900">{localizedCrop}</h4>
                          {/* Status Badge */}
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              inquiry.status === "اكتمال الشحن"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : inquiry.status === "تم الاتفاق"
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : inquiry.status === "قيد المتابعة"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : inquiry.status === "مؤرشف"
                                ? "bg-slate-100 text-slate-700 border-slate-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {statusLabel}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {tr.orderDate} {inquiry.date || "Today"}
                        </span>
                      </div>
                    </div>

                    {/* Order Code */}
                    <button
                      type="button"
                      onClick={(e) => handleCopyId(inquiry.id, e)}
                      className="text-[11px] font-mono text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                      title={tr.copyId}
                    >
                      {copiedId === inquiry.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">{tr.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>#{inquiry.id.slice(0, 10)}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Order Specs Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold">{tr.quantityLabel}</span>
                      <span className="font-bold text-slate-800">{inquiry.quantity || "—"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold">{tr.incotermsLabel}</span>
                      <span className="font-bold text-slate-800">{inquiry.incoterms || "FOB"}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-slate-400 block text-[10px] font-semibold">{tr.portLabel}</span>
                      <span className="font-bold text-slate-800">
                        {inquiry.destinationPort || (inquiry as any).destination_port || "—"}
                      </span>
                    </div>
                  </div>

                  {/* 🌟 4-Step Interactive Progress Bar */}
                  <div className="py-2.5">
                    <div className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-emerald-600" />
                      <span>{tr.trackingTitle}</span>
                    </div>

                    {/* Stepper with unified continuous connected line */}
                    <div className="relative mt-2">
                      {/* Unified Track Line: exactly from center of 1st circle to center of 4th circle */}
                      <div
                        className="absolute top-4 -translate-y-1/2 h-1 bg-slate-200 rounded-full overflow-hidden"
                        style={{
                          insetInlineStart: "12.5%",
                          insetInlineEnd: "12.5%",
                        }}
                      >
                        {/* Active Progress Fill */}
                        <div
                          className="absolute top-0 bottom-0 bg-emerald-600 transition-all duration-500 ease-in-out rounded-full"
                          style={{
                            insetInlineStart: 0,
                            width: `${(currentStep / 3) * 100}%`,
                          }}
                        />
                      </div>

                      {/* 4 Step Columns */}
                      <div className="grid grid-cols-4 relative z-10">
                        {tr.steps.map((step, idx) => {
                          const isCompleted = idx < currentStep;
                          const isCurrent = idx === currentStep;
                          const isDone = idx <= currentStep;

                          return (
                            <div key={idx} className="flex flex-col items-center">
                              {/* Step Circle */}
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                  isCurrent
                                    ? "bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-xs"
                                    : isDone
                                    ? "bg-emerald-600 text-white shadow-xs"
                                    : "bg-white text-slate-400 border-2 border-slate-200"
                                }`}
                              >
                                {isDone ? (
                                  <Check className="w-4 h-4 stroke-[2.5]" />
                                ) : (
                                  <span>{idx + 1}</span>
                                )}
                              </div>

                              {/* Step Label */}
                              <span
                                className={`text-[11px] sm:text-xs font-semibold mt-2 text-center leading-tight transition-colors px-1 ${
                                  isCurrent
                                    ? "text-emerald-700 font-bold"
                                    : isDone
                                    ? "text-slate-800"
                                    : "text-slate-400"
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Current Step Description Box */}
                    <div className="mt-3.5 bg-emerald-50/70 border border-emerald-100/90 rounded-xl p-3 text-xs text-emerald-950 flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                      </span>
                      <div className="leading-relaxed">
                        <strong className="text-emerald-900">{tr.currentStatusLabel}</strong>{" "}
                        <span className="text-emerald-800">{tr.steps[currentStep].desc}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Message if any */}
                  {inquiry.message && (
                    <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700 block mb-0.5">{tr.orderNotesLabel}</span>
                      <p>{inquiry.message}</p>
                    </div>
                  )}

                  {/* Bottom WhatsApp Contact Button */}
                  <div className="pt-1 flex items-center justify-between">
                    <a
                      href={`https://wa.me/${(siteSettings.phone || "201007202636").replace(/\D/g, "")}?text=${encodeURIComponent(
                        language === "ar"
                          ? `مرحباً AgriPort، أتابع طلبي رقم (${inquiry.id}) لمحصول (${inquiry.product}). أود الاستفسار عن آخر مستجدات الشحنة.`
                          : `Hello AgriPort, I am inquiring about my order (#${inquiry.id}) for (${localizedCrop}). Status: "${statusLabel}".`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{tr.whatsappBtn}</span>
                    </a>

                    <span className="text-[11px] text-slate-400">
                      {tr.exportDesk}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
