"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { InlineEditableText } from "@/components/blocks/InlineEditableText";
import { getTextStyle } from "@/components/blocks/textStyles";

type HeroSubtitleProps = {
  text?: string;
};

function HeroSubtitleBlock({ block }: { block: Block }) {
  const props = block.props as HeroSubtitleProps;
  const text = props.text ?? "Product Designer + Engineer";
  const textStyle = getTextStyle(block.style);

  return (
    <InlineEditableText
      block={block}
      prop="text"
      fallback={text}
      as="h2"
      style={textStyle}
      className="ui-hero-subtitle text-center lg:text-left"
      ariaLabel="Subtitle"
    />
  );
}

export default memo(HeroSubtitleBlock);
