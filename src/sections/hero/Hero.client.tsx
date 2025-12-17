"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

import { Section } from "@/components/ui/section/Section";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { SocialLinks } from "@/components/ui/social-links/SocialLinks";
import { HeroBadge } from "@/components/ui/hero-badge/HeroBadge";
import { MediaFrame } from "@/components/ui/media-frame/MediaFrame";
import { LocationBadge } from "@/components/ui/location-badge/LocationBadge";

import { HERO_SOCIALS } from "./hero.config";
import type { HeroModel } from "./hero.types";

interface Props {
  hero: HeroModel;
}

export function HeroClient({ hero }: Props) {
  return (
    <Section
      id="hero"
      variant="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24"
      containerClassName="grid grid-cols-1 items-center gap-16 lg:grid-cols-2"
    >
      {/* Media */}
      <div className="relative mx-auto w-full max-w-sm">
        <MediaFrame variant="gradient-animated" className="aspect-[3/4]">
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

      {/* Content */}
      <div className="text-center lg:text-left">
        <LocationBadge icon={MapPin}>{hero.location}</LocationBadge>

        <h1 className="ui-hero-title">
          {hero.greeting}
          <span className="ui-gradient-text block">{hero.name}</span>
        </h1>

        <h2 className="ui-hero-subtitle">{hero.title}</h2>

        <p className="ui-hero-description">{hero.description}</p>

        <ButtonGroup className="mt-8 justify-center lg:justify-start">
          <Button asChild>
            <a href="#contact">{hero.contact}</a>
          </Button>

          <Button variant="outline" iconLeft="download">
            {hero.resume}
          </Button>
        </ButtonGroup>

        <SocialLinks items={HERO_SOCIALS} />
      </div>
    </Section>
  );
}
