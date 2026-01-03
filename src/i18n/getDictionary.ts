import "server-only";

import type { Dictionary } from "./types";
import { en } from "./dictionaries/en/";
import { de } from "./dictionaries/de/";
import { uk } from "./dictionaries/uk/";

const dictionaries: Record<string, Dictionary> = {
  en,
  de,
  uk,
};

export async function getDictionary(locale: string): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries.en;
}
