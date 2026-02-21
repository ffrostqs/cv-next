"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { InlineEditableText } from "@/components/blocks/InlineEditableText";
import { getTextStyle } from "@/components/blocks/textStyles";

type HeroDescriptionProps = {
  text?: string;
};

function HeroDescriptionBlock({ block }: { block: Block }) {
  const props = block.props as HeroDescriptionProps;
  const text = props.text ?? "Crafting digital experiences with clarity, speed, and intent.";
  const textStyle = getTextStyle(block.style);

  return (
    <InlineEditableText
      block={block}
      prop="text"
      fallback={text}
      as="p"
      multiline
      style={textStyle}
      className="ui-hero-description text-center lg:text-left"
      ariaLabel="Description"
    />
  );
}

export default memo(HeroDescriptionBlock);
