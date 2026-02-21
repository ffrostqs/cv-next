"use client";

import { memo } from "react";
import type { Block } from "@/lib/blocks";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { InlineEditableText } from "@/components/blocks/InlineEditableText";
import { getTextStyle } from "@/components/blocks/textStyles";
import type { IconName } from "@/icons/icon.types";

type HeroCtaProps = {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryIcon?: IconName;
};

function HeroCtaBlock({ block }: { block: Block }) {
  const props = block.props as HeroCtaProps;
  const primaryLabel = props.primaryLabel ?? "Contact";
  const primaryHref = props.primaryHref ?? "#contact";
  const secondaryLabel = props.secondaryLabel ?? "View resume";
  const secondaryHref = props.secondaryHref ?? "#resume";
  const secondaryIcon = props.secondaryIcon ?? "download";
  const textStyle = getTextStyle(block.style);

  return (
    <ButtonGroup className="mt-8 justify-center lg:justify-start">
      <Button asChild>
        <a
          href={primaryHref}
          onClick={(event) => event.preventDefault()}
        >
          <InlineEditableText
            block={block}
            prop="primaryLabel"
            fallback={primaryLabel}
            as="span"
            style={textStyle}
            ariaLabel="Primary button label"
          />
        </a>
      </Button>
      <Button variant="outline" iconLeft={secondaryIcon} asChild>
        <a
          href={secondaryHref}
          onClick={(event) => event.preventDefault()}
        >
          <InlineEditableText
            block={block}
            prop="secondaryLabel"
            fallback={secondaryLabel}
            as="span"
            style={textStyle}
            ariaLabel="Secondary button label"
          />
        </a>
      </Button>
    </ButtonGroup>
  );
}

export default memo(HeroCtaBlock);
