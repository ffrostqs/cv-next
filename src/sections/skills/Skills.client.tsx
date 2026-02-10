"use client";

import { Section, useSectionIds } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

import type { SkillsModel } from "./skills.types";
import { SkillCategoryCard } from "./components/SkillCategoryCard";
import { skillsStyles as s } from "./skills.styles";
import { SKILLS_SECTION_ID } from "./skills.config";
import { AppIcon } from "@/icons";
import { motion } from "framer-motion";

export function SkillsClient({ skills }: { skills: SkillsModel }) {
  const { titleId, descriptionId } = useSectionIds(SKILLS_SECTION_ID);

  return (
    <Section
      id={SKILLS_SECTION_ID}
      variant="default"
      className={s.section}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <SectionHeader
        icon={SKILLS_SECTION_ID}
        badge={skills.subtitle}
        title={skills.title}
        description={skills.description}
        titleId={titleId}
        descriptionId={descriptionId}
      />

      {skills.focusAreas && (
        <div className={s.focus.wrapper}>
          <p className={s.focus.title}>{skills.focusAreas.title}</p>
          <div className={s.focus.grid}>
            {skills.focusAreas.items.map((item, index) => (
              <motion.div
                key={item.id}
                className={`group ${s.focus.card}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
              >
                <div className={s.focus.glow} />
                <div className={s.focus.icon}>
                  <AppIcon name={item.icon} size={18} />
                </div>
                <div>
                  <div className={s.focus.cardTitle}>{item.title}</div>
                  <div className={s.focus.cardDesc}>{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className={s.grid}>
        {skills.categories.map((cat, i) => (
          <SkillCategoryCard
            key={cat.id}
            category={cat}
            index={i}
            usage={skills.usage}
          />
        ))}
      </div>
    </Section>
  );
}
