// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark">
      <body suppressHydrationWarning>
        <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
