import { ExportProduct } from "./catalog";
import { getLocalizedProduct } from "./product-translations";
import { Language } from "./i18n";
import { AGRI_LOGO_BASE64 } from "./agri-logo-base64";

const pdfI18n: Record<
  Language,
  {
    printBtn: string;
    closeBtn: string;
    brandSubtitle: string;
    issueDate: string;
    officialDoc: string;
    marketCompliance: string;
    tableTitle: string;
    thVarieties: string;
    thSeason: string;
    thPackaging: string;
    thCaliber: string;
    thColdChain: string;
    thShelfLife: string;
    thOrigin: string;
    thHsCode: string;
    descTitle: string;
    certsTitle: string;
    exportSales: string;
    exportPorts: string;
    portsList: string;
  }
> = {
  ar: {
    printBtn: "حفظ كملف PDF / طباعة",
    closeBtn: "إغلاق النافذة",
    brandSubtitle: "Agricultural Export & Global Logistics Hubs",
    issueDate: "تاريخ الإصدار:",
    officialDoc: "النسخة التصديرية الرسمية",
    marketCompliance:
      "مجهز ومطابق لمعايير الأسواق الأوروبية، والخليج العربي، والأسواق الدولية بسلسلة تبريد معتمدة.",
    tableTitle: "جدول المواصفات الفنية والشحن",
    thVarieties: "الصنف والأنواع",
    thSeason: "الموسم التصديري",
    thPackaging: "مواصفات التعبئة والتغليف",
    thCaliber: "أحجام الكاليبر والجودة",
    thColdChain: "درجة حرارة الشحن والتبريد",
    thShelfLife: "فترة الصلاحية التقديرية",
    thOrigin: "بلد المنشأ",
    thHsCode: "الكود الجمركي (HS Code)",
    descTitle: "الوصف الفني وملاحظات الجودة",
    certsTitle: "الشهادات والاعتمادات الدولية لمحطات الفرز",
    exportSales: "مكتب التصدير والتعاقدات:",
    exportPorts: "موانئ الشحن والتصدير:",
    portsList: "ميناء الإسكندرية | ميناء دمياط | قرية البضائع بمطار القاهرة",
  },
  en: {
    printBtn: "Save as PDF / Print",
    closeBtn: "Close Window",
    brandSubtitle: "Agricultural Export & Global Logistics Hubs",
    issueDate: "Issue Date:",
    officialDoc: "Official Technical Specification Datasheet",
    marketCompliance:
      "Prepared and compliant with EU, GCC, and international quality standards with certified continuous cold chain.",
    tableTitle: "Technical & Shipping Specifications",
    thVarieties: "Cultivar & Varieties",
    thSeason: "Export Season",
    thPackaging: "Packaging & Packing Units",
    thCaliber: "Caliber, Sizing & Quality",
    thColdChain: "Storage & Cold Chain Temp",
    thShelfLife: "Estimated Shelf Life",
    thOrigin: "Country of Origin",
    thHsCode: "Harmonized System Code (HS Code)",
    descTitle: "Technical Description & Quality Handling",
    certsTitle: "Accreditations & Packhouse Certifications",
    exportSales: "Export & Commercial Sales Desk:",
    exportPorts: "Export Shipping Ports:",
    portsList: "Alexandria Port | Damietta Port | Cairo Air Cargo Hub",
  },
  fr: {
    printBtn: "Enregistrer en PDF / Imprimer",
    closeBtn: "Fermer la fenêtre",
    brandSubtitle: "Exportation Agricole et Plateformes Logistiques",
    issueDate: "Date d'émission :",
    officialDoc: "Fiche Technique Officielle d'Exportation",
    marketCompliance:
      "Préparé et conforme aux normes de l'UE, du CCG et internationales avec chaîne du froid continue.",
    tableTitle: "Spécifications Techniques et Expédition",
    thVarieties: "Variétés & Cultivars",
    thSeason: "Calendrier d'Exportation",
    thPackaging: "Conditionnement & Emballage",
    thCaliber: "Calibres & Critères de Qualité",
    thColdChain: "Température de Conservation & Transport",
    thShelfLife: "Durée de Conservation Estimée",
    thOrigin: "Pays d'Origine",
    thHsCode: "Code Douanier (Système Harmonisé)",
    descTitle: "Description Technique & Procédés Qualité",
    certsTitle: "Certifications & Agréments des Stations",
    exportSales: "Bureau Export & Ventes Commerciales :",
    exportPorts: "Ports et Plateformes d'Expédition :",
    portsList: "Port d'Alexandrie | Port de Damiette | Fret Aérien Aéroport du Caire",
  },
  it: {
    printBtn: "Salva come PDF / Stampa",
    closeBtn: "Chiudi finestra",
    brandSubtitle: "Esportazione Agricola e Hub Logistici Globali",
    issueDate: "Data di emissione:",
    officialDoc: "Scheda Tecnica Ufficiale di Esportazione",
    marketCompliance:
      "Lavorato e conforme agli standard UE, Paesi del Golfo e internazionali con catena del freddo certificata.",
    tableTitle: "Specifiche Tecniche e di Spedizione",
    thVarieties: "Cultivar e Varietà",
    thSeason: "Stagione di Esportazione",
    thPackaging: "Imballaggio e Confezionamento",
    thCaliber: "Calibri e Grado di Qualità",
    thColdChain: "Temperatura di Conservazione e Trasporto",
    thShelfLife: "Durata di Conservazione Stimata",
    thOrigin: "Paese d'Origine",
    thHsCode: "Codice Doganale (Codice SA)",
    descTitle: "Descrizione Tecnica e Protocolli Qualità",
    certsTitle: "Certificazioni Internazionali di Filiera",
    exportSales: "Ufficio Esportazioni e Vendite Commerciali:",
    exportPorts: "Porti e Terminal di Spedizione:",
    portsList: "Porto di Alessandria | Porto di Damietta | Cargo Aereo Aeroporto del Cairo",
  },
  es: {
    printBtn: "Guardar como PDF / Imprimir",
    closeBtn: "Cerrar ventana",
    brandSubtitle: "Exportación Agrícola y Hubs Logísticos Globales",
    issueDate: "Fecha de emisión:",
    officialDoc: "Ficha Técnica Oficial de Exportación",
    marketCompliance:
      "Acondicionado y conforme a los estándares de la UE, CCG e internacionales con cadena de frío certificada.",
    tableTitle: "Especificaciones Técnicas y de Transporte",
    thVarieties: "Variedades y Cultivares",
    thSeason: "Temporada de Exportación",
    thPackaging: "Envasado y Formatos de Embalaje",
    thCaliber: "Calibres y Criterios de Calidad",
    thColdChain: "Temperatura de Conservación y Transporte",
    thShelfLife: "Vida Útil Comercial Estimada",
    thOrigin: "País de Origen",
    thHsCode: "Código Arancelario (Código SA)",
    descTitle: "Descripción Técnica y Manejo de Calidad",
    certsTitle: "Certificaciones y Homologaciones de Planta",
    exportSales: "Oficina de Exportación y Ventas Comerciales:",
    exportPorts: "Puertos y Terminales de Salida:",
    portsList: "Puerto de Alejandría | Puerto de Damietta | Carga Aérea Aeropuerto de El Cairo",
  },
};

