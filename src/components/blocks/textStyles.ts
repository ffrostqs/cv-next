"use client";

import type { CSSProperties } from "react";

export type TextStyleConfig = {
  color?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  textAlign?: CSSProperties["textAlign"];
};

export function getTextStyle(style?: Record<string, unknown>): CSSProperties | undefined {
  if (!style || typeof style !== "object") return undefined;
  const source = style as TextStyleConfig;
  const resolved: CSSProperties = {};

  if (source.color) resolved.color = source.color;
  if (source.fontSize) resolved.fontSize = source.fontSize;
  if (source.fontWeight) resolved.fontWeight = source.fontWeight;
  if (source.fontFamily) resolved.fontFamily = source.fontFamily;
  if (source.letterSpacing) resolved.letterSpacing = source.letterSpacing;
  if (source.lineHeight) resolved.lineHeight = source.lineHeight;
  if (source.textAlign) resolved.textAlign = source.textAlign;

  return Object.keys(resolved).length ? resolved : undefined;
}
