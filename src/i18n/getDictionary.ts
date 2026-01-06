import "server-only";

import type { Dictionary } from "./types";
import { en } from "./dictionaries/en/";
import { de } from "./dictionaries/de/";

const dictionaries: Record<string, Dictionary> = {
  en,
  de,
};

export async function getDictionary(locale: string): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries.en;
}
