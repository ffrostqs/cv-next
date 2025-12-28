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
