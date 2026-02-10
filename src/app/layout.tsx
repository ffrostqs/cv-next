import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { Space_Grotesk } from "next/font/google";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Full-Stack Developer Portfolio",
    template: "%s – Full-Stack Developer",
  },
  description:
    "Personal portfolio of a full-stack developer with experience in modern web technologies.",
  ...(siteUrl && {
    metadataBase: new URL(siteUrl),
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark">
      <head>
        <ThemeScript />
      </head>
      <body className={spaceGrotesk.className} suppressHydrationWarning>
        <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
