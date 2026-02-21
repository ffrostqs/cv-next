"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { InfoBadge } from "@/components/ui/info-badge/InfoBadge";
import { InlineEditableText } from "@/components/blocks/InlineEditableText";
import { getTextStyle } from "@/components/blocks/textStyles";

type HeroLocationProps = {
  location?: string;
};

function HeroLocationBlock({ block }: { block: Block }) {
  const props = block.props as HeroLocationProps;
  const location = props.location ?? "Remote";
  const textStyle = getTextStyle(block.style);

  return (
    <div className="flex justify-center lg:justify-start">
      <InfoBadge icon="location">
        <InlineEditableText
          block={block}
          prop="location"
          fallback={location}
          style={textStyle}
          ariaLabel="Location"
        />
      </InfoBadge>
    </div>
  );
}

export default memo(HeroLocationBlock);
