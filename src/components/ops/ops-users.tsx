"use client";

import { useState, useMemo } from "react";
import { useOpsStore, type RegisteredUserRecord } from "@/context/ops-store-context";
import { POPULAR_COUNTRIES, DEFAULT_COUNTRY, type CountryPhone } from "@/lib/country-phone-data";
import { triggerOpsToast } from "@/components/ops/ops-toast";
import {
  Users,
  UserPlus,
  FileSpreadsheet,
  Search,
  X,
  Copy,
  Check,
  MessageCircle,
  Package,
  Eye,
  Trash2,
  Sparkles,
  Globe,
  AlertCircle,
} from "lucide-react";

export function OpsUsers() {
  const { registeredUsers, deleteRegisteredUser, addRegisteredUser, inquiries } = useOpsStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);

  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUserDetail, setSelectedUserDetail] = useState<RegisteredUserRecord | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<RegisteredUserRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New user form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCountry, setNewCountry] = useState<CountryPhone>(DEFAULT_COUNTRY);
  const [newPassword, setNewPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Filter & Sort Users
  const filteredUsers = useMemo(() => {
    return registeredUsers
      .filter((u) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query) ||
          (u.phone && u.phone.includes(query)) ||
          (u.countryCode && u.countryCode.includes(query));

        const matchesCountry =
          selectedCountryFilter === "all" ||
          u.countryIso?.toUpperCase() === selectedCountryFilter.toUpperCase() ||
          u.countryCode === selectedCountryFilter;

        return matchesQuery && matchesCountry;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name, "ar");
        }
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortBy === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [registeredUsers, searchQuery, selectedCountryFilter, sortBy]);

  // Unique countries in the database
  const availableCountries = useMemo(() => {
    const map = new Map<string, string>();
    registeredUsers.forEach((u) => {
      if (u.countryIso) {
        map.set(u.countryIso.toUpperCase(), u.countryCode || "");
      }
    });
    return Array.from(map.entries()).map(([iso, code]) => {
      const match = POPULAR_COUNTRIES.find((c) => c.iso === iso);
      return {
        iso,
        code,
        name: match ? match.nameAr : iso,
        flag: match ? match.flag : "🌐",
      };
    });
  }, [registeredUsers]);

  // Statistics
  const totalCount = registeredUsers.length;
  const recentCount = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return registeredUsers.filter((u) => new Date(u.createdAt).getTime() >= sevenDaysAgo).length;
  }, [registeredUsers]);

  const uniqueCountriesCount = useMemo(() => {
    return new Set(registeredUsers.map((u) => u.countryIso || "EG")).size;
  }, [registeredUsers]);

  // Copy Email Helper
  const handleCopyEmail = (email: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmailId(id);
      triggerOpsToast(`تم نسخ البريد: ${email}`, "info", "نسخ");
      setTimeout(() => setCopiedEmailId(null), 2000);
    }
  };

  // Export to CSV File with UTF-8 BOM for Excel
  const handleExportCSV = () => {
    if (registeredUsers.length === 0) {
      triggerOpsToast("لا توجد بيانات عملاء لتصديرها", "error", "تنبيه");
      return;
    }

    const headers = [
      "مُعرف العميل (ID)",
      "اسم العميل",
      "البريد الإلكتروني",
      "كود الدولة",
      "رقم الهاتف",
      "كود الدولة ISO",
      "تاريخ ووقت التسجيل",
    ];

    const rows = registeredUsers.map((u) => [
      `"${u.id}"`,
      `"${u.name.replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${u.countryCode || ""}"`,
      `"${u.phone ? `${u.countryCode || ""}${u.phone}` : ""}"`,
      `"${u.countryIso || ""}"`,
      `"${new Date(u.createdAt).toLocaleString("ar-EG")}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `agriport-registered-clients-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerOpsToast("تم تصدير ملف العملاء بصيغة CSV بنجاح 📥", "success", "تصدير البيانات");
  };

  // Add User Submission
  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newName.trim()) {
      setFormError("يرجى إدخال اسم العميل بالكامل");
      return;
    }
    if (!newEmail.trim() || !newEmail.includes("@")) {
      setFormError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await addRegisteredUser({
        name: newName.trim(),
        email: newEmail.trim(),
        phone: newPhone.trim(),
        countryCode: newCountry.dialCode,
        countryIso: newCountry.iso,
        password: newPassword.trim() || "12345678",
      });

      if (res.success) {
        setIsAddUserModalOpen(false);
        setNewName("");
        setNewEmail("");
        setNewPhone("");
        setNewPassword("");
        setNewCountry(DEFAULT_COUNTRY);
      } else {
        setFormError(res.error || "تعذر إضافة الحساب");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete User Confirmation
  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    setIsSubmitting(true);
    try {
      await deleteRegisteredUser(deleteCandidate.id);
      setDeleteCandidate(null);
      if (selectedUserDetail?.id === deleteCandidate.id) {
        setSelectedUserDetail(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Count inquiries for user
  const getUserInquiries = (user: RegisteredUserRecord) => {
    const cleanUserEmail = user.email.toLowerCase();
    const cleanUserPhone = (user.phone || "").replace(/\D/g, "");
    return inquiries.filter((inq) => {
      if (inq.email && inq.email.toLowerCase() === cleanUserEmail) return true;
      if (cleanUserPhone && inq.phone && inq.phone.replace(/\D/g, "").includes(cleanUserPhone)) return true;
      return false;
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              قاعدة بيانات العملاء والمستخدمين المسجلين
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            متابعة وإدارة حسابات العملاء المسجلين عبر منصة AgriPort للتصدير مع إمكانية التواصل الفوري والتصدير
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
            title="تصدير كملف إكسل متوافق مع اللغة العربية"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>تصدير Excel (CSV)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormError(null);
              setIsAddUserModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة عميل يدوياً</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              إجمالي الحسابات
            </span>
            <span className="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {totalCount}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              حساب نشط
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            عملاء ومستوردون مسجلون بالموقع
          </p>
        </div>

        {/* New Registrations This Week */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              تسجيلات هذا الأسبوع
            </span>
            <span className="h-9 w-9 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-teal-700 tracking-tight">
              {recentCount}
            </span>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-full">
              خلال 7 أيام
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            انضموا حديثاً لمنظومة التصدير
          </p>
        </div>

        {/* WhatsApp Ready */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              متاحون عبر واتساب
            </span>
            <span className="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-800 tracking-tight">
              {registeredUsers.filter((u) => Boolean(u.phone)).length}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              هاتف موثق
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            تواصل فوري بنقرة واحدة
          </p>
        </div>

        {/* Countries Represented */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              الدول والأسواق
            </span>
            <span className="h-9 w-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-4.5 h-4.5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-800 tracking-tight">
              {uniqueCountriesCount}
            </span>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
              دولة
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">
            تنوع جغرافي لشركاء التصدير
          </p>
        </div>
      </div>

      {/* 3. Search & Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم، الإيميل أو رقم الهاتف..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-2.5 ps-10 pe-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
          />
          <span className="absolute inset-y-0 start-3.5 flex items-center text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 end-3 flex items-center text-slate-400 hover:text-slate-600 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Country Filter */}
          <select
            value={selectedCountryFilter}
            onChange={(e) => setSelectedCountryFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="all">جميع الدول ({totalCount})</option>
            {availableCountries.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="newest">الأحدث تسجيلاً</option>
            <option value="oldest">الأقدم تسجيلاً</option>
            <option value="name">الاسم أبجدياً</option>
          </select>
        </div>
      </div>

      {/* 4. Users Table / List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="py-20 px-4 text-center">
            <div className="mx-auto w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {searchQuery || selectedCountryFilter !== "all"
                ? "لم يتم العثور على نتائج مطابقة للبحث"
                : "لا توجد حسابات عملاء مسجلة حتى الآن"}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              {searchQuery || selectedCountryFilter !== "all"
                ? "جرب تعديل كلمات البحث أو تصفية الدولة لإظهار النتائج المطلوبة."
                : "بمجرد قيام أي زائر أو مستورد بإنشاء حساب من صفحة تسجيل الدخول بالموقع، ستظهر كافة بياناته في هذا الجدول فوراً وبشكل تلقائي."}
            </p>
            {searchQuery || selectedCountryFilter !== "all" ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountryFilter("all");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                إعادة ضبط الفلاتر
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setFormError(null);
                  setIsAddUserModalOpen(true);
                }}
                className="mt-5 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 inline-flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>إضافة أول عميل الآن</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-500 font-bold">
                  <th className="py-4 px-6 text-start">العميل</th>
                  <th className="py-4 px-6 text-start">البريد الإلكتروني</th>
                  <th className="py-4 px-6 text-start">رقم الهاتف والتواصل</th>
                  <th className="py-4 px-6 text-start">الدولة</th>
                  <th className="py-4 px-6 text-start">تاريخ التسجيل</th>
                  <th className="py-4 px-6 text-start">الطلبات المرتبطة</th>
                  <th className="py-4 px-6 text-end">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => {
                  const countryMatch = POPULAR_COUNTRIES.find(
                    (c) => c.iso === user.countryIso?.toUpperCase()
                  );
                  const flag = countryMatch?.flag || "🌐";
                  const countryName = countryMatch?.nameAr || user.countryIso || "غير محدد";
                  const userInquiries = getUserInquiries(user);
                  const cleanPhone = (user.phone || "").replace(/\s+/g, "");
                  const fullPhone = user.phone ? `${user.countryCode || ""}${cleanPhone}` : "";
                  const waLink = fullPhone
                    ? `https://wa.me/${fullPhone.replace("+", "")}`
                    : null;

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Name & Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              ID: {user.id.slice(0, 10)}...
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email with copy */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-slate-700 dir-ltr select-all">
                            {user.email}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(user.email, user.id)}
                            className="p-1 text-slate-400 hover:text-emerald-600 rounded-md transition-colors"
                            title="نسخ البريد"
                          >
                            {copiedEmailId === user.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Phone with WhatsApp & Call */}
                      <td className="py-4 px-6">
                        {user.phone ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-slate-700 dir-ltr text-[11px]">
                              {user.countryCode} {user.phone}
                            </span>
                            {waLink && (
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold transition-colors border border-emerald-200"
                                title="مراسلة عبر واتساب"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>واتساب</span>
                              </a>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px] italic">
                            لم يسجل هاتف
                          </span>
                        )}
                      </td>

                      {/* Country */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{flag}</span>
                          <span className="font-medium text-slate-700">{countryName}</span>
                        </div>
                      </td>

                      {/* Registered Date */}
                      <td className="py-4 px-6">
                        <div className="text-slate-600">
                          <p className="font-medium">
                            {new Date(user.createdAt).toLocaleDateString("ar-EG", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {new Date(user.createdAt).toLocaleTimeString("ar-EG", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </td>

                      {/* Associated Inquiries */}
                      <td className="py-4 px-6">
                        {userInquiries.length > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
                            <Package className="w-3.5 h-3.5 text-teal-600" />
                            <span>{userInquiries.length} طلب تصدير</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">
                            حساب جديد
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedUserDetail(user)}
                            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                            title="عرض تفاصيل الحساب"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteCandidate(user)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            title="حذف الحساب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. User Details Modal */}
      {selectedUserDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-start relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSelectedUserDetail(null)}
              className="absolute top-6 end-6 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center text-xl font-bold shadow-md">
                {selectedUserDetail.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedUserDetail.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  ID: {selectedUserDetail.id}
                </p>
              </div>
            </div>

            <div className="py-5 space-y-3.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-bold">البريد الإلكتروني:</span>
                <span className="font-mono text-slate-800 dir-ltr font-bold select-all">
                  {selectedUserDetail.email}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-bold">رقم الهاتف:</span>
                <span className="font-mono text-slate-800 dir-ltr font-bold">
                  {selectedUserDetail.countryCode} {selectedUserDetail.phone || "غير محدد"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-bold">الدولة:</span>
                <span className="font-bold text-slate-800">
                  {selectedUserDetail.countryIso} ({selectedUserDetail.countryCode})
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-bold">تاريخ التسجيل:</span>
                <span className="font-medium text-slate-700">
                  {new Date(selectedUserDetail.createdAt).toLocaleString("ar-EG")}
                </span>
              </div>

              {/* Inquiry History */}
              <div className="pt-2">
                <span className="text-slate-600 font-bold block mb-2">
                  الطلبات المرتبطة بهذا العميل ({getUserInquiries(selectedUserDetail).length}):
                </span>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {getUserInquiries(selectedUserDetail).length === 0 ? (
                    <p className="text-slate-400 italic">لا توجد طلبات تصدير مسجلة لهذا الحساب بعد.</p>
                  ) : (
                    getUserInquiries(selectedUserDetail).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-[11px]"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{inq.product}</p>
                          <p className="text-slate-500 text-[10px]">{inq.date}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-md font-bold text-emerald-800 bg-emerald-100/70">
                          {inq.status}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              {selectedUserDetail.phone && (
                <a
                  href={`https://wa.me/${(selectedUserDetail.countryCode + selectedUserDetail.phone).replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>مراسلة واتساب</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedUserDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-start relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsAddUserModalOpen(false)}
              className="absolute top-6 end-6 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <UserPlus className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  إضافة حساب عميل جديد
                </h3>
                <p className="text-xs text-slate-500">
                  تسجيل بيانات العميل أو المستورد يدوياً في لوحة العمل
                </p>
              </div>
            </div>

            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  اسم العميل أو جهة الاستيراد *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: أحمد عبد الله أو Bavaria Fresh Fruits"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dir-ltr"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  الدولة ورقم الهاتف
                </label>
                <div className="flex gap-2">
                  <select
                    value={newCountry.iso}
                    onChange={(e) => {
                      const match = POPULAR_COUNTRIES.find((c) => c.iso === e.target.value);
                      if (match) setNewCountry(match);
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none shrink-0"
                  >
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.iso} value={c.iso}>
                        {c.flag} {c.nameAr} ({c.dialCode})
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="100 000 0000"
                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dir-ltr font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  كلمة المرور الافتراضية
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="اتركها فارغة لاستخدام: 12345678"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dir-ltr font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  يمكن للعميل تسجيل الدخول بها أو استعادة كلمة المرور لاحقاً عبر بريده.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "جاري الحفظ..." : "حفظ العميل"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              حذف حساب العميل؟
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              هل أنت متأكد من رغبتك في حذف حساب العميل{" "}
              <strong className="text-slate-800">{deleteCandidate.name}</strong> ({deleteCandidate.email})؟ لن يتمكن العميل من تسجيل الدخول بعد الحذف.
            </p>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex-1"
              >
                إلغاء
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmDelete}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors disabled:opacity-50 flex-1 shadow-md shadow-rose-600/20"
              >
                {isSubmitting ? "جاري الحذف..." : "تأكيد الحذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
