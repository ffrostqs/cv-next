import { lazy } from "react";
import type { BlockComponent, BlockDefinition } from "./types";

type BlockRegistryEntry = BlockDefinition & {
  component?: BlockComponent;
};

export const BLOCK_REGISTRY = new Map<string, BlockRegistryEntry>();

function normalizeComponent(definition: BlockDefinition): BlockComponent | undefined {
  if (definition.component) return definition.component;
  if (!definition.load) return undefined;
  return lazy(async () => {
    const loaded = await definition.load?.();
    const resolved =
      typeof loaded === "function"
        ? loaded
        : (loaded as { default: BlockComponent }).default;
    return { default: resolved };
  });
}

export function registerBlock(definition: BlockDefinition) {
  const component = normalizeComponent(definition);
  BLOCK_REGISTRY.set(definition.type, { ...definition, component });
}

export function getBlockDefinition(type: string): BlockRegistryEntry | undefined {
  return BLOCK_REGISTRY.get(type);
}

export function getBlockComponent(type: string): BlockComponent | undefined {
  return BLOCK_REGISTRY.get(type)?.component;
}

export function listBlockTypes(): string[] {
  return Array.from(BLOCK_REGISTRY.keys());
}

export function listBlockDefinitions(): BlockRegistryEntry[] {
  return Array.from(BLOCK_REGISTRY.values());
}
