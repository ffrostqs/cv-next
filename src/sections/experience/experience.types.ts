export interface ExperienceItem {
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
}

export interface ExperienceModel {
  subtitle: string;
  title: string;
  description: string;
  techStack: string;
  items: ExperienceItem[];
}
