/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { useOpsStore } from "@/context/ops-store-context";
import { FacilityItem, FacilityCategory } from "@/lib/facilities";
import {
  Building2,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Upload,
  Link as LinkIcon,
  Star,
  Eye,
  ArrowRight,
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Layers,
  Sparkles,
  AlertTriangle,
  RotateCw,
} from "lucide-react";

export function OpsFacilities() {
  const { facilities, addFacility, updateFacility, deleteFacility, showToast } =
    useOpsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<FacilityItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState<{
    title: string;
    category: FacilityCategory;
    badge: string;
    tag: string;
    specs: string;
    desc: string;
    image: string;
    images: string[];
  }>({
    title: "",
    category: "stations",
    badge: "",
    tag: "",
    specs: "",
    desc: "",
    image: "",
    images: [],
  });

  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [replacingImageIndex, setReplacingImageIndex] = useState<number | null>(null);
  const [previewLightboxImage, setPreviewLightboxImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const singleReplaceInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: "الكل", label: "جميع المرافق" },
    { id: "stations", label: "محطات الفرز والتعبئة" },
    { id: "farms", label: "المزارع والبساتين" },
    { id: "coldchain", label: "سلسلة التبريد" },
    { id: "lab", label: "مختبرات الجودة" },
  ];

  const filtered = useMemo(() => {
    return facilities.filter((item) => {
      const matchesCat =
        selectedCategory === "الكل" ? true : item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        (item.specs && item.specs.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [facilities, selectedCategory, searchQuery]);

  const allAttachedImages = useMemo(() => {
    if (Array.isArray(form.images) && form.images.length > 0) {
      return form.images.map((img) => (img || "").trim()).filter(Boolean);
    }
    if (form.image && form.image.trim()) {
      return [form.image.trim()];
    }
    return [];
  }, [form.image, form.images]);

  const handleOpenAdd = useCallback(() => {
    setEditingFacility(null);
    setShowUrlInput(false);
    setUrlInput("");
    setReplacingImageIndex(null);
    setPreviewLightboxImage(null);
    setForm({
      title: "",
      category: "stations",
      badge: "محطة فرز وتعبئة",
      tag: "تجهيز وتعبئة",
      specs: "",
      desc: "",
      image: "",
      images: [],
    });
    setIsModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((item: FacilityItem) => {
    setEditingFacility(item);
    setShowUrlInput(false);
    setUrlInput("");
    setReplacingImageIndex(null);
    setPreviewLightboxImage(null);

    const initialImages = Array.isArray(item.images) && item.images.length > 0
      ? [...item.images]
      : item.image ? [item.image] : [];

    setForm({
      title: item.title,
      category: item.category,
      badge: item.badge || "",
      tag: item.tag || "",
      specs: item.specs || "",
      desc: item.desc || "",
      image: item.image || (initialImages[0] || ""),
      images: initialImages,
    });
    setIsModalOpen(true);
  }, []);

  // Canvas Image Compression (identical to products: 750px, quality 0.65)
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 750;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.65);
          resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  // Upload Multiple Images
  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessingImages(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
          const comp = await compressImage(file);
          compressedList.push(comp);
        }
      }

      setForm((prev) => {
        const currentImages = Array.isArray(prev.images) && prev.images.length > 0
          ? [...prev.images]
          : prev.image ? [prev.image] : [];
        const merged = [...currentImages, ...compressedList];
        const nextCover = prev.image && merged.includes(prev.image) ? prev.image : merged[0] || "";
        return {
          ...prev,
          image: nextCover,
          images: merged,
        };
      });

      showToast(`تم ضغط وإضافة ${compressedList.length} صورة للمرفق بنجاح ✓`, "success");
    } catch (err) {
      console.error("Image upload error:", err);
      showToast("حدث خطأ أثناء معالجة الصور، يرجى المحاولة بصيغة أخرى", "error");
    } finally {
      setIsProcessingImages(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Replace a single image
  const handleReplaceSingleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || replacingImageIndex === null) return;

    setIsProcessingImages(true);
    try {
      const comp = await compressImage(file);
      setForm((prev) => {
        const currentList = Array.isArray(prev.images) && prev.images.length > 0
          ? [...prev.images]
          : prev.image ? [prev.image] : [];
        const updatedList = [...currentList];
        const oldImage = updatedList[replacingImageIndex];
        updatedList[replacingImageIndex] = comp;

        let nextCover = prev.image;
        if (prev.image === oldImage || !prev.image) {
          nextCover = comp;
        }

        return {
          ...prev,
          images: updatedList,
          image: nextCover,
        };
      });
      showToast("تم استبدال الصورة بنجاح ✓", "success");
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
      const list = Array.isArray(prev.images) && prev.images.length > 0
        ? [...prev.images]
        : prev.image ? [prev.image] : [];
      if (!list.includes(imgUrl)) {
        list.push(imgUrl);
      }
      const reordered = [imgUrl, ...list.filter((x) => x !== imgUrl)];
      return {
        ...prev,
        image: imgUrl,
        images: reordered,
      };
    });
    showToast("تم تعيين الصورة كغلاف رئيسي للمرفق ✓", "info");
  };

  // Delete an image
  const handleDeleteImage = (index: number) => {
    setForm((prev) => {
      const currentList = Array.isArray(prev.images) && prev.images.length > 0
        ? [...prev.images]
        : prev.image ? [prev.image] : [];
      const deletedImg = currentList[index];
      const list = currentList.filter((_, idx) => idx !== index);
      let nextCover = prev.image;
      if (deletedImg === prev.image || !list.includes(prev.image)) {
        nextCover = list[0] || "";
      }
      return {
        ...prev,
        images: list,
        image: nextCover,
      };
    });
    showToast("تم حذف الصورة من المعرض", "info");
  };

  // Move image forward / backward
  const handleMoveImage = (fromIdx: number, toIdx: number) => {
    setForm((prev) => {
      const currentList = Array.isArray(prev.images) && prev.images.length > 0
        ? [...prev.images]
        : prev.image ? [prev.image] : [];
      if (toIdx < 0 || toIdx >= currentList.length) return prev;
      const list = [...currentList];
      const item = list[fromIdx];
      list.splice(fromIdx, 1);
      list.splice(toIdx, 0, item);
      return {
        ...prev,
        images: list,
        image: list[0] || prev.image || "",
      };
    });
  };

  // Add image by URL
  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    const cleanUrl = urlInput.trim();
    setForm((prev) => {
      const list = Array.isArray(prev.images) ? [...prev.images] : [];
      if (!list.includes(cleanUrl)) list.push(cleanUrl);
      return {
        ...prev,
        images: list,
        image: prev.image || cleanUrl,
      };
    });
    setUrlInput("");
    setShowUrlInput(false);
    showToast("تمت إضافة رابط الصورة بنجاح ✓", "success");
  };

  // Save facility
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("يرجى كتابة اسم المرفق أو المحطة", "error");
      return;
    }

    const cleanImages = allAttachedImages;
    const cleanCover = form.image || cleanImages[0] || "";

    if (editingFacility) {
      updateFacility(editingFacility.id, {
        title: form.title.trim(),
        category: form.category,
        badge: form.badge.trim() || "محطة معتمدة",
        tag: form.tag.trim() || "مرفق",
        specs: form.specs.trim(),
        desc: form.desc.trim(),
        image: cleanCover,
        images: cleanImages,
      });
    } else {
      addFacility({
        title: form.title.trim(),
        category: form.category,
        badge: form.badge.trim() || "محطة معتمدة",
        tag: form.tag.trim() || "مرفق",
        specs: form.specs.trim(),
        desc: form.desc.trim(),
        image: cleanCover,
        images: cleanImages,
      });
    }

    setIsModalOpen(false);
  };

  const getCategoryBadgeColor = (cat: FacilityCategory) => {
    switch (cat) {
      case "stations":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "farms":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "coldchain":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      case "lab":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getCategoryLabel = (cat: FacilityCategory) => {
    switch (cat) {
      case "stations":
        return "محطة فرز وتعبئة";
      case "farms":
        return "مزارع وبساتين";
      case "coldchain":
        return "سلسلة التبريد";
      case "lab":
        return "مختبر وفحص جودة";
      default:
        return cat;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden single file replace input */}
      <input
        ref={singleReplaceInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleReplaceSingleImage}
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                إدارة المرافق ومحطات التعبئة والمزارع
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                التحكم الكامل في صور، مواصفات، وتفاصيل محطات الفرز وسلسلة التبريد المعروضة للعملاء
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مرفق / محطة جديدة</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في أسماء ومواصفات المرافق..."
            className="w-full ps-9 pe-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const imagesList = Array.isArray(item.images) && item.images.length > 0
            ? item.images
            : item.image ? [item.image] : [];
          const coverImg = item.image || imagesList[0] || "";

          return (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div>
                {/* Facility Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  {coverImg ? (
                    <img
                      src={coverImg}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-400 p-4 text-center">
                      <Building2 className="w-8 h-8 text-slate-500 mb-1" />
                      <span className="text-[11px] text-slate-400">لا توجد صور مرفوعة</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 start-3 flex flex-wrap gap-1.5">
                    <span
                      className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-bold backdrop-blur-md shadow-xs ${getCategoryBadgeColor(
                        item.category
                      )}`}
                    >
                      {getCategoryLabel(item.category)}
                    </span>
                    {item.tag && (
                      <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Gallery Count Badge */}
                  <div className="absolute bottom-3 start-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white">
                      <ImageIcon className="w-3 h-3 text-emerald-400" />
                      <span>{imagesList.length} صور</span>
                    </span>
                  </div>

                  {/* Actions on Image Hover */}
                  <div className="absolute top-3 end-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      title="تعديل المرفق والصور"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-700 hover:text-emerald-600 hover:bg-white shadow-sm transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(item.id)}
                      title="حذف المرفق"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-700 hover:text-rose-600 hover:bg-white shadow-sm transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="text-[11px] font-bold text-emerald-600 mb-1">
                    {item.badge}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>

                  {item.specs && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 text-[11px] text-slate-600 font-medium flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{item.specs}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 py-2 text-xs font-bold text-slate-700 transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>تعديل المرفق والصور</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all shrink-0"
                  title="حذف المرفق"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">لا توجد مرافق مطابقة</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            لم نتمكن من العثور على أي مرفق أو محطة مطابقة لمعايير البحث الحالية.
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة مرفق جديد الآن</span>
          </button>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-slate-200 my-8 overflow-hidden text-start">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Building2 className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingFacility ? "تعديل المرفق ومحطة التعبئة" : "إضافة مرفق / محطة جديدة"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    إدارة بيانات المرفق، التصنيف، ومعرض الصور المرفقة
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
              {/* 1. Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    اسم المرفق أو المحطة <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="مثال: وحدة فرز وتجهيز الخرشوف المصري للتصدير"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    التصنيف الرئيسي <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as FacilityCategory })}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                  >
                    <option value="stations">محطات الفرز والتعبئة (stations)</option>
                    <option value="farms">المزارع والبساتين (farms)</option>
                    <option value="coldchain">سلسلة التبريد والشحن (coldchain)</option>
                    <option value="lab">مختبرات الجودة والفحص (lab)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الشارة التعريفية (Badge)
                  </label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="مثال: محطة الخرشوف المركزية، مزارع نموذجية"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    التاج / الوسم التشغيلي (Tag)
                  </label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    placeholder="مثال: تجهيز وتعبئة، تبريد سريع، فحص مخبري"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    المواصفات الفنية والطاقة الإنتاجية
                  </label>
                  <input
                    type="text"
                    value={form.specs}
                    onChange={(e) => setForm({ ...form, specs: e.target.value })}
                    placeholder="مثال: طاقة إنتاجية 40 طن/يوم • أحجام كاليبر 50، 60، 65 مم • شهادات BRC و GlobalGAP"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الوصف التفصيلي للمرفق
                  </label>
                  <textarea
                    rows={3}
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    placeholder="وصف تقنيات الفرز والتجهيز وخطوط التعبئة وسلسلة التبريد..."
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* 2. Photo Gallery & Management Section (Identical to products) */}
              <div className="border-t border-slate-200 pt-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                      <span>معرض صور المرفق ومحطة التعبئة ({allAttachedImages.length} صور)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      يمكنك رفع وحذف وتغيير ترتيب صور المرفق وتحديد الصورة الرئيسية (الغلاف) بحرية تامة
                    </p>
                  </div>

                  {/* Upload & Add URL buttons */}
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isProcessingImages}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-all active:scale-95 disabled:opacity-50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isProcessingImages ? "جاري المعالجة..." : "رفع صور من الجهاز"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>رابط صورة</span>
                    </button>
                  </div>
                </div>

                {/* Direct URL input bar */}
                {showUrlInput && (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in">
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="أدخل رابط الصورة (https://... أو /images/...)"
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddUrl}
                      className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-xs font-bold"
                    >
                      إضافة
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Images Grid */}
                {allAttachedImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {allAttachedImages.map((imgUrl, idx) => {
                      const isCover = (form.image === imgUrl) || (!form.image && idx === 0);

                      return (
                        <div
                          key={idx}
                          className={`group relative rounded-xl overflow-hidden border-2 bg-slate-100 aspect-video flex items-center justify-center transition-all ${
                            isCover ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm" : "border-slate-200"
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Facility photo ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />

                          {/* Cover Badge */}
                          {isCover && (
                            <div className="absolute top-1.5 start-1.5 z-10 flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                              <Star className="w-3 h-3 fill-current" />
                              <span>الغلاف</span>
                            </div>
                          )}

                          {/* Hover Actions Toolbar */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5 z-20">
                            <div className="flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => setPreviewLightboxImage(imgUrl)}
                                title="معاينة الصورة بالحجم الكامل"
                                className="h-6 w-6 rounded-md bg-white/90 text-slate-700 hover:bg-white flex items-center justify-center transition-all"
                              >
                                <Eye className="w-3 h-3" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteImage(idx)}
                                title="حذف الصورة نهائياً"
                                className="h-6 w-6 rounded-md bg-rose-600 text-white hover:bg-rose-700 flex items-center justify-center transition-all"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-1">
                              {/* Reorder Arrows */}
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveImage(idx, idx - 1)}
                                  title="تقديم"
                                  className="h-6 w-6 rounded-md bg-white/90 text-slate-700 hover:bg-white disabled:opacity-40 flex items-center justify-center"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === allAttachedImages.length - 1}
                                  onClick={() => handleMoveImage(idx, idx + 1)}
                                  title="تأخير"
                                  className="h-6 w-6 rounded-md bg-white/90 text-slate-700 hover:bg-white disabled:opacity-40 flex items-center justify-center"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Set as Cover */}
                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(imgUrl)}
                                  title="تعيين كغلاف رئيسي للمرفق"
                                  className="flex items-center gap-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 text-[10px] font-bold"
                                >
                                  <Star className="w-2.5 h-2.5" />
                                  <span>غلاف</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all"
                  >
                    <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">لا توجد صور مرفقة بهذا المرفق حتى الآن</p>
                    <p className="text-[11px] text-slate-400 mt-1">اضغط هنا لرفع صور للمرفق من جهازك أو أضف رابط صورة مباشر</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-200 pt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-2 text-xs font-bold text-slate-700 transition-all"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isProcessingImages}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 text-xs font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50"
                >
                  {editingFacility ? "حفظ التعديلات" : "إضافة المرفق الآن"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-start">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 border border-rose-100">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </span>
              <h3 className="text-base font-bold text-slate-900">تأكيد حذف المرفق</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              هل أنت متأكد من رغبتك في حذف هذا المرفق نهائياً؟ سيتم إزالته من صفحة المرافق والمحطات ولن يظهر للعملاء والزوار.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700"
              >
                تراجع
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteFacility(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 text-xs font-bold shadow-xs active:scale-95"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Image Preview Modal */}
      {previewLightboxImage && (
        <div
          onClick={() => setPreviewLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setPreviewLightboxImage(null)}
              className="absolute -top-10 end-0 text-white/80 hover:text-white flex items-center gap-1.5 text-xs font-bold bg-white/10 px-3 py-1 rounded-full"
            >
              <X className="w-4 h-4" />
              <span>إغلاق المعاينة</span>
            </button>
            <img
              src={previewLightboxImage}
              alt="Facility preview"
              className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
