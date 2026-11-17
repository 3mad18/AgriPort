/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useOpsStore, type Product } from "@/context/ops-store-context";
import {
  Package,
  Plus,
  Sprout,
  Image as ImageIcon,
  Pencil,
  Trash2,
  Upload,
  Link as LinkIcon,
  Loader2,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Download,
  Paperclip,
} from "lucide-react";

export const EMOJI_OPTIONS: { emoji: string; label: string; category: string }[] = [];

export const SAMPLE_CROPS_LIBRARY = [
  { name: "خرشوف بلدي تصدير", url: "/images/products/artichoke.jpg", category: "خضروات" },
  { name: "فاصوليا خضراء رفيعة", url: "/images/products/green-beans.jpg", category: "خضروات" },
  { name: "بروكلي طازج نخب أول", url: "/images/products/broccoli.jpg", category: "خضروات" },
  { name: "قرنبيط أبيض مصري", url: "/images/products/cauliflower.jpg", category: "خضروات" },
  { name: "كرنب أبيض بلدي", url: "/images/products/cabbage.jpg", category: "خضروات" },
  { name: "بطاطس اسبونتا تصدير", url: "/images/products/potatoes.jpg", category: "خضروات" },
  { name: "خس كابوتشا آيسبيرج", url: "/images/products/lettuce.jpg", category: "خضروات" },
  { name: "كرنب أحمر كروي", url: "/images/products/red-cabbage.jpg", category: "خضروات" },
  { name: "برتقال فالنسيا صيفي", url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80", category: "موالح" },
  { name: "ليمون أضاليا أصفر", url: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80", category: "موالح" },
  { name: "بصل أحمر مصري", url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80", category: "خضروات" },
  { name: "ثوم طازج مجفف", url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80", category: "خضروات" },
  { name: "فراولة طازجة فستيفال", url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80", category: "فواكه" },
  { name: "عنب فليم بدون بذور", url: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80", category: "فواكه" },
];

export function OpsProducts({
  searchQuery,
  initialOpenAddModal = false,
  onResetOpenAddModal,
}: {
  searchQuery: string;
  initialOpenAddModal?: boolean;
  onResetOpenAddModal?: () => void;
}) {
  const { products, addProduct, updateProduct, deleteProduct } = useOpsStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Images state and refs
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showSamplePicker, setShowSamplePicker] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [processingProgress, setProcessingProgress] = useState("");
  const [previewLightboxImage, setPreviewLightboxImage] = useState<string | null>(null);
  const [replacingImageIndex, setReplacingImageIndex] = useState<number | null>(null);

  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const singleReplaceInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [showPdfUrlInput, setShowPdfUrlInput] = useState(false);

  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    category: "موالح",
    variety: "",
    season: "",
    pack: "",
    specs: "",
    imageUrl: "",
    icon: "",
    status: "متاح للتصدير",
    featured: false,
    description: "",
    images: [],
    pdfUrl: "",
    pdfName: "",
    origin: "جمهورية مصر العربية (Egypt)",
    hsCode: "",
    storageTemp: "",
    shelfLife: "",
  });

  const categories = ["الكل", "موالح", "خضروات", "فواكه", "أخرى"];

  const filtered = products.filter((item) => {
    const matchesCat =
      selectedCategory === "الكل" ? true : item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.variety.toLowerCase().includes(q) ||
      item.season.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // Calculate clean list of all attached images
  const allAttachedImages = useMemo(() => {
    const list: string[] = [];
    if (form.imageUrl && form.imageUrl.trim()) {
      list.push(form.imageUrl.trim());
    }
    if (Array.isArray(form.images)) {
      form.images.forEach((img) => {
        const trimmed = (img || "").trim();
        if (trimmed && !list.includes(trimmed)) {
          list.push(trimmed);
        }
      });
    }
    return list;
  }, [form.imageUrl, form.images]);

  const handleOpenAdd = useCallback(() => {
    setEditingProduct(null);
    setShowUrlInput(false);
    setUrlInput("");
    setShowSamplePicker(false);
    setShowPdfUrlInput(false);
    setReplacingImageIndex(null);
    setPreviewLightboxImage(null);
    setForm({
      name: "",
      category: "موالح",
      variety: "",
      season: "",
      pack: "",
      specs: "",
      imageUrl: "",
      icon: "",
      status: "متاح للتصدير",
      featured: false,
      description: "",
      images: [],
      pdfUrl: "",
      pdfName: "",
      origin: "جمهورية مصر العربية (Egypt)",
      hsCode: "",
      storageTemp: "",
      shelfLife: "",
    });
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (initialOpenAddModal) {
      handleOpenAdd();
      onResetOpenAddModal?.();
    }
  }, [initialOpenAddModal, handleOpenAdd, onResetOpenAddModal]);

  const handleOpenEdit = (item: Product) => {
    setEditingProduct(item);
    setShowUrlInput(false);
    setUrlInput("");
    setShowSamplePicker(false);
    setShowPdfUrlInput(false);
    setReplacingImageIndex(null);
    setPreviewLightboxImage(null);

    // Collect existing images
    const initialImages: string[] = [];
    if (item.imageUrl) initialImages.push(item.imageUrl);
    if (Array.isArray(item.images)) {
      item.images.forEach((img) => {
        if (img && !initialImages.includes(img)) {
          initialImages.push(img);
        }
      });
    }

    setForm({
      name: item.name,
      category: item.category,
      variety: item.variety,
      season: item.season,
      pack: item.pack,
      specs: item.specs,
      imageUrl: item.imageUrl || initialImages[0] || "",
      icon: item.icon,
      status: item.status,
      featured: item.featured || false,
      description: item.description || "",
      images: initialImages,
      pdfUrl: item.pdfUrl || "",
      pdfName: item.pdfName || "",
      origin: item.origin || "جمهورية مصر العربية (Egypt)",
      hsCode: item.hsCode || "",
      storageTemp: item.storageTemp || "",
      shelfLife: item.shelfLife || "",
    });
    setIsModalOpen(true);
  };

  // Compress single image to high-efficiency web JPEG
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        return reject(new Error("File is not an image"));
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const MAX_DIM = 1200;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
            resolve(dataUrl);
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // Upload multiple images at once (Batch)
  const handleBatchUpload = async (files: FileList | File[] | null) => {
    if (!files || files.length === 0) return;
    setIsProcessingImages(true);
    setProcessingProgress(`جاري معالجة ${files.length} صورة...`);
    try {
      const fileArray = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
      );
      const dataUrls: string[] = [];
      for (let i = 0; i < fileArray.length; i++) {
        setProcessingProgress(`جاري تجهيز صورة ${i + 1} من ${fileArray.length}...`);
        const url = await compressImage(fileArray[i]);
        dataUrls.push(url);
      }

      setForm((prev) => {
        const currentList = Array.isArray(prev.images) ? [...prev.images] : [];
        if (prev.imageUrl && !currentList.includes(prev.imageUrl)) {
          currentList.unshift(prev.imageUrl);
        }
        const updatedList = [...currentList, ...dataUrls];
        const primaryCover = prev.imageUrl || updatedList[0] || "";
        return {
          ...prev,
          imageUrl: primaryCover,
          images: updatedList,
        };
      });
    } catch (err) {
      console.error("Batch image upload error:", err);
    } finally {
      setIsProcessingImages(false);
      setProcessingProgress("");
      if (multiFileInputRef.current) {
        multiFileInputRef.current.value = "";
      }
    }
  };

  // Replace a specific image at index
  const handleReplaceImage = async (index: number, file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setIsProcessingImages(true);
    try {
      const dataUrl = await compressImage(file);
      setForm((prev) => {
        const list = Array.isArray(prev.images) ? [...prev.images] : [];
        if (prev.imageUrl && !list.includes(prev.imageUrl)) {
          list.unshift(prev.imageUrl);
        }
        const oldImage = list[index];
        list[index] = dataUrl;
        const newCover = prev.imageUrl === oldImage ? dataUrl : prev.imageUrl;
        return {
          ...prev,
          images: list,
          imageUrl: newCover || list[0] || "",
        };
      });
    } catch (err) {
      console.error("Image replace error:", err);
    } finally {
      setIsProcessingImages(false);
      setReplacingImageIndex(null);
      if (singleReplaceInputRef.current) {
        singleReplaceInputRef.current.value = "";
      }
    }
  };

  // Set any image as primary cover
  const handleSetCover = (imgUrl: string) => {
    setForm((prev) => {
      const list = Array.isArray(prev.images) ? [...prev.images] : [];
      if (!list.includes(imgUrl)) {
        list.push(imgUrl);
      }
      // Reorder so cover is first in list for intuitive viewing
      const reordered = [imgUrl, ...list.filter((x) => x !== imgUrl)];
      return {
        ...prev,
        imageUrl: imgUrl,
        images: reordered,
      };
    });
  };

  // Delete an image
  const handleDeleteImage = (index: number) => {
    setForm((prev) => {
      const list = allAttachedImages.filter((_, idx) => idx !== index);
      let nextCover = prev.imageUrl;
      if (allAttachedImages[index] === prev.imageUrl) {
        nextCover = list[0] || "";
      }
      return {
        ...prev,
        images: list,
        imageUrl: nextCover,
      };
    });
  };

  // Move image forward / backward
  const handleMoveImage = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= allAttachedImages.length) return;
    setForm((prev) => {
      const list = [...allAttachedImages];
      const item = list[fromIdx];
      list.splice(fromIdx, 1);
      list.splice(toIdx, 0, item);
      return {
        ...prev,
        images: list,
        imageUrl: prev.imageUrl || list[0] || "",
      };
    });
  };

  // Add external image URL
  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    const cleanUrl = urlInput.trim();
    setForm((prev) => {
      const list = Array.isArray(prev.images) ? [...prev.images] : [];
      if (prev.imageUrl && !list.includes(prev.imageUrl)) {
        list.unshift(prev.imageUrl);
      }
      if (!list.includes(cleanUrl)) {
        list.push(cleanUrl);
      }
      return {
        ...prev,
        imageUrl: prev.imageUrl || cleanUrl,
        images: list,
      };
    });
    setUrlInput("");
    setShowUrlInput(false);
  };

  // Add from standard crops library
  const handleAddFromSampleLibrary = (sampleUrl: string) => {
    setForm((prev) => {
      const list = Array.isArray(prev.images) ? [...prev.images] : [];
      if (prev.imageUrl && !list.includes(prev.imageUrl)) {
        list.unshift(prev.imageUrl);
      }
      if (!list.includes(sampleUrl)) {
        list.push(sampleUrl);
      }
      return {
        ...prev,
        imageUrl: prev.imageUrl || sampleUrl,
        images: list,
      };
    });
  };

  // Handle PDF file upload
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("يرجى اختيار ملف بصيغة PDF فقط.");
      return;
    }
    setIsUploadingPdf(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setForm((prev) => ({
        ...prev,
        pdfUrl: dataUrl,
        pdfName: file.name,
      }));
      setIsUploadingPdf(false);
    };
    reader.onerror = () => {
      setIsUploadingPdf(false);
      alert("حدث خطأ أثناء قراءة ملف الـ PDF.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePdf = () => {
    setForm((prev) => ({
      ...prev,
      pdfUrl: "",
      pdfName: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCover = form.imageUrl || allAttachedImages[0] || "";
    const submission: Omit<Product, "id"> = {
      ...form,
      imageUrl: finalCover,
      images: allAttachedImages,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, submission);
    } else {
      addProduct(submission);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="text-start">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 font-bold">
              <Package className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                إدارة كتالوج المحاصيل والمنتجات
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                إضافة وتعديل أصناف الخضروات والفواكه، الصور المرفقة، والمواصفات التصديرية
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:shadow-emerald-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة محصول جديد</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const count =
            cat === "الكل"
              ? products.length
              : products.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <div className="mb-2 flex justify-center text-emerald-500">
            <Sprout className="w-10 h-10" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            لا توجد محاصيل تطابق البحث
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            جرب البحث بكلمات أخرى أو اختر تصنيفاً آخر.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const cropImagesCount =
              (item.images && item.images.length > 0)
                ? item.images.length
                : item.imageUrl
                ? 1
                : 0;

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all text-start"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={
                        item.imageUrl ||
                        (item.images && item.images[0]) ||
                        "/images/products/artichoke.jpg"
                      }
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 end-3">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-xs backdrop-blur-md ${
                          item.status === "متاح للتصدير"
                            ? "bg-emerald-500 text-white"
                            : item.status === "موسم قادم"
                            ? "bg-amber-500 text-white"
                            : "bg-slate-600 text-white"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Image Counter Badge */}
                    <div className="absolute top-3 start-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
                        <ImageIcon className="w-3 h-3 text-slate-200" />
                        <span>{cropImagesCount} صور</span>
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-3 start-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
                        <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {/* PDF Badge if attached */}
                    {item.pdfUrl && (
                      <div className="absolute bottom-3 end-3">
                        <span className="rounded-lg bg-rose-600/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                          PDF مرفق
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-emerald-600">
                      {item.variety}
                    </p>

                    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                      <div>
                        <strong className="text-slate-800">الموسم:</strong>{" "}
                        {item.season}
                      </div>
                      <div>
                        <strong className="text-slate-800">التعبئة:</strong>{" "}
                        {item.pack}
                      </div>
                      <div className="line-clamp-1">
                        <strong className="text-slate-800">المواصفات:</strong>{" "}
                        {item.specs}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-slate-100 p-4 bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5 text-slate-500" />
                    <span>تعديل</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`هل أنت متأكد من حذف محصول "${item.name}"؟`)) {
                        deleteProduct(item.id);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-white hover:bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 md:p-6 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xl text-start max-h-[92vh] overflow-y-auto my-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingProduct ? "تعديل بيانات المحصول والصور" : "إضافة محصول جديد للتصدير الدولي"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  أدخل البيانات الفنية، وأرفق الصور وملف الـ PDF للمحصول
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              {/* Main Crop Name & Category */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    اسم المحصول *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="مثال: برتقال صيفي فالنسيا"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    التصنيف *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as Product["category"],
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="موالح">موالح (Citrus)</option>
                    <option value="خضروات">خضروات (Vegetables)</option>
                    <option value="فواكه">فواكه (Fruits)</option>
                    <option value="أخرى">أخرى (Other)</option>
                  </select>
                </div>
              </div>

              {/* Varieties & Season */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الأصناف والأنواع
                  </label>
                  <input
                    type="text"
                    value={form.variety}
                    onChange={(e) =>
                      setForm({ ...form, variety: e.target.value })
                    }
                    placeholder="مثال: فالنسيا، أبو صرة، ليمون"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الموسم التصديري
                  </label>
                  <input
                    type="text"
                    value={form.season}
                    onChange={(e) =>
                      setForm({ ...form, season: e.target.value })
                    }
                    placeholder="مثال: نوفمبر — مايو"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Packaging & Sizing */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    أنواع التعبئة والتغليف
                  </label>
                  <input
                    type="text"
                    value={form.pack}
                    onChange={(e) => setForm({ ...form, pack: e.target.value })}
                    placeholder="مثال: كراتين 15 كجم، أوبن توب"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    أحجام الكاليبر والمواصفات
                  </label>
                  <input
                    type="text"
                    value={form.specs}
                    onChange={(e) => setForm({ ...form, specs: e.target.value })}
                    placeholder="مثال: كاليبر 48، 56، 64، 72"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* ============================================================== */}
              {/* 📸 المكان المخصص لتنسيق وإدارة الصور المرفقة والتعديل أثناء الإضافة */}
              {/* ============================================================== */}
              <div className="rounded-3xl border-2 border-emerald-100/90 bg-gradient-to-b from-emerald-50/30 via-white to-slate-50/40 p-4 sm:p-6 space-y-4 shadow-xs">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100/80 pb-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white font-bold text-lg shadow-2xs">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>معرض الصور المرفقة للمحصول</span>
                        <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-black text-emerald-800">
                          {allAttachedImages.length} صور
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        يمكنك إضافة صور متعددة، ترتيبها، وتعيين أو تغيير صورة الغلاف الرئيسية
                      </p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => multiFileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold shadow-xs hover:shadow-emerald-600/20 active:scale-95 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>رفع صور من الجهاز</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 text-xs font-bold transition-all shadow-2xs"
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
                      <span>رابط خارجي</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowSamplePicker(!showSamplePicker)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-1.5 text-xs font-bold transition-all shadow-2xs"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>صور جاهزة</span>
                    </button>
                  </div>
                </div>

                {/* Hidden File Inputs */}
                <input
                  ref={multiFileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleBatchUpload(e.target.files)}
                  className="hidden"
                />
                <input
                  ref={singleReplaceInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (replacingImageIndex !== null && e.target.files?.[0]) {
                      handleReplaceImage(replacingImageIndex, e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {/* URL Input Box */}
                {showUrlInput && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-2 animate-fade-in shadow-2xs">
                    <label className="block text-xs font-bold text-slate-800">
                      إضافة صورة عبر رابط مباشر (URL):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddUrl();
                          }
                        }}
                        placeholder="https://images.unsplash.com/... أو رابط الصورة"
                        className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none bg-slate-50/50"
                      />
                      <button
                        type="button"
                        onClick={handleAddUrl}
                        className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold transition-all shrink-0"
                      >
                        إضافة
                      </button>
                    </div>
                  </div>
                )}

                {/* Sample crops library picker */}
                {showSamplePicker && (
                  <div className="rounded-2xl border border-emerald-200 bg-white p-3.5 space-y-2.5 animate-fade-in shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        اختر صور عالية الجودة من بنك الصور الزراعية المعتمدة:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowSamplePicker(false)}
                        className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                      >
                        ✕ إغلاق
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-1 max-h-48 overflow-y-auto">
                      {SAMPLE_CROPS_LIBRARY.map((sample, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => handleAddFromSampleLibrary(sample.url)}
                          className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/20 transition-all text-start"
                          title={`إضافة ${sample.name}`}
                        >
                          <img
                            src={sample.url}
                            alt={sample.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                            <span className="text-[9px] font-bold text-white truncate">
                              {sample.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drag and Drop Box */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleBatchUpload(e.dataTransfer.files);
                  }}
                  onClick={() => multiFileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 sm:p-5 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-emerald-500 bg-emerald-50/70 scale-[1.01]"
                      : "border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/20 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold">
                      {isProcessingImages ? (
                        <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                      ) : (
                        <Upload className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                    <div className="text-start">
                      <div className="text-xs font-bold text-slate-800">
                        {isProcessingImages
                          ? processingProgress || "جاري معالجة وضغط الصور..."
                          : "اسحب الصور وأفلتها هنا أو اضغط للاختيار من جهازك"}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        يدعم رفع عدة صور معاً (JPEG, PNG, WEBP) بضغط فوري للحفاظ على سرعة التصفح
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Image Grid with Management Toolbar */}
                {allAttachedImages.length > 0 ? (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                      <span>
                        ترتيب ظهور الصور في المعرض (الصورة المحددة بنجمة خضراء هي صورة الغلاف الرئيسية):
                      </span>
                      <span className="font-bold text-emerald-700">
                        {allAttachedImages.length} صور مرفقة
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                      {allAttachedImages.map((imgUrl, idx) => {
                        const isCover = (form.imageUrl || allAttachedImages[0]) === imgUrl;
                        return (
                          <div
                            key={idx}
                            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-2xs transition-all ${
                              isCover
                                ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                                : "border-slate-200 hover:border-slate-400 hover:shadow-xs"
                            }`}
                          >
                            {/* Thumbnail Area */}
                            <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                              <img
                                src={imgUrl}
                                alt={`Crop Photo ${idx + 1}`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                              {/* Cover Badge or Make Cover Button */}
                              <div className="absolute top-2 start-2 z-10">
                                {isCover ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white px-2 py-0.5 text-[10px] font-black shadow-xs">
                                    <span>★</span>
                                    <span>الغلاف الرئيسي</span>
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleSetCover(imgUrl)}
                                    className="inline-flex items-center gap-1 rounded-full bg-black/65 hover:bg-emerald-600 text-white backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold opacity-80 group-hover:opacity-100 transition-all shadow-xs"
                                    title="تعيين هذه الصورة كغلاف رئيسي"
                                  >
                                    <span>☆</span>
                                    <span>تعيين كغلاف</span>
                                  </button>
                                )}
                              </div>

                              {/* Index Tag */}
                              <div className="absolute bottom-2 start-2 z-10">
                                <span className="rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                  #{idx + 1}
                                </span>
                              </div>

                              {/* Lightbox Eye Button */}
                              <button
                                type="button"
                                onClick={() => setPreviewLightboxImage(imgUrl)}
                                className="absolute top-2 end-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-700 hover:text-emerald-600 hover:bg-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-xs z-10"
                                title="تكبير ومعاينة الصورة"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Toolbar on bottom of each image */}
                            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/90 p-1.5 text-xs">
                              {/* Reorder Buttons (Move Forward / Move Backward) */}
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveImage(idx, idx - 1)}
                                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-25 disabled:pointer-events-none transition-colors"
                                  title="تحريك للأمام في المعرض"
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === allAttachedImages.length - 1}
                                  onClick={() => handleMoveImage(idx, idx + 1)}
                                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-25 disabled:pointer-events-none transition-colors"
                                  title="تحريك للخلف في المعرض"
                                >
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Replace & Delete Buttons */}
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setReplacingImageIndex(idx);
                                    singleReplaceInputRef.current?.click();
                                  }}
                                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                                  title="استبدال هذه الصورة بملف آخر"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteImage(idx)}
                                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 transition-colors"
                                  title="حذف هذه الصورة"
                                >
                                  <Trash2 className="w-3 h-3 text-rose-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400 bg-slate-50/50">
                    لم تقم بإرفاق صور بعد. استخدم منطقة الرفع أعلاه لإضافة أول صورة للمحصول.
                  </div>
                )}
              </div>

              {/* PDF Datasheet Section */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-800">
                      ملف المواصفات الفنية المخصص (Technical Datasheet PDF)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      يمكنك إرفاق ملف PDF خاص بالمحصول أو الاعتماد على التوليد التلقائي لـ AgriPort
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => pdfInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors shadow-2xs"
                    >
                      <Paperclip className="w-3.5 h-3.5 text-rose-600" />
                      <span>{form.pdfUrl ? "استبدال ملف PDF" : "رفع ملف PDF"}</span>
                    </button>
                    <input
                      ref={pdfInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* PDF Attached Preview Card */}
                {form.pdfUrl ? (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50/70 p-3 shadow-2xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500 text-white font-black text-xs shadow-2xs">
                        PDF
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {form.pdfName || "Technical-Datasheet.pdf"}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          جاهز للتنزيل المباشر عند طلب المستورد
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={form.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
                      >
                        معاينة
                      </a>
                      <button
                        type="button"
                        onClick={handleRemovePdf}
                        className="rounded-lg bg-white border border-rose-200 px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      {isUploadingPdf
                        ? "جاري رفع وقراءة ملف الـ PDF..."
                        : "لم يتم إرفاق ملف PDF مخصص (سيتم توليد ملف PDF رسمي آلياً بالبيانات الفنية)"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPdfUrlInput(!showPdfUrlInput)}
                      className="text-slate-500 hover:text-emerald-600 font-semibold"
                    >
                      {showPdfUrlInput ? "إخفاء الرابط" : "أو إدخال رابط PDF خارجي"}
                    </button>
                  </div>
                )}

                {showPdfUrlInput && !form.pdfUrl && (
                  <input
                    type="url"
                    value={form.pdfUrl || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pdfUrl: e.target.value,
                        pdfName: form.pdfName || "document.pdf",
                      })
                    }
                    placeholder="https://example.com/datasheet.pdf"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none bg-white"
                  />
                )}
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الوصف التفصيلي وملاحظات الجودة للمحصول
                </label>
                <textarea
                  rows={3}
                  value={form.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="اكتب وصفاً تسويقياً وفنياً للمحصول، شروط التصدير، معايير الفرز، والجودة..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Advanced Technical Specs Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    بلد المنشأ (Country of Origin)
                  </label>
                  <input
                    type="text"
                    value={form.origin || ""}
                    onChange={(e) =>
                      setForm({ ...form, origin: e.target.value })
                    }
                    placeholder="مثال: جمهورية مصر العربية (Egypt)"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الكود الجمركي (HS Code)
                  </label>
                  <input
                    type="text"
                    value={form.hsCode || ""}
                    onChange={(e) =>
                      setForm({ ...form, hsCode: e.target.value })
                    }
                    placeholder="مثال: 0709.91.00"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    درجة حرارة الحفظ والتبريد (Cold Chain)
                  </label>
                  <input
                    type="text"
                    value={form.storageTemp || ""}
                    onChange={(e) =>
                      setForm({ ...form, storageTemp: e.target.value })
                    }
                    placeholder="مثال: 0°C — 2°C (رطوبة 95%)"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    فترة الصلاحية التقديرية (Shelf Life)
                  </label>
                  <input
                    type="text"
                    value={form.shelfLife || ""}
                    onChange={(e) =>
                      setForm({ ...form, shelfLife: e.target.value })
                    }
                    placeholder="مثال: 21 — 28 يوماً"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Export Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  حالة التصدير
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as Product["status"],
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="متاح للتصدير">متاح للتصدير (Available)</option>
                  <option value="موسم قادم">موسم قادم (Upcoming)</option>
                  <option value="نفد مؤقتاً">نفد مؤقتاً (Out of Stock)</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto text-center rounded-full border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto text-center rounded-full bg-emerald-500 hover:bg-emerald-600 px-7 py-2.5 text-xs font-bold text-white shadow-xs hover:shadow-emerald-500/20 active:scale-95 transition-all"
                >
                  {editingProduct ? "حفظ التعديلات" : "إضافة المحصول للكتالوج"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Preview Modal for Full Size Photo */}
      {previewLightboxImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-slate-900 border border-white/20 shadow-2xl p-3 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewLightboxImage}
              alt="Full Preview"
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl"
            />
            <div className="mt-3 flex items-center justify-between gap-3 w-full px-2 text-white text-xs">
              <button
                type="button"
                onClick={() => {
                  handleSetCover(previewLightboxImage);
                  setPreviewLightboxImage(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 font-bold transition-all"
              >
                <span>★</span>
                <span>تعيين كصورة الغلاف الرئيسية</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewLightboxImage(null)}
                className="rounded-full bg-white/20 hover:bg-white/30 px-4 py-2 font-bold transition-all"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
