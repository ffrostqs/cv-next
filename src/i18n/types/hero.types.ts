export interface HeroDictionary {
  greeting: string;
  name: string;
  title: string;
  description: string;
  location: string;

  availability?: string; // ✅ optional

  contact: string;
  resume: string;
  resumeUrl: string;
  available: string;
  remote: string;
  getInTouch: string;
}
