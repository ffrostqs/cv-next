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
  Layers2,
  Tags,
  ExternalLink,
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

  demo: ExternalLink,
  // social
  github: Github,
  linkedin: Linkedin,
  // misc
  location: MapPin,
  category: Layers2,
  tags: Tags,
} as const;
