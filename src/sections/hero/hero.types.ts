export interface HeroModel {
  greeting: string;
  name: string;
  title: string;
  description: string;
  contact: string;
  resume: string;
  resumeUrl: string;
  location: string;
  getInTouch: string;
  badge: {
    available: string;
    remote: string;
    status?: "available" | "busy";
  };
}
