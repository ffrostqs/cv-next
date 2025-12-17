import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconName =
  | "download"
  | "github"
  | "linkedin"
  | "mail"
  | "map-pin"
  | "arrow-right";

const ICON_MAP: Record<IconName, LucideIcon> = {
  download: Download,
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  "map-pin": MapPin,
  "arrow-right": ArrowRight,
};

export function getIcon(name?: IconName): LucideIcon | null {
  if (!name) return null;
  return ICON_MAP[name];
}