export function downloadProductPdf(product: ExportProduct, language: string = "ar") {
  if (typeof window === "undefined") return;

  const validLang = (["ar", "en", "fr", "it", "es"].includes(language) ? language : "ar") as Language;
  const localized = getLocalizedProduct(product, validLang);

  // 1. If admin attached a custom PDF file or link, download it directly
  if (product.pdfUrl) {
    const filename =
      product.pdfName ||
      `${product.id || "product"}-datasheet-agriport.pdf`;

    // If it's a data URL or blob URL, trigger instant browser download
    if (
      product.pdfUrl.startsWith("data:application/pdf") ||
      product.pdfUrl.startsWith("blob:")
    ) {
      const link = document.createElement("a");
      link.href = product.pdfUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true, type: "custom_download" };
    }

    // If it's an HTTP/HTTPS link, open or trigger download
    const link = document.createElement("a");
    link.href = product.pdfUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { success: true, type: "custom_link" };
  }

  // 2. Otherwise: Generate an instant official AgriPort Branded Technical Specification Datasheet
  const isRtl = validLang === "ar";
  const dict = pdfI18n[validLang] || pdfI18n.en;
  const title = localized.name;
  const variety =
    localized.variety || (isRtl ? "نخب أول للتصدير الدولي" : "Grade A International Export");
  const category = localized.category || (isRtl ? "خضروات" : "Vegetables");
  const season =
    localized.season || (isRtl ? "متاح للتصدير طوال العام" : "Available all year round");
  const pack =
    localized.pack ||
    (isRtl
      ? "كراتين تبريد وتغليف تصديري مخصص"
      : "Chilled export cartons and customized packaging");
  const specs =
    localized.specs ||
    (isRtl
      ? "مطابق للمواصفات القياسية الأوروبية"
      : "Compliant with European quality specifications");
  const origin = localized.origin || (isRtl ? "جمهورية مصر العربية" : "Arab Republic of Egypt");
  const hsCode = localized.hsCode || product.hsCode || "0709.99.00";
  const storageTemp =
    localized.storageTemp ||
    (isRtl ? "0°C — 4°C (سلسلة تبريد معتمدة)" : "0°C — 4°C (Controlled Cold Chain)");
  const shelfLife = localized.shelfLife || (isRtl ? "21 — 30 يوماً" : "21 — 30 Days");
  const description =
    localized.description ||
    (isRtl
      ? "محصول زراعي مصري فاخر يتم فرزه وتجهيزه وتعبئته في محطات معتمدة وفق أعلى معايير الجودة الدولية وسلسلة التبريد المتكاملة لضمان أقصى درجات النضارة وسلامة الغذاء."
      : "Premium Egyptian agricultural produce harvested, sorted, and packed in certified packhouses according to the highest international quality standards and continuous cold chain integrity.");
  const status = localized.status || (isRtl ? "متاح للتصدير" : "Available for Export");
  const windowOrigin = typeof window !== "undefined" ? window.location.origin : "";

  // Build the self-contained printable HTML document
  const htmlContent = `<!DOCTYPE html>
<html lang="${language}" dir="${isRtl ? "rtl" : "ltr"}">
<head>
  <meta charset="UTF-8">
  <base href="${windowOrigin}/">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AgriPort Technical Datasheet — ${escapeHtml(localized.name)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: ${isRtl ? "'Cairo', sans-serif" : "'Inter', sans-serif"};
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.5;
      padding: 24px;
    }

    .no-print-bar {
      max-width: 800px;
      margin: 0 auto 20px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 20px;
      background: #0f172a;
      color: #ffffff;
      border-radius: 14px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    }

    .no-print-bar button {
      background: #10b981;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
    }
    .no-print-bar button:hover {
      background: #059669;
    }
    .no-print-bar .close-btn {
      background: #334155;
    }
    .no-print-bar .close-btn:hover {
      background: #475569;
    }

    .sheet {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      position: relative;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #10b981;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .brand-logo-wrap {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .brand-logo-img {
      width: 48px;
      height: 48px;
      object-fit: contain;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.08));
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    .brand-title {
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 28px;
      line-height: 1.05;
      letter-spacing: -0.6px;
      display: flex;
      align-items: center;
    }

    .brand-title .agri {
      color: #059669;
      font-weight: 600;
    }

    .brand-title .port {
      color: #0f172a;
      font-weight: 800;
      margin-left: 1px;
    }

    .brand-subtitle {
      font-family: 'Space Grotesk', 'Inter', sans-serif;
      font-size: 9.5px;
      font-weight: 700;
      color: #059669;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-top: 4px;
    }

    .doc-meta {
      text-align: ${isRtl ? "left" : "right"};
      font-size: 11px;
      color: #64748b;
    }
    .doc-ref {
      font-weight: 800;
      color: #0f172a;
      font-family: monospace;
      font-size: 12px;
      background: #f1f5f9;
      padding: 3px 8px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 4px;
    }

    .product-hero {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 24px;
      margin-bottom: 24px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px;
    }

    .product-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid #cbd5e1;
    }

    .product-info h1 {
      font-size: 22px;
      font-weight: 900;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .product-info .variety {
      font-size: 13px;
      font-weight: 700;
      color: #059669;
      margin-bottom: 12px;
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 700;
    }
    .badge-status {
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
    }
    .badge-cat {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;
    }

    .section-title {
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin: 20px 0 12px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 14px;
      background: #10b981;
      border-radius: 3px;
    }

    .specs-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 12px;
    }
    .specs-table th, .specs-table td {
      padding: 10px 14px;
      border: 1px solid #e2e8f0;
      text-align: ${isRtl ? "right" : "left"};
    }
    .specs-table th {
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      width: 32%;
    }
    .specs-table td {
      background: #ffffff;
      color: #0f172a;
      font-weight: 500;
    }

    .desc-box {
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      padding: 16px;
      font-size: 12px;
      color: #334155;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .cert-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 24px;
    }
    .cert-item {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 8px 10px;
      text-align: center;
      font-size: 10px;
      font-weight: 800;
      color: #0f172a;
    }
    .cert-item span {
      display: block;
      color: #059669;
      font-size: 9px;
      font-weight: 600;
    }

    .footer {
      border-top: 2px solid #e2e8f0;
      padding-top: 16px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 16px;
      font-size: 11px;
      color: #64748b;
    }
    .footer-col strong {
      color: #0f172a;
      display: block;
      margin-bottom: 3px;
    }

    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
      }
      .no-print-bar {
        display: none !important;
      }
      .sheet {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        max-width: 100% !important;
      }
      @page {
        size: A4 portrait;
        margin: 12mm 15mm;
      }
    }
  </style>
</head>
<body>

  <!-- No-Print Action Bar -->
  <div class="no-print-bar">
    <div style="display:flex; align-items:center; gap:8px;">
      <span style="font-size:18px;">📄</span>
      <span style="font-weight:700; font-size:13px;">AgriPort Technical Datasheet — ${escapeHtml(localized.name)}</span>
    </div>
    <div style="display:flex; gap:8px;">
      <button onclick="window.print()">
        <span>🖨️</span>
        <span>${dict.printBtn}</span>
      </button>
      <button class="close-btn" onclick="window.close()">
        <span>✕</span>
        <span>${dict.closeBtn}</span>
      </button>
    </div>
  </div>

  <!-- Printable A4 Sheet -->
  <div class="sheet">
    
    <!-- Header -->
    <div class="header">
      <div class="brand">
        <div class="brand-logo-wrap">
          <img src="${AGRI_LOGO_BASE64}" alt="AgriPort" class="brand-logo-img" />
        </div>
        <div class="brand-text" dir="ltr">
          <div class="brand-title">
            <span class="agri">Agri</span><span class="port">Port</span>
          </div>
          <div class="brand-subtitle">${dict.brandSubtitle}</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-ref">REF: AGP-${(product.id || "CROP").toUpperCase()}-2026</div>
        <div>${dict.issueDate} ${new Date().toLocaleDateString(isRtl ? "ar-EG" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
        <div>${dict.officialDoc}</div>
      </div>
    </div>

    <!-- Product Summary Card -->
    <div class="product-hero">
      ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${escapeHtml(localized.name)}" class="product-img" />` : `<div class="product-img" style="display:flex;align-items:center;justify-content:center;font-size:42px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">${product.icon || "🌿"}</div>`}
      <div class="product-info">
        <div class="badges">
          <span class="badge badge-status">● ${escapeHtml(status)}</span>
          <span class="badge badge-cat">${escapeHtml(category)}</span>
          <span class="badge badge-cat">${escapeHtml(origin)}</span>
        </div>
        <h1>${escapeHtml(title)}</h1>
        <div class="variety">${escapeHtml(variety)}</div>
        <p style="font-size:11px; color:#475569;">
          ${dict.marketCompliance}
        </p>
      </div>
    </div>

    <!-- Technical Specifications Table -->
    <div class="section-title">
      ${dict.tableTitle}
    </div>
    <table class="specs-table">
      <tbody>
        <tr>
          <th>${dict.thVarieties}</th>
          <td>${escapeHtml(variety)}</td>
        </tr>
        <tr>
          <th>${dict.thSeason}</th>
          <td>${escapeHtml(season)}</td>
        </tr>
        <tr>
          <th>${dict.thPackaging}</th>
          <td>${escapeHtml(pack)}</td>
        </tr>
        <tr>
          <th>${dict.thCaliber}</th>
          <td>${escapeHtml(specs)}</td>
        </tr>
        <tr>
          <th>${dict.thColdChain}</th>
          <td>${escapeHtml(storageTemp)}</td>
        </tr>
        <tr>
          <th>${dict.thShelfLife}</th>
          <td>${escapeHtml(shelfLife)}</td>
        </tr>
        <tr>
          <th>${dict.thOrigin}</th>
          <td>${escapeHtml(origin)}</td>
        </tr>
        <tr>
          <th>${dict.thHsCode}</th>
          <td style="font-family:monospace; font-weight:700;">${escapeHtml(hsCode)}</td>
        </tr>
      </tbody>
    </table>

    <!-- Description & Handling Notes -->
    <div class="section-title">
      ${dict.descTitle}
    </div>
    <div class="desc-box">
      ${escapeHtml(description)}
    </div>

    <!-- Footer & Contact -->
    <div class="footer">
      <div class="footer-col">
        <strong>${dict.exportSales}</strong>
        <div>agriporteg@gmail.com</div>
        <div>+20 100 720 2636 (WhatsApp & Calls)</div>
      </div>
      <div class="footer-col">
        <strong>${dict.exportPorts}</strong>
        <div>${dict.portsList}</div>
        <div>Incoterms: FOB, CIF, CFR, FCA</div>
      </div>
      <div class="footer-col" style="text-align:${isRtl ? "left" : "right"};">
        <strong>AgriPort Trade Gateway</strong>
        <div>www.agriport.trade</div>
        <div style="font-size:10px; color:#94a3b8; margin-top:3px;">Generated via AgriPort Live Engine</div>
      </div>
    </div>

  </div>

  <script>
    // Automatically trigger print on load if requested or after render
    window.addEventListener('load', () => {
      setTimeout(() => {
        // window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

  // Open the printable document in a new tab/window
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    return { success: true, type: "generated_print_window" };
  } else {
    // If popup was blocked, fallback to creating an iframe or blob
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { success: true, type: "blob_opened" };
  }
}

function escapeHtml(str?: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
