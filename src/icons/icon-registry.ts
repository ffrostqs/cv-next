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
  SquareCode,
  CodeXml,
  BookType,
  Wrench,
  Code2,
  X,
  Menu,
  Sun,
  Moon,
  Languages,
  Check,
  Laptop,
  Phone,
} from "lucide-react";

export const ICONS = {
  // sections
  experience: Briefcase,
  skills: Layers,
  projects: Folder,
  about: User,
  laptop: Laptop,
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
  phone: Phone,
  // tech stack
  frontend: SquareCode,
  backend: CodeXml,
  architecture: BookType,
  tools: Wrench,

  logo: Code2,
  menu: Menu,
  close: X,
  light: Sun,
  dark: Moon,
  languages: Languages,
  check: Check,
} as const;
