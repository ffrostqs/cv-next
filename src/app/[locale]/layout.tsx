import "./globals.css";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";

import type { Locale } from "@/config/locales";
import { locales } from "@/config/locales";

import { ThemeProvider, type Theme } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

import { getDictionary } from "@/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieTheme = cookieStore.get("theme")?.value;
  const headerTheme = headerStore.get("x-theme");

  const theme: Theme =
    cookieTheme === "dark" || cookieTheme === "light"
      ? cookieTheme
      : headerTheme === "dark"
      ? "dark"
      : "light";

  // ✅ SERVER-SIDE i18n
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className={theme === "dark" ? "dark" : ""}>
      <body>
        <ThemeProvider initialTheme={theme}>
          <LanguageProvider locale={locale} dictionary={dictionary}>
            <Header />
            {children}
            <Footer locale={locale} />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
