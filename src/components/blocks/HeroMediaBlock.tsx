"use client";

import { memo } from "react";
import Image from "next/image";
import type { Block } from "@/lib/blocks";
import { MediaFrame } from "@/components/ui/media-frame/MediaFrame";
import { HeroBadge } from "@/components/ui/hero-badge/HeroBadge";

type HeroMediaProps = {
  src?: string;
  alt?: string;
  badgeAvailable?: string;
  badgeRemote?: string;
  badgeStatus?: "available" | "busy";
  showBadge?: boolean;
  objectPosition?: string;
};

function HeroMediaBlock({ block }: { block: Block }) {
  const props = block.props as HeroMediaProps;
  const src = props.src ?? "/images/portrait.png";
  const alt = props.alt ?? "Portrait";
  const showBadge = props.showBadge ?? true;
  const badgeAvailable = props.badgeAvailable ?? "Available";
  const badgeRemote = props.badgeRemote ?? "Remote";
  const badgeStatus = props.badgeStatus ?? "available";
  const objectPosition = props.objectPosition ?? "50% 20%";

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <MediaFrame className="aspect-[3/4]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover"
          style={{ objectPosition }}
        />
      </MediaFrame>

      {showBadge ? (
        <div className="absolute bottom-6 right-6">
          <HeroBadge
            status={badgeStatus}
            title={badgeAvailable}
            subtitle={badgeRemote}
          />
        </div>
      ) : null}
    </div>
  );
}

export default memo(HeroMediaBlock);
