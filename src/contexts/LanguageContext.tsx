"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/config/locales";
import type { Dictionary } from "@/i18n/types";

type LanguageContextValue = {
  locale: Locale;

  /** String-based (legacy) */
  t: (key: string) => string;

  /** Typed namespace access */
  tn: <K extends keyof Dictionary>(key: K) => Dictionary[K];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: unknown, path: string): string | undefined {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (typeof acc === "object" && acc !== null) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as string | undefined;
}

export function LanguageProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  function t(key: string): string {
    return getNestedValue(dictionary, key) ?? key;
  }

  function tn<K extends keyof Dictionary>(key: K): Dictionary[K] {
    return dictionary[key];
  }

  return (
    <LanguageContext.Provider value={{ locale, t, tn }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
