"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/config/locales";
import type { Dictionary } from "@/i18n/types";

type LanguageContextValue = {
  locale: Locale;

  /** String-based (legacy) */
  t: (key: string) => string;

  /** Typed namespace access */
  tn: <K extends keyof Dictionary>(key: K) => Readonly<Dictionary[K]>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedString(obj: unknown, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (typeof acc === "object" && acc !== null) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof value === "string" ? value : undefined;
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
  const t = (key: string): string => getNestedString(dictionary, key) ?? key;

  const tn = <K extends keyof Dictionary>(key: K): Readonly<Dictionary[K]> =>
    dictionary[key];

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
