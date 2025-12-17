import "server-only";
import { en } from "./messages/en";
import { de } from "./messages/de";
import { uk } from "./messages/uk";

const dictionaries = {
  en,
  de,
  uk,
};

export async function getDictionary(locale: string) {
  return dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.en;
}
