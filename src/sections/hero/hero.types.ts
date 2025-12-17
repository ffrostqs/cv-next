export interface HeroModel {
  greeting: string;
  name: string;
  title: string;
  description: string;
  contact: string;
  resume: string;
  location: string;
  badge: {
    available: string;
    remote: string;
  };
}
