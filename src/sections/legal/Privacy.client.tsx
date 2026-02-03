import { legalStyles as s } from "@/sections/legal/legal.styles";
import type { LegalDictionary } from "@/i18n/types";

export function PrivacyClient({ dict }: { dict: LegalDictionary }) {
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
