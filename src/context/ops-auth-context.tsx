"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type OpsUser = {
  email: string;
  name: string;
  role: string;
};

type OpsAuthContextType = {
  isAuthenticated: boolean;
  user: OpsUser | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  isLoading: boolean;
};

const OpsAuthContext = createContext<OpsAuthContextType | undefined>(undefined);

export const AUTH_STORAGE_KEY = "agriport_ops_auth_session";
export const AUTH_EVENT = "agriport_ops_auth_change";
const CUSTOM_CREDS_KEY = "agriport_ops_custom_creds";

export const DEFAULT_OPS_CREDENTIALS = {
  email: "ops@agriport.com",
  password: "ops",
  name: "مدير العمليات والتصدير",
  role: "Operations & Trade Director",
};

function subscribeAuth(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

let cachedUser: OpsUser | null = null;
let cachedUserRaw: string | null = null;

function getAuthSnapshot(): OpsUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (raw === cachedUserRaw) return cachedUser;
  if (!raw) {
    cachedUser = null;
    cachedUserRaw = null;
    return null;
  }
  try {
    cachedUser = JSON.parse(raw);
    cachedUserRaw = raw;
    return cachedUser;
  } catch {
    return null;
  }
}

export function OpsAuthProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const user = useSyncExternalStore(subscribeAuth, getAuthSnapshot, () => null);

  // During hydration wait until state is settled
  const isLoading = !isHydrated;
  const isAuthenticated = isHydrated && !!user;

  const login = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    let targetEmail = DEFAULT_OPS_CREDENTIALS.email.toLowerCase();
    let targetPass = DEFAULT_OPS_CREDENTIALS.password;

    if (typeof window !== "undefined") {
      const storedCreds = localStorage.getItem(CUSTOM_CREDS_KEY);
      if (storedCreds) {
        try {
          const parsed = JSON.parse(storedCreds);
          if (parsed.email) targetEmail = parsed.email.toLowerCase();
          if (parsed.password) targetPass = parsed.password;
        } catch {
          // fallback to defaults
        }
      }
    }

    if (cleanEmail === targetEmail && cleanPass === targetPass) {
      const opsData: OpsUser = {
        email: targetEmail,
        name: DEFAULT_OPS_CREDENTIALS.name,
        role: DEFAULT_OPS_CREDENTIALS.role,
      };

      const raw = JSON.stringify(opsData);
      localStorage.setItem(AUTH_STORAGE_KEY, raw);
      if (typeof document !== "undefined") {
        document.cookie = "agriport_ops_session=1; path=/; max-age=2592000; SameSite=Lax";
      }
      cachedUser = opsData;
      cachedUserRaw = raw;
      window.dispatchEvent(new Event(AUTH_EVENT));
      return { success: true };
    }

    return {
      success: false,
      error: "بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.",
    };
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      if (typeof document !== "undefined") {
        document.cookie = "agriport_ops_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      }
      cachedUser = null;
      cachedUserRaw = null;
      window.dispatchEvent(new Event(AUTH_EVENT));
    }
  };

  return (
    <OpsAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </OpsAuthContext.Provider>
  );
}

export function useOpsAuth() {
  const context = useContext(OpsAuthContext);
  if (!context) {
    throw new Error("useOpsAuth must be used within an OpsAuthProvider");
  }
  return context;
}
