/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { useOpsStore, type Product } from "@/context/ops-store-context";

export function OpsProducts({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const { products, addProduct, updateProduct, deleteProduct } = useOpsStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    category: "موالح",
    variety: "",
    season: "",
    pack: "",
    specs: "",
    imageUrl: "",
    icon: "🍊",
    status: "متاح للتصدير",
    featured: false,
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

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setShowUrlInput(false);
    setForm({
      name: "",
      category: "موالح",
      variety: "",
      season: "",
      pack: "",
      specs: "",
      imageUrl: "",
      icon: "🍊",
      status: "متاح للتصدير",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Product) => {
    setEditingProduct(item);
    setShowUrlInput(false);
    setForm({
      name: item.name,
      category: item.category,
      variety: item.variety,
      season: item.season,
      pack: item.pack,
      specs: item.specs,
      imageUrl: item.imageUrl,
      icon: item.icon,
      status: item.status,
      featured: item.featured || false,
    });
    setIsModalOpen(true);
  };

  const processImageFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    setIsProcessingImage(true);
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
          setForm((prev) => ({ ...prev, imageUrl: dataUrl }));
        }
        setIsProcessingImage(false);
      };
      img.onerror = () => setIsProcessingImage(false);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => setIsProcessingImage(false);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, form);
    } else {
      addProduct(form);
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
              📦
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                إدارة كتالوج المحاصيل والمنتجات
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                إضافة وتعديل أصناف الخضروات والفواكه المتاحة للتصدير الدولي
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:shadow-emerald-500/20 active:scale-95 transition-all"
        >
          <span>➕</span>
          <span>إضافة محصول جديد</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
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
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
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
          <div className="text-3xl mb-2">🌿</div>
          <h3 className="text-base font-bold text-slate-800">
            لا توجد محاصيل تطابق البحث
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            جرب البحث بكلمات أخرى أو اختر تصنيفاً آخر.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs hover:border-slate-300 hover:shadow-md transition-all text-start"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={
                      item.imageUrl ||
                      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

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

                  <div className="absolute bottom-3 start-3">
                    <span className="rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
                      {item.icon} {item.category}
                    </span>
                  </div>
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
                  <span>✏️</span>
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
                  <span>🗑</span>
                  <span>حذف</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-start max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {editingProduct ? "تعديل بيانات المحصول" : "إضافة محصول جديد للتصدير"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  صورة المحصول (من المعرض / الجهاز)
                </label>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {form.imageUrl ? (
                  /* Image Preview Card */
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                    <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:bg-white hover:text-emerald-600 transition-all shadow-sm"
                        >
                          <span>🔄</span>
                          <span>تغيير الصورة من المعرض</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, imageUrl: "" }))}
                          className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-600 transition-all shadow-sm"
                        >
                          <span>🗑</span>
                          <span>حذف الصورة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Drop & Upload Area */
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-emerald-500 bg-emerald-50/50"
                        : "border-slate-300 hover:border-emerald-500 hover:bg-slate-50/80 bg-slate-50/40"
                    }`}
                  >
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 text-2xl">
                      {isProcessingImage ? "⏳" : "🖼️"}
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      {isProcessingImage
                        ? "جاري تجهيز الصورة..."
                        : "اضغط هنا لاختيار صورة من المعرض أو جهازك"}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      أو اسحب الصورة وأفلتها هنا (يدعم جميع صيغ الصور)
                    </p>
                  </div>
                )}

                {/* Optional toggle for URL */}
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="text-[11px] font-semibold text-slate-400 hover:text-emerald-600 transition-colors"
                  >
                    {showUrlInput ? "▲ إخفاء رابط الصورة" : "▼ أو إدخال رابط صورة خارجي (URL)"}
                  </button>
                </div>

                {showUrlInput && (
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    أيقونة الإيموجي
                  </label>
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    placeholder="🍊 أو 🍓 أو 🧅"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

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
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-slate-200 px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-6 py-2 text-xs font-bold text-white shadow-xs"
                >
                  {editingProduct ? "حفظ التعديلات" : "إضافة المحصول للكتالوج"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
