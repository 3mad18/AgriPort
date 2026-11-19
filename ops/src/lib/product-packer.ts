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
        if (Array.isArray(parsed.images)) images = parsed.images;
        if (parsed.description !== undefined) description = parsed.description;
        if (parsed.pdfUrl !== undefined) pdfUrl = parsed.pdfUrl;
        if (parsed.pdfName !== undefined) pdfName = parsed.pdfName;
        if (parsed.origin !== undefined) origin = parsed.origin;
        if (parsed.hsCode !== undefined) hsCode = parsed.hsCode;
        if (parsed.storageTemp !== undefined) storageTemp = parsed.storageTemp;
        if (parsed.shelfLife !== undefined) shelfLife = parsed.shelfLife;
      }
    } catch {
      // not JSON, keep specsText as is
    }
  }

  let cleanImages: string[] = [];
  if (Array.isArray(images)) {
    cleanImages = images.map((img) => (img || "").trim()).filter(Boolean);
  } else if (row.image_url || row.imageUrl) {
    const single = (row.image_url || row.imageUrl || "").trim();
    if (single) cleanImages = [single];
  }

  let cleanImageUrl = "";
  if (cleanImages.length > 0) {
    cleanImageUrl = (row.image_url && cleanImages.includes(row.image_url)) ? row.image_url : cleanImages[0];
  }

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
    images: cleanImages,
    pdfUrl: pdfUrl || "",
    pdfName: pdfName || "",
    origin: origin || "جمهورية مصر العربية (Egypt)",
    hsCode: hsCode || "",
    storageTemp: storageTemp || "",
    shelfLife: shelfLife || "",
  };
}
