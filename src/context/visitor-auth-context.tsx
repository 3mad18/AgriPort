"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  validateFullName,
  validateEmailAddress,
  validatePassword,
  validatePhoneNumberByCountry,
} from "@/lib/auth-validation";
import { identifyUser, trackEvent, upgradeSession, setTag } from "@/lib/clarity";

export type VisitorUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  countryCode?: string;
  countryIso?: string;
  avatar?: string;
  provider: "email" | "google" | "apple";
  createdAt: string;
};

export type RegisteredAccount = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  countryCode: string;
  countryIso: string;
  createdAt: string;
};

type VisitorAuthContextType = {
  user: VisitorUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithEmail: (email: string, pass: string) => { success: boolean; error?: string };
  registerUser: (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    countryCode: string;
    countryIso: string;
  }) => { success: boolean; error?: string };
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string; emailSent?: boolean }>;
  verifyResetCode: (email: string, code: string) => { success: boolean; error?: string };
  resetPasswordWithCode: (email: string, code: string, newPassword: string) => { success: boolean; error?: string };
  logout: () => void;
  registeredUsersCount: number;
};

const VisitorAuthContext = createContext<VisitorAuthContextType | undefined>(undefined);

export const VISITOR_SESSION_KEY = "agriport_visitor_session";
export const VISITOR_USERS_KEY = "agriport_visitor_registered_accounts";
export const VISITOR_AUTH_EVENT = "agriport_visitor_auth_change";

let cachedVisitorUser: VisitorUser | null = null;
let cachedVisitorUserRaw: string | null = null;

export function saveVisitorSession(user: VisitorUser | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(VISITOR_SESSION_KEY);
    cachedVisitorUser = null;
    cachedVisitorUserRaw = null;
  } else {
    const raw = JSON.stringify(user);
    localStorage.setItem(VISITOR_SESSION_KEY, raw);
    cachedVisitorUser = user;
    cachedVisitorUserRaw = raw;
  }
  window.dispatchEvent(new Event(VISITOR_AUTH_EVENT));
}

function getRegisteredAccounts(): RegisteredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(VISITOR_USERS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((acc) => acc.email !== "demo@agriport.com");
    }
    return [];
  } catch {
    return [];
  }
}

function saveRegisteredAccounts(accounts: RegisteredAccount[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(VISITOR_USERS_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error("Failed to save registered accounts", err);
  }
}

function subscribeVisitorAuth(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(VISITOR_AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(VISITOR_AUTH_EVENT, callback);
  };
}

export function getVisitorAuthSnapshot(): VisitorUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(VISITOR_SESSION_KEY);
  if (raw === cachedVisitorUserRaw) return cachedVisitorUser;
  if (!raw) {
    cachedVisitorUser = null;
    cachedVisitorUserRaw = null;
    return null;
  }
  try {
    cachedVisitorUser = JSON.parse(raw);
    cachedVisitorUserRaw = raw;
    return cachedVisitorUser;
  } catch {
    cachedVisitorUser = null;
    cachedVisitorUserRaw = null;
    return null;
  }
}

const emptySubscribe = () => () => {};

