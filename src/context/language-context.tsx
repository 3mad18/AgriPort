"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  SUPPORTED_LANGUAGES,
  translations,
  type Language,
  type LanguageOption,
} from "@/lib/i18n";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentLangInfo: LanguageOption;
  dir: "rtl" | "ltr";
  t: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "agrinile_preferred_language";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("languagechange_custom", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("languagechange_custom", callback);
  };
}

function getSnapshot(): Language {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (saved && SUPPORTED_LANGUAGES.some((item) => item.code === saved)) {
    return saved;
  }
  return "en";
}

function getServerSnapshot(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem(STORAGE_KEY, lang);
    const matched = SUPPORTED_LANGUAGES.find((item) => item.code === lang);
    if (matched) {
      document.documentElement.lang = matched.code;
      document.documentElement.dir = matched.dir;
    }
    window.dispatchEvent(new Event("languagechange_custom"));
  }, []);

  const currentLangInfo =
    SUPPORTED_LANGUAGES.find((item) => item.code === language) ??
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = currentLangInfo.code;
      document.documentElement.dir = currentLangInfo.dir;
      document.documentElement.classList.remove("lang-hydrating");
    }
  }, [currentLangInfo]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLangInfo,
        dir: currentLangInfo.dir,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
