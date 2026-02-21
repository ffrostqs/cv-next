"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { InlineEditableText } from "@/components/blocks/InlineEditableText";
import { getTextStyle } from "@/components/blocks/textStyles";

type HeroTitleProps = {
  greeting?: string;
  name?: string;
};

function HeroTitleBlock({ block }: { block: Block }) {
  const props = block.props as HeroTitleProps;
  const greeting = props.greeting ?? "Hello, I am";
  const name = props.name ?? "Your Name";
  const textStyle = getTextStyle(block.style);

  return (
    <h1 className="ui-hero-title text-center lg:text-left">
      <InlineEditableText
        block={block}
        prop="greeting"
        fallback={greeting}
        as="span"
        style={textStyle}
        className="block"
        ariaLabel="Greeting"
      />
      <InlineEditableText
        block={block}
        prop="name"
        fallback={name}
        as="span"
        style={textStyle}
        className="ui-gradient-text animate-surface-gradient"
        ariaLabel="Name"
      />
    </h1>
  );
}

export default memo(HeroTitleBlock);
