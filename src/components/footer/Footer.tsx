// src/components/footer/Footer.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { FooterClient } from "./Footer.client";
import { adaptFooter } from "./footer.adapter";

export function Footer() {
  const { tn } = useLanguage();
  const footer = adaptFooter(tn("footer"));

  return <FooterClient footer={footer} />;
}
