import {
  Briefcase,
  Layers,
  Folder,
  User,
  Mail,
  Github,
  Linkedin,
  Download,
  MapPin,
} from "lucide-react";

export const ICONS = {
  // sections
  experience: Briefcase,
  skills: Layers,
  projects: Folder,
  about: User,

  // actions
  download: Download,
  mail: Mail,

  // social
  github: Github,
  linkedin: Linkedin,

  // misc
  location: MapPin,
} as const;
