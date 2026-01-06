"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { motion as m } from "@/components/ui/motion";

import { Section, useSectionIds } from "@/components/ui/section";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { SocialLinks } from "@/components/ui/social-links/SocialLinks";
import { HeroBadge } from "@/components/ui/hero-badge/HeroBadge";
import { MediaFrame } from "@/components/ui/media-frame/MediaFrame";
import { InfoBadge } from "@/components/ui/info-badge/InfoBadge";

import { HERO_SOCIALS } from "./hero.config";
import type { HeroModel } from "./hero.types";

interface Props {
  hero: HeroModel;
}

export function HeroClient({ hero }: Props) {
  const { titleId, descriptionId } = useSectionIds("hero");

  return (
    <Section
      id="hero"
      variant="hero"
      containerClassName="grid grid-cols-1 items-center gap-16 lg:my-4 lg:grid-cols-2"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      data-testid="experience-section"
    >
      {/* Media */}
      <motion.div {...m("fadeLeft")}>
        <div className="relative mx-auto w-full max-w-sm">
          <MediaFrame className="aspect-[3/4]">
            <Image
              src="/images/portrait.png"
              alt={hero.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover object-[50%_20%]"
            />
          </MediaFrame>

          <div className="absolute bottom-6 right-6">
            <HeroBadge
              status="available"
              title={hero.badge.available}
              subtitle={hero.badge.remote}
            />
          </div>
        </div>
      </motion.div>
      {/* Content */}

      <motion.div {...m("fadeRight")}>
        <div className="text-center lg:text-left">
          <InfoBadge icon={"location"}>{hero.location}</InfoBadge>

          <h1 className="ui-hero-title" id={titleId}>
            <span className="block">{hero.greeting}</span>
            <span className="ui-gradient-text animate-surface-gradient">
              {hero.name}
            </span>
          </h1>

          <h2 className="ui-hero-subtitle">{hero.title}</h2>

          <p className="ui-hero-description" id={descriptionId}>
            {hero.description}
          </p>

          <ButtonGroup className="mt-8 justify-center lg:justify-start">
            <Button asChild>
              <a href="#contact" aria-label="Scroll to contact section">
                {hero.getInTouch}
              </a>
            </Button>

            <Button variant="outline" iconLeft="download" asChild>
              <a href="/resume.pdf" download>
                {hero.resume}
              </a>
            </Button>
          </ButtonGroup>

          <SocialLinks items={HERO_SOCIALS} />
        </div>
      </motion.div>
    </Section>
  );
}
