"use client";

import { legalStyles as s } from "@/sections/legal/legal.styles";
import { useLanguage } from "@/contexts/LanguageContext";

export function TermsClient() {
  const { tn } = useLanguage();
  const dict = tn("terms");

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h1 className={s.title}>{dict.title}</h1>
        <p className={s.subtitle}>{dict.updatedAt}</p>

        <div className={s.content}>
          {dict.sections.map((section) => (
            <div key={section.id} className={s.block}>
              <h2 className={s.heading}>{section.title}</h2>

              {section.paragraphs.map((p, i) => (
                <p key={i} className={s.text}>
                  {p}
                </p>
              ))}

              {section.list && (
                <ul className={s.list}>
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
