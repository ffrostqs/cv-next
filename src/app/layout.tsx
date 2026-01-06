// src/app/layout.tsx
import "./globals.css";
import { cookies } from "next/headers";

import { ThemeProvider, type Theme } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

import { DEFAULT_LOCALE } from "@/config/languages";
import { getDictionary } from "@/i18n";

function resolveTheme(cookieTheme?: string): Theme {
  if (cookieTheme === "light" || cookieTheme === "dark") {
    return cookieTheme;
  }
  return "dark";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;

  const theme = resolveTheme(cookieTheme);

  // ⚠️ default locale для `/`
  const locale = DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className={theme}>
      <body suppressHydrationWarning>
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
