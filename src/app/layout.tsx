// src/app/layout.tsx
import "./globals.css";
import { cookies } from "next/headers";
import { ThemeProvider, type Theme } from "@/contexts/ThemeContext";

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

  return (
    <html className={theme}>
      <body suppressHydrationWarning>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
