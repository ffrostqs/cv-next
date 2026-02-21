import type { ComponentType } from "react";
import type { ZodTypeAny } from "zod";

export type BlockLayout = Record<string, unknown>;
export type BlockStyle = Record<string, unknown>;
export type BlockProps = Record<string, unknown>;

export const BLOCK_CATEGORIES = [
  "Sections",
  "Content",
  "Media",
  "Layout",
] as const;

export type BlockCategory = (typeof BLOCK_CATEGORIES)[number];

export type BlockMeta = {
  version?: string;
  ai?: {
    enabled?: boolean;
    model?: string;
    promptId?: string;
    lastRunAt?: string;
  };
  [key: string]: unknown;
};

export interface Block {
  id: string;
  type: string;
  enabled: boolean;
  layout?: BlockLayout;
  style?: BlockStyle;
  props: BlockProps;
  meta?: BlockMeta;
}

export type BlockComponent = ComponentType<{ block: Block }>;

export type BlockDefinition = {
  type: string;
  version?: string;
  title?: string;
  description?: string;
  category?: BlockCategory;
  keywords?: string[];
  defaults?: BlockProps;
  component?: BlockComponent;
  load?: () => Promise<{ default: BlockComponent } | BlockComponent>;
  ai?: {
    enabled?: boolean;
    model?: string;
  };
  schema?: ZodTypeAny;
};
