// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeScript } from "@/components/theme/ThemeScript";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="dark">
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
