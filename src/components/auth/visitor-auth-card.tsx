"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { useVisitorAuth } from "@/context/visitor-auth-context";
import { POPULAR_COUNTRIES, DEFAULT_COUNTRY, type CountryPhone } from "@/lib/country-phone-data";
import { authTranslations } from "@/lib/auth-translations";
import {
  validateFullName,
  validateEmailAddress,
  validatePassword,
  validatePhoneNumberByCountry,
  evaluatePasswordStrength,
} from "@/lib/auth-validation";
import {
  Eye,
  EyeOff,
  ChevronDown,
  Mail,
  User,
  ShieldCheck,
  Package,
  Check,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// SVG Icons
const EyeIcon = ({ visible }: { visible: boolean }) =>
  visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />;

const ChevronDownIcon = () => (
  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
);

export function VisitorAuthCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, dir } = useLanguage();
  const isRTL = dir === "rtl";
  const tr = authTranslations[language] || authTranslations.ar;

  const redirectParam = searchParams?.get("redirect");
  const targetDestination =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : "/";
  const cropName = searchParams?.get("cropName");

  const {
    user,
    isAuthenticated,
    loginWithEmail,
    registerUser,
    requestPasswordReset,
    verifyResetCode,
    resetPasswordWithCode,
    logout,
  } = useVisitorAuth();

  // Active view: "login" | "register" | "forgot"
  const initialTab =
    searchParams?.get("tab") === "register" || (cropName && searchParams?.get("tab") !== "login")
      ? "register"
      : searchParams?.get("tab") === "login"
      ? "login"
      : "login";
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">(initialTab);

  // Sign In State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register State (STRICTLY ONLY: name, email, password, phone with country)
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryPhone>(DEFAULT_COUNTRY);
  const [regPhone, setRegPhone] = useState("");
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  // Touch tracking for real-time validation feedback
  const [regTouched, setRegTouched] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
  });

  // Forgot Password Flow State (4 steps: "request" -> "verify" -> "reset" -> "success")
  const [forgotStep, setForgotStep] = useState<"request" | "verify" | "reset" | "success">("request");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [forgotTouched, setForgotTouched] = useState({
    email: false,
    code: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Real-time validation computation for registration
  const nameValidation = validateFullName(regName, language);
  const emailValidation = validateEmailAddress(regEmail, language);
  const passValidation = validatePassword(regPassword, language);
  const passStrength = evaluatePasswordStrength(regPassword);
  const phoneValidation = validatePhoneNumberByCountry(
    regPhone,
    selectedCountry.iso,
    language
  );

  // Real-time validation computation for forgot password
  const forgotEmailValidation = validateEmailAddress(forgotEmail, language);
  const newPassValidation = validatePassword(newPassword, language);
  const newPassStrength = evaluatePasswordStrength(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  // Feedback states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Reset form inputs
  const resetForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setShowLoginPassword(false);
    setRegName("");
    setRegEmail("");
    setRegPassword("");
    setShowRegPassword(false);
    setRegPhone("");
    setRegTouched({
      name: false,
      email: false,
      password: false,
      phone: false,
    });
    setForgotCode("");
    setNewPassword("");
    setConfirmPassword("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setForgotTouched({
      email: false,
      code: false,
      newPassword: false,
      confirmPassword: false,
    });
    setErrorMsg(null);
  };

  const handleSwitchTab = (tab: "login" | "register") => {
    setActiveTab(tab);
    resetForm();
    setSuccessMsg(null);
  };

  // Open Forgot Password View
  const handleOpenForgotPassword = () => {
    setActiveTab("forgot");
    setForgotStep("request");
    setErrorMsg(null);
    setSuccessMsg(null);
    // Prefill with login email if already typed
    if (loginEmail.trim()) {
      setForgotEmail(loginEmail.trim());
    }
  };

  // Resend Countdown Timer effect
  useEffect(() => {
    if (activeTab !== "forgot" || forgotStep !== "verify") return;
    if (resendCountdown <= 0) return;
    const interval = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab, forgotStep, resendCountdown]);

  // Capture URL error messages (e.g. returned from OAuth callback)
  useEffect(() => {
    const errorParam = searchParams?.get("error");
    if (errorParam) {
      setErrorMsg(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  // Reset form inputs upon component mount
  useEffect(() => {
    resetForm();
  }, []);

  // Close country dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setCountryPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries for selector
  const filteredCountries = POPULAR_COUNTRIES.filter((c) => {
    if (!countrySearch.trim()) return true;
    const q = countrySearch.toLowerCase().trim();
    return (
      c.nameAr.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      c.iso.toLowerCase().includes(q)
    );
  });

  // Handle Sign In Submit
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      if (!loginEmail.trim() || !loginPassword.trim()) {
        setErrorMsg(tr.fillAllFieldsError);
        setIsSubmitting(false);
        return;
      }

      const res = loginWithEmail(loginEmail, loginPassword);

      if (res.success) {
        setSuccessMsg(tr.loggedInSuccess);
        resetForm();
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = targetDestination;
          } else {
            router.push(targetDestination);
          }
        }, 500);
      } else {
        if (res.error === "email_not_found") {
          setErrorMsg(tr.emailNotFoundError);
        } else if (res.error === "invalid_password") {
          setErrorMsg(tr.invalidPasswordError);
        } else {
          setErrorMsg(tr.fillAllFieldsError);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Register Submit with real validation
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Mark all fields as touched to show errors immediately
    setRegTouched({
      name: true,
      email: true,
      password: true,
      phone: true,
    });

    // 1. Name Check
    if (!nameValidation.isValid) {
      setErrorMsg(nameValidation.error || tr.fillAllFieldsError);
      return;
    }

    // 2. Email Check
    if (!emailValidation.isValid) {
      setErrorMsg(emailValidation.error || tr.invalidEmailError);
      return;
    }

    // 3. Password Check
    if (!passValidation.isValid) {
      setErrorMsg(passValidation.error || tr.shortPasswordError);
      return;
    }

    // 4. Phone by Country Check
    if (!phoneValidation.isValid) {
      setErrorMsg(phoneValidation.error || tr.fillAllFieldsError);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = registerUser({
        name: nameValidation.formattedValue || regName,
        email: emailValidation.formattedValue || regEmail,
        password: regPassword,
        phone: phoneValidation.formattedValue || regPhone,
        countryCode: selectedCountry.dialCode,
        countryIso: selectedCountry.iso,
      });

      if (res.success) {
        setSuccessMsg(tr.registeredSuccess);
        resetForm();
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = targetDestination;
          } else {
            router.push(targetDestination);
          }
        }, 600);
      } else {
        if (res.error === "email_already_exists") {
          setErrorMsg(tr.emailAlreadyRegisteredError);
        } else {
          setErrorMsg(res.error || tr.fillAllFieldsError);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forgot Password: Step 1 (Request OTP code)
  const handleRequestResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    setForgotTouched((prev) => ({ ...prev, email: true }));

    if (!forgotEmailValidation.isValid) {
      setErrorMsg(forgotEmailValidation.error || tr.invalidEmailError);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await requestPasswordReset(forgotEmail);
      if (res.success) {
        setForgotStep("verify");
        setResendCountdown(60);
        setSuccessMsg(tr.codeSentNotice);
      } else {
        setErrorMsg(res.error || tr.emailNotFoundError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forgot Password: Resend Code
  const handleResendResetCode = async () => {
    if (resendCountdown > 0) return;
    setErrorMsg(null);
    try {
      const res = await requestPasswordReset(forgotEmail);
      if (res.success) {
        setResendCountdown(60);
        setSuccessMsg(tr.codeSentNotice);
      } else {
        setErrorMsg(res.error || tr.emailNotFoundError);
      }
    } catch {
      setErrorMsg("تعذر إعادة إرسال رمز التحقق.");
    }
  };

  // Forgot Password: Step 2 (Verify OTP code)
  const handleVerifyResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    setForgotTouched((prev) => ({ ...prev, code: true }));

    if (!forgotCode.trim() || forgotCode.trim().length !== 6) {
      setErrorMsg(
        language === "ar"
          ? "يرجى إدخال رمز التحقق المكون من 6 أرقام بالكامل."
          : "Please enter the complete 6-digit verification code."
      );
      return;
    }

    setIsSubmitting(true);
    const res = verifyResetCode(forgotEmail, forgotCode);
    setIsSubmitting(false);

    if (res.success) {
      setErrorMsg(null);
      setSuccessMsg(null);
      setForgotStep("reset");
    } else {
      setErrorMsg(res.error || "رمز التحقق غير صحيح أو انتهت صلاحيته.");
    }
  };

  // Forgot Password: Step 3 (Submit new password)
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    setForgotTouched((prev) => ({ ...prev, newPassword: true, confirmPassword: true }));

    if (!newPassValidation.isValid) {
      setErrorMsg(newPassValidation.error || tr.shortPasswordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(tr.passwordsDoNotMatch);
      return;
    }

    setIsSubmitting(true);
    const res = resetPasswordWithCode(forgotEmail, forgotCode, newPassword);
    setIsSubmitting(false);

    if (res.success) {
      setErrorMsg(null);
      setForgotStep("success");
    } else {
      setErrorMsg(res.error || "تعذر إعادة تعيين كلمة المرور، يرجى المحاولة لاحقاً.");
    }
  };

  // Finish Forgot Password and transition to Login with prefilled email
  const handleFinishResetAndLogin = () => {
    const savedEmail = forgotEmail;
    resetForm();
    setLoginEmail(savedEmail);
    setActiveTab("login");
    setForgotStep("request");
    setSuccessMsg(
      language === "ar"
        ? "تم تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول مباشرة بكلمة المرور الجديدة."
        : "Password reset successfully! You can now sign in with your new credentials."
    );
  };

  // If already authenticated: show pleasant profile summary card
  if (isAuthenticated && user) {
    return (
      <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl shadow-emerald-950/10 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-3xl font-extrabold mb-4 shadow-inner">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-200/50 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          {tr.visitorAccount}
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{user.name}</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 dir-ltr font-mono">{user.email}</p>

        {user.phone && (
          <p className="text-xs text-slate-600 mt-2 font-mono dir-ltr inline-flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
            <span>📞</span>
            <span>
              {user.countryCode} {user.phone}
            </span>
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={targetDestination}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-5 rounded-2xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98] text-sm flex items-center justify-center gap-2"
          >
            <span>
              {cropName
                ? language === "ar"
                  ? `متابعة طلب تسعير ${cropName}`
                  : `Continue Quote for ${cropName}`
                : redirectParam
                ? language === "ar"
                  ? "متابعة الطلب"
                  : "Continue Inquiry"
                : tr.backToHome}
            </span>
            <span className={isRTL ? "rotate-180" : ""}>→</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              resetForm();
              logout();
              if (typeof window !== "undefined") {
                window.location.href = "/login";
              }
            }}
            className="w-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 font-medium py-3 px-5 rounded-2xl transition-all text-sm border border-slate-200 hover:border-red-200"
          >
            {tr.logoutBtn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-2xl shadow-emerald-950/10 animate-fade-in relative overflow-hidden">
      {/* Decorative accent top glow */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600"></div>

      {/* Header section */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
          {tr.badge}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {activeTab === "login"
            ? tr.tabSignIn
            : activeTab === "register"
            ? tr.tabRegister
            : tr.forgotPasswordTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
          {activeTab === "forgot" ? tr.forgotPasswordSubtitle : tr.pageSubtitle}
        </p>
      </div>

      {/* Product Quote Notice if redirected from a product */}
      {cropName && activeTab !== "forgot" && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-emerald-950 text-xs sm:text-sm flex items-start gap-3 shadow-xs animate-fade-in text-start">
          <Package className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900">
              {language === "ar"
                ? `طلب عرض سعر محصول: ${cropName}`
                : `Quote Request for: ${cropName}`}
            </p>
            <p className="text-emerald-800 text-xs mt-1 leading-relaxed">
              {language === "ar"
                ? "يُرجى إنشاء حسابك أو تسجيل الدخول أولاً لتتمكن من إتمام طلب التسعير وحجز الشحنة بكل سهولة."
                : "Please create an account or sign in to complete your quote request easily."}
            </p>
          </div>
        </div>
      )}

      {/* TAB SWITCHER: Login / Register (Only when not in forgot password mode) */}
      {activeTab !== "forgot" && (
        <>
          {/* Tab Switcher: Login / Register */}
          <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => handleSwitchTab("login")}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === "login"
                  ? "bg-white text-emerald-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tr.tabSignIn}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab("register")}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === "register"
                  ? "bg-white text-emerald-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tr.tabRegister}
            </button>
          </div>
        </>
      )}

      {/* Error / Success Notifications */}
      {errorMsg && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200/80 rounded-2xl text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in text-start">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{errorMsg}</p>
            {errorMsg === tr.emailNotFoundError && activeTab === "login" && (
              <button
                type="button"
                onClick={() => {
                  setRegEmail(loginEmail);
                  setActiveTab("register");
                  setErrorMsg(null);
                }}
                className="mt-1 text-xs text-emerald-700 underline font-bold hover:text-emerald-900 block"
              >
                {tr.createAccountLink} ←
              </button>
            )}
          </div>
        </div>
      )}

      {successMsg && (
        <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in text-start">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="font-semibold">{successMsg}</p>
        </div>
      )}

      {/* 1. MANUAL LOGIN FORM */}
      {activeTab === "login" && (
        <form onSubmit={handleSignIn} className="space-y-4 text-start animate-fade-in">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {tr.emailLabel}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder={tr.emailPlaceholder}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden"
              />
              <span className={`absolute ${isRTL ? "left-3" : "right-3"} top-3.5 text-slate-400 pointer-events-none`}>
                <Mail className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {tr.passwordLabel}
            </label>
            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder={tr.passwordPlaceholder}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-mono"
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className={`absolute ${isRTL ? "left-3" : "right-3"} top-3.5 text-slate-400 hover:text-slate-600 transition-colors`}
                aria-label="Toggle password visibility"
              >
                <EyeIcon visible={showLoginPassword} />
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>{tr.rememberMe}</span>
            </label>
            <button
              type="button"
              onClick={handleOpenForgotPassword}
              className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
            >
              {tr.forgotPassword}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>{tr.signInBtn}</span>
            )}
          </button>

          {/* Toggle to Register */}
          <p className="text-center text-xs text-slate-500 mt-5">
            {tr.noAccountPrompt}{" "}
            <button
              type="button"
              onClick={() => handleSwitchTab("register")}
              className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              {tr.createAccountLink}
            </button>
          </p>
        </form>
      )}

      {/* 2. REGISTER FORM: STRICTLY (1) Name, (2) Email, (3) Password, (4) Country Phone */}
      {activeTab === "register" && (
        <form onSubmit={handleRegister} className="space-y-4 text-start animate-fade-in">
          {/* 1. Name (الاسم) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {tr.nameLabel} <span className="text-red-500">*</span>
              </label>
              {regTouched.name && nameValidation.isValid && (
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === "ar" ? "اسم صالح" : "Valid"}</span>
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                onBlur={() => setRegTouched((prev) => ({ ...prev, name: true }))}
                placeholder={tr.namePlaceholder}
                className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden ${
                  regTouched.name && !nameValidation.isValid
                    ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : regTouched.name && nameValidation.isValid
                    ? "border-emerald-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    : "border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                }`}
              />
              <span className={`absolute ${isRTL ? "left-3" : "right-3"} top-3.5 text-slate-400 pointer-events-none`}>
                <User className="w-4 h-4" />
              </span>
            </div>
            {regTouched.name && !nameValidation.isValid && (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>{nameValidation.error}</span>
              </p>
            )}
          </div>

          {/* 2. Email (البريد الإلكتروني) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {tr.emailLabel} <span className="text-red-500">*</span>
              </label>
              {regTouched.email && emailValidation.isValid && (
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === "ar" ? "بريد صالح" : "Valid"}</span>
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                onBlur={() => setRegTouched((prev) => ({ ...prev, email: true }))}
                placeholder={tr.emailPlaceholder}
                className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden ${
                  regTouched.email && !emailValidation.isValid
                    ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : regTouched.email && emailValidation.isValid
                    ? "border-emerald-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    : "border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                }`}
              />
              <span className={`absolute ${isRTL ? "left-3" : "right-3"} top-3.5 text-slate-400 pointer-events-none`}>
                <Mail className="w-4 h-4" />
              </span>
            </div>
            {regTouched.email && !emailValidation.isValid && (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>{emailValidation.error}</span>
              </p>
            )}
          </div>

          {/* 3. Password (كلمة المرور) مع مقياس القوة والتحقق */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {tr.passwordLabel} <span className="text-red-500">*</span>
              </label>
              {regPassword.length > 0 && (
                <span
                  className={`text-[11px] font-bold ${
                    passStrength.score >= 3
                      ? "text-emerald-600"
                      : passStrength.score === 2
                      ? "text-amber-600"
                      : "text-red-500"
                  }`}
                >
                  {language === "ar" ? passStrength.labelAr : passStrength.labelEn}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type={showRegPassword ? "text" : "password"}
                required
                minLength={8}
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                onBlur={() => setRegTouched((prev) => ({ ...prev, password: true }))}
                placeholder={tr.passwordPlaceholder}
                className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-mono ${
                  regTouched.password && !passValidation.isValid
                    ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : regTouched.password && passValidation.isValid
                    ? "border-emerald-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    : "border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowRegPassword(!showRegPassword)}
                className={`absolute ${isRTL ? "left-3" : "right-3"} top-3.5 text-slate-400 hover:text-slate-600 transition-colors`}
                aria-label="Toggle password visibility"
              >
                <EyeIcon visible={showRegPassword} />
              </button>
            </div>

            {/* Password Strength Progress Bar */}
            {regPassword.length > 0 && (
              <div className="mt-2 space-y-1.5">
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((step) => {
                    const active = passStrength.score >= step;
                    const color =
                      passStrength.score >= 3
                        ? "bg-emerald-500"
                        : passStrength.score === 2
                        ? "bg-amber-500"
                        : "bg-red-500";
                    return (
                      <div
                        key={step}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          active ? color : "bg-slate-200"
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Real-time Checklist */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] pt-0.5">
                  <span
                    className={`flex items-center gap-1 ${
                      passStrength.hasMinLength ? "text-emerald-700 font-bold" : "text-slate-400"
                    }`}
                  >
                    {passStrength.hasMinLength ? <Check className="w-3 h-3 text-emerald-600" /> : <span className="text-slate-300">○</span>}
                    <span>{language === "ar" ? "8 خانات فأكثر" : "8+ characters"}</span>
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      passStrength.hasLetter && passStrength.hasNumber
                        ? "text-emerald-700 font-bold"
                        : "text-slate-400"
                    }`}
                  >
                    {passStrength.hasLetter && passStrength.hasNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <span className="text-slate-300">○</span>}
                    <span>{language === "ar" ? "أحرف وأرقام معاً" : "Letters & numbers"}</span>
                  </span>
                </div>
              </div>
            )}

            {regTouched.password && !passValidation.isValid && (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>{passValidation.error}</span>
              </p>
            )}
          </div>

          {/* 4. Phone Number by Country (رقم الهاتف حسب الدولة) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                {tr.phoneLabel} <span className="text-red-500">*</span>
              </label>
              {regTouched.phone && phoneValidation.isValid && (
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === "ar" ? "رقم صحيح" : "Valid"}</span>
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {/* Country Selector Dropdown */}
              <div className="relative shrink-0" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                  className="h-full flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl px-3 py-3 text-xs font-bold text-slate-800 transition-all shadow-xs"
                  aria-expanded={countryPickerOpen}
                >
                  <span className="text-lg leading-none">{selectedCountry.flag}</span>
                  <span className="font-mono text-slate-700 dir-ltr">{selectedCountry.dialCode}</span>
                  <ChevronDownIcon />
                </button>

                {/* Country Search & Dropdown List */}
                {countryPickerOpen && (
                  <div
                    className={`absolute top-full mt-2 ${
                      isRTL ? "right-0" : "left-0"
                    } w-72 sm:w-80 max-h-72 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in`}
                  >
                    <div className="p-1 pb-2 border-b border-slate-100">
                      <input
                        type="text"
                        autoFocus
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder={tr.searchCountry}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-hidden focus:border-emerald-500 focus:bg-white"
                      />
                    </div>
                    <div className="max-h-52 overflow-y-auto mt-1 space-y-0.5">
                      {filteredCountries.map((c) => {
                        const isSelected = c.iso === selectedCountry.iso;
                        return (
                          <button
                            key={c.iso}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setCountryPickerOpen(false);
                              setCountrySearch("");
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                              isSelected
                                ? "bg-emerald-50 text-emerald-900 font-bold"
                                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{c.flag}</span>
                              <span>{language === "ar" ? c.nameAr : c.nameEn}</span>
                            </div>
                            <span className="font-mono font-semibold text-slate-500 dir-ltr">
                              {c.dialCode}
                            </span>
                          </button>
                        );
                      })}
                      {filteredCountries.length === 0 && (
                        <p className="text-center text-xs text-slate-400 py-3">
                          لا توجد نتائج مطابقة
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Input */}
              <div className="relative flex-1">
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ""))}
                  onBlur={() => setRegTouched((prev) => ({ ...prev, phone: true }))}
                  placeholder={selectedCountry.placeholder}
                  className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-mono dir-ltr text-start ${
                    regTouched.phone && !phoneValidation.isValid
                      ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : regTouched.phone && phoneValidation.isValid
                      ? "border-emerald-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  }`}
                />
              </div>
            </div>

            {/* Validation error if touched and invalid */}
            {regTouched.phone && !phoneValidation.isValid && (
              <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>{phoneValidation.error}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>{tr.registerBtn}</span>
            )}
          </button>

          {/* Toggle to Sign In */}
          <p className="text-center text-xs text-slate-500 mt-5">
            {tr.hasAccountPrompt}{" "}
            <button
              type="button"
              onClick={() => handleSwitchTab("login")}
              className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              {tr.signInLink}
            </button>
          </p>
        </form>
      )}

      {/* 3. FORGOT PASSWORD INTERACTIVE FLOW */}
      {activeTab === "forgot" && (
        <div className="animate-fade-in">
          {/* Stepper indicator */}
          <div className="flex items-center justify-between mb-6 px-2">
            {[
              { id: "request", label: language === "ar" ? "البريد" : "Email", num: "1" },
              { id: "verify", label: language === "ar" ? "الرمز" : "OTP Code", num: "2" },
              { id: "reset", label: language === "ar" ? "كلمة المرور" : "Password", num: "3" },
              { id: "success", label: language === "ar" ? "اكتمال" : "Done", num: "✓" },
            ].map((step, idx) => {
              const isCurrent = forgotStep === step.id;
              const isPassed =
                (forgotStep === "verify" && idx === 0) ||
                (forgotStep === "reset" && idx <= 1) ||
                (forgotStep === "success" && idx <= 2);

              return (
                <div key={step.id} className="flex items-center gap-1.5 sm:gap-2">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400/40"
                        : isPassed
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  <span
                    className={`text-[11px] font-semibold hidden sm:inline ${
                      isCurrent ? "text-slate-900" : isPassed ? "text-emerald-700" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  {idx < 3 && (
                    <div
                      className={`h-0.5 w-4 sm:w-7 rounded-full ${
                        isPassed ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Real Email Dispatched Confirmation Notice (No simulation code shown) */}
          {forgotStep === "verify" && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 text-emerald-950 text-xs sm:text-sm animate-fade-in shadow-xs text-start">
              <div className="flex items-start gap-2.5">
                <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-emerald-950">
                    {language === "ar"
                      ? "تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح"
                      : "Verification code sent to your email successfully"}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {language === "ar"
                      ? `تم إرسال رمز الأمان المكون من 6 أرقام إلى `
                      : `A 6-digit security verification code has been dispatched to `}
                    <strong className="font-mono text-emerald-800 dir-ltr inline-block font-bold">
                      {forgotEmail}
                    </strong>
                    {language === "ar"
                      ? `. يُرجى فتح صندوق الوارد (Inbox) أو التحقق من مجلد الرسائل غير المرغوب فيها (Spam).`
                      : `. Please check your Inbox or Spam folder.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Enter Email */}
          {forgotStep === "request" && (
            <form onSubmit={handleRequestResetCode} className="space-y-4 text-start animate-fade-in">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {tr.emailLabel} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    onBlur={() => setForgotTouched((prev) => ({ ...prev, email: true }))}
                    placeholder={tr.emailPlaceholder}
                    className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden ${
                      forgotTouched.email && !forgotEmailValidation.isValid
                        ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    }`}
                  />
                  <span className={`absolute ${isRTL ? "left-3" : "right-3"} top-3.5 text-slate-400 pointer-events-none`}>
                    <Mail className="w-4 h-4" />
                  </span>
                </div>
                {forgotTouched.email && !forgotEmailValidation.isValid && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>{forgotEmailValidation.error}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>{tr.sendCodeBtn}</span>
                )}
              </button>

              <div className="text-center pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className={isRTL ? "rotate-180" : ""}>←</span>
                  <span>{tr.backToLogin}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Enter 6-digit Code */}
          {forgotStep === "verify" && (
            <form onSubmit={handleVerifyResetCode} className="space-y-4 text-start animate-fade-in">
              <div className="text-center mb-2">
                <h4 className="text-base font-bold text-slate-900">{tr.enterCodeTitle}</h4>
                <p className="text-xs text-slate-500 mt-1">{tr.enterCodeSubtitle}</p>
              </div>

              {/* 6-digit input */}
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  autoFocus
                  value={forgotCode}
                  onChange={(e) => setForgotCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder={tr.otpCodePlaceholder}
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl font-bold py-3.5 bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 transition-all outline-hidden"
                />
              </div>

              {/* Resend Code Section */}
              <div className="flex items-center justify-between text-xs px-1 text-slate-500">
                <button
                  type="button"
                  onClick={() => setForgotStep("request")}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
                >
                  {tr.changeEmail}
                </button>

                {resendCountdown > 0 ? (
                  <span className="text-slate-400 font-mono">
                    {tr.resendCodeIn} ({resendCountdown}s)
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendResetCode}
                    className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                  >
                    {tr.resendCodeBtn}
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || forgotCode.trim().length !== 6}
                className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>{tr.verifyCodeBtn}</span>
                )}
              </button>

              <div className="text-center pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className={isRTL ? "rotate-180" : ""}>←</span>
                  <span>{tr.backToLogin}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Enter New Password */}
          {forgotStep === "reset" && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4 text-start animate-fade-in">
              <div className="text-center mb-2">
                <h4 className="text-base font-bold text-slate-900">{tr.newPasswordTitle}</h4>
                <p className="text-xs text-slate-500 mt-1">{tr.newPasswordSubtitle}</p>
              </div>

              {/* New Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    {tr.newPasswordTitle} <span className="text-red-500">*</span>
                  </label>
                  {newPassword.length > 0 && (
                    <span
                      className={`text-[11px] font-bold ${
                        newPassStrength.score >= 3
                          ? "text-emerald-600"
                          : newPassStrength.score === 2
                          ? "text-amber-600"
                          : "text-red-500"
                      }`}
                    >
                      {language === "ar" ? newPassStrength.labelAr : newPassStrength.labelEn}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() => setForgotTouched((prev) => ({ ...prev, newPassword: true }))}
                    placeholder={tr.passwordPlaceholder}
                    className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-mono ${
                      forgotTouched.newPassword && !newPassValidation.isValid
                        ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : forgotTouched.newPassword && newPassValidation.isValid
                        ? "border-emerald-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        : "border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={`absolute ${isRTL ? "left-3" : "right-3"} top-3.5 text-slate-400 hover:text-slate-600 transition-colors`}
                    aria-label="Toggle password visibility"
                  >
                    <EyeIcon visible={showNewPassword} />
                  </button>
                </div>

                {/* Password Strength Progress Bar */}
                {newPassword.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map((step) => {
                        const active = newPassStrength.score >= step;
                        const color =
                          newPassStrength.score >= 3
                            ? "bg-emerald-500"
                            : newPassStrength.score === 2
                            ? "bg-amber-500"
                            : "bg-red-500";
                        return (
                          <div
                            key={step}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              active ? color : "bg-slate-200"
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Real-time Checklist */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] pt-0.5">
                      <span
                        className={`flex items-center gap-1 ${
                          newPassStrength.hasMinLength ? "text-emerald-700 font-bold" : "text-slate-400"
                        }`}
                      >
                        {newPassStrength.hasMinLength ? <Check className="w-3 h-3 text-emerald-600" /> : <span className="text-slate-300">○</span>}
                        <span>{language === "ar" ? "8 خانات فأكثر" : "8+ characters"}</span>
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          newPassStrength.hasLetter && newPassStrength.hasNumber
                            ? "text-emerald-700 font-bold"
                            : "text-slate-400"
                        }`}
                      >
                        {newPassStrength.hasLetter && newPassStrength.hasNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <span className="text-slate-300">○</span>}
                        <span>{language === "ar" ? "أحرف وأرقام معاً" : "Letters & numbers"}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    {tr.confirmPasswordLabel} <span className="text-red-500">*</span>
                  </label>
                  {confirmPassword.length > 0 && (
                    <span
                      className={`text-[11px] font-bold ${
                        passwordsMatch ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {passwordsMatch ? tr.passwordsMatch : tr.passwordsDoNotMatch}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => setForgotTouched((prev) => ({ ...prev, confirmPassword: true }))}
                    placeholder={tr.confirmPasswordPlaceholder}
                    className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-mono ${
                      confirmPassword.length > 0 && !passwordsMatch
                        ? "border-red-400 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : confirmPassword.length > 0 && passwordsMatch
                        ? "border-emerald-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        : "border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute ${isRTL ? "left-3" : "right-3"} top-3.5 text-slate-400 hover:text-slate-600 transition-colors`}
                    aria-label="Toggle password visibility"
                  >
                    <EyeIcon visible={showConfirmPassword} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newPassValidation.isValid || !passwordsMatch}
                className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>{tr.saveNewPasswordBtn}</span>
                )}
              </button>

              <div className="text-center pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <span className={isRTL ? "rotate-180" : ""}>←</span>
                  <span>{tr.backToLogin}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success View */}
          {forgotStep === "success" && (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 shadow-inner mx-auto mb-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {tr.passwordResetSuccess}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                {tr.passwordResetSuccessMsg}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleFinishResetAndLogin}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] text-sm flex items-center justify-center gap-2"
                >
                  <span>{tr.tabSignIn}</span>
                  <span className={isRTL ? "rotate-180" : ""}>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Security footnote */}
      <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>{tr.securityNote}</span>
      </div>
    </div>
  );
}
