// src/i18n/types.ts

export interface HeroDictionary {
  greeting: string;
  name: string;
  title: string;
  description: string;
  location: string;
  contact: string;
  resume: string;
  available: string;
  remote: string;
  getInTouch: string;
}

export interface ExperienceDictionary {
  subtitle: string;
  title: string;
  description: string;
  techStack: string;
  items: {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    stack: string[];
    icon: string;
    color: string;
    bgColor: string;
  }[];
}

export interface AboutDictionary {
  subtitle: string;
  title: string;
  description: string;

  stats?: {
    id: string;
    icon: string;
    value: string;
    label: string;
  }[];

  approach?: {
    title: string;
    items: {
      id: string;
      icon: string;
      title: string;
      description: string;
    }[];
  };
}

export interface ProjectsDictionary {
  subtitle: string;
  title: string;
  description: string;
  items: {
    id: string;
    title: string;
    description: string;
    problem: string;
    solution?: string;
    result?: string;
    stack: string[];
    links?: {
      label: string;
      url: string;
    };
  }[];
}

export interface Dictionary {
  hero: HeroDictionary;
  experience: ExperienceDictionary;
  projects: ProjectsDictionary;
  about: {
    summary: AboutDictionary;
    full: AboutDictionary;
  };

  global: {
    name: string;
  };

  nav: {
    about: string;
    skills: string;
    languages: string;
    projects: string;
    experience: string;
  };
}
