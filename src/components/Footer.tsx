import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const basic = t("basic") as {
    name: string;
  };
  const footer = t("footer") as {
    text: string;
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-600 dark:text-slate-400">
          {`© 2018–${new Date().getFullYear()} ${basic.name}. ${footer.text}`}
        </p>
      </div>
    </footer>
  );
}