export function VisitorAuthProvider({ children }: { children: ReactNode }) {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const user = useSyncExternalStore(subscribeVisitorAuth, getVisitorAuthSnapshot, () => null);

  const isLoading = !isHydrated;
  const isAuthenticated = isHydrated && !!user;

  const loginWithEmail = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: "empty_fields" };
    }

    const accounts = getRegisteredAccounts();
    const account = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    if (!account) {
      return { success: false, error: "email_not_found" };
    }

    if (account.passwordHash !== cleanPass) {
      return { success: false, error: "invalid_password" };
    }

    const sessionUser: VisitorUser = {
      id: account.id,
      name: account.name,
      email: account.email,
      phone: account.phone,
      countryCode: account.countryCode,
      countryIso: account.countryIso,
      provider: "email",
      createdAt: account.createdAt,
    };

    saveVisitorSession(sessionUser);

    try {
      identifyUser(sessionUser.id, undefined, undefined, sessionUser.name);
      setTag("user_role", "registered_client");
      trackEvent("user_login");
    } catch {}

    return { success: true };
  };

  const registerUser = (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    countryCode: string;
    countryIso: string;
  }) => {
    // 1. Validate Full Name
    const nameVal = validateFullName(data.name);
    if (!nameVal.isValid) {
      return { success: false, error: nameVal.error };
    }

    // 2. Validate Email
    const emailVal = validateEmailAddress(data.email);
    if (!emailVal.isValid) {
      return { success: false, error: emailVal.error };
    }

    const cleanEmail = emailVal.formattedValue || data.email.trim().toLowerCase();

    // Check existing email
    const accounts = getRegisteredAccounts();
    const existing = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: "email_already_exists" };
    }

    // 3. Validate Password
    const passVal = validatePassword(data.password);
    if (!passVal.isValid) {
      return { success: false, error: passVal.error };
    }

    // 4. Validate Phone by Country
    const phoneVal = validatePhoneNumberByCountry(
      data.phone,
      data.countryIso || "EG"
    );
    if (!phoneVal.isValid) {
      return { success: false, error: phoneVal.error };
    }

    const newAccount: RegisteredAccount = {
      id: "usr_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: nameVal.formattedValue || data.name.trim(),
      email: cleanEmail,
      passwordHash: data.password.trim(),
      phone: phoneVal.formattedValue || data.phone.trim(),
      countryCode: data.countryCode || "+20",
      countryIso: data.countryIso || "EG",
      createdAt: new Date().toISOString(),
    };

    accounts.push(newAccount);
    saveRegisteredAccounts(accounts);

    // Sync newly registered account to API & cloud store
    try {
      fetch("/api/registered-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newAccount.id,
          name: newAccount.name,
          email: newAccount.email,
          phone: newAccount.phone,
          countryCode: newAccount.countryCode,
          countryIso: newAccount.countryIso,
          passwordHash: newAccount.passwordHash,
        }),
      }).catch((e) => console.warn("Could not sync registered user to API:", e));
    } catch {}

    // Automatically authenticate the newly registered user
    const sessionUser: VisitorUser = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      phone: newAccount.phone,
      countryCode: newAccount.countryCode,
      countryIso: newAccount.countryIso,
      provider: "email",
      createdAt: newAccount.createdAt,
    };

    saveVisitorSession(sessionUser);

    try {
      identifyUser(sessionUser.id, undefined, undefined, sessionUser.name);
      setTag("user_role", "registered_client");
      trackEvent("user_registered");
      upgradeSession("user_registration");
    } catch {}

    return { success: true };
  };

  const requestPasswordReset = async (
    email: string
  ): Promise<{ success: boolean; error?: string; emailSent?: boolean }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: "يرجى إدخال البريد الإلكتروني" };
    }

    const accounts = getRegisteredAccounts();
    const account = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    if (!account) {
      return {
        success: false,
        error: "هذا البريد الإلكتروني غير مسجل لدينا، يرجى التأكد أو إنشاء حساب جديد.",
      };
    }

    // Generate real 6-digit random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const tokenData = {
      code,
      email: cleanEmail,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem(`agriport_reset_${cleanEmail}`, JSON.stringify(tokenData));
    }

    let emailSent = false;
    try {
      const response = await fetch("/api/auth/send-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          code,
          name: account.name,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        emailSent = Boolean(data.emailSent);
      }
    } catch (err) {
      console.warn("Could not dispatch reset email via API route:", err);
    }

    return { success: true, emailSent };
  };

  const verifyResetCode = (email: string, code: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    if (typeof window === "undefined") return { success: false, error: "تعذر التحقق" };

    const raw = sessionStorage.getItem(`agriport_reset_${cleanEmail}`);
    if (!raw) {
      return { success: false, error: "لم يتم العثور على طلب استعادة صالح أو انتهت صلاحيته." };
    }

    try {
      const data = JSON.parse(raw);
      if (Date.now() > data.expiresAt) {
        sessionStorage.removeItem(`agriport_reset_${cleanEmail}`);
        return { success: false, error: "انتهت صلاحية رمز التحقق، يرجى طلب رمز جديد." };
      }
      if (data.code !== cleanCode) {
        return { success: false, error: "رمز التحقق غير صحيح، يرجى التأكد وإعادة المحاولة." };
      }
      return { success: true };
    } catch {
      return { success: false, error: "رمز التحقق غير صالح." };
    }
  };

  const resetPasswordWithCode = (email: string, code: string, newPass: string) => {
    const verifyRes = verifyResetCode(email, code);
    if (!verifyRes.success) {
      return verifyRes;
    }

    const passVal = validatePassword(newPass);
    if (!passVal.isValid) {
      return { success: false, error: passVal.error };
    }

    const cleanEmail = email.trim().toLowerCase();
    const accounts = getRegisteredAccounts();
    const accountIndex = accounts.findIndex((acc) => acc.email.toLowerCase() === cleanEmail);

    if (accountIndex === -1) {
      return { success: false, error: "الحساب غير موجود." };
    }

    // Update password
    accounts[accountIndex].passwordHash = newPass.trim();
    saveRegisteredAccounts(accounts);

    // Clear reset token
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(`agriport_reset_${cleanEmail}`);
    }

    return { success: true };
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      saveVisitorSession(null);
    }
  };

  const registeredUsersCount = getRegisteredAccounts().length;

  return (
    <VisitorAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        loginWithEmail,
        registerUser,
        requestPasswordReset,
        verifyResetCode,
        resetPasswordWithCode,
        logout,
        registeredUsersCount,
      }}
    >
      {children}
    </VisitorAuthContext.Provider>
  );
}

export function useVisitorAuth() {
  const context = useContext(VisitorAuthContext);
  if (!context) {
    throw new Error("useVisitorAuth must be used within a VisitorAuthProvider");
  }
  return context;
}
