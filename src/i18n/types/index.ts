// src/i18n/types.ts

export interface HeroDictionary {
  greeting: string;
  name: string;
  title: string;
  description: string;
  contact: string;
  resume: string;
  location: string;
  available: string;
  remote: string;
}

export interface Dictionary {
  hero: HeroDictionary;
}
