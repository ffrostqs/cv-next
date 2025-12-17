export type SectionVariant = "default" | "hero" | "muted";

export type SectionProps = {
  children: React.ReactNode;
  id?: string;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
};
