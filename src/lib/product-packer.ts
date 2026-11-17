export type PackedProductMeta = {
  specsText?: string;
  images?: string[];
  description?: string;
  pdfUrl?: string;
  pdfName?: string;
  origin?: string;
  hsCode?: string;
  storageTemp?: string;
  shelfLife?: string;
};

/**
 * Encodes extended product fields (images, description, specs, pdf, etc.)
 * into a structured JSON string stored in the `specs` column of Supabase.
 * This guarantees images and descriptions are preserved without schema errors.
 */
export function packProductSpecs(product: {
  specs?: string;
  images?: string[];
  description?: string;
  pdfUrl?: string;
  pdfName?: string;
  origin?: string;
  hsCode?: string;
  storageTemp?: string;
  shelfLife?: string;
}): string {
  // If specs already contains a packed JSON, extract its base text first
  let rawSpecs = product.specs || "";
  if (rawSpecs.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(rawSpecs);
      if (parsed && typeof parsed === "object" && parsed.specsText !== undefined) {
        rawSpecs = parsed.specsText;
      }
    } catch {
      // ignore
    }
  }

  const meta: PackedProductMeta = {
    specsText: rawSpecs,
    images: Array.isArray(product.images) ? product.images : [],
    description: product.description || "",
    pdfUrl: product.pdfUrl || "",
    pdfName: product.pdfName || "",
    origin: product.origin || "",
    hsCode: product.hsCode || "",
    storageTemp: product.storageTemp || "",
    shelfLife: product.shelfLife || "",
  };

  return JSON.stringify(meta);
}

/**
 * Unpacks a product row returned from Supabase or API.
 * Gracefully extracts clean specs text, full images array, description, and metadata.
 */
export function unpackProductRow(row: any) {
  let specsText = row.specs || "";
  let images = Array.isArray(row.images) ? row.images : undefined;
  let description = row.description;
  let pdfUrl = row.pdf_url || row.pdfUrl;
  let pdfName = row.pdf_name || row.pdfName;
  let origin = row.origin;
  let hsCode = row.hs_code || row.hsCode;
  let storageTemp = row.storage_temp || row.storageTemp;
  let shelfLife = row.shelf_life || row.shelfLife;

  // Inspect row.specs for packed JSON metadata
  if (row.specs && typeof row.specs === "string" && row.specs.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(row.specs);
      if (parsed && typeof parsed === "object") {
        if (parsed.specsText !== undefined) specsText = parsed.specsText;
        if (images === undefined && Array.isArray(parsed.images)) images = parsed.images;
        if (description === undefined && parsed.description) description = parsed.description;
        if (pdfUrl === undefined && parsed.pdfUrl) pdfUrl = parsed.pdfUrl;
        if (pdfName === undefined && parsed.pdfName) pdfName = parsed.pdfName;
        if (origin === undefined && parsed.origin) origin = parsed.origin;
        if (hsCode === undefined && parsed.hsCode) hsCode = parsed.hsCode;
        if (storageTemp === undefined && parsed.storageTemp) storageTemp = parsed.storageTemp;
        if (shelfLife === undefined && parsed.shelfLife) shelfLife = parsed.shelfLife;
      }
    } catch {
      // not JSON, keep specsText as is
    }
  }

  const cleanImageUrl =
    row.image_url ||
    row.imageUrl ||
    (Array.isArray(images) && images.length > 0 ? images[0] : "") ||
    "/images/products/artichoke.jpg";

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    variety: row.variety,
    season: row.season,
    pack: row.pack,
    specs: specsText,
    imageUrl: cleanImageUrl,
    icon: row.icon || "🌿",
    status: row.status || "متاح للتصدير",
    featured: row.featured ?? false,
    description: description || "",
    images: Array.isArray(images)
      ? images
      : cleanImageUrl
      ? [cleanImageUrl]
      : [],
    pdfUrl: pdfUrl || "",
    pdfName: pdfName || "",
    origin: origin || "جمهورية مصر العربية (Egypt)",
    hsCode: hsCode || "",
    storageTemp: storageTemp || "",
    shelfLife: shelfLife || "",
  };
}
